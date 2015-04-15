$(document).ready( function() {
  hljs.configure( {
    tabReplace: '  ',
    classPrefix: ''
  } );
  $('pre div.code').each( function( i, block ) {
    hljs.highlightBlock( block );
  } );
} );

