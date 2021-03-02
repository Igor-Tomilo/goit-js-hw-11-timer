const colors = [
  '#FFFFFF',
  '#2196F3',
  '#4CAF50',
  '#FF9800',
  '#009688',
  '#795548',
];

const maxNumber = colors.length - 1;
const startBtn = document.querySelector('[data-action=start]');
const stopBtn = document.querySelector('[data-action=stop]');

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let itemID = null;
let isBgColorSwithOn = false;

const onStartBtnClick = () => {
  if (isBgColorSwithOn) {
    return;
  }

  isBgColorSwithOn = true;
  itemID = setInterval(() => {
    const randomNum = randomIntegerFromInterval(0, maxNumber);
    document.body.style.backgroundColor = `${colors[randomNum]}`;
  }, 1000);
};

const onStopBtnClick = () => {
  clearInterval(itemID);
  isBgColorSwithOn = false;
};

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);
