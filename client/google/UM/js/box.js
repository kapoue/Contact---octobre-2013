var box = {};
box.version = '0.5.0';

(function($) {

var W = this, D = this.document, DE = D.documentElement;

// @todo expand and correct features detect
if (!DE || !D.getElementById || !D.getElementsByTagName || !D.createElement || !D.createTextNode) {
    box.disabled = true;
    return;
}

box.disabled = false;

var html = $(DE).attr('id', 'js');

// flag dom is ready
box.domIsReady = false;
$(D).ready(function() {
    box.domIsReady = true;
});

// flag page is loaded
box.loadIsDone = false;
$(W).load(function() {
    box.loadIsDone = true;
});


// private caches
var local = {}, uiCache = {}, utilCache = {};


// bridge to jQuery
box.dom = function(a1, a2) {
    return $(a1, a2);
};

// get util object
box.util = function(s) {
    return utilCache[s];
};

// get component object
box.ui = function(s) {
    return uiCache[s];
};

// add plugin ui object
box.addPluginUI = function(id, obj) {
    id = 'plugin.' + id;
    if(!uiCache[id]) {
        uiCache[id] = obj;
    }
    return obj;
};

// remove plugin ui object
box.removePluginUI = function(id) {
    id = 'plugin.' + id;
    delete uiCache[id];
};


// simple class-like inherit mecanism
// @todo add superclass property to keep superclass properties?
var inherit = (function() {
    var Fn = function() {};
    return function(fnSub, fnSuper) {
        Fn.prototype = fnSuper.prototype;
        fnSub.prototype = new Fn();
        fnSub.prototype.constructor = fnSub;
    };
})();
box.inherit = inherit;

// add members (properties and / or methods) to a prototype
var extend = function(fn, members) {
    for(var m in members) {
        if(members.hasOwnProperty(m)) {
            fn.prototype[m] = members[m];
        }
    }
};
box.extend = extend;

// clone a static object (shallow copy, only with primitive values)
var clone = function(o) {
    var c = {};
    for(var p in o) {
        if(o.hasOwnProperty(p)) {
            c[p] = o[p];
        }
    }
    return c;
};
box.clone = clone;


// lazy load scripts
box.loadScript = function(id, url, cache) {
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'script',
        cache: cache !== false,
        error: function() {
            box.fire({type: 'requesterror', component: 'loadscript', id: id});
        },
        success: function() {
            box.fire({type: 'requestsuccess', component: 'loadscript', id: id});
        }
    });
};

var listeners = {};

var execListeners = function(evtName, evtObj, args) {
    var ls = listeners[evtName];
    var r = true;
    if(ls && ls.length) {
        var i = ls.length, l = i - 1, tmp;
        while(i--) {
            if(ls[l - i].apply(evtObj.source || null, args) === false) {
                r = false;
            }
        }
    }
    return r;
};

box.fire = function(evtObj) {
    if(typeof evtObj == 'object' && typeof evtObj.type == 'string') {
        var args = Array.prototype.slice.call(arguments, 1);
        args = [evtObj].concat(args);
        if(typeof evtObj.source == 'undefined') {
            evtObj.source = null;
        }
        
        var evtName = evtObj.type;
        if(typeof evtObj.component == 'string') {
            evtName += '.' + evtObj.component;
        }
        if(typeof evtObj.id == 'string') {
            evtName += '.' + evtObj.id;
        }
        if(typeof evtObj.namespace == 'string') {
            evtName += '.' + evtObj.namespace;
        }
        
        var parts = evtName.split('.'), i = parts.length;
        while(i) {
            if(execListeners(parts.slice(0, i).join('.'), evtObj, args) === false) {
                break;
            }
            --i;
        }
    }
    return this;
};

box.bind = function(bindings) {
    for(var e in bindings) {
        if(bindings.hasOwnProperty(e)) {
            if(!listeners[e]) {
                listeners[e] = [];
            }
            listeners[e][listeners[e].length] = bindings[e];
        }
    }
    return this;
};

box.unbind = function() {
    var l = arguments.length, n, i;
    while(l--) {
        n = arguments[l];
        if(listeners[n]) {
            delete listeners[n];
        } else if(n.indexOf('*') > -1) {
            n = n.replace(/\*/i, '');
            for(i in listeners) {
                if(listeners.hasOwnProperty(i)) {
                    if(i.indexOf(n) > -1) {
                        delete listeners[i];
                    }
                }
            }
        }
    }
    return this;
};

// get an ID from an element
var uiCounter = 0;
$.fn.getAnId = function() {
    var id;
    if(this.length == 1) {
        id = this.getBoxDatas('id') || this.attr('id');
        if(!id) {
            id = '__n__' + (++uiCounter);
        }
    }
    return id;
};

// get box datas in class attribute
$.fn.getBoxDatas = function(key) {
    var datas = null;
    if(this.length) {
        var cls = this[0].className, tmp;
        if(cls && cls.indexOf('box[') > -1) {
            if(typeof key == 'string') {
                var re = new RegExp(key + '=([^;\\]]+)');
                tmp = cls.match(re);
                datas = tmp && tmp[1];
            } else {
                datas = {};
                var box = cls.replace(/.*box\[([^)]+)\].*/, '$1');
                var boxParts = box.split(';');
                var i = boxParts.length, l = i - 1;
                while(i--) {
                    tmp = boxParts[i].split('=');
                    datas[tmp[0]] = tmp[1];
                }
            }
        }
    }
    return datas;
};

// set box datas in class attribute
$.fn.setBoxDatas = function(datas) {
    if(typeof datas == 'object' && this.length) {
        this.each(function(i, elm) {
            var cls = elm.className, tmp, first = false;
            if(!cls || cls.indexOf('box[') == -1) {
                $(elm).addClass('box[]');
                first = true;
            }
            cls = elm.className;
            for(var i in datas) {
                tmp = i + '=' + datas[i];
                // @todo should check for duplicates in keys and override if necessary
                if(datas.hasOwnProperty(i) && cls.indexOf(tmp) == -1) {
                    cls = cls.replace(']', (first ? '' : ';') + tmp + ']');
                }
            }
            elm.className = cls;
        });
    }
    return this;
};

// clear box datas in class attribute
$.fn.clearBoxDatas = function(datas) {
    if(typeof datas == 'object' && this.length) {
        var cls = this[0].className, tmp;
        for(var i in datas) {
            tmp = i + '=' + datas[i];
            if(datas.hasOwnProperty(i) && cls.indexOf(tmp) > -1) {
                cls = cls.replace(tmp, '');
            }
        }
        this[0].className = cls;
    }
};

// clear fields onfocus / restore on blur
var reTextFieldTypes = /(text|password)/i;
var reEmpty = /^\s*$/;

var clearTextFieldValue = function() {
    if(this.value == this.defaultValue) {
        this.value = '';
    }
};

var restoreTextFieldValue = function() {
    if(reEmpty.test(this.value)) {
        this.value = this.defaultValue;
    }
};

$.fn.clearTextFields = function() {
    this.each(function(i, elm) {
        if(elm.nodeName.toLowerCase() == 'input' && reTextFieldTypes.test(elm.type)) {
            $(elm).focus(clearTextFieldValue).blur(restoreTextFieldValue);
        } else {
            $('input[type=text], input[type=password]', elm).focus(clearTextFieldValue).blur(restoreTextFieldValue);
        }
    });
};

// get outer HTML
var divDummyContainer = $('<div></div>');
$.fn.outerHTML = function() {
    divDummyContainer.html('');
    return divDummyContainer.append(this.eq(0).clone()).html();
};

// replace the innerHTML of an element
$.fn.replaceIn = function(s) {
    var html = '';
    this.each(function(i, elm) {
        html += $(elm).outerHTML();
    });
    $(s).html(html);
    return this;
};

// get scroll offset
$.fn.getScroll = function() {
    return {
        top: this.scrollTop(),
        left: this.scrollLeft()
    };
};

// get different size types
var getASize = {
    'viewport-width': function() {
        return $(W).width();
    },'viewport-height': function() {
        return $(W).height();
    },'document-width': function() {
        return $(D).width();
    },'document-height': function() {
        return $(D).height();
    },'content-box-width': function(elm) {
        return elm.width();
    },'content-box-height': function(elm) {
        return elm.height();
    },'padding-box-width': function(elm) {
        return elm.innerWidth();
    },'padding-box-height': function(elm) {
        return elm.innerHeight();
    },'border-box-width': function(elm) {
        return elm.outerWidth();
    },'border-box-height': function(elm) {
        return elm.outerHeight();
    },'margin-box-width': function(elm) {
        return elm.outerWidth(true);
    },'margin-box-height': function(elm) {
        return elm.outerHeight(true);
    }
};

// get a size from a keyword
// if no (recognized) keyword, default to content-box size
var getSizeFromKeyword = function(elm, type, keyword) {
    if(elm[0] === W) {
        return getASize['viewport-' + type.toLowerCase()]();
    } else if(elm[0] === D) {
        return getASize['document-' + type.toLowerCase()]();
    } else {
        var method = typeof keyword == 'string' ? keyword.toLowerCase() + '-' + type : 'content-box-' + type;
        if(getASize[method]) {
            return getASize[method](elm);
        } else {
            return getASize['content-box-' + type.toLowerCase()](elm);
        }
    }
};

// get size from a keyword, different keywords possible for width / height
// if no keywords, default to content-box size
$.fn.getSize = function(keyword) {
    return {
        width: getSizeFromKeyword(this, 'width', keyword),
        height: getSizeFromKeyword(this, 'height', keyword)
    };
};
$.fn.getWidth = function(keyword) {
    return getSizeFromKeyword(this, 'width', keyword);
};
$.fn.getHeight = function(keyword) {
    return getSizeFromKeyword(this, 'height', keyword);
};

// set size, only with numbers, or 'auto' keyword
$.fn.setSize = function(datas) {
    if(typeof datas == 'number' || datas == 'auto') {
        this.width(datas).height(datas);
    } else if(typeof datas == 'object') {
        if(typeof datas.width == 'number' || datas.width == 'auto') {
            this.width(datas.width);
        }
        if(typeof datas.height == 'number' || datas.height == 'auto') {
            this.height(datas.height);
        }
    }
    return this;
};
$.fn.setWidth = function(value) {
    if(typeof value == 'number' || value == 'auto') {
        this.width(value);
    }
    return this;
};
$.fn.setHeight = function(value) {
    if(typeof value == 'number' || value == 'auto') {
        this.height(value);
    }
    return this;
};

// get a position from a keyword
// if no (recognized) keyword, default to offset from the document origin
var getXYFromKeyword = function(elm, keyword) {
    if(elm[0] === D) {
        return {top: 0, left: 0};
    } else if(elm[0] === W) {
        return elm.getScroll();
    } else if(keyword == 'positioned-ancestor') {
        return elm.position();
    } else {
        return elm.offset();
    }
};

// get position from a keyword, different keywords possible for top / left
// if no keywords, default to offsets from the document origin
$.fn.getXY = function(keyword) {
    return getXYFromKeyword(this, keyword);
};
$.fn.getX = function(keyword) {
    return getXYFromKeyword(this, keyword).left;
};
$.fn.getY = function(keyword) {
    return getXYFromKeyword(this, keyword).top;
};

// set position, only with numbers
$.fn.setXY = function(datas) {
    if(typeof datas == 'number') {
        this.css({top: datas + 'px', left: datas + 'px'});
    } else if(typeof datas == 'object') {
        var pos = {};
        if(typeof datas.top == 'number') {
            pos.top = datas.top + 'px';
        } else if(datas.top == 'auto') {
            pos.top = 'auto';
        }
        if(typeof datas.left == 'number') {
            pos.left = datas.left + 'px';
        } else if(datas.left == 'auto') {
            pos.left = 'auto';
        }
        this.css(pos);
    }
};

var getAPosition = {
    'root': function(curElm, refElm, type) {
        return refElm.offset()[type];
    },'positioned-ancestor': function(curElm, refElm, type) {
        return refElm.position()[type];
    },'before': function(curElm, refElm, type, relType) {
        var curDim = curElm['get' + relType]('border-box');
        var refPos = refElm.getXY()[type];
        return refPos - curDim;
    },'start': function(curElm, refElm, type, relType) {
        return refElm.getXY()[type];
    },'middle': function(curElm, refElm, type, relType) {
        var curDim = curElm['get' + relType]('border-box');
        var refDim = getSizeFromKeyword(refElm, relType);
        var refPos = refElm.getXY()[type];
        return refPos + (refDim - curDim) / 2;
    },'end': function(curElm, refElm, type, relType) {
        var curDim = curElm['get' + relType]('border-box');
        var refDim = getSizeFromKeyword(refElm, relType);
        var refPos = refElm.getXY()[type];
        return refPos + refDim - curDim;
    },'in-before': function(curElm, refElm, type, relType) {
        return -curElm['get' + relType]('border-box');
    },'in-start': function() {
        return 0;
    },'in-middle': function(curElm, refElm, type, relType) {
        var curDim = curElm['get' + relType]('border-box');
        var refDim = getSizeFromKeyword(refElm, relType);
        return (refDim - curDim) / 2;
    },'in-end': function(curElm, refElm, type, relType) {
        var curDim = curElm['get' + relType]('border-box');
        var refDim = getSizeFromKeyword(refElm, relType);
        return refDim - curDim;
    }
};

var getAlternateSelectorNames = function(name) {
    var ref = {
        'viewport': W,
        'document': D
    };
    return ref[name] || name;
};

var getStyleDim = function(styles, elm) {
    var s;
    if(typeof styles.width == 'string') {
        s = styles.width.split(':');
        if(s.length == 2) {
            styles.width = getASize[s[1] + '-width']($(getAlternateSelectorNames(s[0])), 'width');
        }
        if(!isNaN(styles['min-width']) && !isNaN(styles.width)) {
            styles.width = styles.width < styles['min-width'] ? styles['min-width'] : styles.width;
            delete styles['min-width'];
        }
        if(!isNaN(styles['max-width']) && !isNaN(styles.width)) {
            styles.width = styles.width > styles['max-width'] ? styles['max-width'] : styles.width;
            delete styles['max-width'];
        }
    }
    if(typeof styles.height == 'string') {
        s = styles.height.split(':');
        if(s.length == 2) {
            styles.height = getASize[s[1] + '-height']($(getAlternateSelectorNames(s[0])), 'height');
        }
        if(!isNaN(styles['min-height']) && !isNaN(styles.height)) {
            styles.height = styles.height < styles['min-height'] ? styles['min-height'] : styles.height;
            delete styles['min-height'];
        }
        if(!isNaN(styles['max-height']) && !isNaN(styles.height)) {
            styles.height = styles.height > styles['max-height'] ? styles['max-height'] : styles.height;
            delete styles['max-height'];
        }
    }
    return styles;
};

var getStylePos = function(styles, elm) {
    var s;
    if(typeof styles.top == 'string') {
        s = styles.top.split(':');
        if(s.length == 2) {
            styles.top = getAPosition[s[1]](elm, $(getAlternateSelectorNames(s[0])), 'top', 'Height');
        }
        if(!isNaN(styles['min-top']) && !isNaN(styles.top)) {
            styles.top = styles.top < styles['min-top'] ? styles['min-top'] : styles.top;
            delete styles['min-top'];
        }
        if(!isNaN(styles['max-top']) && !isNaN(styles.top)) {
            styles.top = styles.top > styles['max-top'] ? styles['max-top'] : styles.top;
            delete styles['max-top'];
        }
    }
    if(typeof styles.left == 'string') {
        s = styles.left.split(':');
        if(s.length == 2) {
            styles.left = getAPosition[s[1]](elm, $(getAlternateSelectorNames(s[0])), 'left', 'Width');
        }
        if(!isNaN(styles['min-left']) && !isNaN(styles.left)) {
            styles.left = styles.left < styles['min-left'] ? styles['min-left'] : styles.left;
            delete styles['min-left'];
        }
        if(!isNaN(styles['max-left']) && !isNaN(styles.left)) {
            styles.left = styles.left > styles['max-left'] ? styles['max-left'] : styles.left;
            delete styles['max-left'];
        }
    }
    return styles;
};

// apply styles from a reference element or not
$.fn.applyStyles = function(styles) {
    if(this.length && typeof styles == 'object') {
        var elm = this.eq(0), nStyles = clone(styles);
        
        // size can affect position, so compute first
        nStyles = getStyleDim(nStyles, elm);
        
        if(!isNaN(nStyles.width)) {
            elm.width(nStyles.width);
            delete nStyles.width;
        }
        if(!isNaN(nStyles.height)) {
            elm.height(nStyles.height);
            delete nStyles.height;
        }
        
        nStyles = getStylePos(nStyles, elm);
        
        elm.css(nStyles);
    }
    return this;
};

// get styles from a reference element or not
$.fn.getStyles = function(styles) {
    if(this.length && typeof styles == 'object') {
        var elm = this.eq(0), nStyles = clone(styles);
        
        nStyles = getStyleDim(nStyles, elm);
        nStyles = getStylePos(nStyles, elm);
        
        return nStyles;
    }
    return null;
};

box.DatasHTML = function(ui, datas) {
    this.ui = ui;
    this.requestTimeout = datas.requestTimeout || 15000;
    this.available = true;
};
box.DatasHTML.prototype = {
    set: function(str) {
        this.available = false;
        this.ui.fireEvent({type: 'htmlready', element: $(str)});
    },
    
    request: function(datas) {
        var that = this;
        
        that.available = false;
        that.ui.fireEvent({type: 'requeststart'});
        $.ajax({
            cache: datas.cache !== false,
            data: datas.params,
            timeout: that.requestTimeout,
            type: datas.method || 'GET',
            url: datas.url,
            
            error: function(http, status) {
                that.available = true;
                that.ui.fireEvent({type: 'requesterror', status: status});
            },
            success: function(txt) {
                that.datas = txt;
                that.ui.fireEvent({type: 'requestsuccess'});
                that.set(that.datas);
            }
        });
    }
};

var getImagesInElement = function(elm) {
    var aSrc = [];
    (elm.jquery ? elm : $(elm)).find('img').each(function(i, img) {
        aSrc[i] = img.getAttribute('src', 2);
    });
    return aSrc;
};
box.getImagesInElement = getImagesInElement;

box.DatasImage = function(ui, timeout) {
    this.ui = ui;
    this.timeout = timeout || 30000;
    this.available = true;
};
box.DatasImage.prototype = {
    single: function(src, timeout) {
        var that = this;
        that.start(timeout);
        that.preload = new Image();
        that.preload.onload = function() {
            that.stop({status: 'success', img: this, src: src, width: this.width, height: this.height});
        };
        that.preload.src = src;
    },
    
    batch: function(aSrc, timeout) {
        if(!aSrc.length) {
            this.stop({status: 'success'});
            return;
        }
        var that = this, i = aSrc.length, l = i - 1, c = aSrc.length, evt = {};
        evt.img = [];
        that.preload = [];
        that.start(timeout);
        while(i--) {
            that.preload[l - i] = new Image();
            that.preload[l - i].onload = function() {
                evt.img[evt.img.length] = {img: this, src: this.getAttribute('src', 2), width: this.width, height: this.height};
                c--;
                if(c === 0) {
                    evt.status = 'success';
                    that.stop(evt);
                }
            };
            that.preload[l - i].src = aSrc[l - i];
        }
    },
    
    // @todo implement a queue method
    
    start: function(timeout) {
        var that = this;
        that.available = false;
        that.timer = W.setTimeout(function() {
            that.stop({status: 'timeout'});
        }, timeout || that.timeout);
    },
    
    cancel: function() {
        if(!this.available) {
            this.stop({status: 'canceled'});
        }
    },
    
    stop: function(evt) {
        W.clearTimeout(this.timer);
        this.timer = null;
        if(this.preload) {
            if(this.preload.nodeName) {
                this.preload.onload = null;
            } else {
                var i = this.preload.length;
                while(i--) {
                    this.preload[i] = this.preload[i].onload = null;
                }
            }
            this.preload = null;
        }
        this.available = true;
        switch(evt.status) {
            case 'success':
                evt.type = 'preloadready';
                break;
            case 'timeout':
                evt.type = 'preloaderror';
                break;
            case 'canceled':
                evt.type = 'preloadabort';
        }
        evt.type = evt.status == 'success' ? 'preloadready': 'preloaderror';
        this.ui.fireEvent(evt);
    }
};

var removeInDOMBridge = function(source, elm, evt, ns) {
    elm.remove();
    source.inDOM = false;
    source.ui.fireEvent({type: 'removefromdom', namespace: ns});
    source.available = true;
    source.ui.fireEvent({type: evt});
};

box.DOMBridge = function(ui, datas) {
    this.ui = ui;
    this.insertTarget = datas.insertTarget || 'body';
    this.insertMethod = datas.insertMethod || 'appendTo';
    this.insertStyles = datas.insertStyles || {};
    this.insertAnimStyles = datas.insertAnimStyles;
    this.insertAnimDuration = datas.insertAnimDuration;
    this.removeAnimStyles = datas.removeAnimStyles;
    this.removeAnimDuration = datas.removeAnimDuration;
    this.resizeStyles = datas.resizeStyles;
    this.available = true;
    this.inDOM = false;
};
box.DOMBridge.prototype = {
    insert: function(elm, evt, ns) {
        var that = this;
        if(elm && that.available && !that.inDOM) {
            that.available = false;
            
            elm
                .css('visibility', 'hidden')
                [that.insertMethod](that.insertTarget)
                .css(elm.getStyles(that.insertStyles))
                .css('visibility', 'visible');
            that.inDOM = true;
            that.ui.fireEvent({type: 'addtodom', namespace: ns});
            
            if(that.insertAnimStyles && that.insertAnimDuration) {
                elm.animate(
                    elm.getStyles(that.insertAnimStyles),
                    that.insertAnimDuration,
                    function() {
                        that.available = true;
                        that.ui.fireEvent({type: evt, namespace: ns});
                    }
                );
            } else {
                that.available = true;
                that.ui.fireEvent({type: evt, namespace: ns});
            }
        }
    },
    
    remove: function(elm, evt, ns) {
        var that = this;
        if(elm && that.available && that.inDOM) {
            that.available = false;
            
            if(that.removeAnimStyles && that.removeAnimDuration) {
                elm.animate(
                    elm.getStyles(that.removeAnimStyles),
                    that.removeAnimDuration,
                    function() {
                        removeInDOMBridge(that, elm, evt, ns);
                    }
                );
            } else {
                removeInDOMBridge(that, elm, evt, ns);
            }
        }
    },
    
    update: function(elm) {
        if(elm && this.available && this.resizeStyles) {
            elm.applyStyles(this.resizeStyles);
        }
    },
    
    applyStyles: function(elm, styles, options) {
        var that = this;
        if(elm && that.available) {
            elm.animate(
                elm.getStyles(styles),
                options.duration,
                function() {
                    that.available = true;
                    that.ui.fireEvent({type: options.endEventType, namespace: options.endEventNs});
                }
            );
        }
    }
};

// add / remove / manage clicks with delegation
var clickDelegates = {};

$(D).click(function(e) {
    var d, j, element;
    for(var i in clickDelegates) {
        if(clickDelegates.hasOwnProperty(i)) {
            d = clickDelegates[i];
            j = d.deepness || 1000;
            element = e.target;
            while(j-- && element) {
                if(d.test(element)) {
                    d.handler(e, element);
                    break;
                }
                element = element.parentNode;
            }
        }
    }
});

box.addClick = function(datas) {
    clickDelegates[datas.id] = datas;
    return box;
};

box.removeClick = function(id) {
    delete clickDelegates[id];
    return box;
};

box.getURLParams = function() {
    var qs = location.search, r = {};
    if(qs) {
        qs = qs.replace('?', '');
        var p = qs.split('&'), i = p.length, t;
        while(i--) {
            t = p[i].split('=');
            r[t[0]] = t[1];
        }
    }
    return r;
};

box.getURLHashParts = function() {
    var h = location.hash, r = {};
    if(h) {
        h = h.replace('#', '');
        var p = h.split(';'), i = p.length, t;
        while(i--) {
            t = p[i].split('=');
            r[t[0]] = t[1];
        }
    }
    return r;
};

var escapeCache = [];

box.addEscapeKey = function(id) {
    escapeCache[escapeCache.length] = id;
};

box.removeEscapeKey = function(id) {
    var i = escapeCache.length;
    while(i--) {
        if(escapeCache[i] == id) {
            escapeCache.splice(i, 1);
            break;
        }
    }
};

$(D).keydown(function(e) {
    if(e.which == 27 && escapeCache.length) {
        var id = escapeCache.pop();
        box.fire({
            type: 'escape',
            component: 'key',
            id: id
        });
    }
});

uiCache.panel = {
    create: function(datas) {
        var id = 'panel.' + datas.id;
        return uiCache[id] || (uiCache[id] = new box.Panel(datas));
    },
    
    destroy: function() {
        var i = arguments.length, id;
        while(i--) {
            id = 'panel.' + arguments[i];
            if(uiCache[id]) {
                box.unbind('contains:' + id);
                $(W).unbind('resize.' + arguments[i] + 'panel');
                delete uiCache[id];
            }
        }
    }
};

box.Panel = function(datas) {
    this.name = 'panel';
    this.init(datas);
};
box.Panel.prototype = {
    init: function(datas) {
        this.id = datas.id;
        
        this.element = $(datas.html);
        this.dom = new box.DOMBridge(this, datas);
        
        if(datas.resizeStyles) {
            var that = this;
            $(W).bind('resize.' + that.name + that.id, function() {
                that.dom.update(that.element);
            });
        }
        
        this.fireEvent({type: 'init'});
    },
    
    fireEvent: function(opt) {
        var evt = {component: this.name, id: this.id, source: this};
        for(var o in opt) {
            if(opt.hasOwnProperty(o)) {
                evt[o] = opt[o];
            }
        }
        box.fire(evt);
    },
    
    show: function() {
        if(this.dom.available) {
            this.dom.insert(this.element, 'show');
        }
    },
    
    hide: function() {
        if(this.dom.available) {
            this.dom.remove(this.element, 'hide');
        }
    }
};

uiCache.mask = {
    create: function(datas) {
        var id = 'mask.' + datas.id;
        return uiCache[id] || (uiCache[id] = new box.Mask(datas));
    },
    
    destroy: function() {
        var i = arguments.length, id;
        while(i--) {
            id = 'mask.' + arguments[i];
            if(uiCache[id]) {
                box.unbind('contains:' + id);
                $(W).unbind('resize.' + arguments[i] + 'mask');
                delete uiCache[id];
            }
        }
    }
};

box.Mask = function(datas) {
    this.name = 'mask';
    this.init(datas);
};
inherit(box.Mask, box.Panel);

uiCache.loader = {
    create: function(datas) {
        var id = 'loader.' + datas.id;
        return uiCache[id] || (uiCache[id] = new box.Loader(datas));
    },
    
    destroy: function() {
        var i = arguments.length, id;
        while(i--) {
            id = 'loader.' + arguments[i];
            if(uiCache[id]) {
                box.unbind('contains:' + id);
                $(W).unbind('resize.' + arguments[i] + 'loader');
                delete uiCache[id];
            }
        }
    }
};

box.Loader = function(datas) {
    this.name = 'loader';
    this.init(datas);
};
inherit(box.Loader, box.Panel);

uiCache.popin = {
    create: function(datas) {
        var id = 'popin.' + datas.id;
        return uiCache[id] || (uiCache[id] = new box.Popin(datas));
    },
    
    destroy: function() {
        var i = arguments.length, id;
        while(i--) {
            id = 'popin.' + arguments[i];
            if(uiCache[id]) {
                uiCache[id].disable();
                delete uiCache[id];
            }
        }
    }
};

var addPopinBindings = function(ui) {
    var a = {}, b = {},
        uiId = 'popin.' + ui.id,
        uiFullReady = (ui.loader ? 'preloadready.' : 'htmlready.') + uiId,
        uiClose = 'close.' + uiId,
        uiMaskShow, uiMaskHide, uiLoaderShow, uiLoaderHide;
    
    if(ui.mask) {
        uiMaskShow = 'show.mask.' + ui.mask.id;
        uiMaskHide = 'hide.mask.' + ui.mask.id;
    }
    if(ui.loader) {
        uiLoaderShow = 'show.loader.' + ui.loader.id;
        uiLoaderHide = 'hide.loader.' + ui.loader.id;
    }
    
    box.addClick({
        id: 'open.' + uiId,
        deepness: 5,
        test: function(element) {
            return (element.className && ui.openClassName.test(element.className));
        },
        handler: function(e, element) {
            e.preventDefault();
            if(ui.available) {
                var datas = $(element).getBoxDatas() || {};
                datas.url = element.href;
                ui.open(datas);
            }
        }
    });
    
    a['beforeopen.' + uiId] = function(e) {
        if(e.source.opened) {
            e.source.pending = true;
            e.source.close();
        } else {
            if(e.source.mask) {
                e.source.mask.show();
            } else if(e.source.loader) {
                e.source.loader.show();
            }
        }
    };
    a['htmlready.' + uiId] = function(e) {
        if(e.source.pending) {
            e.source.pending = e.element;
        } else {
            e.source.element = e.element;
        }
        if(e.source.preload) {
            e.source.preload.batch(getImagesInElement(e.element));
        }
    };
    a['open.' + uiId] = function(e) {
        box.addEscapeKey(uiId);
        box.addClick({
            id: 'close.' + uiId,
            deepness: 5,
            test: function(element) {
                return (element.className && ui.closeClassName.test(element.className));
            },
            handler: function(e, element) {
                e.preventDefault();
                ui.close();
            }
        });
        if(e.source.pending) {
            e.source.element = e.source.pending;
            e.source.pending = null;
        }
        e.source.opened = true;
        e.source.available = true;
    };
    a['removefromdom.' + uiId] = function(e) {
        e.source.opened = false;
        e.source.element = null;
        box.removeEscapeKey(uiId);
        box.removeClick(uiClose);
    };
    a['escape.key.' + uiId] = function() {
        ui.close();
    };
    
    if(!ui.mask && !ui.loader) {
        b[uiFullReady] = b[uiClose] = function(e) {
            if(e.source.pending) {
                if(typeof e.source.pending != 'boolean') {
                    e.source.dom.insert(e.source.pending, 'open', (e.source.datas ? e.source.datas.id : undefined));
                }
            } else {
                e.source.dom.insert(e.source.element, 'open', (e.source.datas ? e.source.datas.id : undefined));
            }
            if(e.type == 'close') {
                e.source.available = true;
            }
        };
    } else if(ui.mask && !ui.loader) {
        b[uiFullReady] = function(e) {
            if(e.source.mask.dom.available) {
                e.source.dom.insert(e.source.element || e.source.pending, 'open', (e.source.datas ? e.source.datas.id : undefined));
            }
        };
        b[uiClose] = function(e) {
            if(e.source.pending) {
                if(typeof e.source.pending != 'boolean') {
                    e.source.dom.insert(e.source.pending, 'open', (e.source.datas ? e.source.datas.id : undefined));
                }
            } else {
                e.source.mask.hide();
            }
        };
        b[uiMaskShow] = function(e) {
            if(ui.element) {
                ui.dom.insert(ui.element, 'open', (ui.datas ? ui.datas.id : undefined));
            }
        };
        b[uiMaskHide] = function(e) {
            ui.available = true;
        };
    } else if(!ui.mask && ui.loader) {
        b[uiFullReady] = function(e) {
            if(e.source.loader.dom.available) {
                e.source.loader.hide();
            }
        };
        b[uiClose] = function(e) {
            if(e.source.pending) {
                if(e.source.preload.available && typeof e.source.pending != 'boolean') {
                    e.source.dom.insert(e.source.pending, 'open', (e.source.datas ? e.source.datas.id : undefined));
                } else {
                    e.source.loader.show();
                }
            } else {
                e.source.available = true;
            }
        };
        b[uiLoaderShow] = function(e) {
            if(ui.preload.available) {
                if(ui.element) {
                    e.source.hide();
                } else if(ui.pending && typeof ui.pending != 'boolean') {
                    e.source.hide();
                }
            }
        };
        b[uiLoaderHide] = function(e) {
            ui.dom.insert(ui.element || ui.pending, 'open', (ui.datas ? ui.datas.id : undefined));
        };
    } else {
        b[uiFullReady] = function(e) {
            if(e.source.mask.dom.available && e.source.loader.dom.available) {
                e.source.loader.hide();
            }
        };
        b[uiClose] = function(e) {
            if(e.source.pending) {
                if(e.source.preload.available && typeof e.source.pending != 'boolean') {
                    e.source.dom.insert(e.source.pending, 'open', (e.source.datas ? e.source.datas.id : undefined));
                } else {
                    e.source.loader.show();
                }
            } else {
                e.source.mask.hide();
            }
        };
        b[uiMaskShow] = function(e) {
            if(ui.preload.available && ui.element) {
                ui.dom.insert(ui.element, 'open', (ui.datas ? ui.datas.id : undefined));
            } else {
                ui.loader.show();
            }
        };
        b[uiMaskHide] = function(e) {
            ui.available = true;
        };
        b[uiLoaderShow] = function(e) {
            if(ui.preload.available) {
                if(ui.element) {
                    e.source.hide();
                } else if(ui.pending && typeof ui.pending != 'boolean') {
                    e.source.hide();
                }
            }
        };
        b[uiLoaderHide] = function(e) {
            ui.dom.insert(ui.element || ui.pending, 'open', (ui.datas ? ui.datas.id : undefined));
        };
    }
    
    box.bind(a).bind(b);
};

box.Popin = function(datas) {
    this.name = 'popin';
    this.init(datas);
};
box.Popin.prototype = {
    init: function(datas) {
        this.id = datas.id;
        
        if(datas.mask) {
            this.mask = uiCache['mask.' + datas.mask];
        }
        if(datas.loader) {
            this.loader = uiCache['loader.' + datas.loader];
            this.preload = new box.DatasImage(this, datas.preloadTimeout);
        }
        
        this.openClassName = new RegExp('\\b' + datas.openClassName + '\\b');
        this.closeClassName = new RegExp('\\b' + datas.closeClassName + '\\b');
        
        this.html = new box.DatasHTML(this, datas);
        this.dom = new box.DOMBridge(this, datas);
        
        this.enable();
        
        this.fireEvent({type: 'init'});
    },
    
    fireEvent: function(opt) {
        var evt = {component: this.name, id: this.id, namespace: this.datas && this.datas.id, source: this};
        for(var o in opt) {
            if(opt.hasOwnProperty(o)) {
                evt[o] = opt[o];
            }
        }
        box.fire(evt);
    },
    
    disable: function() {
        box.removeClick('open.popin.' + this.id);
        box.unbind('contains:popin.' + this.id);
        this.available = false;
    },
    
    enable: function() {
        addPopinBindings(this);
        this.available = true;
    },
    
    error: function(html) {
        this.available = false;
        this.fireEvent({type: 'beforeopen', status: 'error'});
        this.datas.id = 'error';
        this.html.set(html);
    },
    
    open: function(datas) {
        if(this.available) {
            this.available = false;
            this.datas = datas;
            if(typeof this.datas.cache == 'string') {
                this.datas.cache = this.datas.cache == 'false' ? false : true;
            }
            this.fireEvent({type: 'beforeopen'});
            if(datas.url) {
                this.html.request(this.datas);
            } else if(datas.html) {
                this.html.set(datas.html);
            }
        }
    },
    
    close: function() {
        this.available = false;
        this.dom.remove(this.element, 'close', (this.datas ? this.datas.id : undefined));
    }
};

(function() {
    
    var config = {
        cls: 'draggable'
    };
    
    uiCache.draggable = {
        create: function(datas) {
            datas.id = datas.id || $(datas.element).getAnId();
            if(datas.id) {
                var id = 'draggable.' + datas.id;
                return uiCache[id] || (uiCache[id] = new Draggable(datas));
            }
        },
        
        destroy: function() {
            var i = arguments.length, id;
            while(i--) {
                id = 'draggable.' + arguments[i];
                if(uiCache[id]) {
                    uiCache[id].disable();
                    delete uiCache[id];
                }
            }
        },
        
        configure: function(datas) {
            for(var i in datas) {
                if(datas.hasOwnProperty(i) && config[i] !== undefined) {
                    config[i] = datas[i];
                }
            }
        }
    };
    
    var Draggable = function(datas) {
        this.initialize(datas);
    };
    Draggable.prototype = {
        initialize: function(datas) {
            this.id = datas.id;
            this.element = $(datas.element);
            this.handle = datas.handle ? $(datas.handle) : null;
            if(!this.handle || !this.handle.length) {
                this.handle = this.element;
            }
            
            this.setMinMax(datas);
            this.enable();
            
            box.fire({
                type: 'init',
                component: 'draggable',
                id: this.id,
                source: this
            });
        },
        
        setMinMax: function(datas) {
            if(typeof datas == 'object') {
                if(datas.bindTo) {
                    var bindTo = $(datas.bindTo == 'document' ? D : datas.bindTo == 'viewport' ? W : datas.bindTo);
                    var posRef = bindTo.getXY();
                    var dimRef = bindTo.getSize('border-box');
                    var dimElm = this.element.getSize('border-box');
                    this.minX = posRef.left;
                    this.maxX = this.minX + dimRef.width - dimElm.width;
                    this.minY = posRef.top;
                    this.maxY = this.minY + dimRef.height - dimElm.height;
                    this.element.css({top: this.minY, left: this.minX});
                    bindTo = null;
                } else {
                    this.minX = typeof datas.minX == 'number' ? datas.minX : this.minX;
                    this.maxX = typeof datas.maxX == 'number' ? datas.maxX : this.maxX;
                    this.minY = typeof datas.minY == 'number' ? datas.minY : this.minY;
                    this.maxY = typeof datas.maxY == 'number' ? datas.maxY : this.maxY;
                }
            }
            return this;
        },
        
        disable: function() {
            if(this.disabled === false) {
                this.element.removeClass(config.cls);
                this.handle.unbind('mousedown.' + this.id);
                this.disabled = true;
            }
        },
        
        enable: function() {
            var that = this;
            if(that.disabled !== false) {
                that.handle.bind('mousedown.' + that.id, function(e) {
                    that.startMove(e);
                });
                this.element.addClass(config.cls);
                that.disabled = false;
            }
        },
        
        move: function(e) {
            e.preventDefault();
            var y = e.pageY - this.sy, x = e.pageX - this.sx;
            if(this.minX !== undefined) {x = Math.max(x, this.minX);}
            if(this.maxX !== undefined) {x = Math.min(x, this.maxX);}
            if(this.minY !== undefined) {y = Math.max(y, this.minY);}
            if(this.maxY !== undefined) {y = Math.min(y, this.maxY);}
            this.element.css({
                'top': y +'px',
                'left': x +'px'
            });
            box.fire({
                type: 'move',
                component: 'draggable',
                id: this.id,
                source: this
            }, x, y);
        },
        
        startMove: function(e) {
            e.preventDefault();
            var that = this;
            var x = parseFloat(that.element.css('left')) || 0;
            var y = parseFloat(that.element.css('top')) || 0;
            that.element.css('top', y + 'px');
            that.element.css('left', x + 'px');
            that.sx = e.pageX - x;
            that.sy = e.pageY - y;
            $(D).bind('mouseup.' + that.id, function(e) {
                that.endMove(e);
            }).bind('mousemove.' + that.id, function(e) {
                that.move(e);
            });
            box.fire({
                type: 'startmove',
                component: 'draggable',
                id: this.id,
                source: this
            });
        },
        
        endMove: function(e) {
            $(D).unbind('mouseup.' + this.id).unbind('mousemove.' + this.id);
            box.fire({
                type: 'endmove',
                component: 'draggable',
                id: this.id,
                source: this
            });
        }
    };
    
})();

(function() {
    
    var config = {
        wrapScrollbar: '<div class="{$wrapScrollbarCls}">{$content}</div>',
        wrapScrollbarCls: 'scrollbar',
        
        wrapContent: '<div class="{$wrapContentCls}"></div>',
        wrapContentScrollCls: 'scrolled',
        wrapContentNoScrollCls: 'notScrolled',
        
        btnPrev: '<span class="{$btnPrevCls}"></span>',
        btnPrevCls: 'prev',
        
        btnNext: '<span class="{$btnNextCls}"></span>',
        btnNextCls: 'next',
        
        gutter: '<div class="{$gutterCls}">{$bar}</div>',
        gutterCls: 'gutter',
        
        bar: '<a href="#" class="{$barCls}"></a>',
        barCls: 'bar'
    };
    
    uiCache.scroll = {
        create: function(datas) {
            datas.id = datas.id || $(datas.element).getAnId();
            if(datas.id) {
                var id = 'scroll.' + datas.id;
                return uiCache[id] || (uiCache[id] = new Scroll(datas));
            }
        },
        
        destroy: function() {
            var i = arguments.length, id;
            while(i--) {
                id = 'scroll.' + arguments[i];
                if(uiCache[id]) {
                    uiCache[id].disable();
                    uiCache.draggable.destroy(arguments[i] + 'Scroll');
                    var content = uiCache[id].wrapper.html();
                    uiCache[id].element.html(content);
                    delete uiCache[id];
                }
            }
        },
        
        configure: function(datas) {
            for(var i in datas) {
                if(datas.hasOwnProperty(i) && config[i] !== undefined) {
                    config[i] = datas[i];
                }
            }
        }
    };
    
    var getScrollbarHTML = function(bar, buttons) {
        var tmp = bar ? config.gutter.replace('{$bar}', config.bar) : '';
        if(buttons) {
            tmp = config.btnPrev + tmp + config.btnNext;
        }
        var html = config.wrapScrollbar.replace('{$content}', tmp);
        $.each(['wrapScrollbar', 'btnPrev', 'btnNext', 'gutter', 'bar'], function(i, cls) {
            html = html.replace('{$' + cls + 'Cls}', config[cls + 'Cls']);
        });
        return html;
    };
    
    var addBarDraggable = function(scroll) {
        box.ui('draggable').create({
            id: scroll.dragId,
            element: scroll.bar
        });
        
        if(scroll.position == 'top') {
            box.ui('draggable.' + scroll.dragId).setMinMax({
                minX: 0,
                maxX: 0,
                minY: 0
            });
        } else {
            box.ui('draggable.' + scroll.dragId).setMinMax({
                minX: 0,
                minY: 0,
                maxY: 0
            });
        }
        
        var bindings = {};
        bindings['move.draggable.' + scroll.dragId] = function(e, x, y) {
            var coord = arguments[scroll.dragCoord];
            if(coord == Math.round(scroll.size.scrollDiff)) {
                coord = scroll.size.scrollDiff;
            }
            var pos = Math.round(coord / scroll.size.scrollDiff * scroll.size.elementDiff);
            scroll.wrapper.css(scroll.position, - pos + 'px');
        };
        
        box.bind(bindings);
    };
    
    var clickToPosition = function(e, scroll) {
        e.preventDefault();
        var t = $(e.target), pos;
        if(t.hasClass(config.btnPrevCls)) {
            pos = Math.round(scroll.getWrapperOffset() + scroll.moveBy);
            scroll.moveContentTo(pos);
        } else if(t.hasClass(config.btnNextCls)) {
            pos = Math.round(scroll.getWrapperOffset() - scroll.moveBy);
            scroll.moveContentTo(pos);
        } else if(t.hasClass(config.gutterCls)) {
            var coord = scroll.position == 'top' ? e.pageY : e.pageX;
            pos = coord - scroll.gutter.getXY()[scroll.position] - Math.round(scroll.size.bar / 2);
            scroll.moveBarTo(pos);
        }
        t = null;
    };
    
    var wheelEvent = function(e, scroll) {
        if(!scroll.disabled) {
            e.preventDefault();
            var n = e.detail ? - e.detail / 3 : e.wheelDelta / 120;
            var pos = Math.round(scroll.getWrapperOffset() + (n * scroll.moveBy));
            scroll.moveContentTo(pos);
        }
    };
    local.wheelEventForScroll = wheelEvent;
    
    var dimTotal = {
        top: 'offsetHeight',
        left: 'offsetWidth'
    };
    
    var dimPartial = {
        top: 'height',
        left: 'width'
    };
    
    // @todo add some events
    var Scroll = function(datas) {
        this.initialize(datas);
    };
    Scroll.prototype = {
        initialize: function(datas) {
            var that = this;
            
            that.id = datas.id;
            
            that.direction = datas.horizontal ? 'horizontal' : 'vertical';
            that.position = that.direction == 'vertical' ? 'top' : 'left';
            that.moveBy = (!isNaN(datas.moveBy) && datas.moveBy > 0) ? datas.moveBy : null;
            that.barMinSize = (!isNaN(datas.barMinSize) && datas.barMinSize > 10) ? datas.barMinSize : 10;
            
            that.element = $(datas.element);
            var wrapHTML = config.wrapContent.replace('{$wrapContentCls}', config.wrapContentNoScrollCls);
            if(!that.element.html()) {
                that.element.html(wrapHTML);
            } else {
                that.element.wrapInner(wrapHTML);
            }
            that.wrapper = that.element.children();
            
            var insertMethod = datas.insertMethod || 'prependTo',
                insertTarget = datas.insertTarget || that.element;
            
            // @todo add support for scroll without bar
            if(!datas.bar && !datas.buttons) {
                datas.bar = true;
            }
            that.scrollbar = $(getScrollbarHTML(datas.bar, datas.buttons))[insertMethod](insertTarget);
            if(datas.bar) {
                that.gutter = that.scrollbar.find('.' + config.gutterCls);
                that.bar = that.scrollbar.find('.' + config.barCls);
            }
            
            that.dragId = that.id + 'Scroll';
            that.dragCoord = that.position == 'top' ? 2 : 1;
            addBarDraggable(this);
            
            box.fire({type: 'beforefirstcompute', component: 'scroll', id: that.id, source: that});
            
            that.compute();
            
            if(that.wrapper.find('img').length && !box.loadIsDone) {
                $(W).load(function() {
                    that.compute();
                });
            }
            
            box.fire({type: 'init', component: 'scroll', id: that.id, source: that});
        },
        
        disable: function() {
            if(this.disabled !== true) {
                this.scrollbar.css('visibility', 'hidden');
                this.wrapper.removeClass(config.wrapContentScrollCls).addClass(config.wrapContentNoScrollCls);
                
                box.ui('draggable.' + this.dragId).disable();
                this.element.unbind('DOMMouseScroll').unbind('mousewheel');
                this.scrollbar.unbind('click');
                
                this.disabled = true;
            }
            return this;
        },
        
        enable: function() {
            var that = this;
            if(that.disabled !== false) {
                that.element.bind('DOMMouseScroll', function(e) {
                    wheelEvent(e, that);
                }).bind('mousewheel', function(e) {
                    wheelEvent(e, that);
                });
                
                that.scrollbar.click(function(e) {
                    clickToPosition(e, that);
                });
                
                box.ui('draggable.' + that.dragId).enable();
                
                that.wrapper.removeClass(config.wrapContentNoScrollCls).addClass(config.wrapContentScrollCls);
                
                // scrollbar should always be above the wrapper to be accessible
                var zIndex = parseInt(that.wrapper.css('zIndex'), 10);
                that.scrollbar.css({zIndex: isNaN(zIndex) ? 1 : ++zIndex, visibility: 'visible'});
                
                that.disabled = false;
            }
            return that;
        },
        
        reposition: function() {
            this.wrapper.css(this.position, 0);
            this.bar.css(this.position, 0);
            return this;
        },
        
        compute: function() {
            this.size = {};
            
            this.size.element = this.element[dimPartial[this.position]]();
            this.size.wrapper = this.wrapper[0][dimTotal[this.position]];
            
            if(this.size.wrapper > this.size.element) {
                this.size.gutter = this.gutter[0][dimTotal[this.position]];
                this.size.bar = this.size.element / this.size.wrapper * this.size.gutter;
                
                if(this.size.bar < this.barMinSize) {
                    this.size.bar = this.barMinSize;
                }
                
                // debug IE6 with bottom/right positioning inside bar
                if(W.ie6 && Math.round(this.size.bar) % 2 !== 0) {
                    this.size.bar = Math.round(this.size.bar) - 1;
                }
                
                this.size.scrollDiff = this.size.gutter - this.size.bar;
                this.size.elementDiff = this.size.wrapper - this.size.element;
                
                this.bar.css(dimPartial[this.position], Math.round(this.size.bar) + 'px');
                
                if(!this.moveBy) {
                    var amount = Math.ceil((this.size.gutter - this.size.bar) / this.size.gutter * this.size.bar);
                    this.moveBy = (amount > 10) ? amount : 10;
                }
                
                var dragMax = {};
                if(this.direction == 'horizontal') {
                    dragMax.maxX = Math.round(this.size.scrollDiff);
                } else {
                    dragMax.maxY = Math.round(this.size.scrollDiff);
                }
                box.ui('draggable.' + this.dragId).setMinMax(dragMax);
                
                box.fire({type: 'computesuccess', component: 'scroll', id: this.id, source: this});
                this.enable();
            } else {
                this.disable();
            }
            return this;
        },
        
        getWrapperOffset: function() {
            return parseInt(this.wrapper.css(this.position), 10) || 0;
        },
        
        moveBarTo: function(scrollPos) {
            if(!this.disabled && !isNaN(scrollPos)) {
                if(scrollPos < 0) {
                    scrollPos = 0;
                } else if(scrollPos > this.size.scrollDiff) {
                    scrollPos = this.size.scrollDiff;
                }
                var wrapperPos = - Math.round(Math.abs(scrollPos) / this.size.scrollDiff * this.size.elementDiff);
                this.wrapper.css(this.position, wrapperPos + 'px');
                this.bar.css(this.position, Math.round(scrollPos) + 'px');
            }
            return this;
        },
        
        moveContentTo: function(wrapperPos) {
            if(!this.disabled && !isNaN(wrapperPos)) {
                if(wrapperPos > 0) {
                    wrapperPos = 0;
                } else if(wrapperPos < -this.size.elementDiff) {
                    wrapperPos = -this.size.elementDiff;
                }
                var scrollPos = Math.round(Math.abs(wrapperPos) / this.size.elementDiff * this.size.scrollDiff);
                this.wrapper.css(this.position, Math.round(wrapperPos) + 'px');
                this.bar.css(this.position, scrollPos + 'px');
            }
            return this;
        },
        
        moveToElement: function(elm) {
            if(!this.disabled) {
                if(typeof elm == 'string') {
                    elm = this.wrapper.find(elm);
                }
                if(elm && elm.jquery && elm.length) {
                    var targetStart = elm.getXY('positioned-ancestor')[this.position];
                    var targetDim = elm['get' + (this.position == 'top' ? 'Height' : 'Width')]('margin-box');
                    var targetEnd = targetStart + targetDim;
                    
                    var offset = -this.getWrapperOffset();
                    var visibleEnd = offset + this.size.element;
                    
                    if(targetStart < offset) {
                        this.moveContentTo(-targetStart);
                    } else if(targetEnd > visibleEnd) {
                        if(targetDim < this.size.element) {
                            this.moveContentTo(-(targetEnd - this.size.element));
                        } else {
                            this.moveContentTo(-targetStart);
                        }
                    }
                }
            }
            return this;
        }
    };
    
})();

// @todo API addItem, removeItem
// @todo add mousewheel support for "scrolling" the carousel ?
// @todo add support for a movePerItems configuration property
// @todo check pagination (working strangely when carousel is circular)
// @todo add some events

(function() {
    
    var config = {
        btnPrev: '<a href="#" class="{$btnPrevCls} {$btnDisabledCls}">' + l10n.prev + '</a>',
        btnPrevCls: 'prev',
        
        btnNext: '<a href="#" class="{$btnNextCls} {$btnDisabledCls}">' + l10n.next + '</a>',
        btnNextCls: 'next',
        
        btnDisabledCls: 'off',
        
        pagesWrap: '<div class="{$pagesWrapCls}"><ul>{$content}</ul></div>',
        pagesWrapCls: 'pagination',
        
        pagesItem: '<li{$pagesItemActiveCls}><a href="#">{$content}</a></li>',
        pagesItemActiveCls: 'on'
    };
    
    uiCache.carousel = {
        create: function(datas) {
            datas.id = datas.id || $(datas.element).getAnId();
            var id = 'carousel.' + datas.id;
            return uiCache[id] || (uiCache[id] = new Carousel(datas));
        },
        
        destroy: function() {
            var i = arguments.length, id;
            while(i--) {
                id = 'carousel.' + arguments[i];
                if(uiCache[id]) {
                    // @todo unbind before deleting
                    delete uiCache[id];
                }
            }
        },
        
        configure: function(datas) {
            for(var i in datas) {
                if(datas.hasOwnProperty(i) && config[i] !== undefined) {
                    config[i] = datas[i];
                }
            }
        }
    };
    
    var getBtnsHTML = function(type) {
        type = type == 'next' ? 'btnNext' : 'btnPrev';
        return config[type]
            .replace('{$' + type + 'Cls}', config[type + 'Cls'])
            .replace('{$btnDisabledCls}', config.btnDisabledCls);
    };
    
    var getPosition = function(carousel) {
        return parseInt(carousel.moveable.css(carousel.property), 10) || 0;
    };
    
    var getIndex = function(carousel, index) {
        if(isNaN(index)) {
            return 0;
        } else if(index < 0) {
            return index + carousel.length;
        } else if(index < carousel.length) {
            return index;
        } else {
            return index - carousel.length;
        }
    };
    
    var setCurrent = function(carousel, index) {
        carousel.current = getIndex(carousel, index);
        if(carousel.currentPage !== undefined) {
            var page = Math.ceil((carousel.current + carousel.display) / carousel.display);
            $('li', carousel.pagination)
                .eq(carousel.currentPage - 1)
                    .removeClass(config.pagesItemActiveCls)
                .end()
                .eq(page - 1)
                    .addClass(config.pagesItemActiveCls);
            carousel.currentPage = page;
        }
    };
    
    var prepareCircularMovePrev = function(carousel, index) {
        if(carousel.autoplay) {
            carousel.pauseAutoplay();
        }
        
        carousel.moving = true;
        
        var actualPos = getPosition(carousel);
        var futurePos = actualPos + carousel.moveBy * (carousel.current - index);
        var itemPos = parseInt(carousel.items.eq(carousel.current).css(carousel.property), 10);
        
        var min = index - (carousel.hasOffset && actualPos % carousel.moveBy ? 1 : 0);
        var max = carousel.current;
        var c, pos;
        
        for(var i = min; i < max; i++) {
            c = getIndex(carousel, i);
            pos = itemPos - (carousel.current - i) * carousel.moveBy;
            carousel.items.eq(c).css(carousel.property, pos + 'px');
        }
        
        setCurrent(carousel, index);
        moveToPosition(carousel, futurePos);
    };
    
    var prepareCircularMoveNext = function(carousel, index) {
        if(carousel.autoplaying) {
            carousel.pauseAutoplay();
        }
        
        carousel.moving = true;
        
        var actualPos = getPosition(carousel);
        var futurePos = actualPos + (-carousel.moveBy * (index - carousel.current));
        var itemPos = parseInt(carousel.items.eq(carousel.current).css(carousel.property), 10) + carousel.display * carousel.moveBy;
        
        var min = carousel.current + carousel.display - (carousel.hasOffset && actualPos % carousel.moveBy ? 1 : 0);
        var max = index + carousel.display - (carousel.hasOffset && actualPos % carousel.moveBy ? 1 : 0);
        var c, pos;
        
        for(var i = min; i < max; i++) {
            c = getIndex(carousel, i);
            pos = itemPos + (i - carousel.display - carousel.current) * carousel.moveBy;
            carousel.items.eq(c).css(carousel.property, pos + 'px');
        }
        
        setCurrent(carousel, index);
        moveToPosition(carousel, futurePos);
    };
    
    var prepareMove = function(carousel, index) {
        if(carousel.autoplaying) {
            carousel.pauseAutoplay();
        }
        
        carousel.moving = true;
        
        index = Math.min(index, carousel.length - carousel.display);
        if(carousel.buttons) {
            if(!index) {
                carousel.buttonPrev.addClass(config.btnDisabledCls);
                carousel.buttonNext.removeClass(config.btnDisabledCls);
            } else if(index == carousel.length - carousel.display) {
                carousel.buttonPrev.removeClass(config.btnDisabledCls);
                carousel.buttonNext.addClass(config.btnDisabledCls);
            } else {
                carousel.buttonPrev.removeClass(config.btnDisabledCls);
                carousel.buttonNext.removeClass(config.btnDisabledCls);
            }
        }
        
        setCurrent(carousel, index);
        moveToPosition(carousel, -carousel.moveBy * index);
    };
    
    var positionFirstElements = function(carousel, fromReposition) {
        var min = (carousel.hasOffset && carousel.offset) ? carousel.startAt - 1 : carousel.startAt;
        var max = min + carousel.length;
        var c, pos;
        for(var i = min; i < max; i++) {
            c = getIndex(carousel, i);
            carousel.items.eq(c).css(carousel.property, i * carousel.moveBy + 'px');
        }
    };
    
    var checkRepositionFirstElements = function(carousel, to) {
        if(carousel.circular && to == (-(carousel.length * carousel.moveBy) + carousel.offset)) {
            carousel.moveable.css(carousel.property, carousel.offset + 'px');
            positionFirstElements(carousel, true);
        }
    };
    
    var moveToPosition = function(carousel, to) {
        box.fire({type: 'startmove', component: 'carousel', id: carousel.id, source: carousel});
        if(carousel.duration) {
            var p = {};
            p[carousel.property] = to;
            carousel.moveable.animate(p, carousel.duration, function() {
                checkRepositionFirstElements(carousel, to);
                if(carousel.autoplaying) {
                    carousel.startAutoplay(carousel.autoplay);
                }
                carousel.moving = false;
                box.fire({type: 'endmove', component: 'carousel', id: carousel.id, source: carousel});
            });
        } else {
            carousel.moveable.css(carousel.property, to + 'px');
            checkRepositionFirstElements(carousel, to);
            if(carousel.autoplaying) {
                carousel.startAutoplay(carousel.autoplay);
            }
            carousel.moving = false;
            box.fire({type: 'endmove', component: 'carousel', id: carousel.id, source: carousel.id});
        }
    };
    
    var getPageNumber = function(carousel) {
        return Math.ceil(carousel.length / carousel.display);
    };
    
    var getPrevPageIndex = function(carousel) {
        var page = carousel.currentPage - 1;
        if(page < 1) {
            page = carousel.circular ? getPageNumber(carousel) : 1;
        }
        return page * carousel.display - carousel.display;
    };
    
    var getNextPageIndex = function(carousel) {
        var page = carousel.currentPage + 1;
        if(page > getPageNumber(carousel)) {
            page = carousel.circular ? 1 : getPageNumber(carousel);
        }
        return page * carousel.display - carousel.display;
    };
    
    var managePagination = function(e, carousel) {
        if(e.target.nodeName.toLowerCase() == 'a') {
            e.preventDefault();
            if(!carousel.moving) {
                carousel.moveToItem((Number($(e.target).text()) - 1) * carousel.display + 1);
            }
        }
    };
    
    var Carousel = function(datas) {
        this.initialize(datas);
    };
    Carousel.prototype = {
        initialize: function(datas) {
            var that = this;
            
            that.id = datas.id;
            
            that.property = datas.horizontal ? 'left' : 'top';
            that.buttons = datas.buttons === false ? false : true;
            that.circular = !!datas.circular || false;
            that.duration = !isNaN(datas.duration) ? datas.duration : null;
            that.autoplay = !isNaN(datas.autoplay) && datas.autoplay > 10 && that.circular ? datas.autoplay : null;
            that.hasOffset = !!datas.hasOffset;
            
            that.element = $(datas.element);
            that.mask = datas.mask ? that.element.find(datas.mask) : that.element.children();
            that.moveable = datas.moveable ? that.mask.find(datas.moveable) : that.mask.children();
            that.items = datas.items ? that.moveable.find(datas.items) : that.moveable.children();
            
            that.length = that.items.length;
            that.display = datas.display;
            that.startAt = !isNaN(datas.startAt) ? datas.startAt - 1 : 0;
            // startAt must be >= 0 && < length
            if(that.startAt < 0 || that.startAt >= that.length) {
                that.startAt = 0;
            }
            
            that.offset = parseInt(that.moveable.css(that.property), 10) || 0;
            // negative offset are forbidden
            // if offset, length must be > display + 1
            // no offset possible on a non circular carousel
            // a paginated carousel cannot be circular (too strange)
            if(that.hasOffset && that.offset > 0 && that.length > that.display + 1) {
                ++that.display;
            }
            that.moveBy = that.items.eq(0)[that.property == 'top' ? 'outerHeight' : 'outerWidth'](true);
            
            setCurrent(that, that.startAt);
            
            if(that.property == 'left') {
                that.moveable.width(that.moveBy * that.length);
            }
            if(that.circular) {
                positionFirstElements(that);
            }
            
            if(that.length > that.display) {
                that.disabled = false;
                
                if(!that.circular && that.current > that.length - that.display) {
                    that.current = that.length - that.display;
                }
                
                if(that.current) {
                    that.moveable.css(that.property, -that.moveBy * that.current + that.offset);
                    that.offset = -that.moveBy * that.current + that.offset;
                }
                
                if(that.buttons) {
                    that.buttonNext = $(getBtnsHTML('next')).appendTo(that.element).click(function(e) {
                        that.moveNext(e);
                        e.preventDefault();
                    });
                    that.buttonPrev = $(getBtnsHTML('prev')).prependTo(that.element).click(function(e) {
                        that.movePrev(e);
                        e.preventDefault();
                    });
                    
                    if(that.circular || that.current) {
                        that.buttonPrev.removeClass(config.btnDisabledCls);
                    }
                    if(that.circular || that.current + that.display < that.length) {
                        that.buttonNext.removeClass(config.btnDisabledCls);
                    }
                }
                
                if(datas.paginate) {
                    that.addPagination();
                }
                
                if(that.autoplay) {
                    that.startAutoplay(that.autoplay);
                }
            } else {
                that.disabled = true;
            }
        },
        
        movePrev: function() {
            if(!this.moving) {
                var index = !isNaN(this.currentPage) ? getPrevPageIndex(this) : this.current - 1;
                if(this.circular) {
                    prepareCircularMovePrev(this, index);
                } else if(index > -1) {
                    prepareMove(this, index);
                }
            }
        },
        
        moveNext: function() {
            if(!this.moving) {
                var index = !isNaN(this.currentPage) ? getNextPageIndex(this) : this.current + 1;
                if(this.circular) {
                    prepareCircularMoveNext(this, index);
                } else if(index < this.length) {
                    prepareMove(this, index);
                }
            }
        },
        
        moveToItem: function(i) {
            if(!this.moving && typeof i == 'number') {
                --i;
                if(this.items[i]) {
                    if(this.currentPage) {
                        var page = Math.floor(i / this.display) + 1;
                        i = (page - 1) * this.display;
                    }
                    if(this.circular) {
                        if(i > this.current && i - this.current > this.length - i) {
                            i = i - this.length;
                        } else if(i < this.current && this.current - i > i + this.length - this.current) {
                            i = this.length + i;
                        }
                        if(i < this.current) {
                            prepareCircularMovePrev(this, i);
                        } else if(i > this.current) {
                            prepareCircularMoveNext(this, i);
                        }
                    } else {
                        prepareMove(this, i);
                    }
                }
            }
        },
        
        startAutoplay: function(delay) {
            var that = this;
            if(that.circular && (!isNaN(delay) || that.autoplay)) {
                if(isNaN(delay)) {
                    delay = that.autoplay;
                } else {
                    that.autoplay = delay;
                }
                that.autoplaying = true;
                that.timer = W.setInterval(function() {
                    that.moveNext();
                }, delay);
            }
        },
        
        pauseAutoplay: function() {
            W.clearInterval(this.timer);
            this.timer = null;
        },
        
        endAutoplay: function() {
            this.pauseAutoplay();
            this.autoplaying = false;
        },
        
        addPagination: function() {
            var that = this;
            var html = config.pagesWrap.replace('{$pagesWrapCls}', config.pagesWrapCls);
            var pages = getPageNumber(that);
            var startItem, endItem, items = '';
            for(var i = 1; i <= pages; i++) {
                startItem = (i - 1) * that.display;
                endItem = startItem + that.display - 1;
                if(that.startAt >= startItem && that.startAt <= endItem) {
                    that.currentPage = i;
                    items += config.pagesItem.replace('{$pagesItemActiveCls}', ' class="' + config.pagesItemActiveCls + '"');
                } else {
                    items += config.pagesItem.replace('{$pagesItemActiveCls}', '');
                }
                items = items.replace(/{\$content}/g, i);
            }
            html = html.replace('{$content}', items);
            this.pagination = $(html).appendTo(that.element).click(function(e) {
                managePagination(e, that);
            });
        },
        
        removePagination: function() {
            this.pagination.unbind('click').remove();
        }
    };
    
})();

(function() {
    
    var config = {
        activeCls: 'on'
    };
    
    uiCache.tabs = {
        create: function(datas) {
            datas.id = datas.id || $(datas.element).getAnId();
            if(datas.id) {
                var id = 'tabs.' + datas.id;
                return uiCache[id] || (uiCache[id] = new Tabs(datas));
            }
        },
        
        destroy: function() {
            var i = arguments.length, id;
            while(i--) {
                id = 'tabs.' + arguments[i];
                if(uiCache[id]) {
                    uiCache[id].disable();
                    delete uiCache[id];
                }
            }
        },
        
        configure: function(datas) {
            for(var i in datas) {
                if(datas.hasOwnProperty(i) && config[i] !== undefined) {
                    config[i] = datas[i];
                }
            }
        }
    };
    
    var clickOnLinksList = function(e, tabs) {
        e.preventDefault();
        if(!tabs.waiting) {
            var t = e.target;
            while(t && t != this) {
                if(t.nodeName.toLowerCase() == 'a') {
                    tabs.open(t.href.replace(/.*#tab=(.+)/, '$1'));
                    break;
                }
                t = t.parentNode;
            }
            t = null;
        // } else {
        //     e.preventDefault();
        }
    };
    
    var openTab = function(tabs) {
        $('#' + tabs.waiting).addClass(config.activeCls);
        tabs.active = tabs.waiting;
        tabs.waiting = null;
        box.fire({type: 'open', component: 'tabs', id: tabs.id, source: tabs});
    };
    
    var closeTab = function(tabs) {
        $('#' + tabs.active).removeClass(config.activeCls);
        box.fire({type: 'close', component: 'tabs', id: tabs.id, source: tabs});
    };
    
    var setBindings = function(tabs) {
        var bindings = {};
        bindings['open.tabs.' + tabs.id] = function(e) {
            openTab(e.source);
        };
        bindings['close.tabs.' + tabs.id] = function(e) {
            closeTab(e.source);
            tabs.phase = 'open';
            box.fire({type: 'beforeopen', component: 'tabs', id: e.id, source: e.source});
        };
        box.bind(bindings);
    };
    
    var Tabs = function(datas) {
        this.initialize(datas);
    };
    Tabs.prototype = {
        initialize: function(datas) {
            var that = this;
            
            that.id = datas.id;
            that.element = $(datas.element);
            
            that.element.find('a').each(function(i, link) {
                var id = link.href.replace(/.+#(.+)/, '$1');
                if(id) {
                    link.href = '#tab=' + id;
                    if($(link.parentNode).hasClass(config.activeCls)) {
                        that.active = id;
                    }
                }
            });
            
            var directAccess = box.getURLHashParts().tab;
            if(directAccess) {
                that.open(directAccess);
                that.active = directAccess;
            }
            
            that.animated = !!datas.animated;
            if(that.animated) {
                setBindings(that);
            }
            
            that.enable();
            
            box.fire({type: 'init', component: 'tabs', id: that.id, source: that});
        },
        
        disable: function() {
            if(this.disabled !== true) {
                this.element.unbind('click');
                this.disabled = true;
            }
            return this;
        },
        
        enable: function() {
            var that = this;
            if(that.disabled !== false) {
                that.element.click(function(e) {
                    clickOnLinksList(e, that);
                });
                that.disabled = false;
            }
            return that;
        },
        
        open: function(id) {
            if(!this.waiting && id && id != this.active && D.getElementById(id)) {
                this.waiting = id;
                this.close();
                $('a[href$=#tab=' + id + ']', this.element).parent().addClass(config.activeCls);
                if(!this.animated) {
                    openTab(this);
                }
            }
        },
        
        close: function() {
            if(this.active) {
                $('a[href$=#tab=' + this.active + ']', this.element).parent().removeClass(config.activeCls);
                if(this.animated) {
                    this.phase = 'close';
                    box.fire({type: 'beforeclose', component: 'tabs', id: this.id, source: this});
                } else {
                    closeTab(this);
                }
            }
        },
        
        animate: function(styles, duration) {
            var that = this;
            if(typeof styles == 'object' && !isNaN(duration)) {
                var id = that.phase == 'open' ? that.waiting : that.active;
                $('#' + id).animate(styles, duration, function() {
                    box.fire({type: that.phase, component: 'tabs', id: that.id, source: that});
                });
            }
        }
    };
    
})();

(function() {
    
    var config = {
        webbox: false,
        focusCls: 'focus',
        checkedCls: 'checked',
        selectedCls: 'selected',
        hoverCls: 'hover',
        
        fauxSelectCls: 'fauxSelect',
        
        fauxOptions: '<div id="{$fauxOptionsId}" style="position:absolute; top:-10000px; left:-10000px"></div>',
        fauxOptionsId: 'fauxOptions',
        fauxOptionsMaxHeight: 200,
        fauxOptionsScrollbarOffset: 0
    };
    
    var patterns = {
        empty: /^\s*$/
        ,email: /^\s*[\w-]+(\.[\w-]+)*@([\w-]+\.)+[A-Za-z]{2,7}\s*$/
    };
    
    var rules = {
        empty: function(value) {
            return patterns.empty.test(value);
        },email: function(value) {
            return patterns.email.test(value);
        }
    };
    
    uiCache.form = {
        init: 'init phase',
        noBroadcast: 'no event broadcast',
        
        addPatterns: function(datas) {
            for(var p in datas) {
                if(datas.hasOwnProperty(p)) {
                    (function(pattern, key) {
                        patterns[key] = pattern;
                        rules[key] = function(value) {
                            return pattern.test(value);
                        };
                    })(datas[p], p);
                }
            }
        },
        
        create: function(datas) {
            datas.element = $(datas.element);
            if(datas.element.length == 1) {
                datas.id = datas.element[0].id;
                if(datas.id) {
                    var id = 'form.' + datas.id;
                    return uiCache[id] || (uiCache[id] = new Form(datas));
                }
            }
        },
        
        destroy: function() {
            var i = arguments.length, id;
            while(i--) {
                id = 'form.' + arguments[i];
                if(uiCache[id]) {
                    if(uiCache[id].submitHref) {
                        uiCache[id].submit.attr('href', uiCache[id].submitHref);
                    }
                    unbindFormSubmit(uiCache[id]);
                    uiCache[id].clearErrors().removeValidation().removeReplacement();
                    uiCache[id].eachField(function(field) {
                        delete fields[field.form + '.' + field.name];
                    });
                    delete uiCache[id];
                }
            }
        },
        
        configure: function(datas) {
            for(var i in datas) {
                if(datas.hasOwnProperty(i) && config[i] !== undefined) {
                    config[i] = datas[i];
                }
            }
        }
    };
    
    var fields = {};
    
    var types = {
        'checkbox': 'checkbox',
        'hidden': 'text',
        'password': 'text',
        'radio': 'radio',
        'select-one': 'select',
        'text': 'text',
        'textarea': 'text'
    };
    
    // only for webbox platform
    var reExtractFieldName = /ctl[0-9]+[$_]/g;
    var extractFieldName = function(name) {
        return name.replace(reExtractFieldName, '');
    };
    
    var getFieldCacheId = function(fieldName, formName) {
        return formName + '.' + fieldName;
    };
    var counterForCommonRoot = 0;
    
    
    
    
    
    
    
    
    
    var validateForm = function(e) {
        var id = this.nodeName.toLowerCase() == 'form' ? this.id : $(this).getBoxDatas('form'), form;
        if(form = uiCache['form.' + id]) {
            if(form.mustValidateRules) {
                if(!form.isValid()) {
                    e.preventDefault();
                    box.fire({type: 'submit', component: 'form', id: id, source: form, valid: false}, e);
                } else {
                    box.fire({type: 'submit', component: 'form', id: id, source: form, valid: true}, e);
                }
            } else {
                box.fire({type: 'submit', component: 'form', id: id, source: form}, e);
            }
        }
    };
    
    var bindFormSubmit = function(form) {
        if(form.submitName) {
            form.submit.bind('click.boxValidation', validateForm);
        } else {
            form.dom.bind('submit.boxValidation', validateForm);
        }
    };
    
    var unbindFormSubmit = function(form) {
        if(form.submitName) {
            form.submit.unbind('click.boxValidation');
        } else {
            form.dom.unbind('submit.boxValidation');
        }
    };
    
    
    
    
    
    
    
    
    
    var Form = function(datas) {
        this.initialize(datas);
    };
    Form.prototype = {
        initialize: function(datas) {
            var that = this;
            
            that.id = datas.id;
            that.dom = datas.element;
            that.fields = [];
            that.submit = datas.submit !== undefined ? $(datas.submit, that.dom) : null;
            if(that.submit && 1 == that.submit.length) { // do not check for webbox here (diags)
                if(that.submit.outerHTML().indexOf('doPostBack') > -1) {
                    var n = that.submit[0].href.match(/'([^']+)'/);
                    that.submitName = n && n[1];
                    that.submitHref = that.submit.attr('href');
                    that.submit.attr('href', '#').setBoxDatas({form: that.id});
                }
            }
            bindFormSubmit(that);
            
            $('input, select, textarea', that.dom).each(function(i, elm) {
                if(elm.id && elm.name && elm.type && types[elm.type]) {
                    var type = types[elm.type];
                    var name;
                    if('radio' == type) {
                        name = config.webbox ? extractFieldName(elm.name) : elm.name;
                    } else {
                        name = config.webbox ? extractFieldName(elm.id) : elm.id;
                    }
                    var id = getFieldCacheId(name, that.id);
                    
                    // check for common root ids (Alsy diags)
                    if(config.webbox && 'radio' != type && fields[id]) {
                        ++counterForCommonRoot;
                        name = name + counterForCommonRoot;
                        id = id + counterForCommonRoot;
                        elm.id = name;
                    }
                    
                    if(!fields[id]) {
                        if('radio' == type) {
                            if(that.dom[0].nodeName.toLowerCase() == 'form') {
                                elm = that.dom[0].elements[elm.name];
                            } else {
                                elm = D.forms[0].elements[elm.name];
                            }
                        }
                        fields[id] = new makeField[type]($(elm), type, name, that.id);
                        that.fields.push(id);
                    }
                }
            });
        },
        
        getElement: function() {
            return this.dom;
        },
        
        field: function(name) {
            return fields[getFieldCacheId(name, this.id)] || null;
        },
        
        eachField: function(fn) {
            var i = this.fields.length, l = i - 1;
            while(i--) {
                if(false === fn(fields[this.fields[l - i]])) {
                    break;
                }
            }
            return this;
        },
        
        mustValidate: function(rules) {
            if(!this.mustValidateRules) {
                var msg = rules(this);
                if('string' == typeof msg) {
                    this.msg = msg;
                }
                this.mustValidateRules = true;
            }
            return this;
        },
        
        removeValidation: function() {
            this.eachField(function(field) {
                if(field.rule) {
                    field.removeValidation();
                }
            });
            return this;
        },
        
        getErrors: function() {
            var i = 0, errors = {};
            this.eachField(function(field) {
                if(field.error) {
                    errors[field.name] = field.error;
                    ++i;
                }
            });
            return (i ? errors : null);
        },
        
        setErrors: function(errors) {
            if('object' == typeof errors) {
                var id;
                for(var name in errors) {
                    id = getFieldCacheId(name, this.id);
                    if(errors.hasOwnProperty(name) && fields[id]) {
                        fields[id].setError(errors[name]);
                    }
                }
            }
            return this;
        },
        
        clearErrors: function() {
            this.eachField(function(field) {
                field.clearError();
            });
            box.fire({type: 'submit', component: 'form', id: this.id, source: this, valid: true});
            return this;
        },
        
        isValid: function(noBroadcast) {
            this.validate(noBroadcast === box.ui('form').noBroadcast ? box.ui('form').noBroadcast : undefined);
            var valid = true;
            this.eachField(function(field) {
                if(field.error) {
                    return (valid = false);
                }
            });
            return valid;
        },
        
        validate: function(noBroadcast) {
            this.eachField(function(field) {
                if(undefined !== field.rule) {
                    field.validate(noBroadcast);
                }
            });
            return this;
        },
        
        addReplacement: function(options) {
            this.eachField(function(field) {
                if(undefined !== field.addReplacement) {
                    field.addReplacement(options);
                }
            });
            return this;
        },
        
        removeReplacement: function() {
            this.eachField(function(field) {
                if(undefined !== field.removeReplacement) {
                    field.removeReplacement();
                }
            });
            return this;
        }
    };
    
    
    
    
    
    
    
    
    
    var getFieldLabel = function(field) {
        if(field.jquery) {
            field = $(field);
        }
        var label = field.next('label');
        if(!label.length) {
            label = field.prev('label');
            if(!label.length && field.parent().length) {
                label = field.parent('label');
                if(!label.length) {
                    label = getFieldLabel(field.parent());
                }
            }
        }
        return label;
    };
    
    
    
    
    
    
    
    
    
    
    var getFieldValidationEventName = function(type) {
        var evt;
        switch(type) {
            case 'checkbox':
            case 'radio':
                evt = 'click.boxValidation';
                break;
            case 'select':
                evt = 'change.boxValidation';
                break;
            case 'text':
                evt = 'blur.validation';
        }
        return evt;
    };
    
    var validateField = function(e) {
        var id = $(this).getBoxDatas('id');
        if(id && fields[id]) {
            fields[id].validate();
        }
    };
    
    var bindFieldRule = function(field) {
        field.dom.bind(getFieldValidationEventName(field.type), validateField);
    };
    
    var unbindFieldRule = function(field) {
        field.dom.unbind(getFieldValidationEventName(field.type));
    };
    
    
    
    
    
    
    
    
    
    var getFieldChangeEventName = function(type) {
        var evt;
        switch(type) {
            case 'checkbox':
            case 'radio':
            case 'select':
                evt = 'click.boxChange';
                break;
            case 'text':
                evt = 'change.boxChange';
        }
        return evt;
    };
    
    var changeField = function(e) {
        var id = $(this).getBoxDatas('id');
        var field = id && fields[id];
        if(field) {
            var type = field.type;
            if('checkbox' == type || 'radio' == type) {
                field[this.checked ? 'check' : 'uncheck'](extractFieldName(this.id));
            } else if('select' == field.type) {
                if(field.getIndex() != field.current) {
                    field.setIndex(field.getIndex());
                }
            } else {
                box.fire({type: 'change', component: 'field.' + field.type, id: field.name, source: field});
            }
        }
    };
    
    var bindFieldChange = function(field) {
        field.dom.bind(getFieldChangeEventName(field.type), changeField);
    };
    
    var unbindFieldChange = function(field) {
        field.dom.unbind(getFieldChangeEventName(field.type));
    };
    
    
    
    
    
    
    
    
    
    var disableField = function(field) {
        unbindFieldChange(field);
        if('select' == typeof field.type) {
            unbindSelectKeyNav(field);
        }
        field.dom.each(function(i, elm) {
            elm.disabled = true;
        });
        box.fire({type: 'disable', component: 'field.' + field.type, id: field.name, source: field});
    };
    
    var enableField = function(field, init) {
        bindFieldChange(field);
        if('select' == field.type) {
            bindSelectKeyNav(field);
        }
        if(init != uiCache.form.init) {
            field.dom.each(function(i, elm) {
                elm.disabled = false;
            });
        }
        box.fire({type: (init == uiCache.form.init ? 'init' : 'enable'), component: 'field.' + field.type, id: field.name, source: field});
    };
    
    
    
    
    
    
    
    
    
    var Field = function(elm, type, name, form) {
        this.initialize(elm, type, name, form);
    };
    Field.prototype = {
        initialize: function(elm, type, name, form) {
            this.dom = elm;
            this.dom.setBoxDatas({id: getFieldCacheId(name, form)});
            this.type = type;
            this.name = name;
            this.form = form;
            this.error = null;
            this.enable(uiCache.form.init);
        },
        
        getElement: function() {
            return this.dom;
        },
        
        getLabel: function() {
            return getFieldLabel(this.dom);
        },
        
        getValue: function() {
            return (this.dom[0].value || null);
        },
        
        setValue: function(value) {
            this.dom[0].value = value;
            return this;
        },
        
        isDisabled: function() {
            return this.dom[0].disabled;
        },
        
        disable: function() {
            disableField(this);
            return this;
        },
        
        enable: function(init) {
            enableField(this, init);
            return this;
        },
        
        mustValidate: function(rule) {
            this.rule = rule;
            bindFieldRule(this);
            return this;
        },
        
        removeValidation: function() {
            this.rule = null;
            unbindFieldRule(this);
            return this;
        },
        
        isValid: function(noBroadcast) {
            this.validate(noBroadcast === uiCache.form.noBroadcast ? uiCache.form.noBroadcast : undefined);
            return !this.error;
        },
        
        validate: function(noBroadcast) {
            if(this.rule) {
                var r = this.rule(this);
                if('string' == typeof r) {
                    this.setError(r, noBroadcast);
                } else {
                    this.clearError();
                }
            }
            return this;
        },
        
        getError: function() {
            return this.error;
        },
        
        setError: function(error, noBroadcast) {
            if('string' == typeof error) {
                this.error = error;
                if(noBroadcast !== uiCache.form.noBroadcast) {
                    box.fire({type: 'error', component: 'field.' + this.type, id: this.name, msg: error, source: this});
                }
            }
            return this;
        },
        
        clearError: function(noBroadcast) {
            this.error = null;
            if(noBroadcast !== uiCache.form.noBroadcast) {
                box.fire({type: 'valid', component: 'field.' + this.type, id: this.name, source: this});
            }
            return this;
        },
        
        isReplaced: function() {
            return (this.dom[0].className.indexOf('mode=replaced') > -1);
        }
    };
    
    
    
    
    
    
    
    
    
    var TextField = function(elm, type, name, form) {
        this.initialize(elm, type, name, form);
    };
    inherit(TextField, Field);
    extend(TextField, {
        isDefault: function() {
            return (this.dom[0].value == this.dom[0].defaultValue);
        },
        
        clearValue: function() {
            this.dom[0].value = '';
            return this;
        },
        
        isEmpty: function() {
            return rules.empty(this.dom[0].value);
        },
        
        isMatching: function(pattern) {
            return (rules[pattern] ? rules[pattern](this.dom[0].value) : null);
        },
        
        isEqualTo: function(value) {
            return (this.dom[0].value == value);
        }
    });
    
    
    
    
    
    
    
    
    
    var focusBlurField = function(e) {
        var id = $(this).getBoxDatas('id');
        var field = id && fields[id];
        if(field) {
            if('focus' == e.type) {
                if('radio' == field.type || 'checkbox' == field.type) {
                    field.getLabel(extractFieldName(this.id)).addClass(config.focusCls);
                } else if('select' == field.type) {
                    field.getReplaced().addClass(config.focusCls);
                    // bug IE6, when clicking on a label, select the first option
                    if(W.ie6 && field.current != field.getIndex()) {
                        field.dom[0].selectedIndex = field.current;
                    }
                }
            } else {
                if('radio' == field.type || 'checkbox' == field.type) {
                    field.getLabel(extractFieldName(this.id)).removeClass(config.focusCls);
                } else if('select' == field.type) {
                    field.getReplaced().removeClass(config.focusCls);
                }
            }
        }
    };
    
    var bindFieldFocusBlur = function(field) {
        field.dom.bind('focus.boxReplacement', focusBlurField).bind('blur.boxReplacement', focusBlurField);
    };
    
    var unbindFieldFocusBlur = function(field) {
        field.dom.unbind('.boxReplacement');
    };
    
    
    
    
    
    
    
    
    
    var CheckboxField = function(elm, type, name, form) {
        this.initialize(elm, type, name, form);
    };
    inherit(CheckboxField, Field);
    extend(CheckboxField, {
        isChecked: function() {
            return this.dom[0].checked;
        },
        
        check: function() {
            this.dom[0].checked = true;
            if(this.isReplaced()) {
                this.getLabel().addClass(config.checkedCls);
            }
            box.fire({type: 'change', component: 'field.checkbox', id: this.name, source: this});
            return this;
        },
        
        uncheck: function() {
            this.dom[0].checked = false;
            if(this.isReplaced()) {
                this.getLabel().removeClass(config.checkedCls);
            }
            box.fire({type: 'change', component: 'field.checkbox', id: this.name, source: this});
            return this;
        },
        
        addReplacement: function() {
            this.dom.setBoxDatas({mode: 'replaced'});
            if(this.isChecked()) {
                this.getLabel().addClass(config.checkedCls);
            }
            bindFieldFocusBlur(this);
            box.fire({type: 'replace', component: 'field.checkbox', id: this.name, source: this});
            return this;
        },
        
        removeReplacement: function() {
            this.dom.clearBoxDatas({mode: 'replaced'});
            this.getLabel().removeClass(config.checkedCls).removeClass(config.focusCls);
            unbindFieldFocusBlur(this);
            return this;
        }
    });
    
    
    
    
    
    
    
    
    
    var RadiosGroup = function(elm, type, name, form) {
        this.initialize(elm, type, name, form);
    };
    inherit(RadiosGroup, Field);
    extend(RadiosGroup, {
        initialize: function(elm, type, name, form) {
            var that = this;
            
            that.dom = elm;
            that.type = type;
            that.name = name;
            that.form = form;
            that.error = null;
            that.length = that.dom.length;
            that.map = {};
            that.current = null;
            that.each(function(field, i) {
                that.map[extractFieldName(field.id)] = i;
                if(field.checked) {
                    that.current = extractFieldName(field.id);
                }
                $(field).setBoxDatas({id: getFieldCacheId(name, form)});
            });
            that.enable(uiCache.form.init);
        },
        
        each: function(fn) {
            var i = this.length, l = i - 1;
            while(i--) {
                if(fn(this.dom[l - i], l - i)) {
                    break;
                }
            }
            return this;
        },
        
        getChecked: function() {
            if(this.current !== null) {
                return (typeof this.current == 'number' ? this.dom[this.current] : this.dom[this.map[this.current]]);
            }
            return null;
        },
        
        getElement: function(id) {
            var f = null;
            if('string' == typeof id) {
                if(undefined !== this.map[id]) {
                    return this.dom[this.map[id]];
                }
            } else if(typeof id == 'number') {
                if(id >= 0 && id < this.length) {
                    return this.dom[id];
                }
            } else {
                f = this.getChecked();
            }
            return f;
        },
        
        getElements: function() {
            return this.dom;
        },
        
        getLabel: function(id) {
            var field = this.getElement(id);
            return (field && getFieldLabel($(field)));
        },
        
        getLabels: function() {
            return getFieldLabel(this.dom);
        },
        
        getValue: function(id) {
            if(undefined !== id) {
                var field = this.getElement(id);
                return ((field && field.value) ? field.value : null);
            } else {
                var current = this.getChecked();
                return (current && current.value);
            }
        },
        
        setValue: function(value, id) {
            if(undefined !== id) {
                var field = this.getElement(id);
                if(field) {
                    field.value = value;
                }
            } else {
                var current = this.getChecked();
                if(current) {
                    current.value = value;
                }
            }
            return this;
        },
        
        isChecked: function(id) {
            var ok = false;
            if(undefined !== id) {
                var field = this.getElement(id);
                ok = (!!field && field.checked);
            } else {
                ok = this.current !== null;
            }
            return ok;
        },
        
        check: function(id) {
            if(undefined !== id) {
                var field = this.getElement(id);
                if(field && id != this.current) {
                    field.checked = true;
                    if(this.isReplaced()) {
                        if(this.current) {
                            this.getLabel(this.current).removeClass(config.checkedCls);
                        }
                        this.getLabel(id).addClass(config.checkedCls);
                    }
                    this.current = id;
                    box.fire({type: 'change', component: 'field.radio', id: this.name, source: this});
                }
            }
            return this;
        },
        
        uncheck: function(id) {
            if(this.current) {
                var field = this.getElement(undefined !== id ? id : this.current);
                if(field && field.checked) {
                    field.checked = false;
                    if(this.isReplaced()) {
                        this.getLabel(this.current).removeClass(config.checkedCls);
                    }
                    this.current = null;
                    box.fire({type: 'change', component: 'field.radio', id: this.name, source: this});
                }
            }
            return this;
        },
        
        addReplacement: function() {
            this.dom.setBoxDatas({mode: 'replaced'});
            if(this.isChecked()) {
                this.getLabel(this.current).addClass(config.checkedCls);
            }
            bindFieldFocusBlur(this);
            box.fire({type: 'replace', component: 'field.radio', id: this.name, source: this});
            return this;
        },
        
        removeReplacement: function() {
            this.dom.clearBoxDatas({mode: 'replaced'});
            this.getLabels().removeClass(config.checkedCls).removeClass(config.focusCls);
            unbindFieldFocusBlur(this);
            return this;
        }
    });
    
    
    
    
    
    
    
    
    
    var fauxOptions, openedFauxSelect;
    
    var getFauxOptions = function(select) {
        var options = select.getOptions();
        var selected = select.getIndex();
        var i = options.length, l = i - 1, cls, html = '';
        while(i--) {
            cls = (l - i) == selected ? ' ' + config.selectedCls : '';
            html += '<li class="box[i=' + (l - i) + ']' + cls + '">' + (options[l - i].text || '&nbsp;') + '</li>';
        }
        return html;
    };
    
    var getFauxOptionIndex = function(option) {
        return option.className.match(/i=(\d+)/)[1];
    };
    
    var mouseOverOptionsIE6 = function() {
        $(this).addClass(config.hoverCls);
    };
    
    var mouseOutOptionsIE6 = function() {
        $(this).removeClass(config.hoverCls);
    };
    
    var openFauxOptions = function(select) {
        select.opened = true;
        openedFauxSelect = getFieldCacheId(select.name, select.form);
        
        box.fire({type: 'beforeopen', component: 'field.select', id: select.name, source: select});
        
        box.ui('panel.fauxOptions').element.html(getFauxOptions(select));
        box.ui('panel.fauxOptions').show();
        
        var fauxSelect = select.getReplaced();
        var fauxSelectPos = fauxSelect.getXY();
        var fauxSelectPaddingBox = fauxSelect.getSize('padding-box');
        var fauxSelectBorderBox = fauxSelect.getSize('border-box');
        
        // set width before computing height
        fauxOptions.width(fauxSelectPaddingBox.width);
        
        var fauxOptionsPaddingBox = fauxOptions.getSize('padding-box');
        var fauxOptionsHeight = Math.min(fauxOptionsPaddingBox.height, config.fauxOptionsMaxHeight);
        
        // set width before computing position
        fauxOptions.height(fauxOptionsHeight);
        var fauxOptionsBorderBox = fauxOptions.getSize('border-box');
        
        var wSize = $(W).getSize();
        var wOffset = $(W).getScroll();
        
        var top = fauxSelectPos.top + fauxSelectBorderBox.height;
        var reverse = false;
        if(top + fauxOptionsBorderBox.height > wOffset.top + wSize.height) {
            var tmp = fauxSelectPos.top - fauxOptionsBorderBox.height;
            if(tmp >= wOffset.top) {
                top = tmp;
                reverse = true;
            }
        }
        
        box.ui('mask.fauxOptions').dom.insertStyles = {width: wSize.width, height: 'document:content-box'};
        box.ui('mask.fauxOptions').show();
        
        fauxOptions.css({
            top: top,
            left: fauxSelectPos.left,
            height: fauxOptionsHeight
        });
        
        box.ui('scroll.fauxOptions').bar.parent().css('height', fauxOptionsHeight - (2 * config.fauxOptionsScrollbarOffset));
        box.ui('scroll.fauxOptions').wrapper.width(fauxSelectPaddingBox.width);
        box.ui('scroll.fauxOptions').compute().moveToElement('#' + select.form + select.name + select.getIndex());
        if(W.ie6) {
            fauxOptions.find('li').mouseover(mouseOverOptionsIE6).mouseout(mouseOutOptionsIE6);
        }
        box.fire({type: 'open', component: 'field.select', id: select.name, reverse: reverse, source: select});
    };
    
    var closeFauxOptions = function(select) {
        select.opened = false;
        fauxOptions.css({left: '-10000px', height: 'auto'});
        box.ui('mask.fauxOptions').hide();
        if(W.ie6) {
            fauxOptions.find('li').unbind('mouseover').unbind('mouseout');
        }
        box.ui('scroll.fauxOptions').disable().reposition();
        box.ui('panel.fauxOptions').hide();
    };
    
    var manageFauxSelectState = function(select) {
        if(select.isReplaced()) {
            if(select.opened) {
                closeFauxOptions(select);
            } else {
                openFauxOptions(select);
            }
        }
    };
    
    var clickOnFauxSelect = function(e) {
        var id = $(this).prev().getBoxDatas('id');
        var select = id && fields[id];
        if(select) {
            select.dom[0].focus();
            manageFauxSelectState(select);
        }
    };
    
    var bindFauxSelectClick = function(select) {
        select.getReplaced().click(clickOnFauxSelect);
    };
    
    var unbindFauxSelectClick = function(select) {
        select.getReplaced().unbind('click');
    };
    
    var clickOnFauxOptions = function(e) {
        var select = fields[openedFauxSelect];
        if(select && e.target.nodeName.toLowerCase() == 'li') {
            select.setIndex(getFauxOptionIndex(e.target));
            closeFauxOptions(select);
            select.dom[0].focus();
        }
    };
    
    var bindFauxOptionsClick = function(select) {
        fauxOptions.click(clickOnFauxOptions);
    };
    
    var unbindFauxOptionsClick = function(select) {
        fauxOptions.unbind('click');
    };
    
    var keyUpOnFauxSelect = function(e) {
        var id = $(this).getBoxDatas('id');
        var select = id && fields[id];
        if(select) {
            var k = e.which;
            if(e.altKey && (k == 38 || k == 40)) {
                manageFauxSelectState(select);
                return;
            }
            var i = select.getIndex();
            switch(k) {
                case 13:
                case 27:
                    select.setIndex(i);
                    if(select.isReplaced()) {
                        closeFauxOptions(select);
                    }
                    break;
                case 34:
                case 35:
                    select.setIndex(select.dom[0].options.length - 1);
                    break;
                case 33:
                case 36:
                    select.setIndex(0);
                    break;
                case 37:
                case 38:
                    i = (i == select.current) ? --i : i;
                    if(i < 0) {
                        i = 0;
                    }
                    select.setIndex(i);
                    break;
                case 39:
                case 40:
                    i = (i == select.current) ? ++i : i;
                    if(i >= select.dom[0].options.length) {
                        i = select.dom[0].options.length - 1;
                    }
                    select.setIndex(i);
                    break;
                default:
                    select.setIndex(i);
            }
        }
    };
    
    var keyDownOnFauxSelect = function(e) {
        var id = $(this).getBoxDatas('id');
        var select = id && fields[id];
        if(select && select.isReplaced() && 9 == e.which) {
            closeFauxOptions(select);
        }
    };
    
    var bindSelectKeyNav = function(select) {
        select.dom.bind('keyup.boxKeyNav', keyUpOnFauxSelect).bind('keydown.boxKeyNav', keyDownOnFauxSelect);
    };
    
    var unbindSelectKeyNav = function(select) {
        select.dom.unbind('.boxKeyNav');
    };
    
    box.bind({
        'endmove.draggable.fauxOptionsScroll': function(e) {
            fields[openedFauxSelect].getElement()[0].focus();
        }
    });
    
    
    
    
    
    
    
    
    
    
    var SelectField = function(elm, type, name, form) {
        this.initialize(elm, type, name, form);
    };
    inherit(SelectField, Field);
    extend(SelectField, {
        initialize: function(elm, type, name, form) {
            this.dom = elm;
            this.dom.setBoxDatas({id: getFieldCacheId(name, form)});
            this.type = type;
            this.name = name;
            this.form = form;
            this.error = null;
            this.length = this.dom[0].options ? this.dom[0].options.length : 0;
            this.current = this.dom[0].selectedIndex;
            this.enable(uiCache.form.init);
        },
        
        hasIndex: function(i) {
            return (!isNaN(i) && i >= 0 && i < this.length);
        },
        
        getIndex: function() {
            return this.dom[0].selectedIndex;
        },
        
        setIndex: function(i) {
            if(this.hasIndex(i) && i != this.current) {
                this.dom[0].selectedIndex = i;
                if(this.isReplaced()) {
                    this.getReplaced('span').html(this.getText() || '&nbsp;');
                    if(this.opened) {
                        var opts = fauxOptions.find('li');
                        opts.eq(this.current).removeClass(config.selectedCls);
                        opts.eq(i).addClass(config.selectedCls);
                        if(!box.ui('scroll.fauxOptions').disabled) {
                            box.ui('scroll.fauxOptions').moveToElement(opts.eq(i));
                        }
                        opts = null;
                    }
                    if(this.rule) {
                        this.validate();
                    }
                }
                this.current = i;
                box.fire({type: 'change', component: 'field.select', id: this.name, source: this});
            }
            return this;
        },
        
        getValue: function(i) {
            i = undefined !== i ? i : this.getIndex();
            if(this.hasIndex(i)) {
                return this.dom[0].options[i].value || null;
            }
            return null;
        },
        
        setValue: function(value, i) {
            i = undefined !== i ? i : this.getIndex();
            if(this.hasIndex(i)) {
                this.dom[0].options[i].value = value;
            }
            return this;
        },
        
        getText: function(i) {
            i = undefined !== i ? i : this.getIndex();
            if(this.hasIndex(i)) {
                return this.dom[0].options[i].text || null;
            }
            return null;
        },
        
        setText: function(text, i) {
            i = undefined !== i ? i : this.getIndex();
            if(this.hasIndex(i)) {
                this.dom[0].options[i].text = text;
                if(i == this.current && this.isReplaced()) {
                    this.getReplaced('span').html(text || '&nbsp;');
                }
            }
            return this;
        },
        
        getOption: function(i) {
            i = undefined !== i ? i : this.getIndex();
            if(this.hasIndex(i)) {
                return {'text': this.getText(i), 'value': this.getValue(i), 'selected': i == this.getIndex()};
            }
            return null;
        },
        
        setOption: function(option, i) {
            if('object' == typeof option) {
                i = undefined !== i ? i : this.getIndex();
                if(this.hasIndex(i)) {
                    this.dom[0].options[i].value = option.value;
                    this.dom[0].options[i].text = option.text;
                }
            }
            return this;
        },
        
        getOptions: function() {
            var options = [], i = this.length, l = i - 1;
            while(i--) {
                options[l - i] = this.getOption(l - i);
            }
            return options;
        },
        
        setOptions: function(options, clear) {
            if('object' == typeof options && options.length) {
                if(clear) {
                    this.dom[0].options.length = 0;
                }
                var i = options.length, l = i - 1, opt;
                while(i--) {
                    opt = options[l - i];
                    if(opt.selected) {
                        this.current = i;
                    }
                    this.dom[0].options[this.dom[0].options.length] = new Option(opt.text, opt.value, opt.selected);
                }
                this.length = this.dom[0].options.length;
                // @todo broadcast an 'update' event?
            }
            return this;
        },
        
        addReplacement: function() {
            this.dom.setBoxDatas({mode: 'replaced'});
            var id = this.form + this.name + 'REP';
            var html = '<div id="' + id + '" class="' + config.fauxSelectCls + '"><div><span id="' + id + 'Inner">' + (this.getText() || '&nbsp;') + '</span></div></div>';
            $(html).insertAfter(this.dom);
            bindFauxSelectClick(this);
            bindFieldFocusBlur(this);
            if(!fauxOptions && !box.ui('panel.fauxOptions') && !box.ui('mask.fauxOptionsMask')) {
                fauxOptions = $(config.fauxOptions.replace('{$fauxOptionsId}', config.fauxOptionsId)).appendTo(D.body).mousedown(bindFauxOptionsClick);
                box.ui('scroll').create({
                    id: 'fauxOptions',
                    element: fauxOptions
                });
                box.ui('mask').create({
                    id: 'fauxOptions',
                    html: '<div id="boxFauxOptionsMask" style="position:absolute; top:0; left:0;"></div>',
                    insertTarget: fauxOptions,
                    insertMethod: 'insertBefore'
                });
                box.addClick({
                    id: 'boxFauxOptionsMask',
                    deepness: 1,
                    test: function(element) {
                        return ('boxFauxOptionsMask' == element.id);
                    },
                    handler: function(e, element) {
                        closeFauxOptions(fields[openedFauxSelect]);
                    }
                });
                box.ui('panel').create({
                    id: 'fauxOptions',
                    html: '<ul></ul>',
                    insertTarget: box.ui('scroll.fauxOptions').wrapper
                });
            }
            if(W.ie6) {
                this.dom.bind('mousewheel', function(e) {
                    local.wheelEventForScroll(e, box.ui('scroll.fauxOptions'));
                });
            }
            box.fire({type: 'replace', component: 'field.select', id: this.name, source: this});
            return this;
        },
        
        removeReplacement: function() {
            this.dom.clearBoxDatas({mode: 'replaced'});
            unbindFauxSelectClick(this);
            unbindFieldFocusBlur(this);
            this.getReplaced().remove();
            return this;
        },
        
        getReplaced: function(selector) {
            return $('#' + this.form + this.name + 'REP ' + (selector || ''));
        }
    });
    
    var makeField = {
        checkbox: CheckboxField,
        radio: RadiosGroup,
        select: SelectField,
        text: TextField
    };
    
})();

})(jQuery);

