/**
 * GO  : global  object  namespace
 * 
 */ 
		

var DC = (function(){
	
	var DC={};
	
//////////////////////////////////////////////L/////////////////////////////////////////////////////////////////	   
    var wayPoint = L.icon({
        iconUrl: 'css/images/point-marker.png',
    	// iconUrl: 'css/images/marker-icon-OrangeLogo.png',
        // iconSize: [38, 95],
         iconAnchor: [7, 7],
        // popupAnchor: [-3, -76],
        // shadowUrl: 'DCmap-logo-mini.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
    });
    //var pl=[];
      var pl= '';
      var pl2=[];
    function drawLine(e){
    	
    	//alert('dc');
    	 var str = e.latlng.toString();
		 var str0 = str.substring(str.indexOf("(")+1,str.indexOf(")"));
		 var strArray = str0.split(", ",2);  // 0,1 :latitude,longitude
		 
	     L.marker([strArray[0],strArray[1]],{icon: wayPoint}).bindTooltip(str).addTo(app.map);
	    
	    if (pl==null || pl==''){
	    	pl+='['+str0+']';  
	    	//alert(pl);  //FT
	    } else {
	        
	    	//alert(pl[0]);  //FT
 		pl+=',['+str0+']';
 		//alert(pl);  //FT
 		
 		
 		
 		
 		}
 		
	    /*
	    // create a red polyline from an array of LatLng points
		 var latlngs = [
		     [45.51, -122.68],
		     [37.77, -122.43],
		    [34.04, -118.2]
		 ];
		 var polyline = L.polyline(latlngs, {color: 'black'}).addTo(app.map);
		 // zoom the map to the polyline
		 app.map.fitBounds(polyline.getBounds());
		 */
	   
		 var polyline = L.polyline(NR(pl), {color: 'black'}).addTo(app.map);
		  app.map.fitBounds(polyline.getBounds());
		 
		 
    };
    
    function NR(src){  // [non reverse] hybrid data : string and array dataformat
	    var a0= src.substring(1,(src.length-1));   		
		var a2 = [];
	    	a2= a0.split('],[');     
	    var ppl = [];
	      for (var v = 0; v < a2.length; v++) {
	       	ppl.push(a2[v].split(','));
	      }    	
		//  pl = ls2;
	    //  alert(ppl);
	 return ppl;
 } 
//////////////////////////////////////////G///////////////////////////////////////////////////////////////////
  DC.cn_gpx_init='0';
	DC.gpxInitBtn = function (){
		
		 if (DC.cn_gpx_init=='0') {
    		 app.toggleMenuPopup ();
    		 DC.cn_gpx_init='1';
    		
	         app.map.on('click',drawLine);	
	        
    	 } else if (DC.cn_gpx_init=='1') {
    		 DC.cn_gpx_init='0';
    		
    		 app.map.off('click',drawLine);	 
    		 app.toggleMenuPopup ();
    	 }
	      
		};
		
		    

		
	DC.uv = function (){
		   //alert(DC.n);
		   alert('DCmap');
					
		  };
	    
///////////////////////////////////R///////////////////////////////////////////////////////////////////////////	    
		  
	return DC;
}());