/*! For license information please see 4575a100.5854b6f9.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[358],{1333:function(e,r,t){"use strict";t.d(r,"a",(function(){return l})),t.d(r,"b",(function(){return h}));var n=t(0),a=t.n(n);function c(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){c(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function u(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},c=Object.keys(e);for(n=0;n<c.length;n++)t=c[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)t=c[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=a.a.createContext({}),s=function(e){var r=a.a.useContext(p),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},l=function(e){var r=s(e.components);return a.a.createElement(p.Provider,{value:r},e.children)},f={inlineCode:"code",wrapper:function(e){var r=e.children;return a.a.createElement(a.a.Fragment,{},r)}},b=a.a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,c=e.originalType,o=e.parentName,p=u(e,["components","mdxType","originalType","parentName"]),l=s(t),b=n,h=l["".concat(o,".").concat(b)]||l[b]||f[b]||c;return t?a.a.createElement(h,i(i({ref:r},p),{},{components:t})):a.a.createElement(h,i({ref:r},p))}));function h(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var c=t.length,o=new Array(c);o[0]=b;var i={};for(var u in r)hasOwnProperty.call(r,u)&&(i[u]=r[u]);i.originalType=e,i.mdxType="string"==typeof e?e:n,o[1]=i;for(var p=2;p<c;p++)o[p]=t[p];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,t)}b.displayName="MDXCreateElement"},1334:function(e,r,t){"use strict";e.exports=t(1335)},1335:function(e,r,t){"use strict";var n=t(1336),a=60103,c=60106;r.Fragment=60107,r.StrictMode=60108,r.Profiler=60114;var o=60109,i=60110,u=60112;r.Suspense=60113;var p=60115,s=60116;if("function"==typeof Symbol&&Symbol.for){var l=Symbol.for;a=l("react.element"),c=l("react.portal"),r.Fragment=l("react.fragment"),r.StrictMode=l("react.strict_mode"),r.Profiler=l("react.profiler"),o=l("react.provider"),i=l("react.context"),u=l("react.forward_ref"),r.Suspense=l("react.suspense"),p=l("react.memo"),s=l("react.lazy")}var f="function"==typeof Symbol&&Symbol.iterator;function b(e){for(var r="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)r+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+r+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m={};function d(e,r,t){this.props=e,this.context=r,this.refs=m,this.updater=t||h}function g(){}function _(e,r,t){this.props=e,this.context=r,this.refs=m,this.updater=t||h}d.prototype.isReactComponent={},d.prototype.setState=function(e,r){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(b(85));this.updater.enqueueSetState(this,e,r,"setState")},d.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},g.prototype=d.prototype;var y=_.prototype=new g;y.constructor=_,n(y,d.prototype),y.isPureReactComponent=!0;var O={current:null},k=Object.prototype.hasOwnProperty,v={key:!0,ref:!0,__self:!0,__source:!0};function j(e,r,t){var n,c={},o=null,i=null;if(null!=r)for(n in void 0!==r.ref&&(i=r.ref),void 0!==r.key&&(o=""+r.key),r)k.call(r,n)&&!v.hasOwnProperty(n)&&(c[n]=r[n]);var u=arguments.length-2;if(1===u)c.children=t;else if(1<u){for(var p=Array(u),s=0;s<u;s++)p[s]=arguments[s+2];c.children=p}if(e&&e.defaultProps)for(n in u=e.defaultProps)void 0===c[n]&&(c[n]=u[n]);return{$$typeof:a,type:e,key:o,ref:i,props:c,_owner:O.current}}function w(e){return"object"==typeof e&&null!==e&&e.$$typeof===a}var C=/\/+/g;function N(e,r){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var r={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return r[e]}))}(""+e.key):r.toString(36)}function S(e,r,t,n,o){var i=typeof e;"undefined"!==i&&"boolean"!==i||(e=null);var u=!1;if(null===e)u=!0;else switch(i){case"string":case"number":u=!0;break;case"object":switch(e.$$typeof){case a:case c:u=!0}}if(u)return o=o(u=e),e=""===n?"."+N(u,0):n,Array.isArray(o)?(t="",null!=e&&(t=e.replace(C,"$&/")+"/"),S(o,r,t,"",(function(e){return e}))):null!=o&&(w(o)&&(o=function(e,r){return{$$typeof:a,type:e.type,key:r,ref:e.ref,props:e.props,_owner:e._owner}}(o,t+(!o.key||u&&u.key===o.key?"":(""+o.key).replace(C,"$&/")+"/")+e)),r.push(o)),1;if(u=0,n=""===n?".":n+":",Array.isArray(e))for(var p=0;p<e.length;p++){var s=n+N(i=e[p],p);u+=S(i,r,t,s,o)}else if(s=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=f&&e[f]||e["@@iterator"])?e:null}(e),"function"==typeof s)for(e=s.call(e),p=0;!(i=e.next()).done;)u+=S(i=i.value,r,t,s=n+N(i,p++),o);else if("object"===i)throw r=""+e,Error(b(31,"[object Object]"===r?"object with keys {"+Object.keys(e).join(", ")+"}":r));return u}function P(e,r,t){if(null==e)return e;var n=[],a=0;return S(e,n,"","",(function(e){return r.call(t,e,a++)})),n}function x(e){if(-1===e._status){var r=e._result;r=r(),e._status=0,e._result=r,r.then((function(r){0===e._status&&(r=r.default,e._status=1,e._result=r)}),(function(r){0===e._status&&(e._status=2,e._result=r)}))}if(1===e._status)return e._result;throw e._result}var R={current:null};function E(){var e=R.current;if(null===e)throw Error(b(321));return e}var D={ReactCurrentDispatcher:R,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:O,IsSomeRendererActing:{current:!1},assign:n};r.Children={map:P,forEach:function(e,r,t){P(e,(function(){r.apply(this,arguments)}),t)},count:function(e){var r=0;return P(e,(function(){r++})),r},toArray:function(e){return P(e,(function(e){return e}))||[]},only:function(e){if(!w(e))throw Error(b(143));return e}},r.Component=d,r.PureComponent=_,r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=D,r.cloneElement=function(e,r,t){if(null==e)throw Error(b(267,e));var c=n({},e.props),o=e.key,i=e.ref,u=e._owner;if(null!=r){if(void 0!==r.ref&&(i=r.ref,u=O.current),void 0!==r.key&&(o=""+r.key),e.type&&e.type.defaultProps)var p=e.type.defaultProps;for(s in r)k.call(r,s)&&!v.hasOwnProperty(s)&&(c[s]=void 0===r[s]&&void 0!==p?p[s]:r[s])}var s=arguments.length-2;if(1===s)c.children=t;else if(1<s){p=Array(s);for(var l=0;l<s;l++)p[l]=arguments[l+2];c.children=p}return{$$typeof:a,type:e.type,key:o,ref:i,props:c,_owner:u}},r.createContext=function(e,r){return void 0===r&&(r=null),(e={$$typeof:i,_calculateChangedBits:r,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:o,_context:e},e.Consumer=e},r.createElement=j,r.createFactory=function(e){var r=j.bind(null,e);return r.type=e,r},r.createRef=function(){return{current:null}},r.forwardRef=function(e){return{$$typeof:u,render:e}},r.isValidElement=w,r.lazy=function(e){return{$$typeof:s,_payload:{_status:-1,_result:e},_init:x}},r.memo=function(e,r){return{$$typeof:p,type:e,compare:void 0===r?null:r}},r.useCallback=function(e,r){return E().useCallback(e,r)},r.useContext=function(e,r){return E().useContext(e,r)},r.useDebugValue=function(){},r.useEffect=function(e,r){return E().useEffect(e,r)},r.useImperativeHandle=function(e,r,t){return E().useImperativeHandle(e,r,t)},r.useLayoutEffect=function(e,r){return E().useLayoutEffect(e,r)},r.useMemo=function(e,r){return E().useMemo(e,r)},r.useReducer=function(e,r,t){return E().useReducer(e,r,t)},r.useRef=function(e){return E().useRef(e)},r.useState=function(e){return E().useState(e)},r.version="17.0.1"},1336:function(e,r,t){"use strict";var n=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,c=Object.prototype.propertyIsEnumerable;function o(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var r={},t=0;t<10;t++)r["_"+String.fromCharCode(t)]=t;if("0123456789"!==Object.getOwnPropertyNames(r).map((function(e){return r[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(a){return!1}}()?Object.assign:function(e,r){for(var t,i,u=o(e),p=1;p<arguments.length;p++){for(var s in t=Object(arguments[p]))a.call(t,s)&&(u[s]=t[s]);if(n){i=n(t);for(var l=0;l<i.length;l++)c.call(t,i[l])&&(u[i[l]]=t[i[l]])}}return u}},425:function(e,r,t){"use strict";t.r(r),t.d(r,"frontMatter",(function(){return i})),t.d(r,"metadata",(function(){return u})),t.d(r,"rightToc",(function(){return p})),t.d(r,"default",(function(){return l}));var n=t(3),a=t(7),c=(t(1334),t(1333)),o=["components"],i={id:"_packages_graphback_core_src_runtime_graphbackcrudservice_.resultlist",title:"ResultList",sidebar_label:"ResultList"},u={unversionedId:"api/graphback-core/interfaces/_packages_graphback_core_src_runtime_graphbackcrudservice_.resultlist",id:"api/graphback-core/interfaces/_packages_graphback_core_src_runtime_graphbackcrudservice_.resultlist",isDocsHomePage:!1,title:"ResultList",description:"Type parameters",source:"@site/../docs/api/graphback-core/interfaces/_packages_graphback_core_src_runtime_graphbackcrudservice_.resultlist.md",slug:"/api/graphback-core/interfaces/_packages_graphback_core_src_runtime_graphbackcrudservice_.resultlist",permalink:"/docs/next/api/graphback-core/interfaces/_packages_graphback_core_src_runtime_graphbackcrudservice_.resultlist",editUrl:"https://github.com/aerogear/graphback/edit/master/website/../docs/api/graphback-core/interfaces/_packages_graphback_core_src_runtime_graphbackcrudservice_.resultlist.md",version:"current",sidebar_label:"ResultList",sidebar:"docs",previous:{title:"GraphbackContext",permalink:"/docs/next/api/graphback-core/interfaces/_packages_graphback_core_src_runtime_interfaces_.graphbackcontext"},next:{title:"GraphbackPlugin",permalink:"/docs/next/api/graphback-core/classes/_packages_graphback_core_src_plugin_graphbackplugin_.graphbackplugin"}},p=[{value:"Type parameters",id:"type-parameters",children:[]},{value:"Hierarchy",id:"hierarchy",children:[]},{value:"Index",id:"index",children:[{value:"Properties",id:"properties",children:[]}]},{value:"Properties",id:"properties-1",children:[{value:"<code>Optional</code> count",id:"optional-count",children:[]},{value:"items",id:"items",children:[]},{value:"<code>Optional</code> limit",id:"optional-limit",children:[]},{value:"<code>Optional</code> offset",id:"optional-offset",children:[]}]}],s={rightToc:p};function l(e){var r=e.components,t=Object(a.a)(e,o);return Object(c.b)("wrapper",Object(n.a)({},s,t,{components:r,mdxType:"MDXLayout"}),Object(c.b)("h2",{id:"type-parameters"},"Type parameters"),Object(c.b)("p",null,"\u25aa ",Object(c.b)("strong",{parentName:"p"},"T")),Object(c.b)("h2",{id:"hierarchy"},"Hierarchy"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("strong",{parentName:"li"},"ResultList"))),Object(c.b)("h2",{id:"index"},"Index"),Object(c.b)("h3",{id:"properties"},"Properties"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-core/interfaces/_packages_graphback_core_src_runtime_graphbackcrudservice_.resultlist#optional-count"},"count")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-core/interfaces/_packages_graphback_core_src_runtime_graphbackcrudservice_.resultlist#items"},"items")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-core/interfaces/_packages_graphback_core_src_runtime_graphbackcrudservice_.resultlist#optional-limit"},"limit")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-core/interfaces/_packages_graphback_core_src_runtime_graphbackcrudservice_.resultlist#optional-offset"},"offset"))),Object(c.b)("h2",{id:"properties-1"},"Properties"),Object(c.b)("h3",{id:"optional-count"},Object(c.b)("inlineCode",{parentName:"h3"},"Optional")," count"),Object(c.b)("p",null,"\u2022 ",Object(c.b)("strong",{parentName:"p"},"count"),"? : ",Object(c.b)("em",{parentName:"p"},"number")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/0a237f8/packages/graphback-core/src/runtime/GraphbackCRUDService.ts#L7"},"packages/graphback-core/src/runtime/GraphbackCRUDService.ts:7"))),Object(c.b)("hr",null),Object(c.b)("h3",{id:"items"},"items"),Object(c.b)("p",null,"\u2022 ",Object(c.b)("strong",{parentName:"p"},"items"),": ",Object(c.b)("em",{parentName:"p"},"T[]")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/0a237f8/packages/graphback-core/src/runtime/GraphbackCRUDService.ts#L6"},"packages/graphback-core/src/runtime/GraphbackCRUDService.ts:6"))),Object(c.b)("hr",null),Object(c.b)("h3",{id:"optional-limit"},Object(c.b)("inlineCode",{parentName:"h3"},"Optional")," limit"),Object(c.b)("p",null,"\u2022 ",Object(c.b)("strong",{parentName:"p"},"limit"),"? : ",Object(c.b)("em",{parentName:"p"},"number")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/0a237f8/packages/graphback-core/src/runtime/GraphbackCRUDService.ts#L8"},"packages/graphback-core/src/runtime/GraphbackCRUDService.ts:8"))),Object(c.b)("hr",null),Object(c.b)("h3",{id:"optional-offset"},Object(c.b)("inlineCode",{parentName:"h3"},"Optional")," offset"),Object(c.b)("p",null,"\u2022 ",Object(c.b)("strong",{parentName:"p"},"offset"),"? : ",Object(c.b)("em",{parentName:"p"},"number")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/0a237f8/packages/graphback-core/src/runtime/GraphbackCRUDService.ts#L9"},"packages/graphback-core/src/runtime/GraphbackCRUDService.ts:9"))))}l.isMDXComponent=!0}}]);