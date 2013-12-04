box.dom(document).ready(function() {
    
    var W = window;
    
    /**
     * @section        mainMenu
     */
    var timerMainNav, currentActiveMainNav, restoreActiveMainNav;
    var player = box.dom('#player'), playerMask;
    
    if(player.hasClass('playerMax')) {
        playerMask = box.dom('<div class="playerMaskMax" style="display:none;"></div>');
    } else {
        playerMask = box.dom('<div class="playerMaskMin" style="display:none;"></div>');
    }
    player.find('div.wrapper').append(playerMask);
    
    function showMainNavExpand() {
        var li = box.dom(this), expand = li.find('div.expand'), a;
        if(currentActiveMainNav && currentActiveMainNav.length) {
            doHideMainNavExpand(currentActiveMainNav.parent(), currentActiveMainNav);
            currentActiveMainNav = null;
        }
        if(expand.length) {
            currentActiveMainNav = li.find('div.expand');
            timerMainNav = W.setTimeout(function() {
                playerMask.show();
                var a = li.children('a');
                if(a.hasClass('on')) {
                    restoreActiveMainNav = true;
                    a.removeClass('on');
                }
                a.addClass('expanded');
                li.find('div.expand').slideDown(500);
            }, 250);
        }
    }
    
    function doHideMainNavExpand(li, expand) {
        W.clearTimeout(timerMainNav);
        expand.stop().hide().css('height', 'auto');
        var a = li.children('a');
        a.removeClass('expanded');
        playerMask.hide();
        if(restoreActiveMainNav) {
            a.addClass('on');
            restoreActiveMainNav = false;
        }
    }
    
    function hideMainNavExpand() {
        var li = box.dom(this);
        doHideMainNavExpand(li, li.find('div.expand'));
    }
    
    box.dom('#mainMenu > ul > li').hover(showMainNavExpand, hideMainNavExpand);
    
    
    /**
     * @section        myAccount
     */
    function showLogin(e) {
        e.preventDefault();
        
        box.dom('#myAccountShowLogin, #myAccountRegister').hide();
        box.dom('#myAccountLogin, #myAccountFirstVisit').show();
    }
    
    function hideLogin(e) {
        e.preventDefault();
        
        box.dom('#myAccountLogin, #myAccountFirstVisit').hide();
        box.dom('#myAccountShowLogin, #myAccountRegister').show();
    }
    
    box.dom('#myAccountShowLogin a').click(showLogin);
    box.dom('#myAccountHideLogin').click(hideLogin);
    
    var isServicesAnim = false;
    
    function showServices() {
        if(!isServicesAnim) {
            isServicesAnim = true;
            box.dom('#myAccountServices').slideDown(400, function() {
                isServicesAnim = false;
            });
        }
    }
    
    function hideServices() {
        if(!isServicesAnim) {
            isServicesAnim = true;
            box.dom('#myAccountServices').slideUp(400, function() {
                isServicesAnim = false;
            });
        }
    }
    
    box.dom('#myAccount div.logged').hover(showServices, hideServices);
    
});