var Block = function( x, y ) {
  var pos = new Vec2( x, y );
  var img = new Image();
  img.src = 'img/box.png';

  return {
    pos,
    draw: function( ctx ) {
      ctx.save();
      ctx.translate( pos.x, pos.y );
      ctx.drawImage( img, -8, -8 );
      ctx.restore();
    }
  }
}
