var db = require("../models");

module.exports = function(app) {
  // Find all Authors and return them to the user with res.json
  // app.get("/api/emotes", function(req, res) {
  //   db.Emote.findAll({}).then(function(dbEmote) {
  //     res.json(dbEmote);
  //   });
  // });

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

  app.post("/api/emote", function(req, res) {
    // Create an  with the data available to us in req.body
    let emote = req.body;
    // console.log(req.body);
    // console.log(emote);
    console.log(req.user);

    db.Emote.create({
      url: emote.url,
      anger: emote.anger,
      contempt: emote.contempt,
      disgust: emote.disgust,
      fear: emote.fear,
      happiness: emote.happiness,
      neutral: emote.neutral,
      sadness: emote.sadness,
      surprise: emote.surprise,
      UserId: req.user.id

    }).then(function(dbEmote) {
      res.json(dbEmote);
    });
  });

  // app.delete("/api/authors/:id", function(req, res) {
  //   // Delete the Author with the id available to us in req.params.id
  //   db.Author.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbAuthor) {
  //     res.json(dbAuthor);
  //   });
  // });

};
