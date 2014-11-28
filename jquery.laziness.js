;(function($) {
    $.fn.laziness = function(imgs, callback) {

        return this.each(function(index, elem) {

            var $this = $(elem),
                images = imgs? imgs: $this.find('img'),
                loaded;

            images.one("laziness", function() {

                var source = this.getAttribute("data-src");
                var img = this;

                if (source) {
                    img.onload = function () {
                        if (typeof callback === "function") {
                            callback.call(img);
                        }
                    };

                    img.src = source;
                }
            });

            function laziness()
            {
                var inview = images.filter(function() {
                    var rect = this.getBoundingClientRect();
                    var $e = $(this);

                    if ($e.is(":hidden")) return;

                    return (
                        rect.top >= 0
                        && rect.left >= 0
                        && (rect.top - 200) <= (window.innerHeight || document.documentElement.clientHeight)
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
