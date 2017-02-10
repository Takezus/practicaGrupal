$(function(){

	$("#enviar").click(function(){

	var params={
	email:$("#correo").val(),
	}

//$("#value").text(params.email);



	$.ajax({
        // la URL para la petición
        url : SERVER+'recuperarClave',
    
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data :params,
    
        // especifica si será una petición POST o GET
        type : 'POST',
    
        // el tipo de información que se espera de respuesta
        dataType : 'json',
    
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success : function(data) {
          if (data.success==true) {
          	alert("exito");
          }else{
          	alert("El correo suministrado no existe");
          	}
        
     
    	},
    
        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto jqXHR (extensión de XMLHttpRequest), un texto con el estatus
        // de la petición y un texto con la descripción del error que haya dado el servidor
        error : function(jqXHR, status, error) {
            alert('Disculpe, existió un problema');
            console.log(status);
            console.log(error);
        },
    
        // código a ejecutar sin importar si la petición falló o no
        
    		});
		});
	
	});