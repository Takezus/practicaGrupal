<?php 
    include_once "header2.php";
    include_once "sidebar.php"; 
    
?>

        <input type="hidden" id="id_pagina" value="<?php echo $id_negocio; ?>">
        <input type="hidden" id="pagina_id" value="facturacion">
        <div class="col-xs-12 col-sm-9 col-md-10 col-lg-10 border-lista">
              <div class="row separa2 border-age" style="margin-left: 2%; margin-right: 0.5%;">
                  <div class="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                    <p class="text-rbo text-12 margen-sup-0">Datos de la Cuenta</p>
                    <p class="text-rr text-10 margen-sup-0" id="nombre">Nombre: Nombre 1</p>
                    <p class="text-rr text-10 margen-sup-0" id="email">Email: email@email.com</p>
                    <p class="text-rr text-10" id="desde">Usuario Loupper desde: 01/01/2016</p>
                  </div>
                  <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2">
                    <a href="editar_cuenta.php"><img src="../img/actualizar-new.png" class="img-responsive center-block" style="margin-top:25%"></a>
                  </div>
              </div>
            <div class="row separa5">
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div class="row border-age margen-age-left">
                        <div class="col-sm-9 col-md-9 col-lg-9" style="padding-top: 1%;padding-bottom: 1%;">
                            <p class="text-rbo text-12 margen-sup-0">Plan Actual</p>
                            <p class="text-rr text-10" id="plan">Plan 1</p>
                        </div>
                        <div class="col-sm-3 col-md-3 col-lg-3">
                            <div class="row">
                                <a href="cambiar_plan.php"><img src="../img/cambio-plan-new.png" class="center-block" style="margin-top:15%"> </a>
                            </div>
                        </div>
                    </div>
                    <div class="row border-age margen-age-left separa2">
                        <div class="col-sm-9 col-md-9 col-lg-9" style="padding-top: 1%;padding-bottom: 1%;">
                            <p class="text-rbo text-12 margen-sup-0">Historial de Pagos</p>
                            <p class="text-rr text-10">&nbsp;</p>
                        </div>
                        <div class="col-sm-3 col-md-3 col-lg-3">
                            <div class="row">
                                <img src="../img/ver-new.png" class="center-block puntero" style="margin-top:15%" id="pagos">  
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div class="row border-age margen-age-right">
                        <div class="col-sm-9 col-md-9 col-lg-9" style="padding-top: 1%;padding-bottom: 1%;">
                            <p class="text-rbo text-12 margen-sup-0">Ciclo de Facturación</p>
                            <p class="text-rr text-10" id="ciclo">1 Mes</p>
                        </div>
                        <div class="col-sm-3 col-md-3 col-lg-3">
                            <div class="row">
                                <a href="cambiar_plan.php"><img src="../img/cambiar-new.png" class="center-block" style="margin-top:15%"></a>  
                            </div>
                        </div>
                    </div>                    
                    <div class="row border-age margen-age-right separa2">
<!--                         <div class="col-sm-9 col-md-9 col-lg-9" style="padding-top: 1%;padding-bottom: 1%;">
                            <p class="text-rbo text-12 margen-sup-0">Historial de Pagos</p>
                            <p class="text-rr text-10">&nbsp;</p>
                        </div>
                        <div class="col-sm-3 col-md-3 col-lg-3">
                            <div class="row">
                                <img src="../img/cmd-ver.png" class="center-block" style="margin-top:20%">  
                            </div>
                        </div> -->
                    </div>                    
                </div>
            </div>  
        </div>
      </div>
   </div>

   

    <!--          PAGOS              -->
    

    <div class="modal fade" id="panPagos" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
        <div class="modal-dialog" role="document" style="width: 1000px;">
            <div class="modal-content modal-fondo">
            <div class="modalll"></div>
                <div class="modal-header">
                    <div class="row" >
                        <div class="col-md-12">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="modal-body" style="padding-left: 40px; padding-right: 40px; padding-top: 0px; margin-top: 0px;">
                    <div class="row">
                        <div class="col-md-12 col-lg-12 text-rbo text-16">
                            HISTORIAL DE PAGOS
                        </div>          
                    </div>
                    <div class="row" style="margin-top: 30px;">
                        <div class="col-md-12 col-lg-12">
                            <table class="table">
                              <thead>
                                <tr class="text-rr text-10">
                                  <th width="10%">N°</th>
                                  <th width="20%">Fecha</th>
                                  <th width="60%">Detalle</th>
                                  <th width="10%">Cantidad</th>
                                </tr>
                              </thead>
                              <tbody id="tabla">
                                
                              </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal inicia session-->



<?php include_once "modal.php"; ?>

   <script src="../js/jquery-1.11.3.js"></script>
   <script src="../js/bootstrap.js"></script>
   <script src="../js/ie-emulation-modes-warning.js"></script>
   <script src="../js/drawer.js"></script>
   <script src="../js/funciones.js"></script>
   <script src="../js/run_prettify.min.js"></script>
   <script src="../js/bootstrap-dialog.min.js"></script>
   <script src="../controlador/comun.js"></script>
   <script src="../controlador/facturacion.js"></script>
	<?php include_once "footer_js.php"; ?>
</body>
</html>
