$(document).ready( function() {

  $.get( 'html/header.txt', function( data ) {
    $('div.header').html( data );
  }, 'text' );

  $.get( 'html/footer.txt', function( data ) {
    $('div.footer').html( data );
  }, 'text' );
  
  $('#[id ^= table_]').dataTable();

  // Вывод главной страницы
  /*$.get( 'html/start.txt', function( data ) {
      $('div#content').html( data );
    }, 'text' );

  // Обработка кликов по меню
  $('body').on( 'click', '#menu a', function(e) {
    e.preventDefault();

    $.get( $(this).attr('data'), function( data ) {
      $('div#content').html( data );
    }, 'text' );
  })*/

} );
