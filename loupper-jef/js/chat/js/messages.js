var currentDialog = {};
var opponentId;

var dialogsMessages = [];

// submit form after press "ENTER"
function submit_handler(form) {
  return false;
}

function setupMsgScrollHandler() {
  var msgWindow = $('#mcs_container .list-group.pre-scrollable');
  var msgList = $('#messages-list');

  msgList.scroll(function() {
    if (msgWindow.scrollTop() == msgWindow.height() - msgList.height()){

      var dateSent = null;
      if(dialogsMessages.length > 0){
        dateSent = dialogsMessages[0].date_sent;
      }
      retrieveChatMessages(currentDialog, dateSent);
    }
  });
}

// on message listener
//
function onMessage(userId, msg) {
  // check if it's a message for current dialog
  if (isMessageForCurrentDialog(userId, msg.dialog_id)){
    dialogsMessages.push(msg);

    if (msg.markable === 1 && userId != currentUser.id) {
      sendReadStatus(userId, msg.id, msg.dialog_id);
    }

    // сheck if it's an attachment
    //
    var messageAttachmentFileId = null;
    if (msg.extension.hasOwnProperty("attachments")) {
      if(msg.extension.attachments.length > 0) {
        messageAttachmentFileId = msg.extension.attachments[0].id;
      }
    }

    showMessage(userId, msg, messageAttachmentFileId);
  }
  // Here we process the regular messages
  //
  updateDialogsList(msg.dialog_id, msg.body);
}

function sendReadStatus(userId, messageId, dialogId) {
  var params = {
    messageId: messageId,
    userId: userId,
    dialogId: dialogId
  };
  QB.chat.sendReadStatus(params);
}

function onDeliveredStatusListener(messageId) {
  showDeliveredСheckmark(messageId)
}

function onReadStatusListener(messageId) {
  showReadСheckmark(messageId)
}

function showDeliveredСheckmark(messageId){
  $('#read_'+messageId).fadeOut(100);
  $('#delivered_'+messageId).fadeIn(200);
}

function showReadСheckmark(messageId){
  $('#delivered_'+messageId).fadeOut(100);
  $('#read_'+messageId).fadeIn(200);
}

function retrieveChatMessages(dialog, beforeDateSent){
    // Load messages history
    $(".load-msg").show(0);

    var params = {
        chat_dialog_id: dialog._id,
        sort_desc: 'date_sent',
        limit: 10
    };
   // console.log("CurrentDailog:"+JSON.stringify(dialog));
   
    // if we would like to load the previous history
    if(beforeDateSent !== null){
        params.date_sent = {lt: beforeDateSent};
    } else {
        currentDialog = dialog;
        dialogsMessages = [];
    }

    QB.chat.message.list(params, function(err, messages) {
      if (messages) {
        if(messages.items.length === 0) {
          $("#no-messages-label").removeClass('hide');
        } else {
        $("#no-messages-label").addClass('hide');

        messages.items.forEach(function(item, i, arr) {

          dialogsMessages.splice(0, 0, item);
			//console.log("Item: "+JSON.stringify(item));
          var messageId = item._id;
          var messageText = item.message;
          var messageSenderId = item.sender_id;
          var messageDateSent = new Date(item.date_sent*1000);
          //var messageSenderLogin = getUserLoginById(messageSenderId);
          var messageSenderLogin = messageSenderId;
			 messageSenderRecipientId =item.delivered_ids;
          // send read status
          if (item.read_ids.indexOf(currentUser.id) === -1) {
            sendReadStatus(messageSenderId, messageId, currentDialog._id);
          }

          var messageAttachmentFileId = null;
          if (item.hasOwnProperty("attachments")) {
            if(item.attachments.length > 0) {
              messageAttachmentFileId = item.attachments[0].id;
            }
          }

          var messageHtml = buildMessageHTML(messageText, messageSenderLogin, messageDateSent, messageAttachmentFileId, messageId);

          $('#messages-list').prepend(messageHtml);


          // Show delivered statuses
          if (item.read_ids.length > 1 && messageSenderId === currentUser.id) {
            showReadСheckmark(messageId);
          } else if (item.delivered_ids.length > 1 && messageSenderId === currentUser.id) {
            showDeliveredСheckmark(messageId);
          }

          if (i > 5) {$('#messages-list').scrollTop($('#messages-list').prop('scrollHeight'));}
        });
        
        getDailogImage(QuickbloxIds);
        getChatImages();
      }
    }else{
      console.log(err);
    }
  });

  $(".load-msg").delay(100).fadeOut(500);
}


// sending messages after confirmation
function clickSendMessage() {
    var currentText = $('#message_text').val().trim();
    
    if (!currentText.length){
        return;
    }

    $('#message_text').val('').focus();
    
    sendMessage(currentText, null);
}

function clickSendAttachments(inputFile) {
    QB.content.createAndUpload({
        public: false,
        file: inputFile,
        name: inputFile.name,
        type: inputFile.type,
        size: inputFile.size
    }, function(err, response){
        if(err) {
            console.error(err);
        } else {
            $("#progress").fadeOut(400, function() {
                $(".input-group-btn_change_load").removeClass("visibility_hidden");
            });

            var uploadedFile = response;

            sendMessage("[attachment]", uploadedFile.id);

            $("input[type=file]").val('');
    }
  });
}

// send text or attachment
function sendMessage(text, attachmentFileId) {
    stickerpipe.onUserMessageSent(stickerpipe.isSticker(text));

    var msg = {
        type: currentDialog.type === 3 ? 'chat' : 'groupchat',
        body: text,
        extension: {
            save_to_history: 1,
        },
        markable: 1
    };

    if(attachmentFileId !== null){
        msg['extension']['attachments'] = [{id: attachmentFileId, type: 'photo'}];
    }

    if (currentDialog.type === 3) {
        opponentId = QB.chat.helpers.getRecipientId(currentDialog.occupants_ids, currentUser.id);

        QB.chat.send(opponentId, msg);

        $('.list-group-item.active .list-group-item-text')
            .text(stickerpipe.isSticker(msg.body) ? 'Sticker' : msg.body);

        if(attachmentFileId === null){
            showMessage(currentUser.id, msg);
        } else {
            showMessage(currentUser.id, msg, attachmentFileId);
        }
    } else {
        QB.chat.send(currentDialog.xmpp_room_jid, msg);
    }

    // claer timer and send 'stop typing' status
    clearTimeout(isTypingTimerId);
    isTypingTimeoutCallback();

    dialogsMessages.push(msg);
}

// show messages in UI
function showMessage(userId, msg, attachmentFileId) {
  //var userLogin = getUserLoginById(userId);
  var userLogin = userId;
  var messageHtml = buildMessageHTML(msg.body, userLogin, new Date(), attachmentFileId, msg.id);

  $('#messages-list').append(messageHtml);

  // scroll to bottom
  var mydiv = $('#messages-list');
  mydiv.scrollTop(mydiv.prop('scrollHeight'));
}


// show typing status in chat or groupchat
function onMessageTyping(isTyping, userId, dialogId) {
  showUserIsTypingView(isTyping, userId, dialogId);
}

// start timer after keypress event
var isTypingTimerId;
function setupIsTypingHandler() {
  QB.chat.onMessageTypingListener = onMessageTyping;

  $("#message_text").focus().keyup(function(){

    if (typeof isTypingTimerId === 'undefined') {

      // send 'is typing' status
      sendTypingStatus();

      // start is typing timer
      isTypingTimerId = setTimeout(isTypingTimeoutCallback, 5000);
    } else {

      // start is typing timer again
      clearTimeout(isTypingTimerId);
      isTypingTimerId = setTimeout(isTypingTimeoutCallback, 5000);
    }
  });
}

function setupStreamManagementListeners(){
    QB.chat.onSentMessageCallback = function(messageLost, messageSent){
        console.group('onSentMessageCallback');
            messageLost ? console.log('Message was lost', messageLost) : console.log('Message was sent successfully', messageSent)
        console.groupEnd();
    };
}

// delete timer and send 'stop typing' status
function isTypingTimeoutCallback() {
  isTypingTimerId = undefined;
  sendStopTypinStatus();
}

// send 'is typing' status
function sendTypingStatus() {
    if (currentDialog.type == 3) {
        QB.chat.sendIsTypingStatus(opponentId);
    } else if(currentDialog && currentDialog.xmpp_room_jid) {
        QB.chat.sendIsTypingStatus(currentDialog.xmpp_room_jid);
    }
}

// send 'stop typing' status
function sendStopTypinStatus() {
  if (currentDialog.type == 3) {
    QB.chat.sendIsStopTypingStatus(opponentId);
  } else {
    QB.chat.sendIsStopTypingStatus(currentDialog.xmpp_room_jid);
  }
}

// show or hide typing status to other users
function showUserIsTypingView(isTyping, userId, dialogId) {
  if(isMessageForCurrentDialog(userId, dialogId)){

    if (!isTyping) {
      $('#'+userId+'_typing').remove();
    } else if (userId != currentUser.id) {
      var userLogin = getUserLoginById(userId);
      var typingUserHtml = buildTypingUserHtml(userId, userLogin);
      $('#messages-list').append(typingUserHtml);
    }

    // scroll to bottom
    var mydiv = $('#messages-list');
    mydiv.scrollTop(mydiv.prop('scrollHeight'));
  }
}

// filter for current dialog
function isMessageForCurrentDialog(userId, dialogId) {
  var result = false;
	if (dialogId == currentDialog._id || (dialogId === null && currentDialog.type == 3 && opponentId == userId)) {
		result = true;
	}
	return result;
}

function getDailogImage(quickbloxIdArray) {
	var count = quickbloxIdArray.length;
	console.log("TOTAL:"+count);
	quickbloxIdArray.forEach(function(item, i, arr) {
	
		var ids = jQuery.grep(item.quickbloxId, function(value) {
		  return value != recipient_id;
		});
		var params = {
	   		act: 'getImages',
			quickbloxIds: ids,
		}
	
		$.ajax({
		    async:true,   
		    cache:false, 
		    dataType: 'json',
		    type: 'POST',  
		    url: '../modelo/comun.php',
		    data: params,
		    success:  function(data){
		    	if(data.data[0].foto)
		    	{
		    		$("#"+item.dialogId+" h4 .round").attr('src', 'data:image/png;base64,'+data.data[0].foto);
		    	}
		    	
		    	
				var params = {filter: { field: 'id', param: 'in', value: [data.data[0].quickblox_id] }};
 
				QB.users.listUsers(params, function(err, result){
				  if (result) {
				    
					 var res = result.items[0];
					 //console.log("USERS:"+res.user.last_request_at);
					 var currentTimestamp = Math.floor(Date.now() / 1000);
					 var userLastRequestAtTimestamp = Math.floor(new Date(res.user.last_request_at) / 1000);
						
						// if user didn't do anything last 5 minutes (5*60 seconds)    
					 if((currentTimestamp - userLastRequestAtTimestamp) > 5*60){ 
						   $("#offline-status_"+item.dialogId).show();
						   $("#online-status_"+item.dialogId).hide();
					 }else{
					 		$("#offline-status_"+item.dialogId).hide();
						   $("#online-status_"+item.dialogId).show();
					 }				    
				  }
				});
			
				console.log("TOTAL:"+count+" I="+i);
				if(count == i){
					setTimeout(updateOnlineStatus(), 5000);
				}

		    },
		    beforeSend:function(){},
		    complete: function(response) 
			 {
			  	//console.log("Res: "+response.responseText);
			 },
		    error:function(objXMLHttpRequest){}
	    });
    
   });
  
}

function getChatImages()
{
	
	   var params = {
	   		act: 'getImages',
			quickbloxIds: messageSenderRecipientId,
		}
	
		$.ajax({
		    async:true,   
		    cache:false, 
		    dataType: 'json',
		    type: 'POST',  
		    url: '../modelo/comun.php',
		    data: params,
		    success:  function(data){
		    	var i=1;
		    	if(data.data[0].quickblox_id == recipient_id)
		    	{
		    		
		    		if(data.data[0].foto)
		    		{
		    			$(".user01").attr('src', 'data:image/png;base64,'+data.data[0].foto);
		    		}
		    		i=1;
		    	}else if(data.data[1].quickblox_id == recipient_id){
		    		
		    		if(data.data[1].foto)
		    		{
		    			$(".user01").attr('src', 'data:image/png;base64,'+data.data[1].foto);
		    		}
		    		i=0;
		    	}
		    	
		    	if(data.data[i].quickblox_id != recipient_id){
		    		if(data.data[i].foto)
		    		{
		    			$(".user02").attr('src', 'data:image/png;base64,'+data.data[i].foto);
		    		}
		    	}	
		    	
		    	
		    },
		    beforeSend:function(){},
		    complete: function(response) 
			 {
			  	//console.log("Res: "+response.responseText);
			 },
		    error:function(objXMLHttpRequest){}
	    });
}

function updateOnlineStatus() {
	var count = quickbloxIdArray.length;
	console.log("CALL@");
	QuickbloxIds.forEach(function(item, i, arr) {
		var ids = jQuery.grep(item.quickbloxId, function(value) {
		  return value != recipient_id;
		});
		
		var params = {filter: { field: 'id', param: 'in', value: [ids] }};
		QB.users.listUsers(params, function(err, result){
				  if (result) {
				    
					 var res = result.items[0];
					 var currentTimestamp = Math.floor(Date.now() / 1000);
					 var userLastRequestAtTimestamp = Math.floor(new Date(res.user.last_request_at) / 1000);
						
						// if user didn't do anything last 5 minutes (5*60 seconds)    
					 if((currentTimestamp - userLastRequestAtTimestamp) > 5*60){ 
						   $("#offline-status_"+item.dialogId).show();
						   $("#online-status_"+item.dialogId).hide();
					 }else{
					 		$("#offline-status_"+item.dialogId).hide();
						   $("#online-status_"+item.dialogId).show();
					 }				    
				  }
				});
				
				if(count == i){
					setTimeout(updateOnlineStatus(), 5000);
				}
	});	
	
	
}