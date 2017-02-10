<!-- roboto black italic 18 -->

    <?php include_once "header2.php"; ?>

    <input type="hidden" id="conexion" value="<?php echo $conexion; ?>">
    <input type="hidden" id="donde" value="">
    <input type="hidden" id="pagina" value="publicar">
    <input type="hidden" id="id_usuario" value="<?php echo $id_usuario;  ?>">
    <input type="hidden" id="idoperador" value="<?php echo $idoperador; ?>">

    <div class="container">
      <div class="row" style="margin-top: 5%;">
        <div class="col-md-12 col-lg-12 text-rbo text-16 text-center">
          CREA TU CONTRASEÑA
        </div>
      </div>
      <div class="row" style="margin-top: 5%;">
        <div class="col-md-8 col-offset-2 col-lg-8 col-lg-offset-2">
            <div class="form-group">
                <label for="clave1" class="text-rr text-12">Contraseña</label>
                <input type="password" class="form-control text-rr text-12" id="clave1">
            </div>           
        </div>
        <div class="col-md-8 col-offset-2 col-lg-8 col-lg-offset-2">
            <div class="form-group">
                <label for="clave2" class="text-rr text-12">Repetir Contraseña</label>
                <input type="password" class="form-control text-rr text-12" id="clave2">
            </div>           
        </div>
      </div>
      <div class="row" style="margin-top: 20px; margin-bottom: 5%;">
        <div class="col-md-8 col-offset-2 col-lg-8 col-lg-offset-2">
          <span class="btn btncustom text-rbo text-13" style="height: 40px !important;padding-top: 10px !important;" id="crear">
                        Crear
          </span>
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
   <script src="../js/jquery.md5.min.js"></script>
   <script src="../js/bootstrap.js"></script>
   <script src="../js/funciones.js"></script>
   <script src="../js/ie-emulation-modes-warning.js"></script>
   <script src="../js/drawer.js"></script>
   <script src="../js/run_prettify.min.js"></script>
   <script src="../js/bootstrap-dialog.min.js"></script>
   <script src="../controlador/clave.js"></script>
	 <script src="../controlador/comun.js"></script>	
	 	
</body>
</html>