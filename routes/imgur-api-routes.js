var db = require("../models");
var { Op } = require("sequelize");
var imgur = require('imgur');

module.exports = function (app) {
  // Find all Emotes and return them to the user with res.json
  app.get("/api/emotes", function (req, res) {
    db.Emote.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(function (dbEmote) {

      let data = {
        emotes: []
      };
      for (var i = 0; i < dbEmote.length; i += 1) {
        // Get the current emote
        let currentEmote = dbEmote[i].dataValues;
        // If so, push it into our data.emotes array.
        data.emotes.push(currentEmote);
      }
      res.render("index", data);
    });
  });

  app.get("/api/emotes/:emotion", function (req, res) {
    db.Emote.findAll({
      where: {
        UserId: req.user.id,
        [req.params.emotion]: {
          [Op.gt]: .5
        }
      }
    }).then(function (dbEmote) {
      let data = {
        emotes: []
      };
      for (var i = 0; i < dbEmote.length; i += 1) {
        // Get the current emote
        let currentEmote = dbEmote[i].dataValues;
        // If so, push it into our data.emotes array.
        data.emotes.push(currentEmote);
      }
      res.render("index", data);
    })
      .catch(function (err) {
        console.log(err);
        res.status(404).end();
      });
  });

  app.post("/api/emotes", function (req, res) {
    // Create a variable with the data available to us in req.body
    let emote = req.body;
    // console.log("emote emote emote emote");
    // console.log(emote);

    db.Emote.create({
      url: emote.url,
      anger: parseFloat(emote.anger),
      contempt: parseFloat(emote.contempt),
      disgust: parseFloat(emote.disgust),
      fear: parseFloat(emote.fear),
      happiness: parseFloat(emote.happiness),
      neutral: parseFloat(emote.neutral),
      sadness: parseFloat(emote.sadness),
      surprise: parseFloat(emote.surprise),
      UserId: req.user.id,
      deleteHash: emote.deleteHash

    }).then(function (dbEmote) {
      res.json(dbEmote);
    });
  });

  app.delete("/api/emotes/:id", function (req, res) {
    // Delete the Emote with the id available to us in req.params.id
    //console.log(req.params.id);
    db.Emote.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbEmote) {
      res.json(dbEmote);
    });
  });

  // eslint-disable-next-line no-unused-vars
  app.delete("/api/delete/:deleteHash", function (req, res) {
    // Delete the Emote with the id available to us in req.params.id
    imgur.deleteImage(req.params.deleteHash)
      .then(function(status) {
        console.log("status status status");
        console.log(status);
        console.log(req.params.deleteHash);
      })
      .catch(function(err) {
        console.error("err.message err.message err.message");
        console.error(err.message);
      });
  });
};