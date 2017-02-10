<?php 
	session_start();
	$_SESSION['idveraccion'] = $_GET['id'];
	if ($_GET['id']=='0'){
		print "<script language=JavaScript>";
		print "window.close();";
		print "</script>";		

	}else{
		header('Location: actividad.php');	
	}
	
?>