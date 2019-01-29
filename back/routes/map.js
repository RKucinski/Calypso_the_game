const express = require("express");
const router = express.Router();
const Map = require("../models/mapModel");
const Comment = require("../models/commentsMapModels");

router.get("/", function(req, res, next) {
  Map.find({}).then(function(data) {
    res.send(data);
  });
});

router.post("/", function(req, res, next) {
  Map.create(req.body)
    .then(function(data) {
      res.send(data);
    })
    .catch(next);
});

router.put("/:id", function(req, res, next) {
  Map.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(function() {
      Map.findOne({ _id: req.params.id }).then(function(data) {
        res.send(data);
      });
    })
    .catch(next);
});

//get map from idMap
router.get("/:id", function(req, res, next) {
  Map.findOne({ _id: req.params.id })
    .populate("userID", "pseudo")
    .exec((err, user_profiles) => {
      if (err) res.sendStatus(500);
      res.send(user_profiles);
    });
});

// get Comments from idMap
router.get("/:id/comments", function(req, res, next) {
  Comment.find({ idMap: req.params.id })
    .then(function(data) {
      res.send(data);
    })
    .catch(e => {
      console.log(e);
    });
});

//POST comments from id map
router.post("/:id/comments", function(req, res, next) {
  Comment.create(req.body)
    .then(function(data) {
      res.send(data);
    })
    .catch(next);
});

//GET data game
router.get("/:id/game", function(req, res, next) {
  Map.find({ _id: req.params.id }, { layerGround: 1 })
    .then(function(data) {
      res.send(data);
    })
    .catch(e => {
      console.log(e);
    });
});

module.exports = router;
