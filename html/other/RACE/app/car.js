var CarModel = Backbone.Model.extend( {
  name: '',
  image: '',
  imageLarge: '',
  speed: 0,
  handling: 0,
  initialize: function() {
    if (this.get('name').trim() !== '') {
      this.set( 'image', 'img/car/' + this.get('name') + '.png' );
      this.set( 'imageLarge', 'img/car/' + this.get('name') + '-large.png' );
    }
  }
} );

var CarView = Backbone.View.extend( {
  tpl: _.template( $('#car-view-tpl').html() ),
  initialize: function( options ) {
    this.options = options || {};
    this._meta = {};
    this.meta( 'currentCar', 0 );
    this.model = this.collection.at(0);
    this.model.bind( 'change', _.bind( this.render, this ) );
    this.render();
  },
  meta: function( prop, value ) {
    if (value === undefined)
      return this._meta[ prop ];
    else {
      this._meta[ prop ] = value;
      this.trigger( 'change:' + prop, value );
    }
  },
  render: function() {
    this.$el.html( this.tpl( this.model.attributes ) );
    return this;
  },
  next: function() {
    var cc = this.meta('currentCar');
    ++cc;

    if (cc > this.collection.length - 1)
      cc = 0;

    this.meta( 'currentCar', cc );

    this.model.set( this.collection.at( cc ).toJSON() );
  },
  prev: function() {
    var cc = this.meta('currentCar');
    --cc;

    if (cc < 0)
      cc = this.collection.length - 1;

    this.meta( 'currentCar', cc );

    this.model.set( this.collection.at( cc ).toJSON() );
  },
  curModel: function() {
    return this.model;
  }
} );

var CarCollection = Backbone.Collection.extend( {
  model: CarModel
} );

var Car = function( x, y, angle, model ) {
  this.pos = new Vec2( x, y );
  this.angle = angle;
  this.dir = new Vec2(
    Math.sin( this.angle * Math.PI / 180 ),
    -Math.cos( this.angle * Math.PI / 180 )
  );
  this.maxAcc = 4.0;
  this.curAcc = 0.0;
  this.img = new Image();
  this.img.src = model.get('image');
  this.speed = model.get('speed');
  this.handling = model.get('handling');
}

Car.prototype.draw = function( ctx ) {
  ctx.save();
  ctx.translate( this.pos.x, this.pos.y );
  ctx.rotate( this.angle * Math.PI / 180 );
  ctx.drawImage( this.img, -16, -16 );
  ctx.restore();
}

Car.prototype.update = function( dt, keys ) {
  this.pos.x += this.dir.x * dt * this.speed * this.curAcc;
  this.pos.y += this.dir.y * dt * this.speed * this.curAcc;

  if (keys[37] == 1) {
    if (this.curAcc >= 0)
      this.angle -= this.handling * dt;
    else
      this.angle += this.handling * dt;

    this.dir.set(
      Math.sin( this.angle * Math.PI / 180 ),
      -Math.cos( this.angle * Math.PI / 180 )
    );
  }

  if (keys[39] == 1) {
    if (this.curAcc >= 0)
      this.angle += this.handling * dt;
    else
      this.angle -= this.handling * dt;

    this.dir.set(
      Math.sin( this.angle * Math.PI / 180 ),
      -Math.cos( this.angle * Math.PI / 180 )
    );
  }

  if (keys[38] == 1) {
    var len = Math.sqrt( this.dir.x * this.dir.x + this.dir.y * this.dir.y );
    var s = 1.0 / len;
    this.dir.x *= s;
    this.dir.y *= s;
    this.curAcc += 0.3 * dt;

    if (this.curAcc > this.maxAcc)
      this.curAcc = this.maxAcc;
  }

  if (keys[40] == 1) {
    var len = Math.sqrt( this.dir.x * this.dir.x + this.dir.y * this.dir.y );
    var s = 1.0 / len;
    this.dir.x *= s;
    this.dir.y *= s;
    this.curAcc -= 0.3 * dt;

    if (this.curAcc < -this.maxAcc * 0.5)
      this.curAcc = -this.maxAcc * 0.5;
  }
}

Car.prototype.pos = function() {
  return this.pos;
}
