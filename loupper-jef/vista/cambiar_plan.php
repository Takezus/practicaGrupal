<?php 
    include_once "header2.php";
    include_once "sidebar.php"; ?>

        <input type="hidden" id="id_pagina" value="<?php echo $id_negocio; ?>">
        <div class="col-xs-12 col-sm-9 col-md-10 col-lg-10 border-lista">
            <div class="row" style="margin-top: 3%">
                <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
                    <div class="form-group">
                        <label for="paquete" class="text-rr text-12">Planes</label>
                        <select class="form-control" id="planes">
                        </select>
                    </div>  
                </div>    
                <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
                    <div class="form-group">
                        <label for="agentess" class="text-rr text-12">Número de operadores</label>
                        <select class="form-control" id="agentess">
                        </select>
                        <p class="help-block text-8" style="margin-left: 2%; font-family: Roboto-Regular !important;" id="textAgente">Has añadido 1 operador(s).</p>
                    </div>  
                </div>    
                <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
                    <div class="form-group">
                        <label for="ciclo" class="text-rr text-12">Ciclo de facturación</label>
                        <select class="form-control" id="ciclo">
                        </select>
                        <p class="help-block text-8" style="margin-left: 2%; font-family: Roboto-Regular !important;">Obten mayores descuentos con ciclos más largos.</p>
                    </div>  
                </div>    
            </div>
<!--             <div class="row">
                 <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-rr text-8" style="margin-top: 10px; padding-left: 7%;padding-right: 7%;">
                    <img src="../img/barra-div2.png" style="width: 100%; height: 1px;">
                 </div>
            </div>
            <div class="row" style="margin-top: 1%">
                <div class="col-lg-5 col-lg-offset-1 col-md-5 col-md-offset-1 col-sm-6 col-xs-6 text-rr text-11">
                  Próxima Fecha de Pago
                </div>
                <div class="col-lg-5 col-lg-offset-1 col-md-5 col-md-offset-1 col-sm-6 col-xs-6" style="padding-right: 10%;">
                  <span class="pull-right text-rb text-11">01 Febrero 2016</span>
                </div>
            </div>    
            <div class="row">
                 <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-rr text-8" style="margin-top: 10px; padding-left: 7%;padding-right: 7%;">
                    <img src="../img/barra-div2.png" style="width: 100%;">
                 </div>
            </div>
            <div class="row" style="margin-top: 10px;">
                <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 text-rr text-11">
                  Agentes en Plan Básico
                </div>
                <div class="col-lg-5 col-lg-offset-1 col-md-5 col-md-offset-1 col-sm-6 col-xs-6 text-rr text-11">
                  01 Enero 2016 a 01 Febrero 2016
                </div>
                <div class="col-lg-5 col-lg-offset-1 col-md-5 col-md-offset-1 col-sm-6 col-xs-6" style="padding-right: 10%;">
                  <span class="pull-right text-rb text-11">$ 00,00</span>
                </div>
                <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 text-rr text-11">
                  $ 00,00 / 1 mes
                </div>
            </div>    
            <div class="row">
                 <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-rr text-8" style="margin-top: 1%; padding-left: 7%;padding-right: 7%;">
                    <img src="../img/barra-div2.png" style="width: 100%; height: 5px;">
                 </div>
            </div>
            <div class="row" style="margin-top: 10px;">
                <div class="col-lg-5 col-lg-offset-1 col-md-5 col-md-offset-1 col-sm-6 col-xs-6 text-rr text-11">
                  Monto a Pagar
                </div>
                <div class="col-lg-5 col-lg-offset-1 col-md-5 col-md-offset-1 col-sm-6 col-xs-6" style="padding-right: 10%;">
                  <span class="pull-right text-rb text-11">$ 00,00</span>
                </div>
            </div>    
            <div class="row">
                 <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-rr text-8" style="margin-top: 10px; padding-left: 7%;padding-right: 7%;">
                    <img src="../img/barra-div2.png" style="width: 100%; height: 1px;">
                 </div>
            </div>
 -->            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top: 20px; text-align: center;">
                    <img src="../img/procesar_pedido.png" class="img-responsive center-block" id="procesar_pedido">                    
                </div>
            </div> 
        </div>
      </div>
   </div>

    <!--          EXTENDER PLAN              -->
    
    <div class="modal fade" id="panPlan" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
        <div class="modal-dialog" role="document" style="width: 800px;">
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
                <div class="modal-body" style="padding-left: 80px;padding-right: 80px; padding-top: 0px; margin-top: 0px;">
                    <div class="row">
                        <div class="col-md-12 col-lg-12 text-rbo text-16">
                            CAMBIAR PLAN
                        </div>          
                    </div>
                    <div class="row" style="margin-top: 20px;">
                        <div class="col-md-12 col-lg-12" style="border-bottom: 2px solid #ebebeb;">                            
                        </div>
                    </div>
                    <div class="row" style="margin-top: 20px;">
                        <div class="col-lg-7" style="padding-left: 20px;" id="detalles">

                        </div>
                        <div class="col-lg-5" style="padding-right: 20px;" id="montos">
                        </br>
                        </div>
                    </div>
                    <div class="row" style="margin-top: 20px;">
                        <div class="col-md-12 col-lg-12" style="border-bottom: 2px solid #ebebeb;">                            
                        </div>
                    </div>
                    <div class="row" style="margin-top: 20px;">
                        <div class="col-lg-7" style="padding-left: 20px;">
                            <p class="text-rr text-12" style="margin-bottom: 0px;" id="subtotal">
                            </p>                        
                        </div>
                        <div class="col-lg-5" style="padding-right: 20px;">                        
                            <p class="text-rb text-12 pull-right" id="montosub">
                            </p>
                        </div>
                    </div>
                    <div class="row" style="margin-top: 20px;">
                        <div class="col-md-12 col-lg-12" style="border-bottom: 2px solid #ebebeb;">                            
                        </div>
                    </div>
                    <div class="row" style="margin-top: 20px;">
                        <div class="col-lg-7" style="padding-left: 20px;">
                            <p class="text-rr text-12" style="margin-bottom: 0px;" id="impuesto">
                            </p>
                        </div>
                        <div class="col-lg-5" style="padding-right: 20px;">
                            <p class="text-rb text-12 pull-right" id="montoimp">
                            </p>
                        </div>
                    </div>
                    <div class="row" style="margin-top: 20px;">
                        <div class="col-md-12 col-lg-12" style="border-bottom: 2px solid #ebebeb;">                            
                        </div>
                    </div>
                    <div class="row" style="margin-top: 20px;">
                        <div class="col-lg-7" style="padding-left: 20px;">
                            <p class="text-rm text-20">Total</p>
                        </div>
                        <div class="col-lg-5" style="padding-right: 20px;">
                            <p class="text-rbo text-20 pull-right" id="total">$ 00,00</p>
                        </div>
                    </div>
                    <div class="row" style="margin-top: 20px;">
                        <div class="col-md-12 col-lg-12" style="border-bottom: 2px solid #ebebeb;">
                        </div>
                    </div>
                    <div class="row" style="margin-top: 20px;">
                        <div class="col-md-12" style="padding-left: 20px;">
                            <span class="text-rm text-14">Formas de Pago</span>
                        </div>
                    </div>   
                    <div class="row" style="margin-top: 10px;" id="forma_pago">
                    </div>
                    <div class="row" style="margin-top: 20px;">
                        <div class="col-md-12 col-lg-12" style="border-bottom: 2px solid #ebebeb;">
                        </div>
                    </div>
                     <div class="row" style="margin-top: 20px;">
                        <div class="col-lg-12" style="padding-left: 20px;">
                            <img src="../img/checkt.png" id="condiciones">
                            <span class="text-rr text-12" style="margin-left: 1%;">Acepto las <span class="" style="color: #df040b;" id="politicas">Condiciones y Políticas</span></span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="margin-bottom: 30px;">
                    <div class="row">
                        <div class="col-lg-4 col-lg-offset-4">
                            <span class="btn btncustom text-rbo text-12" style="height: 40px !important;padding-top: 10px !important;" id="btnExtender">
                                Extender Plan
                            </span>
                        </div>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal inicia session-->


   <script src="../js/jquery-1.11.3.js"></script>
   <script src="../js/jquery.datetimepicker.full.js"></script>
   <script src="../js/bootstrap.js"></script>
   <script src="../js/ie-emulation-modes-warning.js"></script>
   <script src="../js/drawer.js"></script>
   <script src="../js/run_prettify.min.js"></script>
   <script src="../js/bootstrap-dialog.min.js"></script>
   <script src="../controlador/comun.js"></script>
   <script src="../controlador/cambiar_plan.js"></script>
   <?php include_once "footer_js.php"; ?>	
</body>
</html>