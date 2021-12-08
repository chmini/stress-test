const express = require('express');

const app = express();
const PORT = 5000;

let results = [];

app.use(express.static('public'));
app.use(express.json());

app.post('/result', (req, res) => {
  const data = req.body;
  results = [...results, data.reduce((sum, num) => sum + num, 0)];

  console.log(results);

  res.send(results);
});

app.listen(PORT, () => {
  console.log(`✔ Listening on : http://localhost:${PORT}`);
});
