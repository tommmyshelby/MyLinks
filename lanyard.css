
.online-dot {
    flex: 0 0 auto;
    background: #6b7280;
    box-shadow: none;
    transition:
        background-color 0.2s ease,
        box-shadow 0.2s ease;
}

.online-dot[data-status="online"] {
    background: #22c55e;
    box-shadow: 0 0 8px rgba(34, 197, 94, 0.22);
}

.online-dot[data-status="idle"] {
    background: #f59e0b;
    box-shadow: 0 0 8px rgba(245, 158, 11, 0.2);
}

.online-dot[data-status="dnd"] {
    background: #ef4444;
    box-shadow: 0 0 8px rgba(239, 68, 68, 0.2);
}

.presence {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: fit-content;
    max-width: 100%;
    margin: 12px auto 0;
    color: var(--text-3);
    font-size: 12px;
    font-weight: 600;
}

.presence[hidden],
.presence-activity[hidden] {
    display: none !important;
}

.presence-dot {
    flex: 0 0 8px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #6b7280;
    transition: background-color 0.2s ease;
}

.presence[data-status="online"] .presence-dot {
    background: #22c55e;
}

.presence[data-status="idle"] .presence-dot {
    background: #f59e0b;
}

.presence[data-status="dnd"] .presence-dot {
    background: #ef4444;
}

.presence-activity {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: fit-content;
    max-width: min(100%, 420px);
    min-width: 0;
    margin: 10px auto 0;
    padding: 7px 12px;
    border: 1px solid var(--border);
    border-radius: 999px;
    color: var(--text-2);
    background: var(--chip-bg);
    font-size: 12px;
    font-weight: 600;
}

.presence-activity span {
    display: block;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.presence-activity .act-icon {
    display: none;
    flex: 0 0 14px;
    width: 14px;
    height: 14px;
    color: var(--accent-text);
}

.presence-activity[data-kind="game"] .act-game,
.presence-activity[data-kind="spotify"] .act-spotify,
.presence-activity[data-kind="custom"] .act-custom {
    display: block;
}

@media (max-width: 480px) {
    .presence {
        margin-top: 10px;
        font-size: 11px;
    }

    .presence-activity {
        max-width: 100%;
        padding: 7px 10px;
        font-size: 11px;
    }
}

@media (prefers-reduced-motion: reduce) {
    .online-dot,
    .presence-dot {
        transition: none;
    }
}
