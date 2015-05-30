require( [ 'app/Car', 'app/Intro' ], function( Car, Intro ) {
  var IntroView = new Intro( {
	 el: $('#game-canvas')
  } );
} );


/*$(document).ready( function() {

  var App = function() {
  };

  App._instance = null;

  App.run = function() {
    if (App._instance)
      return;

    App._instance = new App();
    App._instance.init();
  };

  App.prototype.init = function() {
  };

  App.prototype.resize = function() {
    console.log('tyufutf');
  };

  var IntroView = new Intro( {
	 el: $('#game-canvas')
  } );

  App.run();

  $(window).on( 'resize', function() { App.resize(); } );

} );*/
