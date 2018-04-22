$(function(){
	var map, marker;
	var mapDiv = document.getElementById('map');
	var myLatLng = {lat: 10.0309641000, lng: 105.7689041000};
 	function initMap() {
        map = new google.maps.Map(mapDiv, {
          center: myLatLng,
          zoom: 16,
          zoomControl: false,
          streetViewControl: false,
          scrolwheel : true,
        });
        marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Hello World!',
          draggable: true,
          icon: 'http://maps.google.com/mapfiles/ms/micons/green.png'
        });
       google.maps.event.addListener(marker,'position_changed',function(){

		var lat = marker.getPosition().lat();
		var lng = marker.getPosition().lng();

		$('#lat').val(lat);
		$('#lng').val(lng);
		// console.log(lat, lng);

	});
      var customMapType = new google.maps.StyledMapType([
      		{stylers: [{hue: '#D2E4C8'}]},
      		{
                featureType: 'water',
                stylers: [{color: '#599459'}]
              },
      	]);
      var customMapTypeId ='custom_style'
	      map.mapTypes.set(customMapTypeId, customMapType);
	      map.setMapTypeId(customMapTypeId);
	      geolocate();

  
}; // end init map
function ZoomControl(){
	var zoomInButton = document.getElementById('zoom-in');
	var zoomOutButton = document.getElementById('zoom-out');

	google.maps.event.addListener(zoomInButton, 'click', (function() {  
            map.setZoom(map.getZoom()+1);
           }));
	google.maps.event.addListener(zoomOutButton, 'click', (function() {  
            map.setZoom(map.getZoom()-1);
           }));
}; // end zoom
function GeolocationControl(){
	var geoButton = document.getElementById('curent-location');
	google.maps.event.addListener(geoButton, 'click', geolocate);	
};
function geolocate(){
	if (navigator.geolocation) { //nếu trình duyệt lấy đc vị trí
          navigator.geolocation.getCurrentPosition(function(position) {

          	console.log(position);
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };


            map.setCenter(pos);
            marker.setPosition(pos);
          });
        }else{
        	alert('use location');
        }
	};

      initMap();
      ZoomControl();
      GeolocationControl();
});

 