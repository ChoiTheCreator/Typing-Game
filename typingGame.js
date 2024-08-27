const GAME_TIME = 9;
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];

const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

init();

function init() {
  buttonChange('게임로딩중...');
  getWords();
  wordInput.addEventListener('input', checkMatch);
}

//게임 실행
function run() {
  if (isPlaying) {
    return;
  }
  isPlaying = true;
  time = GAME_TIME;
  wordInput.focus(); //얘 위치를 if문 위에 둬야할듯
  scoreDisplay.innerText = 0;
  timeInterval = setInterval(countDown, 1000);
  checkInterval = setInterval(checkStatus, 50);
  buttonChange('게임중');
}

function checkStatus() {
  if (!isPlaying && time === 0) {
    buttonChange('게임시작');
    clearInterval(checkInterval);
  }
}

//단어 불러오기
function getWords() {
  // Make a request for a user with a given ID
  axios
    .get('https://random-word-api.herokuapp.com/word?number=100')
    .then(function (response) {
      // handle success
      response.data.forEach((word) => {
        if (word.length < 10) {
          words.push(word);
        }
      });
      buttonChange('게임시작');
      console.log(words);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

//단어 일치 체크
function checkMatch() {
  if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
    wordInput.value = '';
    if (!isPlaying) {
      return;
    }
    score++;
    scoreDisplay.innerText = score;
    time = GAME_TIME;
    const randomIndex = Math.floor(Math.random() * words.length);
    wordDisplay.innerText = words[randomIndex];
  }
}

function countDown() {
  time > 0 ? time-- : (isPlaying = false);
  timeDisplay.innerText = time;
  if (!isPlaying) {
    clearInterval(timeInterval);
  }
}

function buttonChange(text) {
  button.innerText = text;
  text === '게임시작'
    ? button.classList.remove('loading')
    : button.classList.add('loading');
}
