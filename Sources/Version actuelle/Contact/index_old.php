<?php

/*
$glob : variable contextuelle qui d&eacute;termine l'univers - hub, gp ou pro
$htitle : variable contextuelle de la balise <title>
$hmetadesc : variable contextuelle de la balise <meta name="description">
$hmetakey : variable contextuelle de la balise <meta name="keywords">
$hmetaname = '<meta name="Author" lang="fr" content="">'; variable contextuelle de la balise <meta name="author">
$hcodecss_mac = '<link rel="stylesheet" type="text/css" href="css/styles-mac.css" />'; variable contextuelle pour ajout de CSS pour MAC
$hcodecss_ie8 = '<link rel="stylesheet" type="text/css" href="css/styles-ie8.css" />'; variable contextuelle pour ajout de CSS pour IE8
$hcodecss_pc = '<link rel="stylesheet" type="text/css" href="css/styles.css" />'; variable contextuelle pour ajout de CSS PC
$hcodecss = '<link rel="stylesheet" type="text/css" href="" />'; variable contextuelle pour ajout de CSS suppl&eacute;mentaires
$hcodejsscripts : variable contextuelle pour ajout de Scripts
$hcodejsjquery : variable contextuelle pour ajout de fonctions JQUERY

ATTENTION. Ne pas ouvrir de Body, d&eacute;jà ouvert via header-body.inc.php

*/

switch($_GET['informations_souhaitees']) {
		
		case 'services_urgence' : 
		 	$htitle = 'Services d\'urgence - Bouygues Telecom';
			$fil_ariane = '<span id="fil_ariane_services_urgence" class="fil_ariane_contenu"> > Services d&rsquo;urgence</span>';
			//$fleche_sous_nav = '<div style="display: none;"></div>';
			$titre = 'Services d\'urgence';
		break;
		
		case 'magasins_club' :
		 	$htitle = 'Trouver un magasin Club Bouygues Telecom';
			$fil_ariane = '<span id="fil_ariane_magasin" class="fil_ariane_contenu"> > En magasin</span>';
			//$fleche_sous_nav = '<div style="background: url(images/fleche.png) no-repeat; width: 15px; height: 8px; position: absolute; top: -7px; left: 355px;"></div>';
			$titre = 'Trouver un magasin Club Bouygues Telecom';
		break;
		
		case 'deja_client' :
		 	$htitle = 'Numéros de téléphone - Déjà Client - Bouygues Telecom';
			$fil_ariane = '<span id="fil_ariane_telephone_deja_client" class="fil_ariane_contenu"> > <a href="index.php?informations_souhaitees=deja_client_futurs_clients" onclick="javascript:return tc_ajx_exec_1({\'ELT\':this,\'S2\':32,\'TYPE\':\'S\',\'NAME\':\'FilAriane::ParTelephone\',\'URL\':\'\'});">Par téléphone</a> > Déjà client</span>';
			//$fleche_sous_nav = '<div style="background: url(images/fleche.png) no-repeat; width: 15px; height: 8px; position: absolute; top: -7px; left: 95px;"></div>';
			$titre = 'Contacts téléphoniques pour les clients Mobile et Internet';
		break;
		
		case 'futurs_clients' :
		 	$htitle = 'Numéros de téléphone - Futurs Client - Bouygues Telecom';
			$fil_ariane = '<span id="fil_ariane_telephone_futur_client" class="fil_ariane_contenu"> > <a href="index.php?informations_souhaitees=deja_client_futurs_clients" onclick="javascript:return tc_ajx_exec_1({\'ELT\':this,\'S2\':32,\'TYPE\':\'S\',\'NAME\':\'FilAriane::ParTelephone\',\'URL\':\'\'});">Par téléphone</a> > Futurs clients</span>';
			//$fleche_sous_nav = '<div style="background: url(images/fleche.png) no-repeat; width: 15px; height: 8px; position: absolute; top: -7px; left: 95px;"></div>';
			$titre = 'Contacts téléphoniques pour les futurs clients';
		break;
		
		case 'deja_client_futurs_clients' :
			$htitle = 'Numéros de téléphone - Bouygues Telecom';
			$fil_ariane = '<span id="fil_ariane_telephone" class="fil_ariane_contenu"> > Par téléphone</span>';
			//$fleche_sous_nav = '<div style="background: url(images/fleche.png) no-repeat; width: 15px; height: 8px; position: absolute; top: -7px; left: 95px;"></div>';
			$titre = 'Contacts téléphoniques Bouygues Telecom';
		break;
		
		case 'par_courrier' :
			$htitle = 'Ecrire à Bouygues Telecom';
			$fil_ariane = '<span id="fil_ariane_courrier" class="fil_ariane_contenu"> > Par courrier</span>';
			//$fleche_sous_nav = '<div style="background: url(images/fleche.png) no-repeat; width: 15px; height: 8px; position: absolute; top: -7px; left: 620px;"></div>';
			$titre = 'Contact par courrier';
		break;
		
		default:
			$htitle = 'Contacts téléphoniques, courriers et Internet de Bouygues Telecom';
			$fil_ariane = '';
			//$fleche_sous_nav = '<div style="display: none;"></div>';
			$titre = 'Nous contacter';
			
	}




$hcodecss = '
	<link rel="stylesheet" type="text/css" href="css/styles_contact.css" />
    <link rel="stylesheet" type="text/css" href="fancybox/source/jquery.fancybox.css?v=2.1.2" media="screen" />
    <link rel="stylesheet" href="fancybox/source/helpers/jquery.fancybox-thumbs.css?v=1.0.7" type="text/css" media="screen" />
';
$hcodejsscripts = '
	<script src="js/gestion_aout_2012.js"></script>
    <script type="text/javascript" src="fancybox/source/jquery.fancybox.js?v=2.1.3"></script>
    <script type="text/javascript" src="fancybox/source/helpers/jquery.fancybox-thumbs.js?v=1.0.7"></script>
	<script src="//d1447tq2m68ekg.cloudfront.net/8b3ef2a3aa63d636f58532809321229f.js" title="AB Tasty : http://www.abtasty.com"></script>
';
$hcodejsjquery = '';



$hauthor = 'David Macheret (http://fr.viadeo.com/fr/profile/david.macheret)';

// DEV
//include_once('../Commun/header.php');
// PROD
include_once('../Commun/header.php');
?>

<script type="text/javascript">
    $(document).ready(function() {
        $("#single_2").fancybox({
                openEffect  : 'elastic',
                closeEffect : 'elastic',

                helpers : {
                    title : {
                        type : 'inside'
                    }
                }
            });
		
		$(".various").fancybox({
			
			fitToView	: false,
			width		: 1045,
			height		: 555,
			autoSize	: false,
			closeClick	: false,
			openEffect	: 'none',
			closeEffect	: 'none'
		});
    });
</script>

<!-- Facebook -->
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/fr_FR/all.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
<!-- / Facebook -->

<!-- Google Plus -->
<script type="text/javascript">
  window.___gcfg = {lang: 'fr'};

  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
</script>
<!-- / Google Plus -->

<?php
	$hopengraph = '<meta property="og:site_name" content="Contacts téléphoniques client mobiles et Internet - Bouygues Telecom" />
		<meta property="og:title" content="Contacts téléphoniques client mobiles et Internet - Bouygues Telecom" />
		<meta property="og:type" content="company" />
		<meta property="og:url" content="http://contact.bouyguestelecom.fr" />
		<meta property="og:locale" content="fr_FR"/>';
?>


<script type="text/javascript">
	var infos_souhaitees="<?php //echo (isset($_GET['infos_souhaitees']))? $_GET['infos_souhaitees']:''; ?>";
	var informations_souhaitees="<?php echo (isset($_GET['informations_souhaitees']))? $_GET['informations_souhaitees']:''; ?>";
</script>

<div id="titre">
	<div id="titre">
    	<div id="titre_php">
    		<a href="index.php" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'N','NAME':'Accueil::TitreDuSite','URL':''});"><h1><?php echo $titre; ?></h1></a>
		</div>
        <!--<div id="titre_js">
        	<div id="titre_js_services_urgence" class="titre_js_contenu">
            	<a href="index.php" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'N','NAME':'Accueil::TitreDuSite','URL':''});"><h1>Services d'urgence</h1></a>
            </div>
            <div id="titre_js_magasins_club" class="titre_js_contenu">
            	<a href="index.php" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'N','NAME':'Accueil::TitreDuSite','URL':''});"><h1>Trouver un magasin Club Bouygues Telecom</h1></a>
            </div>
            <div id="titre_js_par_courrier" class="titre_js_contenu">
            	<a href="index.php" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'N','NAME':'Accueil::TitreDuSite','URL':''});"><h1>Contact par courrier</h1></a>
            </div>
            <div id="titre_js_par_telephone" class="titre_js_contenu">
            	<a href="index.php" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'N','NAME':'Accueil::TitreDuSite','URL':''});"><h1>Contacts téléphoniques Bouygues Telecom</h1></a>
            </div>
        </div>-->
	</div>
</div>
<div id="fil_ariane" class="gris ongletLabel">
	<div id="fil_ariane_php">
		<a href="index.php" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'N','NAME':'FilAriane::Accueil','URL':''});">Accueil</a><?php echo $fil_ariane; ?>
    </div>
    <!--<div id="fil_ariane_js">
    	<a href="index.php" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'N','NAME':'FilAriane::Accueil','URL':''});">Accueil</a>
        <span id="fil_ariane_telephone" class="fil_ariane_contenu"> > Par téléphone</span>
        <span id="fil_ariane_telephone_deja_client" class="fil_ariane_contenu"> > <a href="#deja_ou_futurs_clients_contenu" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'N','NAME':'FilAriane::ParTelephone','URL':''});">Par téléphone</a> > Déjà client</span>
        <span id="fil_ariane_telephone_futur_client" class="fil_ariane_contenu"> > <a href="#deja_ou_futurs_clients_contenu" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'N','NAME':'FilAriane::ParTelephone','URL':''});">Par téléphone</a> > Futur client</span>
        <span id="fil_ariane_magasin" class="fil_ariane_contenu"> > En magasin</span>
        <span id="fil_ariane_courrier" class="fil_ariane_contenu"> > Par courrier</span>
        <span id="fil_ariane_services_urgence" class="fil_ariane_contenu"> > Services d'urgence</span>
    </div>-->
</div>
<div id="navigation">
	<div id="navigation_telephone">
    	<a href="index.php?informations_souhaitees=deja_client_futurs_clients">
        	<h2>
            	Par téléphone
			</h2>
		</a>
    </div>
    <div id="navigation_clubs">
        <a href="index.php?informations_souhaitees=magasins_club">
            <h2>
                En magasin Bouygues Telecom
            </h2>
        </a>
    </div>
    <div id="navigation_courrier">
    	<a href="index.php?informations_souhaitees=par_courrier">
        	<h2>
            	Par courrier
            </h2>
        </a>
    </div>
</div>
<div id="sous_navigation">
	<div class="sous_navigation_fleche"></div>
</div>

<div id="contenu_gauche">
    <div id="contenu_centrale">
		<?php
    
        switch($_GET['informations_souhaitees']) {
            
            case 'services_urgence' :
                //require_once 'services_urgence.php';
				$tag_page = 'Services_Urgence';
            break;
            
            case 'magasins_club' :
                //require_once 'magasins_club.php';
				$tag_page = 'Magasins_clubs';
            break;
            
            case 'deja_client' :
                //require_once 'deja_client.php';
				$tag_page = 'Deja_client';
            break;
            
            case 'futurs_clients' :
                //require_once 'futurs_clients.php';
				$tag_page = 'Futurs_clients';
            break;
            
            case 'deja_client_futurs_clients' :
                //require_once 'deja_client_futurs_clients.php';
				$tag_page = 'Par_Telephone_Choix_Deja_Client_Futurs_Clients';
            break;
            
            case 'par_courrier' :
                //require_once 'par_courrier.php';
				$tag_page = 'Par_Courrier';
            break;
            
            default:
                //require_once 'accueil.php';
				$tag_page = 'Accueil';
                
        }
                
      

 
        ?>
        
    </div>

	<!-- ********************** Par Internet ********************** -->
    <div id="par_internet">
        <div id="par_internet_titre">
            <h2>Par Internet</h2>
        </div>
        <div id="par_internet_conteneur_icones">
            <div id="par_internet_conteneur_icones_bloc_1">
                <a href="http://www.mon-compte.bouyguestelecom.fr" target="_blank" title="Accédez à votre Espace Client" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'S','NAME':'ParInternet::AccedezAVotreEspaceClient','URL':''});"><img src="images/par_internet_bloc_1.png" /></a>
                <div style="height: 10px;"></div>
               <a href="http://www.mon-compte.bouyguestelecom.fr" target="_blank" title="Accédez à votre Espace Client" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'S','NAME':'ParInternet::AccedezAVotreEspaceClient','URL':''});">Accédez à<br />votre Espace Client</a>
            </div>
            <div id="par_internet_conteneur_icones_bloc_2">
                <a href="http://www.assistance.bouyguestelecom.fr/" target="_blank" title="Consultez l'Assistance en ligne" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'S','NAME':'ParInternet::ToutesLesReponsesAVosQuestions','URL':''});"><img src="images/par_internet_bloc_2.png" /></a>
                <div style="height: 10px;"></div>
                <a href="http://www.assistance.bouyguestelecom.fr/" target="_blank" title="Consultez l'Assistance en ligne" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'S','NAME':'ParInternet::ToutesLesReponsesAVosQuestions','URL':''});">Consultez<br />l'Assistance en ligne</a>
            </div>
            <div id="par_internet_conteneur_icones_bloc_3">
                <a href="http://www.facebook.com/bouyguestelecom" target="_blank" title="Retrouvez notre équipe sur Facebook" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'S','NAME':'ParInternet::RetrouvezNousSurFacebook','URL':''});"><img src="images/par_internet_bloc_3.png" /></a>
                <div style="height: 10px;"></div>
                <a href="http://www.facebook.com/bouyguestelecom" target="_blank" title="Retrouvez notre équipe sur Facebook" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'S','NAME':'ParInternet::RetrouvezNousSurFacebook','URL':''});">Retrouvez notre<br />équipe sur Facebook</a>
            </div>
            <div id="par_internet_conteneur_icones_bloc_4">
                <a href="https://twitter.com/bouyguestelecom" target="_blank" title="Suivez nous sur Twitter" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'S','NAME':'ParInternet::RetrouvezNousSurTwitter','URL':''});"><img src="images/par_internet_bloc_4.png" /></a>
                <div style="height: 10px;"></div>
                <a href="https://twitter.com/bouyguestelecom" target="_blank" title="Suivez nous sur Twitter" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'S','NAME':'ParInternet::RetrouvezNousSurTwitter','URL':''});">Suivez nous<br />sur Twitter</a>
            </div>
            <div id="par_internet_conteneur_icones_bloc_5">
                <a href="http://forum.bouyguestelecom.fr/" target="_blank" title="Forum Woobees" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'S','NAME':'ParInternet::AccedezAVotreEspaceClient','URL':''});"><img src="images/par_internet_bloc_5.png" /></a>
                <div style="height: 10px;"></div>
                <a href="http://forum.bouyguestelecom.fr/" target="_blank" title="Forum Woobees" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'S','NAME':'ParInternet::AccedezAVotreEspaceClient','URL':''});">Vos questions/nos réponses<br />sur le forum Woobees</a>
            </div>
        </div>
    </div>    
    
</div>


<!-- ********************** Sidebar ********************** -->
<div id="sidebar">
	<!--<div id="test_couleur">Message de test</div>-->
	<!--<span style="color: red;">Ne pas utiliser cette nav svp</span>
	<div class="ongletLabel"><a href="#accueil_contenu">Accueil</a></div>
    <div class="ongletLabel"><a href="#services_urgence">Urgences</a></div>
    <div class="ongletLabel"><a href="#courrier_contenu">Courrier</a></div>
    <div class="ongletLabel"><a href="#clubs_contenu">Clubs</a></div>
    <div class="ongletLabel"><a href="#slider">Déjà client (Slider)</a></div>
    <div class="ongletLabel"><a href="#futurs_clients_contenu">Futurs clients</a></div>
    <div class="ongletLabel"><a href="#deja_ou_futurs_clients_contenu">Choix Déjà / Futurs clients</a></div>
    <br />-->

    <div id="sidebar_services_urgence">
    	<h2>
        	services d'urgence<br />
            <span style="font-size: 14px; text-transform: none; font-weight: bold;">perte, vol ou panne</span>
        </h2>
        <div style="height: 5px;"></div>
        <div id="services_urgence_lien">
        	<img src="images/fleches_blanches.png" width="7" height="5" border="0" /> <a href="index.php?informations_souhaitees=services_urgence" title="En savoir plus sur le service d'urgence" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'F','NAME':'Sidebar::ServicesUrgence','URL':''});"><span>En savoir plus</span></a>
		</div>
    </div>
    <div id="sidebar_sourds">
    	<img src="images/oreille_main.png" width="58" height="58" border="0" /><h2>contact personnes sourdes ou malentendantes</h2>
        <div id="sidebar_sourds_texte">Bouygues Telecom met à la disposition des personnes sourdes et malentendantes un service de mise en relation avec ses conseillers de clientèle. Pour télécharger l'application et accéder au service.</div>
        <div style="height: 5px;"></div>
        <img src="images/fleches_bleues_gp.png" border="0" width="7" height="5" /> <a href="http://www.acce-o.fr/client/bouygues/" title="Cliquez ici" target="_blank" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'S','NAME':'Sidebar::SourdsEtMalentendants','URL':''});">Cliquez ici</a>
    </div>
    <div id="sidebar_pro">
    	<div id="sidebar_pro_lien_1">
        	<img src="images/fleches_bleues_pro.png" width="7" height="5" border="0" /> <a href="http://www.bouyguestelecom-entreprises.fr/nos-engagements/vous-accompagner/nouveau-client-contactez-nous" title="Vous êtes une Entreprise" target="_blank" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'S','NAME':'Sidebar::VousEtesUneEntreprise','URL':''});">Vous êtes une Entreprise</a>
        </div>
        <div id="sidebar_pro_lien_2">
        	<img src="images/fleches_bleues_pro.png" width="7" height="5" border="0" /> <a href="http://www.pro.bouyguestelecom.fr/contacts-pro" title="Vous êtes un Pro" target="_blank" onclick="javascript:return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'S','NAME':'Sidebar::VousEtesUnPro','URL':''});">Vous êtes un Pro</a>
        </div>
        <div id="slidebar_pro_10salaries">
        	(< 10 salariés)
        </div>
    </div>
    
    
</div>


<!-- FIN COEUR PAGE -->

<?php
// DEV
//include_once('../Commun/footer.php');
// PROD
include_once('../Commun/footer.php');
?>

<!-- TAGCOMMANDER START //-->
<SCRIPT language="javascript">
	var tc_vars=new Array(); 
	// Variables XiTi
	tc_vars["xiti_xtsd"] = 'http://logc8';
	tc_vars["xiti_xtsite"] = '94345'; 
	tc_vars["xiti_xtn2_id"] = '32';
	tc_vars["xiti_xtn2_name"] = ''; 
	tc_vars["xiti_xtpage"] = 'Contact_<?php echo $tag_page ?>'; 
</SCRIPT>

<SCRIPT type="text/javascript" src="http://www.bouyguestelecom.fr/js/hub/tc_BouyguesTelecomservices_1_load.js"></SCRIPT>
<SCRIPT type="text/javascript" src="http://www.bouyguestelecom.fr/js/hub/tc_BouyguesTelecomservices_1_exec.js"></SCRIPT>
<SCRIPT type="text/javascript" src="http://www.bouyguestelecom.fr/js/bandyou/tc_bridge.js.php"></SCRIPT>
 
<NOSCRIPT><IFRAME src="http://redirect137.tagcommander.com/utils/noscript.php?id=1&mode=iframe&xiti_xtsite=94345&xiti_xtn2_id=32&xiti_xtpage=Contact_<?php echo $tag_page ?>" width="1" height="1"></IFRAME></NOSCRIPT>
<!-- TAGCOMMANDER END //-->


