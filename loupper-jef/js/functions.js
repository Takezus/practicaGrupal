/*
 _____  __  __  ____                __                   
/\___ \/\ \/\ \/\  _`\             /\ \                  
\/__/\ \ \ \_\ \ \ \/\_\    ___    \_\ \     __    ____  
   _\ \ \ \  _  \ \ \/_/_  / __`\  /'_` \  /'__`\ /',__\ 
  /\ \_\ \ \ \ \ \ \ \L\ \/\ \L\ \/\ \L\ \/\  __//\__, `\
  \ \____/\ \_\ \_\ \____/\ \____/\ \___,_\ \____\/\____/
   \/___/  \/_/\/_/\/___/  \/___/  \/__,_ /\/____/\/___/ 
                                                         
http://www.jhcodes.com/
Jesus Herrera - jesuxherrera@jhcodes.com
*/
///// Loading /////
var opts = {
    lines: 17,
    length: 10,
    width: 2,
    radius: 13,
    corners: 1,
    rotate: 0,
    direction: 1,
    color: '#FFF',
    speed: 1,
    trail: 60,
    shadow: false,
    hwaccel: false,
    className: 'spinner',
    zIndex: 2e9,
    top: '50%',
    left: '50%'
};
var target = document.getElementById('loading');
var spinner = new Spinner(opts).spin(target);
var idsel = null;
var iduslog = null;
var ref = null;
var iduslog = $('#iddUser').val(); //si no esta logueado esto es igual a vacio
var chatDialogId = null;
//var recipient_id = null;
var messagesList = null;
var foto = null;
var list =null;
var isChatSession =false;
var lastConversation;

// Page Load
//Posiblemente la carga de la pagina
$(document).ready(function() {
	
   $(window).load(function() {

        // Efect Spinner
        $("#loading").fadeOut(1000);

        $("#header").addClass("animated fadeInDown").fadeIn(1000);

   });
    

});


$(document).ready(function() {


    $('#chat-container').hide();
    $('#chat-container .panel-footer').show();
    $('#text-content').empty();
    $('#chat-item-panel .glyphicon').remove();
    $('.panel-body').css('background', '#f7f7f8');

    $('#chatea').click(function() {
    	
    	  conexion = $('#conexion').val();
        if (conexion==0){
            showAlert('Debes iniciar sesión para poder Seguir esta Página', 'Datos Incompletos', 1);
            return;
        }
        //AL presionar el boton chatea se activara el chat
        $('#chat-item-panel').empty();
        $('#chat-item-panel').append('<span class=\'text-rr text-12\'>Departamentos</span>' +
            '<div class=\'btn-group pull-right\'>' +
            '<a data-toggle=\'collapse\' data-parent=\'#chat-item-panel\' href=\'#collapseOne\'>' +
            '<img src=\'../img/piso.png\' style=\'margin-right:5px;\' id=\'minChat\' onClick=\'javascript:minchat();\'>' +
            '</a>' +
            '<a>' +
            ' <img src=\'../img/close.png\' onClick=\'javascript:cerrarChat();\'>' +
            '</a>' +
            '<input type=\'hidden\' id=\'imgChat\' value=\'0\'>' +
            '</div>');
        $('#text-content').empty(); //Se vacia todo el contenido
        //Se crea el parametro
        var params = {
            act: 'getConfChat',
            idnegocio: $('#id_actividad').val(), //Recuperamos el id del negocio
        }
        //Realizamos la peticion
        $.ajax({
            async: false,
            cache: false,
            dataType: 'json',
            type: 'POST',
            url: '../modelo/comun.php',
            data: params,
            success: function(data) {
                if (data.success == true) {
                    imgD = "data:image/jpeg;base64,";
                    if (data.departamentos.length > 0) { //Si el array con departamentos tiene algo

                        var nomPag = $('#nompagina').val(); //Asignamos el nombre de la pagina a la variable
                        $('#text-content').append('<div class=\'text-center text-rr text-10\'>¿Con cúal Departamento de ' + nomPag + ' desea Chatear?</div>'); //LLenamos el textContent
                        for (var i = 0; i < data.departamentos.length; i++) {
                            id = data.departamentos[i].id; //Se recorre el array el cual sospecho tiene un solo indice
                            nombre = data.departamentos[i].nombre;
                            descripcion = data.departamentos[i].descripcion; //Almacenamos los datos
                            cantagentes = data.departamentos[i].cantagentes;
                            //Agregamos un nuevo div al text-content
                            $('#text-content').append('<div style=\'margin-top:20px;padding-left:10px;padding-right:10px;position: relative;\'>' +
                                '<div class=\'divsobre puntero\' style=\'z-index: ' + id + ';background:#000;\' onClick=\'javascript:getOpers(' + id + ', "' + nombre + '");\'></div>' +
                                '<div class=\'pull-left puntero\' onClick=\'javascript:getOpers(' + id + ', "' + nombre + '");\'>' +
                                '<p class=\'text-rbo text-10\' style=\'margin-bottom:-3px;\'>' + nombre + '</p>' +
                                '<p class=\'text-rr text-8\'>' + descripcion + '</p>' +
                                '</div>' +
                                '<div class=\'pull-right puntero\' onClick=\'javascript:getOpers(' + id + ', "' + nombre + '");\'>' +
                                '<p class=\'text-rr text-10\' style=\'margin-bottom:-3px;\'>Operadores</p>' +
                                '<p class=\'text-rr text-8 pull-right\'>' + cantagentes + '</p>' +
                                '</div>' +
                                '</div>');
                            $('#text-content').append('<div style=\'margin-top:70px;border-bottom: 1px solid #e2e2e2;\'></div>');
                        }


                    } 
                    else if (data.operadores.length > 0) //Si el departamento posee operadores
                    {


                        var nomPag = $('#nompagina').val(); //Asignamos el nombre de la pagina
                        $('#text-content').append('<div class=\'text-center text-rr text-10\'>¿Con cúal Operador de "' + nomPag + '" desea Chatear?</div>');
                        for (i = 0; i < data.operadores.length; i++) {
                            id = data.operadores[i].id;
                            nombre = data.operadores[i].nombre;
                            enlinea = data.operadores[i].enlinea;
                            fotoa = data.operadores[i].foto;
                            //alert(fotoa);
                            if (fotoa == null) {
                                foto = '../img/avatar-empty-chat.png';
                            } else {
                                foto = imgD + data.operadores[i].foto;
                            }

                            if (enlinea == true) {
                                list = '../img/list-on.png';
                            } else {
                                list = '../img/list-off.png';
                            }
                            $('#text-content').append('<div style=\'margin-top:30px;padding-left:10px;padding-right:10px;\'>' +
                                '<div class=\'pull-left\'>' +
                                '<div class=\'div-avatar1 puntero\'><img src=\'' + foto + '\' onClick=\'javascript:chatear(' + id + ', "' + nombre + '");\'  style=\'width:30px;height:30px;\'></div>' +
                                '<div style=\'margin-top:-20px;margin-left:30px;\'><img src=\'' + list + '\'></div>' +
                                '</div>' +
                                '<div style=\'text-aling:left;padding-top:10px;\'>' +
                                '<p class=\'text-rr text-10 puntero\' style=\'margin-left:50px;\' onClick=\'javascript:chatear(' + id + ', "' + nombre + '");\'>' + nombre + '</p>' +
                                '</div>' +
                                '</div>');
                            $('#text-content').append('<div style=\'margin-top:40px;border-bottom: 1px solid #e2e2e2;\'></div>');
                        }

                    }
                   
                } else {
                    if (data.mensaje == 'datos_incorrectos') {
                        showAlert('En estos momentos no podemos procesar su petición...Intente mas tarde', 'Error de comunicación', 0);
                    }
                }


            },
            beforeSend: function() {},
            error: function(objXMLHttpRequest) {}
        });
        $('#chat-container').show();
        var abierto = $('#abierto').val();
        src = $('#minChat').attr('src'); // "static/images/banner/blue.jpg"
        tarr = src.split('/'); // ["static","images","banner","blue.jpg"]
        file = tarr[tarr.length - 1];
        if (abierto == '0') {
            $("#chat-container #minChat").click();
            $('#abierto').val('1');
        } else {
            //alert(file);
            if (file != 'piso.png') {
                $("#chat-container #minChat").click();
            }
        }

    });


    $(".sparkline").sparkline([0, 25, 0, 12, 82, 0, 21, 59, 34, 75, 10], {
        type: 'line',
        width: '90%',
        height: '50',
        lineColor: '#a9a9b2',
        fillColor: '#ffffff',
        drawNormalOnTop: false
    });


    $(".user-block a").on("click", function() {
        $(this).hide();
        $(this).parent().addClass("animated flipOutY");
    });


    // Add slideup & fadein animation to dropdown
    $('.dropdown').on('show.bs.dropdown', function(e) {
        var $dropdown = $(this).find('.dropdown-menu');
        var orig_margin_top = parseInt($dropdown.css('margin-top'));
        $dropdown.css({
            'margin-top': (orig_margin_top + 10) + 'px',
            opacity: 0
        }).animate({
            'margin-top': orig_margin_top + 'px',
            opacity: 1
        }, 300, function() {
            $(this).css({
                'margin-top': ''
            });
        });
    });

});


function cerrarChat() {
    $('#chat-container').hide();
    $('#imgChat').val('0')
    $('#abierto').val('0');
    $('#mcs_container').hide();
	 $('#collapseOne').show();
}

function minchat() {
    var valor = $('#imgChat').val();
    if (valor == '0') {
        valor = $('#imgChat').val('1');
    } else {
        src = $('#minChat').attr('src'); // "static/images/banner/blue.jpg"
        tarr = src.split('/'); // ["static","images","banner","blue.jpg"]
        file = tarr[tarr.length - 1];
        if (file == 'piso.png') {
            $('#minChat').attr('src', '../img/max.png');
        } else {
            $('#minChat').attr('src', '../img/piso.png');
        }
    }
}

function getOpers(id, dpto) {
    $('#text-content').empty();

    var params = {
        act: 'getOperDep',
        idepartamento: id
    }
    var currentId = $('#id_usuario').val(); 
    $('#chat-item-panel').empty();
    $('#chat-item-panel').append('<span class=\'text-rr text-12\'>Operadores</span>' +
            '<div class=\'btn-group pull-right\'>' +
            '<a data-toggle=\'collapse\' data-parent=\'#chat-item-panel\' href=\'#collapseOne\'>' +
            '<img src=\'../img/piso.png\' style=\'margin-right:5px;\' id=\'minChat\' onClick=\'javascript:minchat();\'>' +
            '</a>' +
            '<a>' +
            ' <img src=\'../img/close.png\' onClick=\'javascript:cerrarChat();\'>' +
            '</a>' +
            '<input type=\'hidden\' id=\'imgChat\' value=\'0\'>' +
            '</div>');
	loading_start()
    $.ajax({
        async: false,
        cache: false,
        dataType: 'json',
        type: 'POST',
        url: '../modelo/comun.php',
        data: params,
        success: function(data) {
        	   
            if (data.success == true) {
                var nomPag = $('#nompagina').val();
                $('#text-content').append('<div class=\'text-center text-rr text-10\'>¿Con cúal Operador de ' + nomPag + ' desea Chatear?</div>');
                for (i = 0; i < data.data.length; i++) {
                    id = data.data[i].idoperador;
                    nombre = data.data[i].nombre;
                    enlinea = data.data[i].enlinea;
                    fotoa = data.data[i].foto;
                    quickblox_id = data.data[i].quickblox_id;
                    email = data.data[i].email;
                    if(id != currentId){
                    	 var chat_dailog_id = data.data[i].chat_dailog_id;
                    	 var last_message_date_sent = data.data[i].last_message_date_sent;
	                    if (fotoa == null) {
	                        foto = '../img/avatar-empty-chat.png';
	                    } else {
	                        foto = 'data:image/png;base64,' + fotoa;
	                    }
	
	                    if (enlinea == true) {
	                        list = '../img/online.png';
	                    } else {
	                        list = '../img/offline.png';
	                    }
	                    var OnlineShow = '<img src="../img/online.png" id="online-status_'+chat_dailog_id+'" style="display:none;" />';
      							  OfflineShow = '<img src="../img/offline.png" id="offline-status_'+chat_dailog_id+'"  />';

	                    $('#text-content').append('<div style=\'margin-top:30px;padding-left:10px;padding-right:10px;\'>' +
	                        '<div class=\'pull-left\'>' +
	                        '<div class=\'div-avatar1 puntero img-circle\'>'+
	                        '<a href="#" class="chating"  id='+'"'+chat_dailog_id+'"'+' onclick="startChat('+"'"+chat_dailog_id+"'"+',' + id + ', '+"'"+nombre+"'"+' , '+"'"+dpto+"'"+','+last_message_date_sent+' )"><img src=\'' + foto + '\'  style=\'width:60px;height:60px;\' class=\'img-circle\'></a></div>' +
	                        '<div style=\'margin-top:-20px;margin-left:45px;\'>'+OnlineShow+OfflineShow+'</div>' +
	                        '</div>' +
	                        '<div style=\'text-aling:left;padding-top:10px;\'>' +
	                        '<a href="#" class="chating"  id='+'"'+chat_dailog_id+'"'+' onclick="startChat('+"'"+chat_dailog_id+"'"+',' + id + ', '+"'"+nombre+"'"+' , '+"'"+dpto+"'"+','+last_message_date_sent+')">' + nombre + '</a>' +
	                        '</div>' +
	                        '</div>');
	                    $('#text-content').append('<div style=\'margin-top:40px;border-bottom: 1px solid #e2e2e2;\'></div>');
	                }      
   
                }
                
                loading_stop();
                
            } else {
            		loading_stop();
                if (data.mensaje == 'datos_incorrectos') {
                    showAlert('En estos momentos no podemos procesar su petición...Intente mas tarde', 'Error de comunicación', 0);
                }
            }
        },
        complete: function(response) {
        	
            //alert(response.responseText);
        },
        beforeSend: function() {},
        error: function(objXMLHttpRequest) {}
    });
}

function loading_start(){
   $body = $(".panel-body");
   $body.addClass("loading-centered");
}

function loading_stop(){
   $body = $(".panel-body");
   $body.removeClass("loading-centered");
}

function startChat(chat_dailog_id, id, nombre, dpto,last_message_date_sent)
{
	loading_start();
	var lastConnect = "";
	if (last_message_date_sent != "") {
		lastConnect = new Date(last_message_date_sent*1000);
  
		var options = {weekday: "long", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"};

		var fecha = lastConnect.toLocaleTimeString("en-us", options);
	}	
	triggerDialog(chat_dailog_id);
	var nomPag = $('#nompagina').val();
	
	$('#mcs_container').show();
	$('#collapseOne').hide();
	
	$('#chat-item-panel').empty(); //Vaciamos todo lo que haya en la cabecera del chat(dentro del div)
    $('#chat-item-panel').append('<div class=\'btn-group pull-right\' style=\'top:0px;margin-top:0px;\'>' +
        '<a data-toggle=\'collapse\' data-parent=\'#chat-item-panel\' href=\'#collapseOne\'>' + // para minimizar el chat llamamos a la funcion minchat()
        '<img class=\'puntero\' src=\'../img/piso.png\' style=\'margin-right:5px;\' id=\'minChat\' onClick=\'javascript:minchat();\'>' +
        '</a>' +
        '<a>' +
        ' <img class=\'puntero\' src=\'../img/close.png\' onClick=\'javascript:cerrarChat();\'>' +
        '</a>' +
        '<input type=\'hidden\' id=\'imgChat\' value=\'0\'>' +
        '</div>' +
        '<p class=\'text-rbo text-10\' style=\'margin-bottom:-5px;\'>' + nombre + '</p>' +
        '<p class=\'text-rr text-10\' style=\'margin-bottom:-5px;\'>' + dpto + ' | <span class=\'text-rbo text-10\'>' + nomPag + '</span></p>' +
        '<p class=\'text-rr text-8\' style=\'margin-bottom:0px;\' id=\'last_seen\'>Ultima conexión '+fecha+'</p>');
        
    loading_stop();    
}