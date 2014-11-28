;(function($) {
    $.fn.laziness = function(options) {

        var settings = $.extend({
            // These are the defaults.
            selector: 'img[data-src]',
            attribute: 'data-src',
            onload: null,
            threshold: 200,
            
        }, options);

        return this.each(function(index, elem) {

            var $this = $(elem),
                images = $this.find(settings.selector),
                loaded;

            images.one("laziness", function() {

                var source = this.getAttribute(settings.attribute);
                var img = this;

                if (source) {
                    img.onload = function () {
                        if (typeof settings.onload === "function")
                            settings.onload.call(img);
                    };
                    img.src = source;
                }
            });

            var laziness = function () {
                var inview = images.filter(function() {
                    var rect = this.getBoundingClientRect();
                    var $e = $(this);

                    if ($e.is(":hidden")) return;

                    return (
                        rect.top >= 0
                        && rect.left >= 0
                        && (rect.top - settings.threshold) <= (window.innerHeight || document.documentElement.clientHeight)
                        && (rect.left-window.innerWidth) <= (window.innerWidth || document.documentElement.clientWidth)
                    )
                });

                loaded = inview.trigger("laziness");
                images = images.not(loaded);
            }

            $this.on("scroll.laziness resize.laziness lookup.laziness", laziness);

            laziness();
        });
    };

})(window.jQuery || window.Zepto);
