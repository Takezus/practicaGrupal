<?php 
	session_start();
	include_once("../App/config.inc.php");
	$actividad = $_POST['act'];
	switch ($actividad){
		case 'getMaxTags':
			$id_factura = $_SESSION['id_factura'];
			$string = SERVER."getMaxTags?idfactura=".$id_factura;
			$data = file_get_contents($string);
			echo $data;
		break;
		case 'getPlanes':
			$string = SERVER."getPlanes";
			$data = file_get_contents($string);
			echo $data;
		break;
		case 'getMaxAgentes':
			$string = SERVER."getMaxAgentes";
			$data = file_get_contents($string);
			echo $data;
		break;
		case 'getCicloFact':
			$id_plan = $_POST['id_plan'];
			$string = SERVER."getCicloFact?idplan=".$id_plan;
			$data = file_get_contents($string);
			echo $data;
		break;
		case 'actFacturaTemp':
			$id_factura = $_SESSION['id_factura'];
			$id_plan = $_POST['id_plan'];
			$ciclo_fac = $_POST['ciclo_fac'];
			$agentes = $_POST['agentes'];
			$string = SERVER."actFacturaTemp2?idfactura=".$id_factura."&nuevoplan=".$id_plan."&ciclofact=".$ciclo_fac."&cantagentes=".$agentes;
			$data = file_get_contents($string);
			echo $data;		
		break;
		case 'getCategorias':
			$string = SERVER."getCategorias";
			$data = file_get_contents($string);
			echo $data;
		break;
		case 'getSubcategorias':
			$nivel = $_POST['nivel'];
			$valornivelpadre = $_POST['valornivelpadre'];
			$string = SERVER."getSubcategorias?nivel=".$nivel."&valornivelpadre=".$valornivelpadre;
			$data = file_get_contents($string);
			echo $data;
		break;
		case 'getProvincias':
			$string = SERVER."getProvincias";
			$data = file_get_contents($string);
			echo $data;
		break;
		case 'getMaxFotos':
			$id_factura = $_SESSION['id_factura'];
			$string = SERVER."getMaxFotos?idfactura=".$id_factura;
			$data = file_get_contents($string);
			echo $data;
		break;
		case 'getMaxFotos2':
			$id_negocio = $_SESSION['id_negocio'];
			$string = SERVER."getMaxFotos?idnegocio=".$id_negocio;
			$data = file_get_contents($string);
			echo $data;
		break;
		case 'getTextoResaltarPagina':
			$string = SERVER."getTextoResaltarPagina";
			$data = file_get_contents($string);
			echo $data;
		break;
		case 'getFormapago':
			$string = SERVER."getFormapago";
			$data = file_get_contents($string);
			echo $data;
		break;
		case 'getTextoContacto':
			$string = SERVER."getTextoContacto";
			$data = file_get_contents($string);
			echo $data;
		break;
		case 'getPlanes2':
			$string = SERVER."getPlanes2";
			$data = file_get_contents($string);
			echo $data;
		break;
		case 'incNuevoPlan':
			$id_factura = $_SESSION['id_factura'];
			$id_plan = $_POST['id_plan'];
			$string = SERVER."incNuevoPlan?idfactura=".$id_factura."&idplan=".$id_plan;
			$data = file_get_contents($string);
			echo $data;
		break;
		case 'getResumen':
			$id_factura = $_SESSION['id_factura'];
			$string = SERVER."getResumen?idfactura=".$id_factura;
			$data = file_get_contents($string);
			echo $data;
		break;
		case 'elimPagina':
			$id_negocio = $_POST['idpagina'];
			$string = SERVER."elimPagina?idpagina=".$id_negocio;
			$data = file_get_contents($string);
			$json = json_decode($data,true);
			if ($json['success']==true){
				$_SESSION['id_negocio'] = '';
				$valores = array('success' => true);
				echo json_encode($valores);
			}else{
				echo $data;
			}
		break;
		case 'incPagina':
			$id_factura = $_SESSION['id_factura'];
			$id_usuario = $_SESSION['id_usuario'];
            $nombre = $_POST['nombre'];
            $sitioweb = $_POST['sitioweb'];
            $actividad = $_POST['actividad'];
            $logo = $_POST['logo'];
            $idsubcategoria = $_POST['idsubcategoria'];
            $idprovincia = $_POST['idprovincia'];
            $direccion = $_POST['direccion'];
            $palclaves = $_POST['palclaves'];
            $telefono = $_POST['telefono'];
            $email = $_POST['email'];
            $ciudad = $_POST['ciudad'];
            $horarios = $_POST['horarios'];
            $latitud = $_POST['latitud'];
            $longitud = $_POST['longitud'];
            $imagenes = $_POST['imagenes'];
			$string = SERVER."incPagina?idfactura=".$id_factura."&idusuario=".$id_usuario."&nombre=".$nombre."&sitioweb=".$sitioweb."&actividad=".$actividad."&logo=".$logo."&idsubcategoria=".$idsubcategoria."&idprovincia=".$idprovincia."&direccion=".$direccion."&palclaves=".$palclaves."&telefono=".$telefono."&email=".$email."&ciudad=".$ciudad."&horarios=".$horarios."&latitud=".$latitud."&longitud=".$longitud."&imagenes=".$imagenes;
			//$data = file_get_contents($string);
			//echo $data;
			$arr = array('sql' => $string);
			echo json_encode($arr);
		break;
	}

?>