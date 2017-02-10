'use strict';

var currentUser,
    token;
    
var userImages = [];    

var QuickbloxIds = [];

var messageSenderRecipientId = [];


$(function() {


 //   $('#user1').on('click', function() {
        currentUser = QBUser1;
        connectToChat(QBUser1);
   /* });

    $('#user2').on('click', function() {
        currentUser = QBUser2;
        connectToChat(QBUser2);
    });*/

    var niceScrollSettings = {
        cursorcolor:'#02B923',
        cursorwidth:'7',
        zindex:'99999'
    };

    $('html').niceScroll(niceScrollSettings);
    $('.nice-scroll').niceScroll(niceScrollSettings);
});

function connectToChat(user) {
   // $('#loginForm button').hide();
   // $('#loginForm .progress').show();

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
                }
            });
            
            /*Changes Dailog Images*/
            QB.chat.dialog.list(null, function(err, resDialogs) {
				        if (err) {
				          console.error(err);
				        } else {
				            // repackage dialogs data and collect all occupants ids
				            var opponentIds = [];
					         resDialogs.items.forEach(function(item, i, arr) {
				                var dialogId = item._id;
				               
				                QuickbloxIds[i] = {dialogId: dialogId, quickbloxId: item.occupants_ids};
			            		});
			            		
			            		
			            		
				        }
			   });	            
            /*Changes Dialg Images*/
        }
    });
    

}

function setupAllListeners() {
  QB.chat.onMessageListener         = onMessage;
  QB.chat.onSystemMessageListener   = onSystemMessageListener;
  QB.chat.onDeliveredStatusListener = onDeliveredStatusListener;
  QB.chat.onReadStatusListener      = onReadStatusListener;

  setupIsTypingHandler();
}
// reconnection listeners
function onDisconnectedListener(){
  console.log("onDisconnectedListener");
}

function onReconnectListener(){
  console.log("onReconnectListener");
}


// niceScroll() - ON
$(document).ready(
    function() {
        
    }
);
