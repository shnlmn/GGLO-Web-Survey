(function(e){function t(t){for(var n,i,l=t[0],c=t[1],s=t[2],d=0,p=[];d<l.length;d++)i=l[d],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&p.push(a[i][0]),a[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);u&&u(t);while(p.length)p.shift()();return o.push.apply(o,s||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],n=!0,l=1;l<r.length;l++){var c=r[l];0!==a[c]&&(n=!1)}n&&(o.splice(t--,1),e=i(i.s=r[0]))}return e}var n={},a={app:0},o=[];function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=n,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/gglo-online-charrette/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],c=l.push.bind(l);l.push=t,l=l.slice();for(var s=0;s<l.length;s++)t(l[s]);var u=c;o.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";r("85ec")},1:function(e,t){},2:function(e,t){},3:function(e,t){},"41d3":function(e){e.exports=JSON.parse('[{"name":"2-3 story Townhomes","width":35,"length":100,"du":6,"type":"apt","parking":"","shape":"Rect","cornerRad":0,"color":"#cd96cd"},{"name":"3 story walkup apartments","width":60,"length":140,"du":24,"type":"apt","parking":"","shape":"Rect","cornerRad":0,"color":"#8b668b"},{"name":"3 story Multifamily","width":60,"length":140,"du":30,"type":"apt","parking":"","shape":"Rect","cornerRad":0,"color":"#b0e0e6"},{"name":"4 story Multifamily","width":120,"length":200,"du":100,"type":"apt","parking":100,"shape":"Rect","cornerRad":0,"color":"#a020f0"},{"name":"5-6 story Multifamily","width":120,"length":200,"du":150,"type":"apt","parking":150,"shape":"Rect","cornerRad":0,"color":"#663399"},{"name":"8-12 story Multifamily","width":120,"length":200,"du":300,"type":"apt","parking":300,"shape":"Rect","cornerRad":0,"color":"#9b30ff"},{"name":"Community Garden","width":60,"length":100,"du":"","type":"green","parking":"","shape":"Rect","cornerRad":4,"color":"#912cee"},{"name":"Half Court Basketball","width":50,"length":50,"du":"","type":"play","parking":"","shape":"Rect","cornerRad":2,"color":"#7d26cd"},{"name":"Bocce Court ","width":60,"length":20,"du":"","type":"play","parking":"","shape":"Rect","cornerRad":2,"color":"#551a8b"},{"name":"Trail","width":16,"length":120,"du":"","type":"public","parking":"","shape":"Rect","cornerRad":0,"color":"#ff0000"},{"name":"Play Area","width":80,"length":80,"du":"","type":"play","parking":"","shape":"Rect","cornerRad":4,"color":"#ee0000"},{"name":"Small Plaza","width":20,"length":30,"du":"","type":"public","parking":"","shape":"Rect","cornerRad":4,"color":"#cd0000"},{"name":"Large Plaza","width":40,"length":80,"du":"","type":"public","parking":"","shape":"Rect","cornerRad":4,"color":"#8b0000"},{"name":"Rain Garden","width":30,"length":20,"du":"","type":"green","parking":"","shape":"Rect","cornerRad":4,"color":"#bc8f8f"},{"name":"Lawn","width":20,"length":40,"du":"","type":"green","parking":"","shape":"Rect","cornerRad":4,"color":"#ffc1c1"},{"name":"Pet Area ","width":30,"length":80,"du":"","type":"public","parking":"","shape":"Rect","cornerRad":4,"color":"#eeb4b4"},{"name":"Art Installation","width":15,"length":15,"du":"","type":"art","parking":"","shape":"Cir","cornerRad":0,"color":"#cd9b9b"},{"name":"Shelter","width":25,"length":25,"du":"","type":"public","parking":"","shape":"Rect","cornerRad":0,"color":"#8b6969"},{"name":"Parking","width":60,"length":100,"du":"","type":"parking","parking":20,"shape":"Rect","cornerRad":0,"color":"#4169e1"},{"name":"Street","width":30,"length":90,"du":"","type":"row","parking":"","shape":"Line","cornerRad":0,"color":"#4876ff"},{"name":"Paths","width":6,"length":20,"du":"","type":"row","parking":"","shape":"Line","cornerRad":0,"color":"#436eee"},{"name":"Driveway/Alley","width":25,"length":90,"du":"","type":"row","parking":"","shape":"Line","cornerRad":0,"color":"#3a5fcd"}]')},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("survey"),r("questions")],1)},o=[],i=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},l=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("canvas",{attrs:{id:"canvas"}})])}],c=(r("b0c0"),r("159b"),r("5530")),s=r("7a94"),u=function(e,t){var r=544,n=895,a=r/n;console.log(a);var o=r/e*a;return t*o};console.log(u(1e3,30));var d=r("41d3");function p(){console.log("IN CANVASAPP");var e=new s["fabric"].Canvas("canvas"),t=document.getElementById("canvas_wrapper");e.setHeight(t.clientHeight),e.setWidth(t.clientWidth);var r,n=new s["fabric"].Group([]),a="img/siteplan.jpg",o=null;s["fabric"].Image.fromURL(a,(function(t){r=b(t.width,t.height,e.width-f,e.height),t.set({left:f}).scale(r[2]),t.selectable=!1,t.hoverCursor="auto",e.setBackgroundImage(t,e.renderAll.bind(e)),o=t.width,m(),v(),console.log(o)})),console.log(o);var i="img/Rotate_right_arrow.png",l=document.createElement("img");l.src=i;var p=900,h=800,f=250,g={bl:!1,br:!1,tl:!1,tr:!1,mt:!1,mb:!1,mtr:!1};function m(){for(var t=u(o,50),r={fill:"none",stroke:"white",strokeWidth:.2,selectable:!1,evented:!1},a=0;a<Math.ceil(p/t);a++){var i=new s["fabric"].Line([a*t,0,a*t,h],r);n=new s["fabric"].Group([n,i])}for(var l=0;l<Math.ceil(h/t);l++){var c=new s["fabric"].Line([0,l*t,p,l*t],r);n=new s["fabric"].Group([n,c])}n.set({selectable:!1,evented:!1}),e.add(n)}function b(e,t,r,n){var a=0,o=0,i=0,l=e/t,c=r/n;return c>l?(i=n/t,a=e*i,o=n):(i=r/e,a=r,o=t*i),[a,o,i]}function v(){for(var t=0,r=0;r<d.length;r++){var n=d[r],a=new s["fabric"].Rect({width:u(o,n.length),height:u(o,n.width),scaleX:1,rx:n.cornerRad,ry:n.cornerRad,fill:n.color,strokeColor:"white",centeredRotation:!0});a.label=n.name;var i=k(a);i.set({left:30,top:t}),i.my={type:"program"},i.setControlsVisibility(Object(c["a"])(Object(c["a"])({},g),{ml:!1,mr:!1})),e.add(i),R(i),t+=a.height+15}}function y(e,t){var r=t.target,n=r.canvas;0==r.angle?r.rotate(90):r.rotate(0),n.requestRenderAll()}function w(e,t,r){var n=this.cornerSize;e.save(),e.translate(t,r),e.drawImage(l,-n/2,-n/2,n,n),e.restore()}function R(t){var r=!1;t.on("mousedown",(function(){this.clone((function(n){n.set({hasBorders:!1}),n.my={type:t.my.type},n.label=t.label,e.add(n),R(n),r=!0}))})),t.on("mouseup",(function(){r&&(this.off("mousedown"),this.left<f&&e.remove(this)),e.bringToFront(n),e.getObjects().forEach((function(e){e.my&&e._objects[1].set({scaleX:1/e.scaleX})}))}))}function k(e){var t=new s["fabric"].Text(e.label,{fontFamily:"arial",fontSize:10,fill:"white",selectable:!1});return console.log(t),t.set({left:e.left+e.width*e.scaleX/2-t.width/2,top:e.top+e.height*e.scaleY/2-t.height/2}),new s["fabric"].Group([e,t])}s["fabric"].Object.prototype.controls.rotateCWControl=new s["fabric"].Control({x:0,y:-.5,cursorStyle:"pointer",mouseUpHandler:y,render:w,cornerSize:24}),e.selection=!1,e.on("mouse:up",(function(t){t.pointer.x<f&&e.discardActiveObject()}))}var h={name:"survey",props:{msg:String},mounted:function(){p()}},f=h,g=r("2877"),m=Object(g["a"])(f,i,l,!1,null,"799b0dd3",null),b=m.exports,v=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[r("v-text-field",{attrs:{rules:e.emailRules,label:"E-mail",required:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),r("v-text-field",{attrs:{counter:5,"error-messages":e.errors,label:"Zip Code",required:""},model:{value:e.zipCode,callback:function(t){e.zipCode=t},expression:"zipCode"}}),r("span",{staticClass:"question"},[e._v("Do you live in an EHA building?")]),r("v-radio-group",{model:{value:e.resident,callback:function(t){e.resident=t},expression:"resident"}},[r("v-radio",{attrs:{label:e.yes,value:e.yes}}),r("v-radio",{attrs:{label:e.no,value:e.no}})],1),r("span",{staticClass:"question"},[e._v("Are you a neighbor to an EHA development?")]),r("v-radio-group",{model:{value:e.neighbor,callback:function(t){e.neighbor=t},expression:"neighbor"}},[r("v-radio",{key:e.yes,attrs:{label:e.yes,value:e.yes}}),r("v-radio",{key:e.no,attrs:{label:e.no,value:e.no}})],1),r("v-btn",{staticClass:"mr-4",attrs:{type:"submit",disabled:e.invalid}},[e._v("submit")]),r("v-btn",{on:{click:e.clear}},[e._v("clear")])],1)],1)},y=[],w={data:function(){return{valid:!0,zipCode:"",email:"",emailRules:[function(e){return!!e||"E-mail is required"},function(e){return/.+@.+\..+/.test(e)||"E-mail must be valid"}],resident:1,neighbor:1}}},R=w,k=Object(g["a"])(R,v,y,!1,null,"74ec7856",null),_=k.exports,C=(r("d1e78"),{name:"App",data:function(){return{}},iconfont:"md",components:{questions:_,survey:b}}),x=C,O=(r("034f"),Object(g["a"])(x,a,o,!1,null,null,null)),j=O.exports,A=r("ce5b"),P=r.n(A);r("bf40");n["default"].use(P.a);var S=new P.a({theme:{themes:{light:{primary:"#ee44aa",secondary:"#424242",accent:"#82B1FF",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107"}}}});r("d5e8");n["default"].config.productionTip=!1,new n["default"]({vuetify:S,render:function(e){return e(j)}}).$mount("#app")},"85ec":function(e,t,r){}});
//# sourceMappingURL=app.94121ad4.js.map