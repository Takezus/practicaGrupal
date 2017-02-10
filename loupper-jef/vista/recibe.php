<?php 
	session_start();
	$foto=$_POST['var'];
	$actividad = $_POST['act'];
	switch ($actividad) {
		case 'fotoN':
			echo "Hola";
			echo $foto;
			break;

	}