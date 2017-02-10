    var lat = null;
    var lng = null;
    var map = null;
    var geocoder = null;
    var marker =null;
    var arrEvents = new Array();
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");

$(document).ready(function(){
    var params = {};

	var conexion = $('#conexion').val();

    // $(".single-image").fancybox({
    //             openEffect : 'elastic',   //'fade', 'elastic'
    //             closeEffect : 'elastic',
    //             openSpeed:'normal', //ms, slow, normal, fast (default 250ms)
    //             closeSpeed:'normal',
    //             helpers : {
    //                 title : {
    //                     type : 'inside' //'float', 'inside', 'outside' or 'over'
    //                 },
    //                 overlay : {
    //                     closeClick : true  // if true, se cierra al hacer click fuera de la imagen
    //                 }
    //             },
    //             padding:11

    // });
	if (conexion==1){
            ajax_start();

		$('#iniciar').html('Inicio');
	 	$('#registrar').html('Perfil');
        params = {
            idpagina: $('#pagina').val(),
            idusuario: $('#id_usuario').val(),
        }
        $.ajax({
            async:false,
            cache:false,
            dataType: 'json',
            type: 'GET',
            url: 'http://loupper.com/loupper/loupperapis/checkSeguir',
            data: params,
            success:  function(data){
                if (data.success==true){
                    $('#seguir').attr('src', '../img/dejar.png');
                    $('#relacion').val(data.idrelacion);
                }else{
                    $('#seguir').attr('src', '../img/seguir2.png');
                    $('#relacion').val(0);
                }
            },
            beforeSend:function(){},
            error: function(objXMLHttpRequest){}
        });
	}




    params = {
        act: 'getPagina',
        pagina: $('#pagina').val()
    }

    var iddP = $('#pagina').val();

    $.ajax({
        async:false,
        cache:false,
        dataType: 'json',
        type: 'POST',
        url: '../modelo/actividad.php',
        data: params,
        success:  function(data){
            if (data.success==true){
                if (data.data[0].portada==null){
                    $('#portada').removeClass('portada')
                    $('#portada').addClass('noportada');
                }else{
                    $('#nombre').addClass('colorwhite sombra');
                    $('#online').addClass('colorwhite sombra');
                    $('#subcategoria').addClass('colorwhite sombra');
                    $('#valoracion').addClass('colorwhite sombra');
                    $('#linea4').addClass('colorwhite sombra');
                    $('#numloupper').addClass('colorwhite sombra');
                    $('#seguidores').addClass('colorwhite sombra');
                    $('#letras').addClass('colorwhite sombra');

                    $('#portada').removeClass('noportada')
                    $('#portada').addClass('portada');
                    $('#portada').css('background-image','url(data:image/png;base64,'+data.data[0].portada+')');
                }
                $('#rutalogo').val(data.data[0].rutalogo);
                var namepag = data.data[0].nombre;
                $('#descr').val(data.data[0].subcategoria);
                $('#nompagina').val(data.data[0].nombre);
                $('#nomPag').val(data.data[0].nombre);
                $('#nombre').html(data.data[0].nombre+"<span class=\"text-rb text-8\" style=\"color: #7eb51f; margin-left:1%;\">Online</span>");
                $('#subcategoria').html(data.data[0].subcategoria);
                //alert(data.data[0].nombreusuario);
                $('#nombreusuario').val(data.data[0].nombreusuario);
                $('#tira').html('> '+data.data[0].categoria+' > '+data.data[0].subcategoria+' > '+data.data[0].nombre);
                if (data.data[0].numloupper==null){
                    var numloupper = '';
                }else{
                    var numloupper = data.data[0].numloupper;
                }
                var div = data.data[0].ciudad+" <img src=\"../img/loupper.png\" style=\"margin-left: 1%;\"><span class=\"text-rr text-10\" style=\"margin-left: 0.5%;\">"+numloupper+"</span><span class=\"text-rb text-10\" style=\"margin-left: 3%;\">"+data.data[0].cantseguidores+"</span><span class=\"text-rr text-10\" style=\"margin-left: 1%;\">SEGUIDORES</span><span style=\"margin-left: 5%;\">"+
                                    "<a href=\"javascript:shareF();\">"+
                                        "<img src=\"../img/compartir.png\">"+
                                    "</a>"+
                                    "</span>";
                $('#linea4').html(div);
                $('#logo').attr('src','data:image/png;base64,'+data.data[0].logo);
                if (data.data[0].puntaje==null){
                    $('#puntaje').html('0');
                    div = "<img src=\"../img/estrellap.png\" style=\"margin-left: 1%;\"><img src=\"../img/estrellap.png\" style=\"margin-left: 0.5%;\"><img src=\"../img/estrellap.png\" style=\"margin-left: 0.5%;\"><img src=\"../img/estrellap.png\" style=\"margin-left: 0.5%;\"><img src=\"../img/estrellap.png\" style=\"margin-left: 0.5%;\">";
                    $('#estrellas').html(div);
                }else{
                    $('#puntaje').html(data.data[0].puntaje);
                    var num = Math.round(parseFloat(data.data[0].puntaje));
                    div = "";
                    for(i=1;i<=num;i++){
                        if (i==1){
                            div = "<img src=\"../img/estrellap_sel.png\" style=\"margin-left: 1%;\">";
                        }else{
                            div = div + "<img src=\"../img/estrellap_sel.png\" style=\"margin-left: 0.5%;\">";
                        }
                    }
                    for(i=1;i<=5-num;i++){
                        div = div + "<img src=\"../img/estrellap.png\" style=\"margin-left: 0.5%;\">";
                    }
                    $('#estrellas').html(div);
                }
                $('#valoracion').html(data.data[0].cantvaloraciones+' Valoraciones de los usuarios');
                $('#div_act').val(data.data[0].actividad);
                var pagg = "http://"+data.data[0].sitioweb;
                 var mapurl='http://maps.google.com/maps/api/staticmap?center='+data.data[0].latitud+','+data.data[0].longitud+'&zoom=16&size=800x400&sensor=false&markers='+data.data[0].latitud+','+data.data[0].longitud;
                var div = "<div class=\"col-lg-12\" style=\"padding-top: 3%; padding-left: 3%;padding-right: 3%;\">"+
                        "<p><span class=\"text-rr text-12\">Sitio Web:</span> <span class=\"text-rbo text-12\"><a href=\""+pagg+"\" target=\"_blank\">"+data.data[0].sitioweb+"</a></span></p>"+
                        "<p><span class=\"text-rr text-12\">Teléfono:</span> <span class=\"text-rbo text-12\">"+data.data[0].telefono+"</span></p>"+
                        "<p><span class=\"text-rr text-12\">Correo Electrónico:</span> <span class=\"text-rbo text-12\">"+data.data[0].email+"</span></p>"+
                        "<p style=\"margin-top: 2%;\"><span class=\"text-rr text-12\">Provincia:</span> <span class=\"text-rbo text-12\">"+data.data[0].provincia+"</span></p>"+
                        "<p><span class=\"text-rr text-12\">Ciudad:</span> <span class=\"text-rbo text-12\">"+data.data[0].ciudad+"</span></p>"+
                        "<p><span class=\"text-rr text-12\">Dirección:</span> <span class=\"text-rbo text-12\">"+data.data[0].direccion+"</span></p>"+
                        "<p><div style=\"width: 600px;height: 400px;\" id=\"map_canvas\" class=\"center-block\"></div></p>"+
                        "<p style=\"margin-top: 2%;\"><span class=\"text-rbo text-12\">Horario</span></p>";


                var arrhor = "";
                for(h=0;h<data.data[0].horarios.length;h++){
                    arrhor = arrhor + "<p><span class=\"text-rr text-12\">"+data.data[0].horarios[h].dias+" de "+ data.data[0].horarios[h].horainicio +" a " + data.data[0].horarios[h].horafin + "</span></p>";
                }
                div = div + arrhor +  "</div>";
                $('#div_con').val(div);
                $('#div_lat').val(data.data[0].latitud);
                $('#div_lon').val(data.data[0].longitud);

                auxdiv = $('#div_act').val();
                var div = "<div class=\"col-lg-12\" style=\"padding-top: 3%; padding-left: 3%;padding-right: 3%;\">"+
                                "<p class=\"text-rbo text-12\">Actividad</p>"+
                                "<p class=\"text-rr text-2\" style=\"text-align: justify;\">"+auxdiv+"</p>"+
                            "</div>";
                 $('#div_act').val(div);
                informacion();

            }else{
                if (data.mensaje=='datos_incorrectos'){
                    showAlert('En estos momentos no podemos procesar su petición...Intente mas tarde', 'Error de comunicación', 0);
                }
            }
        },
        beforeSend:function(){},
        error:function(objXMLHttpRequest){}
    });


    function informacion(){
        var div = "<div class=\"col-md-3 col-lg-3\" style=\"height: 800px;\">"+
                        "<div class=\"row\" style=\"background-color: #e9eaec;\" id=\"color-act\">"+
                            "<a href=\"javascript:actividades();\" style=\"color:black;text-decoration: none;color:#434142;\" class\"anone\"><div class=\"text-rm text-12 tab-padding2\" style=\"margin-left: 15%;\" id=\"actividad\">Actividad</div></a>"+
                        "</div>"+
                        "<div class=\"row\" id=\"color-con\">"+
                            "<a href=\"javascript:contacto();\" style=\"color:black;text-decoration: none;color:#434142;\" class\"anone\"><div class=\"text-rm text-12 tab-padding2\" style=\"margin-left: 15%;\" id=\"contacto\" >Datos de Contacto</div></a>"+
                        "</div>"+
                  "</div>"+
                  "<div class=\"col-md-9 col-lg-9\" style=\"height: 800px;\" id=\"caja_int\">"+
        $('#caja').empty();
        $('#caja').append(div);
        $('#caja_int').css('border-left', '1px solid #ebebeb');
        $('#color-inf').css('background-color', '#ffffff');
        $('#color-act').css('background-color', '#e9eaec');
        $('#opinion').css('background-color', '#e9eaec');
        $('#fotos').css('background-color', '#e9eaec');
        $('#eventos').css('background-color', '#e9eaec');
        $('#color-con').css('background-color', '#ffffff');
        $('#caja_int').empty();
        $('#caja_int').append($('#div_act').val());
    }

    function eventos(){
        ajax_start();
        var div = "<div class=\"col-md-3 col-lg-3\" style=\"height: 800px;overflow-y: scroll;\">";
        var params = {
            idpagina: $('#pagina').val()
        }
        $.ajax({
            async: false,
            cache: false,
            dataType: 'JSON',
            type: 'GET',
            url: SERVER+'getEventos',
            data: params,
            success: function(data){
                if (data.success==true){
                    for(i=0;i<data.data.length;i++){
                        var id = data.data[i].idevento;
                        var nombre = data.data[i].nombre;
                        var descripcion = data.data[i].descripcion;
                        var url = data.data[i].url;
                        var foto = 'data:image/png;base64,'+data.data[i].foto;
                        var fechainicio = fecha_get(data.data[i].fechainicio);
                        var fechainicio2 = data.data[i].fechainicio;
                        var horainicio = data.data[i].horainicio;
                        var fechafin = fecha_get(data.data[i].fechafin);
                        var fechafin2 = data.data[i].fechafin;
                        var horafin = data.data[i].horafin;
                        var lugar = data.data[i].lugar;
                        var rango = fechainicio;
                        var rutalogo = data.data[i].rutaevento;
                        arrEvents[i] = {
                            id: id,
                            nombre: nombre,
                            descripcion: descripcion,
                            url: url,
                            foto: foto,
                            fechainicio: fechainicio,
                            fechainicio2: fechainicio2,
                            horainicio: horainicio,
                            fechafin: fechafin,
                            fechafin2: fechafin2,
                            horafin: horafin,
                            lugar: lugar,
                            rutalogo: rutalogo,
                        }
                        if (i==0){
                            div = div + "<div class=\"row dive\" style=\"padding-top:10px;padding-bottom:10px;\"  id=\"dive_"+i+"\">";

                        }else{
                            div = div + "<div class=\"row dive\" style=\"padding-top:10px;padding-bottom:10px;\"  id=\"dive_"+i+"\">";
                        }
                        div = div + "<div style=\"display: inline-block;margin-left:40px;\">"+
                                            "<img class=\"puntero\" src=\""+foto+"\" style=\"height:82px; width:82px;\" onClick=\"javascript:showEvent("+i+");\">"+
                                         "</div>"+
                                        "<div class=\"media-middle puntero\" style=\"display: inline-block;margin-left: 10px;\">"+
                                            "<p class=\"text-rr text-12 puntero\" onClick=\"showEvent("+i+");\">"+nombre+"</p>"+
                                            "<p class=\"text-rr text-10 puntero\" style=\"margin-bottom: 0px;\" onClick=\"showEvent("+i+");\">"+rango+"</p>"+
                                            "<p class=\"text-rr text-10 puntero\" onClick=\"showEvent("+i+");\">"+lugar+"</p>"+
                                        "</div>"+
                                    "</div>";
                    }
                }
                ajax_stop();
            },
            beforeSend:function(){},
            error:function(objXMLHttpRequest){}
        });
        div = div + "</div>"+
                    "<div class=\"col-md-9 col-lg-9\" style=\"height: 800px;\" id=\"caja_int\"></div>"+
        $('#caja').empty();
        $('#caja').append(div);
        $('#caja_int').css('border-left', '1px solid #ebebeb');
        $('#opinion').css('background-color', '#e9eaec');
        $('#fotos').css('background-color', '#e9eaec');
        $('#color-con').css('background-color', '#e9eaec');
        $('#eventos').css('background-color', '#ffffff');
    }

    params = {
        act: 'getPagRelacionadas',
        pagina: $('#pagina').val()
    }

     $.ajax({
        async:true,
        cache:false,
        dataType: 'json',
        type: 'POST',
        url: '../modelo/actividad.php',
        data: params,
        success:  function(data){
            if (data.success==true){
                var num = 5
                if (data.data.length<5){
                    num = data.data.length;
                }
                var div = "";
                for(i=0;i<num;i++){
                    var id = data.data[i].id;
                    var nombre = data.data[i].nombre;
                    var img = "data:image/png;base64,"+data.data[i].rutarchivo;
                    if (i==0){
                        div = "<a href=\"javascript:verPagina("+id+")\"><img src=\""+img+"\" class=\"img-neg\"></a>";
                    }else{
                        div = div + "<a href=\"javascript:verPagina("+id+")\"><img src=\""+img+"\"  class=\"img-neg\"style=\"margin-left: 2%;\"></a>"
                    }
                }
                $('#negocios').append(div);
                ajax_stop();
            }else{
                if (data.mensaje=='datos_incorrectos'){
                    showAlert('En estos momentos no podemos procesar su petición...Intente mas tarde', 'Error de comunicación', 0);
                }
            }
        },
        beforeSend:function(){},
        error:function(objXMLHttpRequest){}
    });

    $('#seguir').click(function(){
        conexion = $('#conexion').val();
        if (conexion==0){
            showAlert('Debes iniciar sesión para poder Seguir esta Página', 'Datos Incompletos', 1);
            return;
        }
        var relacion = $('#relacion').val();
        var estado = $('#conexion').val();
        var ht='';
        var mt = '';
        if (relacion==0 && estado=='1'){
            params = {
                idusuario: $('#id_usuario').val(),
                idpagina: $('#pagina').val(),
            }
            ht = SERVER+'incRelacion';
            mt = 'POST';
        }else{
            params = {
                idrelacion: relacion,
            }
            ht = SERVER+'elimRelacion';
            mt = 'GET';
        }
        $.ajax({
            async:true,
            cache:false,
            dataType: 'json',
            type: mt,
            url: ht,
            data: params,
            success:  function(data){
                if (data.success==true){
                    if (relacion==0){
                        $('#seguir').attr('src', '../img/dejar.png');
                        $('#relacion').val(data.idrelacion);
                        showAlert(data.mensaje, 'Operacion Exitosa', 0);
                    }else{
                        $('#seguir').attr('src', '../img/seguir2.png');
                        showAlert(data.mensaje, 'Operacion Exitosa', 0);
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

    });


    $('#infor').click(function(){
        informacion();
    });

    $('#eventos').click(function(){
        eventos();
    });

    $('#fotos').click(function(){
        ajax_start();
        $('#color-inf').css('background-color', '#e9eaec');
        $('#color-act').css('background-color', '#e9eaec');
        $('#opinion').css('background-color', '#e9eaec');
        $('#eventos').css('background-color', '#e9eaec');
        $('#fotos').css('background-color', '#ffffff');
        $('#color-con').css('background-color', '#e9eaec');
        $('#caja').empty();

        params = {
            act: 'getImagenes',
            pagina: $('#pagina').val()
        }

         $.ajax({
            async:true,
            cache:false,
            dataType: 'json',
            type: 'POST',
            url: '../modelo/actividad.php',
            data: params,
            success:  function(data){
                if (data.success==true){
                    var div = "";
                    var toti = data.data.length-1;
                    for(i=0;i<data.data.length;i++){
                        var id = data.data[i].id;


                        //var img = data.data[i].rutarchivo;
                var img = "data:image/png;base64,"+data.data[i].rutarchivo;
                        if (i==0){
                            div = "<div class=\"col-md-12 col-lg-12 text-center\" style=\"padding-top: 5%;padding-bottom:5%;\">"+
                                "<a class=\"gallery-image\" rel=\"gallery\" href=\""+img+"\"><img src=\""+img+"\" class=\"foto-pag\" id=\"imgp_"+i+"\"></a>";
                        }else{
                            if ((i%5)==0){
                                if (i==toti){
                                    div = div + "<a class=\"gallery-image\" rel=\"gallery\" href=\""+img+"\"><img src=\""+img+"\"  class=\"foto-pag\" style=\"margin-left: 2%;\"></a></div>";
                                }else{
                                    div = div + "<a class=\"gallery-image\" rel=\"gallery\" href=\""+img+"\"><img src=\""+img+"\"  class=\"foto-pag\" style=\"margin-left: 2%;\"></a></div>"+
                                            "<div class=\"col-md-12 col-lg-12 text-center\" style=\"padding-top: 5%;\">";
                                }
                            }else{
                                // if (((i - 1)%5)==0){
                                //     div = div + "<div class=\"col-md-12 col-lg-12 text-center\" style=\"padding-top: 5%;\">"+
                                //     "<a class=\"single-image\" href=\""+img+"\"><img src=\""+img+"\" class=\"foto-pag\"></a>";
                                // }else{
                                    div = div + "<a class=\"gallery-image\" rel=\"gallery\" href=\""+img+"\"><img src=\""+img+"\"  class=\"foto-pag\" style=\"margin-left: 2%;\"></a>";
                                //}
                            }
                        }
                    }
                    div = div + "</div>";

                    $('#caja').append(div);
                    $('#div_img').val(div);
                    ajax_stop();
                }else{
                    if (data.mensaje=='datos_incorrectos'){
                        showAlert('En estos momentos no podemos procesar su petición...Intente mas tarde', 'Error de comunicación', 0);
                    }
                }
            },
            beforeSend:function(){},
            error:function(objXMLHttpRequest){}
        });




    });


    $('#opinion').click(function(){
        $('#color-inf').css('background-color', '#e9eaec');
        $('#color-act').css('background-color', '#e9eaec');
        $('#eventos').css('background-color', '#e9eaec');
        $('#opinion').css('background-color', '#ffffff');
        $('#fotos').css('background-color', '#e9eaec');
        $('#color-con').css('background-color', '#e9eaec');
        $('#color-con').hide('slow');
        $('#color-act').hide('slow');
        var params = {
            idpagina: $('#pagina').val()
        }
        $.ajax({
            async:true,
            cache:false,
            dataType: 'json',
            type: 'GET',
            url: SERVER+'getOpiniones',
            data: params,
            success:  function(data){
                $('#caja').empty();
                if (data.success==true){
                    len = data.data.length;
                    if (len==0){
                        if (conexion=='1'){
                            var div = "<div class=\"col-md-12 col-lg-12 text-center\" style=\"padding-top: 3%; padding-left: 3%;padding-right: 3%;\">"+
                                        "<div class=\"row\" style=\"text-align: left !important;\">"+
                                            "<p><span class=\"badge text-rb text-8\" style=\"-moz-border-radius: 0px;-webkit-border-radius: 0px;border-radius: 0px; padding-top: 2px;padding-bottom: 2px;padding-left: 4px;padding-right: 4px;\">0</span>"+
                                            "<span id=\"estrellas\"><img src=\"../img/estrellap.png\" style=\"margin-left: 1%;\"><img src=\"../img/estrellap.png\" style=\"margin-left: 0.5%;\"><img src=\"../img/estrellap.png\" style=\"margin-left: 0.5%;\">"+
                                            "<img src=\"../img/estrellap.png\" style=\"margin-left: 0.5%;\"><img src=\"../img/estrellap.png\" style=\"margin-left: 0.5%;\"></span><span class=\"text-rr text-10\" style=\"margin-left: 1%;\">Basado en 0 comentarios</span>"+
                                            "<span class=\"badge text-rb text-10 pull-right puntero\" style=\"-moz-border-radius: 0px;-webkit-border-radius: 0px;border-radius: 0px; padding-top: 8px;padding-bottom: 8px;padding-left: 8px;padding-right: 8px;\" onClick=\"javascript:addOpinion();\">Dí a los demás qué te parece</span></p>"+
                                        "</div>"+
                                        "<div id=\"div_opiniones\"></div>"+
                                      "</div>";
                        }else{
                            var div = "<div class=\"col-md-12 col-lg-12 text-center\" style=\"padding-top: 3%; padding-left: 3%;padding-right: 3%;\">"+
                                        "<div class=\"row\" style=\"text-align: left !important;\">"+
                                            "<p><span class=\"badge text-rb text-8\" style=\"-moz-border-radius: 0px;-webkit-border-radius: 0px;border-radius: 0px; padding-top: 2px;padding-bottom: 2px;padding-left: 4px;padding-right: 4px;\">0</span>"+
                                            "<span id=\"estrellas\"><img src=\"../img/estrellap.png\" style=\"margin-left: 1%;\"><img src=\"../img/estrellap.png\" style=\"margin-left: 0.5%;\"><img src=\"../img/estrellap.png\" style=\"margin-left: 0.5%;\">"+
                                            "<img src=\"../img/estrellap.png\" style=\"margin-left: 0.5%;\"><img src=\"../img/estrellap.png\" style=\"margin-left: 0.5%;\"></span><span class=\"text-rr text-10\" style=\"margin-left: 1%;\">Basado en 0 comentarios</span>"+
                                            "</p>"+
                                        "</div>"+
                                        "<div id=\"div_opiniones\"></div>"+
                                      "</div>";
                        }
                        $('#caja').append(div);
                    }else{
                        var numPuntos = parseInt(data.promediopuntaje);
                        var div = "<div class=\"col-md-12 col-lg-12 text-center\" style=\"padding-top: 3%; padding-left: 3%;padding-right: 3%;\">"+
                                    "<div class=\"row\" style=\"text-align: left !important;\">"+
                                        "<p><span class=\"badge text-rb text-8\" style=\"-moz-border-radius: 0px;-webkit-border-radius: 0px;border-radius: 0px; padding-top: 2px;padding-bottom: 2px;padding-left: 4px;padding-right: 4px;\">"+data.promediopuntaje+"</span>"+
                                        "<span id=\"estrellas\">";
                        for(i=1;i<6;i++){
                            if (i<=numPuntos){
                                if (i==1){
                                    div = div + "<img src=\"../img/estrellap_sel.png\" style=\"margin-left: 1%;\">";
                                }else{
                                    div = div + "<img src=\"../img/estrellap_sel.png\" style=\"margin-left: 0.5%;\">";
                                }
                            }else{
                                if (i==1){
                                    div = div + "<img src=\"../img/estrellap.png\" style=\"margin-left: 1%;\">";
                                }else{
                                    div = div + "<img src=\"../img/estrellap.png\" style=\"margin-left: 0.5%;\">";
                                }
                            }
                        }
                        if (conexion=='1'){
                            div = div + "</span><span class=\"text-rr text-10\" style=\"margin-left: 1%;\">Basado en "+data.cantpiniones+" comentarios</span>"+
                                            "<span class=\"badge text-rb text-10 pull-right puntero\" style=\"-moz-border-radius: 0px;-webkit-border-radius: 0px;border-radius: 0px; padding-top: 8px;padding-bottom: 8px;padding-left: 8px;padding-right: 8px;\" onClick=\"javascript:addOpinion();\">Dí a los demás qué te parece</span></p>"+
                                        "</div>"+
                                        "<div id=\"div_opiniones\"></div>"+
                                      "</div>";
                        }else{
                            div = div + "</span><span class=\"text-rr text-10\" style=\"margin-left: 1%;\">Basado en "+data.cantpiniones+" comentarios</span>"+
                                            "</p>"+
                                        "</div>"+
                                        "<div id=\"div_opiniones\"></div>"+
                                      "</div>";
                        }
                        $('#caja').append(div);
                        div = "";
                        var datos = "";
                        var puntos = 0;
                        var opi = "";
                        for(i=0;i<data.data.length;i++){
                            idu = data.data[i].usuario;
                            datos = data.data[i].nombre + ' ' + data.data[i].apellido;
                            puntos = parseInt(data.data[i].puntaje);
                            opi = data.data[i].texto;
                            div = div + "<div class=\"row idu\" style=\"margin-top: 15px;padding-bottom:10px;text-align: left !important;\" data-usuario=\""+idu+"\">"+
                                            "<p class=\"text-rb text-14\"><span>"+datos+"</span><span class=\"pull-right text-rr text-12\">"+data.data[i].fecharegistro+"</span></p>"+
                                            "<p>";
                            if (puntos==0){
                                div = div + "<img src=\"../img/estrellap.png\" style=\"margin-left: 0.5%;\"><img src=\"../img/estrellap.png\" style=\"margin-left: 0.5%;\"><img src=\"../img/estrellap.png\" style=\"margin-left: 0.5%;\">";
                            }else{
                                for(j=1;j<6;j++){
                                    if (j<=puntos){
                                        if (j==1){
                                            div = div + "<img src=\"../img/estrellap_sel.png\">";
                                        }else{
                                            div = div + "<img src=\"../img/estrellap_sel.png\" style=\"margin-left: 0.5%;\">";
                                        }
                                    }else{
                                        div = div + "<img src=\"../img/estrellap.png\" style=\"margin-left: 0.5%;\">";
                                    }
                                }
                            }
                            if (i==(data.data.length-1)){
                                div = div + "</p>"+
                                            "<p class=\"text-rr text-2\" style=\"text-align: justify;padding-bottom: 20px;\">"+opi+"</p>"+
                                            "</div>";
                            }else{
                                div = div + "</p>"+
                                            "<p class=\"text-rr text-2\" style=\"text-align: justify;\">"+opi+"</p>"+
                                            "</div>"+
                                            "<div class=\"row text-center\" style=\"margin-top: 20px;\">"+
                                                "<div class=\"col-md-12 col-lg-12\">"+
                                                    "<img src=\"../img/barra-div.png\" style=\"width: 100%; height: 3px;\">"+
                                                "</div>"+
                                            "</div>";
                            }
                        }
                        $('#div_opiniones').append(div);
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
    });




	$.ajaxSetup({ cache: true });

  	$.getScript('//connect.facebook.net/en_US/sdk.js', function(){
    	FB.init({
      		appId: '204215923292122',
      		version: 'v2.5' // or v2.0, v2.1, v2.2, v2.3
    	});
  	});

 //  	// var params = {
 //   //      act: 'getTituloPlan',
 //   //  }

 //   //  $.ajax({
 //   //      async:true,
 //   //      cache:false,
 //   //      dataType: 'json',
 //   //      type: 'POST',
 //   //      url: '../modelo/publicar.php',
 //   //      data: params,
 //   //      success:  function(data){
 //   //          if (data.success==true){
 //   //              $('#titulo').html(data.titulo);
 //   //              $('#ntitulo').html(data.tituloresaltado);
 //   //          }else{
 //   //              if (data.mensaje=='datos_incorrectos'){
 //   //                  showAlert('En estos momentos no podemos procesar su petición...Intente mas tarde', 'Error de comunicación', 0);
 //   //              }
 //   //          }
 //   //      },
 //   //      beforeSend:function(){},
 //   //      error:function(objXMLHttpRequest){}
 //   //  });

 //    // var params = {
 //    //     act: 'getPlanes',
 //    // }

 //    // $.ajax({
 //    //     async:true,
 //    //     cache:false,
 //    //     dataType: 'json',
 //    //     type: 'POST',
 //    //     url: '../modelo/publicar.php',
 //    //     data: params,
 //    //     success:  function(data){
 //    //         if (data.success==true){
 //    //             len = data.data.length;
 //    //             var div = $('');
 //    //             var donde = 0;
 //    //             if (len>0){
 //    //                 for(i=0;i<len;i++){
 //    //                     var nomplan = data.data[i].nombreplan;
 //    //                     var precio = data.data[i].precio;
 //    //                     var id = data.data[i].codigoplan;
 //    //                     if (i==0){
 //    //                         div = $("<div class=\"row\" id=\"div_"+i+"\"></div>");
 //    //                         $('#planes').append(div);
 //    //                         donde = i;
 //    //                     }else{
 //    //                         if ((i%4)==0){
 //    //                             div = $("<div class=\"row\" id=\"div_"+i+"\"></div>");
 //    //                             $('#planes').append(div);
 //    //                             donde = i;
 //    //                         }
 //    //                     }

 //    //                     var lenc = data.data[i].caracteristicas.length;
 //    //                     var divc = "";
 //    //                     var nombre = "";
 //    //                     var valor = "";
 //    //                     var imagen = "";
 //    //                     for(j=0;j<lenc;j++){
 //    //                         nombre = data.data[i].caracteristicas[j].nombre;
 //    //                         valor = data.data[i].caracteristicas[j].valor;
 //    //                         valido = data.data[i].caracteristicas[j].valido;
 //    //                         imagen = "";
 //    //                         if (valido==true){
 //    //                             imagen = "../img/chulo.png";
 //    //                         }else{
 //    //                             imagen = "../img/equis.png"
 //    //                         }
 //    //                         nombre = nombre + " " + valor;
 //    //                         if (j==0){
 //    //                             divc = divc + "<div class=\"text-rr text-12\" style=\"margin-left: 10%;margin-top: 20%;\"><img src=\""+imagen+"\"><span style=\"margin-left: 5%;\">"+nombre+"</span></div>";
 //    //                         }else{
 //    //                             if (j==lenc-1){
 //    //                                 divc = divc + "<div class=\"text-rr text-12\" style=\"margin-left: 10%;margin-top: 4%;margin-bottom: 5%;\"><img src=\""+imagen+"\"><span style=\"margin-left: 5%;\">"+nombre+"</span></div>";
 //    //                             }else{
 //    //                                 divc = divc + "<div class=\"text-rr text-12\" style=\"margin-left: 10%;margin-top: 4%;\"><img src=\""+imagen+"\"><span style=\"margin-left: 5%;\">"+nombre+"</span></div>";
 //    //                             }
 //    //                         }
 //    //                     }

 //    //                     var lenc = data.data[i].paquetes.length;
 //    //                     var divp = "<div class=\"select\">"+
 //    //                                     "<select class=\"form-control\">";
 //    //                     var mes = "";
 //    //                     var precio = "";
 //    //                     var paq = ""
 //    //                     var opt = "";
 //    //                     for(j=0;j<lenc;j++){
 //    //                         mes = data.data[i].paquetes[j].cantmeses;
 //    //                         precio = data.data[i].paquetes[j].preciomes;
 //    //                         if (parseInt(mes)==1){
 //    //                             paq = mes + " Mes a $ " + precio + "/mes";
 //    //                         }else{
 //    //                             paq = mes + " Meses a $ " + precio + "/mes";
 //    //                         }

 //    //                         opt = opt + "<option>"+paq+"</option>";
 //    //                     }

 //    //                     divp = divp + opt + "</select></div>";


 //    //                     div = $("<div class=\"col-sm-6 col-md-3 col-lg-3\">"+
 //    //                                 "<div class=\"row borde-plan\" style=\"margin-left: 1%; margin-right: 1%; background-color:#ffffff !important;\">"+
 //    //                                     "<div class=\"col-xs-12\">"+
 //    //                                         "<div class=\"text-rbo text-16 text-center\" style=\"margin-top: 5%\">"+nomplan+"</div>"+
 //    //                                         "<div class=\"text-rl text-40 text-center\" style=\"margin-bottom: 0px;\">$ "+precio+"</div>"+
 //    //                                         "<div class=\"text-rm text-14 pull-right\" style=\"margin-right: 20%;\">mes</div>"+divc+
 //    //                                         "<div style=\"margin-left: 10%;\">"+divp+
 //    //                                         "</div>"+
 //    //                                         "<div class=\"text-center\" style=\"margin-top: 5%; margin-bottom: 5%;\"><a href=\"seleccionar('"+id+"')\"><img src=\"../img/seleccionar.png\"></a></div>"+
 //    //                                     "</div>"+
 //    //                                 "</div>"+
 //    //                             "</div>");
 //    //                     $('#div_'+donde).append(div);
 //    //                 }
 //    //             }

 //    //         }else{
 //    //             if (data.mensaje=='datos_incorrectos'){
 //    //                 showAlert('En estos momentos no podemos procesar su petición...Intente mas tarde', 'Error de comunicación', 0);
 //    //             }
 //    //         }
 //    //     },
 //    //     beforeSend:function(){},
 //    //     error:function(objXMLHttpRequest){}
 //    // });


	$('#iniciar').click(function(){
		if (conexion==1){
			$(location).attr('href','index.php');
		}else{
			$('#inicio').modal('show');
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
                            $('#conexion').val('1');
                            $('#id_usuario').val(data.id);
                            $('#iddUser').val(data.id);
                            $('#inicioi').html('Inicio');
                            $('#perfil').html('Perfil');
                            showAlert('El proceso de logueo se llevo a cabo con exito', 'Datos no encontrados', 2);
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
                    $('#inicio').modal('show');
                }
                if (Donde==2){
                    $('#inicio').modal('hide');
                }
            }
        });
    }

    $('#guardaOpinion').click(function(){
        var texto = $('#txtOpinion').val();
        var puntaje = 0;
        $("#estrellas img").each(function (index)
        {
            src = $(this).attr('src');
            if (src=='../img/estrellao_sel.png'){
                puntaje = puntaje + 1;
            }
        });


        if (validar_ob(texto)==false){
            showAlert('Debe escribir una opinion', 'Datos Incompletos', 0);
        }else{
            var div = "";
            var params = {
                idpagina: $('#pagina').val(),
                texto: texto,
                idusuario: $('#id_usuario').val(),
                puntaje: puntaje
            }

            $.ajax({
                async:true,
                cache:false,
                dataType: 'json',
                type: 'POST',
                url: SERVER+'incOpinion',
                data: params,
                success:  function(data){
                        if (data.success==true){
                            $('#panOpinion').modal('hide');
                            datos = $('#nomUser').text();
                            var f = new Date();
                            fecharegistro = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
                            puntos = puntaje;
                            opi = texto
                            div = div + "<div class=\"row\" style=\"margin-top: 3%;padding-bottom:10px;text-align: left !important;\">"+
                                            "<p class=\"text-rb text-14\"><span>"+datos+"</span><span class=\"pull-right text-rr text-12\">"+fecharegistro+"</span></p>"+
                                            "<p>";
                            if (puntos==0){
                                div = div + "<img src=\"../img/estrellap.png\" style=\"margin-left: 0.5%;\"><img src=\"../img/estrellap.png\" style=\"margin-left: 0.5%;\"><img src=\"../img/estrellap.png\" style=\"margin-left: 0.5%;\">";
                            }else{
                                for(i=1;i<6;i++){
                                    if (i<=puntos){
                                        if (i==1){
                                            div = div + "<img src=\"../img/estrellap_sel.png\">";
                                        }else{
                                            div = div + "<img src=\"../img/estrellap_sel.png\" style=\"margin-left: 0.5%;\">";
                                        }
                                    }else{
                                        div = div + "<img src=\"../img/estrellap.png\" style=\"margin-left: 0.5%;\">";
                                    }
                                }
                            }
                            div = div + "</p>"+
                                        "<p class=\"text-rr text-2\" style=\"text-align: justify;\">"+opi+"</p>"+
                                        "</div>"+
                                        "<div class=\"row text-center\" style=\"margin-top: 1%;\">"+
                                            "<div class=\"col-md-12 col-lg-12\">"+
                                                "<img src=\"../img/barra-div.png\" style=\"width: 100%; height: 3px;\">"+
                                            "</div>"+
                                        "</div>";
                            $('#div_opiniones').prepend(div);
                        }else{
                            if (data.mensaje=='correorepetido'){
                                showAlert('El correo que intenta suministrar esta repetido... No se puede registrar', 'Error', 0);
                            }
                        }
                },
                beforeSend:function(){},
                error:function(objXMLHttpRequest){}
            });

        }
    });



});


    function sha_eve(){
        var sha = $('#btnSha').data("sha");
        if (sha=='0'){
            $('#btnSha').data("sha", "1");
            $('#sho-eve').show();
        }else{
            $('#btnSha').data("sha", "0");
            $('#sho-eve').hide();
        }
    };

    function verPagina(id){
        $(location).attr('href','../vista/veraccion.php?id='+id);
    }
        // var map;
        // function initialize() {
        //     alert($('#div_lat').val());
        //     alert(parseFloat($('#div_lat').val()));
        //     var mapOptions = {
        //         zoom: 4,
        //         center: new google.maps.LatLng(9.814103, -83.118708)
        //     };

        //     map = new google.maps.Map(document.getElementById('lienzoMapa'), mapOptions);
        // }

    function ajax_start(){

        $body = $("body");
        $body.addClass("loading");
    }

    function ajax_stop(){
        $body = $("body");
         $body.removeClass("loading");
    }

    function initialize(lat, lon) {
       // alert(lat);
       // alert(lon);

        geocoder = new google.maps.Geocoder();

            //Si no creamos el objeto con una latitud cualquiera como la de Mar del Plata, Argentina por ej
        var latLng = new google.maps.LatLng(lat,lon);
        //Definimos algunas opciones del mapa a crear
       var myOptions = {
          center: latLng,//centro del mapa
          zoom: 15,//zoom del mapa
          mapTypeId: google.maps.MapTypeId.ROADMAP //tipo de mapa, carretera, híbrido,etc
        };
        //creamos el mapa con las opciones anteriores y le pasamos el elemento div
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

        //creamos el marcador en el mapa
        marker = new google.maps.Marker({
            map: map,//el mapa creado en el paso anterior
            position: latLng,//objeto con latitud y longitud
            draggable: true //que el marcador se pueda arrastrar
        });
    }

    function contacto(){
        $('#color-inf').css('background-color', '#ffffff');
        $('#color-act').css('background-color', '#ffffff');
        $('#opinion').css('background-color', '#e9eaec');
        $('#fotos').css('background-color', '#e9eaec');
        $('#color-con').css('background-color', '#e9eaec');
        var div = $('#div_con').val();
        $('#caja_int').empty();
        $('#caja_int').append(div);
        lat = $('#div_lat').val();
        lon = $('#div_lon').val();
        initialize(lat,lon);
    }

    function actividades(){
        informaciones();
    }

        function informaciones(){
        var div = "<div class=\"col-md-3 col-lg-3\" style=\"height: 800px;\">"+
                        "<div class=\"row\" style=\"background-color: #e9eaec;\" id=\"color-act\">"+
                            "<a href=\"javascript:actividades();\" style=\"color:black;text-decoration: none;color:#434142;\" class\"anone\"><div class=\"text-rm text-12 tab-padding2\" style=\"margin-left: 15%;\" id=\"actividad\">Actividad</div></a>"+
                        "</div>"+
                        "<div class=\"row\" id=\"color-con\">"+
                            "<a href=\"javascript:contacto();\" style=\"color:black;text-decoration: none;color:#434142;\" class\"anone\"><div class=\"text-rm text-12 tab-padding2\" style=\"margin-left: 15%;\" id=\"contacto\" >Datos de Contacto</div></a>"+
                        "</div>"+
                  "</div>"+
                  "<div class=\"col-md-9 col-lg-9\" style=\"height: 800px;\" id=\"caja_int\">"+
        $('#caja').empty();
        $('#caja').append(div);
        $('#caja_int').css('border-left', '1px solid #ebebeb');
        $('#color-inf').css('background-color', '#ffffff');
        $('#color-act').css('background-color', '#e9eaec');
        $('#opinion').css('background-color', '#e9eaec');
        $('#fotos').css('background-color', '#e9eaec');
        $('#color-con').css('background-color', '#ffffff');
        $('#caja_int').empty();
        $('#caja_int').append($('#div_act').val());
    }

    function addOpinion(){
        var sw = 0;
        var usu = $('#id_usuario').val();
        $('.idu').each(function(index){
            var idu = $(this).data('usuario');
            if (usu==idu){
                sw=1;
            }
        });
        if (sw==1){
            showAlert('Usted ya ha opinado sobre esta página, gracias', 'Opiniones',0);
            return;
        }
        $('#nomPag').text($('#nompagina').val());
        $('#nomUser').text($('#name').val());
        for (var i = 1; i < 6; i++){
            $('#E'+i).attr('src','../img/estrellao.png');
        }
        $('#panOpinion').modal('show');
    }

    function e_hover(id){
        var numero = parseInt($('#E'+id).data('posicion'));
        for (var i = numero; i >= 0; i--){
            $('#E'+i).attr('src','../img/estrellao_sel.png');
        }
        for (var i = numero+1; i < 6; i++){
            $('#E'+i).attr('src','../img/estrellao.png');
        }

    }

    function e_out(id){
        var numero = parseInt($('#E'+id).data('posicion'));
        var eclick = 0;
        for (var i = 1; i < 6; i++){
            if ($('#E'+i).data('seleccion')=='1'){
                $('#E'+i).attr('src','../img/estrellao_sel.png');
            }else{
                $('#E'+i).attr('src','../img/estrellao.png');
            }
        }
    }

    function e_click(id){
        for(i=1;i<6;i++){
            $('#E'+i).data('seleccion','');
            $('#E'+i).attr('src','../img/estrellao.png');
        }
        for(i=1;i<=id;i++){
            $('#E'+i).attr('src','../img/estrellao_sel.png');
            $('#E'+i).data('seleccion','1');
        }

    }

    function showEvent(i){
        ajax_start();
        $('#caja_int').empty();
        $('.dive').each(function(index){
            if ($(this).prop('id')==('dive_'+i)){
                $(this).css('background-color', '#e9eaec');
            }else{
                $(this).css('background-color', '#ffffff');
            }
        });
        var idp = $('#pagina').val();
        var idd = parseInt(i);
        var id = arrEvents[idd].id;
        var rutalogo = arrEvents[idd].rutalogo;
        var nombre = arrEvents[idd].nombre;
        var descripcion = arrEvents[idd].descripcion;
        var url = arrEvents[idd].url;
        var foto = arrEvents[idd].foto;
        var fechainicio = arrEvents[idd].fechainicio;
        var fechainicio2 = arrEvents[idd].fechainicio2;
        var horainicio = arrEvents[idd].horainicio;
        var fechafin = arrEvents[idd].fechafin;
        var fechafin2 = arrEvents[idd].fechafin2;
        var horafin = arrEvents[idd].horafin;
        var lugar = arrEvents[idd].lugar;
        var dia = ""+fechainicio;
        dia = dia.substring(0,2);
        mes = getMes(fechainicio);
        var f=new Date(fechainicio2);
        nfechainicio = 'Desde el ' + diasSemana[f.getDay()] + ', '+  (f.getDate() + 1)  + ' ' + meses[f.getMonth()];
        var f=new Date(fechafin2);
        nfechafin = 'Hasta el ' + diasSemana[f.getDay()] + ', '+  (f.getDate() + 1)  + ' ' + meses[f.getMonth()];
        var div =   "<div class=\"row\" style=\"margin-top:20px;\">"+
                        "<div class=\"col-md-7 col-lg-7\" style=\"padding-left:40px;\">"+
                            "<p class=\"text-rr text-12\">"+
                                "<div class=\"row\" style=\"padding-left:0px;padding-right:0px;\">"+
                                    "<div class=\"col-md-1 col-lg-1\">"+
                                        "<p class=\"text-rr text-20\" style=\"margin-bottom: 0px;\">"+dia+"</p>"+
                                        "<p class=\"text-rr text-12\" style=\"color:#df040b;\">"+mes+"</p>"+
                                    "</div>"+
                                    "<div class=\"col-md-11 col-lg-11 text-rbo text-20\">"+nombre+"</div>"+
                                "</div>"+
                            "</p>"+
                            "<p class=\"text-rbo text-12\" style=\"margin-bottom: 0px;margin-top:20px;\">Fecha</p>"+
                            "<p class=\"text-rr text-12\" style=\"margin-bottom: 0px;\">"+nfechainicio+"</p>"+
                            "<p class=\"text-rr text-12\">"+nfechafin+"</p>"+
                            "<p class=\"text-rbo text-12\" style=\"margin-bottom: 0px;margin-top:20px;\">Lugar</p>"+
                            "<p class=\"text-rr text-12\" style=\"margin-bottom: 0px;\">"+lugar+"</p>"+
                            "<p class=\"text-rbo text-12\" style=\"margin-bottom: 0px;margin-top:20px;\">Descripción</p>"+
                            "<p class=\"text-rr text-12\" style=\"margin-bottom: 0px;\">"+descripcion+"</p>"+
                            "<p class=\"text-rbo text-12\" style=\"margin-bottom: 0px;margin-top:20px;\">Link para mayor información</p>"+
                            "<p class=\"text-rr text-12\" style=\"margin-bottom: 0px;\"><a href=\"http://"+url+"\" target=\"_blank\">"+url+"</a></p>"+
                        "</div>"+
                        "<div class=\"col-md-3 col-lg-3\">"+
                            "<img src=\""+foto+"\" style=\"height:180px; width:180px;\">"+
                            "<span class=\"btn btncustom\" style=\"width:180px;height: 30px !important;padding-top: 5px !important;background-color: #434041 !important;margin-top:10px;\" onClick=\"javascript:sha_eve();\" data-sha=\"0\" id=\"btnSha\">Compartir</span>"+
                                "<div style=\"width:180px;margin-top:5px;\" id=\"sho-eve\">"+
                                 "<img src=\"../img/facebook-small.png\" class=\"puntero\" onClick=\"javascript:shareEF('"+idp+"','"+nombre+"','"+descripcion+"','"+rutalogo+"','"+url+"')\"/>"+
                                  "<a href=\"http://www.twitter.com/home?status=http://actividad.php/\"  target=\"blank\"><img src=\"../img/twitter-small.png\"  class=\"\" style=\"\" onClick=\"\"/></a>"+
                                "</div>"+
                        "</div>"+
                    "</div>";
        $('#caja_int').append(div);
        $('#sho-eve').hide();
        ajax_stop();
    }
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
    function getMes(fecha){
        var auxMes = ""+fecha;
        auxMes = auxMes.substring(3,5);
        switch(auxMes){
            case '01':
                auxMes = 'ENE';
            break;
            case '02':
                auxMes = 'FEB';
            break;
            case '03':
                auxMes = 'MAR';
            break;
            case '04':
                auxMes = 'ABR';
            break;
            case '05':
                auxMes = 'MAY';
            break;
            case '06':
                auxMes = 'JUN';
            break;
            case '07':
                auxMes = 'JUL';
            break;
            case '08':
                auxMes = 'AGO';
            break;
            case '09':
                auxMes = 'SEP';
            break;
            case '10':
                auxMes = 'OCT';
            break;
            case '11':
                auxMes = 'NOV';
            break;
            case '12':
                auxMes = 'DIC';
            break;
        }
        return auxMes;
    }

    $('#sha-face').click(function(){
        $('#share_redes').modal('hide');
        iddd = $('#id_usuario').val();
        logo = $('#rutalogo').val();
        name = $('#nompagina').val();
        descr = $('#descr').val();
        window.open('https://www.facebook.com/dialog/feed?app_id=204215923292122&display=popup&name='+name+'&caption=Loupper&description=Categoria: '+descr+'&link=http://www.loupper.com/loupperf/vista/veraccion.php?id='+iddd+'&redirect_uri=http://www.loupper.com/loupperf/vista/veraccion.php?id=0&picture='+logo);
    });

    function shareEF(iddd,name,descr,logo,url){
        //alert('id: '+ iddd +', name: '+ name +', descr: '+ descr + ', logo: ' + logo +', url: ' + url);
        window.open('https://www.facebook.com/dialog/feed?app_id=204215923292122&display=popup&name='+name+'&caption=Loupper&description=Descripción: '+descr+'&link=http://www.loupper.com/loupperf/vista/veraccion.php?id='+iddd+'&redirect_uri=http://www.loupper.com/loupperf/vista/veraccion.php?id=111&picture='+logo);
        $('#btnSha').data("sha", "0");
        $('#sho-eve').hide();
    }

    function shareF(){
        $('#share_redes').modal('show');
        //funciona ok con facebook
        //window.open('https://www.facebook.com/dialog/feed?app_id=204215923292122&display=popup&name='+name+'&caption=Loupper&description=Categoria: '+descr+'&link=http://www.loupper.com/loupperf/vista/veraccion.php?id='+iddd+'&redirect_uri=http://www.loupper.com/loupperf/vista/veraccion.php?id=0&picture='+logo);

        //falta agregar api twitter
        // ancho=screen.availWidth;
        // alto=screen.availHeight;
        // var url = '../twitter/twit.php?imagen=http://www.loupper.com/loupperf/img/portada_test.png';
        // //alert(url);
        // window.open(url,'window2','wid th='+ancho+',height='+alto+',top=0,left=0','toolba r=no,location=no,directories=no,scrollbars=yes,sta tus=no,menubar=no,resizable=no');
        // url = '../modelo/detal_desing.php';
        // $.get(url,params,compartir);
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
            }
        });
    }
