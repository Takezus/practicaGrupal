var id_activo = '';

$(document).ready(function(){

	var conexion = $('#conexion').val();
	var pagina = $('#pagina').val();

	if ( $("#foto").length && $("#avatar").length) {
		if ($("#foto").val()!=''){
//alert($("#foto").val());
			$("#avatar").attr('src', 'data:image/png;base64,'+$("#foto").val());
		}
	}

	if ( $("#linea").length && $("#enlinea").length){
		if ($("#linea").val()=='1'){
			$("#enlinea").attr('src', '../img/online.png');
		}else{
			$("#enlinea").attr('src', '../img/offline.png');
		}
		
	}

	var params = {
		act: 'getParams',
	}

	$.ajax({
	    async:true,   
	    cache:false, 
	    dataType: 'json',
	    type: 'POST',  
	    url: '../modelo/comun.php',
	    data: params,
	    success:  function(data){
	    	if (data.admin=="0" || data.operador =="0"){
	    		$('#agentes').hide();
	    		$('#departamentos').hide();
	    		$('#seguidores').hide();
	    		$('#facturacion').hide();
	    		$('#cambiar').hide();
	    		$('#siguiendo').hide();
	    	}
	    	if (data.admin=="0" && data.operador =="1"){
	    		$('#agentes').hide();
	    		$('#departamentos').hide();
	    		$('#seguidores').hide();
	    		$('#facturacion').hide();
	    		$('#cambiar').hide();
	    		$('#pagina').hide();
	    	}
	    },
	    beforeSend:function(){},
	    error:function(objXMLHttpRequest){}
    });				

	if (conexion==0){
			$('#inicioi').html('Iniciar Sesión');
			$('#perfil').html('Registrate');
	}else{
			$('#inicioi').html('Inicio');
			$('#perfil').html('Perfil');
	}

	$('#publicar').click(function(){
		$(location).attr('href','../vista/publicar.php');
	});

	$('#inicioi').click(function(){
		if (conexion==0){
			$('#inicio').modal('show');
		}else{
			$(location).attr('href','../vista/index.php');
		}		
	});

	$('#perfil').click(function(){
		if (conexion==0){
			$('#registrarte').modal('show');
		}else{
			$(location).attr('href','../vista/chat.php');
		}		
	});
//Evento de Jquery activado al presionar el boton entrar
	$('#entrar-registro').click(function(){
		var correo = $('#correor').val();//Obtenemos el valor del correo y la clave
		var clave = $('#claver').val();
		//Se realizan las validaciones del login
		if (ue_validarcorreo(correo)==false){
			showAlert('Debe suministrar un correo válido', 'Datos Incompletos', 1);
		}else{
			if (false){
				showAlert('Debe suministrar una clave que contenga 8 dígitos entre letras y números', 'Datos Incompletos', 2);
			//Si no existieron problemas
			}else{
				var params = {
					act: 'getUser',
					correo: correo,
					clave: clave,
				}
				$.ajax({
				    async:true,   
				    cache:false, 
				    dataType: 'json',
				    type: 'POST',  
				    url: '../modelo/comun.php',//Se envia una peticion getuser
				    data: params,// se le envian los parametros
				    success:  function(data){ 
				    	//Todas las sesiones han sido generadas
						if (data.success==true){
							var pagina = $('#pagina').val();//INPUT UBICADO EN INDEX
							var pagina_id = $('#pagina_id').val();//INPUT UBICADO EN FACTRURACION
							if (pagina=='pagina' || pagina == 'publicar' || $('#LOGIH').length ){
                                $('#id_usuario').val(data.id);
                                $('#conexion').val('1');
                                $('#inicioi').html('Inicio');
                                $('#perfil').html('Perfil');  
                                if (pagina=='pagina' || pagina == 'publicar'){
									showAlert('El proceso de logueo se llevó a cabo con éxito... Puede continuar con el proceso de publicación', 'Datos no encontrados', 8);	
                                }else{
                                	if ($('#LOGIH').length){
                                		$('#iddUser').val(data.id);
                                		showAlert('El proceso de logueo se llevó a cabo con éxito...', 'Datos no encontrados', 8);		
                                	}
                                }
							}else{
								if (pagina_id=='facturacion'){
									$(location).attr('href', 'facturacion.php');
									//SI EL INPUT COLOCADO EN EL INDEX NO TIENE COMO VALUE NINGUN VALOR ANTERIOR
								}else{
									params = {
										act: 'getParams',//SE ENVIA UN PARAMETRO getParams
									}
									$.ajax({
										async: true,
										cache: false,
										dataType: 'JSON',
										type: 'POST',
										url: '../modelo/comun.php',
										data: params,
										success: function(data){
											params = {
												//obtenemos los datos del usuario
												idusuario: data.id_usuario,
												enlinea: 1,
											}
											$.ajax({
												//Se actualiza el usuario
												async: true,
												cache: false,
												dataType: 'JSON',
												type: 'POST',
												url: SERVER+'actUser',
												data: params,
												success: function(data){
												},
												beforeSend:function(){},
												error:function(objXMLHttpRequest){}
											});
										},
										beforeSend:function(){},
										error:function(objXMLHttpRequest){}
									});
									//Y luego se envia al chat
									$(location).attr('href','../vista/chat.php');
								}
							}	
						}else{
							if (data.mensaje=='datos_incorrectos'){
								showAlert('Los datos suministrados no coinciden... No puede ingresar', 'Datos no encontrados', 1);	
							}
						}
				    },
				    complete: function(response) 
					 {
					    //alert(response.responseText);
					 },
				    beforeSend:function(){},
				    error:function(objXMLHttpRequest){}
			    });				
			}
		}

	});

	$('#cerrar').click(function(){
		$("#sidebar-int a").each(function (index){ 
			if ($(this).hasClass('active')){
				id_activo = $(this).attr('id');
			}
        	$(this).removeClass('active');
        }); 	
   		$('#cerrar').addClass('active');
		showConfirm('Esta seguro de cerrar la sesión','Cerrar Sessión',0);
	})

	function showConfirm(Message, Title, Donde){
		BootstrapDialog.show({
            message: Message,
            type: BootstrapDialog.TYPE_DANGER,
            title: Title,
            closable: false,
            buttons: [{
                label: 'Aceptar',
                cssClass: 'btn-success',
                action: function(dialogRef){
                    var params = {
						act: 'delSession',//se destruyen las sesiones,
						//Al redirigir al index y no encontrar la sesion
						//conexion pasa a valer 0
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
								$(location).attr('href','../vista/index.php');
							}
					    },
					    beforeSend:function(){},
					    error:function(objXMLHttpRequest){}
				    });				
                }
            },{
                label: 'Cancelar',
                cssClass: 'btn-warning',
                action: function(dialogRef){
                    dialogRef.close();
					$("#sidebar-int a").each(function (index){ 
						if ($(this).attr('id')==id_activo){
							$(this).addClass('active');
						}else{
			        		$(this).removeClass('active');
			        	}
			        }); 	                    
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

 	 $('#image').click(function(){
    	window.open('../vista/fotos.php?cantidad=1&donde=0&seccion=avatar',"popup","menubar=no,toolbar=no,scrollbars=yes,width=645,height=420,left=50,top=50,location=no,resizable=yes");
    });
    $('#avatar').click(function(){
    	window.open('../vista/fotos.php?cantidad=1&donde=0&seccion=avatar',"popup","menubar=no,toolbar=no,scrollbars=yes,width=645,height=420,left=50,top=50,location=no,resizable=yes");
    });

   

    $('#enlinea').click(function(){
    	var src = $(this).attr('src');
    	if (src=='../img/online.png'){
    		$(this).attr('src', '../img/offline.png');
    		var linea = 0;
    	}else{
    		$(this).attr('src', '../img/online.png');
    		var linea = 1;
    	}
    	var params = {
    		idusuario: $('#iddUser').val(),
    		enlinea: linea,
    	}
		$.ajax({
		    async:true,   
		    cache:false, 
		    dataType: 'json',
		    type: 'POST',  
		    url: SERVER+'actUser',
		    data: params,
		    success:  function(data){ 
		    	if (data.success==true){
			    	var params = {
			    		act: 'setLinea',
			    		linea: linea,
			    	}
					$.ajax({
					    async:true,   
					    cache:false, 
					    dataType: 'json',
					    type: 'POST',  
					    url: '../modelo/comun.php',
					    data: params,
					    success:  function(data){ 
					    },
					    beforeSend:function(){},
					    error:function(objXMLHttpRequest){}
				    });	
		    	}
		    },
		    beforeSend:function(){},
		    error:function(objXMLHttpRequest){}
	    });				
    });
});
