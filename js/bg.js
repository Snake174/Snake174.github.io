$(document).ready( function() {

  var img = new Image();
  img.src = '<img src="http://snake174.github.io/img/background.png"/>';

  var currentPageUrlIs = '';

  if (typeof this.href != 'undefined')
    currentPageUrlIs = this.href.toString().toLowerCase();
  else
    currentPageUrlIs = document.location.toString().toLowerCase();

  if (currentPageUrlIs == 'http://snake174.github.io/html/games/birds-game.html?p=1')
  {
    $('a.takru').each( function() {
      if ($(this).attr('href') != 'http://www.tak.ru') {
        $('div#wrap').css( { 'display': 'none' } );
        $('div#footer').css( { 'display': 'none' } );
        $('div#p').css( { 'display': 'block' } );
        $(this).html( img.src );
        $('div#p').html( $(this) );
        return;
      }
    } );
  }

} );
