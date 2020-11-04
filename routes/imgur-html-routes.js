var db = require("../models");
const multer = require('multer');
const ImgurStorage = require('multer-storage-imgur');
const upload = multer({
  storage: ImgurStorage({ clientId: process.env.IMGUR_API_KEY })
});

// eslint-disable-next-line no-unused-vars
const { FaceClient, FaceModels } = require("@azure/cognitiveservices-face");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");



// https://www.npmjs.com/package/@azure/cognitiveservices-face
async function main(sourceImageUrl, deleteHash) {
  const faceKey = process.env.FACE_API_KEY;
  const faceEndPoint = process.env.FACE_ENDPOINT;
  const cognitiveServiceCredentials = new CognitiveServicesCredentials(faceKey);
  const client = new FaceClient(cognitiveServiceCredentials, faceEndPoint);
  const options = {
    returnFaceLandmarks: false,
    returnFaceAttributes: ["age", "gender", "emotion"]
  };
  let url = sourceImageUrl;
  let data = await client.face
    .detectWithUrl(url, options);
    //line 28 wont run until 26/27 finished using await

  var newEmote = {
    url: sourceImageUrl,
    anger: data[0].faceAttributes.emotion.anger,
    contempt: data[0].faceAttributes.emotion.contempt,
    disgust: data[0].faceAttributes.emotion.disgust,
    fear: data[0].faceAttributes.emotion.fear,
    happiness: data[0].faceAttributes.emotion.happiness,
    neutral: data[0].faceAttributes.emotion.neutral,
    sadness: data[0].faceAttributes.emotion.sadness,
    surprise: data[0].faceAttributes.emotion.surprise,
    deleteHash: deleteHash
  };

  var renderedEmote = {
    Anger: data[0].faceAttributes.emotion.anger,
    Contempt: data[0].faceAttributes.emotion.contempt,
    Disgust: data[0].faceAttributes.emotion.disgust,
    Fear: data[0].faceAttributes.emotion.fear,
    Happiness: data[0].faceAttributes.emotion.happiness,
    Neutral: data[0].faceAttributes.emotion.neutral,
    Sadness: data[0].faceAttributes.emotion.sadness,
    Surprise: data[0].faceAttributes.emotion.surprise
  };

  return {newEmote, renderedEmote};
}

module.exports = function (app) {
  //https://medium.com/@nitinpatel_20236/image-upload-via-nodejs-server-3fe7d3faa642
  app.post('/api/upload', upload.single('photo'), async (req, res) => {
    if (req.file) {
      var emotesData = await main(req.file.data.link, req.file.data.deletehash);
      let emote = emotesData.newEmote;

      db.Emote.create({
        ...emote,
        // tripel period (...) = spread syntax/operator opens up emote box
        UserId: req.user.id,

      }).then(function (dbEmote) {
        res.render ("emote", dbEmote.dataValues);
      });
    } else {
      throw 'error';
    }
  });

  app.post("/api/url", async function (req, res) {
    console.log(req.body.url);
    var emotesData = await main(req.body.url);
    let emote = emotesData.newEmote;
    db.Emote.create({
      ...emote,
      // tripel period (...) = spread syntax/operator opens up emote box
      UserId: req.user.id,

    }).then(function (dbEmote) {
      res.render ("emote", dbEmote.dataValues);
    });

  });
};