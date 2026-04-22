(function () {
  'use strict';

  const GAME_CHOICES = ['batu', 'gunting', 'kertas'];
  const GESTURE_SYMBOLS = {
    batu: '<svg style="display:inline-block;vertical-align:middle" width="1.2em" height="1.2em" viewBox="0 0 32 32" fill="currentColor"><path d="M 16 6 C 14.9375 6 14.003906 6.5625 13.46875 7.40625 C 13.03125 7.15625 12.535156 7 12 7 C 10.355469 7 9 8.355469 9 10 L 9 13.65625 L 8.875 13.8125 C 8.800781 13.898438 8.730469 13.976563 8.65625 14.0625 C 8.144531 14.660156 7.65625 15.292969 7.21875 15.9375 L 6.90625 16.34375 C 6.480469 16.894531 6.21875 17.535156 6.09375 18.1875 C 6.078125 18.261719 6.042969 18.332031 6.03125 18.40625 C 5.855469 19.652344 6.226563 20.949219 7.09375 21.9375 L 9.46875 24.625 C 10.796875 26.136719 12.707031 27 14.71875 27 L 20 27 C 23.855469 27 27 23.855469 27 20 L 27 11 C 27 9.355469 25.644531 8 24 8 C 23.464844 8 22.96875 8.15625 22.53125 8.40625 C 21.996094 7.5625 21.0625 7 20 7 C 19.464844 7 18.96875 7.15625 18.53125 7.40625 C 17.996094 6.5625 17.0625 6 16 6 Z M 16 8 C 16.566406 8 17 8.433594 17 9 L 17 11.1875 C 16.683594 11.074219 16.351563 11 16 11 L 15 11 L 15 9 C 15 8.433594 15.433594 8 16 8 Z M 12 9 C 12.566406 9 13 9.433594 13 10 L 13 11 L 11.59375 11 L 11.3125 11.28125 C 11.3125 11.28125 11.085938 11.511719 11 11.59375 L 11 10 C 11 9.433594 11.433594 9 12 9 Z M 20 9 C 20.566406 9 21 9.433594 21 10 L 21 13 C 21 13.566406 20.566406 14 20 14 C 19.433594 14 19 13.566406 19 13 L 19 10 C 19 9.433594 19.433594 9 20 9 Z M 24 10 C 24.566406 10 25 10.433594 25 11 L 25 13 C 25 13.566406 24.566406 14 24 14 C 23.433594 14 23 13.566406 23 13 L 23 11 C 23 10.433594 23.433594 10 24 10 Z M 12.4375 13 L 16 13 C 16.5625 13 17 13.4375 17 14 C 17 14.5625 16.5625 15 16 15 L 12.875 15 L 12.59375 15.375 L 10.25 18.34375 L 11.8125 19.59375 L 13.65625 17.28125 C 14.015625 17.449219 14.425781 17.699219 14.875 18.0625 C 15.941406 18.929688 17 20.347656 17 23 L 19 23 C 19 20.132813 17.855469 18.15625 16.59375 16.9375 C 17.402344 16.769531 18.101563 16.273438 18.53125 15.59375 C 18.96875 15.84375 19.464844 16 20 16 C 20.765625 16 21.46875 15.699219 22 15.21875 C 22.53125 15.699219 23.234375 16 24 16 C 24.351563 16 24.683594 15.925781 25 15.8125 L 25 20 C 25 22.773438 22.773438 25 20 25 L 14.71875 25 C 13.28125 25 11.917969 24.394531 10.96875 23.3125 L 8.59375 20.59375 C 8.164063 20.105469 7.964844 19.507813 8 18.90625 C 8 18.898438 8.027344 18.832031 8.03125 18.8125 C 8.035156 18.78125 8.027344 18.75 8.03125 18.71875 C 8.078125 18.5 8.230469 18.078125 8.5625 17.53125 C 8.605469 17.460938 8.671875 17.382813 8.71875 17.3125 L 10.1875 15.375 C 11.292969 14.082031 12.214844 13.210938 12.4375 13 Z"/></svg>',
    gunting: '<svg style="display:inline-block;vertical-align:middle" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/></svg>',
    kertas: '<svg style="display:inline-block;vertical-align:middle" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>'
  };

  function randomChoice() {
    return GAME_CHOICES[Math.floor(Math.random() * GAME_CHOICES.length)];
  }

  function determineWinner(player, opponent) {
    if (player === opponent) {
      return { status: 'seri', pesan: 'SERI — ' + player.toUpperCase() };
    }
    const WINNING_MOVES = { batu: 'gunting', gunting: 'kertas', kertas: 'batu' };
    if (WINNING_MOVES[player] === opponent) {
      return { status: 'menang', pesan: 'KAMU MENANG!' };
    }
    return { status: 'kalah', pesan: 'KAMU KALAH!' };
  }

  const playerScoreEl = document.getElementById('score-player');
  const systemScoreEl = document.getElementById('score-system');
  const DISPLAY_PLAYER = document.getElementById('display-player');
  const DISPLAY_OPPONENT = document.getElementById('display-opponent');
  const RESULT_TEXT = document.getElementById('final-result');
  const buttonBack = document.getElementById('back-menu');
  const CHOICE_CARDS = document.querySelectorAll('.choice-card');

  const STAT_WIN = document.getElementById('stat-win');
  const STAT_LOSE = document.getElementById('stat-lose');
  const STAT_DRAW = document.getElementById('stat-draw');

  let userScore = 0;
  let comScore = 0;
  let winCount = 0;
  let loseCount = 0;
  let drawCount = 0;

  function updateScore() {
    if (playerScoreEl) playerScoreEl.textContent = userScore;
    if (systemScoreEl) systemScoreEl.textContent = comScore;
  }

  function updateStats() {
    if (STAT_WIN) STAT_WIN.textContent = winCount;
    if (STAT_LOSE) STAT_LOSE.textContent = loseCount;
    if (STAT_DRAW) STAT_DRAW.textContent = drawCount;
  }

  function clearChoices() {
    CHOICE_CARDS.forEach(function (card) {
      card.classList.remove('selected');
    });
  }

  CHOICE_CARDS.forEach(function (card) {
    card.addEventListener('click', function () {
      const userChoice = card.getAttribute('data-choice');
      const comChoice = randomChoice();

      clearChoices();
      card.classList.add('selected');

      if (DISPLAY_PLAYER) {
        DISPLAY_PLAYER.innerHTML = GESTURE_SYMBOLS[userChoice];
        DISPLAY_PLAYER.classList.add('active');
      }

      if (DISPLAY_OPPONENT) {
        DISPLAY_OPPONENT.textContent = '...';
        DISPLAY_OPPONENT.classList.remove('appear');

        setTimeout(function () {
          DISPLAY_OPPONENT.innerHTML = GESTURE_SYMBOLS[comChoice];
          DISPLAY_OPPONENT.classList.add('appear');

          const matchResult = determineWinner(userChoice, comChoice);

          if (RESULT_TEXT) {
            RESULT_TEXT.className = 'result-text font-display font-extrabold text-sm sm:text-base tracking-wider';
            RESULT_TEXT.textContent = matchResult.pesan;

            if (matchResult.status === 'menang') {
              userScore++;
              winCount++;
              RESULT_TEXT.classList.add('win-text');
            } else if (matchResult.status === 'kalah') {
              comScore++;
              loseCount++;
              RESULT_TEXT.classList.add('lose-text');
            } else {
              drawCount++;
              RESULT_TEXT.classList.add('draw-text');
            }

            updateScore();
            updateStats();
          }
        }, 400);
      }
    });
  });

  if (buttonBack) {
    buttonBack.addEventListener('click', function () {
      window.location.href = '/#menu';
    });
  }

  function attemptFullscreen() {
    const isMobile = window.innerWidth <= 1024;
    const isPortrait = window.innerHeight > window.innerWidth;
    const docEl = document.documentElement;
    const requestMethod = docEl.requestFullscreen || docEl.webkitRequestFullScreen || docEl.mozRequestFullScreen || docEl.msRequestFullscreen;
    
    if (isMobile && !isPortrait && requestMethod && !document.fullscreenElement) {
      requestMethod.call(docEl).catch(function(e) {});
    }
  }

  document.addEventListener('click', attemptFullscreen);
  document.addEventListener('touchstart', attemptFullscreen, {passive: true});

  const LOCK_SCREEN = document.getElementById('lock-screen');

  function checkOrientation() {
    if (!LOCK_SCREEN) return;
    const isPhone = window.innerWidth <= 1024;
    const isPortrait = window.innerHeight > window.innerWidth;
    LOCK_SCREEN.style.display = (isPhone && isPortrait) ? 'flex' : 'none';
  }

  window.addEventListener('resize', checkOrientation);
  window.addEventListener('orientationchange', function () { setTimeout(checkOrientation, 100); });
  checkOrientation();

})();