var token = null;
var user_id = null;

var currentDialog = {};
var opponentId;

var dialogsMessages = [];
var quickbloxId = [];
var opearators  = [];
var currentUser = user;

$(document).ready(function(){
	var operador = new Array();
    localStorage.clear();

	var params = {
		act: 'getSeguidores',
	}

	$.ajax({
	    async:true,   
	    cache:false, 
	    dataType: 'json',
	    type: 'POST',  
	    url: '../modelo/seguidores.php',
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
					var id = '';
					var foto ='';
					
					for(i=0;i<len;i++){
						id = data.data[i].idusuario;
						nombre = data.data[i].nombre + ' ' + data.data[i].apellido;
						
						quickbloxId[i] = data.data[i].quickblox_id; 
						if (data.data[i].foto==null){
							foto = '../img/avatar-empty.png';
						}else{
							//cambiar a la a la ruta de amazon
							foto = 'data:image/png;base64,'+data.data[i].foto;
						}
						opearators[i] = {id: id, nombre: nombre, foto: data.data[i].foto,quickblox_id:data.data[i].quickblox_id,email:data.data[i].email};
						operador[i] = {id: id, nombre: nombre, foto: data.data[i].foto,quickblox_id:data.data[i].quickblox_id};
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
									cabezara = "<div class=\"row border-age margen-age-right\">";
								}
							}
						}
						div = $(cabezara+
									"<div class=\"col-sm-2 col-md-2 col-lg-2 ajuste-ava-seguidores\">"+
                          				"<div class=\"div-avatar-seguidores\"><img src=\""+foto+"\" class=\"img-circle\" style=\"width: 48px; height: 48px;\"></div>"+
                          				"<div class=\"div-status-seguidores\"><img src=\"../img/online2.png\"></div>"+
                        			"</div>"+
                        			"<div class=\"col-sm-10 col-md-10 col-lg-10 ajustes-nombre-seguidores\" >"+
                            			"<p class=\"text-rbo text-12 margen-sup-0\">"+nombre+"</p>"+
                       			 	"</div>"+
                        		"</div>");
						$('#col'+cont_colu).append(div);
						if (cont_colu==2){
							cont_colu = 1;
						}
					}	
				}
			}else{
				if (data.mensaje=='datos_incorrectos'){
					showAlert('En estos momentos no podemos procesar su petición...Intente mas tarde', 'Error de comunicación', 0);	
				}
			}
			

	    },
	    complete: function(response) {
            //alert(response.responseText);
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


	itemAct('seguidores');

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
									cabezara = "<div class=\"row border-age margen-age-right\">";
								}
							}
						}
						div = $(cabezara+
									"<div class=\"col-sm-2 col-md-2 col-lg-2 ajuste-ava-seguidores\">"+
                          				"<div class=\"div-avatar-seguidores\"><img src=\""+foto+"\" class=\"img-circle\" style=\"width: 48px; height: 48px;\"></div>"+
                          				"<div class=\"div-status-seguidores\"><img src=\"../img/online2.png\"></div>"+
                        			"</div>"+
                        			"<div class=\"col-sm-10 col-md-10 col-lg-10 ajustes-nombre-seguidores\" >"+
                            			"<p class=\"text-rbo text-12 margen-sup-0\">"+nombre+"</p>"+
                       			 	"</div>"+
                        		"</div>");
						$('#col'+cont_colu).append(div);
						if (cont_colu==2){
							cont_colu = 1;
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
									cabezara = "<div class=\"row border-age margen-age-right\">";
								}
							}
						}
						div = $(cabezara+
									"<div class=\"col-sm-2 col-md-2 col-lg-2 ajuste-ava-seguidores\">"+
                          				"<div class=\"div-avatar-seguidores\"><img src=\""+foto+"\" class=\"img-circle\" style=\"width: 48px; height: 48px;\"></div>"+
                          				"<div class=\"div-status-seguidores\"><img src=\"../img/online2.png\"></div>"+
                        			"</div>"+
                        			"<div class=\"col-sm-10 col-md-10 col-lg-10 ajustes-nombre-seguidores\" >"+
                            			"<p class=\"text-rbo text-12 margen-sup-0\">"+nombre+"</p>"+
                       			 	"</div>"+
                        		"</div>");
						$('#col'+cont_colu).append(div);
						if (cont_colu==2){
							cont_colu = 1;
						}
                    }
                }
            break;
        }
    }

});



$(document).ready(function() {

    $('#chat-container').hide();
    $('#chat-container .panel-footer').show();
    $('#text-content').empty();
    $('#chat-item-panel .glyphicon').remove();
    $('.panel-body').css('background', '#f7f7f8');

    $('#massive-chat').click(function() {
        $('#chat-item-panel').empty();
        $('#chat-item-panel').append('<span class=\'text-rr text-12\'>Announcements</span>' +
            '<div class=\'btn-group pull-right\'>' +
            '<a class=\'minChat\' data-toggle=\'collapse\' data-parent=\'#chat-item-panel\' href=\'#mcs_container\'>' +
            '<img src=\'../img/piso.png\' style=\'margin-right:5px;\' id=\'minChat\' onClick=\'javascript:minchat();\'>' +
            '</a>' +
            '<a>' +
            ' <img src=\'../img/close.png\' onClick=\'javascript:cerrarChat();\'>' +
            '</a>' +
            '<input type=\'hidden\' id=\'imgChat\' value=\'0\'>' +
            '</div>');
        $('#text-content').empty(); //Se vacia todo el contenido
        
        $('#chat-container').show();
        
        $(".minChat").click();
       
    
    
	    QB.createSession({login: user.login, password: user.pass}, function(err, res) {
	    	
	    	if (res) {
	         token = res.token;
            user.id = res.user_id;

            mergeUsers([{user: user}]);
            
                QB.chat.connect({userId: user.id, password: user.pass}, function(err, roster) {
                if (err) {
                    console.log(err);
                } else {
                    // setup scroll stickerpipe module
                    setupStickerPipe();

                    retrieveChatDialogs();

                    // setup message listeners
                    setupAllListeners();

                    // setup scroll events handler
                    setupMsgScrollHandler();

                    setupStreamManagementListeners();
                    
                    $('#messages-list').scrollTop($('#messages-list').prop('scrollHeight'));
                }
            });
            
			} 	
		});
	});
	
 
 
    
    $( "#send_btn" ).click(function() {		 
		   var AnnouncementsText = $('#message_text').val().trim();
		   clickSendMessage();
        	sendAnnouncements(opponentId,AnnouncementsText);
        	$('#messages-list').scrollTop($('#messages-list').prop('scrollHeight'));
	 });
    
});



function sendAnnouncements(userId,messageText)
{
	var newIds = jQuery.grep(opearators, function(value) { return value.quickblox_id != userId; });
	
	var oldDailog = currentDialog;
	newIds.forEach(function(ids, i, arr) {
	     
		QB.createSession({login: user.login, password: user.pass}, function(err, res) {
	    	
	    	setupStickerPipe();

			setupAllListeners();
			
			setupMsgScrollHandler();

         	setupStreamManagementListeners();
			
			//console.log("Current ID: "+arr[i].email);
	    	if (res) {
	    		 var params = {
				    type: 3,
				    occupants_ids: [arr[i].quickblox_id,currentUser.id],
				    name: arr[i].nombre
				};

				QB.chat.dialog.create(params, function(err, createdDialog) {
			    if (err)
			    { 
			    	console.log(err);
			    }
			    else
			    {
			    	
			    	   currentDialog = createdDialog;
			    	   
      					notifyOccupants(createdDialog.occupants_ids, createdDialog._id, 1);

      					triggerDialog(createdDialog._id);
      
			    	   
						opponentId = QB.chat.helpers.getRecipientId(currentDialog.occupants_ids, currentUser.id);
						
        				
        				
        				stickerpipe.onUserMessageSent(stickerpipe.isSticker(messageText));

					    var msg = {
					        type: currentDialog.type === 3 ? 'chat' : 'groupchat',
					        body: messageText,
					        extension: {
					            save_to_history: 1,
					        },
					        markable: 1
					    };
					
					   
					
					    if (currentDialog.type === 3) {
					        opponentId = QB.chat.helpers.getRecipientId(currentDialog.occupants_ids, currentUser.id);
					
					        QB.chat.send(opponentId, msg);
					
					        $('.list-group-item.active .list-group-item-text')
					            .text(stickerpipe.isSticker(msg.body) ? 'Sticker' : msg.body);
					         //showMessage(currentUser.id, msg);
					   
					    } else {
					        QB.chat.send(currentDialog.xmpp_room_jid, msg);
					    }
					
					    // claer timer and send 'stop typing' status
					    clearTimeout(isTypingTimerId);
					    isTypingTimeoutCallback();
					
					    //dialogsMessages.push(msg);
        									
				 }
			});
			
		 }
	  });	 	
	});	
	
	currentDialog = oldDailog;
	 //joinToNewDialogAndShow(createdDialog);
	
	//notifyOccupants(currentDialog.occupants_ids, currentDialog._id, 1);
	
	triggerDialog(currentDialog._id);
}


function setupAllListeners() {
  QB.chat.onMessageListener         = onMessage;
  QB.chat.onSystemMessageListener   = onSystemMessageListener;
  QB.chat.onDeliveredStatusListener = onDeliveredStatusListener;
  QB.chat.onReadStatusListener      = onReadStatusListener;

}