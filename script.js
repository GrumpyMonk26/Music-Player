const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
let duration = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
];

// check if playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "pause");
  music.play();
}

// pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "play");
  music.pause();
}

// play or pause event listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update the Dom
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
  console.log(`now playing: ${song.name}, ${song.displayName}, ${song.artist}`);
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  if (songIndex > 0) {
    songIndex--;
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
  } else {
    console.log("Already at the first song.");
  }
}

// Next Song
function nextSong() {
  if (songIndex < songs.length - 1) {
    songIndex++;
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
  } else {
    console.log("Already at the last song.");
  }
}

// On Load = Select First Song
loadSong(songs[songIndex]);

// Update progress bar & time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    console.log(duration, currentTime);
    // Update progress bar
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }
}

// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
