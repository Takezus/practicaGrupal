<?php 
	session_start();
	include_once("../App/config.inc.php");
	$actividad = $_POST['act'];
	switch ($actividad){
		case "getParams":
			$valores = array('id_negocio' => $_SESSION['id_negocio'], 'operador' => $_SESSION['operador'], 'admin' => $_SESSION['admin'], 'id_usuario' => $_SESSION['id_usuario']);
			echo json_encode($valores);
		break;
		case "setParams2":
			$_SESSION['admin'] = '1';
			$_SESSION['id_negocio'] = $_POST['id'];
			$valores = array('success' =>true);
			echo json_encode($valores);
		break;
		case "setParams3":
			$_SESSION['name_usuario']  = $_POST['name'];
			$valores = array('success' =>true);
			echo json_encode($valores);
		break;
		case "setParams":
			$_SESSION['operador'] = '1';
			$_SESSION['admin'] = '1';
			$_SESSION['id_negocio'] = $_POST['id'];
			$valores = array('success' =>true);
			echo json_encode($valores);
		break;
		case "setLinea":
			$_SESSION['linea'] = $_POST['linea'];
			$valores = array('success' =>true);
			echo json_encode($valores);
		break;
		case 'getUser':
			$correo = trim($_POST['correo']);
			$clave = md5(trim($_POST['clave']));
			$string = SERVER."getUser2?email=".$correo."&clave=".$clave;
			$data = file_get_contents($string);//obtenemos los datos
			$json = json_decode($data,true);//desencriptamos los datos
			//si la operacion tiene exito se devuelve un valor true
			
			if ($json['success']==true){
				//Y se crean todas estas sesiones
				$_SESSION['id_usuario'] = $json['data']['id'];
				$_SESSION['name_usuario'] = $json['data']['nombre'];
				$_SESSION['id_negocio'] = $json['data']['idnegocio'];//Este sera el id que se le pasara al input del index
				$_SESSION['operador'] = $json['data']['operador'];
				$_SESSION['admin'] = $json['data']['admin'];
				$_SESSION['foto'] = $json['data']['foto'];//Es aqui donde se guarda las fotosjij
				$_SESSION['linea'] = '1';
				$_SESSION['conexion'] = 1;//La conexion cambia a 1
				$_SESSION['quickblox_id'] = $json['data']['quickblox_id'];
				$_SESSION['email'] = $json['data']['email'];
				$valores = array('success' => true, 'id' => $_SESSION['id_usuario'], 'nombre' => $_SESSION['name_usuario'], 'quickblox_id'=> $_SESSION['quickblox_id'],"email"=>$_SESSION['email']);
				echo json_encode($valores);//Encriptamos los datos
			}else{
				echo $data;//devolvemos la data
			}
		break;
		case 'logFacebook':
		//Es en este punto donde se hace la verificacion, se envian los datos al loupper por la url, se verifican, y luego se traen los datos de la base de datos y se usan para la crear las variables de session
			$id = trim($_POST['id']);
			$string = SERVER."getUser2?idfacebook=".$id;
			$data = file_get_contents($string);
			
			$json = json_decode($data,true);

			if ($json['success']==true){
				$_SESSION['id_usuario'] = $json['data']['id'];
				$_SESSION['name_usuario'] = $json['data']['nombre'];
				$_SESSION['id_negocio'] = $json['data']['idnegocio'];
				$_SESSION['operador'] = $json['data']['operador'];
				$_SESSION['admin'] = $json['data']['admin'];
				$_SESSION['conexion'] = 1;
				$_SESSION['linea'] = '1';
				$_SESSION['foto'] = $json['data']['foto'];//Se crean los datos de sesion
				$valores = array('success' => true, 'id' => $_SESSION['id_usuario'], 'nombre' => $_SESSION['name_usuario']);
				echo json_encode($valores);
			}else{
				echo $data;
			}
		break;

		case 'fotoN':
		$fotoN=trim($_POST["var"]);
		$_SESSION['foto']=$fotoN;
		//echo "Exito";
		
		break;
		case 'delSession':
			session_destroy();
			$parametros_cookies = session_get_cookie_params();
			setcookie(session_name(),0,1,$parametros_cookies["path"]);
			$valores = array('success' => true);
			echo json_encode($valores);
		break;
		//Se accede aca a travez de actividad.php
		case 'getConfChat':
			$idnegocio = trim($_POST['idnegocio']);
			$string = SERVER."getConfChat?idnegocio=".$idnegocio;
			$data = file_get_contents($string);
			echo $data;//Recibimos los datos
		break;
		case 'getOperDep':
			$idepartamento = trim($_POST['idepartamento']);
			$string = SERVER."getOperDep?idepartamento=".$idepartamento;
			$data = file_get_contents($string);
			$assoc = true;
			$result = json_decode ($data, $assoc);
			$i=0;
			
			foreach($result['data'] as $row)
			{
				$result['data'][$i] = $row;
				if($_SESSION['id_usuario'] != $row['idoperador']){
					$createDialog = createChatDialog($row['nombre'],$row['quickblox_id']);
					
					$result['data'][$i]['chat_dailog_id'] = $createDialog->_id;
					$result['data'][$i]['last_message_date_sent'] = $createDialog->last_message_date_sent;
				}
				$i++;
				
			}
			echo json_encode($result);
		break;
		case 'prueba':
			$array = array('horarios' => $_POST['horarios']);
			echo json_encode($array);
		break;
		
		case 'getImages':
			$quickbloxIds = implode(",",array_unique($_POST['quickbloxIds']));
			$string = SERVER."getUsuarioImages?quickbloxIds=".$quickbloxIds;
			$data = file_get_contents($string);
			echo $data;//Recibimos los datos
		break;
	}
	
	function createChatDialog($nombre,$quickbloxId) { 
    
    	  $sessiontoken = createSession();
    	  $token = $sessiontoken->session->token;
    	  $post_body = http_build_query( array(
            'type' => 3,
            'name' => $nombre,
            'occupants_ids' => $quickbloxId
        ));
        
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, QB_API_ENDPOINT.'/chat/Dialog.json');
        curl_setopt($curl, CURLOPT_POST, true); // Use POST
        curl_setopt($curl, CURLOPT_POSTFIELDS, $post_body); // Setup post body
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Accept: application/json',
            'Content-Type: application/x-www-form-urlencoded',
            'QuickBlox-REST-API-Version: 0.1.0',
            'QB-Token: ' . $token
        ));
        $response = curl_exec($curl);
        
        if ($response) {
                return json_decode($response);
        } else {
        	
        	 $error = curl_error($curl). '(' .curl_errno($curl). ')';
            return $error;
               // echo false;
        }
        curl_close($curl);
	}
	
	
	 function createSession()
    {
        // Generate signature
        $nonce = rand();
        $timestamp = time(); // time() method must return current timestamp in UTC but seems like hi is return timestamp in current time zone
        $login = $_SESSION["email"]; 
        if($_SESSION["email"] == "bhavik.talpada@swayaminfotech.com")
        { 
        	$login = "BhavikPatel";
        }
        
		  $signature_string = "application_id=".QB_APP_ID."&auth_key=".QB_APP_KEY."&nonce=".$nonce."&timestamp=".$timestamp."&user[login]=" .$login. "&user[password]=12345678"; 
        $signature = hash_hmac('sha1', $signature_string , QB_APP_SECRET);
 					
        // Build post body
        
        $post_body = http_build_query( array(
		    'application_id' => QB_APP_ID,
		    'auth_key' => QB_APP_KEY,
		    'timestamp' => $timestamp,
		    'nonce' => $nonce,
		    'signature' => $signature,
		    'user[login]' => $login,
		    'user[password]' => "12345678"
		  ));
		  
        //p($post_body);
        // Configure cURL

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, QB_API_ENDPOINT . '/' . QB_USER_SESSION); // Full path is - https://api.quickblox.com/session.json
        curl_setopt($curl, CURLOPT_POST, true); // Use POST
        curl_setopt($curl, CURLOPT_POSTFIELDS, $post_body); // Setup post body
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); // Receive server response
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        // Execute request and read response
        $response = curl_exec($curl);
        //p($response);
        $responseJSON = json_decode($response);
        
       
 
        //return $responseJSON;
        // Check errors
        if ($responseJSON) {
            return $responseJSON;
        } else {
            $error = curl_error($curl). '(' .curl_errno($curl). ')';
            return $error;
        }
        // Close connection
        curl_close($curl);
    }

?>