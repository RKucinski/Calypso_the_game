const express = require('express')
const router = express.Router()
const UserProfile = require('../models/userProfileModel')
const jwt = require("jwt-simple");
const config = require("../config/config");

router.use(function (req, res, next) {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token, config.secret);
    req.user = decoded._id;
    next();
  } else {
    req.user = null;
    next();
  }
});

router.get('/', function (req, res, next) {
  UserProfile.findOne({ userId: req.user }).then(function (data) {
    res.send(data)
  })
})

router.post('/', function (req, res, next) {
  UserProfile.create(req.body).then(function (data) {
    res.send(data)
  }).catch(next)
})

router.put('/update', function (req, res, next) {
  
  updatedData = req.body.data
  console.log(updatedData)

  UserProfile.findOneAndUpdate({ userId: req.user }, updatedData)
    .then(function () {
      console.log(req.body)
      console.log(req.body.data)
      console.log(req.user)


      UserProfile.findOne({ userId: req.user })
        .then(function (data) {
          res.send(data)
        })
    }).catch(next)
})

module.exports = router