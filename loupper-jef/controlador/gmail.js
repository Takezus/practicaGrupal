    var lat = null;
    var lng = null;
    var map = null;
    var geocoder = null;
    var marker = null;

$(document).ready(function(){

    $.fn.enterKey = function (fnc) {
        return this.each(function () {
            $(this).keypress(function (ev) {
                var keycode = (ev.keyCode ? ev.keyCode : ev.which);
                if (keycode == '13') {
                    fnc.call(this, ev);
                }
            })
        })
    }

    $("#direccion").enterKey(function () {
        codeAddress();
        return false;
    });


     //obtenemos los valores en caso de tenerlos en un formulario ya guardado en la base de datos
     lat = $('#lat').val();
     lng = $('#lon').val();
     //Asignamos al evento click del boton la funcion codeAddress
     //Inicializamos la función de google maps una vez el DOM este cargado
    initialize();
    


    // var map = null;
    // var infoWindow = null;
     
    // function openInfoWindow(marker) {
    //     var markerLatLng = marker.getPosition();
    //     window.opener.document.getElementById('ubicacion').className = window.opener.document.getElementById('ubicacion').className.replace('maps-mas','');
    //     window.opener.document.getElementById('ubicacion').value = 'Lat: '+markerLatLng.lat()+' - Lon: '+markerLatLng.lng();
    //     window.opener.document.getElementById('lat').value = markerLatLng.lat();
    //     window.opener.document.getElementById('lon').value = markerLatLng.lng();
    //     window.close();
    // }

    // function initialize() {
    //     var myLatlng = new google.maps.LatLng(9.103623481986759,-79.40402972900392);
    //     var myOptions = {
    //       zoom: 13,
    //       center: myLatlng,
    //       scrollwheel: true,
    //       mapTypeId: google.maps.MapTypeId.ROADMAP
    //     }
     
    //     map = new google.maps.Map($('#map_canvas').get(0), myOptions);
     
    //     infoWindow = new google.maps.InfoWindow();
     
    //     var marker = new google.maps.Marker({
    //         position: myLatlng,
    //         draggable: true,
    //         map: map,
    //         title:'Haga click para seleccionar su ubicación ó Deje presionado el rato y arrastre hasta otra Ubicación',
    //     });
     
    //     google.maps.event.addListener(marker, 'click', function(){
    //         openInfoWindow(marker);
    //     });
    // }

    //     initialize();
});

    function initialize() {
    
      geocoder = new google.maps.Geocoder();
       
       //Si hay valores creamos un objeto Latlng
       if(lat !='*****' && lng != '*****')
      {
         var latLng = new google.maps.LatLng(lat,lng);
      }
      else
      {
        //Si no creamos el objeto con una latitud cualquiera como la de Mar del Plata, Argentina por ej
         var latLng = new google.maps.LatLng(9.103623481986759,-79.40402972900392);
      }
      //Definimos algunas opciones del mapa a crear
       var myOptions = {
          center: latLng,//centro del mapa
          zoom: 15,//zoom del mapa
          mapTypeId: google.maps.MapTypeId.ROADMAP //tipo de mapa, carretera, híbrido,etc
        };
        //creamos el mapa con las opciones anteriores y le pasamos el elemento div
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        
        //creamos el marcador en el mapa
        marker = new google.maps.Marker({
            map: map,//el mapa creado en el paso anterior
            position: latLng,//objeto con latitud y longitud
            draggable: true //que el marcador se pueda arrastrar
        });
       
       //función que actualiza los input del formulario con las nuevas latitudes
       //Estos campos suelen ser hidden
                google.maps.event.addListener(marker, 'click', function(){
             openInfoWindow(marker);
        });

        
        
    }
    
    //funcion que traduce la direccion en coordenadas
    function codeAddress() {
        //obtengo la direccion del formulario
        var address = document.getElementById("direccion").value;
        //hago la llamada al geodecoder
        geocoder.geocode( { 'address': address}, function(results, status) {
        
        //si el estado de la llamado es OK
        if (status == google.maps.GeocoderStatus.OK) {
            //centro el mapa en las coordenadas obtenidas
            map.setCenter(results[0].geometry.location);
            //coloco el marcador en dichas coordenadas
            marker.setPosition(results[0].geometry.location);
            //actualizo el formulario      
            updatePosition(results[0].geometry.location);
            
            //Añado un listener para cuando el markador se termine de arrastrar
            //actualize el formulario con las nuevas coordenadas
            google.maps.event.addListener(marker, 'dragend', function(){
                updatePosition(marker.getPosition());
            });
      } else {
          //si no es OK devuelvo error
          alert("No podemos encontrar la direcci&oacute;n, error: " + status);
      }
    });
  }
  
  //funcion que simplemente actualiza los campos del formulario
  function updatePosition(latLng)
  {
      
       jQuery('#lat').val(latLng.lat());
       jQuery('#long').val(latLng.lng());
  
  }

function openInfoWindow(marker) {
        var markerLatLng = marker.getPosition();
        window.opener.document.getElementById('ubicacion').className = window.opener.document.getElementById('ubicacion').className.replace('maps-mas','');
        window.opener.document.getElementById('ubicacion').value = 'Lat: '+markerLatLng.lat()+' - Lon: '+markerLatLng.lng();
        window.opener.document.getElementById('lat').value = markerLatLng.lat();
        window.opener.document.getElementById('lon').value = markerLatLng.lng();
        window.close();
    }