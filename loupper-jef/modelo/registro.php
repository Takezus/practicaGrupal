<?php 
	session_start();
	include_once("../App/config.inc.php");
	include_once "../clases/clases.php";
	$Clase = new clases_bddb();

	$actividad = $_POST['act'];
	switch ($actividad){
		case 'incUsuario':
			$nombre = trim($_POST['nombre']);
			$apellido = trim($_POST['apellido']);
			$fecha = $Clase->fec_guardar(trim($_POST['fecha']));
			$genero = $_POST['genero'];
			$correo = trim($_POST['correo']);
			$clave_e = md5(trim($_POST['clave']));
			$clave = trim($_POST['clave']);
			$string = SERVER."incUsuario2?email=".$correo."&clave=".$clave_e."&clave2=".$clave."&fecnac=".$fecha."&genero=".$genero."&nombre=".$nombre."&apellido=".$apellido;
			$url = str_replace(' ', '%20', $string);
			$data = file_get_contents($url);

			// $json = json_decode($data,true);

			// if ($json['success']==true){
			// 	$_SESSION['id_usuario'] = $json['id'];
			// 	$_SESSION['conexion'] = 1;
			// 	$valores = array('success' => true, 'id' => $_SESSION['id_usuario']);
			// 	echo json_encode($valores);
			// }else{
				echo $data;
			// }
		break;
		case 'incFacebook':
			$id = $_POST['id'];
			$nombre = trim($_POST['nombre']);
			$apellido = trim($_POST['apellido']);
			$fecha = $Clase->fec_guardar('00/00/0000');
			if ($_POST['genero']=='male'){
				$genero = 'M';
			}else{
				$genero = 'F';
			}
			$correo = trim($_POST['correo']);
			$string = SERVER."incUsuario2?email=".$correo."&fecnac=".$fecha."&genero=".$genero."&nombre=".$nombre."&apellido=".$apellido."&idfacebook=".$id;
			$url = str_replace(' ', '%20', $string);
			$data = file_get_contents($url);
			
			// $json = json_decode($data,true);

			// if ($json['success']==true){
			// 	$_SESSION['id_usuario'] = $json['id'];
			// 	$_SESSION['conexion'] = 1;
			// 	$valores = array('success' => true, 'id' => $_SESSION['id_usuario']);
			// 	echo json_encode($valores);
			// }else{
				echo $data;
			// }
		break;
	}

?>