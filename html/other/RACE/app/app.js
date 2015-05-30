$(document).ready( function() {

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
    var IntroView = new Intro( {
	    el: $('#game-canvas')
    } );
  };

  App.prototype.resize = function() {
    console.log('tyufutf');
  };

  App.run();

  $(window).on( 'resize', function() { App._instance.resize(); } );

} );
