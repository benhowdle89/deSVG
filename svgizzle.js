(function () {
    var svgizzle = function (selector) {
        
        var images = document.querySelectorAll(selector),
            len = images.length;
        
        while (len--) {
            var img = images[len],
                imgID = img.id,
                imgClasses = img.className,
                imgURL = img.getAttribute('src'),
                imgParent = img.parentNode,
                svg,
                xhr;

            xhr = new XMLHTTPRequest();

            xhr.open('GET', imgURL, true);

            xhr.onload = function () {
                var xml = xhr.responseXML,
                    tmp = document.createElement('div');
                tmp.innerHTML = xml;
                
                svg = tmp.querySelector('svg');

                if (imgID) {
                    svg.id = imgID;
                }

                if (imgClass) {
                    svg.className = imgClasses + ' replaced-svg'; 
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
