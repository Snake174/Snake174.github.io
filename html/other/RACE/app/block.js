var Block = function( x, y ) {
  this.pos = new Vec2( x, y );
  this.img = new Image();
  this.img.src = 'img/box.png';
}

Block.prototype.draw = function( ctx ) {
  ctx.save();
  ctx.translate( this.pos.x, this.pos.y );
  ctx.drawImage( this.img, -8, -8 );
  ctx.restore();
}
