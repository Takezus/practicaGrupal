<?php 
    include_once "header2.php";
    include_once "sidebar.php"; ?>

        <input type="hidden" id="idnegocio" value="<?php echo $id_negocio; ?>">
        <input type="hidden" id="conexion" value="<?php echo $conexion; ?>">
        <input type="hidden" id="cual">

        <div class="col-xs-12 col-sm-9 col-md-10 col-lg-10 border-lista">
            <div class="row" style="height: 40px;background-color: #ececec;">
                <div class="col-md-8 col-lg-8">
                    <div class="text-rbo text-10 text-right" id="txtPlan" style="padding-top: 10px;">
                        
                    </div>
                </div>
                <div class="col-md-2 col-lg-2" style="padding-right: 0px;">
                    <div class="text-rbo text-10 barra-edi text-center" id="totPlan" style="padding-top: 10px;"></div>
                </div>
                <div class="col-md-2 col-lg-2" style="padding-left: 0px;background: #df040b;height: 40px;padding-top: 10px;">
                    <div class="text-rbo text-10 text-center puntero" style="color: #fff;" id="txtCambio">Cambiar Plan</div>
                </div>
            </div>
            <div class="row" style="margin-top: 30px;">
                <div class="col-md-6 col-lg-6">
                  <div class="row" style="margin-left: 30px;">
                    <div class="col-md-12 col-lg-12">
                      <p class="text-rbo text-14" style="margin-bottom: -5px;" id="txtNomPag">NOMBRE DE PAGINA</p>
                      <p class="text-rr text-12" id="txtNumLoupper">0000</p>
                    </div>
                  </div>
                </div>
                <div class="ccol-md-6 col-lg-6">
                  <div class="row" style="margin-right: 30px;">
                    <div class="col-md-12 col-lg-12 text-right">
                        <span class="btn btncustom text-rbo text-12" style="height: 30px !important;padding-top: 4px !important;background: #000;color: white;display: inline;" id="txtExtender">
                                Extender Plan
                        </span>
                        <span class="btn btncustom text-rr text-12" style="height: 30px !important;padding-top: 4px !important;background: #000;color: white;display: inline;margin-left: 10px;" id="previsual">
                                <img src="../img/ojo2.png">
                        </span>
                        <span class="btn btncustom text-rbo text-12" style="height: 30px !important;padding-top: 4px !important;background: #000;color: white;display: inline;margin-left: 10px;" id="delPagina">
                                <img src="../img/rubbish-bin.png">
                        </span>
                        
                    </div>
                  </div>
                </div>
            </div>  
            <div class="row" style="margin-top: 30px;">
                <div class="col-md-6 col-lg-6">
                  <div class="row border-age" style="height: 60px;margin-left: 40px;">
                    <div class="col-md-12 col-lg-12" style="padding-top: 16px;">
                      <img src="../img/editar.png" style="margin-right: 10px;" class="puntero" onclick="javascript:categoria();"><span class="text-rbo text-12 puntero" onclick="javascript:categoria();">Editar Categoría</span>
                    </div>
                  </div>
                </div>
                <div class="ccol-md-6 col-lg-6">
                  <div class="row border-age" style="height: 60px;margin-left: 20px;margin-right: 40px;">
                    <div class="col-md-12 col-lg-12" style="padding-top: 16px;">
                      <img src="../img/editar_logo.png" style="margin-right: 10px;" class="puntero" onclick="javascript:logo();"><span class="text-rbo text-12 puntero" onclick="javascript:logo();">Editar Logo</span>
                    </div>
                  </div>
                </div>
            </div>  
            <div class="row" style="margin-top: 20px;">
                <div class="col-md-6 col-lg-6">
                  <div class="row border-age" style="height: 60px;margin-left: 40px;">
                    <div class="col-md-12 col-lg-12" style="padding-top: 16px;">
                      <img src="../img/lapiz.png" style="margin-right: 10px;" class="puntero" onclick="javascript:portada();"><span class="text-rbo text-12 puntero" onclick="javascript:portada();">Editar Portada</span>
                    </div>
                  </div>
                </div>
                <div class="ccol-md-6 col-lg-6">
                  <div class="row border-age" style="height: 60px;margin-left: 20px;margin-right: 40px;">
                    <div class="col-md-12 col-lg-12" style="padding-top: 16px;">
                      <img src="../img/edita_informacion.png" style="margin-right: 10px;" class="puntero" onclick="javascript:informacion();"><span class="text-rbo text-12 puntero" onclick="javascript:informacion();">Editar Información</span>
                    </div>
                  </div>
                </div>
            </div>  
            <div class="row" style="margin-top: 20px;">
                <div class="col-md-6 col-lg-6">
                  <div class="row border-age" style="height: 60px;margin-left: 40px;">
                    <div class="col-md-12 col-lg-12" style="padding-top: 16px;">
                      <img src="../img/opiniones.png" style="margin-right: 10px;" class="puntero" onclick="javascript:opiniones();"><span class="text-rbo text-12 puntero" onclick="javascript:opiniones();">Ver Opiniones</span>
                    </div>
                  </div>
                </div>
                <div class="ccol-md-6 col-lg-6">
                  <div class="row border-age" style="height: 60px;margin-left: 20px;margin-right: 40px;">
                    <div class="col-md-12 col-lg-12" style="padding-top: 16px;">
                      <img src="../img/galeria.png" style="margin-right: 10px;" class="puntero" onclick="javascript:galeria();"><span class="text-rbo text-12 puntero" onclick="javascript:galeria();">Galería de Fotos</span>
                    </div>
                  </div>
                </div>
            </div>  
            <div class="row" style="margin-top: 20px;">
                <div class="col-md-6 col-lg-6">
                  <div class="row border-age" style="height: 60px;margin-left: 40px;">
                    <div class="col-md-12 col-lg-12" style="padding-top: 16px;">
                      <img src="../img/oferta.png" style="margin-right: 10px;" class="puntero" onclick="javascript:ofertas();"><span class="text-rbo text-12 puntero" onclick="javascript:ofertas();">Ofertas/Eventos</span>
                    </div>
                  </div>
                </div>
                <div class="ccol-md-6 col-lg-6">
                  <div class="row border-age" style="height: 60px;margin-left: 20px;margin-right: 40px;background-color: #f8bd00;">
                    <div class="col-md-12 col-lg-12" style="padding-top: 16px;">
                      <img src="../img/estrellab.png" style="margin-right: 10px;" class="puntero" onclick="javascript:resaltar();"><span class="text-rbo text-12 puntero" onclick="javascript:resaltar();" style="color: white;">RESALTAR PÁGINA</span>
                    </div>
                  </div>
                </div>
            </div>  
        </div>
      </div>
    </div>

    <!--  SECCION DE PATALLAS MODALES     -->

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
                            EXTENDER PLAN
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

    <!--          MOSTRAT EVENTOS              -->
    
    <div class="modal fade" id="panShowEvent" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
        <div class="modal-dialog" role="document" style="width: 1000px;">
            <div class="modal-content modal-fondo">
            <div class="menuContext" style="padding-left: 10%;padding-right: 10%;background-color: #fff;">
                <ul class="list-group" style="margin-top: 45%;">
                    <li class="list-group-item puntero text-rr text-12" style="border:none;padding-left: 20%;color: black;background-color: #fff;"><a href="javascript:editar();" style="color: black;">Editar</a></li>
                    <li class="list-group-item puntero text-rr text-12" style="border:none;padding-left: 20%;color: black;background-color: #fff;"><a href="javascript:eliminar();" style="color: black;">Eliminar</a></li>
                    <li class="list-group-item puntero text-rr text-12" style="border:none;padding-left: 20%;color: black;background-color: #fff;"><a href="javascript:salir();" style="color: black;">Salir</a></li>
                </ul>
            </div>
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
                <div class="modal-body" style="padding-left: 40px; padding-right: 40px; padding-top: 0px; margin-top: 0px;height: 400px;overflow-y: scroll;" id="verEvents">
                    <div class="row">
                        <div class="col-md-12 col-lg-12 text-rbo text-16">
                            OFERTAS/EVENTOS
                        </div>          
                    </div>
                </div>
                <div class="modal-footer" style="margin-bottom: 30px;">
                    <div class="row">
                        <div class="col-lg-4 col-lg-offset-4">
                            <span class="btn btncustom text-rbo text-12" style="height: 40px !important;padding-top: 10px !important;" id="createEvent">
                                + Crear
                            </span>
                        </div>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal inicia session-->

    <!--          RESALTAR              -->
    
    <div class="modal fade" id="panResaltar" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
        <div class="modal-dialog" role="document" style="width: 1000px;">
            <div class="modal-content modal-fondo">
            <div class="modalll"></div>
                <div class="modal-header" style="padding-top: 0px;">
                    <div class="row" >
                        <div class="col-md-12" style="background-color: #edeef0;">
                            <div class="row" style="height: 40px;background-color: #ececec;">
                                <div class="col-md-10 col-lg-10">
                                    <div class="text-rbo text-10 text-right" id="txtPlanR" style="padding-top: 10px;">
                                        
                                    </div>
                                </div>
                                <div class="col-md-2 col-lg-2" style="padding-right: 0px;">
                                    <div class="text-rbo text-10 barra-edi text-center" id="totPlanR" style="padding-top: 10px;">
                                        
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" >
                                        <span aria-hidden="true" style="margin-right: 10px;">&times;</span>
                                        </button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-body" style="padding-left: 40px; padding-right: 40px; padding-top: 0px; margin-top: 0px;">
                    <div class="row" style="margin-top: 30px;">
                        <div class="col-md-12 col-lg-12">
                            <p class="text-rbo text-16" style="display: inline-block;">RESALTAR PÁGINA </p>
                            <img src="../img/estrella.png" style="display: inline-block; margin-left: 1%; margin-top: -8px;">
                        </div>
                    </div>
                    <div class="row" style="margin-top: 20px;">
                        <div class="col-md-12 col-lg-12"  style="padding-left: 7%;">
                            <p class="text-rbo text-16" id="promo">Promociones extras para destacar tu Página</p>
                            <p class="text-rr text-11" style=" margin-bottom: 0px;" id="resaltar"></p>
                        </div>
                    </div>
                    <div class="row" style="margin-top: 20px;border: 1px solid #caccce">
                        <div class="col-xs-12" style="padding-right: 0px;">
                            <img src="../img/cinta.png" class="pull-right">
                            <p style="padding-right: 2%;padding-left: 2%;margin-top: 2%;"><img src="../img/check2_sel.png" id="check_res" style="display: inline-block;"><span class="text-rbo text-14" style="display: inline-block; margin-left: 2%;" id="planrel">Resaltador Primera Posición</span></p>
                        </div>
                        <div class="col-md-8 col-lg-5" style="margin-left: 8%; margin-bottom: 2%;" id="carac1">
                        </div>
                        <div class="col-md-3 col-lg-3 col-lg-offset-3" style="margin-bottom: 2%;">
                            <p class="text-rbo text-18 pull-right" id="precio">$ 00,00</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="margin-bottom: 30px;">
                    <div class="row">
                        <div class="col-lg-4 col-lg-offset-4">
                            <span class="btn btncustom text-rbo text-12" style="height: 40px !important;padding-top: 10px !important;" id="saveResaltar">
                                Guardar
                            </span>
                        </div>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal inicia session-->

    
    <!--          CATEGORIAS              -->
    
    <div class="modal fade" id="panCategorias" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
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
                            EDITAR CATEGORÍA
                        </div>          
                    </div>
                    <div class="row" style="margin-top: 30px;">
                        <div class="col-md-6 col-lg-6">
                            <div class="form-group">
                                <div class="select text-rr text-12">
                                    <select class="form-control" id="categorias">
                                        <option value="0">Categoría</option>
                                    </select>
                                </div>
                            </div> 
                        </div>
                        <div class="col-md-6 col-lg-6" style="">
                            <div class="form-group">
                                <div class="select text-rr text-12">
                                    <select class="form-control" id="subcat1">
                                        <option value="0">Sub Categoría</option>
                                    </select>
                                </div>
                            </div> 
                        </div>
                    </div>
                    <div class="row" style="margin-top: 10px;">
                        <div class="col-md-6 col-lg-6" style="">
                        </div>
                        <div class="col-md-6 col-lg-6" style="">
                            <div class="form-group">
                                <div class="select text-rr text-12">
                                    <select class="form-control" id="subcat2">
                                        <option value="0">Sub Categoría</option>
                                    </select>
                                </div>
                            </div> 
                        </div>
                    </div>
                    <div class="row" style="margin-top: 10px;">
                        <div class="col-md-6 col-lg-6" style="">
                        </div>
                        <div class="col-md-6 col-lg-6" style="">
                            <div class="form-group">
                                <div class="select text-rr text-12">
                                    <select class="form-control" id="subcat3">
                                        <option value="0">Sub Categoría</option>
                                    </select>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="margin-bottom: 30px;">
                    <div class="row">
                        <div class="col-lg-4 col-lg-offset-4">
                            <span class="btn btncustom text-rbo text-12" style="height: 40px !important;padding-top: 10px !important;" id="saveCategoria">
                                Guardar
                            </span>
                        </div>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal inicia session-->

    <!--          LOGO              -->
    
    <div class="modal fade" id="panLogo" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
        <div class="modal-dialog" role="document" style="width: 900px;">
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
                <div class="modal-body" style="padding-left: 120px; padding-right: 120px; padding-top: 0px; margin-top: 0px;">
                    <div class="row">
                        <div class="col-md-12 col-lg-12 text-rbo text-16">
                            EDITAR LOGO
                        </div>          
                    </div>
                    <div class="row" style="margin-top: 30px;">
                        <div class="col-lg-3 text-rr text-2" style="margin-top: 20px;">
                            Agrega tu Logo
                        </div>
                        <div class="col-lg-3">
                            <img src="../img/fotoi_empty.png" class="center-block thumb2" id="imgLogo" onclick="javascript:clogo();">
                        </div>
                        <div class="col-lg-6">
                            <p class="text-rr text-9" style=";margin-top: 105px;margin-bottom: 0px;">Formatos aceptados .jpg y .png. Tamaño sugerido 0x0 px</p>
                            <p class="text-rr text-9" style="">Tamaño máximo permitido 5 MB</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="margin-bottom: 30px;">
                    <div class="row">
                        <div class="col-lg-4 col-lg-offset-4">
                            <span class="btn btncustom text-rbo text-12" style="height: 40px !important;padding-top: 10px !important;" id="saveLogo">
                                Guardar
                            </span>
                        </div>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal inicia session-->

    <!--          PORTADA              -->
    
    <div class="modal fade" id="panPortada" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
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
                <div class="modal-body" style="padding-left: 80px; padding-right: 80px; padding-top: 0px; margin-top: 0px;">
                    <div class="row">
                        <div class="col-md-12 col-lg-12 text-rbo text-16">
                            EDITAR PORTADA
                        </div>          
                    </div>
                    <div class="row" style="margin-top: 20px;">
                        <div class="col-md-12 col-lg-12 text-rr text-12">
                            Agrega tu Portada
                        </div>          
                    </div>
                    <div class="row" style="margin-top: 20px;">
                        <div class="col-md-12 col-lg-12">
                            <img src="../img/portada.png" class="thumb3" id="imgPortada" onclick="javascript:iportada();">
                        </div>   
                    </div>
                    <div class="row" style="">
                        <div class="col-md-12 col-lg-12 text-rr text-9 text-center" style="margin-top: 10px;">
                            Para obtener resultados óptimos, usa una imgen de 1920x1080 píxeles (relación de aspecto 16:9)
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="margin-bottom: 15px;">
                    <div class="row">
                        <div class="col-lg-4 col-lg-offset-4">
                            <span class="btn btncustom text-rbo text-12" style="height: 40px !important;padding-top: 10px !important;" id="savePortada">
                                Guardar
                            </span>
                        </div>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal inicia session-->

    <!--          INFORMACION          -->
    
    <div class="modal fade" id="panInformacion" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
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
                            INFORMACIÓN
                        </div>          
                    </div>
                    <div class="row" style="margin-top: 30px;">
                        <div class="col-md-12 col-lg-12">
                            <div class="form-group">
                                <label for="nombrep" class="text-rr text-12">Nombre de la Página <span style="color: #df040b;">*</span></label>
                                <input type="text" class="form-control text-rr text-12" id="nombrep">
                            </div>  
                        </div> 
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-lg-12">
                            <div class="form-group">
                                <label for="actividad" class="text-rr text-12">Actividad <span style="color: #df040b;">*</span></label>
                                <textarea class="form-control text-rr text-12" id="actividad"> </textarea>
                            </div>  
                        </div> 
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-lg-12">
                            <div class="form-group">
                                <label for="txtPalabras" class="text-rr text-12">Palabras Claves <span style="color: #df040b;">*</span></label>
                                <input type="text" class="form-control text-rr text-12" id="txtPalabras">
                                <p class="help-block text-rr text-10">Introduzca cada Palabra clave que mejor describa su Página y presione Enter.</p>
                            </div>  
                        </div> 
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-lg-12 text-rr text-11" style="margin-bottom: 20px;" id="palabras">
                        </div>
                    </div>    
                    <div class="row">
                        <div class="col-md-6 col-lg-6">
                            <div class="form-group">
                                <label for="email" class="text-rr text-12">Correo Electrónico <span style="color: #df040b;">*</span></label>
                                <input type="text" class="form-control text-rr text-12" id="email">
                            </div>  
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <div class="form-group">
                                <label for="telefono" class="text-rr text-12">Teléfono <span style="color: #df040b;">*</span></label>
                                <input type="text" class="form-control text-rr text-12" id="telefono">
                            </div>  
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-lg-6">
                            <div class="form-group">
                                <label for="sitio" class="text-rr text-12">Sitio Web</label>
                                <input type="text" class="form-control text-rr text-12" id="sitio">
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
                    <div class="row">
                        <div class="col-md-6 col-lg-6">
                            <div class="form-group">
                                <label for="ciudad" class="text-rr text-12">Ciudad <span style="color: #df040b;">*</span></label>
                                <input type="text" class="form-control text-rr text-12" id="ciudad">
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
                    <div class="row">
                        <div class="col-md-12 col-lg-12">
                            <div class="form-group">
                                <label for="direccion" class="text-rr text-12">Dirección <span style="color: #df040b;">*</span></label>
                                <input type="text" class="form-control text-rr text-12" id="direccion">
                            </div>  
                        </div>
                    </div>    
                    <div class="row">
                        <div class="col-md-6 col-lg-6">
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
                        <div class="col-md-12 col-lg-12">
                            <img src="../img/checkt.png" id="checkAbierto"><span class="text-rr text-12" style="margin-left: 1%;color: #727276;" >Abierto 24 Horas</span>
                        </div>
                    </div>    
                    <div class="row" style="margin-top: 20px;">
                        <div class="col-md-12 col-lg-12 text-rr text-10">
                            <span style="color: #df040b;text-decoration: underline;" id="addHorario">Añadir Horario</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-lg-12" id="txtHorarios" style="margin-top: 10px;"></div>
                        <div class="col-md-6 col-lg-6" id="dias_s">
                        </div>
                        <div class="col-md-3 col-lg-3" id="hora_s">
                        </div>
                        <div class="col-md-3 col-lg-3" id="horc_s">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-lg-12 text-rr text-10" id="horarios">
                            
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-lg-12">
                            <span class="pull-right text-rr text-10" style="color: #df040b;">* Campos Obligatorios</span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="margin-bottom: 30px;">
                    <div class="row">
                        <div class="col-lg-4 col-lg-offset-4">
                            <span class="btn btncustom text-rbo text-12" style="height: 40px !important;padding-top: 10px !important;" id="saveInformacion">
                                Guardar
                            </span>
                        </div>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal inicia session-->

    <!--          OPNIONES             -->
    
    <div class="modal fade" id="panOpiniones" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
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
                <div class="modal-body" style="padding-left: 40px; padding-right: 40px; padding-top: 0px; margin-top: 0px;" id="div_opiniones">
                    <div class="row">
                        <div class="col-md-12 col-lg-12 text-rbo text-16">
                            OPINIONES
                        </div>          
                    </div>
                    <div class="row" style="margin-top: 20px;">
                        <div class="col-md-12 col-lg-12 text-rbo text-16" id="remOpinion">
                            <span class="badge text-rb text-8" style=" -moz-border-radius: 0px;-webkit-border-radius: 0px;border-radius: 0px; padding-top: 2px;padding-bottom: 2px;padding-left: 4px;padding-right: 4px;" id="puntaje"></span><span id="estrellas"></span><span class="text-rr text-10" style="margin-left: 10px;" id="coments"></span>
                        </div>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal inicia session-->

    <!--          GALERIA              -->
    
    <div class="modal fade" id="panGaleria" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
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
                <div class="modal-body" style="padding-left: 80px; padding-right: 80px; padding-top: 0px; margin-top: 0px;">
                    <div class="row">
                        <input type="hidden" id="cantFotos">
                        <div class="col-md-12 col-lg-12 text-rbo text-16">
                            GALERÍA
                        </div>          
                    </div>
                    <div id="caja"></div>
                    <!--<div class="row" style="margin-top: 30px;" id="caja">
                         <div class="col-md-12 col-lg-12">
                            <img src="../img/cuadro-imgb.png" class="thumb" style="display: inline-block;">
                            <img src="../img/cuadro-imgb.png" class="thumb" style="display: inline-block;margin-left: 7px;">
                            <img src="../img/cuadro-imgb.png" class="thumb" style="display: inline-block;margin-left: 7px;">
                            <img src="../img/cuadro-imgb.png" class="thumb" style="display: inline-block;margin-left: 7px;">
                            <img src="../img/cuadro-imgb.png" class="thumb" style="display: inline-block;margin-left: 7px;">
                            <img src="../img/cuadro-imgb.png" class="thumb" style="display: inline-block;margin-left: 7px;">
                        </div>
                    </div>
                    <div class="row" style="margin-top: 10px;">
                        <div class="col-md-12 col-lg-12">
                            <img src="../img/cuadro-imgb.png" class="thumb" style="display: inline-block;">
                            <img src="../img/cuadro-imgb.png" class="thumb" style="display: inline-block;margin-left: 7px;">
                            <img src="../img/cuadro-imgb.png" class="thumb" style="display: inline-block;margin-left: 7px;">
                            <img src="../img/cuadro-imgb.png" class="thumb" style="display: inline-block;margin-left: 7px;">
                            <img src="../img/cuadro-imgb.png" class="thumb" style="display: inline-block;margin-left: 7px;">
                            <img src="../img/cuadro-imgb.png" class="thumb" style="display: inline-block;margin-left: 7px;">
                        </div>
                    </div> -->
                    <div class="row text-rr text-9 text-center" style="margin-top: 10px;" id="totFotos">
                        Hasta X Fotos
                    </div>
                </div>
                <div class="modal-footer" style="margin-bottom: 30px;">
                    <div class="row">
                        <div class="col-lg-4 col-lg-offset-4">
                            <span class="btn btncustom text-rbo text-12" style="height: 40px !important;padding-top: 10px !important;" id="saveGaleria">
                                Guardar
                            </span>
                        </div>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal inicia session-->

    <!--          OFERTAS          -->
    
    <div class="modal fade" id="panOfertas" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
        <div class="modal-dialog" role="document" style="width: 1000px;">
            <div class="modal-content modal-fondo">
            <div class="modalll"></div>
            <input type="hidden" id="tarea">
                <div class="modal-header">
                    <div class="row" >
                        <div class="col-md-12">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="modal-body" style="padding-left: 65px; padding-right: 65px; padding-top: 0px; margin-top: 0px;">
                    <div class="row">
                        <div class="col-md-12 col-lg-12 text-rbo text-16">
                            OFERTAS/EVENTOS
                        </div>          
                    </div>
                    <form class="form-horizontal">
                        <div class="row" style="margin-top: 30px;">
                            <div class="col-md-12 col-lg-12">
                                <div class="form-group">
                                    <label for="nombre" class="col-lg-3 control-label text-rr text-12">Foto de Oferta/Evento</label>
                                    <div class="col-lg-9">
                                      <img src="../img/imgfoto_empty.png" id="paintEvent" class="paintEvent">
                                    </div>
                              </div>
                            </div> 
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-lg-12">
                                <div class="form-group">
                                    <label for="nombre" class="col-lg-3 control-label text-rr text-12">Nombre Oferta/Evento</label>
                                    <div class="col-lg-9">
                                      <input type="text" class="form-control text-rr text-12" id="nombre" placeholder="Agrega un nombre breve y claro">
                                    </div>
                              </div>
                            </div> 
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-lg-12">
                                <div class="form-group">
                                    <label for="lugar" class="col-lg-3 control-label text-rr text-12">Lugar</label>
                                    <div class="col-lg-9">
                                      <input type="text" class="form-control text-rr text-12" id="lugar" placeholder="Dirección">
                                    </div>
                              </div>
                            </div> 
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-lg-12">
                                <div class="form-group">
                                    <label for="fecini" class="col-lg-3 control-label text-rr text-12">Inicio</label>
                                    <div class="col-lg-3">
                                        <div class="input-group">
                                              <input type="text" class="form-control" id="fecini" placeholder="09/04/2016">
                                              <div class="input-group-addon"><img src="../img/calendario2.png"></div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3">
                                        <div class="input-group">
                                              <input type="text" class="form-control" id="horini" placeholder="00:00">
                                              <div class="input-group-addon"><img src="../img/reloj.png"></div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3">
                                      <p class="text-rr text-12" style="margin-top: 5px;">UTC-05</p>
                                    </div>
                              </div>
                            </div> 
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-lg-12">
                                <div class="form-group">
                                    <label for="fecfin" class="col-lg-3 control-label text-rr text-12">Finalización</label>
                                    <div class="col-lg-3">
                                        <div class="input-group">
                                              <input type="text" class="form-control" id="fecfin" placeholder="09/04/2016">
                                              <div class="input-group-addon"><img src="../img/calendario2.png"></div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3">
                                        <div class="input-group">
                                              <input type="text" class="form-control" id="horfin" placeholder="00:00">
                                              <div class="input-group-addon"><img src="../img/reloj.png"></div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3">
                                      <p class="text-rr text-12" style="margin-top: 5px;">UTC-05</p>
                                    </div>
                              </div>
                            </div> 
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-lg-12">
                                <div class="form-group">
                                    <label for="url" class="col-lg-3 control-label text-rr text-12">URL</label>
                                    <div class="col-lg-9">
                                      <input type="text" class="form-control text-rr text-12" id="url" placeholder="Agrega un enlace al sitio web">
                                    </div>
                              </div>
                            </div> 
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-lg-12">
                                <div class="form-group">
                                    <label for="descripcion" class="col-lg-3 control-label text-rr text-12">Descripción</label>
                                    <div class="col-lg-9">
                                      <textarea id="descripcion" class="form-control text-rr text-12" placeholder="Facilita más información a las personas sobre el evento" rows="5"></textarea>
                                    </div>
                              </div>
                            </div> 
                        </div>
                    </form>
                </div>
                <div class="modal-footer" style="margin-bottom: 30px;">
                    <div class="row">
                        <div class="col-lg-4 col-lg-offset-4">
                            <span class="btn btncustom text-rbo text-12" style="height: 40px !important;padding-top: 10px !important;" id="saveEvent">
                                Guardar
                            </span>
                        </div>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal inicia session-->


    <div class="modall"></div>

    <script src="../js/jquery-1.11.3.js"></script>
    <script src="../js/funciones.js"></script>
    <script src="../js/moment.js"></script>
    <script src="../js/transition.js"></script>
    <script src="../js/collapse.js"></script>
    <script src="../js/bootstrap.js"></script>
    <script src="../js/bootstrap-datetimepicker.min.js"></script>
    <script src="../js/ie-emulation-modes-warning.js"></script>
    <script src="../js/drawer.js"></script>
    <script type="text/javascript" src="../js/jquery.mousewheel.js"></script>
    <script src="../js/run_prettify.min.js"></script>
    <script src="../js/bootstrap-dialog.min.js"></script>
    <script src="../js/bootstrap-multiselect.js"></script>
    <script src="../controlador/editar_pagina.js"></script>
    <script src="../controlador/nopagina.js"></script>
    <script src="../controlador/comun.js"></script>
    <?php include_once "footer_js.php"; ?>
			
</body>
</html>