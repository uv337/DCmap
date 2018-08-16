/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 *  DCmap v1 is start point for DCmap pro-specs version
 *  Structure  of this app.js  file
 *  V  : globar var  area   // sessionstorage  area
 *  F  : function area      // sessionstorage  area
 *  D  : (toggle)Dialog--
 *  B  : Button (click)--
 *  I  : init default  area
 */
/**
 *  terms : GC (Garbage Collection) ,  ET (Error  Tracer)
 */

//////////////////////////////////V///////////////////////////////////////////////////////////
(function() {
	/**  DC map global var   **/
	//default
	var map;
    var Longitude0;
    var Latitude0;
   
    /** JSON */
    // Random LandsMark swing storage
    var landmark='{"LatLng":[{"RandomListN":" Gyeongbokgung Palace","RandomList0":"37.579487,126.977053"},{"RandomListN":" Effiel Tower","RandomList0":"48.858120,2.294144"}, {"RandomListN":" Moscow Kremlin","RandomList0":"55.751667,37.617778"},{"RandomListN":" Grand Canyon","RandomList0":"36.106609,-112.112943"},{"RandomListN":" Niagara Waterfalls","RandomList0":"43.081966,-79.073090"},{"RandomListN":" Taj Mahal","RandomList0":"27.174838,78.042155"},{"RandomListN":" Victoria Waterfalls","RandomList0":"-17.924593,25.855883"},{"RandomListN":" Iguacu Waterfalls","RandomList0":"-25.695361,-54.436677"},{"RandomListN":" Pyramid of Egypt","RandomList0":"29.979069,31.134185"},{"RandomListN":" Long Man of Wilmington","RandomList0":"50.810,0.188"},{"RandomListN":"Sydney Opera House","RandomList0":"-33.858667,151.214028"},{"RandomListN":"Mesopotamia Ur","RandomList0":"30.963056,46.103056"}]}';   
  
    /** constants and NUMBERS */
    var closePopup=null;
    var menuPopup = null;
    var resetPopupYesBtn =null;
    var infoPopupYesBtn=null;
    var dcInfo=null;
    var cn_watchId='0';
    /** Icon */        
    var myIcon = L.icon({
         iconUrl: 'css/images/DCmap-logo-mini.png',
    	// iconUrl: 'css/images/marker-icon-OrangeLogo.png',
        // iconSize: [38, 95],
        // iconAnchor: [22, 94],
        // popupAnchor: [-3, -76],
        // shadowUrl: 'DCmap-logo-mini.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
    });
    var myGeo = L.icon({
        iconUrl: 'css/images/marker-icon-Black0.png',
        // iconSize: [38, 95],
        // iconAnchor: [22, 94],
        // popupAnchor: [-3, -76],
        // shadowUrl: 'DCmap-logo-mini.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
    });
    
    
//////////////////////////////////F///////////////////////////////////////////////////////////   
    /**
     * Initializes the map.
     */
    function initMaps() {
    	
    	map = L.map('canvas-map');
    	L.control.scale().addTo(map);
    	map.zoomControl.setPosition('bottomleft');
    	 /** defualt */
       	oneShotFunc();
    	
    	
    }
       

 function DCmap0(){
    	//alert('99');  // FT: Func Tracer
    	// setView(x,y,z)  : x latitude  y longitude  z zoom
    	map.setView([Latitude0,Longitude0], 10);  // z : zoom out [-] 0--4---15--19[+] zoom in
    	
    	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    	    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    	}).addTo(map);

    	L.marker([Latitude0,Longitude0],{icon: myGeo}).bindTooltip('[GC)'+Latitude0+','+Longitude0).addTo(map).openTooltip();
    	
    	dcInfo.innerHTML = '<br/>Latitude: x' + Latitude0 +'<br/>Longitude: y' + Longitude0+'<br/>Zoom: z'+map.getZoom();
    	    
 }    
function leafMap0() {
	
	/* DCmap layer [mini version] */ 
	//alert('88'); //FT : Func Tracer
     var numbers = getRandomIntInclusive(0, 11); //getRandomIntInclusive(min, max)
	 var obj = JSON.parse(landmark);   
	 var RandomListArray0 = obj.LatLng[numbers].RandomList0;
	 var RandomListArray = RandomListArray0.split(",",2);
	  
	    // setView(x,y,z)  : x latitude , y longitude , z zoom
		 map.setView([RandomListArray[0],RandomListArray[1]], 7);   // z : zoom out [-] 0--4---15--19[+] zoom in
		 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		 }).addTo(map);
		  
	//L.marker([x,y],{icon: myIcon}).addTo(map);
	L.marker([RandomListArray[0],RandomListArray[1]],{icon: myIcon}).bindTooltip(obj.LatLng[numbers].RandomListN).addTo(map).openTooltip();	
	
	dcInfo.innerHTML = '<br/>Latitude: x' + RandomListArray[0] +'<br/>Longitude: y' + RandomListArray[1]+'<br/>Zoom: z'+map.getZoom();
	    
}


//(MDN)https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
} 
    
    /** [HTML5]  geolocation API
     * 
     * (1/3)Create a "one-shot" position request with the getCurrentPosition() method.
     * The maximumAge parameter determines that if the user agent does not have cached position information that is fresher than 60000 milliseconds (1 minute), new location information is automatically obtained.
     */
     function oneShotFunc() {
         if (navigator.geolocation) {
             navigator.geolocation.getCurrentPosition(successCallback, errorCallback,{maximumAge: 60000});
         } else {
            document.getElementById('locationInfo').innerHTML = 'Geolocation is not supported.';
           
         }
     }
    /**
     * (2/3) Create event handlers for the location requests.
     *  The Geolocation interface allows 2 types of location requests: "one-shot" position request and repeated position updates.
     *  Both request types use the same event handlers. 
     *  The success event handler is invoked when an attempt to obtain the current location is successful, while the error event handler is invoked when the attempt fails.
     *  The success event handler is mandatory, and contains a position parameter that hold the actual position information.
     * 
     * */
     
    function successCallback(position) {
    	
        Latitude0=position.coords.latitude;
        Longitude0=position.coords.longitude;
        DCmap0();
     }
    /**
     * (3/3) Create event handlers for the location requests error.
     */
    function errorCallback(error) {
    	  var errorInfo = document.getElementById('dc-info');
        switch (error.code) {
            case error.PERMISSION_DENIED:
                errorInfo.innerHTML = 'User denied the request for Geolocation.';
            	 break;
            case error.POSITION_UNAVAILABLE:
                errorInfo.innerHTML = 'Location information is unavailable.';
            	 break;
            case error.TIMEOUT:
                errorInfo.innerHTML = 'The request to get user location timed out.';
            	 break;
            case error.UNKNOWN_ERROR:
                errorInfo.innerHTML = 'An unknown error occurred.';
            	 break;
        }
        alert("Check ,  Location GPS Service is not working.");  // FT
        leafMap0();  //default DCmap view  , get default location reserved DATA
    }
  
    
//////////////////////////////////D///////////////////////////////////////////////////////////
    function toggleClosePopup() {
        if (closePopup.classList.contains('ui-popup-active')) {
            tau.closePopup(closePopup);  // TAU is good working
        } else {
            tau.openPopup(closePopup);    // TAU is good working
        }
     }
    function toggleMenuPopup() {
           if (menuPopup.classList.contains('ui-popup-active')) {
               tau.closePopup(menuPopup);  // TAU is good working
           } else {
               tau.openPopup(menuPopup);    // TAU is good working
           }
      }  
      
    
    
//////////////////////////////////B///////////////////////////////////////////////////////////
   function onClosePopupYesBtnClick() {
      
    	tizen.application.getCurrentApplication().exit();
    }   
    
   function onInfoPopupYesBtnClick(){	
    	
    	/** Gobal Namespace [test] **/
    	DC.uv();  // [DC.js] confer : alert(DC.uv);
    	
    }
    
   function onResetPopupYesBtnClick(){  //GPS check button
   	toggleMenuPopup();
   	oneShotFunc();  
   
   }
//////////////////////////////////I///////////////////////////////////////////////////////////
    /**
     * Handles the hardware key event.
     * @private
     * @param {Object} event - The hardware key event object
     */
    function keyEventHandler(event) {
            if (event.keyName === "back") {
                try {
                    tizen.application.getCurrentApplication().exit();
                } catch (ignore) {}
            }else if (event.keyName === 'menu') {
              	
           	 try {
           		
           		 toggleMenuPopup(); 
           		 
                } catch (ignore) {}
           }
    }

    /**
     * Sets the default event handlers to the events.
     * @private
     */
    function setDefaultEvents() {
        document.addEventListener("tizenhwkey", keyEventHandler);
        infoPopupYesBtn.addEventListener('click', onInfoPopupYesBtnClick); //info & test btn
        resetPopupYesBtn.addEventListener('click', onResetPopupYesBtnClick);
    }

    /**
     * Initializes the application.
     * @private
     */
    function init() {
    	
        menuPopup = document.getElementById('menu-popup');
        resetPopupYesBtn = menuPopup.querySelector('#reload-popup-init-btn');//[mylocation] GPS : super man
        infoPopupYesBtn = menuPopup.querySelector('#info-popup-init-btn');
        dcInfo=document.getElementById('dc-info');
        /** Last Position : Don't charge Func order  */
        setDefaultEvents();
        initMaps();
        
    }

   window.onload = init;
    
}());
