/*

Copyright ©2013 Daniel Wiesen?cker



    

    This file is part of CandyLoupe.



    CandyLoupe is free software: you can redistribute it and/or modify

    it under the terms of the GNU General Public License as published by

    the Free Software Foundation, either version 3 of the License, or

    (at your option) any later version.



    CandyLoupe is distributed in the hope that it will be useful,

    but WITHOUT ANY WARRANTY; without even the implied warranty of

    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the

    GNU General Public License for more details.



    You should have received a copy of the GNU General Public License

    along with CandyLoupe.  If not, see <http://www.gnu.org/licenses/>.



*/

//seems to be quite cool operated version

	var observe=false;

	function reloadClip(){
		window.document.location.reload();
	}

	function checkClip(){
		window.onresize=function(){if(observe) setTimeout("reloadClip();", 1); }
	}

	function Port(obj1, rect){

		this.itsRectangle = rect;

		this.itsObject = obj1;

		

		this.getObject = function(){

			return this.itsObject;

		}



		this.getRectangle = function(){

			return this.itsRectangle;

		}

		

		this.getPoint = function(){

			return this.getRectangle().getPoint();

		}

		

		this.getSize = function(){

			return this.getRectangle().getSize();

		}

	}

	





	function FrameInfo(id){
	
		this.baseId=(id?(id):Math.floor(Math.random()*100000000000));
	
		this.layer=null;

		this.size=null;

		this.embedSize=null;

		this.innerFrame=new Rectangle(new Point(0,0), new Dimension(0,0));

		this.overlap = null;

		this.middle=null;

		this.winSize = null;

		this.t=null;

		this.frameObj=null;

		this.fName="frame_" + this.baseId;
			
		this.layerId="centered_" + this.baseId;

		this.fId="fr_" + this.baseId;



		this.init = function(launchStart, total){
		
			total=total?total:false;

			launchStart=launchStart?launchStart:false;

			if(!total){
				try{
					var mobileExecTag=document.createElement("meta");
					mobileExecTag.setAttribute("name", "viewport");
					mobileExecTag.setAttribute("content", "width=device-width, user-scalable=no");
					document.head.appendChild(mobileExecTag);
				}catch(e){
					//document.writeln("<meta name=\"viewport\" content=\"width=device-width, user-scalable=no\">");
				}finally{
					;
				}
				//document.writeln((navigator.userAgent.toLowerCase().indexOf("netscape")==-1?"<DIV id=\"" + "\" style=\"position: absolute; left: 0px; top: 0px; width: " + (this.embedSize!=null?(this.embedSize.width + "px") :"100%") +  "; height: " + (this.embedSize!=null?(this.embedSize.height + "px") :"100%") + ";  z-index: 0; \">":"") + "<TABLE style=\"width: " + (this.embedSize!=null?(this.embedSize.width + "px") :"100%") +  "; height: " + (this.embedSize!=null?(this.embedSize.height + "px") :"100%") + "; \"><TR><TD style=\"width: " + (this.embedSize!=null?(this.embedSize.width + "px") :"100%") +  "; height: " + (this.embedSize!=null?(this.embedSize.height + "px") :"100%") + "; \">&nbsp;</TD></TR></TABLE>" + (navigator.userAgent.toLowerCase().indexOf("netscape")==-1?"</DIV>":""));
				//FROZEN BUG
			}

			this.size=new Dimension(getScreenWidth(), getScreenHeight());

			this.winSize=new Dimension(getScreenWidth(), getScreenHeight());

			this.middle = new Point(Math.floor(this.getSize().getWidth()/2), Math.floor(this.getSize().getHeight()/2));

			if(this.embedSize==null) this.setInnerFrame(this.winSize.width, this.winSize.height);

			this.setFrame(this.winSize.width, this.winSize.height);

			this.setOverlap(0,0);

			if(launchStart){
				observe=true;
			}

		}



		this.setFrame = function(width, height){

			this.size = new Dimension(width, height);

			this.winSize=new Dimension(getScreenWidth(), getScreenHeight());

		}





		this.setInnerFrame = function(width, height){

			this.embedSize = new Dimension(width, height);

			
			this.innerFrame = new Rectangle(new Point(Math.floor(this.middle.getX()-width/2), Math.floor(this.middle.getY()-(height/2))), this.embedSize);

		}



		this.getSize=function(){

			return this.size;

		}

		

		this.setSize = function(width, height){

			this.setFrame(width, height);

		}



		

		this.setOverlap  = function(width, height){

			var size= new Dimension(width?width:1, height?height:1);

			var limit=0;

			var stepW=0;

			var stepH=0;

			var savNewEmbedWidth=this.embedSize.width;

			var savNewEmbedHeight= this.embedSize.height;

			

			if(size.width<size.height){

				limit=size.width;

				stepW=1;

				stepH=size.height/limit;

				

			}else{

				limit = size.height;

				stepH=1;

				stepW=size.width/limit;

			}

			var count=0;

			while((this.embedSize.width<this.getSize().width&&this.embedSize.height<this.getSize().height)&&count<limit){

				savNewEmbedWidth=savNewEmbedWidth+stepW;

				savNewEmbedHeight=savNewEmbedHeight+stepH;

				this.embedSize = new Dimension(Math.floor(savNewEmbedWidth), Math.floor(savNewEmbedHeight));

				count++;

			}

			if(size.width<size.height){

				this.overlap = new Dimension(count, Math.floor(count*stepH));

			}else{

				this.overlap = new Dimension(Math.floor(count*stepW), count);

			}

			this.innerFrame.itsPoint=new Point(Math.floor(this.innerFrame.itsPoint.getX()-this.overlap.width/2), Math.floor(this.innerFrame.itsPoint.getY()-this.overlap.height/2));

			this.innerFrame.getSize().width+=this.overlap.width;

			this.innerFrame.getSize().height+=this.overlap.height;



		}





		this.setMinimumSize = function(width, height){

			this.setInnerFrame(width, height);

		}



		this.setPreferedSize = function(width, height){

			this.setOverlap(width-this.getSize().width, height-this.getSize().height);

		}



		this.getMiddle = function(){

			return this.middle;	

		}



		this.toString = function(){

			return "left=" + this.innerFrame.itsPoint.getX() + "&top=" + 

			this.innerFrame.itsPoint.getY() + "&width=" + 

			this.embedSize.width + "&height=" + 

			this.embedSize.height  + "&ovX=" + 

			this.overlap.width + "&ovY=" + 

			this.overlap.height;

		}



		this.getLayerId = function(){

			return this.layerId;

		}

		this.getLayer = function(){
			if(this.layer==null) this.layer=document.getElementById(this.layerId);
			return this.layer
		}


		this.makeVisible = function(b){

			try{

			if(this.frameObj==null) this.frameObj=document.getElementById(this.layerId).style;

			if(b){

				this.frameObj.visibility=SHOW;

			}else this.frameObj.visibility=HIDE;

			}catch(e){

				;

			}finally{
				try{
					document.getElementById(this.fId).style.visibility=b?SHOW:HIDE;
				}catch(e){
				}
			}

		}

		this.setFrameName=function(to){
			this.fName=to;
		}

		this.getWindow = function(){

			return window.frames[this.fName];

		}

		this.getIFrameNode=function(isUrl, scrolling, zindex, relX, relY, norel, nopos){
			var netscape=navigator.userAgent.toLowerCase().indexOf("netscape")!=-1?true:false;
			norel=norel?norel:false;
			nopos=nopos?nopos:false;
			scrolling=scrolling?(netscape?true:scrolling):(netscape?true:false);

			relX=relX?relX:0;

			relY=relY?relY:0;			

			zindex=zindex?zindex:1;

			isUrl+=(isUrl.indexOf("?")!=-1?"&":"?") + "cent=YES&" + this.toString();

		
			observe=true;
			
			var layerNode=document.createElement("DIV");
			layerNode.style.visibility=HIDE;
			if(!nopos){
				layerNode.style.position="absolute";
				
				layerNode.style.left=(norel?relX:(this.innerFrame.getPoint().getX()+relX)) + "px";
				layerNode.style.top=(norel?relY:(this.innerFrame.getPoint().getY()+relY)) + "px";
			}
			layerNode.style.width=(this.innerFrame.getSize().width) + "px";
			layerNode.style.zIndex=zindex;
			layerNode.style.height=(this.innerFrame.getSize().height) + "px";
			layerNode.id=this.layerId;
			
			var iframeNode=document.createElement("IFRAME");
			iframeNode.style.visibility=HIDE;
			iframeNode.name=this.fName;
			iframeNode.id=this.fId;
			iframeNode.src=isUrl;
			iframeNode.width=this.innerFrame.getSize().width;
			iframeNode.height=this.innerFrame.getSize().height;
			iframeNode.setAttribute("frameborder", "0");
			if(!scrolling) iframeNode.setAttribute("scrolling", "no");
			iframeNode.setAttribute("allowtransparency", "true");
			iframeNode.style.backgroundColor="transparent";
			layerNode.appendChild(iframeNode);
			return layerNode;
		}
		
		this.appendIFrameNode=function(appendTo, isUrl, scrolling, zindex, relX, relY, norel){
			appendTo.appendChild(this.getIFrameNode(isUrl, scrolling, zindex, relX, relY, norel, false));
			return appendTo;
		}


		this.writeObject = function(isUrl, scrolling, zindex, relX, relY){

			var netscape=navigator.userAgent.toLowerCase().indexOf("netscape")!=-1?true:false;

			scrolling=scrolling?(netscape?true:scrolling):(netscape?true:false);

			relX=relX?relX:0;

			relY=relY?relY:0;			

			zindex=zindex?zindex:1;
			
			isUrl+=(isUrl.indexOf("?")!=-1?"&":"?") + "cent=YES&" + this.toString();

			document.writeln("<DIV id=\"" + this.layerId + "\" style=\"position: absolute; left: " + (this.innerFrame.itsPoint.getX()+relX)  + "px; top: " +   (this.innerFrame.itsPoint.getY()+relY)  + "px; width: " + this.innerFrame.getSize().width + "; height: " + this.innerFrame.getSize().height + "; z-index: " + zindex + "; visibility: " + HIDE + "; \"><OBJECT id=\"" + this.fId + "\" width=\"" + this.innerFrame.getSize().width +  "\" height=\"" + this.innerFrame.getSize().height + "\" type=\"text/html\" data=\"" + isUrl + "\" border=\"0\" allowtransparency=\"true\" style=\"overflow: hidden; background-color: transparent; \"></OBJECT></DIV>");

		}



		this.writeIFrame = function(isUrl, scrolling, zindex, relX, relY){

			var netscape=navigator.userAgent.toLowerCase().indexOf("netscape")!=-1?true:false;

			scrolling=scrolling?(netscape?true:scrolling):(netscape?true:false);

			relX=relX?relX:0;

			relY=relY?relY:0;			

			zindex=zindex?zindex:1;

			isUrl+=(isUrl.indexOf("?")!=-1?"&":"?") + "cent=YES&" + this.toString();
			
			document.writeln("<DIV id=\"" + this.layerId + "\" style=\"position: absolute; left: " + (this.innerFrame.itsPoint.getX()+relX)  + "px; top: " +   (this.innerFrame.itsPoint.getY()+relY)  + "px; width: " + this.innerFrame.getSize().width + "; height: " + this.innerFrame.getSize().height + "; z-index: " + zindex + "; visibility: " + HIDE + "; \"><IFRAME name=\"" + this.fName + "\" id=\"" + this.fId + "\" width=\"" + this.innerFrame.getSize().width +  "\" height=\"" + this.innerFrame.getSize().height + "\" src=\"" + isUrl + "\" frameborder=\"0\"" + (!scrolling?"scrolling=\"no\"":"") + " allowtransparency=\"true\" style=\"background-color: transparent; \"></IFRAME></DIV>");

			observe=true;

		}
		
		this.getLayerHTML = function(isUrl, scrolling, zindex, relX, relY, norel, nopos){

			var netscape=navigator.userAgent.toLowerCase().indexOf("netscape")!=-1?true:false;

			scrolling=scrolling?(netscape?true:scrolling):(netscape?true:false);

			relX=relX?relX:0;

			relY=relY?relY:0;			

			zindex=zindex?zindex:1;

			isUrl+=(isUrl.indexOf("?")!=-1?"&":"?") + "cent=YES&" + this.toString();
			
			return "<DIV id=\"" + this.layerId + "\" style=\"position: absolute; left: " + ((norel?relX:(this.innerFrame.getPoint().getX()+relX)) + "px")  + "; top: " +   ((norel?relY:(this.innerFrame.getPoint().getY()+relY)) + "px")  + "; width: " + Math.ceil(this.innerFrame.getSize().width) + "px; height: " + Math.ceil(this.innerFrame.getSize().height) + "px; z-index: " + zindex + "; visibility: " + HIDE + "; \"><IFRAME name=\"" + this.fName + "\" id=\"" + this.fId + "\" width=\"" + Math.ceil(this.innerFrame.getSize().width) +  "\" height=\"" + Math.ceil(this.innerFrame.getSize().height) + "\" src=\"" + isUrl + "\" frameborder=\"0\"" + (!scrolling?"scrolling=\"no\"":"") + " allowtransparency=\"true\" style=\"background-color: transparent; \"></IFRAME></DIV>";

			observe=true;

		}



	}
