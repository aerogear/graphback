/*! For license information please see f3d3e2a6.0e3a7bf3.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[1206],{1275:function(e,r,t){"use strict";t.r(r),t.d(r,"frontMatter",(function(){return i})),t.d(r,"metadata",(function(){return u})),t.d(r,"rightToc",(function(){return p})),t.d(r,"default",(function(){return l}));var n=t(3),o=t(7),a=(t(1334),t(1333)),c=["components"],i={id:"_graphbackconfig_.graphbackconfig",title:"GraphbackConfig",sidebar_label:"GraphbackConfig"},u={unversionedId:"api/graphback/interfaces/_graphbackconfig_.graphbackconfig",id:"api/graphback/interfaces/_graphbackconfig_.graphbackconfig",isDocsHomePage:!1,title:"GraphbackConfig",description:"Global configuration for Graphback ecosystem that represents each plugin",source:"@site/../docs/api/graphback/interfaces/_graphbackconfig_.graphbackconfig.md",slug:"/api/graphback/interfaces/_graphbackconfig_.graphbackconfig",permalink:"/docs/next/api/graphback/interfaces/_graphbackconfig_.graphbackconfig",editUrl:"https://github.com/aerogear/graphback/edit/master/website/../docs/api/graphback/interfaces/_graphbackconfig_.graphbackconfig.md",version:"current",sidebar_label:"GraphbackConfig"},p=[{value:"Hierarchy",id:"hierarchy",children:[]},{value:"Index",id:"index",children:[{value:"Properties",id:"properties",children:[]}]},{value:"Properties",id:"properties-1",children:[{value:"<code>Optional</code> crud",id:"optional-crud",children:[]},{value:"<code>Optional</code> plugins",id:"optional-plugins",children:[]}]}],f={rightToc:p};function l(e){var r=e.components,t=Object(o.a)(e,c);return Object(a.b)("wrapper",Object(n.a)({},f,t,{components:r,mdxType:"MDXLayout"}),Object(a.b)("p",null,"Global configuration for Graphback ecosystem that represents each plugin"),Object(a.b)("h2",{id:"hierarchy"},"Hierarchy"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("strong",{parentName:"li"},"GraphbackConfig"))),Object(a.b)("h2",{id:"index"},"Index"),Object(a.b)("h3",{id:"properties"},"Properties"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",{parentName:"li",href:"/docs/next/api/graphback/interfaces/_graphbackconfig_.graphbackconfig#optional-crud"},"crud")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",{parentName:"li",href:"/docs/next/api/graphback/interfaces/_graphbackconfig_.graphbackconfig#optional-plugins"},"plugins"))),Object(a.b)("h2",{id:"properties-1"},"Properties"),Object(a.b)("h3",{id:"optional-crud"},Object(a.b)("inlineCode",{parentName:"h3"},"Optional")," crud"),Object(a.b)("p",null,"\u2022 ",Object(a.b)("strong",{parentName:"p"},"crud"),"? : ",Object(a.b)("em",{parentName:"p"},"GraphbackCRUDGeneratorConfig")),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"Defined in ",Object(a.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/3abc57c/packages/graphback/src/GraphbackConfig.ts#L9"},"GraphbackConfig.ts:9"))),Object(a.b)("hr",null),Object(a.b)("h3",{id:"optional-plugins"},Object(a.b)("inlineCode",{parentName:"h3"},"Optional")," plugins"),Object(a.b)("p",null,"\u2022 ",Object(a.b)("strong",{parentName:"p"},"plugins"),"? : ",Object(a.b)("em",{parentName:"p"},"object | any")),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"Defined in ",Object(a.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/3abc57c/packages/graphback/src/GraphbackConfig.ts#L11"},"GraphbackConfig.ts:11"))))}l.isMDXComponent=!0},1333:function(e,r,t){"use strict";t.d(r,"a",(function(){return l})),t.d(r,"b",(function(){return d}));var n=t(0),o=t.n(n);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function c(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?c(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function u(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var p=o.a.createContext({}),f=function(e){var r=o.a.useContext(p),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},l=function(e){var r=f(e.components);return o.a.createElement(p.Provider,{value:r},e.children)},s={inlineCode:"code",wrapper:function(e){var r=e.children;return o.a.createElement(o.a.Fragment,{},r)}},b=o.a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,a=e.originalType,c=e.parentName,p=u(e,["components","mdxType","originalType","parentName"]),l=f(t),b=n,d=l["".concat(c,".").concat(b)]||l[b]||s[b]||a;return t?o.a.createElement(d,i(i({ref:r},p),{},{components:t})):o.a.createElement(d,i({ref:r},p))}));function d(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var a=t.length,c=new Array(a);c[0]=b;var i={};for(var u in r)hasOwnProperty.call(r,u)&&(i[u]=r[u]);i.originalType=e,i.mdxType="string"==typeof e?e:n,c[1]=i;for(var p=2;p<a;p++)c[p]=t[p];return o.a.createElement.apply(null,c)}return o.a.createElement.apply(null,t)}b.displayName="MDXCreateElement"},1334:function(e,r,t){"use strict";e.exports=t(1335)},1335:function(e,r,t){"use strict";var n=t(1336),o=60103,a=60106;r.Fragment=60107,r.StrictMode=60108,r.Profiler=60114;var c=60109,i=60110,u=60112;r.Suspense=60113;var p=60115,f=60116;if("function"==typeof Symbol&&Symbol.for){var l=Symbol.for;o=l("react.element"),a=l("react.portal"),r.Fragment=l("react.fragment"),r.StrictMode=l("react.strict_mode"),r.Profiler=l("react.profiler"),c=l("react.provider"),i=l("react.context"),u=l("react.forward_ref"),r.Suspense=l("react.suspense"),p=l("react.memo"),f=l("react.lazy")}var s="function"==typeof Symbol&&Symbol.iterator;function b(e){for(var r="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)r+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+r+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var d={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},h={};function g(e,r,t){this.props=e,this.context=r,this.refs=h,this.updater=t||d}function y(){}function m(e,r,t){this.props=e,this.context=r,this.refs=h,this.updater=t||d}g.prototype.isReactComponent={},g.prototype.setState=function(e,r){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(b(85));this.updater.enqueueSetState(this,e,r,"setState")},g.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},y.prototype=g.prototype;var O=m.prototype=new y;O.constructor=m,n(O,g.prototype),O.isPureReactComponent=!0;var v={current:null},j=Object.prototype.hasOwnProperty,k={key:!0,ref:!0,__self:!0,__source:!0};function _(e,r,t){var n,a={},c=null,i=null;if(null!=r)for(n in void 0!==r.ref&&(i=r.ref),void 0!==r.key&&(c=""+r.key),r)j.call(r,n)&&!k.hasOwnProperty(n)&&(a[n]=r[n]);var u=arguments.length-2;if(1===u)a.children=t;else if(1<u){for(var p=Array(u),f=0;f<u;f++)p[f]=arguments[f+2];a.children=p}if(e&&e.defaultProps)for(n in u=e.defaultProps)void 0===a[n]&&(a[n]=u[n]);return{$$typeof:o,type:e,key:c,ref:i,props:a,_owner:v.current}}function w(e){return"object"==typeof e&&null!==e&&e.$$typeof===o}var C=/\/+/g;function P(e,r){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var r={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return r[e]}))}(""+e.key):r.toString(36)}function E(e,r,t,n,c){var i=typeof e;"undefined"!==i&&"boolean"!==i||(e=null);var u=!1;if(null===e)u=!0;else switch(i){case"string":case"number":u=!0;break;case"object":switch(e.$$typeof){case o:case a:u=!0}}if(u)return c=c(u=e),e=""===n?"."+P(u,0):n,Array.isArray(c)?(t="",null!=e&&(t=e.replace(C,"$&/")+"/"),E(c,r,t,"",(function(e){return e}))):null!=c&&(w(c)&&(c=function(e,r){return{$$typeof:o,type:e.type,key:r,ref:e.ref,props:e.props,_owner:e._owner}}(c,t+(!c.key||u&&u.key===c.key?"":(""+c.key).replace(C,"$&/")+"/")+e)),r.push(c)),1;if(u=0,n=""===n?".":n+":",Array.isArray(e))for(var p=0;p<e.length;p++){var f=n+P(i=e[p],p);u+=E(i,r,t,f,c)}else if("function"==typeof(f=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=s&&e[s]||e["@@iterator"])?e:null}(e)))for(e=f.call(e),p=0;!(i=e.next()).done;)u+=E(i=i.value,r,t,f=n+P(i,p++),c);else if("object"===i)throw r=""+e,Error(b(31,"[object Object]"===r?"object with keys {"+Object.keys(e).join(", ")+"}":r));return u}function S(e,r,t){if(null==e)return e;var n=[],o=0;return E(e,n,"","",(function(e){return r.call(t,e,o++)})),n}function x(e){if(-1===e._status){var r=e._result;r=r(),e._status=0,e._result=r,r.then((function(r){0===e._status&&(r=r.default,e._status=1,e._result=r)}),(function(r){0===e._status&&(e._status=2,e._result=r)}))}if(1===e._status)return e._result;throw e._result}var N={current:null};function $(){var e=N.current;if(null===e)throw Error(b(321));return e}var R={ReactCurrentDispatcher:N,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:v,IsSomeRendererActing:{current:!1},assign:n};r.Children={map:S,forEach:function(e,r,t){S(e,(function(){r.apply(this,arguments)}),t)},count:function(e){var r=0;return S(e,(function(){r++})),r},toArray:function(e){return S(e,(function(e){return e}))||[]},only:function(e){if(!w(e))throw Error(b(143));return e}},r.Component=g,r.PureComponent=m,r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=R,r.cloneElement=function(e,r,t){if(null==e)throw Error(b(267,e));var a=n({},e.props),c=e.key,i=e.ref,u=e._owner;if(null!=r){if(void 0!==r.ref&&(i=r.ref,u=v.current),void 0!==r.key&&(c=""+r.key),e.type&&e.type.defaultProps)var p=e.type.defaultProps;for(f in r)j.call(r,f)&&!k.hasOwnProperty(f)&&(a[f]=void 0===r[f]&&void 0!==p?p[f]:r[f])}var f=arguments.length-2;if(1===f)a.children=t;else if(1<f){p=Array(f);for(var l=0;l<f;l++)p[l]=arguments[l+2];a.children=p}return{$$typeof:o,type:e.type,key:c,ref:i,props:a,_owner:u}},r.createContext=function(e,r){return void 0===r&&(r=null),(e={$$typeof:i,_calculateChangedBits:r,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:c,_context:e},e.Consumer=e},r.createElement=_,r.createFactory=function(e){var r=_.bind(null,e);return r.type=e,r},r.createRef=function(){return{current:null}},r.forwardRef=function(e){return{$$typeof:u,render:e}},r.isValidElement=w,r.lazy=function(e){return{$$typeof:f,_payload:{_status:-1,_result:e},_init:x}},r.memo=function(e,r){return{$$typeof:p,type:e,compare:void 0===r?null:r}},r.useCallback=function(e,r){return $().useCallback(e,r)},r.useContext=function(e,r){return $().useContext(e,r)},r.useDebugValue=function(){},r.useEffect=function(e,r){return $().useEffect(e,r)},r.useImperativeHandle=function(e,r,t){return $().useImperativeHandle(e,r,t)},r.useLayoutEffect=function(e,r){return $().useLayoutEffect(e,r)},r.useMemo=function(e,r){return $().useMemo(e,r)},r.useReducer=function(e,r,t){return $().useReducer(e,r,t)},r.useRef=function(e){return $().useRef(e)},r.useState=function(e){return $().useState(e)},r.version="17.0.1"},1336:function(e,r,t){"use strict";var n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable;function c(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var r={},t=0;t<10;t++)r["_"+String.fromCharCode(t)]=t;if("0123456789"!==Object.getOwnPropertyNames(r).map((function(e){return r[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(o){return!1}}()?Object.assign:function(e,r){for(var t,i,u=c(e),p=1;p<arguments.length;p++){for(var f in t=Object(arguments[p]))o.call(t,f)&&(u[f]=t[f]);if(n){i=n(t);for(var l=0;l<i.length;l++)a.call(t,i[l])&&(u[i[l]]=t[i[l]])}}return u}}}]);