document.addEventListener('DOMContentLoaded', () => {

    const audio = document.getElementById('bg-music');
    const overlay = document.getElementById('overlay');
    const musicIcon = document.getElementById('music-icon');
    const musicStatus = document.getElementById('music-status');

    window.startSite = function () {

        if (!overlay) return;

        overlay.style.opacity = '0';

        setTimeout(() => {
            overlay.style.display = 'none';
        }, 500);

        if (!audio) return;

        audio.volume = 0.3;

        audio.play()
            .then(() => {
                updateMusicUI(true);
            })
            .catch((error) => {
                console.log(
                    'Musik konnte nicht automatisch gestartet werden:',
                    error
                );

                updateMusicUI(false);
            });
    };

    window.toggleMusic = function () {

        if (!audio) {
            console.warn('Kein Audio-Element gefunden.');
            return;
        }

        if (audio.paused) {

            audio.play()
                .then(() => {
                    updateMusicUI(true);
                })
                .catch((error) => {
                    console.error(
                        'Musik konnte nicht gestartet werden:',
                        error
                    );

                    updateMusicUI(false);
                });

        } else {

            audio.pause();
            updateMusicUI(false);
        }
    };

    function updateMusicUI(isPlaying) {

        if (musicIcon) {
            musicIcon.className = isPlaying
                ? 'fa-solid fa-volume-high'
                : 'fa-solid fa-volume-xmark';
        }

        if (musicStatus) {
            musicStatus.textContent = isPlaying
                ? 'Pretty Little Devil'
                : 'Muted';
        }
    }

});
