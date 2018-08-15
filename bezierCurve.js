const CP1_COORDS = {
	x: 90,
	y: 90
};

const CP2_COORDS = {
	x: 165,
	y: 165
};

const BEZIER_START_COORDS = {
  x: 50,
  y: 50
};

const BEZIER_END_COORDS = {
	x: 205,
	y: 205
};

var controlPoint = document.getElementById('1');
controlPoint.style.left = CP1_COORDS.x - 5 + 'px';
controlPoint.style.top = CP1_COORDS.y - 5 + 'px';

var controlPoint2 = document.getElementById('2');
controlPoint2.style.left = CP2_COORDS.x - 5 + 'px';
controlPoint2.style.top = CP2_COORDS.y - 5 + 'px';

var drawPanel = document.getElementById('draw-panel');

//Drag and drop функция контроля кривой Безье
var moveControlPoint = (evt, cp1, CP_COORDS) => {
	
  evt.preventDefault();
	
  var id = evt.target.id;
  var cp = cp1;
  
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

    var nextTopCoord = cp.offsetTop - shift.y;
    var nextLeftCoord = cp.offsetLeft - shift.x;

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    
    cp.style.top = nextTopCoord + 'px';
    cp.style.left = nextLeftCoord + 'px';
  
    CP_COORDS.x = nextLeftCoord;
    CP_COORDS.y = nextTopCoord;
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

controlPoint.addEventListener('mousedown', function(evt) {
	moveControlPoint(evt, controlPoint, CP1_COORDS);
});

controlPoint2.addEventListener('mousedown', function(evt) {
	moveControlPoint(evt, controlPoint2, CP2_COORDS);
});

//Функция рендера кривой Безье
function draw(move){
  var canvas = document.getElementById('bezier-curve');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');
    var drawBezie = () => {
      ctx.beginPath();
      ctx.moveTo(BEZIER_START_COORDS.x, BEZIER_START_COORDS.y);
      ctx.bezierCurveTo(CP1_COORDS.x, CP1_COORDS.y, 
                            CP2_COORDS.x, CP2_COORDS.y, 
                            BEZIER_END_COORDS.x, BEZIER_END_COORDS.y)
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
