$(document).ready(function(){
	 
	$('#crear').click(function(){
		var clave1 = $('#clave1').val();
	 	var clave2 = $('#clave2').val();
	 	if (validar_uc(clave1)==false){
	 		showAlert('Debe introducir una clave de 8 digitos que contenga numero y letras','Datos Incompletos',1);
	 	}else{
	 		if (clave1!=clave2){
	 			showAlert('Las claves no coinciden','Datos Incompletos',0);
	 		}else{
	 			var params = {
	 				idoperador : $('#idoperador').val(),
	 				clave: $.md5(clave1),
	 			}

	 			$.ajax({
			        async:true,   
			        cache:false, 
			        dataType: 'json',
			        type: 'POST',  
			        url: SERVER+'actOperador',
			        data: params,
			        success:  function(data){ 
			            if (data.success==true){
			                showAlert('Su clave ha sido configurada con éxito. Ahora puede iniciar sesión', 'Clave actualizada',2);
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
	});
});

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
				if (Donde=='1'){
                    	$('#clave1').focus();
            	}   
				if (Donde=='2'){
                    	$(location).attr('href','../vista/index.php');
            	}   
        	}
        });
    }