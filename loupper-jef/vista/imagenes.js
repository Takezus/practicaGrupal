$(document).ready(function(){

	
    	
  	

	// function showAlert(Message, Title, Donde){
	// 	BootstrapDialog.show({
 //            message: Message,
 //            type: BootstrapDialog.TYPE_DANGER,
 //            title: Title,
 //            closable: false,
 //            buttons: [{
 //                label: 'Aceptar',
 //                cssClass: 'btn-success',
 //                action: function(dialogRef){
 //                    dialogRef.close();
 //                }
 //            }],
 //            onhidden: function(dialogRef){
 //            	if (Donde==1){
 //            	 	$('#correo').focus();
 //            	}
 //            	if (Donde==2){
 //            		$('#clave').focus();
 //            	}
 //            	if (Donde==7){
 //            		$(location).attr('href','../vista/index.php');
 //            	}
 //        	}
 //        });
 //    }

});
alert("hola mundo");
 var params = {
    act: 'getPaginas'
  }
$('#guardar-img').click(function(){
$.ajax({
                  async:false,   
                  cache:false, 
                  dataType: 'json',
                 //contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                  type: 'POST',  
                  url: '../modelo/comun.php',
                  data: params,
                  success:  function(data){
                      if (data.success==true)
                      {
                      alert("exito");
                      }else
                      {
                          showAlert('En este momento no podemos realizar su operación, intente más tarde','Error',12);
                      }
                  },
                  beforeSend:function(){},
                  error:function(objXMLHttpRequest){
                  	alert("Ha ocurrido un error");
                  }
              });

});