<!-- roboto black italic 18 -->

    <?php include_once "header2.php"; ?>

    <input type="hidden" id="conexion" value="<?php echo $conexion; ?>">
    <input type="hidden" id="donde" value="">
    <input type="hidden" id="pagina" value="publicar">
    <input type="hidden" id="id_usuario" value="<?php echo $id_usuario;  ?>">

    <!-- Begin page content -->
    <div class="container" style="margin-top: 100px; margin-bottom: 50px;">
      <div class="row">
            <div class="col-xs-12 text-center">
                <p class="text-rr text-20" id="titulo">Publica tu Página de Loupper y date a conocer en tu país</p>
                <p class="text-rbo text-25" id="ntitulo">¡Prueba el Plan GRATIS sin compromisos!</p>
                <p class="text-rbo text-20" style="margin-top: 3%">SELECCIONA TU PLAN</p>
            </div>  
      </div>
    </div>

    <div class="container" style="margin-top: 3%;" id="planes">
    </div>

    <div class="container" style="margin-top: 5%;">
      <div class="row">
            <div class="col-xs-12 text-center">
                <img src="../img/barra-div.png" style="width: 100%">
            </div>  
      </div>
    </div>


    <div class="container" style="margin-top: 3%;">
      <div class="row">
            <div class="col-xs-12 text-center">
                <p class="text-rbo text-16">PREGUNTAS FRECUENTES</p>
            </div>  
      </div>
    </div>

    <div class="container" style="margin-top: 1%; margin-bottom: 3%;" id="preguntas">
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
   <script src="../js/funciones.js"></script>
   <script src="../js/ie-emulation-modes-warning.js"></script>
   <script src="../js/drawer.js"></script>
   <script src="../js/run_prettify.min.js"></script>
   <script src="../js/bootstrap-dialog.min.js"></script>
   <script src="../controlador/publicar.js"></script>
	 <script src="../controlador/comun.js"></script>
	 <?php include_once "footer_js.php"; ?>		
</body>
</html>