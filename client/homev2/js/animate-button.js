	$().ready(function(){		
			$("#onglet_pro").mouseover(function(){
				$("#onglet_entreprise").attr("class", "v2_entrepriseOn");
				$("#onglet_entreprise").attr("class", "v2_entreprise");
				$("#onglet_pro").attr("class", "v2_pro");
				$("#onglet_pro").attr("class", "v2_proOn");
			});
			$("#onglet_pro").mouseout(function(){
				$("#onglet_entreprise").attr("class", "v2_entrepriseOn");
				$("#onglet_pro").attr("class", "v2_pro");
			});
	  });