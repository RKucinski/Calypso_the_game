const express = require('express')
const router = express.Router()
const Creator = require('../models/creatorModel')

router.get('/:id', function (req, res, next) {
  Creator.findOne({ userId: req.params.id }).then(function (data) {
    res.send(data)
  })
})

router.post('/', function (req, res, next) {
  Creator.create(req.body).then(function (data) {
    res.send(data)
  }).catch(next)
})

router.put('/:id', function (req, res, next) {
  Creator.findByIdAndUpdate({ userId: req.params.id }, req.body)
    .then(function () {
      Creator.findOne({ userId: req.params.id })
        .then(function (data) {
          res.send(data)
        })
    }).catch(next)
})

module.exports = router