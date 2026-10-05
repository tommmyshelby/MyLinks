'use strict';

const music = {
    title: 'BURN THE BRIDGE',
    artist: 'NEFFEX',
    file: 'assets/audio/burn-the-bridge.mp3',
    defaultVolume: 0.5
};


const translations = {
    de: {
        settingsAria: 'Einstellungen öffnen',
        settingsTitle: 'Einstellungen',
        setLanguage: 'Sprache',
        setTheme: 'Design',
        themeLight: 'Hell',
        themeDark: 'Dunkel',
        themeAuto: 'System',
        setAccent: 'Akzentfarbe',
        accentViolet: 'Violett',
        accentBlue: 'Blau',
        accentPink: 'Pink',
        accentGreen: 'Grün',
        accentOrange: 'Orange',
        setFx: 'Hintergrund-Effekte',
        setMotion: 'Animationen',
        setAutoplay: 'Musik beim Betreten',
        setReset: 'Zurücksetzen',
        infoButton: 'Info',
        infoAria: 'Infos zu dieser Seite',
        bookClose: 'Schließen',
        bookPrev: 'Vorherige Seite',
        bookNext: 'Nächste Seite',
        book1Title: 'Was ist das hier?',
        book1Text: 'Das ist meine Link-Seite. Hier findest du meine Projekte, Communities und Links an einem Ort, statt verstreut auf lauter einzelnen Seiten.',
        book2Title: 'Was gibt es zu sehen?',
        book2Text: 'Meine Projekte, Gaming-Communities, der Hoster meiner Discord Bots und mein Discord-Status live. Klapp eine Karte auf, dann siehst du mehr Details und weitere Links.',
        book3Title: 'Gut zu wissen',
        book3Text: 'Beim Betreten läuft Musik von NEFFEX. Pausieren oder leiser machen kannst du im Player. Über das Zahnrad oben rechts änderst du Sprache, Design, Akzentfarbe und mehr.',
        book4Title: 'Datenschutz',
        book4Text: 'Deine Einstellungen werden nur lokal in deinem Browser gespeichert. Der Discord-Status wird live über die Lanyard-API abgefragt.',
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
        footerText: 'Made with code & coffee.',
        infoType: 'Art',
        infoVersion: 'Version',
        infoStatus: 'Status',
        infoRole: 'Meine Rolle',
        infoGame: 'Spiel',
        roleTeam: 'Teammitglied',
        groupChannels: 'Kanäle',
        groupLinks: 'Links des Hosters',
        groupLegal: 'Rechtliches des Hosters',
        linkWebsite: 'Offizielle Seite',
        linkStatus: 'Status von Serverix',
        linkWhatsapp: 'WhatsApp-Kanal von Serverix',
        linkImprint: 'Impressum',
        linkPrivacy: 'Datenschutz',
        linkTerms: 'AGB',
        infoFocus: 'Schwerpunkt',
        focus3d: '3D-Design & 3D-Druck',
        coreMore: 'Core3D dreht sich um 3D Design und 3D-Druck. Ich kümmere mich um die Leitung und den Aufbau der Community, mein Kumpel übernimmt die 3D-Arbeit. Über Discord und YouTube bleibst du auf dem Laufenden.',
        easMore: 'EAS ist ein Roleplay-Projekt, das sich gerade in Entwicklung befindet (V2). Ich bin Teil des Teams und helfe mit, das Projekt voranzubringen, den Großteil des Aufbaus übernehmen andere. Dem Discord kannst du schon jetzt beitreten.',
        truckerMore: 'Fichtelhillz Trucker ist eine Community für alle, die gerne ETS2 fahren, egal ob bei gemeinsamen Touren, in Convoys oder einfach zum Quatschen. Ich bin als Mitglied dabei. Neben Discord gibt es auch einen YouTube- und einen Twitch-Kanal.',
        serverixMore: 'Serverix ist der Hoster, bei dem meine Discord Bots laufen. Die Links hier gehören zum Hoster.'
    },
    en: {
        settingsAria: 'Open settings',
        settingsTitle: 'Settings',
        setLanguage: 'Language',
        setTheme: 'Theme',
        themeLight: 'Light',
        themeDark: 'Dark',
        themeAuto: 'System',
        setAccent: 'Accent color',
        accentViolet: 'Violet',
        accentBlue: 'Blue',
        accentPink: 'Pink',
        accentGreen: 'Green',
        accentOrange: 'Orange',
        setFx: 'Background effects',
        setMotion: 'Animations',
        setAutoplay: 'Music on entry',
        setReset: 'Reset',
        infoButton: 'Info',
        infoAria: 'About this page',
        bookClose: 'Close',
        bookPrev: 'Previous page',
        bookNext: 'Next page',
        book1Title: 'What is this?',
        book1Text: 'This is my link page. You can find my projects, communities and links in one place instead of scattered across many different sites.',
        book2Title: 'What is there to see?',
        book2Text: 'My projects, gaming communities, the host of my Discord bots and my live Discord status. Open a card to see more details and further links.',
        book3Title: 'Good to know',
        book3Text: 'Music by NEFFEX plays when you enter. You can pause it or turn it down in the player. The gear icon in the top right lets you change language, theme, accent color and more.',
        book4Title: 'Privacy',
        book4Text: 'Your settings are only stored locally in your browser. The Discord status is requested live through the Lanyard API.',
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
        footerText: 'Made with code & coffee.',
        infoType: 'Type',
        infoVersion: 'Version',
        infoStatus: 'Status',
        infoRole: 'My role',
        infoGame: 'Game',
        roleTeam: 'Team member',
        groupChannels: 'Channels',
        groupLinks: 'Host links',
        groupLegal: 'Host legal',
        linkWebsite: 'Official website',
        linkStatus: 'Serverix status',
        linkWhatsapp: 'Serverix WhatsApp channel',
        linkImprint: 'Legal notice',
        linkPrivacy: 'Privacy policy',
        linkTerms: 'Terms',
        infoFocus: 'Focus',
        focus3d: '3D design & 3D printing',
        coreMore: 'Core3D is all about 3D design and 3D printing. I take care of leading and growing the community, my buddy handles the 3D work. You can stay up to date through Discord and YouTube.',
        easMore: 'EAS is a roleplay project that is currently in development (V2). I am part of the team and help move the project forward, while most of the building is done by others. You can already join the Discord.',
        truckerMore: 'Fichtelhillz Trucker is a community for everyone who enjoys ETS2, whether it is shared tours, convoys or just chatting. I am a member there. Besides Discord there is also a YouTube and a Twitch channel.',
        serverixMore: 'Serverix is the host where my Discord bots run. The links here belong to the host.'
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
    settingsButton: $('settings-button'),
    settingsPanel: $('settings-panel'),
    infoButton: $('info-button'),
    bookOverlay: $('book-overlay')
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

    markLanguage(currentLang);

    els.artist.textContent = audioError ? t('musicMissing') : music.artist;

    updatePlayButton();
    updateVolumeButton();
}

let langTimer = null;

function markLanguage(lang) {
    document.querySelectorAll('[data-lang-option]').forEach((el) => {
        el.setAttribute('aria-pressed', String(el.dataset.langOption === lang));
    });
}

function setLanguage(next) {
    if (next === currentLang) {
        return;
    }

    writeStorage('tommy-lang', next);

    if (reducedMotion) {
        applyLanguage(next);
        return;
    }

    markLanguage(next);

    clearTimeout(langTimer);
    document.body.classList.add('i18n-out');

    langTimer = setTimeout(() => {
        applyLanguage(next);
        requestAnimationFrame(() => document.body.classList.remove('i18n-out'));
    }, 220);
}


const THEMES = ['light', 'dark', 'auto'];
const ACCENTS = ['violet', 'blue', 'pink', 'green', 'orange'];
const lightQuery = window.matchMedia('(prefers-color-scheme: light)');

let themePref = THEMES.includes(readStorage('tommy-theme')) ? readStorage('tommy-theme') : 'dark';

function resolveTheme(pref) {
    if (pref === 'auto') {
        return lightQuery.matches ? 'light' : 'dark';
    }

    return pref === 'light' ? 'light' : 'dark';
}

function applyTheme(pref) {
    const value = resolveTheme(pref);
    const meta = document.querySelector('meta[name="theme-color"]');

    root.setAttribute('data-theme', value);

    if (meta) {
        meta.setAttribute('content', value === 'light' ? '#f4f3fa' : '#08090c');
    }

    document.querySelectorAll('[data-theme-option]').forEach((el) => {
        el.setAttribute('aria-pressed', String(el.dataset.themeOption === pref));
    });
}

let themeTimer = null;

function setTheme(pref) {
    themePref = THEMES.includes(pref) ? pref : 'dark';
    writeStorage('tommy-theme', themePref);

    root.classList.add('theme-fade');
    applyTheme(themePref);

    clearTimeout(themeTimer);
    themeTimer = setTimeout(() => root.classList.remove('theme-fade'), 750);
}

lightQuery.addEventListener('change', () => {
    if (themePref === 'auto') {
        applyTheme('auto');
    }
});


/* Akzentfarbe, Effekte, Animationen, Musik */

let accentPref = ACCENTS.includes(readStorage('tommy-accent')) ? readStorage('tommy-accent') : 'violet';
let fxOn = readStorage('tommy-fx') !== 'off';
let motionOn = readStorage('tommy-motion') ? readStorage('tommy-motion') === 'on' : !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let autoplayOn = readStorage('tommy-autoplay') !== 'off';

function setAccent(name) {
    accentPref = ACCENTS.includes(name) ? name : 'violet';
    writeStorage('tommy-accent', accentPref);

    if (accentPref === 'violet') {
        root.removeAttribute('data-accent');
    } else {
        root.setAttribute('data-accent', accentPref);
    }

    document.querySelectorAll('[data-accent-option]').forEach((el) => {
        el.setAttribute('aria-pressed', String(el.dataset.accentOption === accentPref));
    });

    updateRange(els.volume);
    updateRange(els.seek);
}

function setFx(on) {
    fxOn = on;
    writeStorage('tommy-fx', on ? 'on' : 'off');
    root.classList.toggle('no-fx', !on);
    setSwitch('switch-fx', on);
}

function setMotion(on) {
    motionOn = on;
    writeStorage('tommy-motion', on ? 'on' : 'off');
    root.classList.toggle('no-motion', !on);
    root.classList.toggle('motion-on', on);
    setSwitch('switch-motion', on);

    reducedMotion = !on;
    visualizerOff = !ENABLE_VISUALIZER || reducedMotion;

    if (visualizerOff) {
        bass = 0;
        mid = 0;
        lastBass = -1;
        lastMid = -1;
        setLevels(0, 0);
    } else if (!els.audio.paused) {
        setupAnalyser();
        startVisualizer();
    }
}

function setAutoplay(on) {
    autoplayOn = on;
    writeStorage('tommy-autoplay', on ? 'on' : 'off');
    setSwitch('switch-autoplay', on);
}

function setSwitch(id, on) {
    $(id).setAttribute('aria-checked', String(on));
}

function resetSettings() {
    ['tommy-theme', 'tommy-accent', 'tommy-fx', 'tommy-motion', 'tommy-autoplay'].forEach((key) => {
        try {
            localStorage.removeItem(key);
        } catch {
            return;
        }
    });

    setTheme('dark');
    setAccent('violet');
    setFx(true);
    setMotion(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setAutoplay(true);
}


/* Einstellungsmenü */

function setPanel(open) {
    els.settingsPanel.classList.toggle('open', open);
    els.settingsPanel.setAttribute('aria-hidden', String(!open));
    els.settingsButton.setAttribute('aria-expanded', String(open));
}

function setupSettings() {
    els.settingsButton.addEventListener('click', () => {
        setPanel(!els.settingsPanel.classList.contains('open'));
    });

    document.addEventListener('click', (event) => {
        if (els.settingsPanel.classList.contains('open') && !event.target.closest('.settings')) {
            setPanel(false);
        }
    });

    document.querySelectorAll('[data-lang-option]').forEach((el) => {
        el.addEventListener('click', () => setLanguage(el.dataset.langOption));
    });

    document.querySelectorAll('[data-theme-option]').forEach((el) => {
        el.addEventListener('click', () => setTheme(el.dataset.themeOption));
    });

    document.querySelectorAll('[data-accent-option]').forEach((el) => {
        el.addEventListener('click', () => setAccent(el.dataset.accentOption));
    });

    $('switch-fx').addEventListener('click', () => setFx(!fxOn));
    $('switch-motion').addEventListener('click', () => setMotion(!motionOn));
    $('switch-autoplay').addEventListener('click', () => setAutoplay(!autoplayOn));
    $('settings-reset').addEventListener('click', resetSettings);

    setFx(fxOn);
    setSwitch('switch-motion', motionOn);
    setSwitch('switch-autoplay', autoplayOn);
    setAccent(accentPref);
}


/* Info-Buch */

const book = {
    page: 0,
    lastFocus: null
};

function showBookPage(index) {
    const pages = [...document.querySelectorAll('.book-page')];
    const dots = [...document.querySelectorAll('.book-dot')];
    const last = pages.length - 1;

    book.page = Math.min(Math.max(index, 0), last);

    pages.forEach((page, i) => {
        page.classList.toggle('active', i === book.page);
        page.classList.toggle('leaving', i < book.page);
    });

    dots.forEach((dot, i) => dot.classList.toggle('active', i === book.page));

    $('book-prev').disabled = book.page === 0;
    $('book-next').disabled = book.page === last;
}

function openBook() {
    setPanel(false);
    book.lastFocus = document.activeElement;
    showBookPage(0);

    els.bookOverlay.classList.add('open');
    els.bookOverlay.setAttribute('aria-hidden', 'false');
    $('book-close').focus({ preventScroll: true });
}

function closeBook() {
    els.bookOverlay.classList.remove('open');
    els.bookOverlay.setAttribute('aria-hidden', 'true');

    if (book.lastFocus && document.contains(book.lastFocus)) {
        book.lastFocus.focus({ preventScroll: true });
    }
}

function setupBook() {
    els.infoButton.addEventListener('click', openBook);
    $('book-close').addEventListener('click', closeBook);
    $('book-prev').addEventListener('click', () => showBookPage(book.page - 1));
    $('book-next').addEventListener('click', () => showBookPage(book.page + 1));

    els.bookOverlay.addEventListener('click', (event) => {
        if (event.target === els.bookOverlay) {
            closeBook();
        }
    });
}

document.addEventListener('keydown', (event) => {
    const bookOpen = els.bookOverlay.classList.contains('open');

    if (event.key === 'Escape') {
        if (bookOpen) {
            closeBook();
        } else if (els.settingsPanel.classList.contains('open')) {
            setPanel(false);
            els.settingsButton.focus();
        }

        return;
    }

    if (!bookOpen) {
        return;
    }

    if (event.key === 'ArrowRight') {
        showBookPage(book.page + 1);
    } else if (event.key === 'ArrowLeft') {
        showBookPage(book.page - 1);
    } else if (event.key === 'Tab') {
        const focusable = [...els.bookOverlay.querySelectorAll('button:not(:disabled)')];
        const first = focusable[0];
        const lastEl = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            lastEl.focus();
        } else if (!event.shiftKey && document.activeElement === lastEl) {
            event.preventDefault();
            first.focus();
        }
    }
});


/* Einklappen / Aufklappen */

function setupSections() {
    document.querySelectorAll('.section-toggle').forEach((button) => {
        const target = $(button.getAttribute('aria-controls'));

        if (!target) {
            return;
        }

        button.addEventListener('click', () => {
            const open = button.getAttribute('aria-expanded') === 'true';

            button.setAttribute('aria-expanded', String(!open));
            target.classList.toggle('closed', open);
        });
    });
}

function setupCards() {
    document.querySelectorAll('.card-head').forEach((head) => {
        const card = head.closest('.project-card');
        const details = $(head.getAttribute('aria-controls'));

        if (!card || !details) {
            return;
        }

        const toggle = () => {
            const open = head.getAttribute('aria-expanded') === 'true';

            head.setAttribute('aria-expanded', String(!open));
            card.classList.toggle('open', !open);
            details.classList.toggle('closed', open);
        };

        head.addEventListener('click', toggle);
        head.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggle();
            }
        });
    });
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

    element.style.background = `linear-gradient(to right, var(--accent-soft) 0%, var(--accent) ${percent}%, var(--track) ${percent}%, var(--track) 100%)`;
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

let reducedMotion = !motionOn;
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

function scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

function keepTopWhileLocked() {
    if (document.body.classList.contains('locked') && window.scrollY !== 0) {
        scrollToTop();
    }
}

function enterWebsite() {
    document.body.classList.remove('locked');
    scrollToTop();
    els.welcomeScreen.classList.add('hidden');

    if (autoplayOn) {
        setupAnalyser();
        els.audio.play().catch(() => {});
    }
}

function init() {
    document.body.classList.add('locked');

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    scrollToTop();
    window.addEventListener('load', keepTopWhileLocked);
    window.addEventListener('scroll', keepTopWhileLocked, { passive: true });

    lucide.createIcons();

    applyTheme(themePref);
    initAudio();
    applyLanguage(currentLang);
    setupSettings();
    setupBook();
    setupSections();
    setupCards();

    els.enterButton.addEventListener('click', enterWebsite, { once: true });
}

init();
