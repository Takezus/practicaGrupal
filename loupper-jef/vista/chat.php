<?php 

	 include_once "header2.php";
    include_once "sidebar.php"; ?>
    <link rel="stylesheet" href="../js/chat/libs/stickerpipe/css/stickerpipe.min.css">
	 <link rel="stylesheet" href="../js/chat/css/style.css">

	 <input type="hidden" id="pagina" value="chat">
	 <input type="hidden" id="idusuario" value="<?php echo $id_usuario; ?>">
	 <input type="hidden" id="idpagina" value="<?php echo $id_negocio; ?>">
	 
	 	<div id="main_block">
        <div class="col-xs-12 col-sm-4 col-md-3 col-lg-3 border-lista" style="overflow: scroll; height:99.99%;" id="users">
            <div class="row separa10">
              <div class="col-xs-12" style="padding-left: 5%;">
                    <div class="input-group">
                      <span class="input-group-addon btn-bus" style="border-bottom: 1px solid #ebebeb;"><img src="../img/cmd-search.png" ></span>
                      <input type="text" class="form-control busqueda text-rr text-10" aria-label="Amount (to the nearest dollar)" placeholder="Buscar">
                      
                    </div>    
                    
                    <div class="list-group pre-scrollable nice-scroll" id="dialogs-list">
                  		<!-- list of chat dialogs will be here -->
                	 </div>    
              </div>  
            </div>       
        </div>
        <div class="col-xs-12 col-sm-5 col-md-7 col-lg-7" style="height:100%;">
       
            <div class="row separa5">
            <div class="row">
            	<div class="chatNombre">
            		<div class="avatar">
            			<img src="../img/avatar-empty-2.png">
            		</div>
            		<span class="text-rbo text-14" id="nombreprincipal">Nombre</span>
            		<span class="text-rr text-14" id="nombrepagina"> | Nombre Página</span><br>
            		<span><img src="../img/online.png"> Conectado | Hora</span>
            	</div>
            </div>
            
            </div>
            <div class="row separator">&nbsp;</div>
            
            <?php /*<div class="row" style="overflow: scroll; height: 75%;" id="mcs_container">
            		<div class="container del-style">
              		<div class="col-lg-12 content list-group pre-scrollable nice-scroll" id="messages-list">
                
              		</div>
              </div> 
            </div>
            <form class="form-inline" role="form" method="POST" action="" onsubmit="return submit_handler(this)">
            <div class="row" style="bottom: 0px;position:absolute;width: 99.99%;">
				 <div><img src="../js/chat/images/ajax-loader.gif" class="load-msg"></div>
              <div class="col-xs-12" style="background-color: #E4E6E9; padding-top: 10px; padding-bottom: 10px;">
                <div class=" col-xs-12 input-group">
                  <input type="text" class="form-control input-chat" id="message_text" placeholder="Escriba un mensaje aquí" >
                  <div class="input-group-btn">
                  <input id="load-img" type="file">
                    <button class="btn btn-default clip-chat" id="imagenes" onclick="$('#load-img').click();"><img src="../img/clip-chat.png"></button>
                    <img src="../img/img-envia-chat.png" style="margin-left: 10px;cursor:pointer" id="enviar-msj" onclick="onclick="clickSendMessage()"">
                  </div>
                </div>
              </div>           
            </div>
            </form> */?>
            
            
            <div class="row" style="overflow: scroll; height: 75%;" >
              <div id="mcs_container" class="col-xs-12">
                <div class="container del-style">
                  <div class="content list-group pre-scrollable nice-scroll" id="messages-list">

                    <!-- list of chat messages will be here -->

                  </div>
                </div>

                <div><img src="../js/chat/images/ajax-loader.gif" class="load-msg"></div>
                <form class="form-inline" role="form" method="POST" action="" onsubmit="return submit_handler(this)">
                <div class="col-xs-12" style="background-color: #E4E6E9; padding-top: 10px; padding-bottom: 10px;">
                  <div class="input-group">
                    
                    <span class="input-group-btn input-group-btn_change_load" style="display:none">
  	                <button type="button" id="stickers_btn" class="btn btn-default" onclick="">
  		              <i class="icon-sticker"></i>
  	                </button>
                    </span>

                    <span class="input-group-btn" style="width: 100%;">
  	                 <input type="text" class="form-control" id="message_text" placeholder="Enter message">
                    </span>
						<span class="input-group-btn input-group-btn_change_load">
  	                  <input id="load-img" type="file">
  	                <button type="button" id="attach_btn" style="width:34px; height:20px; margin-left:10px;border:0px" class="btn btn-default" onclick="$('#load-img').click();">
  		              <img src="../img/clip-chat.png">
  	                </button>
                    </span>
                    <span class="input-group-btn">
  	                   <button  type="submit" id="send_btn" style="border:0px;background-color: #E4E6E9;" class="btn btn-default" onclick="clickSendMessage()"><img src="../img/img-envia-chat.png" alt="" /></button>
                    </span>
                    </div>
                  <img src="../js/chat/images/ajax-loader.gif" id="progress">
                 </div> 
                </form>
              </div>
            </div>  
        </div>
       </div> 
        
      </div>
   </div>

   <script src="../js/jquery-1.11.3.js"></script>
   <script src="../js/bootstrap.js"></script>
	<script src="../js/funciones.js"></script>
   <script src="../js/ie-emulation-modes-warning.js"></script>
   <script src="../js/drawer.js"></script>
   <script src="../js/run_prettify.min.js"></script>
   <script src="../js/bootstrap-dialog.min.js"></script>
   <script src="../controlador/comun.js"></script>
   <script src="../controlador/chat.js"></script>
   <script src="https://cdn.firebase.com/js/client/2.4.2/firebase.js"></script>
   
   <!-- Quickblox Js Start -->
   <?php if($_SESSION["email"] == "bhavik.talpada@swayaminfotech.com"){
   	?>
   		   <script type="text/javascript">
   		var QBUser1 = {
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
   		var QBUser1 = {
        id: <?php echo $_SESSION['quickblox_id']; ?>,
        name: '<?php echo $_SESSION["name_usuario"];  ?>',
        login: '<?php echo $_SESSION["email"];  ?>',
        pass: '12345678'
    	}
    	
    	var recipient_id = "<?php echo $_SESSION['quickblox_id']; ?>";
   </script>
  <?php } ?> 
   <script src="../js/chat/js/jquery.nicescroll.min.js"></script>
   <script src="../js/chat/js/jquery.timeago.min.js"></script>
   <script src="../js/chat/js/quickblox.min.js"></script>
   <script src="../js/chat/libs/stickerpipe/js/stickerpipe.js"></script>
   <script src="../js/chat/js/config.js"></script>
   <script src="../js/chat/js/connection.js"></script>
   <script src="../js/chat/js/messages.js"></script>
   <script src="../js/chat/js/stickerpipe.js"></script>
   <script src="../js/chat/js/ui_helpers.js"></script>
   <script src="../js/chat/js/dialogs.js"></script>
   <script src="../js/chat/js/users.js"></script>
   <!-- Quickblox Js End -->
			
</body>
</html>
