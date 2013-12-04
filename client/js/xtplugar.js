<!--
var xtpia="0";
function xtARVer(v) {
  var xthst = '0',xtnmVl = 0,xtnmhst = 0;
  values = v.split(",");
  for (var i = 0; i < values.length; i++) {
    if (values[i]!= null && values[i]!= "") {
      try {
        nums = values[i].split("=")[1].split(".");
        if (nums.length > 1) {
          value = nums[0]+"."+nums[1]+"."+nums[2];
          xtnmVl = parseInt(nums[0] * 1000000 + nums[1] * 1000 + nums[2]);
        }}
      catch(e) {}}
    if (xtnmVl > xtnmhst) {xtnmhst = xtnmVl;xthst = value;}
  }
  return xthst;
}

xnR=navigator.plugins;
if (xnR && xnR.length) {xnRok = true;}
else { xnRok = false;
	document.write("<object id='xtAcrobatObj' style='display: none' classid='clsid:CA8A9780-280D-11CF-A24D-444553540000'></object>");
}

if(!xnRok)
{
chaine = '<SC'+'RIPT LANGUAGE="VBScript">\n';
chaine += 'Function isHere(chk)\n';
chaine += 'isHere = -1\n';
chaine += 'On error resume next\n';
chaine += 'flp = IsObject(CreateObject(chk))\n';
chaine += 'if flp then\n';
chaine += 'isHere = 1\n';
chaine += 'Else\n';
chaine += 'isHere = 0\n';
chaine += 'End if\n';
chaine += 'End Function\n';
chaine += 'On error resume next\n';
chaine += 'xtpia = xtARVer(xtAcrobatObj.GetVersions) \n';
chaine += 'if xtpia = "" then \n';
chaine += 'if isHere("pdf.PdfCtrl.6") OR isHere("GBDetect.Detect.1") then \n';
chaine += 'xtpia = "6.0" \n';
chaine += 'elseif isHere("pdf.PdfCtrl.5") then \n';
chaine += 'xtpia = "5.0" \n';
chaine += 'else \n';
chaine += 'err.clear \n';
chaine += 'set ab = CreateObject("Pdf.PdfCtrl.1") \n';
chaine += 'If err.number = 0 then \n';
chaine += 'ab.gotoFirstPage \n';
chaine += 'If err.number = 438 then \n';
chaine += 'xtpia = "3.0" \n';
chaine += 'else \n';
chaine += 'xtpia = "4.0" \n';
chaine += 'End if \n';
chaine += 'End if \n';
chaine += 'end if \n';
chaine += 'end if \n';
chaine += '</script> \n';
document.write(chaine);
}

if (xnRok) {
	for (var xi=0;xi<xnR.length;xi++) {
		if (xnR[xi].name.indexOf('Acrobat')!=-1)
		{	try {if (parseFloat(xnR[xi].description.split('Version ')[1]).length)
			{	xtpia = parseFloat(xnR[xi].description.split('Version ')[1]).substring(0,3);}}
			catch(e){xtpia=""}
		}
	}
}  
if (window.xtparam!=null){window.xtparam+="&pia="+xtpia}
else{window.xtparam = "&pia="+xtpia};
//-->