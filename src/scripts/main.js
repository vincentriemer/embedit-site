(function() {
  
  var triggerBttn = document.querySelector( 'button.hamburger' ),
  navigation = document.querySelector( 'nav#menu' );

  function toggleNavigation() {
    if( classie.has( navigation, 'nav-hidden' ) ) {
      classie.remove( navigation, 'nav-hidden' );
    } else {
      classie.add( navigation, 'nav-hidden' );
    }
  }

  triggerBttn.addEventListener( 'click', toggleNavigation );

  var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

  if (isSafari) {
    var elements = document.querySelectorAll('section');
    for (var i = 0; i < elements.length; ++i) {
      var curr_node = elements[i];
      var cs = window.getComputedStyle(curr_node, null);
      curr_node.style.height = cs['height'];
    }
  }
})();