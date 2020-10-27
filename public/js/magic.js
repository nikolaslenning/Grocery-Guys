// face function to run face analysis on the image being uploaded
function face(sourceImageUrl) {

  var subscriptionKey = "76e79cc95d1e4b18be961bc9329ae3e5";
  var uriBase =
    "https://emote.cognitiveservices.azure.com//face/v1.0/detect";

  // Request parameters.
  var params = {
    "detectionModel": "detection_01",
    "returnFaceAttributes": "age,gender,emotion,noise",
    "returnFaceId": "false"
  };

  // Display the image.

  document.querySelector("#sourceImage").src = sourceImageUrl;

  // Perform the REST API call.
  $.ajax({
    url: uriBase + "?" + $.param(params),

    // Request headers.
    beforeSend: function (xhrObj) {
      xhrObj.setRequestHeader("Content-Type", "application/json");
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
    },

    type: "POST",

    // Request body.
    data: '{"url": ' + '"' + sourceImageUrl + '"}',
  })

    .done(function (data) {
      // Show formatted JSON on webpage.
      console.log(data);
      console.log(data[0].faceAttributes);
      console.log(data[0].faceAttributes.emotion);
      console.log(data[0].faceAttributes.emotion.contempt);
      $("#responseTextArea").val(JSON.stringify(data, null, 2));
    })

    .fail(function (jqXHR, textStatus, errorThrown) {
      // Display error message.
      var errorString = (errorThrown === "") ?
        "Error. " : errorThrown + " (" + jqXHR.status + "): ";
      errorString += (jqXHR.responseText === "") ?
        "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
          jQuery.parseJSON(jqXHR.responseText).message :
          jQuery.parseJSON(jqXHR.responseText).error.message;
      alert(errorString);
    });
}


// Face analysis code for analyzing URL
// https://gist.github.com/bmcbride/7577e6aed5ce962776ca
$("document").ready(function () {

  $('input[type=file]').on("change", function () {

    var $files = $(this).get(0).files;
    console.log($files);
    console.log($files[0]);
    console.log($files[0].name);

    if ($files.length) {

      // Reject big files
      if ($files[0].size > $(this).data("max-size") * 1024) {
        console.log("Please select a smaller file");
        return false;
      }

      // API key === clientId
      let albumID = "cMVVE5y";
      var apiUrl = 'https://api.imgur.com/3/image';
      var apiKey = '4bd8e2fc19460e6';

      var formData = new FormData();
      formData.append("image", $files[0]);

      var settings = {
        "async": true,
        "crossDomain": true,
        "url": apiUrl,
        "method": "POST",
        "datatype": "json",
        "data": { image: $files[0].name, album: albumID },
        "headers": {
          "Authorization": "Client-ID " + apiKey
        },
        "processData": false,
        "contentType": false,
        "data": formData,
        beforeSend: function () {
          console.log("Uploading");
        },
        success: function (res) {
          console.log(res.data.link);
          $('.imgBody').empty().append('<img src="' + res.data.link + '" />');
          face(res.data.link);
        },
        error: function () {
          alert("Failed");
        }
      };
      $.ajax(settings).done(function () {
        console.log("Done");
      });
    }
  });


  // Face API Script
  $('.processButton').on("click", function () {

    var subscriptionKey = "76e79cc95d1e4b18be961bc9329ae3e5";
    var uriBase =
      "https://emote.cognitiveservices.azure.com//face/v1.0/detect";

    // Request parameters.
    var params = {
      "detectionModel": "detection_01",
      "returnFaceAttributes": "age,gender,emotion,noise",
      "returnFaceId": "false"
    };

    // Display the image.
    var sourceImageUrl = document.getElementById("inputImage").value;
    document.querySelector("#sourceImage").src = sourceImageUrl;

    // Perform the REST API call.
    $.ajax({
      url: uriBase + "?" + $.param(params),

      // Request headers.
      beforeSend: function (xhrObj) {
        xhrObj.setRequestHeader("Content-Type", "application/json");
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
      },

      type: "POST",

      // Request body.
      data: '{"url": ' + '"' + sourceImageUrl + '"}',
    })

      .done(function (data) {
        // Show formatted JSON on webpage.
        console.log(data);
        console.log(data[0].faceAttributes);
        console.log(data[0].faceAttributes.emotion);
        console.log(data[0].faceAttributes.emotion.contempt);
        $("#responseTextArea").val(JSON.stringify(data, null, 2));

        var newEmote = {
          url: sourceImageUrl,
          anger: data[0].faceAttributes.emotion.anger,
          contempt: data[0].faceAttributes.emotion.contempt,
          disgust: data[0].faceAttributes.emotion.disgust,
          fear: data[0].faceAttributes.emotion.fear,
          happiness: data[0].faceAttributes.emotion.happiness,
          neutral: data[0].faceAttributes.emotion.neutral,
          sadness: data[0].faceAttributes.emotion.sadness,
          surprise: data[0].faceAttributes.emotion.surprise
        };
        $.post("/api/emote", newEmote)
          // on success, run this callback
          .then(function (data) {
            // log the data we found
            console.log(data);
            // tell the user we're adding a character with an alert window
            alert("Adding Emote...");
          });
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        // Display error message.
        var errorString = (errorThrown === "") ?
          "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ?
          "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
            jQuery.parseJSON(jqXHR.responseText).message :
            jQuery.parseJSON(jqXHR.responseText).error.message;
        alert(errorString);
      });
  }

  );
});

// $("#saveButton").on("click", function (event) {
//   event.preventDefault();

//   // make a newCharacter obj
//   var newEmote = {
//     url: ,
//     anger: ,
//     contempt: ,
//     disgust: ,
//     fear: ,
//     happiness: ,
//     neutral: ,
//     sadness: ,
//     surprise:
//       // name from name input
//       name: $("#name").val().trim(),
//     // role from role input
//     role: $("#role").val().trim(),
//     // age from age input
//     age: $("#age").val().trim(),
//     // points from force-points input
//     forcePoints: $("#force-points").val().trim()
//   };

//   // send an AJAX POST-request with jQuery
//   $.post("/api/new", newEmote)
//     // on success, run this callback
//     .then(function (data) {
//       // log the data we found
//       console.log(data);
//       // tell the user we're adding a character with an alert window
//       alert("Adding Emote...");
//     });

//   // empty each input box by replacing the value with an empty string
//   $("#name").val("");
//   $("#role").val("");
//   $("#age").val("");
//   $("#force-points").val("");

// });