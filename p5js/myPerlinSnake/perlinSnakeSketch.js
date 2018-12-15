function setup() {
  createCanvas(400, 400);
	angleMode(DEGREES)
	xc=width/2;yc=height/2;
	r=100;a=45;
	//rot=45;
  strokeWeight(5);k=0;
  eyes=10;phase=160;
	
}

function draw() {
  background(255,255,0,20);
	stroke(255,0,0,255)
  
  zz1=noise(millis())
  //print(zz1)
  
	//rot=rot+5;
	a=a+.51
	x=r*(cos(a));y=r*(sin(a));
  x1=r*cos(a-phase);y1=r*sin(a-phase);
	//k=k+noise(.0001)+zz1
  //k=k+noise(0.0001)
  
  k=k+noise(k)/10
 
  
  
	x=x+width/5*noise(k)
	y=y+height/4*noise(k)
  
  //x1=x1+width/5*noise(k)
	//y1=y1+height/4*noise(k1)
  
  

	push()
	stroke(255,255,0)
	pop()
  fill(0,0,255)
	ellipse(xc+x,yc+y,eyes)
	
	ellipse(xc+x-eyes,yc+y,eyes)
	//ellipse(xc+50+x1,yc+y1,eyes)
	
	//ellipse(xc+60+x1-eyes,yc+y1,eyes)
  
}
