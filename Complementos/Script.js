document.addEventListener("DOMContentLoaded", function () {
    const devices = [
        { id: "status-router", url: "192.168.0.1" },
        { id: "status-ap", url: "192.168.0.10" },
        { id: "status-jellyfin", url: "http://shadowserver:8096" },
        { id: "status-dados", url: "http://shadowserver/dados" },
        { id: "status-speedtest", url: "http://shadowserver:3000" }
    ];

    devices.forEach(device => {
        checkStatus(device);
    });

    function checkStatus(device) {
        fetch(device.url, { method: 'HEAD', mode: 'no-cors' })
            .then(() => {
                document.getElementById(device.id).textContent = "Online";
                document.getElementById(device.id).classList.add("online");
            })
            .catch(() => {
                document.getElementById(device.id).textContent = "Offline";
                document.getElementById(device.id).classList.add("offline");
            });
    }
});

document.querySelectorAll('.row a[data-url]').forEach(function (link) {
    link.addEventListener('click', function (event) {
        if (this.getAttribute('data-url')) {
            event.preventDefault();

            var url = this.getAttribute('data-url');

            var iframeAnchor = document.querySelector('a[name="iframe-anchor"]');
            if (iframeAnchor) {
                iframeAnchor.scrollIntoView({ behavior: 'smooth' });
            }

            var iframe = document.querySelector('iframe');
            if (iframe) {
                iframe.src = url;
            }

            var iframeContainer = document.getElementById('iframe-container');
            if (iframeContainer) {
                iframeContainer.style.display = 'block';
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const devices = [
        { id: "status-router", url: "http://192.168.0.1" },
        { id: "status-ap", url: "http://192.168.0.10" },
        { id: "status-jellyfin", url: "http://shadowserver:8096" },
        { id: "status-dados", url: "http://shadowserver/dados" },
        { id: "status-speedtest", url: "http://shadowserver:3000" }
    ];

    function updateStatuses() {
        devices.forEach(device => {
            checkStatus(device);
        });
    }

    function checkStatus(device) {
        fetch(device.url, { method: 'HEAD', mode: 'no-cors' })
            .then(() => {
                document.getElementById(device.id).textContent = "Online";
                document.getElementById(device.id).classList.add("online");
                document.getElementById(device.id).classList.remove("offline");
            })
            .catch(() => {
                document.getElementById(device.id).textContent = "Offline";
                document.getElementById(device.id).classList.add("offline");
                document.getElementById(device.id).classList.remove("online");
            });
    }

    // Initial status check
    updateStatuses();

    // Update status every 10 seconds
    setInterval(updateStatuses, 10000);
});

function notifyStatusChange(device, status) {
    if (Notification.permission === "granted") {
        new Notification(`${device.id} is now ${status}`);
    }
}

function checkStatus(device) {
    fetch(device.url, { method: 'HEAD', mode: 'no-cors' })
        .then(() => {
            const element = document.getElementById(device.id);
            if (element.textContent !== "Online") {
                notifyStatusChange(device, "Online");
            }
            element.textContent = "Online";
            element.classList.add("online");
            element.classList.remove("offline");
        })
        .catch(() => {
            const element = document.getElementById(device.id);
            if (element.textContent !== "Offline") {
                notifyStatusChange(device, "Offline");
            }
            element.textContent = "Offline";
            element.classList.add("offline");
            element.classList.remove("online");
        });
}

// Request notification permission
if (Notification.permission !== "granted") {
    Notification.requestPermission();
}

function logError(device, error) {
    console.error(`Error checking status of ${device.id}:`, error);
}

function checkStatus(device) {
    fetch(device.url, { method: 'HEAD', mode: 'no-cors' })
        .then(() => {
            document.getElementById(device.id).textContent = "Online";
            document.getElementById(device.id).classList.add("online");
            document.getElementById(device.id).classList.remove("offline");
        })
        .catch((error) => {
            document.getElementById(device.id).textContent = "Offline";
            document.getElementById(device.id).classList.add("offline");
            document.getElementById(device.id).classList.remove("online");
            logError(device, error);
        });
}