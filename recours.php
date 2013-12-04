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
	<section id="recours">
		<header>Quels sont vos recours en cas de r&eacute;clamation ?</header>
		<!-- Colonne 1 -->
		<section>
			<section>
				<article>1</article>
				<article>R&eacute;clamation<br>au service<br>client</article>
				<br clear="all">
				<section>
					<article>R&eacute;ponse insatisfaisante<br>Pas de r&eacute;ponse depuis 1 mois</article>
					<article>Pas de r&eacute;ponse depuis plus de deux mois<sup>*</sup><br>Si vous &ecirc;tes en mesure de prouver votre d&eacute;marche aupr&egrave;s du m&eacute;diateur</article>
				</section>
				
				<article>Votre Service Clients reste votre interlocuteur privil&eacute;gi&eacute; pour trouver une solution en cas de r&eacute;clamation</article>
			</section>
			<section>
				<article><img src="<?php echo $coche_bleue; ?>"></article>
				<article>Par t&eacute;l&eacute;phone</article>
				<article><img src="<?php echo $fleche_bleue; ?>"><a href="#" title="Cliquez ici" onclick="return xt_adc(this,'int-100001-[Contact::1311::03::Recours::Colonne1ParTelephone]')">Cliquez ici</a></article>			
			</section>
			
			<section>
				<article><img src="<?php echo $coche_bleue; ?>"></article>
				<article>Par mail</article>
				<article><img src="<?php echo $fleche_bleue; ?>"><a href="#" title="Acc&eacute;der au formulaire" onclick="return xt_adc(this,'int-100001-[Contact::1311::03::Recours::Colonne1AccederAuFormulaire]')">Acc&eacute;der au formulaire</a></article>			
			</section>
			
			<section>
				<article><img src="<?php echo $coche_bleue; ?>"></article>
				<article>Par courrier</article>
				<article><span>En &eacute;crivant au</span>Service Clients<br>Bouygues Telecom,<br>60436 NOAILLES CEDEX<sup>*</sup></article>			
			</section>
		</section>
		<!-- / Colonne 1 -->
		
		<!-- Colonne 2 -->
		<section>
			<section>
				<article>2</article>
				<article>Courrier au<br>service<br>consommateurs</article>
				
				<article></article>
				
				<article>Si vous ne recevez aucune r&eacute;ponse dans un d&eacute;lai d’<b>un mois</b> ou si la solution propos&eacute;e ne vous satisfait pas, vous pouvez contacter le Service Consommateurs qui traitera votre demande dans les 30 jours suivant sa r&eacute;ception</article>
			</section>
			<section>
				<article><img src="<?php echo $coche_bleue; ?>"></article>
				<article>Par courrier</article>
				<article><span>En &eacute;crivant au</span>Service Clients<br>Bouygues Telecom,<br>60436 NOAILLES CEDEX<sup>*</sup></article>			
			</section>
			
			<section>
				<article><img src="<?php echo $coche_bleue; ?>"></article>
				<article>Par mail</article>
				<article><img src="<?php echo $fleche_bleue; ?>"><a href="#" title="Acc&eacute;der au formulaire" onclick="return xt_adc(this,'int-100001-[Contact::1311::03::Recours::Colonne2AccederAuFormulaire]')">Acc&eacute;der au formulaire</a></article>		
			</section>
			
			<section>
				<article><span>A noter :</span><span> si vous n’avez pas d&rsquo;abord contact&eacute; votre Service Clients, votre demande ne pourra pas &ecirc;tre trait&eacute;e
par le Service Consommateurs.</span></article>		
			</section>
		</section>
		<!-- / Colonne 2 -->
		
		<!-- Colonne 3 -->
		<section>
			<section>
				<article>3</article>
				<article>Recours<br>au m&eacute;diateur</article>
			</section>
			<section>
				<article>R&eacute;ponse insatisfaisante<br>Pas de r&eacute;ponse depuis 1 mois</article>			
			</section>
			<br clear="all">
			<section>
				<article>Si votre litige persiste malgré vos réclamations auprès du Service Clients et du Service Consommateurs, ou si vous n’avez pas obtenu de réponse de votre Service Clients dans un délai de <b>2 mois ou de votre Service Consommateurs dans un délai d’1 mois</b>, vous pouvez alors saisir le Médiateur des communications électroniques sur son <a href="http://www.mediateur-telecom.fr/home" title="site internet" onclick="return xt_adc(this,'int-100001-[Contact::1311::03::Recours::Colonne3SiteInternetMediateur]')"><b>site internet</b></a> ou à l’adresse communiquée par le Service Consommateurs.<br><br><span>A noter :</span><span> Si vous saisissez le médiateur sans avoir pris contact avec votre Service Clients et votre Service Consommateurs, le médiateur déclare votre demande irrecevable et la rejette.<br><br>Pour en savoir plus sur la médiation, <a href="#" title="cliquez ici" onclick="return xt_adc(this,'int-100001-[Contact::1311::03::Recours::Colonne3EnSavoirPlusMediation]')">cliquez ici</a></span></article>		
			</section>
			
		</section>
		<!-- / Colonne 3 -->
		<br clear="all">
	</section>
		
		<!-- Autres contacts -->
		<section id="autres_contacts">
			<?php include_once('autres_contacts_bas.php'); ?>
		</section>
		<!-- / Autres contacts -->


</section>

	
<?php include_once('footer.php'); ?>