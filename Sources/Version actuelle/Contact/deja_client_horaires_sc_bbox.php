<?php 

	if(preg_match('/MSIE/i',$_SERVER['HTTP_USER_AGENT'])){
	   include 'deja_client_horaires_sc_bbox_ie.php';
	}
	else {
		include 'deja_client_horaires_sc_bbox_autres.php';
	}

?>