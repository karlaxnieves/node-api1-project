// BUILD YOUR SERVER HERE
const express = require('express')

const User = require('./users/model')

const server = express()

server.use(express.json())

//[GET]
server.get('/api/users', (req, res) =>{
    User.find()
    .then(users => {
        res.json(users)
    })
    .catch (err => {
        res.status(500).json({
          message: 'error getting users',
          err: err.message,
          stack: err.stack
        })
      })
})

// [GET]
server.get('/api/users/:id', (req, res)=> {
    User.findById(req.params.id)
    .then(user =>{
        if (!user) {
            res.status(404).json({
                message: `The user with the specified ID does not exist`
            })
        } else {
            res.status(200).json(user)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'error getting users by id',
            err: err.message,
            stack: err.stack
        })
      })
})

// [POST]
server.post('/api/users', (req, res) => {
    if (!req.body.name || !req.body.bio) {
        res.status(400).json({message: 'Please provide name and bio for the username and bio are required'})
    } else {
        const {name, bio} = req.body
        User.insert({name, bio})
        .then(users =>{
            res.status(201).json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: 'Please provide name and bio for the user',
                err: err.message,
                stack: err.stack
            })
          })
    }
})


// [DELETE] 
server.delete('/api/users/:id', async (req, res) => {
    try {
        const result = await User.remove(req.params.id)
        if (!result) {
           res.status(404).json({ message: "The user with the specified ID does not exist" }) 
        } else {
            res.json(result)
        }
    } catch (err) {
        res.status(500).json({
            message: "The user could not be removed",
            err: err.message,
            stack: err.stack
        })
    }
})


// [PUT]
server.put('/api/users/:id', (req, res) => {
    const {id} = req.params
    const {name, bio} = req.body
    if (!name || !bio) {
        res.status(404).json({ message: "The user with the specified ID does not exist" })
    } else {
        User.update(id, {name, bio})
        .then(updated =>{
            if (!updated) {
                res.status(400).json({ message: "Please provide name and bio for the user" })
            } else {
                res.json(updated)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "The user information could not be modified",
                err: err.message,
                stack: err.stack
            })
          })
    }
})


module.exports = {}; // EXPORT YOUR SERVER instead of {}
