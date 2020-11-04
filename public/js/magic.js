// face function to run face analysis on the image being uploaded
// function face(sourceImageUrl, deleteHash) {

//   var subscriptionKey = "76e79cc95d1e4b18be961bc9329ae3e5";
//   var uriBase =
//     "https://emote.cognitiveservices.azure.com//face/v1.0/detect";

//   // Request parameters.
//   var params = {
//     "detectionModel": "detection_01",
//     "returnFaceAttributes": "age,gender,emotion,noise",
//     "returnFaceId": "false"
//   };
//   // Display the image
//   document.querySelector("#sourceImage").src = sourceImageUrl;

//   // Perform the REST API call.
//   $.ajax({
//     url: uriBase + "?" + $.param(params),
//     // Request headers.
//     beforeSend: function (xhrObj) {
//       xhrObj.setRequestHeader("Content-Type", "application/json");
//       xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
//     },
//     type: "POST",
//     // Request body.
//     data: '{"url": ' + '"' + sourceImageUrl + '"}',
//   })
//     .done(function (data) {
//       // Show formatted JSON on webpage
//       var newEmote = {
//         url: sourceImageUrl,
//         anger: data[0].faceAttributes.emotion.anger,
//         contempt: data[0].faceAttributes.emotion.contempt,
//         disgust: data[0].faceAttributes.emotion.disgust,
//         fear: data[0].faceAttributes.emotion.fear,
//         happiness: data[0].faceAttributes.emotion.happiness,
//         neutral: data[0].faceAttributes.emotion.neutral,
//         sadness: data[0].faceAttributes.emotion.sadness,
//         surprise: data[0].faceAttributes.emotion.surprise,
//         deleteHash: deleteHash
//       };

//       var renderedEmote = {
//         Anger: data[0].faceAttributes.emotion.anger,
//         Contempt: data[0].faceAttributes.emotion.contempt,
//         Disgust: data[0].faceAttributes.emotion.disgust,
//         Fear: data[0].faceAttributes.emotion.fear,
//         Happiness: data[0].faceAttributes.emotion.happiness,
//         Neutral: data[0].faceAttributes.emotion.neutral,
//         Sadness: data[0].faceAttributes.emotion.sadness,
//         Surprise: data[0].faceAttributes.emotion.surprise
//       };

//       $("#responseTextArea").val(JSON.stringify(renderedEmote, null, 2).replace(/[}',"]+/g, '').replace(/[{]+/g, 'Face Analysis:'));

//       $.post("/api/emotes", newEmote)
//         // on success, run this callback
//         .then(function (data) {
//           // log the data we found
//           console.log(data);
//           // tell the user we're adding an Emote with an alert window
//           alert("Adding Emote...");
//         });
//     })
//     .fail(function (jqXHR, textStatus, errorThrown) {
//       // Display error message.
//       var errorString = (errorThrown === "") ?
//         "Error. " : errorThrown + " (" + jqXHR.status + "): ";
//       errorString += (jqXHR.responseText === "") ?
//         "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
//           jQuery.parseJSON(jqXHR.responseText).message :
//           jQuery.parseJSON(jqXHR.responseText).error.message;
//       alert(errorString);
//     });
// }

//IMGUR upload img into the Ether
// https://gist.github.com/bmcbride/7577e6aed5ce962776ca
// $("document").ready(function () {

//   $('input[type=file]').on("change", function () {
//     var $files = $(this).get(0).files;

//     if ($files.length) {
//       // Reject big files
//       if ($files[0].size > $(this).data("max-size") * 1024) {
//         console.log("Please select a smaller file");
//         return false;
//       }
//       // API key === clientId
//       let albumID = "cMVVE5y";
//       var apiUrl = 'https://api.imgur.com/3/image';
//       var apiKey = "4bd8e2fc19460e6";

//       var formData = new FormData();
//       formData.append("image", $files[0]);
//       // Settings to be passed in AJAX call to IMGUR API
//       var settings = {
//         "async": true,
//         "crossDomain": true,
//         "url": apiUrl,
//         "method": "POST",
//         "datatype": "json",
//         "data": { image: $files[0].name, album: albumID },
//         "headers": {
//           "Authorization": "Client-ID " + apiKey
//         },
//         "processData": false,
//         "contentType": false,
//         "data": formData,
//         beforeSend: function () {
//           console.log("Uploading");
//         },
//         // Logic that handles displaying image uploaded to IMGUR using API
//         success: function (res) {
//           $('.imgBody').empty().append('<img src="' + res.data.link + '" />');
//           face(res.data.link, res.data.deletehash);
//         },
//         error: function () {
//           alert("Failed");
//         }
//       };
//       // passing setting variable to ajax call to IMGUR API
//       $.ajax(settings).done(function () {
//         console.log("Done");
//       });
//     }
//   });

// Face API Script for anyalzying face data
//Analyze button click listener
// $('.processButton').on("click", function () {
//   //login credentials for Face API
//   var subscriptionKey = "76e79cc95d1e4b18be961bc9329ae3e5";
//   var uriBase =
//     "https://emote.cognitiveservices.azure.com//face/v1.0/detect";

//   // Request parameters.
//   var params = {
//     "detectionModel": "detection_01",
//     "returnFaceAttributes": "age,gender,emotion,noise",
//     "returnFaceId": "false"
//   };

//   // Display the image from URL being Analyzed
//   var sourceImageUrl = document.getElementById("inputImage").value;
//   document.querySelector("#sourceImage").src = sourceImageUrl;

//   // Perform the REST API call.
//   $.ajax({
//     url: uriBase + "?" + $.param(params),

//     // Request headers.
//     beforeSend: function (xhrObj) {
//       xhrObj.setRequestHeader("Content-Type", "application/json");
//       xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
//     },
//     type: "POST",
//     // Request body.
//     data: '{"url": ' + '"' + sourceImageUrl + '"}',
//   })
//     .done(function (data) {
//       //Create variabgle to house organized data
//       var newEmote = {
//         url: sourceImageUrl,
//         anger: data[0].faceAttributes.emotion.anger,
//         contempt: data[0].faceAttributes.emotion.contempt,
//         disgust: data[0].faceAttributes.emotion.disgust,
//         fear: data[0].faceAttributes.emotion.fear,
//         happiness: data[0].faceAttributes.emotion.happiness,
//         neutral: data[0].faceAttributes.emotion.neutral,
//         sadness: data[0].faceAttributes.emotion.sadness,
//         surprise: data[0].faceAttributes.emotion.surprise,
//       };

//       var renderedEmote = {
//         Anger: data[0].faceAttributes.emotion.anger,
//         Contempt: data[0].faceAttributes.emotion.contempt,
//         Disgust: data[0].faceAttributes.emotion.disgust,
//         Fear: data[0].faceAttributes.emotion.fear,
//         Happiness: data[0].faceAttributes.emotion.happiness,
//         Neutral: data[0].faceAttributes.emotion.neutral,
//         Sadness: data[0].faceAttributes.emotion.sadness,
//         Surprise: data[0].faceAttributes.emotion.surprise
//       };

//       $("#responseTextArea").val(JSON.stringify(renderedEmote, null, 2).replace(/[}',"]+/g, '').replace(/[{]+/g, 'Face Analysis:'));

//       //Pass in newEmote variable to POST request
//       $.post("/api/emotes", newEmote)
//         // on success, run this callback
//         // eslint-disable-next-line no-unused-vars
//         .then(function (data) {
//           // log the data we found
//           // console.log(data);
//           // tell the user we're adding a character with an alert window
//           alert("Adding Emote...");
//         });
//     })
//     .fail(function (jqXHR, textStatus, errorThrown) {
//       // Display error message.
//       var errorString = (errorThrown === "") ?
//         "Error. " : errorThrown + " (" + jqXHR.status + "): ";
//       errorString += (jqXHR.responseText === "") ?
//         "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
//           jQuery.parseJSON(jqXHR.responseText).message :
//           jQuery.parseJSON(jqXHR.responseText).error.message;
//       alert(errorString);
//     });
// });

// Code That controls delete button in index.handlebars
// eslint-disable-next-line no-unused-vars
$(".delplan").on("click", function (event) {
  // Get the ID from the button.
  // This is shorthand for $(this).attr("data-planid")
  var id = $(this).data("planid");
  var deleteHash = $(this).data("deletehash");

  // Send the DELETE request.
  $.ajax("/api/delete/" + deleteHash, {
    type: "DELETE"
  }).then(
    function () {
      console.log("deleted using IMGUR deleteHash ", deleteHash);
    }
  );

  $.ajax("/api/emotes/" + id, {
    type: "DELETE"
  }).then(
    function () {
      console.log("deleted Emote using id ", id);
      // Reload the page to get the updated list
      location.reload();
    }
  );
});
// });