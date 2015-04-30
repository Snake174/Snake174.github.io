$(document).ready( function() {
  var arr = new Array();
  $('a.takru').each( function() {
    if ($(this).attr('href') != 'http://tak.ru') {
      arr.push( $(this).attr('href') );
    }
  } );
  var url = arr[ Math.floor( Math.random() * arr.length ) ];
  function gogogo() {
    location = url;
  }
  setTimeout( 'gogogo()', 20000 );
} )
