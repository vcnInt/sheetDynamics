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









function urlGet(it){
	var delim = new Array();
	delim[0]="&";
	delim[1]="=";
	delim[2]="?";

	var tokens=tokenize(document.location.href, delim, true);


	var find=it;
	var found=-1;
	var v=0;

	while(found<0&&v<tokens.length){
		found=tokens[v]==find?v:found;
		
		v++;
	}

	if(found+2>=tokens.length){
		return -1;
	}	

	if(found > 0){
		if(tokens[found+1]=='='){
			;
		}else return -1;		

		if(tokens[found+2]=='&'){
			return -1;
		}
		var num=-1;
		var neg=(tokens[found+2].substr(0,1)=='-')?true:false;
		num=neg?tokens[found+2].substr(1, tokens[found+2].length-1):tokens[found+2];
		if(isNum(num)){
			return neg?Math.sqrt(num*num)*-1:Math.sqrt(num*num);
		}
		return tokens[found+2];
	}
	return -1;
}
