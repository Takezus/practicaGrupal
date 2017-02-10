var params = {};
var id_plan = '';
var id_agente = '';
var id_ciclo = '';
var factura = '';
var pago = '';

$(document).ready(function(){
	//04163559898

    itemAct('cambiar');

    var params = {
        idpagina: $('#id_pagina').val(),
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
            	id_plan = data.data[0].idplan;
            	id_agente = data.data[0].cantagentes;
            	$('#textAgente').text('Has añadido '+id_agente+' agente(s).')
            	id_ciclo = data.data[0].idciclofact;
			    for(i=1;i<13;i++){
			    	if (parseInt(id_agente)==i){
			    		$("#agentess").append("<option value=\""+i+"\" selected>"+i+"</option>");
			    	}else{
			    		$("#agentess").append("<option value=\""+i+"\">"+i+"</option>");
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
        idplan: id_plan,
    }

    $.ajax({
        async:true,   
        cache:false, 
        dataType: 'json',
        type: 'GET',  
        url: SERVER+'getCicloFact',
        data: params,
        success:  function(data){ 
            if (data.success==true){
                $("#ciclo").empty();
                var i = 0;
                var ciclo_fac = id_ciclo;
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

    $("#agentess").change(function(){
    	$('#textAgente').text('Has añadido '+$("#agentess").val()+' agente(s).');
    });

    $('#planes').change(function(){
        params = {
            idplan: $('#planes').val(),
        }

        $.ajax({
            async:true,   
            cache:false, 
            dataType: 'json',
            type: 'GET',  
            url: SERVER+'getCicloFact',
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
                        $('#agentess').val('1');
                        $("#agentess").attr('disabled',true);
                        $("#ciclo").attr('disabled',true);
                        $('#textAgente').html('Has añadido 1 Operador(es)');
                    }else{
                        $("#agentess").attr('disabled',false);
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

    $("#procesar_pedido").click(function(){
	    params = {
	        idplan: $("#ciclo").val(),
	        cantagentes: $("#agentess").val(),
	    }

	    $.ajax({
	        async:true,   
	        cache:false, 
	        dataType: 'json',
	        type: 'POST',  
	        url: SERVER+'incFacturaTemp',
	        data: params,
	        success:  function(data){ 
	            if (data.success==true){
	            	factura = data.numeroactual;
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
                        params = {
                            idpagina: $('#id_pagina').val(),
                            idfactura: factura,
                            idtipopago: pago
                        }
                        var ht = SERVER+'cambiarPlan';
                        var met = 'POST';
                    $.ajax({
                        async:true,   
                        cache:false, 
                        dataType: 'json',
                        type: met,  
                        url: ht,
                        data: params,
                        success:  function(data){ 
                            if (data.success==true){
                            		$('#panPlan').modal('hide')
                                    showAlert('Su plan ha sido cambiado exitosamente', 'Transacción exitosa', 0)
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
                    switch(Donde){
                    	case 10:
                    		$('#nombre').focus();
                    	break;
                    	case 11:
                    		$('#apellido').focus();
                    	break;
                    }
                }
            }],
            onhidden: function(dialogRef){
            }
        });
    }

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

});

    function cargar_plan(){
        var params = {
                idfactura: factura,
        }
        var ht = SERVER+'getResumen';
        $('#btnExtender').text('Cambiar Plan');
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
                                    "<p class=\"text-rb text-14 pull-right\">$ "+monto+"</p></br></br>";
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

    function sel_pago(id){
    	pago = id;
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
