(function() {
    var desvg = function(selector, removeinlinecss) {

        var images = document.querySelectorAll(selector),
            len = images.length;

        while (len--) {
            var img = images[len],
                imgID = img.id,
                imgClasses = img.getAttribute('class'),
                imgURL = img.getAttribute('src'),
                imgParent = img.parentNode,
                removeinlinecss = removeinlinecss || null,
                svg,
                paths,
                xhr;

            xhr = new XMLHttpRequest();

            xhr.open('GET', imgURL, true);

            xhr.onload = function() {
                var xml = xhr.responseXML;

                if (!xml) {
                    return;
                }

                svg = xml.documentElement;

                paths = svg.querySelectorAll('path');

                if (imgID) {
                    svg.id = imgID;
                }

                if (imgClasses) {
                    svg.setAttribute('class', imgClasses + ' replaced-svg');
                }

                if (removeinlinecss) {
                    for (var i = 0; i < paths.length; i++) {
                        paths[i].removeAttribute('style');
                    }
                }

                svg.removeAttribute('xmlns:a');

                imgParent.appendChild(svg);
                imgParent.removeChild(img);
            };

            xhr.send();
        }
    };
    window.deSVG = desvg;
})();