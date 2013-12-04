<?php include_once('header.php'); ?>

<section id="contenu_site">
	<article id="fil_ariane">
		<a href="index.php" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'N','NAME':'FilAriane::Accueil','URL':''});">Accueil</a><?php echo $fil_ariane; ?><span>  /  Nous contacter</span>
	</article>
	<article id="titre">
		<h1>Nous contacter</h1>
	</article>
	<?php include_once('bloc_par_internet.php'); ?>
	<?php include_once('nav_autre_contacts.php'); ?>
	<section id="magasins">
	
		<header>Magasins Bouygues Telecom</header>
		<article>650 magasins pr&egrave;s de chez vous</article>
		<article><img src="/img/octobre_2013/fleche_bleue.png"><a href="http://magasins.bouyguestelecom.fr/" title="Trouvez un magasin Bouygues Telecom" onclick="return xt_adc(this,'int-100001-[Contact::1311::03::Magasins::TrouverUnMagasin]')">Trouvez un magasin Bouygues Telecom</a>
		</article>
	
	</section>
	
	<!-- Autres contacts -->
		<section id="autres_contacts">
			<?php include_once('autre_contacts_bas.php'); ?>
		</section>
		<!-- / Autres contacts -->
	
</section>
	
	
<?php include_once('footer.php'); ?>