// Query Selectors
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let randomIcon = document.querySelector(".fa-random");
let curr_track = document.createElement("audio");

// Track Index
let track_index = 0;

// Playing
let isPlaying = false;

// Random
let isRandom = false;

// Update Timer
let updateTimer;

// Create the list of tracks
const music_list = [
  {
    img: "./assets/img/music/betternow.jpg",
    name: "Better Now",
    artist: "Post Malone",
    music: "./assets/audio/betternow.mp3",
  },
  {
    img: "./assets/img/music/dywc.jpg",
    name: "Don't You Worry Child",
    artist: "Swedish House Mafia",
    music: "./assets/audio/dywc.mp3",
  },
  {
    img: "./assets/img/music/coopedup.jpg",
    name: "Cooped Up",
    artist: "Post Malone, Roddy Ricch",
    music: "./assets/audio/coopedup.mp3",
  },
  {
    img: "./assets/img/music/payphone.jpg",
    name: "Payphone",
    artist: "Maroon 5, Wiz Khalifa",
    music: "./assets/audio/payphone.mp3",
  },
  {
    img: "./assets/img/music/hb.jpg",
    name: "Take What You Want",
    artist: "Post Malone, Ozzy Osbourne, Travis Scott",
    music: "./assets/audio/twyw.mp3",
  },
  {
    img: "./assets/img/music/ballin.jpg",
    name: "Ballin'",
    artist: "Mustard, Roddy Ricch",
    music: "./assets/audio/ballin.mp3",
  },
  {
    img: "./assets/img/music/hb.jpg",
    name: "Goodbyes",
    artist: "Post Malone, Young Thug",
    music: "./assets/audio/goodbyes.mp3",
  },
  {
    img: "./assets/img/music/maps.jpg",
    name: "Maps",
    artist: "Maroon 5",
    music: "./assets/audio/maps.mp3",
  },
  {
    img: "./assets/img/music/unforgettable.jpg",
    name: "Unforgettable",
    artist: "French Montana, Swae Lee",
    music: "./assets/audio/unforgettable.mp3",
  },
  {
    img: "./assets/img/music/hb.jpg",
    name: "I'm Gonna Be",
    artist: "Post Malone",
    music: "./assets/audio/igb.mp3",
  },
  {
    img: "./assets/img/music/ewtrtw.jpg",
    name: "Everybody Wants To Rule The World",
    artist: "Tears for Fears",
    music: "./assets/audio/ewtrtw.mp3",
  },
  {
    img: "./assets/img/music/pv.jpg",
    name: "Pra Você",
    artist: "Onze:20",
    music: "./assets/audio/pv.mp3",
  },
  {
    img: "./assets/img/music/bl.png",
    name: "Blinding Lights",
    artist: "The Weeknd",
    music: "./assets/audio/bl.mp3",
  },
  {
    img: "./assets/img/music/miracle.jpg",
    name: "Miracle",
    artist: "The Score",
    music: "./assets/audio/miracle.mp3",
  },
];

// Load the first track in the tracklist
loadTrack(track_index);

// Controls Music Function
function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();
  curr_track.src = music_list[track_index].music;
  curr_track.load();
  track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
  track_artist.textContent = music_list[track_index].artist;
  track_name.textContent = music_list[track_index].name;
  now_playing.textContent = track_index + 1 + " of " + music_list.length;
  updateTimer = setInterval(setUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

// Reset Music Function
function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "0:00";
  seek_slider.value = 0;
}

// Random Music Function
function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}

// Play Random Music Function
function playRandom() {
  isRandom = true;
  randomIcon.classList.add("randomActive");
}

// Pause Random Music Function
function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove("randomActive");
}

// Repeat Music Function
function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index);
  playTrack();
}

// Play/Pause Music Function
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

// Play Music Function
function playTrack() {
  curr_track.play();
  isPlaying = true;
  track_art.classList.add("rotate");
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle"></i>';
  document.title = music_list[track_index].name;
}

// Pause Music Function
function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove("rotate");
  playpause_btn.innerHTML = '<i class="fa fa-play-circle"></i>';
  document.title = "Playlist — Gustavo Rodrigues";
}

// Next Music Function
function nextTrack() {
  if (track_index < music_list.length - 1 && isRandom === false) {
    track_index += 1;
  } else if (track_index < music_list.length - 1 && isRandom === true) {
    let random_index = Number.parseInt(Math.random() * music_list.length);
    track_index = random_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}

// Previous Music Function
function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}

// Change Music Time Function
function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

// Change Music Volume Function
function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

// Update Music Time Function
function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
