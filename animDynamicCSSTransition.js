/*
Copyright (C)2015 Daniel Wiesenaecker

    
    This file is part of animDynamicCSS3transitions.

    animDynamicCSS3transitions is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    animDynamicCSS3transitions is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with animDynamicCSS3transitions.  If not, see <http://www.gnu.org/licenses/>.

*/

function getOpacityTransformString(opacity){
	var retval="opacity:" + (opacity<100?(opacity<10?"0.0" + opacity:"0." + opacity):"1.00") + "; ";
	if(window.navigator.userAgent.toUpperCase().indexOf("TRIDENT")!=-1) retval="filter: alpha(opacity=" + opacity + ");";
	return retval;
}


function AnimatedNodeItem(initnode, parent, sheet){
	hasSheet=sheet?true:false;
	this.parent=parent;
	this.getParent=function(){
		return this.parent;
	}
	//may be like choromoium bugfixed with this.appendChild(document.createTextNode());
	initnode=initnode?initnode:false;
	this.screenSize=new Dimension(getScreenWidth(), getScreenHeight());
	this.originPoint=null;
	this.destPoint=null;
	this.sheet=!hasSheet?deployStyleSheet():sheet;
	this.itsResetCSSclassName="";// later improovements maybe experimental follow
	this.itsMovementCSSclassName="";
	this.itsCSSBaseClassName="";
	this.itsBaseName="contentLayer";
	this.opacity=-1;
	this.lastPoint=null;
	this.tmpPoint=null;
	
	this.getSheet=function(){
		return this.sheet;
	}
			
	this.isUniqId=function(holder, id){
		if(holder==null) return true;
		var found=false;
		for(var d=0; (d < holder.idS.length)&&!found; d++){
			found=holder.idS[d]==id?true:found;
		}
		return !found;
	}
	
	this.isUniqCSSclassName=function(holder, classname){
		if(holder==null) return true;
		var found=false;
		for(var d=0; (d < holder.itsCSSclassNames.length)&&!found; d++){
			found=holder.idS[d]==classname?true:found;
		}
		return !found;
	}
	
	this.isUniqCSSClassName=function(holder, classname){
		return this.isUniqId(holder, classname);
	}
	
	this.generateUniqCSSClassName=function(){
		if(this.parent!=null) do{
			tmpClassName="" + this.itsBaseName + Math.floor(Math.random()*100000 + Math.random()*10000000);
		}while(!this.isUniqCSSClassName(this.parent, tmpClassName));
		else tmpClassName = "" + this.itsBaseName + Math.floor(Math.random()*100000 + Math.random()*10000000);
		if(this.parent!=null) this.parent.itsCSSclassNames.push(tmpClassName);
		return tmpClassName;
	}
	
	this.generateUniqMovementCSSClassName=function(){
		return this.generateUniqCSSClassName();
	}
	
	this.generateUniqResetCSSClassName=function(){
		return this.generateUniqCSSClassName();
	}

	
	this.setDestinationPoint=function(obj){
		this.destPoint=obj;
	}
			
	this.setDestination=function(x, y){
		
		this.setDestinationPoint(new Point(x,y));
	}
	
	this.setOriginPoint=function(obj){
		this.lastPoint=obj;
		this.originPoint=obj;
	}
			
	this.setOrigin=function(x, y){
		this.setOriginPoint(new Point(x,y));
	}
	
			
	this.appendChild=function(initnode){
		if(this.itsFirstChild==null){
			this.itsFirstChild=initnode?initnode:null;
		}else{
			if(initnode!=null) this.itsFirstChild.appendChild(initnode);
		}
	}
	
	this.setPosition=function(obj){
		while(this.itsFirstChild.classList.contains(this.itsMovementCSSclassName)){
			this.itsFirstChild.classList.remove(this.itsMovementCSSclassName);
		}
		addCSSRule(this.sheet, "." + this.itsCSSBaseClassName, "position: absolute; left: " + obj.getX() +  "px; top:" + obj.getY() + "px; " );
		this.itsFirstChild.classList.add(this.itsCSSBaseClassName);
		this.lastPoint=obj;
		this.originPoint=obj;
	}
		
	this.setLeftOut=function(){
		this.setPosition(new Point(this.screenSize.getWidth()*-1, this.originPoint.getY()));
	}
	
	
	this.setRightOut=function(){
		this.setPosition(new Point(this.screenSize.getWidth(), this.originPoint.getY()));
	}
	
	this.resetToOrigin=function(){
		this.setPosition(this.originPoint);
	}
	
	
	this.doTransform=function(dur, transform, timeing, linear, opacity, origin){
		origin=origin?origin:false;
		opacity=opacity?opacity:100;;
		timeing=timeing?timeing:false;
		linear=linear?linear:false;
		linear=linear?(linear&&!timeing?true:false):false;
		linear=(!timeing?true:false);		
		dur="" + dur + "s" + (linear?" linear":"");
		var trn1="";
		if(timeing) trn1="-webkit-transition-timing-function: " + timeing + "; -moz-transition-timing-function: " + timeing + "; -ms-transition-timing-function: " + timeing + "; -o-transition-timing-function: " + timeing + "; transition-timing-function: " + timeing + ";";
		trn1+=(origin?("; transform-origin: " + origin) + "; ":"");
		this.setDestinationPoint(this.tmpPoint);
		var rule="-webkit-transition: " + dur + "; -moz-transition: " + dur + "; -ms-transition: " + dur + "; -o-transition: " + dur + "; transition: " + dur + ";" + trn1 + "-moz-transform" +  ": " + transform + ";" + "-webkit-transform" +  ": " + transform + ";" + "-o-transform" +  ": " + transform + ";" + "-ms-transform" +  ": " + transform + ";" + "transform" +  ": " + transform + "; " + getOpacityString(opacity);
		addCSSRule(this.sheet, "." + this.itsCSSBaseClassName + "." + this.itsMovementCSSclassName, rule);
		this.itsFirstChild.classList.add(this.itsMovementCSSclassName);
		this.lastPoint=this.tmpPoint;
	}
	
	this.slideLeftOut=function(dur, timeing, linear, opacity){//QUO
		//this.slideRightIn(dur, timeing, linear, opacity);
		//unimplemented yet
	}
	
	this.slideRightOut=function(dur, timeing, linear, opacity){
		//this.slideLeftIn(dur, timeing, linear, opacity);
		//unimplemented yet
	}
	
	
	this.slideLeftIn=function(dur, timeing, linear, opacity){
		opacity=opacity?opacity:100;;
		this.tmpPoint=new Point(0, this.originPoint.getY());
		this.setDestinationPoint(this.tmpPoint);
		var transform=getTransformString(0, 0, (this.destPoint.getX()-this.lastPoint.getX()), (this.destPoint.getY()-this.lastPoint.getY()), 0, false, false, false, false, false, false, false, false)
		timeing=timeing?timeing:false;
		timeing=timeing?timeing:false;
		linear=linear?linear:false;
		linear=linear?(linear&&!timeing?true:false):false;
		linear=(!timeing?true:false);		
		dur="" + dur + "s" + (linear?" linear":"")
		var trn1="";
		if(timeing) trn1="-webkit-transition-timing-function: " + timeing + "; -moz-transition-timing-function: " + timeing + "; -ms-transition-timing-function: " + timeing + "; -o-transition-timing-function: " + timeing + "; transition-timing-function: " + timeing + ";";
		var rule="-webkit-transition: " + dur + "; -moz-transition: " + dur + "; -ms-transition: " + dur + "; -o-transition: " + dur + "; transition: " + dur + ";" + trn1 + "-moz-transform" +  ": " + transform + ";" + "-webkit-transform" +  ": " + transform + ";" + "-o-transform" +  ": " + transform + ";" + "-ms-transform" +  ": " + transform + ";" + "transform" +  ": " + transform + "; " + getOpacityTransformString(opacity);
		addCSSRule(this.sheet, "." + this.itsCSSBaseClassName + "." + this.itsMovementCSSclassName, rule);
		this.itsFirstChild.classList.add(this.itsMovementCSSclassName);
		this.lastPoint=this.tmpPoint;
		
	}
	
	this.slideRightIn=function(dur, timeing, linear, opacity){
		opacity=opacity?opacity:100;;
		this.tmpPoint=new Point(0, this.originPoint.getY());
		this.setDestinationPoint(this.tmpPoint);
		var transform=getTransformString(0, 0, (this.destPoint.getX()-this.lastPoint.getX()), (this.destPoint.getY()-this.lastPoint.getY()), 0, false, false, false, false, false, false, false, false)
		timeing=timeing?timeing:false;
		linear=linear?linear:false;
		linear=linear?(linear&&!timeing?true:false):false;
		linear=(!timeing?true:false);		
		dur="" + dur + "s" + (linear?" linear":"")
		var trn1="";
		if(timeing) trn1="-webkit-transition-timing-function: " + timeing + "; -moz-transition-timing-function: " + timeing + "; -ms-transition-timing-function: " + timeing + "; -o-transition-timing-function: " + timeing + "; transition-timing-function: " + timeing + ";";
		var rule="-webkit-transition: " + dur + "; -moz-transition: " + dur + "; -ms-transition: " + dur + "; -o-transition: " + dur + "; transition: " + dur + ";" + trn1 + "-moz-transform" +  ": " + transform + ";" + "-webkit-transform" +  ": " + transform + ";" + "-o-transform" +  ": " + transform + ";" + "-ms-transform" +  ": " + transform + ";" + "transform" +  ": " + transform + "; " + getOpacityTransformString(opacity);
		addCSSRule(this.sheet, "." + this.itsCSSBaseClassName + "." + this.itsMovementCSSclassName, rule);
		this.itsFirstChild.classList.add(this.itsMovementCSSclassName);
		this.lastPoint=this.tmpPoint;
	}
	
	this.blend=function(dur, opacity, timeing, linear){
		var transform=getOpacityTransformString(opacity);
		timeing=timeing?timeing:false;
		linear=linear?linear:false;
		linear=linear?(linear&&!timeing?true:false):false;
		linear=(!timeing?true:false);		
		dur="" + dur + "s" + (linear?" linear":"")
		var trn1="";
		if(timeing) trn1="-webkit-transition-timing-function: " + timeing + "; -moz-transition-timing-function: " + timeing + "; -ms-transition-timing-function: " + timeing + "; -o-transition-timing-function: " + timeing + "; transition-timing-function: " + timeing + ";";
		var rule="-webkit-transition: " + dur + "; -moz-transition: " + dur + "; -o-transition: " + dur + "; transition: " + dur + "; -ms-transition: " + dur + "; " + transform + trn1;
		addCSSRule(this.sheet, "." + this.itsCSSBaseClassName + "." + this.itsMovementCSSclassName, rule);
		this.itsFirstChild.classList.add(this.itsMovementCSSclassName);
	}
	
	this.init=function(opacity, id, transform){
		transform=transform?transform:"";
		this.opacity=opacity;
		this.itsResetCSSclassName=this.generateUniqResetCSSClassName();
		this.itsMovementCSSclassName=this.generateUniqMovementCSSClassName();
		this.itsCSSBaseClassName=this.generateUniqCSSClassName();
		var rule="position: absolute; left: " + this.originPoint.getX() +  "px; top:" + this.originPoint.getY() + "px; " + "-moz-transform" +  ": " + transform + ";" + "-webkit-transform" +  ": " + transform + ";" + "-o-transform" +  ": " + transform + ";" + "-ms-transform" +  ": " + transform + ";" + "transform" +  ": " + transform + "; transform-style: preserve-3d; " + getOpacityTransformString(opacity);
		addCSSRule(this.sheet, "." + this.itsCSSBaseClassName, rule);
		this.itsFirstChild.id=id;
		this.itsFirstChild.className=this.itsCSSBaseClassName;
	}
	
	if(initnode) this.appendChild(initnode);
	//this.appendChild(document.createTextNode());  //may be crawled later
}
