var GrowDancer = function (top, left, timeBetweenSteps) {
  this.oldStep = Dancer.prototype.step;
  Dancer.call(this, top, left, timeBetweenSteps);
};

GrowDancer.prototype = Object.create(Dancer.prototype);
GrowDancer.prototype.constructor = GrowDancer;

GrowDancer.prototype.step = function () {
  this.oldStep();

  var diameter = this.$node.css('border-width');
  diameter = parseInt(diameter);
  diameter = diameter * this.getRandomInt(1,10);

  this.$node.css({
    height: diameter,
    width: diameter,
    'border-radius': '999em'
  });
};
