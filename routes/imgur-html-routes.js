app.post('/upload', upload.single('photo'), (req, res) => {
  if (req.file) {
    res.json(req.file);
  } else {
    throw 'error';
  }
});