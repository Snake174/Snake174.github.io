var Trigger = function( x, y ) {
  this.pos = new Vec2( x, y );
  this.isTriggered = false;
}

var triggersPos = new Array(
  [ 440, 500 ],
  [ 540, 75 ],
  [ 150, 340 ]
);

var TrackTriggers = function() {
  this.triggers = new Array();
  this.currentLap = 0;
  this.done = false;
  this.curTrigger = 1;
  this.needTriggers = 9;
  this.trigger = 0;
}

TrackTriggers.prototype.add = function( trigger ) {
  this.triggers.push( trigger );
}

TrackTriggers.prototype.update = function( car ) {
  var t = this.triggers[ this.curTrigger ];
  var dx = t.pos.x - car.pos.x;
  var dy = t.pos.y - car.pos.y;
  var len = Math.sqrt( dx * dx + dy * dy );

  if (len <= 45) {
    if (!t.isTriggered) {
      t.isTriggered = true;

      ++this.trigger;

      if (this.trigger == this.needTriggers)
        this.done = true;

      if (this.trigger % 3 == 0) {
        ++this.currentLap;
        this.triggers[0].isTriggered = false;
        this.triggers[1].isTriggered = false;
        this.triggers[2].isTriggered = false;
      }

      ++this.curTrigger;

      if (this.curTrigger > 2)
        this.curTrigger = 0;
    }
  }
}

var trackTriggers = new TrackTriggers();

for (var i = 0; i < 3; ++i) {
  trackTriggers.add( new Trigger( triggersPos[i][0], triggersPos[i][1] ) );
}
