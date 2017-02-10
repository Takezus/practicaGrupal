<?php 
	session_start();
	include_once("../App/config.inc.php");
	$actividad = $_POST['act'];
	switch ($actividad){
		case 'getPaginas':
			$string = SERVER."getPaginas";
			$data = file_get_contents($string);
			echo $data;
		break;
	}

?>