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
	<section id="urgence">
		<article id="services_urgence">
			<header>Services d'urgence</header>
			<article class="titre">Par internet</article>
			<article class="texte"><span>Vous souhaitez signaler la perte ou le vol de votre mobile/cl&eacute; 3G+ ou d&eacute;bloquer votre carte sim ?</span><br>Consultez les démarches à suivre depuis l'Assistance, rubrique <a href="#" title="Urgence" onclick="return xt_adc(this,'int-100001-[Contact::1311::03::UrgenceServicesUrgenceInternet::Urgence]')">Urgence</a> et <a href="#" title="D&eacute;pannage" onclick="return xt_adc(this,'int-100001-[Contact::1311::03::UrgenceServicesUrgenceInternet::Depannage]')">D&eacute;pannage</a>.</article>
			
			<article class="titre">En magasin Bouygues Telecom</article>
			<article class="texte">650 magasins pr&egrave;s de chez vous, trouvez le plus proche <a href="#" title="Magasin Bouygues Telecom" onclick="return xt_adc(this,'int-100001-[Contact::1311::03::UrgenceServicesUrgenceMagasin::LienIci]')">ici</a></article>
	
			<article class="titre">Par t&eacute;l&eacute;phone</article>
			<article class="texte"><span>Pour signaler la perte ou le vol de votre mobile/cl&eacute; 3G+ ou d&eacute;bloquer votre carte SIM,</span> un num&eacute;ro unique valable en France comme depuis l'&eacute;tranger</article>
			
			<article id="titre_bleu">0 800 29 10 00</article>
			<article class="texte">(num&eacute;ro vert depuis la France / prix d'un appel vers la France depuis l'&eacute;tranger)</article>
		</article>
		
		<article id="numero_urgence">
			<header>Numéros d'urgence</header>
			<article>
				<span>15</span>
				<span>Samu</span>
			</article>
			<article>
				<span>17</span>
				<span>Police</span>
			</article>
			<article>
				<span>18</span>
				<span>Pompiers</span>
			</article>
			<article>
				<span>112</span>
				<span>Num&eacute;ro d'urgence europ&eacute;en accessible depuis un mobile avec une carte SIM active</span>
			</article>
			<article>
				<span>114</span>
				<span>Num&eacute;ro national d'appel d'urgence pour les personnes sourdes ou malentendantes<br></span>
				<span>(Accessible par fax et SMS - pour plus d'informations se reporter au Guide de l'utilisateur <a href="#" title="Numéro d'appel d'urgence" onclick="return xt_adc(this,'int-100001-[Contact::1311::03::UrgenceNumeroUrgence::GuideUtilisateurSourd]')">disponible ici</a>)</span>
			</article>
			<article>
				<span>115</span>
				<span>SAMU Social</span>
			</article>
			<article>
				<span>116 000</span>
				<span>Num&eacute;ro d'urgence europ&eacute;en pour les Enfants Disparus</span>
			</article>
			<article>
				<span>119</span>
				<span>Accueil t&eacute;l&eacute;phonique national pour l'Enfance Maltrait&eacute;e</span>
			</article>
			
		</article>
	
	</section>
	<!-- Autres contacts -->
	<section id="autres_contacts">
		<?php include_once('autres_contacts_bas.php'); ?>
	</section>
	<!-- / Autres contacts -->
</section>

	
<?php include_once('footer.php'); ?>