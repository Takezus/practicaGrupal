 <!-- Quickblox Js Start -->
   <?php if($_SESSION["email"] == "bhavik.talpada@swayaminfotech.com"){
   	?>
   		   <script type="text/javascript">
   		var user = {
        id: <?php echo $_SESSION['quickblox_id']; ?>,
        name: '<?php echo $_SESSION["name_usuario"];  ?>',
        login: 'BhavikPatel',
        pass: '12345678'
    	}
   </script>
   	<?php
   }else{ ?>
   <script type="text/javascript">
   		var user = {
        id: <?php echo $_SESSION['quickblox_id']; ?>,
        name: '<?php echo $_SESSION["name_usuario"];  ?>',
        login: '<?php echo $_SESSION["email"];  ?>',
        pass: '12345678'
    	}
   </script>
<?php }?>

   <script src="../js/chat/js/quickblox.min.js"></script>
   <script src="../js/chat/js/config.js"></script>
   
   <script type="text/javascript">
   function updateMessageCount () {

	   QB.createSession({login: user.login, password: user.pass}, function(err, res) {
	        if (res) {
	            token = res.token;
	            user.id = res.user_id;
	
	            //mergeUsers([{user: user}]);
	
	            QB.chat.connect({userId: user.id, password: user.pass}, function(err, roster) {
	                if (err) {
	                    console.log(err);
	                } else {
	                   QB.chat.dialog.list({limit: 300, skip: 0}, function (err, res) {
					            if (err) {
					                console.log("getDialoges failed for user " + params.username)
					                console.log(err)
					                
					            } else {
					                var allDialogListIds = res.items.map(function (dialog) {
					                    return dialog._id
					                })
					
					                var finalDialogListIds = allDialogListIds
					                var unreadParams = {chat_dialog_ids: finalDialogListIds};
					                console.log(unreadParams)
					
					                QB.chat.message.unreadCount(unreadParams, function (err, res) {
					                    if (err) {
					                        console.log("unreadCount failed for user " + params.username)
					                        console.log(err)
					                        
					                    } else {
					                    	  $(".badge2").html(res.total);
					                        
					                        setTimeout(function(){ updateMessageCount() }, 3000);
					                    }
					                })
					            }
					        });
	                }
	            });
	        }
	    });
	    
	}    
	
	setTimeout(function(){ updateMessageCount() }, 3000);
   </script>
   <!-- Quickblox Js End -->