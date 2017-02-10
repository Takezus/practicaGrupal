$(document).ready(function(){
	
	$('#datetimepicker1').datetimepicker({
		format: 'DD/MM/YYYY'
	});

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

	$('#ini-face').click(function(){
  		$('#donde').val('login');
    	FB.getLoginStatus(function(response) {
      		loguear(response);
    	});
  	});

  	$('#reg-fac').click(function(){
  		$('#donde').val('registro');
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

    /*
  	function loguear(response){  		
	    
      if (response.status === 'connected'){
	    	conectar();
	    }else if(response.status === 'not_authorized') {
	    
	    }else{
	    	FB.login(function(response){
	    		if (response.authResponse){
	    			conectar();
	    		}
	    	});	
	    }
  	}
*/
  	function conectar(){
  		var donde = $('#donde').val();
      //el metodo fb.api me permite acceder a los atributos del usuario
        FB.api('/me', {fields: 'first_name,last_name,email,gender,id'}, function(response) {
            if (donde=='registro'){
                var email = '';
                if (response.email==undefined){
                  email = response.id + '@facebook.com'
                }else{
                  email = response.email;
                }
                var params = {
                    act: 'incFacebook',
                    id: response.id,
                    nombre: response.first_name,
                    apellido: response.last_name,
                    correo: email,
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

				


var ref = new Firebase ('https://chatfbexample.firebaseio.com/');
ref.onAuth(function(authData) {
        if (authData) {
          //chat.setUser(authData.uid, "Anonymous" + authData.uid.substr(10, 8));
        } else {
          ref.authAnonymously(function(error, authData) {

            if (error) {
              console.log(error);
            }
          });
        }
      });


var refUsuarios = ref.child("users");
nom = params.nombre+' '+params.apellido;
var refUsuario = refUsuarios.child(nom);
	refUsuario.set({
		    date_of_birth: '0000-00-00',
		    full_name:nombre+' '+apellido,
		   user_type:1
		  });







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
            }

            else{
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
                            if (data.mensaje=='datos_incorrectos'){
                                showAlert('Los datos suministrados no coinciden... No puede ingresar', 'Datos no encontrados', 1);  
                            }
                        }
                    },
                    beforeSend:function(){},
                    error:function(objXMLHttpRequest){}
                });             
            }
        });  		
  	}

	$('#iniciar').click(function(){
		$('#inicio').modal('show');
	});

	$('#registrar').click(function(){
		var url = 'registro.php';
		$(location).attr('href',url);
	});

	$('#entrar-reg').click(function(){
		$('#iniciar').click();
	});

	$('#registrate').click(function(){
		var nombre = $('#nombre').val();
		var apellido = $('#apellido').val();
		var fecha = $('#fecha').val();
		var genero = $('#genero').val();
		var correo = $('#correo').val();
		var clave = $('#clave').val();
		var clave2 = $('#clave2').val();		
		if (validar_ob(nombre)==false){
			showAlert('Debe suministrar un nombre', 'Datos Incompletos', 1);
		}else{
			if (validar_ob(apellido)==false){
				showAlert('Debe suministrar un apellido', 'Datos Incompletos', 2);	
			}else{
				if (validar_fecha(fecha)==false){
					showAlert('Debe suministrar una fecha de nacimiento válida', 'Datos Incompletos', 3);	
				}else{
					if (genero=='0'){
						showAlert('Debe seleccionar un genero', 'Datos Incompletos', 4);		
					}else{
						if (ue_validarcorreo(correo)==false){
							showAlert('Debe suministrar un correo válido', 'Datos Incompletos', 5);			
						}else{
							if (validar_uc(clave)==false){
								showAlert('Debe suministrar una clave que contenga 8 dígitos entre letras y números', 'Datos Incompletos', 6);
							}else{
								if (clave != clave2){
									showAlert('Las claven no cinciden', 'Datos Incompletos', 6);	
								}else{
									if ($('input[name="leido"]').is(':checked')==false){
										showAlert('Debe aceptar los términos y condiciones', 'Datos Incompletos', 0);
									}else{
										var params = {
											act: 'incUsuario',
											nombre: $('#nombre').val(),
											apellido: $('#apellido').val(),
											fecha: $('#fecha').val(),
											genero: $('#genero').val(),
											correo: $('#correo').val(),
											clave: $('#clave').val(),
										}
										$.ajax({
										    async:false,   
										    cache:false, 
										    dataType: 'json',
										    type: 'POST',  
										    url: '../modelo/registro.php',
										    data: params,
										    success:  function(data){ 
										   
												if (data.success==true){
													showAlert('¡El registro se llevó a cabo con éxito! Se le enviara un correo de verificación con los datos de su cuenta.', 'Bienvenido', 7);








var ref = new Firebase ('https://chatfbexample.firebaseio.com/');
ref.onAuth(function(authData) {
        if (authData) {
          //chat.setUser(authData.uid, "Anonymous" + authData.uid.substr(10, 8));
        } else {
          ref.authAnonymously(function(error, authData) {

            if (error) {
              console.log(error);
            }
          });
        }
      });


var refUsuarios = ref.child("users");

var refUsuario = refUsuarios.child(nombre+' '+apellido);
	refUsuario.set({
		    date_of_birth: fecha,
		    full_name:nombre+' '+apellido,
		   user_type:1
		  });















												}else{
													if (data.mensaje=='correorepetido'){
														showAlert('El correo que intenta suministrar esta repetido... No se puede registrar', 'Error', 0);	
													}
													if (data.code=='no se realizó la operacion'){
														showAlert('Existe un problema de comunicación...Intente más tarde', 'Error', 0);	
													}
												}
										    },
										    complete: function(response) 
										    {
											   // alert(response.responseText);
										    },
										    beforeSend:function(){},
										    error:function(objXMLHttpRequest){}
									    });
									}  
								}
							}
						}
					}
				}
			}
		}
	});

	$('#nombre').focus();

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
            	 	$('#nombre').focus();
            	}
            	if (Donde==2){
            		$('#apellido').focus();
            	}
            	if (Donde==3){
            		$('#fecha').focus();
            	}
            	if (Donde==4){
            		$('#genero').focus();
            	}
            	if (Donde==5){
            		$('#correo').focus();
            	}
            	if (Donde==6){
            		$('#clave').focus();
            	}
            	if (Donde==7){
            		$(location).attr('href','../vista/index.php');
            	}
        	}
        });
    }
});

					// BootstrapDialog.TYPE_DEFAULT, 
     //                 BootstrapDialog.TYPE_INFO, 
     //                 BootstrapDialog.TYPE_PRIMARY, 
     //                 BootstrapDialog.TYPE_SUCCESS, 
     //                 BootstrapDialog.TYPE_WARNING, 
     //                 BootstrapDialog.TYPE_DANGER
