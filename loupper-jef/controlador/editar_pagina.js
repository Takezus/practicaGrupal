var arrEvents = new Array();
var id_plan = '';
var res_ext = '';
var factura = '';
var arrSubCat = new Array();
var id_categoria = '';

$(document).ready(function(){
    
    $('#dias_s').hide();
    $('#hora_s').hide();
    $('#horc_s').hide();
	$('#ddlCars').multiselect();
    $("#subcat1").empty();
    $("#subcat2").empty();
    $("#subcat3").empty();
    $("#subcat1").append("<option value=\"0\">Seleccione</option>");
    $("#subcat2").append("<option value=\"0\">Seleccione</option>");
    $("#subcat3").append("<option value=\"0\">Seleccione</option>");

    $('#datetimepickere').datetimepicker({
        format: 'LT'
    });

    $('#datetimepickers').datetimepicker({
        format: 'LT'
    });

    $('#horini').datetimepicker({
        format: 'LT'
    });

    $('#horfin').datetimepicker({
        format: 'LT'
    });

    $('#fecini').datetimepicker({
        format: 'DD/MM/YYYY'
    });

    $('#fecfin').datetimepicker({
        format: 'DD/MM/YYYY'
    });

    $('#paintEvent').popover({
        content: 'Debe seleccionar una foto',
        placement: 'bottom'
    });

    $('#nombre').popover({
        content: 'Debe suministrar un nombre para el evento',
        placement: 'bottom'
    });

    $('#lugar').popover({
        content: 'Debe suministrar un lugar para el evento',
        placement: 'bottom'
    });

    $('#fecini').popover({
        content: 'Debe suministrar una fecha de inicio para el evento',
        placement: 'bottom'
    });

    $('#horini').popover({
        content: 'Debe suministrar una hora de inicio para el evento',
        placement: 'bottom'
    });

    $('#descripcion').popover({
        content: 'Debe suministrar una descripcion para el evento',
        placement: 'bottom'
    });

    ajax_start();
    var params = {
        act: 'getPagina',
        pagina: $('#idnegocio').val()
    }

    $.ajax({
        async:false,   
        cache:false, 
        dataType: 'json',
        type: 'POST',  
        url: '../modelo/actividad.php',
        data: params,
        success:  function(data){ 
            if (data.success==true){
                $('#txtNomPag').text(data.data[0].nombre);
                $('#txtNumLoupper').text(data.data[0].numloupper);
                $('#imgLogo').attr('src','data:image/png;base64,'+data.data[0].logo);
                if (data.data[0].portada!=null){
                    $('#imgPortada').attr('src','data:image/png;base64,'+data.data[0].portada);
                }
                $('#txtPlan').text(data.data[0].nombreplan);
                $('#totPlan').text('Vence el '+fecha_get(data.data[0].fechafin));
                id_categoria = data.data[0].nivelcategoria[0].idcat;
                for(i=0;i<data.data[0].nivelsubcategorias.length;i++){
                    arrSubCat[i] = data.data[0].nivelsubcategorias[i].idsubcat;
                }
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

    $('#delPagina').click(function(){
        showConfirm('¿Está seguro que desea Eliminar su Página?', 'Confirmación', 1);
    })

    $('#txtCambio').click(function(){
       $(location).attr('href','cambiar_plan.php');
    })

    $('#previsual').click(function(){
        var id = $('#idnegocio').val();
      window.open('../vista/veraccion.php?id='+id);
    })

	$('#categorias').change(function(){
        var id = $('#categorias').val();
        if (id==0){
            $("#subcat1").empty();
            $("#subcat2").empty();
            $("#subcat3").empty();
            $("#subcat1").attr('disabled',true);
            $("#subcat2").attr('disabled',true);
            $("#subcat3").attr('disabled',true);
            $("#subcat1").append("<option value=\"0\">Seleccione</option>");
            $("#subcat2").append("<option value=\"0\">Seleccione</option>");
            $("#subcat3").append("<option value=\"0\">Seleccione</option>");
        }else{
            params = {
                act: 'getSubcategorias',
                nivel: 1,
                valornivelpadre: $('#categorias').val()
            }

            $.ajax({
                async:true,   
                cache:false, 
                dataType: 'json',
                type: 'POST',  
                url: '../modelo/pagina.php',
                data: params,
                success:  function(data){ 
                    if (data.success==true){
                        $("#subcat1").empty();
                        $("#subcat1").append("<option value=\"0\">Seleccione</option>");
                        $("#subcat1").attr('disabled',false);

                        var i = 0;
                        for(i=0;i<parseInt(data.data.length);i++){
                            id = data.data[i].id;
                            nombre = data.data[i].nombre;
                            $("#subcat1").append("<option value=\""+id+"\">"+nombre+"</option>");
                        }                
                        $("#subcat2").attr('disabled',true);
                        $("#subcat3").attr('disabled',true);
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
	});


	$('#subcat1').change(function(){
        var id = $('#subcat1').val(); 
        if (id==0){
            $("#subcat2").empty();
            $("#subcat3").empty();
            $("#subcat2").attr('disabled',true);
            $("#subcat3").attr('disabled',true);
            $("#subcat2").append("<option value=\"0\">Seleccione</option>");
            $("#subcat3").append("<option value=\"0\">Seleccione</option>");
        }else{
            params = {
                act: 'getSubcategorias',
                nivel: 2,
                valornivelpadre: $('#subcat1').val()
            }

            $.ajax({
                async:true,   
                cache:false, 
                dataType: 'json',
                type: 'POST',  
                url: '../modelo/pagina.php',
                data: params,
                success:  function(data){ 
                    if (data.success==true){
                        if (data.data.length>0){
                            $("#subcat2").empty();
                            $("#subcat2").append("<option value=\"0\">Seleccione</option>");
                            $("#subcat2").attr('disabled',false);
                            var i = 0;
                            for(i=0;i<parseInt(data.data.length);i++){
                                id = data.data[i].id;
                                nombre = data.data[i].nombre;
                                $("#subcat2").append("<option value=\""+id+"\">"+nombre+"</option>");
                            } 
                            $("#subcat3").attr('disabled',true);
                        
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
    });

    $('#subcat2').change(function(){
        var id = $('#subcat2').val();
        if (id==0){
            $("#subcat3").empty();
            $("#subcat3").attr('disabled',true);
            $("#subcat2").append("<option value=\"0\">Seleccione</option>");
        }else{
            params = {
                act: 'getSubcategorias',
                nivel: 3,
                valornivelpadre: $('#subcat2').val()
            }

            $.ajax({
                async:true,   
                cache:false, 
                dataType: 'json',
                type: 'POST',  
                url: '../modelo/pagina.php',
                data: params,
                success:  function(data){ 
                    if (data.success==true){
                        $("#subcat3").empty();
                        if (data.data.length>0){
                            $("#subcat3").attr('disabled',false);
                            $("#subcat3").append("<option value=\"0\">Seleccione</option>");
                            var i = 0;
                            for(i=0;i<parseInt(data.data.length);i++){
                                id = data.data[i].id;
                                nombre = data.data[i].nombre;
                                $("#subcat3").append("<option value=\""+id+"\">"+nombre+"</option>");
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
    });
////Guardado de imagenes en la galeria
    $('#saveGaleria').click(function(){
                var imagenes = '{"imagenes":[';//Declaramos un array
        i = 0;
        $("#caja img").each(function (index) 
        {    //Recorremos todas las imagenes dentro de la div con id caja
            src = $(this).attr('src');//Capturamos el src
            if (src!='../img/cuadro-imgb.png'){
                i = i + 1;//almacenamos en i la imagenes que esten cargadas, ej:5 de 7 cargadas
            }
        });
        var j = 0;
        $("#caja img").each(function (index) 
        {             
            src = $(this).attr('src');
            if (src!='../img/cuadro-imgb.png'){
                j = j + 1;
                if (i==j){
                 imagenes = imagenes + '{"cadenaimagen":"' + encodeURIComponent(src) + '"}]}';
                console.log(imagenes);
                }else{
                 imagenes = imagenes + '{"cadenaimagen":"' + encodeURIComponent(src) + '"},';
                } 
            }
        });

        if (i==0){
            showAlert('Debe seleccionar al menos una imagen', 'Faltan datos', 0);
        }else{
            ajax_start2();
            var params ={
                tipodato: 'galeria',
                idpagina: $('#idnegocio').val(),
                imagenes: imagenes,
            }

            $.ajax({
                async:true,   
                cache:false, 
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                type: 'POST',  
                url: SERVER+'actPagina',
                data: params,
                success:  function(data){
                    ajax_stop2(); 
                    if (data.success==true){
                        showAlert('Las imagenes se cambiaron con éxito','Operación exitosa',12);
                    }else{
                        showAlert('En este momento no podemos realizar su operación, intente más tarde','Error',12);
                    }
                },
                beforeSend:function(){},
                error:function(objXMLHttpRequest){}
            });
        }

    });
/////Fin del Guardado de las imagenes************
    $('#saveInformacion').click(function(){
        var nombre = $('#nombrep').val();
        var sitio = $('#sitio').val();
        var actividad = $('#actividad').val();
        var idsubcategoria = '';
        if ($('#subcat3').attr('disabled')!='disabled'){
            idsubcategoria = $('#subcat3').val();
        }else{
            if ($('#subcat2').attr('disabled')!='disabled'){
                idsubcategoria = $('#subcat2').val();
            }else{
                if ($('#subcat1').attr('disabled')!='disabled'){
                    idsubcategoria = $('#subcat1').val();
                }
            }
        }
        var idprovincia = $('#provincias').val();
        var direccion = $('#direccion').val();
        var palclaves = '';
        var cnt = 0;
        $("#palabras div").each(function (index) 
        { 
            cnt = cnt + 1;
            var miValor = $(this).html();
            var pos = miValor.indexOf('<')
            miValor = miValor.substring(0, pos);
            if (cnt==1){
                palclaves = miValor.trim();
            }else{                
                palclaves = palclaves + ',' + miValor.trim();
            }    
        }); 
        var telefono = $('#telefono').val();
        var email = $('#email').val();
        var ciudad = $('#ciudad').val();
        var horarios = [];
        cnt = 0;
        $("#dias_s div").each(function (index) 
        { 
            
            var miValor = dias($(this).html());
            horarios[cnt] = miValor;
            cnt = cnt + 1;
        });
        var hora_a = [];
        cnt = 0;
        $("#hora_s div").each(function (index) 
        { 
            
            var miValor = hora($(this).html());
            hora_a[cnt] = miValor;
            cnt = cnt + 1;
        }); 
        var hora_s = [];
        cnt = 0;
        $("#horc_s div").each(function (index) 
        { 
            
            var miValor = $(this).html();
            hora_s[cnt] = miValor;
            cnt = cnt + 1;
        }); 
        var def = '{"horarios":[';
        for(i=0;i<horarios.length;i++){
            if (hora_a[i]=='*****'){
                e = '0';
                s = '0';
            }else{
                e = hora_a[i];
                s = hora_s[i];
            }
             if (i==horarios.length-1){
                 def = def + '{"dias":"' + horarios[i] + '","horainicio":"' + e + '","horafin":"' + s + '"}]}';
             }else{
                def = def + '{"dias":"' + horarios[i] + '","horainicio":"' + e + '","horafin":"' + s + '"},';
             }    
        }
        var latitud = $('#lat').val();
        var longitud = $('#lon').val();

        if (validar_ob(nombre)==false){
                showAlert('Debe introducir un nombre', 'Faltan datos', 4);    
        }else{
            if (validar_ob(actividad)==false){
                showAlert('Debe introducir un actividad', 'Faltan datos', 5);    
            }else{
                if (palclaves==''){
                    showAlert('Debe introducir al menos un palabra clave', 'Faltan datos', 6);        
                }else{
                    if (validar_ob(email)==false){
                        showAlert('Debe introducir el correo electrónico', 'Faltan datos', 7); 
                    }else{
                        if (validar_ob(telefono)==false){
                            showAlert('Debe introducir el número de teléfono', 'Faltan datos', 8);   
                        }else{
                            if (validar_ob(ciudad)==false){
                                showAlert('Debe introducir la ciudad', 'Faltan datos', 9);      
                            }else{
                                if (validar_ob(latitud)==false){
                                    showAlert('Debe seleccionar su unicación', 'Faltan datos', 0);  
                                }else{
                                    if (validar_ob(direccion)==false){
                                            showAlert('Debe introducir la dirección', 'Faltan datos', 10);
                                    }else{
                                        if (horarios.length==0){
                                                showAlert('Debe introducir al menos un horario', 'Faltan datos', 0);
                                        }else{
                                            if (1 == 2){
                                                showAlert('Debe seleccionar una imagen a guardar','Datos incompletos',0);
                                            }else{
                                                ajax_start2();
                                                var params ={
                                                    tipodato: 'informacion',
                                                    idpagina: $('#idnegocio').val(),
                                                    nombre: nombre,
                                                    sitioweb: $('#sitio').val(),
                                                    actividad: actividad,
                                                    idprovincia: idprovincia,
                                                    direccion: direccion,
                                                    palclaves: palclaves, 
                                                    telefono: telefono,
                                                    email: email,
                                                    ciudad: ciudad,
                                                    horarios: def,
                                                    latitud: latitud,
                                                    longitud: longitud,
                                                }

                                                $.ajax({
                                                    async:true,   
                                                    cache:false, 
                                                    dataType: 'json',
                                                    type: 'POST',  
                                                    url: SERVER+'actPagina',
                                                    data: params,
                                                    success:  function(data){
                                                        ajax_stop2(); 
                                                        if (data.success==true){
                                                            showAlert('La información se cambió con éxito','Operación exitosa',11);
                                                        }else{
                                                            showAlert('En este momento no podemos realizar su operación, intente más tarde','Error',11);
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
            }
        }

    });


    $('#savePortada').click(function(){
        src = $('#imgPortada').attr('src');
        if (src == '../img/portada.png'){
            showAlert('Debe seleccionar una imagen a guardar','Datos incompletos',0);
        }else{
            ajax_start2();
            var params ={
                tipodato: 'portada',
                idpagina: $('#idnegocio').val(),
                portada: encodeURIComponent(src),
            }

            $.ajax({
                async:true,   
                cache:false, 
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                type: 'POST',  
                url: SERVER+'actPagina',
                data: params,
                success:  function(data){ 
                    ajax_stop2();
                    if (data.success==true){
                        showAlert('La portada se cambió con éxito','Operación exitosa',3);
                    }else{
                        showAlert('En este momento no podemos realizar su operación, intente más tarde','Error',3);
                    }
                },
                beforeSend:function(){},
                error:function(objXMLHttpRequest){}
            });
        }
    });


    $('#saveLogo').click(function(){
        src = $('#imgLogo').attr('src');
        if (src == '../img/fotoi_empty.png'){
            showAlert('Debe seleccionar una imagen a guardar','Datos incompletos',0);
        }else{
            ajax_start2();
            var params ={
                tipodato: 'logo',
                idpagina: $('#idnegocio').val(),
                logo: encodeURIComponent(src),
            }

            $.ajax({
                async:true,   
                cache:false, 
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                type: 'POST',  
                url: SERVER+'actPagina',
                data: params,
                success:  function(data){ 
                    ajax_stop2();
                    if (data.success==true){
                        showAlert('El logo se cambió con éxito','Operación exitosa',2);
                    }else{
                        showAlert('En este momento no podemos realizar su operación, intente más tarde','Error',2);
                    }
                },
                beforeSend:function(){},
                error:function(objXMLHttpRequest){}
            });
        }
    });


    $('#saveCategoria').click(function(){
        var idsubcategoria = '';
        if ($('#subcat3').attr('disabled')!='disabled'){
            idsubcategoria = $('#subcat3').val();
        }else{
            if ($('#subcat2').attr('disabled')!='disabled'){
                idsubcategoria = $('#subcat2').val();
            }else{
                if ($('#subcat1').attr('disabled')!='disabled'){
                    idsubcategoria = $('#subcat1').val();
                }
            }
        }

        if (idsubcategoria == ''){
            showAlert('Debe seleccionar una categoria a guardar','Datos incompletos',0);
        }else{
            ajax_start2();
            var params ={
                tipodato: 'categoria',
                idpagina: $('#idnegocio').val(),
                idsubcategoria: idsubcategoria
            }

            $.ajax({
                async:true,   
                cache:false, 
                dataType: 'json',
                type: 'POST',  
                url: SERVER+'actPagina',
                data: params,
                success:  function(data){ 
                    ajax_stop2();
                    if (data.success==true){
                        showAlert('La categoría se cambió con éxito','Operación exitosa',1);
                    }else{
                        showAlert('En este momento no podemos realizar su operación, intente más tarde','Error',1);
                    }
                    
                },
                beforeSend:function(){},
                error:function(objXMLHttpRequest){}
            });
        }

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

    $("#txtPalabras").enterKey(function(){
        var num = $("#palabras div").length;
        var tags = $('#tags').val();
        var numero = parseInt(num) + 1;
        if (numero>tags){
             showAlert('Ha alcanzado el límite de Palabras clave que permite su Plan seleccionado', 'Limite excedido', 0);
             return;
        }
        var palabra = $('#txtPalabras').val();
        if (validar_ob(palabra)==true){
            //palabra = "<div style=\"display:inline-block; border:1px solid #434142;text-align: center;padding-left: 10px;color:#434142;margin-left:5px;margin-top:3px;\" id=\"div_"+numero+"\"><a href=\"javascript:EliminarPal("+numero+");\"> " + palabra + " <strong style=\" color:#434142;margin-left:10px;\"> x </strong></a>&nbsp;&nbsp;&nbsp;</div>";
            if (numero==1){
                var palabra = "<div class=\"text-rr text-12 label-cust\" onclick=\"javascript:EliminarPal('"+numero+"')\" id=\"div_"+numero+"\">"+palabra+
                                        "<span style=\"margin-left: 10px;display: inline-block;\">"+
                                            "<img src=\"../img/equis2.png\">"+
                                        "</span>"+
                                    "</div>";
            }else{
               var palabra = "<div class=\"text-rr text-12 label-cust\" style=\"margin-left:3px;margin-top:3px;\" onclick=\"javascript:EliminarPal('"+numero+"')\" id=\"div_"+numero+"\">"+palabra+
                                        "<span style=\"margin-left: 10px;display: inline-block;\">"+
                                            "<img src=\"../img/equis2.png\">"+
                                        "</span>"+
                                    "</div>"; 
            }
            var html = $('#palabras').html() + palabra;
            $('#palabras').html(html);
            $('#txtPalabras').val('');
        }
    });

    $('#checkAbierto').click(function(){
        src = $('#checkAbierto').attr('src'); 
        tarr = src.split('/');      
        file = tarr[tarr.length-1]; 
        if (file=='checkt.png'){
            $('#checkAbierto').attr('src','../img/checkt_sel.png');
        }else{
            $('#checkAbierto').attr('src','../img/checkt.png');
        }
    });

    $('#addHorario').click(function(){
        var ph_ha = $('#datetimepickere').val();
        var ph_hc = $('#datetimepickers').val();
        var sw = '';
        var csw = 0;
        src = $('#checkAbierto').attr('src'); 
        tarr = src.split('/');      
        file = tarr[tarr.length-1]; 
        if (file=='checkt.png'){
            check = 0;
        }else{
            check = 1;
        }
        $(".checkbox input[type=checkbox]:checked").each(function (){
            csw = csw + 1;            
            if ($(this).val()==1){
                if (csw==1){
                    sw = sw + 'Lunes';
                }else{
                    sw = sw + ',Lunes';    
                }                
            }
            if ($(this).val()==2){
                if (csw==1){
                    sw = sw + 'Martes';
                }else{
                    sw = sw + ',Martes';    
                }                
            }
            if ($(this).val()==3){
                if (csw==1){
                    sw = sw + 'Miércoles';
                }else{
                    sw = sw + ',Miércoles';    
                }                
            }
            if ($(this).val()==4){
                if (csw==1){
                    sw = sw + 'Jueves';
                }else{
                    sw = sw + ',Jueves';    
                }                
            }
            if ($(this).val()==5){
                if (csw==1){
                    sw = sw + 'Viernes';
                }else{
                    sw = sw + ',Viernes';    
                }                
            }
            if ($(this).val()==6){
                if (csw==1){
                    sw = sw + 'Sábado';
                }else{
                    sw = sw + ',Sábado';    
                }                
            }
            if ($(this).val()==7){
                if (csw==1){
                    sw = sw + 'Domingo';
                }else{
                    sw = sw + ',Domingo';    
                }                
            }
        });

       
        
        var texto = '';
        if (sw==''){
            showAlert('Debe seleccionar al menos un día', 'Sin días seleccionados', 0);  
        }else{
            if (validar_ob(ph_ha)==false && check==0){
                showAlert('Debe introducir la hora de Apertura', 'Campos sin seleccionar', 0);     
            }else{
                if (validar_ob(ph_hc)==false && check ==0){
                    showAlert('Debe introducir la hora de cierre', 'Campos sin seleccionar', 0);
                }else{
                    var numero = $('#dias_s').find('div').length;
                    texto = sw + ' De ';
                    sw = "<div class\"row text-rr text-12\" id=\"divd_"+numero+"\">"+sw+'</div>';
                    $('#dias_s').append(sw);
                    if (check==0){
                        texto = texto + ph_ha + ' a ' + ph_hc;
                        var div_l = "<p class=\"puntero\" id=\"pal_"+numero+"\"><div class=\"text-rr text-12 label-cust\" onclick=\"javascript:deletePal('"+numero+"')\" id=\"divp_"+numero+"\">"+texto+
                                        "<span style=\"margin-left: 10px;display: inline-block;\">"+
                                            "<img src=\"../img/equis2.png\">"+
                                        "</span>"+
                                    "</div>";
                        $('#txtHorarios').append(div_l);
                        sw = "<div class\"row text-rr text-12\" id=\"diva_"+numero+"\">"+ph_ha+'</div>';
                        $('#hora_s').append(sw);
                        sw = "<div class\"row text-rr text-12\" id=\"divc_"+numero+"\">"+ph_hc+'</div>';
                        $('#horc_s').append(sw);
                    }else{
                        texto = 'Abierto las 24 Horas';
                        var div_l = "<p class=\"puntero\" id=\"pal_"+numero+"\"><div class=\"text-rr text-12 label-cust\" onclick=\"javascript:deletePal('"+numero+"')\" id=\"divp_"+numero+"\">"+texto+
                                        "<span style=\"margin-left: 10px;display: inline-block;\">"+
                                            "<img src=\"../img/equis2.png\">"+
                                        "</span>"+
                                    "</div>";
                        sw = "<div class\"row text-rr text-12\" id=\"diva_"+numero+"\">Abierto las 24 Horas</div>";
                        $('#hora_s').append(sw);
                        sw = "<div class\"row text-rr text-12\" id=\"divc_"+numero+"\">&nbsp;</div>";
                        $('#horc_s').append(sw);
                    }    
                    $('#ph_ha').val('');
                    $('#ph_hc').val('');
                    
                }
            }
        }
    });

    $('#ubicacion').click(function(){
        var lat = $('#lat').val();
        var lon = $('#lon').val();
        if (lat==''){
            lat = '*****';
            lon = '*****';
        }
        window.open('gmail.php?lat='+lat+'&lon='+lon,"popup","menubar=no,toolbar=no,scrollbars=yes,width=645,height=550,left=50,top=50,location=no,resizable=yes");
    });

    $('#txtExtender').click(function(){
        res_ext = '1';
        cargar_plan();
    });

    $('#condiciones').click(function(){
        src = $(this).attr('src'); // "static/images/banner/blue.jpg"
        tarr = src.split('/');      // ["static","images","banner","blue.jpg"]
        file = tarr[tarr.length-1]; // "blue.jpg"
        if (file=='checkt.png'){
            $(this).attr('src', '../img/checkt_sel.png');
        }else{
            $(this).attr('src', '../img/checkt.png');
        }
    });
 
    $('#btnExtender').click(function(){
        var pago = 0;
        $("#forma_pago img").each(function (index) 
        {             
            src = $(this).attr('src');
            if (src=='../img/check2_sel.png'){
                pago = 1;
            }
        });
        var src = $('#condiciones').attr('src');
        if (pago==0){
            showAlert('Debe seleccionar una forma de pago', 'Datos Incompletos', 0);
        }else{
            if (src=='../img/checkt.png'){
                showAlert('Debe aceptar haber leido las Condiciones y Politicas', 'Datos Incompletos', 0);
            }else{
                    if ($(this).text()=='Aprobar'){
                        params = {
                            idpagina: $('#idnegocio').val(),
                            idfactura: factura,
                        }
                        var ht = SERVER+'aprobarFactura';
                        var met = 'POST';
                    }else{
                        params = {
                            idpagina: $('#idnegocio').val(),
                        }
                        var ht = SERVER+'extenderPlan';
                        var met = 'GET';
                    }
                    $.ajax({
                        async:true,   
                        cache:false, 
                        dataType: 'json',
                        type: met,  
                        url: ht,
                        data: params,
                        success:  function(data){ 
                            if (data.success==true){
                                if ($(this).text()=='Aprobar'){
                                    $('#totPlan').text('Vence el '+fecha_get(data.fecha));
                                    showAlert('Su resaltado ha sido extendido exitosamente', 'Transacción exitosa', 14)
                                }else{
                                    showAlert('Su plan ha sido extendido exitosamente', 'Transacción exitosa', 14)
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
        }
    });

    $('#createEvent').click(function(){
        $('#tarea').val('1');
        $('#panOfertas').modal('show');
    });

    $('#paintEvent').click(function(){
        $('#paintEvent').popover('hide');
        window.open('../vista/fotos.php?cantidad=1&donde=0&seccion=paint_event',"popup","menubar=no,toolbar=no,scrollbars=yes,width=645,height=420,left=50,top=50,location=no,resizable=yes");
    });

    $('#nombre').click(function(){
        $('#nombre').popover('hide');
    });

    $('#lugar').click(function(){
        $('#lugar').popover('hide');
    });

    $('#fecini').click(function(){
        $('#fecini').popover('hide');
    });

    $('#horini').click(function(){
        $('#horini').popover('hide');
    });

    $('#descripcion').click(function(){
        $('#descripcion').popover('hide');
    });

    $('#saveEvent').click(function(){
        var foto = '';
        var src = $('#paintEvent').attr('src');
        if (src!='../img/imgfoto_empty.png'){
            foto = encodeURIComponent(src);
        }
        var nombre = $('#nombre').val();
        var lugar = $('#lugar').val();
        var fecini = $('#fecini').val();
        var horini = $('#horini').val();
        var fecfin = $('#fecfin').val();
        var horfin = $('#horfin').val();
        var descripcion = $('#descripcion').val();
        var url = $('#url').val();
        if (foto==''){
            help('paintEvent');
        }else{
            if (validar_ob(nombre)==false){
                help('nombre');
            }else{
                if (validar_ob(lugar)==false){
                    help('lugar');
                }else{
                    if (validar_fecha(fecini)==false){
                        help('fecini');
                    }else{
                        if (validar_ob(horini)==false){
                            help('horini');
                        }else{
                            if (validar_ob(descripcion)==false){
                                help('descripcion');
                            }else{
                                ajax_start2();
                                var rango = fecini + ' - ' + fecfin;
                                if ($('#tarea').val()=='1'){
                                    var ht = SERVER+'incEvento';
                                    evento_id = 0;
                                }else{
                                    var ht = SERVER+'actEvento';
                                    evento_id = arrEvents[parseInt($('#cual').val())].id;
                                }
                                var params = {
                                    idpagina: $('#idnegocio').val(),
                                    idevento: evento_id,
                                    foto: foto,
                                    nombre: nombre,
                                    lugar: lugar,
                                    descripcion: descripcion,
                                    url: url,
                                    fechainicio: fecha_pos(fecini),
                                    horainicio: convertTo24Hour(horini),
                                    fechafin: fecha_pos(fecfin),
                                    horafin: convertTo24Hour(horfin),
                                }
                                $.ajax({
                                    async:true,   
                                    cache:false, 
                                    dataType: 'json',
                                    contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                                    type: 'POST',  
                                    url: ht,
                                    data: params,
                                    success:  function(data){ 
                                        if (data.success==true){ 
                                            if ($('#tarea').val()=='1'){
                                                arrEvents[arrEvents.length] = {
                                                    id: data.id, 
                                                    nombre: nombre, 
                                                    descripcion: descripcion, 
                                                    url: url,
                                                    foto: decodeURIComponent(foto),
                                                    fechainicio: fecini,
                                                    horainicio: horini,
                                                    fechafin: fecfin,
                                                    horafin: horfin,
                                                    lugar: lugar
                                                }
                                                ajax_stop2();
                                                $('#panOfertas').modal('hide');
                                                rePaint('0');
                                                showAlert('El evento se agrego con exito', 'Transacción Exitosa', 0);
                                            }else{
                                                var ii = parseInt($('#cual').val());
                                                arrEvents[ii].nombre = nombre; 
                                                arrEvents[ii].descripcion = descripcion; 
                                                arrEvents[ii].url = url;
                                                arrEvents[ii].foto = decodeURIComponent(foto);
                                                arrEvents[ii].fechainicio = fecini;
                                                arrEvents[ii].horainicio = horini;
                                                arrEvents[ii].fechafin = fecfin;
                                                arrEvents[ii].horafin = horfin;
                                                arrEvents[ii].lugar = lugar;
                                                alert(arrEvents.length);
                                                ajax_stop2();
                                                $('#panOfertas').modal('hide');
                                                showAlert('El evento se modifico con exito', 'Transacción Exitosa', 0);
                                                rePaint('0');
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
                        }
                    }
                }
            }
        }
    });

    $('#saveResaltar').click(function(){
        var texto = $(this).text();
        if (texto=='Extender'){
            var ht = SERVER+'extenderPlanResaltaPagina';
        }else{
            var ht = SERVER+'incPlanResaltaPagina';
        }
        params = {
            idpagina: $('#idnegocio').val(),
            idplan: id_plan,
        }
        $.ajax({
            async:true,   
            cache:false, 
            dataType: 'json',
            type: 'GET',  
            url: ht,
            data: params,
            success:  function(data){ 
                if (data.success==true){
                    res_ext = '2';
                    factura = data.idfactura;
                    $('#panResaltar').modal('hide');
                    cargar_plan();
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
});

    function help(objeto){
            $('#'+objeto).popover('show');
            var timerPopover = setTimeout(function(){
                $('#'+objeto).popover('hide');
                clearTimeout(timerPopover);
            },1000);
    }

    function cargar_plan(){
        if (res_ext=='1'){
            var params = {
                idpagina: $('#idnegocio').val(),
            }
            var ht = SERVER+'getResumenActual';
            $('#btnExtender').text('Extender Plan');
        }else{
            var params = {
                idfactura: factura,
            }
            var ht = SERVER+'getResumenResaltado';
            $('#btnExtender').text('Aprobar');
        }
        $.ajax({
            async:true,   
            cache:false, 
            dataType: 'json',
            type: 'GET',  
            url: ht,
            data: params,
            success:  function(data){ 
                if (data.success==true){
                    var div = "";
                        var descripcion = "";
                        var detalle = "";
                        var monto = "";
                    $('#detalles').empty();
                    $('#montos').empty();
                    for(i=0;i<data.data.length;i++){
                        var descripcion = data.data[i].descripcion;
                        var detalle = data.data[i].detalle;
                        var monto = data.data[i].monto;
                        div = "<p class=\"text-rm text-12\" style=\"margin-bottom: 0px;\">"+descripcion+"</p>"+
                                    "<p class=\"text-rr text-12\">"+detalle+"</p>";
                        $('#detalles').append(div);
                        div = "<p></p>"+
                                    "<p class=\"text-rb text-14 pull-right\">$ "+monto+"</p>";
                        $('#montos').append(div);
                    }
                    descripcion = data.impuesto[0].descripcion;
                    detalle = data.impuesto[0].detalle;
                    monto = '$ '+data.impuesto[0].monto;
                    descripcions = data.subtotal[0].descripcion;
                    detalles = data.subtotal[0].detalle;
                    montos = '$ '+data.subtotal[0].monto;
                    var total = '$ '+data.total;
                    $('#subtotal').html(descripcions);
                    $('#montosub').html(montos);
                    $('#impuesto').html(descripcion);
                    $('#montoimp').html(monto);
                    $('#total').html(total);
                    params = {
                        act: 'getFormapago',
                    }

                    $.ajax({
                        async:true,   
                        cache:false, 
                        dataType: 'json',
                        type: 'GET',  
                        url: SERVER+'getFormapago',
                        data: params,
                        success:  function(data){ 
                            if (data.success==true){
                                var div = "";
                                var id = "";
                                var nombre = "";
                                $('#forma_pago').empty();
                                for(i=0;i<data.data.length;i++){  
                                    div = "";
                                    id = data.data[i].id;
                                    nombre = data.data[i].nombre;
                                    if (i==0){
                                        div = "<div class=\"col-md-12\" style=\"padding-left: 30px;\">";
                                    }else{
                                        div = "<div class=\"col-md-12\" style=\"padding-left: 30px;margin-top: 10px;\">";
                                    }
                                    div = div + "<a href=\"javascript:sel_pago("+id+")\"><img src=\"../img/check2.png\" id=\"imgch_"+id+"\"></a><span class=\"text-rr text-12\" style=\"margin-left: 2%;\">"+nombre+"</span></div>";
                                    $('#forma_pago').append(div);
                                }
                                $('#panPlan').modal('show');
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
            },
            beforeSend:function(){},
            error:function(objXMLHttpRequest){}
        });
        
    }

    function EliminarPal(id){
        $('#div_'+id).remove();
    }

	function categoria(){
		params = {
        	act: 'getCategorias',
    	}

	    $.ajax({
	        async:true,   
	        cache:false, 
	        dataType: 'json',
	        type: 'POST',  
	        url: '../modelo/pagina.php',
	        data: params,
	        success:  function(data){ 
	            if (data.success==true){
	                $("#categorias").empty();
	                $("#categorias").append("<option value=\"0\">Seleccione</option>");
	                var i = 0;
	                for(i=0;i<parseInt(data.data.length);i++){
	                    id = data.data[i].id;
	                    nombre = data.data[i].nombre;
                        if (id_categoria==id){
                            $("#categorias").append("<option value=\""+id+"\" selected>"+nombre+"</option>");
                        }else{
	                       $("#categorias").append("<option value=\""+id+"\">"+nombre+"</option>");
                        }
	                }                
	                $('#subcat1').attr('disabled',true);
	                $('#subcat2').attr('disabled', true);
	                $('#subcat3').attr('disabled',true);                    
                    loadToSubCategories();
	            }else{
	                if (data.mensaje=='datos_incorrectos'){
	                    showAlert('En estos momentos no podemos procesar su petición...Intente mas tarde', 'Error de comunicación', 0); 
	                }
	            }
	        },
	        beforeSend:function(){},
	        error:function(objXMLHttpRequest){}
	    });
		$('#panCategorias').modal('show');
	}

    function loadToSubCategories(){
        if (arrSubCat.length>=1){
            var id = $('#categorias').val();
            if (id==0){
                $("#subcat1").empty();
                $("#subcat2").empty();
                $("#subcat3").empty();
                $("#subcat1").attr('disabled',true);
                $("#subcat2").attr('disabled',true);
                $("#subcat3").attr('disabled',true);
                $("#subcat1").append("<option value=\"0\">Seleccione</option>");
                $("#subcat2").append("<option value=\"0\">Seleccione</option>");
                $("#subcat3").append("<option value=\"0\">Seleccione</option>");
            }else{
                params = {
                    act: 'getSubcategorias',
                    nivel: 1,
                    valornivelpadre: $('#categorias').val()
                }

                $.ajax({
                    async:true,   
                    cache:false, 
                    dataType: 'json',
                    type: 'POST',  
                    url: '../modelo/pagina.php',
                    data: params,
                    success:  function(data){ 
                        if (data.success==true){
                            $("#subcat1").empty();
                            $("#subcat1").append("<option value=\"0\">Seleccione</option>");
                            $("#subcat1").attr('disabled',false);

                            var i = 0;
                            for(i=0;i<parseInt(data.data.length);i++){
                                id = data.data[i].id;
                                nombre = data.data[i].nombre;
                                if (arrSubCat[0]==id){
                                    $("#subcat1").append("<option value=\""+id+"\" selected>"+nombre+"</option>");
                                }else{
                                    $("#subcat1").append("<option value=\""+id+"\">"+nombre+"</option>");
                                }
                            }                
                            $("#subcat2").attr('disabled',true);
                            $("#subcat3").attr('disabled',true);
                            if (arrSubCat.length>=2){
                                var id = $('#subcat1').val(); 
                                if (id==0){
                                    $("#subcat2").empty();
                                    $("#subcat3").empty();
                                    $("#subcat2").attr('disabled',true);
                                    $("#subcat3").attr('disabled',true);
                                    $("#subcat2").append("<option value=\"0\">Seleccione</option>");
                                    $("#subcat3").append("<option value=\"0\">Seleccione</option>");
                                }else{
                                    params = {
                                        act: 'getSubcategorias',
                                        nivel: 2,
                                        valornivelpadre: $('#subcat1').val()
                                    }

                                    $.ajax({
                                        async:true,   
                                        cache:false, 
                                        dataType: 'json',
                                        type: 'POST',  
                                        url: '../modelo/pagina.php',
                                        data: params,
                                        success:  function(data){ 
                                            if (data.success==true){
                                                if (data.data.length>0){
                                                    $("#subcat2").empty();
                                                    $("#subcat2").append("<option value=\"0\">Seleccione</option>");
                                                    $("#subcat2").attr('disabled',false);
                                                    var i = 0;
                                                    for(i=0;i<parseInt(data.data.length);i++){
                                                        id = data.data[i].id;
                                                        nombre = data.data[i].nombre;
                                                        if (arrSubCat[1]==id){
                                                            $("#subcat2").append("<option value=\""+id+"\" selected>"+nombre+"</option>");
                                                        }else{
                                                            $("#subcat2").append("<option value=\""+id+"\">"+nombre+"</option>");
                                                        }
                                                    } 
                                                    $("#subcat3").attr('disabled',true);
                                                    if (arrSubCat.length>=3){
                                                        var id = $('#subcat2').val();
                                                        if (id==0){
                                                            $("#subcat3").empty();
                                                            $("#subcat3").attr('disabled',true);
                                                            $("#subcat2").append("<option value=\"0\">Seleccione</option>");
                                                        }else{
                                                            params = {
                                                                act: 'getSubcategorias',
                                                                nivel: 3,
                                                                valornivelpadre: $('#subcat2').val()
                                                            }

                                                            $.ajax({
                                                                async:true,   
                                                                cache:false, 
                                                                dataType: 'json',
                                                                type: 'POST',  
                                                                url: '../modelo/pagina.php',
                                                                data: params,
                                                                success:  function(data){ 
                                                                    if (data.success==true){
                                                                        $("#subcat3").empty();
                                                                        if (data.data.length>0){
                                                                            $("#subcat3").attr('disabled',false);
                                                                            $("#subcat3").append("<option value=\"0\">Seleccione</option>");
                                                                            var i = 0;
                                                                            for(i=0;i<parseInt(data.data.length);i++){
                                                                                id = data.data[i].id;
                                                                                nombre = data.data[i].nombre;
                                                                                if (arrSubCat[2]==id){
                                                                                    $("#subcat3").append("<option value=\""+id+"\" selected>"+nombre+"</option>");
                                                                                }else{
                                                                                    $("#subcat3").append("<option value=\""+id+"\">"+nombre+"</option>");
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

        }
    }

	function logo(){

		$('#panLogo').modal('show');
	}

	function portada(){
		$('#panPortada').modal('show');
	}

	function informacion(){
        ajax_start();
        var params = {
            act: 'getPagina',
            pagina: $('#idnegocio').val()
        }

        $.ajax({
            async:false,   
            cache:false, 
            dataType: 'json',
            type: 'POST',  
            url: '../modelo/actividad.php',
            data: params,
            success:  function(data){ 
                if (data.success==true){
                    $('#nombrep').val(data.data[0].nombre);
                    $('#actividad').val(data.data[0].actividad);
                    $('#email').val(data.data[0].email);
                    $('#sitio').val(data.data[0].sitioweb);
                    $('#ciudad').val(data.data[0].ciudad);
                    $('#ubicacion').val('Lat: '+data.data[0].latitud+' - Lon: '+data.data[0].longitud);
                    $('#ubicacion').removeClass('maps-mas');
                    $('#lat').val(data.data[0].latitud);
                    $('#lon').val(data.data[0].longitud);
                    $('#telefono').val(data.data[0].telefono);
                    $('#direccion').val(data.data[0].direccion);
                    $('#dias_s').empty();
                    $('#hora_s').empty();
                    $('#horc_s').empty();
                    var str = data.data[0].palclaves;
                    var res = str.split(",");
                    palabra = "";
                    for(i=0;i<res.length;i++){
                        //palabra = palabra + "<div style=\"display:inline-block; border:1px solid #434142;text-align: center;padding-left: 10px;color:#434142;margin-left:5px;margin-top:3px;\" id=\"div_"+i+"\"><a href=\"javascript:EliminarPal("+i+");\"> " + res[i] + " <strong style=\" color:#434142;margin-left:10px;\"> x </strong></a>&nbsp;&nbsp;&nbsp;</div>";
                        if (i==0){
                            palabra = palabra + "<div class=\"text-rr text-12 label-cust\" style=\"margin-top:3px;\" onclick=\"javascript:EliminarPal('"+i+"')\" id=\"div_"+i+"\">"+res[i]+
                                        "<span style=\"margin-left: 10px;display: inline-block;\">"+
                                            "<img src=\"../img/equis2.png\">"+
                                        "</span>"+
                                    "</div>";
                        }else{
                            palabra = palabra + "<div class=\"text-rr text-12 label-cust\" style=\"margin-left:3px;margin-top:3px;\" onclick=\"javascript:EliminarPal('"+i+"')\" id=\"div_"+i+"\">"+res[i]+
                                        "<span style=\"margin-left: 10px;display: inline-block;\">"+
                                            "<img src=\"../img/equis2.png\">"+
                                        "</span>"+
                                    "</div>";                            
                        }
                    }
                    $('#palabras').html(palabra);
                    $('#txtHorarios').empty();
                    $('#dias_s').empty();
                    $('#hora_s').empty();
                    $('#horc_s').empty();
                    for(i=0;i<data.data[0].horarios.length;i++){
                        sw = "<div class\"row text-rr text-12\" id=\"divd_"+i+"\">"+data.data[0].horarios[i].dias2+'</div>';
                        $('#dias_s').append(sw);
                        sw = "<div class\"row text-rr text-12\" id=\"diva_"+i+"\">"+data.data[0].horarios[i].horainicio+'</div>';
                        $('#hora_s').append(sw);
                        sw = "<div class\"row text-rr text-12\" id=\"divc_"+i+"\">"+data.data[0].horarios[i].horafin+'</div>';
                        $('#horc_s').append(sw);
                        var hor = data.data[0].horarios[i].dias2 + " De " + data.data[0].horarios[i].horainicio + " a " + data.data[0].horarios[i].horafin;
                        var div_l = "<p class=\"puntero\" id=\"pal_"+i+"\"><div class=\"text-rr text-12 label-cust\" onclick=\"javascript:deletePal('"+i+"')\" id=\"divp_"+i+"\">"+hor+
                                        "<span style=\"margin-left: 10px;display: inline-block;\">"+
                                            "<img src=\"../img/equis2.png\">"+
                                        "</span>"+
                                    "</div>";
                        $('#txtHorarios').append(div_l);
                        
                    }
                    var idProv = data.data[0].provincia;
                    params = {
                        act: 'getProvincias',
                    }

                    $.ajax({
                        async:true,   
                        cache:false, 
                        dataType: 'json',
                        type: 'POST',  
                        url: '../modelo/pagina.php',
                        data: params,
                        success:  function(data){ 
                            if (data.success==true){
                                $("#provincias").empty();
                                var i = 0;
                                for(i=0;i<parseInt(data.data.length);i++){
                                    id = data.data[i].id;
                                    nombre = data.data[i].nombre;
                                    if (nombre==idProv){
                                        $("#provincias").append("<option value=\""+id+"\" selected>"+nombre+"</option>");
                                    }else{
                                        $("#provincias").append("<option value=\""+id+"\">"+nombre+"</option>");
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
                    $('#panInformacion').modal('show');
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

	function opiniones(){
        params = {
            idpagina: $('#id_negocios').val(),
        }
        $.ajax({
            async:true,   
            cache:false, 
            dataType: 'json',
            type: 'GET',  
            url: SERVER+'getOpiniones',
            data: params,
            success:  function(data){ 
                if (data.success==true){
                    if (data.data.length<1){
                        $('#remOpinion').html('Tienes 0 opiniones de tu pagina');
                    }
                    if (data.promediopuntaje==null){
                        $('#puntaje').html(data.promediopuntaje);
                        $('#coments').html('Basado en '+data.cantpiniones+' comentarios');
                        div = "<img src=\"../img/estrellap.png\" style=\"margin-left: 1%;\"><img src=\"../img/estrellap.png\" style=\"margin-left: 0.5%;\"><img src=\"../img/estrellap.png\" style=\"margin-left: 0.5%;\"><img src=\"../img/estrellap.png\" style=\"margin-left: 0.5%;\"><img src=\"../img/estrellap.png\" style=\"margin-left: 0.5%;\">";
                        $('#estrellas').html(div);
                    }else{
                        $('#puntaje').html(data.promediopuntaje);
                        $('#coments').html('Basado en '+data.cantpiniones+' comentarios');
                        var num = Math.round(parseFloat(data.promediopuntaje));
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
                        var datos = "";
                        var puntos = 0;
                        var opi = "";
                        div= "";
                        for(i=0;i<data.data.length;i++){
                            datos = data.data[i].nombre + ' ' + data.data[i].apellido;
                            puntos = parseInt(data.data[i].puntaje);
                            opi = data.data[i].texto;
                            div = div + "<div class=\"row\" style=\"margin-top: 15px;padding-bottom:10px;text-align: left !important;\">"+
                                            "<div class=\"col-md-12 col-lg-12\">"+
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
                                            "</div>"+
                                            "</div>";
                            }else{
                                div = div + "</p>"+
                                            "<p class=\"text-rr text-2\" style=\"text-align: justify;\">"+opi+"</p>"+
                                            "</div>"+
                                            "</div>"+
                                            "<div class=\"row text-center\" style=\"\">"+
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

		$('#panOpiniones').modal('show');
	}

//Al presionar el boton de imagenes se dispara esta funcion
	function galeria(){
        ajax_start();
        $('#caja').empty();//Se vacia la caja
        params = {
            act: 'getMaxFotos2',
            id_negocio: $('#id_negocios').val(),
        }
        $.ajax({
            async:true,   
            cache:false, 
            dataType: 'json',
            type: 'POST',  
            url: '../modelo/pagina.php',
            data: params,
            success:  function(data){ 
                if (data.success==true){
                    var cantidad = data.data[0].cantmaxfotos;
                    var ndiv = 0;
                    var div = "";
                    for(i=1;i<=parseInt(cantidad);i++){
                        //Primero se crea la caja y luego se le anexa el div
                        if (i==1){
                            ndiv = ndiv + 1;
                            div = "<div class=\"row visible-lg\" style=\"margin-top: 2%;\">"+
                                  "<div class=\"col-md-12 col-lg-12\" id=\"ndiv_"+ndiv+"\">"+
                                  "</div>"+
                                  "</div>";
                            $('#caja').append(div);//introducimos la caja
                            div = "<a href=\"javascript:addFoto("+i+")\"><img src=\"../img/cuadro-imgb.png\" class=\"thumb\" style=\"display: inline-block;\" id=\"img_"+i+"\"></a>";
                            $('#ndiv_'+ndiv).append(div);//Luego almacenamos el nuevo div dentro de la caja
                        }else{
                            if ((i%7)==0){
                                ndiv = ndiv + 1;
                                div = "<div class=\"row visible-lg\" style=\"margin-top: 1%;\">"+
                                        "<div class=\"col-md-12 col-lg-12\" id=\"ndiv_"+ndiv+"\">"+
                                        "</div>"+
                                        "</div>";
                                $('#caja').append(div);
                                div = "<a href=\"javascript:addFoto("+i+")\"><img src=\"../img/cuadro-imgb.png\" class=\"thumb\" style=\"display: inline-block;\" id=\"img_"+i+"\"></a>";
                                $('#ndiv_'+ndiv).append(div);
                            }else{
                                div = "<a href=\"javascript:addFoto("+i+")\"><img src=\"../img/cuadro-imgb.png\" class=\"thumb\" style=\"display: inline-block;margin-left: 7px;\" id=\"img_"+i+"\"></a>";
                                $('#ndiv_'+ndiv).append(div);
                            }
                        }

                    }
                    var tira = "Hasta "+cantidad+" Fotos";
                    $('#totFotos').html(tira);
                    $('#cantFotos').val(cantidad);
                }else{
                    if (data.mensaje=='datos_incorrectos'){
                        showAlert('En estos momentos no podemos procesar su petición...Intente mas tarde', 'Error de comunicación', 0); 
                    }
                }
            },
            beforeSend:function(){},
            error:function(objXMLHttpRequest){}
        });
        //Fin de la primera peticion
        var params = {
            act: 'getImagenes',
            pagina: $('#idnegocio').val()
        }

        $.ajax({
            async:false,   
            cache:false, 
            dataType: 'json',
            type: 'POST',  
            url: '../modelo/actividad.php',
            data: params,
            success:  function(data){ 
                if (data.success==true){
                    alert("Todo salio bien");
                    var toti = data.data.length-1;
                    for(i=0;i<data.data.length;i++){
                        var id = data.data[i].id;
                        var img = decodeURIComponent(data.data[i].rutarchivo);
                        $('#img_'+ (i+1)).attr('src','data:image/png;base64,'+img);
                    }
                    
                }else{
                    if (data.mensaje=='datos_incorrectos'){
                        showAlert('En estos momentos no podemos procesar su petición...Intente mas tarde', 'Error de comunicación', 0); 
                    }
                }
                ajax_stop();
            },
            beforeSend:function(){},
            error:function(objXMLHttpRequest){}
        });//Fin de la segunda peticion
        ajax_stop();
        $('#panGaleria').modal('show');
	}//Fin de la funcion

	function ofertas(){
        ajax_start();
        var params = {
            idpagina: $('#idnegocio').val()
        }
        $.ajax({
            async:false,   
            cache:false, 
            dataType: 'json',
            type: 'GET',  
            url: SERVER+'getEventos',
            data: params,
            success:  function(data){ 
                if (data.success==true){
                    var aux = 0;
                    var div = "";
                    $('#verEvents').empty();
                    div = "<div class=\"row\">"+
                                "<div class=\"col-md-12 col-lg-12 text-rbo text-16\">"+
                                    "OFERTAS/EVENTOS"+
                                "</div>"+
                          "</div>";
                     $('#verEvents').append(div);
                    for(i=0;i<data.data.length;i++){
                        var id = data.data[i].idevento;
                        var nombre = data.data[i].nombre;
                        var descripcion = data.data[i].descripcion;
                        var url = data.data[i].url;
                        var foto = 'data:image/png;base64,'+data.data[i].foto;
                        var fechainicio = data.data[i].fechainicio;
                        var horainicio = convertTo12Hour(data.data[i].horainicio);
                        var fechafin = data.data[i].fechafin;
                        var horafin = data.data[i].horafin;
                        var lugar = data.data[i].lugar;
                        var rango = fechainicio + ' - ' + fechafin;
                        arrEvents[i] = {
                            id: id, 
                            nombre: nombre, 
                            descripcion: descripcion, 
                            url: url,
                            foto: foto,
                            fechainicio: fechainicio,
                            horainicio: horainicio,
                            fechafin: fechafin,
                            horafin: horafin,
                            lugar: lugar
                        }
                        if (i==0){
                            div = "<div class=\"row\" style=\"margin-top: 30px;\">"+
                                        "<div class=\"col-md-6 col-lg-6 eventb\" data-lleno=\"1\" id=\"div_lf"+i+"\"></div>"+
                                        "<div class=\"col-md-6 col-lg-6 eventb\" data-lleno=\"0\" id=\"div_lr"+i+"\"></div>"+
                                  "</div>";
                            $('#verEvents').append(div);
                            div = "<div style=\"display: inline-block;\">"+
                                        "<img src=\""+foto+"\" style=\"height:82px; width:82px;\">"+
                                  "</div>"+
                                  "<div class=\"media-middle\" style=\"display: inline-block;margin-left: 10px;\">"+
                                        "<p class=\"text-rr text-12\">"+nombre+"</p>"+
                                        "<p class=\"text-rr text-10\" style=\"margin-bottom: 0px;\">"+rango+"</p>"+
                                        "<p class=\"text-rr text-10\">"+lugar+"</p>"+
                                  "</div>"+
                                  "<div class=\"media-middle\" style=\"display: inline-block;\">"+
                                        "<div class=\"btn-group\">"+
                                            //"<button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">"+
                                                "<img class=\"dropdown-toggle\" data-toggle=\"dropdown\" src=\"../img/calendario3.png\" style=\"margin-left: 88%;\">"+
                                            //"</button>"+
                                            "<ul class=\"dropdown-menu\">"+
                                                "<li><a href=\"javascript:editar("+i+");\">Editar</a></li>"+
                                                "<li><a href=\"javascript:eliminar("+i+")\">Eliminar</a></li>"+
                                            "</ul>"+
                                        "</div>"+
                                  "</div>"+
                                  "<div style=\"border-bottom: 1px solid #d8d9de;margin-top: 15px;\"></div>";
                            $('#div_lf'+i).append(div);
                            aux = i;
                        }else{
                            if (((i)%2)==0){
                                div = "<div class=\"row\" style=\"margin-top: 30px;\">"+
                                            "<div class=\"col-md-6 col-lg-6 eventb\" data-lleno=\"1\" id=\"div_lf"+i+"\"></div>"+
                                            "<div class=\"col-md-6 col-lg-6 eventb\" data-lleno=\"0\" id=\"div_lr"+i+"\"></div>"+
                                      "</div>";
                                $('#verEvents').append(div);
                                div = "<div style=\"display: inline-block;\">"+
                                            "<img src=\""+foto+"\" style=\"height:82px; width:82px;\">"+
                                      "</div>"+
                                      "<div class=\"media-middle\" style=\"display: inline-block;margin-left: 10px;\">"+
                                            "<p class=\"text-rr text-12\">"+nombre+"</p>"+
                                            "<p class=\"text-rr text-10\" style=\"margin-bottom: 0px;\">"+rango+"</p>"+
                                            "<p class=\"text-rr text-10\">"+lugar+"</p>"+
                                      "</div>"+
                                      "<div class=\"media-middle\" style=\"display: inline-block;\">"+
                                        "<div class=\"btn-group\">"+
                                            //"<button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">"+
                                                "<img class=\"dropdown-toggle\" data-toggle=\"dropdown\" src=\"../img/calendario3.png\" style=\"margin-left: 88%;\">"+
                                            //"</button>"+
                                            "<ul class=\"dropdown-menu\">"+
                                                "<li><a href=\"javascript:editar("+i+");\">Editar</a></li>"+
                                                "<li><a href=\"javascript:eliminar("+i+")\">Eliminar</a></li>"+
                                            "</ul>"+
                                        "</div>"+
                                      "</div>"+
                                      "<div style=\"border-bottom: 1px solid #d8d9de;margin-top: 15px;\"></div>";
                                $('#div_lf'+i).append(div);
                                aux = i;
                            }else{
                                div = "<div style=\"display: inline-block;\">"+
                                            "<img src=\""+foto+"\" style=\"height:82px; width:82px;\">"+
                                      "</div>"+
                                      "<div class=\"media-middle\" style=\"display: inline-block;margin-left: 10px;\">"+
                                            "<p class=\"text-rr text-12\">"+nombre+"</p>"+
                                            "<p class=\"text-rr text-10\" style=\"margin-bottom: 0px;\">"+rango+"</p>"+
                                            "<p class=\"text-rr text-10\">"+lugar+"</p>"+
                                      "</div>"+
                                      "<div class=\"media-middle\" style=\"display: inline-block;\">"+
                                        "<div class=\"btn-group\">"+
                                            //"<button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">"+
                                                "<img class=\"dropdown-toggle\" data-toggle=\"dropdown\" src=\"../img/calendario3.png\" style=\"margin-left: 88%;\">"+
                                            //"</button>"+
                                            "<ul class=\"dropdown-menu\">"+
                                                "<li><a href=\"javascript:editar("+i+");\">Editar</a></li>"+
                                                "<li><a href=\"javascript:eliminar("+i+")\">Eliminar</a></li>"+
                                            "</ul>"+
                                        "</div>"+
                                      "</div>"+
                                      "<div style=\"border-bottom: 1px solid #d8d9de;margin-top: 15px;\"></div>";
                                $('#div_lr'+aux).append(div);
                                $('#div_lr'+aux).data('lleno', '1');
                            }
                        }
                    }
                    ajax_stop();
                }else{
                    ajax_stop();
                    if (data.mensaje=='datos_incorrectos'){
                        showAlert('En estos momentos no podemos procesar su petición...Intente mas tarde', 'Error de comunicación', 0); 
                    }
                }
                ajax_stop();
            },
            beforeSend:function(){},
            error:function(objXMLHttpRequest){}
        });
		$('#panShowEvent').modal('show');
	}

    function ajax_start(){
        $body = $("body");
        $body.addClass("loading");
    }

    function clogo(){
        window.open('../vista/fotos.php?cantidad=1&donde=0&seccion=editar_logo',"popup","menubar=no,toolbar=no,scrollbars=yes,width=645,height=420,left=50,top=50,location=no,resizable=yes");
    }

    function iportada(){
        window.open('../vista/fotos.php?cantidad=1&donde=0&seccion=editar_portada',"popup","menubar=no,toolbar=no,scrollbars=yes,width=645,height=420,left=50,top=50,location=no,resizable=yes");
    }

    function ajax_stop(){
        $body = $("body");
        $body.removeClass("loading");
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
                    $('#panCategorias').modal('hide');
                }
                if (Donde==2){
                    $('#panLogo').modal('hide');
                }
                if (Donde==3){
                    $('#panPortada').modal('hide');
                }
                if (Donde==4){
                    $('#nombre').focus();
                }
                if (Donde==5){
                    $('#actividad').focus();
                }
                if (Donde==6){
                    $('#txtPalabras').focus();
                }
                if (Donde==7){
                    $('#email').focus();
                }
                if (Donde==8){
                    $('#telefono').focus();
                }
                if (Donde==9){
                    $('#ciudad').focus();
                }
                if (Donde==10){
                    $('#direccion').focus();
                }
                if (Donde==11){
                    $('#panInformacion').modal('hide');
                }
                if (Donde==12){
                    $('#panGaleria').modal('hide');
                }
                if (Donde==13){
                    $(location).attr('href','nopagina.php');
                }
                if (Donde==14){
                   $('#panPlan').modal('hide');
                }
                if (Donde==15){
                   rePaint('1');
                }
            }
        });
    }

    function dias(valor){
        miValor = valor.replace('Lunes','1');
        miValor = miValor.replace('Martes','2');
        miValor = miValor.replace('Miércoles','3');
        miValor = miValor.replace('Jueves','4');
        miValor = miValor.replace('Viernes','5');
        miValor = miValor.replace('Sábado','6');
        miValor = miValor.replace('Domingo','7');
        miValor = miValor.replace('Todos los Días','1,2,3,4,5,6,7');
        return miValor;
    }

    function hora(valor){
        if (valor=='Abierto las 24 Horas'){
            return '*****';
        }else{
            return valor;
        }
    }

    function addFoto(id){
        var cantidad = $('#cantFotos').val();
        var aux = parseInt(id);
        var src = $('#img_'+id).attr('src');        
        if (src=='../img/cuadro-imgb.png'){
            if (parseInt(id)==1){
                cant = cantidad;
            }else{
                var cant = parseInt(cantidad) - id + 1;
            }            
            window.open('../vista/fotos.php?cantidad='+cant+'&donde='+id+'&seccion=galeria',"popup","menubar=no,toolbar=no,scrollbars=yes,width=645,height=420,left=50,top=50,location=no,resizable=yes");
        }else{
            if (confirm('Desea eliminar la foto seleccionada')==true){
                $('#img_'+id).attr('src','../img/cuadro-imgb.png');
                for(i=parseInt(id)+1;i<=cantidad;i++){
                    src = $('#img_'+i).attr('src');        
                    if (src!='../img/cuadro-imgb.png'){
                        $('#img_'+aux).attr('src',src);
                        $('#img_'+i).attr('src','../img/cuadro-imgb.png');
                        aux = i;
                    }
                }
            }
        }
    }

    function showConfirm(Message, Title, Donde){
        BootstrapDialog.show({
            message: Message,
            type: BootstrapDialog.TYPE_DANGER,
            title: Title,
            closable: false,
            buttons: [{
                label: 'Si',
                cssClass: 'btn-success',
                action: function(dialogRef){
                    switch(Donde){
                        case 1:
                            dialogRef.close();
                            ajax_start();
                            var params = {
                                act: 'elimPagina',
                                idpagina: $('#idnegocio').val(),
                            }
                            $.ajax({
                                async:true,   
                                cache:false, 
                                dataType: 'json',
                                type: 'POST',  
                                url: '../modelo/pagina.php',
                                data: params,
                                success:  function(data){ 
                                    if (data.success==true){
                                        showAlert('La página se elimino con éxito', 'Operación Exitosa', 13); 
                                    }else{
                                        showAlert('En estos momentos no podemos procesar su petición...Intente mas tarde', 'Error de comunicación', 0); 
                                    }
                                    ajax_stop();
                                },
                                beforeSend:function(){},
                                error:function(objXMLHttpRequest){}
                            });
                        break; 
                        case 2:
                            dialogRef.close();
                            ajax_start();
                            var params = {
                                idevento: arrEvents[parseInt($('#cual').val())].id,
                            }
                            $.ajax({
                                async:true,   
                                cache:false, 
                                dataType: 'json',
                                type: 'GET',  
                                url: SERVER+'elimEvento',
                                data: params,
                                success:  function(data){ 
                                    if (data.success==true){
                                        showAlert('El elemento se elimino con éxito', 'Operación Exitosa', 15); 
                                    }else{
                                        showAlert('En estos momentos no podemos procesar su petición...Intente mas tarde', 'Error de comunicación', 0); 
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
                label: 'No',
                cssClass: 'btn-warning',
                action: function(dialogRef){
                    dialogRef.close();
                }
            }],
            onhidden: function(dialogRef){
                              
            }
        });
    }

    function ajax_start2(){
        $div = $(".modal-content");
        $div.addClass("loading2");
    }

    function ajax_stop2(){
        $div = $(".modal-content");
        $div.removeClass("loading2");
    }

    function deletePal(id){
        $('#pal_'+id).remove();
        $('#divp_'+id).remove();
        $('#divd_'+id).remove();
        $('#diva_'+id).remove();
        $('#divc_'+id).remove();
    }

    function sel_pago(id){
        src = $('#imgch_'+id).attr('src'); // "static/images/banner/blue.jpg"
        tarr = src.split('/');      // ["static","images","banner","blue.jpg"]
        file = tarr[tarr.length-1]; // "blue.jpg"
        if (file=='check2.png'){
            $('#imgch_'+id).attr('src', '../img/check2_sel.png');
            ajustar(id);
        }else{
            $('#imgch_'+id).attr('src', '../img/check2.png');
        }
    }

    function ajustar(id){
        $("#forma_pago img").each(function (index){ 
            src = $(this).attr('src'); // "static/images/banner/blue.jpg"
            tarr = src.split('/');      // ["static","images","banner","blue.jpg"]
            file = tarr[tarr.length-1]; // "blue.jpg"
            if (file=='check2_sel.png' && $(this).attr('id')!= ("imgch_"+id)){ 
                $(this).attr('src', '../img/check2.png');
            }   
        });
    }

    function msDown(id){
        $('#cual').val(id);
        doStuff();
    }

    function msUp(){
        //clearTimeout( timer );
    }

    function doStuff() {
        $body = $('.modal-content');
        $body.addClass("loading3");
    }

    function editar(id){
        $('#cual').val(id);
        $('#tarea').val('2');
        var i = parseInt($('#cual').val());
        var id = arrEvents[i].id;
        var nombre = arrEvents[i].nombre;
        var descripcion = arrEvents[i].descripcion;
        var url = arrEvents[i].url;
        var foto = arrEvents[i].foto;
        var fechainicio = arrEvents[i].fechainicio;
        var horainicio = arrEvents[i].horainicio;
        var fechafin = arrEvents[i].fechafin;
        var horafin = arrEvents[i].horafin;
        var lugar = arrEvents[i].lugar;
        var rango = fechainicio + ' - ' + fechafin;
        $('#paintEvent').attr('src',foto);
        $('#nombre').val(nombre);
        $('#lugar').val(lugar);
        $('#fecini').val(fecha_get(fechainicio));
        $('#horini').val(horainicio);
        $('#fecfin').val(fecha_get(fechafin));
        $('#horfin').val(horafin);
        $('#url').val(url);
        $('#descripcion').val(descripcion);
        $('#panOfertas').modal('show');
    }

    function eliminar(id){
        $('#cual').val(id);
        showConfirm('Esta seguro de eliminar el evento','Louuper.com', 2);
    }

    function salir(){
        $body = $('.modal-content');
        $body.removeClass("loading3");
    }

    function rePaint(como){
        if (como=='1'){
            arrEvents.splice(parseInt($('#cual').val()),1);    
        }        
        ajax_start2()
        var aux = 0;
        var div = "";
        $('#verEvents').empty();
        div = "<div class=\"row\">"+
                    "<div class=\"col-md-12 col-lg-12 text-rbo text-16\">"+
                        "OFERTAS/EVENTOS"+
                    "</div>"+
              "</div>";
         $('#verEvents').append(div);
        for(i=0;i<arrEvents.length;i++){
            var id = arrEvents[i].id;
            var nombre = arrEvents[i].nombre;
            var descripcion = arrEvents[i].descripcion;
            var url = arrEvents[i].url;
            var foto = arrEvents[i].foto;
            var fechainicio = arrEvents[i].fechainicio;
            var horainicio = arrEvents[i].horainicio;
            var fechafin = arrEvents[i].fechafin;
            var horafin = arrEvents[i].horafin;
            var lugar = arrEvents[i].lugar;
            var rango = fechainicio + ' - ' + fechafin;
            if (i==0){
                div = "<div class=\"row\" style=\"margin-top: 30px;\">"+
                            "<div class=\"col-md-6 col-lg-6 eventb\" data-lleno=\"1\" id=\"div_lf"+i+"\"></div>"+
                            "<div class=\"col-md-6 col-lg-6 eventb\" data-lleno=\"0\" id=\"div_lr"+i+"\"></div>"+
                      "</div>";
                $('#verEvents').append(div);
                div = "<div style=\"display: inline-block;\">"+
                            "<img src=\""+foto+"\" style=\"height:82px; width:82px;\">"+
                      "</div>"+
                      "<div class=\"media-middle\" style=\"display: inline-block;margin-left: 10px;\">"+
                            "<p class=\"text-rr text-12\">"+nombre+"</p>"+
                            "<p class=\"text-rr text-10\" style=\"margin-bottom: 0px;\">"+rango+"</p>"+
                            "<p class=\"text-rr text-10\">"+lugar+"</p>"+
                      "</div>"+
                      "<div class=\"media-middle\" style=\"display: inline-block;\">"+
                            "<img src=\"../img/calendario3.png\" style=\"margin-left: 88%;\" onMouseDown=\"javascript:msDown("+i+");\" onMouseUp=\"javascript:msUp();\">"+
                      "</div>"+
                      "<div style=\"border-bottom: 1px solid #d8d9de;margin-top: 15px;\"></div>";
                $('#div_lf'+i).append(div);
                aux = i;
            }else{
                if (((i)%2)==0){
                    div = "<div class=\"row\" style=\"margin-top: 30px;\">"+
                                "<div class=\"col-md-6 col-lg-6 eventb\" data-lleno=\"1\" id=\"div_lf"+i+"\"></div>"+
                                "<div class=\"col-md-6 col-lg-6 eventb\" data-lleno=\"0\" id=\"div_lr"+i+"\"></div>"+
                          "</div>";
                    $('#verEvents').append(div);
                    div = "<div style=\"display: inline-block;\">"+
                                "<img src=\""+foto+"\" style=\"height:82px; width:82px;\">"+
                          "</div>"+
                          "<div class=\"media-middle\" style=\"display: inline-block;margin-left: 10px;\">"+
                                "<p class=\"text-rr text-12\">"+nombre+"</p>"+
                                "<p class=\"text-rr text-10\" style=\"margin-bottom: 0px;\">"+rango+"</p>"+
                                "<p class=\"text-rr text-10\">"+lugar+"</p>"+
                          "</div>"+
                          "<div class=\"media-middle\" style=\"display: inline-block;\">"+
                                "<img src=\"../img/calendario3.png\" style=\"margin-left: 88%;\" onMouseDown=\"javascript:msDown("+i+");\" onMouseUp=\"javascript:msUp();\">"+
                          "</div>"+
                          "<div style=\"border-bottom: 1px solid #d8d9de;margin-top: 15px;\"></div>";
                    $('#div_lf'+i).append(div);
                    aux = i;
                }else{
                    div = "<div style=\"display: inline-block;\">"+
                                "<img src=\""+foto+"\" style=\"height:82px; width:82px;\">"+
                          "</div>"+
                          "<div class=\"media-middle\" style=\"display: inline-block;margin-left: 10px;\">"+
                                "<p class=\"text-rr text-12\">"+nombre+"</p>"+
                                "<p class=\"text-rr text-10\" style=\"margin-bottom: 0px;\">"+rango+"</p>"+
                                "<p class=\"text-rr text-10\">"+lugar+"</p>"+
                          "</div>"+
                          "<div class=\"media-middle\" style=\"display: inline-block;\">"+
                                "<img src=\"../img/calendario3.png\" style=\"margin-left: 88%;\" onMouseDown=\"javascript:msDown("+i+");\" onMouseUp=\"javascript:msUp();\">"+
                          "</div>"+
                          "<div style=\"border-bottom: 1px solid #d8d9de;margin-top: 15px;\"></div>";
                    $('#div_lr'+aux).append(div);
                    $('#div_lr'+aux).data('lleno', '1');
                }
            }
        }
        ajax_stop2();
    }

    function resaltar(){
        params = {
            idpagina: $('#idnegocio').val()//Enviamos el id del negocio=466
        }

        $.ajax({
            async:true,   
            cache:false, 
            dataType: 'json',
            type: 'GET',  
            url: SERVER+'getPlanesResaltado',
            data: params,
            success:  function(data){ 
                if (data.success==true){
                    if (data.data.length>=1){
                        id_plan = data.data[0].idplan
                        if (data.data[0].planasociado==true){
                            $('#saveResaltar').text('Extender');
                        }else{
                            $('#saveResaltar').text('Contratar');
                        }
                    }
                    var fechaAc=parseInt($.now()/1000);
                    var formater=fecha_get(data.fechafin);
                    var seconds= new Date(data.fechafin).getTime()/1000;
                if (fechaAc>seconds) {
                  $('#txtPlanR').empty();
                    $('#totPlanR').empty();
                }else{
                 $('#txtPlanR').text(data.nombreplanasociado);
                 $('#totPlanR').prepend(fecha_get(data.fechafin));
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
        params = {
            act: 'getTextoResaltarPagina',
        }

        $.ajax({
            async:true,   
            cache:false, 
            dataType: 'json',
            type: 'POST',  
            url: '../modelo/pagina.php',
            data: params,
            success:  function(data){ 
                if (data.success==true){
                    $('#resaltar').html(data.data[0].texto);
                    $('#promo').html(data.data[0].textoresaltado);
                }else{
                    if (data.mensaje=='datos_incorrectos'){
                        showAlert('En estos momentos no podemos procesar su petición...Intente mas tarde', 'Error de comunicación', 0); 
                    }
                }
            },
            beforeSend:function(){},
            error:function(objXMLHttpRequest){}
        });         
        params = {
            act: 'getPlanes2',
        }

        $.ajax({
            async:true,   
            cache:false, 
            dataType: 'json',
            type: 'POST',  
            url: '../modelo/pagina.php',
            data: params,
            success:  function(data){ 
                if (data.success==true){
                    $('#planrel').empty();
                    $('#precio').empty();
                    $('#carac1').empty();
                    $('#carac1').empty();
                    var id_plan = data.data[0].idplan;
                    $('#planrel').html(data.data[0].nombreplan);
                    $('#precio').html("$ "+data.data[0].precio);
                    $('#carac1').append("<input type=\"hidden\" id=\"valplan\" value=\""+id_plan+"\">");
                    for(i=0;i<data.data[0].caracteristicas.length;i++){
                        if (i<3){
                            $('#carac1').append("<p class=\"text-rr text-12\" style=\"margin-bottom: 0px;\">• "+data.data[0].caracteristicas[i].nombre+"</p>");
                        }else{
                            $('#carac2').append("<p class=\"text-rr text-12\" style=\"margin-bottom: 0px;\">• "+data.data[0].caracteristicas[i].nombre+"</p>");
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
        $('#panResaltar').modal('show');
    }//Fin de la funcion