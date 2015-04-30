var currentPageUrlIs = '';

if (typeof this.href != 'undefined')
  currentPageUrlIs = this.href.toString().toLowerCase(); 
else
  currentPageUrlIs = document.location.toString().toLowerCase();

$(document).ready( function() {
  if (currentPageUrlIs == 'http://snake174.github.io/html/games/birds.html?p=1')
  {
    console.log('Show programmly');
  }
} )

