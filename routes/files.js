const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/file');
const { v4: uuidv4 } = require('uuid');
const APP_BASE_URL = process.env.APP_BASE_URL;

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// Configure multer upload limits
const upload = multer({
  storage,
  limits: { fileSize: 1000000 * 100 }, // 100mb
}).single('myfile');

router.post('/', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file found in the request.' });
    }

    try {
      const file = new File({
        filename: req.file.filename,
        uuid: uuidv4(),
        path: req.file.path,
        size: req.file.size,
      });

      const response = await file.save();

      res.json({ file: `${APP_BASE_URL}/files/${response.uuid}` });
    } catch (error) {
      res.status(500).json({ error: 'Error while saving the file.' });
    }
  });
});

module.exports = router;
