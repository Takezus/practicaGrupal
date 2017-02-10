<?php 
	session_start();
    if (!array_key_exists("id_usuario",$_SESSION)){
        $conexion = 0;
    }else{
        $conexion = 1;
        $id_negocio = $_SESSION['id_negocio'];
    } 
  include_once("../App/config.inc.php");
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
  <title>Lupper</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="../css/style.css">
	<link rel="stylesheet" type="text/css" href="../css/sticky-footer-navbar.css">
	<link rel="stylesheet" type="text/css" href="../css/bootstrap-drawer.css">
  <link rel="stylesheet" type="text/css" href="../css/bootstrap-dialog.min.css">
  <!--Const-->
  <script type="text/javascript" src="../App/config.js"></script>
</head>
<body class="has-drawer">

<!-- roboto black italic 18 -->

    <?php include_once "header.php"; ?>

    <input type="hidden" id="conexion" value="<?php echo $conexion; ?>">
    <input type="hidden" id="id_negocio" value="<?php echo $id_negocio; ?>">
    <input type="hidden" id="donde" value="">
    <input type="hidden" id="pagina" value="index">

    <!-- Begin page content -->
    <div class="container visible-md visible-lg" style="margin-top: 100px; margin-bottom: 50px;">
      <div class="row">
        <div class="col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3">
            <img src="../img/logo1.png" class="img-responsive center-block">
        </div>
      </div>
    </div>

    <div class="container visible-xs visible-sm" style="margin-top: 50px; margin-bottom: 50px;">
      <div class="row">
        <div class="col-xs-10 col-xs-offset-1">
            <img src="../img/logo1.png" class="img-responsive center-block">
        </div>
      </div>
    </div>

    <div class="container-fluid visible-md visible-lg">
      <div class="row">
        <div class="col-xs-12 col-fluid">
          <div calss="diez_de_diamantes"><img src="../img/fondobuscar.png" class="img-responsive fulld"></div>
          <div class="sota_de_trebol colorwhite text-rbi text-25">
              LA FORMA MÁS FÁCIL DE CHATEAR
          </div>
          <div class="sota_de_hojas colorwhite text-rbi text-25 topxsbuscar">
              DIRECTAMENTE CON LO QUE BUSCAS
          </div>
          <div class="sota_de_diamantes colorwhite">
              <div class="container">
                <div class="row">

                  <div class="col-xs-8 col-xs-offset-2 col-lg-8 col-lg-offset-2">

                    <div class="form-group">
                        <label for="paginas" class="text-rr text-20">Páginas</label>
                        <div class="select text-rr text-16" style="height: 40px;">
                            <select class="form-control text-rr text-16" id="paginas" style="height: 40px;">

                            </select>
                        </div>    
                    </div> 


                  </div>

<!--                   <div class="col-xs-8 col-xs-offset-2 col-lg-8 col-lg-offset-2 input-group">
                    <input type="text" class="form-control input-lg" name="srch-term" id="srch-term">
                    <div class="input-group-btn">
                        <img src="../img/buscar.png" id="buscar" class="buscar-btn">
                    </div>
                  </div> -->
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>


    <div class="container-fluid visible-xs visible-sm">
      <div class="row">
        <div class="col-xs-12 col-fluid">
          <div calss="diez_de_diamantes"><img src="../imgm/img-buscar.png" class="img-responsive fulld"></div>
          <div class="sota_de_diamantes2 colorwhite">
              <div class="container">
                <div class="row">
                  <div class="col-xs-8 col-xs-offset-2 col-lg-8 col-lg-offset-2 input-group">
                    <input type="text" class="form-control input-lg" name="srch-term" id="srch-term">
                    <div class="input-group-btn">
                        <img src="../imgm/lupa.png" id="buscar" class="buscar-btn">
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div class="sota_de_trebol2 colorwhite">
              <div class="container">
                <div class="row">
                  <div class="col-xs-12">
                        <img src="../imgm/publicar.png" id="buscar">
                  </div>
                </div>
              </div>            
          </div>
        </div>
      </div>
    </div>

    <div class="container visible-xs visible-sm" style="margin-top: 15%">
      <div class="row">
        <div class="col-xs-9">
          <img src="../imgm/cat1.png" style="margin-left: 5%;"><span class="text-rr text-12" style="margin-left: 3%;">Categoría 1</span>
        </div>
        <div class="col-xs-2">
          <img src="../imgm/mas.png" class="pull-left">
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <img src="../imgm/barra-home.png" style="margin-left: 5%;">
        </div>
      </div>
      <div class="row" style="margin-top: 5%;">
        <div class="col-xs-9">
          <img src="../imgm/cat2.png" style="margin-left: 5%;"><span class="text-rr text-12" style="margin-left: 3%;">Categoría 2</span>
        </div>
        <div class="col-xs-2">
          <img src="../imgm/mas.png" class="pull-left">
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <img src="../imgm/barra-home.png" style="margin-left: 5%;">
        </div>
      </div>
      <div class="row" style="margin-top: 5%; margin-bottom: 10%;">
        <div class="col-xs-9">
          <img src="../imgm/cat3.png" style="margin-left: 5%;"><span class="text-rr text-12" style="margin-left: 3%;">Categoría 3</span>
        </div>
        <div class="col-xs-2">
          <img src="../imgm/mas.png" class="pull-left">
        </div>
      </div>
    </div>


    <div class="container-fluid separa1 visible-md visible-lg col-mostasa">
      <div class="row">
        <div class="col-sm-4 col-lg-4 col-mostasa col-mostasa-wid">
          <img src="../img/circle1.png" class="img-responsive pull-right" style="margin-top:9%;">
        </div>
        <div class="col-sm-4 col-lg-4 col-mostasa col-mostasa-wid">
          <img src="../img/circle2.png" class="img-responsive center-block" style="margin-top:9%;">
        </div>
        <div class="col-sm-4 col-lg-4 col-mostasa col-mostasa-wid">
          <img src="../img/circle3.png" class="img-responsive pull-left" style="margin-top:9%;">
        </div>
      </div>
    </div>

<!--     <div class="container-fluid separa1 visible-xs">
      <div class="row">
        <div class="col-xs-12 col-mostasa col-mostasa-wid">
          <div class="center-center"><img src="../img/circle1.png" class="img-responsive center-block"></div>
        </div>
        <div class="col-xs-12 col-mostasa col-mostasa-wid">
          <div class="center-center"><img src="../img/circle2.png" class="img-responsive center-block"></div>
        </div>
        <div class="col-xs-12 col-mostasa col-mostasa-wid">
          <div class="center-center"><img src="../img/circle3.png" class="img-responsive center-block"></div>
        </div>
      </div>
    </div> -->

    <div class="container visible-md visible-lg separa5">
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

<!--     <div class="container visible-xs">
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

 -->    <!-- <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12 col-fluid">
            <img src="../img/barramostasa.png" class="img-responsive fulld">
        </div>
      </div>
    </div> -->

      <div class="container colofooter visible-md visible-lg">
        <div class="row">
          <div class="col-sm-4  topfooter text-rr colorwhite">
              <div class="row">
                <p class="text-rb text-10 margen-l2">Loupper.com</p>
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

<!--       <div class="container visible-xs" style="width: 100%; background-color: #514f50 !important;">
        <div class="row" style="height:200px;">
          <div class="col-xs-8 col-xs-offset-3 col-sm-offset-1 text-rr colorwhite">
              <div class="row" style="margin-top:20px;">
                  <div class="col-xs-12"><p class="text-rb text-10">Louper.com</p></div>
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
 -->
    <?php include_once "modal.php"; ?>
   <script src="../js/jquery-1.11.3.js"></script>
   <script src="../js/bootstrap.js"></script>
   <script src="../js/funciones.js"></script>
   <script src="../js/ie-emulation-modes-warning.js"></script>
   <script src="../js/drawer.js"></script>
   <script src="../js/run_prettify.min.js"></script>
   <script src="../js/bootstrap-dialog.min.js"></script>
   <script src="../controlador/index.js"></script>
	 <script src="../controlador/comun.js"></script>		
</body>
</html>