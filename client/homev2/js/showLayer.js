$(document).ready(function(){
   $(".v2_tabContent").fadeOut();
   $("#v2_tabContent1").fadeIn();
   $(".v2_tab1 a").addClass("v2_tabActive");
   $("#v2_tabsMenu a").mouseover(function () { 
      $(".v2_tabContent").fadeOut();
      var id = $(this).attr("rel");
      $(id).fadeIn("slow");
      $(".v2_tabActive").removeClass("v2_tabActive");
      $(this).addClass("v2_tabActive");
      return false;
   });   
});