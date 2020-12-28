/*! For license information please see 75956871.8acbd9bb.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[580],{1333:function(e,r,t){"use strict";t.d(r,"a",(function(){return b})),t.d(r,"b",(function(){return d}));var a=t(0),n=t.n(a);function c(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){c(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function p(e,r){if(null==e)return{};var t,a,n=function(e,r){if(null==e)return{};var t,a,n={},c=Object.keys(e);for(a=0;a<c.length;a++)t=c[a],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(a=0;a<c.length;a++)t=c[a],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var u=n.a.createContext({}),l=function(e){var r=n.a.useContext(u),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},b=function(e){var r=l(e.components);return n.a.createElement(u.Provider,{value:r},e.children)},s={inlineCode:"code",wrapper:function(e){var r=e.children;return n.a.createElement(n.a.Fragment,{},r)}},f=n.a.forwardRef((function(e,r){var t=e.components,a=e.mdxType,c=e.originalType,o=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),b=l(t),f=a,d=b["".concat(o,".").concat(f)]||b[f]||s[f]||c;return t?n.a.createElement(d,i(i({ref:r},u),{},{components:t})):n.a.createElement(d,i({ref:r},u))}));function d(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var c=t.length,o=new Array(c);o[0]=f;var i={};for(var p in r)hasOwnProperty.call(r,p)&&(i[p]=r[p]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var u=2;u<c;u++)o[u]=t[u];return n.a.createElement.apply(null,o)}return n.a.createElement.apply(null,t)}f.displayName="MDXCreateElement"},1334:function(e,r,t){"use strict";e.exports=t(1335)},1335:function(e,r,t){"use strict";var a=t(1336),n=60103,c=60106;r.Fragment=60107,r.StrictMode=60108,r.Profiler=60114;var o=60109,i=60110,p=60112;r.Suspense=60113;var u=60115,l=60116;if("function"==typeof Symbol&&Symbol.for){var b=Symbol.for;n=b("react.element"),c=b("react.portal"),r.Fragment=b("react.fragment"),r.StrictMode=b("react.strict_mode"),r.Profiler=b("react.profiler"),o=b("react.provider"),i=b("react.context"),p=b("react.forward_ref"),r.Suspense=b("react.suspense"),u=b("react.memo"),l=b("react.lazy")}var s="function"==typeof Symbol&&Symbol.iterator;function f(e){for(var r="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)r+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+r+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var d={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},h={};function g(e,r,t){this.props=e,this.context=r,this.refs=h,this.updater=t||d}function m(){}function y(e,r,t){this.props=e,this.context=r,this.refs=h,this.updater=t||d}g.prototype.isReactComponent={},g.prototype.setState=function(e,r){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(f(85));this.updater.enqueueSetState(this,e,r,"setState")},g.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},m.prototype=g.prototype;var O=y.prototype=new m;O.constructor=y,a(O,g.prototype),O.isPureReactComponent=!0;var v={current:null},j=Object.prototype.hasOwnProperty,k={key:!0,ref:!0,__self:!0,__source:!0};function _(e,r,t){var a,c={},o=null,i=null;if(null!=r)for(a in void 0!==r.ref&&(i=r.ref),void 0!==r.key&&(o=""+r.key),r)j.call(r,a)&&!k.hasOwnProperty(a)&&(c[a]=r[a]);var p=arguments.length-2;if(1===p)c.children=t;else if(1<p){for(var u=Array(p),l=0;l<p;l++)u[l]=arguments[l+2];c.children=u}if(e&&e.defaultProps)for(a in p=e.defaultProps)void 0===c[a]&&(c[a]=p[a]);return{$$typeof:n,type:e,key:o,ref:i,props:c,_owner:v.current}}function P(e){return"object"==typeof e&&null!==e&&e.$$typeof===n}var w=/\/+/g;function C(e,r){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var r={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return r[e]}))}(""+e.key):r.toString(36)}function N(e,r,t,a,o){var i=typeof e;"undefined"!==i&&"boolean"!==i||(e=null);var p=!1;if(null===e)p=!0;else switch(i){case"string":case"number":p=!0;break;case"object":switch(e.$$typeof){case n:case c:p=!0}}if(p)return o=o(p=e),e=""===a?"."+C(p,0):a,Array.isArray(o)?(t="",null!=e&&(t=e.replace(w,"$&/")+"/"),N(o,r,t,"",(function(e){return e}))):null!=o&&(P(o)&&(o=function(e,r){return{$$typeof:n,type:e.type,key:r,ref:e.ref,props:e.props,_owner:e._owner}}(o,t+(!o.key||p&&p.key===o.key?"":(""+o.key).replace(w,"$&/")+"/")+e)),r.push(o)),1;if(p=0,a=""===a?".":a+":",Array.isArray(e))for(var u=0;u<e.length;u++){var l=a+C(i=e[u],u);p+=N(i,r,t,l,o)}else if("function"==typeof(l=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=s&&e[s]||e["@@iterator"])?e:null}(e)))for(e=l.call(e),u=0;!(i=e.next()).done;)p+=N(i=i.value,r,t,l=a+C(i,u++),o);else if("object"===i)throw r=""+e,Error(f(31,"[object Object]"===r?"object with keys {"+Object.keys(e).join(", ")+"}":r));return p}function x(e,r,t){if(null==e)return e;var a=[],n=0;return N(e,a,"","",(function(e){return r.call(t,e,n++)})),a}function S(e){if(-1===e._status){var r=e._result;r=r(),e._status=0,e._result=r,r.then((function(r){0===e._status&&(r=r.default,e._status=1,e._result=r)}),(function(r){0===e._status&&(e._status=2,e._result=r)}))}if(1===e._status)return e._result;throw e._result}var E={current:null};function I(){var e=E.current;if(null===e)throw Error(f(321));return e}var A={ReactCurrentDispatcher:E,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:v,IsSomeRendererActing:{current:!1},assign:a};r.Children={map:x,forEach:function(e,r,t){x(e,(function(){r.apply(this,arguments)}),t)},count:function(e){var r=0;return x(e,(function(){r++})),r},toArray:function(e){return x(e,(function(e){return e}))||[]},only:function(e){if(!P(e))throw Error(f(143));return e}},r.Component=g,r.PureComponent=y,r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=A,r.cloneElement=function(e,r,t){if(null==e)throw Error(f(267,e));var c=a({},e.props),o=e.key,i=e.ref,p=e._owner;if(null!=r){if(void 0!==r.ref&&(i=r.ref,p=v.current),void 0!==r.key&&(o=""+r.key),e.type&&e.type.defaultProps)var u=e.type.defaultProps;for(l in r)j.call(r,l)&&!k.hasOwnProperty(l)&&(c[l]=void 0===r[l]&&void 0!==u?u[l]:r[l])}var l=arguments.length-2;if(1===l)c.children=t;else if(1<l){u=Array(l);for(var b=0;b<l;b++)u[b]=arguments[b+2];c.children=u}return{$$typeof:n,type:e.type,key:o,ref:i,props:c,_owner:p}},r.createContext=function(e,r){return void 0===r&&(r=null),(e={$$typeof:i,_calculateChangedBits:r,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:o,_context:e},e.Consumer=e},r.createElement=_,r.createFactory=function(e){var r=_.bind(null,e);return r.type=e,r},r.createRef=function(){return{current:null}},r.forwardRef=function(e){return{$$typeof:p,render:e}},r.isValidElement=P,r.lazy=function(e){return{$$typeof:l,_payload:{_status:-1,_result:e},_init:S}},r.memo=function(e,r){return{$$typeof:u,type:e,compare:void 0===r?null:r}},r.useCallback=function(e,r){return I().useCallback(e,r)},r.useContext=function(e,r){return I().useContext(e,r)},r.useDebugValue=function(){},r.useEffect=function(e,r){return I().useEffect(e,r)},r.useImperativeHandle=function(e,r,t){return I().useImperativeHandle(e,r,t)},r.useLayoutEffect=function(e,r){return I().useLayoutEffect(e,r)},r.useMemo=function(e,r){return I().useMemo(e,r)},r.useReducer=function(e,r,t){return I().useReducer(e,r,t)},r.useRef=function(e){return I().useRef(e)},r.useState=function(e){return I().useState(e)},r.version="17.0.1"},1336:function(e,r,t){"use strict";var a=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,c=Object.prototype.propertyIsEnumerable;function o(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var r={},t=0;t<10;t++)r["_"+String.fromCharCode(t)]=t;if("0123456789"!==Object.getOwnPropertyNames(r).map((function(e){return r[e]})).join(""))return!1;var a={};return"abcdefghijklmnopqrst".split("").forEach((function(e){a[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},a)).join("")}catch(n){return!1}}()?Object.assign:function(e,r){for(var t,i,p=o(e),u=1;u<arguments.length;u++){for(var l in t=Object(arguments[u]))n.call(t,l)&&(p[l]=t[l]);if(a){i=a(t);for(var b=0;b<i.length;b++)c.call(t,i[b])&&(p[i[b]]=t[i[b]])}}return p}},648:function(e,r,t){"use strict";t.r(r),t.d(r,"frontMatter",(function(){return o})),t.d(r,"metadata",(function(){return i})),t.d(r,"rightToc",(function(){return p})),t.d(r,"default",(function(){return l}));var a=t(3),n=t(7),c=(t(1334),t(1333)),o={id:"_buildgraphbackapi_.graphbackapiconfig",title:"GraphbackAPIConfig",sidebar_label:"GraphbackAPIConfig"},i={unversionedId:"api/graphback/interfaces/_buildgraphbackapi_.graphbackapiconfig",id:"api/graphback/interfaces/_buildgraphbackapi_.graphbackapiconfig",isDocsHomePage:!1,title:"GraphbackAPIConfig",description:"Hierarchy",source:"@site/../docs/api/graphback/interfaces/_buildgraphbackapi_.graphbackapiconfig.md",slug:"/api/graphback/interfaces/_buildgraphbackapi_.graphbackapiconfig",permalink:"/docs/next/api/graphback/interfaces/_buildgraphbackapi_.graphbackapiconfig",editUrl:"https://github.com/aerogear/graphback/edit/master/website/../docs/api/graphback/interfaces/_buildgraphbackapi_.graphbackapiconfig.md",version:"current",sidebar_label:"GraphbackAPIConfig",sidebar:"docs",previous:{title:"GraphbackAPI",permalink:"/docs/next/api/graphback/interfaces/_buildgraphbackapi_.graphbackapi"},next:{title:"GraphbackDataProvider",permalink:"/docs/next/api/graphback-core/interfaces/_packages_graphback_core_src_runtime_graphbackdataprovider_.graphbackdataprovider"}},p=[{value:"Hierarchy",id:"hierarchy",children:[]},{value:"Index",id:"index",children:[{value:"Properties",id:"properties",children:[]}]},{value:"Properties",id:"properties-1",children:[{value:"<code>Optional</code> crud",id:"optional-crud",children:[]},{value:"dataProviderCreator",id:"dataprovidercreator",children:[]},{value:"<code>Optional</code> plugins",id:"optional-plugins",children:[]},{value:"<code>Optional</code> serviceCreator",id:"optional-servicecreator",children:[]}]}],u={rightToc:p};function l(e){var r=e.components,t=Object(n.a)(e,["components"]);return Object(c.b)("wrapper",Object(a.a)({},u,t,{components:r,mdxType:"MDXLayout"}),Object(c.b)("h2",{id:"hierarchy"},"Hierarchy"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("strong",{parentName:"li"},"GraphbackAPIConfig"))),Object(c.b)("h2",{id:"index"},"Index"),Object(c.b)("h3",{id:"properties"},"Properties"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",Object(a.a)({parentName:"li"},{href:"/docs/next/api/graphback/interfaces/_buildgraphbackapi_.graphbackapiconfig#optional-crud"}),"crud")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",Object(a.a)({parentName:"li"},{href:"/docs/next/api/graphback/interfaces/_buildgraphbackapi_.graphbackapiconfig#dataprovidercreator"}),"dataProviderCreator")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",Object(a.a)({parentName:"li"},{href:"/docs/next/api/graphback/interfaces/_buildgraphbackapi_.graphbackapiconfig#optional-plugins"}),"plugins")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",Object(a.a)({parentName:"li"},{href:"/docs/next/api/graphback/interfaces/_buildgraphbackapi_.graphbackapiconfig#optional-servicecreator"}),"serviceCreator"))),Object(c.b)("h2",{id:"properties-1"},"Properties"),Object(c.b)("h3",{id:"optional-crud"},Object(c.b)("inlineCode",{parentName:"h3"},"Optional")," crud"),Object(c.b)("p",null,"\u2022 ",Object(c.b)("strong",{parentName:"p"},"crud"),"? : ",Object(c.b)("em",{parentName:"p"},"GraphbackCRUDGeneratorConfig")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",Object(a.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/514b9c0/packages/graphback/src/buildGraphbackAPI.ts#L12"}),"buildGraphbackAPI.ts:12"))),Object(c.b)("p",null,"Global CRUD configuration"),Object(c.b)("hr",null),Object(c.b)("h3",{id:"dataprovidercreator"},"dataProviderCreator"),Object(c.b)("p",null,"\u2022 ",Object(c.b)("strong",{parentName:"p"},"dataProviderCreator"),": ",Object(c.b)("em",{parentName:"p"},Object(c.b)("a",Object(a.a)({parentName:"em"},{href:"/docs/next/api/graphback/modules/_index_#dataprovidercreator"}),"DataProviderCreator"))),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",Object(a.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/514b9c0/packages/graphback/src/buildGraphbackAPI.ts#L26"}),"buildGraphbackAPI.ts:26"))),Object(c.b)("p",null,"Function which creates a default data provicer for every data model"),Object(c.b)("hr",null),Object(c.b)("h3",{id:"optional-plugins"},Object(c.b)("inlineCode",{parentName:"h3"},"Optional")," plugins"),Object(c.b)("p",null,"\u2022 ",Object(c.b)("strong",{parentName:"p"},"plugins"),"? : ",Object(c.b)("em",{parentName:"p"},"GraphbackPlugin[]")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",Object(a.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/514b9c0/packages/graphback/src/buildGraphbackAPI.ts#L16"}),"buildGraphbackAPI.ts:16"))),Object(c.b)("p",null,"Schema plugins to perform automatic changes to the schema"),Object(c.b)("hr",null),Object(c.b)("h3",{id:"optional-servicecreator"},Object(c.b)("inlineCode",{parentName:"h3"},"Optional")," serviceCreator"),Object(c.b)("p",null,"\u2022 ",Object(c.b)("strong",{parentName:"p"},"serviceCreator"),"? : ",Object(c.b)("em",{parentName:"p"},Object(c.b)("a",Object(a.a)({parentName:"em"},{href:"/docs/next/api/graphback/modules/_index_#servicecreator"}),"ServiceCreator"))),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",Object(a.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/514b9c0/packages/graphback/src/buildGraphbackAPI.ts#L21"}),"buildGraphbackAPI.ts:21"))),Object(c.b)("p",null,"Function which creates a default CRUD Service for every data model"))}l.isMDXComponent=!0}}]);