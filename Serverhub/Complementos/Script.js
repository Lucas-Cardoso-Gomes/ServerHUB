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