const $form = document.querySelector('.question-form');
const $result = document.querySelector('.result');

$form.onsubmit = async e => {
  e.preventDefault();

  const data = await fetch('/result', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify([...new FormData($form)].map(data => +data[1])),
  }).then(data => data.json());

  // console.log(datas);
  $form.style.display = 'none';
  // $result.style.display = 'block'

  $result.innerHTML = `<div>점수 : ${data.result}</div><div>${data.message}</div>`;
};
