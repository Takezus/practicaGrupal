<?php 
	session_start();
	$_SESSION['cantidad'] = $_GET['cantidad'];
	$_SESSION['donde'] = $_GET['donde'];
	$_SESSION['seccion'] = $_GET['seccion'];
	header('Location: imagenes.php');
?>