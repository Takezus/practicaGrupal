var params = {};
var id_usuario = $('#iddUser').val();
var id_pagina = $('#id_pagina').val();
var id_conexion = $('#id_conexion').val();

$(document).ready(function(){

    if (id_conexion=="0"){
        $('#inicio').modal('show');
    }


	itemAct('facturacion');

	params = {

	}

	var params = {
		idusuario: id_usuario,
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
				$('#nombre').text('Nombre: ' + data.data[0].nombre +' '+data.data[0].apellido);
				$('#email').text('Email: '+data.data[0].email);	
				$('#desde').text('Usuario Loupper desde: '+fecha_get(data.data[0].usuariodesde));				
			}else{
				if (data.mensaje=='datos_incorrectos'){
					showAlert('En estos momentos no podemos procesar su petición...Intente mas tarde', 'Error de comunicación', 0);	
				}
			}
	    },
	    beforeSend:function(){},
	    error:function(objXMLHttpRequest){}
    });				

    var params = {
        idpagina: id_pagina,
    }

    $.ajax({
        async:false,   
        cache:false, 
        dataType: 'json',
        type: 'GET',  
        url: SERVER+'getPlanActual',
        data: params,
        success:  function(data){ 
            if (data.success==true){
            	$('#plan').text(data.data[0].nombreplan);
            	$('#ciclo').text(data.data[0].ciclofact);
            }else{
                if (data.mensaje=='datos_incorrectos'){
                    showAlert('En estos momentos no podemos procesar su petición...Intente mas tarde', 'Error de comunicación', 0); 
                }
            }
        },
        beforeSend:function(){},
        error:function(objXMLHttpRequest){}
    }); 

    var params = {
        idusuario: id_usuario,
    }

    $.ajax({
        async:false,   
        cache:false, 
        dataType: 'json',
        type: 'GET',  
        url: SERVER+'getHistorialPagos',
        data: params,
        success:  function(data){ 
            if (data.success==true){
            	$('#tabla').empty();
            	var div = "";
            	for(i=0;i<data.data.length;i++){
            		div = div + "<tr>"+
            				"<td>"+data.data[i].idfactura+"</td>"+
            				"<td>"+fecha_get(data.data[i].fecha)+"</td>"+
            				"<td>";
            				for(j=0;j<data.data[i].detalles.length;j++){
            					div = div + "<p>"+data.data[i].detalles[j].descripcion + ' $'+data.data[i].detalles[j].monto +"</p>";
            				}
            		div = div + "</td>"+
            				"<td>"+('$ '+data.data[i].cantidad)+"</td>"+
            			  "</tr>";
            	}
            	$('#tabla').append(div);
            }else{
                if (data.mensaje=='datos_incorrectos'){
                    showAlert('En estos momentos no podemos procesar su petición...Intente mas tarde', 'Error de comunicación', 0); 
                }
            }
        },
        beforeSend:function(){},
        error:function(objXMLHttpRequest){}
    }); 

    $.ajaxSetup({ cache: true });
    
    $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
        FB.init({
            appId: '204215923292122',
            version: 'v2.5' // or v2.0, v2.1, v2.2, v2.3
        });     
        
        // FB.getLoginStatus(function(response) {
     //         statusChangeCallback(response);
        // });
    });

    function statusChangeCallback(response){
        if (response.status === 'connected') {
          alert('logueado')
        } else if (response.status === 'not_authorized') {
          alert('Please log into this app.');
        } else {
          alert('Please log into Facebook.');
        }
    }

    $('#ini-face').click(function(){
        $('#donde').val('login');
        FB.getLoginStatus(function(response) {
            loguear(response);
        });
    });

    function loguear(response){         
        if (response.status === 'connected'){
            conectar();
        }else if(response.status === 'not_authorized') {
            alert(11);
          alert('Please log into this app.');
        }else{
            FB.login(function(response){
                if (response.authResponse){
                    conectar();
                }
            }); 
        }
    }

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
                            $(location).attr('href','facturacion.php');
                        }else{
                            if (data.mensaje=='datos_incorrectos'){
                                showAlert('Los datos suministrados no coinciden... No puede ingresar', 'Datos no encontrados', 0);  
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

	$('#pagos').click(function(){
//alert("assad");
		$('#panPagos').modal('show')
	});
});
