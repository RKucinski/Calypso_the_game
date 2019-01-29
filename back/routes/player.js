const express = require('express')
const router = express.Router()
const Player = require('../models/playerModel')

router.get('/:id', function (req, res, next) {
  Player.findOne({userID : req.params.id}).then(function (data) {
    res.send(data)
  })
})

router.post('/', function (req, res, next) {
  Player.create(req.body).then(function (data) {
    res.send(data)
  }).catch(next)
})

router.put('/:id', function (req, res, next) {
  Player.findByIdAndUpdate({ userID: req.params.id }, req.body)
    .then(function () {
      Player.findOne({ userID: req.params.id })
        .then(function (data) {
          res.send(data)
        })
    }).catch(next)
})


module.exports = router