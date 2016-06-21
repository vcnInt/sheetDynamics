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


function _obj_equals(obj){



		

		//code to paste for coresp.

		if(this.constructor==obj.constructor){



			return true;



		}



			return false;



		



}



Object.prototype.equals = _obj_equals;



function copy(){

		var loop;

		var temp_array = new Array();

		for (loop = 0; loop < this.length; loop++){

			temp_array.push(this[loop]);

		}

		return temp_array;

	}

	

Array.prototype.copy = copy;	



function pop(){



if(this.length>0){


  		var last_item = this[this.length-1];



 		this.length--;



  		return last_item;



	}
		return -1;


}



Array.prototype.pop = pop;	



function concat(second_array)



{



  var first_array = this.copy();



  



  for (loop = 0; loop<second_array.length; loop++)



  {



    first_array[first_array.length] = second_array[loop];



  }



  return first_array;



}



Array.prototype.concat = concat;	























function shift()



{



  var new_value = this[0];



  var orig_length = this.length;



  for (loop = 0; loop<this.length-1; loop++)



  {



    this[loop] = this[loop+1];



  }



  this.length--;



  return new_value;



}







Array.prototype.shift = shift;







function unshift(the_item)



{



  for (loop = this.length-1 ; loop >= 0; loop--)



  {



    this[loop+1] = this[loop];



  }



  this[0] = the_item;



  return this.length;



}







Array.prototype.unshift = unshift;







function permute(the_array)



{







  var temp_array = this.copy();



  var new_array = new Array();



  var random_num = 0;



  for (loop = 0; loop < this.length; loop++)



  {



    random_num = Math.round(Math.random() * (temp_array.length-1));



    new_array[loop] = temp_array[random_num];



    temp_array[random_num] = temp_array[temp_array.length-1];



    temp_array.length--;



  }



  return new_array;



}







Array.prototype.permute = permute;



//*****version up



function insert(the_item, posi){



	var tmp_array = new Array();



	for(var loop=0; loop < posi; loop++){



		tmp_array[loop]=this[loop];



	}	



	tmp_array[posi]=the_item;



	for(var loop=posi; loop < this.length; loop++){



		tmp_array[loop+1]=this[loop];



	} 



	return tmp_array;



}







Array.prototype.insert = insert;











function remove(item){



	var tmp_array = new Array();











	var count=0;











	for(var v=0; v < this.length; v++){



		if(v==item){



			;



		}else{



			tmp_array.push(this[v]);

			count++;	



		}



	}



	return tmp_array;



}







Array.prototype.remove = remove;







function find(item){//on one hand object that has index property on other hand item is integer and was within bounds



	var found=-1;



	for(var v=0; v < this.length||found==-1; v++){



			found=this[v].equals(item)?true:found;







	}



	if(found==-1) return false;

	return true;

}







Array.prototype.find = find;







function retain(is_array){//works



	var count=0;



	var tmp_array = new Array();



	for(var v=0; v < is_array.length; v++){





			if(this.find(is_array[v])){







				tmp_array[count++]=is_array[v];



			}



	}



	return tmp_array;



}









Array.prototype.retain = retain;





function dissort(is_array){//works



	var count=0;



	var tmp_array = new Array();



	for(var v=0; v < is_array.length; v++){



	

			if(this.find(is_array[v])){



				;			



			}else{

				tmp_array[count++]=is_array[v];

			}



	}



	return tmp_array;



}





Array.prototype.remain = dissort;



//****version up







function getLastWithId(id){// works fine on 1 dim array with obj item has id member



	var found=-1;



	for(var v=0; v < this.length; v++){



		found=this[v].id==id?v:found;	



	}



	if(found!=-1){



		return this[found];



	}



	return null;



}







Array.prototype.getLastWithId = getLastWithId;





//****version up







function getLastWithId(id){// works fine on 1 dim array with obj item has id member



	var found=-1;



	for(var v=0; v < this.length; v++){



		found=this[v].id==id?v:found;	



	}



	if(found!=-1){



		return this[found];



	}



	return null;



}







ArrayList.prototype.getLastWithId = getLastWithId;







/*new added very usesful*/





/*braintex algo gains transaction buffer*/





function BufferListEle(obj){

	this.obj=obj;

	this.next=null;

	this.prev=null;



	this.chainWith = function(ele){

		if(ele) ele.next=this;

		this.prev=ele;

	}

}



function BufferList(ary){

	this.header=null;

	this.footer=null;

	var d=0;

	for(; d < ary.length; d++){

		var caret=null;

		if(d!=0){

			caret=this.footer;

		}	

		this.footer=new BufferListEle(ary[d]);

		if(d==0){

			this.header=this.footer;

		}

		this.footer.chainWith(caret);

	} 

	this.length=d;

	this.get = function(nr){

		var cur=this.header;

		var c=0;

		while(cur!=this.footer&&c!=nr){

			cur=cur.next;

			c++;

		}

		return cur.obj;

	}





	this.remove  = function(nr){

		if(nr==0){

			this.header=this.header.next;

			--this.length;

		}else if(nr == this.length-1){

			this.footer=this.footer.prev;

			--this.length;

		}else{

			var cur=this.header;

			var c=0;

			while(cur!=this.footer&&c!=nr){

				cur=cur.next;

				c++;

			}

			cur.prev.next=cur.next;

			cur.next.prev=cur.prev;

			--this.length;

		}

	}

}







function sortBy(field, notzero, casesensitive){



	casesensitive=casesensitive?casesensitive:false;



	var temp = new Array();



	var temp2=new BufferList(this);





	do{



		var found=0;



		for(var v=0; v <  temp2.length; v++){



			var a=eval("temp2.get(" + found + ")." + field);



			var b=eval("temp2.get(" + v + ")." + field);



			found=(notzero<0?((a.constructor === String&&casesensitive?a.toLowerCase():a)>(b.constructor === String&&casesensitive?b.toLowerCase():b)):((a.constructor === String&&casesensitive?a.toLowerCase():a)<(b.constructor === String&&casesensitive?b.toLowerCase():b)))?v:found;



		}



		temp.push(temp2.get(found));





		temp2.remove(found);



	}while(temp2.length!=0);



	return temp;



}





Array.prototype.sortBy=sortBy;





function ArrayList(){

	this.self=this;

	Array.call(this);

}



if(document.all) ArrayList = Array;



ArrayList.prototype = new Array();

ArrayList.prototype.constructor=Array;


