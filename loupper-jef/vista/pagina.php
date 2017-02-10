<!-- roboto black italic 18 -->

    <?php include_once "header2.php"; ?>


    <input type="hidden" id="conexion" value="<?php echo $conexion; ?>">
    <input type="hidden" id="id_plan" value="<?php echo $id_plan; ?>">
    <input type="hidden" id="id_factura" value="<?php echo $id_factura; ?>">
    <input type="hidden" id="id_usuario" value="<?php echo $id_usuario; ?>">
    <input type="hidden" id="ciclo_fac" value="<?php echo $ciclo_fac; ?>">
    <input type="hidden" id="cantFotos">
    <input type="hidden" id="id_pagina">
    <input type="hidden" id="donde" value="">
    <input type="hidden" id="pagina" value="pagina">
    <input type="hidden" id="tags">

    <!-- Begin page content -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-7 col-lg-8" style="margin-top: 80px;" id="izquierda">
            <div id="verIni">
                <div class="row text-center"> 
                      <span class="text-rbo text-18">SU CUENTA</span>
                </div>
                  <div class="row text-center">
                      <span class="text-rm text-14">¿Tienes cuenta?</span>
                  </div>    
                  <div class="row text-center" style="margin-top: 2%;">
                      <img src="../img/iniciar.png" id="inciars-pag">
                      <span class="text-rm text-12">o</span>
                      <img src="../img/registrarse.png" id="registars-pag">
                  </div> 
                  <div class="row text-center" style="margin-top: 2%;">
                    <div class="col-md-12 col-lg-12" style="padding-left: 3%; padding-right: 3%;">
                     <img src="../img/barra-div.png" style="width: 100%;">  
                    </div>
                  </div>
            </div>    
          <div class="row" style="margin-top: 2%;">
            <div class="col-md-12 col-lg-12" style="padding-left: 7%;">
              <span class="text-rbo text-16">PLAN SECCIONADO</span>
            </div>
          </div>    
            <div class="row" style="margin-top: 2%;">
                <div class="col-md-9 col-lg-10" style="padding-left: 7%;">
                    <div class="form-group">
                        <label for="genero" class="text-rr text-12">Paquete</label>
                        <div class="select text-rr text-12">
                            <select class="form-control" id="planes">
                            </select>
                        </div>                
                    </div>
                </div>
                <div class="col-md-3 col-lg-2">
                    <div class="form-group">
                        <label for="genero" class="text-rr text-12">&nbsp;</label>
                        <span class="text-rr text-10" style="color:#df040b;display: block;padding: 6px;" id="incluye">¿QUÉ INCLUYE? </span> 
                    </div>                
                </div>
            </div>
            <div class="row" style="margin-top: 2%;">
                <div class="col-md-6 col-lg-6" style="padding-left: 7%;">
                    <div class="form-group">
                        <label for="agentes" class="text-rr text-12">Número de Operadores</label>
                        <div class="select text-rr text-12">
                            <select class="form-control" id="agentes">
                            </select>
                        </div>    
                        <p class="help-block text-8" style="margin-left: 2%; font-family: Roboto-Regular !important;" id="numope">Has añadido 1 Operador(es)</p>
                    </div> 
                </div>
                <div class="col-md-6 col-lg-6" style="padding-right: 4%;">
                    <div class="form-group">
                        <label for="ciclo" class="text-rr text-12">Ciclo de Facturación</label>
                        <div class="select text-rr text-12">
                            <select class="form-control" id="ciclo">
                            </select>
                        </div>
                        <p class="help-block text-8" style="margin-left: 2%; font-family: Roboto-Regular !important;">Obten mayores descuentos con ciclos más largos.</p>
                    </div> 
                </div>
            </div>
            <div class="row" style="margin-top: 2%;">
                <div class="col-md-12 col-lg-12" style="padding-left: 7%;">
                    <img src="../img/actualizar_factura.png" class="img-responsive center-block" id="actFactura">
                </div>
            </div>
            <div class="row text-center" style="margin-top: 2%;">
                <div class="col-md-12 col-lg-12" style="padding-left: 3%; padding-right: 3%;">
                    <img src="../img/barra-div.png" style="width: 100%; height: 3px;">  
                </div>
            </div>
            <div class="row" style="margin-top: 2%;">
                <div class="col-md-12 col-lg-12" style="padding-left: 7%;">
                    <span class="text-rbo text-16">CATEGORÍA</span>
                </div>
            </div>    
            <div class="row" style="margin-top: 2%;">
                <div class="col-md-6 col-lg-6" style="padding-left: 7%;">
                    <div class="form-group">
                        <div class="select text-rr text-12">
                            <select class="form-control" id="categorias">
                                <option value="0">Categoría</option>
                            </select>
                        </div>
                    </div> 
                </div>
                <div class="col-md-6 col-lg-6" style="padding-right: 4%;">
                    <div class="form-group">
                        <div class="select text-rr text-12">
                            <select class="form-control" id="subcat1">
                                <option value="0">Sub Categoría</option>
                            </select>
                        </div>
                    </div> 
                </div>
            </div>
            <div class="row" style="margin-top: 2%;">
                <div class="col-md-6 col-lg-6" style="padding-left: 7%;">
                </div>
                <div class="col-md-6 col-lg-6" style="padding-right: 4%;">
                    <div class="form-group">
                        <div class="select text-rr text-12">
                            <select class="form-control" id="subcat2">
                                <option value="0">Sub Categoría</option>
                            </select>
                        </div>
                    </div> 
                </div>
            </div>
            <div class="row" style="margin-top: 2%;">
                <div class="col-md-6 col-lg-6" style="padding-left: 7%;">
                </div>
                <div class="col-md-6 col-lg-6" style="padding-right: 4%;">
                    <div class="form-group">
                        <div class="select text-rr text-12">
                            <select class="form-control" id="subcat3">
                                <option value="0">Sub Categoría</option>
                            </select>
                        </div>
                    </div> 
                </div>
            </div>
            <div class="row text-center" style="margin-top: 2%;">
                <div class="col-md-12 col-lg-12" style="padding-left: 3%; padding-right: 3%;">
                    <img src="../img/barra-div.png" style="width: 100%; height: 3px;">  
                </div>
            </div>
            <div class="row" style="margin-top: 2%;">
                <div class="col-md-12 col-lg-12" style="padding-left: 7%;">
                    <span class="text-rbo text-16">LOGO</span>
                </div>
            </div>    
            <div class="row" style="margin-top: 2%;">
                <div class="col-md-3 col-lg-3" style="padding-left: 7%;">
                    <span class="text-rr text-12">Agrega tu Logo</span>
                </div>
                <div class="col-md-3 col-lg-2">
                    <img src="../img/cuadro-imgb.png" class="thumb" id="logo">
                </div>
                <div class="col-md-6 col-lg-7" style="height: 130px;">
                    <p class="text-rr text-9 margen_logo" style="margin-bottom: 0px;">Formatos aceptados .jpg y .png. Tamaño sugerido 0x0 px</p>
                    <p class="text-rr text-9">Tamaño máximo permitido 5 MB</p>
                </div>
            </div>
             <div class="row text-center" style="margin-top: 2%;">
                <div class="col-lg-12" style="padding-left: 3%; padding-right: 3%;">
                    <img src="../img/barra-div.png" style="width: 100%; height: 3px;">  
                </div>
            </div>
            <div class="row" style="margin-top: 2%;">
                <div class="col-md-12 col-lg-12" style="padding-left: 7%;">
                    <span class="text-rbo text-16">INFORMACIÓN</span>
                </div>
            </div>    
            <div class="row" style="margin-top: 2%;">
                <div class="col-md-12 col-lg-12" style="padding-left: 7%;">
                    <div class="form-group">
                        <label for="nombrep" class="text-rr text-12">Nombre de la Página <span style="color: #df040b;">*</span></label>
                        <input type="text" class="form-control text-rr text-12" id="nombrep" value="">
                    </div>  
                </div>
            </div>    
            <div class="row" style="margin-top: 2%;">
                <div class="col-md-12 col-lg-12" style="padding-left: 7%;">
                    <div class="form-group">
                        <label for="actividad" class="text-rr text-12">Actividad <span style="color: #df040b;">*</span></label>
                        <textarea class="form-control text-rr text-12" id="actividad"></textarea>
                    </div>  
                </div>
            </div>    
            <div class="row" style="margin-top: 2%;">
                <div class="col-md-12 col-lg-12" style="padding-left: 7%;">
                    <div class="form-group">
                        <label for="txtPalabras" class="text-rr text-12">Palabras Claves <span style="color: #df040b;">*</span></label>
                        <input type="text" class="form-control text-rr text-12" id="txtPalabras" value="">
                        <p class="help-block text-rr text-10">Introduzca cada Palabra clave que mejor describa su Página y presione Enter.</p>
                    </div>  
                </div>
            </div>    
            <div class="row">
                <div class="col-md-12 col-lg-12 text-rr text-11" style="padding-left: 7%;" id="palabras">
                    
                </div>
            </div>    
            <div class="row" style="margin-top: 2%;">
                <div class="col-md-6 col-lg-6" style="padding-left: 7%;">
                    <div class="form-group">
                        <label for="email" class="text-rr text-12">Correo Electrónico <span style="color: #df040b;">*</span></label>
                        <input type="text" class="form-control text-rr text-12" id="email" value="">
                    </div>  
                </div>
                <div class="col-md-6 col-lg-6">
                    <div class="form-group">
                        <label for="telefono" class="text-rr text-12">Teléfono <span style="color: #df040b;">*</span></label>
                        <input type="text" class="form-control text-rr text-12" id="telefono" value="">
                    </div>  
                </div>
            </div>
            <div class="row" style="margin-top: 2%;">
                <div class="col-md-6 col-lg-6" style="padding-left: 7%;">
                    <div class="form-group">
                        <label for="sitio" class="text-rr text-12">Sitio Web</label>
                        <input type="text" class="form-control text-rr text-12" id="sitio" value="">
                    </div>  
                </div>
                <div class="col-md-6 col-lg-6">
                    <div class="form-group">
                        <label for="nombre" class="text-rr text-12">Provincia <span style="color: #df040b;">*</span></label>
                        <div class="select text-rr text-12">
                            <select class="form-control" id="provincias">
                            </select>
                        </div>
                    </div>  
                </div>
            </div>
            <div class="row" style="margin-top: 2%;">
                <div class="col-md-6 col-lg-6" style="padding-left: 7%;">
                    <div class="form-group">
                        <label for="ciudad" class="text-rr text-12">Ciudad <span style="color: #df040b;">*</span></label>
                        <input type="text" class="form-control text-rr text-12" id="ciudad" value="">
                    </div>  
                </div>
                <div class="col-md-6 col-lg-6">
                    <div class="form-group">
                        <label for="ubicacion" class="text-rr text-12">Ubicación</label>
                        <input type="text" class="form-control text-rr text-12 maps maps-mas" id="ubicacion">
                        <input type="hidden" id="lat">
                        <input type="hidden" id="lon">
                    </div>  
                </div>
            </div>
            <div class="row" style="margin-top: 2%;">
                <div class="col-md-12 col-lg-12" style="padding-left: 7%;">
                    <div class="form-group">
                        <label for="direccion" class="text-rr text-12">Dirección <span style="color: #df040b;">*</span></label>
                        <input type="text" class="form-control text-rr text-12" id="direccion" value="">
                    </div>  
                </div>
            </div>    
            <div class="row" style="margin-top: 2%;">
                <div class="col-md-6 col-lg-6" style="padding-left: 7%;">
                    <div class="form-group">
                        <label for="nombre1" class="text-rr text-12">Horario</label><br>
                        <select id="ddlCars" class="form-control text-rr text-12" multiple="multiple">
                            <option value="1">Lunes</option>
                            <option value="2">Martes</option>
                            <option value="3">Miércoles</option>
                            <option value="4">Jueves</option>
                            <option value="5">Viernes</option>
                            <option value="6">Sábado</option>
                            <option value="7">Domingo</option>
                            <option value="8">Todos los Días</option>
                        </select>
                    </div> 
                </div>
                <div class="col-md-3 col-lg-3">
                    <div class="form-group">
                        <label for="ph_ha" class="text-rr text-12">Hora de Entrada</label>                
                        <div class='input-group date'>
                            <input type='text' class="form-control" id='datetimepickere'/>
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-time"></span>
                            </span>
                        </div>
                    </div>  
                </div>
                <div class="col-md-3 col-lg-3">
                    <div class="form-group">
                        <label for="nombre" class="text-rr text-12">Hora se Salida</label>                        
                        <div class='input-group date'>
                            <input type='text' class="form-control" id='datetimepickers'/>
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-time"></span>
                            </span>
                        </div>


                    </div>  
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-lg-12" style="padding-left: 10%;">
                    <img src="../img/checkt.png" id="checkAbierto"><span class="text-rr text-12" style="margin-left: 1%;color: #727276;" >Abierto 24 Horas</span>
                </div>
            </div>    
            <div class="row" style="margin-top: 2%;">
                <div class="col-md-12 col-lg-12 text-rr text-10" style="padding-left: 10%;">
                    <span style="color: #df040b;text-decoration: underline;" id="addHorario">Añadir Horario</span>
                </div>
            </div>
            <div class="row" style="margin-top: 2%;">
                <div class="col-md-12 col-lg-12" id="txtHorarios" style="margin-top: 10px;"></div>
                <div class="col-md-6 col-lg-6" style="padding-left: 7%;" id="dias_s"></div>
                <div class="col-md-3 col-lg-3" id="hora_s"></div>
                <div class="col-md-3 col-lg-3" id="horc_s"></div>
            </div>
            <div class="row" style="margin-top: 2%;">
                <div class="col-md-12 col-lg-12 text-rr text-10" style="padding-left: 10%;" id="horarios">
                    
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-lg-12" style="padding-left: 10%;">
                    <span class="pull-right text-rr text-10" style="color: #df040b;">* Campos Obligatorios</span>
                </div>
            </div>
             <div class="row text-center" style="margin-top: 2%;">
                <div class="col-md-12 col-lg-12" style="padding-left: 3%; padding-right: 3%;">
                    <img src="../img/barra-div.png" style="width: 100%; height: 3px;">  
                </div>
            </div>
            <div class="row" style="margin-top: 2%;">
                <div class="col-md-12  col-lg-12" style="padding-left: 7%;">
                    <span class="text-rbo text-16">GALERÍA</span>
                </div>
            </div>
            <!-- ******* GALERIA LG ******* -->
            <div id="flg">    
                <!-- Fotos para LG -->
            </div>
            <div class="row visible-lg" style="margin-top: 1%;">
                <div class="col-md-12 col-lg-12 text-center text-rr text-9" style="color: #88868b;" id="maxFotos">
                    Hasta 0 Fotos
                </div>
            </div>
            <!-- ******* GALERIA MD ******* -->
            <div id="fmd">
            </div>    
             <div class="row text-center" style="margin-top: 2%;">
                <div class="col-md-12 col-lg-12" style="padding-left: 3%; padding-right: 3%;">
                    <img src="../img/barra-div.png" style="width: 100%; height: 3px;">  
                </div>
            </div>
            <div class="row" style="margin-top: 2%;">
                <div class="col-md-12 col-lg-12 text-center">
                    <p class="text-rbo text-16" style="display: inline-block;">RESALTAR PÁGINA </p>
                    <img src="../img/estrella.png" style="display: inline-block; margin-left: 1%; margin-top: -8px;">
                </div>
            </div>    
            <div class="row" style="margin-top: 2%;">
                <div class="col-md-12 col-lg-12"  style="padding-left: 7%;">
                    <p class="text-rbo text-16" id="promo">Promociones extras para destacar tu Página</p>
                    <p class="text-rr text-11" style=" margin-bottom: 0px;" id="resaltar"></p>
                </div>
            </div>
            <!-- ******* OFERTA LG ******* -->
            <div class="row visible-md visible-lg" style="margin-top: 2%;margin-bottom: 2%; margin-right: 0.7%;border: 1px solid #ebebeb;margin-left: 4%;">
                <div class="col-xs-12" style="padding-right: 0px;">
                    <img src="../img/cinta.png" class="pull-right">
                    <p style="padding-right: 2%;padding-left: 2%;margin-top: 2%;"><img src="../img/check2.png" id="check_res" style="display: inline-block;"><span class="text-rbo text-14" style="display: inline-block; margin-left: 2%;" id="planrel">Resaltador Primera Posición</span></p>
                </div>
                <div class="col-md-8 col-lg-5" style="margin-left: 8%; margin-bottom: 2%;" id="carac1">
                </div>
                <div class="col-md-3 col-lg-3 col-lg-offset-3" style="margin-bottom: 2%;">
                    <p class="text-rbo text-18 pull-right" id="precio">$ 00,00</p>
                </div>
            </div>
        </div>
        <div class="col-md-5 col-lg-4 border-lista-left" style="margin-top: 50px;" id="derecha">
            <div id="mover" class="scroll-pane" style="overflow-x:hidden !important; overflow-y:scroll;height: 600px;">
                <div class="row" style="margin-top: 10%;">
                    <div class="col-lg-12" style="padding-left: 7%;">
                        <span class="text-rm text-20">Resumen</span>
                    </div>
                </div>    
                 <div class="row text-center" style="margin-top: 2%;">
                    <div class="col-lg-12" style="padding-left: 3%; padding-right: 7%;">
                        <img src="../img/barra-div.png" style="width: 100%; height: 3px;">  
                    </div>
                </div>
                <div class="row" style="margin-top: 2%;">
                    <div class="col-lg-7" style="padding-left: 7%;" id="detalles">
                    </div>
                    <div class="col-lg-5" style="padding-right: 15%;" id="montos">
                    </div>
                </div>
                 <div class="row text-center" style="margin-top: 2%;">
                    <div class="col-lg-12" style="padding-left: 3%; padding-right: 7%;">
                        <img src="../img/barra-div.png" style="width: 100%; height: 3px;">  
                    </div>
                </div>
                <div class="row" style="margin-top: 2%;">
                    <div class="col-lg-7" style="padding-left: 7%;">
                        <p class="text-rr text-12" style="margin-bottom: 0px;" id="subtotal"></p>
                        
                    </div>
                    <div class="col-lg-5" style="padding-right: 12%;">
                        
                        <p class="text-rb text-12 pull-right" id="montosub"></p>
			
                    </div>
                </div>

<div class="row" style="margin-top: 2%;">
                    <div class="col-lg-7" style="padding-left: 7%;">
                        <p class="text-rr text-12" style="margin-bottom: 0px;" id="impuesto"></p>
                        
                    </div>
                    <div class="col-lg-5" style="padding-right: 12%;">
                        
                        <p class="text-rb text-12 pull-right" id="montoimp"></p>
			
                    </div>
                </div>


                 <div class="row text-center" style="margin-top: 2%;">
                    <div class="col-lg-12" style="padding-left: 7%; padding-right: 15%;">
                        <img src="../img/barra-div.png" style="width: 100%; height: 3px;">  
                    </div>
                </div>
                <div class="row" style="margin-top: 2%;">
                    <div class="col-lg-7" style="padding-left: 7%;">
                        <p class="text-rm text-20">Total</p>
                    </div>
                    <div class="col-lg-5" style="padding-right: 12%;">
                        <p class="text-rbo text-20 pull-right" id="total">$ 00,00</p>
                    </div>
                </div>
                 <div class="row text-center" style="margin-top: 2%;">
                    <div class="col-lg-12" style="padding-left: 3%; padding-right: 7%;">
                        <img src="../img/barra-div.png" style="width: 100%; height: 3px;">  
                    </div>
                </div>
                <div class="row" style="margin-top: 2%;">
                    <div class="col-lg-12" style="padding-left: 7%;">
                        <span class="text-rm text-14">Formas de Pago</span>
                    </div>
                </div>   
                 
                <div class="row" style="margin-top: 2%;" id="forma_pago">
                </div>  

                 <div class="row text-center" style="margin-top: 2%;">
                    <div class="col-lg-12" style="padding-left: 3%; padding-right: 7%;">
                        <img src="../img/barra-div.png" style="width: 100%; height: 3px;">  
                    </div>
                </div>
                 <div class="row" style="margin-top: 2%;">
                    <div class="col-lg-12" style="padding-left: 7%;">
                        <img src="../img/checkt.png" id="condiciones">
                        <span class="text-rr text-12" style="margin-left: 1%;">Acepto las Condiciones y Políticas</span>
                    </div>
                </div>
                 <div class="row text-center" style="margin-top: 5%;border-bottom: 1px solid #ebebeb;padding-bottom: 5%;">
                    <div class="col-lg-12">
                        <img src="../img/publicar2.png" id="guardar">  
                    </div>
                </div>
                <div class="row" style="margin-top: 2%;">
                    <div class="col-lg-12" style="padding-left: 7%;">
                        <span class="text-rbo text-16">CENTRO DE CONTACTO Y AYUDA</span>
                    </div>
                </div>    
                <div class="row" style="margin-top: 2%;">
                    <div class="col-lg-12" style="padding-left: 7%;">
                        <span class="text-rbo text-20" id="linea1">000-0000</span>
                    </div>
                </div>    
                <div class="row" style="margin-top: 2%;">
                    <div class="col-lg-12" style="padding-left: 7%;">
                        <p class="text-rr text-14" style="margin-bottom: 0px;" id="linea2">Lunes a Viernes</p>
                        <p class="text-rr text-14" style="margin-bottom: 0px;" id="linea3">8:00am - 5:00pm</p>
                        <p class="text-rr text-14" id="linea4">Sábados 9:00am - 12:00m</p>
                    </div>
                </div>    
                <div class="row" style="margin-top: 2%;">
                    <div class="col-lg-12" style="padding-left: 7%;border-bottom: 1px solid #ebebeb;padding-bottom: 5%;">
                        <p class="text-rr text-14" style="margin-bottom: 0px;">Dirección</p>
                        <p class="text-rr text-14" style="margin-bottom: 0px;">sit amet justo lacinia cursus</p>
                        <p class="text-rr text-14" style="margin-bottom: 0px;">Vivamus sem tellus</p>
                        <p class="text-rr text-14">malesuada sit amet sodales euit</p>
                    </div>
                </div>                     
            </div> 

           
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row" style="height: 50px;">
      </div>
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
      <div class="modall"><!-- Place at bottom of page --></div>
      <!-- 0416-1051836 -->
      
    <?php include_once "modal.php"; ?>
    
    <script src="../js/jquery-1.11.3.js"></script>

   <script src="../js/moment.js"></script>
   <script src="../js/transition.js"></script>
   <script src="../js/collapse.js"></script>
   <script src="../js/bootstrap-datetimepicker.min.js"></script>
   <script src="http://maps.google.com/maps/api/js?sensor=false"></script>
   <script src="../js/bootstrap.js"></script>
   <script src="../js/funciones.js"></script>
   <script src="../js/ie-emulation-modes-warning.js"></script>
   <script src="../js/drawer.js"></script>
   <script src="../js/run_prettify.min.js"></script>
   <script src="../js/bootstrap-dialog.min.js"></script>
   <script src="../js/bootstrap-multiselect.js"></script>

        <script type="text/javascript" src="../js/jquery.mousewheel.js"></script>
        <!-- the jScrollPane script -->
        <script type="text/javascript" src="../js/jquery.jscrollpane.min.js"></script>
        <!-- scripts specific to this demo site -->
        

        </script>

   <script src="../controlador/pagina.js"></script>
    <script src="../controlador/comun.js"></script>	
    <?php include_once "footer_js.php"; ?>	
</body>
</html>
