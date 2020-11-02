const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});

//https://medium.com/@nitinpatel_20236/image-upload-via-nodejs-server-3fe7d3faa642
app.post('/upload', upload.single('photo'), (req, res) => {
  if (req.file) {
    res.json(req.file);
  } else {
    throw 'error';
  }
});