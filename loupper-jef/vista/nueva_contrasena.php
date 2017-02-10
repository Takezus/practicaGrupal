<?php 
  session_start();
    if (!array_key_exists("id_usuario",$_SESSION)){
        $conexion = 0;
    }else{
        $conexion = 1;
    } 
    include_once("../App/config.php");
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
  <link rel="stylesheet" type="text/css" href="../css/style.css">
  <link rel="stylesheet" type="text/css" href="../css/sticky-footer-navbar.css">
  <link rel="stylesheet" type="text/css" href="../css/bootstrap-drawer.css">
  <link rel="stylesheet" type="text/css" href="../css/bootstrap-dialog.min.css">
    <!--const-->
    <script type="text/javascript" src="../App/config.js"></script>
	<title>Loupper</title>
</head>
<body class="has-drawer">



    <?php include_once "header2.php"; ?>

    <!-- Begin page content -->
    <div class="container" style="margin-top: 100px; margin-bottom: 50px;">
      <div class="row">
        <div class="col-xs-8 col-xs-offset-2 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3">
            <label class="tituloForgot">CREA TU CONTRASEÑA</label>
        </div>
      </div>
    </div>

    <input type="hidden" id="conexion" value="<?php echo $conexion; ?>">
    <input type="hidden" id="donde" value="">
    
    <div class="container-fluid">
      
      
      <div class="row separa2">
         <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
            <form>
              
              <div class="form-group center-block" style="max-width: 522px;">
                <label for="clave" class="text-rr text-12">Contraseña <span style="color: #e12f31;">*</span></label>
                <input type="password" class="form-control" id="clave">
              </div>
              <div class="form-group center-block" style="max-width: 522px;">
                <label for="clave2" class="text-rr text-12">Repetir contraseña <span style="color: #e12f31;">*</span></label>
                <input type="password" class="form-control" id="clave2">
              </div>
            </form>
         </div>
      </div>
      
      <div class="row separa2">
         <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
            <a id="registrate"><img src="../img/crear.png" class="img-responsive center-block"></a>
         </div>
      </div>
      
  </div>

    <div class="container visible-sm visible-md visible-lg separa5">
      <div class="row">
        <div class="col-sm-6 col-md-5">
          <img src="../img/movil.png" class="img-responsive pull-right">
        </div>
        <div class="col-sm-6 col-md-7">
            <div class="row separa15">
              <div class="col-lg-12">                
              </div>
            </div>
            <div class="row">
              <div class="col-sm-8 col-md-8">
                <p class="text-rb text-20">¡Descarga Loupper en tu Celular!</p>
                <p class="text-rr text-14" style="margin-bottom: 0px !important;">La forma más fácil de chatear directamente con lo que buscas</p>
              </div>
            </div>
            <div class="row separa2">
                  <div class="col-sm-5 col-md-3">
                    <img src="../img/gplay.png" class="img-responsive">
                  </div>
                  <div class="col-sm-5 col-md-3">
                    <img src="../img/iplay.png" class="img-responsive">
                  </div>  
            </div>
        </div>
      </div>
    </div>

    <div class="container visible-xs">
      <div class="row">
        <div class="col-xs-12">
            <div class="row separa10">
              <div class="col-xs-12">
                <img src="../img/textmovil.png" class="img-responsive pull-left">
              </div>
            </div>
            <div class="row separa2">
                  <div class="col-xs-6">
                    <img src="../img/gplay.png" class="img-responsive">
                  </div>
                  <div class="col-xs-6">
                    <img src="../img/iplay.png" class="img-responsive">
                  </div>  
            </div>
        </div>
        <div class="col-xs-12 separa10">
          <img src="../img/movil.png" class="img-responsive center-block">
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12 col-fluid">
            <img src="../img/barramostasa.png" class="img-responsive fulld">
        </div>
      </div>
    </div>

      <div class="container colofooter visible-sm visible-md visible-lg">
        <div class="row">
          <div class="col-sm-4  topfooter text-rr colorwhite">
              <div class="row">
                <p class="text-rb text-10 margen-l2">Louper.com</p>
              </div>
              <div class="row">
                <p class="text-rr text-10 margen-l2">Nosotros</p>
              </div>
              <div class="row">
                <p class="text-rr text-10 margen-l2">Contacto</p>
              </div>
              <div class="row">
                <p class="text-rr text-10 margen-l2"><a href="politicas.php" class="terminos">Términos Legales</a></p>
              </div>
          </div>
          <div class="col-sm-4 topfooter text-rr colorwhite">
            <p class="text-rb text-10 margen-l">Aplicaciones Móviles</p>
            <p class="text-rr text-10 margen-l">Google Play</p>
            <p class="text-rr text-10 margen-l">App Store</p>
          </div>
          <div class="col-sm-4 topfooter text-rr colorwhite">
            <p class="text-rb text-10 margen-l3">Redes Sociales</p>
           <p class="margen-l3">
              <a href="https://www.facebook.com/loupperapp/"><img src="../img/facemini.png"></a>
              <a href="https://www.instagram.com/loupperapp/"><img src="../img/instmini.png"></a>
              <a href="https://twitter.com/loupperapp"><img src="../img/twitmini.png"></a>
            </p>
            <p class="margen-l3">
              <img src="../img/visa.png">
              <img src="../img/mastercard.png">
            </p>
          </div>
        </div>
      </div>

      <div class="container-fluid visible-md visible-lg" style="background-color: #514f50 !important;">
        <div class="row">
          <p class="copyrigth">© 2016 Loupper.com AG® Registered All rights reserved. Diseñado y Desarrollado por <a href="http://www.pixsolution.com.pa/">PixSolution</a></p>
        </div>     
      </div>

      <div class="container visible-xs" style="width: 100%; background-color: #514f50 !important;">
        <div class="row" style="height:200px;">
          <div class="col-xs-8 col-xs-offset-3 col-sm-offset-1 text-rr colorwhite">
              <div class="row" style="margin-top:20px;">
                  <div class="col-xs-12"><p class="text-rb text-10">Loupper.com</p></div>
              </div>
              <div class="row" style="margin-top:10px;">
                  <div class="col-xs-12"><p class="text-rr text-10">Nosotros</p></div>
              </div>
              <div class="row" style="margin-top:10px;">
                  <div class="col-xs-12"><p class="text-rr text-10">Contacto</p></div>
              </div>
              <div class="row" style="margin-top:10px;">
                  <div class="col-xs-12"><p class="text-rr text-10">Términos Legales</p></div>
              </div>
              <div class="row" style="margin-top:10px;">
                  <div class="col-xs-12"><p class="text-rb text-10">Aplicaciones Móviles</p></div>
              </div>
              <div class="row" style="margin-top:10px;">
                  <div class="col-xs-12"><p class="text-rr text-10">Google Play</p></div>
              </div>
              <div class="row" style="margin-top:10px;">
                  <div class="col-xs-12"><p class="text-rr text-10">App Store</p></div>
              </div>
              <div class="row" style="margin-top:10px; margin-bottom:20px!important;">
                <div class="col-xs-12"><p class="text-rb text-10">Redes Sociales</p></div>
              </div>
              <div class="col-xs-12">
                <div class="row">
                  <p>
                    <img src="../img/facemini.png">
                    <img src="../img/instmini.png">
                    <img src="../img/twitmini.png">
                  </p>
                </div>  
              </div>
          </div>
        </div>
      </div>

    <?php include_once "modal.php"; ?>
   <script src="../js/jquery-1.11.3.js"></script>
   <script src="../js/bootstrap.js"></script>
   <script src="../js/ie-emulation-modes-warning.js"></script>
   <script src="../js/drawer.js"></script>
   <script src="../js/funciones.js"></script>
   <script src="../js/moment.js"></script>
   <script src="../js/transition.js"></script>
   <script src="../js/collapse.js"></script>
   <script src="../js/bootstrap-datetimepicker.min.js"></script>
   <script src="../js/run_prettify.min.js"></script>
   <script src="../js/bootstrap-dialog.min.js"></script>
   <script src="../controlador/registro.js"></script>
   <script src="../controlador/comun.js"></script>
<script src="https://cdn.firebase.com/js/client/2.4.2/firebase.js"></script>
   
      
</body>
</html>
