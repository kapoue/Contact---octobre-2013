var informations_souhaitees




$(document).ready(function(){
	
	switch(informations_souhaitees){
			/*case "deja_client_futurs_clients": case "futurs_clients": case "deja_client":
				$('.sous_navigation_fleche').css({'left':'95px', 'display':'block'});
			break;*/
			
			case "services_urgence":
				$('.sous_navigation_fleche').css({'display':'none'});
				$("#contenu_centrale").load('services_urgence.php');
			break;
			
			case "magasins_club":
				$('.sous_navigation_fleche').css({'left':'355px', 'display':'block'});
				$("#contenu_centrale").load('magasins_club.php');
			break;
			
			case "deja_client":
				$('.sous_navigation_fleche').css({'left':'95px', 'display':'block'});
				$("#contenu_centrale").load('deja_client.php');
			break;
			
			case "futurs_clients":
				$('.sous_navigation_fleche').css({'left':'95px', 'display':'block'});
				$("#contenu_centrale").load('futurs_clients.php');
			break;
			
			case "deja_client_futurs_clients":
				$('.sous_navigation_fleche').css({'left':'95px', 'display':'block'});
				$("#contenu_centrale").load('deja_client_futurs_clients.php');
			break;
			
			case "par_courrier":
				$('.sous_navigation_fleche').css({'left':'620px', 'display':'block'});
				$("#contenu_centrale").load('par_courrier.php');
			break;
			
			
			
			default:
				$('.sous_navigation_fleche').css({'display':'none'});
				$("#contenu_centrale").load('accueil.php');
		};
	
	$('#fil_ariane_js, #titre_js').hide();
	
	$("#navigation_telephone").click(function () {
		$('.sous_navigation_fleche').css({'left':'95px', 'display':'block'});
		//$("#contenu_centrale").load('deja_client_futurs_clients.php');
		//$('.fil_ariane_contenu, #fil_ariane_php').hide();
		//$('#fil_ariane_js, #fil_ariane_telephone').show();
		//history.pushState({path: this.path}, '', 'index.php?informations_souhaitees=deja_client_futurs_clients');
		document.title = "Numéros de téléphone - Bouygues Telecom";
		return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'F','NAME':'Navigation::ParTelephone','URL':''});
		
	});
	
	$("#navigation_clubs").click(function () {
		//$('.titre_js_contenu, #titre_php').hide();
		//$('#titre_js, #titre_js_magasins_club').show();
		$('.sous_navigation_fleche').css({'left':'355px', 'display':'block'});
		//$("#contenu_centrale").load('magasins_club.php');
		//$('.fil_ariane_contenu, #fil_ariane_php').hide();
		//$('#fil_ariane_js, #fil_ariane_magasin').show();
		//history.pushState({path: this.path}, '', 'index.php?informations_souhaitees=magasins_club');
		document.title = "Trouver un magasin Club Bouygues Telecom";
		return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'F','NAME':'Navigation::EnMagasinBytel','URL':''});
		
	});
	
	$("#navigation_courrier").click(function () {
		//$('.titre_js_contenu, #titre_php').hide();
		//$('#titre_js, #titre_js_par_courrier').show();
		$('.sous_navigation_fleche').css({'left':'620px', 'display':'block'});
		//$("#contenu_centrale").load('par_courrier.php');
		//$('.fil_ariane_contenu, #fil_ariane_php').hide();
		//$('#fil_ariane_js, #fil_ariane_courrier').show();
		//history.pushState({path: this.path}, '', 'index.php?informations_souhaitees=par_courrier');
		document.title = "Ecrire à Bouygues Telecom";
		return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'F','NAME':'Navigation::ParCourrier','URL':''});
		
	});
	
	$("#services_urgence_lien").click(function () {
		//$('.titre_js_contenu, #titre_php').hide();
		//$('#titre_js, #titre_js_services_urgence').show();
		$('.sous_navigation_fleche').css({'display':'none'});
		//$("#contenu_centrale").load('services_urgence.php');
		//$('.fil_ariane_contenu, #fil_ariane_php').hide();
		//$('#fil_ariane_js, #fil_ariane_services_urgence').show();
		//history.pushState({path: this.path}, '', 'index.php?informations_souhaitees=services_urgence');
		document.title = "Services d'urgence";
		return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'F','NAME':'Sidebar::ServicesUrgence','URL':''});
		
	});
	
	
	
	
	
/*	$("#accueil_contenu_deja_futur_futur_lien").click(function () {
		$("#contenu_centrale").load('futurs_clients.php');
		document.title = "Contacts téléphoniques pour les futurs clients";
	});*/
	
	/*$("#link").click(function () {
		$("#contenu_centrale").load('futurs_clients.php');
		document.title = "Contacts téléphoniques pour les futurs clients";
		return false;
	});*/
	
	
	/*, "#deja_ou_futurs_clients_futur", "#tests"*/
	
	/*$("#accueil_contenu_deja_futur_deja_lien", "#deja_ou_futurs_clients_futur").click(function () {
		document.title = "Contacts téléphoniques pour les clients Mobile et Internet";
	});*/
	
	
});