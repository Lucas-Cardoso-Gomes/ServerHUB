document.querySelectorAll('.row a[data-url]').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const url = link.getAttribute('data-url');

        if (url) {
            document.querySelector('a[name="iframe-anchor"]')?.scrollIntoView({ behavior: 'smooth' });

            const iframe = document.querySelector('iframe');
            if (iframe) iframe.src = url;

            document.getElementById('iframe-container')?.style.setProperty('display', 'block');
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const devices = [
        { id: "status-router", url: "http://192.168.0.1" },
        { id: "status-ap", url: "http://192.168.0.10" },
        { id: "status-jellyfin", url: "http://shadowserver:8096" },
        { id: "status-servidor", url: "http://192.168.0.2" },
        { id: "status-speedtest", url: "http://shadowserver:3000" }
    ];

    const elements = {};
    const lastStatus = {};

    devices.forEach(device => {
        elements[device.id] = document.getElementById(device.id);
        lastStatus[device.id] = null; // Inicializa o estado anterior como desconhecido
    });

    async function checkStatus(device) {
        try {
            await fetchWithTimeout(device.url, { method: 'HEAD', mode: 'no-cors' }, 5000);
            updateStatus(device.id, "Online");
        } catch (error) {
            updateStatus(device.id, "Offline");
            logError(device, error);
        }
    }

    async function fetchWithTimeout(url, options, timeout = 5000) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            return await fetch(url, { ...options, signal: controller.signal });
        } finally {
            clearTimeout(timeoutId);
        }
    }

    function updateStatus(id, status) {
        if (!elements[id]) return;

        const element = elements[id];

        if (lastStatus[id] !== status) {
            notifyStatusChange(id, status);
            lastStatus[id] = status; // Atualiza o estado anterior
        }

        element.textContent = status;
        element.classList.remove("online", "offline");
        element.classList.add(status.toLowerCase());
    }

    function notifyStatusChange(id, status) {
        if (Notification.permission === "granted") {
            new Notification(`${id} está agora ${status}`);
        }
    }

    function logError(device, error) {
        console.error(`Erro ao verificar ${device.id}:`, error);
    }

    async function updateStatuses() {
        for (const device of devices) {
            await checkStatus(device);
        }
    }

    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    updateStatuses();
    setInterval(updateStatuses, 10000);
});
