$(document).ready(function(){

    var operador = new Array();
    var aux_operador = new Array(0);
    localStorage.clear();

	itemAct('siguiendo');

	var params = {
		act: 'getSiguiendo',
	}

	$.ajax({
	    async:true,   
	    cache:false, 
	    dataType: 'json',
	    type: 'POST',  
	    url: '../modelo/siguiendo.php',
	    data: params,
	    success:  function(data){ 
			if (data.success==true){
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
						id = data.data[i].relacion;
						idpag = data.data[i].idpagina;
						nombre = data.data[i].nombre;
						if (data.data[i].logo==null){
							foto = '../img/avatar-empty.png';
						}else{
							//cambiar a la a la ruta de amazon
							foto = 'data:image/png;base64,'+data.data[i].logo;
						}
						operador[i] = {id: id, nombre: nombre, foto: data.data[i].logo, idpag: idpag};
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
									"<div class=\"col-sm-2 col-md-2 col-lg-2 ajuste-ava-seguidores\">"+
                          				"<a href=\"veraccion.php?id="+idpag+"\"><div class=\"div-avatar-seguidores\"><img src=\""+foto+"\" class=\"img-circle\" style=\"width: 48px; height: 48px;\"></div></a>"+
                         				"<div class=\"div-status-seguidores\"><img src=\"../img/online2.png\"></div>"+
                        			"</div>"+
                        			"<div class=\"col-sm-5 col-md-5 col-lg-5 ajustes-nombre-seguidores\">"+
                            			"<a href=\"veraccion.php?id="+idpag+"\"><p class=\"text-rbo text-12 margen-sup-0\">"+nombre+"</p></a>"+
                        			"</div>"+
                        			"<div class=\"col-sm-5 col-md-5 col-lg-5 ajustes-accion-seguidores\">"+
                        				"<a href=\"javascript:cambio_rel("+id+")\"><img src=\"../img/seguidos-2.png\" id=\"img_"+id+"\"></a>"+
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
                    fotoa = operador[i].foto;
						if (fotoa==null){
							foto = '../img/avatar-empty.png';
						}else{
							//cambiar a la a la ruta de amazon
							foto = 'data:image/png;base64,'+fotoa;
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
									"<div class=\"col-sm-2 col-md-2 col-lg-2 ajuste-ava-seguidores\">"+
                          				"<a href=\"veraccion.php?id="+idpag+"\"><div class=\"div-avatar-seguidores\"><img src=\""+foto+"\" class=\"img-circle\" style=\"width: 48px; height: 48px;\"></div></a>"+
                         				"<div class=\"div-status-seguidores\"><img src=\"../img/online2.png\"></div>"+
                        			"</div>"+
                        			"<div class=\"col-sm-7 col-md-7 col-lg-8 ajustes-nombre-seguidores\">"+
                            			"<a href=\"veraccion.php?id="+idpag+"\"><p class=\"text-rbo text-12 margen-sup-0\">"+nombre+"</p></a>"+
                        			"</div>"+
                        			"<div class=\"col-sm-3 col-md-3 col-lg-2 ajustes-accion-seguidores\">"+
                        				"<a href=\"javascript:cambio_rel("+id+")\"><img src=\"../img/seguidos.png\" id=\"img_"+id+"\"></a>"+
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
                        aux_operador[0] = JSON.parse(localStorage.getItem(clave));
                        id = aux_operador[0].id;
                        nombre = aux_operador[0].nombre;
                        fotoa = aux_operador[0].foto;
                        apag = aux_operador[0].idpag;
						if (fotoa==null){
							foto = '../img/avatar-empty.png';
						}else{
							//cambiar a la a la ruta de amazon
							foto = 'data:image/png;base64,'+fotoa;
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
									"<div class=\"col-sm-2 col-md-2 col-lg-2 ajuste-ava-seguidores\">"+
                          				"<a href=\"veraccion.php?id="+idpag+"\"><div class=\"div-avatar-seguidores\"><img src=\""+foto+"\" class=\"img-circle\" style=\"width: 48px; height: 48px;\"></div></a>"+
                         				"<div class=\"div-status-seguidores\"><img src=\"../img/online2.png\"></div>"+
                        			"</div>"+
                        			"<div class=\"col-sm-7 col-md-7 col-lg-8 ajustes-nombre-seguidores\">"+
                            			"<a href=\"veraccion.php?id="+idpag+"\"><p class=\"text-rbo text-12 margen-sup-0\">"+nombre+"</p></a>"+
                        			"</div>"+
                        			"<div class=\"col-sm-3 col-md-3 col-lg-2 ajustes-accion-seguidores\">"+
                        				"<a href=\"javascript:cambio_rel("+id+")\"><img src=\"../img/seguidos.png\" id=\"img_"+id+"\"></a>"+
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

function cambio_rel(id){
	src = $('#img_'+id).attr('src'); // "static/images/banner/blue.jpg"
	tarr = src.split('/');      // ["static","images","banner","blue.jpg"]
	file = tarr[tarr.length-1]; // "blue.jpg"
	if (file=='seguidos.png'){
		$('#img_'+id).attr('src','../img/seguir.png')
	}else{
		$('#img_'+id).attr('src','../img/seguidos.png')
	}
}