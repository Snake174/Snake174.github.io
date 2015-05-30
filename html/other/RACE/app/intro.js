define( function() {
  return {
    Intro: function() {
      return Backbone.View.extend( {
        initialize: function() {
          var view = this;
          this.doc = document;
          this.canvas = this.$el.get(0);
          this.ctx = this.$el.get(0).getContext('2d');
          this.doc.getElementById('loading').style.display = 'none';
          this.logo = new Image();
          this.logo.onload = function () { view.onResize(); view.render(); };
          this.logo.src = 'img/logo.png';
          //$(window).on( 'resize', function() { view.onResize(); } );
        },
        render: function () {
          this.ctx.drawImage( this.logo, 100, 100 );
        },
        onResize: function () {
          var rc = this.doc.getElementById('game-container').getBoundingClientRect();
          var cw = Math.floor( rc.right - rc.left );
          var ch = Math.floor( rc.bottom - rc.top );

          this.doc.getElementById('game').style.width = cw + 'px';
          this.doc.getElementById('game').style.height = ch + 'px';
          this.canvas.width = cw;
          this.canvas.height = ch;
        }
      });
    }
  }
} );
