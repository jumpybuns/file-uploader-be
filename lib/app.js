const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
const UploadFile = require('./models/UploadFile');

app.use(cors());
app.use(fileUpload());
app.use(express.json());

//Upload Endpoint
app.post('/uploads', (req, res) => {

  UploadFile
    .insert(req.body)
    .then(uploadfile => res.send(uploadfile));

  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  file.mv(`${__dirname}/client/public/upload/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

app.get('/uploads', (req, res) => {
  UploadFile
    .find()
    .then(uploadfile => res.send(uploadfile));
})

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
