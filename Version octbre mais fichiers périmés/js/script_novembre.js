$(document).ready(function(){

	$( "button" ).click(function() {
	  $( "p" ).slideToggle( 1000 );
	});
	
	$("#navigation_telephone").click(function () {
		$('.sous_navigation_fleche').css({'left':'95px', 'display':'block'});
		//$("#contenu_centrale").load('deja_client_futurs_clients.php');
		//$('.fil_ariane_contenu, #fil_ariane_php').hide();
		//$('#fil_ariane_js, #fil_ariane_telephone').show();
		//history.pushState({path: this.path}, '', 'index.php?informations_souhaitees=deja_client_futurs_clients');
		document.title = "Numéros de téléphone - Bouygues Telecom";
		return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'F','NAME':'Navigation::ParTelephone','URL':''});
		
	});

)};