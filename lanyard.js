
'use strict';

(() => {
    const USER_ID = '881206091009122406';
    const API_URL = `https://api.lanyard.rest/v1/users/${USER_ID}`;
    const REFRESH_MS = 30_000;
    const REQUEST_TIMEOUT_MS = 8_000;

    const translations = {
        de: {
            online: 'Online',
            idle: 'Abwesend',
            dnd: 'Bitte nicht stören',
            offline: 'Offline',
            playing: 'Spielt',
            streaming: 'Streamt',
            watching: 'Schaut',
            competing: 'Wettkampf:',
            listening: 'Hört'
        },
        en: {
            online: 'Online',
            idle: 'Away',
            dnd: 'Do not disturb',
            offline: 'Offline',
            playing: 'Playing',
            streaming: 'Streaming',
            watching: 'Watching',
            competing: 'Competing in',
            listening: 'Listening to'
        }
    };

    const elements = {
        dot: document.getElementById('online-dot'),
        box: document.getElementById('presence'),
        status: document.getElementById('presence-status'),
        activity: document.getElementById('presence-activity'),
        activityText: document.getElementById('presence-activity-text')
    };

    if (
        !elements.dot ||
        !elements.box ||
        !elements.status ||
        !elements.activity ||
        !elements.activityText
    ) {
        return;
    }

    let userData = null;
    let isLoading = false;
    let lastSuccessfulUpdate = 0;
    let activeController = null;

    function getLanguage() {
        return document.documentElement.getAttribute('lang') === 'en'
            ? 'en'
            : 'de';
    }

    function translate(key) {
        return translations[getLanguage()][key] || key;
    }

    function describeActivity(user) {
        const activities = Array.isArray(user.activities)
            ? user.activities
            : [];

        const activityTypes = {
            0: 'playing',
            1: 'streaming',
            3: 'watching',
            5: 'competing'
        };

        const mainActivity = activities.find(activity =>
            Object.prototype.hasOwnProperty.call(
                activityTypes,
                activity.type
            ) && activity.name
        );

        if (mainActivity) {
            const label = translate(activityTypes[mainActivity.type]);

            return {
                kind: 'game',
                text: `${label} ${mainActivity.name}`
            };
        }

        if (user.listening_to_spotify && user.spotify) {
            const song = user.spotify.song || '';
            const artist = String(user.spotify.artist || '')
                .replace(/;\s*/g, ', ');

            const details = [song, artist].filter(Boolean).join(' · ');

            if (details) {
                return {
                    kind: 'spotify',
                    text: `${translate('listening')} ${details}`
                };
            }
        }

        const customActivity = activities.find(activity =>
            activity.type === 4 && activity.state
        );

        if (customActivity) {
            return {
                kind: 'custom',
                text: customActivity.state
            };
        }

        return null;
    }

    function render() {
        if (!userData) {
            elements.box.hidden = true;
            elements.activity.hidden = true;
            elements.dot.removeAttribute('data-status');
            return;
        }

        const allowedStatuses = ['online', 'idle', 'dnd'];

        const status = allowedStatuses.includes(userData.discord_status)
            ? userData.discord_status
            : 'offline';

        const label = translate(status);

        elements.dot.dataset.status = status;
        elements.dot.title = label;

        elements.box.dataset.status = status;
        elements.status.textContent = label;
        elements.box.hidden = false;

        const activity = describeActivity(userData);

        if (activity) {
            elements.activity.dataset.kind = activity.kind;
            elements.activityText.textContent = activity.text;
            elements.activityText.title = activity.text;
            elements.activity.hidden = false;
        } else {
            elements.activity.hidden = true;
            elements.activity.removeAttribute('data-kind');
            elements.activityText.textContent = '';
            elements.activityText.removeAttribute('title');
        }
    }

    async function load({ force = false } = {}) {
        if (isLoading || document.hidden) {
            return;
        }

        // Bei einem schnellen erneuten Aufruf nicht unnötig laden.
        if (
            !force &&
            Date.now() - lastSuccessfulUpdate < REFRESH_MS - 1_000
        ) {
            return;
        }

        isLoading = true;
        activeController = new AbortController();

        const timeoutId = setTimeout(() => {
            activeController?.abort();
        }, REQUEST_TIMEOUT_MS);

        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                cache: 'no-store',
                headers: {
                    Accept: 'application/json'
                },
                signal: activeController.signal
            });

            if (!response.ok) {
                throw new Error(`Lanyard HTTP ${response.status}`);
            }

            const result = await response.json();

            if (!result || result.success !== true || !result.data) {
                throw new Error('Ungültige Antwort von Lanyard');
            }

            // Vorhandene Daten bei einem API-Fehler nicht löschen.
            userData = result.data;
            lastSuccessfulUpdate = Date.now();

            render();
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.warn('Lanyard konnte nicht geladen werden:', error);
            }
        } finally {
            clearTimeout(timeoutId);
            activeController = null;
            isLoading = false;
        }
    }


    const languageObserver = new MutationObserver(() => {
        render();
    });

    languageObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['lang']
    });

    
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            load({ force: true });
        }
    });

 
    const refreshInterval = setInterval(() => {
        if (!document.hidden) {
            load();
        }
    }, REFRESH_MS);

  
    window.addEventListener('pagehide', () => {
        clearInterval(refreshInterval);
        languageObserver.disconnect();
        activeController?.abort();
    }, { once: true });

    load({ force: true });
})();
