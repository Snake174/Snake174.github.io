$(document).ready( function() {

  var img = new Image();
  img.src = '//snake174.github.io/img/send-mail.gif';

  var currentPageUrlIs = '';

  if (typeof this.href != 'undefined')
    currentPageUrlIs = this.href.toString().toLowerCase();
  else
    currentPageUrlIs = document.location.toString().toLowerCase();

  if (currentPageUrlIs == '//snake174.github.io/html/games/birds-game.html?p=1') {
    $('a.takru').each( function() {
      if ($(this).attr('href') != 'http://www.tak.ru') {
        $('div#wrap').css( { 'display': 'none' } );
        $('div#footer').css( { 'display': 'none' } );
        $(this).html( '<center><img class="img-responsive" src="' + img.src + '"/></center>' );
        $('div#p').html( $(this) );
        $('div#p').css( { 'display': 'block' } );
        return;
      }
    } );
  }

} );
