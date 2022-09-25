let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');
let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');
let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');
let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img: './assets/img/betternow.jpg',
        artist: 'Post Malone',
        name: 'Better Now',
        music: './assets/audio/betternow.mp3'
    },
    {
        img: './assets/img/dywc.jpg',
        artist: 'Swedish House Mafia',
        name: 'Dont You Worry Child',
        music: './assets/audio/dywc.mp3'
    },
    {
        img: './assets/img/fv.jpg',
        artist: 'Thiaguinho',
        name: 'Falta Você',
        music: './assets/audio/fv.mp3'
    },
    {
        img: './assets/img/hb.jpg',
        artist: 'Post Malone',
        name: 'Take What You Want',
        music: './assets/audio/twyw.mp3'
    },
    {
        img: './assets/img/diaazul.jpg',
        artist: 'Teto',
        name: 'Dia Azul',
        music: './assets/audio/diaazul.mp3'
    },
    {
        img: './assets/img/payphone.jpg',
        artist: 'Maroon 5',
        name: 'Payphone',
        music: './assets/audio/payphone.mp3'
    },
    {
        img: './assets/img/mlsd.jpg',
        artist: 'Grupo Menos é Mais',
        name: 'Melhor eu ir/Ligando os Fatos...',
        music: './assets/audio/mlsd.mp3'
    },
    {
        img: './assets/img/hb.jpg',
        artist: 'Post Malone',
        name: 'Goodbyes',
        music: './assets/audio/goodbyes.mp3'
    },
    {
        img: './assets/img/maps.jpg',
        artist: 'Maroon 5',
        name: 'Maps',
        music: './assets/audio/maps.mp3'
    },
    {
        img: './assets/img/hb.jpg',
        artist: 'Post Malone',
        name: 'I´m Gonna Be',
        music: './assets/audio/igb.mp3'
    }
];

loadTrack(track_index);

function loadTrack(track_index) {
    clearInterval(updateTimer);
    reset();
    curr_track.src = music_list[track_index].music;
    curr_track.load();
    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_artist.textContent = music_list[track_index].artist;
    track_name.textContent = music_list[track_index].name;
    now_playing.textContent = (track_index + 1) + " de " + music_list.length;
    updateTimer = setInterval(setUpdate, 1000);
    curr_track.addEventListener('ended', nextTrack);
}

function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "0:00";
    seek_slider.value = 0;
}

function randomTrack() {
    isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
    isRandom = true;
    randomIcon.classList.add('randomActive');
}

function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}

function repeatTrack() {
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}

function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

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

function prevTrack() {
    if (track_index > 0) {
        track_index -= 1;
    } else {
        track_index = music_list.length - 1;
    }
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function setUpdate() {
    let seekPosition = 0;
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}