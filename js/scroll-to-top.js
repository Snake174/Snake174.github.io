$(document).ready( function() {
  $(window).scroll( function() {
    $(this).scrollTop() >= 100 ? $('#top-link-block').show() : $('#top-link-block').hide();
  } );
} );
