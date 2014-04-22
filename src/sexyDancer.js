var SexyDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);

  this.$node.addClass('blackhole spin');
};

SexyDancer.prototype = Object.create(Dancer.prototype);
SexyDancer.prototype.constructor = SexyDancer;
