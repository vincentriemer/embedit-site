(function() {

  require('viewport-units-buggyfill').init();
  
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
  
})();