laziness
========

jQuery plugin to images lazy loading.

Example:
--------

::
    $(document).ready(function() {

        $(document).laziness({
            selector: 'img[data-src]', // image selector on selected container
            attribute: 'data-src',     // imagesrc html attribute
            onload: null,              // callback called on each image load
            threshold: 200,            // load images earlier, ex: 200px earlier
        });        

    });
