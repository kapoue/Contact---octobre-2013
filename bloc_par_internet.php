<?php

$url = $_SERVER['REQUEST_URI'];

$texte_lien_bloc_1 = "<article>Accédez à votre<br>Espace Client</article>
<article class=\"lien_texte\"><img src=\"/img/octobre_2013/fleche_bleue.png\"><a href=\"#\" title=\"En savoir plus\" onclick=\"return xt_adc(this,'int-100001-[Contact::1311::03::HomeBloc1::EnSavoirPlus]')\">En savoir plus</a></article>";

$texte_lien_bloc_2 = "<article>Consulter l'Assistance<br>en ligne</article>
		<article class=\"lien_texte\"><img src=\"/img/octobre_2013/fleche_bleue.png\"><a href=\"#\" title=\"En savoir plus\" onclick=\"return xt_adc(this,'int-100001-[Contact::1311::03::HomeBloc2::EnSavoirPlus]')\">En savoir plus</a></article>";

$texte_lien_bloc_3 = "<article>Vos questions / nos réponses<br>sur le forum woobees</article>
		<article class=\"lien_texte\"><img src=\"/img/octobre_2013/fleche_bleue.png\"><a href=\"#\" title=\"En savoir plus\" onclick=\"return xt_adc(this,'int-100001-[Contact::1311::03::HomeBloc3::EnSavoirPlus]')\">En savoir plus</a></article>";

$texte_lien_bloc_4 = "<article></article>
		<article>Retrouvez-nous<br>également sur</article>";

?>
<article class="titre_intermediaire">
	<h2>Par internet</h2>
</article>
<article class="titre_intermediaire_under"></article>
<section id="bloc_par_internet">
	<article id="bloc_1">
		<header>Espace client</header>
		<a href="http://www.mon-compte.bouyguestelecom.fr/" title="En savoir plus" onclick="return xt_adc(this,'int-100001-[Contact::1311::03::HomeBloc1::EnSavoirPlus]')"><article></article></a>
		<?php if ($url == "/Contact%20-%20octobre%202013/") { echo $texte_lien_bloc_1;} ?>
	</article>
	<article id="bloc_2">
		<header>Assistance</header>
		<a href="http://www.assistance.bouyguestelecom.fr/" title="En savoir plus" onclick="return xt_adc(this,'int-100001-[Contact::1311::03::HomeBloc2::EnSavoirPlus]')"><article></article></a>
		<?php if ($url == "/Contact%20-%20octobre%202013/") { echo $texte_lien_bloc_2;} ?>
	</article>
	<article id="bloc_3">
		<header>Forum Woobees</header>
		<a href="http://forum.bouyguestelecom.fr/" title="En savoir plus" onclick="return xt_adc(this,'int-100001-[Contact::1311::03::HomeBloc3::EnSavoirPlus]')"><article></article></a>
		<?php if ($url == "/Contact%20-%20octobre%202013/") { echo $texte_lien_bloc_3;} ?>
	</article>
	<article id="bloc_4">
		<header>Réseaux sociaux</header>
		<?php if ($url == "/Contact%20-%20octobre%202013/") { echo $texte_lien_bloc_4;} ?>
		<article class="lien_texte"><a href="http://www.facebook.com/bouyguestelecom" title="Facebook" onclick="return xt_adc(this,'int-100001-[Contact::1311::03::HomeBloc4::LogoFacebook]')"><img src="http://www.contact.bouyguestelecom.fr/img/octobre_2013/logo_facebook.png" border="0"></a><a href="https://twitter.com/bouyguestelecom" title="Twitter" onclick="return xt_adc(this,'int-100001-[Contact::1311::03::HomeBloc4::LogoTwitter]')"><img src="http://www.contact.bouyguestelecom.fr/img/octobre_2013/logo_twitter.png" border="0"></a></article>
	</article>
	<br clear="all">
</section>
