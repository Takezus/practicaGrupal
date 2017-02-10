<?php 
	session_start();
	include_once("../App/config.inc.php");
	$actividad = $_POST['act'];
	switch ($actividad){
		case 'getAgentes':
			$id_negocio = $_POST['id_negocio'];
			$string = SERVER."getAgentes?idnegocio=".$id_negocio;
			$data = file_get_contents($string);
			echo $data;
		break;
		case 'getUnOperador':
			$id = $_POST['id'];
			$string = SERVER."getUnOperador?idoperador=".$id;
			$data = file_get_contents($string);
			echo $data;
		break;
		case 'elimOperador':
			$id = $_POST['id'];
			$string = SERVER."elimOperador?idoperador=".$id;
			$data = file_get_contents($string);
			echo $data;
		break;
	}

?>