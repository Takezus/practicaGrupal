<?php 
	session_start();
	include_once("../App/config.inc.php");
	$actividad = $_POST['act'];
	switch ($actividad){
		case 'incFacturaTemp':
			$id = $_POST['id'];
			$tira = $_POST['tira'];
			$tira = explode(";", $tira);
			$string = SERVER."incFacturaTemp2?idplan=".$tira[0];
			$data = file_get_contents($string);
			$json = json_decode($data,true);
			if ($json["success"]==true){
				$_SESSION['id_plan'] = $id;
				$_SESSION['id_factura'] = $json["numeroactual"];
				$_SESSION['ciclo_fac'] = $tira[0];
				echo $data;
			}
		break;
		case 'getTituloPlan':
			$string = SERVER."getTituloPlan";
			$data = file_get_contents($string);
			echo $data;
		break;
		case 'getPlanes':
			$string = SERVER."getPlanes";
			$data = file_get_contents($string);
			echo $data;
		break;
		case 'getPreguntas':
			$string = SERVER."getPreguntas";
			$data = file_get_contents($string);
			echo $data;
		break;
	}

?>