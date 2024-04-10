var bgTex;
let bgCloud;
var bgCloud2;
var seed;
// var seedDay;
var illusHour;
var illusDay;
var illusMonth;
var illusYear;
var currentMinute;
 
function setup() {
  createCanvas(380, 800);
  colorMode(HSL);
  seed = parseInt(`${month()}${day()}${year()}${hour()}${minute()}`);
  console.log(seed);
  // testseed = 1218202305;
  //testseed = 12820340;
  // seed = testseed;
  //get the time of day
  illusHour = hour();
  illusDay = day();
  illusMonth = month();
  illusYear = year();

  //set the background color
  background(360, 360, 360);
  //figure out the am pm
  var ampm;
  ampm = whichM(illusHour);

  var aMinute;

  if (minute().length > 1) {
    aMinute = minute();
  } else {
    aMinute = "0" + minute();
  }

  var title = "In this story, today is " + illusMonth + "." + illusDay + "." + illusYear + " \n at " + illusHour%12 + ":" + aMinute + " " + ampm;;
  textAlign(CENTER);
  text(title, 200, 50);

  currentMinute = minute();
  setInterval(changedTime, 1000);
}

function draw() {
  noLoop();
  randomSeed(seed);

  bgCloud = new Cloud(0.8, seed);
  // bgCloud.color = [random(0, 360), random(20, 80), random(20, 99), seed];
  bgCloud.color = [random(0, 360), random(80, 100), random(20, 99), seed];
  //bgCloud.color = [46, 90, 60];
  bgCloud2 = new Cloud(0.5, seed+1);
  // bgCloud2.color = [random(0, 360), random(20, 80), random(20, 99), seed];
  bgCloud2.color = [random(0, 360), random(80, 100), random(20, 99), seed];

  //bgCloud2.color = [180, 53, 60];
  //bgHaze = new Stipple()

  bgCloud.drawcloud(380, 600);
  bgCloud2.drawcloud(380, 590);

  //under
  
  drawSun(illusHour, random(20,200), random(0, 360), 100, 50, seed);
  // push();
  // noStroke();
  // fill(360, 5, 80);
  // rect(0, 400, 400, 200);
  // pop();
  
  var mount = new Mountain(seed);
  mount.color = [random(0, 360), random(20, 80), random(20, 60), seed];

  mount.drawRange(380, 500);

  var mount2 = new Mountain(seed + 1);
  mount2.angle = 30;
  mount2.color = [random(0, 360), random(20, 80), random(20, 30), seed];
  mount2.drawRange(380, 400);

  // bgTex = new Stipple(3, 4, 1.0, seed);
  // bgTex.color = [random(0, 360), random(20, 80), random(20, 80), seed];
  // bgTex.drawRectangle(width, height);

  // const characterOrder = [];

  // var friendNum = random(0, 5);
  // for (let i = 0; i < friendNum; i++) {
  //   var friend = new Person(seed + random(5));
  //   characterOrder.push(friend);
  // }

  // let character = new Person(seedDay);
  // character.bodyColor = mount2.color;
  // character.bodyColor[2] = character.bodyColor[2] * 0.8;
  // //character.drawPerson(random(50, width-50), random(400, height));
  // characterOrder.push(character);

  // let heights = new Array();
  // heights[0] = random(400, 420);
  // for (let i = 1; i < characterOrder.length; i++) {
  //   heights[i] = min(550, heights[i-1] + random(5, 50));
  // }

  // for (let i = 0; i < characterOrder.length; i++) {
  //   characterOrder[i].drawPerson(random(50, width-50), heights[i]);
  // }
  
}

function changedTime() {
  // Check if the minute has changed
  
  if (minute() !== currentMinute) {
    // Update current minute
    clear();
    currentMinute = minute();
    // Update the seed
    seed = parseInt(`${month()}${day()}${year()}${hour()}${minute()}`);
    // seed = 12820340;
    // Trigger a redraw
    background(360, 5, 80);
    redraw();
  }
}

function whichM(hour) {
  if (hour < 12) {
    ampm = "AM";
  } else {
    ampm = "PM";
  }
  return ampm;
}

function Person(seed) {
  this.seed = seed;

  this.hatColor = [10, 50, 50];
  this.bodyColor = [random(0, 360), random(20, 80), random(20, 30)];
  this.scale = random(1,3);
  //coinFlip = random(0,1);
  //randomSeed(this.seed);
  this.orient = random(['left', 'right']);
  //console.log(this.orient);
  //this.orient = 'right';
  this.pheight = random(20, 50) * this.scale;
  //randomSeed(this.seed);
  this.drawPerson = function(xPos, yPos) {
  //this.drawPerson = function(xPos, yPos) {

    //draw hat
    noStroke();
    fill(this.hatColor[0], this.hatColor[1], this.hatColor[2]);
    angle = 130;
    if (this.orient == 'right') {
      angle = -angle;
    };

    angleMode(DEGREES);
    x1 = 4 * cos(angle) * this.scale + xPos;
    y1 = 4 * sin(angle) * this.scale + yPos;
    x2 = 4 * cos(angle + 180) * this.scale + xPos;
    y2 = 4 * sin(angle + 180) * this.scale + yPos;
    x3 = 12 * cos(angle + 90) * this.scale + xPos;
    y3 = 12 * sin(angle + 90) * this.scale + yPos;
    triangle(x1, y1, x2, y2, x3, y3);

    //draw head
    fill(this.bodyColor[0], this.bodyColor[1], this.bodyColor[2]);
    
    circle(xPos, yPos, 8 * this.scale);

    //draw body
    //randomSeed(this.seed);
    leftOffset = random(5, 40);
    rightOffset = random(5, 40);
    //fill(0, 0, 0)
    personHeight = this.pheight;
    beginShape();
    //first control
    curveVertex(xPos - random(100) * this.scale,yPos + 25);
    //first point
    curveVertex(xPos - leftOffset * this.scale,yPos + personHeight);
    //top point
    curveVertex(xPos + random(-5, 6) * this.scale,yPos + (5 * this.scale));
    //last point
    curveVertex(xPos + rightOffset * this.scale,yPos + personHeight);
    //last control
    curveVertex(xPos + random(100) * this.scale, yPos);
    endShape();
  }
}

function Mountain(seed) {
  this.color = [0, 0, 0];
  this.strokeWeight;
  this.angle = 45;

  this.drawRange = function(shapeW, shapeH) {
    let noiseScale = 0.007;
    stroke(this.color[0], this.color[1], this.color[2]);
    strokeWeight(0.5);
    let yCoords = new Array(shapeW + 2)
    let xCoords = new Array(shapeW + 2)
    noiseSeed(seed);
    randomSeed(seed);

    //find wave points
    for (let x = 0; x < shapeW; x += 1) {
      let nx = noiseScale * x;
      xCoords[x] = x;
      yCoords[x] = shapeH + 200 * noise(nx) - 100;
    }
    xCoords[shapeW] = width;
    yCoords[shapeW] = height;
    xCoords[shapeW + 1] = 0;
    yCoords[shapeW + 1] = height;

    //fill
    var scribble = new Scribble();
    scribble.roughness = 1;
    scribble.bowing = 1;
    scribble.scribbleFilling(xCoords, yCoords, 2, this.angle);
  }
}

function Cloud(transparency, seed) {
  // set properties
  this.color = [0, 0, 0];
  this.transparency = transparency;
  this.drawcloud = function (x, y) {
    let noiseScale = 0.005;
    noiseSeed(seed);
    console.log(this.transparency);
    //randomSeed(seed);
    
    for (let i = 0; i < x; i+=1) {
      for (let j = 0; j < y; j+=1) {
        
        let nx = noiseScale * i;
        let ny = noiseScale * j;
        stroke(this.color[0], this.color[1], this.color[2], this.transparency * noise(nx, ny));
        strokeWeight(1.8);
        // point(i, j);
        point(i + randomGaussian(-5, 5), j + randomGaussian(-5, 5));
      }
    }
  }
}

function Stipple(r, k, thickness, seed) {
  this.color = [0, 0, 0, 0];
  this.strokeWeight = thickness;
  this.drawRectangle = function(rectW, rectH) {
    var grid = [];
    var w = r / Math.sqrt(2);
    //array of sample indices
    var active = [];
    var cols, rows;
    var ordered = [];
    
    //create a grid with colomns rows
    cols = floor(rectW / w);
    rows = floor(rectH / w);
    //initialize
    for (var i = 0; i < cols * rows; i++) {
      grid[i] = undefined;
    }
    
    var x = rectW / 2;
    var y = rectH / 2;
    var i = floor(x / w);
    var j = floor(y / w);
    var pos = createVector(x, y);
    grid[i + j * cols] = pos;
    active.push(pos);
    
    //randomSeed(seed);
    
    for (var total = 0; total < 25; total++) {
      while (active.length > 0) {
        //choose random index in array
        var randIndex = floor(random(active.length));
        var pos = active[randIndex];
        var found = false;
        for (var n = 0; n < k; n++) {
          // generate random vector
          //var sample = p5.Vector.random2D();
          //randomSeed(5);
          //var vectorX = random();
          //var vectorY = random();
          var angle = random() * TWO_PI;
          var sample = createVector(cos(angle), sin(angle));
          // set magnitude between r and 2r
          var m = random(r, 2 * r);
          sample.setMag(m);
          sample.add(pos);
  
          var col = floor(sample.x/ w);
          var row = floor(sample.y/ w);
          
          if (col > -1 && row > -1 && col < cols && row < rows && !grid[col + row * cols]) {
          //go through neighboring distances
            var ok = true;
            for (var i = -1; i <= 1; i++) {
              for (var j = -1; j <= 1; j++) {
                var index = (col + i) + (row + j) * cols;
                var neighbor = grid[index];
                //if neighbor exists
                if (neighbor) {
                  var d = p5.Vector.dist(sample, neighbor);
                  //if it's not far enough
                  if (d < r) {
                    ok = false;
                  }
                }
              }
            }
            // if it's far enough also add the neighbor
            if (ok) {
              found = true;
              grid[col + row * cols] = sample;
              active.push(sample);
              ordered.push(sample);
              //break;
            }
          }
        }
        //remove the sample from the list
        if (!found) {
          active.splice(randIndex, 1);
        }
      }
    }
    
    for (var i = 0; i < ordered.length; i++) {
      if (ordered[i]) {
        stroke(this.color[0], this.color[1], this.color[2], this.color[3]);
        strokeWeight(this.strokeWeight);
        point(ordered[i].x, ordered[i].y);
      }
    }
  }
}

function drawSun(h, scale, colorH, colorS, colorL, seed) {
  //calculate appropriate height and shape
  //day time
  var sunheight;
  if (h <= 12 && h > 5) {
    sunheight = height - 40 - (h - 5) * 60;
    //console.log(sunheight);
  } else if (h <= 20) {
    sunheight = (h - 12) * 50 + 100;
  }
  /*fill(317, 100, 50);
  noStroke();
  ellipse(200, sunheight, 100);*/
  drawBlurryCircle(200, sunheight, scale, colorH, colorS, colorL, seed)
}

function drawBlurryCircle(x, y, w, colorH, colorS, colorL, seed) {
  noStroke();
  //randomSeed(seed);
  for (let i=10; i<w; i++){
    transparency = max(0.04, 0.2 - 0.01*i)
    fill(colorH, colorS, colorL, transparency)
    xc = randomGaussian(50, (i+1)/20) + (x-50)
    yc = randomGaussian(50, (i+1)/20) + (y-50)
    //x = randomGaussian(50, 2) + 100
    //y = randomGaussian(50, 2) + 100
    circle(xc, yc, w)
  }
}

function Scribble(p) {
  this.sketch = p || window;
  this.bowing = 1;
  this.roughness = 1;
  this.maxOffset = 2;
  this.numEllipseSteps = 9;
  this.ellipseInc = (Math.PI*2)/this.numEllipseSteps;

  this.getOffset = function( minVal, maxVal ) {
    return this.roughness*(this.sketch.random()*(maxVal-minVal)+minVal);
  }

  this.buildEllipse = function( cx, cy, rx, ry, offset, overlap ) {
    var radialOffset = this.getOffset( -0.5, 0.5 )-Math.PI/2;

    this.sketch.beginShape();
    this.sketch.curveVertex( this.getOffset( -offset, offset )+cx+0.9*rx*Math.cos( radialOffset-this.ellipseInc ),
        this.getOffset( -offset, offset )+cy+0.9*ry*Math.sin( radialOffset-this.ellipseInc ) );

    for ( var theta = radialOffset; theta < Math.PI*2+radialOffset-0.01; theta+=this.ellipseInc ) {
      this.sketch.curveVertex( this.getOffset( -offset, offset )+cx+rx*Math.cos( theta ),
          this.getOffset( -offset, offset )+cy+ry*Math.sin( theta ) );
    }

    this.sketch.curveVertex( this.getOffset( -offset, offset )+cx+rx*Math.cos( radialOffset+Math.PI*2+overlap*0.5 ),
        this.getOffset( -offset, offset )+cy+ry*Math.sin( radialOffset+Math.PI*2+overlap*0.5 ) );

    this.sketch.curveVertex( this.getOffset( -offset, offset )+cx+0.98*rx*Math.cos( radialOffset+overlap ),
        this.getOffset( -offset, offset )+cy+0.98*ry*Math.sin( radialOffset+overlap ) );

    this.sketch.curveVertex( this.getOffset( -offset, offset )+cx+0.9*rx*Math.cos( radialOffset+overlap*0.5 ),
        this.getOffset( -offset, offset )+cy+0.9*ry*Math.sin( radialOffset+overlap*0.5 ) );
    this.sketch.endShape();
  }

  this.getIntersectingLines = function( lineCoords, xCoords, yCoords ) {
    var intersections = [];
    var s1 = new Segment( lineCoords[0], lineCoords[1], lineCoords[2], lineCoords[3] );

    for ( var i = 0; i < xCoords.length; i++ ) {
      var s2 = new Segment( xCoords[i], yCoords[i], xCoords[(i+1)%xCoords.length], yCoords[(i+1)%xCoords.length] );

      if ( s1.compare(s2) == Relation.INTERSECTS ) {
        intersections.push( [s1.getIntersectionX(), s1.getIntersectionY()] );
      }
    }
    return intersections;
  }

  this.scribbleLine = function( x1, y1, x2, y2 ) {
    var lenSq = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);
    var offset = this.maxOffset;

    if ( this.maxOffset*this.maxOffset*100 > lenSq ) {
      offset = Math.sqrt( lenSq )/10;
    }

    var halfOffset = offset/2;
    var divergePoint = 0.2 + this.sketch.random()*0.2;
    var midDispX = this.bowing*this.maxOffset*(y2-y1)/200;
    var midDispY = this.bowing*this.maxOffset*(x1-x2)/200;
    midDispX = this.getOffset( -midDispX, midDispX );
    midDispY = this.getOffset( -midDispY, midDispY );

    this.sketch.noFill();

    this.sketch.beginShape();
    this.sketch.vertex(     x1 + this.getOffset( -offset, offset ), y1 + this.getOffset( -offset, offset ) );
    this.sketch.curveVertex(x1 + this.getOffset( -offset, offset ), y1 + this.getOffset( -offset, offset ) );
    this.sketch.curveVertex(midDispX+x1+(x2 -x1)*divergePoint + this.getOffset( -offset, offset ), midDispY+y1 + (y2-y1)*divergePoint + this.getOffset( -offset, offset ) );
    this.sketch.curveVertex(midDispX+x1+2*(x2-x1)*divergePoint + this.getOffset( -offset, offset ), midDispY+y1+ 2*(y2-y1)*divergePoint + this.getOffset( -offset,offset ) );
    this.sketch.curveVertex(x2 + this.getOffset( -offset, offset ), y2 + this.getOffset( -offset, offset ) );
    this.sketch.vertex(     x2 + this.getOffset( -offset, offset ), y2 + this.getOffset( -offset, offset ) );
    this.sketch.endShape();

    this.sketch.beginShape();
    this.sketch.vertex(     x1 + this.getOffset( -halfOffset, halfOffset ), y1 + this.getOffset( -halfOffset, halfOffset ) );
    this.sketch.curveVertex(x1 + this.getOffset( -halfOffset, halfOffset ), y1 + this.getOffset( -halfOffset, halfOffset ) );
    this.sketch.curveVertex(midDispX+x1+(x2 -x1)*divergePoint + this.getOffset( -halfOffset, halfOffset ), midDispY+y1 + (y2-y1)*divergePoint + this.getOffset( -halfOffset, halfOffset ) );
    this.sketch.curveVertex(midDispX+x1+2*(x2-x1)*divergePoint + this.getOffset( -halfOffset, halfOffset ), midDispY+y1+ 2*(y2-y1)*divergePoint + this.getOffset( -halfOffset, halfOffset ) );
    this.sketch.curveVertex(x2 + this.getOffset( -halfOffset, halfOffset ), y2 + this.getOffset( -halfOffset, halfOffset ) );
    this.sketch.vertex(     x2 + this.getOffset( -halfOffset, halfOffset ), y2 + this.getOffset( -halfOffset, halfOffset ) );
    this.sketch.endShape();
  }

  this.scribbleCurve = function( x1, y1, x2, y2, x3, y3, x4, y4 ) {
    this.sketch.bezier(  x1+this.getOffset( -2, 2 ), y1+this.getOffset( -2, 2 ),
             x3+this.getOffset( -4, 4 ), y3+this.getOffset( -3, 3 ),
             x4+this.getOffset( -3, 3 ), y4+this.getOffset( -3, 3 ),
             x2+this.getOffset( -1, 1 ), y2+this.getOffset( -1, 1 ) );

    this.sketch.bezier(  x1+this.getOffset( -2, 2 ), y1+this.getOffset( -2, 2 ),
             x3+this.getOffset( -3, 3 ), y3+this.getOffset( -3, 3 ),
             x4+this.getOffset( -3, 3 ), y4+this.getOffset( -4, 4 ),
             x2+this.getOffset( -2, 2 ), y2+this.getOffset( -2, 2 ) );
  }

  this.scribbleRect = function( x, y, w, h ) {
    var halfWidth = w/2;
    var halfHeight = h/2;
    var left   = Math.min( x-halfWidth, x+halfWidth );
    var right  = Math.max( x-halfWidth, x+halfWidth );
    var top    = Math.min( y-halfHeight, y+halfHeight );
    var bottom = Math.max( y-halfHeight, y+halfHeight );

      this.scribbleLine( left, top, right, top );
      this.scribbleLine( right, top, right, bottom );
      this.scribbleLine( right, bottom, left, bottom );
      this.scribbleLine( left, bottom, left, top );
  }

  this.scribbleRoundedRect = function( x, y, w, h, radius ) {
    var halfWidth = w/2;
    var halfHeight = h/2;

    if ( radius == 0 || radius > halfWidth || radius > halfHeight ) {
      this.scribbleRect( x, y, w, h );
      return;
    }

    var left   = Math.min( x-halfWidth, x+halfWidth );
    var right  = Math.max( x-halfWidth, x+halfWidth );
    var top    = Math.min( y-halfHeight, y+halfHeight );
    var bottom = Math.max( y-halfHeight, y+halfHeight );

    this.scribbleLine( left+radius, top, right-radius, top, 1.5 );
    this.scribbleLine( right, top+radius, right, bottom-radius, 1.5 );
    this.scribbleLine( right-radius, bottom, left+radius, bottom, 1.5 );
    this.scribbleLine( left, bottom-radius, left, top+radius, 1.5 );

    this.scribbleCurve( left+radius, top, left, top+radius, left+radius*0.1, top+radius*0.1, left+radius*0.1, top+radius*0.1 );
    this.scribbleCurve( right-radius, top, right, top+radius, right-radius*0.1, top+radius*0.1, right-radius*0.1, top+radius*0.1 );
    this.scribbleCurve( left+radius, bottom, left, bottom-radius, left+radius*0.1, bottom-radius*0.1, left+radius*0.1, bottom-radius*0.1 );
    this.scribbleCurve( right-radius, bottom, right, bottom-radius, right-radius*0.1, bottom-radius*0.1, right-radius*0.1, bottom-radius*0.1 );
  }

  this.scribbleEllipse = function( x, y, w, h ) {
    var rx = Math.abs(w/2);
    var ry = Math.abs(h/2);

    rx += this.getOffset( -rx*0.05, rx*0.05 );
    ry += this.getOffset( -ry*0.05, ry*0.05 );

    this.buildEllipse( x, y, rx, ry, 1, this.ellipseInc*this.getOffset( 0.1, this.getOffset( 0.4, 1 ) ) );
    this.buildEllipse( x, y, rx, ry, 1.5, 0 );
  }

  this.scribbleFilling = function( xCoords, yCoords, gap, angle ) {
    if ((xCoords == null) || (yCoords == null) || (xCoords.length == 0) || (yCoords.length == 0)) {
        return;
      }

    var hachureAngle = this.sketch.radians( angle%180 );
    var cosAngle = Math.cos( hachureAngle );
    var sinAngle = Math.sin( hachureAngle );
    var tanAngle = Math.tan( hachureAngle );

    var left   = xCoords[0];
    var right  = xCoords[0];
    var top    = yCoords[0];
    var bottom = yCoords[0];

    for ( var i = 1; i < xCoords.length; i++ ) {
      left   = Math.min( left, xCoords[i] );
      right  = Math.max( right, xCoords[i] );
      top    = Math.min( top, yCoords[i] );
      bottom = Math.max( bottom, yCoords[i] );
    }

    var it = new HachureIterator( top-1, bottom+1, left-1, right+1, gap, sinAngle, cosAngle, tanAngle );
    var rectCoords = null;

    while ( (rectCoords = it.getNextLine()) != null ) {
      var lines = this.getIntersectingLines( rectCoords, xCoords, yCoords );

      for ( var i = 0; i < lines.length; i+=2 ) {
        if ( i < lines.length-1 ) {
          var p1 = lines[i];
          var p2 = lines[i+1];
          this.scribbleLine( p1[0], p1[1], p2[0], p2[1], 2 );
        }
      }
    }
  }
}

function HachureIterator( _top, _bottom, _left, _right, _gap, _sinAngle, _cosAngle, _tanAngle ) {
  var sinAngle = _sinAngle;
  var tanAngle = _tanAngle;
  var top = _top;
  var bottom = _bottom;
  var left = _left;
  var right = _right;
  var gap = _gap;

  var pos;
  var deltaX, hGap;
  var sLeft, sRight;

  if (Math.abs(sinAngle) < 0.0001)  {
    pos = left+gap;
  } else if (Math.abs(sinAngle) > 0.9999) {
    pos = top+gap;
  } else {
    deltaX = (bottom-top)*Math.abs(tanAngle);
    pos = left-Math.abs(deltaX);
    hGap = Math.abs(gap / _cosAngle);
    sLeft = new Segment(left, bottom, left, top);
    sRight = new Segment(right, bottom, right, top);
  }

  this.getNextLine = function() {
  	if (Math.abs(sinAngle) < 0.0001) {
  		if (pos < right) {
  			var line = [pos, top, pos, bottom];
  			pos += gap;
  			return line;
  		}
  	}	else if (Math.abs(sinAngle) > 0.9999) {
  		if (pos<bottom)	{
  			var line = [left, pos, right, pos];
  			pos += gap;
  			return line;
  		}
  	}	else {
  		var xLower = pos-deltaX/2;
  		var xUpper = pos+deltaX/2;
  		var yLower = bottom;
  		var yUpper = top;

  		if (pos < right+deltaX)	{
  			while (((xLower < left) && (xUpper < left)) || ((xLower > right) && (xUpper > right)))	{
  				pos += hGap;
  				xLower = pos-deltaX/2;
  				xUpper = pos+deltaX/2;

  				if (pos > right+deltaX)	{
  					return null;
  				}
  			}

  			var s = new Segment(xLower, yLower, xUpper, yUpper);

  			if (s.compare(sLeft) == Relation.INTERSECTS) {
  				xLower = s.getIntersectionX();
  				yLower = s.getIntersectionY();
  			}
  			if (s.compare(sRight) == Relation.INTERSECTS)	{
  				xUpper = s.getIntersectionX();
  				yUpper = s.getIntersectionY();
  			}
  			if (tanAngle > 0)	{
  				xLower = right-(xLower-left);
  				xUpper = right-(xUpper-left);
  			}

  			var line = [xLower, yLower, xUpper, yUpper];
  			pos += hGap;
  			return line;
  		}
  	}
  	return null;
  }
}

function Segment( _x1, _y1, _x2, _y2 ) {
  var x1 = _x1;
  var y1 =_y1;
  var x2 = _x2;
  var y2 = _y2;
  var a, b, c;
  var undef;
  var xi = Number.MAX_VALUE;
  var yi = Number.MAX_VALUE;

  a=y2-y1;
  b=x1-x2;
  c=x2*y1-x1*y2;

  if ((a==0) && (b==0) && (c==0)) {
    undef = true;
  } else {
    undef = false;
  }

  this.compare = function( otherSegment ) {
    if ((this.isUndefined()) || (otherSegment.isUndefined())) {
      return Relation.UNDEFINED;
    }

    var grad1 = Number.MAX_VALUE;
    var grad2 = Number.MAX_VALUE;
    var int1 = 0;
    var int2 = 0;

    if (Math.abs(b) > 0.00001) {
      grad1 = -a/b;
      int1  = -c/b;
    }

    if (Math.abs(otherSegment.getB()) > 0.00001) {
      grad2 = -otherSegment.getA()/otherSegment.getB();
      int2  = -otherSegment.getC()/otherSegment.getB();
    }

    if (grad1 == Number.MAX_VALUE) {
      if (grad2 == Number.MAX_VALUE)  {
        if (-c/a != -otherSegment.getC()/otherSegment.getA()) {
          return Relation.SEPARATE;
        }

        if ((y1 >= Math.min(otherSegment.getPy1(),otherSegment.getPy2())) &&
            (y1 <= Math.max(otherSegment.getPy1(),otherSegment.getPy2()))) {
          xi = x1;
          yi = y1;
          return Relation.INTERSECTS;
        }

        if ((y2 >= Math.min(otherSegment.getPy1(),otherSegment.getPy2())) &&
            (y2 <= Math.max(otherSegment.getPy1(),otherSegment.getPy2()))) {
          xi = x2;
          yi = y2;
          return Relation.INTERSECTS;
        }

        return Relation.SEPARATE;
      }

      xi = x1;
      yi = grad2*xi+int2;

      if (((y1-yi)*(yi-y2) < -0.00001) || ((otherSegment.getPy1()-yi)*(yi-otherSegment.getPy2()) < -0.00001)) {
        return Relation.SEPARATE;
      }

      if (Math.abs(otherSegment.getA()) < 0.00001) {
        if ((otherSegment.getPx1()-xi)*(xi-otherSegment.getPx2()) < -0.00001) {
          return Relation.SEPARATE;
        }
        return Relation.INTERSECTS;
      }
      return Relation.INTERSECTS;
    }

    if (grad2 == Number.MAX_VALUE) {
      xi = otherSegment.getPx1();
      yi = grad1*xi+int1;

      if (((otherSegment.getPy1()-yi)*(yi-otherSegment.getPy2()) < -0.00001) || ((y1-yi)*(yi-y2) < -0.00001)) {
        return Relation.SEPARATE;
      }

      if (Math.abs(a) < 0.00001) {
        if ((x1-xi)*(xi-x2) < -0.00001) {
          return Relation.SEPARATE;
        }
        return Relation.INTERSECTS;
      }
      return Relation.INTERSECTS;
    }

    if (grad1 == grad2) {
      if (int1 != int2) {
        return Relation.SEPARATE;
      }

      if ((x1 >= Math.min(otherSegment.getPx1(),otherSegment.getPx2())) &&
        (x1 <= Math.max(otherSegment.getPy1(),otherSegment.getPy2()))) {
        xi = x1;
        yi = y1;
        return Relation.INTERSECTS;
      }

      if ((x2 >= Math.min(otherSegment.getPx1(),otherSegment.getPx2())) &&
        (x2 <= Math.max(otherSegment.getPx1(),otherSegment.getPx2()))) {
        xi = x2;
        yi = y2;
        return Relation.INTERSECTS;
      }

      return Relation.SEPARATE;
    }

    xi = (int2-int1)/(grad1-grad2);
    yi = grad1*xi + int1;

    if (((x1-xi)*(xi-x2) < -0.00001) || ((otherSegment.getPx1()-xi)*(xi-otherSegment.getPx2()) < -0.00001)) {
      return Relation.SEPARATE;
    }
    return Relation.INTERSECTS;
  }

  this.getPx1 = function() {
  	return x1;
  }

  this.getPy1 = function()	{
  	return y1;
  }

  this.getPx2 = function() {
  	return x2;
  }

  this.getPy2 = function() {
  	return y2;
  }

  this.isUndefined = function() {
  	return undef;
  }

  this.getA = function() {
  	return a;
  }

  this.getB = function() {
  	return b;
  }

  this.getC = function() {
  	return c;
  }

  this.getIntersectionX = function() {
  	return xi;
  }

  this.getIntersectionY = function() {
  	return yi;
  }

  this.getLength = function( tx1, ty1, tx2, ty2 ) {
    var dx = tx2 - tx1;
    var dy = ty2 - ty1;
  	return Math.sqrt(dx*dx + dy*dy);
  }

}

var Relation = { LEFT:1, RIGHT:2, INTERSECTS:3, AHEAD:4, BEHIND:5, SEPARATE:6, UNDEFINED:7 };