$(function(){
itemAct('chat');

$('#iniciar').click(function(){
		//alert();
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

$('.busqueda').keyup(function(){
   var valThis = $(this).val().toLowerCase();
    $('#dialogs-list>a.list-group-item>h4>span').each(function(){
     var text = $(this).text().toLowerCase();
        (text.indexOf(valThis) == 0) ? $(this).closest("a.list-group-item").show() : $(this).closest("a.list-group-item").hide();            
   });
});

function functionName() {

}
