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