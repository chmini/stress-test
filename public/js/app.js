const STANDARD = 700;
const $icon = document.querySelector('.scroll-icon');

const throttle = (callback, delay) => {
  let timerId;

  return event => {
    if (timerId) return;
    timerId = setTimeout(
      () => {
        callback(event);
        timerId = null;
      },
      delay,
      event
    );
  };
};

document.addEventListener(
  'scroll',
  throttle(() => {
    window.pageYOffset >= STANDARD ? ($icon.style.display = 'block') : ($icon.style.display = 'none');
  }, 100)
);

$icon.onclick = () => {
  window.scrollTo(0, 0);
};
