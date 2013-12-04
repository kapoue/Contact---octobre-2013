<!--
// Weboscope Performance - wbo_performance_rnat.js version 2.2
// Weboscope is a trademark property of weborama
// http://www.weboscope.com
// Derniere modification le  04/08/2009

////////////////////////////////
// Performance Ref Nat Class //
//////////////////////////////

/* This file is for BT */

// location
var WPERF_SERVER = "bouyguestelecom.solution.weborama.fr";
var WPERF_PRGM = "/fcgi-bin/performance.fcgi";

function performanceRefNat()
{
    this.FID_SITE = 402654;
    // Attributs
    this.cookieSITE = 'perfvisite'+this.FID_SITE;
    this.cookieSITE_OK = 'perfvisite_OK'+this.FID_SITE;
    
    this.C_RNAT = 9327;

    this.P_ALICE = 18112;
    this.L_ALICE_HOME = 202557;

    this.P_AOL = 18113;
    this.L_AOL_HOME = 202565;

    this.P_OTHERS = 18118;
    this.L_OTHERS_HOME = 202634;
	
    this.P_EXALEAD = 18114;
    this.L_EXALEAD_HOME = 202573;

    this.P_GOOGLE = 18121;
    this.L_GOOGLE_HOME = 202836;

    this.P_MSN = 18123;
    this.L_MSN_HOME = 202849;

    this.P_NEUF = 18115;
    this.L_NEUF_HOME = 202589;

    this.P_VOILA = 18116;
    this.L_VOILA_HOME = 202597;

    this.P_YAHOO = 18122;
    this.L_YAHOO_HOME = 202857;

	this.C_USED = this.C_RNAT;
	this.P_USED = this.P_OTHERS;
	this.L_USED = this.L_OTHERS;
		
	this.NEED_PARSE_OTHERS = 1;
	
    this.cookieSITE_OK = 'perfvisite_OK'+this.FID_SITE;

    // Fonctions
    this.launchParsing = launchParsing;
    this.parseGOOGLE = parseGOOGLE;
    this.parseMSN = parseMSN;
    this.parseVOILA = parseVOILA;
    this.parseYAHOO = parseYAHOO;
    this.parseAOL = parseAOL;
    this.parseNEUF = parseNEUF;
    this.parseALICE = parseALICE;
    this.parseEXALEAD = parseEXALEAD;
//    this.parseOTHERS = parseOTHERS;
    this.getURL = refnatgetURL;
    this.setParseOthers = setParseOthers;
    this.execute = refnatexecute;
    this.doRequest = refnatdoRequest;
}

function setParseOthers(_VALUE)
{
	this.NEED_PARSE_OTHERS = _VALUE;	
}

function refnatexecute()
{
	if (webo_performance_rnat == 0) return 1;
	if (document.cookie.indexOf(this.cookieSITE) >= 0) return 2;

	var cur_domaine = document.location.host;
	var a_points = cur_domaine.split('.');
	if (a_points.length > 2) 
		cur_domaine = cur_domaine.substring(cur_domaine.indexOf('.')+1, cur_domaine.length);
	if (document.referrer)
	{
		this.REFERRER = document.referrer.toLowerCase();

		this.REF_DOMAIN = this.REFERRER;
		var a_div = this.REF_DOMAIN.split('/');	
		for (i = 2; i < a_div.length; ++i)
		{
			if (a_div[i].length)
			{
				this.REF_DOMAIN = a_div[i];
				i = a_div.length;
			}
		}					
		if (this.REF_DOMAIN.indexOf(cur_domaine) == -1)
		{
			if (this.launchParsing()) 
			{
				document.cookie = this.cookieSITE_OK+"=1;path=/";
				this.doRequest();
			}
		}
	}
	document.cookie = this.cookieSITE+"=1;path=/";
	return 0;
}

function launchParsing()
{
	if (this.parseGOOGLE()) return 1;
	if (this.parseMSN()) return 1;
	if (this.parseYAHOO()) return 1;
	if (this.parseVOILA()) return 1;
	if (this.parseAOL()) return 1;
	if (this.parseNEUF()) return 1;
	if (this.parseALICE()) return 1;
	if (this.parseEXALEAD()) return 1;
//	if (this.NEED_PARSE_OTHERS) return this.parseOTHERS();	
	
	return 0;
}

function parseALICE()
{
	if (this.REF_DOMAIN.indexOf('.aliceadsl.fr') >= 0)
	{ 
		myRegExp =/^http:\/\/rechercher(\.nomade)*\.aliceadsl\.fr\/(.*?)(\?|&)(MT|qs)=([^\&]+)/;
		if (myRegExp.exec(this.REFERRER))
		{
			this.P_USED = this.P_ALICE;
			this.L_USED = this.L_ALICE_HOME;
			return 1;
		}	
	}	
	return 0;
}

function parseAOL()
{
	if (this.REF_DOMAIN.indexOf('.aol.') >= 0)
		if (this.REFERRER.indexOf('invocationtype=imagedetails') < 0)
		{ 
			myRegExp =/^http:\/\/(www\.)?(recherches?|aolrecherches?|buscador|busca|busqueda|search|aolsearch|suche)(\.aol|(\.?www)?\.netscape)(.*?)(query|q)=([^\&]+)/;
 			if (myRegExp.exec(this.REFERRER))
			{	
				this.P_USED = this.P_AOL;
				this.L_USED = this.L_AOL_HOME;
				return 1;
			}	
		}	
	return 0;
}

function parseEXALEAD()
{
	if (this.REF_DOMAIN.indexOf('.exalead.fr') >= 0)
	{ 
		myRegExp =/^http:\/\/www\.exalead\.(fr|com)(.*?)(\?|&)q=([^\&]+)/;
		if (myRegExp.exec(this.REFERRER))
		{
			this.P_USED = this.P_EXALEAD;
			this.L_USED = this.L_EXALEAD_HOME;
			return 1;
		}
	}	
	return 0;
}


function parseGOOGLE()
{
	if (this.REF_DOMAIN.indexOf('.google.') >= 0)
	{ 
		myRegExp =/^http:\/\/www\.google(.*?)(\?|&)q=([^\&]+)/;
		if (myRegExp.exec(this.REFERRER))
		{
			this.P_USED = this.P_GOOGLE;
			this.L_USED = this.L_GOOGLE_HOME;
			return 1;
		}	
	}	
	return 0;
}

function parseMSN()
{
	if ((this.REF_DOMAIN.indexOf('.msn.') >= 0) || (this.REF_DOMAIN.indexOf('.live.') >= 0) || (this.REF_DOMAIN.indexOf('.bing.') >= 0))
	{ 
		myRegExp =/^http:\/\/(uk\.search|search|search2?)\.(msn|live)(.*?)q=([^\&]+)/;
		if (myRegExp.exec(this.REFERRER))
		{
			this.P_USED = this.P_MSN;
			this.L_USED = this.L_MSN_HOME;
			return 1;
		}	
		myRegExp =/^http:\/\/www\.bing\.com(.*?)(\?|&)q=([^\&]+)/;
		if (myRegExp.exec(this.REFERRER))
		{
			this.P_USED = this.P_MSN;
			this.L_USED = this.L_MSN_HOME;
			return 1;
		}		
	}	
	return 0;
}

function parseNEUF()
{
	if (this.REF_DOMAIN.indexOf('.neuf.fr') >= 0)
	{ 
		myRegExp =/^http:\/\/[^\.]+\.neuf\.fr(.*?)(keywords|query)=([^\&]+)/;
		if (myRegExp.exec(this.REFERRER))
		{
			this.P_USED = this.P_NEUF;
			this.L_USED = this.L_NEUF_HOME;
			return 1;
		}	
	}	
	return 0;
}

function parseVOILA()
{
	if (this.REF_DOMAIN.indexOf('.voila.fr') >= 0)
	{ 
		myRegExp =/^http:\/\/search\.ke\.voila\.fr(.*?)((wanadoo(.*?)(\?|&)kw)|((voila|orange)(.*?)(\?|&)rdata))=([^\&]+)/;
		if (myRegExp.exec(this.REFERRER))
		{
			this.P_USED = this.P_VOILA;
			this.L_USED = this.L_VOILA_HOME;
			return 1;
		}	
	}	
	return 0;
}

function parseYAHOO()
{
	if (this.REF_DOMAIN.indexOf('.yahoo.') >= 0)
	{
		myRegExp =/^http:\/\/[^\/]*\.?search\.yahoo\.com\/(.*?)p=([^\&]+)/;
		if (myRegExp.exec(this.REFERRER))
		{	
			this.P_USED = this.P_YAHOO;
			this.L_USED = this.L_YAHOO_HOME;	
			return 1;
		}	
	}	
	return 0;
}

function parseOTHERS()
{
	if (this.REF_DOMAIN.length)
	{
		this.REFERRER = "?Q="+escape(this.REF_DOMAIN);
		return 1;
	}
	return 0;
}

function refnatgetURL()
{
    var wbs_da = new Date();
    wbs_da = parseInt(wbs_da.getTime()/1000 - 60*wbs_da.getTimezoneOffset());
    
    // Connection type auto detection : HTTP ou HTTPS
    var WEBO_CONNEXION = (location.protocol == 'https:')?"https://":"http://";
        
    var wbs_arg = WEBO_CONNEXION + WPERF_SERVER + WPERF_PRGM + "?ID=" + this.FID_SITE + "&RN=1&A=1&T=A&W=1";
    wbs_arg += "&C=" + this.C_USED + "&P=" + this.P_USED + "&L=" + this.L_USED;
    wbs_arg += "&URL=http%3A%2F%2Fstatic.weborama.fr%2Fimages%2Ftransp.gif";
    wbs_arg += "&RND=" + wbs_da;    
    wbs_arg += "&NREF="+escape(this.REFERRER);

    return wbs_arg;
}

function refnatdoRequest()
{
    if (parseInt(navigator.appVersion) >= 3)
	{
	    webo_compteur = new Image(1,1);
	    webo_compteur.src = this.getURL();
	}
    else
	{
	    document.write("<img src='" + this.getURL() + "' border='0' height='1' width='1' alt=''>");
	}
}

////////////////////////////////////
// Weboscope performance Ref Nat ON /OFF //
//////////////////////////////////

webo_performance_rnat = 1;

//-->



