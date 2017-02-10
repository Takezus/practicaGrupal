<?php
session_start();
ini_set('display_errors', '1');
error_reporting(E_ALL | E_STRICT);
require "lib/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;
$costumerid="8ANVOmlgaN7aUmSw0BIVAc8S6";
$costumersecret="eejI5feIW5hU1JoR48J969JVij1z48H1NpeFOyqcxcFssreMv3";
if(array_key_exists('imagen',$_GET))
{
	

	$connection = new TwitterOAuth($costumerid, $costumersecret);
	$request_token = $connection->oauth('oauth/request_token', array('oauth_callback' => "http://inspireus.morelestudio.com/inspireus/twitter/twit.php"));
	$_SESSION['oauth_token'] = $request_token['oauth_token'];
	$_SESSION['oauth_token_secret'] = $request_token['oauth_token_secret'];
	$_SESSION['imagen'] = $_GET['imagen'];
	
	$url = $connection->url('oauth/authorize', array('oauth_token' => $request_token['oauth_token']));
	echo "<script>location.href='{$url}'</script>";
}
else
{
/*	var_dump($_SESSION);
	var_dump($_GET);
die();*/
$request_token = [];
$request_token['oauth_token'] = $_SESSION['oauth_token'];
$request_token['oauth_token_secret'] = $_SESSION['oauth_token_secret'];

if (isset($_REQUEST['oauth_token']) && $request_token['oauth_token'] !== $_REQUEST['oauth_token']) {
    echo "Abort! Something is wrong.";
}



$connection = new TwitterOAuth($costumerid, $costumersecret, $request_token['oauth_token'], $request_token['oauth_token_secret']);

$access_token = $connection->oauth("oauth/access_token", ["oauth_verifier" => $_REQUEST['oauth_verifier']]);


$connection = new TwitterOAuth($costumerid, $costumersecret, $access_token['oauth_token'], $access_token['oauth_token_secret']);

$media1 = $connection->upload('media/upload', ['media' => $_SESSION['imagen']]);
$parameters = [
    'status' => 'Nueva coleccion de Inspireus',
    'media_ids' => [$media1->media_id_string],
];
$result = $connection->post('statuses/update', $parameters);

//var_dump($result);

		print "<script language=JavaScript>";
//		print "window.alert('Debe explorar como invitado...Sera redirigido');";
		print "window.close();";
		print "</script>";		

}
?>




