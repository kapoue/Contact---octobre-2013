<?php
include_once('base64.php');	
?>
<section id="home">
	<!-- Bloc par internet -->
	<?php include_once('bloc_par_internet.php'); ?>
	<!-- / Bloc par internet -->

	<!-- Blocs autres contacts -->
	<article class="titre_intermediaire">
		<h2>Autres contacts</h2>
	</article>
	<article class="titre_intermediaire_under"></article>
	
	<section id="autres_contacts">
		<article id="bloc_5">
			<article>
				<header>Magasins</header>
				<article>Nos conseillers vous guident dans nos 650 magasins Bouygues Telecom. Conseils, tests, SAV...</article>
			</article>
			<article><img src="/img/octobre_2013/photo_magasin.jpg"></article>
			<article><img src="<?php echo $fleche_bleue; ?>"><a href="http://magasins.bouyguestelecom.fr/" title="Trouvez un magasin Bouygues Telecom" onclick="return xt_adc(this,'int-100001-[Contact::1311::03::HomeBloc5::TrouverUnMagasin]')">Trouvez un magasin Bouygues Telecom</a></article>
		</article>
		<article id="bloc_6">
			<article>
				<header>Service Clients</header>
				<article>Notre Service Clients vous propose des conseils personnalis&eacute;s sans vous d&eacute;placer.</article>
			</article>
			<article><img src="/img/octobre_2013/photo_service_clients.jpg"></article>
			<article><img src="<?php echo $fleche_bleue; ?>"><a href="service_clients/" title="Contactez votre Service Clients" onclick="return xt_adc(this,'int-100001-[Contact::1311::03::HomeBloc6::ContacterServiceClients]')">Contactez votre Service Clients</a></article>
		</article>
		<article id="bloc_7">
			<header>Pas encore client ?</header>
			<article><img src="/img/octobre_2013/photo_pas_encore_client.jpg"></article>
			<article><img src="<?php echo $fleche_bleue; ?>"><a href="futur_client/" title="Nous contacter" onclick="return xt_adc(this,'int-100001-[Contact::1311::03::HomeBloc7::PasEncoreClientNousContacter]')">Nous contacter</a></article>
		</article>
		<?php include_once('autres_contacts_bas.php'); ?>
	</section>
	
	<!-- / Blocs autres contacts -->
	
	<br clear="all">
</section>
		
	
	
	
	