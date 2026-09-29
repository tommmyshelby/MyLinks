
'use strict';




const CONFIG = {
    track: {
        title:  'Herr Inspektor',
        artist: 'Seiler und Speer',
        file:   'assets/audio/herr-inspektor.mp3',
    },
    defaultVolume: 0.5,
    particleCount: 70,
};




const $ = (id) => document.getElementById(id);

const els = {
    enter:  $('enter'),
    audio:  $('audio'),
    play:   $('play'),
    seek:   $('seek'),
    volume: $('volume'),
    title:  $('track-title'),
    artist: $('track-artist'),
    canvas: $('background'),
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setRangeFill(range) {
    const span = Number(range.max) - Number(range.min);
    const percent = ((Number(range.value) - Number(range.min)) / span) * 100;
    range.style.setProperty('--fill', `${percent}%`);
}

function updatePlayButton() {
    const paused = els.audio.paused;
    els.play.classList.toggle('is-paused', paused);
    els.play.setAttribute('aria-label', paused ? 'Abspielen' : 'Pause');
}

function loadSavedVolume() {
    try {
        const saved = parseFloat(localStorage.getItem('volume'));
        return Number.isNaN(saved) ? CONFIG.defaultVolume : saved;
    } catch {
        return CONFIG.defaultVolume;
    }
}

function saveVolume(value) {
    try {
        localStorage.setItem('volume', String(value));
    } catch {
      
    }
}

function initPlayer() {
    els.title.textContent  = CONFIG.track.title;
    els.artist.textContent = CONFIG.track.artist;
    els.audio.src = CONFIG.track.file;

    els.audio.volume = loadSavedVolume();
    els.volume.value = els.audio.volume;
    setRangeFill(els.volume);
    setRangeFill(els.seek);
    updatePlayButton();

    els.play.addEventListener('click', () => {
        if (els.audio.paused) {
            els.audio.play().catch(() => {});
        } else {
            els.audio.pause();
        }
    });

    els.volume.addEventListener('input', () => {
        els.audio.volume = Number(els.volume.value);
        setRangeFill(els.volume);
        saveVolume(els.audio.volume);
    });

    els.seek.addEventListener('input', () => {
        if (els.audio.duration) {
            els.audio.currentTime = (els.seek.value / 100) * els.audio.duration;
        }
        setRangeFill(els.seek);
    });

    els.audio.addEventListener('timeupdate', () => {
        if (!els.audio.duration || document.activeElement === els.seek) return;
        els.seek.value = (els.audio.currentTime / els.audio.duration) * 100;
        setRangeFill(els.seek);
    });

    els.audio.addEventListener('play',  updatePlayButton);
    els.audio.addEventListener('pause', updatePlayButton);

    els.audio.addEventListener('error', () => {
        els.artist.textContent = `Audiodatei fehlt: ${CONFIG.track.file}`;
    });
}



const analysis = {
    analyser: null,
    data: null,
};

function initAnalyser() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const isServed = location.protocol.startsWith('http');

  
    if (!AudioContextClass || !isServed || analysis.analyser) return;

    const context = new AudioContextClass();
    const source  = context.createMediaElementSource(els.audio);

    analysis.analyser = context.createAnalyser();
    analysis.analyser.fftSize = 256;
    analysis.analyser.smoothingTimeConstant = 0.8;
    analysis.data = new Uint8Array(analysis.analyser.frequencyBinCount);

    source.connect(analysis.analyser);
    analysis.analyser.connect(context.destination);
}

function averageRange(from, to) {
    let sum = 0;
    for (let i = from; i < to; i++) sum += analysis.data[i];
    return sum / (to - from) / 255;
}


function readEnergy() {
    if (!analysis.analyser || els.audio.paused) {
        return { bass: 0, overall: 0 };
    }

    analysis.analyser.getByteFrequencyData(analysis.data);

    return {
        bass:    averageRange(0, 6),
        overall: averageRange(0, 64),
    };
}



const background = {
    ctx: els.canvas.getContext('2d'),
    width: 0,
    height: 0,
    particles: [],
    bass: 0,
    overall: 0,
};

function createParticle(randomY = true) {
    return {
        x: Math.random() * background.width,
        y: randomY ? Math.random() * background.height : background.height + 10,
        size: 0.6 + Math.random() * 1.8,
        speed: 0.15 + Math.random() * 0.45,
        drift: (Math.random() - 0.5) * 0.3,
        alpha: 0.15 + Math.random() * 0.4,
    };
}

function resizeBackground() {
    const ratio = window.devicePixelRatio || 1;

    background.width  = window.innerWidth;
    background.height = window.innerHeight;

    els.canvas.width  = background.width * ratio;
    els.canvas.height = background.height * ratio;
    background.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    background.particles = Array.from(
        { length: CONFIG.particleCount },
        () => createParticle()
    );
}

function drawGlow(x, y, radius, color, alpha) {
    const gradient = background.ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, `rgba(${color}, ${alpha})`);
    gradient.addColorStop(1, `rgba(${color}, 0)`);

    background.ctx.fillStyle = gradient;
    background.ctx.fillRect(0, 0, background.width, background.height);
}

function drawParticles() {
    const boost = 1 + background.overall * 5;

    for (const p of background.particles) {
        p.y -= p.speed * boost;
        p.x += p.drift * boost;

        if (p.y < -10) Object.assign(p, createParticle(false));

        background.ctx.beginPath();
        background.ctx.arc(p.x, p.y, p.size * (1 + background.bass), 0, Math.PI * 2);
        background.ctx.fillStyle = `rgba(233, 225, 211, ${p.alpha * (0.5 + background.overall)})`;
        background.ctx.fill();
    }
}

function drawBackground() {
    const { ctx, width, height } = background;
    const energy = readEnergy();


    background.bass    += (energy.bass    - background.bass)    * 0.12;
    background.overall += (energy.overall - background.overall) * 0.08;

    const pulse = prefersReducedMotion ? 0 : background.bass;
    const reach = Math.max(width, height);

    ctx.fillStyle = '#0d0b0b';
    ctx.fillRect(0, 0, width, height);

   
    drawGlow(width * 0.15, height * 0.95, reach * (0.45 + pulse * 0.35), '122, 34, 41',  0.35 + pulse * 0.45);
    drawGlow(width * 0.85, height * 0.10, reach * (0.35 + pulse * 0.25), '184, 148, 90', 0.10 + pulse * 0.25);

    if (!prefersReducedMotion) drawParticles();

    requestAnimationFrame(drawBackground);
}

function initBackground() {
    resizeBackground();
    window.addEventListener('resize', resizeBackground);
    requestAnimationFrame(drawBackground);
}




function enterSite() {
    document.body.classList.add('is-entered');
    initAnalyser();
    els.audio.play().catch(() => {});
}

initPlayer();
initBackground();
els.enter.addEventListener('click', enterSite, { once: true });
