var db = require("../models");
const multer = require('multer');
const ImgurStorage = require('multer-storage-imgur');
const upload = multer({
  storage: ImgurStorage({ clientId: process.env.IMGUR_API_KEY })
});

const { FaceClient, FaceModels } = require("@azure/cognitiveservices-face");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");
const e = require("express");

// var newEmote = {};
// var renderedEmote = {};

// https://www.npmjs.com/package/@azure/cognitiveservices-face
async function main(sourceImageUrl, deleteHash) {
  const faceKey = process.env.FACE_API_KEY;
  const faceEndPoint = process.env.FACE_ENDPOINT;
  const cognitiveServiceCredentials = new CognitiveServicesCredentials(faceKey);
  const client = new FaceClient(cognitiveServiceCredentials, faceEndPoint);
  let url = sourceImageUrl;

  const options = {
    returnFaceLandmarks: false,
    returnFaceAttributes: ["age", "gender", "emotion"]
  };
  let data = await client.face
    .detectWithUrl(url, options);
    //line 28 wont run until 26/27 finished using await
  // .then(data => {
  console.log("The data is: ");
  console.log(data);
  //   console.log(data[0].faceAttributes);
  console.log(data[0].faceAttributes.emotion);
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
  //   console.log("newEmote");
  //   console.log(newEmote);
  //   console.log("renderedEmote");
  //   console.log(renderedEmote);
  //   return newEmote && renderedEmote;
  // db.Emote.create({ newEmote });
  // return data;
  return {newEmote, renderedEmote};
  // })
  // .catch(err => {
  //   console.log("An error occurred:");
  //   console.error(err);
  // });
}


module.exports = function (app) {
  //https://medium.com/@nitinpatel_20236/image-upload-via-nodejs-server-3fe7d3faa642
  app.post('/api/upload', upload.single('photo'), async (req, res) => {
    if (req.file) {
      //   var imgBody = document.getElementsByClassName("imgBody");
      //   imgBody.empty().append('<img src="' + res.data.link + '" />');
      //   face(req.file.link, req.file.deletehash);
      //   console.log(req.file);
      //   console.log("req.file.data.link, req.file.data.deleteHash");
      //   console.log(req.file.data.link);
      //   console.log(req.file.data.deletehash);
      console.log(req.file.data.deletehash);
      var emotesData = await main(req.file.data.link, req.file.data.deletehash);
      //   console.log(newEmote),
      console.log("emotesData emotesData emotesData");
      console.log(JSON.stringify(emotesData));
      let emote = emotesData.newEmote;
      console.log("emote emote emote emote");
      console.log(emote);

      db.Emote.create({
        ...emote,  // tripel period (...) = spread syntax/operator opens up emote box
        UserId: req.user.id,
        
      }).then(function (dbEmote) {
        res.json(emotesData.renderedEmote);
      });
      // res.json(emotesData);
      // AXIOS post to /api/emotes send newEmote/renderedEmote or datalink & deletehash?
    } else {
      throw 'error';
    }
  });

  app.post("/api/url", async function (req, res) {
    console.log(req.body.url);
    var emotesData = await main(req.body.url);
    let emote = emotesData.newEmote;
    db.Emote.create({
      ...emote,  // tripel period (...) = spread syntax/operator opens up emote box
      UserId: req.user.id,
      
    }).then(function (dbEmote) {
      res.json(emotesData.renderedEmote);
      // res.render (decide view from handlebars, data inserted intohandlebars)
    });

  });
};