$(document).ready(function(){

    var params = {};
    $('#dias_s').hide();
    $('#hora_s').hide();
    $('#horc_s').hide();
    $("#subcat1").empty();
    $("#subcat2").empty();
    $("#subcat3").empty();
    $("#subcat1").append("<option value=\"0\">Seleccione</option>");
    $("#subcat2").append("<option value=\"0\">Seleccione</option>");
    $("#subcat3").append("<option value=\"0\">Seleccione</option>");

    $('#ddlCars').multiselect();

    $('#datetimepickere').datetimepicker({
        format: 'LT'
    });

    $('#datetimepickers').datetimepicker({
        format: 'LT'
    });

	var conexion = $('#conexion').val();
	
	if (conexion==1){
		$('#iniciar').html('Inicio');
	 	$('#registrar').html('Perfil');
        $('#verIni').hide();
	}

    $('#ubicacion').click(function(){
        var lat = $('#lat').val();
        var lon = $('#lon').val();
        if (lat==''){
            lat = '*****';
            lon = '*****';
        }
        window.open('gmail.php?lat='+lat+'&lon='+lon,"popup","menubar=no,toolbar=no,scrollbars=yes,width=645,height=550,left=50,top=50,location=no,resizable=yes");
    });

    params = {
        act: 'getPlanes',
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
                $("#planes").empty();
                var i = 0;
                var id_plan = $('#id_plan').val();
                for(i=0;i<parseInt(data.data.length);i++){
                    id = data.data[i].codigoplan;
                    nombre = data.data[i].nombreplan;
                    if (id_plan == id){
                        $("#planes").append("<option value=\""+id+"\" selected>"+nombre+"</option>");
                    }else{
                        $("#planes").append("<option value=\""+id+"\">"+nombre+"</option>");
                    }
                }
                if (id_plan==1){
                    $("#agentes").attr('disabled',true);
                    $("#ciclo").attr('disabled',true);
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
        act: 'getMaxTags',
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
                $('#tags').val(data.data[0].cantmaxtags);
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
        act: 'getMaxAgentes',
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
                $("#agentes").empty();
                var i = 0;
                for(i=0;i<parseInt(data.data[0].maxagentes);i++){
                    id = i + 1;
                    descripcion = id;
                    $("#agentes").append("<option value=\""+id+"\">"+descripcion+"</option>");
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




    $('#agentes').change(function(){
        var numope = $('#agentes').val();
        $('#numope').html('Has añadido '+numope+' Operador(es)');
    });






    params = {
        act: 'getCicloFact',
        ciclo_fac: $('#ciclo_fac').val(),
        id_plan: $('#id_plan').val(),
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
                $("#ciclo").empty();
                var i = 0;
                var ciclo_fac = $('#ciclo_fac').val();
                for(i=0;i<parseInt(data.data.length);i++){
                    id = data.data[i].idciclofact;
                    descripcion = data.data[i].descripcion;
                    if (ciclo_fac == id){
                        $("#ciclo").append("<option value=\""+id+"\" selected>"+descripcion+"</option>");
                    }else{
                        $("#ciclo").append("<option value=\""+id+"\">"+descripcion+"</option>");
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
                    $("#categorias").append("<option value=\""+id+"\">"+nombre+"</option>");
                }                
                $('#subcat1').attr('disabled',true);
                $('#subcat2').attr('disabled', true);
                $('#subcat3').attr('disabled',true);
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
                    $("#provincias").append("<option value=\""+id+"\">"+nombre+"</option>");
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
        act: 'getMaxFotos',
    }
    //Peticion para generar la caja de la galeria, la mayoria de las peticiones ajax se generan automaticamente al cargarse la pagina
    $.ajax({
        async:true,   
        cache:false, 
        dataType: 'json',
        type: 'POST',  
        url: '../modelo/pagina.php',
        data: params,
        success:  function(data){ 
            if (data.success==true){
                var cantidad = data.data[0].cantmaxfotos;//Almacenamos la cantidad de fotos
                var ndiv = 0;
                var div = "";
                for(i=1;i<=parseInt(cantidad);i++){
                    if (i==1){//Comienza el bucle para la primera imagen
                        ndiv = ndiv + 1;//ndiv=1
                        //Con esto comenzamos a autogenerar div's
                        div = "<div class=\"row visible-lg\" style=\"margin-top: 2%;\">"+
                              "<div class=\"col-md-12 col-lg-12\" style=\"padding-left: 7%;\" id=\"ndiv_"+ndiv+"\">"+
                              "</div>"+
                              "</div>";
                        $('#flg').append(div);//Introducimos la info en el div
                        div = "<a href=\"javascript:addFoto("+i+")\"><img src=\"../img/cuadro-imgb.png\" class=\"thumb\" style=\"display: inline-block;\" id=\"img_"+i+"\"></a>";
                        $('#ndiv_'+ndiv).append(div);//Asignamos la imagen vacia dentro del div
                    }else{
                        if ((i%7)==0){//Calculamos el resto
                            ndiv = ndiv + 1;
                            div = "<div class=\"row visible-lg\" style=\"margin-top: 4px;\">"+
                                    "<div class=\"col-md-12 col-lg-12 resto7\" style=\"padding-left: 7%;\" id=\"ndiv_"+ndiv+"\">"+
                                    "</div>"+
                                    "</div>";
                            $('#flg').append(div);
                            div = "<a href=\"javascript:addFoto("+i+")\"><img src=\"../img/cuadro-imgb.png\" class=\"thumb\" style=\"display: inline-block;\" id=\"img_"+i+"\"></a>";
                            $('#ndiv_'+ndiv).append(div);
                        }else{
                            div = "<a href=\"javascript:addFoto("+i+")\"><img src=\"../img/cuadro-imgb.png\" class=\"thumb\" style=\"display: inline-block;margin-left: 4px;\" id=\"img_"+i+"\"></a>";
                            $('#ndiv_'+ndiv).append(div);
                        }
                    }

                }
                var tira = "Hasta "+cantidad+" Fotos";
                $('#maxFotos').html(tira);
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

    //jdcadenas@gmail.com
    params = {
        act: 'getFormapago',
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
                var div = "";
                var id = "";
                var nombre = "";
                for(i=0;i<=data.data.length;i++){                    
                    div = "";
                    id = data.data[i].id;
                    nombre = data.data[i].nombre;
                    if (i==0){
                        div = "<div class=\"col-lg-12\" style=\"padding-left: 10%;\">";
                    }else{
                        div = "<div class=\"col-lg-12\" style=\"padding-left: 10%;margin-top: 1%;\">";
                    }
                    div = div + "<a href=\"javascript:sel_pago("+id+")\"><img src=\"../img/check2.png\" id=\"imgch_"+id+"\"></a><span class=\"text-rr text-12\" style=\"margin-left: 2%;\">"+nombre+"</span></div>";
                    $('#forma_pago').append(div);
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
        act: 'getTextoContacto',
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
                $('#linea1').html(data.data[0].linea1);
                $('#linea2').html(data.data[0].linea2);
                $('#linea3').html(data.data[0].linea3);
                $('#linea4').html(data.data[0].linea4);
            }else{
                if (data.mensaje=='datos_incorrectos'){
                    showAlert('En estos momentos no podemos procesar su petición...Intente mas tarde', 'Error de comunicación', 0); 
                }
            }
        },
        beforeSend:function(){},
        error:function(objXMLHttpRequest){}
    });         

    resumen();

    $('#planes').change(function(){
        params = {
            act: 'getCicloFact',
            id_plan: $('#planes').val(),
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
                    $("#ciclo").empty();
                    var i = 0;
                    var ciclo_fac = $('#ciclo_fac').val();
                    for(i=0;i<parseInt(data.data.length);i++){
                        id = data.data[i].idciclofact;
                        descripcion = data.data[i].descripcion;
                        //if (ciclo_fac == id){
                            $("#ciclo").append("<option value=\""+id+"\">"+descripcion+"</option>");
                        //}else{
                          //  $("#ciclo").append("<option value=\""+id+"\">"+descripcion+"</option>");
                        //}
                    }                
                    var id_plan =  $("#planes").val();
                    if (id_plan==1){
                        $('#agentes').val('1');
                        $("#agentes").attr('disabled',true);
                        $("#ciclo").attr('disabled',true);
                        $('#numope').html('Has añadido 1 Operador(es)');
                    }else{
                        $("#agentes").attr('disabled',false);
                        $("#ciclo").attr('disabled',false);            
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


    $('#actFactura').click(function(){
        var params = {
            act: 'actFacturaTemp',
            id_plan: $('#planes').val(),
            ciclo_fac: $('#ciclo').val(),
            agentes: $('#agentes').val(),
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
                    resumen();
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

    $('#check_res').click(function(){
        src = $('#check_res').attr('src'); 
        tarr = src.split('/');      
        file = tarr[tarr.length-1]; 
        if (file=='check2.png'){
            $('#check_res').attr('src','../img/check2_sel.png');
            params = {
                act: 'incNuevoPlan',
                id_plan: $('#valplan').val(),
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
                        resumen();
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
            $('#check_res').attr('src','../img/check2.png');
        }
    });

    function resumen(){
        params = {
            act: 'getResumen'
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
                        div = "<div class=\"row\">"+
                                    "<p class=\"text-rm text-12\" style=\"margin-bottom: 0px;padding-left:7%;\">"+descripcion+"</p>"+
                                    "<p class=\"text-rr text-12\" style=\"padding-left:7%;\">"+detalle+"</p>"+
                              "</div>";
                        $('#detalles').append(div);
                        div = "<div class=\"row\">"+
                                    "<p></p>"+
                                    "<p class=\"text-rb text-14 pull-right\">$ "+monto+"</p>"+
                              "</div>";
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
                    var actH = $('#izquierda').height();
                    $("#derecha").height(actH + 32);
                    $('.scroll-pane').jScrollPane();
                    $('.jspHorizontalBar').remove();
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
            //palabra = "<div style=\"display:inline-block; border:1px solid #434142;text-align: center;padding-left: 10px;color:#434142;\" id=\"div_"+numero+"\"><a href=\"javascript:EliminarPal("+numero+");\"> " + palabra + " <strong style=\" color:#434142;margin-left:10px;\"> x </strong></a>&nbsp;&nbsp;&nbsp;</div>";
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

    //therafael@hotmail.com
    //$("#mover").height() < $(window).height() &&                  
    var offset = $("#mover").offset();
    var topPadding = 100;
    $(window).scroll(function() {
        if ($(window).scrollTop() > offset.top){ /* LINEA MODIFICADA POR ALEX PARA NO ANIMAR SI EL SIDEBAR ES MAYOR AL TAMANO DE PANTALLA */
            if ($(window).scrollTop()<2200){
                $("#mover").stop().animate({
                    marginTop: $(window).scrollTop() - offset.top + topPadding
                });
            }    
        }else{
            $("#mover").stop().animate({
                marginTop: 0
            });
        }
    });     



    $('#inciars-pag').click(function(){
        if (conexion==1){
            $(location).attr('href','index.php');
        }else{
            $('#inicio').modal('show');
        }   
    });

	$('#iniciar').click(function(){
		if (conexion==1){
			$(location).attr('href','index.php');
		}else{
			$('#inicio').modal('show');
		}	
	});

    $('#registars-pag').click(function(){
        if (conexion==1){
            $(location).attr('href','chat.php');
        }else{
            $('#registrarte').modal('show');
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
                                alert(pagina);
                                if (pagina=='pagina'){
                                    $('#id_usuario').val(data.id);
                                    $('#conexion').val('1');
                                    $('#inicioi').html('Inicio');
                                    $('#perfil').html('Perfil');
                                    showAlert('El registro se llevó a cabo con éxito... Puede continuar con el proceso de publicación','Logueo exitoso',10);
                                }else{
                                    showAlert('El registro se llevó a cabo con éxito...Debe loguearse', 'Bienvenido', 9);
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
                                if (pagina=='pagina'){
                                    $('#id_usuario').val(data.id);
                                    $('#conexion').val('1');
                                    $('#inicioi').html('Inicio');
                                    $('#perfil').html('Perfil');
                                    showAlert('El logueo se llevó a cabo con éxito... Puede continuar con el proceso de publicación','Logueo exitoso',10);
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
                    if (Donde==8){
                        var params = {
                            act: 'setParams',
                            id: $('#id_pagina').val()
                        }

                        $.ajax({
                            async:true,   
                            cache:false, 
                            dataType: 'json',
                            type: 'POST',  
                            url: '../modelo/comun.php',
                            data: params,
                            success:  function(data){
                                var id = $('#id_pagina').val();
                                $(location).attr('href','../vista/veraccion.php?id='+id);
                                
                            },
                            beforeSend:function(){},
                            error:function(objXMLHttpRequest){}
                        });
                    }else{
                        dialogRef.close();
                    }
                }
            }],
            onhidden: function(dialogRef){
                if (Donde==1){
                    $('#nombre').focus();
                }
                if (Donde==2){
                    $('#actividad').focus();
                }
                if (Donde==3){
                    $('#txtPalabras').focus();
                }
                if (Donde==4){
                    $('#email').focus();
                }
                if (Donde==5){
                    $('#telefono').focus();
                }
                if (Donde==6){
                    $('#ciudad').focus();
                }
                if (Donde==7){
                    $('#direccion').focus();
                }
                if (Donde==9){
                    $(location).attr('href','../vista/index.php');
                }
                if (Donde==10){
                    $('#inicio').modal('hide');
                }
                if (Donde==11){
                     $('#registrarte').modal('hide');
                }
            }
        });
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
                    alert('a');
                }
            },{
                label: 'Cancelar',
                cssClass: 'btn-warning',
                action: function(dialogRef){
                    dialogRef.close();
                }
            }],
            onhidden: function(dialogRef){
                alert('c');
            }
        });
    }


    $('#logo').click(function(){
        var cantidad = '1';
        var src = $('#logo').attr('src');        
        if (src=='../img/cuadro-imgb.png'){
                cant = cantidad;
            window.open('../vista/fotos.php?cantidad='+cant+'&donde='+id+'&seccion=logo',"popup","menubar=no,toolbar=no,scrollbars=yes,width=645,height=420,left=50,top=50,location=no,resizable=yes");
        }else{
            if (confirm('Desea eliminar la foto seleccionada')==true){
                $('#logo').attr('src','../img/cuadro-imgb.png');
            }
        }
    });
//Punto en el cual se guarda la pagina
    $('#guardar').click(function(){
        var conexion = $('#conexion').val();
        var nombre = $('#nombrep').val();
        var sitio = $('#sitio').val();
        var actividad = $('#actividad').val();
        var logo = $('#logo').attr('src');
        $('#ver').val(logo);
        var idsubcategoria = '';
        if ($('#subcat3').attr('disabled')==false){
            idsubcategoria = $('#subcat3').val();
        }else{
            if ($('#subcat2').attr('disabled')==false){
                idsubcategoria = $('#subcat2').val();
            }else{
                idsubcategoria = $('#subcat1').val();
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
        var imagenes = '{"imagenes":[';
        i = 0;
        $("#flg img").each(function (index) 
        {             
            src = $(this).attr('src');
            if (src!='../img/cuadro-imgb.png'){
                i = i + 1;
            }
        });
        var j = 0;
        $("#flg img").each(function (index) 
        {             
            src = $(this).attr('src');
            if (src!='../img/cuadro-imgb.png'){
                j = j + 1;
                if (i==j){
                 imagenes = imagenes + '{"cadenaimagen":"' + encodeURIComponent(src) + '"}]}';
                }else{
                 imagenes = imagenes + '{"cadenaimagen":"' + encodeURIComponent(src) + '"},';
                } 
            }
        });
        var pago = 0;
        $("#forma_pago img").each(function (index) 
        {             
            src = $(this).attr('src');
            if (src=='../img/check2_sel.png'){
                pago = 1;
            }
        });
        if (logo=='../img/cuadro-imgb.png'){
            showAlert('Debe seleccionar un logo para su empresa', 'Faltan datos', 0);
        }else{
            if (validar_ob(nombre)==false){
                showAlert('Debe introducir un nombre', 'Faltan datos', 1);    
            }else{
                if (validar_ob(actividad)==false){
                    showAlert('Debe introducir un actividad', 'Faltan datos', 2);    
                }else{
                    if (palclaves==''){
                        showAlert('Debe introducir al menos un palabra clave', 'Faltan datos', 3);        
                    }else{
                        if (validar_ob(email)==false){
                            showAlert('Debe introducir el correo electrónico', 'Faltan datos', 4); 
                        }else{
                            if (validar_ob(telefono)==false){
                                showAlert('Debe introducir el número de teléfono', 'Faltan datos', 5);   
                            }else{
                                if (validar_ob(ciudad)==false){
                                    showAlert('Debe introducir la ciudad', 'Faltan datos', 6);      
                                }else{
                                    if (validar_ob(latitud)==false){
                                         showAlert('Debe seleccionar su unicación', 'Faltan datos', 0);  
                                    }else{
                                        if (validar_ob(direccion)==false){
                                            showAlert('Debe introducir la dirección', 'Faltan datos', 7);
                                        }else{
                                            if (horarios.length==0){
                                                showAlert('Debe introducir al menos un horario', 'Faltan datos', 0);
                                            }else{
                                                if (i==0){
                                                    showAlert('Debe seleccionar al menos una imagen', 'Faltan datos', 0);
                                                }else{
                                                    if (pago==0){
                                                        showAlert('Debe seleccionar al menos una forma de pago', 'Faltan datos', 0);    
                                                    }else{
                                                        if ($('#condiciones').attr('src')=='../img/checkt.png'){
                                                            showAlert('Debe aceptar las condiciones y políticas', 'Faltan datos', 0);        
                                                        }else{
                                                            if (conexion==0){
                                                                showAlert('En este momento no se encuentra logueado o registrado por favor diríjase a cualquiera de estas secciones en el menú superior para poder continuar','Falta registrarse o loguearse');
                                                            }else{
                                                                ajax_start();
                                                                params = {
                                                                    act: 'incPagina',
                                                                    idfactura: $('#id_factura').val(),
                                                                    idusuario: $('#id_usuario').val(),
                                                                    nombre: nombre,
                                                                    sitioweb: $('#sitio').val(),
                                                                    actividad: actividad,
                                                                    logo: logo,
                                                                    idsubcategoria: idsubcategoria,
                                                                    idprovincia: idprovincia,
                                                                    direccion: direccion,
                                                                    palclaves: palclaves, 
                                                                    telefono: telefono,
                                                                    email: email,
                                                                    ciudad: ciudad,
                                                                    horarios: def,
                                                                    latitud: latitud,
                                                                    longitud: longitud,
                                                                    imagenes: imagenes,
                                                                }
                                                                $.ajax({
                                                                    async:true,   
                                                                    cache:false, 
                                                                    dataType: 'json',
                                                                    contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                                                                    type: 'POST', 
                                                                    data: params, 
                                                                    url: SERVER+'incPagina',
                                                                    success:  function(data){ 
                                                                        if (data.success==true){
                                                                            ajax_stop();
                                                                            $('#id_pagina').val(data.idpagina);
                                                                            params = {
                                                                                id: $('#id_pagina').val(),
                                                                                act: 'setParams2'
                                                                            }
                                                                            $.ajax({
                                                                               async:true, 
                                                                               cache:false, 
                                                                               dataType: 'json',
                                                                               type: 'POST', 
                                                                               data: params,
                                                                               url: '../modelo/comun.php',
                                                                               success: function(data){

                                                                               }
                                                                            });
                                                                            showAlert('Su página fue creada con éxitos', 'Felicitaciones', 8)
                                                                        }else{
                                                                            ajax_stop();
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
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });

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

                                                    showAlert('¡El registro se llevó a cabo con éxito! Se le enviara un correo de verificación para activar su cuenta.', 'Bienvenido', 11);
                                                    // var ref = new Firebase ('https://chatfbexample.firebaseio.com/');
                                                    // ref.onAuth(function(authData) {
                                                    //         if (authData) {
                                                    //           //chat.setUser(authData.uid, "Anonymous" + authData.uid.substr(10, 8));
                                                    //         } else {
                                                    //           ref.authAnonymously(function(error, authData) {

                                                    //             if (error) {
                                                    //               console.log(error);
                                                    //             }
                                                    //           });
                                                    //         }
                                                    // });
                                                    // var refUsuarios = ref.child("users");

                                                    // var refUsuario = refUsuarios.child(nombre+' '+apellido);
                                                    // refUsuario.set({
                                                    //         date_of_birth: fecha,
                                                    //         full_name:nombre+' '+apellido,
                                                    //        user_type:1
                                                    //       });
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

    $('#incluye').click(function(){
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
                            if (id==$('#planes').val()){
                                $('#div_plan').empty();
                                div = $("<div class=\"row\" id=\"div_"+i+"\"></div>");
                                $('#div_plan').append(div);
                                donde = i;

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
                                    divc = divc + "<div class=\"text-rr text-12\" style=\"margin-left: 10%;margin-top: 10%;\"><img src=\""+imagen+"\"><span style=\"margin-left: 5%;\">"+nombre+"</span></div>";
                                }else{
                                    if (j==lenc-1){
                                        divc = divc + "<div class=\"text-rr text-12\" style=\"margin-left: 10%;margin-top: 4%;margin-bottom: 5%;\"><img src=\""+imagen+"\"><span style=\"margin-left: 5%;\">"+nombre+"</span></div>";
                                    }else{
                                        divc = divc + "<div class=\"text-rr text-12\" style=\"margin-left: 10%;margin-top: 4%;\"><img src=\""+imagen+"\"><span style=\"margin-left: 5%;\">"+nombre+"</span></div>";
                                    }
                                }
                            }



                            div = $("<div class=\"col-sm-12 col-md-12 col-lg-12\" style=\"padding-bottom:8%;\">"+
                                        "<div class=\"row borde-plan\" style=\"margin-left: 1%; margin-right: 1%; background-color:#ffffff !important;\">"+
                                            "<div class=\"col-xs-12 degradado\">"+
                                                "<div class=\"text-rbo text-16 text-center\" style=\"margin-top: 5%\">"+nomplan+"</div>"+
                                                "<div class=\"text-rl text-40 text-center\" style=\"margin-bottom: 0px !important;\">$ "+precio+"</div>"+
                                                "<div class=\"text-rm text-14 pull-right\" style=\"margin-right: 20%; margin-top:-20px !important;\">mes</div>"+divc+
                                            "</div>"+
                                        "</div>"+
                                    "</div>");
                            $('#div_'+donde).append(div);
                            }
                        }
                        $('#planesm').modal('show');
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

});

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

    function EliminarPal(id){
        $('#div_'+id).remove();
    }

//Funcion utilizada para agregar y eliminar imagenes
    function addFoto(id){
        var cantidad = $('#cantFotos').val();//Capturamos la cantidad de fotos
        var aux = parseInt(id);//Convertimos en int El id
        var src = $('#img_'+id).attr('src');
        //Si esta imagen esta cargada        
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

    function ajax_start(){
        
        $body = $("body");
        $body.addClass("loading");
    }

    function ajax_stop(){
        $body = $("body");
         $body.removeClass("loading");
    }

    function deletePal(id){
        $('#pal_'+id).remove();
        $('#divp_'+id).remove();
        $('#divd_'+id).remove();
        $('#diva_'+id).remove();
        $('#divc_'+id).remove();
    }