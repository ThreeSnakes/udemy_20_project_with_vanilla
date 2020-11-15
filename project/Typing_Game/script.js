const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settigns-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for Game
const words = [
  'Brakus', 'Nolan', 'Borer', 'Adam', 'Nora',
  'Perry', 'Garfield', 'Gregorio', 'Christ', 'Mohamed',
  'Pedro', 'Nico', 'Holden', 'Molly', 'Donna',
  'Eleanore', 'Gus', 'Dorothy', 'Dwight', 'Sienna'
];

// Init word
let randomWord;

// Init scroe
let score = 0;

// Init Timme;
let time = 10;

/// Set Diffiuculty to value is ls or medium
let difiiculty = localStorage.getItem('difficulty') || 'medium';

// Set Difficulty select value
difficultySelect.value = difiiculty;

// Focus on the text
text.focus();

// Game Over, show end screen
const gameOver = () => {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()" style="font-size: 20px;">Reload</button>
  `;
  endgameEl.style.display = 'flex';
}

// Update TIme
const updateTime = () => {
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    // end Gage
    gameOver();
  }
};

// Generate Random word from Array
const getRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

// Add word to Dom
const addWordToDom = () => {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
};

const updateScore = () => {
  score++;
  scoreEl.innerHTML = score;
};

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

addWordToDom();

// Event Listener
// Typing
text.addEventListener('input', (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDom();
    updateScore();

    // Clear
    e.target.value = '';

    time += 3;
    if (difiiculty === 'hard') tiem += 2;
    else if (difiiculty === 'medium') tiem += 3;
    else difiiculty += 5;

    updateTime();
  }
});

// Settings btn click
settingsBtn.addEventListener('click', () => {
  settings.classList.toggle('hide');
});

// Settings select
settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});