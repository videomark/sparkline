module.exports=function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){var r=n(2),i=n(3),o=n(4);t.exports=function(t){return r(t)||i(t)||o()}},function(t,e,n){"use strict";n.r(e),n.d(e,"sparkline",function(){return u});var r=n(0),i=n.n(r);function o(t){return t.value}function a(t,e){var n=document.createElementNS("http://www.w3.org/2000/svg",t);for(var r in e)n.setAttribute(r,e[r]);return n}function u(t,e,n){var r;if(r=t,i()(r.querySelectorAll("*")).forEach(function(t){return r.removeChild(t)}),!(e.length<=1)){n=n||{},"number"==typeof e[0]&&(e=e.map(function(t){return{value:t}}));var u=n.onmousemove,c=n.onmouseout,l="interactive"in n?n.interactive:!!u,s=n.spotRadius||2,f=2*s,p=n.cursorWidth||2,d=0;t.attributes["stroke-width"]&&(d=Number(t.attributes["stroke-width"].value)),isNaN(d)&&(d=0);var h=n.fetch||o,v=e.map(function(t){return h(t)}),x=parseFloat(t.clientWidth)-2*f,b=parseFloat(t.clientHeight),m=b-2*d-f,y="number"==typeof n.max?n.max:Math.max.apply(Math,i()(v.filter(function(t){return!isNaN(t)}))),g="number"==typeof n.min?n.min:Math.min.apply(Math,i()(v.filter(function(t){return!isNaN(t)}))),A=-1e3,N=v.length-1,E=x/N,w=[],j=[[]];v.forEach(function(t,e){isNaN(t)?j.push([]):j[j.length-1].push({value:t,index:e})});var k=function(t){return t*E+f};if(j.forEach(function(e){if(e.length){var n="";e.forEach(function(t,e){var r,i,o,a,u,c=k(t.index),l=(r=y,i=g,o=m,a=d+s,u=(t.value-i)*o/(r-i),isNaN(u)&&(u=0),u===1/0&&(u=Number.MAX_SAFE_INTEGER),u===-1/0&&(u=Number.MIN_SAFE_INTEGER),parseFloat((o-u+a).toFixed(2)));n+=e?" L ".concat(c," ").concat(l):"M".concat(c," ").concat(l),w[t.index]=Object.assign(t,{index:t.index,x:c,y:l})});var r=a("path",{class:"sparkline--line",d:n,fill:"none"});t.appendChild(r);var i=a("path",{class:"sparkline--fill",d:"".concat(n," V ").concat(b," L ").concat(k(e[0].index)," ").concat(b," Z"),stroke:"none"});t.appendChild(i)}}),l){var M=a("line",{class:"sparkline--cursor",x1:A,x2:A,y1:0,y2:b,"stroke-width":p}),O=a("circle",{class:"sparkline--spot",cx:A,cy:A,r:s});t.appendChild(M),t.appendChild(O);var S=a("rect",{width:t.clientWidth,height:t.clientHeight,style:"fill: transparent; stroke: transparent",class:"sparkline--interaction-layer"});t.appendChild(S),S.addEventListener("mouseout",function(t){M.setAttribute("x1",A),M.setAttribute("x2",A),O.setAttribute("cx",A),c&&c(t)}),S.addEventListener("mousemove",function(t){var e=t.offsetX,n=w.find(function(t){return t&&t.x>=e});n=n||w[N];var r,i=w[w.indexOf(n)-1],o=(r=i?i.x+(n.x-i.x)/2<=e?n:i:n).x,a=r.y;O.setAttribute("cx",o),O.setAttribute("cy",a),M.setAttribute("x1",o),M.setAttribute("x2",o),u&&u(t,r)})}}}e.default=u},function(t,e){t.exports=function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}},function(t,e){t.exports=function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}},function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}}]);
//# sourceMappingURL=sparkline.commonjs2.js.map