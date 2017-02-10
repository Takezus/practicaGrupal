<?php 
    include_once "header2.php";
    include_once "sidebar.php"; ?>

        <input type="hidden" id="paginas" value="departamentos">
        <input type="hidden" id="id_negocio" value="<?php echo $id_negocio; ?>">
        <input type="hidden" id="cual">
        <input type="hidden" id="totales">

        <div class="col-xs-12 col-sm-9 col-md-10 col-lg-10 border-lista">
          <div class="row barra-age flex-parent">
             <div class="col-xs-8 col-sm-9 col-md-10 col-lg-10 flex-child"><div class="text-rbo text-10 margen-ba-dep" id="totAgente">0 en total | 0 Departamentos activado(s)</div></div>
             <div class="col-xs-4 col-sm-3 col-md-2 col-lg-2  flex-child"><div class="text-rbo text-10 margen-ba2" id="totPlan">El paquete permite 0</div></div>

          </div>
              <div class="row separa2">
                  <div class="col-xs-12 col-sm-5 col-md-6 col-lg-6">
                    <div class="input-group">
                      <span class="input-group-addon btn-bus" style="border-bottom: 1px solid #ebebeb;"><img src="../img/cmd-search.png" ></span>
                      <input type="text" class="form-control busqueda text-rr text-10" placeholder="Buscar" id="findOper">
                    </div>         
                  </div>
                  <div class="col-xs-12 col-sm-7 col-md-6 col-lg-6" class="">
                      <img src="../img/cmd-add.png" style="margin-top: 1.5%;  margin-left: 2%;" id="addDepartamento">
                      <img src="../img/cmd-edit.png" style="margin-top: 1.5%; margin-left: 5%;" class="puntero" id="editOperador">
                      <img src="../img/cmd-del.png" style="margin-top: 1.5%; margin-left: 5%;" class="puntero" id="eliminarOpe">
                  </div>
              </div>
            <div class="row separa5">
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6" id="col1">
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6" id="col2">
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
   <script src="../controlador/departamentos.js"></script>
	<?php include_once "footer_js.php"; ?>
</body>
</html>