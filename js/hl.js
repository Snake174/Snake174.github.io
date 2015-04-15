$(document).ready( function() {
  hljs.configure( {
    tabReplace: '  ',
    classPrefix: ''
  } );
  $('pre codehl').each( function( i, block ) {
    hljs.highlightBlock( block );
  } );
} );

