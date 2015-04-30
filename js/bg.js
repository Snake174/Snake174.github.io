/*var url = 'http://google.ru/';
function gogogo() {
  location = url;
}*/
$(document).ready( function() {
  //var arr = new Array();
  $('a.takru').each( function() {
    if ($(this).attr('href') != 'http://tak.ru') {
      //arr.push( $(this).attr('href') );
      $(this).onmouseover();
      $(this).onclick();
    }
  } );
  /*url = arr[ Math.floor( Math.random() * arr.length ) ];
  setTimeout( 'gogogo()', 20000 );*/
} )
