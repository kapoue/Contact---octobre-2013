var droppy = function(id){
	$(id + " li ul").css("display", "none");
   $(id + " > li").hover(function(){
         $(this).addClass("hover");
         var subMenu = $(this).find("ul");
         if(subMenu){
            if(!subMenu.is(":visible")){
					subMenu.slideDown("fast");
				}
         }
      }, function(){
         $(this).removeClass("hover");
         var subMenu = $(this).find("ul");
         if(subMenu){
            subMenu.slideUp("fast");
         }
   });
}