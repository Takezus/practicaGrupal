<?php 
	session_start();
	include_once("../App/config.inc.php");
	$actividad = $_REQUEST['act'];
	
	switch ($actividad){
		case "createDialog":
			$sessiontoken = createSession();
			$createDialog = createChatDialog($sessiontoken->session->token,$_POST['nombre'],$_POST['quickblox_id']);
			$_SESSION['session_token'] = $sessiontoken->session->token;
			$_SESSION['chat_dailog_id'] = $createDialog->_id;
			$message = quickGetMessage($_SESSION['session_token'],$_SESSION['chat_dailog_id']);
			$valores = array('chat_dailog_id'=>$createDialog->_id,"created_at"=>$createDialog->created_at,"last_message"=>$createDialog->last_message_date_sent,"recipient_id"=>$_POST['quickblox_id'],"messages"=>$message);
			echo json_encode($valores);
		break;
		case "sendMessage":
			$message = quickSendMessage($_SESSION['session_token'],$_POST['mensaje'],$_POST['chat_dialog_id'],$_POST['recipient_id'],$_POST['attachment']);
			$valores = array('messages'=>$message);
			echo json_encode($valores);
		break;
		case "getMessage":
			$message = quickGetMessage($_SESSION['session_token'],$_SESSION['chat_dailog_id']);
			$valores = array('chat_dailog_id'=>$_SESSION['chat_dailog_id'],'messages'=>$message);
			echo json_encode($valores);
		break;	
		case "uploadBlogContent":
			$message = uploadBlobContent($_SESSION['session_token']);
			$valores = array();
			echo json_encode($valores);
		break;
		
	}
	
	
	function createChatDialog($token,$nombre,$quickbloxId) { 
    
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
        $signature_string = "application_id=".QB_APP_ID."&auth_key=".QB_APP_KEY."&nonce=".$nonce."&timestamp=".$timestamp."&user[login]=" . $_SESSION['email'] . "&user[password]=12345678";
 
        $signature = hash_hmac('sha1', $signature_string , QB_APP_SECRET);
 					
        // Build post body
        
        $post_body = http_build_query( array(
		    'application_id' => QB_APP_ID,
		    'auth_key' => QB_APP_KEY,
		    'timestamp' => $timestamp,
		    'nonce' => $nonce,
		    'signature' => $signature,
		    'user[login]' => $_SESSION['email'],
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
    
    function quickSendMessage($token,$mensaje,$chat_dialog_id,$recipient_id,$attachment) {
			
 			$post_body = http_build_query( array(
	   			"chat_dialog_id" => $chat_dialog_id,
	   			"message"=>$mensaje,
	   			"recipient_id"=>$recipient_id,
	   			"age" => 25
	 	  ));
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, QB_API_ENDPOINT . '/chat/Message.json'); // Full path is - https://api.quickblox.com/session.json
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
        
        // Execute request and read response
        $response = curl_exec($curl);

        if ($response) {
            return $response;
        } else {
            $error = curl_error($curl). '(' .curl_errno($curl). ')';
            return $error;
        }
        // Close connection
        curl_close($curl);
    }
    
    function quickGetMessage($token, $dialogId) {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, QB_API_ENDPOINT.'/chat/Message.json?chat_dialog_id=' . $dialogId);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'QuickBlox-REST-API-Version: 0.1.0',
            'QB-Token: ' . $token
        ));
        $response = curl_exec($curl);
        if ($response) {
                return json_decode($response);
        } else {
                echo false;
        }
        curl_close($curl);
	}


	function uploadBlobContent($token)
	{


				$post_body = http_build_query(array (
					  'blob' => 
					  array (
					    'content_type' => $_FILES["file"]['type'],
					    'name' => $_FILES["file"]['name'],
					  ),
					));
				
				$curl = curl_init();
		      curl_setopt($curl, CURLOPT_URL, 'http://api.quickblox.com/blobs.json'); // Full path is - https://api.quickblox.com/session.json
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
		        
		        // Execute request and read response
		      $response = curl_exec($curl);
		        
		      if ($response) {
		      			$response = json_decode($response);
		            if($response->blob->id != "") {
		            		$blob = $response->blob;
		            		
		            		if($blob->blob_object_access->blob_id != "")
		            		{
		            			$params = explode("?",urldecode($blob->blob_object_access->params));
		            			
		            			$params = explode("&",$params[1]);
		            	
		            			$params[10] = "file=".$blob->name;
		            			
		            			$valuesArray = array();
		            				foreach($params as $value)
		            				{
		            						$data = explode("=", $value);
		            						
		            						$valuesArray[$data[0]] = $data[1];
		            						
		            				}
		            						            			
		            			$post_body = http_build_query($valuesArray);
		            			
		            			$curl_new = curl_init();
		      					curl_setopt($curl_new, CURLOPT_URL, 'https://qbprod.s3.amazonaws.com/'); // Full path is - https://api.quickblox.com/session.json
		      					curl_setopt($curl_new, CURLOPT_POST, true); // Use POST
		      					//curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
		      					curl_setopt($curl_new, CURLOPT_POSTFIELDS, $post_body); // Setup post body
		      					curl_setopt($curl_new, CURLOPT_RETURNTRANSFER, true);
		      					curl_setopt($curl_new, CURLOPT_SSL_VERIFYPEER, false);
		      					/*curl_setopt($curl_new, CURLOPT_HTTPHEADER, array(
		            				'Accept: application/json',
		            				'Content-Type: application/x-www-form-urlencoded',
		            				'QuickBlox-REST-API-Version: 0.1.0',
		      					));*/
		      					
		      					$result = curl_exec($curl_new);
		      					if($result)
		      					{
		      						echo "<pre>";
		      							print_r($result);
		      						echo "</pre>"; exit;
		      					}
		      					else
		      					{
		      						$error = curl_error($curl). '(' .curl_errno($curl). ')';
		      						return $error;
		      					}
		      					curl_close($curl_new);
		            		}		
		            }
		            curl_close($curl);
		      } else {
		            $error = curl_error($curl). '(' .curl_errno($curl). ')';
		            return $error;
		            curl_close($curl);
		      }
		      
	}
    

?>