<?php 
	session_start();
	include_once("../App/config.inc.php");
	$actividad = $_POST['act'];
	switch ($actividad){
		case 'getPagina':
			$pagina = $_POST['pagina'];
			$string = SERVER."getPagina?idpagina=".$pagina;
			$data = file_get_contents($string);
			echo $data;
		break;
		case 'getPagRelacionadas':
			$pagina = $_POST['pagina'];
			$string = SERVER."getPagRelacionadas?idpagina=".$pagina;
			$data = file_get_contents($string);
			echo $data;
		break;
		case 'getImagenes':
			$pagina = $_POST['pagina'];
			$string = SERVER."getImagenes?idpagina=".$pagina;
			$data = file_get_contents($string);
			echo $data;
		break;
	}

?>