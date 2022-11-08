const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');

// morgan 미들웨어는 HTTP 요청 log를 편리하게 남길 수 있도록 해줌
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

const port = 4000;

const userInfoRouter = require('./router/userInfoRouter');
app.use('/userinfo', userInfoRouter);

const localData = require('./data/data');
app.get('/', (req, res) => {
  res.status(200).send(localData);
});

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: 'Internet Server Error',
    stacktrace: err.toString(),
  });
});

app.listen(port, () => {
  console.log(`Side Project 1 Server On | http://localhost:${port}`);
});

module.exports = app;
