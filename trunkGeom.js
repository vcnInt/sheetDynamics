/*
Copyright ©2012 Daniel Wiesenäcker

    
    This file is part of NiblorTeq.

    NiblorTeq is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    NiblorTeq is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with NiblorTeq.  If not, see <http://www.gnu.org/licenses/>.

*/
	

	function Point(x, y){

		this.x=x;

		this.y=y;

		

		this.getX = function(){

			return this.x;

		}

		

		this.getY = function(){

			return this.y;

		}



		this.setX=function(x){

			this.x=x;

		}

		

		this.setY=function(y){

			this.y=y;

		}

	}



	function Dimension(width, height){

		this.width=width;

		this.height=height;

		

		this.getWidth=function(){

			return this.width;

		}

		

		this.getHeight=function(){

			return this.height;

		}

		

	}

	function Circle(point, width){
		this.itsPoint=point;
		this.width=width;
		
		this.getWidth = function(){
			return this.width;
		}
		
		this.getPoint = function(){
			return this.itsPoint;
		}
		
		this.setPoint = function(point){
			this.itsPoint=point;
		}
		
		this.setWidth = function(width){
			this.width=width;
		}
	}

	function Ellipse(point, size){
		this.itsPoint=point;
		this.size=size;
		
		this.getSize=function(){
			return this.size;
		}
		
		this.getPoint=function(){
			return this.itsPoint;
		}
		
		this.setPoint=function(point){
			this.itsPoint = point;
		}
		
		this.setSize=function(size){
			this.size=size;
		}
	}

	function Polygon(points){
			points=points?points:new Array();
			this.itsPoints = points;
			
			this.setPointAt=function(pos, point){
					this.itsPoints.insert(pos, point);
			}
			
			this.addPoint=function(point){
				this.itsPoints.push(point);
			}
			
			this.removeLast=function(){
				this.itsPoints.pop();
			}
			
			this.getLast=function(){
				this.itsPoints[this.itsPoints.length-1];
			}
			
			this.getPoints=function(){
				return this.itsPoints.copy();
			}
			
			this.getNumberOfPoints=function(){
				return this.itsPoints.length;
			}
	}
	
	function Triangle(point_A, point_B, point_C){
			this.fliped=false;
			this.self=this;
			Polygon.call(this);
			this.addPoint(point_A);
			this.addPoint(point_B);
			this.addPoint(point_C);

			this.calculate=function(isfliped){
				var left=0;
				var right=0;
				var top=0;
				for(var v=0; v < this.itsPoints.length; v++){
					left=this.itsPoints[v].x<this.itsPoints[left].x?v:left;
					right=this.itsPoints[v].x>this.itsPoints[right].x?v:right;
					top=!isfliped?(this.itsPoints[v].y<this.itsPoints[top].y?v:top):(this.itsPoints[v].y>this.itsPoints[top].y?v:top);
				}
				var fliped=false;
				if(top==left||top==right){
					fliped=true;
				}
				var skip=false;
				if(fliped){
					this.fliped=fliped;
					var skip=this.calculate(true);
				}
				if(!skip){
					var tmpPoints=this.itsPoints.copy();
					this.itsPoints=new Array();
					this.addPoint(tmpPoints[left]);
					this.addPoint(tmpPoints[top]);
					this.addPoint(tmpPoints[right]);
				}
				return isfliped;
			}



			this.calculate(false);
			

	}
	
	Triangle.prototype.constructor=Polygon;
	
	function Rectangle(point, size){

		this.itsPoint=point;

		this.itsSize=size;

		

		this.getSize = function(){

			return this.itsSize;

		}

		

		this.getPoint = function(){

			return this.itsPoint;

		}

		

		this.getX = function(){

			return this.getPoint().x;

		}

		

		this.getY = function(){

			return this.getPoint().y;

		}

		

		this.getWidth = function(){

			return this.getSize().width;

		}

		

		this.getHeight = function(){

			return this.getSize().height;

		}

		





	}
	
	
	
//float lab [q2 no flip ENDIF] floating point line !!!precision discret to Engine e.G. Gecko or Rhino etc.!!!
function FloatPrecisionLine(pointA, pointB){
	this.itsPoints= new Array();

	this.getPoints=function(){
		return this.itsPoints.copy();
	}

	this.isX1=pointA.getX();
	this.isY1=pointA.getY();
	this.isX2=pointB.getX();
	this.isY2=pointB.getY();

	this.Xcoor=new Array();
	this.Ycoor=new Array();
	
	this.Xcoor[0] = this.isX1;

	this.Xcoor[1] = this.isX2;

	this.Ycoor[0] = this.isY1;

	this.Ycoor[1] = this.isY2;

	this.difX=Math.round(this.Xcoor[1]-this.Xcoor[0]);

	this.difY=Math.round(this.Ycoor[1]-this.Ycoor[0]);

	this.xDo=this.Xcoor[0];

	this.yDo=this.Ycoor[0];

	var nrPx=1.1*Math.sqrt((this.Xcoor[1]-this.Xcoor[0])*(this.Xcoor[1]-this.Xcoor[0])+(this.Ycoor[1]-this.Ycoor[0])*(this.Ycoor[1]-this.Ycoor[0]));


	var stepX=this.difX/nrPx;

	var stepY=this.difY/nrPx;


	while((this.difX<0?Math.floor(this.xDo)>=this.Xcoor[1]:Math.floor(this.xDo)<=this.Xcoor[1]&&this.difY<0?Math.floor(this.yDo)>=this.Ycoor[1]:Math.floor(this.yDo)<=this.Ycoor[1])&&(this.difY==0?(this.difX<0?Math.floor(this.xDo)>=this.Xcoor[1]:Math.floor(this.xDo)<=this.Xcoor[1]):true&&this.difX==0?(this.difY<0?Math.floor(this.yDo)>=this.Ycoor[1]:Math.floor(this.yDo)<=this.Ycoor[1]):true)){
		this.itsPoints.push(new Point(Math.floor(this.xDo), Math.floor(this.yDo)));

		if(this.difX<0?Math.floor(this.xDo)>=this.Xcoor[1]:Math.floor(this.xDo)<=this.Xcoor[1]) this.xDo+=stepX;
		this.yDo+=stepY;
	}
}
	
	
	
//dot matrix compatible line !!!no double precision!!!
function DotMatrixLine(pointA, pointB){ //very fine SCALE! very fine SCALE! 0 0 +1 +1 may occure on reversed scale

	this.itsPoints= new Array();
	
	this.getPoints=function(){
		return this.itsPoints.copy();
	}

	var steps=0;

	this.isX1=pointA.x;

	this.isY1=pointA.y;

	this.isX2=pointB.x;

	this.isY2=pointB.y;
	
	this.override=false;
	
	if(pointA.x==pointB.x&&pointA.y==pointB.y) this.override=true;
		
	
	if(!this.override){
	
		this.l=-1;

		this.r=-1;

		this.u=-1;

		this.d=-1;

		if(this.isX1<this.isX2){

			this.l=0;

			this.r=1

		}

		else{

			this.l=1;

			this.r=0;

		}

		if(this.isY1<this.isY2){

					this.u=0;

					this.d=1;

				}else{

					this.u=1;

					this.d=0;

				}

				this.Xcoor = new Array;

				this.Xcoor[0] = this.isX1;

				this.Xcoor[1] = this.isX2;

				this.Ycoor = new Array;

				this.Ycoor[0] = this.isY1;

				this.Ycoor[1] = this.isY2;

				this.difX=Math.round(this.Xcoor[this.r]-this.Xcoor[this.l]);

				this.difY=Math.round(this.Ycoor[this.d]-this.Ycoor[this.u]);

				this.x1=this.isX1;

				this.y1=this.isY1;

				if(this.difY==0){

					steps=this.difX;

					this.c=this.Xcoor[(this.Xcoor[0]<this.Xcoor[1]?this.l:this.r)];

				}else if(this.difX==0){

					steps=this.difY;

					this.c=this.Ycoor[(this.Ycoor[0]<this.Ycoor[1]?this.u:this.d)];

				}else if(this.difX<=this.difY){

					steps=this.difX;

					this.length=this.difY / this.difX;

					if(this.isY1>this.isY2){

						this.length=-1*this.length;

					}

					this.rest=this.difY%this.difX;

					this.y2=this.y1;

					this.x2=this.x1;

					this.v=0;

				}else{

					steps=this.difY;

					this.length=this.difX / this.difY;

					if(this.isX1>this.isX2){

						this.length=-1*this.length;

					}

					this.rest=this.difX%this.difY;

					this.x2=this.x1;

					this.y2=this.y1;

					this.v=0;

				}	

				this.restX=0;

				this.restY=0;

				this.steps=steps;
			}else{
				this.steps=0;
			}
			
			this.getSteps=function(){
				return this.steps;
			}
			
			this.calc=function(){
					var x=0;
					var y=0;					
					
					if(this.overide) return false;
					
					if(this.difY==0&&this.difX!=0){

						if(this.isX1<this.isX2){
						
							if(this.c <= this.Xcoor[this.r]){

								x=this.c++;

								y=this.Ycoor[0];

								this.itsPoints.push(new Point(Math.floor(x),Math.floor(y)));

							}else{

								return false;

							}

						}else{
						
							if(this.c >= this.Xcoor[this.l]){

								x=this.c--;		

								y=this.Ycoor[0];

								this.itsPoints.push(new Point(Math.floor(x),Math.floor(y)));

							}else{

								return false;

							}

						}

					}

					else if(this.difX==0&&this.difY!=0){

						if(this.isY1<this.isY2){

							if(this.c <= this.Ycoor[this.d]){

								x=this.Xcoor[0];

								y=this.c++;

								this.itsPoints.push(new Point(Math.floor(x),Math.floor(y)));

							}else{

								return false;

							}

						}else{

							if(this.c >= this.Ycoor[this.u]){

								x=this.Xcoor[0];

								y=this.c--;

								this.itsPoints.push(new Point(Math.floor(x),Math.floor(y)));

							}else{

								return false;

							}

						}

					}else if(this.difX<=this.difY){

						if((this.v<0?(this.v*-1):this.v) != this.difX){

							this.y2+=this.length;

							//this.restY=this.y1-Math.floor(this.y1);

							if(this.length > 0){		

								for(var c=Math.floor(this.y1); c<=Math.floor(this.y2); c++){

									x=this.x1+this.v;

									y=c;

									this.itsPoints.push(new Point(Math.floor(x),Math.floor(y)));

								}

							}else{

								for(var c=Math.floor(this.y1); c>=Math.floor(this.y2); c--){

									x=this.x1+this.v;

									y=c;

									this.itsPoints.push(new Point(Math.floor(x),Math.floor(y)));

								}

							}

							this.y1=this.y2+(this.length>0?1:-1);

							if(this.Xcoor[0]>this.Xcoor[1]){

								this.v--;

							}

							else{

								this.v++;

							}

						}else{

							return false;

						}

					}

					else if(this.difY<this.difX){

						if((this.v<0?(this.v*-1):this.v) != this.difY){

							this.x2+=this.length;

							//this.restX=this.x1-Math.floor(this.x1);

							if(this.length>0){

								for(var c=Math.floor(this.x1); c<=Math.floor(this.x2); c++){

									x=c;

									y=(this.y1+this.v);

									this.itsPoints.push(new Point(Math.floor(x),Math.floor(y)));

								}

							}

							else{

								for(var c=Math.floor(this.x1); c>=Math.floor(this.x2); c--){

									x=c;

									y=(this.y1+this.v);

									this.itsPoints.push(new Point(Math.floor(x),Math.floor(y)));

								}

							}

							this.x1=this.x2+(this.length>0?1:-1);

							if(this.Ycoor[0]>this.Ycoor[1]){

								this.v--;

							}else{

								this.v++;

							}

						}else{

							return false;

						}

					}else{

						return false;

					}

					return true;

		}
		while(this.calc());
		this.ready=true;
}