const audio = document.getElementById('bg-music');
const overlay = document.getElementById('overlay');
const musicIcon = document.getElementById('music-icon');
const musicStatus = document.getElementById('music-status');


function startSite() {
  overlay.style.opacity = '0';
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 500);

  audio.volume = 0.3; 
  audio.play().then(() => {
    updateMusicUI(true);
  }).catch((err) => {
    console.log("Autoplay blockiert oder Datei fehlt:", err);
    updateMusicUI(false);
  });
}


function toggleMusic() {
  if (audio.paused) {
    audio.play();
    updateMusicUI(true);
  } else {
    audio.pause();
    updateMusicUI(false);
  }
}


function updateMusicUI(isPlaying) {
  if (isPlaying) {
    musicIcon.className = 'fa-solid fa-volume-high';
    musicStatus.textContent = 'Pretty Little Devil';
  } else {
    musicIcon.className = 'fa-solid fa-volume-xmark';
    musicStatus.textContent = 'Muted';
  }
}
