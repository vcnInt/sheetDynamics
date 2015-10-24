function getHeight(ddl){
		var body = ddl.body,
		html = ddl.documentElement;
		var height = Math.max( parseInt(body.scrollHeight), parseInt(body.offsetHeight), parseInt(html.clientHeight), parseInt(html.scrollHeight), parseInt(html.offsetHeight) );
		return height;
	}
	
	function getWidth(ddl){
		var body = ddl.body,
		html = ddl.documentElement;
		var width = Math.max( parseInt(body.scrollWidth), parseInt(body.offsetWidth), parseInt(html.clientWidth), parseInt(html.scrollWidth), parseInt(html.offsetWidth) );
		return width;
	}

	function getTop(ddl){
		var body = ddl.body,
		html = ddl.documentElement;
		var height = Math.max( parseInt(body.scrollTop), parseInt(body.offsetTop), parseInt(html.clientTop), parseInt(html.scrollTop), parseInt(html.offsetTop) );
		return height;
	}
	
	function getLeft(ddl){
		var body = ddl.body,
		html = ddl.documentElement;
		var width = Math.max( parseInt(body.scrollLeft), parseInt(body.offsetLeft), parseInt(html.clientLeft), parseInt(html.scrollLeft), parseInt(html.offsetLeft) );
		return width;
	}

	
	function getScreenWidth(){
		var retval=parseInt(document.body.clientWidth?document.body.clientWidth:((window.innerWidth?window.innerWidth:document.body.scrollWidth)));
		return retval;
	}
	
	function getScreenHeight(){
		var retval=parseInt(document.body.clientHeight?document.body.clientHeight:((window.innerHeight?window.innerHeight:document.body.scrollHeight)));
		return retval;
	}
