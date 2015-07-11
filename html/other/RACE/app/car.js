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
    this.model.bind( 'change', _.bind( this.render, this ) );
    this.render();
  },
  render: function() {
    this.$el.html( this.tpl( this.model.attributes ) );
    return this;
  }
} );

var CarCollection = Backbone.Collection.extend( {
  model: CarModel
} );
