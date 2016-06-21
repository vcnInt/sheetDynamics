/*
Copyright ©2014 Daniel Wiesenäcker

    
    This file is part of BlockTrail.

    Ttschuggi Fader is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    BlockTrail is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with BlockTrail.  If not, see <http://www.gnu.org/licenses/>.

*/


	function getKnownPrefixes(){
		return ["webkit", "moz", "ms", "o", "khtml", "khtml", "sand"];
	}
	
	function getPropertyCompatibilityList(plainProp){
		var retval=new Array();
		knownPrefixes=getKnownPrefixes();
		for(var v=0; v < knownPrefixes.length; v++){
			retval.push(knownPrefixes[v] + plainProp.substr(0, 1).toUpperCase() + plainProp.substr(1, plainProp.length-1).toLowerCase());
		}
		retval.push(plainProp);
		return retval;
	}

	var lastSearchComp="";
	var lastSearchOne="";
	
	function getsupportedprop(searchComp){
		var reta=searchComp==lastSearchComp?true:false;
		if(reta) return lastSearchOne
		lastSearchComp=searchComp==lastSearchComp?lastSearchComp:searchComp;
		var root=window.document.documentElement //reference root element of document
		for (var v=0; v<searchComp.length; v++){
			if (searchComp[v] in root.style){
				//monk!!!
				var retval=searchComp[v];
				lastSearchOne=retval==lastSearchOne?lastSearchOne:retval;
				return retval;//return that string
			}
		}
	}
	
	var transformPropertyCompList=getPropertyCompatibilityList("transform");
	
	var transformProp=null; //has to be null !!!
	
	function setTransform(style, trn){
		transformProp=transformProp==null?getsupportedprop(transformPropertyCompList):transformProp;
		style[transformProp]=trn;			
	}
	function Coordinate(val, axis){
		this.isCoor=-1;
		this.historyCoordinates=new ArrayList();
		this.value=val?val:-1;
		this.setValue=function(val){
			this.historyCoordinates.push(this.value);
			this.value=val;
		}
		
		this.getValue=function(){
			return this.value;
		}
		
		this.rollBack=function(){
			this.value=this.historyCoordinates.pop();
		}
		
		this.getHistory=function(){
			return this.historyCoordinates;
		}
		
		this.isX=function(){
			var retval=false;
			switch(this.isCoor){
				case Coordinate.prototype.X:
				 retval=true;;
				default:
			}
			return retval;
		}
		
		this.isY=function(){
			var retval=false;
			switch(this.isCoor){
				case Coordinate.prototype.Y:
				 retval=true;;
				default:
			}
			return retval;
		}
		
		this.isZ=function(){
			var retval=false;
			switch(this.isCoor){
				case Coordinate.prototype.Z:
				 retval=true;;
				default:
			}
			return retval;
		}
		
		this.setAxis=function(axis){
			this.isCoor=axis;
		}
		
		this.getAxis=function(){
			return this.isCoor;
		}
		
		if(axis) this.setAxis(axis);
	}
	
	Coordinate.prototype.X=1;
	Coordinate.prototype.Y=2;
	Coordinate.prototype.Z=3;
	
	
	function CoordinateDegreeValuePair(axis, rot){
		this.itsAxis=axis?axis:Coordinate.prototype.X;
		this.rot=rot?rot:0;
		
		this.setRotation=function(rot){
			this.rot=rot;
		}
		
		this.setAxis=function(axis){
			this.itsAxis=axis;
		}
		
		this.getAxis=function(){
			return this.itsAxis;
		}
		this.getRotation=function(){
			return this.rot;
		}
	}
	
	function TransformStringExpressionFactory(){
		this.itsRoationSimpleEnabled=false;
		this.its3dRotationEnabled=false;
		this.its3dTranslateEnabled=false;
		this.its3dRotation=new Array();
		this.its3dTranslate=new Array();
		this.rot=0;
		this.scaleX=1;
		this.scaleY=1;
		this.skewX=0;
		this.skewY=0;
		
		this.setRotation3d=function(coor, rot){
			this.its3dRotationEnabled=true;
			this.its3dRotation.push(new CoordinateDegreeValuePair(coor.getAxis(), rot));
		}
		
		this.setRotation=function(rot){
			this.itsRoationSimpleEnabled=true;
			this.rot=rot;
		}
		
		this.setTranslate=function(coor){
			this.its3dTranslateEnabled=true;
			this.its3dTranslate.push(new Coordinate(coor.getValue(), coor.getAxis()));
		}
		
		this.setScaleX=function(fac){
			this.scaleX=fac;
		}
		
		this.setScaleY=function(fac){
			this.scaleY=fac;
		}
		
		this.setSkewX=function(parallel){
			this.skewX=parallel;
		}
		
		this.setSkewY=function(parallel){
			this.skewY=parallel;
		}
		
		this.getTransformString=function(){
			var retval=(this.itsRoationSimpleEnabled)?("rotate(" + this.rot + "deg) "):"";
			var apnd="";
			if(this.its3dRotationEnabled) for(var v=0; v<this.its3dRotation.length; v++){
				switch(this.its3dRotation[v].getAxis()){
					case Coordinate.prototype.X:
						apnd+="rotateX(" +this.its3dRotation[v].getRotation() + "deg) ";
					break;
					case Coordinate.prototype.Y:
						apnd+="rotateY(" + this.its3dRotation[v].getRotation() + "deg) ";
					break;
					case Coordinate.prototype.Z:
						apnd+="rotateZ(" + this.its3dRotation[v].getRotation() + "deg) ";
					break;
					default:
				}
			}
			retval+=apnd;
			apnd="";
			if(this.its3dTranslateEnabled) for(var v=0; v<this.its3dTranslate.length; v++){
				switch(this.its3dTranslate[v].getAxis()){
					case Coordinate.prototype.X:
						apnd+="translateX(" + this.its3dTranslate[v].getValue() + "px) ";
					break;
					case Coordinate.prototype.Y:
						apnd+="translateY(" + this.its3dTranslate[v].getValue() + "px) ";
					break;
					case Coordinate.prototype.Z:
						apnd+="translateZ(" + this.its3dTranslate[v].getValue() + "px) ";
					break;
					default:
				}
			}
			retval+=apnd;
			apnd=(this.scaleX!=1||this.scaleY!=1)?"scale(" + this.scaleX + ", " + this.scaleY + ") ":"";
			retval+=apnd;
			retval+=(this.skewY!=false?"skewY(" + skewY + "deg)":"") + (this.skewX!=false?"skewX(" + skewX + "deg)":"");
			
			return retval;		
		}
	}
	
	function getOpacityTransformString(opacity){
		var retval="opacity:" + (opacity<100?(opacity<10?"0.0" + opacity:"0." + opacity):"1.00") + "; ";
		if(window.navigator.userAgent.toUpperCase().indexOf("TRIDENT")!=-1) retval="filter: alpha(opacity=" + opacity + ");";
		return retval;
	}