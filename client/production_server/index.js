const express = require('express');
const path = require('path');

const port = 3000;
const buildPath = path.resolve(__dirname, '../build');

const app = express();
app.use(['/exterior-interior', '/'], express.static(buildPath));

app.listen(port, () => {
  console.log(`Listening to port ${ port }.`);
});