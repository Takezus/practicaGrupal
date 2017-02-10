$(document).ready(function(){

	var pagina = $('#paginas').val()
	var id = $('#id').val();
	var id_negocio = $('#id_negocio').val();
	
    var operador = new Array();
    localStorage.clear();
    //operador[1] = JSON.parse(localStorage.getItem('Juan perez'));
    itemAct('agentes');

	switch(pagina){
        case 'operadores':

			var params = {
				act: 'getAgentes',
				id_negocio: id_negocio,
			}

			$.ajax({
			    async:true,   
			    cache:false, 
			    dataType: 'json',
			    type: 'POST',  
			    url: '../modelo/agentes.php',
			    data: params,
			    success:  function(data){ 
					if (data.success==true){
						var age = data.total + ' en total | ' + data.totalactivos + ' Operador(es) activado(s)';
						var plan = 'El plan ' + data.codigoplan + ' permite ' + data.maxagentes;
						$('#totAgente').html(age);
						$('#totPlan').html(plan);
                        $('#totales').val(data.total);
						var len = data.data.length;
						var cabezara = '';
						var div = $("");
						if (len>0){
							var cont_colu = 0;
							var i = 0;
							var avatar = '';
							var status = '';
							var nombre = '';
							var relacion = '';
							for(i=0;i<len;i++){
								id = data.data[i].id;
								nombre = data.data[i].nombre;
								correo = data.data[i].correo;
								negocio = data.data[i].negocio;
								operador[i] = {id: id, nombre: nombre, negocio: negocio, correo: correo, foto: data.data[i].foto};
                                localStorage.setItem(nombre,JSON.stringify(operador[i]));

                                if (data.data[i].foto==null){
									foto = '../img/avatar-empty.png';
								}else{
									//cambiar a la a la ruta de amazon
									foto = '../img/avatar-empty.png';
								}
								cont_colu = cont_colu + 1;
								if ((cont_colu==1 && i==0)){
									cabezara = "<div class=\"row border-age margen-age-left\">";
								}else{
									if (cont_colu==2 && i==1){
										cabezara = "<div class=\"row border-age margen-age-right\">";
									}else{
										if (cont_colu==1){
											cabezara = "<div class=\"row border-age margen-age-left separa2\">";
										}else{
											cabezara = "<div class=\"row border-age margen-age-right separa2\">";
										}
									}
								}
								div = $(cabezara+
											"<div class=\"col-sm-2 col-md-2 col-lg-2\" style=\"padding-top: 1.8%;padding-bottom: 1%;\">"+
		                            			"<img src=\""+foto+"\" class=\"pull-right\">"+
		                        			"</div>"+
		                        			"<div class=\"col-sm-5 col-md-5 col-lg-5\" style=\"padding-top: 1%;padding-bottom: 1%;\">"+
		                            			"<p class=\"text-rbo text-12 margen-sup-0\">"+nombre+"</p>"+
		                            			"<p class=\"text-rr text-11\">"+negocio+"</p>"+
		                        			"</div>"+
		                        			"<div class=\"col-sm-5 col-md-5 col-lg-5\">"+
		                            			"<div class=\"row\">"+
		   											"<a href=\"javascript:editar_agente("+id+")\"><img src=\"../img/check2.png\" style=\"margin-top: 4%; margin-left:85%\" id=\"img_"+id+"\" data-valor=\""+id+"\"></a>"+
		                           		 		"</div>"+
		                            			"<div class=\"row\">"+
		                                			"<p class=\"text-rr text-8\"></p>"+
		                                			"<p class=\"text-rr text-8 pull-right\" style=\"margin-right: 8%;\">"+correo+"</p>"+
		                            			"</div>"+                           
		                        			"</div>"+
		                        		"</div>");
								$('#col'+cont_colu).append(div);
								if (cont_colu==2){
									cont_colu = 0;
								}
							}	
						}
					}else{
						if (data.mensaje=='datos_incorrectos'){
							showAlert('En estos momentos no podemos procesar su petición...Intente mas tarde', 'Error de comunicación', 0);	
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
		break;
		case 'crear-ope':
            var params = {
                act: 'getAgentes',
                id_negocio: id_negocio,
            }

            $.ajax({
                async:true,   
                cache:false, 
                dataType: 'json',
                type: 'POST',  
                url: '../modelo/agentes.php',
                data: params,
                success:  function(data){ 
                    if (data.success==true){
                        var age = data.totalactivos + ' de '+data.total+' Operadores usados. ';
                        $('#totAgente').html(age);
                    }else{
                        if (data.mensaje=='datos_incorrectos'){
                            showAlert('En estos momentos no podemos procesar su petición...Intente mas tarde', 'Error de comunicación', 0); 
                        }
                    }
                },
                beforeSend:function(){},
                error:function(objXMLHttpRequest){}
            });
            if (id!='0'){
                $('#textOperador').html('Guardar Operador')
                ajax_start();
                var params = {
                    act: 'getUnOperador',
                    id: id
                }
                $.ajax({
                    async:true,   
                    cache:false, 
                    dataType: 'json',
                    type: 'POST',  
                    url: '../modelo/agentes.php',
                    data: params,
                    success:  function(data){ 
                        if (data.success==true){
                            $('#nombre').attr('value',data.data[0].nombre);
                            $('#apellido').attr('value',data.data[0].apellido);
                            $('#email').attr('value',data.data[0].email);
                            $('#alias').attr('value',data.data[0].nombremostraroper);
                        }else{
                            if (data.mensaje=='datos_incorrectos'){
                                showAlert('En estos momentos no podemos procesar su petición...Intente mas tarde', 'Error de comunicación', 0); 
                            }
                        }
                        ajax_stop();
                    },
                    beforeSend:function(){},
                    error:function(objXMLHttpRequest){}
                });

            }
		break;
	}				

	

	$('#addOperador').click(function(){
        var total = parseInt($('#totales').val());
        var esta = 0;
        $("#col1 img").each(function (index){ 
            src = $(this).attr('src'); // "static/images/banner/blue.jpg"
            tarr = src.split('/');      // ["static","images","banner","blue.jpg"]
            file = tarr[tarr.length-1];
            if (file=='check2_sel.png' || file=='check2.png'){
                esta = esta + 1;   
            }
        });
        $("#col2 img").each(function (index){ 
            src = $(this).attr('src'); // "static/images/banner/blue.jpg"
            tarr = src.split('/');      // ["static","images","banner","blue.jpg"]
            file = tarr[tarr.length-1];
            if (file=='check2_sel.png' || file=='check2.png'){
                esta = esta + 1;   
            }  
        });
        if (esta>=total){
            showAlert('<div style=\'text-align:center;\'><p class=\'text-rbo text-16\'>La cuenta ha llegado a su límite</p><span class=\'text-rr text-12\'>Su cuenta está actualmente limitada a '+total+' departamento(s). <br>Actualice su plan para poder agregar más departamentos.<br> </span><p style=\'margin-top:20px;\'><a href=\'cambiar_plan.php\' class=\'colorR text-rbo text-14 enlace\'>Actualizar Plan</a></p></div>','Datos Completos',0);
            return;
        }

		$(location).attr('href','crear_operador.php');
	});

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

    $("#findOper").enterKey(function () {
        var palabra = $('#findOper').val();
        palabra = palabra.toUpperCase();
        if (palabra.length!=0){
            $('#col1').empty();
            $('#col2').empty();
            pintar(1,palabra);
        }
    });

    $("#findOper").keyup(function () {
        var palabra = $('#findOper').val();
        palabra = palabra.toUpperCase();
        if (palabra.length==0){
            $('#col1').html('');
            $('#col2').html('');
            pintar(0,'');
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

        $('#agentes').addClass('active');
	}

	$('#crearOperador').click(function(){
        var nombre = $('#nombre').val();
        var apellido = $('#apellido').val();
        var alias = $('#alias').val();
        var email = $('#email').val();
        if (validar_ob(nombre)==false){
            showAlert('Faltan campos por rellenar.', 'Datos incompletos',5);
        }else{
            if (validar_ob(apellido)==false){
                showAlert('Faltan campos por rellenar.', 'Datos incompletos',6);
            }else{
                if (validar_ob(alias)==false){
                    showAlert('Faltan campos por rellenar.', 'Datos incompletos',7);
                }else{
                    if (ue_validarcorreo(email)==false){
                        showAlert('Debe suministrar un correo valido', 'Datos incompletos',8);
                    }else{
                        ajax_start();
                        var params = {
                            idnegocio: $('#id_negocio').val(), 
                            idoperador: $('#id').val(),                            
                            nombre: nombre,
                            apellido: apellido,
                            nombremostrar: alias,
                            email: email,
                        }
                        var url = SERVER+'incOperador';
                        if (id!='0'){
                            url = SERVER+'actOperador';
                        }
                        $.ajax({
                            async:true,   
                            cache:false, 
                            dataType: 'json',
                            type: 'POST',  
                            url: url,
                            data: params,
                            success:  function(data){ 
                                if (data.success==true){
                                    var opera = 'Operador creado con éxito. Se le ha enviado un email al Operador correspondiente.';
                                    if (id!='0'){
                                        opera = 'Operador editado correctamente.';
                                    }
                                    showAlert(opera, 'Loupper', 9); 
                                }else{
                                    if (data.mensaje=='datos_incompletos' || data.mensaje=='no se realizó la operacion'){
                                        showAlert('En estos momentos no podemos procesar su petición...Intente más tarde', 'Error de comunicación', 0); 
                                    }
                                    if (data.mensaje=='correorepetido'){
                                        showAlert('El correo suministrado ya se encuentra registrado… No se pudo guardar', 'Error de comunicación', 0); 
                                    }
                                }
                                ajax_stop();
                            },
                            beforeSend:function(){},
                            error:function(objXMLHttpRequest){}
                        });
                    }
                }
            }
        }

    });

    $('#editOperador').click(function(){
    	var esta = 0;

    	$("#col1 img").each(function (index){ 
       		src = $(this).attr('src'); // "static/images/banner/blue.jpg"
			tarr = src.split('/');      // ["static","images","banner","blue.jpg"]
			file = tarr[tarr.length-1]; // "blue.jpg"
			if (file=='check2_sel.png'){ 
				esta = $(this).attr('data-valor');
			}	
        });
    	$("#col2 img").each(function (index){ 
       		src = $(this).attr('src'); // "static/images/banner/blue.jpg"
			tarr = src.split('/');      // ["static","images","banner","blue.jpg"]
			file = tarr[tarr.length-1]; // "blue.jpg"
			if (file=='check2_sel.png'){ 
				esta = $(this).attr('data-valor');
			}	
        });

        if (esta==0){
        	showAlert('Debe seleccionar un operador para editarlo', 'Datos incompletos',0);
        }else{
        	$(location).attr('href','../vista/crear_operador.php?operador='+esta);
        }
    });

    $('#cancelarCO').click(function(){
    	$(location).attr('href','../vista/agentes.php');
    });

    $('#eliminarOpe').click(function(){
    	var esta = 0;

    	$("#col1 img").each(function (index){ 
       		src = $(this).attr('src'); // "static/images/banner/blue.jpg"
			tarr = src.split('/');      // ["static","images","banner","blue.jpg"]
			file = tarr[tarr.length-1]; // "blue.jpg"
			if (file=='check2_sel.png'){ 
				esta = $(this).attr('data-valor');
			}	
        });
    	$("#col2 img").each(function (index){ 
       		src = $(this).attr('src'); // "static/images/banner/blue.jpg"
			tarr = src.split('/');      // ["static","images","banner","blue.jpg"]
			file = tarr[tarr.length-1]; // "blue.jpg"
			if (file=='check2_sel.png'){ 
				esta = $(this).attr('data-valor');
			}	
        });

        if (esta==0){
        	showAlert('Debe seleccionar un operador para eliminarlo', 'Datos incompletos',0);
        }else{
        	$('#cual').val(esta);
        	showConfirm('¿Esta seguro que desea eliminar el Operador seleccionado?', 'Eliminar Operador',1);
        }
    });

    function pintar(como,palabra){
        switch (como){
            case 0:
                $('#col1').empty();
                $('#col1').empty();
                var cont_colu = 0;
                for(var i=0; i<localStorage.length;i++){
                    var clave = localStorage.key(i);
                    operador[i] = JSON.parse(localStorage.getItem(clave));
                    id = operador[i].id;
                    nombre = operador[i].nombre;
                    correo = operador[i].correo;
                    negocio = operador[i].negocio;
                    fotoa = operador[i].foto;
                    if (fotoa==null){
                        foto = '../img/avatar-empty.png';
                    }else{
                        //cambiar a la a la ruta de amazon
                        foto = '../img/avatar-empty.png';
                    }
                    cont_colu = cont_colu + 1;
                    if ((cont_colu==1 && i==0)){
                        cabezara = "<div class=\"row border-age margen-age-left\">";
                    }else{
                        if (cont_colu==2 && i==1){
                            cabezara = "<div class=\"row border-age margen-age-right\">";
                        }else{
                            if (cont_colu==1){
                                cabezara = "<div class=\"row border-age margen-age-left separa2\">";
                            }else{
                                cabezara = "<div class=\"row border-age margen-age-right separa2\">";
                            }
                        }
                    }
                    div = $(cabezara+
                                "<div class=\"col-sm-2 col-md-2 col-lg-2\" style=\"padding-top: 1.8%;padding-bottom: 1%;\">"+
                                    "<img src=\""+foto+"\" class=\"pull-right\">"+
                                "</div>"+
                                "<div class=\"col-sm-5 col-md-5 col-lg-5\" style=\"padding-top: 1%;padding-bottom: 1%;\">"+
                                    "<p class=\"text-rbo text-12 margen-sup-0\">"+nombre+"</p>"+
                                    "<p class=\"text-rr text-10\">"+negocio+"</p>"+
                                "</div>"+
                                "<div class=\"col-sm-5 col-md-5 col-lg-5\">"+
                                    "<div class=\"row\">"+
                                        "<a href=\"javascript:editar_agente("+id+")\"><img src=\"../img/check2.png\" style=\"margin-top: 4%; margin-left:85%\" id=\"img_"+id+"\" data-valor=\""+id+"\"></a>"+
                                    "</div>"+
                                    "<div class=\"row\">"+
                                        "<p class=\"text-rr text-8\"></p>"+
                                        "<p class=\"text-rr text-8 pull-right\" style=\"margin-right: 8%;\">"+correo+"</p>"+
                                    "</div>"+                           
                                "</div>"+
                            "</div>");
                    $('#col'+cont_colu).append(div);
                    if (cont_colu==2){
                        cont_colu = 0;
                    }

                }
            break;
            case 1:
                var cont_colu = 0;
                for(var i=0; i<localStorage.length;i++){
                    var busqueda = "" + localStorage.key(i);
                    busqueda = busqueda.toUpperCase();
                    if (busqueda.indexOf(palabra, 0)>=0){
                        var clave = localStorage.key(i);
                        operador[i] = JSON.parse(localStorage.getItem(clave));
                        id = operador[i].id;
                        nombre = operador[i].nombre;
                        correo = operador[i].correo;
                        negocio = operador[i].negocio;
                        fotoa = operador[i].foto;
                        if (fotoa==null){
                            foto = '../img/avatar-empty.png';
                        }else{
                            //cambiar a la a la ruta de amazon
                            foto = '../img/avatar-empty.png';
                        }
                        cont_colu = cont_colu + 1;
                        if ((cont_colu==1 && i==0)){
                            cabezara = "<div class=\"row border-age margen-age-left\">";
                        }else{
                            if (cont_colu==2 && i==1){
                                cabezara = "<div class=\"row border-age margen-age-right\">";
                            }else{
                                if (cont_colu==1){
                                    cabezara = "<div class=\"row border-age margen-age-left separa2\">";
                                }else{
                                    cabezara = "<div class=\"row border-age margen-age-right separa2\">";
                                }
                            }
                        }
                        div = $(cabezara+
                                    "<div class=\"col-sm-2 col-md-2 col-lg-2\" style=\"padding-top: 1.8%;padding-bottom: 1%;\">"+
                                        "<img src=\""+foto+"\" class=\"pull-right\">"+
                                    "</div>"+
                                    "<div class=\"col-sm-5 col-md-5 col-lg-5\" style=\"padding-top: 1%;padding-bottom: 1%;\">"+
                                        "<p class=\"text-rbo text-12 margen-sup-0\">"+nombre+"</p>"+
                                        "<p class=\"text-rr text-10\">"+negocio+"</p>"+
                                    "</div>"+
                                    "<div class=\"col-sm-5 col-md-5 col-lg-5\">"+
                                        "<div class=\"row\">"+
                                            "<a href=\"javascript:editar_agente("+id+")\"><img src=\"../img/check2.png\" style=\"margin-top: 4%; margin-left:85%\" id=\"img_"+id+"\" data-valor=\""+id+"\"></a>"+
                                        "</div>"+
                                        "<div class=\"row\">"+
                                            "<p class=\"text-rr text-8\"></p>"+
                                            "<p class=\"text-rr text-8 pull-right\" style=\"margin-right: 8%;\">"+correo+"</p>"+
                                        "</div>"+                           
                                    "</div>"+
                                "</div>");
                        $('#col'+cont_colu).append(div);
                        if (cont_colu==2){
                            cont_colu = 0;
                        }
                    }
                }
            break;
        }
    }

});

	function editar_agente(id){
		src = $('#img_'+id).attr('src'); // "static/images/banner/blue.jpg"
		tarr = src.split('/');      // ["static","images","banner","blue.jpg"]
		file = tarr[tarr.length-1]; // "blue.jpg"
		if (file=='check2.png'){
			$('#img_'+id).attr('src', '../img/check2_sel.png');
			ajustar(id);
		}else{
			$('#img_'+id).attr('src', '../img/check2.png');
		}
	}

	function ajustar(id){
		$("#col1 img").each(function (index){ 
       		src = $(this).attr('src'); // "static/images/banner/blue.jpg"
			tarr = src.split('/');      // ["static","images","banner","blue.jpg"]
			file = tarr[tarr.length-1]; // "blue.jpg"
			if (file=='check2_sel.png' && $(this).attr('id')!= ("img_"+id)){ 
				$(this).attr('src', '../img/check2.png');
			}	
        });
		$("#col2 img").each(function (index){ 
       		src = $(this).attr('src'); // "static/images/banner/blue.jpg"
			tarr = src.split('/');      // ["static","images","banner","blue.jpg"]
			file = tarr[tarr.length-1]; // "blue.jpg"
			if (file=='check2_sel.png' && $(this).attr('id')!= ("img_"+id)){ 
				$(this).attr('src', '../img/check2.png');
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
                    $(location).attr('href','../vista/index.php');
                }
                if (Donde==2){
                    $('#usuario').focus();
                }
                if (Donde==3){
                    $('#clave').focus();
                }
                if (Donde==4){
                    $(location).attr('href','../vista/chat.php');
                }
                if (Donde==5){
                    $('#nombre').focus();
                }
                if (Donde==6){
                    $('#apellido').focus();
                }
                if (Donde==7){
                    $('#alias').focus();
                }
                if (Donde==8){
                    $('#email').focus();
                }
                if (Donde==9){
                    $(location).attr('href','../vista/agentes.php');
                }
                if (Donde==10){
                    var cual = $('#cual').val();
                     $(location).attr('href','../vista/agentes.php');                    
                }
                if (Donde==11){
                    $('#fecha').focus();
                }
            }
        });
    }

    function ajax_start(){        
        $body = $("body");
        $body.addClass("loading");
    }

    function ajax_stop(){
        $body = $("body");
         $body.removeClass("loading");
    }

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
                    switch(Donde){
                        case 1:
                            dialogRef.close();
                            ajax_start();
                            var params = {
                                act: 'elimOperador',
                                id: $('#cual').val(),
                            }
                            $.ajax({
                                async:true,   
                                cache:false, 
                                dataType: 'json',
                                type: 'POST',  
                                url: '../modelo/agentes.php',
                                data: params,
                                success:  function(data){ 
                                    if (data.success==true){
                                    	$('#cual').val('')
                                        showAlert('El operador se elimino con éxito', 'Operación Exitosa', 10); 

                                    }else{
                                        if (data.mensaje=='datos_incompletos' || data.mensaje=='no se realizó la operacion'){
                                            showAlert('En estos momentos no podemos procesar su petición...Intente mas tarde', 'Error de comunicación', 0); 
                                        }
                                        if (data.mensaje=='correorepetido",'){
                                            showAlert('El correo suministrado ya se encuentra registrado… No se pudo guardar', 'Error de comunicación', 0); 
                                        }
                                    }
                                    ajax_stop();
                                },
                                beforeSend:function(){},
                                error:function(objXMLHttpRequest){}
                            });
                        break; 
                    }   
                }
            },{
                label: 'Cancelar',
                cssClass: 'btn-warning',
                action: function(dialogRef){
                    dialogRef.close();
                }
            }],
            onhidden: function(dialogRef){
                              
            }
        });
    }
