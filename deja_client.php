<script>
$(function (){

// Début Slider Déjà client
					
					
											
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
						
						$('#menu ul li.menuItem:nth(3)').addClass('act').siblings().addClass('inact');
                        $('#menu ul li a:nth(3)').trigger('click',[true]);
						/* On page load, mark the first thumbnail as active */
						
						
						
						/*****
						 *
						 *	Enabling auto-advance.
						 *
						 ****/
						 
						var current=4;
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

		
});
</script>

<!-- ********************** Par téléphone / Déjà Client ********************** -->
	<div id="deja_client" class="ongletContent">
    	<div id="slider_titre">
			<h2>Déjà client</h2>
        </div>
        <div id="menu">
            <ul>
                <li class="menuItem nav_bar largeur_146px">
                    <a href="#" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'F','NAME':'SliderDejaClient::ForfaitBytel','URL':''});">
                    	Forfait<br />Bouygues Telecom
                    </a>
            	</li>
            	<li class="menuItem nav_bar largeur_146px">
                    <a href="#" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'F','NAME':'SliderDejaClient::ForfaitBloque','URL':''});">
                    	Forfait<br />bloqué
                    </a>
            	</li>
                <li class="menuItem nav_bar largeur_145px">
                    <a href="#" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'F','NAME':'SliderDejaClient::CarteBytel','URL':''});">
                    	Carte<br />Bouygues Telecom
                    </a>
                </li>
                <li class="menuItem nav_bar largeur_146px">
                    <a href="#" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'F','NAME':'SliderDejaClient::Bbox','URL':''});">
                    	Bbox
                    </a>
                </li>
                <li class="menuItem nav_bar largeur_146px">
                    <a href="#" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'F','NAME':'SliderDejaClient::OffreInternet3GPrepayee','URL':''});">
                    	Offre Internet<br />3G+ prépayée
                    </a>
                </li>
            </ul>
        </div>
        
        <div id="gallery">
            <div id="slides">
            	<!-- ********************** Slide 1 ********************** -->
            	<div class="slide_1">
                	<div class="deja_client_verifiez">
                    	<img src="images/deja_client_i.png" border="0" width="15" height="32" />Vérifiez d’abord si la réponse à votre question se trouve sur l’<a href="http://www.espaceclient2.bouyguestelecom.fr/assistance/urgence_et_depannage" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'S','NAME':'DejaClient::FNBAssistance','URL':''});">Assistance</a> ou dans <a href="http://forum.bouyguestelecom.fr/" title="Communauté d'experts" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'S','NAME':'DejaClient::FNBCommunauteExperts','URL':''});">la communauté d’experts</a>.
                    </div>
                    <div class="deja_client_depuis_mobile_titre">
                    	<h3>Depuis votre mobile Bouygues Telecom</h3>
                    </div>
                    <div class="deja_client_numero_mobile_et_cout">
                    	614 <span style="font-size: 12px; font-weight: normal;">(temps d'attente gratuit puis communication décomptée du forfait)</span>
                    </div>
                    <div class="deja_client_depuis_fixe_titre">
                    	<h3>Depuis un poste fixe ou un mobile d'un autre opérateur</h3>
                    </div>
                    <div class="deja_client_numero_fixe_et_cout">
                    	1064 <span style="font-size: 12px; font-weight: normal;">(Appels facturés selon le type d’opérateur, y compris le temps d’attente)</span>
                    </div>
                    <div class="deja_client_horaires_titre">
                    	Horaires 
                    </div>
                    <div class="deja_client_horaires_contenu">
                    	Votre Service Clients est joignable du <span style="font-weight: bold;">lundi au samedi</span>, de <span style="font-weight: bold;">8h à 20h</span>.
                    </div>
                    <div class="deja_client_etranger_titre">
                    	<h3>Depuis l’étranger</h3>
                    </div>
                    <div class="deja_client_etranger_contenu">
                    	<span style="font-weight: bold;">+33 660 614 614</span> ou <span style="font-weight: bold;">00 33 660 614 614</span> du lundi au samedi de 8h à 20h<br />
                    	<span style="font-size: 10px;">(prix d’un appel vers la France)</span> ou serveur vocal disponible 7j/7 – 24h/24
                    </div>
                </div>
                
                <!-- ********************** Slide 2 ********************** -->
            	<div class="slide_2">
                  	<div class="deja_client_verifiez">
                    	<img src="images/deja_client_i.png" border="0" width="15" height="32" />Vérifiez d’abord si la réponse à votre question se trouve sur l’<a href="http://www.espaceclient2.forfait-bloque.bouyguestelecom.fr/assistance" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'S','NAME':'DejaClient::FBAssistance','URL':''});">Assistance</a> ou dans <a href="http://forum.bouyguestelecom.fr/" title="Communauté d'experts" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'S','NAME':'DejaClient::FBCommunauteExperts','URL':''});">la communauté d’experts</a>.
                    </div>
                    <div class="deja_client_depuis_mobile_titre">
                    	<h3>Depuis votre mobile Bouygues Telecom</h3>
                    </div>
                    <div class="deja_client_numero_mobile_et_cout">
                    	2020 <span style="font-size: 12px; font-weight: normal;">(temps d'attente gratuit puis communication décomptée du forfait)</span>
                    </div>
                    <div class="deja_client_depuis_fixe_titre">
                    	<h3>Depuis un poste fixe ou un mobile d'un autre opérateur</h3>
                    </div>
                    <div class="deja_client_numero_fixe_et_cout">
                    	1022 <span style="font-size: 12px; font-weight: normal;">(Appels facturés selon le type d’opérateur, y compris le temps d’attente)</span>
                    </div>
                    <div class="deja_client_horaires_titre">
                    	Horaires 
                    </div>
                    <div class="deja_client_horaires_contenu">
                    	Votre Service Clients est joignable du <span style="font-weight: bold;">lundi au samedi</span>, de <span style="font-weight: bold;">8h à 20h</span>.
                    </div>
                    <div class="deja_client_etranger_titre">
                    	<h3>Depuis l’étranger</h3>
                    </div>
                    <div class="deja_client_etranger_contenu">
                    	<span style="font-weight: bold;">+33 664 00 20 20</span> ou <span style="font-weight: bold;">00 33 664 00 20 20</span> du lundi au samedi de 8h à 20h<br />
                        <span style="font-size: 10px;">(prix d’un appel vers la France)</span> ou serveur vocal disponible 7j/7 – 24h/24
                    </div>
                </div>
                
                <!-- ********************** Slide 3 ********************** -->
            	<div class="slide_3">
               	  	<div class="deja_client_verifiez">
                    	<img src="images/deja_client_i.png" border="0" width="15" height="32" />Vérifiez d’abord si la réponse à votre question se trouve sur l’<a href="http://www.espaceclientcarte2.bouyguestelecom.fr/assistance" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'S','NAME':'DejaClient::CarteAssistance','URL':''});">Assistance</a> ou dans <a href="http://forum.bouyguestelecom.fr/" title="Communauté d'experts" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'S','NAME':'DejaClient::CarteCommunauteExperts','URL':''});">la communauté d’experts</a>.
                    </div>
                    <div class="deja_client_depuis_mobile_titre">
                    	<h3>Depuis votre mobile Bouygues Telecom</h3>
                    </div>
                    <div class="deja_client_numero_mobile_et_cout">
                    	634 <span style="font-size: 12px; font-weight: normal;">(appel gratuit, puis mise en relation décomptée de votre crédit)</span>
                    </div>
                    <div class="deja_client_depuis_fixe_titre">
                    	<h3>Depuis un poste fixe ou un mobile d'un autre opérateur</h3>
                    </div>
                    <div class="deja_client_numero_fixe_et_cout">
                    	1034 <span style="font-size: 12px; font-weight: normal;">(Appels facturés selon le type d’opérateur, y compris le temps d’attente)</span>
                    </div>
                    <div class="deja_client_horaires_titre">
                    	Horaires 
                    </div>
                    <div class="deja_client_horaires_contenu">
                    	Votre Service Clients est joignable du <span style="font-weight: bold;">lundi au samedi</span>, de <span style="font-weight: bold;">8h à 20h</span>.
                    </div>
                    <div class="deja_client_etranger_titre">
                    	<h3>Depuis l’étranger</h3>
                    </div>
                    <div class="deja_client_etranger_contenu">
                    	<span style="font-weight: bold;">+33 668 634 634</span> ou <span style="font-weight: bold;">00 33 668 634 634</span> du lundi au samedi de 8h à 20h<br />
                        <span style="font-size: 10px;">(prix d’un appel vers la France)</span> ou serveur vocal disponible 7j/7 – 24h/24
                    </div>
                </div>
                
                <!-- ********************** Slide 4 ********************** -->
            	<div class="slide_4" id="deja_client_bbox_content">
                  	<div id="deja_client_bbox_3_reflex">
                    	3
                    </div>
                    <div id="deja_client_bbox_titre">
                    	<span style="text-transform: uppercase; font-size: 18px;">reflexes simples et efficaces</span><br />
                        à avoir avant toute question technique
                    </div>
                    <div id="deja_client_bbox_num_1">
                    	&nbsp;
                    </div>
                    <div id="deja_client_bbox_texte_1">
                    	En cas de problème d’accès à Internet, <span style="font-weight: bold;">éteignez et redémarrez votre ordinateur.</span> Si les services ne sont toujours pas accessibles, <span style="font-weight: bold;">éteignez</span> la Bbox à l’aide du bouton d'alimentation situé à l’arrière et <span style="font-weight: bold;">débranchez</span> les prises électriques et tous les câbles de la Bbox, puis <span style="font-weight: bold;">rebranchez et rallumez</span> la Bbox : <br />
                        la Bbox est reconnectée dès que le voyant Internet est allumé.<br />
                        <br />
                        Si vous avez un problème avec votre TV, <span style="font-weight: bold;">débranchez puis rebranchez</span> tous vos équipements, patientez jusqu’à l’affichage de l’heure et <span style="font-weight: bold;">appuyez</span> sur la touche <img src="images/on_off.png" width="17" height="19" /> de la télécommande.
                    </div>
                    <div id="deja_client_bbox_num_2">
                    	&nbsp;
                    </div>
                    <div id="deja_client_bbox_texte_2">
                    	Si vous rencontrez toujours des difficultés, un <a href="http://assistance.bbox.bouyguestelecom.fr/Assistance/Kaidara/index.html" target="_blank" title="Diagnostique en ligne" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'S','NAME':'DejaClient::BboxDiagnostique','URL':''});">diagnostic en ligne</a> et <a href="http://forum.bouyguestelecom.fr/" title="Communauté d'experts" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'S','NAME':'DejaClient::BboxCommunauteExperts','URL':''});">une communauté d’experts</a> sont également <span style="font-weight: bold;">à votre disposition 7j/7 et 24h/24</span> pour vous permettre de vous dépanner en permanence. 
                    </div>
                    <div id="deja_client_bbox_num_3">
                    	&nbsp;
                    </div>
                    <div id="deja_client_bbox_texte_3">
                    	Si toutefois vous ne trouvez pas la réponse à votre demande, <span style="font-weight: bold;">appelez le 611 depuis votre mobile</span> en étant impérativement à proximité de vos équipements pour permettre à nos conseillers d’effectuer un diagnostic. 
                    </div>
                    <div id="deja_client_bbox_texte_4">
                    	<span style="font-weight: bold;">Depuis un mobile Bouygues Telecom : 611</span><span style="font-size: 10px;"> (appel gratuit, puis mise en relation décomptée de votre forfait)</span><br />
                        <span style="font-weight: bold;">Depuis une Bbox : 611</span><span style="font-size: 10px;"> (appel gratuit,puis mise en relation facturée au prix d'un appel local)</span><br />
                        <span style="font-weight: bold;">Depuis un poste fixe ou un mobile d'un autre opérateur : 1061</span><span style="font-size: 10px;"> (Appels facturés selon le type d’opérateur, y compris le temps d’attente)</span><br />
                        <br />
                        HORAIRES<br />
                        Votre Service Clients est joignable :<br />
                        Pour vos questions techniques : <b>7j/7, de 8h à 22h</b><br />
                        Pour vos questions commerciales : <b>du lundi au samedi, de 8h à 20h</b><br />
                        > <a href="deja_client_horaires_sc_bbox.php" class="various fancybox.ajax" id="" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'F','NAME':'SliderDejaClient::HorairesInfluenceServicesClients','URL':''});">Connaitre les affluences d'appel du Service Clients Bbox</a><br />
                        <div class="deja_client_etranger_titre_bbox">
                    		Depuis l’étranger
                    	</div>
                        <div class="deja_client_etranger_contenu_bbox">
                            <span style="font-weight: bold;">+33 653 190 913</span> ou <span style="font-weight: bold;">00 33 653 190 913</span> du lundi au samedi de 8h à 20h<br />
                            <span style="font-size: 10px;">(prix d’un appel vers la France)</span> ou serveur vocal disponible 7j/7 – 24h/24
                        </div>
                    </div>
                    
                </div>
                
                <!-- ********************** Slide 5 ********************** -->
                <div class="slide_5">
                  	<div class="deja_client_verifiez">
                    	<img src="images/deja_client_i.png" border="0" width="15" height="32" />Vérifiez d’abord si la réponse à votre question se trouve sur l’<a href="http://www.espaceclient2.bouyguestelecom.fr/assistance/utiliser-votre-cle-3g-ipad" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'S','NAME':'DejaClient::OffresInternet3GAssistance','URL':''});">Assistance</a> ou dans <a href="http://forum.bouyguestelecom.fr/" title="Communauté d'experts" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'S','NAME':'DejaClient::OffresInternet3GCommunauteExperts','URL':''});">la communauté d’experts</a>.
                    </div>
                    <div class="deja_client_depuis_mobile_titre">
                    	<h3>Depuis votre mobile Bouygues Telecom</h3>
                    </div>
                    <div class="deja_client_numero_mobile_et_cout">
                    	634 <span style="font-size: 12px; font-weight: normal;">(appel gratuit, puis mise en relation décomptée de votre crédit)</span>
                    </div>
                    <div class="deja_client_depuis_fixe_titre">
                    	<h3>Depuis un poste fixe ou un mobile d'un autre opérateur</h3>
                    </div>
                    <div class="deja_client_numero_fixe_et_cout">
                    	1034 <span style="font-size: 12px; font-weight: normal;">(Appels facturés selon le type d’opérateur, y compris le temps d’attente)</span>
                    </div>
                    <div class="deja_client_horaires_titre">
                    	Horaires 
                    </div>
                    <div class="deja_client_horaires_contenu">
                    	Votre Service Clients est joignable du <span style="font-weight: bold;">lundi au samedi</span>, de <span style="font-weight: bold;">8h à 20h</span>.
                    </div>
                    <div class="deja_client_etranger_titre">
                    	<h3>Depuis l’étranger</h3>
                    </div>
                    <div class="deja_client_etranger_contenu">
                    	<span style="font-weight: bold;">+33 668 634 634</span> ou <span style="font-weight: bold;">00 33 668 634 634</span> du lundi au samedi de 8h à 20h<br />
                        <span style="font-size: 10px;">(prix d’un appel vers la France)</span> ou serveur vocal disponible 7j/7 – 24h/24
                    </div>
                </div>
            </div>
		</div>
	</div>