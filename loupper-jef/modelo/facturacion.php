<?php 
    include_once "header2.php";
    include_once "sidebar.php"; ?>
        <div class="col-xs-12 col-sm-9 col-md-10 col-lg-10 border-lista">
              <div class="row separa2 border-age" style="margin-left: 2%; margin-right: 0.5%;">
                  <div class="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                    <p class="text-rbo text-12 margen-sup-0">Datos de la Cuenta</p>
                    <p class="text-rr text-10 margen-sup-0">Nombre: Nombre 1</p>
                    <p class="text-rr text-10 margen-sup-0">Email: email@email.com</p>
                    <p class="text-rr text-10">Usuario Loupper desde: 01/01/2016</p>
                  </div>
                  <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2">
                    <a href="editar_cuenta.php"><img src="../img/cmd-actualizar.png" class="img-responsive center-block" style="margin-top:25%"></a>
                  </div>
              </div>
            <div class="row separa5">
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div class="row border-age margen-age-left">
                        <div class="col-sm-9 col-md-9 col-lg-9" style="padding-top: 1%;padding-bottom: 1%;">
                            <p class="text-rbo text-12 margen-sup-0">Plan Actual</p>
                            <p class="text-rr text-10">Plan 1</p>
                        </div>
                        <div class="col-sm-3 col-md-3 col-lg-3">
                            <div class="row">
                                <a href="cambiar_plan.php"><img src="../img/cmd-cambio-plan.png" class="center-block" style="margin-top:20%"> </a>
                            </div>
                        </div>
                    </div>
                    <div class="row border-age margen-age-left separa2">
                        <div class="col-sm-9 col-md-9 col-lg-9" style="padding-top: 1%;padding-bottom: 1%;">
                            <p class="text-rbo text-12 margen-sup-0">Forma de Pago</p>
                            <p class="text-rr text-10">Visa terminada en 0000</p>
                        </div>
                        <div class="col-sm-3 col-md-3 col-lg-3">
                            <div class="row">
                                <img src="../img/cmd-actualizar.png" class="center-block" style="margin-top:20%">  
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div class="row border-age margen-age-right">
                        <div class="col-sm-9 col-md-9 col-lg-9" style="padding-top: 1%;padding-bottom: 1%;">
                            <p class="text-rbo text-12 margen-sup-0">Ciclo de Facturación</p>
                            <p class="text-rr text-10">1 Mes</p>
                        </div>
                        <div class="col-sm-3 col-md-3 col-lg-3">
                            <div class="row">
                                <img src="../img/cmd-cambiar.png" class="center-block" style="margin-top:20%">  
                            </div>
                        </div>
                    </div>                    
                    <div class="row border-age margen-age-right separa2">
                        <div class="col-sm-9 col-md-9 col-lg-9" style="padding-top: 1%;padding-bottom: 1%;">
                            <p class="text-rbo text-12 margen-sup-0">Historial de Pagos</p>
                            <p class="text-rr text-10">&nbsp;</p>
                        </div>
                        <div class="col-sm-3 col-md-3 col-lg-3">
                            <div class="row">
                                <img src="../img/cmd-ver.png" class="center-block" style="margin-top:20%">  
                            </div>
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
   <script src="../controlador/facturacion.js"></script>
			
</body>
</html>