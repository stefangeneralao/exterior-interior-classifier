const express = require('express');
const path = require('path');

const app = express();

app.use('/exterior-interior', express.static(path.resolve(__dirname, '../build')));

const port = 3000;
app.listen(port, () => {
  console.log(`Listening to port ${ port }.`);
});