$(document).ready(function(){

/*
	$( "#reclamation" ).click(function() {
	  $( "#reclamation_contenu" ).slideToggle( 500 );
	  $( "#plus_moins" ).slideToggle( 500 );
*/
	  
	  
	  
	  //$( "#reclamation" ).css({'background-position':'22px 0'});
/* 	}); */
/*
	$('.monslider').toggle(function(){
	    //$(this).animate({marginLeft:'-53px'}, 500);
	    	console.log('+');
		},function(){
		    //$(this).animate({marginLeft:'0'}, 500);
		    console.log('-');
	});
*/

$( "#reclamation_contenu" ).css('display', 'none');
$( ".monsliderMoins" ).css('display', 'none');
$( ".monsliderPlus" ).css('display', 'block');

$( "#reclamation" ).click(function() {
  $( ".monsliderPlus" ).slideToggle( "fast", function() { });
  $( ".monsliderMoins" ).slideToggle( "fast", function() { });
  $( "#reclamation_contenu" ).slideToggle( 500 );
});

});