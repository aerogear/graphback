/*! For license information please see 200a735d.3e67d474.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[172],{1333:function(e,t,r){"use strict";r.d(t,"a",(function(){return p})),r.d(t,"b",(function(){return m}));var n=r(0),o=r.n(n);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=o.a.createContext({}),s=function(e){var t=o.a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},p=function(e){var t=s(e.components);return o.a.createElement(l.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},b=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,i=e.parentName,l=u(e,["components","mdxType","originalType","parentName"]),p=s(r),b=n,m=p["".concat(i,".").concat(b)]||p[b]||f[b]||a;return r?o.a.createElement(m,c(c({ref:t},l),{},{components:r})):o.a.createElement(m,c({ref:t},l))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,i=new Array(a);i[0]=b;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c.mdxType="string"==typeof e?e:n,i[1]=c;for(var l=2;l<a;l++)i[l]=r[l];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,r)}b.displayName="MDXCreateElement"},1334:function(e,t,r){"use strict";e.exports=r(1335)},1335:function(e,t,r){"use strict";var n=r(1336),o=60103,a=60106;t.Fragment=60107,t.StrictMode=60108,t.Profiler=60114;var i=60109,c=60110,u=60112;t.Suspense=60113;var l=60115,s=60116;if("function"==typeof Symbol&&Symbol.for){var p=Symbol.for;o=p("react.element"),a=p("react.portal"),t.Fragment=p("react.fragment"),t.StrictMode=p("react.strict_mode"),t.Profiler=p("react.profiler"),i=p("react.provider"),c=p("react.context"),u=p("react.forward_ref"),t.Suspense=p("react.suspense"),l=p("react.memo"),s=p("react.lazy")}var f="function"==typeof Symbol&&Symbol.iterator;function b(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var m={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},d={};function y(e,t,r){this.props=e,this.context=t,this.refs=d,this.updater=r||m}function h(){}function v(e,t,r){this.props=e,this.context=t,this.refs=d,this.updater=r||m}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(b(85));this.updater.enqueueSetState(this,e,t,"setState")},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},h.prototype=y.prototype;var O=v.prototype=new h;O.constructor=v,n(O,y.prototype),O.isPureReactComponent=!0;var j={current:null},g=Object.prototype.hasOwnProperty,_={key:!0,ref:!0,__self:!0,__source:!0};function w(e,t,r){var n,a={},i=null,c=null;if(null!=t)for(n in void 0!==t.ref&&(c=t.ref),void 0!==t.key&&(i=""+t.key),t)g.call(t,n)&&!_.hasOwnProperty(n)&&(a[n]=t[n]);var u=arguments.length-2;if(1===u)a.children=r;else if(1<u){for(var l=Array(u),s=0;s<u;s++)l[s]=arguments[s+2];a.children=l}if(e&&e.defaultProps)for(n in u=e.defaultProps)void 0===a[n]&&(a[n]=u[n]);return{$$typeof:o,type:e,key:i,ref:c,props:a,_owner:j.current}}function P(e){return"object"==typeof e&&null!==e&&e.$$typeof===o}var N=/\/+/g;function k(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function E(e,t,r,n,i){var c=typeof e;"undefined"!==c&&"boolean"!==c||(e=null);var u=!1;if(null===e)u=!0;else switch(c){case"string":case"number":u=!0;break;case"object":switch(e.$$typeof){case o:case a:u=!0}}if(u)return i=i(u=e),e=""===n?"."+k(u,0):n,Array.isArray(i)?(r="",null!=e&&(r=e.replace(N,"$&/")+"/"),E(i,t,r,"",(function(e){return e}))):null!=i&&(P(i)&&(i=function(e,t){return{$$typeof:o,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(i,r+(!i.key||u&&u.key===i.key?"":(""+i.key).replace(N,"$&/")+"/")+e)),t.push(i)),1;if(u=0,n=""===n?".":n+":",Array.isArray(e))for(var l=0;l<e.length;l++){var s=n+k(c=e[l],l);u+=E(c,t,r,s,i)}else if("function"==typeof(s=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=f&&e[f]||e["@@iterator"])?e:null}(e)))for(e=s.call(e),l=0;!(c=e.next()).done;)u+=E(c=c.value,t,r,s=n+k(c,l++),i);else if("object"===c)throw t=""+e,Error(b(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return u}function S(e,t,r){if(null==e)return e;var n=[],o=0;return E(e,n,"","",(function(e){return t.call(r,e,o++)})),n}function R(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var C={current:null};function x(){var e=C.current;if(null===e)throw Error(b(321));return e}var $={ReactCurrentDispatcher:C,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:j,IsSomeRendererActing:{current:!1},assign:n};t.Children={map:S,forEach:function(e,t,r){S(e,(function(){t.apply(this,arguments)}),r)},count:function(e){var t=0;return S(e,(function(){t++})),t},toArray:function(e){return S(e,(function(e){return e}))||[]},only:function(e){if(!P(e))throw Error(b(143));return e}},t.Component=y,t.PureComponent=v,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=$,t.cloneElement=function(e,t,r){if(null==e)throw Error(b(267,e));var a=n({},e.props),i=e.key,c=e.ref,u=e._owner;if(null!=t){if(void 0!==t.ref&&(c=t.ref,u=j.current),void 0!==t.key&&(i=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(s in t)g.call(t,s)&&!_.hasOwnProperty(s)&&(a[s]=void 0===t[s]&&void 0!==l?l[s]:t[s])}var s=arguments.length-2;if(1===s)a.children=r;else if(1<s){l=Array(s);for(var p=0;p<s;p++)l[p]=arguments[p+2];a.children=l}return{$$typeof:o,type:e.type,key:i,ref:c,props:a,_owner:u}},t.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:c,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:i,_context:e},e.Consumer=e},t.createElement=w,t.createFactory=function(e){var t=w.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:u,render:e}},t.isValidElement=P,t.lazy=function(e){return{$$typeof:s,_payload:{_status:-1,_result:e},_init:R}},t.memo=function(e,t){return{$$typeof:l,type:e,compare:void 0===t?null:t}},t.useCallback=function(e,t){return x().useCallback(e,t)},t.useContext=function(e,t){return x().useContext(e,t)},t.useDebugValue=function(){},t.useEffect=function(e,t){return x().useEffect(e,t)},t.useImperativeHandle=function(e,t,r){return x().useImperativeHandle(e,t,r)},t.useLayoutEffect=function(e,t){return x().useLayoutEffect(e,t)},t.useMemo=function(e,t){return x().useMemo(e,t)},t.useReducer=function(e,t,r){return x().useReducer(e,t,r)},t.useRef=function(e){return x().useRef(e)},t.useState=function(e){return x().useState(e)},t.version="17.0.1"},1336:function(e,t,r){"use strict";var n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable;function i(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(o){return!1}}()?Object.assign:function(e,t){for(var r,c,u=i(e),l=1;l<arguments.length;l++){for(var s in r=Object(arguments[l]))o.call(r,s)&&(u[s]=r[s]);if(n){c=n(r);for(var p=0;p<c.length;p++)a.call(r,c[p])&&(u[c[p]]=r[c[p]])}}return u}},239:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return c})),r.d(t,"rightToc",(function(){return u})),r.d(t,"default",(function(){return s}));var n=r(3),o=r(7),a=(r(1334),r(1333)),i={id:"_runtime_.runtime",title:"Runtime",sidebar_label:"Runtime"},c={unversionedId:"api/graphql-serve/interfaces/_runtime_.runtime",id:"api/graphql-serve/interfaces/_runtime_.runtime",isDocsHomePage:!1,title:"Runtime",description:"Hierarchy",source:"@site/../docs/api/graphql-serve/interfaces/_runtime_.runtime.md",slug:"/api/graphql-serve/interfaces/_runtime_.runtime",permalink:"/docs/next/api/graphql-serve/interfaces/_runtime_.runtime",editUrl:"https://github.com/aerogear/graphback/edit/master/website/../docs/api/graphql-serve/interfaces/_runtime_.runtime.md",version:"current",sidebar_label:"Runtime"},u=[{value:"Hierarchy",id:"hierarchy",children:[]},{value:"Index",id:"index",children:[{value:"Properties",id:"properties",children:[]}]},{value:"Properties",id:"properties-1",children:[{value:"resolvers",id:"resolvers",children:[]},{value:"schema",id:"schema",children:[]}]}],l={rightToc:u};function s(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},l,r,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h2",{id:"hierarchy"},"Hierarchy"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("strong",{parentName:"li"},"Runtime"))),Object(a.b)("h2",{id:"index"},"Index"),Object(a.b)("h3",{id:"properties"},"Properties"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object(n.a)({parentName:"li"},{href:"/docs/next/api/graphql-serve/interfaces/_runtime_.runtime#resolvers"}),"resolvers")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object(n.a)({parentName:"li"},{href:"/docs/next/api/graphql-serve/interfaces/_runtime_.runtime#schema"}),"schema"))),Object(a.b)("h2",{id:"properties-1"},"Properties"),Object(a.b)("h3",{id:"resolvers"},"resolvers"),Object(a.b)("p",null,"\u2022 ",Object(a.b)("strong",{parentName:"p"},"resolvers"),": ",Object(a.b)("em",{parentName:"p"},"object")),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"Defined in ",Object(a.b)("a",Object(n.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/514b9c0/packages/graphql-serve/src/runtime.ts#L28"}),"runtime.ts:28"))),Object(a.b)("h4",{id:"type-declaration"},"Type declaration:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},Object(a.b)("strong",{parentName:"p"},"Mutation"),": ",Object(a.b)("em",{parentName:"p"},"IResolverObject"))),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},Object(a.b)("strong",{parentName:"p"},"Query"),": ",Object(a.b)("em",{parentName:"p"},"IResolverObject"))),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},Object(a.b)("strong",{parentName:"p"},"Subscription"),": ",Object(a.b)("em",{parentName:"p"},"IResolverObject")))),Object(a.b)("hr",null),Object(a.b)("h3",{id:"schema"},"schema"),Object(a.b)("p",null,"\u2022 ",Object(a.b)("strong",{parentName:"p"},"schema"),": ",Object(a.b)("em",{parentName:"p"},"GraphQLSchema")),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"Defined in ",Object(a.b)("a",Object(n.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/514b9c0/packages/graphql-serve/src/runtime.ts#L27"}),"runtime.ts:27"))))}s.isMDXComponent=!0}}]);