(function($, doc, win) {
  $(doc).ready( function() {
    $.material.init();
    
    $(win).scroll( function() {
      $(this).scrollTop() >= 100 ? $('#top-link-block').show() : $('#top-link-block').hide();
    } );

    var $window = $(win);
    window.prettyPrint && prettyPrint();
  } );
} )(jQuery, document, window);
