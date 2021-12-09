const $form = document.querySelector('.question-form');

const stressTestQuestions = [
  {
    id: 0,
    content: '예상치 못했던 일 때문에 당황했던 적이 얼마나 있었습니까?',
    order: 'asc',
  },
  {
    id: 1,
    content: '인생에서 중요한 일들을 조절할 수 없다는 느낌을 얼마나 경험하였습니까?',
    order: 'asc',
  },
  {
    id: 2,
    content: '신경이 예민해지고 스트레스를 받고 있다는 느낌을 얼마나 경험하였습니까?',
    order: 'asc',
  },
  {
    id: 3,
    content: '당신의 개인적인 문제들을 다루는데 있어서 얼마나 자주 자신감을 느꼈습니까?',
    order: 'desc',
  },
  {
    id: 4,
    content: '일상의 일들이 당신의 생각대로 진행되고 있다는 느낌을 얼마나 경험하였습니까?',
    order: 'desc',
  },
  {
    id: 5,
    content: '당신이 꼭 해야 하는 일을 처리할 수 없다고 생각한 적이 얼마나 있었습니까?',
    order: 'asc',
  },
  {
    id: 6,
    content: '일상생활의 짜증을 얼마나 자주 잘 다스릴 수 있었습니까?',
    order: 'desc',
  },
  {
    id: 7,
    content: '최상의 컨디션이라고 얼마나 자주 느끼셨습니까?',
    order: 'desc',
  },
  {
    id: 8,
    content: '당신이 통제할 수 없는 일 때문에 화가 난 경험이 얼마나 있었습니까?',
    order: 'asc',
  },
  {
    id: 9,
    content: '어려운 일들이 너무 많이 쌓여서 극복하지 못할 것 같은 느낌을 얼마나 자주 경험하였습니까?',
    order: 'asc',
  },
];

const stressTestChoice = ['전혀 없었다', '거의 없었다', '때때로 있었다', '자주 있었다', '매우 자주 있었다'];

// render
$form.innerHTML = `${stressTestQuestions
  .map(
    ({ id, content, order }) => `
  <div class="question">${id + 1}. ${content}</div>
  <div class="answer">${Array.from(
    { length: stressTestChoice.length },
    (_, index) => `<label class="check-button">
      <input type='radio' name='checkpoint${id + 1}' 
        value='${order === 'asc' ? index : stressTestChoice.length - index}'/>
        <span>${stressTestChoice[order === 'asc' ? index : stressTestChoice.length - index]}</span>
      </label>`
  ).join('')}</div>`
  )
  .join('')}
  <div class="submit-box">
    <button class="submit-btn">Test</button>
  </div>`;

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
