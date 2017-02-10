<?php 
	session_start();
	include_once("../App/config.inc.php");
	$actividad = $_POST['act'];
	switch ($actividad){
		case 'getDepartamentos':
			$id_negocio = $_POST['id_negocio'];
			$string = SERVER."getDepartamentos?idnegocio=".$id_negocio;
			$data = file_get_contents($string);
			echo $data;
		break;
		case 'getUnDepar':
			$id = $_POST['id'];
			$string = SERVER."getUnDepar?idepartamento=".$id;
			$data = file_get_contents($string);
			echo $data;
		break;
		case 'elimDepar':
			$id = $_POST['id'];
			$string = SERVER."elimDepar?idepartamento=".$id;
			$data = file_get_contents($string);
			echo $data;
		break;
	}

?>