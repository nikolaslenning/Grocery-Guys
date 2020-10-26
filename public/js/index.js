// var imageAPI = "https://api.imgur.com/3/album/" + albumID + "/images";

// $.ajax({
//   url: imageAPI,
//   type: 'POST',
//   dataType: 'json',
//   success: function(data) {

//     alert(data[0].link);

//   },
//   error: function() {
//     console.log("ERRORZ");
//   },
//   beforeSend: setHeader
// });

// https://gist.github.com/bmcbride/7577e6aed5ce962776ca
$("document").ready(function () {

  $('input[type=file]').on("change", function () {

    var $files = $(this).get(0).files;

    if ($files.length) {

      // Reject big files
      if ($files[0].size > $(this).data("max-size") * 1024) {
        console.log("Please select a smaller file");
        return false;
      }

      // API key === clientId
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
          $('body').append('<img src="' + res.data.link + '" />');
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
});