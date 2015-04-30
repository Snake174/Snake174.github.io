$(document).ready(function(){$(window).scroll(function(){$(this).scrollTop()>=100?$('#top-link-block').show():$('#top-link-block').hide();});
var currentPageUrlIs = '';
if (typeof this.href != 'undefined')
  currentPageUrlIs = this.href.toString().toLowerCase(); 
else
  currentPageUrlIs = document.location.toString().toLowerCase();
console.log(currentPageUrlIs);
});
