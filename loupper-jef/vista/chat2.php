<?php 
	session_start();
  include_once("../App/config.inc.php");
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="../css/style.css">
	<link rel="stylesheet" type="text/css" href="../css/bootstrap-drawer.css">
  <link rel="stylesheet" type="text/css" href="../css/bootstrap-dialog.min.css">
  <link rel="stylesheet" type="text/css" href="../css/bootstrap-dialog.min.css">
    <!--const-->
    <script type="text/javascript" src="../App/config.js"></script>
  <style type="text/css">
    html,body{
      margin:0px;
      height:100%;
    }
  </style>

	<title>Loupper</title>
</head>
<body>

<!-- roboto black italic 18 -->

    <?php include_once "header2.php"; ?>
    <?php include_once "sidebar.php"; ?>
        <div class="col-xs-12 col-sm-4 col-md-3 col-lg-3 border-lista" style=" height:100%;">
            <div class="row separa10">
              <div class="col-xs-10" style="padding-left: 5%;">
                <div class="input-group">
                  <div class="input-group-btn">
                    <button class="btn btn-default busqueda" id="buscar"><i class="glyphicon glyphicon-search"></i></button>
                  </div>
                  <input type="text" class="form-control busqueda text-rr text-10" id="srch-term" placeholder="Buscar">
                </div>
              </div>  
              <div class="col-xs-2"><img src="../img/img-difusion.png" class="center-block"></div>  
            </div>
            <div class="row separa15" style="height: auto;">
              <div class="col-xs-2">
                <div class="div-avatar"><img src="../img/avatar-empty-list.png"></div>
                <div class="div-status"><img src="../img/list-on.png"></div>
              </div>
              <div class="col-xs-8">
                <p class="text-rbo text-10 margen-sup-0">Nombre</p>
              </div>
              <div class="col-xs-2 text-center">
                <p class="text-rr text-7">HORA</p>
                <span class="badge text-rr text-8"></span>                
              </div>
            </div>
            <div class="row separator separa7">&nbsp;</div>
            <div class="row separa10">
              <div class="col-xs-2">
                <div class="div-avatar"><img src="../img/avatar-empty-list.png"></div>
                <div class="div-status"><img src="../img/list-off.png"></div>
              </div>
              <div class="col-xs-8">
                <p class="text-rbo text-10 margen-sup-0">Nombre</p>
                <p class="text-rr text-8">Nombre Página</p>
              </div>
              <div class="col-xs-2 text-center">
                <p class="text-rr text-7">HORA</p>
                <span class="badge text-rr text-8">7</span>                                
              </div>
            </div>
            <div class="row separator">&nbsp;</div>
            <div class="row separa10">
              <div class="col-xs-2">
                <div class="div-avatar"><img src="../img/avatar-empty-list.png"></div>
                <div class="div-status"><img src="../img/list-off.png"></div>
              </div>
              <div class="col-xs-8">
                <p class="text-rbo text-10 margen-sup-0">Nombre</p>
                <p class="text-rr text-8">Nombre Página</p>
              </div>
              <div class="col-xs-2 text-center">
                <p class="text-rr text-7">HORA</p>
                <span class="badge text-rr text-8">7</span>                                
              </div>
            </div>
            <div class="row separator">&nbsp;</div>
            <div class="row separa10">
              <div class="col-xs-2">
                <div class="div-avatar"><img src="../img/avatar-empty-list.png"></div>
                <div class="div-status"><img src="../img/list-off.png"></div>
              </div>
              <div class="col-xs-8">
                <p class="text-rbo text-10 margen-sup-0">Nombre</p>
                <p class="text-rr text-8">Nombre Página</p>
              </div>
              <div class="col-xs-2 text-center">
                <p class="text-rr text-7">HORA</p>
                <span class="badge text-rr text-8">7</span>                                
              </div>
            </div>

        </div>
        <div class="col-xs-12 col-sm-5 col-md-7 col-lg-7" style=" height:100%;">
            <div class="row separa5">
              <div class="col-xs-2"><img src="../img/avatar-empty.png" class="img-responsive pull-right"></div>
              <div class="col-xs-10">
                  <p style="margin-bottom: 0px;"><span class="text-rbo text-14">Nombre | </span><span class="text-rr text-14">Nombre Página</span></p>
                  <p class="text-rr text-8" style="margin-bottom: 0px;"><img src="../img/online.png"> Conectado | Hora</p>                
              </div>
            </div>
            <div class="row separator">&nbsp;</div>
            <div class="row" style="bottom: 0px;position:absolute;width: 99.99%;">
              <div class="col-xs-12" style="background-color: #E4E6E9; padding-top: 10px; padding-bottom: 10px;">
                <div class="input-group">
                  <input type="text" class="form-control input-chat" placeholder="Escriba un mensaje aquí" >
                  <div class="input-group-btn">
                    <button class="btn btn-default clip-chat" type="button"><img src="../img/clip-chat.png"></button>
                    <img src="../img/img-envia-chat.png" style="margin-left: 10px;">
                  </div>
                </div>
              </div>           
            </div>
        </div>
      </div>
   </div>

   <script src="../js/jquery-1.11.3.js"></script>
   <script src="../js/bootstrap.js"></script>
   <script src="../js/ie-emulation-modes-warning.js"></script>
   <script src="../js/drawer.js"></script>
   <script src="../js/run_prettify.min.js"></script>
   <script src="../js/bootstrap-dialog.min.js"></script>
   <script src="../controlador/comun.js"></script>
   <script src="../controlador/chat.js"></script>
			
</body>
</html>