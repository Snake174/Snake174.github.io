$(document).ready( function() {
  $('a.takru').each( function( i, e ) {
    if ($(this).attr('href') == 'http://www.tak.ru')
    {
      $(this).attr( 'href', 'http://tak.ru/partner.php?id=934977' );
      break;
    }
  } );
} )
