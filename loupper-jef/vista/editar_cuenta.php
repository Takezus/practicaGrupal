<?php 
    include_once "header2.php";
    include_once "sidebar.php"; ?>

        <input type="hidden" id="id_usuario" value="<?php echo $id_usuario; ?>">

        <div class="col-xs-12 col-sm-9 col-md-10 col-lg-10 border-lista">
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
            </div>
            <div class="row">
                <div class="col-lg-5 col-lg-offset-1 col-md-5 col-md-offset-1">
                    <div class="form-group">
                        <label for="fecnac" class="text-rr text-12">Fecha de Nacimiento</label>
                        <input type="text" class="form-control text-rr text-12" id="fecnac">
                    </div>
                </div>
                <div class="col-lg-5 col-md-5">
                    <div class="form-group">
                        <label for="genero" class="text-rr text-12">Género</label>
                        <div class="select"><select class="form-control" id="genero">
                            <option value="F">Femenino</option>
                            <option value="M">Masculino</option>
                        </select></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
                    <div class="form-group">
                        <label for="email" class="text-rr text-12">Correo Electrónico</label>
                        <input type="email" class="form-control text-rr text-12" id="email">
                    </div>  
                </div>    
                <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
                    <div class="form-group">
                        <label for="clave" class="text-rr text-12">Contraseña</label>
                        <div class="input-group">                            
                            <input type="password" class="form-control text-rr text-12" id="clave" style="border-right: 0px !important;">
                            <div class="input-group-addon"><img src="../img/ojo.png" id="verPass"></div>
                        </div>
                    </div>  
                </div>
                <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
                    <div class="form-group">
                        <label for="clave2" class="text-rr text-12">Vuelve a escribir la contraseña</label>
                        <input type="password" class="form-control text-rr text-12" id="clave2">
                    </div>  
                </div>                   
            </div>
            <div class="row">
                <div class="col-lg-12" style="margin-top: 1%">
                    <img src="../img/actualizar_cuenta.png" class="center-block" id="actualizar_cuenta">
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
   <script src="../js/jquery.md5.min.js"></script>
   <script src="../js/bootstrap-dialog.min.js"></script>
   <script src="../controlador/comun.js"></script>

   <script src="../controlador/editar_cuenta.js"></script>
	<?php include_once "footer_js.php"; ?>	
</body>
</html>