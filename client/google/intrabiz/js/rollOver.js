var initAllRollovers = function(){
   $("img.rollOver").hover(
      function() {
         var imgsrc = $(this).attr("src").replace(/(\.[^.]+)$/, '_hover$1');
         $(this).attr("src",imgsrc);
      },
      function() {
         var imgsrc = $(this).attr("src").replace(/_hover(\.[^.]+)$/, '$1');
         $(this).attr("src",imgsrc);
      }
   );
}

$(document).ready(function(){
   initAllRollovers();
});