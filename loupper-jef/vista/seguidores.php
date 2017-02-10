<?php 
    include_once "header2.php";
    include_once "sidebar.php"; ?>
    <link rel="stylesheet" href="../js/chat/css/style.css">
        <div class="col-xs-12 col-sm-9 col-md-10 col-lg-10 border-lista">
              <div class="row separa2">
                  <div class="col-xs-10 col-sm-12 col-md-6 col-lg-6">
                    <div class="input-group" style="padding-left: 4%">
                      <span class="input-group-addon btn-bus" style="border-bottom: 1px solid #ebebeb;"><img src="../img/cmd-search.png" ></span>
                      <input type="text" class="form-control busqueda text-rr text-12" style="margin-top: 6px;" id="findOper" placeholder="Buscar">
                      <span class="input-group-addon btn-bus"><img src="../img/img-difusion2.png" id="massive-chat"></span>
                    </div>
                  </div>
                  <div class="col-xs-2 col-lg-1"></div> 
              </div>
            <div class="row separa5">
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6" id="col1">
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6" id="col2">
                </div>
            </div>  
        </div>
      </div>
   </div>

        <!-- chat -->
        <div id="chat-container" class="col-lg-12">

 
            <div class="panel panel-primary">
                <div class="panel-heading" id="chat-item-panel">
                    <span class="glyphicon glyphicon-comment"></span> Announcements
                    <div class="btn-group pull-right">
                        <a data-toggle="collapse" data-parent="#chat-item-panel" href="#mcs_container">
                            <i class="fa fa-angle-up"></i>
                        </a>
                    </div>
                </div>
            <div class="panel-collapse collapse" id="mcs_container">
                <div class="panel-body list-group pre-scrollable nice-scroll" id="messages-list">
                    
                </div>
                <div class="panel-footer">
                		<form class="form-inline" role="form" method="POST" action="" onsubmit="return submit_handler(this)">
                		 
		                  <div class="input-group">
		                    
		                    <span class="input-group-btn input-group-btn_change_load" style="display:none">
		  	                <button type="button" id="stickers_btn" class="btn btn-default" onclick="">
		  		              <i class="icon-sticker"></i>
		  	                </button>
		                    </span>
								<span class="input-group-btn input-group-btn_change_load" style="display:none">
		  	                  <input id="load-img" type="file">
		  	                <button type="button" id="attach_btn" style="width:34px; height:34px; margin-left:10px;" class="btn btn-default" onclick="$('#load-img').click();">
		  		              <img src="../img/clip-chat.png">
		  	                </button>
		                    </span>
		                    <span class="input-group-btn" style="width: 100%;">
		  	                 <input type="text" class="form-control" id="message_text" placeholder="Enter message">
		                    </span>
		
		                    <span class="input-group-btn">
		  	                   <button  type="submit" id="send_btn" class="btn btn-default" ><img  src="../img/img-envia-chat.png" alt="" /></button>
		                    </span>
		                    </div>
                  			<img src="../js/chat/images/ajax-loader.gif" id="progress">
                 
                      </form> 
                </div>
            </div>
            </div>

        </div>

    <script src="../js/jquery-1.11.3.js"></script>
    <script src="http://maps.google.com/maps/api/js?sensor=false"></script>
    <script src="../js/jquery.fancybox.pack.js?v=2.1.5"></script>
    <script src="../js/bootstrap.js"></script>
    <!--  Spiner -->
    <script src="../js/spin.js"></script>
    <!-- Sparkline -->
    <script src="../js/jquery.sparkline.min.js"></script>

    <script src="https://cdn.firebase.com/js/client/2.4.2/firebase.js"></script>

    
    <script src="../js/ie-emulation-modes-warning.js"></script>
    <script src="../js/drawer.js"></script>
    <script src="../js/run_prettify.min.js"></script>
    <script src="../js/bootstrap-dialog.min.js"></script>
    
    <script src="../controlador/comun.js"></script>
       <?php if($_SESSION["email"] == "bhavik.talpada@swayaminfotech.com"){
   	?>
   		   <script type="text/javascript">
   		var user = {
        id: <?php echo $_SESSION['quickblox_id']; ?>,
        name: '<?php echo $_SESSION["name_usuario"];  ?>',
        login: 'BhavikPatel',
        pass: '12345678'
    	}
    	var recipient_id = "<?php echo $_SESSION['quickblox_id']; ?>";
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
    	
    	var recipient_id = "<?php echo $_SESSION['quickblox_id']; ?>";
    	
   </script>
	<?php }?>

   <script src="../js/chat/js/jquery.nicescroll.min.js"></script>
   <script src="../js/chat/js/jquery.timeago.min.js"></script>
   <script src="../js/chat/js/quickblox.min.js"></script>
   <script src="../js/chat/libs/stickerpipe/js/stickerpipe.js"></script>
   <script src="../js/chat/js/config.js"></script>
   <script src="../controlador/seguidores.js"></script>
   <script src="../js/chat/js/messages.js"></script>
   <script src="../js/chat/js/stickerpipe.js"></script>
   <script src="../js/chat/js/ui_helpers.js"></script>
   <script src="../js/chat/js/dialogs.js"></script>
   <script src="../js/chat/js/users.js"></script>  

    <!-- Page Functions -->
    
    
    <!-- Quickblox Js Start -->
  	  
</body>
</html>