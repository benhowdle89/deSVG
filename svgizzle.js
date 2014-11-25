(function() {
    var svgizzle = function(selector) {

        var images = document.querySelectorAll(selector),
            len = images.length;

        while (len--) {
            var img = images[len],
                imgID = img.id,
                imgClasses = img.getAttribute('class'),
                imgURL = img.getAttribute('src'),
                imgParent = img.parentNode,
                svg,
                xhr;

            xhr = new XMLHttpRequest();

            xhr.open('GET', imgURL, true);

            xhr.onload = function() {
                var xml = xhr.responseXML,
                    svg = xml.documentElement;

                if (imgID) {
                    svg.id = imgID;
                }

                if (imgClasses) {
                    svg.setAttribute('class', imgClasses + ' replaced-svg');
                }

                svg.removeAttribute('xmlns:a');

                imgParent.appendChild(svg);
                imgParent.removeChild(img);
            };

            xhr.send();
        }
    };
    window.SVGizzle = svgizzle;
})();