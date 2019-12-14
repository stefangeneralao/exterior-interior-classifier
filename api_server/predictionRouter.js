const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');

const classifierURL = (process.env.CLASSIFIER_URL && process.env.CLASSIFIER_PORT) ?
  `${ process.env.CLASSIFIER_URL }:${ process.env.CLASSIFIER_PORT }` :
  'http://localhost:3002';
const uploadsDir = __dirname + '/uploads';
const upload = multer({
  dest: uploadsDir
}).single('image');

const getPrediction = async path => {
  try {
    const { data: prediction } = await axios.get(`${ classifierURL }/${ path }`);
    return prediction;
  } catch (err) {
    throw new Error('Unable to get prediction.');
  }
};

const predictionRouter = express.Router();

predictionRouter.post('/exterior_interior', upload, async (req, res) => {
  console.log('Predicting exterior/interior...');

  const { filename } = req.file;
  try {
    if (!filename) {
      throw new Error('No file.');
    }
    console.log(`Got file: ${ filename }`);

    const prediction = await getPrediction(filename);
    if (!prediction) {
      throw new Error('Prediction failed.');
    }

    console.log(`Prediction: ${ JSON.stringify(prediction) }`);
    res.send(prediction);
  } catch (err) {
    res.sendStatus(500);
    console.error(err.message);
  } finally {
    console.log(`Cleaning: ${ filename }.`);
    fs.unlinkSync(`${ uploadsDir }/${ filename }`);
    console.log('Done.');
  }
});

module.exports = predictionRouter;
