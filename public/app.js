const $form = document.querySelector('form');

const questions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

// render
$form.innerHTML += questions
  .map(
    (question, idx) => `
  <div>${question}</div>
  ${Array.from({ length: 5 }, (_, value) => `<input type='radio' name='${idx}' value='${value + 1}'/>`).join('')}`
  )
  .join('');

$form.innerHTML += '<button>제출</button>';

$form.onsubmit = e => {
  e.preventDefault();

  fetch('/result', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify([...new FormData($form)].map(data => +data[1])),
  })
    .then(data => data.json())
    .then(a => console.log(a));
};
