import express from 'express'
import router from './routes/index'
import bodyParser from 'body-parser';
import cors from 'cors';

var request = require("request");
// Set up the express app
const app = express();
// get all todos

app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.get('/api/accode/:id', (req, res) => {
// });
const PORT = 5000;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});