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
}

TrackTriggers.prototype.add = function( trigger ) {
  this.triggers.push( trigger );
}

TrackTriggers.prototype.update = function( car ) {
  for (var i = 0; i < 3; ++i) {
    var t = this.triggers[i];
    var dx = t.pos.x - car.pos.x;
    var dy = t.pos.y - car.pos.y;
    var len = Math.sqrt( dx * dx + dy * dy );

    if (len <= 45) {
      if (!t.isTriggered) {
        console.log( this.isLapComplete() );
        if (this.currentLap == 0 && i == 0 && this.triggers[2].isTriggered == false)
          return;

        t.isTriggered = true;

        if (this.isLapComplete()) {
          ++this.currentLap;

          if (this.currentLap == 3)
            this.done = true;

          this.clear();
        }
      }
    }
  }
}

TrackTriggers.prototype.isLapComplete = function() {
  return
    this.triggers[0].isTriggered == true
    && this.triggers[1].isTriggered == true
    && this.triggers[2].isTriggered == true;
}

TrackTriggers.prototype.clear = function() {
  for (var i = 0; i < 3; ++i)
    this.triggers[i].isTriggered = false;
}

var trackTriggers = new TrackTriggers();

for (var i = 0; i < 3; ++i) {
  trackTriggers.add( new Trigger( triggersPos[i][0], triggersPos[i][1] ) );
}
