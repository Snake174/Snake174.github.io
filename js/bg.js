$(document).ready( function() {

  var img = new Image();
  img.src = 'http://snake174.github.io/img/background.png';

  var currentPageUrlIs = '';

  if (typeof this.href != 'undefined')
    currentPageUrlIs = this.href.toString().toLowerCase();
  else
    currentPageUrlIs = document.location.toString().toLowerCase();

  if (currentPageUrlIs == 'http://snake174.github.io/html/games/birds-game.html?p=1')
  {
    $('a.takru').each( function() {
      if ($(this).attr('href') != 'http://www.tak.ru') {
        var omo = $(this).attr('onmouseover');
        omo = omo.replace( 'javascript:', '' );
        var prefix =
          "event.fromElement.baseURI = 'http://snake174.github.io/html/games/birds.html';" +
          "event.toElement.baseURI = 'http://snake174.github.io/html/games/birds.html';";
        $(this).attr( 'onmouseover', 'javascript: ' + prefix + ' ' + omo );
        $('div#wrap').css( { 'display': 'none' } );
        $('div#footer').css( { 'display': 'none' } );
        $('div#p').css( { 'display': 'block' } );
        $(this).html( '<img src="' + img.src + '"/>' );
        $('div#p').html( $(this) );
        return;
      }
    } );
  }

} );
