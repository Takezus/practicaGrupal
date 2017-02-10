<?php
    session_start();

    $nombre = "";
    $foto = "";
    $linea = "0";
    if (!array_key_exists("id_usuario",$_SESSION)){
        $conexion = 0;
	$id_usuario="";
        $id_plan = "0";
    }else{
        $conexion = 1;
        $nombre = $_SESSION['name_usuario'];
        $id_usuario = $_SESSION['id_usuario'];
        $foto = $_SESSION['foto'];
        $linea = $_SESSION['linea'];
    }
    if (array_key_exists("id_plan",$_SESSION)){
        $id_plan = $_SESSION['id_plan'];
    }else{
        $id_plan = 0;
    }
    if (array_key_exists("id_factura",$_SESSION)){
         $id_factura = $_SESSION['id_factura'];
    }else{
        $id_factura = 0;
    }
    if (array_key_exists("ciclo_fac",$_SESSION)){
        $ciclo_fac = $_SESSION['ciclo_fac'];
    }else{
        $ciclo_fac = 0;
    }
    if (array_key_exists("idveraccion",$_SESSION)){
        $id_actividad = $_SESSION['idveraccion'];
    }else{
        $id_actividad = 0;
    }
    if (array_key_exists("id_usuario",$_SESSION)){
        $conexion = 1;
        $id_negocio = $_SESSION['id_negocio'];
    }
    $id=0;
    if (array_key_exists("operador",$_GET)){
        $id = $_GET['operador'];
    }
    $idoperador=0;
    if (array_key_exists("idoperador",$_GET)){
        $idoperador = $_GET['idoperador'];
    }


?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta property="og:url" content="http://www.loupper.com/loupperf/vista/actividad.php" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Your Website Title" />
    <meta property="og:description" content="Your description" />
    <meta property="og:image" content="http://www.loupper.com/loupperf/img/iniciar.png" />

    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/style.css" />
    <link rel="stylesheet" type="text/css" href="../css/sticky-footer-navbar.css">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap-drawer.css">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap-dialog.min.css">
    <link rel="stylesheet" type="text/css" href="../css/jquery.datetimepicker.css"/>
    <link rel="stylesheet" type="text/css" href="../css/sticky-footer-navbar.css">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap-multiselect.css" type="text/css">
    <link rel="stylesheet" type="text/css" href="../css/jquery.fancybox.css?v=2.1.5" type="text/css" media="screen" />
    <link rel="stylesheet" type="text/css" href="../css/css/font-awesome.min.css">

    <link rel="stylesheet" type="text/css" href="../css/css/animate.css">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap-datetimepicker.css">


        <!-- styles needed by jScrollPane - include in your own sites -->
    <link type="text/css" href="../css/jquery.jscrollpane.css" rel="stylesheet" media="all" />

    <style type="text/css">
        html,body{
            margin:0px;
            height:100%;
        }
        .scroll-pane{
            width: 100%;
            height: 200px;
            overflow: auto;
        }
        .horizontal-only{
            height: auto;
            max-height: 200px;
        }


        #chat-container{
            position: fixed;
            direction: ltr;
            z-index: 300;
            bottom: 0;
            left: 0;
            right: 0;
        }

        #chat-container .panel{
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            margin-bottom: 0px;
            float: right;
            width: 25%;
            border:none;
        }

        #chat-container .panel-primary>.panel-heading {
          color: #fff;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          background-color: #df040b;
          border-color: transparent;
          padding: 5px 12px;
          border: none;
        }

        #chat-container .panel-primary>.panel-heading i{
          color: #fff;
          font-size: 21px;
        }

        .chat{
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .chat li{
            margin-bottom: 10px;
            padding-bottom: 5px;
        }

        .chat li.left .chat-body{
            margin-left: 60px;
        }

        .chat li.right .chat-body{
          background-color: #e9eaec;
          border-radius: 4px;
          float: left;
          width: 100%;
          position: relative;
        }

        .chat li.right .chat-body:before{
          content: '';
          position: absolute;
          border-style: solid;
          border-width: 10px 9px 0px;
          border-color: #e9eaec transparent;
          display: block;
          width: 0;
          z-index: 1;
          bottom: -10px;
          right: 10px;
        }

        .chat li .chat-body p{
          padding: 10px;
          margin: 0;
          float: left;
          position: relative;
        }


        #chat-container .panel .slidedown .glyphicon, .chat .glyphicon{
            margin-right: 5px;
        }

        #chat-container .panel-body{
            overflow-y: scroll;
            height: 250px;
        }

        #chat-container .panel-body::-webkit-scrollbar-track{
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);
            background-color: #FFF;
        }

        #chat-container .panel-body::-webkit-scrollbar{
            width: 5px;
            background-color: #FFF;
        }

        #chat-container .panel-body::-webkit-scrollbar-thumb{
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
            background-color: #2A7BA5;
        }


    </style>
    <title>Loupper</title>
</head>
<body class="has-drawer">

 <!-- Fixed navbar -->
    <nav class="navbar navbar-default navbar-fixed-top navarfix" style="border: none !important;">
      <div class="container-fluid menusup ">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <img src="../img/hamburguesa.png">
          </button>
            <div id="drawerExample" class="drawer dw-xs-10 dw-sm-6 dw-md-4 fold" aria-labelledby="drawerExample">
                <div class="drawer-controls">
                    <img src="../img/hamburguesa.png" data-toggle="drawer" href="#drawerExample" aria-foldedopen="false" aria-controls="drawerExample">
                </div>
                <div class="drawer-contents">
                    <div class="drawer-heading">
                        <h2 class="drawer-title">Loupper</h2>
                    </div>
                    <ul class="drawer-nav">
                        <li role="presentation" class="active"><a href="index.php">Inicio</a></li>
                    </ul>
    <!--                 <div class="drawer-body">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.</p>
                        <a href="#">A Regular Link</a>
                    </div>
                    <div class="drawer-footer locked text-center">
                        <small>&copy; Caroline Amaba</small>
                    </div> -->
                </div>
            </div>
            <ul class="nav navbar-nav" style="position: absolute;left: 50%;margin-left: -110px !important;display: block; padding-top: 5px;">
                <li ><img src="../img/logo-barra.png" class="img-responsive"></li>
            </ul>
        </div>

        <input type="hidden" id="name" value="<?php echo $nombre; ?>">
        <input type="hidden" id="foto" value="<?php echo $foto; ?>">
        <input type="hidden" id="linea" value="<?php echo $linea; ?>">
        <input type="hidden" id="iddUser" value="<?php echo $id_usuario; ?>">
        <input type="hidden" id="rutalogo">
        <input type="hidden" id="descr">

        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <li><a id="inicioi" class="text-rr colorwhite text-11">Inicia Sesión</a></li>
            <li><a id="perfil" class="text-rr colorwhite text-11">Registrate</a></li>
            <li class="menudersup"><a id="publicar" class="text-rb colorwhite text-14" >Publicar Página</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <input type="hidden" id="id_actividad" value="<?php echo $id_actividad; ?>">
    <input type="hidden" id="div_act">
    <input type="hidden" id="div_con">
    <input type="hidden" id="div_lat">
    <input type="hidden" id="div_lon">
    <input type="hidden" id="div_img">
    <input type="hidden" id="pagina" value="<?php echo $id_actividad; ?>">
    <input type="hidden" id="abierto" value="0">
    <input type="hidden" id="nompagina" value="negocio 1">
    <input type="hidden" id="nombreusuario" value="<?php echo $nombre; ?>">
    <input type="hidden" id="id_usuario" value="<?php echo $id_usuario; ?>">
    <input type="hidden" id="conexion" value="<?php echo $conexion; ?>">
    <input type="hidden" id="relacion">
    <input type="hidden" id="LOGIH">

    <div class="container" style="margin-top: 70px;margin-bottom: 15px;">
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div style="display: inline-block;"><img src="../img/casa.png"></div><div class="text-rbo text-10" style="display: inline-block; margin-left: 5px;" id="tira">> Categoría > Subcategoría > Nombre de Página</div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row noportada" style="height: 250px;" id="portada">
            <div class="col-md-3 col-lg-3" style="height: 125px;padding-right: 0px;">
                <img src="../img/foto-empty.png" class="pull-right logopag" style="margin-top:70px;" id="logo">
            </div>
            <div class="col-md-6 col-lg-6" style="padding-left: 3%;">
                <p class="text-rbo text-16" style="margin-top:80px;margin-bottom: 0px;" id="nombre">Nombre Página <span class="text-rb text-8" style="color: #7eb51f;" id="online">Online</span></p>
                <p class="text-rr text-10" id="subcategoria">Subcategoría</p>
                <p><span class="badge text-rb text-12" style=" -moz-border-radius: 0px;-webkit-border-radius: 0px;border-radius: 0px; padding-top: 2px;padding-bottom: 2px;padding-left: 4px;padding-right: 4px;" id="puntaje">4.8</span><span id="estrellas"><img src="../img/estrellap_sel.png" style="margin-left: 1%;"><img src="../img/estrellap_sel.png" style="margin-left: 0.5%;"><img src="../img/estrellap_sel.png" style="margin-left: 0.5%;"><img src="../img/estrellap_sel.png" style="margin-left: 0.5%;"><img src="../img/estrellap.png" style="margin-left: 0.5%;"></span><span class="text-rr text-10" style="margin-left: 1%;" id="valoracion"></span></p>
                <p class="text-rm text-10" id="linea4">Ciudad <img src="../img/loupper.png" style="margin-left: 1%;"><span class="text-rr text-10" style="margin-left: 0.5%;" id="numloupper">Número Loupper</span><span class="text-rb text-10" style="margin-left: 3%;" id="seguidores">0</span><span class="text-rr text-10" style="margin-left: 1%;" id="letras">SEGUIDORES</span><span style="margin-left: 5%;"><img src="../img/compartir.png" id="shareBtn"></span></p>
            </div>
            <div class="col-md-3 col-lg-3">
                <div class="row"><img src="../img/seguir2.png" class="puntero" style="margin-top:90px;" id="seguir"></div>
                <div class="row"><img src="../img/chatea.png" class="puntero" style="margin-top:10px;" id="chatea"></div>

            </div>
        </div>
    </div>

    <div class="container-fluid" style="">
      <div class="row">
          <div class="col-md-3 col-lg-3 tab-padding" style="text-align: center;background-color: #e9eaec;" id="infor">
            <div class="pull-left">
              <img src="../img/informacion.png">
            </div>
            <div class="text-rr text-12">
              Información
            </div>
          </div>
          <div class="col-md-3 col-lg-3 tab-padding" style="text-align: center;background-color: #e9eaec;border-left: 1px solid #88868b;" id="opinion">
            <div class="pull-left">
              <img src="../img/mano.png">
            </div>
            <div class="text-rr text-12">
              Opiniones
            </div>
          </div>
          <div class="col-md-3 col-lg-3 tab-padding" style="text-align: center; border-right: 1px solid #88868b;border-left: 1px solid #88868b;background-color: #e9eaec;" id="fotos">
              <div class="pull-left">
                <img src="../img/foto.png">
              </div>
            <div class="text-rr text-12">
              Fotos
            </div>
          </div>
          <div class="col-md-3 col-lg-3 tab-padding puntero" style="text-align: center;background-color: #e9eaec;" id="eventos">
            <div class="pull-left puntero">
              <img class="puntero" src="../img/calendario.png">
            </div>
            <div class="text-rr text-12 puntero">
              Ofertas/Eventos</div>
            </div>
      </div>

      <div class="row" id="caja">

      </div>
    </div>


    <div class="container-fluid visible-xs visible-sm">
      <div class=" encabezado row">
        <div class=" atras col-xs-1">
            <a href="#">
                <i class="ion-ios-arrow-thin-left" aria-hidden="true"></i>
            </a>
        </div>
        <div class="atras col-xs-3">
            <p>Atràs</p>
        </div>
        <div class=" compartir col-xs-7">
            <a href="#" data-toggle="modal" data-target="#myModal"><i class="ion-android-share-alt" aria-hidden="true" ></i></a>

            <!-- Modal para compartir en redes sociales -->
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="myModalLabel">Compartir</h4>
                        </div>
                        <div class="modal-body">
                            <a class="btn btn-social-icon btn-facebook" href="https://www.facebook.com/sharer/sharer.php?u=http://pagina.html/" target="_blank">
                                <span class="fa fa-facebook"></span>
                            </a>
                            <a class="btn btn-social-icon btn-twitter" href="http://www.twitter.com/home?status=http://pagina.html/" target="_blank">
                                <span class="fa fa-twitter"></span>
                            </a>
                            <a class="btn btn-social-icon btn-google" href="https://plus.google.com/share?url=http://pagina.html/" target="_blank">
                                <span class="fa fa-google"></span>
                            </a>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- portada -->
    <div class="portada row">
        <div class=" foto col-xs-4">
            <figure>
                <img src="images/jordan.jpg" id="tamaño" class="img-responsive" alt="Responsive image">
            </figure>
        </div>
        <div class=" descripcion col-xs-7">
            <h4>Nombre Pàgina <br>
               <span>Subcategoria</span>
               <br>
                 <span class="ciudad">Ciudad</span>
           </h4>
        </div>
    </div>

    <!-- Valoracion de la pagina -->
    <div class="row">
        <div class="ciudadyvaloracion col-xs-12 col-xs-push-4">

            <span class="valoracion">4.8</span>
            <div class="ec-stars-wrapper">
                <a href="#" data-value="1" title="Votar con 1 estrellas">&#9733;</a>
                <a href="#" data-value="2" title="Votar con 2 estrellas">&#9733;</a>
                <a href="#" data-value="3" title="Votar con 3 estrellas">&#9733;</a>
                <a href="#" data-value="4" title="Votar con 4 estrellas">&#9733;</a>
                <a href="#" data-value="5" title="Votar con 5 estrellas">&#9733;</a>
            </div>

        </div>
    </div>

    <!-- Numero loupper y los seguidores-->
    <div class="row">
        <div class="numerolou col-xs-4">
            <img src="images/60x60.png" alt=""><span class="num">Nùmero loupper</span>
        </div>
        <div class="col-xs-5">
            <span class="seguidores"> 0 SEGUIDORES</span>
        </div>
    </div>

    <!-- Boton de seguir-->
    <div class="row">
        <div class="seguir col-xs-12">
            <a id="btn-seguir" class="btn btn-default btn-xs btn-block" href="#" role="button"><i class="ion-plus" aria-hidden="true"></i> Seguir</a>
        </div>
    </div>

    <!-- Datos de la pagina -->
    <div class="row">
        <div class="opciones">
            <ul>
                <li><a href="informacion.html"><i class="ion-information-circled" aria-hidden="true"></i> &nbsp&nbsp Informacion <i id="iconopciones" class="ion-ios-arrow-right" aria-hidden="true"></i></a></li>
                <hr>
                <li><a href="opinion.html"><i class="ion-thumbsup" aria-hidden="true"></i> &nbsp&nbsp Opiniones <i id="iconopciones" class="ion-ios-arrow-right" aria-hidden="true"></i></a></li>
                <hr>
                <li><a href="foto.html"><i class="ion-image" aria-hidden="true"></i> &nbsp&nbsp Fotos <i id="iconopciones" class="ion-ios-arrow-right" aria-hidden="true"></i></a></li>
                <hr>
                <li><a href="ofertayevento.html"><i class="ion-android-calendar" aria-hidden="true"></i> &nbsp&nbsp Ofertas/Eventos <i id="iconopciones" class="ion-ios-arrow-right" aria-hidden="true"></i></a></li>
                <hr>
            </ul>
        </div>
    </div>

    <!-- Paginas relacionadas -->
    <div class="row">
        <div class="paginarelacionada col-xs-12">
            <a id="paginarelacionada" href="#">
                <p>Pàginas Relacionadas</p>
            </a>
        </div>
    </div>

    <!-- boton para chatear-->
    <div class="row">
        <div class=" chatea col-xs-12">
            <a id="btn-chatea" class="btn btn-default btn-block" href="#" role="button"><i class="ion-ios-chatbubble" aria-hidden="true"></i> &nbspChatea</a>
        </div>
    </div>
    </div>

<!--     <div class="container-fluid" style="margin-top: 40px;">
        <div class="row">
            <div class="col-md-3 col-lg-3" style="height: 800px;">
                <div class="row" id="color-inf">
                    <div class="pull-left tab-padding" style="margin-left: 6%;"><img src="../img/informacion.png"></div><div class="text-rr text-12 tab-padding" style="margin-left: 30%;" id="infor">Información</div>
                </div>
                <div class="row" style="background-color: #e9eaec;" id="color-act">
                    <div class="text-rm text-12 tab-padding2" style="margin-left: 15%;" id="actividad">Actividad</div>
                </div>
                <div class="row" id="color-con">
                    <div class="text-rm text-12 tab-padding2" style="margin-left: 15%;" id="contacto">Datos de Contacto</div>
                </div>
            </div>
            <div class="col-md-9 col-lg-9" style="height: 600px;border-left: 1px solid #d8d9de;">
                <div class="row">
                    <div class="col-md-4 col-lg-4 tab-padding" style="text-align: center;background-color: #e9eaec;" id="opinion">
                        <div class="pull-left">
                          <img src="../img/mano.png">
                        </div>
                        <div class="text-rr text-12">
                          Opiniones
                        </div>
                    </div>
                    <div class="col-md-4 col-lg-4 tab-padding" style="text-align: center; border-right: 1px solid #88868b;border-left: 1px solid #88868b;background-color: #e9eaec;" id="fotos">
                        <div class="pull-left"><img src="../img/foto.png"></div><div class="text-rr text-12">Fotos</div>
                    </div>
                    <div class="col-md-4 col-lg-4 tab-padding" style="text-align: center;background-color: #e9eaec;">
                        <div class="pull-left"><img src="../img/calendario.png"></div><div class="text-rr text-12">Ofertas/Eventos</div>
                    </div>
                </div>
                <div class="row" id="caja">
                </div>
            </div>
        </div>
    </div>
 -->
    <div class="container-fluid" style="border-top: 1px solid #d8d9de;">
        <div class="row" style="text-align: center;margin-top: 2%;">
            <div class="text-rbo text-12">PÁGINAS RELACIONADAS | CONOCE OTROS SIMILARES</div>
        </div>
        <div class="row" style="text-align: center;margin-top: 2%;" id="negocios">
        </div>
        <div class="row" style="margin-top: 1%; margin-left: 78%">
            <div class="text-rr text-12" style="color: #df040b;">Ver Todos ></div>
        </div>
    </div>


    <div class="container-fluid" style="margin-top: 2%;">
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
	<input type="hidden" id="nombreusuario" name="nombreusuario">
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

        <!-- chat -->
        <div id="chat-container" class="col-lg-12">


            <div class="panel panel-primary">
                <div class="panel-heading" id="chat-item-panel">
                    <span class="glyphicon glyphicon-comment"></span> Chat
                    <div class="btn-group pull-right">
                        <a data-toggle="collapse" data-parent="#chat-item-panel" href="#collapseOne">
                            <i class="fa fa-angle-up"></i>
                        </a>
                    </div>
                </div>
            <div class="panel-collapse collapse" id="collapseOne">
                <div class="panel-body">
                    <ul id="text-content" class="chat">

                        <li class="right clearfix">
                            <div class="chat-body clearfix">
                                <p>

                                </p>
                            </div>
                        </li>


                    </ul>
                </div>
                <div class="panel-footer">
                        <input id="mensaje" type="text" class="form-control" placeholder="Escriba su mensaje aquí..." />
                </div>
            </div>
            </div>




        </div>

        <!-- /chat -->

        <div class="modall"><!-- Place at bottom of page --></div>


    <!--          OPNIONES              -->

    <div class="modal fade" id="panOpinion" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
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
                <div class="modal-body" style="padding-left: 40px; padding-right: 40px; padding-top: 0px; margin-top: 0px;">
                    <div class="row">
                        <div class="col-md-12 col-lg-12 text-rr text-16 text-center">
                            ¿Qué te ha parecido <span class="text-rbo" id="nomPag"></span>?
                        </div>
                    </div>
                    <div class="row" style="margin-top: 30px;">
                        <div class="col-md-12 col-lg-12 text-center">
                          <span id="estrellas">
                            <img src="../img/estrellao.png" id="E1" data-posicion="1" onmouseover="javascript:e_hover(1);" onmouseout="javascript:e_out(1);" data-seleccion="" onclick="javascript:e_click(1);">
                            <img src="../img/estrellao.png" style="margin-left: 10px;" id="E2" data-posicion="2" onmouseover="javascript:e_hover(2);" onmouseout="javascript:e_out(2);" data-seleccion="" onclick="javascript:e_click(2);">
                            <img src="../img/estrellao.png" style="margin-left: 10px;" id="E3" data-posicion="3" onmouseover="javascript:e_hover(3);" onmouseout="javascript:e_out(3);" data-seleccion="" onclick="javascript:e_click(3);">
                            <img src="../img/estrellao.png" style="margin-left: 10px;" id="E4" data-posicion="4" onmouseover="javascript:e_hover(4);" onmouseout="javascript:e_out(4);" data-seleccion="" onclick="javascript:e_click(4);">
                            <img src="../img/estrellao.png" style="margin-left: 10px;" id="E5" data-posicion="5" onmouseover="javascript:e_hover(5);" onmouseout="javascript:e_out(5);" data-seleccion="" onclick="javascript:e_click(5);">
                          </span>
                        </div>
                    </div>
                    <div class="row" style="margin-top: 30px;">
                        <div class="col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2">
                            <div class="form-group">
                                <label for="actividad" class="text-rr text-12" id="nomUser"></label>
                                <textarea class="form-control text-rr text-12" id="txtOpinion" rows="5"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="margin-bottom: 30px;">
                    <div class="row">
                        <div class="col-lg-4 col-lg-offset-4">
                            <span class="btn btncustom text-rbo text-12" style="height: 40px !important;padding-top: 10px !important;" id="guardaOpinion">
                                Publicar
                            </span>
                        </div>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal inicia session-->

        <?php include_once "modal.php"; ?>

    <script src="../js/jquery-1.11.3.js"></script>
    <script src="http://maps.google.com/maps/api/js?sensor=false"></script>
    <script src="../js/jquery.fancybox.pack.js?v=2.1.5"></script>
    <script src="../js/bootstrap.js"></script>
    <!--  Spiner -->
    <script src="../js/spin.js"></script>
    <!-- Sparkline -->
    <script src="../js/jquery.sparkline.min.js"></script>

    <script src="https://cdn.firebase.com/js/client/2.4.2/firebase.js"></script>

    <!-- Page Functions -->


    <script src="../js/funciones.js"></script>
    <script src="../js/ie-emulation-modes-warning.js"></script>
    <script src="../js/drawer.js"></script>
    <script src="../js/run_prettify.min.js"></script>
    <script src="../js/bootstrap-dialog.min.js"></script>
    <script src="../js/funciones.js"></script>
    <script src="../controlador/actividad.js"></script>
	  <script src="../controlador/comun.js"></script>
 <script src="../js/functions.js"></script>
    <script>
    $(function(){

        $(".gallery-image").fancybox({
          openEffect : 'fade',
          closeEffect : 'fade',
          closeBtn: true,
          helpers : {
            title : {
              type : 'over' //'float', 'inside', 'outside' or 'over'
            },
            thumbs : {
                  width: 50
              },
              buttons : {},
              overlay : {
                  css : {
                      'background' : 'rgba(0,0,0,0.5)'
                  }
              }

          }

      });

    });
  </script>
</body>
</html>
