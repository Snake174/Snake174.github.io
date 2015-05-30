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
    this.canvas = document.getElementById('game-canvas');
	  window.onresize = function() { this.resize(); };
	  this.resize();

    var IntroView = new Intro( {
	    el: $('#game-canvas')
    } );

    this.prevT = Date.now();

  	requestAnimationFrame( function() { this.doFrame(); } );
  };
  
  App.prototype.doFrame = function()
  {
    console.log('test');
	  var curT = Date.now();
	  var dt = curT - this.prevT;

  	if (dt > 0)
	  {
		  if (dt > 100)
		  {
			  this.prevT += dt - 100;
			  dt = 100;
		  }

      // logic here

		  this.prevT = curT;
	  }

	  requestAnimationFrame( function() { this.doFrame(); } );
  };

  App.prototype.resize = function() {
    var rc = document.getElementById('game-container').getBoundingClientRect();
    var cw = Math.floor( rc.right - rc.left );
    var ch = Math.floor( rc.bottom - rc.top );

    document.getElementById('game').style.width = cw + 'px';
    document.getElementById('game').style.height = ch + 'px';
    this.canvas.width = cw;
    this.canvas.height = ch;
  };

  App.run();

} );
