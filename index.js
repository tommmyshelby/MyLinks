'use strict';

const music = {
    title: 'BURN THE BRIDGE',
    artist: 'NEFFEX',
    file: 'assets/audio/burn-the-bridge.mp3',
    defaultVolume: 0.5
};

const $ = (id) => document.getElementById(id);

const els = {
    welcomeScreen: $('welcome-screen'),
    enterButton: $('enter-button'),
    audio: $('audio'),
    playButton: $('play-button'),
    seek: $('seek'),
    volume: $('volume'),
    volumeButton: $('volume-button'),
    currentTime: $('current-time'),
    duration: $('duration'),
    title: $('track-title'),
    artist: $('track-artist')
};

let lastVolume = music.defaultVolume;

function formatTime(seconds) {
    if (!Number.isFinite(seconds)) {
        return '0:00';
    }

    const minutes = Math.floor(seconds / 60);
    const rest = String(Math.floor(seconds % 60)).padStart(2, '0');

    return `${minutes}:${rest}`;
}

function updateRange(element) {
    const min = Number(element.min) || 0;
    const max = Number(element.max) || 100;
    const percent = ((Number(element.value) - min) / (max - min)) * 100;

    element.style.background = `linear-gradient(to right, #a78bfa 0%, #8b5cf6 ${percent}%, rgba(255, 255, 255, 0.1) ${percent}%, rgba(255, 255, 255, 0.1) 100%)`;
}

function loadVolume() {
    try {
        const saved = localStorage.getItem('tommy-volume');
        const volume = Number(saved);

        if (saved === null || Number.isNaN(volume) || volume < 0 || volume > 1) {
            return music.defaultVolume;
        }

        return volume;
    } catch {
        return music.defaultVolume;
    }
}

function saveVolume(volume) {
    try {
        localStorage.setItem('tommy-volume', String(volume));
    } catch {
        return;
    }
}

function updatePlayButton() {
    const playing = !els.audio.paused;

    els.playButton.classList.toggle('playing', playing);
    els.playButton.setAttribute('aria-label', playing ? 'Musik pausieren' : 'Musik abspielen');
}

function updateVolumeButton() {
    const muted = els.audio.muted || els.audio.volume === 0;

    els.volumeButton.classList.toggle('muted', muted);
    els.volumeButton.setAttribute('aria-label', muted ? 'Ton einschalten' : 'Ton ausschalten');
}

function togglePlay() {
    if (els.audio.paused) {
        els.audio.play().catch((error) => console.warn('Audio konnte nicht gestartet werden:', error));
    } else {
        els.audio.pause();
    }
}

function toggleMute() {
    if (els.audio.muted || els.audio.volume === 0) {
        const restored = lastVolume > 0 ? lastVolume : music.defaultVolume;

        els.audio.muted = false;
        els.audio.volume = restored;
        els.volume.value = restored;
        updateRange(els.volume);
    } else {
        lastVolume = els.audio.volume;
        els.audio.muted = true;
    }

    updateVolumeButton();
}

function changeVolume() {
    const value = Number(els.volume.value);

    els.audio.volume = value;
    els.audio.muted = false;
    lastVolume = value;

    saveVolume(value);
    updateRange(els.volume);
    updateVolumeButton();
}

function seek() {
    if (!els.audio.duration) {
        return;
    }

    els.audio.currentTime = (Number(els.seek.value) / 100) * els.audio.duration;
    updateRange(els.seek);
}

function updateProgress() {
    if (!els.audio.duration) {
        return;
    }

    els.seek.value = (els.audio.currentTime / els.audio.duration) * 100;
    els.currentTime.textContent = formatTime(els.audio.currentTime);
    updateRange(els.seek);
}

function initAudio() {
    const volume = loadVolume();

    els.title.textContent = music.title;
    els.artist.textContent = music.artist;
    els.audio.src = music.file;
    els.audio.volume = volume;
    els.volume.value = volume;
    lastVolume = volume;

    updateRange(els.volume);
    updatePlayButton();
    updateVolumeButton();

    els.playButton.addEventListener('click', togglePlay);
    els.volumeButton.addEventListener('click', toggleMute);
    els.volume.addEventListener('input', changeVolume);
    els.seek.addEventListener('input', seek);

    els.audio.addEventListener('timeupdate', updateProgress);
    els.audio.addEventListener('loadedmetadata', () => {
        els.duration.textContent = formatTime(els.audio.duration);
    });
    els.audio.addEventListener('play', updatePlayButton);
    els.audio.addEventListener('pause', updatePlayButton);
    els.audio.addEventListener('error', () => {
        console.error('Musikdatei konnte nicht geladen werden:', music.file);
        els.artist.textContent = 'Musikdatei nicht gefunden';
    });
}

function enterWebsite() {
    document.body.classList.remove('locked');
    els.welcomeScreen.classList.add('hidden');
    els.audio.play().catch(() => {});
}

function init() {
    document.body.classList.add('locked');

    lucide.createIcons();
    initAudio();

    els.enterButton.addEventListener('click', enterWebsite, { once: true });
}

init();
