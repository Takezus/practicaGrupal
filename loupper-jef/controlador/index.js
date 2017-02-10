$(document).ready(function(){

// var isMobile = {
//     Android: function() {
//         return navigator.userAgent.match(/Android/i);
//     },
//     BlackBerry: function() {
//         return navigator.userAgent.match(/BlackBerry/i);
//     },
//     iOS: function() {
//         return navigator.userAgent.match(/iPhone|iPad|iPod/i);
//     },
//     Opera: function() {
//         return navigator.userAgent.match(/Opera Mini/i);
//     },
//     Windows: function() {
//         return navigator.userAgent.match(/IEMobile/i);
//     },
//  };

//  if (isMobile.Android())
//  {
//  alert("Android");
//  }
//  else if (isMobile.BlackBerry())
//  {
//  alert("BlackBerry");
//  }
//  else if (isMobile.iOS())
//  {
//  alert("Iphone");
//  }
//  else if (isMobile.Opera())
//  {
//  alert("Opera");
//  }
//  else if (isMobile.Windows())
//  {
//  alert("IEMobile");
//  }
//  else
//  {
//  alert("Default");
//  }
//Captura el valor de la conexion, si se ha presionado el boton
	var conexion = $('#conexion').val();
	
	if (conexion==1){
		$('#iniciar').html('Inicio');
	 	$('#registrar').html('Perfil');
	}
// objeto de tipo json
  var params = {
    act: 'getPaginas'
  }

  $.ajax({
                    async:true,   
                    cache:false, 
                    dataType: 'json',
                    type: 'POST',  
                    url: '../modelo/index.php',
                    //le envia un arreglo {act:'getPaginas'}
                    data: params,
                    success:  function(data){ 
                            if (data.success==true){
                              for(i=0;i<data.data.length;i++){
                                //Se reciben los datos de la petición, que se envian por un objeto json
                                var id = data.data[i].id;
                                var nombre = data.data[i].nombre;
                                //En este punto del codigo, se envian al select los datos del arraglo, co
                                $("#paginas").append("<option class=\"text-rr text-16\" value=\""+id+"\">"+nombre+"</option>");
                              }
                            }else{
                                if (data.mensaje=='correorepetido'){
                                    showAlert('El correo que intenta suministrar esta repetido... No se puede registrar', 'Error', 0);  
                                }
                                if (data.code=='no se realizó la operacion'){
                                    showAlert('Existe un problema de comunicación...Intente más tarde', 'Error', 0);    
                                }
                            }
                    },
                    beforeSend:function(){},
                    error:function(objXMLHttpRequest){}
  });     

  $('#paginas').change(function(){
      var id = $('#paginas').val();
      $(location).attr('href','../vista/veraccion.php?id='+id);
  });

// Se implemento el SDK utilizando JQUERY
	$.ajaxSetup({ cache: true });
  	
  	$.getScript('//connect.facebook.net/en_US/sdk.js', function(){
    	FB.init({
      		appId: '204215923292122',
      		version: 'v2.5' // or v2.0, v2.1, v2.2, v2.3
    	});     
    	
    	// FB.getLoginStatus(function(response) {
     //  		statusChangeCallback(response);
    	// });
  	});

  	//04587064

	$('#iniciar').click(function(){
		if (conexion==1){
      //Si la conexion es 1, te redireccionara al index
			$(location).attr('href','index.php');
		}else{
      //Si no, enseñara una ventana modal
			$('#inicio').modal('show');
		}	
	});


  //Evento utilizado a la hora de dar click a inicio
	$('#registrar').click(function(){
		if (conexion==1){
      //si existe la conexion, seras redireccionado al chat
			$(location).attr('href','chat.php');
		}else{
      // si no existe me enviaras al registro
			var url = 'registro.php';
			$(location).attr('href',url);
		}	
	});

	$('#entrar-reg').click(function(){
		$('#iniciar').click();
	});

/*
*Valores del objeto response
status:
connected: la persona inició sesión en Facebook y en tu aplicación.
not_authorized: la persona inició sesión en Facebook, pero no en tu aplicación.
unknown: la persona no inició sesión en Facebook, de modo que no sabes si la inició en tu aplicación. O bien, se llamó a FB.logout() con anterioridad y no se pudo conectar con Facebook.
authResponse: se incluye si el estado es connected, y consta de los siguientes elementos:
accessToken: contiene un token de acceso para la persona que usa la aplicación.
expiresIn: indica la hora UNIX en que el token caduca y se debe renovar.
signedRequest: un parámetro firmado que contiene información sobre la persona que usa la aplicación.
userID: es el identificador de la persona que usa la aplicación.
*/


  //Funciones de registro de facebook
	function statusChangeCallback(response){
	    if (response.status === 'connected') {
	      alert('logueado')
	    } else if (response.status === 'not_authorized') {
	      alert('Please log into this app.');
	    } else {
	      alert('Please log into Facebook.');
	    }
  	}
//Es aqui donde se realiza la peticion a fb
  	$('#ini-face').click(function(){
  		$('#donde').val('login');
    	FB.getLoginStatus(function(response) {
      		loguear(response);
    	});
  	});



    function loguear(response){ 
      FB.login(function(response){
      
      if (response.status === 'connected')
      {
       conectar();
        }
        else if(response.status === 'not_authorized') 
        {
      alert("Por favor registrate en la aplicacion para ingresar");
      }
      else
      {
      if (response.authResponse)
      {
            conectar();
             }
        }  
      });
    }
    
  	/*function loguear(response){ 

	    if (response.status === 'connected'){
        conectar();
	    }else if(response.status === 'not_authorized') {
	    alert("Por favor registrate en la aplicacion para ingresar");
	    }else{
	    	FB.login(function(response){
	    		if (response.authResponse){
	    			conectar();
	    		}
	    	});	
	    }
  	}*/

//  Dado que estamos en el index, al presionar el boton, se le asignara el valor de login
//aca se hace una revision del valor, si se presiono este en el formulario de registro, se hara esto
//de lo contrario se hara un logueo
  	function conectar(){
  		var donde = $('#donde').val();
        FB.api('/me', {fields: 'first_name,last_name,email,gender,id'}, function(response) {
            if (donde=='registro'){
                var params = {
                    act: 'incFacebook',
                    id: response.id,
                    nombre: response.first_name,
                    apellido: response.last_name,
                    correo: response.email,
                    genero: response.gender,
                }

                $.ajax({
                    async:true,   
                    cache:false, 
                    dataType: 'json',
                    type: 'POST',  
                    url: '../modelo/registro.php',
                    data: params,
                    success:  function(data){ 
                            if (data.success==true){
                                showAlert('El registro se llevó a cabo con éxito...Debe loguearse', 'Bienvenido', 7);
                            }else{
                                if (data.mensaje=='correorepetido'){
                                    showAlert('El correo que intenta suministrar esta repetido... No se puede registrar', 'Error', 0);  
                                }
                                if (data.code=='no se realizó la operacion'){
                                    showAlert('Existe un problema de comunicación...Intente más tarde', 'Error', 0);    
                                }
                            }
                    },
                    beforeSend:function(){},
                    error:function(objXMLHttpRequest){}
                });             
            }else{
              //enviamos los valores al archivo comun.js
                var params = {
                    act: 'logFacebook',
                    id: response.id,
                }

                $.ajax({
                    async:true,   
                    cache:false, 
                    dataType: 'json',
                    type: 'POST',  
                    url: '../modelo/comun.php',
                    data: params,
                    success:  function(data){ 
                        if (data.success==true){
                            $(location).attr('href','../vista/chat.php');
                        }else{

                            if (data.mensaje=='datos_incorrectos')
                            {
                                showAlert('Los datos suministrados no coinciden o aun no te has registrado... No puede ingresar', 'Datos no encontrados', 0);  
                            }
                        }
                    },
                    beforeSend:function(){},
                    error:function(objXMLHttpRequest){}
                });             
            }
        });  		
  	}
    
  function showAlert(Message, Title, Donde){
    BootstrapDialog.show({
            message: Message,
            type: BootstrapDialog.TYPE_DANGER,
            title: Title,
            closable: false,
            buttons: [{
                label: 'Aceptar',
                cssClass: 'btn-success',
                action: function(dialogRef){
                    dialogRef.close();
                }
            }],
            onhidden: function(dialogRef){
              if (Donde==1){
                $('#correo').focus();
              }
              if (Donde==2){
                $('#clave').focus();
              }
              if (Donde==7){
                $(location).attr('href','../vista/index.php');
              }
        if (Donde==8){
                $('#inicio').modal('hide');
              }
          }
        });
    }

});

