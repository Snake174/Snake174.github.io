$(document).ready( function() {

  var gameArea = $('#gameArea');
  var gameCanvas = undefined;
  var trackMaskCanvas = undefined;
  var context = undefined;
  var contextMask = undefined;
  var newWidth = window.innerWidth;
  var widthToHeight = 4 / 3;
  var mouse = {
    ex: 0,
    ey: 0
  }

  function initCanvas() {
    gameCanvas = $('#gameCanvas');
    context = gameCanvas[0].getContext('2d');

    trackMaskCanvas = $('#trackMask');
    contextMask = trackMaskCanvas[0].getContext('2d');

    var trackMask = new Image();
    trackMask.onload = function() {
      contextMask.drawImage( trackMask, 0, 0 );
    }
    trackMask.src = 'img/track/track-mask.png';

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

    gameCanvas.on( 'click', function(e) {
      e.preventDefault();

      var x = new Number();
      var y = new Number();

      if (e.x != undefined && e.y != undefined)
      {
        x = event.x;
        y = event.y;
      }
      else
      {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }

      x -= $(this).offset().left;
      y -= $(this).offset().top;

      mouse = {
        ex: Math.floor( x * (800 / newWidth) ),
        ey: Math.floor( y * (800 / newWidth) )
      }

      //gameCanvas.trigger( 'handleClick', [mouse] );
      console.log( mouse.ex + ' ' + mouse.ey );

      return false;
    } );
  }

  function resizeGame() {
    newWidth = window.innerWidth;
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
      speed: Math.floor( Math.random() * (4 - 2 + 1) ) + 2,
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

    var totalRes = 1;

    function loadRes() {
      --totalRes;

      if (totalRes == 0)
        go();
    }

    var prevT = Date.now();
    var car = new Car( 390, 535, 83, carView.curModel() );
    var blocks = new Array();
    var blockPos = new Array(
      [ 470, 480 ],
      [ 655, 280 ],
      [ 460, 100 ],
      [ 125, 290 ],
      [ 300, 540 ]
    );

    for (var i = 0; i < blockPos.length; ++i)
      blocks.push( new Block( blockPos[i][0], blockPos[i][1] ) );

    var collisionCnt = 0;

    function go() {
      ++collisionCnt;

      var curT = Date.now();
      var dt = curT - prevT;

      if (dt > 0) {
        if (dt > 100) {
          prevT += dt - 100;
          dt = 100;
        }

        car.update( dt / 100.0, keys );

        if (collisionCnt == 10) {
          collisionCnt = 0;

          if (contextMask.getImageData( car.pos.x, car.pos.y, 1, 1 ).data[3] == 255)
            car.speed = car.lowSpeed;
          else
            car.speed = car.maxSpeed;
        }

        context.drawImage( track, 0, 0 );

        car.draw( context );

        for (var i = 0; i < blocks.length; ++i) {
          blocks[i].draw( context );

          var dx = blocks[i].pos.x - car.pos.x;
          var dy = blocks[i].pos.y - car.pos.y;
          var len = Math.sqrt( dx * dx + dy * dy );

          if (len <= 20) {
            if (car.curAcc > 0) {
              car.pos.x -= car.dir.x + 2;
              car.pos.y -= car.dir.y + 2;
            }
            else {
              car.pos.x += car.dir.x + 2;
              car.pos.y += car.dir.y + 2;
            }

            car.curAcc = 0;
          }
        }

        trackTriggers.update( car );

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
