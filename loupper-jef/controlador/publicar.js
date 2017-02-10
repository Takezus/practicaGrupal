$(document).ready(function(){

    //$('body').css('background-color', '#f1f1f1');

	var conexion = $('#conexion').val();
	
    

	if (conexion=='1'){
        $('#inicioi').html('Inicio');
        $('#perfil').html('Perfil');
	}

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

  	var params = {
        act: 'getTituloPlan',
    }

    $.ajax({
        async:true,   
        cache:false, 
        dataType: 'json',
        type: 'POST',  
        url: '../modelo/publicar.php',
        data: params,
        success:  function(data){ 
            if (data.success==true){
                $('#titulo').html(data.titulo);
                $('#ntitulo').html(data.tituloresaltado);
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
        act: 'getPlanes',
    }

    $.ajax({
        async:true,   
        cache:false, 
        dataType: 'json',
        type: 'POST',  
        url: '../modelo/publicar.php',
        data: params,
        success:  function(data){ 
            if (data.success==true){
                len = data.data.length;
                var div = $('');
                var donde = 0;
                if (len>0){
                    for(i=0;i<len;i++){
                        var nomplan = data.data[i].nombreplan;
                        var precio = data.data[i].precio; 
                        var id = data.data[i].codigoplan; 
                        if (i==0){
                            div = $("<div class=\"row\" id=\"div_"+i+"\"></div>");
                            $('#planes').append(div);
                            donde = i;
                        }else{
                            if ((i%4)==0){
                                div = $("<div class=\"row\" id=\"div_"+i+"\"></div>");  
                                $('#planes').append(div);
                                donde = i;
                            }
                        }

                        var lenc = data.data[i].caracteristicas.length;
                        var divc = "";
                        var nombre = "";
                        var valor = "";
                        var imagen = "";
                        for(j=0;j<lenc;j++){
                            nombre = data.data[i].caracteristicas[j].nombre;
                            valor = data.data[i].caracteristicas[j].valor;
                            valido = data.data[i].caracteristicas[j].valido;
                            imagen = "";
                            if (valido==true){
                                imagen = "../img/chulo.png";
                            }else{
                                imagen = "../img/equis.png"
                            }
                            nombre = nombre + " " + valor;
                            if (j==0){
                                divc = divc + "<div class=\"text-rr text-12\" style=\"margin-left: 10%;margin-top: 20%;\"><img src=\""+imagen+"\"><span style=\"margin-left: 5%;\">"+nombre+"</span></div>";
                            }else{
                                if (j==lenc-1){
                                    divc = divc + "<div class=\"text-rr text-12\" style=\"margin-left: 10%;margin-top: 4%;margin-bottom: 5%;\"><img src=\""+imagen+"\"><span style=\"margin-left: 5%;\">"+nombre+"</span></div>";
                                }else{
                                    divc = divc + "<div class=\"text-rr text-12\" style=\"margin-left: 10%;margin-top: 4%;\"><img src=\""+imagen+"\"><span style=\"margin-left: 5%;\">"+nombre+"</span></div>";
                                }
                            }
                        }

                        var lenc = data.data[i].paquetes.length;    
                        var divp = "<div class=\"select\">"+
                                        "<select class=\"form-control text-rr text-12\" id=\"paquete_"+id+"\" style=\"width:100%;\">";
                        var mes = "";
                        var paq = ""
                        var opt = "";
                        var tira = "";
                        for(j=0;j<lenc;j++){
                            if (j==0){
                                opt = opt + "<option value=\"0\">Seleccione</option>";
                            }
                            ciclo = data.data[i].paquetes[j].idciclofact;
                            des = data.data[i].paquetes[j].descripcion;
                            paq = des;
                            tira = ciclo+';0';
                            opt = opt + "<option value=\""+tira+"\">"+paq+"</option>";
                        }

                        divp = divp + opt + "</select></div>";


                        div = $("<div class=\"col-sm-6 col-md-3 col-lg-3\">"+
                                    "<div class=\"row borde-plan\" style=\"margin-left: 1%; margin-right: 1%; background-color:#ffffff !important;\">"+
                                        "<div class=\"col-xs-12 degradado\">"+
                                            "<div class=\"text-rbo text-16 text-center\" style=\"margin-top: 5%\">"+nomplan+"</div>"+
                                            "<div class=\"text-rl text-40 text-center\" style=\"margin-bottom: 0px !important;\">$ "+precio+"</div>"+
                                            "<div class=\"text-rm text-14 pull-right\" style=\"margin-right: 20%; margin-top:-20px !important;\">mes</div>"+divc+
                                            "<div>"+divp+
                                            "</div>"+
                                            "<div class=\"text-center\" style=\"margin-top: 5%; margin-bottom: 5%;\"><a href=\"javascript:seleccionar('"+id+"')\"><img src=\"../img/seleccionar.png\" class=\"\"></a></div>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>");
                        $('#div_'+donde).append(div);
                    }
                }
                
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
        act: 'getPreguntas',
    }

    $.ajax({
        async:true,   
        cache:false, 
        dataType: 'json',
        type: 'POST',  
        url: '../modelo/publicar.php',
        data: params,
        success:  function(data){ 
            if (data.success==true){
                len = data.data.length;
                var div = $('');
                var donde = 0;
                if (len>0){
                    for(i=0;i<len;i++){
                        var pregunta = data.data[i].pregunta;
                        var respuesta = data.data[i].respuesta; 
                        if (i==0){
                            div = $("<div class=\"row\" id=\"pdiv_"+i+"\"></div>");
                            $('#preguntas').append(div);
                            donde = i;
                        }else{
                            if ((i%2)==0){
                                div = $("<div class=\"row\" id=\"pdiv_"+i+"\"></div>");  
                                $('#preguntas').append(div);
                                donde = i;
                            }
                        }

                        div = $("<div class=\"col-lg-6\">"+
                                    "<p class=\"text-12 text-rbo\">"+pregunta+"</p>"+
                                    "<p class=\"text-12 text-rr\" style=\"text-align: justify;\">"+respuesta+"</p>"+
                                "</div>");
                        $('#pdiv_'+donde).append(div);
                    }
                }
            }else{
                if (data.mensaje=='datos_incorrectos'){
                    showAlert('En estos momentos no podemos procesar su petición...Intente mas tarde', 'Error de comunicación', 0); 
                }
            }
        },
        beforeSend:function(){},
        error:function(objXMLHttpRequest){}
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
                                                    $('#id_usuario').val(data.id);
                                                    $('#conexion').val('1');
                                                    $('#inicioi').html('Inicio');
                                                    $('#perfil').html('Perfil');                                                    
                                                    // var ref = new Firebase ('https://chatfbexample.firebaseio.com/');
                                                    // ref.onAuth(function(authData) {
                                                    //     if (authData) {
                                                    //       //chat.setUser(authData.uid, "Anonymous" + authData.uid.substr(10, 8));
                                                    //     } else {
                                                    //       ref.authAnonymously(function(error, authData) {

                                                    //         if (error) {
                                                    //           console.log(error);
                                                    //         }
                                                    //       });
                                                    //     }
                                                    // });
                                                    // var refUsuarios = ref.child("users");
                                                    // var refUsuario = refUsuarios.child(nombre+' '+apellido);
                                                    // refUsuario.set({
                                                    //     date_of_birth: fecha,
                                                    //      full_name:nombre+' '+apellido,
                                                    //      user_type:1
                                                    // });
                                                    showAlert('¡El registro se llevó a cabo con éxito! Se le enviara un correo de verificación para activar su cuenta, activela y continue con el proceso de publicacion', 'Bienvenido', 9);
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
                                }
                            }
                        }
                    }
                }
            }
        }
    });


	$('#registrar').click(function(){
		if (conexion==1){
			$(location).attr('href','chat.php');
		}else{
			var url = 'registro.php';
			$(location).attr('href',url);
		}	
	});

	$('#entrar-reg').click(function(){
		$('#iniciar').click();
	});

    $('#reg-fac').click(function(){
        $('#donde').val('registro');
        FB.getLoginStatus(function(response) {
            loguear(response);
        });
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
                                var pagina = $('#pagina').val();
                                if (pagina=='publicar'){
                                    $('#id_usuario').val(data.id);
                                    $('#conexion').val('1');
                                    $('#inicioi').html('Inicio');
                                    $('#perfil').html('Perfil');
                                    showAlert('El registro se llevó a cabo con éxito... Puede continuar con el proceso de publicación','Logueo exitoso',8);
                                }else{
                                    showAlert('El registro se llevó a cabo con éxito...Debe loguearse', 'Bienvenido', 7);
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
                            var pagina = $('#pagina').val();
                            if (pagina=='publicar'){
                                $('#id_usuario').val(data.id);
                                $('#conexion').val('1');
                                $('#inicioi').html('Inicio');
                                $('#perfil').html('Perfil');
                                showAlert('El logueo se llevó acabo con éxito... Puede continuar con el proceso de publicación','Logueo exitoso',8);
                            }else{
                                $(location).attr('href','../vista/chat.php');
                            }    
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
                if (Donde==8){
                    $('#inicio').modal('hide');
                }
                if (Donde==9){
                    $('#registrarte').modal('hide');
                }
            }
        });
    }
    

});

function seleccionar(id){
    if ($('#paquete_'+id).val()==0){
        showAlert2('Debe seleccionar el periodo de contratación', 'Faltan datos',0);
        return
    }
    params = {
        act: 'incFacturaTemp',
        id: id,
        tira: $('#paquete_'+id).val()
    }

    $.ajax({
        async:true,   
        cache:false, 
        dataType: 'json',
        type: 'POST',  
        url: '../modelo/publicar.php',
        data: params,
        success:  function(data){ 
            if (data.success==true){
                var url = '../vista/pagina.php';
                $(location).attr('href',url);
            }else{
                if (data.mensaje=='datos_incorrectos'){
                    showAlert2('En estos momentos no podemos procesar su petición...Intente mas tarde', 'Error de comunicación', 0); 
                }
            }
        },
        beforeSend:function(){},
        error:function(objXMLHttpRequest){}
    });         
}

function showAlert2(Message, Title, Donde){
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
