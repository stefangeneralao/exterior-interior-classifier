const express = require('express');
const cors = require('cors');
const predictionRouter = require('./predictionRouter.js');

const port = 3001;
const app = express();
app.use(cors());
app.use('/public', express.static(__dirname + '/uploads'));
app.use('/prediction', predictionRouter);
app.get('/', (_req, res) => {
  res.send('hello');
});
app.listen(port, () => {
  console.log(`Server listening on port ${ port }.`);
});