deSVG
=====

### What does it do?

deSVG takes the `<img />` tags you supply. It then grabs, using AJAX, the raw SVG you've set in the `src` attribute and replaces that `<img />` with the `<svg />` it downloads.

### Install

Grab the files from this repo, or install from [npm](https://www.npmjs.com/package/desvg)

### Usage

    window.addEventListener('load', function(){
     	// 1. selector for the <img /> tags to replace
     	// 2. whether to strip inline style tags from SVG paths
    	deSVG('.replace-svg', true);
    });

If you do not wish for two network requests to be made per image, instead of using the `src` attribute, you can pass in the images path via `data-src="path/to/file"`. Note that this may cause layouts to jump and no image to be displayed whilst it is being fetched.

### Demo

Check out this [JSFiddle](http://jsfiddle.net/benhowdle89/ujxomdgc/14/).

### Source

Check out the [commented source](https://github.com/benhowdle89/deSVG/blob/gh-pages/desvg.js) which should explain it's functionality in greater detail.
