/*
Copyright (C)2014 Daniel Wiesenaecker

    
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

	

	function getTransformString(scaleX, scaleY, relX, relY, rotate, rot2d, rot3d, rotationX, rotationY, rotationZ, skewX, skewY, combine){
		rotate=rotate?rotate:false;
		scaleX=scaleX?scaleX:false;
		scaleY=scaleY?scaleY:false;
		skewX=skewX?skewX:false;
		skewY=skewY?skewY:false;
		rot2d=rot2d?rot2d:false;
		rot3d=rot3d?rot3d:false;
		scale=scaleX&&scaleY?true:false;
		translate=relX!=0||relY!=0?true:false;
		var retval=(rotate&&(rot2d!=false||combine)?("rotate(" + rotate + "deg) "):"") + ((rot2d&&!rotate?((rotationX!=false?("rotateX(" + rotationX + "deg) "):"") + (rotationY!=false?("rotateY(" + rotationY + "deg) "):"") + (rotationZ!=false?("rotateZ(" + rotationZ + "deg) "):"")):(rot3d?("rotate3d(" + rotationX + ", " + rotationY + ", " + rotationZ + ", " + rotate + "deg)"):"")) + (scale!=false?("scale(" + scaleX + ", " + scaleY + ")"):"") + (scaleX!=false&&!scale?"scaleX(" + scaleX + ")":"") + (scaleY!=false&&!scale?"scaleY(" + scaleY + ")":"") + (translate!=false?(" translate(" + relX + "px, " + relY + "px)"):"") + (skewY!=false?"skewY(" + skewY + "deg)":"") + (skewX!=false?"skewX(" + skewX + "deg)":""));
		return retval;
	}

	function getOpacityString(opacity){
		var retval="opacity:" + (opacity<100?(opacity<10?"0.0" + opacity:"0." + opacity):"1.00") + "; ";
		if(window.navigator.userAgent.toUpperCase().indexOf("TRIDENT")!=-1) retval="filter: alpha(opacity=" + opacity + ");";
		return retval;
	}

	function setTo(style, scaleX, scaleY, relX, relY, rotate, rot2d, rot3d, rotationX, rotationY, rotationZ, skewX, skewY, combine){
		var transformString=getTransformString(scaleX, scaleY, relX, relY, rotate, rot2d, rot3d, rotationX, rotationY, rotationZ, skewX, skewY, combine);
		setTransform(style, transformString);
	}
