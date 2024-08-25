//사용 변수 설정
let wordInput = $('.word-input');
let wordDisplay = $('.word-displayment');

// 점수 관련  변수
let score = 0;
let scoreDisplay = $('.score');

//게임 진행 상황
let isplaying = false;

//시간 관련 변수
let timeDisplay = $('.time-num');
let initTime = 9;

//버튼 관련 변수
const btnDisplay = $('.game-btn');

//시간 인터벌 변수 (타이머 객체)
let timeInterval;

//#1. display text와 input text 비교 + 맞다면 점수 부여.
wordInput.on('input', function () {
  console.log(
    wordInput.val().toLowerCase() == wordDisplay.text().toLowerCase()
  );

  if (wordInput.val().toLowerCase() == wordDisplay.text().toLowerCase()) {
    score++;
    scoreDisplay.html(score);
    wordInput = ' ';
  }
});

//#2. 남은 시간대를 다루자.
function countDown() {
  initTime > 0 ? initTime-- : (isplaying = false);
  if (!isplaying) {
    //타이머 클리어
    clearInterval(timeInterval);
  }
  // 실시간으로 시간의 변화를 찍혀나와야하니까
  timeDisplay.html(initTime);
}

//#3. 시작버튼을 누를시의 대한 변화를 다루자.

//html 버튼에다가 온클릭시 실행되게 설계한 함수 + 타이머 생성함수

function run() {
  isplaying = true;
  //콜백 함수 countDown 활용
  timeInterval = setInterval(countDown, 1000);
}

function buttonChange(text) {
  btnDisplay.html(text);
  if (text === '게임시작') {
    btnDisplay.removeClass('game-loading');
  } else {
    btnDisplay.addClass('game-loading');
  }
}
buttonChange('게임시작');

// 버튼 클릭 이벤트 추가
btnDisplay.on('click', function () {
  if (!isplaying) {
    initTime = 9; // 게임 시작 시 시간 초기화
    score = 0; // 점수 초기화
    scoreDisplay.html(score); // 점수 표시 초기화
    wordInput.val(''); // 입력 필드 초기화
    run(); // 게임 시작
    buttonChange('게임진행중'); // 버튼 텍스트 변경
  }
});
