<?php  
	$lat = $_GET['lat'];
	$lon = $_GET['lon'];
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="../css/style.css">
</head>
<body>

        <input type="hidden" id="lat" value="<?= $lat ?>">
        <input type="hidden" id="lon" value="<?= $lon ?>">

		<div class="container-fluid">
			<div class="row" style="margin-top: 5%;">
				<div class="col-xs-12">
                    <div class="form-group">
                        <label for="direccion" class="text-rr text-12">Direccion</label>
						<input type="hidden" name="lat" id="lat"/>
						<input type="hidden" name="lng" id="long"/>
                        <input type="text" id="direccion" name="direccion" class="form-control text-rr text-12" value="Panama, ciudad de Panama"/>    
                        <p class="help-block text-12" style="margin-left: 2%; font-family: Roboto-Regular !important;">Ingresa tu dirección  y presiona enter ó arrastra <img src="../img/gmaps.png"> hasta tu ubicación, luego has clic sobre él</p>
                    </div> 					
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12">
                    <!-- div donde se dibuja el mapa-->
					<div id="map_canvas" style="width:100%;height:400px;"></div>					
				</div>
			</div>
		</div>

		 
		

		

		
	

   <!-- <div id="map_canvas" style="width: 640px; height: 400px;"></div> -->
   <script src="../js/jquery-1.11.3.js"></script>
   <script src="http://maps.google.com/maps/api/js?sensor=false"></script>
   <script src="../controlador/gmail.js"></script>
</body>
</html>