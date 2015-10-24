/*
Copyright (C)2012 Daniel Wiesenaecker

    
    This file is part of FlipStain.

    FlipStain is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    FlipStain is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with FlipStain.  If not, see <http://www.gnu.org/licenses/>.
*/


function tokenize(source, delims, include){
	var retVal = new Array();
	var countVal=0;
	var buildToken="";
	var finish=false;
	for(var v=0; v < source.length; v++){
		var is=false;
		for(l=0; l < delims.length&&!finish; l++){
			if(source.substr(v, delims[l].length)==delims[l]){
				is=true;
				if(buildToken!=""){
					retVal[countVal++]=buildToken;
					buildToken="";
				}
				if(include==true){
					retVal[countVal++]=delims[l];
				}
			}
		}
		if(!is){
				buildToken+=source.substr(v, 1);
				if(v+1==source.length){
					retVal[countVal++]=buildToken;
					buildToken="";
				}
			}
	}
	return retVal;
}
