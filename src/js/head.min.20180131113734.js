// Snap.svg 0.2.0
// 
// Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
// http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// 
// build: 2013-12-23
// md5 hashing routine; usage var hash = md5("hash"); // source: https://github.com/blueimp/JavaScript-MD5
// compare helper - {{#compare var "!=" "66"}}
// json serialize helper - {{json var}}
// defined globally but using local variables defined later - would break if you re-used it
// https://github.com/eligrey/FileSaver.js
// ar objecturl = URL.createObjectURL(dataURItoBlob('your data url goes here'));
// popup window centered (location,title,width,height)
function hhmmss_2_seconds(t){for(var e=t.split(":"),n=0,r=1;e.length>0;)n+=r*parseInt(e.pop(),10),r*=60
return n}function debounce(t,e,n){var r
return function(){var i=this,o=arguments,a=function(){r=null,n||t.apply(i,o)},s=n&&!r
clearTimeout(r),r=setTimeout(a,e),s&&t.apply(i,o)}}function swapElements(t,e){var n=e.parentNode,r=e.nextSibling
r===t?n.insertBefore(t,e):(t.parentNode.insertBefore(e,t),r?n.insertBefore(t,r):n.appendChild(t))}function xhrFields(t){var e=[]
for(var n in t)t.hasOwnProperty(n)&&null!==t[n]&&e.push([encodeURIComponent(n),encodeURIComponent(t[n])].join("="))
return e.join("&")}function hhmmss(t,e){var n="",r=t.toString(),i=""
if(r.indexOf(".")!==-1){var o=r.split(".")[1]
o.length<=2&&(o+="000"),n="."+o.substr(0,3)}else e&&0===t&&(n=".000")
var a=new Date(1970,0,1)
return a.setSeconds(t),i=a.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/,"$1"),e&&(i+=n),i}function HHMMSS(t){var e,n=new Date(1970,0,1)
return n.setSeconds(t),e=n.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/,"$1"),e.replace(/^00:/,"")}function dec2hex(t){return Number(t).toString(16)}function hex2dec(t){return parseInt(t,16)}function dataURItoBlob(t){for(var e=t.split(",")[0].split(":")[1].split(";")[0],n=atob(t.split(",")[1]),r=[],i=0;i<n.length;i++)r.push(n.charCodeAt(i))
return new Blob([new Uint8Array(r)],{type:e})}function getDataUri(t,e){var n=new Image
n.crossOrigin="anonymous",n.onload=function(){var t=document.createElement("canvas")
t.width=this.naturalWidth,t.height=this.naturalHeight,t.getContext("2d").drawImage(this,0,0),e(t.toDataURL("image/jpeg",.75))},n.src=t}function visualize(t,e){function n(){WIDTH=t.width,HEIGHT=t.height,requestAnimationFrame(n),a.getByteTimeDomainData(u),o.fillStyle="rgb(34, 46, 70)",o.fillRect(0,0,WIDTH,HEIGHT),o.lineWidth=2,o.strokeStyle="rgb(87, 183, 220)",o.beginPath()
for(var e=1*WIDTH/s,r=0,i=0;i<s;i++){var l=u[i]/128,c=l*HEIGHT/2
0===i?o.moveTo(r,c):o.lineTo(r,c),r+=e}o.lineTo(t.width,t.height/2),o.stroke()}var r=new(window.AudioContext||webkitAudioContext),i=r.createMediaStreamSource(e),o=t.getContext("2d"),a=r.createAnalyser()
a.fftSize=2048
var s=a.frequencyBinCount,u=new Uint8Array(s)
i.connect(a),n()}function PopupCenter(t,e,n,r){var i=void 0!=window.screenLeft?window.screenLeft:screen.left,o=void 0!=window.screenTop?window.screenTop:screen.top
width=window.innerWidth?window.innerWidth:document.documentElement.clientWidth?document.documentElement.clientWidth:screen.width,height=window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:screen.height,t=window.open(t,e,"scrollbars=yes, width="+n+", height="+r+", top="+(height/2-r/2+o)+", left="+(width/2-n/2+i)+", resizable=yes"),window.focus&&t.focus()}function triggerEvent(t,e){if("createEvent"in document){var n=document.createEvent("HTMLEvents")
n.initEvent(e,!1,!0),t.dispatchEvent(n)}else{var n=document.createEventObject()
n.eventType=e,t.fireEvent("on"+n.eventType,n)}}!function(t){var e,n,r="0.4.2",i="hasOwnProperty",o=/[\.\/]/,a="*",s=function(){},u=function(t,e){return t-e},l={n:{}},c=function(t,r){t=String(t)
var i,o=n,a=Array.prototype.slice.call(arguments,2),s=c.listeners(t),l=0,f=[],d={},h=[],p=e
e=t,n=0
for(var g=0,v=s.length;v>g;g++)"zIndex"in s[g]&&(f.push(s[g].zIndex),s[g].zIndex<0&&(d[s[g].zIndex]=s[g]))
for(f.sort(u);f[l]<0;)if(i=d[f[l++]],h.push(i.apply(r,a)),n)return n=o,h
for(g=0;v>g;g++)if(i=s[g],"zIndex"in i)if(i.zIndex==f[l]){if(h.push(i.apply(r,a)),n)break
do if(l++,i=d[f[l]],i&&h.push(i.apply(r,a)),n)break
while(i)}else d[i.zIndex]=i
else if(h.push(i.apply(r,a)),n)break
return n=o,e=p,h.length?h:null}
c._events=l,c.listeners=function(t){var e,n,r,i,s,u,c,f,d=t.split(o),h=l,p=[h],g=[]
for(i=0,s=d.length;s>i;i++){for(f=[],u=0,c=p.length;c>u;u++)for(h=p[u].n,n=[h[d[i]],h[a]],r=2;r--;)e=n[r],e&&(f.push(e),g=g.concat(e.f||[]))
p=f}return g},c.on=function(t,e){if(t=String(t),"function"!=typeof e)return function(){}
for(var n=t.split(o),r=l,i=0,a=n.length;a>i;i++)r=r.n,r=r.hasOwnProperty(n[i])&&r[n[i]]||(r[n[i]]={n:{}})
for(r.f=r.f||[],i=0,a=r.f.length;a>i;i++)if(r.f[i]==e)return s
return r.f.push(e),function(t){+t==+t&&(e.zIndex=+t)}},c.f=function(t){var e=[].slice.call(arguments,1)
return function(){c.apply(null,[t,null].concat(e).concat([].slice.call(arguments,0)))}},c.stop=function(){n=1},c.nt=function(t){return t?new RegExp("(?:\\.|\\/|^)"+t+"(?:\\.|\\/|$)").test(e):e},c.nts=function(){return e.split(o)},c.off=c.unbind=function(t,e){if(!t)return void(c._events=l={n:{}})
var n,r,s,u,f,d,h,p=t.split(o),g=[l]
for(u=0,f=p.length;f>u;u++)for(d=0;d<g.length;d+=s.length-2){if(s=[d,1],n=g[d].n,p[u]!=a)n[p[u]]&&s.push(n[p[u]])
else for(r in n)n[i](r)&&s.push(n[r])
g.splice.apply(g,s)}for(u=0,f=g.length;f>u;u++)for(n=g[u];n.n;){if(e){if(n.f){for(d=0,h=n.f.length;h>d;d++)if(n.f[d]==e){n.f.splice(d,1)
break}!n.f.length&&delete n.f}for(r in n.n)if(n.n[i](r)&&n.n[r].f){var v=n.n[r].f
for(d=0,h=v.length;h>d;d++)if(v[d]==e){v.splice(d,1)
break}!v.length&&delete n.n[r].f}}else{delete n.f
for(r in n.n)n.n[i](r)&&n.n[r].f&&delete n.n[r].f}n=n.n}},c.once=function(t,e){var n=function(){return c.unbind(t,n),e.apply(this,arguments)}
return c.on(t,n)},c.version=r,c.toString=function(){return"You are running Eve "+r},"undefined"!=typeof module&&module.exports?module.exports=c:"undefined"!=typeof define?define("eve",[],function(){return c}):t.eve=c}(this),function(t,e){"function"==typeof define&&define.amd?define(["eve"],function(n){return e(t,n)}):e(t,t.eve)}(this,function(t,e){var n=function(e){var n={},r=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.oRequestAnimationFrame||t.msRequestAnimationFrame||function(t){setTimeout(t,16)},i=Array.isArray||function(t){return t instanceof Array||"[object Array]"==Object.prototype.toString.call(t)},o=0,a="M"+(+new Date).toString(36),s=function(){return a+(o++).toString(36)},u=Date.now||function(){return+new Date},l=function(t){var e=this
if(null==t)return e.s
var n=e.s-t
e.b+=e.dur*n,e.B+=e.dur*n,e.s=t},c=function(t){var e=this
return null==t?e.spd:void(e.spd=t)},f=function(t){var e=this
return null==t?e.dur:(e.s=e.s*t/e.dur,void(e.dur=t))},d=function(){var t=this
delete n[t.id],e("mina.stop."+t.id,t)},h=function(){var t=this
t.pdif||(delete n[t.id],t.pdif=t.get()-t.b)},p=function(){var t=this
t.pdif&&(t.b=t.get()-t.pdif,delete t.pdif,n[t.id]=t)},g=function(){var t=0
for(var o in n)if(n.hasOwnProperty(o)){var a,s=n[o],u=s.get()
if(t++,s.s=(u-s.b)/(s.dur/s.spd),s.s>=1&&(delete n[o],s.s=1,t--,function(t){setTimeout(function(){e("mina.finish."+t.id,t)})}(s)),i(s.start)){a=[]
for(var l=0,c=s.start.length;c>l;l++)a[l]=+s.start[l]+(s.end[l]-s.start[l])*s.easing(s.s)}else a=+s.start+(s.end-s.start)*s.easing(s.s)
s.set(a)}t&&r(g)},v=function(t,e,i,o,a,u,m){var y={id:s(),start:t,end:e,b:i,s:0,dur:o-i,spd:1,get:a,set:u,easing:m||v.linear,status:l,speed:c,duration:f,stop:d,pause:h,resume:p}
n[y.id]=y
var x,b=0
for(x in n)if(n.hasOwnProperty(x)&&(b++,2==b))break
return 1==b&&r(g),y}
return v.time=u,v.getById=function(t){return n[t]||null},v.linear=function(t){return t},v.easeout=function(t){return Math.pow(t,1.7)},v.easein=function(t){return Math.pow(t,.48)},v.easeinout=function(t){if(1==t)return 1
if(0==t)return 0
var e=.48-t/1.04,n=Math.sqrt(.1734+e*e),r=n-e,i=Math.pow(Math.abs(r),1/3)*(0>r?-1:1),o=-n-e,a=Math.pow(Math.abs(o),1/3)*(0>o?-1:1),s=i+a+.5
return 3*(1-s)*s*s+s*s*s},v.backin=function(t){if(1==t)return 1
var e=1.70158
return t*t*((e+1)*t-e)},v.backout=function(t){if(0==t)return 0
t-=1
var e=1.70158
return t*t*((e+1)*t+e)+1},v.elastic=function(t){return t==!!t?t:Math.pow(2,-10*t)*Math.sin(2*(t-.075)*Math.PI/.3)+1},v.bounce=function(t){var e,n=7.5625,r=2.75
return 1/r>t?e=n*t*t:2/r>t?(t-=1.5/r,e=n*t*t+.75):2.5/r>t?(t-=2.25/r,e=n*t*t+.9375):(t-=2.625/r,e=n*t*t+.984375),e},t.mina=v,v}("undefined"==typeof e?function(){}:e),r=function(){function r(t,e){if(t){if(t.tagName)return M(t)
if(t instanceof b)return t
if(null==e)return t=N.doc.querySelector(t),M(t)}return t=null==t?"100%":t,e=null==e?"100%":e,new k(t,e)}function i(t,e){if(e){if("string"==typeof t&&(t=i(t)),"string"==typeof e)return"xlink:"==e.substring(0,6)?t.getAttributeNS(ot,e.substring(6)):"xml:"==e.substring(0,4)?t.getAttributeNS(at,e.substring(4)):t.getAttribute(e)
for(var n in e)if(e[H](n)){var r=L(e[n])
r?"xlink:"==n.substring(0,6)?t.setAttributeNS(ot,n.substring(6),r):"xml:"==n.substring(0,4)?t.setAttributeNS(at,n.substring(4),r):t.setAttribute(n,r):t.removeAttribute(n)}}else t=N.doc.createElementNS(at,t)
return t}function o(t,e){return e=L.prototype.toLowerCase.call(e),"finite"==e?isFinite(t):!("array"!=e||!(t instanceof Array||Array.isArray&&Array.isArray(t)))||("null"==e&&null===t||e==typeof t&&null!==t||"object"==e&&t===Object(t)||X.call(t).slice(8,-1).toLowerCase()==e)}function a(t){if("function"==typeof t||Object(t)!==t)return t
var e=new t.constructor
for(var n in t)t[H](n)&&(e[n]=a(t[n]))
return e}function s(t,e){for(var n=0,r=t.length;r>n;n++)if(t[n]===e)return t.push(t.splice(n,1)[0])}function u(t,e,n){function r(){var i=Array.prototype.slice.call(arguments,0),o=i.join("␀"),a=r.cache=r.cache||{},u=r.count=r.count||[]
return a[H](o)?(s(u,o),n?n(a[o]):a[o]):(u.length>=1e3&&delete a[u.shift()],u.push(o),a[o]=t.apply(e,i),n?n(a[o]):a[o])}return r}function l(t,e,n,r,i,o){if(null==i){var a=t-n,s=e-r
return a||s?(180+180*R.atan2(-s,-a)/G+360)%360:0}return l(t,e,i,o)-l(n,r,i,o)}function c(t){return t%360*G/180}function f(t){return 180*t/G%360}function d(t,e,n,r,i,o){return null==e&&"[object SVGMatrix]"==X.call(t)?(this.a=t.a,this.b=t.b,this.c=t.c,this.d=t.d,this.e=t.e,void(this.f=t.f)):void(null!=t?(this.a=+t,this.b=+e,this.c=+n,this.d=+r,this.e=+i,this.f=+o):(this.a=1,this.b=0,this.c=0,this.d=1,this.e=0,this.f=0))}function h(t){var e=[]
return t=t.replace(/(?:^|\s)(\w+)\(([^)]+)\)/g,function(t,n,r){return r=r.split(/\s*,\s*|\s+/),"rotate"==n&&1==r.length&&r.push(0,0),"scale"==n&&(2==r.length&&r.push(0,0),1==r.length&&r.push(r[0],0,0)),"skewX"==n?e.push(["m",1,0,R.tan(c(r[0])),1,0,0]):"skewY"==n?e.push(["m",1,R.tan(c(r[0])),0,1,0,0]):e.push([n.charAt(0)].concat(r)),t}),e}function p(t,e){var n=vt(t),r=new d
if(n)for(var i=0,o=n.length;o>i;i++){var a,s,u,l,c,f=n[i],h=f.length,p=L(f[0]).toLowerCase(),g=f[0]!=p,v=g?r.invert():0
"t"==p&&2==h?r.translate(f[1],0):"t"==p&&3==h?g?(a=v.x(0,0),s=v.y(0,0),u=v.x(f[1],f[2]),l=v.y(f[1],f[2]),r.translate(u-a,l-s)):r.translate(f[1],f[2]):"r"==p?2==h?(c=c||e,r.rotate(f[1],c.x+c.width/2,c.y+c.height/2)):4==h&&(g?(u=v.x(f[2],f[3]),l=v.y(f[2],f[3]),r.rotate(f[1],u,l)):r.rotate(f[1],f[2],f[3])):"s"==p?2==h||3==h?(c=c||e,r.scale(f[1],f[h-1],c.x+c.width/2,c.y+c.height/2)):4==h?g?(u=v.x(f[2],f[3]),l=v.y(f[2],f[3]),r.scale(f[1],f[1],u,l)):r.scale(f[1],f[1],f[2],f[3]):5==h&&(g?(u=v.x(f[3],f[4]),l=v.y(f[3],f[4]),r.scale(f[1],f[2],u,l)):r.scale(f[1],f[2],f[3],f[4])):"m"==p&&7==h&&r.add(f[1],f[2],f[3],f[4],f[5],f[6])}return r}function v(t,e){if(null==e){var n=!0
if(e="linearGradient"==t.type||"radialGradient"==t.type?t.node.getAttribute("gradientTransform"):"pattern"==t.type?t.node.getAttribute("patternTransform"):t.node.getAttribute("transform"),!e)return new d
e=h(e)}else e=r._.rgTransform.test(e)?L(e).replace(/\.{3}|\u2026/g,t._.transform||z):h(e),o(e,"array")&&(e=r.path?r.path.toString.call(e):L(e)),t._.transform=e
var i=p(e,t.getBBox(1))
return n?i:void(t.matrix=i)}function m(t){var e=r._.someDefs
if(e&&mt(e.ownerDocument.documentElement,e))return e
var n=t.node.ownerSVGElement&&M(t.node.ownerSVGElement)||t.node.parentNode&&M(t.node.parentNode)||r.select("svg")||r(0,0),i=n.select("defs"),o=null!=i&&i.node
return o||(o=C("defs",n.node).node),r._.someDefs=o,o}function y(t,e,n){function r(t){return null==t?z:t==+t?t:(i(l,{width:t}),l.getBBox().width)}function o(t){return null==t?z:t==+t?t:(i(l,{height:t}),l.getBBox().height)}function a(r,i){null==e?u[r]=i(t.attr(r)):r==e&&(u=i(null==n?t.attr(r):n))}var s=m(t),u={},l=s.querySelector(".svg---mgr")
switch(l||(l=i("rect"),i(l,{width:10,height:10,class:"svg---mgr"}),s.appendChild(l)),t.type){case"rect":a("rx",r),a("ry",o)
case"image":a("width",r),a("height",o)
case"text":a("x",r),a("y",o)
break
case"circle":a("cx",r),a("cy",o),a("r",r)
break
case"ellipse":a("cx",r),a("cy",o),a("rx",r),a("ry",o)
break
case"line":a("x1",r),a("x2",r),a("y1",o),a("y2",o)
break
case"marker":a("refX",r),a("markerWidth",r),a("refY",o),a("markerHeight",o)
break
case"radialGradient":a("fx",r),a("fy",o)
break
case"tspan":a("dx",r),a("dy",o)
break
default:a(e,r)}return u}function x(t){o(t,"array")||(t=Array.prototype.slice.call(arguments,0))
for(var e=0,n=0,r=this.node;this[e];)delete this[e++]
for(e=0;e<t.length;e++)"set"==t[e].type?t[e].forEach(function(t){r.appendChild(t.node)}):r.appendChild(t[e].node)
var i=r.childNodes
for(e=0;e<i.length;e++)this[n++]=M(i[e])
return this}function b(t){if(t.snap in st)return st[t.snap]
var e,n=this.id=it()
try{e=t.ownerSVGElement}catch(t){}if(this.node=t,e&&(this.paper=new k(e)),this.type=t.tagName,this.anims={},this._={transform:[]},t.snap=n,st[n]=this,"g"==this.type){this.add=x
for(var r in k.prototype)k.prototype[H](r)&&(this[r]=k.prototype[r])}}function w(t){for(var e,n=0,r=t.length;r>n;n++)if(e=e||t[n])return e}function S(t){this.node=t}function C(t,e){var n=i(t)
e.appendChild(n)
var r=M(n)
return r.type=t,r}function k(t,e){var n,r,o,a=k.prototype
if(t&&"svg"==t.tagName){if(t.snap in st)return st[t.snap]
n=new b(t),r=t.getElementsByTagName("desc")[0],o=t.getElementsByTagName("defs")[0],r||(r=i("desc"),r.appendChild(N.doc.createTextNode("Created with Snap")),n.node.appendChild(r)),o||(o=i("defs"),n.node.appendChild(o)),n.defs=o
for(var s in a)a[H](s)&&(n[s]=a[s])
n.paper=n.root=n}else n=C("svg",N.doc.body),i(n.node,{height:e,version:1.1,width:t,xmlns:at})
return n}function M(t){return t?t instanceof b||t instanceof S?t:"svg"==t.tagName?new k(t):new b(t):t}function E(){return this.selectAll("stop")}function T(t,e){var n=i("stop"),o={offset:+e+"%"}
return t=r.color(t),o["stop-color"]=t.hex,t.opacity<1&&(o["stop-opacity"]=t.opacity),i(n,o),this.node.appendChild(n),this}function _(){if("linearGradient"==this.type){var t=i(this.node,"x1")||0,e=i(this.node,"x2")||1,n=i(this.node,"y1")||0,o=i(this.node,"y2")||0
return r._.box(t,n,R.abs(e-t),R.abs(o-n))}var a=this.node.cx||.5,s=this.node.cy||.5,u=this.node.r||0
return r._.box(a-u,s-u,2*u,2*u)}function A(t,n){function r(t,e){for(var n=(e-l)/(t-c),r=c;t>r;r++)s[r].offset=+(+l+n*(r-c)).toFixed(2)
c=t,l=e}var o,a=w(e("snap.util.grad.parse",null,n))
if(!a)return null
a.params.unshift(t),o="l"==a.type.toLowerCase()?P.apply(0,a.params):F.apply(0,a.params),a.type!=a.type.toLowerCase()&&i(o.node,{gradientUnits:"userSpaceOnUse"})
var s=a.stops,u=s.length,l=0,c=0
u--
for(var f=0;u>f;f++)"offset"in s[f]&&r(f,s[f].offset)
for(s[u].offset=s[u].offset||100,r(u,s[u].offset),f=0;u>=f;f++){var d=s[f]
o.addStop(d.color,d.offset)}return o}function P(t,e,n,r,o){var a=C("linearGradient",t)
return a.stops=E,a.addStop=T,a.getBBox=_,null!=e&&i(a.node,{x1:e,y1:n,x2:r,y2:o}),a}function F(t,e,n,r,o,a){var s=C("radialGradient",t)
return s.stops=E,s.addStop=T,s.getBBox=_,null!=e&&i(s.node,{cx:e,cy:n,r:r}),null!=o&&null!=a&&i(s.node,{fx:o,fy:a}),s}function j(t){return function(n){if(e.stop(),n instanceof S&&1==n.node.childNodes.length&&("radialGradient"==n.node.firstChild.tagName||"linearGradient"==n.node.firstChild.tagName||"pattern"==n.node.firstChild.tagName)&&(n=n.node.firstChild,m(this).appendChild(n),n=M(n)),n instanceof b)if("radialGradient"==n.type||"linearGradient"==n.type||"pattern"==n.type){n.node.id||i(n.node,{id:n.id})
var o=ut(n.node.id)}else o=n.attr(t)
else if(o=r.color(n),o.error){var a=A(m(this),n)
a?(a.node.id||i(a.node,{id:a.id}),o=ut(a.node.id)):o=n}else o=L(o)
var s={}
s[t]=o,i(this.node,s),this.node.style[t]=z}}function B(t){for(var e=[],n=t.childNodes,r=0,i=n.length;i>r;r++){var o=n[r]
3==o.nodeType&&e.push(o.nodeValue),"tspan"==o.tagName&&(1==o.childNodes.length&&3==o.firstChild.nodeType?e.push(o.firstChild.nodeValue):e.push(B(o)))}return e}r.version="0.2.0",r.toString=function(){return"Snap v"+this.version},r._={}
var N={win:t,doc:t.document}
r._.glob=N
var H="hasOwnProperty",L=String,O=parseFloat,D=parseInt,R=Math,I=R.max,q=R.min,U=R.abs,G=(R.pow,R.PI),z=(R.round,""),V=" ",X=Object.prototype.toString,$=/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\))\s*$/i,W=/^url\(#?([^)]+)\)$/,Y="\t\n\v\f\r   ᠎             　\u2028\u2029",Z=new RegExp("[,"+Y+"]+"),J=(new RegExp("["+Y+"]","g"),new RegExp("["+Y+"]*,["+Y+"]*")),Q={hs:1,rg:1},K=new RegExp("([a-z])["+Y+",]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?["+Y+"]*,?["+Y+"]*)+)","ig"),tt=new RegExp("([rstm])["+Y+",]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?["+Y+"]*,?["+Y+"]*)+)","ig"),et=new RegExp("(-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?)["+Y+"]*,?["+Y+"]*","ig"),nt=0,rt="S"+(+new Date).toString(36),it=function(){return rt+(nt++).toString(36)},ot="http://www.w3.org/1999/xlink",at="http://www.w3.org/2000/svg",st={},ut=r.url=function(t){return"url('#"+t+"')"}
r._.$=i,r._.id=it,r.format=function(){var t=/\{([^\}]+)\}/g,e=/(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,n=function(t,n,r){var i=r
return n.replace(e,function(t,e,n,r,o){e=e||r,i&&(e in i&&(i=i[e]),"function"==typeof i&&o&&(i=i()))}),i=(null==i||i==r?t:i)+""}
return function(e,r){return L(e).replace(t,function(t,e){return n(t,e,r)})}}()
var lt=function(){function t(){this.parentNode.removeChild(this)}return function(e,n){var r=N.doc.createElement("img"),i=N.doc.body
r.style.cssText="position:absolute;left:-9999em;top:-9999em",r.onload=function(){n.call(r),r.onload=r.onerror=null,i.removeChild(r)},r.onerror=t,i.appendChild(r),r.src=e}}()
r._.clone=a,r._.cacher=u,r.rad=c,r.deg=f,r.angle=l,r.is=o,r.snapTo=function(t,e,n){if(n=o(n,"finite")?n:10,o(t,"array")){for(var r=t.length;r--;)if(U(t[r]-e)<=n)return t[r]}else{t=+t
var i=e%t
if(n>i)return e-i
if(i>t-n)return e-i+t}return e},function(t){function e(t){return t[0]*t[0]+t[1]*t[1]}function n(t){var n=R.sqrt(e(t))
t[0]&&(t[0]/=n),t[1]&&(t[1]/=n)}t.add=function(t,e,n,r,i,o){var a,s,u,l,c=[[],[],[]],f=[[this.a,this.c,this.e],[this.b,this.d,this.f],[0,0,1]],h=[[t,n,i],[e,r,o],[0,0,1]]
for(t&&t instanceof d&&(h=[[t.a,t.c,t.e],[t.b,t.d,t.f],[0,0,1]]),a=0;3>a;a++)for(s=0;3>s;s++){for(l=0,u=0;3>u;u++)l+=f[a][u]*h[u][s]
c[a][s]=l}return this.a=c[0][0],this.b=c[1][0],this.c=c[0][1],this.d=c[1][1],this.e=c[0][2],this.f=c[1][2],this},t.invert=function(){var t=this,e=t.a*t.d-t.b*t.c
return new d(t.d/e,-t.b/e,-t.c/e,t.a/e,(t.c*t.f-t.d*t.e)/e,(t.b*t.e-t.a*t.f)/e)},t.clone=function(){return new d(this.a,this.b,this.c,this.d,this.e,this.f)},t.translate=function(t,e){return this.add(1,0,0,1,t,e)},t.scale=function(t,e,n,r){return null==e&&(e=t),(n||r)&&this.add(1,0,0,1,n,r),this.add(t,0,0,e,0,0),(n||r)&&this.add(1,0,0,1,-n,-r),this},t.rotate=function(t,e,n){t=c(t),e=e||0,n=n||0
var r=+R.cos(t).toFixed(9),i=+R.sin(t).toFixed(9)
return this.add(r,i,-i,r,e,n),this.add(1,0,0,1,-e,-n)},t.x=function(t,e){return t*this.a+e*this.c+this.e},t.y=function(t,e){return t*this.b+e*this.d+this.f},t.get=function(t){return+this[L.fromCharCode(97+t)].toFixed(4)},t.toString=function(){return"matrix("+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)].join()+")"},t.offset=function(){return[this.e.toFixed(4),this.f.toFixed(4)]},t.split=function(){var t={}
t.dx=this.e,t.dy=this.f
var r=[[this.a,this.c],[this.b,this.d]]
t.scalex=R.sqrt(e(r[0])),n(r[0]),t.shear=r[0][0]*r[1][0]+r[0][1]*r[1][1],r[1]=[r[1][0]-r[0][0]*t.shear,r[1][1]-r[0][1]*t.shear],t.scaley=R.sqrt(e(r[1])),n(r[1]),t.shear/=t.scaley
var i=-r[0][1],o=r[1][1]
return 0>o?(t.rotate=f(R.acos(o)),0>i&&(t.rotate=360-t.rotate)):t.rotate=f(R.asin(i)),t.isSimple=!(+t.shear.toFixed(9)||t.scalex.toFixed(9)!=t.scaley.toFixed(9)&&t.rotate),t.isSuperSimple=!+t.shear.toFixed(9)&&t.scalex.toFixed(9)==t.scaley.toFixed(9)&&!t.rotate,t.noRotation=!+t.shear.toFixed(9)&&!t.rotate,t},t.toTransformString=function(t){var e=t||this.split()
return e.isSimple?(e.scalex=+e.scalex.toFixed(4),e.scaley=+e.scaley.toFixed(4),e.rotate=+e.rotate.toFixed(4),(e.dx||e.dy?"t"+[+e.dx.toFixed(4),+e.dy.toFixed(4)]:z)+(1!=e.scalex||1!=e.scaley?"s"+[e.scalex,e.scaley,0,0]:z)+(e.rotate?"r"+[+e.rotate.toFixed(4),0,0]:z)):"m"+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)]}}(d.prototype),r.Matrix=d,r.getRGB=u(function(t){if(!t||(t=L(t)).indexOf("-")+1)return{r:-1,g:-1,b:-1,hex:"none",error:1,toString:ht}
if("none"==t)return{r:-1,g:-1,b:-1,hex:"none",toString:ht}
if(!(Q[H](t.toLowerCase().substring(0,2))||"#"==t.charAt())&&(t=ct(t)),!t)return{r:-1,g:-1,b:-1,hex:"none",error:1,toString:ht}
var e,n,i,a,s,u,l=t.match($)
return l?(l[2]&&(i=D(l[2].substring(5),16),n=D(l[2].substring(3,5),16),e=D(l[2].substring(1,3),16)),l[3]&&(i=D((s=l[3].charAt(3))+s,16),n=D((s=l[3].charAt(2))+s,16),e=D((s=l[3].charAt(1))+s,16)),l[4]&&(u=l[4].split(J),e=O(u[0]),"%"==u[0].slice(-1)&&(e*=2.55),n=O(u[1]),"%"==u[1].slice(-1)&&(n*=2.55),i=O(u[2]),"%"==u[2].slice(-1)&&(i*=2.55),"rgba"==l[1].toLowerCase().slice(0,4)&&(a=O(u[3])),u[3]&&"%"==u[3].slice(-1)&&(a/=100)),l[5]?(u=l[5].split(J),e=O(u[0]),"%"==u[0].slice(-1)&&(e/=100),n=O(u[1]),"%"==u[1].slice(-1)&&(n/=100),i=O(u[2]),"%"==u[2].slice(-1)&&(i/=100),("deg"==u[0].slice(-3)||"°"==u[0].slice(-1))&&(e/=360),"hsba"==l[1].toLowerCase().slice(0,4)&&(a=O(u[3])),u[3]&&"%"==u[3].slice(-1)&&(a/=100),r.hsb2rgb(e,n,i,a)):l[6]?(u=l[6].split(J),e=O(u[0]),"%"==u[0].slice(-1)&&(e/=100),n=O(u[1]),"%"==u[1].slice(-1)&&(n/=100),i=O(u[2]),"%"==u[2].slice(-1)&&(i/=100),("deg"==u[0].slice(-3)||"°"==u[0].slice(-1))&&(e/=360),"hsla"==l[1].toLowerCase().slice(0,4)&&(a=O(u[3])),u[3]&&"%"==u[3].slice(-1)&&(a/=100),r.hsl2rgb(e,n,i,a)):(e=q(R.round(e),255),n=q(R.round(n),255),i=q(R.round(i),255),a=q(I(a,0),1),l={r:e,g:n,b:i,toString:ht},l.hex="#"+(16777216|i|n<<8|e<<16).toString(16).slice(1),l.opacity=o(a,"finite")?a:1,l)):{r:-1,g:-1,b:-1,hex:"none",error:1,toString:ht}},r),r.hsb=u(function(t,e,n){return r.hsb2rgb(t,e,n).hex}),r.hsl=u(function(t,e,n){return r.hsl2rgb(t,e,n).hex}),r.rgb=u(function(t,e,n,r){if(o(r,"finite")){var i=R.round
return"rgba("+[i(t),i(e),i(n),+r.toFixed(2)]+")"}return"#"+(16777216|n|e<<8|t<<16).toString(16).slice(1)})
var ct=function(t){var e=N.doc.getElementsByTagName("head")[0],n="rgb(255, 0, 0)"
return(ct=u(function(t){if("red"==t.toLowerCase())return n
e.style.color=n,e.style.color=t
var r=N.doc.defaultView.getComputedStyle(e,z).getPropertyValue("color")
return r==n?null:r}))(t)},ft=function(){return"hsb("+[this.h,this.s,this.b]+")"},dt=function(){return"hsl("+[this.h,this.s,this.l]+")"},ht=function(){return 1==this.opacity||null==this.opacity?this.hex:"rgba("+[this.r,this.g,this.b,this.opacity]+")"},pt=function(t,e,n){if(null==e&&o(t,"object")&&"r"in t&&"g"in t&&"b"in t&&(n=t.b,e=t.g,t=t.r),null==e&&o(t,string)){var i=r.getRGB(t)
t=i.r,e=i.g,n=i.b}return(t>1||e>1||n>1)&&(t/=255,e/=255,n/=255),[t,e,n]},gt=function(t,e,n,i){t=R.round(255*t),e=R.round(255*e),n=R.round(255*n)
var a={r:t,g:e,b:n,opacity:o(i,"finite")?i:1,hex:r.rgb(t,e,n),toString:ht}
return o(i,"finite")&&(a.opacity=i),a}
r.color=function(t){var e
return o(t,"object")&&"h"in t&&"s"in t&&"b"in t?(e=r.hsb2rgb(t),t.r=e.r,t.g=e.g,t.b=e.b,t.opacity=1,t.hex=e.hex):o(t,"object")&&"h"in t&&"s"in t&&"l"in t?(e=r.hsl2rgb(t),t.r=e.r,t.g=e.g,t.b=e.b,t.opacity=1,t.hex=e.hex):(o(t,"string")&&(t=r.getRGB(t)),o(t,"object")&&"r"in t&&"g"in t&&"b"in t&&!("error"in t)?(e=r.rgb2hsl(t),t.h=e.h,t.s=e.s,t.l=e.l,e=r.rgb2hsb(t),t.v=e.b):(t={hex:"none"},t.r=t.g=t.b=t.h=t.s=t.v=t.l=-1,t.error=1)),t.toString=ht,t},r.hsb2rgb=function(t,e,n,r){o(t,"object")&&"h"in t&&"s"in t&&"b"in t&&(n=t.b,e=t.s,t=t.h,r=t.o),t*=360
var i,a,s,u,l
return t=t%360/60,l=n*e,u=l*(1-U(t%2-1)),i=a=s=n-l,t=~~t,i+=[l,u,0,0,u,l][t],a+=[u,l,l,u,0,0][t],s+=[0,0,u,l,l,u][t],gt(i,a,s,r)},r.hsl2rgb=function(t,e,n,r){o(t,"object")&&"h"in t&&"s"in t&&"l"in t&&(n=t.l,e=t.s,t=t.h),(t>1||e>1||n>1)&&(t/=360,e/=100,n/=100),t*=360
var i,a,s,u,l
return t=t%360/60,l=2*e*(.5>n?n:1-n),u=l*(1-U(t%2-1)),i=a=s=n-l/2,t=~~t,i+=[l,u,0,0,u,l][t],a+=[u,l,l,u,0,0][t],s+=[0,0,u,l,l,u][t],gt(i,a,s,r)},r.rgb2hsb=function(t,e,n){n=pt(t,e,n),t=n[0],e=n[1],n=n[2]
var r,i,o,a
return o=I(t,e,n),a=o-q(t,e,n),r=0==a?null:o==t?(e-n)/a:o==e?(n-t)/a+2:(t-e)/a+4,r=60*((r+360)%6)/360,i=0==a?0:a/o,{h:r,s:i,b:o,toString:ft}},r.rgb2hsl=function(t,e,n){n=pt(t,e,n),t=n[0],e=n[1],n=n[2]
var r,i,o,a,s,u
return a=I(t,e,n),s=q(t,e,n),u=a-s,r=0==u?null:a==t?(e-n)/u:a==e?(n-t)/u+2:(t-e)/u+4,r=60*((r+360)%6)/360,o=(a+s)/2,i=0==u?0:.5>o?u/(2*o):u/(2-2*o),{h:r,s:i,l:o,toString:dt}},r.parsePathString=function(t){if(!t)return null
var e=r.path(t)
if(e.arr)return r.path.clone(e.arr)
var n={a:7,c:6,o:2,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,u:3,z:0},i=[]
return o(t,"array")&&o(t[0],"array")&&(i=r.path.clone(t)),i.length||L(t).replace(K,function(t,e,r){var o=[],a=e.toLowerCase()
if(r.replace(et,function(t,e){e&&o.push(+e)}),"m"==a&&o.length>2&&(i.push([e].concat(o.splice(0,2))),a="l",e="m"==e?"l":"L"),"o"==a&&1==o.length&&i.push([e,o[0]]),"r"==a)i.push([e].concat(o))
else for(;o.length>=n[a]&&(i.push([e].concat(o.splice(0,n[a]))),n[a]););}),i.toString=r.path.toString,e.arr=r.path.clone(i),i}
var vt=r.parseTransformString=function(t){if(!t)return null
var e=[]
return o(t,"array")&&o(t[0],"array")&&(e=r.path.clone(t)),e.length||L(t).replace(tt,function(t,n,r){var i=[]
n.toLowerCase(),r.replace(et,function(t,e){e&&i.push(+e)}),e.push([n].concat(i))}),e.toString=r.path.toString,e}
r._.svgTransform2string=h,r._.rgTransform=new RegExp("^[a-z]["+Y+"]*-?\\.?\\d","i"),r._.transform2matrix=p,r._unit2px=y
var mt=N.doc.contains||N.doc.compareDocumentPosition?function(t,e){var n=9==t.nodeType?t.documentElement:t,r=e&&e.parentNode
return t==r||!(!r||1!=r.nodeType||!(n.contains?n.contains(r):t.compareDocumentPosition&&16&t.compareDocumentPosition(r)))}:function(t,e){if(e)for(;e;)if(e=e.parentNode,e==t)return!0
return!1}
r._.getSomeDefs=m,r.select=function(t){return M(N.doc.querySelector(t))},r.selectAll=function(t){for(var e=N.doc.querySelectorAll(t),n=(r.set||Array)(),i=0;i<e.length;i++)n.push(M(e[i]))
return n},function(t){function a(t){function e(t,e){var n=i(t.node,e)
n=n&&n.match(a),n=n&&n[2],n&&"#"==n.charAt()&&(n=n.substring(1),n&&(u[n]=(u[n]||[]).concat(function(n){var r={}
r[e]=ut(n),i(t.node,r)})))}function n(t){var e=i(t.node,"xlink:href")
e&&"#"==e.charAt()&&(e=e.substring(1),e&&(u[e]=(u[e]||[]).concat(function(e){t.attr("xlink:href","#"+e)})))}for(var r,o=t.selectAll("*"),a=/^\s*url\(("|'|)(.*)\1\)\s*$/,s=[],u={},l=0,c=o.length;c>l;l++){r=o[l],e(r,"fill"),e(r,"stroke"),e(r,"filter"),e(r,"mask"),e(r,"clip-path"),n(r)
var f=i(r.node,"id")
f&&(i(r.node,{id:r.id}),s.push({old:f,id:r.id}))}for(l=0,c=s.length;c>l;l++){var d=u[s[l].old]
if(d)for(var h=0,p=d.length;p>h;h++)d[h](s[l].id)}}function s(t,e,n){return function(r){var i=r.slice(t,e)
return 1==i.length&&(i=i[0]),n?n(i):i}}function u(t){return function(){var e=t?"<"+this.type:"",n=this.node.attributes,r=this.node.childNodes
if(t)for(var i=0,o=n.length;o>i;i++)e+=" "+n[i].name+'="'+n[i].value.replace(/"/g,'\\"')+'"'
if(r.length){for(t&&(e+=">"),i=0,o=r.length;o>i;i++)3==r[i].nodeType?e+=r[i].nodeValue:1==r[i].nodeType&&(e+=M(r[i]).toString())
t&&(e+="</"+this.type+">")}else t&&(e+="/>")
return e}}t.attr=function(t,n){var r=this
if(r.node,!t)return r
if(o(t,"string")){if(!(arguments.length>1))return w(e("snap.util.getattr."+t,r))
var i={}
i[t]=n,t=i}for(var a in t)t[H](a)&&e("snap.util.attr."+a,r,t[a])
return r},t.getBBox=function(t){var e=this
if("use"==e.type&&(e=e.original),e.removed)return{}
var n=e._
return t?(n.bboxwt=r.path.get[e.type]?r.path.getBBox(e.realPath=r.path.get[e.type](e)):r._.box(e.node.getBBox()),r._.box(n.bboxwt)):(e.realPath=(r.path.get[e.type]||r.path.get.deflt)(e),n.bbox=r.path.getBBox(r.path.map(e.realPath,e.matrix)),r._.box(n.bbox))}
var l=function(){return this.string}
t.transform=function(t){var e=this._
if(null==t){var n=new d(this.node.getCTM()),r=v(this),o=r.toTransformString(),a=L(r)==L(this.matrix)?e.transform:o
return{string:a,globalMatrix:n,localMatrix:r,diffMatrix:n.clone().add(r.invert()),global:n.toTransformString(),local:o,toString:l}}return t instanceof d&&(t=t.toTransformString()),v(this,t),this.node&&("linearGradient"==this.type||"radialGradient"==this.type?i(this.node,{gradientTransform:this.matrix}):"pattern"==this.type?i(this.node,{patternTransform:this.matrix}):i(this.node,{transform:this.matrix})),this},t.parent=function(){return M(this.node.parentNode)},t.append=t.add=function(t){if(t){if("set"==t.type){var e=this
return t.forEach(function(t){e.add(t)}),this}t=M(t),this.node.appendChild(t.node),t.paper=this.paper}return this},t.appendTo=function(t){return t&&(t=M(t),t.append(this)),this},t.prepend=function(t){if(t){t=M(t)
var e=t.parent()
this.node.insertBefore(t.node,this.node.firstChild),this.add&&this.add(),t.paper=this.paper,this.parent()&&this.parent().add(),e&&e.add()}return this},t.prependTo=function(t){return t=M(t),t.prepend(this),this},t.before=function(t){if("set"==t.type){var e=this
return t.forEach(function(t){var n=t.parent()
e.node.parentNode.insertBefore(t.node,e.node),n&&n.add()}),this.parent().add(),this}t=M(t)
var n=t.parent()
return this.node.parentNode.insertBefore(t.node,this.node),this.parent()&&this.parent().add(),n&&n.add(),t.paper=this.paper,this},t.after=function(t){t=M(t)
var e=t.parent()
return this.node.nextSibling?this.node.parentNode.insertBefore(t.node,this.node.nextSibling):this.node.parentNode.appendChild(t.node),this.parent()&&this.parent().add(),e&&e.add(),t.paper=this.paper,this},t.insertBefore=function(t){t=M(t)
var e=this.parent()
return t.node.parentNode.insertBefore(this.node,t.node),this.paper=t.paper,e&&e.add(),t.parent()&&t.parent().add(),this},t.insertAfter=function(t){t=M(t)
var e=this.parent()
return t.node.parentNode.insertBefore(this.node,t.node.nextSibling),this.paper=t.paper,e&&e.add(),t.parent()&&t.parent().add(),this},t.remove=function(){var t=this.parent()
return this.node.parentNode&&this.node.parentNode.removeChild(this.node),delete this.paper,this.removed=!0,t&&t.add(),this},t.select=function(t){return M(this.node.querySelector(t))},t.selectAll=function(t){for(var e=this.node.querySelectorAll(t),n=(r.set||Array)(),i=0;i<e.length;i++)n.push(M(e[i]))
return n},t.asPX=function(t,e){return null==e&&(e=this.attr(t)),+y(this,t,e)},t.use=function(){var t,e=this.node.id
return e||(e=this.id,i(this.node,{id:e})),t="linearGradient"==this.type||"radialGradient"==this.type||"pattern"==this.type?C(this.type,this.node.parentNode):C("use",this.node.parentNode),i(t.node,{"xlink:href":"#"+e}),t.original=this,t},t.clone=function(){var t=M(this.node.cloneNode(!0))
return i(t.node,"id")&&i(t.node,{id:t.id}),a(t),t.insertAfter(this),t},t.toDefs=function(){var t=m(this)
return t.appendChild(this.node),this},t.pattern=function(t,e,n,r){var a=C("pattern",m(this))
return null==t&&(t=this.getBBox()),o(t,"object")&&"x"in t&&(e=t.y,n=t.width,r=t.height,t=t.x),i(a.node,{x:t,y:e,width:n,height:r,patternUnits:"userSpaceOnUse",id:a.id,viewBox:[t,e,n,r].join(" ")}),a.node.appendChild(this.node),a},t.marker=function(t,e,n,r,a,s){var u=C("marker",m(this))
return null==t&&(t=this.getBBox()),o(t,"object")&&"x"in t&&(e=t.y,n=t.width,r=t.height,a=t.refX||t.cx,s=t.refY||t.cy,t=t.x),i(u.node,{viewBox:[t,e,n,r].join(V),markerWidth:n,markerHeight:r,orient:"auto",refX:a||0,refY:s||0,id:u.id}),u.node.appendChild(this.node),u}
var c=function(t,e,r,i){"function"!=typeof r||r.length||(i=r,r=n.linear),this.attr=t,this.dur=e,r&&(this.easing=r),i&&(this.callback=i)}
r.animation=function(t,e,n,r){return new c(t,e,n,r)},t.inAnim=function(){var t=this,e=[]
for(var n in t.anims)t.anims[H](n)&&!function(t){e.push({anim:new c(t._attrs,t.dur,t.easing,t._callback),curStatus:t.status(),status:function(e){return t.status(e)},stop:function(){t.stop()}})}(t.anims[n])
return e},r.animate=function(t,r,i,o,a,s){"function"!=typeof a||a.length||(s=a,a=n.linear)
var u=n.time(),l=n(t,r,u,u+o,n.time,i,a)
return s&&e.once("mina.finish."+l.id,s),l},t.stop=function(){for(var t=this.inAnim(),e=0,n=t.length;n>e;e++)t[e].stop()
return this},t.animate=function(t,r,i,a){"function"!=typeof i||i.length||(a=i,i=n.linear),t instanceof c&&(a=t.callback,i=t.easing,r=i.dur,t=t.attr)
var u,l,f,d,h=[],p=[],g={},v=this
for(var m in t)if(t[H](m)){v.equal?(d=v.equal(m,L(t[m])),u=d.from,l=d.to,f=d.f):(u=+v.attr(m),l=+t[m])
var y=o(u,"array")?u.length:1
g[m]=s(h.length,h.length+y,f),h=h.concat(u),p=p.concat(l)}var x=n.time(),b=n(h,p,x,x+r,n.time,function(t){var e={}
for(var n in g)g[H](n)&&(e[n]=g[n](t))
v.attr(e)},i)
return v.anims[b.id]=b,b._attrs=t,b._callback=a,e.once("mina.finish."+b.id,function(){delete v.anims[b.id],a&&a.call(v)}),e.once("mina.stop."+b.id,function(){delete v.anims[b.id]}),v}
var f={}
t.data=function(t,n){var i=f[this.id]=f[this.id]||{}
if(0==arguments.length)return e("snap.data.get."+this.id,this,i,null),i
if(1==arguments.length){if(r.is(t,"object")){for(var o in t)t[H](o)&&this.data(o,t[o])
return this}return e("snap.data.get."+this.id,this,i[t],t),i[t]}return i[t]=n,e("snap.data.set."+this.id,this,n,t),this},t.removeData=function(t){return null==t?f[this.id]={}:f[this.id]&&delete f[this.id][t],this},t.outerSVG=t.toString=u(1),t.innerSVG=u()}(b.prototype),r.parse=function(t){var e=N.doc.createDocumentFragment(),n=!0,r=N.doc.createElement("div")
if(t=L(t),t.match(/^\s*<\s*svg(?:\s|>)/)||(t="<svg>"+t+"</svg>",n=!1),r.innerHTML=t,t=r.getElementsByTagName("svg")[0])if(n)e=t
else for(;t.firstChild;)e.appendChild(t.firstChild)
return r.innerHTML=z,new S(e)},S.prototype.select=b.prototype.select,S.prototype.selectAll=b.prototype.selectAll,r.fragment=function(){for(var t=Array.prototype.slice.call(arguments,0),e=N.doc.createDocumentFragment(),n=0,i=t.length;i>n;n++){var o=t[n]
o.node&&o.node.nodeType&&e.appendChild(o.node),o.nodeType&&e.appendChild(o),"string"==typeof o&&e.appendChild(r.parse(o).node)}return new S(e)},function(t){t.el=function(t,e){return C(t,this.node).attr(e)},t.rect=function(t,e,n,r,i,a){var s
return null==a&&(a=i),o(t,"object")&&"x"in t?s=t:null!=t&&(s={x:t,y:e,width:n,height:r},null!=i&&(s.rx=i,s.ry=a)),this.el("rect",s)},t.circle=function(t,e,n){var r
return o(t,"object")&&"cx"in t?r=t:null!=t&&(r={cx:t,cy:e,r:n}),this.el("circle",r)},t.image=function(t,e,n,r,a){var s=C("image",this.node)
if(o(t,"object")&&"src"in t)s.attr(t)
else if(null!=t){var u={"xlink:href":t,preserveAspectRatio:"none"}
null!=e&&null!=n&&(u.x=e,u.y=n),null!=r&&null!=a?(u.width=r,u.height=a):lt(t,function(){i(s.node,{width:this.offsetWidth,height:this.offsetHeight})}),i(s.node,u)}return s},t.ellipse=function(t,e,n,r){var i=C("ellipse",this.node)
return o(t,"object")&&"cx"in t?i.attr(t):null!=t&&i.attr({cx:t,cy:e,rx:n,ry:r}),i},t.path=function(t){var e=C("path",this.node)
return o(t,"object")&&!o(t,"array")?e.attr(t):t&&e.attr({d:t}),e},t.group=t.g=function(e){var n=C("g",this.node)
n.add=x
for(var r in t)t[H](r)&&(n[r]=t[r])
return 1==arguments.length&&e&&!e.type?n.attr(e):arguments.length&&n.add(Array.prototype.slice.call(arguments,0)),n},t.text=function(t,e,n){var r=C("text",this.node)
return o(t,"object")?r.attr(t):null!=t&&r.attr({x:t,y:e,text:n||""}),r},t.line=function(t,e,n,r){var i=C("line",this.node)
return o(t,"object")?i.attr(t):null!=t&&i.attr({x1:t,x2:n,y1:e,y2:r}),i},t.polyline=function(t){arguments.length>1&&(t=Array.prototype.slice.call(arguments,0))
var e=C("polyline",this.node)
return o(t,"object")&&!o(t,"array")?e.attr(t):null!=t&&e.attr({points:t}),e},t.polygon=function(t){arguments.length>1&&(t=Array.prototype.slice.call(arguments,0))
var e=C("polygon",this.node)
return o(t,"object")&&!o(t,"array")?e.attr(t):null!=t&&e.attr({points:t}),e},function(){t.gradient=function(t){return A(this.defs,t)},t.gradientLinear=function(t,e,n,r){return P(this.defs,t,e,n,r)},t.gradientRadial=function(t,e,n,r,i){return F(this.defs,t,e,n,r,i)},t.toString=function(){var t,e=N.doc.createDocumentFragment(),n=N.doc.createElement("div"),r=this.node.cloneNode(!0)
return e.appendChild(n),n.appendChild(r),i(r,{xmlns:at}),t=n.innerHTML,e.removeChild(e.firstChild),t},t.clear=function(){for(var t,e=this.node.firstChild;e;)t=e.nextSibling,"defs"!=e.tagName&&e.parentNode.removeChild(e),e=t}}()}(k.prototype),r.ajax=function(t,n,r,i){var a=new XMLHttpRequest,s=it()
if(a){if(o(n,"function"))i=r,r=n,n=null
else if(o(n,"object")){var u=[]
for(var l in n)n.hasOwnProperty(l)&&u.push(encodeURIComponent(l)+"="+encodeURIComponent(n[l]))
n=u.join("&")}return a.open(n?"POST":"GET",t,!0),a.setRequestHeader("X-Requested-With","XMLHttpRequest"),n&&a.setRequestHeader("Content-type","application/x-www-form-urlencoded"),r&&(e.once("snap.ajax."+s+".0",r),e.once("snap.ajax."+s+".200",r),e.once("snap.ajax."+s+".304",r)),a.onreadystatechange=function(){4==a.readyState&&e("snap.ajax."+s+"."+a.status,i,a)},4==a.readyState?a:(a.send(n),a)}},r.load=function(t,e,n){r.ajax(t,function(t){var i=r.parse(t.responseText)
n?e.call(n,i):e(i)})},e.on("snap.util.attr.mask",function(t){if(t instanceof b||t instanceof S){if(e.stop(),t instanceof S&&1==t.node.childNodes.length&&(t=t.node.firstChild,m(this).appendChild(t),t=M(t)),"mask"==t.type)var n=t
else n=C("mask",m(this)),n.node.appendChild(t.node),!n.node.id&&i(n.node,{id:n.id})
i(this.node,{mask:ut(n.id)})}}),function(t){e.on("snap.util.attr.clip",t),e.on("snap.util.attr.clip-path",t),e.on("snap.util.attr.clipPath",t)}(function(t){if(t instanceof b||t instanceof S){if(e.stop(),"clipPath"==t.type)var n=t
else n=C("clipPath",m(this)),n.node.appendChild(t.node),!n.node.id&&i(n.node,{id:n.id})
i(this.node,{"clip-path":ut(n.id)})}}),e.on("snap.util.attr.fill",j("fill")),e.on("snap.util.attr.stroke",j("stroke"))
var yt=/^([lr])(?:\(([^)]*)\))?(.*)$/i
e.on("snap.util.grad.parse",function(t){t=L(t)
var e=t.match(yt)
if(!e)return null
var n=e[1],r=e[2],i=e[3]
return r=r.split(/\s*,\s*/).map(function(t){return+t==t?+t:t}),1==r.length&&0==r[0]&&(r=[]),i=i.split("-"),i=i.map(function(t){t=t.split(":")
var e={color:t[0]}
return t[1]&&(e.offset=t[1]),e}),{type:n,params:r,stops:i}}),e.on("snap.util.attr.d",function(t){e.stop(),o(t,"array")&&o(t[0],"array")&&(t=r.path.toString.call(t)),t=L(t),t.match(/[ruo]/i)&&(t=r.path.toAbsolute(t)),i(this.node,{d:t})})(-1),e.on("snap.util.attr.#text",function(t){e.stop(),t=L(t)
for(var n=N.doc.createTextNode(t);this.node.firstChild;)this.node.removeChild(this.node.firstChild)
this.node.appendChild(n)})(-1),e.on("snap.util.attr.path",function(t){e.stop(),this.attr({d:t})})(-1),e.on("snap.util.attr.viewBox",function(t){var n
n=o(t,"object")&&"x"in t?[t.x,t.y,t.width,t.height].join(" "):o(t,"array")?t.join(" "):t,i(this.node,{viewBox:n}),e.stop()})(-1),e.on("snap.util.attr.transform",function(t){this.transform(t),e.stop()})(-1),e.on("snap.util.attr.r",function(t){"rect"==this.type&&(e.stop(),i(this.node,{rx:t,ry:t}))})(-1),e.on("snap.util.attr.textpath",function(t){if(e.stop(),"text"==this.type){var n,r,a
if(!t&&this.textPath){for(r=this.textPath;r.node.firstChild;)this.node.appendChild(r.node.firstChild)
return r.remove(),void delete this.textPath}if(o(t,"string")){var s=m(this),u=M(s.parentNode).path(t)
s.appendChild(u.node),n=u.id,u.attr({id:n})}else t=M(t),t instanceof b&&(n=t.attr("id"),n||(n=t.id,t.attr({id:n})))
if(n)if(r=this.textPath,a=this.node,r)r.attr({"xlink:href":"#"+n})
else{for(r=i("textPath",{"xlink:href":"#"+n});a.firstChild;)r.appendChild(a.firstChild)
a.appendChild(r),this.textPath=M(r)}}})(-1),e.on("snap.util.attr.text",function(t){if("text"==this.type){for(var n=this.node,r=function(t){var e=i("tspan")
if(o(t,"array"))for(var n=0;n<t.length;n++)e.appendChild(r(t[n]))
else e.appendChild(N.doc.createTextNode(t))
return e.normalize&&e.normalize(),e};n.firstChild;)n.removeChild(n.firstChild)
for(var a=r(t);a.firstChild;)n.appendChild(a.firstChild)}e.stop()})(-1)
var xt={"alignment-baseline":0,"baseline-shift":0,clip:0,"clip-path":0,"clip-rule":0,color:0,"color-interpolation":0,"color-interpolation-filters":0,"color-profile":0,"color-rendering":0,cursor:0,direction:0,display:0,"dominant-baseline":0,"enable-background":0,fill:0,"fill-opacity":0,"fill-rule":0,filter:0,"flood-color":0,"flood-opacity":0,font:0,"font-family":0,"font-size":0,"font-size-adjust":0,"font-stretch":0,"font-style":0,"font-variant":0,"font-weight":0,"glyph-orientation-horizontal":0,"glyph-orientation-vertical":0,"image-rendering":0,kerning:0,"letter-spacing":0,"lighting-color":0,marker:0,"marker-end":0,"marker-mid":0,"marker-start":0,mask:0,opacity:0,overflow:0,"pointer-events":0,"shape-rendering":0,"stop-color":0,"stop-opacity":0,stroke:0,"stroke-dasharray":0,"stroke-dashoffset":0,"stroke-linecap":0,"stroke-linejoin":0,"stroke-miterlimit":0,"stroke-opacity":0,"stroke-width":0,"text-anchor":0,"text-decoration":0,"text-rendering":0,"unicode-bidi":0,visibility:0,"word-spacing":0,"writing-mode":0}
e.on("snap.util.attr",function(t){var n=e.nt(),r={}
n=n.substring(n.lastIndexOf(".")+1),r[n]=t
var o=n.replace(/-(\w)/gi,function(t,e){return e.toUpperCase()}),a=n.replace(/[A-Z]/g,function(t){return"-"+t.toLowerCase()})
xt[H](a)?this.node.style[o]=null==t?z:t:i(this.node,r)}),e.on("snap.util.getattr.transform",function(){return e.stop(),this.transform()})(-1),e.on("snap.util.getattr.textpath",function(){return e.stop(),this.textPath})(-1),function(){function t(t){return function(){e.stop()
var n=N.doc.defaultView.getComputedStyle(this.node,null).getPropertyValue("marker-"+t)
return"none"==n?n:r(N.doc.getElementById(n.match(W)[1]))}}function n(t){return function(n){e.stop()
var r="marker"+t.charAt(0).toUpperCase()+t.substring(1)
if(""==n||!n)return void(this.node.style[r]="none")
if("marker"==n.type){var o=n.node.id
return o||i(n.node,{id:n.id}),void(this.node.style[r]=ut(o))}}}e.on("snap.util.getattr.marker-end",t("end"))(-1),e.on("snap.util.getattr.markerEnd",t("end"))(-1),e.on("snap.util.getattr.marker-start",t("start"))(-1),e.on("snap.util.getattr.markerStart",t("start"))(-1),e.on("snap.util.getattr.marker-mid",t("mid"))(-1),e.on("snap.util.getattr.markerMid",t("mid"))(-1),e.on("snap.util.attr.marker-end",n("end"))(-1),e.on("snap.util.attr.markerEnd",n("end"))(-1),e.on("snap.util.attr.marker-start",n("start"))(-1),e.on("snap.util.attr.markerStart",n("start"))(-1),e.on("snap.util.attr.marker-mid",n("mid"))(-1),e.on("snap.util.attr.markerMid",n("mid"))(-1)}(),e.on("snap.util.getattr.r",function(){return"rect"==this.type&&i(this.node,"rx")==i(this.node,"ry")?(e.stop(),i(this.node,"rx")):void 0})(-1),e.on("snap.util.getattr.text",function(){if("text"==this.type||"tspan"==this.type){e.stop()
var t=B(this.node)
return 1==t.length?t[0]:t}})(-1),e.on("snap.util.getattr.#text",function(){return this.node.textContent})(-1),e.on("snap.util.getattr.viewBox",function(){e.stop()
var t=i(this.node,"viewBox").split(Z)
return r._.box(+t[0],+t[1],+t[2],+t[3])})(-1),e.on("snap.util.getattr.points",function(){var t=i(this.node,"points")
return e.stop(),t.split(Z)}),e.on("snap.util.getattr.path",function(){var t=i(this.node,"d")
return e.stop(),t}),e.on("snap.util.getattr",function(){var t=e.nt()
t=t.substring(t.lastIndexOf(".")+1)
var n=t.replace(/[A-Z]/g,function(t){return"-"+t.toLowerCase()})
return xt[H](n)?N.doc.defaultView.getComputedStyle(this.node,null).getPropertyValue(n):i(this.node,t)})
var bt=function(t){var e=t.getBoundingClientRect(),n=t.ownerDocument,r=n.body,i=n.documentElement,o=i.clientTop||r.clientTop||0,a=i.clientLeft||r.clientLeft||0,s=e.top+(g.win.pageYOffset||i.scrollTop||r.scrollTop)-o,u=e.left+(g.win.pageXOffset||i.scrollLeft||r.scrollLeft)-a
return{y:s,x:u}}
return r.getElementByPoint=function(t,e){var n=this,r=(n.canvas,N.doc.elementFromPoint(t,e))
if(N.win.opera&&"svg"==r.tagName){var i=bt(r),o=r.createSVGRect()
o.x=t-i.x,o.y=e-i.y,o.width=o.height=1
var a=r.getIntersectionList(o,null)
a.length&&(r=a[a.length-1])}return r?M(r):null},r.plugin=function(t){t(r,b,k,N)},N.win.Snap=r,r}()
return r.plugin(function(t,e){function n(t){var e=n.ps=n.ps||{}
return e[t]?e[t].sleep=100:e[t]={sleep:100},setTimeout(function(){for(var n in e)e[O](n)&&n!=t&&(e[n].sleep--,!e[n].sleep&&delete e[n])}),e[t]}function r(t,e,n,r){return null==t&&(t=e=n=r=0),null==e&&(e=t.y,n=t.width,r=t.height,t=t.x),{x:t,y:e,width:n,w:n,height:r,h:r,x2:t+n,y2:e+r,cx:t+n/2,cy:e+r/2,r1:I.min(n,r)/2,r2:I.max(n,r)/2,r0:I.sqrt(n*n+r*r)/2,path:S(t,e,n,r),vb:[t,e,n,r].join(" ")}}function i(){return this.join(",").replace(D,"$1")}function o(t){var e=L(t)
return e.toString=i,e}function a(t,e,n,r,i,o,a,s,l){return null==l?h(t,e,n,r,i,o,a,s):u(t,e,n,r,i,o,a,s,p(t,e,n,r,i,o,a,s,l))}function s(n,r){function i(t){return+(+t).toFixed(3)}return t._.cacher(function(t,o,s){t instanceof e&&(t=t.attr("d")),t=F(t)
for(var l,c,f,d,h,p="",g={},v=0,m=0,y=t.length;y>m;m++){if(f=t[m],"M"==f[0])l=+f[1],c=+f[2]
else{if(d=a(l,c,f[1],f[2],f[3],f[4],f[5],f[6]),v+d>o){if(r&&!g.start){if(h=a(l,c,f[1],f[2],f[3],f[4],f[5],f[6],o-v),p+=["C"+i(h.start.x),i(h.start.y),i(h.m.x),i(h.m.y),i(h.x),i(h.y)],s)return p
g.start=p,p=["M"+i(h.x),i(h.y)+"C"+i(h.n.x),i(h.n.y),i(h.end.x),i(h.end.y),i(f[5]),i(f[6])].join(),v+=d,l=+f[5],c=+f[6]
continue}if(!n&&!r)return h=a(l,c,f[1],f[2],f[3],f[4],f[5],f[6],o-v)}v+=d,l=+f[5],c=+f[6]}p+=f.shift()+f}return g.end=p,h=n?v:r?g:u(l,c,f[0],f[1],f[2],f[3],f[4],f[5],1)},null,t._.clone)}function u(t,e,n,r,i,o,a,s,u){var l=1-u,c=z(l,3),f=z(l,2),d=u*u,h=d*u,p=c*t+3*f*u*n+3*l*u*u*i+h*a,g=c*e+3*f*u*r+3*l*u*u*o+h*s,v=t+2*u*(n-t)+d*(i-2*n+t),m=e+2*u*(r-e)+d*(o-2*r+e),y=n+2*u*(i-n)+d*(a-2*i+n),x=r+2*u*(o-r)+d*(s-2*o+r),b=l*t+u*n,w=l*e+u*r,S=l*i+u*a,C=l*o+u*s,k=90-180*I.atan2(v-y,m-x)/q
return{x:p,y:g,m:{x:v,y:m},n:{x:y,y:x},start:{x:b,y:w},end:{x:S,y:C},alpha:k}}function l(e,n,i,o,a,s,u,l){t.is(e,"array")||(e=[e,n,i,o,a,s,u,l])
var c=P.apply(null,e)
return r(c.min.x,c.min.y,c.max.x-c.min.x,c.max.y-c.min.y)}function c(t,e,n){return e>=t.x&&e<=t.x+t.width&&n>=t.y&&n<=t.y+t.height}function f(t,e){return t=r(t),e=r(e),c(e,t.x,t.y)||c(e,t.x2,t.y)||c(e,t.x,t.y2)||c(e,t.x2,t.y2)||c(t,e.x,e.y)||c(t,e.x2,e.y)||c(t,e.x,e.y2)||c(t,e.x2,e.y2)||(t.x<e.x2&&t.x>e.x||e.x<t.x2&&e.x>t.x)&&(t.y<e.y2&&t.y>e.y||e.y<t.y2&&e.y>t.y)}function d(t,e,n,r,i){var o=-3*e+9*n-9*r+3*i,a=t*o+6*e-12*n+6*r
return t*a-3*e+3*n}function h(t,e,n,r,i,o,a,s,u){null==u&&(u=1),u=u>1?1:0>u?0:u
for(var l=u/2,c=12,f=[-.1252,.1252,-.3678,.3678,-.5873,.5873,-.7699,.7699,-.9041,.9041,-.9816,.9816],h=[.2491,.2491,.2335,.2335,.2032,.2032,.1601,.1601,.1069,.1069,.0472,.0472],p=0,g=0;c>g;g++){var v=l*f[g]+l,m=d(v,t,n,i,a),y=d(v,e,r,o,s),x=m*m+y*y
p+=h[g]*I.sqrt(x)}return l*p}function p(t,e,n,r,i,o,a,s,u){if(!(0>u||h(t,e,n,r,i,o,a,s)<u)){var l,c=1,f=c/2,d=c-f,p=.01
for(l=h(t,e,n,r,i,o,a,s,d);V(l-u)>p;)f/=2,d+=(u>l?1:-1)*f,l=h(t,e,n,r,i,o,a,s,d)
return d}}function g(t,e,n,r,i,o,a,s){if(!(G(t,n)<U(i,a)||U(t,n)>G(i,a)||G(e,r)<U(o,s)||U(e,r)>G(o,s))){var u=(t*r-e*n)*(i-a)-(t-n)*(i*s-o*a),l=(t*r-e*n)*(o-s)-(e-r)*(i*s-o*a),c=(t-n)*(o-s)-(e-r)*(i-a)
if(c){var f=u/c,d=l/c,h=+f.toFixed(2),p=+d.toFixed(2)
if(!(h<+U(t,n).toFixed(2)||h>+G(t,n).toFixed(2)||h<+U(i,a).toFixed(2)||h>+G(i,a).toFixed(2)||p<+U(e,r).toFixed(2)||p>+G(e,r).toFixed(2)||p<+U(o,s).toFixed(2)||p>+G(o,s).toFixed(2)))return{x:f,y:d}}}}function v(t,e,n){var r=l(t),i=l(e)
if(!f(r,i))return n?0:[]
for(var o=h.apply(0,t),a=h.apply(0,e),s=~~(o/5),c=~~(a/5),d=[],p=[],v={},m=n?0:[],y=0;s+1>y;y++){var x=u.apply(0,t.concat(y/s))
d.push({x:x.x,y:x.y,t:y/s})}for(y=0;c+1>y;y++)x=u.apply(0,e.concat(y/c)),p.push({x:x.x,y:x.y,t:y/c})
for(y=0;s>y;y++)for(var b=0;c>b;b++){var w=d[y],S=d[y+1],C=p[b],k=p[b+1],M=V(S.x-w.x)<.001?"y":"x",E=V(k.x-C.x)<.001?"y":"x",T=g(w.x,w.y,S.x,S.y,C.x,C.y,k.x,k.y)
if(T){if(v[T.x.toFixed(4)]==T.y.toFixed(4))continue
v[T.x.toFixed(4)]=T.y.toFixed(4)
var _=w.t+V((T[M]-w[M])/(S[M]-w[M]))*(S.t-w.t),A=C.t+V((T[E]-C[E])/(k[E]-C[E]))*(k.t-C.t)
_>=0&&1>=_&&A>=0&&1>=A&&(n?m++:m.push({x:T.x,y:T.y,t1:_,t2:A}))}}return m}function m(t,e){return x(t,e)}function y(t,e){return x(t,e,1)}function x(t,e,n){t=F(t),e=F(e)
for(var r,i,o,a,s,u,l,c,f,d,h=n?0:[],p=0,g=t.length;g>p;p++){var m=t[p]
if("M"==m[0])r=s=m[1],i=u=m[2]
else{"C"==m[0]?(f=[r,i].concat(m.slice(1)),r=f[6],i=f[7]):(f=[r,i,r,i,s,u,s,u],r=s,i=u)
for(var y=0,x=e.length;x>y;y++){var b=e[y]
if("M"==b[0])o=l=b[1],a=c=b[2]
else{"C"==b[0]?(d=[o,a].concat(b.slice(1)),o=d[6],a=d[7]):(d=[o,a,o,a,l,c,l,c],o=l,a=c)
var w=v(f,d,n)
if(n)h+=w
else{for(var S=0,C=w.length;C>S;S++)w[S].segment1=p,w[S].segment2=y,w[S].bez1=f,w[S].bez2=d
h=h.concat(w)}}}}}return h}function b(t,e,n){var r=w(t)
return c(r,e,n)&&1==x(t,[["M",e,n],["H",r.x2+10]],1)%2}function w(t){var e=n(t)
if(e.bbox)return L(e.bbox)
if(!t)return r()
t=F(t)
for(var i,o=0,a=0,s=[],u=[],l=0,c=t.length;c>l;l++)if(i=t[l],"M"==i[0])o=i[1],a=i[2],s.push(o),u.push(a)
else{var f=P(o,a,i[1],i[2],i[3],i[4],i[5],i[6])
s=s.concat(f.min.x,f.max.x),u=u.concat(f.min.y,f.max.y),o=i[5],a=i[6]}var d=U.apply(0,s),h=U.apply(0,u),p=G.apply(0,s),g=G.apply(0,u),v=r(d,h,p-d,g-h)
return e.bbox=L(v),v}function S(t,e,n,r,o){if(o)return[["M",t+o,e],["l",n-2*o,0],["a",o,o,0,0,1,o,o],["l",0,r-2*o],["a",o,o,0,0,1,-o,o],["l",2*o-n,0],["a",o,o,0,0,1,-o,-o],["l",0,2*o-r],["a",o,o,0,0,1,o,-o],["z"]]
var a=[["M",t,e],["l",n,0],["l",0,r],["l",-n,0],["z"]]
return a.toString=i,a}function C(t,e,n,r,o){if(null==o&&null==r&&(r=n),null!=o)var a=Math.PI/180,s=t+n*Math.cos(-r*a),u=t+n*Math.cos(-o*a),l=e+n*Math.sin(-r*a),c=e+n*Math.sin(-o*a),f=[["M",s,l],["A",n,n,0,+(o-r>180),0,u,c]]
else f=[["M",t,e],["m",0,-r],["a",n,r,0,1,1,0,2*r],["a",n,r,0,1,1,0,-2*r],["z"]]
return f.toString=i,f}function k(e){var r=n(e),a=String.prototype.toLowerCase
if(r.rel)return o(r.rel)
t.is(e,"array")&&t.is(e&&e[0],"array")||(e=t.parsePathString(e))
var s=[],u=0,l=0,c=0,f=0,d=0
"M"==e[0][0]&&(u=e[0][1],l=e[0][2],c=u,f=l,d++,s.push(["M",u,l]))
for(var h=d,p=e.length;p>h;h++){var g=s[h]=[],v=e[h]
if(v[0]!=a.call(v[0]))switch(g[0]=a.call(v[0]),g[0]){case"a":g[1]=v[1],g[2]=v[2],g[3]=v[3],g[4]=v[4],g[5]=v[5],g[6]=+(v[6]-u).toFixed(3),g[7]=+(v[7]-l).toFixed(3)
break
case"v":g[1]=+(v[1]-l).toFixed(3)
break
case"m":c=v[1],f=v[2]
default:for(var m=1,y=v.length;y>m;m++)g[m]=+(v[m]-(m%2?u:l)).toFixed(3)}else{g=s[h]=[],"m"==v[0]&&(c=v[1]+u,f=v[2]+l)
for(var x=0,b=v.length;b>x;x++)s[h][x]=v[x]}var w=s[h].length
switch(s[h][0]){case"z":u=c,l=f
break
case"h":u+=+s[h][w-1]
break
case"v":l+=+s[h][w-1]
break
default:u+=+s[h][w-2],l+=+s[h][w-1]}}return s.toString=i,r.rel=o(s),s}function M(e){var r=n(e)
if(r.abs)return o(r.abs)
if(H(e,"array")&&H(e&&e[0],"array")||(e=t.parsePathString(e)),!e||!e.length)return[["M",0,0]]
var a,s=[],u=0,l=0,c=0,f=0,d=0
"M"==e[0][0]&&(u=+e[0][1],l=+e[0][2],c=u,f=l,d++,s[0]=["M",u,l])
for(var h,p,g=3==e.length&&"M"==e[0][0]&&"R"==e[1][0].toUpperCase()&&"Z"==e[2][0].toUpperCase(),v=d,m=e.length;m>v;v++){if(s.push(h=[]),p=e[v],a=p[0],a!=a.toUpperCase())switch(h[0]=a.toUpperCase(),h[0]){case"A":h[1]=p[1],h[2]=p[2],h[3]=p[3],h[4]=p[4],h[5]=p[5],h[6]=+(p[6]+u),h[7]=+(p[7]+l)
break
case"V":h[1]=+p[1]+l
break
case"H":h[1]=+p[1]+u
break
case"R":for(var y=[u,l].concat(p.slice(1)),x=2,b=y.length;b>x;x++)y[x]=+y[x]+u,y[++x]=+y[x]+l
s.pop(),s=s.concat(B(y,g))
break
case"O":s.pop(),y=C(u,l,p[1],p[2]),y.push(y[0]),s=s.concat(y)
break
case"U":s.pop(),s=s.concat(C(u,l,p[1],p[2],p[3])),h=["U"].concat(s[s.length-1].slice(-2))
break
case"M":c=+p[1]+u,f=+p[2]+l
default:for(x=1,b=p.length;b>x;x++)h[x]=+p[x]+(x%2?u:l)}else if("R"==a)y=[u,l].concat(p.slice(1)),s.pop(),s=s.concat(B(y,g)),h=["R"].concat(p.slice(-2))
else if("O"==a)s.pop(),y=C(u,l,p[1],p[2]),y.push(y[0]),s=s.concat(y)
else if("U"==a)s.pop(),s=s.concat(C(u,l,p[1],p[2],p[3])),h=["U"].concat(s[s.length-1].slice(-2))
else for(var w=0,S=p.length;S>w;w++)h[w]=p[w]
if(a=a.toUpperCase(),"O"!=a)switch(h[0]){case"Z":u=c,l=f
break
case"H":u=h[1]
break
case"V":l=h[1]
break
case"M":c=h[h.length-2],f=h[h.length-1]
default:u=h[h.length-2],l=h[h.length-1]}}return s.toString=i,r.abs=o(s),s}function E(t,e,n,r){return[t,e,n,r,n,r]}function T(t,e,n,r,i,o){var a=1/3,s=2/3
return[a*t+s*n,a*e+s*r,a*i+s*n,a*o+s*r,i,o]}function _(e,n,r,i,o,a,s,u,l,c){var f,d=120*q/180,h=q/180*(+o||0),p=[],g=t._.cacher(function(t,e,n){var r=t*I.cos(n)-e*I.sin(n),i=t*I.sin(n)+e*I.cos(n)
return{x:r,y:i}})
if(c)k=c[0],M=c[1],S=c[2],C=c[3]
else{f=g(e,n,-h),e=f.x,n=f.y,f=g(u,l,-h),u=f.x,l=f.y
var v=(I.cos(q/180*o),I.sin(q/180*o),(e-u)/2),m=(n-l)/2,y=v*v/(r*r)+m*m/(i*i)
y>1&&(y=I.sqrt(y),r=y*r,i=y*i)
var x=r*r,b=i*i,w=(a==s?-1:1)*I.sqrt(V((x*b-x*m*m-b*v*v)/(x*m*m+b*v*v))),S=w*r*m/i+(e+u)/2,C=w*-i*v/r+(n+l)/2,k=I.asin(((n-C)/i).toFixed(9)),M=I.asin(((l-C)/i).toFixed(9))
k=S>e?q-k:k,M=S>u?q-M:M,0>k&&(k=2*q+k),0>M&&(M=2*q+M),s&&k>M&&(k-=2*q),!s&&M>k&&(M-=2*q)}var E=M-k
if(V(E)>d){var T=M,A=u,P=l
M=k+d*(s&&M>k?1:-1),u=S+r*I.cos(M),l=C+i*I.sin(M),p=_(u,l,r,i,o,0,s,A,P,[M,T,S,C])}E=M-k
var F=I.cos(k),j=I.sin(k),B=I.cos(M),N=I.sin(M),H=I.tan(E/4),L=4/3*r*H,O=4/3*i*H,D=[e,n],R=[e+L*j,n-O*F],U=[u+L*N,l-O*B],G=[u,l]
if(R[0]=2*D[0]-R[0],R[1]=2*D[1]-R[1],c)return[R,U,G].concat(p)
p=[R,U,G].concat(p).join().split(",")
for(var z=[],X=0,$=p.length;$>X;X++)z[X]=X%2?g(p[X-1],p[X],h).y:g(p[X],p[X+1],h).x
return z}function A(t,e,n,r,i,o,a,s,u){var l=1-u
return{x:z(l,3)*t+3*z(l,2)*u*n+3*l*u*u*i+z(u,3)*a,y:z(l,3)*e+3*z(l,2)*u*r+3*l*u*u*o+z(u,3)*s}}function P(t,e,n,r,i,o,a,s){var u,l=i-2*n+t-(a-2*i+n),c=2*(n-t)-2*(i-n),f=t-n,d=(-c+I.sqrt(c*c-4*l*f))/2/l,h=(-c-I.sqrt(c*c-4*l*f))/2/l,p=[e,s],g=[t,a]
return V(d)>"1e12"&&(d=.5),V(h)>"1e12"&&(h=.5),d>0&&1>d&&(u=A(t,e,n,r,i,o,a,s,d),g.push(u.x),p.push(u.y)),h>0&&1>h&&(u=A(t,e,n,r,i,o,a,s,h),g.push(u.x),p.push(u.y)),l=o-2*r+e-(s-2*o+r),c=2*(r-e)-2*(o-r),f=e-r,d=(-c+I.sqrt(c*c-4*l*f))/2/l,h=(-c-I.sqrt(c*c-4*l*f))/2/l,V(d)>"1e12"&&(d=.5),V(h)>"1e12"&&(h=.5),d>0&&1>d&&(u=A(t,e,n,r,i,o,a,s,d),g.push(u.x),p.push(u.y)),h>0&&1>h&&(u=A(t,e,n,r,i,o,a,s,h),g.push(u.x),p.push(u.y)),{min:{x:U.apply(0,g),y:U.apply(0,p)},max:{x:G.apply(0,g),y:G.apply(0,p)}}}function F(t,e){var r=!e&&n(t)
if(!e&&r.curve)return o(r.curve)
for(var i=M(t),a=e&&M(e),s={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},u={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},l=(function(t,e){var n,r
if(!t)return["C",e.x,e.y,e.x,e.y,e.x,e.y]
switch(!(t[0]in{T:1,Q:1})&&(e.qx=e.qy=null),t[0]){case"M":e.X=t[1],e.Y=t[2]
break
case"A":t=["C"].concat(_.apply(0,[e.x,e.y].concat(t.slice(1))))
break
case"S":n=e.x+(e.x-(e.bx||e.x)),r=e.y+(e.y-(e.by||e.y)),t=["C",n,r].concat(t.slice(1))
break
case"T":e.qx=e.x+(e.x-(e.qx||e.x)),e.qy=e.y+(e.y-(e.qy||e.y)),t=["C"].concat(T(e.x,e.y,e.qx,e.qy,t[1],t[2]))
break
case"Q":e.qx=t[1],e.qy=t[2],t=["C"].concat(T(e.x,e.y,t[1],t[2],t[3],t[4]))
break
case"L":t=["C"].concat(E(e.x,e.y,t[1],t[2]))
break
case"H":t=["C"].concat(E(e.x,e.y,t[1],e.y))
break
case"V":t=["C"].concat(E(e.x,e.y,e.x,t[1]))
break
case"Z":t=["C"].concat(E(e.x,e.y,e.X,e.Y))}return t}),c=function(t,e){if(t[e].length>7){t[e].shift()
for(var n=t[e];n.length;)t.splice(e++,0,["C"].concat(n.splice(0,6)))
t.splice(e,1),h=G(i.length,a&&a.length||0)}},f=function(t,e,n,r,o){t&&e&&"M"==t[o][0]&&"M"!=e[o][0]&&(e.splice(o,0,["M",r.x,r.y]),n.bx=0,n.by=0,n.x=t[o][1],n.y=t[o][2],h=G(i.length,a&&a.length||0))},d=0,h=G(i.length,a&&a.length||0);h>d;d++){i[d]=l(i[d],s),c(i,d),a&&(a[d]=l(a[d],u)),a&&c(a,d),f(i,a,s,u,d),f(a,i,u,s,d)
var p=i[d],g=a&&a[d],v=p.length,m=a&&g.length
s.x=p[v-2],s.y=p[v-1],s.bx=R(p[v-4])||s.x,s.by=R(p[v-3])||s.y,u.bx=a&&(R(g[m-4])||u.x),u.by=a&&(R(g[m-3])||u.y),u.x=a&&g[m-2],u.y=a&&g[m-1]}return a||(r.curve=o(i)),a?[i,a]:i}function j(t,e){if(!e)return t
var n,r,i,o,a,s,u
for(t=F(t),i=0,a=t.length;a>i;i++)for(u=t[i],o=1,s=u.length;s>o;o+=2)n=e.x(u[o],u[o+1]),r=e.y(u[o],u[o+1]),u[o]=n,u[o+1]=r
return t}function B(t,e){for(var n=[],r=0,i=t.length;i-2*!e>r;r+=2){var o=[{x:+t[r-2],y:+t[r-1]},{x:+t[r],y:+t[r+1]},{x:+t[r+2],y:+t[r+3]},{x:+t[r+4],y:+t[r+5]}]
e?r?i-4==r?o[3]={x:+t[0],y:+t[1]}:i-2==r&&(o[2]={x:+t[0],y:+t[1]},o[3]={x:+t[2],y:+t[3]}):o[0]={x:+t[i-2],y:+t[i-1]}:i-4==r?o[3]=o[2]:r||(o[0]={x:+t[r],y:+t[r+1]}),n.push(["C",(-o[0].x+6*o[1].x+o[2].x)/6,(-o[0].y+6*o[1].y+o[2].y)/6,(o[1].x+6*o[2].x-o[3].x)/6,(o[1].y+6*o[2].y-o[3].y)/6,o[2].x,o[2].y])}return n}var N=e.prototype,H=t.is,L=t._.clone,O="hasOwnProperty",D=/,?([a-z]),?/gi,R=parseFloat,I=Math,q=I.PI,U=I.min,G=I.max,z=I.pow,V=I.abs,X=s(1),$=s(),W=s(0,1),Y=t._unit2px,Z={path:function(t){return t.attr("path")},circle:function(t){var e=Y(t)
return C(e.cx,e.cy,e.r)},ellipse:function(t){var e=Y(t)
return C(e.cx,e.cy,e.rx,e.ry)},rect:function(t){var e=Y(t)
return S(e.x,e.y,e.width,e.height,e.rx,e.ry)},image:function(t){var e=Y(t)
return S(e.x,e.y,e.width,e.height)},text:function(t){var e=t.node.getBBox()
return S(e.x,e.y,e.width,e.height)},g:function(t){var e=t.node.getBBox()
return S(e.x,e.y,e.width,e.height)},symbol:function(t){var e=t.getBBox()
return S(e.x,e.y,e.width,e.height)},line:function(t){return"M"+[t.attr("x1"),t.attr("y1"),t.attr("x2"),t.attr("y2")]},polyline:function(t){return"M"+t.attr("points")},polygon:function(t){return"M"+t.attr("points")+"z"},svg:function(t){var e=t.node.getBBox()
return S(e.x,e.y,e.width,e.height)},deflt:function(t){var e=t.node.getBBox()
return S(e.x,e.y,e.width,e.height)}}
t.path=n,t.path.getTotalLength=X,t.path.getPointAtLength=$,t.path.getSubpath=function(t,e,n){if(this.getTotalLength(t)-n<1e-6)return W(t,e).end
var r=W(t,n,1)
return e?W(r,e).end:r},N.getTotalLength=function(){return this.node.getTotalLength?this.node.getTotalLength():void 0},N.getPointAtLength=function(t){return $(this.attr("d"),t)},N.getSubpath=function(e,n){return t.path.getSubpath(this.attr("d"),e,n)},t._.box=r,t.path.findDotsAtSegment=u,t.path.bezierBBox=l,t.path.isPointInsideBBox=c,t.path.isBBoxIntersect=f,t.path.intersection=m,t.path.intersectionNumber=y,t.path.isPointInside=b,t.path.getBBox=w,t.path.get=Z,t.path.toRelative=k,t.path.toAbsolute=M,t.path.toCubic=F,t.path.map=j,t.path.toString=i,t.path.clone=o}),r.plugin(function(t){var e=Math.max,n=Math.min,r=function(t){if(this.items=[],this.length=0,this.type="set",t)for(var e=0,n=t.length;n>e;e++)t[e]&&(this[this.items.length]=this.items[this.items.length]=t[e],this.length++)},i=r.prototype
i.push=function(){for(var t,e,n=0,r=arguments.length;r>n;n++)t=arguments[n],t&&(e=this.items.length,this[e]=this.items[e]=t,this.length++)
return this},i.pop=function(){return this.length&&delete this[this.length--],this.items.pop()},i.forEach=function(t,e){for(var n=0,r=this.items.length;r>n;n++)if(t.call(e,this.items[n],n)===!1)return this
return this},i.remove=function(){for(;this.length;)this.pop().remove()
return this},i.attr=function(t){for(var e=0,n=this.items.length;n>e;e++)this.items[e].attr(t)
return this},i.clear=function(){for(;this.length;)this.pop()},i.splice=function(t,i){t=0>t?e(this.length+t,0):t,i=e(0,n(this.length-t,i))
var o,a=[],s=[],u=[]
for(o=2;o<arguments.length;o++)u.push(arguments[o])
for(o=0;i>o;o++)s.push(this[t+o])
for(;o<this.length-t;o++)a.push(this[t+o])
var l=u.length
for(o=0;o<l+a.length;o++)this.items[t+o]=this[t+o]=l>o?u[o]:a[o-l]
for(o=this.items.length=this.length-=i-l;this[o];)delete this[o++]
return new r(s)},i.exclude=function(t){for(var e=0,n=this.length;n>e;e++)if(this[e]==t)return this.splice(e,1),!0
return!1},i.insertAfter=function(t){for(var e=this.items.length;e--;)this.items[e].insertAfter(t)
return this},i.getBBox=function(){for(var t=[],r=[],i=[],o=[],a=this.items.length;a--;)if(!this.items[a].removed){var s=this.items[a].getBBox()
t.push(s.x),r.push(s.y),i.push(s.x+s.width),o.push(s.y+s.height)}return t=n.apply(0,t),r=n.apply(0,r),i=e.apply(0,i),o=e.apply(0,o),{x:t,y:r,x2:i,y2:o,width:i-t,height:o-r,cx:t+(i-t)/2,cy:r+(o-r)/2}},i.clone=function(t){t=new r
for(var e=0,n=this.items.length;n>e;e++)t.push(this.items[e].clone())
return t},i.toString=function(){return"Snap‘s set"},i.type="set",t.set=function(){var t=new r
return arguments.length&&t.push.apply(t,Array.prototype.slice.call(arguments,0)),t}}),r.plugin(function(t,e){function n(t){var e=t[0]
switch(e.toLowerCase()){case"t":return[e,0,0]
case"m":return[e,1,0,0,1,0,0]
case"r":return 4==t.length?[e,0,t[2],t[3]]:[e,0]
case"s":return 5==t.length?[e,1,1,t[3],t[4]]:3==t.length?[e,1,1]:[e,1]}}function r(e,r,i){r=f(r).replace(/\.{3}|\u2026/g,e),e=t.parseTransformString(e)||[],r=t.parseTransformString(r)||[]
for(var o,a,l,c,d=Math.max(e.length,r.length),h=[],p=[],g=0;d>g;g++){if(l=e[g]||n(r[g]),c=r[g]||n(l),l[0]!=c[0]||"r"==l[0].toLowerCase()&&(l[2]!=c[2]||l[3]!=c[3])||"s"==l[0].toLowerCase()&&(l[3]!=c[3]||l[4]!=c[4])){e=t._.transform2matrix(e,i()),r=t._.transform2matrix(r,i()),h=[["m",e.a,e.b,e.c,e.d,e.e,e.f]],p=[["m",r.a,r.b,r.c,r.d,r.e,r.f]]
break}for(h[g]=[],p[g]=[],o=0,a=Math.max(l.length,c.length);a>o;o++)o in l&&(h[g][o]=l[o]),o in c&&(p[g][o]=c[o])}return{from:u(h),to:u(p),f:s(h)}}function i(t){return t}function o(t){return function(e){return+e.toFixed(3)+t}}function a(e){return t.rgb(e[0],e[1],e[2])}function s(t){var e,n,r,i,o,a,s=0,u=[]
for(e=0,n=t.length;n>e;e++){for(o="[",a=['"'+t[e][0]+'"'],r=1,i=t[e].length;i>r;r++)a[r]="val["+s++ +"]"
o+=a+"]",u[e]=o}return Function("val","return Snap.path.toString.call(["+u+"])")}function u(t){for(var e=[],n=0,r=t.length;r>n;n++)for(var i=1,o=t[n].length;o>i;i++)e.push(t[n][i])
return e}var l={},c=/[a-z]+$/i,f=String
l.stroke=l.fill="colour",e.prototype.equal=function(e,n){var d,h,p=f(this.attr(e)||""),g=this
if(p==+p&&n==+n)return{from:+p,to:+n,f:i}
if("colour"==l[e])return d=t.color(p),h=t.color(n),{from:[d.r,d.g,d.b,d.opacity],to:[h.r,h.g,h.b,h.opacity],f:a}
if("transform"==e||"gradientTransform"==e||"patternTransform"==e)return n instanceof t.Matrix&&(n=n.toTransformString()),t._.rgTransform.test(n)||(n=t._.svgTransform2string(n)),r(p,n,function(){return g.getBBox(1)})
if("d"==e||"path"==e)return d=t.path.toCubic(p,n),{from:u(d[0]),to:u(d[1]),f:s(d[0])}
if("points"==e)return d=f(p).split(","),h=f(n).split(","),{from:d,to:h,f:function(t){return t}}
var v=p.match(c),m=f(n).match(c)
return v&&v==m?{from:parseFloat(p),to:parseFloat(n),f:o(v)}:{from:this.asPX(e),to:this.asPX(e,n),f:i}}}),r.plugin(function(t,n,r,i){for(var o=n.prototype,a="hasOwnProperty",s=("createTouch"in i.doc),u=["click","dblclick","mousedown","mousemove","mouseout","mouseover","mouseup","touchstart","touchmove","touchend","touchcancel"],l={mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"},c=function(t){var e="y"==t?"scrollTop":"scrollLeft"
return i.doc.documentElement[e]||i.doc.body[e]},f=function(){this.returnValue=!1},d=function(){return this.originalEvent.preventDefault()},h=function(){this.cancelBubble=!0},p=function(){return this.originalEvent.stopPropagation()},g=function(){return i.doc.addEventListener?function(t,e,n,r){var i=s&&l[e]?l[e]:e,o=function(i){var o=c("y"),u=c("x")
if(s&&l[a](e))for(var f=0,h=i.targetTouches&&i.targetTouches.length;h>f;f++)if(i.targetTouches[f].target==t||t.contains(i.targetTouches[f].target)){var g=i
i=i.targetTouches[f],i.originalEvent=g,i.preventDefault=d,i.stopPropagation=p
break}var v=i.clientX+u,m=i.clientY+o
return n.call(r,i,v,m)}
return e!==i&&t.addEventListener(e,o,!1),t.addEventListener(i,o,!1),function(){return e!==i&&t.removeEventListener(e,o,!1),t.removeEventListener(i,o,!1),!0}}:i.doc.attachEvent?function(t,e,n,r){var o=function(t){t=t||i.win.event
var e=c("y"),o=c("x"),a=t.clientX+o,s=t.clientY+e
return t.preventDefault=t.preventDefault||f,t.stopPropagation=t.stopPropagation||h,n.call(r,t,a,s)}
t.attachEvent("on"+e,o)
var a=function(){return t.detachEvent("on"+e,o),!0}
return a}:void 0}(),v=[],m=function(n){for(var r,i=n.clientX,o=n.clientY,a=c("y"),u=c("x"),l=v.length;l--;){if(r=v[l],s){for(var f,d=n.touches&&n.touches.length;d--;)if(f=n.touches[d],f.identifier==r.el._drag.id||r.el.node.contains(f.target)){i=f.clientX,o=f.clientY,(n.originalEvent?n.originalEvent:n).preventDefault()
break}}else n.preventDefault()
var h=r.el.node
t._.glob,h.nextSibling,h.parentNode,h.style.display,i+=u,o+=a,e("snap.drag.move."+r.el.id,r.move_scope||r.el,i-r.el._drag.x,o-r.el._drag.y,i,o,n)}},y=function(n){t.unmousemove(m).unmouseup(y)
for(var r,i=v.length;i--;)r=v[i],r.el._drag={},e("snap.drag.end."+r.el.id,r.end_scope||r.start_scope||r.move_scope||r.el,n)
v=[]},x=u.length;x--;)!function(e){t[e]=o[e]=function(n,r){return t.is(n,"function")&&(this.events=this.events||[],this.events.push({name:e,f:n,unbind:g(this.shape||this.node||i.doc,e,n,r||this)})),this},t["un"+e]=o["un"+e]=function(t){for(var n=this.events||[],r=n.length;r--;)if(n[r].name==e&&(n[r].f==t||!t))return n[r].unbind(),n.splice(r,1),!n.length&&delete this.events,this
return this}}(u[x])
o.hover=function(t,e,n,r){return this.mouseover(t,n).mouseout(e,r||n)},o.unhover=function(t,e){return this.unmouseover(t).unmouseout(e)}
var b=[]
o.drag=function(n,r,i,o,a,s){function u(u,l,c){(u.originalEvent||u).preventDefault(),this._drag.x=l,this._drag.y=c,this._drag.id=u.identifier,!v.length&&t.mousemove(m).mouseup(y),v.push({el:this,move_scope:o,start_scope:a,end_scope:s}),r&&e.on("snap.drag.start."+this.id,r),n&&e.on("snap.drag.move."+this.id,n),i&&e.on("snap.drag.end."+this.id,i),e("snap.drag.start."+this.id,a||o||this,l,c,u)}if(!arguments.length){var l
return this.drag(function(t,e){this.attr({transform:l+(l?"T":"t")+[t,e]})},function(){l=this.transform().local})}return this._drag={},b.push({el:this,start:u}),this.mousedown(u),this},o.undrag=function(){for(var n=b.length;n--;)b[n].el==this&&(this.unmousedown(b[n].start),b.splice(n,1),e.unbind("snap.drag.*."+this.id))
return!b.length&&t.unmousemove(m).unmouseup(y),this}}),r.plugin(function(t,n,r){var i=(n.prototype,r.prototype),o=/^\s*url\((.+)\)/,a=String,s=t._.$
t.filter={},i.filter=function(e){var r=this
"svg"!=r.type&&(r=r.paper)
var i=t.parse(a(e)),o=t._.id(),u=(r.node.offsetWidth,r.node.offsetHeight,s("filter"))
return s(u,{id:o,filterUnits:"userSpaceOnUse"}),u.appendChild(i.node),r.defs.appendChild(u),new n(u)},e.on("snap.util.getattr.filter",function(){e.stop()
var n=s(this.node,"filter")
if(n){var r=a(n).match(o)
return r&&t.select(r[1])}}),e.on("snap.util.attr.filter",function(r){if(r instanceof n&&"filter"==r.type){e.stop()
var i=r.node.id
i||(s(r.node,{id:r.id}),i=r.id),s(this.node,{filter:t.url(i)})}r&&"none"!=r||(e.stop(),this.node.removeAttribute("filter"))}),t.filter.blur=function(e,n){null==e&&(e=2)
var r=null==n?e:[e,n]
return t.format('<feGaussianBlur stdDeviation="{def}"/>',{def:r})},t.filter.blur.toString=function(){return this()},t.filter.shadow=function(e,n,r,i){return i=i||"#000",null==r&&(r=4),"string"==typeof r&&(i=r,r=4),null==e&&(e=0,n=2),null==n&&(n=e),i=t.color(i),t.format('<feGaussianBlur in="SourceAlpha" stdDeviation="{blur}"/><feOffset dx="{dx}" dy="{dy}" result="offsetblur"/><feFlood flood-color="{color}"/><feComposite in2="offsetblur" operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>',{color:i,dx:e,dy:n,blur:r})},t.filter.shadow.toString=function(){return this()},t.filter.grayscale=function(e){return null==e&&(e=1),t.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {b} {h} 0 0 0 0 0 1 0"/>',{a:.2126+.7874*(1-e),b:.7152-.7152*(1-e),c:.0722-.0722*(1-e),d:.2126-.2126*(1-e),e:.7152+.2848*(1-e),f:.0722-.0722*(1-e),g:.2126-.2126*(1-e),h:.0722+.9278*(1-e)})},t.filter.grayscale.toString=function(){return this()},t.filter.sepia=function(e){return null==e&&(e=1),t.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {h} {i} 0 0 0 0 0 1 0"/>',{a:.393+.607*(1-e),b:.769-.769*(1-e),c:.189-.189*(1-e),d:.349-.349*(1-e),e:.686+.314*(1-e),f:.168-.168*(1-e),g:.272-.272*(1-e),h:.534-.534*(1-e),i:.131+.869*(1-e)})},t.filter.sepia.toString=function(){return this()},t.filter.saturate=function(e){return null==e&&(e=1),t.format('<feColorMatrix type="saturate" values="{amount}"/>',{amount:1-e})},t.filter.saturate.toString=function(){return this()},t.filter.hueRotate=function(e){return e=e||0,t.format('<feColorMatrix type="hueRotate" values="{angle}"/>',{angle:e})},t.filter.hueRotate.toString=function(){return this()},t.filter.invert=function(e){return null==e&&(e=1),t.format('<feComponentTransfer><feFuncR type="table" tableValues="{amount} {amount2}"/><feFuncG type="table" tableValues="{amount} {amount2}"/><feFuncB type="table" tableValues="{amount} {amount2}"/></feComponentTransfer>',{amount:e,amount2:1-e})},t.filter.invert.toString=function(){return this()},t.filter.brightness=function(e){return null==e&&(e=1),t.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}"/><feFuncG type="linear" slope="{amount}"/><feFuncB type="linear" slope="{amount}"/></feComponentTransfer>',{amount:e})},t.filter.brightness.toString=function(){return this()},t.filter.contrast=function(e){return null==e&&(e=1),t.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}" intercept="{amount2}"/><feFuncG type="linear" slope="{amount}" intercept="{amount2}"/><feFuncB type="linear" slope="{amount}" intercept="{amount2}"/></feComponentTransfer>',{amount:e,amount2:.5-e/2})},t.filter.contrast.toString=function(){return this()}}),r}),window.Modernizr=function(t,e,n){function r(t){y.cssText=t}function i(t,e){return typeof t===e}function o(t,e){return!!~(""+t).indexOf(e)}function a(t,e){for(var r in t){var i=t[r]
if(!o(i,"-")&&y[i]!==n)return"pfx"!=e||i}return!1}function s(t,e,r){for(var o in t){var a=e[t[o]]
if(a!==n)return r===!1?t[o]:i(a,"function")?a.bind(r||e):a}return!1}function u(t,e,n){var r=t.charAt(0).toUpperCase()+t.slice(1),o=(t+" "+b.join(r+" ")+r).split(" ")
return i(e,"string")||i(e,"undefined")?a(o,e):(o=(t+" "+w.join(r+" ")+r).split(" "),s(o,e,n))}var l,c,f,d="2.7.1",h={},p=!0,g=e.documentElement,v="modernizr",m=e.createElement(v),y=m.style,x=({}.toString,"Webkit Moz O ms"),b=x.split(" "),w=x.toLowerCase().split(" "),S={},C=[],k=C.slice,M={}.hasOwnProperty
f=i(M,"undefined")||i(M.call,"undefined")?function(t,e){return e in t&&i(t.constructor.prototype[e],"undefined")}:function(t,e){return M.call(t,e)},Function.prototype.bind||(Function.prototype.bind=function(t){var e=this
if("function"!=typeof e)throw new TypeError
var n=k.call(arguments,1),r=function(){if(this instanceof r){var i=function(){}
i.prototype=e.prototype
var o=new i,a=e.apply(o,n.concat(k.call(arguments)))
return Object(a)===a?a:o}return e.apply(t,n.concat(k.call(arguments)))}
return r}),S.csstransitions=function(){return u("transition")}
for(var E in S)f(S,E)&&(c=E.toLowerCase(),h[c]=S[E](),C.push((h[c]?"":"no-")+c))
return h.addTest=function(t,e){if("object"==typeof t)for(var r in t)f(t,r)&&h.addTest(r,t[r])
else{if(t=t.toLowerCase(),h[t]!==n)return h
e="function"==typeof e?e():e,"undefined"!=typeof p&&p&&(g.className+=" "+(e?"":"no-")+t),h[t]=e}return h},r(""),m=l=null,function(t,e){function n(t,e){var n=t.createElement("p"),r=t.getElementsByTagName("head")[0]||t.documentElement
return n.innerHTML="x<style>"+e+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var t=y.elements
return"string"==typeof t?t.split(" "):t}function i(t){var e=m[t[g]]
return e||(e={},v++,t[g]=v,m[v]=e),e}function o(t,n,r){if(n||(n=e),c)return n.createElement(t)
r||(r=i(n))
var o
return o=r.cache[t]?r.cache[t].cloneNode():p.test(t)?(r.cache[t]=r.createElem(t)).cloneNode():r.createElem(t),!o.canHaveChildren||h.test(t)||o.tagUrn?o:r.frag.appendChild(o)}function a(t,n){if(t||(t=e),c)return t.createDocumentFragment()
n=n||i(t)
for(var o=n.frag.cloneNode(),a=0,s=r(),u=s.length;a<u;a++)o.createElement(s[a])
return o}function s(t,e){e.cache||(e.cache={},e.createElem=t.createElement,e.createFrag=t.createDocumentFragment,e.frag=e.createFrag()),t.createElement=function(n){return y.shivMethods?o(n,t,e):e.createElem(n)},t.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/[\w\-]+/g,function(t){return e.createElem(t),e.frag.createElement(t),'c("'+t+'")'})+");return n}")(y,e.frag)}function u(t){t||(t=e)
var r=i(t)
return y.shivCSS&&!l&&!r.hasCSS&&(r.hasCSS=!!n(t,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),c||s(t,r),t}var l,c,f="3.7.0",d=t.html5||{},h=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,p=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g="_html5shiv",v=0,m={}
!function(){try{var t=e.createElement("a")
t.innerHTML="<xyz></xyz>",l="hidden"in t,c=1==t.childNodes.length||function(){e.createElement("a")
var t=e.createDocumentFragment()
return"undefined"==typeof t.cloneNode||"undefined"==typeof t.createDocumentFragment||"undefined"==typeof t.createElement}()}catch(t){l=!0,c=!0}}()
var y={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:f,shivCSS:d.shivCSS!==!1,supportsUnknownElements:c,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:u,createElement:o,createDocumentFragment:a}
t.html5=y,u(e)}(this,e),h._version=d,h._domPrefixes=w,h._cssomPrefixes=b,h.testProp=function(t){return a([t])},h.testAllProps=u,h.prefixed=function(t,e,n){return e?u(t,e,n):u(t,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(p?" js "+C.join(" "):""),h}(this,this.document),function(t,e,n){function r(t){return"[object Function]"==v.call(t)}function i(t){return"string"==typeof t}function o(){}function a(t){return!t||"loaded"==t||"complete"==t||"uninitialized"==t}function s(){var t=m.shift()
y=1,t?t.t?p(function(){("c"==t.t?d.injectCss:d.injectJs)(t.s,0,t.a,t.x,t.e,1)},0):(t(),s()):y=0}function u(t,n,r,i,o,u,l){function c(e){if(!h&&a(f.readyState)&&(x.r=h=1,!y&&s(),f.onload=f.onreadystatechange=null,e)){"img"!=t&&p(function(){w.removeChild(f)},50)
for(var r in E[n])E[n].hasOwnProperty(r)&&E[n][r].onload()}}var l=l||d.errorTimeout,f=e.createElement(t),h=0,v=0,x={t:r,s:n,e:o,a:u,x:l}
1===E[n]&&(v=1,E[n]=[]),"object"==t?f.data=n:(f.src=n,f.type=t),f.width=f.height="0",f.onerror=f.onload=f.onreadystatechange=function(){c.call(this,v)},m.splice(i,0,x),"img"!=t&&(v||2===E[n]?(w.insertBefore(f,b?null:g),p(c,l)):E[n].push(f))}function l(t,e,n,r,o){return y=0,e=e||"j",i(t)?u("c"==e?C:S,t,e,this.i++,n,r,o):(m.splice(this.i++,0,t),1==m.length&&s()),this}function c(){var t=d
return t.loader={load:l,i:0},t}var f,d,h=e.documentElement,p=t.setTimeout,g=e.getElementsByTagName("script")[0],v={}.toString,m=[],y=0,x="MozAppearance"in h.style,b=x&&!!e.createRange().compareNode,w=b?h:g.parentNode,h=t.opera&&"[object Opera]"==v.call(t.opera),h=!!e.attachEvent&&!h,S=x?"object":h?"script":"img",C=h?"script":S,k=Array.isArray||function(t){return"[object Array]"==v.call(t)},M=[],E={},T={timeout:function(t,e){return e.length&&(t.timeout=e[0]),t}}
d=function(t){function e(t){var e,n,r,t=t.split("!"),i=M.length,o=t.pop(),a=t.length,o={url:o,origUrl:o,prefixes:t}
for(n=0;n<a;n++)r=t[n].split("="),(e=T[r.shift()])&&(o=e(o,r))
for(n=0;n<i;n++)o=M[n](o)
return o}function a(t,i,o,a,s){var u=e(t),l=u.autoCallback
u.url.split(".").pop().split("?").shift(),u.bypass||(i&&(i=r(i)?i:i[t]||i[a]||i[t.split("/").pop().split("?")[0]]),u.instead?u.instead(t,i,o,a,s):(E[u.url]?u.noexec=!0:E[u.url]=1,o.load(u.url,u.forceCSS||!u.forceJS&&"css"==u.url.split(".").pop().split("?").shift()?"c":n,u.noexec,u.attrs,u.timeout),(r(i)||r(l))&&o.load(function(){c(),i&&i(u.origUrl,s,a),l&&l(u.origUrl,s,a),E[u.url]=2})))}function s(t,e){function n(t,n){if(t){if(i(t))n||(f=function(){var t=[].slice.call(arguments)
d.apply(this,t),h()}),a(t,f,e,0,l)
else if(Object(t)===t)for(u in s=function(){var e,n=0
for(e in t)t.hasOwnProperty(e)&&n++
return n}(),t)t.hasOwnProperty(u)&&(!n&&!--s&&(r(f)?f=function(){var t=[].slice.call(arguments)
d.apply(this,t),h()}:f[u]=function(t){return function(){var e=[].slice.call(arguments)
t&&t.apply(this,e),h()}}(d[u])),a(t[u],f,e,u,l))}else!n&&h()}var s,u,l=!!t.test,c=t.load||t.both,f=t.callback||o,d=f,h=t.complete||o
n(l?t.yep:t.nope,!!c),c&&n(c)}var u,l,f=this.yepnope.loader
if(i(t))a(t,0,f,0)
else if(k(t))for(u=0;u<t.length;u++)l=t[u],i(l)?a(l,0,f,0):k(l)?d(l):Object(l)===l&&s(l,f)
else Object(t)===t&&s(t,f)},d.addPrefix=function(t,e){T[t]=e},d.addFilter=function(t){M.push(t)},d.errorTimeout=1e4,null==e.readyState&&e.addEventListener&&(e.readyState="loading",e.addEventListener("DOMContentLoaded",f=function(){e.removeEventListener("DOMContentLoaded",f,0),e.readyState="complete"},0)),t.yepnope=c(),t.yepnope.executeStack=s,t.yepnope.injectJs=function(t,n,r,i,u,l){var c,f,h=e.createElement("script"),i=i||d.errorTimeout
h.src=t
for(f in r)h.setAttribute(f,r[f])
n=l?s:n||o,h.onreadystatechange=h.onload=function(){!c&&a(h.readyState)&&(c=1,n(),h.onload=h.onreadystatechange=null)},p(function(){c||(c=1,n(1))},i),u?h.onload():g.parentNode.insertBefore(h,g)},t.yepnope.injectCss=function(t,n,r,i,a,u){var l,i=e.createElement("link"),n=u?s:n||o
i.href=t,i.rel="stylesheet",i.type="text/css"
for(l in r)i.setAttribute(l,r[l])
a||(g.parentNode.insertBefore(i,g),p(n,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},!function(t){"use strict"
function e(t,e){var n=(65535&t)+(65535&e),r=(t>>16)+(e>>16)+(n>>16)
return r<<16|65535&n}function n(t,e){return t<<e|t>>>32-e}function r(t,r,i,o,a,s){return e(n(e(e(r,t),e(o,s)),a),i)}function i(t,e,n,i,o,a,s){return r(e&n|~e&i,t,e,o,a,s)}function o(t,e,n,i,o,a,s){return r(e&i|n&~i,t,e,o,a,s)}function a(t,e,n,i,o,a,s){return r(e^n^i,t,e,o,a,s)}function s(t,e,n,i,o,a,s){return r(n^(e|~i),t,e,o,a,s)}function u(t,n){t[n>>5]|=128<<n%32,t[(n+64>>>9<<4)+14]=n
var r,u,l,c,f,d=1732584193,h=-271733879,p=-1732584194,g=271733878
for(r=0;r<t.length;r+=16)u=d,l=h,c=p,f=g,d=i(d,h,p,g,t[r],7,-680876936),g=i(g,d,h,p,t[r+1],12,-389564586),p=i(p,g,d,h,t[r+2],17,606105819),h=i(h,p,g,d,t[r+3],22,-1044525330),d=i(d,h,p,g,t[r+4],7,-176418897),g=i(g,d,h,p,t[r+5],12,1200080426),p=i(p,g,d,h,t[r+6],17,-1473231341),h=i(h,p,g,d,t[r+7],22,-45705983),d=i(d,h,p,g,t[r+8],7,1770035416),g=i(g,d,h,p,t[r+9],12,-1958414417),p=i(p,g,d,h,t[r+10],17,-42063),h=i(h,p,g,d,t[r+11],22,-1990404162),d=i(d,h,p,g,t[r+12],7,1804603682),g=i(g,d,h,p,t[r+13],12,-40341101),p=i(p,g,d,h,t[r+14],17,-1502002290),h=i(h,p,g,d,t[r+15],22,1236535329),d=o(d,h,p,g,t[r+1],5,-165796510),g=o(g,d,h,p,t[r+6],9,-1069501632),p=o(p,g,d,h,t[r+11],14,643717713),h=o(h,p,g,d,t[r],20,-373897302),d=o(d,h,p,g,t[r+5],5,-701558691),g=o(g,d,h,p,t[r+10],9,38016083),p=o(p,g,d,h,t[r+15],14,-660478335),h=o(h,p,g,d,t[r+4],20,-405537848),d=o(d,h,p,g,t[r+9],5,568446438),g=o(g,d,h,p,t[r+14],9,-1019803690),p=o(p,g,d,h,t[r+3],14,-187363961),h=o(h,p,g,d,t[r+8],20,1163531501),d=o(d,h,p,g,t[r+13],5,-1444681467),g=o(g,d,h,p,t[r+2],9,-51403784),p=o(p,g,d,h,t[r+7],14,1735328473),h=o(h,p,g,d,t[r+12],20,-1926607734),d=a(d,h,p,g,t[r+5],4,-378558),g=a(g,d,h,p,t[r+8],11,-2022574463),p=a(p,g,d,h,t[r+11],16,1839030562),h=a(h,p,g,d,t[r+14],23,-35309556),d=a(d,h,p,g,t[r+1],4,-1530992060),g=a(g,d,h,p,t[r+4],11,1272893353),p=a(p,g,d,h,t[r+7],16,-155497632),h=a(h,p,g,d,t[r+10],23,-1094730640),d=a(d,h,p,g,t[r+13],4,681279174),g=a(g,d,h,p,t[r],11,-358537222),p=a(p,g,d,h,t[r+3],16,-722521979),h=a(h,p,g,d,t[r+6],23,76029189),d=a(d,h,p,g,t[r+9],4,-640364487),g=a(g,d,h,p,t[r+12],11,-421815835),p=a(p,g,d,h,t[r+15],16,530742520),h=a(h,p,g,d,t[r+2],23,-995338651),d=s(d,h,p,g,t[r],6,-198630844),g=s(g,d,h,p,t[r+7],10,1126891415),p=s(p,g,d,h,t[r+14],15,-1416354905),h=s(h,p,g,d,t[r+5],21,-57434055),d=s(d,h,p,g,t[r+12],6,1700485571),g=s(g,d,h,p,t[r+3],10,-1894986606),p=s(p,g,d,h,t[r+10],15,-1051523),h=s(h,p,g,d,t[r+1],21,-2054922799),d=s(d,h,p,g,t[r+8],6,1873313359),g=s(g,d,h,p,t[r+15],10,-30611744),p=s(p,g,d,h,t[r+6],15,-1560198380),h=s(h,p,g,d,t[r+13],21,1309151649),d=s(d,h,p,g,t[r+4],6,-145523070),g=s(g,d,h,p,t[r+11],10,-1120210379),p=s(p,g,d,h,t[r+2],15,718787259),h=s(h,p,g,d,t[r+9],21,-343485551),d=e(d,u),h=e(h,l),p=e(p,c),g=e(g,f)
return[d,h,p,g]}function l(t){var e,n=""
for(e=0;e<32*t.length;e+=8)n+=String.fromCharCode(t[e>>5]>>>e%32&255)
return n}function c(t){var e,n=[]
for(n[(t.length>>2)-1]=void 0,e=0;e<n.length;e+=1)n[e]=0
for(e=0;e<8*t.length;e+=8)n[e>>5]|=(255&t.charCodeAt(e/8))<<e%32
return n}function f(t){return l(u(c(t),8*t.length))}function d(t,e){var n,r,i=c(t),o=[],a=[]
for(o[15]=a[15]=void 0,i.length>16&&(i=u(i,8*t.length)),n=0;16>n;n+=1)o[n]=909522486^i[n],a[n]=1549556828^i[n]
return r=u(o.concat(c(e)),512+8*e.length),l(u(a.concat(r),640))}function h(t){var e,n,r="0123456789abcdef",i=""
for(n=0;n<t.length;n+=1)e=t.charCodeAt(n),i+=r.charAt(e>>>4&15)+r.charAt(15&e)
return i}function p(t){return unescape(encodeURIComponent(t))}function g(t){return f(p(t))}function v(t){return h(g(t))}function m(t,e){return d(p(t),p(e))}function y(t,e){return h(m(t,e))}function x(t,e,n){return e?n?m(e,t):y(e,t):n?g(t):v(t)}"function"==typeof define&&define.amd?define(function(){return x}):t.md5=x}(this),!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Handlebars=e():t.Handlebars=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports
var i=n[r]={exports:{},id:r,loaded:!1}
return t[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={}
return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict"
function r(){var t=new s.HandlebarsEnvironment
return h.extend(t,s),t.SafeString=l.default,t.Exception=f.default,t.Utils=h,t.escapeExpression=h.escapeExpression,t.VM=g,t.template=function(e){return g.template(e,t)},t}var i=n(1).default,o=n(2).default
e.__esModule=!0
var a=n(3),s=i(a),u=n(17),l=o(u),c=n(5),f=o(c),d=n(4),h=i(d),p=n(18),g=i(p),v=n(19),m=o(v),y=r()
y.create=r,m.default(y),y.default=y,e.default=y,t.exports=e.default},function(t,e){"use strict"
e.default=function(t){if(t&&t.__esModule)return t
var e={}
if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])
return e.default=t,e},e.__esModule=!0},function(t,e){"use strict"
e.default=function(t){return t&&t.__esModule?t:{default:t}},e.__esModule=!0},function(t,e,n){"use strict"
function r(t,e,n){this.helpers=t||{},this.partials=e||{},this.decorators=n||{},u.registerDefaultHelpers(this),l.registerDefaultDecorators(this)}var i=n(2).default
e.__esModule=!0,e.HandlebarsEnvironment=r
var o=n(4),a=n(5),s=i(a),u=n(6),l=n(14),c=n(16),f=i(c),d="4.0.5"
e.VERSION=d
var h=7
e.COMPILER_REVISION=h
var p={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1",7:">= 4.0.0"}
e.REVISION_CHANGES=p
var g="[object Object]"
r.prototype={constructor:r,logger:f.default,log:f.default.log,registerHelper:function(t,e){if(o.toString.call(t)===g){if(e)throw new s.default("Arg not supported with multiple helpers")
o.extend(this.helpers,t)}else this.helpers[t]=e},unregisterHelper:function(t){delete this.helpers[t]},registerPartial:function(t,e){if(o.toString.call(t)===g)o.extend(this.partials,t)
else{if("undefined"==typeof e)throw new s.default('Attempting to register a partial called "'+t+'" as undefined')
this.partials[t]=e}},unregisterPartial:function(t){delete this.partials[t]},registerDecorator:function(t,e){if(o.toString.call(t)===g){if(e)throw new s.default("Arg not supported with multiple decorators")
o.extend(this.decorators,t)}else this.decorators[t]=e},unregisterDecorator:function(t){delete this.decorators[t]}}
var v=f.default.log
e.log=v,e.createFrame=o.createFrame,e.logger=f.default},function(t,e){"use strict"
function n(t){return c[t]}function r(t){for(var e=1;e<arguments.length;e++)for(var n in arguments[e])Object.prototype.hasOwnProperty.call(arguments[e],n)&&(t[n]=arguments[e][n])
return t}function i(t,e){for(var n=0,r=t.length;r>n;n++)if(t[n]===e)return n
return-1}function o(t){if("string"!=typeof t){if(t&&t.toHTML)return t.toHTML()
if(null==t)return""
if(!t)return t+""
t=""+t}return d.test(t)?t.replace(f,n):t}function a(t){return!t&&0!==t||!(!g(t)||0!==t.length)}function s(t){var e=r({},t)
return e._parent=t,e}function u(t,e){return t.path=e,t}function l(t,e){return(t?t+".":"")+e}e.__esModule=!0,e.extend=r,e.indexOf=i,e.escapeExpression=o,e.isEmpty=a,e.createFrame=s,e.blockParams=u,e.appendContextPath=l
var c={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;","=":"&#x3D;"},f=/[&<>"'`=]/g,d=/[&<>"'`=]/,h=Object.prototype.toString
e.toString=h
var p=function(t){return"function"==typeof t}
p(/x/)&&(e.isFunction=p=function(t){return"function"==typeof t&&"[object Function]"===h.call(t)}),e.isFunction=p
var g=Array.isArray||function(t){return!(!t||"object"!=typeof t)&&"[object Array]"===h.call(t)}
e.isArray=g},function(t,e){"use strict"
function n(t,e){var i=e&&e.loc,o=void 0,a=void 0
i&&(o=i.start.line,a=i.start.column,t+=" - "+o+":"+a)
for(var s=Error.prototype.constructor.call(this,t),u=0;u<r.length;u++)this[r[u]]=s[r[u]]
Error.captureStackTrace&&Error.captureStackTrace(this,n),i&&(this.lineNumber=o,this.column=a)}e.__esModule=!0
var r=["description","fileName","lineNumber","message","name","number","stack"]
n.prototype=new Error,e.default=n,t.exports=e.default},function(t,e,n){"use strict"
function r(t){a.default(t),u.default(t),c.default(t),d.default(t),p.default(t),v.default(t),y.default(t)}var i=n(2).default
e.__esModule=!0,e.registerDefaultHelpers=r
var o=n(7),a=i(o),s=n(8),u=i(s),l=n(9),c=i(l),f=n(10),d=i(f),h=n(11),p=i(h),g=n(12),v=i(g),m=n(13),y=i(m)},function(t,e,n){"use strict"
e.__esModule=!0
var r=n(4)
e.default=function(t){t.registerHelper("blockHelperMissing",function(e,n){var i=n.inverse,o=n.fn
if(e===!0)return o(this)
if(e===!1||null==e)return i(this)
if(r.isArray(e))return e.length>0?(n.ids&&(n.ids=[n.name]),t.helpers.each(e,n)):i(this)
if(n.data&&n.ids){var a=r.createFrame(n.data)
a.contextPath=r.appendContextPath(n.data.contextPath,n.name),n={data:a}}return o(e,n)})},t.exports=e.default},function(t,e,n){"use strict"
var r=n(2).default
e.__esModule=!0
var i=n(4),o=n(5),a=r(o)
e.default=function(t){t.registerHelper("each",function(t,e){function n(e,n,o){l&&(l.key=e,l.index=n,l.first=0===n,l.last=!!o,c&&(l.contextPath=c+e)),u+=r(t[e],{data:l,blockParams:i.blockParams([t[e],e],[c+e,null])})}if(!e)throw new a.default("Must pass iterator to #each")
var r=e.fn,o=e.inverse,s=0,u="",l=void 0,c=void 0
if(e.data&&e.ids&&(c=i.appendContextPath(e.data.contextPath,e.ids[0])+"."),i.isFunction(t)&&(t=t.call(this)),e.data&&(l=i.createFrame(e.data)),t&&"object"==typeof t)if(i.isArray(t))for(var f=t.length;f>s;s++)s in t&&n(s,s,s===t.length-1)
else{var d=void 0
for(var h in t)t.hasOwnProperty(h)&&(void 0!==d&&n(d,s-1),d=h,s++)
void 0!==d&&n(d,s-1,!0)}return 0===s&&(u=o(this)),u})},t.exports=e.default},function(t,e,n){"use strict"
var r=n(2).default
e.__esModule=!0
var i=n(5),o=r(i)
e.default=function(t){t.registerHelper("helperMissing",function(){if(1!==arguments.length)throw new o.default('Missing helper: "'+arguments[arguments.length-1].name+'"')})},t.exports=e.default},function(t,e,n){"use strict"
e.__esModule=!0
var r=n(4)
e.default=function(t){t.registerHelper("if",function(t,e){return r.isFunction(t)&&(t=t.call(this)),!e.hash.includeZero&&!t||r.isEmpty(t)?e.inverse(this):e.fn(this)}),t.registerHelper("unless",function(e,n){return t.helpers.if.call(this,e,{fn:n.inverse,inverse:n.fn,hash:n.hash})})},t.exports=e.default},function(t,e){"use strict"
e.__esModule=!0,e.default=function(t){t.registerHelper("log",function(){for(var e=[void 0],n=arguments[arguments.length-1],r=0;r<arguments.length-1;r++)e.push(arguments[r])
var i=1
null!=n.hash.level?i=n.hash.level:n.data&&null!=n.data.level&&(i=n.data.level),e[0]=i,t.log.apply(t,e)})},t.exports=e.default},function(t,e){"use strict"
e.__esModule=!0,e.default=function(t){t.registerHelper("lookup",function(t,e){return t&&t[e]})},t.exports=e.default},function(t,e,n){"use strict"
e.__esModule=!0
var r=n(4)
e.default=function(t){t.registerHelper("with",function(t,e){r.isFunction(t)&&(t=t.call(this))
var n=e.fn
if(r.isEmpty(t))return e.inverse(this)
var i=e.data
return e.data&&e.ids&&(i=r.createFrame(e.data),i.contextPath=r.appendContextPath(e.data.contextPath,e.ids[0])),n(t,{data:i,blockParams:r.blockParams([t],[i&&i.contextPath])})})},t.exports=e.default},function(t,e,n){"use strict"
function r(t){a.default(t)}var i=n(2).default
e.__esModule=!0,e.registerDefaultDecorators=r
var o=n(15),a=i(o)},function(t,e,n){"use strict"
e.__esModule=!0
var r=n(4)
e.default=function(t){t.registerDecorator("inline",function(t,e,n,i){var o=t
return e.partials||(e.partials={},o=function(i,o){var a=n.partials
n.partials=r.extend({},a,e.partials)
var s=t(i,o)
return n.partials=a,s}),e.partials[i.args[0]]=i.fn,o})},t.exports=e.default},function(t,e,n){"use strict"
e.__esModule=!0
var r=n(4),i={methodMap:["debug","info","warn","error"],level:"info",lookupLevel:function(t){if("string"==typeof t){var e=r.indexOf(i.methodMap,t.toLowerCase())
t=e>=0?e:parseInt(t,10)}return t},log:function(t){if(t=i.lookupLevel(t),"undefined"!=typeof console&&i.lookupLevel(i.level)<=t){var e=i.methodMap[t]
console[e]||(e="log")
for(var n=arguments.length,r=Array(n>1?n-1:0),o=1;n>o;o++)r[o-1]=arguments[o]
console[e].apply(console,r)}}}
e.default=i,t.exports=e.default},function(t,e){"use strict"
function n(t){this.string=t}e.__esModule=!0,n.prototype.toString=n.prototype.toHTML=function(){return""+this.string},e.default=n,t.exports=e.default},function(t,e,n){"use strict"
function r(t){var e=t&&t[0]||1,n=m.COMPILER_REVISION
if(e!==n){if(n>e){var r=m.REVISION_CHANGES[n],i=m.REVISION_CHANGES[e]
throw new v.default("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+r+") or downgrade your runtime to an older version ("+i+").")}throw new v.default("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+t[1]+").")}}function i(t,e){function n(n,r,i){i.hash&&(r=p.extend({},r,i.hash),i.ids&&(i.ids[0]=!0)),n=e.VM.resolvePartial.call(this,n,r,i)
var o=e.VM.invokePartial.call(this,n,r,i)
if(null==o&&e.compile&&(i.partials[i.name]=e.compile(n,t.compilerOptions,e),o=i.partials[i.name](r,i)),null!=o){if(i.indent){for(var a=o.split("\n"),s=0,u=a.length;u>s&&(a[s]||s+1!==u);s++)a[s]=i.indent+a[s]
o=a.join("\n")}return o}throw new v.default("The partial "+i.name+" could not be compiled when running in runtime-only mode")}function r(e){function n(e){return""+t.main(i,e,i.helpers,i.partials,a,u,s)}var o=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],a=o.data
r._setup(o),!o.partial&&t.useData&&(a=l(e,a))
var s=void 0,u=t.useBlockParams?[]:void 0
return t.useDepths&&(s=o.depths?e!==o.depths[0]?[e].concat(o.depths):o.depths:[e]),(n=c(t.main,n,i,o.depths||[],a,u))(e,o)}if(!e)throw new v.default("No environment passed to template")
if(!t||!t.main)throw new v.default("Unknown template object: "+typeof t)
t.main.decorator=t.main_d,e.VM.checkRevision(t.compiler)
var i={strict:function(t,e){if(!(e in t))throw new v.default('"'+e+'" not defined in '+t)
return t[e]},lookup:function(t,e){for(var n=t.length,r=0;n>r;r++)if(t[r]&&null!=t[r][e])return t[r][e]},lambda:function(t,e){return"function"==typeof t?t.call(e):t},escapeExpression:p.escapeExpression,invokePartial:n,fn:function(e){var n=t[e]
return n.decorator=t[e+"_d"],n},programs:[],program:function(t,e,n,r,i){var a=this.programs[t],s=this.fn(t)
return e||i||r||n?a=o(this,t,s,e,n,r,i):a||(a=this.programs[t]=o(this,t,s)),a},data:function(t,e){for(;t&&e--;)t=t._parent
return t},merge:function(t,e){var n=t||e
return t&&e&&t!==e&&(n=p.extend({},e,t)),n},noop:e.VM.noop,compilerInfo:t.compiler}
return r.isTop=!0,r._setup=function(n){n.partial?(i.helpers=n.helpers,i.partials=n.partials,i.decorators=n.decorators):(i.helpers=i.merge(n.helpers,e.helpers),t.usePartial&&(i.partials=i.merge(n.partials,e.partials)),(t.usePartial||t.useDecorators)&&(i.decorators=i.merge(n.decorators,e.decorators)))},r._child=function(e,n,r,a){if(t.useBlockParams&&!r)throw new v.default("must pass block params")
if(t.useDepths&&!a)throw new v.default("must pass parent depths")
return o(i,e,t[e],n,0,r,a)},r}function o(t,e,n,r,i,o,a){function s(e){var i=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],s=a
return a&&e!==a[0]&&(s=[e].concat(a)),n(t,e,t.helpers,t.partials,i.data||r,o&&[i.blockParams].concat(o),s)}return s=c(n,s,t,a,r,o),s.program=e,s.depth=a?a.length:0,s.blockParams=i||0,s}function a(t,e,n){return t?t.call||n.name||(n.name=t,t=n.partials[t]):t="@partial-block"===n.name?n.data["partial-block"]:n.partials[n.name],t}function s(t,e,n){n.partial=!0,n.ids&&(n.data.contextPath=n.ids[0]||n.data.contextPath)
var r=void 0
if(n.fn&&n.fn!==u&&(n.data=m.createFrame(n.data),r=n.data["partial-block"]=n.fn,r.partials&&(n.partials=p.extend({},n.partials,r.partials))),void 0===t&&r&&(t=r),void 0===t)throw new v.default("The partial "+n.name+" could not be found")
return t instanceof Function?t(e,n):void 0}function u(){return""}function l(t,e){return e&&"root"in e||(e=e?m.createFrame(e):{},e.root=t),e}function c(t,e,n,r,i,o){if(t.decorator){var a={}
e=t.decorator(e,a,n,r&&r[0],i,o,r),p.extend(e,a)}return e}var f=n(1).default,d=n(2).default
e.__esModule=!0,e.checkRevision=r,e.template=i,e.wrapProgram=o,e.resolvePartial=a,e.invokePartial=s,e.noop=u
var h=n(4),p=f(h),g=n(5),v=d(g),m=n(3)},function(t,e){(function(n){"use strict"
e.__esModule=!0,e.default=function(t){var e="undefined"!=typeof n?n:window,r=e.Handlebars
t.noConflict=function(){return e.Handlebars===t&&(e.Handlebars=r),t}},t.exports=e.default}).call(e,function(){return this}())}])}),Handlebars.registerHelper("compare",function(t,e,n,r){var i
if(3>arguments.length)throw Error("'compare' needs 2 parameters")
if(void 0===r&&(r=n,n=e,e="==="),i={"==":function(t,e){return t==e},"===":function(t,e){return t===e},"!=":function(t,e){return t!=e},"!==":function(t,e){return t!==e},"<":function(t,e){return t<e},">":function(t,e){return t>e},"<=":function(t,e){return t<=e},">=":function(t,e){return t>=e},in:function(t,e){return-1!=e.indexOf(t)},typeof:function(t,e){return typeof t==e}},!i[e])throw Error("Malformed operator in 'compare'; "+e)
return i[e](t,n)?r.fn(this):r.inverse(this)}),Handlebars.registerHelper("json",function(t){return JSON.stringify(t)}),Handlebars.registerHelper("incr",function(t,e){return~~t+~~e}),Handlebars.registerHelper("hhmmss",function(t){return hhmmss(t)}),Handlebars.registerHelper("mmss",function(t){return HHMMSS(t)}),Handlebars.registerHelper("zeroth",function(t,e){return t[0][e]}),Handlebars.registerHelper("rgba",function(t,e){return t.indexOf("rgb(")===-1?t:t.replace("rgb(","rgba(").replace(/\)/,","+e+")")}),Number.prototype.roundTo=function(t){var e=this%t
return e<=t/2?this-e:this+t-e},Object.defineProperty(HTMLMediaElement.prototype,"slide",{set:function(t){t!==~~this.dataset.slide&&(this.dataset.slide=t,[].forEach.call(splitterContainer.querySelectorAll(".split-h"),function(e,n){return e.classList[t===n?"add":"remove"]("selected")}),UI.Dom.Slide.Preview(t))}}),Object.defineProperty(HTMLMediaElement.prototype,"begun",{get:function(){return!!(this.currentTime>0&&!this.ended&&this.readyState>2)}}),Object.defineProperty(HTMLMediaElement.prototype,"playing",{get:function(){return!!(this.currentTime>0&&!this.paused&&!this.ended&&this.readyState>2)}})
var saveAs=saveAs||function(t){"use strict"
if(!("undefined"==typeof t||"undefined"!=typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var e=t.document,n=function(){return t.URL||t.webkitURL||t},r=e.createElementNS("http://www.w3.org/1999/xhtml","a"),i="download"in r,o=function(t){var e=new MouseEvent("click")
t.dispatchEvent(e)},a=/constructor/i.test(t.HTMLElement)||t.safari,s=/CriOS\/[\d]+/.test(navigator.userAgent),u=function(e){(t.setImmediate||t.setTimeout)(function(){throw e},0)},l="application/octet-stream",c=4e4,f=function(t){var e=function(){"string"==typeof t?n().revokeObjectURL(t):t.remove()}
setTimeout(e,c)},d=function(t,e,n){e=[].concat(e)
for(var r=e.length;r--;){var i=t["on"+e[r]]
if("function"==typeof i)try{i.call(t,n||t)}catch(t){u(t)}}},h=function(t){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob([String.fromCharCode(65279),t],{type:t.type}):t},p=function(e,u,c){c||(e=h(e))
var p,g=this,v=e.type,m=v===l,y=function(){d(g,"writestart progress write writeend".split(" "))},x=function(){if((s||m&&a)&&t.FileReader){var r=new FileReader
return r.onloadend=function(){var e=s?r.result:r.result.replace(/^data:[^;]*;/,"data:attachment/file;"),n=t.open(e,"_blank")
n||(t.location.href=e),e=void 0,g.readyState=g.DONE,y()},r.readAsDataURL(e),void(g.readyState=g.INIT)}if(p||(p=n().createObjectURL(e)),m)t.location.href=p
else{var i=t.open(p,"_blank")
i||(t.location.href=p)}g.readyState=g.DONE,y(),f(p)}
return g.readyState=g.INIT,i?(p=n().createObjectURL(e),void setTimeout(function(){r.href=p,r.download=u,o(r),y(),f(p),g.readyState=g.DONE})):void x()},g=p.prototype,v=function(t,e,n){return new p(t,e||t.name||"download",n)}
return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(t,e,n){return e=e||t.name||"download",n||(t=h(t)),navigator.msSaveOrOpenBlob(t,e)}:(g.abort=function(){},g.readyState=g.INIT=0,g.WRITING=1,g.DONE=2,g.error=g.onwritestart=g.onprogress=g.onwrite=g.onabort=g.onerror=g.onwriteend=null,v)}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content)
"undefined"!=typeof module&&module.exports?module.exports.saveAs=saveAs:"undefined"!=typeof define&&null!==define&&null!==define.amd&&define("FileSaver.js",function(){return saveAs}),function(){var t=function(t,e,n){var r=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia
return r?new Promise(function(e,n){r.call(navigator,t,e,n)}):Promise.reject(Error("getUserMedia is not implemented in this browser"))}
void 0===navigator.mediaDevices&&(navigator.mediaDevices={}),void 0===navigator.mediaDevices.getUserMedia&&(navigator.mediaDevices.getUserMedia=t)}()
