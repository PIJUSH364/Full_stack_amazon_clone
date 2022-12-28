const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDb = require('./config/dbConnect');
const userHandler = require('./router/userHandler');

const app = express();
app.use(express.json());
app.use(cors());

// connect with dataBase
connectDb();

// serving the frontEnd
app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', function (_, res) {
  res.sendFile(
    path.join(__dirname, './client/build/index.html'),
    function (err) {
      res.status(500).send(err);
    }
  );
});

// all router
app.get('/', (req, res) => {
  res.send(`app running on ${process.env.PORT}`);
});

app.use('/user', userHandler);

// default error handler...
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`app listen port ${process.env.PORT}`)
);
