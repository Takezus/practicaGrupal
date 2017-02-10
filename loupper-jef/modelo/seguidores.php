<?php 
	session_start();
	include_once("../App/config.inc.php");
	$actividad = $_POST['act'];
	switch ($actividad){
		case 'getSeguidores':
			$string = SERVER."getSeguidores?idnegocio=".$_SESSION['id_negocio'];;
			$data = file_get_contents($string);
			echo $data;
		break;
	}

?>