import storage from './storage.js';

const $form = document.querySelector('.question-form');

// render
$form.innerHTML = `${storage.stressTestQuestions
  .map(
    ({ id, content, order }) => `
  <div class="question">${id + 1}. ${content}</div>
  <div class="answer">${Array.from(
    { length: storage.stressTestChoice.length },
    (_, index) => `<label class="check-button">
      <input type='radio' name='checkpoint${id + 1}' 
        value='${order === 'asc' ? index : storage.stressTestChoice.length - index}'/>
        <span>${storage.stressTestChoice[order === 'asc' ? index : storage.stressTestChoice.length - index]}</span>
      </label>`
  ).join('')}</div>`
  )
  .join('')}
  <div class="submit-box">
    <button class="submit-btn">Test</button>
  </div>`;
