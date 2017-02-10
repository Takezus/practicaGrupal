<?php  
	//Función auxiliar para errores (solo AJAX)
	function mostrar_error($mensaje_error){
	  $arr = array("error" => true, "mensaje" => $mensaje_error);
	  echo json_encode($arr);
	  exit();
	};
	 
	//Conexión a la base de datos
	function abrirConexion(){
	  $db_host = 'localhost'; //La dirección del servidor de BD
	  $db_user = 'root';
	  $db_pw = '';
	  $db_name = 'fotos';
	 
	  $connection = mysqli_connect($db_host, $db_user, $db_pw, $db_name);
	  if (!$connection) {
	    mostrar_error("No se puede conectar al servidor\\base de datos: $db_host\\$db_name");
	  }
	  return $connection;
	}
?>