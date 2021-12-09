const $form = document.querySelector('.question-form');
const $result = document.querySelector('.result');

// fetch
let db = {};

const fetchDB = async () => {
  const { db } = await fetch('/db').then(data => data.json());
  return db;
};

const render = async () => {
  db = await fetchDB();
  $form.innerHTML = `${db.stressTestQuestions
    .map(
      ({ id, content, order }) => `
      <div class="question">${id + 1}. ${content}</div>
      <div class="answer">${Array.from(
        { length: db.stressTestChoice.length },
        (_, index) => `<label class="check-button">
          <input type='radio' name='checkpoint${id + 1}'
            value='${order === 'asc' ? index : db.stressTestChoice.length - (index + 1)}'/>
            <span>${db.stressTestChoice[index]}</span>
          </label>`
      ).join('')}</div>`
    )
    .join('')}
      <div class="submit-box">
        <button class="submit-btn">Test</button>
      </div>`;
};

document.addEventListener('DOMContentLoaded', render);

$form.onsubmit = async e => {
  e.preventDefault();

  const formData = [...new FormData($form)];

  if (formData.length < db.stressTestQuestions.length) return;

  const data = await fetch('/result', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(formData.map(data => +data[1])),
  }).then(data => data.json());

  $form.style.display = 'none';
  // $result.style.display = 'block'

  $result.innerHTML = `<div>점수 : ${data.result}</div><div>${data.message}</div>`;
};
