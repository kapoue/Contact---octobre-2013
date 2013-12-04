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
	<?php include_once('nav_autre_contacts.php'); ?>
	<section id="futur_client">
	
		<header>Futurs clients Bouygues Telecom</header>
		
		<article class="bloc_1">
			<header>Pour votre achat</header>
			<article></article>
			<article>Depuis un poste fixe<br>ou un mobile d'un autre<br>op&eacute;rateur</article>
			<article>3106</article>
			<article>(appel gratuit depuis un poste fixe)</article>
		</article>
		
		<article class="bloc_2">
			<header>Pour votre suivi<br>de commande</header>
			<article></article>
			<article>La Boutique<br>Bouygues Telecom</article>
			<article>0981 660 981</article>
			<article>(0,15&euro;/mn depuis un poste fixe)</article>
		</article>	
		<br clear="all">
		
		<article class="bloc_3">
			<article></article>
			<article><img src="<?php echo $fleche_bleue; ?>"><a href="#" title="D&eacute;couvrir nos derni&egrave;res offres et nos gammes de smartphones" onclick="return xt_adc(this,'int-100001-[Contact::1311::03::FuturClient::DecouvrezNosDernieresOffresEtSmartphone]')">D&eacute;couvrir nos derni&egrave;res offres et nos gammes de smartphones</a></article>
		</article>
		
	</section>
	<!-- Autres contacts -->
	<section id="autres_contacts">
		<?php include_once('autres_contacts_bas.php'); ?>
	</section>
	<!-- / Autres contacts -->
	
</section>

<?php include_once('footer.php'); ?>