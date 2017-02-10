// build html for messages
function buildMessageHTML(messageText, messageSenderId, messageDateSent, attachmentFileId, messageId, status){
	
	//console.log("IMAGES: "+userImages);
  var messageAttach;
  if(attachmentFileId){
      messageAttach = '<img src="' + QB.content.publicUrl(attachmentFileId) + '/' + '/download.xml?token='+token+'" alt="attachment" class="attachments img-responsive" />';
  }

  var isMessageSticker = stickerpipe.isSticker(messageText);

  var delivered = '<img class="icon-small" src="../js/chat/images/delivered.jpg" alt="" id="delivered_'+messageId+'">';
  var read = '<img class="icon-small" src="../js/chat/images/read.jpg" alt="" id="read_'+messageId+'">';

	var messageTextHtml = messageText;
	if (messageAttach) {
		messageTextHtml = messageAttach;
	} else if (isMessageSticker) {
		messageTextHtml = '<div class="message-sticker-container"></div>';

		stickerpipe.parseStickerFromText(messageText, function(sticker, isAsync) {
			if (isAsync) {
				$('#' + messageId + ' .message-sticker-container').html(sticker.html);
			} else {
				messageTextHtml = sticker.html;
			}
		});
	}
			var options = {weekday: "long", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"};

			var fecha = messageDateSent.toLocaleTimeString("en-us", options);
			
			var foto = '../img/avatar-empty-chat.png';
			
			
			if(messageSenderId == recipient_id)
    		{
    				
    				 var messageHtml = '<div style=\'clear:both;\'>'+
                                        '<div class=\'pull-right\'>'+
                                            '<div><img src=\''+foto+'\' width="30" height="30" style=\'width:30px;height:30px;\' style=\'puntero\' class=\'img-circle user01\'></div>'+
                                        '</div>'+
                                        '<div  style=\'text-aling:right;margin-left:30px;\'>'+
                                            '<div class=\'bubble-green pull-right\' style=\'margin-right:10px;margin-top:0px;width:85%\'>'+messageTextHtml+'</div><div class="clearfix">&nbsp;</div>'+
                                            '<div class=\'pull-right text-rr text-8\' style=\'margin-left:30px;margin-top:5px;margin-right:45px;\'>'+fecha+'</div>'+
                                        '</div>'+
                                    '</div><div style=\'clear:both;height:15px;\'></div>';
                                    
        						
    		 }
    		 else
    		 {
    				var messageHtml = '<div style=\'clear:both;\'>'+
                                        '<div class=\'pull-left\'>'+
                                            '<div><img src=\''+foto+'\' width="30" height="30"  style=\'width:30px;height:30px;\' style=\'puntero\' class=\'img-circle user02\'></div>'+
                                        '</div>'+
                                        '<div  style=\'text-aling:left;margin-left:10px;\'>'+
                                            '<div class=\'chat_msgs text-rr text-10\' style=\'margin-left:10px;\'>'+messageTextHtml+'</div><div class="clearfix">&nbsp;</div>'+
                                            '<div class=\'pull-left text-rr text-8\' style=\'margin-left:30px;margin-top:5px;\'>'+fecha+'</div>'+
                                        '</div>'+
                                    '</div><div style=\'clear:both;height:15px;\'></div>'
         						
    		 }		
  return messageHtml;
}

// build html for dialogs
function buildDialogHtml(dialogId, dialogUnreadMessagesCount, dialogIcon, dialogName, dialogLastMessage,dailogLastMessageSentDate) {
  var UnreadMessagesCountShow = '<span class="badge pull-right">'+dialogUnreadMessagesCount+'</span>';
      UnreadMessagesCountHide = '<span class="badge pull-right" style="display: none;">'+dialogUnreadMessagesCount+'</span>';
      
  var OnlineShow = '<img src="../img/online.png" id="online-status_'+dialogId+'" style="display:none;margin-top:28px;margin-left:-10px;" />';
      OfflineShow = '<img src="../img/offline.png" id="offline-status_'+dialogId+'" style="margin-top:28px;margin-left:-10px" />';    

  var isMessageSticker = stickerpipe.isSticker(dialogLastMessage);
  

   var lastConnected = new Date(dailogLastMessageSentDate*1000);
  
	var options = {weekday: "long", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"};

	var fecha = lastConnected.toLocaleTimeString("en-us", options);
	
	
  	var dialogHtml =
      '<a href="#" class="list-group-item inactive" id='+'"'+dialogId+'"'+' onclick="triggerDialog('+"'"+dialogId+"'"+')"><div class="pull-right">'+fecha+'</div><br>'+
        '<h4 class="list-group-item-heading pull-left">'+ dialogIcon+OnlineShow+OfflineShow+'&nbsp;&nbsp;&nbsp;' +
            '<span>'+dialogName.substring(0,10)+'</span></h4>' +(dialogUnreadMessagesCount === 0 ? UnreadMessagesCountHide : UnreadMessagesCountShow)+
        '<div class="clearfix"></div>'+
      '</a>';
       
  	return dialogHtml;
}

// build html for typing status
function buildTypingUserHtml(userId, userLogin) {
  var typingUserHtml =
      '<div id="'+userId+'_typing" class="list-group-item typing">'+
        '<time class="pull-right">writing now</time>'+
        '<h4 class="list-group-item-heading">'+ userLogin+'</h4>'+
        '<p class="list-group-item-text"> . . . </p>'+
      '</div>';

  return typingUserHtml;
}

// build html for users list
function buildUserHtml(userLogin, userId, isNew) {
  var userHtml = "<a href='#' id='" + userId;
  if(isNew){
    userHtml += "_new'";
  }else{
    userHtml += "'";
  }
  userHtml += " class='col-md-12 col-sm-12 col-xs-12 users_form' onclick='";
  userHtml += "clickToAdd";
  userHtml += "(\"";
  userHtml += userId;
  if(isNew){
    userHtml += "_new";
  }
  userHtml += "\")'>";
  userHtml += userLogin;
  userHtml +="</a>";

  return userHtml;
}