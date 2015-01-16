$(document).ready( function() {

  $('ul.tabs').each( function() {
    $(this).find('li').each( function(i) {
      $(this).click( function() {
        $(this).addClass('active').siblings().removeClass('active');
        var p = $(this).parents('div.tabs_container');
        p.find('div.tab_container').hide();
        p.find('div.tab_container:eq(' + i + ')').show();
      } );
    } );
  } );

} );
