/*! For license information please see 4f0d7663.021896d6.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[395],{1333:function(e,t,r){"use strict";r.d(t,"a",(function(){return p})),r.d(t,"b",(function(){return d}));var n=r(0),a=r.n(n);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=a.a.createContext({}),s=function(e){var t=a.a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},p=function(e){var t=s(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},b=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,o=e.parentName,l=u(e,["components","mdxType","originalType","parentName"]),p=s(r),b=n,d=p["".concat(o,".").concat(b)]||p[b]||f[b]||i;return r?a.a.createElement(d,c(c({ref:t},l),{},{components:r})):a.a.createElement(d,c({ref:t},l))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,o=new Array(i);o[0]=b;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c.mdxType="string"==typeof e?e:n,o[1]=c;for(var l=2;l<i;l++)o[l]=r[l];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,r)}b.displayName="MDXCreateElement"},1334:function(e,t,r){"use strict";e.exports=r(1335)},1335:function(e,t,r){"use strict";var n=r(1336),a=60103,i=60106;t.Fragment=60107,t.StrictMode=60108,t.Profiler=60114;var o=60109,c=60110,u=60112;t.Suspense=60113;var l=60115,s=60116;if("function"==typeof Symbol&&Symbol.for){var p=Symbol.for;a=p("react.element"),i=p("react.portal"),t.Fragment=p("react.fragment"),t.StrictMode=p("react.strict_mode"),t.Profiler=p("react.profiler"),o=p("react.provider"),c=p("react.context"),u=p("react.forward_ref"),t.Suspense=p("react.suspense"),l=p("react.memo"),s=p("react.lazy")}var f="function"==typeof Symbol&&Symbol.iterator;function b(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var d={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m={};function g(e,t,r){this.props=e,this.context=t,this.refs=m,this.updater=r||d}function h(){}function O(e,t,r){this.props=e,this.context=t,this.refs=m,this.updater=r||d}g.prototype.isReactComponent={},g.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(b(85));this.updater.enqueueSetState(this,e,t,"setState")},g.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},h.prototype=g.prototype;var y=O.prototype=new h;y.constructor=O,n(y,g.prototype),y.isPureReactComponent=!0;var j={current:null},v=Object.prototype.hasOwnProperty,_={key:!0,ref:!0,__self:!0,__source:!0};function w(e,t,r){var n,i={},o=null,c=null;if(null!=t)for(n in void 0!==t.ref&&(c=t.ref),void 0!==t.key&&(o=""+t.key),t)v.call(t,n)&&!_.hasOwnProperty(n)&&(i[n]=t[n]);var u=arguments.length-2;if(1===u)i.children=r;else if(1<u){for(var l=Array(u),s=0;s<u;s++)l[s]=arguments[s+2];i.children=l}if(e&&e.defaultProps)for(n in u=e.defaultProps)void 0===i[n]&&(i[n]=u[n]);return{$$typeof:a,type:e,key:o,ref:c,props:i,_owner:j.current}}function x(e){return"object"==typeof e&&null!==e&&e.$$typeof===a}var N=/\/+/g;function P(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function S(e,t,r,n,o){var c=typeof e;"undefined"!==c&&"boolean"!==c||(e=null);var u=!1;if(null===e)u=!0;else switch(c){case"string":case"number":u=!0;break;case"object":switch(e.$$typeof){case a:case i:u=!0}}if(u)return o=o(u=e),e=""===n?"."+P(u,0):n,Array.isArray(o)?(r="",null!=e&&(r=e.replace(N,"$&/")+"/"),S(o,t,r,"",(function(e){return e}))):null!=o&&(x(o)&&(o=function(e,t){return{$$typeof:a,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(o,r+(!o.key||u&&u.key===o.key?"":(""+o.key).replace(N,"$&/")+"/")+e)),t.push(o)),1;if(u=0,n=""===n?".":n+":",Array.isArray(e))for(var l=0;l<e.length;l++){var s=n+P(c=e[l],l);u+=S(c,t,r,s,o)}else if("function"==typeof(s=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=f&&e[f]||e["@@iterator"])?e:null}(e)))for(e=s.call(e),l=0;!(c=e.next()).done;)u+=S(c=c.value,t,r,s=n+P(c,l++),o);else if("object"===c)throw t=""+e,Error(b(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return u}function E(e,t,r){if(null==e)return e;var n=[],a=0;return S(e,n,"","",(function(e){return t.call(r,e,a++)})),n}function k(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var C={current:null};function D(){var e=C.current;if(null===e)throw Error(b(321));return e}var R={ReactCurrentDispatcher:C,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:j,IsSomeRendererActing:{current:!1},assign:n};t.Children={map:E,forEach:function(e,t,r){E(e,(function(){t.apply(this,arguments)}),r)},count:function(e){var t=0;return E(e,(function(){t++})),t},toArray:function(e){return E(e,(function(e){return e}))||[]},only:function(e){if(!x(e))throw Error(b(143));return e}},t.Component=g,t.PureComponent=O,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=R,t.cloneElement=function(e,t,r){if(null==e)throw Error(b(267,e));var i=n({},e.props),o=e.key,c=e.ref,u=e._owner;if(null!=t){if(void 0!==t.ref&&(c=t.ref,u=j.current),void 0!==t.key&&(o=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(s in t)v.call(t,s)&&!_.hasOwnProperty(s)&&(i[s]=void 0===t[s]&&void 0!==l?l[s]:t[s])}var s=arguments.length-2;if(1===s)i.children=r;else if(1<s){l=Array(s);for(var p=0;p<s;p++)l[p]=arguments[p+2];i.children=l}return{$$typeof:a,type:e.type,key:o,ref:c,props:i,_owner:u}},t.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:c,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:o,_context:e},e.Consumer=e},t.createElement=w,t.createFactory=function(e){var t=w.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:u,render:e}},t.isValidElement=x,t.lazy=function(e){return{$$typeof:s,_payload:{_status:-1,_result:e},_init:k}},t.memo=function(e,t){return{$$typeof:l,type:e,compare:void 0===t?null:t}},t.useCallback=function(e,t){return D().useCallback(e,t)},t.useContext=function(e,t){return D().useContext(e,t)},t.useDebugValue=function(){},t.useEffect=function(e,t){return D().useEffect(e,t)},t.useImperativeHandle=function(e,t,r){return D().useImperativeHandle(e,t,r)},t.useLayoutEffect=function(e,t){return D().useLayoutEffect(e,t)},t.useMemo=function(e,t){return D().useMemo(e,t)},t.useReducer=function(e,t,r){return D().useReducer(e,t,r)},t.useRef=function(e){return D().useRef(e)},t.useState=function(e){return D().useState(e)},t.version="17.0.1"},1336:function(e,t,r){"use strict";var n=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;function o(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(a){return!1}}()?Object.assign:function(e,t){for(var r,c,u=o(e),l=1;l<arguments.length;l++){for(var s in r=Object(arguments[l]))a.call(r,s)&&(u[s]=r[s]);if(n){c=n(r);for(var p=0;p<c.length;p++)i.call(r,c[p])&&(u[c[p]]=r[c[p]])}}return u}},462:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return c})),r.d(t,"metadata",(function(){return u})),r.d(t,"rightToc",(function(){return l})),r.d(t,"default",(function(){return p}));var n=r(3),a=r(7),i=(r(1334),r(1333)),o=["components"],c={id:"_index_",title:"index",sidebar_label:"index"},u={unversionedId:"api/graphql-migrations/modules/_index_",id:"api/graphql-migrations/modules/_index_",isDocsHomePage:!1,title:"index",description:"Index",source:"@site/../docs/api/graphql-migrations/modules/_index_.md",slug:"/api/graphql-migrations/modules/_index_",permalink:"/docs/next/api/graphql-migrations/modules/_index_",editUrl:"https://github.com/aerogear/graphback/edit/master/website/../docs/api/graphql-migrations/modules/_index_.md",version:"current",sidebar_label:"index"},l=[{value:"Index",id:"index",children:[{value:"References",id:"references",children:[]}]},{value:"References",id:"references-1",children:[{value:"MigrateOperationFilter",id:"migrateoperationfilter",children:[]},{value:"MigrateOptions",id:"migrateoptions",children:[]},{value:"MigratePlugin",id:"migrateplugin",children:[]},{value:"WriteParams",id:"writeparams",children:[]},{value:"computeDiff",id:"computediff",children:[]},{value:"generateAbstractDatabase",id:"generateabstractdatabase",children:[]},{value:"migrateDB",id:"migratedb",children:[]},{value:"read",id:"read",children:[]},{value:"removeNonSafeOperationsFilter",id:"removenonsafeoperationsfilter",children:[]},{value:"write",id:"write",children:[]}]}],s={rightToc:l};function p(e){var t=e.components,r=Object(a.a)(e,o);return Object(i.b)("wrapper",Object(n.a)({},s,r,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"index"},"Index"),Object(i.b)("h3",{id:"references"},"References"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"/docs/next/api/graphql-migrations/modules/_index_#migrateoperationfilter"},"MigrateOperationFilter")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"/docs/next/api/graphql-migrations/modules/_index_#migrateoptions"},"MigrateOptions")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"/docs/next/api/graphql-migrations/modules/_index_#migrateplugin"},"MigratePlugin")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"/docs/next/api/graphql-migrations/modules/_index_#writeparams"},"WriteParams")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"/docs/next/api/graphql-migrations/modules/_index_#computediff"},"computeDiff")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"/docs/next/api/graphql-migrations/modules/_index_#generateabstractdatabase"},"generateAbstractDatabase")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"/docs/next/api/graphql-migrations/modules/_index_#migratedb"},"migrateDB")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"/docs/next/api/graphql-migrations/modules/_index_#read"},"read")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"/docs/next/api/graphql-migrations/modules/_index_#removenonsafeoperationsfilter"},"removeNonSafeOperationsFilter")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"/docs/next/api/graphql-migrations/modules/_index_#write"},"write"))),Object(i.b)("h2",{id:"references-1"},"References"),Object(i.b)("h3",{id:"migrateoperationfilter"},"MigrateOperationFilter"),Object(i.b)("p",null,"\u2022 ",Object(i.b)("strong",{parentName:"p"},"MigrateOperationFilter"),":"),Object(i.b)("hr",null),Object(i.b)("h3",{id:"migrateoptions"},"MigrateOptions"),Object(i.b)("p",null,"\u2022 ",Object(i.b)("strong",{parentName:"p"},"MigrateOptions"),":"),Object(i.b)("hr",null),Object(i.b)("h3",{id:"migrateplugin"},"MigratePlugin"),Object(i.b)("p",null,"\u2022 ",Object(i.b)("strong",{parentName:"p"},"MigratePlugin"),":"),Object(i.b)("hr",null),Object(i.b)("h3",{id:"writeparams"},"WriteParams"),Object(i.b)("p",null,"\u2022 ",Object(i.b)("strong",{parentName:"p"},"WriteParams"),":"),Object(i.b)("hr",null),Object(i.b)("h3",{id:"computediff"},"computeDiff"),Object(i.b)("p",null,"\u2022 ",Object(i.b)("strong",{parentName:"p"},"computeDiff"),":"),Object(i.b)("hr",null),Object(i.b)("h3",{id:"generateabstractdatabase"},"generateAbstractDatabase"),Object(i.b)("p",null,"\u2022 ",Object(i.b)("strong",{parentName:"p"},"generateAbstractDatabase"),":"),Object(i.b)("hr",null),Object(i.b)("h3",{id:"migratedb"},"migrateDB"),Object(i.b)("p",null,"\u2022 ",Object(i.b)("strong",{parentName:"p"},"migrateDB"),":"),Object(i.b)("hr",null),Object(i.b)("h3",{id:"read"},"read"),Object(i.b)("p",null,"\u2022 ",Object(i.b)("strong",{parentName:"p"},"read"),":"),Object(i.b)("hr",null),Object(i.b)("h3",{id:"removenonsafeoperationsfilter"},"removeNonSafeOperationsFilter"),Object(i.b)("p",null,"\u2022 ",Object(i.b)("strong",{parentName:"p"},"removeNonSafeOperationsFilter"),":"),Object(i.b)("hr",null),Object(i.b)("h3",{id:"write"},"write"),Object(i.b)("p",null,"\u2022 ",Object(i.b)("strong",{parentName:"p"},"write"),":"))}p.isMDXComponent=!0}}]);