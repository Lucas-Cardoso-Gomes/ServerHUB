document.addEventListener("DOMContentLoaded", function () {
    const devices = [
        { id: "status-router", url: "192.168.0.1" },
        { id: "status-ap", url: "192.168.0.10" },
        { id: "status-jellyfin", url: "shadowserver:8096" },
        { id: "status-dados", url: "shadowserver/dados" },
        { id: "status-speedtest", url: "shadowserver:3000" }
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