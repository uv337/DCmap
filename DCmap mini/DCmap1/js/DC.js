/**
 * GO  : global  object  namespace
 * 
 */ 
		

var DC = (function(){
	
	var DC={};
	
	
	DC.x = 'map';
	DC.y = {A:'0', B:'1' };
	DC.uv = function (){
		alert("DC"+DC.x+DC.y.B); //DCmap1
		};
	
	// [outside invoke]  DC.x() ,  alert(DC.y.A);
	    
	    
	return DC;
	
		
}());