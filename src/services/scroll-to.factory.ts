/**
 * Created by ozknemoy on 23.11.2016.
 * с использованием requestAnimationFrame
 * либо тег/ид/класс для querySelector, либо число(отступ от верха) + скорость вторым параметром
 */
export function scrollToFactory () {

    return function scrollTo(to, duration, callback) {
        // easing functions http://goo.gl/5HLl8
        function easeInOutQuad(t, b, c, d) {
            t /= d/2;
            if (t < 1) {
                return c/2*t*t + b
            }
            t--;
            return -c/2 * (t*(t-2) - 1) + b;
        }
        var isNode = typeof window == 'undefined';


// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts

        var requestAnimFrame = <any>(function(){
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60)};
        })();


        function offsetPosition(element) {
            var offsetLeft = 0, offsetTop = 0;
            do {
                offsetLeft += element.offsetLeft;
                offsetTop  += element.offsetTop
            } while (element = element.offsetParent);
            return [offsetLeft, offsetTop]
        }

        if(!to || isNode) return;
        
        // если передаю ид элемента а не число
        if(typeof to === 'string') {
            to = offsetPosition(document.querySelector(to))[1]
        }

        // because it's so fucking difficult to detect the scrolling element, just move them all
        function move(amount) {
            document.documentElement.scrollTop = amount;
            /*document.body.parentNode.scrollTop = amount;*/
            document.body.scrollTop = amount;
        }
        function position() {/* || document.body.parentNode.scrollTop*/
            return document.documentElement.scrollTop || document.body.scrollTop;
        }

        var start = position(),
            change = to - start,
            currentTime = 0,
            increment = 20;
        duration = (typeof(duration) === 'undefined') ? 500 : duration;
        var animateScroll = function() {
            // increment the time
            currentTime += increment;
            // find the value with the quadratic in-out easing function
            var val = easeInOutQuad(currentTime, start, change, duration);
            // move the document.body
            move(val);
            // do the animation unless its over
            if (currentTime < duration) {
                requestAnimFrame(animateScroll);
            } else {
                if (callback && typeof(callback) === 'function') {
                    // the animation is done so lets callback
                    callback();
                }
            }
        };
        animateScroll();
    }
}