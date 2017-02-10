<?php 
    include_once "header2.php";
    include_once "sidebar.php"; ?>

        <input type="hidden" id="paginas" value="crear-dep">
        <input type="hidden" id="id_negocio" value="<?php echo $id_negocio; ?>">
        <input type="hidden" id="id" value="<?php echo $id; ?>">
        <input type="hidden" id="num">

        <div class="col-xs-12 col-sm-9 col-md-10 col-lg-10 border-lista">
            <div class="row" style="background-color: #EDEEF0; height: 50px;">
                <div class="col-lg-10 col-lg-offset-1" style="margin-top:16px;">
                    <span class="text-rbo text-10" id="totAgente">0 Departamentos permitidos.</span><span class="text-rbo text-10" style="color: #df040b;">Actualice su Plan</span><span class="text-rbo text-10"> y agregue más departamentos</span>
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
                        <label for="descripcion" class="text-rr text-12">Descripción</label>
                        <textarea class="form-control text-rr text-12" id="descripcion"> </textarea>                        
                    </div>  
                </div>    
            </div>
            <div class="row">
                 <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 text-rr text-12" style="margin-top: 1%;">
                    Agentes del Departamento
                 </div>
            </div>
            <div class="row">
                 <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 text-rr text-8" style="margin-top: 1%;">
                    <span style="margin-left: 1.5%;" id="cantAge">No hay agentes por el momento</span>
                 </div>
            </div>
            <div class="row">
                <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 text-rr text-8" style="margin-top: 1%;border-bottom: 1px solid #ebebeb;padding: 4px;" id="agentesDel">
                </div>
            </div>
            <div class="row">
                 <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 text-rr text-8" style="margin-top: 1%;" id="agentesAdd">
                    
                 </div>
            </div>
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2" style="margin-top: 5%; text-align: center;">
                    <div class="col-xs-8">
                      <span class="btn btncustom" style="height: 40px !important;padding-top: 10px !important;" id="crearOperador">
                        <img src="../img/nube.png">
                        <span style="margin-left: 10px;" id="textOperador">Crear Departamento</span>
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

   <div class="modall"></div>
   

   <script src="../js/jquery-1.11.3.js"></script>
   <script src="../js/jquery.datetimepicker.full.js"></script>
   <script src="../js/bootstrap.js"></script>
   <script src="../js/ie-emulation-modes-warning.js"></script>
   <script src="../js/drawer.js"></script>
   <script src="../js/funciones.js"></script>
   <script src="../js/run_prettify.min.js"></script>
   <script src="../js/bootstrap-dialog.min.js"></script>
   <script src="../controlador/comun.js"></script>
   <script src="../controlador/departamentos.js"></script>
   <?php include_once "footer_js.php"; ?>
			
</body>
</html>