<?php
$url = $_SERVER['REQUEST_URI'];

$triangle_1 = "<article class=\"triangle\"></article>";

$triangle_2 = "<article class=\"triangle\"></article>";

$triangle_3 = "<article class=\"triangle\"></article>";

?>

<section id="nav_autre_contacts">
	<article class="titre_intermediaire">
		<h2>Autres contacts</h2>
		<article class="titre_intermediaire_under"></article>
	</article>
	<?php
		/* En magasin */
		if ($url == "/magasins/") {echo "
		<a href=\"/magasins/\" title=\"En magasin\" onclick=\"return xt_adc(this,'int-100001-[Contact::1311::03::NavigationAutreContacts::EnMagasin]')\"><article class=\"nav_active\">En magasin</article></a>
		";} else {echo "
		<a href=\"/magasins/\" title=\"En magasin\" onclick=\"return xt_adc(this,'int-100001-[Contact::1311::03::NavigationAutreContacts::EnMagasin]')\"><article class=\"nav_non_active\">En magasin</article></a>
		";}
		
		/* Services clients */
		if ($url == "/service_clients/" || $url == "/recours/") {echo "
		<a href=\"/service_clients/\" title=\"Service clients\" onclick=\"return xt_adc(this,'int-100001-[Contact::1311::03::NavigationAutreContacts::ServiceClients]')\"><article class=\"nav_active\">Service clients</article></a>
		";} else {echo "
		<a href=\"/service_clients/\" title=\"Service clients\" onclick=\"return xt_adc(this,'int-100001-[Contact::1311::03::NavigationAutreContacts::ServiceClients]')\"><article class=\"nav_non_active\">Service clients</article></a>
		";}
		
		/* Pas encore client */
		if ($url == "/futur_client/") {echo "
		<a href=\"/futur_client/\" title=\"Pas encore client\" onclick=\"return xt_adc(this,'int-100001-[Contact::1311::03::NavigationAutreContacts::PasEncoreClient]')\"><article class=\"nav_active\">Pas encore client</article></a>
		";} else {echo "
		<a href=\"/futur_client/\" title=\"Pas encore client\" onclick=\"return xt_adc(this,'int-100001-[Contact::1311::03::NavigationAutreContacts::PasEncoreClient]')\"><article class=\"nav_non_active\">Pas encore client</article></a>
		";}
		
		
	?>
	<!--
<a href="#" title="En magasin" onclick="return xt_adc(this,'int-100001-[Contact::1311::03::NavigationAutreContacts::EnMagasin]')"><article>En magasin</article></a>
	<a href="#" title="Service clients" onclick="return xt_adc(this,'int-100001-[Contact::1311::03::NavigationAutreContacts::ServiceClients]')"><article>Service clients</article></a>
	<a href="#" title="Pas encore client" onclick="return xt_adc(this,'int-100001-[Contact::1311::03::NavigationAutreContacts::PasEncoreClient]')"><article>Pas encore client</article></a>
-->
	
	<article>
		<?php
			if ($url == "/magasins/") {echo $triangle_1;} else {echo "&nbsp;";}
		?>
	</article>
	
	<article>
		<?php
			if ($url == "/service_clients/" || $url == "/recours/") {echo $triangle_2;} else {echo "&nbsp;";}
		?>
	</article>
	
	<article>
		<?php
			if ($url == "/futur_client/") {echo $triangle_3;} else {echo "&nbsp;";}
		?>
	</article>
	
<br clear="all">
</section>