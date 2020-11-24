const Controller = require("../controller/index.js");

module.exports = function (app) {
  // Find all Emotes and return them to the user with res.json
  app.get("/api/emotes", function (req, res) {

    Controller.getAll(req.user.id).then(function (dbEmote) {

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

    Controller.getEmotion(req.params.emotion, req.user.id).then(function (dbEmote) {
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

    Controller.create(emote, req.user.id).then(function (dbEmote) {
      res.json(dbEmote);
    });
  });

  app.delete("/api/emotes/:id", function (req, res) {

    Controller.delete(req.params.id).then(function (dbEmote) {
      res.json(dbEmote);
    });
  });

  // eslint-disable-next-line no-unused-vars
  app.delete("/api/delete/:deleteHash", function (req, res) {

    Controller.deleteIMGUR(req.params.deleteHash).then(function(status) {
      console.log(status);
    })
      .catch(function(err) {
        console.error(err.message);
      });
  });
};