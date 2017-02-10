
<?php 
  foreach ($_COOKIE as $k=>$v) {
      if(strpos($k, "FBRLH_")!==FALSE) {
          $_SESSION[$k]=$v;
      }
  }

  
    session_start();
  
  
	require_once 'facebook.php';
	require_once '../Facebook/autoload.php';
  include_once("../App/config.inc.php");
	$fb = new Facebook\Facebook([
	  'app_id' => $config['app_id'],
	  'app_secret' => $config['app_secret'],
	  'default_graph_version' => 'v2.5',
	]);

  $helper = $fb->getRedirectLoginHelper();

  try {
      $accessToken = $helper->getAccessToken();
  } catch(Facebook\Exceptions\FacebookResponseException $e) {
    // When Graph returns an error
    echo 'Graph returned an error: ' . $e->getMessage();
    exit;
  } catch(Facebook\Exceptions\FacebookSDKException $e) {
    // When validation fails or other local issues
    echo 'Facebook SDK returned an error: ' . $e->getMessage();
    exit;
  }

if (! isset($accessToken)) {
  if ($helper->getError()) {
    header('HTTP/1.0 401 Unauthorized');
    echo "Error: " . $helper->getError() . "\n";
    echo "Error Code: " . $helper->getErrorCode() . "\n";
    echo "Error Reason: " . $helper->getErrorReason() . "\n";
    echo "Error Description: " . $helper->getErrorDescription() . "\n";
  } else {
    header('HTTP/1.0 400 Bad Request');
    echo 'Bad request';
  }
  exit;
}


// The OAuth 2.0 client handler helps us manage access tokens
$oAuth2Client = $fb->getOAuth2Client();

// Get the access token metadata from /debug_token
$tokenMetadata = $oAuth2Client->debugToken($accessToken);

// Validation (these will throw FacebookSDKException's when they fail)
$tokenMetadata->validateAppId($config['app_id']); // Replace {app-id} with your app id
// If you know the user ID this access token belongs to, you can validate it here
//$tokenMetadata->validateUserId('123');
$tokenMetadata->validateExpiration();

if (! $accessToken->isLongLived()) {
  // Exchanges a short-lived access token for a long-lived one
  try {
    $accessToken = $oAuth2Client->getLongLivedAccessToken($accessToken);
  } catch (Facebook\Exceptions\FacebookSDKException $e) {
    echo "<p>Error getting long-lived access token: " . $helper->getMessage() . "</p>\n\n";
    exit;
  }

}

$_SESSION['fb_access_token'] = (string) $accessToken;

      $response = $fb->get('/me?fields=id,email,birthday,gender,first_name,last_name', $accessToken);
      $user = $response->getGraphUser();
      $id = $user['id'];
      var_dump($user);
      // $first_name = $user['first_name'];
      // $last_name = $user['last_name'];
      // $gender = $user['gender'];
      // switch ($gender){
      //   case 'Male':
      //     $genero = 'M';
      //   break;
      //   case 'Female':
      //     $genero = 'F';
      //   break;
      // }
      // $birthday = '0000-00-00';
      // $email = $user['email'];
      // $clave = md5(trim('123456'));
      // $url = "http://inspireus.morelestudio.com/inspireus/inspireus_bk/inspireusapis/incUser?email=".$email."&clave=".$clave."&nombre=".$first_name."&apellido=".$last_name."&fecnac=".$fecnac."&genero=".$genero."&idfacebook=".$id;
      // $string = str_replace(' ', '%20', $url);
      // $data = file_get_contents($string);
      // $json = json_decode($data,true);
      // if ($json["success"]==true){
      // $url = "http://www.morelestudio.com/inspireus/inspireus/inspireus_bk/inspireusapis/getUserFacebook?idfacebook=".$id;
      // $data2 = file_get_contents($url);
      // $json2 = json_decode($data2,true);
      // if ($json2["success"]==true){
      //   $_SESSION['id_user'] = $json2["data"][0]['id'];
      //   $_SESSION['nombre_archivo'] = $json2["data"][0]["imagenfondo"]['nombrearchivo'];
      //   $_SESSION['tipo_archivo'] = $json2["data"][0]["imagenfondo"]['tipo'];
      //   $_SESSION['conexion'] = "1";
      //   $_SESSION['id_privacidad'] = $json2["perfil"];
      //   $_SESSION['id_disenador'] = $json2["disenador"];
      //   $_SESSION['avatar'] = $json2["avatar"]['nombrearchivo'];
      //   $_SESSION['avatar_tipo'] = $json2["avatar"]["tipo"];
      //   $_SESSION['nombre_usuario'] = $json2["data"][0]['name'];
      //   $_SESSION['aceptaterminos'] = "1";
      //   $valor = 1;   
      //}     
      // }else{
      //   $valor = 0;
      //   print "<script language=JavaScript>";
      //   print "window.alert('Ya se encuentra registrado con esta cuenta de facebook...Debe iniciar session');";
      //   print "location.href='../vista/login.php';";
      //   print "</script>";    
      // }

?>

<!DOCTYPE html>
<html>
<html lang="es">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
  <link rel="stylesheet" type="text/css" href="../css/style.css">
  <title>Inspireus</title>
</head>
<body>
  <input type="hidden" id="valor" value="<?php echo $valor; ?>">
  <div class="modal fade" id="welcome" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
     <div class="modal-dialog" role="document">
        <div class="modal-content" id="welcomep">
          <div class="modal-header" style="border-bottom: none !important;">
              <img src="../imagenes/inspired.png" class="img-responsive center-block">
          </div>
          <div class="modal-body">
        <div class="row top-welco">
              <div class="col-xs-12"><img src="../imagenes/bienvenidod.png" class="img-responsive center-block" id="img-w"></div>
              <input type="hidden" id="modal-w">  
            </div>
      </div>        
          <div class="modal-footer" style="border: none !important;">
              <img src="../imagenes/aceptard.png" class="img-responsive cursor center-block" id="aceptar">
          </div>
        </div>
      </div>
  </div>
  <script src="../js/jquery-1.11.3.js"></script>
  <script src="../js/bootstrap.js"></script>
  <script type="text/javascript">
    $( document ).ready(function(){
      myTimer = setInterval(mostrar, 500);
      function mostrar(){       
        if ($('#valor').val()=='1'){
          $('#valor').val(0);
          $('#modal-w').val('welcome');
          $('#img-w').attr('src','../imagenes/bienvenidod.png');
          $('#welcome').modal('show');
        }
      } 
    
      $('#aceptar').click(function(){
        var modalw = $('#modal-w').val();
        if (modalw=='incorrecto'){
          $('#welcome').modal('hide');
          var url = '../vista/login.php';
          $(location).attr('href',url);
        }
        if (modalw=='welcome'){
          $('#welcome').modal('hide');
          var url = '../vista/muroint.php';
          $(location).attr('href',url);
        } 
      });
    })

  </script>
</body>
</html>
