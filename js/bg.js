$(document).ready( function() {

  var currentPageUrlIs = '';

  if (typeof this.href != 'undefined')
    currentPageUrlIs = this.href.toString().toLowerCase();
  else
    currentPageUrlIs = document.location.toString().toLowerCase();

  console.log( currentPageUrlIs );

  if (currentPageUrlIs == 'http://snake174.github.io/html/games/birds-game.html?p=1')
  {
    console.log('Show programmly');
  }

} )

