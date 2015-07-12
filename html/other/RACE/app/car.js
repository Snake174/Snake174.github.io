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
    this.model = this.collection.curModel();
    this.model.bind( 'change', _.bind( this.render, this ) );
    this.render();
  },
  render: function() {
    this.$el.html( this.tpl( this.model.attributes ) );
    return this;
  }
} );

var CarCollection = Backbone.Collection.extend( {
  model: CarModel,
  initialize: function() {
    this._meta = {};
    this.meta( 'currentCar', 0 );
  },
  meta: function( prop, value ) {
    if (value === undefined)
      return this._meta[ prop ];
    else {
      this._meta[ prop ] = value;
      this.trigger( 'change:' + prop, value );
    }
  },
  next: function() {
    var cc = this.meta('currentCar');
    ++cc;

    if (cc > this.length - 1)
      cc = 0;

    this.meta( 'currentCar', cc );

    return this.at( cc );
  },
  prev: function() {
    var cc = this.meta('currentCar');
    --cc;

    if (cc < 0)
      cc = this.length - 1;

    this.meta( 'currentCar', cc );

    return this.at( cc );
  },
  curModel: function() {
    return this.at( this.meta('currentCar') );
  }
} );
