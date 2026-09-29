'use strict';


/* =========================================================
   KONFIGURATION
========================================================= */

const CONFIG = {

    music: {
        title: 'BURN THE BRIDGE',
        artist: 'NEFFEX',

        /*
         * Deine hochgeladene WAV-Datei hier ablegen:
         *
         * assets/audio/burn-the-bridge.wav
         */
        file: 'assets/audio/burn-the-bridge.wav',

        defaultVolume: 0.5
    }

};


/* =========================================================
   ELEMENTE
========================================================= */

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


/* =========================================================
   PLAYER STATUS
========================================================= */

let lastVolume = CONFIG.music.defaultVolume;


/* =========================================================
   ZEIT FORMATIEREN
========================================================= */

function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {
        return '0:00';
    }

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60)
            .toString()
            .padStart(2, '0');

    return `${minutes}:${remainingSeconds}`;

}


/* =========================================================
   RANGE
========================================================= */

function updateRangeBackground(element) {

    if (!element) {
        return;
    }

    const min = Number(element.min) || 0;

    const max = Number(element.max) || 100;

    const value = Number(element.value) || 0;

    const percentage =
        ((value - min) / (max - min)) * 100;

    element.style.background =
        `linear-gradient(
            to right,
            #a78bfa 0%,
            #8b5cf6 ${percentage}%,
            rgba(255,255,255,0.10) ${percentage}%,
            rgba(255,255,255,0.10) 100%
        )`;

}


/* =========================================================
   LOCAL STORAGE
========================================================= */

function loadVolume() {

    try {

        const saved =
            localStorage.getItem('tommy-volume');

        if (saved === null) {
            return CONFIG.music.defaultVolume;
        }

        const volume = Number(saved);

        if (
            Number.isNaN(volume) ||
            volume < 0 ||
            volume > 1
        ) {
            return CONFIG.music.defaultVolume;
        }

        return volume;

    } catch {

        return CONFIG.music.defaultVolume;

    }

}


function saveVolume(volume) {

    try {

        localStorage.setItem(
            'tommy-volume',
            String(volume)
        );

    } catch {

        // LocalStorage kann blockiert sein.
    }

}


/* =========================================================
   PLAY BUTTON
========================================================= */

function updatePlayButton() {

    const playing =
        !els.audio.paused;

    els.playButton.classList.toggle(
        'playing',
        playing
    );

    els.playButton.setAttribute(
        'aria-label',
        playing
            ? 'Musik pausieren'
            : 'Musik abspielen'
    );

}


/* =========================================================
   VOLUME ICON
========================================================= */

function updateVolumeButton() {

    const muted =
        els.audio.muted ||
        els.audio.volume === 0;

    els.volumeButton.setAttribute(
        'aria-label',
        muted
            ? 'Ton einschalten'
            : 'Ton ausschalten'
    );

}


/* =========================================================
   AUDIO INITIALISIEREN
========================================================= */

function initAudio() {

    els.title.textContent =
        CONFIG.music.title;

    els.artist.textContent =
        CONFIG.music.artist;

    els.audio.src =
        CONFIG.music.file;

    const volume =
        loadVolume();

    els.audio.volume =
        volume;

    lastVolume =
        volume;

    els.volume.value =
        volume;

    updateRangeBackground(
        els.volume
    );

    updatePlayButton();

    updateVolumeButton();


    /* =========================
       PLAY
    ========================= */

    els.playButton.addEventListener(
        'click',
        async () => {

            if (els.audio.paused) {

                try {

                    await els.audio.play();

                } catch (error) {

                    console.warn(
                        'Audio konnte nicht gestartet werden:',
                        error
                    );

                }

            } else {

                els.audio.pause();

            }

        }
    );


    /* =========================
       VOLUME
    ========================= */

    els.volume.addEventListener(
        'input',
        () => {

            const value =
                Number(els.volume.value);

            els.audio.volume =
                value;

            els.audio.muted =
                false;

            lastVolume =
                value;

            saveVolume(value);

            updateRangeBackground(
                els.volume
            );

            updateVolumeButton();

        }
    );


    /* =========================
       MUTE
    ========================= */

    els.volumeButton.addEventListener(
        'click',
        () => {

            if (
                els.audio.muted ||
                els.audio.volume === 0
            ) {

                els.audio.muted =
                    false;

                const restore =
                    lastVolume > 0
                        ? lastVolume
                        : 0.5;

                els.audio.volume =
                    restore;

                els.volume.value =
                    restore;

                updateRangeBackground(
                    els.volume
                );

            } else {

                lastVolume =
                    els.audio.volume;

                els.audio.muted =
                    true;

            }

            updateVolumeButton();

        }
    );


    /* =========================
       SEEK
    ========================= */

    els.seek.addEventListener(
        'input',
        () => {

            if (!els.audio.duration) {
                return;
            }

            const percentage =
                Number(els.seek.value);

            els.audio.currentTime =
                (
                    percentage / 100
                ) *
                els.audio.duration;

            updateRangeBackground(
                els.seek
            );

        }
    );


    /* =========================
       TIME UPDATE
    ========================= */

    els.audio.addEventListener(
        'timeupdate',
        () => {

            if (!els.audio.duration) {
                return;
            }

            const percentage =
                (
                    els.audio.currentTime /
                    els.audio.duration
                ) * 100;

            els.seek.value =
                percentage;

            els.currentTime.textContent =
                formatTime(
                    els.audio.currentTime
                );

            updateRangeBackground(
                els.seek
            );

        }
    );


    /* =========================
       METADATEN
    ========================= */

    els.audio.addEventListener(
        'loadedmetadata',
        () => {

            els.duration.textContent =
                formatTime(
                    els.audio.duration
                );

        }
    );


    /* =========================
       PLAY / PAUSE
    ========================= */

    els.audio.addEventListener(
        'play',
        updatePlayButton
    );

    els.audio.addEventListener(
        'pause',
        updatePlayButton
    );


    /* =========================
       ENDE
    ========================= */

    els.audio.addEventListener(
        'ended',
        () => {

            els.seek.value = 0;

            els.currentTime.textContent =
                '0:00';

            updateRangeBackground(
                els.seek
            );

            updatePlayButton();

        }
    );


    /* =========================
       FEHLER
    ========================= */

    els.audio.addEventListener(
        'error',
        () => {

            console.error(
                'Musikdatei konnte nicht geladen werden:',
                CONFIG.music.file
            );

            els.artist.textContent =
                'Musikdatei nicht gefunden';

        }
    );

}


/* =========================================================
   START SCREEN
========================================================= */

function enterWebsite() {

    document.body.classList.remove(
        'locked'
    );

    els.welcomeScreen.classList.add(
        'hidden'
    );


    /*
     * Browser erlauben Audio normalerweise erst
     * nach einer Benutzeraktion.
     */

    els.audio.play()
        .catch(() => {
            // Falls Autoplay blockiert wird,
            // kann der Nutzer über den Play-Button starten.
        });

}


/* =========================================================
   INITIALISIERUNG
========================================================= */

function init() {

    document.body.classList.add(
        'locked'
    );

    initAudio();


    els.enterButton.addEventListener(
        'click',
        enterWebsite,
        {
            once: true
        }
    );

}


init();
