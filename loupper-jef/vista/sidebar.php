   <input type="hidden" id="id_negocios" value="<?php echo $id_negocio; ?>">

   <div class="container-fluid" style="width:100%; height:100%;">
      <div class="row" style="height:100%;padding-top: 50px;">
        <div class="col-xs-12 col-sm-3 col-md-2 col-lg-2 fondo-nav" style=" height:100%;">
            <div class="row separa10">
               <div class="col-xs-3 col-sm-4 col-md-3 col-lg-4 "><img src="../img/avatar-empty.png" id="avatar" class="img-circle" style="width: 68px; height: 68px"></div>
               <div class="col-xs-9 col-sm-8 col-md-9 col-lg-8" style="top:5px;">
                  <p class="text-rr text-14 colorwhite" style="margin-bottom: 0px;" id="nombreusuario"><?php echo $nombre; ?></p>
                  <p class="text-rr text-10 colorwhite" style="margin-bottom: 0px;"><img src="../img/online.png" id="enlinea"> Conectado</p>
               </div>
            </div>
            <div class="row separa15">
               <div class="list-group" id="sidebar-int">
                  <a href="chat.php" class="list-group-item active text-rbo text-9 colorwhite" id="chat">
                    <img src="../img/img-nav-chat.png" class="alinea-side">Chat
                    <span class="badge badge2 text-rr text-8" >0</span>
                  </a>                     
                  <a href="agentes.php" class="list-group-item text-rbo text-9 colorwhite" id="agentes">
                    <img src="../img/img-age-nav.png" class="alinea-side">Operadores
                  </a>
                  <a href="departamentos.php" class="list-group-item text-rbo text-9 colorwhite" id="departamentos">
                    <img src="../img/img-dep-nav.png" class="alinea-side">Departamentos
                  </a>
                  <a href="javascript:acomodo();" class="list-group-item text-rbo text-9 colorwhite" id="pagina">
                    <img src="../img/img-pag-nav.png" class="alinea-side">Página
                  </a>
                  <a href="seguidores.php" class="list-group-item text-rbo text-9 colorwhite" id="seguidores">
                    <img src="../img/img-seg-nav.png" class="alinea-side">Seguidores
                  </a>
                 <a href="siguiendo.php" class="list-group-item text-rbo text-9 colorwhite" id="siguiendo">
                   <img src="../img/img-sig-nav.png" class="alinea-side">Siguiendo
                 </a>
                 <a href="facturacion.php" class="list-group-item text-rbo text-9 colorwhite" id="facturacion">
                   <img src="../img/img-fac-nav.png" class="alinea-side">Facturación
                 </a>
                 <a href="editar_cuenta.php" class="list-group-item text-rbo text-9 colorwhite" id="editar">
                   <img src="../img/img-edi-nav.png" class="alinea-side">Editar Cuenta
                 </a>
                 <a href="cambiar_plan.php" class="list-group-item text-rbo text-9 colorwhite" id="cambiar">
                   <img src="../img/img-cam-nav.png" class="alinea-side">Cambiar Plan
                 </a>
                 <a class="list-group-item text-rbo text-9 colorwhite" id="cerrar">
                   <img src="../img/img-cer-nav.png" class="alinea-side">Cerrar Sesión
                 </a>
               </div>           
            </div>
        </div>

        <script type="text/javascript">
          function acomodo(){
             var id_negocios = $('#id_negocios').val();

             if (id_negocios!='' && id_negocios!='0'){
                $(location).attr('href','editar_pagina.php'); 
             }else{
                $(location).attr('href','nopagina.php');
             }
          }

        </script>
