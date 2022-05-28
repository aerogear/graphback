/*! For license information please see 5c1b6322.07a6301b.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[453],{1333:function(e,r,t){"use strict";t.d(r,"a",(function(){return s})),t.d(r,"b",(function(){return d}));var n=t(0),a=t.n(n);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function c(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?c(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function u(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=a.a.createContext({}),l=function(e){var r=a.a.useContext(p),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},s=function(e){var r=l(e.components);return a.a.createElement(p.Provider,{value:r},e.children)},f={inlineCode:"code",wrapper:function(e){var r=e.children;return a.a.createElement(a.a.Fragment,{},r)}},b=a.a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,o=e.originalType,c=e.parentName,p=u(e,["components","mdxType","originalType","parentName"]),s=l(t),b=n,d=s["".concat(c,".").concat(b)]||s[b]||f[b]||o;return t?a.a.createElement(d,i(i({ref:r},p),{},{components:t})):a.a.createElement(d,i({ref:r},p))}));function d(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var o=t.length,c=new Array(o);c[0]=b;var i={};for(var u in r)hasOwnProperty.call(r,u)&&(i[u]=r[u]);i.originalType=e,i.mdxType="string"==typeof e?e:n,c[1]=i;for(var p=2;p<o;p++)c[p]=t[p];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,t)}b.displayName="MDXCreateElement"},1334:function(e,r,t){"use strict";e.exports=t(1335)},1335:function(e,r,t){"use strict";var n=t(1336),a=60103,o=60106;r.Fragment=60107,r.StrictMode=60108,r.Profiler=60114;var c=60109,i=60110,u=60112;r.Suspense=60113;var p=60115,l=60116;if("function"==typeof Symbol&&Symbol.for){var s=Symbol.for;a=s("react.element"),o=s("react.portal"),r.Fragment=s("react.fragment"),r.StrictMode=s("react.strict_mode"),r.Profiler=s("react.profiler"),c=s("react.provider"),i=s("react.context"),u=s("react.forward_ref"),r.Suspense=s("react.suspense"),p=s("react.memo"),l=s("react.lazy")}var f="function"==typeof Symbol&&Symbol.iterator;function b(e){for(var r="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)r+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+r+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var d={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},y={};function h(e,r,t){this.props=e,this.context=r,this.refs=y,this.updater=t||d}function m(){}function _(e,r,t){this.props=e,this.context=r,this.refs=y,this.updater=t||d}h.prototype.isReactComponent={},h.prototype.setState=function(e,r){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(b(85));this.updater.enqueueSetState(this,e,r,"setState")},h.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},m.prototype=h.prototype;var g=_.prototype=new m;g.constructor=_,n(g,h.prototype),g.isPureReactComponent=!0;var v={current:null},O=Object.prototype.hasOwnProperty,j={key:!0,ref:!0,__self:!0,__source:!0};function k(e,r,t){var n,o={},c=null,i=null;if(null!=r)for(n in void 0!==r.ref&&(i=r.ref),void 0!==r.key&&(c=""+r.key),r)O.call(r,n)&&!j.hasOwnProperty(n)&&(o[n]=r[n]);var u=arguments.length-2;if(1===u)o.children=t;else if(1<u){for(var p=Array(u),l=0;l<u;l++)p[l]=arguments[l+2];o.children=p}if(e&&e.defaultProps)for(n in u=e.defaultProps)void 0===o[n]&&(o[n]=u[n]);return{$$typeof:a,type:e,key:c,ref:i,props:o,_owner:v.current}}function w(e){return"object"==typeof e&&null!==e&&e.$$typeof===a}var P=/\/+/g;function E(e,r){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var r={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return r[e]}))}(""+e.key):r.toString(36)}function S(e,r,t,n,c){var i=typeof e;"undefined"!==i&&"boolean"!==i||(e=null);var u=!1;if(null===e)u=!0;else switch(i){case"string":case"number":u=!0;break;case"object":switch(e.$$typeof){case a:case o:u=!0}}if(u)return c=c(u=e),e=""===n?"."+E(u,0):n,Array.isArray(c)?(t="",null!=e&&(t=e.replace(P,"$&/")+"/"),S(c,r,t,"",(function(e){return e}))):null!=c&&(w(c)&&(c=function(e,r){return{$$typeof:a,type:e.type,key:r,ref:e.ref,props:e.props,_owner:e._owner}}(c,t+(!c.key||u&&u.key===c.key?"":(""+c.key).replace(P,"$&/")+"/")+e)),r.push(c)),1;if(u=0,n=""===n?".":n+":",Array.isArray(e))for(var p=0;p<e.length;p++){var l=n+E(i=e[p],p);u+=S(i,r,t,l,c)}else if(l=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=f&&e[f]||e["@@iterator"])?e:null}(e),"function"==typeof l)for(e=l.call(e),p=0;!(i=e.next()).done;)u+=S(i=i.value,r,t,l=n+E(i,p++),c);else if("object"===i)throw r=""+e,Error(b(31,"[object Object]"===r?"object with keys {"+Object.keys(e).join(", ")+"}":r));return u}function C(e,r,t){if(null==e)return e;var n=[],a=0;return S(e,n,"","",(function(e){return r.call(t,e,a++)})),n}function x(e){if(-1===e._status){var r=e._result;r=r(),e._status=0,e._result=r,r.then((function(r){0===e._status&&(r=r.default,e._status=1,e._result=r)}),(function(r){0===e._status&&(e._status=2,e._result=r)}))}if(1===e._status)return e._result;throw e._result}var N={current:null};function $(){var e=N.current;if(null===e)throw Error(b(321));return e}var R={ReactCurrentDispatcher:N,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:v,IsSomeRendererActing:{current:!1},assign:n};r.Children={map:C,forEach:function(e,r,t){C(e,(function(){r.apply(this,arguments)}),t)},count:function(e){var r=0;return C(e,(function(){r++})),r},toArray:function(e){return C(e,(function(e){return e}))||[]},only:function(e){if(!w(e))throw Error(b(143));return e}},r.Component=h,r.PureComponent=_,r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=R,r.cloneElement=function(e,r,t){if(null==e)throw Error(b(267,e));var o=n({},e.props),c=e.key,i=e.ref,u=e._owner;if(null!=r){if(void 0!==r.ref&&(i=r.ref,u=v.current),void 0!==r.key&&(c=""+r.key),e.type&&e.type.defaultProps)var p=e.type.defaultProps;for(l in r)O.call(r,l)&&!j.hasOwnProperty(l)&&(o[l]=void 0===r[l]&&void 0!==p?p[l]:r[l])}var l=arguments.length-2;if(1===l)o.children=t;else if(1<l){p=Array(l);for(var s=0;s<l;s++)p[s]=arguments[s+2];o.children=p}return{$$typeof:a,type:e.type,key:c,ref:i,props:o,_owner:u}},r.createContext=function(e,r){return void 0===r&&(r=null),(e={$$typeof:i,_calculateChangedBits:r,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:c,_context:e},e.Consumer=e},r.createElement=k,r.createFactory=function(e){var r=k.bind(null,e);return r.type=e,r},r.createRef=function(){return{current:null}},r.forwardRef=function(e){return{$$typeof:u,render:e}},r.isValidElement=w,r.lazy=function(e){return{$$typeof:l,_payload:{_status:-1,_result:e},_init:x}},r.memo=function(e,r){return{$$typeof:p,type:e,compare:void 0===r?null:r}},r.useCallback=function(e,r){return $().useCallback(e,r)},r.useContext=function(e,r){return $().useContext(e,r)},r.useDebugValue=function(){},r.useEffect=function(e,r){return $().useEffect(e,r)},r.useImperativeHandle=function(e,r,t){return $().useImperativeHandle(e,r,t)},r.useLayoutEffect=function(e,r){return $().useLayoutEffect(e,r)},r.useMemo=function(e,r){return $().useMemo(e,r)},r.useReducer=function(e,r,t){return $().useReducer(e,r,t)},r.useRef=function(e){return $().useRef(e)},r.useState=function(e){return $().useState(e)},r.version="17.0.1"},1336:function(e,r,t){"use strict";var n=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;function c(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var r={},t=0;t<10;t++)r["_"+String.fromCharCode(t)]=t;if("0123456789"!==Object.getOwnPropertyNames(r).map((function(e){return r[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(a){return!1}}()?Object.assign:function(e,r){for(var t,i,u=c(e),p=1;p<arguments.length;p++){for(var l in t=Object(arguments[p]))a.call(t,l)&&(u[l]=t[l]);if(n){i=n(t);for(var s=0;s<i.length;s++)o.call(t,i[s])&&(u[i[s]]=t[i[s]])}}return u}},520:function(e,r,t){"use strict";t.r(r),t.d(r,"frontMatter",(function(){return i})),t.d(r,"metadata",(function(){return u})),t.d(r,"rightToc",(function(){return p})),t.d(r,"default",(function(){return s}));var n=t(3),a=t(7),o=(t(1334),t(1333)),c=["components"],i={id:"_packages_graphback_core_src_db_datamapper_.tableid",title:"TableID",sidebar_label:"TableID"},u={unversionedId:"api/graphback-core/interfaces/_packages_graphback_core_src_db_datamapper_.tableid",id:"api/graphback-core/interfaces/_packages_graphback_core_src_db_datamapper_.tableid",isDocsHomePage:!1,title:"TableID",description:"Hierarchy",source:"@site/../docs/api/graphback-core/interfaces/_packages_graphback_core_src_db_datamapper_.tableid.md",slug:"/api/graphback-core/interfaces/_packages_graphback_core_src_db_datamapper_.tableid",permalink:"/docs/next/api/graphback-core/interfaces/_packages_graphback_core_src_db_datamapper_.tableid",editUrl:"https://github.com/aerogear/graphback/edit/master/website/../docs/api/graphback-core/interfaces/_packages_graphback_core_src_db_datamapper_.tableid.md",version:"current",sidebar_label:"TableID"},p=[{value:"Hierarchy",id:"hierarchy",children:[]},{value:"Index",id:"index",children:[{value:"Properties",id:"properties",children:[]}]},{value:"Properties",id:"properties-1",children:[{value:"name",id:"name",children:[]},{value:"<code>Optional</code> value",id:"optional-value",children:[]}]}],l={rightToc:p};function s(e){var r=e.components,t=Object(a.a)(e,c);return Object(o.b)("wrapper",Object(n.a)({},l,t,{components:r,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"hierarchy"},"Hierarchy"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("strong",{parentName:"li"},"TableID"))),Object(o.b)("h2",{id:"index"},"Index"),Object(o.b)("h3",{id:"properties"},"Properties"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"/docs/next/api/graphback-core/interfaces/_packages_graphback_core_src_db_datamapper_.tableid#name"},"name")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"/docs/next/api/graphback-core/interfaces/_packages_graphback_core_src_db_datamapper_.tableid#optional-value"},"value"))),Object(o.b)("h2",{id:"properties-1"},"Properties"),Object(o.b)("h3",{id:"name"},"name"),Object(o.b)("p",null,"\u2022 ",Object(o.b)("strong",{parentName:"p"},"name"),": ",Object(o.b)("em",{parentName:"p"},"string")),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/0a237f8/packages/graphback-core/src/db/dataMapper.ts#L11"},"packages/graphback-core/src/db/dataMapper.ts:11"))),Object(o.b)("hr",null),Object(o.b)("h3",{id:"optional-value"},Object(o.b)("inlineCode",{parentName:"h3"},"Optional")," value"),Object(o.b)("p",null,"\u2022 ",Object(o.b)("strong",{parentName:"p"},"value"),"? : ",Object(o.b)("em",{parentName:"p"},"any")),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/0a237f8/packages/graphback-core/src/db/dataMapper.ts#L12"},"packages/graphback-core/src/db/dataMapper.ts:12"))))}s.isMDXComponent=!0}}]);