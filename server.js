const db = require('./db.js');

const express = require('express');

const app = express();
const PORT = 5500;

let results = [];

const messages = [
  '정상적인 스트레스 상태로 스트레스 요인 자체가 심각하지 않거나 좋은 스트레스로 받아들인 경우이다.',
  '이미 스트레스의 영향을 받기 시작한 상태. 지속되면 나쁜 스트레스의 결과가 나타날 수 있다.',
  '정신질환으로 발전될 가능성이 높아진 상태이다.',
  '전문가의 도움이 필요하다.',
];

const checkStress = newResult => {
  if (newResult <= 13) {
    return messages[0];
  }
  if (newResult > 13 && newResult < 17) {
    return messages[1];
  }
  if (newResult >= 17 && newResult < 19) {
    return messages[2];
  }
  return messages[3];
};

app.use(express.static('public'));
app.use(express.json());

app.get('/db', (req, res) => {
  res.send(db);
});

app.post('/result', (req, res) => {
  const data = req.body;
  const newResult = data.reduce((sum, num) => sum + num, 0);

  results = [...results, newResult];

  console.log(results);

  res.send({ result: newResult, message: checkStress(newResult) });
});

app.listen(PORT, () => {
  console.log(`✔ Listening on : http://localhost:${PORT}`);
});
