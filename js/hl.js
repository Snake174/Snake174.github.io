$(document).ready( function() {
  hljs.configure( {
    tabReplace: '  ',
    classPrefix: ''
  } );
  $('pre code-hl').each( function( i, block ) {
    hljs.highlightBlock( block );
  } );
} );

