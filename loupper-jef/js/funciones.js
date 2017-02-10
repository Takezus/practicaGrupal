
function validar_hora(valor){
	var formato = /^(\d{2})[:](\d{2})[ ]([A|P]M)$/;
    if (!formato.test(valor)) {
        return false;
    } else {
        return true;
    }
}

function validar_fecha(valor){
	var formato = /^(\d{2})[/](\d{2})[/](\d{4})$/;
    if (!formato.test(valor)) {
        return false;
    } else {
        return true;
    }
}


function validar_ob(valor){
	if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
	  return false;
	}else{
	  return true;
	}
}

function validar_uc(campo){
    var RegExPattern = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,10})$/;
    //alert(campo.value.match(RegExPattern);
    if ((campo.match(RegExPattern)) && (campo!='')) {
        return true;
    } else {
    	return false;
    }
}


function ue_numero(valor)
{
	var aux = $.trim(valor);
	if (aux == '' || aux==null){
		return false
	}else{
		if (isNaN(valor)==true) {
		  return false;
		}else{
		  return true;
		}
	}
}

function ue_validarvacio(valor)
{
	var texto;
	while(''+valor.charAt(0)==' ')
	{
		valor=valor.substring(1,valor.length)
	}
	texto = valor;
	return texto;
}

function ue_validarrif(valor){
    var formato = /^[JEGPV]-\d{8}-\d$/;
    if (!formato.test(valor)) {
        alert("El RIF no tiene un formato válido...corrígalo por favor");
        return false;
    } else {
        return true;
    }
}

function ue_validaentero(valor){
	var formato = /^([0-9])*$/;
    if (!formato.test(valor) || valor.length==0) {
        alert("El valor introducido debe contener solo números...corrígalo por favor");
        return false;
    } else {
        return true;
    }
}

function ue_validartelefono(valor)
{
    var formato = /^\d{4}-\d{7}$/;
    if (!formato.test(valor)) {
        alert("El n° de teléfono no tiene un formato válido...corrígalo");
        return false;
    } else {
        return true;
    }
}

function ue_validarcorreo(obj)
{
	//expresion regular
	valor = obj;
	if( !(/[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/.test(valor))) {
	  return false;
	}else{
	  return true;
	}
}

function ue_validarcomillas(valor)
{
	val = valor.value;
	longitud = val.length;
	texto = "";
	textocompleto = "";
	for(r=0;r<=longitud;r++)
	{
		texto = valor.value.substring(r,r+1);
		if((texto != "'")&&(texto != '"')&&(texto != "\\"))
		{
			textocompleto += texto;
		}
	}
	valor.value=textocompleto;
}

function formato_numero(numero){ // v2007-08-06
	var resultado = "";
	if(numero[0]=="-"){
		nuevoNumero=numero.replace(/\./g,'').substring(1);
	}else{
		nuevoNumero=numero.replace(/\./g,'');
	}
	if(numero.indexOf(",")>=0){
		for (var j, i = nuevoNumero.length - 1, j = 0; i >= 0; i--, j++){
			resultado = nuevoNumero.charAt(i) + ((j > 0) && (j % 3 == 0)? ".": "") + resultado;
		}
	}
	if(numero.indexOf(",")>=0){
		resultado+=numero.substring(numero.indexOf(","));
	}
	if(numero[0]=="-"){
		return "-"+resultado;
	}else{
		return resultado;
	}
}

function validar_o(campo){
	valor = campo;
	if (valor == null || valor.length == 0 || /^\s+$/.test(valor)){
	  return false;
	}else{
	  return true;
	}

}

function validar_c(campo){
	var formato = /^[VEP]([0-9])*$/;
	if (!formato.test(campo)){
		alert('La cédula introducida no tiene un formato válido...Ejemplo:V11234674');
		return false;
	}else{
		return true;
	}
}

function validate_fechaMayorQue(fechaInicial,fechaFinal) {
	valuesStart=fechaInicial.split("/");
	valuesEnd=fechaFinal.split("/");
	var dateStart=new Date(valuesStart[2],(valuesStart[1]-1),valuesStart[0]);
	var dateEnd=new Date(valuesEnd[2],(valuesEnd[1]-1),valuesEnd[0]);
	if(dateStart>dateEnd){
		return 0;
	}else{
		return 1;
	}
}

function numFormat(num,dec,miles)
{
	//var num = this.valor,
	signo=3, expr='';
	var cad = ""+num;
	var ceros = "", pos, pdec, i;
	for (i=0; i < dec; i++)
	ceros += '0';
	pos = cad.indexOf(',')
	if (pos < 0)
	    cad = cad+","+ceros;
	else
	    {
	    pdec = cad.length - pos -1;
	    if (pdec <= dec)
	        {
	        for (i=0; i< (dec-pdec); i++)
	            cad += '0';
	        }
	    else
	        {
	        num = num*Math.pow(10, dec);
	        num = Math.round(num);
	        num = num/Math.pow(10, dec);
	        cad = new String(num);
	        }
	    }
	pos = cad.indexOf(',')
	if (pos < 0) pos = cad.lentgh
	if (cad.substr(0,1)=='-' || cad.substr(0,1) == '+')
	       signo = 4;
	if (miles && pos > signo)
	    do{
	        expr = /([+-]?\d)(\d{3}[\.\,]\d*)/
	        cad.match(expr)
	        cad=cad.replace(expr, RegExp.$1+'.'+RegExp.$2)
	        }
	while (cad.indexOf('.') > signo)
	    if (dec<0) cad = cad.replace(/\./,'')
	        return cad;
}

function format_date(date){
	var fecha = String(date);
	fecha_aux = fecha.substring(8,10);
	res = fecha_aux.concat('/',fecha.substring(5,7),'/',fecha.substring(0,4));
	return res;
}

function fecha_get(date){
	var fecha = String(date);
	res = fecha.substring(8,10) + '/' + fecha.substring(5,7) + '/' + fecha.substring(0,4);
	return res;
}

function fecha_pos(date){
	var fecha = String(date);
	res = fecha.substring(6,10) + '-' + fecha.substring(3,5) + '-' + fecha.substring(0,2);
	return res;
}

function convertTo12Hour(time){
    var hours = parseInt(time.substr(0, 2));
	if (hours < 12){
		var aux =  time.substr(0, 5) + ' AM';
	}else{
		if (hours > 12){
			var aux = '' + complete(parseInt(time.substr(0, 2)) - 12,'L', 2) + ':' + time.substr(3, 2) + ' PM';
		}else{
			var aux = hours + ":" + time.substr(3, 2);
		}
	}
	return aux;
}

function convertTo24Hour(time) {
    var hours = parseInt(time.substr(0, 2));
    if(time.indexOf('AM') != -1 && hours == 12) {
        time = time.replace('12', '0');
    }
    if(time.indexOf('PM')  != -1 && hours < 12) {
        time = time.replace(hours, (hours + 12));
    }
    return time.replace(/(AM|PM)/, '');
}

function complete(numero, direccion, tantos){
	if (numero < 10){
		var aux = "0" + numero;
	}else{
		var aux = numero;
	}
	return aux;
}

function getDateTime() {
    var now     = new Date();
    var year    = now.getFullYear();
    var month   = now.getMonth()+1;
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds();
    if(month.toString().length == 1) {
        var month = '0'+month;
    }
    if(day.toString().length == 1) {
        var day = '0'+day;
    }
    if(hour.toString().length == 1) {
        var hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        var second = '0'+second;
    }
    var dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
     return dateTime;
}

function RedimencionarImagen (srcData, width, height) {
      var imageObj = new Image(),
          canvas   = document.createElement("canvas"),
          ctx      = canvas.getContext('2d'),
          xStart   = 0,
          yStart   = 0,
          aspectRadio,
          newWidth,
          newHeight;
      imageObj.src  = srcData;
      canvas.width  = width;
      canvas.height = height;
      aspectRadio = imageObj.height / imageObj.width;
      if(imageObj.height < imageObj.width) {
         //horizontal
         aspectRadio = imageObj.width / imageObj.height;
         newHeight   = height,
         newWidth    = aspectRadio * height;
         xStart      = -(newWidth - width) / 2;
      } else {
         //vertical
         newWidth  = width,
         newHeight = aspectRadio * width;
         yStart    = -(newHeight - height) / 2;
      }
      ctx.drawImage(imageObj, xStart, yStart, newWidth, newHeight);
      return canvas.toDataURL("image/jpeg", 0.75);
    }

		/*-------------------------------------------------
para hacer funcionar el menu y las categorias
---------------------------------------------------*/

$(document).ready(function() {
    var clic = true;
    $("#icono").click(function() {

        if (clic === true) {
            $("#sidebar").css({
                'left': '0px'
            });
            clic = false;
        } else {
            $("#sidebar").css({
                'left': '-350px'
            });
            clic = true;
        }
    });
});

/*-----------------------------------------------------------
     para hacer funcionar el filtro de busquedad movil
-------------------------------------------------------------*/

$(document).ready(function() {
    var clic = true;
    $("#bb").click(function() {

        if (clic === true) {
            $("#bb2").css({
                'right': '0px'
            });
            clic = false;
        } else {
            $("#bb2").css({
                'right': '-350px'
            });
            clic = true;
        }
    });
});

/*-------------------------------------------------------------
para hacer funcionar el menu de movil
------------------------------------------------------------*/

$(document).ready(function() {
    var clic = true;
    $("#hamburquesa").click(function() {

        if (clic === true) {
            $("#sidebarm").css({
                'left': '0px'
            });
            clic = false;
        } else {
            $("#sidebarm").css({
                'left': '-350px'
            });
            clic = true;
        }
    });
    $("#sidebarm").click(function() {
            $("#sidebarm").css({
                'left': '-350px'
            });
            clic = true;

    });
});

function mmm() {
    var x = document.getElementById('bb2');
    if (x.style.display === 'block') {
        x.style.display = 'none';
    } else {
        x.style.display = 'block';
    }
}
