// Navigation

var slider_joue

jQuery(document).ready(function() {
	
	var $ongletsLabels = $(".ongletLabel");
	var $ongletsContents = $(".ongletContent");
	if($ongletsLabels.size() > 1){
		$ongletsLabels
			.first()
				.addClass("")
			.end()
			.last()
				.css({ "border" : "none"})
			.end()
			.find('a')
				.on('click',function(e){
					e.preventDefault();
					$t = $(this);
					if(!$t.parent().hasClass("ongletLabel-current")){
						$c = $(".ongletLabel-current");
						
						$ongletsContents.hide();
						$($t.attr("href")).fadeIn(800);
						$c.removeClass("ongletLabel-current");
						$t.parent().addClass("ongletLabel-current")
					}
					
					
					
					if ($('#accueil_contenu').is(':visible')) {
						$('.fil_ariane_contenu, .sous_navigation_fleche').css({'display':'none'});
					}
					
					else if ($('#deja_client').is(':visible')) {
						$('.sous_navigation_fleche').css({'left':'95px', 'display':'block'});
						slider_joue = 1;
					}
					
					else if ($('#futurs_clients_contenu').is(':visible')) {
						$('.sous_navigation_fleche').css({'left':'95px', 'display':'block'});
					}
					
					else if ($('#deja_ou_futurs_clients_contenu').is(':visible')) {
						$('.sous_navigation_fleche').css({'left':'95px', 'display':'block'});
					}
					
					else if ($('#clubs_contenu').is(':visible')) {
						$('.sous_navigation_fleche').css({'left':'355px', 'display':'block'});
					}
					
					else if ($('#courrier_contenu').is(':visible')) {
						$('.sous_navigation_fleche').css({'left':'620px', 'display':'block'});
					}
					
					else if ($('#services_urgence_lien').is(':visible')) {
						$('.sous_navigation_fleche').css({'display':'none'});
					}
					
					
					
					else {
						/*$('#test_couleur').css({'color':'pink'});*/
					}
					
				});
				
		$(".ongletContent")
			.hide()
			.first()
			//.next()
			//.last()
			//$("#accueil_contenu ,#fil_ariane_telephone")
				.fadeIn(800);
		
		
	}

})

$(function (){

// Début Slider Déjà client
					
					if (slider_joue != 0) {
											
						var totWidth=0;
						var positions = new Array();
						
						$('#slides .slide_1,#slides .slide_2,#slides .slide_3,#slides .slide_4, #slides .slide_5').each(function(i){
							
							/* Traverse through all the slides and store their accumulative widths in totWidth */
							
							positions[i]= totWidth;
							totWidth += $(this).width();
							
							/* The positions array contains each slide's commulutative offset from the left part of the container */
							
							if(!$(this).width())
							{
								alert("Please, fill in width & height for all your images!");
								return false;
							}
							
						});
						
						$('#slides').width(totWidth);
					
						/* Change the cotnainer div's width to the exact width of all the slides combined */
					
						$('#menu ul li a').click(function(e,keepScroll){
					
								/* On a thumbnail click */
					
								$('li.menuItem').removeClass('act').addClass('inact');
								$(this).parent().addClass('act');
								
								var pos = $(this).parent().prevAll('.menuItem').length;
								
								$('#slides').stop().animate({marginLeft:-positions[pos]+'px'},524);
								/* Start the sliding animation */
								
								e.preventDefault();
								/* Prevent the default action of the link */
								
								
								// Stopping the auto-advance if an icon has been clicked:
								if(!keepScroll) clearInterval(itvl);
						});
						
						$('#menu ul li.menuItem:first').addClass('act').siblings().addClass('inact');
						/* On page load, mark the first thumbnail as active */
						
						
						
						/*****
						 *
						 *	Enabling auto-advance.
						 *
						 ****/
						 
						var current=1;
						function autoAdvance()
						{
							if(current==-1) return false;
							
							$('#menu ul li a').eq(current%$('#menu ul li a').length).trigger('click',[true]);	// [true] will be passed as the keepScroll parameter of the click function on line 28
							current++;
						}
					
						// The number of seconds that the slider will auto-advance in:
						
						var changeEvery = 10;
					
						var itvl = setInterval(function(){autoAdvance()},changeEvery*500);
					
						/* End of customizations */
						
						
					}
					
					else {
						/*$('#test_couleur').css({'color':'pink'});*/
					}

	/*$("#navigation_telephone").click(function () {
		$('.sous_navigation_fleche').css({'left':'95px', 'display':'block'});
		$('.fil_ariane_contenu').css({'display':'none'});
		$('#fil_ariane_telephone').css({'display':'inline'});
		$('#test_couleur').css({'color':'red'});
	});
					
	$("#").click(function () {
		$('.sous_navigation_fleche').css({'left':'355px', 'display':'block'});
		$('.fil_ariane_contenu').css({'display':'none'});
		$('#fil_ariane_magasin').css({'display':'inline'});
	});

	$("#navigation_courrier").click(function () {
		$('.sous_navigation_fleche').css({'left':'620px', 'display':'block'});
		$('.fil_ariane_contenu').css({'display':'none'});
		$('#fil_ariane_courrier').css({'display':'inline'});
	});	
	
	$("#").click(function () {
		
	});	
	
	$(", #titre").click(function () {
		$('.sous_navigation_fleche').css({'display':'none'});
	});
	
	// Pour régler un conflit entre le premier script et le slider on gère le comportement du clic ici
	$("#deja_client_pour_accueil").click(function () {
		$('.ongletContent').hide();
		$('#deja_client').css({'display':'block'});
		$('#test_couleur').css({'color':'pink'});
	});*/
				
})
// / Navigation

//  Switch pour les URLs

jQuery(document).ready(function() {
	/*switch(infos_souhaitees){
				case "deja_client_par_telephone":
					$(".ongletContent").hide();
					$('#deja_client').fadeIn(800);
					$('.sous_navigation_fleche').css({'left':'95px', 'display':'block'});
					$('#fil_ariane_telephone').css({'display':'inline'});
				break;*/
				
				/*case "forfait_eden_bbox":
					$('.contenu_1').hide();
					$('.contenu_2_interieur').fadeIn(800);
			  		$('.contenu_2').show();
					$('.declencheur_2').removeClass('declencheur_2_off').addClass('declencheur_2_on').css({'cursor':'default'});
					$('.declencheur_1').removeClass('declencheur_1_on').addClass('declencheur_1_off').css({'cursor':'pointer'});
					$('.sous_declencheur_off').css({'right':'0px'});
				break;
				
				case "avantage_smartphone_inclus":
					Shadowbox.init({
						// let's skip the automatic setup because we don't have any
						// properly configured link elements on the page
						skipSetup: true
					});
					
					window.onload = function() {
					
						// open a welcome message as soon as the window loads
						Shadowbox.open({
							content:    '<iframe src="onglet_1_avantage_smartphone.html" width="770" height="560"></iframe>',
							player:     "html",
							title:      "A propos",
							width:      780,
							height:     570
						});
					
					};
					
					$('.contenu_1').hide();
					$('.contenu_2').show();
					$('.declencheur_1').removeClass('declencheur_1_on').addClass('declencheur_1_off').css({'cursor':'pointer'});
					$('.declencheur_2').removeClass('declencheur_2_off').addClass('declencheur_2_on').css({'cursor':'default'});
					$('.sous_declencheur_off').css({'right':'0px'});
				break;
				
				case "meilleure_relation_client":
					Shadowbox.init({
						// let's skip the automatic setup because we don't have any
						// properly configured link elements on the page
						skipSetup: true
					});
					
					window.onload = function() {
					
						// open a welcome message as soon as the window loads
						Shadowbox.open({
							content:    '<iframe src="onglet_2_relation_client.html" width="770" height="560"></iframe>',
							player:     "html",
							title:      "A propos",
							width:      780,
							height:     570
						});
					
					};
					
					$('.contenu_1').hide();
					$('.contenu_2').show();
					$('.declencheur_1').removeClass('declencheur_1_on').addClass('declencheur_1_off').css({'cursor':'pointer'});
					$('.declencheur_2').removeClass('declencheur_2_off').addClass('declencheur_2_on').css({'cursor':'default'});
					$('.sous_declencheur_off').css({'left':'0px'});
				break;
				
				case "reconnaissance_de_votre_fidelite":
					Shadowbox.init({
						// let's skip the automatic setup because we don't have any
						// properly configured link elements on the page
						skipSetup: true
					});
					
					window.onload = function() {
					
						// open a welcome message as soon as the window loads
						Shadowbox.open({
							content:    '<iframe src="onglet_3_reconnaissance_client.html" width="770" height="560"></iframe>',
							player:     "html",
							title:      "A propos",
							width:      780,
							height:     570
						});
					
					};
					
					$('.contenu_1').hide();
					$('.contenu_2').show();
					$('.declencheur_1').removeClass('declencheur_1_on').addClass('declencheur_1_off').css({'cursor':'pointer'});
					$('.declencheur_2').removeClass('declencheur_2_off').addClass('declencheur_2_on').css({'cursor':'default'});
					$('.sous_declencheur_off').css({'left':'0px'});
				break;
				
				case "assurance_d_un_reseau_performant":
					Shadowbox.init({
						// let's skip the automatic setup because we don't have any
						// properly configured link elements on the page
						skipSetup: true
					});
					
					window.onload = function() {
					
						// open a welcome message as soon as the window loads
						Shadowbox.open({
							content:    '<iframe src="onglet_4_reseau_performant.html" width="770" height="560"></iframe>',
							player:     "html",
							title:      "A propos",
							width:      780,
							height:     570
						});
					
					};
					
					$('.contenu_1').hide();
					$('.contenu_2').show();
					$('.declencheur_1').removeClass('declencheur_1_on').addClass('declencheur_1_off').css({'cursor':'pointer'});
					$('.declencheur_2').removeClass('declencheur_2_off').addClass('declencheur_2_on').css({'cursor':'default'});
					$('.sous_declencheur_off').css({'right':'0px'});
				break;
				
				case "envie_d_un_forfait_2424":
					Shadowbox.init({
						// let's skip the automatic setup because we don't have any
						// properly configured link elements on the page
						skipSetup: true
					});
					
					window.onload = function() {
					
						// open a welcome message as soon as the window loads
						Shadowbox.open({
							content:    '<iframe src="onglet_galet_famille.html" width="800" height="758"></iframe>',
							player:     "html",
							title:      "A propos",
							width:      810,
							height:     768
						});
					
					};
					
					$('.contenu_1').hide();
					$('.contenu_2').show();
					$('.declencheur_1').removeClass('declencheur_1_on').addClass('declencheur_1_off').css({'cursor':'pointer'});
					$('.declencheur_2').removeClass('declencheur_2_off').addClass('declencheur_2_on').css({'cursor':'default'});
					$('.sous_declencheur_off').css({'right':'0px'});
				break;*/
				
				
				/*default:*/
					/*$('.contenu_1').hide();
					$('.contenu_2').show();
					$('.contenu_3').hide();
					$('.declencheur_1').removeClass('declencheur_1_on').addClass('declencheur_1_off').css({'cursor':'pointer'});
					$('.declencheur_2').removeClass('declencheur_2_off').addClass('declencheur_2_on').css({'cursor':'default'});
					$('.declencheur_3').removeClass('declencheur_3_on').addClass('declencheur_3_off').css({'cursor':'pointer'});
					$('.sous_declencheur_off').css({'left':'0px', 'width':'0px'});
					$('.sous_declencheur_off_2').css({'right':'0px', 'width':'434px'});*/

		/*	};*/
});

// / Switch pour les URLs






/*jQuery(document).ready(function() {
	$('#courrier_contenu').show();
	$("#services_urgence").hide();
	$("#accueil_contenu").hide();
	
	$("#accueil_bouton").click(function () {
		$("#accueil_contenu").show();
		$("#services_urgence").hide();
		$("#courrier_contenu").hide();
	});
	
	$("#urgence_bouton").click(function () {
		$("#services_urgence").show();
		$("#accueil_contenu").hide();
		$("#courrier_contenu").hide();
	});
	
	$("#courrier_bouton").click(function () {
		$("#services_urgence").hide();
		$("#accueil_contenu").hide();
		$("#courrier_contenu").show();
	});
	
});*/


//$(function(){
//	$(".affiche")
//		.bind("click",function(e){
//			e.preventDefault();
//			
//			
//		});
//});