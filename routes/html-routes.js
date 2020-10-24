var path = require("path");

module.exports = function (app) {

  app.get("/", function(req, res) {
    console.log("hit get route");
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });
//   app.get("/", function (req, res) {
//     // If the user already has an account send them to the members page
//     if (req.user) {
//       res.redirect("/members");
//     }
//     res.sendFile(path.join(__dirname, "../public/signup.html"));
//   });
};