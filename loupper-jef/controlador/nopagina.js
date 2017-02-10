$(document).ready(function(){

	itemAct('pagina');

	$('#iniciar').click(function(){
		$('#inicio').modal('show');
	});

	$('#registrar').click(function(){
		var url = 'registro.php';
		$(location).attr('href',url);
	});

	$('#entrar-reg').click(function(){
		$('#iniciar').click();
	});

	function itemAct(pantalla){
		$("#sidebar-int a").each(function (index){ 
        	$(this).removeClass('active');
        }); 	

        $('#sidebar-int a').each(function(index){
        	if ($(this).attr("id")==pantalla){
        		$(this).addClass('active');
        	}
        });	
	}
});