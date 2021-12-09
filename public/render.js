const $form = document.querySelector('.question-form');

// fetch
const render = async () => {
  const { db } = await fetch('/db').then(data => data.json());

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
