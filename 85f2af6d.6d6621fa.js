/*! For license information please see 85f2af6d.6d6621fa.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[643],{1333:function(e,t,r){"use strict";r.d(t,"a",(function(){return f})),r.d(t,"b",(function(){return d}));var n=r(0),o=r.n(n);function u(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){u(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},u=Object.keys(e);for(n=0;n<u.length;n++)r=u[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(n=0;n<u.length;n++)r=u[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=o.a.createContext({}),p=function(e){var t=o.a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},f=function(e){var t=p(e.components);return o.a.createElement(l.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},b=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,u=e.originalType,a=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),f=p(r),b=n,d=f["".concat(a,".").concat(b)]||f[b]||s[b]||u;return r?o.a.createElement(d,i(i({ref:t},l),{},{components:r})):o.a.createElement(d,i({ref:t},l))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var u=r.length,a=new Array(u);a[0]=b;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:n,a[1]=i;for(var l=2;l<u;l++)a[l]=r[l];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,r)}b.displayName="MDXCreateElement"},1334:function(e,t,r){"use strict";e.exports=r(1335)},1335:function(e,t,r){"use strict";var n=r(1336),o=60103,u=60106;t.Fragment=60107,t.StrictMode=60108,t.Profiler=60114;var a=60109,i=60110,c=60112;t.Suspense=60113;var l=60115,p=60116;if("function"==typeof Symbol&&Symbol.for){var f=Symbol.for;o=f("react.element"),u=f("react.portal"),t.Fragment=f("react.fragment"),t.StrictMode=f("react.strict_mode"),t.Profiler=f("react.profiler"),a=f("react.provider"),i=f("react.context"),c=f("react.forward_ref"),t.Suspense=f("react.suspense"),l=f("react.memo"),p=f("react.lazy")}var s="function"==typeof Symbol&&Symbol.iterator;function b(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var d={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},y={};function m(e,t,r){this.props=e,this.context=t,this.refs=y,this.updater=r||d}function h(){}function O(e,t,r){this.props=e,this.context=t,this.refs=y,this.updater=r||d}m.prototype.isReactComponent={},m.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(b(85));this.updater.enqueueSetState(this,e,t,"setState")},m.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},h.prototype=m.prototype;var g=O.prototype=new h;g.constructor=O,n(g,m.prototype),g.isPureReactComponent=!0;var j={current:null},v=Object.prototype.hasOwnProperty,_={key:!0,ref:!0,__self:!0,__source:!0};function w(e,t,r){var n,u={},a=null,i=null;if(null!=t)for(n in void 0!==t.ref&&(i=t.ref),void 0!==t.key&&(a=""+t.key),t)v.call(t,n)&&!_.hasOwnProperty(n)&&(u[n]=t[n]);var c=arguments.length-2;if(1===c)u.children=r;else if(1<c){for(var l=Array(c),p=0;p<c;p++)l[p]=arguments[p+2];u.children=l}if(e&&e.defaultProps)for(n in c=e.defaultProps)void 0===u[n]&&(u[n]=c[n]);return{$$typeof:o,type:e,key:a,ref:i,props:u,_owner:j.current}}function k(e){return"object"==typeof e&&null!==e&&e.$$typeof===o}var N=/\/+/g;function E(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function P(e,t,r,n,a){var i=typeof e;"undefined"!==i&&"boolean"!==i||(e=null);var c=!1;if(null===e)c=!0;else switch(i){case"string":case"number":c=!0;break;case"object":switch(e.$$typeof){case o:case u:c=!0}}if(c)return a=a(c=e),e=""===n?"."+E(c,0):n,Array.isArray(a)?(r="",null!=e&&(r=e.replace(N,"$&/")+"/"),P(a,t,r,"",(function(e){return e}))):null!=a&&(k(a)&&(a=function(e,t){return{$$typeof:o,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(a,r+(!a.key||c&&c.key===a.key?"":(""+a.key).replace(N,"$&/")+"/")+e)),t.push(a)),1;if(c=0,n=""===n?".":n+":",Array.isArray(e))for(var l=0;l<e.length;l++){var p=n+E(i=e[l],l);c+=P(i,t,r,p,a)}else if(p=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=s&&e[s]||e["@@iterator"])?e:null}(e),"function"==typeof p)for(e=p.call(e),l=0;!(i=e.next()).done;)c+=P(i=i.value,t,r,p=n+E(i,l++),a);else if("object"===i)throw t=""+e,Error(b(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return c}function S(e,t,r){if(null==e)return e;var n=[],o=0;return P(e,n,"","",(function(e){return t.call(r,e,o++)})),n}function C(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var x={current:null};function q(){var e=x.current;if(null===e)throw Error(b(321));return e}var $={ReactCurrentDispatcher:x,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:j,IsSomeRendererActing:{current:!1},assign:n};t.Children={map:S,forEach:function(e,t,r){S(e,(function(){t.apply(this,arguments)}),r)},count:function(e){var t=0;return S(e,(function(){t++})),t},toArray:function(e){return S(e,(function(e){return e}))||[]},only:function(e){if(!k(e))throw Error(b(143));return e}},t.Component=m,t.PureComponent=O,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=$,t.cloneElement=function(e,t,r){if(null==e)throw Error(b(267,e));var u=n({},e.props),a=e.key,i=e.ref,c=e._owner;if(null!=t){if(void 0!==t.ref&&(i=t.ref,c=j.current),void 0!==t.key&&(a=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(p in t)v.call(t,p)&&!_.hasOwnProperty(p)&&(u[p]=void 0===t[p]&&void 0!==l?l[p]:t[p])}var p=arguments.length-2;if(1===p)u.children=r;else if(1<p){l=Array(p);for(var f=0;f<p;f++)l[f]=arguments[f+2];u.children=l}return{$$typeof:o,type:e.type,key:a,ref:i,props:u,_owner:c}},t.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:i,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:a,_context:e},e.Consumer=e},t.createElement=w,t.createFactory=function(e){var t=w.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:c,render:e}},t.isValidElement=k,t.lazy=function(e){return{$$typeof:p,_payload:{_status:-1,_result:e},_init:C}},t.memo=function(e,t){return{$$typeof:l,type:e,compare:void 0===t?null:t}},t.useCallback=function(e,t){return q().useCallback(e,t)},t.useContext=function(e,t){return q().useContext(e,t)},t.useDebugValue=function(){},t.useEffect=function(e,t){return q().useEffect(e,t)},t.useImperativeHandle=function(e,t,r){return q().useImperativeHandle(e,t,r)},t.useLayoutEffect=function(e,t){return q().useLayoutEffect(e,t)},t.useMemo=function(e,t){return q().useMemo(e,t)},t.useReducer=function(e,t,r){return q().useReducer(e,t,r)},t.useRef=function(e){return q().useRef(e)},t.useState=function(e){return q().useState(e)},t.version="17.0.1"},1336:function(e,t,r){"use strict";var n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable;function a(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(o){return!1}}()?Object.assign:function(e,t){for(var r,i,c=a(e),l=1;l<arguments.length;l++){for(var p in r=Object(arguments[l]))o.call(r,p)&&(c[p]=r[p]);if(n){i=n(r);for(var f=0;f<i.length;f++)u.call(r,i[f])&&(c[i[f]]=r[i[f]])}}return c}},711:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return c})),r.d(t,"rightToc",(function(){return l})),r.d(t,"default",(function(){return f}));var n=r(3),o=r(7),u=(r(1334),r(1333)),a=["components"],i={id:"_querybuilder_",title:"queryBuilder",sidebar_label:"queryBuilder"},c={unversionedId:"api/graphback-runtime-mongodb/modules/_querybuilder_",id:"api/graphback-runtime-mongodb/modules/_querybuilder_",isDocsHomePage:!1,title:"queryBuilder",description:"Index",source:"@site/../docs/api/graphback-runtime-mongodb/modules/_querybuilder_.md",slug:"/api/graphback-runtime-mongodb/modules/_querybuilder_",permalink:"/docs/next/api/graphback-runtime-mongodb/modules/_querybuilder_",editUrl:"https://github.com/aerogear/graphback/edit/master/website/../docs/api/graphback-runtime-mongodb/modules/_querybuilder_.md",version:"current",sidebar_label:"queryBuilder"},l=[{value:"Index",id:"index",children:[{value:"Functions",id:"functions",children:[]}]},{value:"Functions",id:"functions-1",children:[{value:"buildQuery",id:"buildquery",children:[]}]}],p={rightToc:l};function f(e){var t=e.components,r=Object(o.a)(e,a);return Object(u.b)("wrapper",Object(n.a)({},p,r,{components:t,mdxType:"MDXLayout"}),Object(u.b)("h2",{id:"index"},"Index"),Object(u.b)("h3",{id:"functions"},"Functions"),Object(u.b)("ul",null,Object(u.b)("li",{parentName:"ul"},Object(u.b)("a",{parentName:"li",href:"/docs/next/api/graphback-runtime-mongodb/modules/_querybuilder_#buildquery"},"buildQuery"))),Object(u.b)("h2",{id:"functions-1"},"Functions"),Object(u.b)("h3",{id:"buildquery"},"buildQuery"),Object(u.b)("p",null,"\u25b8 ",Object(u.b)("strong",{parentName:"p"},"buildQuery"),"\u2039",Object(u.b)("strong",{parentName:"p"},"M"),"\u203a(",Object(u.b)("inlineCode",{parentName:"p"},"filter"),": QueryFilter\u2039M\u203a): ",Object(u.b)("em",{parentName:"p"},"FilterQuery\u2039any\u203a")),Object(u.b)("p",null,Object(u.b)("em",{parentName:"p"},"Defined in ",Object(u.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/0a237f8/packages/graphback-runtime-mongodb/src/queryBuilder.ts#L134"},"queryBuilder.ts:134"))),Object(u.b)("p",null,"Build a MongoDB query from a Graphback filter"),Object(u.b)("p",null,Object(u.b)("strong",{parentName:"p"},"Type parameters:")),Object(u.b)("p",null,"\u25aa ",Object(u.b)("strong",{parentName:"p"},"M")),Object(u.b)("p",null,Object(u.b)("strong",{parentName:"p"},"Parameters:")),Object(u.b)("table",null,Object(u.b)("thead",{parentName:"table"},Object(u.b)("tr",{parentName:"thead"},Object(u.b)("th",{parentName:"tr",align:null},"Name"),Object(u.b)("th",{parentName:"tr",align:null},"Type"),Object(u.b)("th",{parentName:"tr",align:null},"Description"))),Object(u.b)("tbody",{parentName:"table"},Object(u.b)("tr",{parentName:"tbody"},Object(u.b)("td",{parentName:"tr",align:null},Object(u.b)("inlineCode",{parentName:"td"},"filter")),Object(u.b)("td",{parentName:"tr",align:null},"QueryFilter\u2039M\u203a"),Object(u.b)("td",{parentName:"tr",align:null})))),Object(u.b)("p",null,Object(u.b)("strong",{parentName:"p"},"Returns:")," ",Object(u.b)("em",{parentName:"p"},"FilterQuery\u2039any\u203a")))}f.isMDXComponent=!0}}]);