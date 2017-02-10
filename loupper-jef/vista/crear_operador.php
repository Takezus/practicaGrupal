<?php 
    include_once "header2.php";
    include_once "sidebar.php"; ?>

        <input type="hidden" id="paginas" value="crear-ope"></input>
        <input type="hidden" id="id_negocio" value="<?php echo $id_negocio;?>">
        <input type="hidden" id="id" value="<?php echo $id;?>">

        <div class="col-xs-12 col-sm-9 col-md-10 col-lg-10 border-lista">
            <div class="row" style="background-color: #EDEEF0; height: 50px;">
                <div class="col-lg-10 col-lg-offset-1" style="margin-top:16px;">
                    <span class="text-rbo text-10" id="totAgente">1 de 5 Operadores usados.</span><span class="text-rbo text-10" style="color: #df040b;">Actualice su Plan</span><span class="text-rbo text-10"> y agregue mas operadores</span>
                </div>
            </div>
            <div class="row" style="margin-top: 3%">
                <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
                    <div class="form-group">
                        <label for="nombre" class="text-rr text-12">Nombre</label>
                        <input type="text" class="form-control text-rr text-12" id="nombre">
                    </div>  
                </div>    
                <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
                    <div class="form-group">
                        <label for="apellido" class="text-rr text-12">Apellido</label>
                        <input type="text" class="form-control text-rr text-12" id="apellido">
                    </div>  
                </div>    
                <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
                    <div class="form-group">
                        <label for="alias" class="text-rr text-12">Nombre a Mostrar</label>
                        <input type="text" class="form-control text-rr text-12" id="alias">
                    </div>  
                </div>    
                <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
                    <div class="form-group">
                        <label for="email" class="text-rr text-12">Correo Electrónico</label>
                        <input type="text" class="form-control text-rr text-12" id="email">
                    </div>  
                </div>    
            </div>
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2" style="margin-top: 1%; text-align: center;">
                    <div class="col-xs-8">
                      <span class="btn btncustom" style="height: 40px !important;padding-top: 10px !important;" id="crearOperador">
                        <img src="../img/nube.png">
                        <span style="margin-left: 10px;" id="textOperador">Crear Operador</span>
                      </span>
                    </div>
                    <div class="col-xs-4">
                      <span class="btn btncustom" style="height: 40px !important;padding-top: 10px !important;background-color: #434041 !important;" id="cancelarCO">Cancelar
                      </span>
                    </div>
                </div>
            </div> 
        </div>
      </div>
   </div>

   <script src="../js/jquery-1.11.3.js"></script>
   <script src="../js/jquery.datetimepicker.full.js"></script>
   <script src="../js/bootstrap.js"></script>
   <script src="../js/ie-emulation-modes-warning.js"></script>
   <script src="../js/drawer.js"></script>
   <script src="../js/funciones.js"></script>
   <script src="../js/run_prettify.min.js"></script>
   <script src="../js/bootstrap-dialog.min.js"></script>
   <script src="../controlador/agentes.js"></script>
   <?php include_once "footer_js.php"; ?>
			
</body>
</html>