const express = require("express");
const router = express.Router();
const UserProfiles = require("../models/userProfileModel");
const UserInfo = require("../models/userModel");
const jwt = require("jwt-simple");
const config = require("../config/config");
const mongoose = require("mongoose");

router.use(function(req, res, next) {
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

router.get("/", function(req, res, next) {
  console.log(req.user);
  UserProfiles.find({ userId: req.user }).then(function(data) {
    res.send(data);
  });
});

router.post("/", function(req, res, next) {
  UserProfiles.create(req.body)
    .then(function(data) {
      res.send(data);
    })
    .catch(next);
});

router.put("/modify", function(req, res, next) {
  UserProfiles.create(req.body).then(function() {
    res.send("Modification du profil effectué");
  });
});

router.put("/modify_values", function(req, res, next) {
  UserProfiles.updateMany({ userId: req.user }, { $set: req.body })
    .then(function() {
      UserProfiles.findOne({ userId: req.user }).then(function(data) {
        res.send(data);
      });
    })
    .catch(next);
});

router.put("/modify_user", function(req, res, next) {
  UserInfo.updateMany({ _id: req.user }, { $set: req.body }).then(function() {
    res.send("Modification de l'user effectué");
  });
});

// Récupération des informations du profil

router.get("/my_profile", function(req, res, next) {
  UserProfiles.find({ userId: req.user }).then(function(data) {
    res.send(data);
  });
});

router.get("/me", function(req, res, next) {
  UserInfo.find({ _id: req.user }).then(function(data) {
    res.send(data);
  });
});

module.exports = router;
