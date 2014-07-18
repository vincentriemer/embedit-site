var lastScrollY     = 0,
    ticking         = false,
    bodyHeight      = 0,
    parallaxHeight  = 0,
    viewportHeight  = 0,
    lastTime        = 0,
    allowParallax   = true;

var layers = null;

function getScrollPosition() {
  return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

function onScroll() {
  lastScrollY = getScrollPosition();
  requestTick();
}

function onResize() {
  bodyHeight = document.body.offsetHeight;
  viewportHeight = window.innerHeight;
  parallaxHeight = document.querySelectorAll('.parallax')[0].offsetHeight;
  requestTick();
}

function requestTick() {
  if( !ticking ) {
    requestAnimationFrame(update);
    ticking = true;
  }
}

// get all the parallax layers (and cache them for future use)
function getLayers() {
  if( layers === null ) {
    layers = document.querySelectorAll('.parallax');
  }
  return layers;
}

function update() {
  ticking = false;

  // get the scroll position
  var currentScrollY = lastScrollY;

  console.log(currentScrollY);
  // handle scroll overflow
  if( currentScrollY < 0 ) { currentScrollY = 0; }
  if( currentScrollY + viewportHeight > bodyHeight ) { currentScrollY = bodyHeight - viewportHeight; }

  // get the current parallax layer
  var layerIndex = Math.floor( currentScrollY / parallaxHeight );
  var layers = getLayers();
  var layer = layers[layerIndex];

  // get the clipping value for the current layer
  var clipValue = parallaxHeight - (currentScrollY - ( parallaxHeight * ( layerIndex ) ));
  var length = layers.length;

  // update clip values for each parallax element
  for( var i = 0; i < length; i++ ) {
    if( i < layerIndex ){
      layers[i].style.clip = "rect(0px,9999px,0px,0px)";
    } else if( i > layerIndex ){
      layers[i].style.clip = "rect(0px,9999px," + parallaxHeight + "px,0px)";
    } else {
      layers[i].style.clip = "rect(0px,9999px," + clipValue + "px,0px)";
    }
  }
}

function addFixedStyles() {
  var layers = getLayers();
  var layLength = layers.length;
  for( var i = 0; i < layLength; i++ ) {
    var el = layers[i];
    if (el.classList)
      el.classList.add('fixed');
    else
      el.className += ' fixed';
    // el.style.zIndex = 100 - i;
  }
  requestTick();
}

function requestAnimationFramePolyfill() {
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                 || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
            timeToCall);
          lastTime = currTime + timeToCall;
          return id;
      };

  if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
      };
}

document.addEventListener('DOMContentLoaded', function(){
  requestAnimationFramePolyfill();

  bodyHeight = document.body.offsetHeight;
  viewportHeight = window.innerHeight;
  parallaxHeight = viewportHeight;

  if( allowParallax ) {
    addFixedStyles();
    window.addEventListener('scroll', onScroll, false);
    window.addEventListener('resize', onResize, false);
  }
});