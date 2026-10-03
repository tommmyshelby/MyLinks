'use strict';

/* Discord-Status über die Lanyard API */
(function () {
    const USER_ID = '881206091009122406';
    const API_URL = `https://api.lanyard.rest/v1/users/${USER_ID}`;
    const REFRESH_MS = 30000;

    const text = {
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

    const dot = document.getElementById('online-dot');
    const box = document.getElementById('presence');
    const statusText = document.getElementById('presence-status');
    const activityBox = document.getElementById('presence-activity');
    const activityText = document.getElementById('presence-activity-text');

    if (!dot || !box || !activityBox) {
        return;
    }

    let data = null;

    function tr(key) {
        const lang = document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'de';

        return text[lang][key];
    }

    function describeActivity(user) {
        const list = Array.isArray(user.activities) ? user.activities : [];

        const main = list.find((a) => [0, 1, 3, 5].includes(a.type));

        if (main) {
            const key = { 0: 'playing', 1: 'streaming', 3: 'watching', 5: 'competing' }[main.type];

            return { kind: 'game', text: `${tr(key)} ${main.name}` };
        }

        if (user.listening_to_spotify && user.spotify) {
            const artist = String(user.spotify.artist || '').replace(/;\s*/g, ', ');

            return { kind: 'spotify', text: `${tr('listening')} ${user.spotify.song} · ${artist}` };
        }

        const custom = list.find((a) => a.type === 4 && a.state);

        if (custom) {
            return { kind: 'custom', text: custom.state };
        }

        return null;
    }

    function render() {
        if (!data) {
            box.hidden = true;
            activityBox.hidden = true;
            dot.removeAttribute('data-status');
            return;
        }

        const status = ['online', 'idle', 'dnd'].includes(data.discord_status) ? data.discord_status : 'offline';
        const label = tr(status);

        dot.dataset.status = status;
        dot.title = label;
        box.dataset.status = status;
        statusText.textContent = label;
        box.hidden = false;

        const activity = describeActivity(data);

        if (activity) {
            activityBox.dataset.kind = activity.kind;
            activityText.textContent = activity.text;
            activityText.title = activity.text;
            activityBox.hidden = false;
        } else {
            activityBox.hidden = true;
        }
    }

    async function load() {
        try {
            const response = await fetch(API_URL, { cache: 'no-store' });

            if (!response.ok) {
                return;
            }

            const json = await response.json();

            data = json && json.success ? json.data : null;
            render();
        } catch (error) {
            console.warn('Lanyard nicht erreichbar:', error);
        }
    }

    new MutationObserver(render).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['lang']
    });

    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            load();
        }
    });

    setInterval(() => {
        if (!document.hidden) {
            load();
        }
    }, REFRESH_MS);

    load();
})();
