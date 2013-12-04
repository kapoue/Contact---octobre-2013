$.fn.droppy = function() {
  this.each(function() {
    
    var root = this, zIndex = 1000;
    $('ul', this).hide();
    $('ul', this).css("opacity", "0.9");
    function getSubnav(ele) {
      if (ele.nodeName.toLowerCase() == 'li') {
        var subnav = $('> ul', ele);
        return subnav.length ? subnav[0] : null;
      } else {
        return ele;
      }
    }
    
    function getActuator(ele) {
      if (ele.nodeName.toLowerCase() == 'ul') {
        return $(ele).parents('li')[0];
      } else {
        return ele;
      }
    }
    
    function hide() {
      var subnav = getSubnav(this);
      if (!subnav) return;
      $.data(subnav, 'cancelHide', false);
      setTimeout(function() {
        if (!$.data(subnav, 'cancelHide')) {
          $(subnav).slideUp('fast');
        }
      }, 100);
    }
  
    function show() {
      var subnav = getSubnav(this);
      if (!subnav) return;
      $.data(subnav, 'cancelHide', true);
      /*setTimeout(function() {*/
         $(subnav).css({zIndex: zIndex++}).slideDown('fast');
      /*}, 500);*/
      if (this.nodeName.toLowerCase() == 'ul') {
        $(getActuator(this)).addClass('hover');
      }
    }
    
    $('ul, li', this).hover(show, hide);
    $('li', this).hover(
      function() { $(this).addClass('hover'); },
      function() { $(this).removeClass('hover'); }
    );
    
  });
};