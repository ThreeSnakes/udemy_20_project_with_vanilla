const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song Titles
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
let songIndex = 2;

// Update song details
const loadSong = (song) => {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
};

const playSong = () => {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fa').classList.remove('fa-play');
  playBtn.querySelector('i.fa').classList.add('fa-pause');

  audio.play();
};

const pauseSong = () => {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fa').classList.add('fa-play');
  playBtn.querySelector('i.fa').classList.remove('fa-pause');

  audio.pause();
};

// Previous song
const prevSong = () => {
  songIndex--;
  if (songIndex < 0)
    songIndex = songs.length - 1;
  loadSong(songs[songIndex]);

  playSong();
}

// Next song
const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1)
    songIndex = 0;
  loadSong(songs[songIndex]);

  playSong();
}

const updateProgress = (e) => {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
};

const setProgress = (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  
  audio.currentTime = (clickX / width) * duration;
};

// Initially load song details into Dom
loadSong(songs[songIndex]);

// Event Listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying)
    pauseSong();
  else
    playSong();
});

// Change Song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time / song update
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);

// Click on porgress bar
progressContainer.addEventListener('click', setProgress);