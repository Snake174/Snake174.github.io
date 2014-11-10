$(document).ready( function() {

  $.get( 'html/header.txt', function( data ) {
    $('div.header').html( data );
  }, 'text' );

  $.get( 'html/footer.txt', function( data ) {
    $('div.footer').html( data );
  }, 'text' );
  
  $('#[id ^= table_]').dataTable();
  
} );
