const multer = require('multer');
const ImgurStorage = require('multer-storage-imgur');
const upload = multer({
  storage: ImgurStorage({ clientId: process.env.IMGUR_API_KEY })
});
const Controller = require("../controller/index.js");

module.exports = function (app) {
  //https://medium.com/@nitinpatel_20236/image-upload-via-nodejs-server-3fe7d3faa642
  app.post('/api/upload', upload.single('photo'), async (req, res) => {
    if (req.file) {
      var emotesData = await Controller.main(req.file.data.link, req.file.data.deletehash);
      let emote = emotesData.newEmote;

      Controller.create(emote, req.user.id).then(function (dbEmote) {
        res.render ("emote", dbEmote.dataValues);
      });
    } else {
      throw 'error';
    }
  });

  app.post("/api/url", async function (req, res) {
    var emotesData = await Controller.main(req.body.url);
    let emote = emotesData.newEmote;

    Controller.create(emote, req.user.id).then(function (dbEmote) {
      res.render ("emote", dbEmote.dataValues);
    });

  });
};