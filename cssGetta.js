/*
Copyright (C)2014 Daniel Wiesenaecker

    
    This file is part of MoncDiameter.

    MoncDiameter is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    MoncDiameter is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with MoncDiameter.  If not, see <http://www.gnu.org/licenses/>.

*/
	function getKnownPrefixes(){
		return ["webkit", "moz", "ms", "o"];
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
	
	var borderRadiusPropertyCompList=getPropertyCompatibilityList("borderRadius");
	
	var borderRadiusProp=null; //has to be null !!!
	
	function setDiameter(style, d){
		style.width=d + "px";
		style.height=d + "px";
		borderRadiusProp=borderRadiusProp==null?getsupportedprop(borderRadiusPropertyCompList):borderRadiusProp;
		style[borderRadiusProp]=Math.floor(d/2) + "px";			
	}
	
	var transformPropertyCompList=getPropertyCompatibilityList("transform");
	
	var transformProp=null; //has to be null !!!
	
	function setTransform(style, trn){
		transformProp=transformProp==null?getsupportedprop(transformPropertyCompList):transformProp;
		style[transformProp]=trn;			
	}
	
	var widthPropertyCompList=getPropertyCompatibilityList("width");
	
	var widthProp=null; //has to be null !!!
	
	var heightPropertyCompList=getPropertyCompatibilityList("height");
	
	var heightProp=null; //has to be null !!!
	
	function setSize(style, size){
		widthProp=widthProp==null?getsupportedprop(widthPropertyCompList):widthProp;
		heightProp=heightProp==null?getsupportedprop(heightPropertyCompList):heightProp;
		style[heightProp]=size.getHeight() + "px";	
		style[widthProp]=size.getWidth() + "px";			
	}
	
	var opacityPropertyCompList=getPropertyCompatibilityList("opacity");
	
	var opacityProp=null; //has to be null !!!
	
	function setOpacity(style, p){
		opacityProp=opacityProp==null?getsupportedprop(opacityPropertyCompList):opacityProp;
		style[opacityProp]=(p<10?"0.0" +p :(p<100?"0." + p:"1.0"));			
	}
	
	var persepctivePropertyCompList=getPropertyCompatibilityList("perspective");
	
	var persepctiveProp=null; //has to be null !!!
	
	
	function setPerspective(style, px){
		persepctiveProp=persepctiveProp==null?getsupportedprop(persepctivePropertyCompList):persepctiveProp;
		style[persepctiveProp]="" + px + "px";			
	}
	
	
	var perspectiveOriginPropertyCompList=getPropertyCompatibilityList("perspectiveOrigin");
	
	var perspectiveOriginProp=null; //has to be null !!!
	
	
	function setPerspectiveOrigin(style, origin){
		perspectiveOriginProp=perspectiveOriginProp==null?getsupportedprop(perspectiveOriginPropertyCompList):perspectiveOriginProp;
		style[perspectiveOriginProp]="" + origin;			
	}
	
	var transformStylePropertyCompList=getPropertyCompatibilityList("transformStyle");
	
	var transformStyleProp=null; //has to be null !!!
	
	
	function setTransformStyle(style, hint){
		transformStyleProp=transformStyleProp==null?getsupportedprop(transformStylePropertyCompList):transformStyleProp;
		style[transformStyleProp]="" + hint + "";			
	}
	
	
	var borderTopLeftRadiusPropertyCompList=getPropertyCompatibilityList("borderTopLeftRadius");
	
	var borderTopLeftRadiusProp=null; //has to be null !!!
	
	function setTopLeftRadius(style, r){
		borderTopLeftRadiusProp=borderTopLeftRadiusProp==null?getsupportedprop(borderTopLeftRadiusPropertyCompList):borderTopLeftRadiusProp;
		style[borderTopLeftRadiusProp]=Math.floor(r) + "px";			
	}
	
	var borderTopRightRadiusPropertyCompList=getPropertyCompatibilityList("borderTopRightRadius");
	
	var borderTopRightRadiusProp=null; //has to be null !!!
	
	function setTopRightRadius(style, r){
		borderTopRightRadiusProp=borderTopRightRadiusProp==null?getsupportedprop(borderTopRightRadiusPropertyCompList):borderTopRightRadiusProp;
		style[borderTopRightRadiusProp]=Math.floor(r) + "px";			
	}
	
	var borderBottomLeftRadiusPropertyCompList=getPropertyCompatibilityList("borderBottomLeftRadius");
	
	var borderBottomLeftRadiusProp=null; //has to be null !!!
	
	function setBottomLeftRadius(style, r){
		borderBottomLeftRadiusProp=borderBottomLeftRadiusProp==null?getsupportedprop(borderBottomLeftRadiusPropertyCompList):borderBottomLeftRadiusProp;
		style[borderBottomLeftRadiusProp]=Math.floor(r) + "px";			
	}
	
	var borderBottomRightRadiusPropertyCompList=getPropertyCompatibilityList("borderBottomRightRadius");
	
	var borderBottomRightRadiusProp=null; //has to be null !!!
	
	function setBottomRightRadius(style, r){
		borderBottomRightRadiusProp=borderBottomRightRadiusProp==null?getsupportedprop(borderBottomRightRadiusPropertyCompList):borderBottomRightRadiusProp;
		style[borderBottomRightRadiusProp]=Math.floor(r) + "px";			
	}