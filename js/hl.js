$(document).ready( function() {
  hljs.configure( {
    tabReplace: '  ',
    classPrefix: '',
    useBR: true
  } );
  $('div.code').each( function( i, block ) {
    hljs.highlightBlock( block );
  } );
} );

