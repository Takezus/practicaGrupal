<?php
    session_start();
    $nombre = "";
    $foto = "";
    $linea = "0";
    $conexion = 0;
    $id_plan = "0";
    $id_factura = 0;
    $id_negocio = 0;
    $id_usuario = 0;
    if (!array_key_exists("id_usuario",$_SESSION)){
        $conexion = 0;
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
  include_once("../App/config.inc.php");

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="../css/style.css">
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
  <!--const-->
    <script type="text/javascript" src="../App/config.js"></script>
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
    <meta property="og:url"           content="http://www.your-domain.com/your-page.html" />
    <meta property="og:type"          content="website" />
    <meta property="og:title"         content="Your Website Title" />
    <meta property="og:description"   content="Your description" />
    <meta property="og:image"         content="http://www.loupper.com/loupperf/img/iniciar.png" />
</head>
<body class="has-drawer">
        <input type="hidden" id="name" value="<?php echo $nombre; ?>">
        <input type="hidden" id="foto" value="<?php echo $foto; ?>">
        <input type="hidden" id="linea" value="<?php echo $linea; ?>">
        <input type="hidden" id="iddUser" value="<?php echo $id_usuario; ?>">
        <input type="hidden" id="id_conexion" value="<?php echo $conexion; ?>">


 <!-- Fixed navbar -->
 <div class="">

   <nav class="navbar navbar-default navbar-fixed-top navarfix visible-md visible-lg" style="border: none !important;">
     <div class="container-fluid menusup">
         <div class="navbar-header">
             <div id="sidebar">
                 <a href="#" id="icono"> <img src="../img/hamburguesa.png" class=""></a>
                 <div id="logo">
                     <h2 class="drawer-title">Loupper</h2>
                 </div>
                 <!-- Menu del sidebar -->
                 <div id="menu">
                     <ul class="nav nav-tabs nav-stacked">
                         <li role="presentation" class=""><a href="index.php"><h4>Inicio</h4></a></li>
                         <li role="presentation" class="list-busq subcategoria dropdown dropbtn">
                             <a href="#" id=""><img src="../imgm/cat1.png" style="margin-left: 5%; margin-right:2%;">Categorìa 1<img src="../imgm/mas.png" class="menu-arrow "></a>
                             <div class="submenu">
                                 <ul class="nav nav-tabs nav-stacked">
                                     <li><a href="busqueda.php">Subcategorìa <span>(000)</span></a></li>
                                     <li><a href="busqueda.php">Subcategorìa <span>(000)</span></a></li>
                                     <li><a href="busqueda.php">Subcategorìa <span>(000)</span></a></li>
                                     <li><a href="busqueda.php">Subcategorìa <span>(000)</span></a></li>
                                     <li><a href="busqueda.php">Subcategorìa <span>(000)</span></a></li>
                                     <li><a href="busqueda.php">Subcategorìa <span>(000)</span></a></li>
                                 </ul>
                             </div>
                         </li>
                         <li role="presentation" class="list-busq">
                             <a href="index.php"><img src="../imgm/cat2.png" style="margin-left: 5%; margin-right:2%;">Categorìa 2<img src="../imgm/mas.png" class="menu-arrow"></a>
                             <div class="submenu">
                                 <ul class="nav nav-tabs nav-stacked">
                                     <li><a href="busqueda.php">Subcategorìa <span>(000)</span></a></li>
                                     <li><a href="busqueda.php">Subcategorìa <span>(000)</span></a></li>
                                     <li><a href="busqueda.php">Subcategorìa <span>(000)</span></a></li>
                                     <li><a href="busqueda.php">Subcategorìa <span>(000)</span></a></li>
                                     <li><a href="busqueda.php">Subcategorìa <span>(000)</span></a></li>
                                     <li><a href="busqueda.php">Subcategorìa <span>(000)</span></a></li>
                                 </ul>
                             </div>
                         </li>
                         <li role="presentation" class="list-busq">
                             <a href="index.php"><img src="../imgm/cat3.png" style="margin-left: 5%; margin-right:2%;">Categorìa 3<img src="../imgm/mas.png" class="menu-arrow"></a>
                             <div class="submenu">
                                 <ul class="nav nav-tabs nav-stacked">
                                     <li><a href="busqueda.php">Subcategorìa <span>(000)</span></a></li>
                                     <li><a href="busqueda.php">Subcategorìa <span>(000)</span></a></li>
                                     <li><a href="busqueda.php">Subcategorìa <span>(000)</span></a></li>
                                     <li><a href="busqueda.php">Subcategorìa <span>(000)</span></a></li>
                                     <li><a href="busqueda.php">Subcategorìa <span>(000)</span></a></li>
                                     <li><a href="busqueda.php">Subcategorìa <span>(000)</span></a></li>
                                 </ul>
                             </div>
                         </li>
                     </ul>
                 </div>
                 <!-- Fin Menu del sidebar -->
             </div>
         </div>
         <div id="navbar" class="navbar-collapse collapse">
             <ul class="nav navbar-nav navbar-right">
                 <li><a id="iniciar" class="text-rr colorwhite text-11">Inicia Sesión</a></li>
                 <li><a id="registrar" class="text-rr colorwhite text-11">Registrate</a></li>
                 <li class="menudersup"><a id="publicar" class="text-rb colorwhite text-14">Publicar Página</a></li>
             </ul>
         </div>
     </div>
 </nav>

 <div class="container-fluid menusup visible-xs visible-sm">
     <div class="row">
         <div class="col-xs-5" style="height: 45px;">
             <img id="hamburquesa" src="../img/hamburguesa.png" class="">
             <!-- Menu del sidebar -->
             <div id="sidebarm">
                 <div id="logo">
                     <span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>
                     <h2 class="drawer-title">Loupper</h2>

                 </div>
                 <div id="menu">
                     <ul class="nav nav-tabs nav-stacked">
                         <li role="presentation" class=""><a href="index.php">Inicio</a></li>
                         <li role="presentation" class="list-busq subcategoria dropdown dropbtn">
                             <a href="busquedar.html" id=""><img src="../imgm/cat1.png" style="margin-left: 5%; margin-right:2%;">Categorìa 1<img src="../imgm/mas.png" class="menu-arrow "></a>
                             <div class="submenu">
                                 <ul class="nav nav-tabs nav-stacked">
                                     <li><a href="">Subcategorìa <span>(000)</span></a></li>
                                     <li><a href="">Subcategorìa <span>(000)</span></a></li>
                                     <li><a href="">Subcategorìa <span>(000)</span></a></li>
                                     <li><a href="">Subcategorìa <span>(000)</span></a></li>
                                     <li><a href="">Subcategorìa <span>(000)</span></a></li>
                                     <li><a href="">Subcategorìa <span>(000)</span></a></li>
                                 </ul>
                             </div>
                         </li>
                     </ul>
                 </div>
                 <!-- Fin Menu del sidebar -->
             </div>
         </div>
         <div class="col-xs-6">
             <img src="../imgm/bar-icon2.png" class="pull-right" style="margin-top:12px; margin-left: 10px;">
             <img src="../imgm/bar-icon1.png" class="pull-right" style="margin-top:12px;">
         </div>
     </div>
 </div>
 </div>
