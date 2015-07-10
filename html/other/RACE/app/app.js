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

  window.addEventListener( 'resize', resizeGame, false );
  window.addEventListener( 'orientationchange', resizeGame, false );

} );
