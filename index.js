'use strict';

const music = {
    title: 'BURN THE BRIDGE',
    artist: 'NEFFEX',
    file: 'assets/audio/burn-the-bridge.mp3',
    defaultVolume: 0.5
};


const translations = {
    de: {
        langAria: 'Sprache wechseln',
        themeAria: 'Hell/Dunkel wechseln',
        welcomeTitle: 'Willkommen',
        welcomeText: 'Klicke zum Betreten',
        enter: 'Seite betreten',
        location: '17 Jahre · Österreich',
        bio: 'Ich programmiere gerne und beschäftige mich hauptsächlich mit Discord Development, JavaScript und Python. Nebenbei arbeite ich an eigenen Projekten und probiere gerne neue Dinge aus.',
        statusAria: 'Statusseite',
        discordProfileAria: 'Discord Profil',
        soundcloudAria: 'NEFFEX auf SoundCloud öffnen',
        nowPlaying: 'NOW PLAYING',
        seekAria: 'Musikposition',
        volumeAria: 'Lautstärke',
        play: 'Musik abspielen',
        pause: 'Musik pausieren',
        muteOn: 'Ton ausschalten',
        muteOff: 'Ton einschalten',
        musicMissing: 'Musikdatei nicht gefunden',
        sectionProjects: 'Meine Projekte',
        sectionGaming: 'Gaming',
        sectionHosting: 'Hosting',
        sectionSkills: 'Was ich mache',
        statusCommunity: 'Community',
        statusTeam: 'Im Team',
        statusMember: 'Mitglied',
        statusHost: 'Hoster',
        coreText: 'Ein Server rund um 3D Design und 3D-Druck, den ich mit einem Freund betreibe. Ich leite die Community, die 3D-Arbeit übernimmt mein Kumpel.',
        tag3d: '3D-Druck',
        tagCommunity: 'Community',
        tagLead: 'Leitung',
        tagMember: 'Mitglied',
        easText: 'Ein Roleplay-Projekt, bei dem ich Teil des Teams bin. Gebaut wird von anderen, dem Discord kannst du aber schon beitreten.',
        truckerText: 'Eine Community rund ums Trucking in ETS2 mit gemeinsamen Touren, Convoys und Austausch. Ich bin dort Mitglied, Anfänger und Profis sind willkommen.',
        serverixText: 'Hier hoste ich meine Discord Bots. Du kannst dem Discord von Serverix beitreten.',
        openDiscord: 'Discord öffnen',
        joinDiscord: 'Discord beitreten',
        skillGaming: 'Zocken',
        footerText: 'Made with code & coffee.'
    },
    en: {
        langAria: 'Change language',
        themeAria: 'Toggle light/dark mode',
        welcomeTitle: 'Welcome',
        welcomeText: 'Click to enter',
        enter: 'Enter site',
        location: '17 years old · Austria',
        bio: 'I love to code and mainly work with Discord development, JavaScript and Python. On the side I build my own projects and enjoy trying out new things.',
        statusAria: 'Status page',
        discordProfileAria: 'Discord profile',
        soundcloudAria: 'Open NEFFEX on SoundCloud',
        nowPlaying: 'NOW PLAYING',
        seekAria: 'Music position',
        volumeAria: 'Volume',
        play: 'Play music',
        pause: 'Pause music',
        muteOn: 'Mute',
        muteOff: 'Unmute',
        musicMissing: 'Music file not found',
        sectionProjects: 'My projects',
        sectionGaming: 'Gaming',
        sectionHosting: 'Hosting',
        sectionSkills: 'What I do',
        statusCommunity: 'Community',
        statusTeam: 'In the team',
        statusMember: 'Member',
        statusHost: 'Host',
        coreText: 'A server about 3D design and 3D printing that I run together with a friend. I lead the community, my buddy takes care of the 3D work.',
        tag3d: '3D printing',
        tagCommunity: 'Community',
        tagLead: 'Leadership',
        tagMember: 'Member',
        easText: 'A roleplay project where I am part of the team. Others do the building, but you can already join the Discord.',
        truckerText: 'A community around trucking in ETS2 with shared tours, convoys and chatting. I am a member there, beginners and pros are welcome.',
        serverixText: 'This is where I host my Discord bots. You can join the Serverix Discord.',
        openDiscord: 'Open Discord',
        joinDiscord: 'Join Discord',
        skillGaming: 'Gaming',
        footerText: 'Made with code & coffee.'
    }
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
    artist: $('track-artist'),
    langButton: $('lang-button'),
    themeButton: $('theme-button')
};

const root = document.documentElement;

let lastVolume = music.defaultVolume;
let audioError = false;
let currentLang = root.getAttribute('lang') === 'en' ? 'en' : 'de';

function t(key) {
    return translations[currentLang][key] ?? translations.de[key] ?? key;
}

function readStorage(key) {
    try {
        return localStorage.getItem(key);
    } catch {
        return null;
    }
}

function writeStorage(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch {
        return;
    }
}


function applyLanguage(lang) {
    currentLang = lang === 'en' ? 'en' : 'de';
    root.setAttribute('lang', currentLang);

    document.querySelectorAll('[data-i18n]').forEach((el) => {
        el.textContent = t(el.dataset.i18n);
    });

    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
        el.setAttribute('aria-label', t(el.dataset.i18nAria));
    });

    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
        el.setAttribute('title', t(el.dataset.i18nTitle));
    });

    document.querySelectorAll('[data-lang-option]').forEach((el) => {
        el.classList.toggle('active', el.dataset.langOption === currentLang);
    });

    els.artist.textContent = audioError ? t('musicMissing') : music.artist;

    updatePlayButton();
    updateVolumeButton();
}

function toggleLanguage() {
    const next = currentLang === 'de' ? 'en' : 'de';

    writeStorage('tommy-lang', next);
    applyLanguage(next);
}


function applyTheme(theme) {
    const value = theme === 'light' ? 'light' : 'dark';
    const meta = document.querySelector('meta[name="theme-color"]');

    root.setAttribute('data-theme', value);

    if (meta) {
        meta.setAttribute('content', value === 'light' ? '#f4f3fa' : '#08090c');
    }
}

function toggleTheme() {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';

    writeStorage('tommy-theme', next);
    applyTheme(next);
}


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

    element.style.background = `linear-gradient(to right, #a78bfa 0%, #8b5cf6 ${percent}%, var(--track) ${percent}%, var(--track) 100%)`;
}

function loadVolume() {
    const saved = readStorage('tommy-volume');
    const volume = Number(saved);

    if (saved === null || Number.isNaN(volume) || volume < 0 || volume > 1) {
        return music.defaultVolume;
    }

    return volume;
}

function saveVolume(volume) {
    writeStorage('tommy-volume', String(volume));
}

function updatePlayButton() {
    const playing = !els.audio.paused;

    els.playButton.classList.toggle('playing', playing);
    els.playButton.setAttribute('aria-label', playing ? t('pause') : t('play'));
}

function updateVolumeButton() {
    const muted = els.audio.muted || els.audio.volume === 0;

    els.volumeButton.classList.toggle('muted', muted);
    els.volumeButton.setAttribute('aria-label', muted ? t('muteOff') : t('muteOn'));
}

function togglePlay() {
    if (els.audio.paused) {
        setupAnalyser();
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

const ENABLE_VISUALIZER = true;

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const backgroundEl = document.querySelector('.background');

let audioContext = null;
let analyser = null;
let freqData = null;
let rafId = null;
let bass = 0;
let mid = 0;
let lastBass = -1;
let lastMid = -1;
let lastFrame = 0;
let startedAt = 0;
let slowFrames = 0;
let visualizerOff = !ENABLE_VISUALIZER || reducedMotion;

function setupAnalyser() {
    if (visualizerOff) {
        return;
    }

    if (!audioContext) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;

        if (!AudioCtx) {
            return;
        }

        try {
            audioContext = new AudioCtx();

            const source = audioContext.createMediaElementSource(els.audio);

            analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            analyser.smoothingTimeConstant = 0.7;

            source.connect(analyser);
            analyser.connect(audioContext.destination);

            freqData = new Uint8Array(analyser.frequencyBinCount);
        } catch (error) {
            console.warn('Audio-Analyse nicht verfügbar:', error);
            audioContext = null;
            analyser = null;
            return;
        }
    }

    if (audioContext.state === 'suspended') {
        audioContext.resume().catch(() => {});
    }
}

function average(data, from, to) {
    let sum = 0;

    for (let i = from; i <= to; i++) {
        sum += data[i];
    }

    return sum / (to - from + 1) / 255;
}

function setLevels(bassValue, midValue) {

    if (Math.abs(bassValue - lastBass) > 0.01) {
        backgroundEl.style.setProperty('--bass', bassValue.toFixed(2));
        lastBass = bassValue;
    }

    if (Math.abs(midValue - lastMid) > 0.01) {
        backgroundEl.style.setProperty('--mid', midValue.toFixed(2));
        lastMid = midValue;
    }
}


function checkPerformance(now) {
    if (!startedAt) {
        startedAt = now;
    }

    if (lastFrame && now - startedAt > 2000) {
        const delta = now - lastFrame;

        slowFrames = delta > 40 ? slowFrames + 1 : Math.max(0, slowFrames - 1);

        if (slowFrames > 45) {
            visualizerOff = true;
            bass = 0;
            mid = 0;
            lastBass = -1;
            lastMid = -1;
            setLevels(0, 0);
            console.info('Farbanimation wegen niedriger FPS ausgeschaltet.');
            return false;
        }
    }

    lastFrame = now;
    return true;
}

function visualize(now) {
    if (visualizerOff) {
        rafId = null;
        return;
    }

    if (!checkPerformance(now)) {
        rafId = null;
        return;
    }

    let targetBass = 0;
    let targetMid = 0;

    if (analyser && !els.audio.paused) {
        analyser.getByteFrequencyData(freqData);


        const rawBass = average(freqData, 0, 1);
        const rawMid = average(freqData, 3, 14);


        targetBass = Math.min(1, Math.max(0, (rawBass - 0.45) / 0.45));
        targetMid = Math.min(1, Math.max(0, (rawMid - 0.3) / 0.5));
    }

  
    bass = targetBass > bass ? targetBass : bass * 0.9;
    mid = targetMid > mid ? targetMid : mid * 0.92;

    setLevels(bass, mid);

    if (els.audio.paused && bass < 0.01 && mid < 0.01) {
        setLevels(0, 0);
        rafId = null;
        return;
    }

    rafId = requestAnimationFrame(visualize);
}

function startVisualizer() {
    if (!visualizerOff && rafId === null && analyser) {
        lastFrame = 0;
        rafId = requestAnimationFrame(visualize);
    }
}

document.addEventListener('visibilitychange', () => {
    if (!document.hidden && !els.audio.paused) {
        startVisualizer();
    }
});


function initAudio() {
    const volume = loadVolume();

    els.title.textContent = music.title;
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
    els.audio.addEventListener('play', () => {
        updatePlayButton();
        startVisualizer();
    });
    els.audio.addEventListener('pause', updatePlayButton);
    els.audio.addEventListener('error', () => {
        console.error('Musikdatei konnte nicht geladen werden:', music.file);
        audioError = true;
        els.artist.textContent = t('musicMissing');
    });
}

function enterWebsite() {
    document.body.classList.remove('locked');
    els.welcomeScreen.classList.add('hidden');

    setupAnalyser();
    els.audio.play().catch(() => {});
}

function init() {
    document.body.classList.add('locked');

    lucide.createIcons();

    applyTheme(root.getAttribute('data-theme'));
    initAudio();
    applyLanguage(currentLang);

    els.langButton.addEventListener('click', toggleLanguage);
    els.themeButton.addEventListener('click', toggleTheme);
    els.enterButton.addEventListener('click', enterWebsite, { once: true });
}

init();
