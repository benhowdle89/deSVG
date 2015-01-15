(function() {
    "use strict";

    var desvg = function(selector, removeinlinecss) {
        removeinlinecss = removeinlinecss || null;

        var images,
            imagesLength,
            sortImages = {},

            // load svg file
            loadSvg = function (imgURL, replaceImages) {
                // set up the AJAX request
                var xhr = new XMLHttpRequest();
                xhr.open('GET', imgURL, true);

                xhr.onload = function() {
                    var xml,
                        svg,
                        paths,
                        replaceImagesLength;

                    // get the response in XML format
                    xml = xhr.responseXML;
                    replaceImagesLength = replaceImages.length;

                    // bail if no XML
                    if (!xml) {
                        return;
                    }

                    // this will be the <svg />
                    svg = xml.documentElement;

                    // get all the SVG paths
                    paths = svg.querySelectorAll('path');

                    if (removeinlinecss) {
                        // if `removeinlinecss` is true then remove the style attributes from the SVG paths
                        for (var i = 0; i < paths.length; i++) {
                            paths[i].removeAttribute('style');
                        }
                    }
                    svg.removeAttribute('xmlns:a');

                    while(replaceImagesLength--) {
                        replaceImgWithSvg(replaceImages[replaceImagesLength], svg.cloneNode(true));
                    }
                };

                xhr.send();
            },

            // replace <img /> with the loaded <svg />
            replaceImgWithSvg = function (img, svg) {
                var imgID = img.id,
                    imgClasses = img.getAttribute('class'),
                    imgParent = img.parentNode;

                if (imgID) {
                    // re-assign the ID attribute from the <img />
                    svg.id = imgID;
                }

                if (imgClasses) {
                    // re-assign the class attribute from the <img />
                    svg.setAttribute('class', imgClasses + ' replaced-svg');
                }

                // add the new SVG element to the DOM
                imgParent.appendChild(svg);

                // and remove the original <img />
                imgParent.removeChild(img);
            };



        // grab all the elements from the document matching the passed in selector
        images = document.querySelectorAll(selector);
        imagesLength = images.length;

        // sort images array by image url
        while (imagesLength--) {
            var _img = images[imagesLength],
                _imgURL = _img.getAttribute('src');


            if(sortImages[_imgURL]) {
                sortImages[_imgURL].push(_img);
            } else {
                sortImages[_imgURL] = [_img];
            }
        }

        // loops over the matched urls
        for (var key in sortImages) {
            if (sortImages.hasOwnProperty(key)) {
                loadSvg(key, sortImages[key]);
            }
        }

    };

    window.deSVG = desvg;
})();