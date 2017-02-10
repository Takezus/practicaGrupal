<?php 
	session_start();
	include_once("../App/config.inc.php");
	$actividad = $_POST['act'];
	switch ($actividad){
		case 'getSiguiendo':
			$string = SERVER."getSiguiendo?idusuario=2";
			$data = file_get_contents($string);
			echo $data;
		break;
	}

?>