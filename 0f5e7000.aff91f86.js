/*! For license information please see 0f5e7000.aff91f86.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[75],{1333:function(e,t,r){"use strict";r.d(t,"a",(function(){return f})),r.d(t,"b",(function(){return d}));var n=r(0),a=r.n(n);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=a.a.createContext({}),l=function(e){var t=a.a.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},f=function(e){var t=l(e.components);return a.a.createElement(u.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},b=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),f=l(r),b=n,d=f["".concat(i,".").concat(b)]||f[b]||s[b]||o;return r?a.a.createElement(d,c(c({ref:t},u),{},{components:r})):a.a.createElement(d,c({ref:t},u))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=b;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c.mdxType="string"==typeof e?e:n,i[1]=c;for(var u=2;u<o;u++)i[u]=r[u];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,r)}b.displayName="MDXCreateElement"},1334:function(e,t,r){"use strict";e.exports=r(1335)},1335:function(e,t,r){"use strict";var n=r(1336),a=60103,o=60106;t.Fragment=60107,t.StrictMode=60108,t.Profiler=60114;var i=60109,c=60110,p=60112;t.Suspense=60113;var u=60115,l=60116;if("function"==typeof Symbol&&Symbol.for){var f=Symbol.for;a=f("react.element"),o=f("react.portal"),t.Fragment=f("react.fragment"),t.StrictMode=f("react.strict_mode"),t.Profiler=f("react.profiler"),i=f("react.provider"),c=f("react.context"),p=f("react.forward_ref"),t.Suspense=f("react.suspense"),u=f("react.memo"),l=f("react.lazy")}var s="function"==typeof Symbol&&Symbol.iterator;function b(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var d={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m={};function O(e,t,r){this.props=e,this.context=t,this.refs=m,this.updater=r||d}function h(){}function y(e,t,r){this.props=e,this.context=t,this.refs=m,this.updater=r||d}O.prototype.isReactComponent={},O.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(b(85));this.updater.enqueueSetState(this,e,t,"setState")},O.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},h.prototype=O.prototype;var j=y.prototype=new h;j.constructor=y,n(j,O.prototype),j.isPureReactComponent=!0;var g={current:null},_=Object.prototype.hasOwnProperty,v={key:!0,ref:!0,__self:!0,__source:!0};function N(e,t,r){var n,o={},i=null,c=null;if(null!=t)for(n in void 0!==t.ref&&(c=t.ref),void 0!==t.key&&(i=""+t.key),t)_.call(t,n)&&!v.hasOwnProperty(n)&&(o[n]=t[n]);var p=arguments.length-2;if(1===p)o.children=r;else if(1<p){for(var u=Array(p),l=0;l<p;l++)u[l]=arguments[l+2];o.children=u}if(e&&e.defaultProps)for(n in p=e.defaultProps)void 0===o[n]&&(o[n]=p[n]);return{$$typeof:a,type:e,key:i,ref:c,props:o,_owner:g.current}}function w(e){return"object"==typeof e&&null!==e&&e.$$typeof===a}var q=/\/+/g;function x(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function k(e,t,r,n,i){var c=typeof e;"undefined"!==c&&"boolean"!==c||(e=null);var p=!1;if(null===e)p=!0;else switch(c){case"string":case"number":p=!0;break;case"object":switch(e.$$typeof){case a:case o:p=!0}}if(p)return i=i(p=e),e=""===n?"."+x(p,0):n,Array.isArray(i)?(r="",null!=e&&(r=e.replace(q,"$&/")+"/"),k(i,t,r,"",(function(e){return e}))):null!=i&&(w(i)&&(i=function(e,t){return{$$typeof:a,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(i,r+(!i.key||p&&p.key===i.key?"":(""+i.key).replace(q,"$&/")+"/")+e)),t.push(i)),1;if(p=0,n=""===n?".":n+":",Array.isArray(e))for(var u=0;u<e.length;u++){var l=n+x(c=e[u],u);p+=k(c,t,r,l,i)}else if("function"==typeof(l=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=s&&e[s]||e["@@iterator"])?e:null}(e)))for(e=l.call(e),u=0;!(c=e.next()).done;)p+=k(c=c.value,t,r,l=n+x(c,u++),i);else if("object"===c)throw t=""+e,Error(b(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return p}function P(e,t,r){if(null==e)return e;var n=[],a=0;return k(e,n,"","",(function(e){return t.call(r,e,a++)})),n}function E(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var S={current:null};function C(){var e=S.current;if(null===e)throw Error(b(321));return e}var $={ReactCurrentDispatcher:S,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:g,IsSomeRendererActing:{current:!1},assign:n};t.Children={map:P,forEach:function(e,t,r){P(e,(function(){t.apply(this,arguments)}),r)},count:function(e){var t=0;return P(e,(function(){t++})),t},toArray:function(e){return P(e,(function(e){return e}))||[]},only:function(e){if(!w(e))throw Error(b(143));return e}},t.Component=O,t.PureComponent=y,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=$,t.cloneElement=function(e,t,r){if(null==e)throw Error(b(267,e));var o=n({},e.props),i=e.key,c=e.ref,p=e._owner;if(null!=t){if(void 0!==t.ref&&(c=t.ref,p=g.current),void 0!==t.key&&(i=""+t.key),e.type&&e.type.defaultProps)var u=e.type.defaultProps;for(l in t)_.call(t,l)&&!v.hasOwnProperty(l)&&(o[l]=void 0===t[l]&&void 0!==u?u[l]:t[l])}var l=arguments.length-2;if(1===l)o.children=r;else if(1<l){u=Array(l);for(var f=0;f<l;f++)u[f]=arguments[f+2];o.children=u}return{$$typeof:a,type:e.type,key:i,ref:c,props:o,_owner:p}},t.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:c,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:i,_context:e},e.Consumer=e},t.createElement=N,t.createFactory=function(e){var t=N.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:p,render:e}},t.isValidElement=w,t.lazy=function(e){return{$$typeof:l,_payload:{_status:-1,_result:e},_init:E}},t.memo=function(e,t){return{$$typeof:u,type:e,compare:void 0===t?null:t}},t.useCallback=function(e,t){return C().useCallback(e,t)},t.useContext=function(e,t){return C().useContext(e,t)},t.useDebugValue=function(){},t.useEffect=function(e,t){return C().useEffect(e,t)},t.useImperativeHandle=function(e,t,r){return C().useImperativeHandle(e,t,r)},t.useLayoutEffect=function(e,t){return C().useLayoutEffect(e,t)},t.useMemo=function(e,t){return C().useMemo(e,t)},t.useReducer=function(e,t,r){return C().useReducer(e,t,r)},t.useRef=function(e){return C().useRef(e)},t.useState=function(e){return C().useState(e)},t.version="17.0.1"},1336:function(e,t,r){"use strict";var n=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;function i(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(a){return!1}}()?Object.assign:function(e,t){for(var r,c,p=i(e),u=1;u<arguments.length;u++){for(var l in r=Object(arguments[u]))a.call(r,l)&&(p[l]=r[l]);if(n){c=n(r);for(var f=0;f<c.length;f++)o.call(r,c[f])&&(p[c[f]]=r[c[f]])}}return p}},139:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return c})),r.d(t,"rightToc",(function(){return p})),r.d(t,"default",(function(){return l}));var n=r(3),a=r(7),o=(r(1334),r(1333)),i={id:"_diff_operation_.tableuniquedropoperation",title:"TableUniqueDropOperation",sidebar_label:"TableUniqueDropOperation"},c={unversionedId:"api/graphql-migrations/interfaces/_diff_operation_.tableuniquedropoperation",id:"api/graphql-migrations/interfaces/_diff_operation_.tableuniquedropoperation",isDocsHomePage:!1,title:"TableUniqueDropOperation",description:"Hierarchy",source:"@site/../docs/api/graphql-migrations/interfaces/_diff_operation_.tableuniquedropoperation.md",slug:"/api/graphql-migrations/interfaces/_diff_operation_.tableuniquedropoperation",permalink:"/docs/next/api/graphql-migrations/interfaces/_diff_operation_.tableuniquedropoperation",editUrl:"https://github.com/aerogear/graphback/edit/master/website/../docs/api/graphql-migrations/interfaces/_diff_operation_.tableuniquedropoperation.md",version:"current",sidebar_label:"TableUniqueDropOperation"},p=[{value:"Hierarchy",id:"hierarchy",children:[]},{value:"Index",id:"index",children:[{value:"Properties",id:"properties",children:[]}]},{value:"Properties",id:"properties-1",children:[{value:"columns",id:"columns",children:[]},{value:"indexName",id:"indexname",children:[]},{value:"priority",id:"priority",children:[]},{value:"table",id:"table",children:[]},{value:"type",id:"type",children:[]}]}],u={rightToc:p};function l(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},u,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"hierarchy"},"Hierarchy"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"/docs/next/api/graphql-migrations/interfaces/_diff_operation_.operation"}),"Operation")),Object(o.b)("p",{parentName:"li"},"\u21b3 ",Object(o.b)("strong",{parentName:"p"},"TableUniqueDropOperation")))),Object(o.b)("h2",{id:"index"},"Index"),Object(o.b)("h3",{id:"properties"},"Properties"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"/docs/next/api/graphql-migrations/interfaces/_diff_operation_.tableuniquedropoperation#columns"}),"columns")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"/docs/next/api/graphql-migrations/interfaces/_diff_operation_.tableuniquedropoperation#indexname"}),"indexName")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"/docs/next/api/graphql-migrations/interfaces/_diff_operation_.tableuniquedropoperation#priority"}),"priority")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"/docs/next/api/graphql-migrations/interfaces/_diff_operation_.tableuniquedropoperation#table"}),"table")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"/docs/next/api/graphql-migrations/interfaces/_diff_operation_.tableuniquedropoperation#type"}),"type"))),Object(o.b)("h2",{id:"properties-1"},"Properties"),Object(o.b)("h3",{id:"columns"},"columns"),Object(o.b)("p",null,"\u2022 ",Object(o.b)("strong",{parentName:"p"},"columns"),": ",Object(o.b)("em",{parentName:"p"},"string[]")),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",Object(n.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/514b9c0/packages/graphql-migrations/src/diff/Operation.ts#L92"}),"diff/Operation.ts:92"))),Object(o.b)("hr",null),Object(o.b)("h3",{id:"indexname"},"indexName"),Object(o.b)("p",null,"\u2022 ",Object(o.b)("strong",{parentName:"p"},"indexName"),": ",Object(o.b)("em",{parentName:"p"},"string | undefined")),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",Object(n.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/514b9c0/packages/graphql-migrations/src/diff/Operation.ts#L93"}),"diff/Operation.ts:93"))),Object(o.b)("hr",null),Object(o.b)("h3",{id:"priority"},"priority"),Object(o.b)("p",null,"\u2022 ",Object(o.b)("strong",{parentName:"p"},"priority"),": ",Object(o.b)("em",{parentName:"p"},"number")),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Inherited from ",Object(o.b)("a",Object(n.a)({parentName:"em"},{href:"/docs/next/api/graphql-migrations/interfaces/_diff_operation_.operation"}),"Operation"),".",Object(o.b)("a",Object(n.a)({parentName:"em"},{href:"/docs/next/api/graphql-migrations/interfaces/_diff_operation_.operation#priority"}),"priority"))),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",Object(n.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/514b9c0/packages/graphql-migrations/src/diff/Operation.ts#L23"}),"diff/Operation.ts:23"))),Object(o.b)("hr",null),Object(o.b)("h3",{id:"table"},"table"),Object(o.b)("p",null,"\u2022 ",Object(o.b)("strong",{parentName:"p"},"table"),": ",Object(o.b)("em",{parentName:"p"},"string")),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",Object(n.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/514b9c0/packages/graphql-migrations/src/diff/Operation.ts#L91"}),"diff/Operation.ts:91"))),Object(o.b)("hr",null),Object(o.b)("h3",{id:"type"},"type"),Object(o.b)("p",null,"\u2022 ",Object(o.b)("strong",{parentName:"p"},"type"),": ",Object(o.b)("em",{parentName:"p"},'"table.unique.drop"')),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Overrides ",Object(o.b)("a",Object(n.a)({parentName:"em"},{href:"/docs/next/api/graphql-migrations/interfaces/_diff_operation_.operation"}),"Operation"),".",Object(o.b)("a",Object(n.a)({parentName:"em"},{href:"/docs/next/api/graphql-migrations/interfaces/_diff_operation_.operation#type"}),"type"))),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",Object(n.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/514b9c0/packages/graphql-migrations/src/diff/Operation.ts#L90"}),"diff/Operation.ts:90"))))}l.isMDXComponent=!0}}]);