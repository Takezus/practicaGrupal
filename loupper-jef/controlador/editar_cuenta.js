$(document).ready(function(){

	itemAct('editar');

	$('#fecnac').datetimepicker({
		yearOffset:1,
		lang:'es',
		timepicker:false,
		format:'d/m/Y',
		formatDate:'Y/m/d',
		minDate:'-1970/01/02', // yesterday is minimum date
		maxDate:'+1970/01/02' // and tommorow is maximum date calendar
	});

	var params = {
		idusuario: $('#id_usuario').val(),
	}

	$.ajax({
	    async:true,   
	    cache:false, 
	    dataType: 'json',
	    type: 'GET',  
	    url: SERVER+'getUserId',
	    data: params,
	    success:  function(data){ 
			if (data.success==true){
				$('#nombre').val(data.data[0].nombre);
				$('#apellido').val(data.data[0].apellido);
				$('#fecnac').val(fecha_get(data.data[0].fecnac));
				var genero = "" + data.data[0].genero;
				genero = genero.toUpperCase();
				$('#genero').val(genero);
				$('#email').val(data.data[0].email);				
			}else{
				if (data.mensaje=='datos_incorrectos'){
					showAlert('En estos momentos no podemos procesar su petición...Intente mas tarde', 'Error de comunicación', 0);	
				}
			}
	    },
	    beforeSend:function(){},
	    error:function(objXMLHttpRequest){}
    });				

	$('#actualizar_cuenta').click(function(){
		var nombre = $('#nombre').val();
		var apellido = $('#apellido').val();
		var fecnac = $('#fecnac').val();
		var genero = $('#genero').val();
		var email = $('#email').val();		
		var clave1 = $('#clave').val();		
		var clave2 = $('#clave2').val();		
		if (validar_ob(nombre)==false){
			showAlert('Debe suministrar un nombre', 'Datos incompletos', 1);
		}else{
			if (validar_ob(apellido)==false){
				showAlert('Debe suministrar un apellido', 'Datos incompletos', 2);
			}else{
				if (validar_fecha(fecnac)==false){
					showAlert('Debe suministrar una fecha de nacimiento válida', 'Datos incompletos', 3);
				}else{
					if (ue_validarcorreo(email)==false){
						showAlert('Debe suministrar un correo electrónico válido', 'Datos incompletos', 4);
					}else{
						if ((validar_ob(clave1)==false || validar_ob(clave2)==false) && clave1!=clave2){
							showAlert('Las claves no coinciden ó no esta bien formulada...Debe contener numeros y letras y no menor a 8 digitos', 'Datos incompletos', 5);
						}else{
							if (clave1==''){
								var params = {
									idusuario: $('#id_usuario').val(),
									email: email,
									fecnac: fecha_pos(fecnac),
									genero: genero,
									nombre: nombre,
									apellido: apellido
								}
							}else{
									var params = {
										idusuario: $('#id_usuario').val(),
										email: email,
										clave: $.md5(clave1),
										clave2: clave1,
										fecnac: fecha_pos(fecnac),
										genero: genero,
										nombre: nombre,
										apellido: apellido
									}									
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
										var datos = nombre + ' ' + apellido;
										$('#nombreusuario').text(datos);
										params = {
											act: 'setParams3',
											name: datos
										}

										$.ajax({
										    async:true,   
										    cache:false, 
										    dataType: 'json',
										    type: 'POST',  
										    url: '../modelo/comun.php',
										    data: params,
										    success:  function(data){ 
										    }
										});
										showAlert('La cuenta fue modificada con éxito', 'Transacción Exitosa', 0);
									}else{
										if (data.mensaje=='datos_incorrectos'){
											showAlert('En estos momentos no podemos procesar su petición...Intente mas tarde', 'Error de comunicación', 0);	
										}
									}
							    },
							    beforeSend:function(){},
							    error:function(objXMLHttpRequest){}
						    });				

						}
					}
				}
			}
		}
	});

 	$('#verPass').click(function(){
 		if ($('#clave').attr('type')=='password'){
            $('#clave').attr('type','text');
            $('#clave2').attr('type','text');
 		}else{
 			$('#clave').attr('type','password');
 			$('#clave2').attr('type','password');
 		}
 	});

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

	function itemAct(pantalla){
		$("#sidebar-int a").each(function (index){ 
        	$(this).removeClass('active');
        }); 	

        $('#sidebar-int a').each(function(index){
        	if ($(this).attr("id")==pantalla){
        		$(this).addClass('active');
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
                    switch(Donde){
                    	case 1:
                    		$('#nombre').focus();
                    	break;
                    	case 2:
                    		$('#apellido').focus();
                    	break;
                    	case 3:
                    		$('#fecnac').focus();
                    	break;
                    	case 4:
                    		$('#email').focus();
                    	break;
                    }
                }
            }],
            onhidden: function(dialogRef){
            }
        });
    }

});