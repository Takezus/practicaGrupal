<?php  
  session_start();
  $cantidad = $_SESSION['cantidad'];
  $donde = $_SESSION['donde'];
  $seccion = $_SESSION['seccion'];
  $id_usuario = "";
  if (array_key_exists("id_usuario",$_SESSION)){
    $id_usuario = $_SESSION['id_usuario'];
  } 
  include_once("../App/config.inc.php");
?>
<!DOCTYPE HTML>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <title>Selección de Imagenes</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="../css/style.css">
    <style>
      .thumb {
        height: 75px;
        border: 1px solid #000;
        margin: 10px 5px 0 0;
        max-width: 75px;
      }
  </style>
  </head>
  <body>
    <div class="container" style="text-align: center;">
      <div class="row" style="margin-top: 1%;">
        <div class="col-xs-12">
          <p class="text-rbo text-14">Selección de Images</p>
          <p class="text-rr text-12">Cantidad de imagenes a seleccionar: <?php echo $cantidad; ?></p>
          <input type="hidden" id="cantidad" value="<?php echo $cantidad; ?>">
           <input type="hidden" id="donde" value="<?php echo $donde; ?>">
           <input type="hidden" id="seccion" value="<?php echo $seccion; ?>">
           <input type="hidden" id="id_usuario" value="<?php echo $id_usuario; ?>">
        </div>
      </div>
      <div class="row" style="margin-top: 1%;">
        <div class="col-xs-12">
          <input type="file" id="files" name="files" multiple class="text-rr text-12 center-block" />
        </div>
      </div>
      <div class="row" style="margin-top: 1%;">
        <div class="col-xs-12" id="listado">
          <div class="row">
            <output id="list"></output>  
          </div>
          <div class="row" style="margin-top: 2%;">
            <img src="../img/guardar-img.png" id="guardar-img">
            <img src="../img/limpiar-sel.png" id="limpiar-sel" style="margin-left:2%;">
          </div>";
      </div>
    </div>
    <div class="modall"></div>
    <!-- Layout  -->
<!--    <div class="Seccion">

      


       <h2>Crear/Actualizar Usuario</h2>
      <label for="idUsuario" >ID (entero):</label>
      <input id="idUsuario" type="text" /><br/>
      <label for="nombreUsuario" >Nombre:</label>
      <input id="nombreUsuario" type="text" /><br/>
      <label for="imagenUsuario" >Imagen:</label>
      <input id="seleccionarImagen" type="file" multiple/>
      <img id="vistaPrevia" /><br/>
      <input id="actualizarUsuario" type="button" value="Actualizar Usuario..." />
   </div> --> 
    <!-- Javascript  -->
    <script src="../js/jquery-1.11.3.js"></script>
    <script src="../controlador/imagenes.js"></script>
    <script>
      function ajax_start(){
          
          $body = $("body");
          $body.addClass("loading");
      }

      function ajax_stop(){
          $body = $("body");
           $body.removeClass("loading");
      }
      $('#limpiar-sel').click(function(){
        $('#files').wrap('<form>').parent('form').trigger('reset');
         $('#list').empty();
      });

      $('#guardar-img').click(function(){
        var donde = $('#donde').val();
        var seccion = $('#seccion').val();
        if (seccion=='galeria'){
          var i = parseInt(donde) - 1;
          $("#list img").each(function (index){ 
              i = i + 1;
              src = $(this).attr('src'); // "static/images/banner/blue.jpg"
              window.opener.document.getElementById('img_' + i).src = src;
          });
        }
        if (seccion=='logo'){
          $("#list img").each(function (index){ 
              i = i + 1;
              src = $(this).attr('src'); // "static/images/banner/blue.jpg"
              window.opener.document.getElementById('logo').src = src;
          });
        }
        if (seccion=='avatar'){
          $("#list img").each(function (index){ 
              ajax_start()
              i = i + 1;
              src = $(this).attr('src'); // "static/images/banner/blue.jpg"
              var params = {
                idusuario: $('#id_usuario').val(),
                foto: encodeURIComponent(src),
              }
              $.ajax({
                  async:false,   
                  cache:false, 
                  dataType: 'json',
                  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                  type: 'POST',  
                  url: 'http://www.loupper.com/loupper/loupperapis/actUser',
                  data: params,
                  success:  function(data){
                      if (data.success==true){
                          ajax_stop();
                          //var Rfoto=data.FotoN;
                          Nparam={act:"fotoN",
                                var:data.Foto
                          };
                          //alert(Rfoto);
                          window.opener.document.getElementById('avatar').src = src;
                           window.opener.document.getElementById('foto').value=data.Foto;
                          //window.alert(1);
                      }else{
                          showAlert('En este momento no podemos realizar su operación, intente más tarde','Error',12);
                      }
                  },
                  beforeSend:function(){},
                  error:function(objXMLHttpRequest){}
              });
              $.ajax({
                  async:false,   
                  cache:false, 
                  //dataType: 'json',
                  //contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                  type: 'POST',  
                  url: '../modelo/comun.php',
                  data: Nparam,
                  success:  function(data){
                 
                  },
                  beforeSend:function(){},
                  error:function(objXMLHttpRequest){
                  }
              });

          });

             
        }
        if (seccion=='editar_logo'){
          $("#list img").each(function (index){ 
              i = i + 1;
              src = $(this).attr('src'); // "static/images/banner/blue.jpg"
              window.opener.document.getElementById('imgLogo').src = src;
          });
        }          
        if (seccion=='paint_event'){
          $("#list img").each(function (index){ 
              i = i + 1;
              src = $(this).attr('src'); // "static/images/banner/blue.jpg"
              window.opener.document.getElementById('paintEvent').src = src;
          });
        }          
        if (seccion=='editar_portada'){
          $("#list img").each(function (index){ 
              i = i + 1;
              src = $(this).attr('src'); // "static/images/banner/blue.jpg"
              window.opener.document.getElementById('imgPortada').src = src;
          });
        }          
        window.close();
      });

    function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var cantidad = $('#cantidad').val();
    if (files.length > parseInt(cantidad)){
      alert('No puede seleccionar mas de '+cantidad+' fotos');
      $('#files').wrap('<form>').parent('form').trigger('reset');
      return;
    }
    if (files.length==0){
      return;
    }else{
      $('#list').empty();
      var div = "<div class=\"row\" style=\"margin-top: 2%;\">"+
                  "<img src=\"../img/guardar-img.png\" id=\"guardar-img\">"+
                  "<img src=\"../img/limpiar-sel.png\" id=\"limpiar\" style=\"margin-left:2%;\">"+
                "</div>";
      //$('#listado').append(div);
    }
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) { 
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById('list').insertBefore(span, null);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);


  

      // $('#seleccionarImagen').on('change', function(e) {
      //   var Lector,
      //   oFileInput = this; 
      //   if (oFileInput.files.length === 0) {
      //     return;
      //   }; 
      //   Lector = new FileReader();
      //   Lector.onloadend = function(e) {
      //     $('#vistaPrevia').attr('src', e.target.result);          
      //   };
      //   Lector.readAsDataURL(oFileInput.files[0]); 
      // });
 
      // $('#actualizarUsuario').on('click', function(e) {
      //   e.preventDefault();
      //   alert($('#idUsuario').val());
      //   alert($('#nombreUsuario').val());
      //   alert($('#vistaPrevia').attr('src'));
      //   var parametros = {
      //     id : $('#idUsuario').val(),
      //     nombre : $('#nombreUsuario').val(),
      //     imagen : $('#vistaPrevia').attr('src'),
      //   };
      //   $.ajax('guardar_imagen.php', {
      //     type : 'POST',
      //     data : parametros,
      //     success : function(data) {
      //       if(data.error){
      //         console.log('Error controlado.', data.mensaje);
      //         return;
      //       };
      //       console.log('Los datos del usuario ' + parametros.id + ' fueron guardados.');
      //     },
      //     error : function(data) {
      //       console.log('Error no controlado.', data);
      //     }
      //   });
      //   return false;
      // });
    </script>
    
  </body>
</html>