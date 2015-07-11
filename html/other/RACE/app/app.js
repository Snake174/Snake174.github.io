$(document).ready( function() {

  var gameArea = $('#gameArea');
  var gameCanvas = $('#gameCanvas');
  var context = gameCanvas[0].getContext('2d');
  var widthToHeight = 4 / 3;

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

    gameCanvas.css( {
      'width': newWidth,
      'height': newHeight
    } );
  }

  var img = new Image();
  img.onload = function() {
    resizeGame();
    context.fillRect( 0, 0, 800, 600 );
    context.drawImage( img, 50, 50, 200, 200 );
  };
  img.src = 'img/intro.png';

  var carModels = new Array();
  var currentCar = 0;

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
    model: carCollection.at( currentCar )
  } );

  $(document).on( 'click', '.ui-prev', function() {
    --currentCar;

    if (currentCar < 0)
      currentCar = 4;

    $('#gameArea').addClass('animated bounceOutRight');
    $('#gameArea').one( 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $('#gameArea').removeClass('animated bounceOutRight');
      carView.model.set( carCollection.at( currentCar ).toJSON() );
    } );
  } );

  $(document).on( 'click', '.ui-next', function() {
    ++currentCar;

    if (currentCar > 4)
      currentCar = 0;

    $('#gameArea').addClass('animated bounceOutLeft');
    $('#gameArea').one( 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $('#gameArea').removeClass('animated bounceOutLeft');
      carView.model.set( carCollection.at( currentCar ).toJSON() );
    } );
  } );

  $(document).on( 'click', '.ui-play', function() {
    window.currentCar = currentCar;
    carCollection.at( currentCar ).$el.html( _.template( $('#canvas-view-tpl').html() ) );
  } );

  window.addEventListener( 'resize', resizeGame, false );
  window.addEventListener( 'orientationchange', resizeGame, false );

} );
