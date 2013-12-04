<!--
var xtpif="0",xtpim="",xtpiq="",xtpir="",xtpip="0";
xn=navigator.plugins;
if (xn && xn.length) {xnok = true;}
else { xnok = false;
}
if (!xnok)
{
chaine = '<SC'+'RIPT LANGUAGE="VBScript">\n';
chaine += 'On error resume next\n';
chaine += '</script> \n';
document.write(chaine);
}
if (xnok) {
for (var xi=0;xi<xn.length;xi++) {
if ((xn[xi].name.indexOf('Flash Player')!=-1))
{	xtpif = "1"; 
if (xn[xi].description.split('Shockwave Flash ')[1].length)
{xtpif = xn[xi].description.split('Shockwave Flash ')[1].substring(0,3);}
}
if ((xn[xi].name.indexOf('Shockwave Flash')!=-1)&&(xtpif==0))
{	xtpif = "1"; 
if (xn[xi].description.split('Shockwave Flash ')[1].length)
{xtpif = xn[xi].description.split('Shockwave Flash ')[1].substring(0,3);}
}
}
}
else if (window.ActiveXObject) {
for (var xi=0;xi<20;xi++) {
try {if (eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash."+xi+"');")) {xtpif = xi;} } catch(e) {};
}
}
if (window.xtparam!=null){window.xtparam+="&pif="+xtpif+"&pir="+xtpir+"&pim="+xtpim+"&piq="+xtpiq}
else{window.xtparam = "&pif="+xtpif+"&pir="+xtpir+"&pim="+xtpim+"&piq="+xtpiq};
//-->
