$(document).ready( function() {
  $('a.takru').each( function( i, e ) {
    if ($(e).href == 'http://www.tak.ru')
    {
      $(e).attr( 'href', 'http://tak.ru/partner.php?id=934977' );
    }
  } );
} )
