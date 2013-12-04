$(document).ready(function(){
	$('.change_clair, .change_fonce_pour_dimanche, .change_clair_pour_dimanche, .horaires_technique, #affluence_technique').hide();
	$('#assistance_technique').css({'cursor':'pointer'});


		$("#assistance_technique").click(function () {
			//$('.sous_navigation_fleche').css({'left':'95px', 'display':'block'});

			$('.change_fonce, .change_ferme, .horaires_commerciale, #affluence_commerciale').hide();
			$('.change_clair, .change_fonce_pour_dimanche, .change_clair_pour_dimanche, .horaires_technique, #affluence_technique').show();

			$('.change_fonce, .change_clair, .change_ferme, .change_clair_pour_dimanche, .change_fonce_pour_dimanche').removeClass('animation_1').addClass('animation');
			$('.horaires_comm_et_techniques').removeClass('shake_2').addClass('shake');

			$('.fleche').css({'left':'-100px'}).removeClass('animation3_1').addClass('animation3');
			$(this).css({'cursor':'default', 'font-weight':'bold'});
			$('#assistance_commerciale').css({'cursor':'pointer', 'font-weight':'normal'});

			return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'F','NAME':'DejaClient::BboxTableauxHorairesSCAssistanceTechnique','URL':''});
			
		});

		$("#assistance_commerciale").click(function () {

			$('.change_clair, .change_clair_pour_dimanche, .change_fonce_pour_dimanche, .horaires_technique, #affluence_technique').hide();
			$('.change_fonce, .change_ferme, .horaires_commerciale, #affluence_commerciale').show();

			$('.change_fonce, .change_clair, .change_ferme, .change_clair_pour_dimanche, .change_fonce_pour_dimanche').removeClass('animation').addClass('animation_1');
			$('.horaires_comm_et_techniques').removeClass('shake').addClass('shake_2');

			$('.fleche').css({'left':'-370px'}).removeClass('animation3').addClass('animation3_1');
			$(this).css({'cursor':'default', 'font-weight':'bold'});
			$('#assistance_technique').css({'cursor':'pointer', 'font-weight':'normal'});

			return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'F','NAME':'DejaClient::BboxTableauxHorairesSCAssistanceCommerciale','URL':''});

		});

	});