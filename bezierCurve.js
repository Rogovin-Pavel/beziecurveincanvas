const BEZIER_COORDS = {
  cp1x: 90,
  cp1y: 90,
  cp2x: 165,
  cp2y: 165,
  x: 205,
  y: 205
}

const START_COORDS = {
  x: 50,
  y: 50
}

var controlPoint = document.getElementById('1');
controlPoint.style.left = BEZIER_COORDS.cp1x - 5 + 'px';
controlPoint.style.top = BEZIER_COORDS.cp1y - 5 + 'px';

var controlPoint2 = document.getElementById('2');
controlPoint2.style.left = BEZIER_COORDS.cp2x - 5 + 'px';
controlPoint2.style.top = BEZIER_COORDS.cp2y - 5 + 'px';

var moveControlPoint = (evt) => {
  console.log(evt.target.id);
  evt.preventDefault();
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  }
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    var nextTopCoord = controlPoint.offsetTop - shift.y;
    var nextLeftCoord = controlPoint.offsetLeft - shift.x;
    
    

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    
    controlPoint.style.top = nextTopCoord + 'px';
    controlPoint.style.left = nextLeftCoord + 'px';
  
    BEZIER_COORDS.cp1x = nextLeftCoord;
    BEZIER_COORDS.cp1y = nextTopCoord;
    draw(true);
  };

  

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp); 
}

var moveControlPoint2 = (evt) => {
  console.log(evt.target.id);
  evt.preventDefault();
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  }
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    var nextTopCoord = controlPoint2.offsetTop - shift.y;
    var nextLeftCoord = controlPoint2.offsetLeft - shift.x;
    
    

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    
    controlPoint2.style.top = nextTopCoord + 'px';
    controlPoint2.style.left = nextLeftCoord + 'px';
  
    BEZIER_COORDS.cp2x = nextLeftCoord;
    BEZIER_COORDS.cp2y = nextTopCoord;
    draw(true);
  };

  

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp); 
}

controlPoint.addEventListener('mousedown', moveControlPoint);
controlPoint2.addEventListener('mousedown', moveControlPoint2);



function draw(move){
  var canvas = document.getElementById('bezier-curve');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');
    var drawBezie = () => {
      ctx.beginPath();
      ctx.moveTo(START_COORDS.x, START_COORDS.y);
      ctx.bezierCurveTo(BEZIER_COORDS.cp1x, BEZIER_COORDS.cp1y, 
                            BEZIER_COORDS.cp2x, BEZIER_COORDS.cp2y, 
                            BEZIER_COORDS.x, BEZIER_COORDS.y)
      ctx.stroke();
    }
    if (move) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBezie();
    } else {
      drawBezie();
    }
  }
}