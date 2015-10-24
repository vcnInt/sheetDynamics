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

function isNum(num){
	var str="" + num;
	if(str.substr(0,1)=='-'){
		str=str.substr(1,str.length-1);
	}
	var chars=new Array;
	chars[0]='0';
	chars[1]='1';
	chars[2]='2';
	chars[3]='3';
	chars[4]='4';
	chars[5]='5';
	chars[6]='6';
	chars[7]='7';
	chars[8]='8';
	chars[9]='9';
	var isDot='.';	
	var dot=false;
	for(var v=0; v < str.length; v++){
		var chr=str.substr(v,1);
		var equals=false;
		for(var c=0; ((c < chars.length)&&(equals==false)); c++){
			equals=chr.toUpperCase()==chars[c]?true:equals;
		}
		if(chr==isDot){
			if(!dot){
				dot=true;
				equals=true;
			}
		}
		if(!equals){
			return false;
		}
	}
	return true;
}
