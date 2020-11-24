// eslint-disable-next-line no-unused-vars
const { FaceClient, FaceModels } = require("@azure/cognitiveservices-face");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");
var db = require("../models");
var { Op } = require("sequelize");

let controller = {
  // https://www.npmjs.com/package/@azure/cognitiveservices-face
  main: async function (sourceImageUrl, deleteHash) {
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
    return { newEmote, renderedEmote };
  },

  create: function (emote, user) {
    return db.Emote.create({
      ...emote,
      // tripel period (...) = spread syntax/operator opens up emote box
      UserId: user,

    });
  },

  getAll: function (user) {
    return db.Emote.findAll({
      where: {
        UserId: user
      }
    });
  },

  getEmotion: function(emotion, user) {
    return db.Emote.findAll({
      where: {
        UserId: user,
        [emotion]: {
          [Op.gt]: .5
        }
      }
    });
  },

  delete: function(user) {
    return db.Emote.destroy({
      where: {
        id: user
      }
    });
  }
};

module.exports = controller;