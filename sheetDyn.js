	function findCSSclass(sheet, name){
		var CSSstyles=sheet;
		var found=false;
		var stoD=-1;
		for(var d=0; (d < CSSstyles.cssRules.length)&&!found; d++){
				if(name==CSSstyles.cssRules[d].name){
					found=true;
					var stoD=d;
				}
		}
		return ((stoD>=0)?CSSstyles.cssRules[stoD]:null);
	}
	
	
	function replaceRule(sheet, selector, rules){
		var unitClassCSS=findCSSclass(sheet, selector.substr(1, selector.length-1));
		if(unitClassCSS!=null){
			try{
				sheet.removeRule(findCSSclass(sheet, selector.substr(1, selector.length-1)).cssText);
			}catch(e){
				;
			}
			addCSSRule(sheet, selector, rules);
		}
	}


	function deployStyleSheet(to){
		to=to?to:false;
		var style = to?to:document.createElement("style");
		if(!to) style.appendChild(document.createTextNode("")); //bugfix for chrome
		if(!to) document.head.appendChild(style);
		return style.sheet;
	}
	
	
	function getCSStext(selector, rules){
		return "" + selector + " {" + rules + "}";
	}
	
	function addCSSRule(sheet, selector, rules) {
		if("insertRule" in sheet) {
			sheet.insertRule(getCSStext(selector, rules), sheet.cssRules.length);
			sheet.cssRules[sheet.cssRules.length-1].name=selector.indexOf(".")==0||selector.indexOf("#")==0?selector.substr(1, selector.length-1):selector;
		}
		else if("addRule" in sheet) {
			sheet.addRule(selector, rules, index);
		}
	}
	
	var lazySheet=null;

	function setScope(styleObj, pxval){
		setPerspective(styleObj, pxval)
	}
	
	function enableGPU(lazySheet, px){
		px=px?px:0;
		setScope(lazySheet, px);
	}
