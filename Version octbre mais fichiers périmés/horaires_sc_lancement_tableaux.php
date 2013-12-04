<?php 

	if(preg_match('/MSIE/i',$_SERVER['HTTP_USER_AGENT'])){
	   include 'horaires_sc_ie.html';
	}
	else {
		include 'horaires_sc.html';
	}

?>