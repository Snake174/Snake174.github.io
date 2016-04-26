;(function( $, doc ) {
  $(doc).foundation();
  $(doc).ready( function() {
    $(doc).on( 'click', 'img.thumbnail.preview', function(e) {
      $imgMain = $('img.thumbnail.main');
      $imgMain.attr( 'src', $(this).attr('src') );
      $imgMain.css( { 'width': '100%', 'height': 'auto' } );
    } );
  } );
} )(jQuery, document);
