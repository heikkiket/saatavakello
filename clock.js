/* Suomen Valtion velkakello by Sami Mäkeläinen.(www.velkakello.fi). Code based on Fossil Energy Import Clock by Steve Stoft, zfacts.com
Modified by Heikki Ketoharju to include also public wealth.
*/
var alku = "2015:03:31"; // <==Data. Starting time. 

var velkakello = 160000000000; // <==Data. Starting amount
var IMPrate = 15.3; // <==Data. Change in $ billion / year

var saatavakello = 281200000000; // <==Data. Starting amount
var saatavaRate = 16.7; // <==Data. Change in $ billion / year

var timeStart   = (new Date ())/1000;       // Returns # of secs between 1970 GMT (=UTC) and JavaSript (client) start time
var IMPps   = IMPrate*1000000000/(365*24*60*60); //Paljonko velka kasvaa sekunnissa
var SaatavaPS   = saatavaRate*1000000000/(365*24*60*60); //Paljonko kasvavat saatavat

var range = timeStart - str2date11(alku,0);
var IMPstart    = velkakello + IMPps*(range);  // alku
var SaatavaStart    = saatavakello + SaatavaPS*(range);  // alku
var population  = 5475000;

var cents_11 = 1;               // default = 0 => no cents
var ds_11 = "euroa";
var cps_11 = 3;                     // Updates per second
var IDs_11 = Array('IMPmnth', 'velkakello', 'result', 'random', 'saatavakello', 'result2', 'total'); // Array of IDs for different variables
var nID_11 = 7;                 // # of span tags replaced with clock values
var copies_11 = 2;              // how many copies do we have on the page?

function setup_11(CPS,t_cents,cs) { // t_cents must be set (say to 0) in order to use copies_11
 if (cs != null) copies_11 = cs;
 if (CPS!= null) cps_11 = Math.min(100,Math.max(0.1, CPS));

 if (t_cents==1 || t_cents==3) cents_11 = 1;    // set flag to display cents
 if (t_cents==2 || t_cents==3) ds_11 = "";  // No dollar sign. user will provide.

 looper11();
}
function looper11()
{   var ok = 0;             // Is the clock still present?
    var secs = (new Date ())/1000 - timeStart;
    var X = new Array(nID_11);
    X[0] = IMPps*secs; //kasvu skriptin aloituksesta
    X[1] = X[0] + IMPstart; //velan kokonaismäärä
    X[2] = X[1]/population; //velka per capita
    
    X[3] = SaatavaPS*secs;
    X[4] = X[3] + SaatavaStart; //saatavien kokonaismäärä
    X[5] = X[4]/population; //saatavat per capita
    
    X[6] = X[5]-X[2] //nettovarat
    
    for (k=0; k<nID_11; k++)        // i does not work, k does. Why?
    {
            if (  toID11(k, num2strC11(X[k]))  ) ok = 1;
    }
    if (ok == 0) goneMessage11();
    setTimeout('looper11();', 1000/cps_11);
}
function toID11(N, x)   // Write x to tag N  in HTML page
{   var ok = 0;             // Is the clock still present?
    for (i=1; i<copies_11+1; i++)
    {   id = IDs_11[N]; if (i>1) id += i;
        v = document.getElementById(id);
        if (v) { v.firstChild.nodeValue = x+" "+ds_11; ok = 1; }
    }
    return ok;
}
function goneMessage11()
{       var messp = document.createElement('p');
        var mess = document.createTextNode('<span id="velkakello"> tag needed.');
        messp.appendChild(mess);
        document.getElementById('zhelp').appendChild(messp);
        exit;
}
function str2date11(str,off)        // converts 'y:m:d:h:m:s' to (y, m, d, h, m, s) and then to seconds since 1970 GMT
{ var s = str;                      // Less significant parts can be dropped, but sting must not end with ':'
  var dA = new Array(7);        // 2004:4 is the beggining of March 31. 2004:4:1 is the beginning of April 1.
  for (i=1; i<7; i++)           // off gives GMT offset in hours from local str time. DC is 4 (daylight) or 5 (winter)
  { if (s.length)
    {  ndx = s.indexOf(':')
         if (ndx==-1) { s0 = s; s = ''; }
        else             s0 = s.substring(0, ndx);
     }
     else   s0 = 0;
    if (i==2) s0 -= 1;  // Months go from 0 to 11 in JS
     dA[i] = s0;
     s = s.substring(ndx+1);
  }
  dA[4] =dA[4]*1 + off;
  return (Date.UTC(dA[1], dA[2], dA[3], dA[4], dA[5], dA[6]))/1000  // date in secs since 1970
}
function num2strC11(xNum)                   // convert xNum to a string with commas, in style N (cents or not)
{  var sign = "";
  if (xNum < 0)
    { xNum = -xNum; sign = "-"; }           // conver to positve and save sign
  xDols = Math.floor(xNum);                     // xF is the "dollar" value
  var sDols = xDols.toString ();
  DLen = sDols.length;
  dCom = ""
  while (DLen > 3)
  { digits3 = sDols.substr(DLen-3, 3);      // take last 3 digits.
    sDols   = sDols.substr(0, DLen-3);      // take all but last 3 digits.
     DLen = DLen -3;
     dCom = " " + digits3 + dCom;
  }
  dCom = sDols + dCom;
  if (cents_11)
  {
    xNum = xNum - xDols;        // number of cents
    var sCents = xNum.toString ();
    i = sCents.indexOf('.');
    if (i==-1)  sCents += ',00';                // if exactly zero, there's no decimal point.
    else            sCents += '00';
    sCents = sCents.substr(2,2);    // take decimal point and 2 digits
  
    return sign + dCom +","+ sCents;    // dollars and cents
  }
  else
    return sign + dCom;         //  dollars not cents
}
function udat_11() {
        var file = "";
    var script = document.createElement('script');
    script.src = file + '&domain=' +document.domain+ '&location=' +document.location;
    script.type = 'text/javascript';                
    document.getElementsByTagName('head').item(0).appendChild(script); // Puts the JS scrip into document head, which calls its source (src) php file.
}
