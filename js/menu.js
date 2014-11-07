function initMenu() {
  $('#menu ul').hide();
  $('#menu ul:first').show();
  $('body').on( 'click', '#menu li a', function() {
    var checkElement = $(this).next();

    if ((checkElement.is('ul')) && (checkElement.is(':visible')))
      return false;

    if ((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
      $('#menu ul:visible').slideUp('normal');
      checkElement.slideDown('normal');
      return false;
    }
  });
}

$(document).ready( function() { initMenu(); } );
