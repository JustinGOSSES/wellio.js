/*****************

JOY.js: make happy little programs

VERSION 0 (the incredibly clunky first version) (sorry)

Created by Nicky Case http://ncase.me/

*****************/

/*****************
single line minimified version here:
// function Joy(e){var t=this==window?{}:this;if(e.modules)for(var n=0;n<e.modules.length;n++)Joy.loadModule(e.modules[n]);return Joy.Actor.call(t,e),Joy.initReferences(t),void 0==t.previewActions&&(t.previewActions=!0),void 0==t.previewNumbers&&(t.previewNumbers=!0),t.activePreview=null,t.canPreview=function(e){e=e.charAt(0).toUpperCase()+e.slice(1);return t["preview"+e]&&!t.activePreview},t.createWidget(),t.container&&("string"==typeof t.container&&(t.container=document.body.querySelector(t.container)),t.container.appendChild(t.dom)),Joy.ui.init(t),Joy.modal.init(t),t.onupdate=t.onupdate||function(e){},t.update=function(){var e={actor:t,data:{}};t.children.forEach(function(t){var n=t.dataID;if(n){var a=t.get();e.data[n]=a}}),t.children.forEach(function(t){t.id&&(e[t.id]=t)}),t.onupdate(e)},t.update(),t}function _HSVtoRGB(e,t,n){var a,o,r,i,c,l,s,u;switch(1===arguments.length&&(t=e.s,n=e.v,e=e.h),e/=360,i=Math.floor(6*e),c=6*e-i,l=n*(1-t),s=n*(1-c*t),u=n*(1-(1-c)*t),i%6){case 0:a=n,o=u,r=l;break;case 1:a=s,o=n,r=l;break;case 2:a=l,o=n,r=u;break;case 3:a=l,o=s,r=n;break;case 4:a=u,o=l,r=n;break;case 5:a=n,o=l,r=s}return[Math.round(255*a),Math.round(255*o),Math.round(255*r)]}function _HSVToRGBString(e,t,n){1===arguments.length&&(t=e[1],n=e[2],e=e[0]);var a=_HSVtoRGB(e,t,n);return"rgb("+a[0]+","+a[1]+","+a[2]+")"}function _randomHSV(){var e=_randomHSVArray[_randomHSVIndex];return _randomHSVIndex=(_randomHSVIndex+1)%_randomHSVArray.length,e}function _forceToRGB(e){return Array.isArray(e)&&(e=_HSVToRGBString(e[0],e[1],e[2])),e}Joy.Actor=function(e,t,n){var a=this;if(a._class_="Actor",a.options=e,a.parent=t,a.top=a.parent?a.parent.top:a,a.type=e.type,a.type){var o=Joy.getTemplateByType(a.type);_configure(a,o)}if(_configure(a,a.options),a.children=[],a.addChild=function(e,t){return"Actor"!=e._class_&&(e=new Joy.Actor(e,a,t)),a.children.push(e),e.id&&(a[e.id]=e),e},a.removeChild=function(e){_removeFromArray(a.children,e),e.kill()},a.update=function(){a.onupdate&&a.onupdate(a),a.parent&&a.parent.update()},a.onkill=a.onkill||function(){},a.kill=function(){for(a.dom&&a.dom.parentNode&&a.dom.parentNode.removeChild(a.dom),unwatch(a.data,c);a.children.length>0;)a.removeChild(a.children[0]);a.onkill(a)},void 0===a.placeholder&&(a.placeholder={}),"function"==typeof a.placeholder&&(a.placeholder=a.placeholder()),("object"!=typeof a.placeholder||Array.isArray(a.placeholder))&&(a.placeholder={value:_clone(a.placeholder)}),a.placeholder.type||(a.placeholder.type=a.type),a.data=a.data||n,!a.data){t=a.parent;var r=a.dataID;t&&r?(t.data[r]||(t.data[r]=_clone(a.placeholder)),a.data=t.data[r]):a.data=_clone(a.placeholder)}a.getData=function(e){return a.data[e]},a.setData=function(e,t,n){i=!0,void 0===t?delete a.data[e]:a.data[e]=t,setTimeout(function(){i=!1},1),n||a.update()},a.switchData=function(e){unwatch(a.data,c),a.data=e,watch(a.data,c),a.onDataChange&&a.onDataChange(e)};var i=!1,c=function(e,t,n,o){i||a.onDataChange&&a.onDataChange()};watch(a.data,c),a.dom=null,a.initWidget=a.initWidget||function(){a.dom=document.createElement("span"),a.dom.innerHTML="[todo: '"+a.type+"' widget]"},a.createWidget=function(){return a.initWidget(a),a.dom},a.previewData=null,a.onact=a.onact||function(){},a.act=function(e,t){var n;return n=_clone(t?t:a.previewData?a.previewData:a.data),a.children.forEach(function(t){var a=t.dataID;if(a){var o=t.get(e);n[a]=o}}),a.onact({actor:a,target:e,data:n})},a.onget=a.onget||function(){},a.get=function(e){var t=a.previewData?a.previewData:a.data;return t=_clone(t),a.onget({actor:a,target:e,data:t})},a.init&&("string"==typeof a.init&&Joy.initializeWithString(a,a.init),"function"==typeof a.init&&a.init(a))},Joy.templates=[],Joy.add=function(e){Joy.templates.push(e)},Joy.getTemplateByType=function(e){var t=Joy.templates.find(function(t){return t.type==e});if(!t)throw Error("No actor template of type '"+e+"'!");return t},Joy.getTemplatesByTag=function(e){return Joy.templates.filter(function(t){return t.tags.indexOf(e)>=0})},Joy.modify=function(){var e,t,n;2==arguments.length?(e=arguments[0],n=arguments[1]):(e=arguments[0],t=arguments[1],n=arguments[2]);var a={},o=Joy.getTemplateByType(e);_configure(a,o);var r=n(o);_configure(a,r),t?o.type=t:_removeFromArray(Joy.templates,o),Joy.add(a)},Joy.initializeWithString=function(e,t){for(var n=[],a=t,o=-1,r=-1,i=0,c=0;c<a.length;c++){var l=a[c];if(0==i&&"{"==l&&(o=c),"{"==l&&i++,"}"==l&&i--,0==i&&"}"==l){r=c+1;var s=a.slice(o,r);s=(s=s.replace(/(\w+)\:/g,"'$1':")).replace(/\'/g,'"'),(s=JSON.parse(s)).dataID=s.dataID||s.id,n.push(s),a=a.substr(0,o)+"<span id='widget_"+s.id+"'></span>"+a.substr(r),c=0,o=-1,r=-1,i=0}}n.forEach(function(t){e.addChild(t)}),e.createWidget=function(){return e.dom=document.createElement("span"),e.dom.innerHTML=a,e.children.forEach(function(t){t.createWidget();var n="#widget_"+t.id,a=e.dom.querySelector(n);e.dom.replaceChild(t.dom,a)}),e.dom}},Joy.modules={},Joy.module=function(e,t){Joy.modules[e]=t},Joy.loadModule=function(e){var t=Joy.modules[e];if(!t)throw Error("There's no module called '"+e+"'!");t()},Joy.initReferences=function(e){var t=e.top.data;t._references||(t._references={});for(var n in t._references){t._references[n].connected=0}},Joy.createReference=function(e,t,n){var a=e.top.data,o={id:_generateUID(a._references),tags:_forceToArray(t),data:n,connected:0};return a._references[o.id]=o,o},Joy.getReferenceById=function(e,t){return e.top.data._references[t]},Joy.getReferencesByTag=function(e,t){var n=e.top.data,a=[];for(var o in n._references){var r=n._references[o];r.tags.indexOf(t)>=0&&a.push(r)}return a},Joy.connectReference=function(e,t){Joy.getReferenceById(e,t).connected++},Joy.disconnectReference=function(e,t){var n=Joy.getReferenceById(e,t);n.connected--,0==n.connected&&Joy.deleteReference(e,t)},Joy.deleteReference=function(e,t){var n=e.top.data;n._references[t];delete n._references[t]},Joy.saveToURL=function(e){var t=JSON.stringify(e),n=LZString.compressToEncodedURIComponent(t);return window.location.origin+window.location.pathname+"?data="+n},Joy.loadFromURL=function(){var e=_getParameterByName("data"),t=LZString.decompressFromEncodedURIComponent(e);if(t){return JSON.parse(t)}return null},Math.TAU=2*Math.PI;var _clone=function(e){return JSON.parse(JSON.stringify(e))},_configure=function(e,t){for(var n in t){var a=t[n];e[n]=a}},_removeFromArray=function(e,t){var n=e.indexOf(t);return!(n<0)&&(e.splice(n,1),!0)},_nbsp=function(){var e=document.createElement("span");return e.innerHTML="&nbsp;",e},_numberToRoman=function(e){if(!+e)return NaN;for(var t=String(+e).split(""),n=["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM","","X","XX","XXX","XL","L","LX","LXX","LXXX","XC","","I","II","III","IV","V","VI","VII","VIII","IX"],a="",o=3;o--;)a=(n[+t.pop()+10*o]||"")+a;return(Array(+t.join("")+1).join("M")+a).toLowerCase()},_numberToAlphabet=function(e){for(var t=0,n=1;e>=n;)t++,e-=n,n*=26;for(var a="",o=0;o<t;o++)a="abcdefghijklmnopqrstuvwxyz".charAt(e%26)+a,e=Math.floor(e/26);return a},_insertTextAtCursor=function(e){var t,n;window.getSelection?(t=window.getSelection()).getRangeAt&&t.rangeCount&&((n=t.getRangeAt(0)).deleteContents(),n.insertNode(document.createTextNode(e))):document.selection&&document.selection.createRange&&(document.selection.createRange().text=e)},_preventWeirdCopyPaste=function(e){e.addEventListener("paste",function(e){if(e.preventDefault(),e.clipboardData&&e.clipboardData.getData){var t=e.clipboardData.getData("text/plain");document.execCommand("insertHTML",!1,t)}else if(window.clipboardData&&window.clipboardData.getData){t=window.clipboardData.getData("Text");_insertTextAtCursor(t)}})},_selectAll=function(e,t){var n=document.createRange();n.selectNodeContents(e),t&&n.collapse(!1);var a=window.getSelection();a.removeAllRanges(),a.addRange(n)},_unselectAll=function(){window.getSelection().removeAllRanges()},_fixStringInput=function(e){""==e.innerText&&(e.innerHTML="&nbsp;",_selectAll(e)),e.innerHTML.search("<br>")>=0&&(e.innerHTML=e.innerHTML.replace(/(\<br\>)+/g,"&nbsp;"),_selectAll(e,!0))},_blurOnEnter=function(e){e.addEventListener("keypress",function(t){13===t.which&&(t.preventDefault(),e.blur())})},_generateUID=function(e){var t,n=0;do{t="id"+n,n++}while(e[t]);return t},_forceToArray=function(e){return Array.isArray(e)?e:[e]},_emptyDOM=function(e){for(;e.hasChildNodes();)e.removeChild(e.lastChild)},_getParameterByName=function(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var n=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null},_randomHSVIndex=0,_randomHSVArray=[[0,.6,1],[30,.8,1],[210,.8,1],[260,.7,1],[310,.6,1]];!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):(window.WatchJS=e(),window.watch=window.WatchJS.watch,window.unwatch=window.WatchJS.unwatch,window.callWatchers=window.WatchJS.callWatchers)}(function(){function e(){b=null;for(var e=0;e<y.length;e++)y[e]();y.length=0}var t={noMore:!1,useDirtyCheck:!1},n=[],a=[],o=[],r=!1;try{r=Object.defineProperty&&Object.defineProperty({},"x",{})}catch(t){}var i=function(e){return e&&"[object Function]"=={}.toString.call(e)},c=function(e){return"[object Array]"===Object.prototype.toString.call(e)},l=function(e){return"[object Object]"==={}.toString.apply(e)},s=function(e,t){var n=[],a=[];if("string"!=typeof e&&"string"!=typeof t){if(c(e)&&t)for(var o=0;o<e.length;o++)void 0===t[o]&&n.push(o);else for(var o in e)e.hasOwnProperty(o)&&t&&void 0===t[o]&&n.push(o);if(c(t)&&e)for(var r=0;r<t.length;r++)void 0===e[r]&&a.push(r);else for(var r in t)t.hasOwnProperty(r)&&e&&void 0===e[r]&&a.push(r)}return{added:n,removed:a}},u=function(e){if(null==e||"object"!=typeof e)return e;var t=e.constructor();for(var n in e)t[n]=e[n];return t},d=function(e,t,n){try{Object.defineProperty(e,t,{enumerable:!1,configurable:!0,writable:!1,value:n})}catch(a){e[t]=n}},f=function(e,t,n){a[a.length]={prop:t,object:e,orig:u(e[t]),callback:n}},h=function(e,t,n,a){if("string"!=typeof e&&(e instanceof Object||c(e))){if(c(e)){if(E(e,"__watchall__",t,n),void 0===n||n>0)for(var o=0;o<e.length;o++)h(e[o],t,n,a)}else{var i=[];for(o in e)"$val"==o||!r&&"watchers"===o||Object.prototype.hasOwnProperty.call(e,o)&&i.push(o);p(e,i,t,n,a)}a&&O(e,"$$watchlengthsubjectroot",t,n)}},p=function(e,t,n,a,o){if("string"!=typeof e&&(e instanceof Object||c(e)))for(var r=0;r<t.length;r++){var i=t[r];v(e,i,n,a,o)}},v=function(e,t,n,a,o){"string"!=typeof e&&(e instanceof Object||c(e))&&(i(e[t])||(null!=e[t]&&(void 0===a||a>0)&&h(e[t],n,void 0!==a?a-1:a),E(e,t,n,a),o&&(void 0===a||a>0)&&O(e,t,n,a)))},m=function(e,t){if(!(e instanceof String)&&(e instanceof Object||c(e)))if(c(e)){for(var n=["__watchall__"],a=0;a<e.length;a++)n.push(a);g(e,n,t)}else{var o=function(e){var n=[];for(var a in e)e.hasOwnProperty(a)&&(e[a]instanceof Object?o(e[a]):n.push(a));g(e,n,t)};o(e)}},g=function(e,t,n){for(var a in t)t.hasOwnProperty(a)&&j(e,t[a],n)},y=[],b=null,w=function(){return b||(b=setTimeout(e)),b},_=function(e){null==b&&w(),y[y.length]=e},C=function(e,t,n,a){var o=null,r=-1,i=c(e);h(e,function(n,a,c,l){var s=w();if(r!==s&&(r=s,o={type:"update"},o.value=e,o.splices=null,_(function(){t.call(this,o),o=null})),i&&e===this&&null!==o){if("pop"===a||"shift"===a)c=[],l=[l];else if("push"===a||"unshift"===a)c=[c],l=[];else if("splice"!==a)return;o.splices||(o.splices=[]),o.splices[o.splices.length]={index:n,deleteCount:l?l.length:0,addedCount:c?c.length:0,added:c,deleted:l}}},1==n?void 0:0,a)},D=function(e,t,n,a,o){e&&t&&(v(e,t,function(e,t,r,i){var s={type:"update"};s.value=r,s.oldvalue=i,(a&&l(r)||c(r))&&C(r,n,a,o),n.call(this,s)},0),(a&&l(e[t])||c(e[t]))&&C(e[t],n,a,o))},E=function(e,n,a,o){var r=!1,i=c(e);e.watchers||(d(e,"watchers",{}),i&&J(e,function(t,a,r,i){if(k(e,t,a,r,i),0!==o&&r&&(l(r)||c(r))){var s,u,d,f,p=e.watchers[n];for((f=e.watchers.__watchall__)&&(p=p?p.concat(f):f),d=p?p.length:0,s=0;s<d;s++)if("splice"!==a)h(r,p[s],void 0===o?o:o-1);else for(u=0;u<r.length;u++)h(r[u],p[s],void 0===o?o:o-1)}})),e.watchers[n]||(e.watchers[n]=[],i||(r=!0));for(var s=0;s<e.watchers[n].length;s++)if(e.watchers[n][s]===a)return;if(e.watchers[n].push(a),r){var u=e[n],p=function(a,r){var i=u;if(u=a,0!==o&&e[n]&&(l(e[n])||c(e[n]))&&!e[n].watchers){var s,d=e.watchers[n].length;for(s=0;s<d;s++)h(e[n],e.watchers[n][s],void 0===o?o:o-1)}return S(e,n)?void I(e,n):void(t.noMore||i!==a&&(r?k(e,n,"set",a,i):A(e,n,"set",a,i),t.noMore=!1))};t.useDirtyCheck?f(e,n,p):function(e,t,n,a){try{Object.observe(e,function(e){e.forEach(function(e){e.name===t&&a(e.object[e.name])})})}catch(o){try{Object.defineProperty(e,t,{get:n,set:function(e){a.call(this,e,!0)},enumerable:!0,configurable:!0})}catch(o){try{Object.prototype.__defineGetter__.call(e,t,n),Object.prototype.__defineSetter__.call(e,t,function(e){a.call(this,e,!0)})}catch(n){f(e,t,a)}}}}(e,n,function(){return u},p)}},A=function(e,t,n,a,o){if(void 0!==t){var r,i,c=e.watchers[t];(i=e.watchers.__watchall__)&&(c=c?c.concat(i):i),r=c?c.length:0;for(var l=0;l<r;l++)c[l].call(e,t,n,a,o)}else for(var t in e)e.hasOwnProperty(t)&&A(e,t,n,a,o)},x=["pop","push","reverse","shift","sort","slice","unshift","splice"],T=function(e,t,n,a){d(e,n,function(){var o,r,i,c,l=0;if("splice"===n){var s=arguments[0],u=s+arguments[1];for(i=e.slice(s,u),r=[],o=2;o<arguments.length;o++)r[o-2]=arguments[o];l=s}else r=arguments.length>0?arguments[0]:void 0;return c=t.apply(e,arguments),"slice"!==n&&("pop"===n?(i=c,l=e.length):"push"===n?l=e.length-1:"shift"===n?i=c:"unshift"!==n&&void 0===r&&(r=c),a.call(e,l,n,r,i)),c})},J=function(e,t){if(i(t)&&e&&!(e instanceof String)&&c(e))for(var n,a=x.length;a--;)n=x[a],T(e,e[n],n,t)},j=function(e,t,n){if(t){if(e.watchers[t])if(void 0===n)delete e.watchers[t];else for(var a=0;a<e.watchers[t].length;a++){e.watchers[t][a]==n&&e.watchers[t].splice(a,1)}}else delete e.watchers;N(e,t,n),B(e,t)},S=function(e,t){return e.watchers&&(e.watchers.__wjs_suspend__||e.watchers["__wjs_suspend__"+t])},I=function(e,t){_(function(){delete e.watchers.__wjs_suspend__,delete e.watchers["__wjs_suspend__"+t]})},R=null,k=function(e,t,n,a,r){o[o.length]={obj:e,prop:t,mode:n,newval:a,oldval:r},null===R&&(R=setTimeout(L))},L=function(){var e=null;R=null;for(var t=0;t<o.length;t++)e=o[t],A(e.obj,e.prop,e.mode,e.newval,e.oldval);e&&(o=[],e=null)},M=function(e,t){var n,a=!0;if(e!==t)if(l(e)){for(n in e)if((r||"watchers"!==n)&&e[n]!==t[n]){a=!1;break}}else a=!1;return a},O=function(e,t,a,o){var r;r=u("$$watchlengthsubjectroot"===t?e:e[t]),n.push({obj:e,prop:t,actual:r,watcher:a,level:o})},N=function(e,t,a){for(var o=0;o<n.length;o++){var r=n[o];r.obj==e&&(t&&r.prop!=t||a&&r.watcher!=a||n.splice(o--,1))}},B=function(e,t){for(var n=0;n<a.length;n++){var o=a[n],r=o.object.watchers;o.object==e&&(!t||o.prop==t)&&r&&(!t||!r[t]||0==r[t].length)&&a.splice(n--,1)}};return setInterval(function(){for(var e=0;e<n.length;e++){var t=n[e];if("$$watchlengthsubjectroot"===t.prop)((o=s(t.obj,t.actual)).added.length||o.removed.length)&&(o.added.length&&p(t.obj,o.added,t.watcher,t.level-1,!0),t.watcher.call(t.obj,"root","differentattr",o,t.actual)),t.actual=u(t.obj);else{var o;if((o=s(t.obj[t.prop],t.actual)).added.length||o.removed.length){if(o.added.length)for(var r=0;r<t.obj.watchers[t.prop].length;r++)p(t.obj[t.prop],o.added,t.obj.watchers[t.prop][r],t.level-1,!0);A(t.obj,t.prop,"differentattr",o,t.actual)}t.actual=u(t.obj[t.prop])}}var i,c;if(a.length>0)for(e=0;e<a.length;e++)i=a[e],c=i.object[i.prop],M(i.orig,c)||(i.orig=u(c),i.callback(c))},50),t.watch=function(){i(arguments[1])?h.apply(this,arguments):c(arguments[1])?p.apply(this,arguments):v.apply(this,arguments)},t.unwatch=function(){i(arguments[1])?m.apply(this,arguments):c(arguments[1])?g.apply(this,arguments):j.apply(this,arguments)},t.callWatchers=A,t.suspend=function(e,t){if(e.watchers){var n="__wjs_suspend__"+(void 0!==t?t:"");e.watchers[n]=!0}},t.onChange=function(){(i(arguments[2])?D:C).apply(this,arguments)},t});var LZString=function(){function e(e,t){if(!o[e]){o[e]={};for(var n=0;n<e.length;n++)o[e][e.charAt(n)]=n}return o[e][t]}var t=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",o={},r={compressToBase64:function(e){if(null==e)return"";var t=r._compress(e,6,function(e){return n.charAt(e)});switch(t.length%4){default:case 0:return t;case 1:return t+"===";case 2:return t+"==";case 3:return t+"="}},decompressFromBase64:function(t){return null==t?"":""==t?null:r._decompress(t.length,32,function(a){return e(n,t.charAt(a))})},compressToUTF16:function(e){return null==e?"":r._compress(e,15,function(e){return t(e+32)})+" "},decompressFromUTF16:function(e){return null==e?"":""==e?null:r._decompress(e.length,16384,function(t){return e.charCodeAt(t)-32})},compressToUint8Array:function(e){for(var t=r.compress(e),n=new Uint8Array(2*t.length),a=0,o=t.length;o>a;a++){var i=t.charCodeAt(a);n[2*a]=i>>>8,n[2*a+1]=i%256}return n},decompressFromUint8Array:function(e){if(null===e||void 0===e)return r.decompress(e);for(var n=new Array(e.length/2),a=0,o=n.length;o>a;a++)n[a]=256*e[2*a]+e[2*a+1];var i=[];return n.forEach(function(e){i.push(t(e))}),r.decompress(i.join(""))},compressToEncodedURIComponent:function(e){return null==e?"":r._compress(e,6,function(e){return a.charAt(e)})},decompressFromEncodedURIComponent:function(t){return null==t?"":""==t?null:(t=t.replace(/ /g,"+"),r._decompress(t.length,32,function(n){return e(a,t.charAt(n))}))},compress:function(e){return r._compress(e,16,function(e){return t(e)})},_compress:function(e,t,n){if(null==e)return"";var a,o,r,i={},c={},l="",s="",u="",d=2,f=3,h=2,p=[],v=0,m=0;for(r=0;r<e.length;r+=1)if(l=e.charAt(r),Object.prototype.hasOwnProperty.call(i,l)||(i[l]=f++,c[l]=!0),s=u+l,Object.prototype.hasOwnProperty.call(i,s))u=s;else{if(Object.prototype.hasOwnProperty.call(c,u)){if(u.charCodeAt(0)<256){for(a=0;h>a;a++)v<<=1,m==t-1?(m=0,p.push(n(v)),v=0):m++;for(o=u.charCodeAt(0),a=0;8>a;a++)v=v<<1|1&o,m==t-1?(m=0,p.push(n(v)),v=0):m++,o>>=1}else{for(o=1,a=0;h>a;a++)v=v<<1|o,m==t-1?(m=0,p.push(n(v)),v=0):m++,o=0;for(o=u.charCodeAt(0),a=0;16>a;a++)v=v<<1|1&o,m==t-1?(m=0,p.push(n(v)),v=0):m++,o>>=1}0==--d&&(d=Math.pow(2,h),h++),delete c[u]}else for(o=i[u],a=0;h>a;a++)v=v<<1|1&o,m==t-1?(m=0,p.push(n(v)),v=0):m++,o>>=1;0==--d&&(d=Math.pow(2,h),h++),i[s]=f++,u=String(l)}if(""!==u){if(Object.prototype.hasOwnProperty.call(c,u)){if(u.charCodeAt(0)<256){for(a=0;h>a;a++)v<<=1,m==t-1?(m=0,p.push(n(v)),v=0):m++;for(o=u.charCodeAt(0),a=0;8>a;a++)v=v<<1|1&o,m==t-1?(m=0,p.push(n(v)),v=0):m++,o>>=1}else{for(o=1,a=0;h>a;a++)v=v<<1|o,m==t-1?(m=0,p.push(n(v)),v=0):m++,o=0;for(o=u.charCodeAt(0),a=0;16>a;a++)v=v<<1|1&o,m==t-1?(m=0,p.push(n(v)),v=0):m++,o>>=1}0==--d&&(d=Math.pow(2,h),h++),delete c[u]}else for(o=i[u],a=0;h>a;a++)v=v<<1|1&o,m==t-1?(m=0,p.push(n(v)),v=0):m++,o>>=1;0==--d&&(d=Math.pow(2,h),h++)}for(o=2,a=0;h>a;a++)v=v<<1|1&o,m==t-1?(m=0,p.push(n(v)),v=0):m++,o>>=1;for(;;){if(v<<=1,m==t-1){p.push(n(v));break}m++}return p.join("")},decompress:function(e){return null==e?"":""==e?null:r._decompress(e.length,32768,function(t){return e.charCodeAt(t)})},_decompress:function(e,n,a){var o,r,i,c,l,s,u,d=[],f=4,h=4,p=3,v="",m=[],g={val:a(0),position:n,index:1};for(o=0;3>o;o+=1)d[o]=o;for(i=0,l=Math.pow(2,2),s=1;s!=l;)c=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=a(g.index++)),i|=(c>0?1:0)*s,s<<=1;switch(i){case 0:for(i=0,l=Math.pow(2,8),s=1;s!=l;)c=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=a(g.index++)),i|=(c>0?1:0)*s,s<<=1;u=t(i);break;case 1:for(i=0,l=Math.pow(2,16),s=1;s!=l;)c=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=a(g.index++)),i|=(c>0?1:0)*s,s<<=1;u=t(i);break;case 2:return""}for(d[3]=u,r=u,m.push(u);;){if(g.index>e)return"";for(i=0,l=Math.pow(2,p),s=1;s!=l;)c=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=a(g.index++)),i|=(c>0?1:0)*s,s<<=1;switch(u=i){case 0:for(i=0,l=Math.pow(2,8),s=1;s!=l;)c=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=a(g.index++)),i|=(c>0?1:0)*s,s<<=1;d[h++]=t(i),u=h-1,f--;break;case 1:for(i=0,l=Math.pow(2,16),s=1;s!=l;)c=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=a(g.index++)),i|=(c>0?1:0)*s,s<<=1;d[h++]=t(i),u=h-1,f--;break;case 2:return m.join("")}if(0==f&&(f=Math.pow(2,p),p++),d[u])v=d[u];else{if(u!==h)return null;v=r+r.charAt(0)}m.push(v),d[h++]=r+v.charAt(0),r=v,0==--f&&(f=Math.pow(2,p),p++)}}};return r}();"function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module&&(module.exports=LZString),function(){var e={};Joy.ui=e,e.init=function(e){e.dom.classList.add("joy-master"),e.container.addEventListener("wheel",function(t){var n=t.deltaY;return e.container.scrollTop+=n,t.preventDefault(),!1}),document.body.addEventListener("keydown",function(e){if(8===e.keyCode){var t=!0,n=e.srcElement||e.target;if(!(n.getAttribute("readonly")||n.getAttribute("disabled")))if(n.isContentEditable)t=!1;else if("INPUT"==n.tagName.toUpperCase()){var a=n.getAttribute("type");a&&(a=a.toLowerCase()),["text","password","file","search","email","number","date","color","datetime","datetime-local","month","range","search","tel","time","url","week"].indexOf(a)>-1&&(t=!1)}else"TEXTAREA"==n.tagName.toUpperCase()&&(t=!1);if(t)return e.preventDefault(),!1}})},e.Button=function(e){var t=this,n=document.createElement("div");n.className="joy-button",t.dom=n,e.label=e.label||"",t.label=document.createElement("span"),n.appendChild(t.label),t.setLabel=function(e){t.label.innerHTML=e},t.setLabel(e.label),n.onclick=function(){e.onclick()},t.styles=e.styles||[];for(var a=0;a<t.styles.length;a++)n.classList.add(t.styles[a])},e.ChooserButton=function(t){var n=this;n.value=t.value,n.options=t.options,n.onchange=t.onchange,n.value||(n.value=n.options[0].value),e.Button.call(n,{label:void 0===t.staticLabel?"":t.staticLabel,onclick:function(){Joy.modal.Chooser({source:n.dom,options:n.options,onchange:function(e){n.value=e,a(),n.onchange(e)},position:t.position})},styles:t.styles});var a=function(){if(void 0===t.staticLabel){var e=n.options.find(function(e){return e.value==n.value}).label;n.setLabel(e)}};a()},e.Scrubber=function(e){var t=this,n=e.min,a=e.max;t.value=e.value;var o=document.createElement("div");o.className="joy-scrubber",t.dom=o,t.setLabel=function(e){o.innerHTML=e.toFixed(t.sigfigs)};var r,i,c=function(n){n=parseFloat(n.toFixed(t.sigfigs)),e.onchange(n)},l=!1,s=!1,u=0,d=function(n){l=!0,r=n.clientX,i=t.value,u=0,e.onstart&&e.onstart()},f=function(e){if(l){s=!0;var n=Math.pow(.1,t.sigfigs);n=parseFloat(n.toPrecision(1));var a=e.clientX-r;r=e.clientX;var o=Math.abs(a/10);o<1&&(o=1),o>3&&(o=3),u+=a*o;var d=Math.floor(u/2),f=i+d*n;f=h(f),t.value!=f&&(t.value=f,t.setLabel(f),c(f))}},h=function(e){return void 0!==n&&e<n&&(e=n),void 0!==a&&e>a&&(e=a),e},p=function(){l=!1,e.onstop&&e.onstop(),setTimeout(function(){s=!1},1)};o.addEventListener("mousedown",d),window.addEventListener("mousemove",f),window.addEventListener("mouseup",p),t.kill=function(){o.removeEventListener("mousedown",d),window.removeEventListener("mousemove",f),window.removeEventListener("mouseup",p)};var v=!1;o.onblur=function(){v&&(v=!1,o.contentEditable=!1,_unselectAll(),g(o.innerText),t.value=m(),t.setLabel(t.value),c(t.value),e.onstop&&e.onstop())},_preventWeirdCopyPaste(o),_blurOnEnter(o),o.onclick=function(){s||(v=!0,o.contentEditable=!0,o.spellcheck=!1,_selectAll(o),e.onstart&&e.onstart())},o.oninput=function(e){if(v){var t=/[^0-9.\-]/g;o.innerText.match(t)&&(o.innerText=o.innerText.replace(t,"")),_fixStringInput(o),c(m())}};var m=function(){var e=parseFloat(o.innerText);return isNaN(e)&&(e=0),e=h(e)};t.sigfigs=0;var g=function(e){var n,a=(e=e.toString()).search(/\./);n=a>=0?e.length-1-a:0,t.sigfigs=n};g(t.value),t.setLabel(t.value)},e.String=function(e){var t=document.createElement("div");t.className="joy-string",this.dom=t;var n=document.createElement("span");n.contentEditable=!0,n.spellcheck=!1;var a=document.createElement("span"),o=document.createElement("span");a.innerHTML=e.prefix||"",o.innerHTML=e.suffix||"",t.appendChild(a),t.appendChild(n),t.appendChild(o),n.oninput=function(t){_fixStringInput(n);var a=n.innerText;e.onchange(a)},n.onfocus=function(){_selectAll(n)},n.onblur=function(){_unselectAll()},_preventWeirdCopyPaste(n),n.onkeypress=function(e){return 13!=e.which||(n.blur(),!1)},this.setString=function(e){n.innerText=e,_fixStringInput(n)},this.setColor=function(e){e=_forceToRGB(e),t.style.color=e,t.style.borderColor=e},e.color&&this.setColor(e.color),this.styles=e.styles||[];for(var r=0;r<this.styles.length;r++)t.classList.add(this.styles[r]);this.setString(e.value)},e.TextBox=function(e){var t,n=this;e.multiline?t=document.createElement("textarea"):(t=document.createElement("input")).type="text",e.placeholder&&(t.placeholder=e.placeholder),t.spellcheck=!1,t.className="joy-textbox",n.dom=t;var a=n.dom;e.readonly?(t.setAttribute("readonly",1),t.addEventListener("click",function(){n.select()})):t.oninput=function(n){e.onchange(t.value)},e.width&&(t.style.width="number"==typeof e.width?e.width+"px":e.width),n.getValue=function(){return t.value},n.setValue=function(e){t.value=e},n.select=function(){t.select()},n.styles=e.styles||[];for(var o=0;o<n.styles.length;o++)a.classList.add(n.styles[o]);if(e.value&&n.setValue(e.value),e.multiline){a.addEventListener("input",function(){this.style.height="auto",this.style.height=this.scrollHeight+"px"},!1),setTimeout(function(){a.setAttribute("style","height:"+a.scrollHeight+"px; overflow-y:hidden;")},1)}}}(),function(){var e={};Joy.modal=e,e.init=function(t){e.dom=document.createElement("div"),e.dom.id="joy-modal",document.body.appendChild(e.dom),e.bg=document.createElement("div"),e.bg.id="joy-bg",e.bg.onclick=function(){e.currentUI.kill()},e.dom.appendChild(e.bg),e.box=document.createElement("div"),e.box.id="joy-box",e.box.className="arrow_box",e.dom.appendChild(e.box),e.dom.addEventListener("wheel",function(e){return e.preventDefault(),!1})},e.show=function(t){e.dom.style.display="block",e.currentUI=t,e.box.appendChild(t.dom);var n=t.config.position||"below",a=e.box.getBoundingClientRect(),o=t.config.source.getBoundingClientRect();if("below"==n){(i=o.top+o.height+20)+a.height>document.body.clientHeight&&(n="left")}switch(e.box.setAttribute("position",n),n){case"below":var r=o.left+o.width/2,i=o.top+o.height+20;r-=a.width/2;break;case"left":r=o.left-20,i=o.top+o.height/2;r-=a.width,i-=a.height/2}e.box.style.left=r+"px",e.box.style.top=i+"px",e.currentUI.config.onopen&&e.currentUI.config.onopen()},e.hide=function(){_emptyDOM(e.box),e.dom.style.display="none",e.currentUI.config.onclose&&e.currentUI.config.onclose()},e.Chooser=function(t){var n={};n.config=t;var a=document.createElement("div");a.className="joy-modal-chooser",n.dom=a;var o=document.createElement("div");a.appendChild(o),n.options=[],n.categories={};var r="_placeholder_",i=function(e){var t=document.createElement("div");o.appendChild(t),n.categories[e]=t};n.populate=function(){for(var e=0;e<t.options.length;e++){(c=(a=t.options[e]).category)?n.categories[c]||i(c):n.categories[r]||i(r)}for(e=0;e<t.options.length;e++){var a=t.options[e],o=document.createElement("div");o.innerHTML=a.label,a.color&&(o.style.color=a.color);var c=a.category||r;n.categories[c].appendChild(o),function(e){o.onclick=function(t){n.onchange(e.value),t.stopPropagation()}}(a)}},n.populate(),n.onchange=function(e){n.kill(),t.onchange(e)},n.kill=function(){e.hide()},e.show(n)},e.Color=function(t){var n={};n.config=t;var a=document.createElement("div");a.className="joy-modal-color",n.dom=a,t.value=t.value||[0,1,1],n.h=t.value[0],n.s=t.value[1],n.v=t.value[2];n.dom.style.width=195,n.dom.style.height=170;var o=document.createElement("canvas");o.id="joy-color-wheel";var r=o.getContext("2d");o.width=300,o.height=300,o.style.width=o.width/2,o.style.height=o.height/2,a.appendChild(o),o.style.top=10,o.style.left=10;var i=function(){var e=r;e.clearRect(0,0,e.canvas.width,e.canvas.height);for(var t=o.width,a=o.height,i=e.createImageData(t,a),c=i.data,l=t/2,s=a/2,u=t/2,d=u+2,f=0;f<t;f++)for(var h=0;h<a;h++){var p=f-l,v=h-s,m=Math.sqrt(p*p+v*v);if(m<d){m>=u&&(m=u);var g=Math.atan2(v,p),y=_HSVtoRGB(g=360*(g/Math.TAU+.5),m/=u,n.v),b=4*(f+h*t);c[b]=y[0],c[b+1]=y[1],c[b+2]=y[2],c[b+3]=255}}e.putImageData(i,0,0),e.save(),e.globalCompositeOperation="destination-in",e.beginPath(),e.fillStyle="#fff",e.arc(l,s,u,0,Math.TAU),e.fill(),e.restore()};i();var c=document.createElement("canvas");c.id="joy-color-value";var l=c.getContext("2d");c.width=30,c.height=300,c.style.width=c.width/2,c.style.height=c.height/2,a.appendChild(c),c.style.top=10,c.style.right=10;var s=function(){var e=l;e.clearRect(0,0,e.canvas.width,e.canvas.height);for(var t=c.width,a=c.height,o=e.createImageData(t,a),r=o.data,i=0;i<t;i++)for(var s=0;s<a;s++){var u=_HSVtoRGB(n.h,n.s,1-s/a),d=4*(i+s*t);r[d]=u[0],r[d+1]=u[1],r[d+2]=u[2],r[d+3]=255}e.putImageData(o,0,0)};s();var u=document.createElement("canvas");u.id="joy-color-picker";var d=u.getContext("2d");u.width=390,u.height=340,u.style.width=u.width/2,u.style.height=u.height/2,a.appendChild(u);var f=function(){var e,t,a=d;a.clearRect(0,0,a.canvas.width,a.canvas.height),a.fillStyle=_HSVToRGBString(n.h,n.s,n.v),a.strokeStyle="#fff",a.lineWidth=2;var r=20+o.width/2,i=20+o.height/2,l=n.h*(Math.TAU/360),s=n.s*(o.width/2);e=r-Math.cos(l)*s,t=i-Math.sin(l)*s,a.beginPath(),a.arc(e,t,15,0,Math.TAU),a.fill(),a.stroke();e=20+o.width+20+c.width/2,t=20+c.height*(1-n.v),a.beginPath(),a.arc(e,t,15,0,Math.TAU),a.fill(),a.stroke()};f();var h,p=!1,v=function(e){if(e.target==u){var t=2*e.offsetX,n=2*e.offsetY;"hs"==h?m(t-=20,n-=20):(t-=20+o.width+20,g(t,n-=20)),_()}},m=function(e,t){var a=o.width/2,r=e-a,i=t-a,c=Math.atan2(i,r),l=Math.sqrt(r*r+i*i);(c=360*(c/Math.TAU+.5))<0&&(c=0),c>360&&(c=360),(l/=a)<0&&(l=0),l>1&&(l=1),n.h=c,n.s=l,s(),f()},g=function(e,t){n.v=1-t/c.height,n.v<0&&(n.v=0),n.v>1&&(n.v=1),i(),f()},y=function(e){p=!0,h=2*e.offsetX<20+o.width+10?"hs":"v",v(e)},b=function(e){p&&v(e)},w=function(){p=!1};u.addEventListener("mousedown",y),window.addEventListener("mousemove",b),window.addEventListener("mouseup",w);var _=function(){var e=[n.h,n.s,n.v];e[0]=parseFloat(e[0].toFixed(0)),e[1]=parseFloat(e[1].toFixed(2)),e[2]=parseFloat(e[2].toFixed(2)),t.onchange(e)};n.kill=function(){a.removeEventListener("mousedown",y),window.removeEventListener("mousemove",b),window.removeEventListener("mouseup",w),e.hide()},e.show(n)}}(),Joy.add({type:"number",tags:["ui"],initWidget:function(e){var t=e.options,n=new Joy.ui.Scrubber({min:t.min,max:t.max,step:t.step,value:e.getData("value"),onstart:function(){e.top.activePreview=e},onstop:function(){e.top.activePreview=null},onchange:function(t){e.setData("value",t)}});e.dom=n.dom;var a=null;e.dom.onmouseenter=function(){if(e.top.canPreview("numbers")){e.previewData=_clone(e.data);var t=Math.abs(.05*e.data.value);0==t&&(t=1);var n=0;a=setInterval(function(){if(!e.top.canPreview("numbers"))return o();n+=Math.TAU/30/.25,e.previewData.value=e.data.value+Math.sin(n)*t,e.update(),n>Math.TAU&&o()},1e3/30)}};var o=function(){a&&clearInterval(a),e.previewData=null,e.update()};e.dom.onmouseleave=o},onget:function(e){return e.data.value},placeholder:{value:3}}),Joy.add({type:"color",tags:["ui"],initWidget:function(e){var t=new Joy.ui.Button({label:"&nbsp;",onclick:function(){Joy.modal.Color({source:e.dom,value:e.getData("value"),onchange:function(t){e.setData("value",t),n()},onopen:function(){e.top.activePreview=e},onclose:function(){e.top.activePreview=null}})},styles:["joy-color"]});e.dom=t.dom;var n=function(){var n=e.getData("value");t.dom.style.background=_HSVToRGBString(n)};n();var a,o,r,i=null;e.dom.onmouseenter=function(){e.top.canPreview("numbers")&&(a=e.data.value[2],e.previewData=_clone(e.data),r=0,o=2/30*2,i=setInterval(function(){if(!e.top.canPreview("numbers"))return c();var t=e.previewData.value;t[2]+=o,t[2]>1&&(t[2]=1,o*=-1),t[2]<0&&(t[2]=0,o*=-1),e.update(),(r+=2/30)>=1&&c()},1e3/30))};var c=function(){i&&clearInterval(i),e.previewData=null,e.update()};e.dom.onmouseleave=c},onget:function(e){return _HSVToRGBString(e.data.value)},placeholder:function(){return[Math.floor(360*Math.random()),.8,1]}}),Joy.add({type:"choose",tags:["ui"],initWidget:function(e){for(var t=e.data,n=e.options,a=0;a<n.length;a++){var o=n[a];void 0!==o.label&&void 0!==o.value||(n[a]={label:o.toString(),value:o})}var r=new Joy.ui.ChooserButton({value:t.value,options:n,onchange:function(n){t.value=n,e.update()},styles:e.styles});e.dom=r.dom},onget:function(e){return e.data.value}}),Joy.add({type:"string",tags:["ui"],initWidget:function(e){var t=e.options;e.stringUI=new Joy.ui.String({prefix:t.prefix,suffix:t.suffix,color:t.color,value:e.getData("value"),onchange:function(t){e.setData("value",t)}}),e.dom=e.stringUI.dom,e.onDataChange=function(){var t=e.getData("value");e.stringUI.setString(t)}},onget:function(e){return e.data.value},placeholder:"???"}),Joy.add({type:"save",tags:["ui"],initWidget:function(e){var t=document.createElement("div");t.className="joy-save",e.dom=t,e.saveButton=new Joy.ui.Button({label:"save:",onclick:function(){var t=Joy.saveToURL(e.top.data);e.url.setValue(t),e.url.select();t.length;e.info.innerHTML="P.S: you can shorten your link with <a href='http://tinyurl.com/' target='_blank'>TinyURL</a>!"}}),t.appendChild(e.saveButton.dom),e.url=new Joy.ui.TextBox({readonly:!0}),t.appendChild(e.url.dom),e.info=document.createElement("div"),e.info.id="joy-save-info",t.appendChild(e.info)}}),Joy.add({type:"actions",tags:["ui"],init:function(e){void 0!==e.resetVariables&&(e.data.resetVariables=e.resetVariables)},initWidget:function(e){var t=e.data.actions,n=document.createElement("div");n.className="joy-actions",e.dom=n;var a=document.createElement("list");a.id="joy-list",n.appendChild(a);var o=[{label:"Add action above",value:"action_above"},{label:"Add action below",value:"action_below"},{label:"Delete",value:"delete"}],r=function(n){var r=new Joy.ui.ChooserButton({position:"left",staticLabel:i(n),options:o,onchange:function(o){!function(n,o){var r=0;if("action_above"==o&&(r=-1),"action_below"==o&&(r=1),0!=r){var i=e.entries.indexOf(n);r>0&&(i+=1),Joy.modal.Chooser({position:"left",source:n.bullet.dom,options:d,onchange:function(t){u(t,i),e.update(),c()}})}"delete"==o&&(_removeFromArray(e.entries,n),_removeFromArray(t,n.actionData),e.removeChild(n.actor),a.removeChild(n.dom),e.update(),c())}(n,o)},styles:["joy-bullet"]});return r.dom.id="joy-bullet",r},i=function(t){for(var n=e.entries.indexOf(t)+1,a=0,o=e.parent;o;)"actions"==o.type&&a++,o=o.parent;var r;switch(a%3){case 0:r=n;break;case 1:r=_numberToAlphabet(n);break;case 2:r=_numberToRoman(n)}return r},c=function(){for(var t=0;t<e.entries.length;t++){var n=e.entries[t],a=n.bullet,o=i(n);a.setLabel(o)}};e.entries=[];for(var l=function(t,o){var i={},c=document.createElement("div");void 0===o&&(o=e.entries.length),e.entries.splice(o,0,i),a.insertBefore(c,a.children[o]);var l=r(i),s=document.createElement("div");s.id="joy-bullet-container",c.appendChild(s),s.appendChild(l.dom);var u=e.addChild({type:t.type},t),d=u.createWidget();d.id="joy-widget",c.appendChild(d),i.dom=c,i.bullet=l,i.actor=u,i.widget=d,i.actionData=t;var f,h,p=function(t){var n=t.offsetY/l.dom.getBoundingClientRect().height;n<0&&(n=0),n>1&&(n=1),f._PREVIEW=n,e.update()};return s.onmouseenter=function(t){if(e.top.canPreview("actions")){e.top.activePreview=e,e.previewData=_clone(e.data);var a=e.entries.indexOf(i);f=e.previewData.actions[a],e.previewData.actions.splice(a+1,0,{STOP:!0}),p(t),h=document.createElement("style"),document.head.appendChild(h),h.sheet.insertRule(".joy-actions.joy-previewing > #joy-list > div:nth-child(n+"+(a+2)+") { opacity:0.1; }"),h.sheet.insertRule(".joy-actions.joy-previewing > div.joy-bullet { opacity:0.1; }"),n.classList.add("joy-previewing")}},s.onmousemove=function(t){e.previewData&&p(t)},s.onmouseleave=function(){e.previewData&&(e.previewData=null,e.top.activePreview=null,e.update(),document.head.removeChild(h),n.classList.remove("joy-previewing"))},i},s=0;s<t.length;s++)l(t[s]);var u=function(e,n){var a={type:e};void 0===n?t.push(a):t.splice(n,0,a);l(a,n)},d=[];if(e.onlyActions)for(s=0;s<e.onlyActions.length;s++){var f=e.onlyActions[s],h=Joy.getTemplateByType(f),p=h.tags.filter(function(e){return"action"!=e})[0];d.push({label:h.name,value:f,category:p})}else{var v=Joy.getTemplatesByTag("action");for(s=0;s<v.length;s++){var m=v[s];p=m.tags.filter(function(e){return"action"!=e})[0];d.push({label:m.name,value:m.type,category:p})}}var g=new Joy.ui.ChooserButton({staticLabel:"+",options:d,onchange:function(t){u(t),e.update()},styles:["joy-bullet"]});n.appendChild(g.dom)},onact:function(e){e.target._variables||(e.target._variables={}),e.data.resetVariables&&(e.target._variables={});for(var t=0;t<e.data.actions.length;t++){var n=e.data.actions[t];if(n.STOP)return"STOP";var a=e.actor.entries[t].actor.act(e.target,n);if("STOP"==a)return a}},placeholder:{actions:[],resetVariables:!0}}),Joy.module("instructions",function(){Joy.add({name:"Repeat the following...",type:"instructions/repeat",tags:["instructions","action"],init:"Repeat the following {id:'count', type:'number', min:1, placeholder:3} times: {id:'actions', type:'actions', resetVariables:false}",onact:function(e){var t=1;void 0!==e.data._PREVIEW&&(t=e.data._PREVIEW);for(var n=Math.floor(e.data.count*t),a=0;a<n;a++){var o=e.actor.actions.act(e.target);if("STOP"==o)return o}}}),Joy.add({name:"// Write a note",type:"instructions/comment",tags:["instructions","action"],initWidget:function(e){e.dom=document.createElement("div"),e.box=new Joy.ui.TextBox({multiline:!0,placeholder:"// your notes here",value:e.getData("value"),onchange:function(t){e.setData("value",t)},styles:["box"]}),e.dom.appendChild(e.box.dom)}})}),Joy.add({type:"variableName",tags:["ui"],init:function(e){var t=e.variableType;e._createNewReference=function(){var n={value:function(){var n=0;return Joy.getReferencesByTag(e,t).map(function(e){return e.data.value}).forEach(function(e){var t;"thing"==e&&(t=1);var a=e.match(/thing\s(\d+)/);a&&(t=parseInt(a[1])),n<t&&(n=t)}),0==n?"thing":"thing "+(n+1)}(),color:_randomHSV()},a=Joy.createReference(e,t,n);e.setData("refID",a.id,!0),Joy.connectReference(e,a.id)};var n=e.getData("refID");if(n)Joy.connectReference(e,n);else{var a=Joy.getReferencesByTag(e,t);if(e.startWithExisting&&a.length>0){n=a[a.length-1].id,e.setData("refID",n,!0),Joy.connectReference(e,n)}else e._createNewReference()}e._switchReference=function(t){var n=e.getData("refID");Joy.disconnectReference(e,n),e.setData("refID",t),Joy.connectReference(e,t)}},initWidget:function(e){e.dom=document.createElement("span");var t=e.getData("refID"),n=Joy.getReferenceById(e,t).data,a=e.addChild({type:"string",prefix:"[",suffix:"]",color:n.color},n),o=a.createWidget();e.dom.appendChild(o);var r=a.onDataChange;a.onDataChange=function(){r();var e=a.getData("color");a.stringUI.setColor(e)};var i=e.variableType;e.noChooser||(e.dom.onclick=function(){var t=[],n=Joy.getReferencesByTag(e,i),o=e.getData("refID");n.forEach(function(e){if(e.id!=o){var n=e.data.color;n=_HSVToRGBString(n[0],n[1],n[2]),t.push({label:"["+e.data.value+"]",value:e.id,color:n})}}),t.push({category:"meta",label:"(+new)",value:"NEW"}),t.push({category:"meta",label:"(change color)",value:"CHANGE_COLOR"}),Joy.modal.Chooser({source:e.dom,options:t,onchange:function(t){if("CHANGE_COLOR"==t)Joy.modal.Color({source:e.dom,value:a.getData("color"),onchange:function(e){a.setData("color",e),a.stringUI.setColor(e)}});else{if("NEW"==t){var n=e.getData("refID");Joy.disconnectReference(e,n),e._createNewReference(),e.update()}else e._switchReference(t);var o=e.getData("refID"),r=Joy.getReferenceById(e,o);a.switchData(r.data)}}})})},onget:function(e){var t=e.data.refID;return Joy.getReferenceById(e.actor,t).data.value},onkill:function(e){var t=e.getData("refID");Joy.disconnectReference(e,t)}}),Joy.module("math",function(){Joy.modify("number","number_raw",function(e){return{init:function(e){if(!e.noVariables){var t=e.getData("value");"number"==typeof t&&(e.setData("value",void 0,!0),e.setData("chain",[{type:"number_raw",value:t}],!0)),e._makeNewChainActor=function(t,n){var a,o=t.type;switch(o){case"number_raw":a=e.addChild({type:o},t);break;case"variableName":a=e.addChild({type:o,variableType:"number",noChooser:!0},t);break;case"choose":a=e.addChild({type:o,options:[{label:"+",value:"+"},{label:"-",value:"-"},{label:"&times;",value:"*"},{label:"&divide;",value:"/"}],styles:["joy-math"]},t)}var r=e.getData("chain");return void 0!==n?(e.chainActors.splice(n,0,a),r.splice(n,0,t)):(e.chainActors.push(a),r.push(t)),a},e.chainActors=[];var n=e.getData("chain"),a=_clone(n);n.splice(0,n.length);for(var o=0;o<a.length;o++)e._makeNewChainActor(a[o]);e._replaceChainActor=function(t,n){var a=e._deleteChainActor(t),o=e._makeNewChainActor(n,a);return e.update(),o},e._deleteChainActor=function(t){var n=e.chainActors.indexOf(t);_removeFromArray(e.chainActors,t),e.removeChild(t);return e.getData("chain").splice(n,1),n}}},initWidget:function(t){if(t.noVariables)e.initWidget(t);else{t.dom=document.createElement("span"),t.dom.className="joy-number";t._chainEntries=[],t._makeChainEntry=function(e,a){var o=document.createElement("span");if(e.createWidget(),o.appendChild(e.dom),"choose"!=e.type){var r,i=new Joy.ui.Button({onclick:function(){n(r)},styles:["joy-more"]});o.appendChild(i.dom)}if(void 0!==a)if(a<t.dom.childNodes.length){var c=t.dom.childNodes[a];t.dom.insertBefore(o,c)}else t.dom.appendChild(o);else t.dom.appendChild(o);"choose"!=e.type&&function(e){var n;e.dom.addEventListener("mousedown",function(){n=+new Date}),e.dom.addEventListener("mouseup",function(){+new Date-n<500&&function(e){var n=[];if("number_raw"!=e.type){var a=t.placeholder.value;"number"==typeof a&&n.push({label:a,value:{type:"number_raw",value:a}})}var o,r=Joy.getReferencesByTag(t,"number");"variableName"==e.type&&(o=e.getData("refID")),r.forEach(function(e){if(e.id!=o){var t=e.data.color;t=_HSVToRGBString(t[0],t[1],t[2]),n.push({label:"["+e.data.value+"]",value:{type:"variableName",refID:e.id},color:t})}}),n.length>0&&Joy.modal.Chooser({source:e.dom,options:n,onchange:function(n){var a=t._replaceChainActor(e,n);t._replaceChainEntry(e,a)}})}(e)})}(e),r={widget:o,actor:e},void 0!==a?t._chainEntries.splice(a,0,r):t._chainEntries.push(r)},t._deleteChainEntry=function(e){var n=t._chainEntries.find(function(t){return t.actor==e}),a=t._chainEntries.indexOf(n),o=n.widget;return t.dom.removeChild(o),_removeFromArray(t._chainEntries,n),a},t._replaceChainEntry=function(e,n){var a=t._deleteChainEntry(e);t._makeChainEntry(n,a)};for(var n=function(e){var n=e.widget.innerText,a=[{label:n+" + 2",value:"+"},{label:n+" - 2",value:"-"},{label:n+" &times; 2",value:"*"},{label:n+" &divide; 2",value:"/"}],o=t._chainEntries.indexOf(e);if(t._chainEntries.length>1){var r;r=0==o?o+1:o-1;var i,c=t._chainEntries[r].widget.innerText;i=0==o?n+" "+c:c+" "+n;var l=[o,r].sort();a.push({category:"meta",label:"(delete “"+i+"”)",value:l})}Joy.modal.Chooser({source:e.widget,options:a,onchange:function(n){if("string"==typeof n){var a=t._chainEntries.indexOf(e);a++;var o=t._makeNewChainActor({type:"choose",value:n},a);t._makeChainEntry(o,a),a++;var r=t._makeNewChainActor({type:"number_raw",value:2},a);t._makeChainEntry(r,a)}else for(var i=n,c=i.length-1;c>=0;c--){var l=i[c],s=t._chainEntries[l].actor;t._deleteChainActor(s),t._deleteChainEntry(s)}t.update()}})},a=0;a<t.chainActors.length;a++){var o=t.chainActors[a];t._makeChainEntry(o)}}},onget:function(t){if(t.actor.noVariables)return e.onget(t);for(var n=[],a=0;a<t.data.chain.length;a+=2){var o,r=t.actor.chainActors[a];switch(r.type){case"number_raw":o=r.get(t.target);break;case"variableName":o=t.target._variables[r.get(t.target)]}if(a>0){var i=t.actor.chainActors[a-1].get();n.push(i)}n.push(o)}for(a=1;a<n.length;a+=2){if("*"==(i=n[a])||"/"==i){var c=n[a-1],l=n[a+1];s="*"==i?c*l:c/l,n.splice(a-1,3,s),a-=2}}for(a=1;a<n.length;a+=2){if("+"==(i=n[a])||"-"==i){var s;c=n[a-1],l=n[a+1];s="+"==i?c+l:c-l,n.splice(a-1,3,s),a-=2}}return n[0]}}}),Joy.add({name:"Set [number]",type:"math/set",tags:["math","action"],init:"Set {id:'varname', type:'variableName', variableType:'number'} to {id:'value', type:'number'}",onact:function(e){e.target._variables[e.data.varname]=e.data.value}}),Joy.add({name:"Do math to [number]",type:"math/operation",tags:["math","action"],init:JSON.stringify({id:"operation",type:"choose",placeholder:"+",options:[{label:"+ Increase",value:"+"},{label:"- Decrease",value:"-"},{label:"&times; Multiply",value:"*"},{label:"&divide; Divide",value:"/"}]})+" {id:'varname', type:'variableName', variableType:'number', startWithExisting:true} by {id:'value', type:'number'}",onact:function(e){var t=e.target._variables,n=e.data.varname;switch(void 0===t[n]&&(t[n]=0),e.data.operation){case"+":t[n]+=e.data.value;break;case"-":t[n]-=e.data.value;break;case"*":t[n]*=e.data.value;break;case"/":t[n]/=e.data.value}}}),Joy.add({name:"If [math] then...",type:"math/if",tags:["math","action"],init:"If {id:'value1', type:'number'} {id:'test', type:'choose', options:['<','≤','=','≥','>'], placeholder:'='} {id:'value2', type:'number'}, then: {id:'actions', type:'actions', resetVariables:false}",onact:function(e){var t,n=e.data.value1,a=e.data.value2;switch(e.data.test){case"<":t=n<a;break;case"≤":t=n<=a;break;case"=":t=n==a;break;case"≥":t=n>=a;break;case">":t=n>a}if(t){var o=e.actor.actions.act(e.target);if("STOP"==o)return o}}})}),Joy.module("random",function(){Joy.add({name:"With a X% chance...",type:"random/if",tags:["random","action"],init:"With a {id:'chance', type:'number', min:0, max:100, placeholder:50}% chance, do:{id:'actions', type:'actions', resetVariables:false}",onact:function(e){var t=e.data.chance/100;if(Math.random()<t){var n=e.actor.actions.act(e.target);if("STOP"==n)return n}}}),Joy.add({name:"Set random [number]",type:"random/set",tags:["random","action"],init:"Set {id:'varname', type:'variableName', variableType:'number'} to a random {id:'numtype', type:'choose', options:['number','integer'], placeholder:'number'} between {id:'min', type:'number', placeholder:1} and {id:'max', type:'number', placeholder:100}",onact:function(e){var t,n=e.target._variables,a=e.data.varname,o=e.data.min,r=e.data.max,i=Math.min(o,r),c=Math.max(o,r);t="integer"==e.data.numtype?i+Math.floor(Math.random()*(c-i+1)):i+Math.random()*(c-i),n[a]=t}})});
*****************/

function Joy(e) {
    var t = this == window ? {} : this;
    if (e.modules)
        for (var n = 0; n < e.modules.length; n++) Joy.loadModule(e.modules[n]);
    return Joy.Actor.call(t, e), Joy.initReferences(t), void 0 == t.previewActions && (t.previewActions = !0), void 0 == t.previewNumbers && (t.previewNumbers = !0), t.activePreview = null, t.canPreview = function(e) {
        e = e.charAt(0).toUpperCase() + e.slice(1);
        return t["preview" + e] && !t.activePreview
    }, t.createWidget(), t.container && ("string" == typeof t.container && (t.container = document.body.querySelector(t.container)), t.container.appendChild(t.dom)), Joy.ui.init(t), Joy.modal.init(t), t.onupdate = t.onupdate || function(e) {}, t.update = function() {
        var e = {
            actor: t,
            data: {}
        };
        t.children.forEach(function(t) {
            var n = t.dataID;
            if (n) {
                var a = t.get();
                e.data[n] = a
            }
        }), t.children.forEach(function(t) {
            t.id && (e[t.id] = t)
        }), t.onupdate(e)
    }, t.update(), t
}

function _HSVtoRGB(e, t, n) {
    var a, o, r, i, c, l, s, u;
    switch (1 === arguments.length && (t = e.s, n = e.v, e = e.h), e /= 360, i = Math.floor(6 * e), c = 6 * e - i, l = n * (1 - t), s = n * (1 - c * t), u = n * (1 - (1 - c) * t), i % 6) {
        case 0:
            a = n, o = u, r = l;
            break;
        case 1:
            a = s, o = n, r = l;
            break;
        case 2:
            a = l, o = n, r = u;
            break;
        case 3:
            a = l, o = s, r = n;
            break;
        case 4:
            a = u, o = l, r = n;
            break;
        case 5:
            a = n, o = l, r = s
    }
    return [Math.round(255 * a), Math.round(255 * o), Math.round(255 * r)]
}

function _HSVToRGBString(e, t, n) {
    1 === arguments.length && (t = e[1], n = e[2], e = e[0]);
    var a = _HSVtoRGB(e, t, n);
    return "rgb(" + a[0] + "," + a[1] + "," + a[2] + ")"
}

function _randomHSV() {
    var e = _randomHSVArray[_randomHSVIndex];
    return _randomHSVIndex = (_randomHSVIndex + 1) % _randomHSVArray.length, e
}

function _forceToRGB(e) {
    return Array.isArray(e) && (e = _HSVToRGBString(e[0], e[1], e[2])), e
}
Joy.Actor = function(e, t, n) {
    var a = this;
    if (a._class_ = "Actor", a.options = e, a.parent = t, a.top = a.parent ? a.parent.top : a, a.type = e.type, a.type) {
        var o = Joy.getTemplateByType(a.type);
        _configure(a, o)
    }
    if (_configure(a, a.options), a.children = [], a.addChild = function(e, t) {
            return "Actor" != e._class_ && (e = new Joy.Actor(e, a, t)), a.children.push(e), e.id && (a[e.id] = e), e
        }, a.removeChild = function(e) {
            _removeFromArray(a.children, e), e.kill()
        }, a.update = function() {
            a.onupdate && a.onupdate(a), a.parent && a.parent.update()
        }, a.onkill = a.onkill || function() {}, a.kill = function() {
            for (a.dom && a.dom.parentNode && a.dom.parentNode.removeChild(a.dom), unwatch(a.data, c); a.children.length > 0;) a.removeChild(a.children[0]);
            a.onkill(a)
        }, void 0 === a.placeholder && (a.placeholder = {}), "function" == typeof a.placeholder && (a.placeholder = a.placeholder()), ("object" != typeof a.placeholder || Array.isArray(a.placeholder)) && (a.placeholder = {
            value: _clone(a.placeholder)
        }), a.placeholder.type || (a.placeholder.type = a.type), a.data = a.data || n, !a.data) {
        t = a.parent;
        var r = a.dataID;
        t && r ? (t.data[r] || (t.data[r] = _clone(a.placeholder)), a.data = t.data[r]) : a.data = _clone(a.placeholder)
    }
    a.getData = function(e) {
        return a.data[e]
    }, a.setData = function(e, t, n) {
        i = !0, void 0 === t ? delete a.data[e] : a.data[e] = t, setTimeout(function() {
            i = !1
        }, 1), n || a.update()
    }, a.switchData = function(e) {
        unwatch(a.data, c), a.data = e, watch(a.data, c), a.onDataChange && a.onDataChange(e)
    };
    var i = !1,
        c = function(e, t, n, o) {
            i || a.onDataChange && a.onDataChange()
        };
    watch(a.data, c), a.dom = null, a.initWidget = a.initWidget || function() {
        a.dom = document.createElement("span"), a.dom.innerHTML = "[todo: '" + a.type + "' widget]"
    }, a.createWidget = function() {
        return a.initWidget(a), a.dom
    }, a.previewData = null, a.onact = a.onact || function() {}, a.act = function(e, t) {
        var n;
        return n = _clone(t ? t : a.previewData ? a.previewData : a.data), a.children.forEach(function(t) {
            var a = t.dataID;
            if (a) {
                var o = t.get(e);
                n[a] = o
            }
        }), a.onact({
            actor: a,
            target: e,
            data: n
        })
    }, a.onget = a.onget || function() {}, a.get = function(e) {
        var t = a.previewData ? a.previewData : a.data;
        return t = _clone(t), a.onget({
            actor: a,
            target: e,
            data: t
        })
    }, a.init && ("string" == typeof a.init && Joy.initializeWithString(a, a.init), "function" == typeof a.init && a.init(a))
}, Joy.templates = [], Joy.add = function(e) {
    Joy.templates.push(e)
}, Joy.getTemplateByType = function(e) {
    var t = Joy.templates.find(function(t) {
        return t.type == e
    });
    if (!t) throw Error("No actor template of type '" + e + "'!");
    return t
}, Joy.getTemplatesByTag = function(e) {
    return Joy.templates.filter(function(t) {
        return t.tags.indexOf(e) >= 0
    })
}, Joy.modify = function() {
    var e, t, n;
    2 == arguments.length ? (e = arguments[0], n = arguments[1]) : (e = arguments[0], t = arguments[1], n = arguments[2]);
    var a = {},
        o = Joy.getTemplateByType(e);
    _configure(a, o);
    var r = n(o);
    _configure(a, r), t ? o.type = t : _removeFromArray(Joy.templates, o), Joy.add(a)
}, Joy.initializeWithString = function(e, t) {
    for (var n = [], a = t, o = -1, r = -1, i = 0, c = 0; c < a.length; c++) {
        var l = a[c];
        if (0 == i && "{" == l && (o = c), "{" == l && i++, "}" == l && i--, 0 == i && "}" == l) {
            r = c + 1;
            var s = a.slice(o, r);
            s = (s = s.replace(/(\w+)\:/g, "'$1':")).replace(/\'/g, '"'), (s = JSON.parse(s)).dataID = s.dataID || s.id, n.push(s), a = a.substr(0, o) + "<span id='widget_" + s.id + "'></span>" + a.substr(r), c = 0, o = -1, r = -1, i = 0
        }
    }
    n.forEach(function(t) {
        e.addChild(t)
    }), e.createWidget = function() {
        return e.dom = document.createElement("span"), e.dom.innerHTML = a, e.children.forEach(function(t) {
            t.createWidget();
            var n = "#widget_" + t.id,
                a = e.dom.querySelector(n);
            e.dom.replaceChild(t.dom, a)
        }), e.dom
    }
}, Joy.modules = {}, Joy.module = function(e, t) {
    Joy.modules[e] = t
}, Joy.loadModule = function(e) {
    var t = Joy.modules[e];
    if (!t) throw Error("There's no module called '" + e + "'!");
    t()
}, Joy.initReferences = function(e) {
    var t = e.top.data;
    t._references || (t._references = {});
    for (var n in t._references) {
        t._references[n].connected = 0
    }
}, Joy.createReference = function(e, t, n) {
    var a = e.top.data,
        o = {
            id: _generateUID(a._references),
            tags: _forceToArray(t),
            data: n,
            connected: 0
        };
    return a._references[o.id] = o, o
}, Joy.getReferenceById = function(e, t) {
    return e.top.data._references[t]
}, Joy.getReferencesByTag = function(e, t) {
    var n = e.top.data,
        a = [];
    for (var o in n._references) {
        var r = n._references[o];
        r.tags.indexOf(t) >= 0 && a.push(r)
    }
    return a
}, Joy.connectReference = function(e, t) {
    Joy.getReferenceById(e, t).connected++
}, Joy.disconnectReference = function(e, t) {
    var n = Joy.getReferenceById(e, t);
    n.connected--, 0 == n.connected && Joy.deleteReference(e, t)
}, Joy.deleteReference = function(e, t) {
    var n = e.top.data;
    n._references[t];
    delete n._references[t]
}, Joy.saveToURL = function(e) {
    var t = JSON.stringify(e),
        n = LZString.compressToEncodedURIComponent(t);
    return window.location.origin + window.location.pathname + "?data=" + n
}, Joy.loadFromURL = function() {
    var e = _getParameterByName("data"),
        t = LZString.decompressFromEncodedURIComponent(e);
    if (t) {
        return JSON.parse(t)
    }
    return null
}, Math.TAU = 2 * Math.PI;
var _clone = function(e) {
        return JSON.parse(JSON.stringify(e))
    },
    _configure = function(e, t) {
        for (var n in t) {
            var a = t[n];
            e[n] = a
        }
    },
    _removeFromArray = function(e, t) {
        var n = e.indexOf(t);
        return !(n < 0) && (e.splice(n, 1), !0)
    },
    _nbsp = function() {
        var e = document.createElement("span");
        return e.innerHTML = "&nbsp;", e
    },
    _numberToRoman = function(e) {
        if (!+e) return NaN;
        for (var t = String(+e).split(""), n = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM", "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC", "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"], a = "", o = 3; o--;) a = (n[+t.pop() + 10 * o] || "") + a;
        return (Array(+t.join("") + 1).join("M") + a).toLowerCase()
    },
    _numberToAlphabet = function(e) {
        for (var t = 0, n = 1; e >= n;) t++, e -= n, n *= 26;
        for (var a = "", o = 0; o < t; o++) a = "abcdefghijklmnopqrstuvwxyz".charAt(e % 26) + a, e = Math.floor(e / 26);
        return a
    },
    _insertTextAtCursor = function(e) {
        var t, n;
        window.getSelection ? (t = window.getSelection()).getRangeAt && t.rangeCount && ((n = t.getRangeAt(0)).deleteContents(), n.insertNode(document.createTextNode(e))) : document.selection && document.selection.createRange && (document.selection.createRange().text = e)
    },
    _preventWeirdCopyPaste = function(e) {
        e.addEventListener("paste", function(e) {
            if (e.preventDefault(), e.clipboardData && e.clipboardData.getData) {
                var t = e.clipboardData.getData("text/plain");
                document.execCommand("insertHTML", !1, t)
            } else if (window.clipboardData && window.clipboardData.getData) {
                t = window.clipboardData.getData("Text");
                _insertTextAtCursor(t)
            }
        })
    },
    _selectAll = function(e, t) {
        var n = document.createRange();
        n.selectNodeContents(e), t && n.collapse(!1);
        var a = window.getSelection();
        a.removeAllRanges(), a.addRange(n)
    },
    _unselectAll = function() {
        window.getSelection().removeAllRanges()
    },
    _fixStringInput = function(e) {
        "" == e.innerText && (e.innerHTML = "&nbsp;", _selectAll(e)), e.innerHTML.search("<br>") >= 0 && (e.innerHTML = e.innerHTML.replace(/(\<br\>)+/g, "&nbsp;"), _selectAll(e, !0))
    },
    _blurOnEnter = function(e) {
        e.addEventListener("keypress", function(t) {
            13 === t.which && (t.preventDefault(), e.blur())
        })
    },
    _generateUID = function(e) {
        var t, n = 0;
        do {
            t = "id" + n, n++
        } while (e[t]);
        return t
    },
    _forceToArray = function(e) {
        return Array.isArray(e) ? e : [e]
    },
    _emptyDOM = function(e) {
        for (; e.hasChildNodes();) e.removeChild(e.lastChild)
    },
    _getParameterByName = function(e, t) {
        t || (t = window.location.href), e = e.replace(/[\[\]]/g, "\\$&");
        var n = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t);
        return n ? n[2] ? decodeURIComponent(n[2].replace(/\+/g, " ")) : "" : null
    },
    _randomHSVIndex = 0,
    _randomHSVArray = [
        [0, .6, 1],
        [30, .8, 1],
        [210, .8, 1],
        [260, .7, 1],
        [310, .6, 1]
    ];
! function(e) {
    "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (window.WatchJS = e(), window.watch = window.WatchJS.watch, window.unwatch = window.WatchJS.unwatch, window.callWatchers = window.WatchJS.callWatchers)
}(function() {
    function e() {
        b = null;
        for (var e = 0; e < y.length; e++) y[e]();
        y.length = 0
    }
    var t = {
            noMore: !1,
            useDirtyCheck: !1
        },
        n = [],
        a = [],
        o = [],
        r = !1;
    try {
        r = Object.defineProperty && Object.defineProperty({}, "x", {})
    } catch (t) {}
    var i = function(e) {
            return e && "[object Function]" == {}.toString.call(e)
        },
        c = function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        },
        l = function(e) {
            return "[object Object]" === {}.toString.apply(e)
        },
        s = function(e, t) {
            var n = [],
                a = [];
            if ("string" != typeof e && "string" != typeof t) {
                if (c(e) && t)
                    for (var o = 0; o < e.length; o++) void 0 === t[o] && n.push(o);
                else
                    for (var o in e) e.hasOwnProperty(o) && t && void 0 === t[o] && n.push(o);
                if (c(t) && e)
                    for (var r = 0; r < t.length; r++) void 0 === e[r] && a.push(r);
                else
                    for (var r in t) t.hasOwnProperty(r) && e && void 0 === e[r] && a.push(r)
            }
            return {
                added: n,
                removed: a
            }
        },
        u = function(e) {
            if (null == e || "object" != typeof e) return e;
            var t = e.constructor();
            for (var n in e) t[n] = e[n];
            return t
        },
        d = function(e, t, n) {
            try {
                Object.defineProperty(e, t, {
                    enumerable: !1,
                    configurable: !0,
                    writable: !1,
                    value: n
                })
            } catch (a) {
                e[t] = n
            }
        },
        f = function(e, t, n) {
            a[a.length] = {
                prop: t,
                object: e,
                orig: u(e[t]),
                callback: n
            }
        },
        h = function(e, t, n, a) {
            if ("string" != typeof e && (e instanceof Object || c(e))) {
                if (c(e)) {
                    if (E(e, "__watchall__", t, n), void 0 === n || n > 0)
                        for (var o = 0; o < e.length; o++) h(e[o], t, n, a)
                } else {
                    var i = [];
                    for (o in e) "$val" == o || !r && "watchers" === o || Object.prototype.hasOwnProperty.call(e, o) && i.push(o);
                    p(e, i, t, n, a)
                }
                a && O(e, "$$watchlengthsubjectroot", t, n)
            }
        },
        p = function(e, t, n, a, o) {
            if ("string" != typeof e && (e instanceof Object || c(e)))
                for (var r = 0; r < t.length; r++) {
                    var i = t[r];
                    v(e, i, n, a, o)
                }
        },
        v = function(e, t, n, a, o) {
            "string" != typeof e && (e instanceof Object || c(e)) && (i(e[t]) || (null != e[t] && (void 0 === a || a > 0) && h(e[t], n, void 0 !== a ? a - 1 : a), E(e, t, n, a), o && (void 0 === a || a > 0) && O(e, t, n, a)))
        },
        m = function(e, t) {
            if (!(e instanceof String) && (e instanceof Object || c(e)))
                if (c(e)) {
                    for (var n = ["__watchall__"], a = 0; a < e.length; a++) n.push(a);
                    g(e, n, t)
                } else {
                    var o = function(e) {
                        var n = [];
                        for (var a in e) e.hasOwnProperty(a) && (e[a] instanceof Object ? o(e[a]) : n.push(a));
                        g(e, n, t)
                    };
                    o(e)
                }
        },
        g = function(e, t, n) {
            for (var a in t) t.hasOwnProperty(a) && j(e, t[a], n)
        },
        y = [],
        b = null,
        w = function() {
            return b || (b = setTimeout(e)), b
        },
        _ = function(e) {
            null == b && w(), y[y.length] = e
        },
        C = function(e, t, n, a) {
            var o = null,
                r = -1,
                i = c(e);
            h(e, function(n, a, c, l) {
                var s = w();
                if (r !== s && (r = s, o = {
                        type: "update"
                    }, o.value = e, o.splices = null, _(function() {
                        t.call(this, o), o = null
                    })), i && e === this && null !== o) {
                    if ("pop" === a || "shift" === a) c = [], l = [l];
                    else if ("push" === a || "unshift" === a) c = [c], l = [];
                    else if ("splice" !== a) return;
                    o.splices || (o.splices = []), o.splices[o.splices.length] = {
                        index: n,
                        deleteCount: l ? l.length : 0,
                        addedCount: c ? c.length : 0,
                        added: c,
                        deleted: l
                    }
                }
            }, 1 == n ? void 0 : 0, a)
        },
        D = function(e, t, n, a, o) {
            e && t && (v(e, t, function(e, t, r, i) {
                var s = {
                    type: "update"
                };
                s.value = r, s.oldvalue = i, (a && l(r) || c(r)) && C(r, n, a, o), n.call(this, s)
            }, 0), (a && l(e[t]) || c(e[t])) && C(e[t], n, a, o))
        },
        E = function(e, n, a, o) {
            var r = !1,
                i = c(e);
            e.watchers || (d(e, "watchers", {}), i && J(e, function(t, a, r, i) {
                if (k(e, t, a, r, i), 0 !== o && r && (l(r) || c(r))) {
                    var s, u, d, f, p = e.watchers[n];
                    for ((f = e.watchers.__watchall__) && (p = p ? p.concat(f) : f), d = p ? p.length : 0, s = 0; s < d; s++)
                        if ("splice" !== a) h(r, p[s], void 0 === o ? o : o - 1);
                        else
                            for (u = 0; u < r.length; u++) h(r[u], p[s], void 0 === o ? o : o - 1)
                }
            })), e.watchers[n] || (e.watchers[n] = [], i || (r = !0));
            for (var s = 0; s < e.watchers[n].length; s++)
                if (e.watchers[n][s] === a) return;
            if (e.watchers[n].push(a), r) {
                var u = e[n],
                    p = function(a, r) {
                        var i = u;
                        if (u = a, 0 !== o && e[n] && (l(e[n]) || c(e[n])) && !e[n].watchers) {
                            var s, d = e.watchers[n].length;
                            for (s = 0; s < d; s++) h(e[n], e.watchers[n][s], void 0 === o ? o : o - 1)
                        }
                        return S(e, n) ? void I(e, n) : void(t.noMore || i !== a && (r ? k(e, n, "set", a, i) : A(e, n, "set", a, i), t.noMore = !1))
                    };
                t.useDirtyCheck ? f(e, n, p) : function(e, t, n, a) {
                    try {
                        Object.observe(e, function(e) {
                            e.forEach(function(e) {
                                e.name === t && a(e.object[e.name])
                            })
                        })
                    } catch (o) {
                        try {
                            Object.defineProperty(e, t, {
                                get: n,
                                set: function(e) {
                                    a.call(this, e, !0)
                                },
                                enumerable: !0,
                                configurable: !0
                            })
                        } catch (o) {
                            try {
                                Object.prototype.__defineGetter__.call(e, t, n), Object.prototype.__defineSetter__.call(e, t, function(e) {
                                    a.call(this, e, !0)
                                })
                            } catch (n) {
                                f(e, t, a)
                            }
                        }
                    }
                }(e, n, function() {
                    return u
                }, p)
            }
        },
        A = function(e, t, n, a, o) {
            if (void 0 !== t) {
                var r, i, c = e.watchers[t];
                (i = e.watchers.__watchall__) && (c = c ? c.concat(i) : i), r = c ? c.length : 0;
                for (var l = 0; l < r; l++) c[l].call(e, t, n, a, o)
            } else
                for (var t in e) e.hasOwnProperty(t) && A(e, t, n, a, o)
        },
        x = ["pop", "push", "reverse", "shift", "sort", "slice", "unshift", "splice"],
        T = function(e, t, n, a) {
            d(e, n, function() {
                var o, r, i, c, l = 0;
                if ("splice" === n) {
                    var s = arguments[0],
                        u = s + arguments[1];
                    for (i = e.slice(s, u), r = [], o = 2; o < arguments.length; o++) r[o - 2] = arguments[o];
                    l = s
                } else r = arguments.length > 0 ? arguments[0] : void 0;
                return c = t.apply(e, arguments), "slice" !== n && ("pop" === n ? (i = c, l = e.length) : "push" === n ? l = e.length - 1 : "shift" === n ? i = c : "unshift" !== n && void 0 === r && (r = c), a.call(e, l, n, r, i)), c
            })
        },
        J = function(e, t) {
            if (i(t) && e && !(e instanceof String) && c(e))
                for (var n, a = x.length; a--;) n = x[a], T(e, e[n], n, t)
        },
        j = function(e, t, n) {
            if (t) {
                if (e.watchers[t])
                    if (void 0 === n) delete e.watchers[t];
                    else
                        for (var a = 0; a < e.watchers[t].length; a++) {
                            e.watchers[t][a] == n && e.watchers[t].splice(a, 1)
                        }
            } else delete e.watchers;
            N(e, t, n), B(e, t)
        },
        S = function(e, t) {
            return e.watchers && (e.watchers.__wjs_suspend__ || e.watchers["__wjs_suspend__" + t])
        },
        I = function(e, t) {
            _(function() {
                delete e.watchers.__wjs_suspend__, delete e.watchers["__wjs_suspend__" + t]
            })
        },
        R = null,
        k = function(e, t, n, a, r) {
            o[o.length] = {
                obj: e,
                prop: t,
                mode: n,
                newval: a,
                oldval: r
            }, null === R && (R = setTimeout(L))
        },
        L = function() {
            var e = null;
            R = null;
            for (var t = 0; t < o.length; t++) e = o[t], A(e.obj, e.prop, e.mode, e.newval, e.oldval);
            e && (o = [], e = null)
        },
        M = function(e, t) {
            var n, a = !0;
            if (e !== t)
                if (l(e)) {
                    for (n in e)
                        if ((r || "watchers" !== n) && e[n] !== t[n]) {
                            a = !1;
                            break
                        }
                } else a = !1;
            return a
        },
        O = function(e, t, a, o) {
            var r;
            r = u("$$watchlengthsubjectroot" === t ? e : e[t]), n.push({
                obj: e,
                prop: t,
                actual: r,
                watcher: a,
                level: o
            })
        },
        N = function(e, t, a) {
            for (var o = 0; o < n.length; o++) {
                var r = n[o];
                r.obj == e && (t && r.prop != t || a && r.watcher != a || n.splice(o--, 1))
            }
        },
        B = function(e, t) {
            for (var n = 0; n < a.length; n++) {
                var o = a[n],
                    r = o.object.watchers;
                o.object == e && (!t || o.prop == t) && r && (!t || !r[t] || 0 == r[t].length) && a.splice(n--, 1)
            }
        };
    return setInterval(function() {
        for (var e = 0; e < n.length; e++) {
            var t = n[e];
            if ("$$watchlengthsubjectroot" === t.prop)((o = s(t.obj, t.actual)).added.length || o.removed.length) && (o.added.length && p(t.obj, o.added, t.watcher, t.level - 1, !0), t.watcher.call(t.obj, "root", "differentattr", o, t.actual)), t.actual = u(t.obj);
            else {
                var o;
                if ((o = s(t.obj[t.prop], t.actual)).added.length || o.removed.length) {
                    if (o.added.length)
                        for (var r = 0; r < t.obj.watchers[t.prop].length; r++) p(t.obj[t.prop], o.added, t.obj.watchers[t.prop][r], t.level - 1, !0);
                    A(t.obj, t.prop, "differentattr", o, t.actual)
                }
                t.actual = u(t.obj[t.prop])
            }
        }
        var i, c;
        if (a.length > 0)
            for (e = 0; e < a.length; e++) i = a[e], c = i.object[i.prop], M(i.orig, c) || (i.orig = u(c), i.callback(c))
    }, 50), t.watch = function() {
        i(arguments[1]) ? h.apply(this, arguments) : c(arguments[1]) ? p.apply(this, arguments) : v.apply(this, arguments)
    }, t.unwatch = function() {
        i(arguments[1]) ? m.apply(this, arguments) : c(arguments[1]) ? g.apply(this, arguments) : j.apply(this, arguments)
    }, t.callWatchers = A, t.suspend = function(e, t) {
        if (e.watchers) {
            var n = "__wjs_suspend__" + (void 0 !== t ? t : "");
            e.watchers[n] = !0
        }
    }, t.onChange = function() {
        (i(arguments[2]) ? D : C).apply(this, arguments)
    }, t
});
var LZString = function() {
    function e(e, t) {
        if (!o[e]) {
            o[e] = {};
            for (var n = 0; n < e.length; n++) o[e][e.charAt(n)] = n
        }
        return o[e][t]
    }
    var t = String.fromCharCode,
        n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",
        o = {},
        r = {
            compressToBase64: function(e) {
                if (null == e) return "";
                var t = r._compress(e, 6, function(e) {
                    return n.charAt(e)
                });
                switch (t.length % 4) {
                    default:
                        case 0:
                        return t;
                    case 1:
                            return t + "===";
                    case 2:
                            return t + "==";
                    case 3:
                            return t + "="
                }
            },
            decompressFromBase64: function(t) {
                return null == t ? "" : "" == t ? null : r._decompress(t.length, 32, function(a) {
                    return e(n, t.charAt(a))
                })
            },
            compressToUTF16: function(e) {
                return null == e ? "" : r._compress(e, 15, function(e) {
                    return t(e + 32)
                }) + " "
            },
            decompressFromUTF16: function(e) {
                return null == e ? "" : "" == e ? null : r._decompress(e.length, 16384, function(t) {
                    return e.charCodeAt(t) - 32
                })
            },
            compressToUint8Array: function(e) {
                for (var t = r.compress(e), n = new Uint8Array(2 * t.length), a = 0, o = t.length; o > a; a++) {
                    var i = t.charCodeAt(a);
                    n[2 * a] = i >>> 8, n[2 * a + 1] = i % 256
                }
                return n
            },
            decompressFromUint8Array: function(e) {
                if (null === e || void 0 === e) return r.decompress(e);
                for (var n = new Array(e.length / 2), a = 0, o = n.length; o > a; a++) n[a] = 256 * e[2 * a] + e[2 * a + 1];
                var i = [];
                return n.forEach(function(e) {
                    i.push(t(e))
                }), r.decompress(i.join(""))
            },
            compressToEncodedURIComponent: function(e) {
                return null == e ? "" : r._compress(e, 6, function(e) {
                    return a.charAt(e)
                })
            },
            decompressFromEncodedURIComponent: function(t) {
                return null == t ? "" : "" == t ? null : (t = t.replace(/ /g, "+"), r._decompress(t.length, 32, function(n) {
                    return e(a, t.charAt(n))
                }))
            },
            compress: function(e) {
                return r._compress(e, 16, function(e) {
                    return t(e)
                })
            },
            _compress: function(e, t, n) {
                if (null == e) return "";
                var a, o, r, i = {},
                    c = {},
                    l = "",
                    s = "",
                    u = "",
                    d = 2,
                    f = 3,
                    h = 2,
                    p = [],
                    v = 0,
                    m = 0;
                for (r = 0; r < e.length; r += 1)
                    if (l = e.charAt(r), Object.prototype.hasOwnProperty.call(i, l) || (i[l] = f++, c[l] = !0), s = u + l, Object.prototype.hasOwnProperty.call(i, s)) u = s;
                    else {
                        if (Object.prototype.hasOwnProperty.call(c, u)) {
                            if (u.charCodeAt(0) < 256) {
                                for (a = 0; h > a; a++) v <<= 1, m == t - 1 ? (m = 0, p.push(n(v)), v = 0) : m++;
                                for (o = u.charCodeAt(0), a = 0; 8 > a; a++) v = v << 1 | 1 & o, m == t - 1 ? (m = 0, p.push(n(v)), v = 0) : m++, o >>= 1
                            } else {
                                for (o = 1, a = 0; h > a; a++) v = v << 1 | o, m == t - 1 ? (m = 0, p.push(n(v)), v = 0) : m++, o = 0;
                                for (o = u.charCodeAt(0), a = 0; 16 > a; a++) v = v << 1 | 1 & o, m == t - 1 ? (m = 0, p.push(n(v)), v = 0) : m++, o >>= 1
                            }
                            0 == --d && (d = Math.pow(2, h), h++), delete c[u]
                        } else
                            for (o = i[u], a = 0; h > a; a++) v = v << 1 | 1 & o, m == t - 1 ? (m = 0, p.push(n(v)), v = 0) : m++, o >>= 1;
                        0 == --d && (d = Math.pow(2, h), h++), i[s] = f++, u = String(l)
                    }
                if ("" !== u) {
                    if (Object.prototype.hasOwnProperty.call(c, u)) {
                        if (u.charCodeAt(0) < 256) {
                            for (a = 0; h > a; a++) v <<= 1, m == t - 1 ? (m = 0, p.push(n(v)), v = 0) : m++;
                            for (o = u.charCodeAt(0), a = 0; 8 > a; a++) v = v << 1 | 1 & o, m == t - 1 ? (m = 0, p.push(n(v)), v = 0) : m++, o >>= 1
                        } else {
                            for (o = 1, a = 0; h > a; a++) v = v << 1 | o, m == t - 1 ? (m = 0, p.push(n(v)), v = 0) : m++, o = 0;
                            for (o = u.charCodeAt(0), a = 0; 16 > a; a++) v = v << 1 | 1 & o, m == t - 1 ? (m = 0, p.push(n(v)), v = 0) : m++, o >>= 1
                        }
                        0 == --d && (d = Math.pow(2, h), h++), delete c[u]
                    } else
                        for (o = i[u], a = 0; h > a; a++) v = v << 1 | 1 & o, m == t - 1 ? (m = 0, p.push(n(v)), v = 0) : m++, o >>= 1;
                    0 == --d && (d = Math.pow(2, h), h++)
                }
                for (o = 2, a = 0; h > a; a++) v = v << 1 | 1 & o, m == t - 1 ? (m = 0, p.push(n(v)), v = 0) : m++, o >>= 1;
                for (;;) {
                    if (v <<= 1, m == t - 1) {
                        p.push(n(v));
                        break
                    }
                    m++
                }
                return p.join("")
            },
            decompress: function(e) {
                return null == e ? "" : "" == e ? null : r._decompress(e.length, 32768, function(t) {
                    return e.charCodeAt(t)
                })
            },
            _decompress: function(e, n, a) {
                var o, r, i, c, l, s, u, d = [],
                    f = 4,
                    h = 4,
                    p = 3,
                    v = "",
                    m = [],
                    g = {
                        val: a(0),
                        position: n,
                        index: 1
                    };
                for (o = 0; 3 > o; o += 1) d[o] = o;
                for (i = 0, l = Math.pow(2, 2), s = 1; s != l;) c = g.val & g.position, g.position >>= 1, 0 == g.position && (g.position = n, g.val = a(g.index++)), i |= (c > 0 ? 1 : 0) * s, s <<= 1;
                switch (i) {
                    case 0:
                        for (i = 0, l = Math.pow(2, 8), s = 1; s != l;) c = g.val & g.position, g.position >>= 1, 0 == g.position && (g.position = n, g.val = a(g.index++)), i |= (c > 0 ? 1 : 0) * s, s <<= 1;
                        u = t(i);
                        break;
                    case 1:
                        for (i = 0, l = Math.pow(2, 16), s = 1; s != l;) c = g.val & g.position, g.position >>= 1, 0 == g.position && (g.position = n, g.val = a(g.index++)), i |= (c > 0 ? 1 : 0) * s, s <<= 1;
                        u = t(i);
                        break;
                    case 2:
                        return ""
                }
                for (d[3] = u, r = u, m.push(u);;) {
                    if (g.index > e) return "";
                    for (i = 0, l = Math.pow(2, p), s = 1; s != l;) c = g.val & g.position, g.position >>= 1, 0 == g.position && (g.position = n, g.val = a(g.index++)), i |= (c > 0 ? 1 : 0) * s, s <<= 1;
                    switch (u = i) {
                        case 0:
                            for (i = 0, l = Math.pow(2, 8), s = 1; s != l;) c = g.val & g.position, g.position >>= 1, 0 == g.position && (g.position = n, g.val = a(g.index++)), i |= (c > 0 ? 1 : 0) * s, s <<= 1;
                            d[h++] = t(i), u = h - 1, f--;
                            break;
                        case 1:
                            for (i = 0, l = Math.pow(2, 16), s = 1; s != l;) c = g.val & g.position, g.position >>= 1, 0 == g.position && (g.position = n, g.val = a(g.index++)), i |= (c > 0 ? 1 : 0) * s, s <<= 1;
                            d[h++] = t(i), u = h - 1, f--;
                            break;
                        case 2:
                            return m.join("")
                    }
                    if (0 == f && (f = Math.pow(2, p), p++), d[u]) v = d[u];
                    else {
                        if (u !== h) return null;
                        v = r + r.charAt(0)
                    }
                    m.push(v), d[h++] = r + v.charAt(0), r = v, 0 == --f && (f = Math.pow(2, p), p++)
                }
            }
        };
    return r
}();
"function" == typeof define && define.amd ? define(function() {
        return LZString
    }) : "undefined" != typeof module && null != module && (module.exports = LZString),
    function() {
        var e = {};
        Joy.ui = e, e.init = function(e) {
            e.dom.classList.add("joy-master"), e.container.addEventListener("wheel", function(t) {
                var n = t.deltaY;
                return e.container.scrollTop += n, t.preventDefault(), !1
            }), document.body.addEventListener("keydown", function(e) {
                if (8 === e.keyCode) {
                    var t = !0,
                        n = e.srcElement || e.target;
                    if (!(n.getAttribute("readonly") || n.getAttribute("disabled")))
                        if (n.isContentEditable) t = !1;
                        else if ("INPUT" == n.tagName.toUpperCase()) {
                        var a = n.getAttribute("type");
                        a && (a = a.toLowerCase()), ["text", "password", "file", "search", "email", "number", "date", "color", "datetime", "datetime-local", "month", "range", "search", "tel", "time", "url", "week"].indexOf(a) > -1 && (t = !1)
                    } else "TEXTAREA" == n.tagName.toUpperCase() && (t = !1);
                    if (t) return e.preventDefault(), !1
                }
            })
        }, e.Button = function(e) {
            var t = this,
                n = document.createElement("div");
            n.className = "joy-button", t.dom = n, e.label = e.label || "", t.label = document.createElement("span"), n.appendChild(t.label), t.setLabel = function(e) {
                t.label.innerHTML = e
            }, t.setLabel(e.label), n.onclick = function() {
                e.onclick()
            }, t.styles = e.styles || [];
            for (var a = 0; a < t.styles.length; a++) n.classList.add(t.styles[a])
        }, e.ChooserButton = function(t) {
            var n = this;
            n.value = t.value, n.options = t.options, n.onchange = t.onchange, n.value || (n.value = n.options[0].value), e.Button.call(n, {
                label: void 0 === t.staticLabel ? "" : t.staticLabel,
                onclick: function() {
                    Joy.modal.Chooser({
                        source: n.dom,
                        options: n.options,
                        onchange: function(e) {
                            n.value = e, a(), n.onchange(e)
                        },
                        position: t.position
                    })
                },
                styles: t.styles
            });
            var a = function() {
                if (void 0 === t.staticLabel) {
                    var e = n.options.find(function(e) {
                        return e.value == n.value
                    }).label;
                    n.setLabel(e)
                }
            };
            a()
        }, e.Scrubber = function(e) {
            var t = this,
                n = e.min,
                a = e.max;
            t.value = e.value;
            var o = document.createElement("div");
            o.className = "joy-scrubber", t.dom = o, t.setLabel = function(e) {
                o.innerHTML = e.toFixed(t.sigfigs)
            };
            var r, i, c = function(n) {
                    n = parseFloat(n.toFixed(t.sigfigs)), e.onchange(n)
                },
                l = !1,
                s = !1,
                u = 0,
                d = function(n) {
                    l = !0, r = n.clientX, i = t.value, u = 0, e.onstart && e.onstart()
                },
                f = function(e) {
                    if (l) {
                        s = !0;
                        var n = Math.pow(.1, t.sigfigs);
                        n = parseFloat(n.toPrecision(1));
                        var a = e.clientX - r;
                        r = e.clientX;
                        var o = Math.abs(a / 10);
                        o < 1 && (o = 1), o > 3 && (o = 3), u += a * o;
                        var d = Math.floor(u / 2),
                            f = i + d * n;
                        f = h(f), t.value != f && (t.value = f, t.setLabel(f), c(f))
                    }
                },
                h = function(e) {
                    return void 0 !== n && e < n && (e = n), void 0 !== a && e > a && (e = a), e
                },
                p = function() {
                    l = !1, e.onstop && e.onstop(), setTimeout(function() {
                        s = !1
                    }, 1)
                };
            o.addEventListener("mousedown", d), window.addEventListener("mousemove", f), window.addEventListener("mouseup", p), t.kill = function() {
                o.removeEventListener("mousedown", d), window.removeEventListener("mousemove", f), window.removeEventListener("mouseup", p)
            };
            var v = !1;
            o.onblur = function() {
                v && (v = !1, o.contentEditable = !1, _unselectAll(), g(o.innerText), t.value = m(), t.setLabel(t.value), c(t.value), e.onstop && e.onstop())
            }, _preventWeirdCopyPaste(o), _blurOnEnter(o), o.onclick = function() {
                s || (v = !0, o.contentEditable = !0, o.spellcheck = !1, _selectAll(o), e.onstart && e.onstart())
            }, o.oninput = function(e) {
                if (v) {
                    var t = /[^0-9.\-]/g;
                    o.innerText.match(t) && (o.innerText = o.innerText.replace(t, "")), _fixStringInput(o), c(m())
                }
            };
            var m = function() {
                var e = parseFloat(o.innerText);
                return isNaN(e) && (e = 0), e = h(e)
            };
            t.sigfigs = 0;
            var g = function(e) {
                var n, a = (e = e.toString()).search(/\./);
                n = a >= 0 ? e.length - 1 - a : 0, t.sigfigs = n
            };
            g(t.value), t.setLabel(t.value)
        }, e.String = function(e) {
            var t = document.createElement("div");
            t.className = "joy-string", this.dom = t;
            var n = document.createElement("span");
            n.contentEditable = !0, n.spellcheck = !1;
            var a = document.createElement("span"),
                o = document.createElement("span");
            a.innerHTML = e.prefix || "", o.innerHTML = e.suffix || "", t.appendChild(a), t.appendChild(n), t.appendChild(o), n.oninput = function(t) {
                _fixStringInput(n);
                var a = n.innerText;
                e.onchange(a)
            }, n.onfocus = function() {
                _selectAll(n)
            }, n.onblur = function() {
                _unselectAll()
            }, _preventWeirdCopyPaste(n), n.onkeypress = function(e) {
                return 13 != e.which || (n.blur(), !1)
            }, this.setString = function(e) {
                n.innerText = e, _fixStringInput(n)
            }, this.setColor = function(e) {
                e = _forceToRGB(e), t.style.color = e, t.style.borderColor = e
            }, e.color && this.setColor(e.color), this.styles = e.styles || [];
            for (var r = 0; r < this.styles.length; r++) t.classList.add(this.styles[r]);
            this.setString(e.value)
        }, e.TextBox = function(e) {
            var t, n = this;
            e.multiline ? t = document.createElement("textarea") : (t = document.createElement("input")).type = "text", e.placeholder && (t.placeholder = e.placeholder), t.spellcheck = !1, t.className = "joy-textbox", n.dom = t;
            var a = n.dom;
            e.readonly ? (t.setAttribute("readonly", 1), t.addEventListener("click", function() {
                n.select()
            })) : t.oninput = function(n) {
                e.onchange(t.value)
            }, e.width && (t.style.width = "number" == typeof e.width ? e.width + "px" : e.width), n.getValue = function() {
                return t.value
            }, n.setValue = function(e) {
                t.value = e
            }, n.select = function() {
                t.select()
            }, n.styles = e.styles || [];
            for (var o = 0; o < n.styles.length; o++) a.classList.add(n.styles[o]);
            if (e.value && n.setValue(e.value), e.multiline) {
                a.addEventListener("input", function() {
                    this.style.height = "auto", this.style.height = this.scrollHeight + "px"
                }, !1), setTimeout(function() {
                    a.setAttribute("style", "height:" + a.scrollHeight + "px; overflow-y:hidden;")
                }, 1)
            }
        }
    }(),
    function() {
        var e = {};
        Joy.modal = e, e.init = function(t) {
            e.dom = document.createElement("div"), e.dom.id = "joy-modal", document.body.appendChild(e.dom), e.bg = document.createElement("div"), e.bg.id = "joy-bg", e.bg.onclick = function() {
                e.currentUI.kill()
            }, e.dom.appendChild(e.bg), e.box = document.createElement("div"), e.box.id = "joy-box", e.box.className = "arrow_box", e.dom.appendChild(e.box), e.dom.addEventListener("wheel", function(e) {
                return e.preventDefault(), !1
            })
        }, e.show = function(t) {
            e.dom.style.display = "block", e.currentUI = t, e.box.appendChild(t.dom);
            var n = t.config.position || "below",
                a = e.box.getBoundingClientRect(),
                o = t.config.source.getBoundingClientRect();
            if ("below" == n) {
                (i = o.top + o.height + 20) + a.height > document.body.clientHeight && (n = "left")
            }
            switch (e.box.setAttribute("position", n), n) {
                case "below":
                    var r = o.left + o.width / 2,
                        i = o.top + o.height + 20;
                    r -= a.width / 2;
                    break;
                case "left":
                    r = o.left - 20, i = o.top + o.height / 2;
                    r -= a.width, i -= a.height / 2
            }
            e.box.style.left = r + "px", e.box.style.top = i + "px", e.currentUI.config.onopen && e.currentUI.config.onopen()
        }, e.hide = function() {
            _emptyDOM(e.box), e.dom.style.display = "none", e.currentUI.config.onclose && e.currentUI.config.onclose()
        }, e.Chooser = function(t) {
            var n = {};
            n.config = t;
            var a = document.createElement("div");
            a.className = "joy-modal-chooser", n.dom = a;
            var o = document.createElement("div");
            a.appendChild(o), n.options = [], n.categories = {};
            var r = "_placeholder_",
                i = function(e) {
                    var t = document.createElement("div");
                    o.appendChild(t), n.categories[e] = t
                };
            n.populate = function() {
                for (var e = 0; e < t.options.length; e++) {
                    (c = (a = t.options[e]).category) ? n.categories[c] || i(c): n.categories[r] || i(r)
                }
                for (e = 0; e < t.options.length; e++) {
                    var a = t.options[e],
                        o = document.createElement("div");
                    o.innerHTML = a.label, a.color && (o.style.color = a.color);
                    var c = a.category || r;
                    n.categories[c].appendChild(o),
                        function(e) {
                            o.onclick = function(t) {
                                n.onchange(e.value), t.stopPropagation()
                            }
                        }(a)
                }
            }, n.populate(), n.onchange = function(e) {
                n.kill(), t.onchange(e)
            }, n.kill = function() {
                e.hide()
            }, e.show(n)
        }, e.Color = function(t) {
            var n = {};
            n.config = t;
            var a = document.createElement("div");
            a.className = "joy-modal-color", n.dom = a, t.value = t.value || [0, 1, 1], n.h = t.value[0], n.s = t.value[1], n.v = t.value[2];
            n.dom.style.width = 195, n.dom.style.height = 170;
            var o = document.createElement("canvas");
            o.id = "joy-color-wheel";
            var r = o.getContext("2d");
            o.width = 300, o.height = 300, o.style.width = o.width / 2, o.style.height = o.height / 2, a.appendChild(o), o.style.top = 10, o.style.left = 10;
            var i = function() {
                var e = r;
                e.clearRect(0, 0, e.canvas.width, e.canvas.height);
                for (var t = o.width, a = o.height, i = e.createImageData(t, a), c = i.data, l = t / 2, s = a / 2, u = t / 2, d = u + 2, f = 0; f < t; f++)
                    for (var h = 0; h < a; h++) {
                        var p = f - l,
                            v = h - s,
                            m = Math.sqrt(p * p + v * v);
                        if (m < d) {
                            m >= u && (m = u);
                            var g = Math.atan2(v, p),
                                y = _HSVtoRGB(g = 360 * (g / Math.TAU + .5), m /= u, n.v),
                                b = 4 * (f + h * t);
                            c[b] = y[0], c[b + 1] = y[1], c[b + 2] = y[2], c[b + 3] = 255
                        }
                    }
                e.putImageData(i, 0, 0), e.save(), e.globalCompositeOperation = "destination-in", e.beginPath(), e.fillStyle = "#fff", e.arc(l, s, u, 0, Math.TAU), e.fill(), e.restore()
            };
            i();
            var c = document.createElement("canvas");
            c.id = "joy-color-value";
            var l = c.getContext("2d");
            c.width = 30, c.height = 300, c.style.width = c.width / 2, c.style.height = c.height / 2, a.appendChild(c), c.style.top = 10, c.style.right = 10;
            var s = function() {
                var e = l;
                e.clearRect(0, 0, e.canvas.width, e.canvas.height);
                for (var t = c.width, a = c.height, o = e.createImageData(t, a), r = o.data, i = 0; i < t; i++)
                    for (var s = 0; s < a; s++) {
                        var u = _HSVtoRGB(n.h, n.s, 1 - s / a),
                            d = 4 * (i + s * t);
                        r[d] = u[0], r[d + 1] = u[1], r[d + 2] = u[2], r[d + 3] = 255
                    }
                e.putImageData(o, 0, 0)
            };
            s();
            var u = document.createElement("canvas");
            u.id = "joy-color-picker";
            var d = u.getContext("2d");
            u.width = 390, u.height = 340, u.style.width = u.width / 2, u.style.height = u.height / 2, a.appendChild(u);
            var f = function() {
                var e, t, a = d;
                a.clearRect(0, 0, a.canvas.width, a.canvas.height), a.fillStyle = _HSVToRGBString(n.h, n.s, n.v), a.strokeStyle = "#fff", a.lineWidth = 2;
                var r = 20 + o.width / 2,
                    i = 20 + o.height / 2,
                    l = n.h * (Math.TAU / 360),
                    s = n.s * (o.width / 2);
                e = r - Math.cos(l) * s, t = i - Math.sin(l) * s, a.beginPath(), a.arc(e, t, 15, 0, Math.TAU), a.fill(), a.stroke();
                e = 20 + o.width + 20 + c.width / 2, t = 20 + c.height * (1 - n.v), a.beginPath(), a.arc(e, t, 15, 0, Math.TAU), a.fill(), a.stroke()
            };
            f();
            var h, p = !1,
                v = function(e) {
                    if (e.target == u) {
                        var t = 2 * e.offsetX,
                            n = 2 * e.offsetY;
                        "hs" == h ? m(t -= 20, n -= 20) : (t -= 20 + o.width + 20, g(t, n -= 20)), _()
                    }
                },
                m = function(e, t) {
                    var a = o.width / 2,
                        r = e - a,
                        i = t - a,
                        c = Math.atan2(i, r),
                        l = Math.sqrt(r * r + i * i);
                    (c = 360 * (c / Math.TAU + .5)) < 0 && (c = 0), c > 360 && (c = 360), (l /= a) < 0 && (l = 0), l > 1 && (l = 1), n.h = c, n.s = l, s(), f()
                },
                g = function(e, t) {
                    n.v = 1 - t / c.height, n.v < 0 && (n.v = 0), n.v > 1 && (n.v = 1), i(), f()
                },
                y = function(e) {
                    p = !0, h = 2 * e.offsetX < 20 + o.width + 10 ? "hs" : "v", v(e)
                },
                b = function(e) {
                    p && v(e)
                },
                w = function() {
                    p = !1
                };
            u.addEventListener("mousedown", y), window.addEventListener("mousemove", b), window.addEventListener("mouseup", w);
            var _ = function() {
                var e = [n.h, n.s, n.v];
                e[0] = parseFloat(e[0].toFixed(0)), e[1] = parseFloat(e[1].toFixed(2)), e[2] = parseFloat(e[2].toFixed(2)), t.onchange(e)
            };
            n.kill = function() {
                a.removeEventListener("mousedown", y), window.removeEventListener("mousemove", b), window.removeEventListener("mouseup", w), e.hide()
            }, e.show(n)
        }
    }(), Joy.add({
        type: "number",
        tags: ["ui"],
        initWidget: function(e) {
            var t = e.options,
                n = new Joy.ui.Scrubber({
                    min: t.min,
                    max: t.max,
                    step: t.step,
                    value: e.getData("value"),
                    onstart: function() {
                        e.top.activePreview = e
                    },
                    onstop: function() {
                        e.top.activePreview = null
                    },
                    onchange: function(t) {
                        e.setData("value", t)
                    }
                });
            e.dom = n.dom;
            var a = null;
            e.dom.onmouseenter = function() {
                if (e.top.canPreview("numbers")) {
                    e.previewData = _clone(e.data);
                    var t = Math.abs(.05 * e.data.value);
                    0 == t && (t = 1);
                    var n = 0;
                    a = setInterval(function() {
                        if (!e.top.canPreview("numbers")) return o();
                        n += Math.TAU / 30 / .25, e.previewData.value = e.data.value + Math.sin(n) * t, e.update(), n > Math.TAU && o()
                    }, 1e3 / 30)
                }
            };
            var o = function() {
                a && clearInterval(a), e.previewData = null, e.update()
            };
            e.dom.onmouseleave = o
        },
        onget: function(e) {
            return e.data.value
        },
        placeholder: {
            value: 3
        }
    }), Joy.add({
        type: "color",
        tags: ["ui"],
        initWidget: function(e) {
            var t = new Joy.ui.Button({
                label: "&nbsp;",
                onclick: function() {
                    Joy.modal.Color({
                        source: e.dom,
                        value: e.getData("value"),
                        onchange: function(t) {
                            e.setData("value", t), n()
                        },
                        onopen: function() {
                            e.top.activePreview = e
                        },
                        onclose: function() {
                            e.top.activePreview = null
                        }
                    })
                },
                styles: ["joy-color"]
            });
            e.dom = t.dom;
            var n = function() {
                var n = e.getData("value");
                t.dom.style.background = _HSVToRGBString(n)
            };
            n();
            var a, o, r, i = null;
            e.dom.onmouseenter = function() {
                e.top.canPreview("numbers") && (a = e.data.value[2], e.previewData = _clone(e.data), r = 0, o = 2 / 30 * 2, i = setInterval(function() {
                    if (!e.top.canPreview("numbers")) return c();
                    var t = e.previewData.value;
                    t[2] += o, t[2] > 1 && (t[2] = 1, o *= -1), t[2] < 0 && (t[2] = 0, o *= -1), e.update(), (r += 2 / 30) >= 1 && c()
                }, 1e3 / 30))
            };
            var c = function() {
                i && clearInterval(i), e.previewData = null, e.update()
            };
            e.dom.onmouseleave = c
        },
        onget: function(e) {
            return _HSVToRGBString(e.data.value)
        },
        placeholder: function() {
            return [Math.floor(360 * Math.random()), .8, 1]
        }
    }), Joy.add({
        type: "choose",
        tags: ["ui"],
        initWidget: function(e) {
            for (var t = e.data, n = e.options, a = 0; a < n.length; a++) {
                var o = n[a];
                void 0 !== o.label && void 0 !== o.value || (n[a] = {
                    label: o.toString(),
                    value: o
                })
            }
            var r = new Joy.ui.ChooserButton({
                value: t.value,
                options: n,
                onchange: function(n) {
                    t.value = n, e.update()
                },
                styles: e.styles
            });
            e.dom = r.dom
        },
        onget: function(e) {
            return e.data.value
        }
    }), Joy.add({
        type: "string",
        tags: ["ui"],
        initWidget: function(e) {
            var t = e.options;
            e.stringUI = new Joy.ui.String({
                prefix: t.prefix,
                suffix: t.suffix,
                color: t.color,
                value: e.getData("value"),
                onchange: function(t) {
                    e.setData("value", t)
                }
            }), e.dom = e.stringUI.dom, e.onDataChange = function() {
                var t = e.getData("value");
                e.stringUI.setString(t)
            }
        },
        onget: function(e) {
            return e.data.value
        },
        placeholder: "???"
    }), Joy.add({
        type: "save",
        tags: ["ui"],
        initWidget: function(e) {
            var t = document.createElement("div");
            t.className = "joy-save", e.dom = t, e.saveButton = new Joy.ui.Button({
                label: "save:",
                onclick: function() {
                    var t = Joy.saveToURL(e.top.data);
                    e.url.setValue(t), e.url.select();
                    t.length;
                    e.info.innerHTML = "P.S: you can shorten your link with <a href='http://tinyurl.com/' target='_blank'>TinyURL</a>!"
                }
            }), t.appendChild(e.saveButton.dom), e.url = new Joy.ui.TextBox({
                readonly: !0
            }), t.appendChild(e.url.dom), e.info = document.createElement("div"), e.info.id = "joy-save-info", t.appendChild(e.info)
        }
    }), Joy.add({
        type: "actions",
        tags: ["ui"],
        init: function(e) {
            void 0 !== e.resetVariables && (e.data.resetVariables = e.resetVariables)
        },
        initWidget: function(e) {
            var t = e.data.actions,
                n = document.createElement("div");
            n.className = "joy-actions", e.dom = n;
            var a = document.createElement("list");
            a.id = "joy-list", n.appendChild(a);
            var o = [{
                    label: "Add action above",
                    value: "action_above"
                }, {
                    label: "Add action below",
                    value: "action_below"
                }, {
                    label: "Delete",
                    value: "delete"
                }],
                r = function(n) {
                    var r = new Joy.ui.ChooserButton({
                        position: "left",
                        staticLabel: i(n),
                        options: o,
                        onchange: function(o) {
                            ! function(n, o) {
                                var r = 0;
                                if ("action_above" == o && (r = -1), "action_below" == o && (r = 1), 0 != r) {
                                    var i = e.entries.indexOf(n);
                                    r > 0 && (i += 1), Joy.modal.Chooser({
                                        position: "left",
                                        source: n.bullet.dom,
                                        options: d,
                                        onchange: function(t) {
                                            u(t, i), e.update(), c()
                                        }
                                    })
                                }
                                "delete" == o && (_removeFromArray(e.entries, n), _removeFromArray(t, n.actionData), e.removeChild(n.actor), a.removeChild(n.dom), e.update(), c())
                            }(n, o)
                        },
                        styles: ["joy-bullet"]
                    });
                    return r.dom.id = "joy-bullet", r
                },
                i = function(t) {
                    for (var n = e.entries.indexOf(t) + 1, a = 0, o = e.parent; o;) "actions" == o.type && a++, o = o.parent;
                    var r;
                    switch (a % 3) {
                        case 0:
                            r = n;
                            break;
                        case 1:
                            r = _numberToAlphabet(n);
                            break;
                        case 2:
                            r = _numberToRoman(n)
                    }
                    return r
                },
                c = function() {
                    for (var t = 0; t < e.entries.length; t++) {
                        var n = e.entries[t],
                            a = n.bullet,
                            o = i(n);
                        a.setLabel(o)
                    }
                };
            e.entries = [];
            for (var l = function(t, o) {
                    var i = {},
                        c = document.createElement("div");
                    void 0 === o && (o = e.entries.length), e.entries.splice(o, 0, i), a.insertBefore(c, a.children[o]);
                    var l = r(i),
                        s = document.createElement("div");
                    s.id = "joy-bullet-container", c.appendChild(s), s.appendChild(l.dom);
                    var u = e.addChild({
                            type: t.type
                        }, t),
                        d = u.createWidget();
                    d.id = "joy-widget", c.appendChild(d), i.dom = c, i.bullet = l, i.actor = u, i.widget = d, i.actionData = t;
                    var f, h, p = function(t) {
                        var n = t.offsetY / l.dom.getBoundingClientRect().height;
                        n < 0 && (n = 0), n > 1 && (n = 1), f._PREVIEW = n, e.update()
                    };
                    return s.onmouseenter = function(t) {
                        if (e.top.canPreview("actions")) {
                            e.top.activePreview = e, e.previewData = _clone(e.data);
                            var a = e.entries.indexOf(i);
                            f = e.previewData.actions[a], e.previewData.actions.splice(a + 1, 0, {
                                STOP: !0
                            }), p(t), h = document.createElement("style"), document.head.appendChild(h), h.sheet.insertRule(".joy-actions.joy-previewing > #joy-list > div:nth-child(n+" + (a + 2) + ") { opacity:0.1; }"), h.sheet.insertRule(".joy-actions.joy-previewing > div.joy-bullet { opacity:0.1; }"), n.classList.add("joy-previewing")
                        }
                    }, s.onmousemove = function(t) {
                        e.previewData && p(t)
                    }, s.onmouseleave = function() {
                        e.previewData && (e.previewData = null, e.top.activePreview = null, e.update(), document.head.removeChild(h), n.classList.remove("joy-previewing"))
                    }, i
                }, s = 0; s < t.length; s++) l(t[s]);
            var u = function(e, n) {
                    var a = {
                        type: e
                    };
                    void 0 === n ? t.push(a) : t.splice(n, 0, a);
                    l(a, n)
                },
                d = [];
            if (e.onlyActions)
                for (s = 0; s < e.onlyActions.length; s++) {
                    var f = e.onlyActions[s],
                        h = Joy.getTemplateByType(f),
                        p = h.tags.filter(function(e) {
                            return "action" != e
                        })[0];
                    d.push({
                        label: h.name,
                        value: f,
                        category: p
                    })
                } else {
                    var v = Joy.getTemplatesByTag("action");
                    for (s = 0; s < v.length; s++) {
                        var m = v[s];
                        p = m.tags.filter(function(e) {
                            return "action" != e
                        })[0];
                        d.push({
                            label: m.name,
                            value: m.type,
                            category: p
                        })
                    }
                }
            var g = new Joy.ui.ChooserButton({
                staticLabel: "+",
                options: d,
                onchange: function(t) {
                    u(t), e.update()
                },
                styles: ["joy-bullet"]
            });
            n.appendChild(g.dom)
        },
        onact: function(e) {
            e.target._variables || (e.target._variables = {}), e.data.resetVariables && (e.target._variables = {});
            for (var t = 0; t < e.data.actions.length; t++) {
                var n = e.data.actions[t];
                if (n.STOP) return "STOP";
                var a = e.actor.entries[t].actor.act(e.target, n);
                if ("STOP" == a) return a
            }
        },
        placeholder: {
            actions: [],
            resetVariables: !0
        }
    }), Joy.module("instructions", function() {
        Joy.add({
            name: "Repeat the following...",
            type: "instructions/repeat",
            tags: ["instructions", "action"],
            init: "Repeat the following {id:'count', type:'number', min:1, placeholder:3} times: {id:'actions', type:'actions', resetVariables:false}",
            onact: function(e) {
                var t = 1;
                void 0 !== e.data._PREVIEW && (t = e.data._PREVIEW);
                for (var n = Math.floor(e.data.count * t), a = 0; a < n; a++) {
                    var o = e.actor.actions.act(e.target);
                    if ("STOP" == o) return o
                }
            }
        }), Joy.add({
            name: "// Write a note",
            type: "instructions/comment",
            tags: ["instructions", "action"],
            initWidget: function(e) {
                e.dom = document.createElement("div"), e.box = new Joy.ui.TextBox({
                    multiline: !0,
                    placeholder: "// your notes here",
                    value: e.getData("value"),
                    onchange: function(t) {
                        e.setData("value", t)
                    },
                    styles: ["box"]
                }), e.dom.appendChild(e.box.dom)
            }
        })
    }), Joy.add({
        type: "variableName",
        tags: ["ui"],
        init: function(e) {
            var t = e.variableType;
            e._createNewReference = function() {
                var n = {
                        value: function() {
                            var n = 0;
                            return Joy.getReferencesByTag(e, t).map(function(e) {
                                return e.data.value
                            }).forEach(function(e) {
                                var t;
                                "thing" == e && (t = 1);
                                var a = e.match(/thing\s(\d+)/);
                                a && (t = parseInt(a[1])), n < t && (n = t)
                            }), 0 == n ? "thing" : "thing " + (n + 1)
                        }(),
                        color: _randomHSV()
                    },
                    a = Joy.createReference(e, t, n);
                e.setData("refID", a.id, !0), Joy.connectReference(e, a.id)
            };
            var n = e.getData("refID");
            if (n) Joy.connectReference(e, n);
            else {
                var a = Joy.getReferencesByTag(e, t);
                if (e.startWithExisting && a.length > 0) {
                    n = a[a.length - 1].id, e.setData("refID", n, !0), Joy.connectReference(e, n)
                } else e._createNewReference()
            }
            e._switchReference = function(t) {
                var n = e.getData("refID");
                Joy.disconnectReference(e, n), e.setData("refID", t), Joy.connectReference(e, t)
            }
        },
        initWidget: function(e) {
            e.dom = document.createElement("span");
            var t = e.getData("refID"),
                n = Joy.getReferenceById(e, t).data,
                a = e.addChild({
                    type: "string",
                    prefix: "[",
                    suffix: "]",
                    color: n.color
                }, n),
                o = a.createWidget();
            e.dom.appendChild(o);
            var r = a.onDataChange;
            a.onDataChange = function() {
                r();
                var e = a.getData("color");
                a.stringUI.setColor(e)
            };
            var i = e.variableType;
            e.noChooser || (e.dom.onclick = function() {
                var t = [],
                    n = Joy.getReferencesByTag(e, i),
                    o = e.getData("refID");
                n.forEach(function(e) {
                    if (e.id != o) {
                        var n = e.data.color;
                        n = _HSVToRGBString(n[0], n[1], n[2]), t.push({
                            label: "[" + e.data.value + "]",
                            value: e.id,
                            color: n
                        })
                    }
                }), t.push({
                    category: "meta",
                    label: "(+new)",
                    value: "NEW"
                }), t.push({
                    category: "meta",
                    label: "(change color)",
                    value: "CHANGE_COLOR"
                }), Joy.modal.Chooser({
                    source: e.dom,
                    options: t,
                    onchange: function(t) {
                        if ("CHANGE_COLOR" == t) Joy.modal.Color({
                            source: e.dom,
                            value: a.getData("color"),
                            onchange: function(e) {
                                a.setData("color", e), a.stringUI.setColor(e)
                            }
                        });
                        else {
                            if ("NEW" == t) {
                                var n = e.getData("refID");
                                Joy.disconnectReference(e, n), e._createNewReference(), e.update()
                            } else e._switchReference(t);
                            var o = e.getData("refID"),
                                r = Joy.getReferenceById(e, o);
                            a.switchData(r.data)
                        }
                    }
                })
            })
        },
        onget: function(e) {
            var t = e.data.refID;
            return Joy.getReferenceById(e.actor, t).data.value
        },
        onkill: function(e) {
            var t = e.getData("refID");
            Joy.disconnectReference(e, t)
        }
    }), Joy.module("math", function() {
        Joy.modify("number", "number_raw", function(e) {
            return {
                init: function(e) {
                    if (!e.noVariables) {
                        var t = e.getData("value");
                        "number" == typeof t && (e.setData("value", void 0, !0), e.setData("chain", [{
                            type: "number_raw",
                            value: t
                        }], !0)), e._makeNewChainActor = function(t, n) {
                            var a, o = t.type;
                            switch (o) {
                                case "number_raw":
                                    a = e.addChild({
                                        type: o
                                    }, t);
                                    break;
                                case "variableName":
                                    a = e.addChild({
                                        type: o,
                                        variableType: "number",
                                        noChooser: !0
                                    }, t);
                                    break;
                                case "choose":
                                    a = e.addChild({
                                        type: o,
                                        options: [{
                                            label: "+",
                                            value: "+"
                                        }, {
                                            label: "-",
                                            value: "-"
                                        }, {
                                            label: "&times;",
                                            value: "*"
                                        }, {
                                            label: "&divide;",
                                            value: "/"
                                        }],
                                        styles: ["joy-math"]
                                    }, t)
                            }
                            var r = e.getData("chain");
                            return void 0 !== n ? (e.chainActors.splice(n, 0, a), r.splice(n, 0, t)) : (e.chainActors.push(a), r.push(t)), a
                        }, e.chainActors = [];
                        var n = e.getData("chain"),
                            a = _clone(n);
                        n.splice(0, n.length);
                        for (var o = 0; o < a.length; o++) e._makeNewChainActor(a[o]);
                        e._replaceChainActor = function(t, n) {
                            var a = e._deleteChainActor(t),
                                o = e._makeNewChainActor(n, a);
                            return e.update(), o
                        }, e._deleteChainActor = function(t) {
                            var n = e.chainActors.indexOf(t);
                            _removeFromArray(e.chainActors, t), e.removeChild(t);
                            return e.getData("chain").splice(n, 1), n
                        }
                    }
                },
                initWidget: function(t) {
                    if (t.noVariables) e.initWidget(t);
                    else {
                        t.dom = document.createElement("span"), t.dom.className = "joy-number";
                        t._chainEntries = [], t._makeChainEntry = function(e, a) {
                            var o = document.createElement("span");
                            if (e.createWidget(), o.appendChild(e.dom), "choose" != e.type) {
                                var r, i = new Joy.ui.Button({
                                    onclick: function() {
                                        n(r)
                                    },
                                    styles: ["joy-more"]
                                });
                                o.appendChild(i.dom)
                            }
                            if (void 0 !== a)
                                if (a < t.dom.childNodes.length) {
                                    var c = t.dom.childNodes[a];
                                    t.dom.insertBefore(o, c)
                                } else t.dom.appendChild(o);
                            else t.dom.appendChild(o);
                            "choose" != e.type && function(e) {
                                var n;
                                e.dom.addEventListener("mousedown", function() {
                                    n = +new Date
                                }), e.dom.addEventListener("mouseup", function() {
                                    +new Date - n < 500 && function(e) {
                                        var n = [];
                                        if ("number_raw" != e.type) {
                                            var a = t.placeholder.value;
                                            "number" == typeof a && n.push({
                                                label: a,
                                                value: {
                                                    type: "number_raw",
                                                    value: a
                                                }
                                            })
                                        }
                                        var o, r = Joy.getReferencesByTag(t, "number");
                                        "variableName" == e.type && (o = e.getData("refID")), r.forEach(function(e) {
                                            if (e.id != o) {
                                                var t = e.data.color;
                                                t = _HSVToRGBString(t[0], t[1], t[2]), n.push({
                                                    label: "[" + e.data.value + "]",
                                                    value: {
                                                        type: "variableName",
                                                        refID: e.id
                                                    },
                                                    color: t
                                                })
                                            }
                                        }), n.length > 0 && Joy.modal.Chooser({
                                            source: e.dom,
                                            options: n,
                                            onchange: function(n) {
                                                var a = t._replaceChainActor(e, n);
                                                t._replaceChainEntry(e, a)
                                            }
                                        })
                                    }(e)
                                })
                            }(e), r = {
                                widget: o,
                                actor: e
                            }, void 0 !== a ? t._chainEntries.splice(a, 0, r) : t._chainEntries.push(r)
                        }, t._deleteChainEntry = function(e) {
                            var n = t._chainEntries.find(function(t) {
                                    return t.actor == e
                                }),
                                a = t._chainEntries.indexOf(n),
                                o = n.widget;
                            return t.dom.removeChild(o), _removeFromArray(t._chainEntries, n), a
                        }, t._replaceChainEntry = function(e, n) {
                            var a = t._deleteChainEntry(e);
                            t._makeChainEntry(n, a)
                        };
                        for (var n = function(e) {
                                var n = e.widget.innerText,
                                    a = [{
                                        label: n + " + 2",
                                        value: "+"
                                    }, {
                                        label: n + " - 2",
                                        value: "-"
                                    }, {
                                        label: n + " &times; 2",
                                        value: "*"
                                    }, {
                                        label: n + " &divide; 2",
                                        value: "/"
                                    }],
                                    o = t._chainEntries.indexOf(e);
                                if (t._chainEntries.length > 1) {
                                    var r;
                                    r = 0 == o ? o + 1 : o - 1;
                                    var i, c = t._chainEntries[r].widget.innerText;
                                    i = 0 == o ? n + " " + c : c + " " + n;
                                    var l = [o, r].sort();
                                    a.push({
                                        category: "meta",
                                        label: "(delete “" + i + "”)",
                                        value: l
                                    })
                                }
                                Joy.modal.Chooser({
                                    source: e.widget,
                                    options: a,
                                    onchange: function(n) {
                                        if ("string" == typeof n) {
                                            var a = t._chainEntries.indexOf(e);
                                            a++;
                                            var o = t._makeNewChainActor({
                                                type: "choose",
                                                value: n
                                            }, a);
                                            t._makeChainEntry(o, a), a++;
                                            var r = t._makeNewChainActor({
                                                type: "number_raw",
                                                value: 2
                                            }, a);
                                            t._makeChainEntry(r, a)
                                        } else
                                            for (var i = n, c = i.length - 1; c >= 0; c--) {
                                                var l = i[c],
                                                    s = t._chainEntries[l].actor;
                                                t._deleteChainActor(s), t._deleteChainEntry(s)
                                            }
                                        t.update()
                                    }
                                })
                            }, a = 0; a < t.chainActors.length; a++) {
                            var o = t.chainActors[a];
                            t._makeChainEntry(o)
                        }
                    }
                },
                onget: function(t) {
                    if (t.actor.noVariables) return e.onget(t);
                    for (var n = [], a = 0; a < t.data.chain.length; a += 2) {
                        var o, r = t.actor.chainActors[a];
                        switch (r.type) {
                            case "number_raw":
                                o = r.get(t.target);
                                break;
                            case "variableName":
                                o = t.target._variables[r.get(t.target)]
                        }
                        if (a > 0) {
                            var i = t.actor.chainActors[a - 1].get();
                            n.push(i)
                        }
                        n.push(o)
                    }
                    for (a = 1; a < n.length; a += 2) {
                        if ("*" == (i = n[a]) || "/" == i) {
                            var c = n[a - 1],
                                l = n[a + 1];
                            s = "*" == i ? c * l : c / l, n.splice(a - 1, 3, s), a -= 2
                        }
                    }
                    for (a = 1; a < n.length; a += 2) {
                        if ("+" == (i = n[a]) || "-" == i) {
                            var s;
                            c = n[a - 1], l = n[a + 1];
                            s = "+" == i ? c + l : c - l, n.splice(a - 1, 3, s), a -= 2
                        }
                    }
                    return n[0]
                }
            }
        }), Joy.add({
            name: "Set [number]",
            type: "math/set",
            tags: ["math", "action"],
            init: "Set {id:'varname', type:'variableName', variableType:'number'} to {id:'value', type:'number'}",
            onact: function(e) {
                e.target._variables[e.data.varname] = e.data.value
            }
        }), Joy.add({
            name: "Do math to [number]",
            type: "math/operation",
            tags: ["math", "action"],
            init: JSON.stringify({
                id: "operation",
                type: "choose",
                placeholder: "+",
                options: [{
                    label: "+ Increase",
                    value: "+"
                }, {
                    label: "- Decrease",
                    value: "-"
                }, {
                    label: "&times; Multiply",
                    value: "*"
                }, {
                    label: "&divide; Divide",
                    value: "/"
                }]
            }) + " {id:'varname', type:'variableName', variableType:'number', startWithExisting:true} by {id:'value', type:'number'}",
            onact: function(e) {
                var t = e.target._variables,
                    n = e.data.varname;
                switch (void 0 === t[n] && (t[n] = 0), e.data.operation) {
                    case "+":
                        t[n] += e.data.value;
                        break;
                    case "-":
                        t[n] -= e.data.value;
                        break;
                    case "*":
                        t[n] *= e.data.value;
                        break;
                    case "/":
                        t[n] /= e.data.value
                }
            }
        }), Joy.add({
            name: "If [math] then...",
            type: "math/if",
            tags: ["math", "action"],
            init: "If {id:'value1', type:'number'} {id:'test', type:'choose', options:['<','≤','=','≥','>'], placeholder:'='} {id:'value2', type:'number'}, then: {id:'actions', type:'actions', resetVariables:false}",
            onact: function(e) {
                var t, n = e.data.value1,
                    a = e.data.value2;
                switch (e.data.test) {
                    case "<":
                        t = n < a;
                        break;
                    case "≤":
                        t = n <= a;
                        break;
                    case "=":
                        t = n == a;
                        break;
                    case "≥":
                        t = n >= a;
                        break;
                    case ">":
                        t = n > a
                }
                if (t) {
                    var o = e.actor.actions.act(e.target);
                    if ("STOP" == o) return o
                }
            }
        })
    }), Joy.module("random", function() {
        Joy.add({
            name: "With a X% chance...",
            type: "random/if",
            tags: ["random", "action"],
            init: "With a {id:'chance', type:'number', min:0, max:100, placeholder:50}% chance, do:{id:'actions', type:'actions', resetVariables:false}",
            onact: function(e) {
                var t = e.data.chance / 100;
                if (Math.random() < t) {
                    var n = e.actor.actions.act(e.target);
                    if ("STOP" == n) return n
                }
            }
        }), Joy.add({
            name: "Set random [number]",
            type: "random/set",
            tags: ["random", "action"],
            init: "Set {id:'varname', type:'variableName', variableType:'number'} to a random {id:'numtype', type:'choose', options:['number','integer'], placeholder:'number'} between {id:'min', type:'number', placeholder:1} and {id:'max', type:'number', placeholder:100}",
            onact: function(e) {
                var t, n = e.target._variables,
                    a = e.data.varname,
                    o = e.data.min,
                    r = e.data.max,
                    i = Math.min(o, r),
                    c = Math.max(o, r);
                t = "integer" == e.data.numtype ? i + Math.floor(Math.random() * (c - i + 1)) : i + Math.random() * (c - i), n[a] = t
            }
        })
    });