$(document).ready(function(){
  window.dancers = [];

  $(".addDancerButton").on("click", function(event){
    /* This function sets up the click handlers for the create-dancer
     * buttons on index.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];
    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000
    );

    window.dancers.push(dancer);

    $('body').append(dancer.$node);
  });

  $(".lineUpButton").on("click", function(event) {
    for (var i = 0; i < window.dancers.length; i++) {
      var dancer = window.dancers[i];
      dancer.lineUp();
    }
  });

  var makeBlackhole = false;
  window.hasBlackhole = false;
  window.blackHole = {};

  $(".toggleBlackHole").on("click", function (event) {
    var $btn = $(this);
    event.stopPropagation();
    makeBlackhole = !makeBlackhole;

    if ($btn.hasClass('selected')) {
      $btn.removeClass('selected');
    } else {
      $btn.addClass('selected');
    }
  });

  // Place exploding dancing stars
  $("body").on("click", function (event) {
    var x = event.pageX;
    var y = event.pageY;

    if (makeBlackhole) {

      var radius = 100;
      var blackhole = new SexyDancer(y - radius, x - radius, 100);
      $('body').append(blackhole.$node);

      window.blackHole.x = x;
      window.blackHole.y = y;

      window.hasBlackhole = true;
    } else {
      var count = Math.ceil(Math.random() * 100);
      var dancers = [];

      for (var i=0; i<count; i++) {
        var timeBetweenSteps = Math.random() * 1000;

        // generate a random position with a 50px area
        // var startX = getRandomInt(x-10, x+10);
        // var startY = getRandomInt(y-10, y+10);
        var points = getRandomPointInCircle(5);
        var startX = points[0] + x;
        var startY = points[1] + y;

        // place dancer at the position
        var dancer = new BlinkyDancer(startY, startX, timeBetweenSteps);
        dancer.$node.addClass('tiny');
        $('body').append(dancer.$node);
        dancers.push(dancer);
      }

      // explode the dancers
      setTimeout(function () {
        for (var i=0; i<dancers.length; i++) {
          // calculate random end postion
          var endX = $("body").width() * Math.random() - 10;
          var endY = $("body").height() * Math.random() - 10;

          dancers[i].$node.animate({
            top: endY,
            left: endX
          }, 1000);
        }
      }, 200);
    }
  });
});

var getRandomPointInCircle = function (radius) {
  radius = radius || 50;
  var x = Math.random() * 2 * radius - radius;
  var ylim = Math.sqrt(radius * radius - x * x);
  var y = Math.random() * 2 * ylim - ylim;

  return [x, y];
};

