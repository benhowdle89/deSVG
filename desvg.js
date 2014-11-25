(function() {
    var desvg = function(selector, removeinlinecss) {

        // grab all the elements from the document matching the passed in selector
        var images = document.querySelectorAll(selector),
            len = images.length;

        // loops over the matched images
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

            // set up the AJAX request
            xhr = new XMLHttpRequest();

            xhr.open('GET', imgURL, true);

            xhr.onload = function() {
                // get the response in XML format
                var xml = xhr.responseXML;

                // bail if no XML
                if (!xml) {
                    return;
                }

                // this will be the <svg />
                svg = xml.documentElement;

                // get all the SVG paths
                paths = svg.querySelectorAll('path');

                if (imgID) {
                    // re-assign the ID attribute from the <img />
                    svg.id = imgID;
                }

                if (imgClasses) {
                    // re-assign the class attribute from the <img />
                    svg.setAttribute('class', imgClasses + ' replaced-svg');
                }

                if (removeinlinecss) {
                    // if `removeinlinecss` is true then remove the style attributes from the SVG paths
                    for (var i = 0; i < paths.length; i++) {
                        paths[i].removeAttribute('style');
                    }
                }

                svg.removeAttribute('xmlns:a');

                // add the new SVG element to the DOM
                imgParent.appendChild(svg);

                // and remove the original <img />
                imgParent.removeChild(img);
            };

            xhr.send();
        }
    };
    window.deSVG = desvg;
})();