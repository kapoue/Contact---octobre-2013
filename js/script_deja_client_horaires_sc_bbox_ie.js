$(document).ready(function(){
	$('#tableau_technique').hide();
	$('#assistance_technique').css({'cursor':'pointer'});



		$("#assistance_technique").click(function () {

			$('#tableau_commercial').hide();
			$('#tableau_technique').fadeIn(800);

			$('.fleche').css({'left':'-115px'});
			$(this).css({'cursor':'default', 'font-weight':'bold'});
			$('#assistance_commerciale').css({'cursor':'pointer', 'font-weight':'normal'});
			return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'F','NAME':'DejaClient::BboxTableauxHorairesSCAssistanceTechnique','URL':''});
			
		});

		$("#assistance_commerciale").click(function () {

			$('#tableau_technique').hide();
			$('#tableau_commercial').fadeIn(800);

			$('.fleche').css({'left':'-325px'});
			$(this).css({'cursor':'default', 'font-weight':'bold'});
			$('#assistance_technique').css({'cursor':'pointer', 'font-weight':'normal'});
			return tc_ajx_exec_1({'ELT':this,'S2':32,'TYPE':'F','NAME':'DejaClient::BboxTableauxHorairesSCAssistanceCommerciale','URL':''});

		});

	});