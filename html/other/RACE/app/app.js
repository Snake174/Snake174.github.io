$(document).ready( function() {

  var gameArea = $('#gameArea');
  var gameCanvas = undefined;
  var context = undefined;
  var widthToHeight = 4 / 3;

  function initCanvas() {
    gameCanvas = $('#gameCanvas');
    context = gameCanvas[0].getContext('2d');

    gameCanvas.ondragstart = function(e) {
      if (e && e.preventDefault) e.preventDefault();
      if (e && e.stopPropagation) e.stopPropagation();
      return false;
    }

    gameCanvas.onselectstart = function(e) {
      if (e && e.preventDefault) e.preventDefault();
      if (e && e.stopPropagation) e.stopPropagation();
      return false;
    }

    document.body.ontouchstart = function(e) {
      if (e && e.preventDefault) e.preventDefault();
      if (e && e.stopPropagation) e.stopPropagation();
      return false;
    }

    document.body.ontouchmove = function(e) {
      if (e && e.preventDefault) e.preventDefault();
      if (e && e.stopPropagation) e.stopPropagation();
      return false;
    }
  }

  function resizeGame() {
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    var newWidthToHeight = newWidth / newHeight;

    if (newWidthToHeight > widthToHeight) {
      newWidth = newHeight * widthToHeight;
      gameArea.css( {
        'width': newWidth + 'px',
        'height': newHeight + 'px'
      } );
    } else {
      newHeight = newWidth / widthToHeight;
      gameArea.css( {
        'width': newWidth + 'px',
        'height': newHeight + 'px'
      } );
    }

    gameArea.css( {
      'margin-top': (-newHeight / 2) + 'px' ,
      'margin-left':  (-newWidth / 2) + 'px',
      'font-size': (newWidth / 800) + 'em'
    } );

    if (gameCanvas !== undefined) {
      gameCanvas.css( {
        'width': newWidth,
        'height': newHeight
      } );
    }
  }

  var carModels = new Array();

  for (var i = 0; i < 5; ++i) {
    var carModel = new CarModel( {
      name: 'car-' + (i + 1),
      speed: Math.floor( Math.random() * (20 - 10 + 1) ) + 10,
      handling: Math.floor( Math.random() * (20 - 10 + 1) ) + 10,
    } );

    carModels.push( carModel );
  }

  var carCollection = new CarCollection( carModels );

  var carView = new CarView( {
    el: $('#gameArea'),
    collection: carCollection
  } );

  $(document).on( 'click', '.ui-prev', function() {
    $('#gameArea').addClass('animated bounceOutRight');
    $('#gameArea').one( 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $('#gameArea').removeClass('animated bounceOutRight');
      carView.prev();
    } );
  } );

  $(document).on( 'click', '.ui-next', function() {
    $('#gameArea').addClass('animated bounceOutLeft');
    $('#gameArea').one( 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $('#gameArea').removeClass('animated bounceOutLeft');
      carView.next();
    } );
  } );

  var keys = new Array();
  var track = new Image();
  var trackMask = new Image();
  var car = new Image();

  $(document).on( 'click', '.ui-play', function() {
    var CanvasView = Backbone.View.extend( {
      tpl: _.template( $('#canvas-view-tpl').html() ),
      initialize: function() {
        this.render();
      },
      render: function() {
        this.$el.html( this.tpl() );
        return this;
      }
    } );

    var canvasView = new CanvasView( {
      el: $('#gameArea')
    } );

    initCanvas();

    track.onload = function() {
      loadRes();
    };
    track.src = 'img/track/track.png';

    trackMask.onload = function() {
      loadRes();
    };
    trackMask.src = 'img/track/track-mask.png';

    var totalRes = 2;

    function loadRes() {
      --totalRes;

      if (totalRes == 0)
        go();
    }

    var prevT = Date.now();
    var car = new Car( 390, 535, 83, carView.curModel() );

    function go() {
      var curT = Date.now();
      var dt = curT - prevT;

      if (dt > 0) {
        if (dt > 100) {
          prevT += dt - 100;
          dt = 100;
        }

        car.update( dt / 100.0, keys );

        context.drawImage( trackMask, 0, 0 );
        context.drawImage( track, 0, 0 );

        car.draw( context );

        prevT = curT;
      }

      requestAnimationFrame( go );
    }
  } );

  document.addEventListener( 'keydown', function(e) {
    keys[ e.keyCode ] = 1;
  }, true );

    document.addEventListener( 'keyup', function(e) {
    keys[ e.keyCode ] = 0;
  }, true );

  window.addEventListener( 'resize', resizeGame, false );
  window.addEventListener( 'orientationchange', resizeGame, false );

  resizeGame();

} );
