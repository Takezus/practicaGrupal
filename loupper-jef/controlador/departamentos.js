$(document).ready(function(){

	itemAct('departamentos');
	localStorage.clear();

	var pagina = $('#paginas').val()
	var id = $('#id').val();
	var id_negocio = $('#id_negocio').val();
	
	var operador = new Array();
    localStorage.clear();
	
	switch (pagina){
		case 'departamentos':
			var params = {
				act: 'getDepartamentos',
				id_negocio: $('#id_negocio').val(),
			}

			$.ajax({
			    async:true,   
			    cache:false, 
			    dataType: 'json',
			    type: 'POST',  
			    url: '../modelo/departamentos.php',
			    data: params,
			    success:  function(data){ 
					if (data.success==true){
						var age = data.total + ' en total | ' + data.totalactivos + ' Departamentos activado(s)';
						var plan = 'El plan ' + data.codigoplan + ' permite ' + data.maxdepartamentos;
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
								descripcion = data.data[i].descripcion;
								cantagentes = data.data[i].cantagentes;
								operador[i] = {id: id, nombre: nombre, descripcion: descripcion, cantagentes: cantagentes};
                                localStorage.setItem(nombre,JSON.stringify(operador[i]));
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
											"<div class=\"col-sm-7 col-md-7 col-lg-7\" style=\"padding-top: 1%;padding-bottom: 1%;\">"+
		                           	 			"<p class=\"text-rbo text-12 margen-sup-0\">"+nombre+"</p>"+
		                            			"<p class=\"text-rr text-8\">"+descripcion+"</p>"+
		                        			"</div>"+
		                        			"<div class=\"col-sm-5 col-md-5 col-lg-5\">"+
		                            			"<div class=\"row\">"+
		                                			"<a href=\"javascript:editar_departamento("+id+")\"><img src=\"../img/check2.png\" style=\"margin-top: 4%; margin-left:85%\" id=\"img_"+id+"\" data-valor=\""+id+"\"></a>"+
		                            			"</div>"+
		                            			"<div class=\"row\">"+
		                                			"<p class=\"text-rr text-8\"></p>"+
		                                			"<p class=\"text-rr text-9 pull-right\" style=\"margin-right: 8%;\">operador"+ 
		                                			"<span class=\"badge badge3 text-rr text-7\">"+cantagentes+"</span></p>"+
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
			    beforeSend:function(){},
			    error:function(objXMLHttpRequest){}
		    });	
		break;
		case 'crear-dep':
			var params = {
				act: 'getDepartamentos',
				id_negocio: $('#id_negocio').val(),
			}

			$.ajax({
			    async:true,   
			    cache:false, 
			    dataType: 'json',
			    type: 'POST',  
			    url: '../modelo/departamentos.php',
			    data: params,
			    success:  function(data){ 
					if (data.success==true){
						var age = data.maxdepartamentos + ' Departamentos permitidos.';
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
			if (id=='0'){
				var params = {
					act: 'getAgentes',
					id_negocio: $('#id_negocio').val(),
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
							div = "";
							for(i=0;i<data.data.length;i++){
								// localStorage[data.data[i].id] = data.data[i].nombre;	
								if (i==0){
	                    			div = "<a class=\"btn btn-default color-white btn-agente text-rr text-12\" role=\"button\" style=\"margin-top:2px;\" id=\"boton_"+data.data[i].id+"\" data-valor=\""+data.data[i].id+"\" data-string=\""+data.data[i].nombre+"\" onClick=\"javascript:agregar_agente("+data.data[i].id+");\">+ "+data.data[i].nombre+"</a>";
	              					$('#agentesAdd').append(div);
	                    			num = $('#agentesAdd').height();                    			
	                    		}else{
	                    			div = "<a class=\"btn btn-default color-white btn-agente text-rr text-12\" role=\"button\" style=\"margin-left: 10px; margin-top:2px;\" id=\"boton_"+data.data[i].id+"\" data-valor=\""+data.data[i].id+"\" data-string=\""+data.data[i].nombre+"\" onClick=\"javascript:agregar_agente("+data.data[i].id+");\">+ "+data.data[i].nombre+"</a>";
	                    			$('#agentesAdd').append(div);
	                    			num2 = $('#agentesAdd').height();
	                    			if (num!=num2){
	                    				$('#boton_'+i).css('margin-left', '0px');
	                    				num = num2;
	                    			}
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
			}

            if (id!='0'){
                $('#textOperador').html('Guardar Departamento')
                ajax_start();
                var params = {
                    act: 'getUnDepar',
                    id: id
                }
                $.ajax({
                    async:true,   
                    cache:false, 
                    dataType: 'json',
                    type: 'POST',  
                    url: '../modelo/departamentos.php',
                    data: params,
                    success:  function(data){ 
                        if (data.success==true){
                            $('#nombre').attr('value',data.data[0].nombre);
                            $('#descripcion').val(data.data[0].descripcion);
                            for(i=0;i<data.data[0].operadores.length;i++){
                            	var datos = data.data[0].operadores[i].nombre + ' ' + data.data[0].operadores[i].apellido;
                            	var id = data.data[0].operadores[i].id;
								if (i==0){
                                    div = "<a class=\"btn btn-default color-white btn-agente text-rr text-10\" role=\"button\" style=\"margin-top:2px;\" id=\"botond_"+id+"\" data-valor=\""+id+"\" data-string=\""+datos+"\" onClick=\"javascript:eliminar_agente("+id+");\">- "+datos+"</a>";
                                    $('#agentesDel').append(div);
                                    num = $('#agentesDel').height();                                
	                    		}else{
                                    div = "<a class=\"btn btn-default color-white btn-agente text-rr text-10\" role=\"button\" style=\"margin-top:2px;margin-left:10px;\" id=\"botond_"+id+"\" data-valor=\""+id+"\" data-string=\""+datos+"\" onClick=\"javascript:eliminar_agente("+id+");\">- "+datos+"</a>";
                                    $('#agentesDel').append(div);
	                    			num2 = $('#agentesDel').height();
	                    			if (num!=num2){
	                    				$('#botond_'+id).css('margin-left', '0px');
	                    				num = num2;
	                    			}
	                    		}                  		
                            }
                            $('#cantAge').html(data.data[0].operadores.length + ' agentes añadidos.')
							var params = {
								act: 'getAgentes',
								id_negocio: $('#id_negocio').val(),
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
										div = "";
										for(i=0;i<data.data.length;i++){
											
											var tiene = 0;
									        $("#agentesDel a").each(function (index){ 
									        	var valor = $(this).data('valor');
									        	if (data.data[i].id == valor){
									        		tiene = 1;
									        	}									        	
									        });											

											if (tiene==0){
												
												if ($('#agentesAdd a').length==0){
					                    			div = "<a class=\"btn btn-default color-white btn-agente text-rr text-12\" role=\"button\" style=\"margin-top:2px;\" id=\"boton_"+data.data[i].id+"\" data-valor=\""+data.data[i].id+"\" data-string=\""+data.data[i].nombre+"\" onClick=\"javascript:agregar_agente("+data.data[i].id+");\">+ "+data.data[i].nombre+"</a>";
					              					$('#agentesAdd').append(div);
					                    			num = $('#agentesAdd').height();                    			
					                    		}else{
					                    			div = "<a class=\"btn btn-default color-white btn-agente text-rr text-12\" role=\"button\" style=\"margin-left: 10px; margin-top:2px;\" id=\"boton_"+data.data[i].id+"\" data-valor=\""+data.data[i].id+"\" data-string=\""+data.data[i].nombre+"\" onClick=\"javascript:agregar_agente("+data.data[i].id+");\">+ "+data.data[i].nombre+"</a>";
					                    			$('#agentesAdd').append(div);
					                    			num2 = $('#agentesAdd').height();
					                    			if (num!=num2){
					                    				$('#boton_'+i).css('margin-left', '0px');
					                    				num = num2;
					                    			}
					                    		}
					                    	}                    		
										}
										$('#num').val($('#agentesAdd').height());
									}else{
										if (data.mensaje=='datos_incorrectos'){
											showAlert('En estos momentos no podemos procesar su petición...Intente mas tarde', 'Error de comunicación', 0);	
										}
									}
							    },
							    beforeSend:function(){},
							    error:function(objXMLHttpRequest){}
						    });	

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


	$('#crearOperador').click(function(){
        var nombre = $('#nombre').val();
        var descripcion = $('#descripcion').val();
        var tiene = '';
        $("#agentesDel a").each(function (index){ 
        	if (tiene==''){
        		tiene = $(this).data('valor');
        	}else{
        		tiene = tiene + ',' + $(this).data('valor');
        	}
        	
        });
        if (validar_ob(nombre)==false){
            showAlert('Faltan campos por rellenar.', 'Datos incompletos',5);
        }else{
            if (validar_ob(descripcion)==false){
                showAlert('Faltan campos por rellenar.', 'Datos incompletos',2);
            }else{
                if (tiene==''){
                    showAlert('Faltan campos por rellenar.', 'Datos incompletos',0);
                }else{
                    if (true==false){
                        showAlert('Debe suministrar un correo valido', 'Datos incompletos',8);
                    }else{
                        ajax_start();
                        var params = {
                            idnegocio: $('#id_negocio').val(), 
                            idepartamento: $('#id').val(),                            
                            nombre: nombre,
                            descripcion: descripcion,
                            operadores: tiene,
                        }
                        var url = SERVER+'incDepar';
                        if (id!='0'){
                            url = SERVER+'actDepar';
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
                                    var opera = 'Departamento creado con éxito.';
                                    if (id!='0'){
                                        opera = 'Departamento editado correctamente.';
                                    }
                                    showAlert(opera, 'Operacion exitosa', 9); 
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
        	showAlert('Debe seleccionar un departamento para editarlo', 'Datos incompletos',0);
        }else{
        	$(location).attr('href','../vista/crear_departamento.php?operador='+esta);
        }
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
        	showAlert('Debe seleccionar un departamento para eliminarlo', 'Datos incompletos',0);
        }else{
        	$('#cual').val(esta);
        	showConfirm('¿Esta seguro que desea eliminar el Departamento seleccionado?', 'Eliminar Operador',1);
        }
    });

	$('#cancelarCO').click(function(){
    	$(location).attr('href','../vista/departamentos.php');
    });

	$('#addDepartamento').click(function(){
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
            showAlert('Ya alcanzo el maximo permitido de departamentos','Datos Completos',0);
            return;
        }
		$(location).attr('href','crear_departamento.php');
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
					descripcion = operador[i].descripcion;
					cantagentes = operador[i].cantagentes;
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
								"<div class=\"col-sm-7 col-md-7 col-lg-7\" style=\"padding-top: 1%;padding-bottom: 1%;\">"+
                       	 			"<p class=\"text-rbo text-12 margen-sup-0\">"+nombre+"</p>"+
                        			"<p class=\"text-rr text-8\">"+descripcion+"</p>"+
                    			"</div>"+
                    			"<div class=\"col-sm-5 col-md-5 col-lg-5\">"+
                        			"<div class=\"row\">"+
                            			"<a href=\"javascript:editar_departamento("+id+")\"><img src=\"../img/check2.png\" style=\"margin-top: 4%; margin-left:85%\" id=\"img_"+id+"\" data-valor=\""+id+"\"></a>"+
                        			"</div>"+
                        			"<div class=\"row\">"+
                            			"<p class=\"text-rr text-8\"></p>"+
                            			"<p class=\"text-rr text-8 pull-right\" style=\"margin-right: 8%;\">agentes"+ 
                            			"<span class=\"badge badge3 text-rr text-7\">"+cantagentes+"</span></p>"+
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
						descripcion = operador[i].descripcion;
						cantagentes = operador[i].cantagentes;
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
									"<div class=\"col-sm-7 col-md-7 col-lg-7\" style=\"padding-top: 1%;padding-bottom: 1%;\">"+
	                       	 			"<p class=\"text-rbo text-12 margen-sup-0\">"+nombre+"</p>"+
	                        			"<p class=\"text-rr text-8\">"+descripcion+"</p>"+
	                    			"</div>"+
	                    			"<div class=\"col-sm-5 col-md-5 col-lg-5\">"+
	                        			"<div class=\"row\">"+
	                            			"<a href=\"javascript:editar_departamento("+id+")\"><img src=\"../img/check2.png\" style=\"margin-top: 4%; margin-left:85%\" id=\"img_"+id+"\" data-valor=\""+id+"\"></a>"+
	                        			"</div>"+
	                        			"<div class=\"row\">"+
	                            			"<p class=\"text-rr text-8\"></p>"+
	                            			"<p class=\"text-rr text-8 pull-right\" style=\"margin-right: 8%;\">agentes"+ 
	                            			"<span class=\"badge badge3 text-rr text-7\">"+cantagentes+"</span></p>"+
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

	function editar_departamento(id){
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
        });	}


        function agregar_agente(id){
        	var i = $("#agentesDel a").length;
        	var div = "";
        	var num = 0;
        	var num2 = 0;
        	var nombre = $('#boton_'+id).data('string');
        	if (i==0){
        		$('#boton_'+id).remove();
    			div = "<a class=\"btn btn-default color-white btn-agente text-rr text-12\" role=\"button\" style=\"margin-top:2px;\" id=\"botond_"+id+"\" data-valor=\""+id+"\" data-string=\""+nombre+"\" onClick=\"javascript:eliminar_agente("+id+");\">- "+nombre+"</a>";
					$('#agentesDel').append(div);
    			num = $('#agentesDel').height();  
    			$('#num').val(num);
    		}else{
    			$('#boton_'+id).remove();
    			div = "<a class=\"btn btn-default color-white btn-agente text-rr text-12\" role=\"button\" style=\"margin-left: 10px; margin-top:2px;\" id=\"botond_"+id+"\" data-valor=\""+id+"\" data-string=\""+nombre+"\" onClick=\"javascript:eliminar_agente("+id+");\">- "+nombre+"</a>";
    			$('#agentesDel').append(div);
    			num2 = $('#agentesDel').height();
    			num = parseInt($('#num').val());
    			if (num!=num2){
    				$('#botond_'+id).css('margin-left', '0px');
    				$('#num').val(num2);
    			}
    		} 
			var i = $("#agentesDel a").length;
        	$('#cantAge').html(i+' agentes añadidos');
        }

        function eliminar_agente(id){
        	var i = $("#agentesAdd a").length;
        	var div = "";
        	var num = 0;
        	var num2 = 0;
        	var nombre = $('#botond_'+id).data('string');
        	if (i==0){
        		$('#botond_'+id).remove();
    			div = "<a class=\"btn btn-default color-white btn-agente text-rr text-12\" role=\"button\" style=\"margin-top:2px;\" id=\"boton_"+id+"\" data-valor=\""+id+"\" data-string=\""+nombre+"\" onClick=\"javascript:agregar_agente("+id+");\">+ "+nombre+"</a>";
					$('#agentesAdd').append(div);
    			num = $('#agentesAdd').height();  
    			$('#num').val(num);
    		}else{
    			$('#botond_'+id).remove();
    			div = "<a class=\"btn btn-default color-white btn-agente text-rr text-12\" role=\"button\" style=\"margin-left: 10px; margin-top:2px;\" id=\"boton_"+id+"\" data-valor=\""+id+"\" data-string=\""+nombre+"\" onClick=\"javascript:agregar_agente("+id+");\">+ "+nombre+"</a>";
    			$('#agentesAdd').append(div);
    			num2 = $('#agentesAdd').height();
    			num = parseInt($('#num').val());
    			if (num!=num2){
    				$('#boton_'+id).css('margin-left', '0px');
    				$('#num').val(num2);
    			}
    		} 
			var i = $("#agentesDel a").length;
			if (i==0){
				$('#cantAge').html('No hay agentes por el momento');
			}else{
        		$('#cantAge').html(i+' agentes añadidos');        	
        	}
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
                    $('#descripcion').focus();
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
                    $(location).attr('href','../vista/departamentos.php');
                }
                if (Donde==10){
                    var cual = $('#cual').val();
                     $(location).attr('href','../vista/departamentos.php');                    
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
                                act: 'elimDepar',
                                id: $('#cual').val(),
                            }
                            $.ajax({
                                async:true,   
                                cache:false, 
                                dataType: 'json',
                                type: 'POST',  
                                url: '../modelo/departamentos.php',
                                data: params,
                                success:  function(data){ 
                                    if (data.success==true){
                                    	$('#cual').val('')
                                        showAlert('El departamento se elimino con éxito', 'Operación Exitosa', 10); 

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
