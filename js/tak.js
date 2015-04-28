$(document).ready( function() {
  $('a.takru').each( function() {
    if ($(this).href == 'http://www.tak.ru')
    {
      alert( '$(this).href: ' + $(this).href );
      alert( '$(this).attr("href"): ' + $(this).attr('href') );
      $(this).attr( 'href', 'http://tak.ru/partner.php?id=934977' );
    }
  } );
} )
