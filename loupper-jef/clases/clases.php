<?php 

	class clases_bddb
	{
		
		function clases_bddb()
		{
		}

	   	function uf_formatonumerico($as_valor)
	   	{
			if (empty($as_valor))
			{
				$as_valor="0.00";
			}
	   		return number_format($as_valor, 2, ",", ".");
			// $as_valor=str_replace(".",",",$as_valor);
			// if($as_valor<0)
			// {
			// 	$ls_temp="-";
			// 	$as_valor=abs($as_valor);
			// }
			// else
			// {
			// 	$ls_temp="";
			// }
			// $li_poscoma = strpos($as_valor, ",");
			// $li_contador = 1;
			// if ($li_poscoma==false)
			// {
			// 	$li_poscoma = strlen($as_valor);
			// 	$as_valor = $as_valor.",00";
			// }
			// $as_valor = substr($as_valor,0,$li_poscoma+3);
			// $li_poscoma = $li_poscoma - 1;
			// for($li_index=$li_poscoma;$li_index>=0;--$li_index)
			// {
			// 	if(($li_contador==3)&&(($li_index-1)>=0)) 
			// 	{
			// 		$as_valor = substr($as_valor,0,$li_index).".".substr($as_valor,$li_index);
			// 		$li_contador=1;
			// 	}
			// 	else
			// 	{
			// 		$li_contador=$li_contador + 1;
			// 	}
			// }
			// $as_valor=$ls_temp.$as_valor;
			// $li_poscoma=strpos($as_valor, ",");
			// $as_decimal=str_pad(substr($as_valor,$li_poscoma+1,2),2,"0");
			// $as_valor=substr($as_valor,0,$li_poscoma+1).$as_decimal;
			// $as_valor=str_replace(".","",$as_valor);
			// $as_valor=str_replace(",",".",$as_valor);
			// $as_valor_aux =  round($as_valor, 2);;
			// $li_poscoma = strpos($as_valor_aux, ".");
			// if ($li_poscoma==false)
			// {
			// 	$as_valor_aux = $as_valor_aux.".00";
			// }
			// return $as_valor_aux;
		}


		//   *1976/04/17*
		function fec_mostrar($valor){
			$fecha = substr($valor, 8,2)."/".substr($valor, 5,2)."/".substr($valor, 0,4);
			return $fecha;
		}

		//  *17/04/1976*
		function fec_guardar($valor){
			$fecha = substr($valor, 6,4)."-".substr($valor,3,2)."-".substr($valor, 0,2);
			return $fecha;
		}

		// function si_acceso($usuario,$modulo,$conexion){
		// 	$permisos = array();
		// 	$ls_sql = "SELECT ssi_privilegios.* from ssi_privilegios ".
		// 			 " INNER JOIN ssi_usuario ON".
		// 			 " ssi_usuario.usuario_id = ssi_privilegios.usuario_id".
		// 	         " where ssi_usuario.usuario_id = '$usuario' and ssi_privilegios.modulo_id = '$modulo'";
		// 	$ls_rcs = $conexion->Execute($ls_sql);
		// 	if ($ls_rcs->RecordCount()==1){
		// 		$permisos[0]=1;
		// 		$permisos[1]=$ls_rcs->fields['total'];
		// 		$permisos[2]=$ls_rcs->fields['ver'];
		// 		$permisos[3]=$ls_rcs->fields['imprimir'];
		// 		$permisos[4]=$ls_rcs->fields['agregar'];
		// 		$permisos[5]=$ls_rcs->fields['modificar'];
		// 		$permisos[6]=$ls_rcs->fields['eliminar'];
		// 	}else{
		// 		$permisos[0]=0;
		// 	}
		// 	return $permisos;
		// }

		// function si_idcont($rif,$licencia,$Conexion){
		// 	$tipo_rif = substr($rif, 0,1);
		// 	$riff = substr($rif, 1,strlen($rif)-1);
		// 	$ls_sql = "SELECT id FROM contribuyentes ".
		// 			  "WHERE tipo_rif = '$tipo_rif' ".
		// 			  "AND rif = '$riff' ".
		// 			  "AND licencia = '$licencia'";
		// 	$ls_rcs = $Conexion->Execute($ls_sql);
		// 	return $ls_rcs->fields[0];
		// }

		function gv_userid($valor){
			$periodo = explode(",", $valor);
			return $periodo[4];
		}

	    function encryptar($ls_cadena){
			$ls_cad=strval($ls_cadena);
			$k=0;
			$l=intval(substr($ls_cad,1,1));
			$acum=0;
			while ($k<=strlen($ls_cad)-1){
				$ls_letra=substr($ls_cad,$k,1);
				if ($ls_letra != ""){
					if (ord($ls_letra)!=32){
					   $acum=$acum+ord($ls_letra)*$l;
					}
					$k=$k+1;
					$l=$l+1;
				}
			}
			return strval($acum);
		}	

		function romano($ls_num){
			switch ($ls_num) {
				case '1':
					return "I";
				break;
				case '2':
					return "II";
				break;
			}
		}


	   	function uf_formatonumerico2($as_valor)	   	{
			if (empty($as_valor))
			{
				$as_valor="0.00";
			}
	   		return number_format($as_valor, 2, ".", ",");
	   	}	

	   	function uf_formatonumerico3($as_valor)	   	{
			if (empty($as_valor))
			{
				$as_valor="0.00";
			}
	   		return number_format($as_valor, 2, ".", "");
	   	}	
	}

?>