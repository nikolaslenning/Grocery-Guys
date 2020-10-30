var db = require("../models");

module.exports = function(app) {
  // Find all Emotes and return them to the user with res.json
  app.get("/api/emotes", function(req, res) {
    db.Emote.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(function(dbEmote) {

      let data = {
        emotes: []
      };
      for (var i = 0; i < dbEmote.length; i += 1) {
        // Get the current animal.
        let currentEmote = dbEmote[i].dataValues;
        // If so, push it into our data.emotes array.
        data.emotes.push(currentEmote);

      }
      console.log("data data data data");
      console.log(data);
      // res.send("index");
      res.render("index", data);
      // console.log("dbEmote dbEmote dbEmote dbEmote dbEmote");
      // console.log(dbEmote);
      // console.log(dbEmote);
      // console.log(dbEmote[0].Emote);
      // res.json(data);
      // console.log("dbEmote dbEmote dbEmote dbEmote");
      // console.log(dbEmote[0].dataValues);
      // console.log(dbEmote);
      // map of dbEmotes
    });
  });

  /*
    Emote {
      dataTypes: {} <-- YES
      ... <-- NO
    }

    function makeDataTheWayIwantIt(dbData) {

      let result = []; <-- OK
      for ... {
        console.log(...) <-- OK
        // result.push(...);
      }

      return result;
    }

    res.render("index", makeDataTheWayIWantIt(result))
  */

  // app.get("/api/authors/:id", function(req, res) {
  //   // Find one Author with the id in req.params.id and return them to the user with res.json
  //   db.Author.findOne({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbAuthor) {
  //     res.json(dbAuthor);
  //   });
  // });

  app.post("/api/emotes", function(req, res) {
    // Create an  with the data available to us in req.body
    let emote = req.body;
    // console.log(req.body);
    // console.log("emote emote emote emote emote");
    // console.log(emote);
    // console.log("req.user req.user req.user req.user req.user");
    // console.log(req.user);
    // console.log("parseFloat(emote.neutral) parseFloat(emote.neutral) parseFloat(emote.neutral)");
    // console.log(parseFloat(emote.neutral));
    // console.log(emote.neutral);

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
      UserId: req.user.id

    }).then(function(dbEmote) {
      // console.log("dbEmote dbEmote dbEmote dbEmote");
      // console.log(dbEmote);
      res.json(dbEmote);
    });
  });

  app.delete("/api/emotes/:id", function(req, res) {
    // Delete the Emote with the id available to us in req.params.id
    //console.log(req.params.id);
    db.Emote.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbEmote) {
      res.json(dbEmote);
    });
  });

};
