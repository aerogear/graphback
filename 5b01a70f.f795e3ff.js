/*! For license information please see 5b01a70f.f795e3ff.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[448],{1333:function(e,t,n){"use strict";n.d(t,"a",(function(){return f})),n.d(t,"b",(function(){return d}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=a.a.createContext({}),p=function(e){var t=a.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},f=function(e){var t=p(e.components);return a.a.createElement(u.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},b=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),f=p(n),b=r,d=f["".concat(c,".").concat(b)]||f[b]||s[b]||o;return n?a.a.createElement(d,i(i({ref:t},u),{},{components:n})):a.a.createElement(d,i({ref:t},u))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,c=new Array(o);c[0]=b;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:r,c[1]=i;for(var u=2;u<o;u++)c[u]=n[u];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"},1334:function(e,t,n){"use strict";e.exports=n(1335)},1335:function(e,t,n){"use strict";var r=n(1336),a=60103,o=60106;t.Fragment=60107,t.StrictMode=60108,t.Profiler=60114;var c=60109,i=60110,l=60112;t.Suspense=60113;var u=60115,p=60116;if("function"==typeof Symbol&&Symbol.for){var f=Symbol.for;a=f("react.element"),o=f("react.portal"),t.Fragment=f("react.fragment"),t.StrictMode=f("react.strict_mode"),t.Profiler=f("react.profiler"),c=f("react.provider"),i=f("react.context"),l=f("react.forward_ref"),t.Suspense=f("react.suspense"),u=f("react.memo"),p=f("react.lazy")}var s="function"==typeof Symbol&&Symbol.iterator;function b(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var d={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m={};function g(e,t,n){this.props=e,this.context=t,this.refs=m,this.updater=n||d}function h(){}function y(e,t,n){this.props=e,this.context=t,this.refs=m,this.updater=n||d}g.prototype.isReactComponent={},g.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(b(85));this.updater.enqueueSetState(this,e,t,"setState")},g.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},h.prototype=g.prototype;var O=y.prototype=new h;O.constructor=y,r(O,g.prototype),O.isPureReactComponent=!0;var j={current:null},v=Object.prototype.hasOwnProperty,_={key:!0,ref:!0,__self:!0,__source:!0};function k(e,t,n){var r,o={},c=null,i=null;if(null!=t)for(r in void 0!==t.ref&&(i=t.ref),void 0!==t.key&&(c=""+t.key),t)v.call(t,r)&&!_.hasOwnProperty(r)&&(o[r]=t[r]);var l=arguments.length-2;if(1===l)o.children=n;else if(1<l){for(var u=Array(l),p=0;p<l;p++)u[p]=arguments[p+2];o.children=u}if(e&&e.defaultProps)for(r in l=e.defaultProps)void 0===o[r]&&(o[r]=l[r]);return{$$typeof:a,type:e,key:c,ref:i,props:o,_owner:j.current}}function N(e){return"object"==typeof e&&null!==e&&e.$$typeof===a}var w=/\/+/g;function C(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function x(e,t,n,r,c){var i=typeof e;"undefined"!==i&&"boolean"!==i||(e=null);var l=!1;if(null===e)l=!0;else switch(i){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case a:case o:l=!0}}if(l)return c=c(l=e),e=""===r?"."+C(l,0):r,Array.isArray(c)?(n="",null!=e&&(n=e.replace(w,"$&/")+"/"),x(c,t,n,"",(function(e){return e}))):null!=c&&(N(c)&&(c=function(e,t){return{$$typeof:a,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(c,n+(!c.key||l&&l.key===c.key?"":(""+c.key).replace(w,"$&/")+"/")+e)),t.push(c)),1;if(l=0,r=""===r?".":r+":",Array.isArray(e))for(var u=0;u<e.length;u++){var p=r+C(i=e[u],u);l+=x(i,t,n,p,c)}else if(p=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=s&&e[s]||e["@@iterator"])?e:null}(e),"function"==typeof p)for(e=p.call(e),u=0;!(i=e.next()).done;)l+=x(i=i.value,t,n,p=r+C(i,u++),c);else if("object"===i)throw t=""+e,Error(b(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return l}function S(e,t,n){if(null==e)return e;var r=[],a=0;return x(e,r,"","",(function(e){return t.call(n,e,a++)})),r}function P(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var E={current:null};function R(){var e=E.current;if(null===e)throw Error(b(321));return e}var T={ReactCurrentDispatcher:E,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:j,IsSomeRendererActing:{current:!1},assign:r};t.Children={map:S,forEach:function(e,t,n){S(e,(function(){t.apply(this,arguments)}),n)},count:function(e){var t=0;return S(e,(function(){t++})),t},toArray:function(e){return S(e,(function(e){return e}))||[]},only:function(e){if(!N(e))throw Error(b(143));return e}},t.Component=g,t.PureComponent=y,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=T,t.cloneElement=function(e,t,n){if(null==e)throw Error(b(267,e));var o=r({},e.props),c=e.key,i=e.ref,l=e._owner;if(null!=t){if(void 0!==t.ref&&(i=t.ref,l=j.current),void 0!==t.key&&(c=""+t.key),e.type&&e.type.defaultProps)var u=e.type.defaultProps;for(p in t)v.call(t,p)&&!_.hasOwnProperty(p)&&(o[p]=void 0===t[p]&&void 0!==u?u[p]:t[p])}var p=arguments.length-2;if(1===p)o.children=n;else if(1<p){u=Array(p);for(var f=0;f<p;f++)u[f]=arguments[f+2];o.children=u}return{$$typeof:a,type:e.type,key:c,ref:i,props:o,_owner:l}},t.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:i,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:c,_context:e},e.Consumer=e},t.createElement=k,t.createFactory=function(e){var t=k.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:l,render:e}},t.isValidElement=N,t.lazy=function(e){return{$$typeof:p,_payload:{_status:-1,_result:e},_init:P}},t.memo=function(e,t){return{$$typeof:u,type:e,compare:void 0===t?null:t}},t.useCallback=function(e,t){return R().useCallback(e,t)},t.useContext=function(e,t){return R().useContext(e,t)},t.useDebugValue=function(){},t.useEffect=function(e,t){return R().useEffect(e,t)},t.useImperativeHandle=function(e,t,n){return R().useImperativeHandle(e,t,n)},t.useLayoutEffect=function(e,t){return R().useLayoutEffect(e,t)},t.useMemo=function(e,t){return R().useMemo(e,t)},t.useReducer=function(e,t,n){return R().useReducer(e,t,n)},t.useRef=function(e){return R().useRef(e)},t.useState=function(e){return R().useState(e)},t.version="17.0.1"},1336:function(e,t,n){"use strict";var r=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;function c(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(a){return!1}}()?Object.assign:function(e,t){for(var n,i,l=c(e),u=1;u<arguments.length;u++){for(var p in n=Object(arguments[u]))a.call(n,p)&&(l[p]=n[p]);if(r){i=r(n);for(var f=0;f<i.length;f++)o.call(n,i[f])&&(l[i[f]]=n[i[f]])}}return l}},515:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return u})),n.d(t,"default",(function(){return f}));var r=n(3),a=n(7),o=(n(1334),n(1333)),c=["components"],i={id:"_util_.globalconflictconfig",title:"GlobalConflictConfig",sidebar_label:"GlobalConflictConfig"},l={unversionedId:"api/graphback-datasync/interfaces/_util_.globalconflictconfig",id:"api/graphback-datasync/interfaces/_util_.globalconflictconfig",isDocsHomePage:!1,title:"GlobalConflictConfig",description:"Interface for global configuration of conflicts",source:"@site/../docs/api/graphback-datasync/interfaces/_util_.globalconflictconfig.md",slug:"/api/graphback-datasync/interfaces/_util_.globalconflictconfig",permalink:"/docs/next/api/graphback-datasync/interfaces/_util_.globalconflictconfig",editUrl:"https://github.com/aerogear/graphback/edit/master/website/../docs/api/graphback-datasync/interfaces/_util_.globalconflictconfig.md",version:"current",sidebar_label:"GlobalConflictConfig"},u=[{value:"Hierarchy",id:"hierarchy",children:[]},{value:"Index",id:"index",children:[{value:"Properties",id:"properties",children:[]}]},{value:"Properties",id:"properties-1",children:[{value:"<code>Optional</code> conflictResolution",id:"optional-conflictresolution",children:[]},{value:"<code>Optional</code> deltaTTL",id:"optional-deltattl",children:[]},{value:"<code>Optional</code> enabled",id:"optional-enabled",children:[]},{value:"<code>Optional</code> models",id:"optional-models",children:[]}]}],p={rightToc:u};function f(e){var t=e.components,n=Object(a.a)(e,c);return Object(o.b)("wrapper",Object(r.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Interface for global configuration of conflicts"),Object(o.b)("h2",{id:"hierarchy"},"Hierarchy"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("a",{parentName:"p",href:"/docs/next/api/graphback-datasync/interfaces/_util_.datasyncmodelconflictconfig"},"DataSyncModelConflictConfig")),Object(o.b)("p",{parentName:"li"},"\u21b3 ",Object(o.b)("strong",{parentName:"p"},"GlobalConflictConfig")))),Object(o.b)("h2",{id:"index"},"Index"),Object(o.b)("h3",{id:"properties"},"Properties"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"/docs/next/api/graphback-datasync/interfaces/_util_.globalconflictconfig#optional-conflictresolution"},"conflictResolution")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"/docs/next/api/graphback-datasync/interfaces/_util_.globalconflictconfig#optional-deltattl"},"deltaTTL")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"/docs/next/api/graphback-datasync/interfaces/_util_.globalconflictconfig#optional-enabled"},"enabled")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"/docs/next/api/graphback-datasync/interfaces/_util_.globalconflictconfig#optional-models"},"models"))),Object(o.b)("h2",{id:"properties-1"},"Properties"),Object(o.b)("h3",{id:"optional-conflictresolution"},Object(o.b)("inlineCode",{parentName:"h3"},"Optional")," conflictResolution"),Object(o.b)("p",null,"\u2022 ",Object(o.b)("strong",{parentName:"p"},"conflictResolution"),"? : ",Object(o.b)("em",{parentName:"p"},Object(o.b)("a",{parentName:"em",href:"/docs/next/api/graphback-datasync/interfaces/_util_.conflictresolutionstrategy"},"ConflictResolutionStrategy"))),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Inherited from ",Object(o.b)("a",{parentName:"em",href:"/docs/next/api/graphback-datasync/interfaces/_util_.globalconflictconfig"},"GlobalConflictConfig"),".",Object(o.b)("a",{parentName:"em",href:"/docs/next/api/graphback-datasync/interfaces/_util_.globalconflictconfig#optional-conflictresolution"},"conflictResolution"))),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/0a237f8/packages/graphback-datasync/src/util.ts#L102"},"packages/graphback-datasync/src/util.ts:102"))),Object(o.b)("p",null,"One of the conflict resolutions strategies:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"ThrowOnConflict,"),Object(o.b)("li",{parentName:"ul"},"ClientSideWins,"),Object(o.b)("li",{parentName:"ul"},"ServerSideWins")),Object(o.b)("hr",null),Object(o.b)("h3",{id:"optional-deltattl"},Object(o.b)("inlineCode",{parentName:"h3"},"Optional")," deltaTTL"),Object(o.b)("p",null,"\u2022 ",Object(o.b)("strong",{parentName:"p"},"deltaTTL"),"? : ",Object(o.b)("em",{parentName:"p"},"number")),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Inherited from ",Object(o.b)("a",{parentName:"em",href:"/docs/next/api/graphback-datasync/interfaces/_util_.globalconflictconfig"},"GlobalConflictConfig"),".",Object(o.b)("a",{parentName:"em",href:"/docs/next/api/graphback-datasync/interfaces/_util_.globalconflictconfig#optional-deltattl"},"deltaTTL"))),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/0a237f8/packages/graphback-datasync/src/util.ts#L106"},"packages/graphback-datasync/src/util.ts:106"))),Object(o.b)("p",null,"Value in seconds used to delete old history entries wth diffs that may no longer be needed."),Object(o.b)("hr",null),Object(o.b)("h3",{id:"optional-enabled"},Object(o.b)("inlineCode",{parentName:"h3"},"Optional")," enabled"),Object(o.b)("p",null,"\u2022 ",Object(o.b)("strong",{parentName:"p"},"enabled"),"? : ",Object(o.b)("em",{parentName:"p"},"boolean")),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Inherited from ",Object(o.b)("a",{parentName:"em",href:"/docs/next/api/graphback-datasync/interfaces/_util_.globalconflictconfig"},"GlobalConflictConfig"),".",Object(o.b)("a",{parentName:"em",href:"/docs/next/api/graphback-datasync/interfaces/_util_.globalconflictconfig#optional-enabled"},"enabled"))),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/0a237f8/packages/graphback-datasync/src/util.ts#L95"},"packages/graphback-datasync/src/util.ts:95"))),Object(o.b)("p",null,"Flag that enables conflict resolution"),Object(o.b)("hr",null),Object(o.b)("h3",{id:"optional-models"},Object(o.b)("inlineCode",{parentName:"h3"},"Optional")," models"),Object(o.b)("p",null,"\u2022 ",Object(o.b)("strong",{parentName:"p"},"models"),"? : ",Object(o.b)("em",{parentName:"p"},Object(o.b)("a",{parentName:"em",href:"/docs/next/api/graphback-datasync/interfaces/_util_.datasyncmodelconfigmap"},"DataSyncModelConfigMap"))),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/0a237f8/packages/graphback-datasync/src/util.ts#L43"},"packages/graphback-datasync/src/util.ts:43"))))}f.isMDXComponent=!0}}]);