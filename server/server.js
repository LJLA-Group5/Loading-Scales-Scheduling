/* eslint-disable no-console */

// const mongoose = require('mongoose');
const app = require('./index.js');

const port = 3002;
// mongoose.connect('mongodb://localhost/FEC', { useNewUrlParser: true });

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

//testing