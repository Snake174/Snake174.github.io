$(document).ready( function() {
  $('a.takru').each( function() {
    alert( '$(this).href: ' + $(this).href );
    alert( '$(this).attr("href"): ' + $(this).attr('href') );
    if ($(this).href == 'http://www.tak.ru') {
      $(this).attr( 'href', 'http://tak.ru/partner.php?id=934977' );
    }
  } );
} )
