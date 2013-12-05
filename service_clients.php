<?php
include_once('header.php');
include_once('base64.php');	
?>

<section id="contenu_site">
	<article id="fil_ariane">
		<a href="index.php" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'N','NAME':'FilAriane::Accueil','URL':''});">Accueil</a><?php echo $fil_ariane; ?><span>  /  Nous contacter</span>
	</article>
	<article id="titre">
		<h1>Nous contacter</h1>
	</article>
	<?php include_once('bloc_par_internet.php'); ?>
	<section id="service_clients">
		<!-- Bloc Nav autres contacts -->
		<?php include_once('nav_autre_contacts.php'); ?>
		<!-- Bloc Facilitez vos démarches -->
		<?php include_once('bloc_facilitez_vos_demarches.php'); ?>
		<!-- Blocs clients mobile -->
		<article id="blocs_clients_mobile">
			<header class="header_principal">Clients avec une offre mobile</header>
			<article class="titre">Votre service client est joignable</article>
			<article class="sous_titre">Du lundi au samedi, de 8h à 20h</article>
			
			<!-- Forfait -->
			<article id="forfait">
			
				<header>Forfait</header>
				
				<article class="bloc_1">
					<article><img src="/img/octobre_2013/logo_i.png"></article>
					<article>Vous souhaitez une r&eacute;ponse personnalis&eacute;e ? Votre Service Clients r&eacute;pond &agrave; vos questions depuis votre mobile ou votre fixe.<br>V&eacute;rifiez d&rsquo;abord si la r&eacute;ponse &agrave; votre question se trouve sur l’<a href="http://www.assistance.bouyguestelecom.fr/" title="Assistance" onclick="return xt_adc(this,'int-100001-[Contact::1311::03::ServiceClientForfaitBloc1Forfait::Assistance]')">Assistance</a> ou dans la <a href="http://forum.bouyguestelecom.fr/" title="En savoir plus" onclick="return xt_adc(this,'int-100001-[Contact::1311::03::ServiceClientForfaitBloc1Forfait::CommunauteExperts]')">communaut&eacute; d&rsquo;experts</a>.</article>
				</article>
				
				<article class="bloc_2">
					<header>Depuis un mobile<br>Bouygues Telecom</header>
					<article></article>
					<article>614</article>
					<article>(temps d'attente gratuit puis<br>communication d&eacute;compt&eacute;e du<br>forfait)</article>
				</article>
				
				<article class="bloc_3">
					<header>Depuis un poste fixe<br>ou un mobile d'un<br>autre op&eacute;rateur</header>
					<article></article>
					<article>1064</article>
					<article>(appels factur&eacute;s selon le type d&rsquo;op&eacute;rateur, y compris le temps d&rsquo;attente)</article>
				</article>
				
				<article class="bloc_4">
					<header>Depuis l'&eacute;tranger</header>
					<article id="bloc_4_visuel"></article>
					<article>+33 660 614 614<br><span>ou</span> 00 33 660 614 614</article>
					<article>du <b>lundi au samedi de 8h &agrave; 20h</b> (prix d&rsquo;un appel vers la France) ou serveur <b>vocal disponible 7j/7 &ndash; 24h/24</b></article>
				</article>
				<br clear="all">
			</article>
			<!-- /Forfait -->
			
			<!-- Forfait bloqué -->
			<article id="forfait_bloque">
			
				<header>Forfait bloqué</header>
				
				<article class="bloc_1">
					<article><img src="/img/octobre_2013/logo_i.png"></article>
					<article>Vous souhaitez une r&eacute;ponse personnalis&eacute;e ? Votre Service Clients r&eacute;pond &agrave; vos questions depuis votre mobile ou votre fixe.<br>V&eacute;rifiez d&rsquo;abord si la r&eacute;ponse &agrave; votre question se trouve sur l’<a href="http://www.assistance.bouyguestelecom.fr/" title="Assistance" onclick="return xt_adc(this,'int-100001-[Contact::1311::03::ServiceClientForfaitBloc1orfaitBloque::Assistance]')">Assistance</a> ou dans la <a href="http://forum.bouyguestelecom.fr/" title="En savoir plus" onclick="return xt_adc(this,'int-100001-[Contact::1311::03::ServiceClientForfaitBloc1orfaitBloque::CommunauteExperts]')">communaut&eacute; d&rsquo;experts</a>.</article>
				</article>
				
				<article class="bloc_2">
					<header>Depuis un mobile<br>Bouygues Telecom</header>
					<article></article>
					<article>2020</article>
					<article>(temps d'attente gratuit puis<br>communication d&eacute;compt&eacute;e du<br>forfait)</article>
				</article>
				
				<article class="bloc_3">
					<header>Depuis un poste fixe<br>ou un mobile d'un<br>autre op&eacute;rateur</header>
					<article></article>
					<article>1022</article>
					<article>(appels factur&eacute;s selon le type d&rsquo;op&eacute;rateur, y compris le temps d&rsquo;attente)</article>
				</article>
				
				<article class="bloc_4">
					<header>Depuis l'&eacute;tranger</header>
					<article></article>
					<article>+33 664 00 20 20<br><span>ou</span> 00 33 664 00 20 20</article>
					<article>du <b>lundi au samedi de 8h &agrave; 20h</b> (prix d&rsquo;un appel vers la France) ou serveur <b>vocal disponible 7j/7 &ndash; 24h/24</b></article>
				</article>
				<br clear="all">
			</article>
			<!-- / Forfait bloqué -->
			
			<!-- Carte Bouygues Telecom -->
			<article id="carte_bytel">
			
				<header>Carte bouygues telecom, offre internet nomad prépayé</header>
				
				<article class="bloc_1">
					<article><img src="/img/octobre_2013/logo_i.png"></article>
					<article>Vous souhaitez une r&eacute;ponse personnalis&eacute;e ? Votre Service Clients r&eacute;pond &agrave; vos questions depuis votre mobile ou votre fixe.<br>V&eacute;rifiez d&rsquo;abord si la r&eacute;ponse &agrave; votre question se trouve sur l’<a href="http://www.assistance.bouyguestelecom.fr/" title="Assistance" onclick="return xt_adc(this,'int-100001-[Contact::1311::03::ServiceClientForfaitBloc1CarteBytel::Assistance]')">Assistance</a> ou dans la <a href="http://forum.bouyguestelecom.fr/" title="En savoir plus" onclick="return xt_adc(this,'int-100001-[Contact::1311::03::ServiceClientForfaitBloc1CarteBytel::CommunauteExperts]')">communaut&eacute; d&rsquo;experts</a>.</article>
				</article>
				
				<article class="bloc_2">
					<header>Depuis un mobile<br>Bouygues Telecom</header>
					<article></article>
					<article>634</article>
					<article>(temps d'attente gratuit puis<br>communication d&eacute;compt&eacute;e du<br>forfait)</article>
				</article>
				
				<article class="bloc_3">
					<header>Depuis un poste fixe<br>ou un mobile d'un<br>autre op&eacute;rateur</header>
					<article></article>
					<article>1034</article>
					<article>(appels factur&eacute;s selon le type d&rsquo;op&eacute;rateur, y compris le temps d&rsquo;attente)</article>
				</article>
				
				<article class="bloc_4">
					<header>Depuis l'&eacute;tranger</header>
					<article></article>
					<article>+33 668 634 634<br><span>ou</span> 00 33 668 634 634</article>
					<article>du <b>lundi au samedi de 8h &agrave; 20h</b> (prix d&rsquo;un appel vers la France) ou serveur <b>vocal disponible 7j/7 &ndash; 24h/24</b></article>
				</article>
				<br clear="all">
			</article>
			<!-- / Carte Bouygues Telecom -->
		
		</article>
		<!-- / Blocs clients mobile -->
		
		<!-- Blocs Clients BBox -->
		<article id="blocs_clients_bbox">
			<header class="header_principal">Clients Bbox</header>
			<article id="pre_titre">Les 3 réflexes et efficaces &agrave; avoir avant toute question technique <a href="/clients_bbox_questions_techniques.php" class="various fancybox.ajax" id="single_2" title="Les 3 réflexes et efficaces &agrave; avoir avant toute question technique"><img src="/img/octobre_2013/logo_point_interrogation.png"></a></article>
			<article class="titre">Votre service client est joignable</article>
			<article class="sous_titre">Pour vos questions techniques : <b>7j/7, de 8h à 22h</b><br><br>Pour vos questions commerciales : <b>du lundi au samedi, de 8h à 20h</b></article>
			<?php
				$pour_ie = "/horaires_sc_ie.html";
				$pas_pour_ie = "/horaires_sc.html";			
			?>
			<article id="affluences" class="lien_texte"><img src="<?php echo $fleche_bleue; ?>"><a href="<?php if ($nav == "ie") {echo $pour_ie;} else {echo $pas_pour_ie;} ?>" class="various fancybox.ajax" id="single_1" title="Connaitre les affluences d'appel du Service Clients Bbox" >Connaitre les affluences d'appel du Service Clients Bbox</a>
			</article>
			
			<article class="bloc_2">
				<header>Depuis un mobile<br>Bouygues Telecom</header>
				<article></article>
				<article>611</article>
				<article>(appel gratuit, puis mise en relation<br>factur&eacute;e au prix d’un appel local)</article>
			</article>
			
			<article class="bloc_3">
				<header>Depuis une Bbox</header>
				<article></article>
				<article>611</article>
				<article>(appel gratuit, puis mise en relation<br>factur&eacute;e au prix d&rsquo;un appel local)</article>
			</article>
			
			<article class="bloc_4">
				<header>Depuis un poste fixe<br>ou un mobile d'un<br>autre op&eacute;rateur</header>
				<article></article>
				<article>1061</article>
				<article>(appels factur&eacute;s selon le type d&rsquo;op&eacute;rateur, y compris le temps d&rsquo;attente)</article>
			</article>
			
			<article class="bloc_5">
				<header>Depuis l'&eacute;tranger</header>
				<article></article>
				<article>+33 653 190 913<br><span>ou</span> 00 33 653 190 913</article>
				<article>du <b>lundi au samedi de 8h &agrave; 20h</b> (prix d&rsquo;un appel vers la France) ou serveur <b>vocal disponible 7j/7 &ndash; 24h/24</b></article>
			</article>
			
			<br clear="all">
			
		</article>
		<!-- / Blocs Clients BBox -->
		
		<!-- Blocs du bas -->
		<article id="blocs_du_bas">
			<article id="reclamation">
				<article class="slider-outer">
				    <article class="monsliderPlus"><img src="<?php echo $logo_plus; ?>" alt=""></article>
				    <article class="monsliderMoins"><img src="<?php echo $logo_moins; ?>" alt=""></article>
				</article>
				<header class="txt_20 txt_color_5a txt_uppercase">Comment nous faire part d'une r&eacute;clamation ?</header>
			</article>
			<article id="reclamation_contenu">
				<article class="txt_14_arial txt_color_69">Les conseillers  Bouygues Telecom sont &agrave; votre &eacute;coute et mettent tout en &oelig;uvre pour donner une r&eacute;ponse rapide &agrave; votre r&eacute;clamation par t&eacute;l&eacute;phone (voir num&eacute;ros ci-dessus)<br><br>
				Autres moyens d&rsquo;adresser une r&eacute;clamation :</article>
				<!-- <header class="txt_13_arial txt_bold txt_color_5a txt_uppercase">Par mail</header>
				<article class="txt_14_arial txt_color_69">Remplissez le formulaire en ligne (disponible 24/24)</article><br>
				<span class="lien_texte"><img src="<?php echo $fleche_bleue; ?>"><a href="#" title="Acc&eacute;der au formulaire" onclick="return xt_adc(this,'int-100001-[Contact::1311::03::ServiceClientsBlocsBas::Reclamation]')">Acc&eacute;der au formulaire</a></span> -->
				<header class="txt_13_arial txt_bold txt_color_5a txt_uppercase">Par courrier</header>
				
				<article class="txt_13_arial txt_bold txt_color_5a">Service Clients - Bouygues Telecom, 60436 Noailles Cedex</article><br>
				<article class="txt_14_arial txt_color_69">(affranchissement au tarif en vigueur). Votre Service Clients s’engage à répondre sous 30 jours.</article><br>
				<article class="txt_14_arial txt_color_ba">Pour vous assurer un traitement rapide de votre demande, n'oubliez pas :</article><br>
				
				<section id="assurer_un_traitement_rapide">
					<article class="txt_14_arial txt_color_ba">1.</article>
					<article class="txt_14_arial txt_color_69">De mentionner dans votre courrier <b>vos coordonn&eacute;es</b> (Nom, Pr&eacute;nom, adresse) et <b>votre num&eacute;ro de ligne Bouygues Telecom</b></article>
					<article class="txt_14_arial txt_color_ba">2.</article>
					<article class="txt_14_arial txt_color_69">De signer votre courrier (toute demande devant &ecirc;tre effectu&eacute;e par le titulaire du contrat).</article>
				</section>
				<br clear="all">
				<section id="cartouche_bas">
					<article>
						<img src="/img/octobre_2013/point_interrogation.png">
					</article>
					<article class="lien_texte">
						<img src="<?php echo $fleche_bleue; ?>">
							<a href="/recours/" title="Si la r&eacute;ponse du Service Clients &agrave; votre r&eacute;clamation n&rsquo;est pas satisfaisante, que faire ?">Si la r&eacute;ponse du Service Clients &agrave; votre r&eacute;clamation n&rsquo;est pas satisfaisante, que faire ?</a>
					</article>
				</section>
				
			</article>
			<br clear="all">			
		</article>
		<!-- / Blocs du bas -->
		
		<!-- Autres contacts -->
		<section id="autres_contacts">
			<?php include_once('autres_contacts_bas.php'); ?>
		</section>
		<!-- / Autres contacts -->
		
	</section>

</section>

<?php include_once('footer.php'); ?>