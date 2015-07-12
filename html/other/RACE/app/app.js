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
      speed: Math.floor( Math.random() * (1500 - 500 + 1) ) + 500,
      handling: Math.floor( Math.random() * (35 - 20 + 1) ) + 20,
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
      carView.model.set( carCollection.prev().toJSON() );
    } );
  } );

  $(document).on( 'click', '.ui-next', function() {
    $('#gameArea').addClass('animated bounceOutLeft');
    $('#gameArea').one( 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $('#gameArea').removeClass('animated bounceOutLeft');
      carView.model.set( carCollection.next().toJSON() );
    } );
  } );

  var track = new Image();
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

    car.onload = function() {
      loadRes();
    }
    car.src = carCollection.curModel().get('image');

    track.onload = function() {
      loadRes();
    };
    track.src = 'img/track/track.png';
  } );

  var totalRes = 2;

  function loadRes() {
    --totalRes;

    if (totalRes == 0)
      go();
  }

  function go() {
    resizeGame();
    context.drawImage( track, 0, 0 );
    context.save();
    context.translate( 400, 520 );
    context.rotate( 83 * Math.PI / 180 );
    context.drawImage( car, 0, 0 );
    context.restore();
  }

  document.addEventListener( 'keydown', function(e) {
    console.log( e.keyCode );
  }, true );

	document.addEventListener( 'keyup', function(e) {
    console.log( e.keyCode );
  }, true );

  window.addEventListener( 'resize', resizeGame, false );
  window.addEventListener( 'orientationchange', resizeGame, false );

  resizeGame();

} );
