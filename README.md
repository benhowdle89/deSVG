deSVG
=====

### What does it do?

deSVG takes the `<img />` tags you supply. It then grabs, using AJAX, the raw SVG you've set in the `src` attribute and replaces that `<img />` with the `<svg />` it downloads.

### Usage

    window.addEventListener('load', function(){
     	// 1. selector for the <img /> tags to replace
     	// 2. whether to strip inline style tags from SVG paths
    	deSVG('.replace-svg', true);
    });
