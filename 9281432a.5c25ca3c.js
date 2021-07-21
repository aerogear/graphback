/*! For license information please see 9281432a.5c25ca3c.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[706],{1333:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var b=a.a.createContext({}),u=function(e){var t=a.a.useContext(b),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=u(e.components);return a.a.createElement(b.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,c=e.originalType,i=e.parentName,b=l(e,["components","mdxType","originalType","parentName"]),p=u(n),d=r,m=p["".concat(i,".").concat(d)]||p[d]||s[d]||c;return n?a.a.createElement(m,o(o({ref:t},b),{},{components:n})):a.a.createElement(m,o({ref:t},b))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var c=n.length,i=new Array(c);i[0]=d;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:r,i[1]=o;for(var b=2;b<c;b++)i[b]=n[b];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1334:function(e,t,n){"use strict";e.exports=n(1335)},1335:function(e,t,n){"use strict";var r=n(1336),a=60103,c=60106;t.Fragment=60107,t.StrictMode=60108,t.Profiler=60114;var i=60109,o=60110,l=60112;t.Suspense=60113;var b=60115,u=60116;if("function"==typeof Symbol&&Symbol.for){var p=Symbol.for;a=p("react.element"),c=p("react.portal"),t.Fragment=p("react.fragment"),t.StrictMode=p("react.strict_mode"),t.Profiler=p("react.profiler"),i=p("react.provider"),o=p("react.context"),l=p("react.forward_ref"),t.Suspense=p("react.suspense"),b=p("react.memo"),u=p("react.lazy")}var s="function"==typeof Symbol&&Symbol.iterator;function d(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var m={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},f={};function O(e,t,n){this.props=e,this.context=t,this.refs=f,this.updater=n||m}function j(){}function g(e,t,n){this.props=e,this.context=t,this.refs=f,this.updater=n||m}O.prototype.isReactComponent={},O.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(d(85));this.updater.enqueueSetState(this,e,t,"setState")},O.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},j.prototype=O.prototype;var y=g.prototype=new j;y.constructor=g,r(y,O.prototype),y.isPureReactComponent=!0;var h={current:null},N=Object.prototype.hasOwnProperty,x={key:!0,ref:!0,__self:!0,__source:!0};function v(e,t,n){var r,c={},i=null,o=null;if(null!=t)for(r in void 0!==t.ref&&(o=t.ref),void 0!==t.key&&(i=""+t.key),t)N.call(t,r)&&!x.hasOwnProperty(r)&&(c[r]=t[r]);var l=arguments.length-2;if(1===l)c.children=n;else if(1<l){for(var b=Array(l),u=0;u<l;u++)b[u]=arguments[u+2];c.children=b}if(e&&e.defaultProps)for(r in l=e.defaultProps)void 0===c[r]&&(c[r]=l[r]);return{$$typeof:a,type:e,key:i,ref:o,props:c,_owner:h.current}}function _(e){return"object"==typeof e&&null!==e&&e.$$typeof===a}var k=/\/+/g;function I(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function C(e,t,n,r,i){var o=typeof e;"undefined"!==o&&"boolean"!==o||(e=null);var l=!1;if(null===e)l=!0;else switch(o){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case a:case c:l=!0}}if(l)return i=i(l=e),e=""===r?"."+I(l,0):r,Array.isArray(i)?(n="",null!=e&&(n=e.replace(k,"$&/")+"/"),C(i,t,n,"",(function(e){return e}))):null!=i&&(_(i)&&(i=function(e,t){return{$$typeof:a,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(i,n+(!i.key||l&&l.key===i.key?"":(""+i.key).replace(k,"$&/")+"/")+e)),t.push(i)),1;if(l=0,r=""===r?".":r+":",Array.isArray(e))for(var b=0;b<e.length;b++){var u=r+I(o=e[b],b);l+=C(o,t,n,u,i)}else if("function"==typeof(u=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=s&&e[s]||e["@@iterator"])?e:null}(e)))for(e=u.call(e),b=0;!(o=e.next()).done;)l+=C(o=o.value,t,n,u=r+I(o,b++),i);else if("object"===o)throw t=""+e,Error(d(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return l}function w(e,t,n){if(null==e)return e;var r=[],a=0;return C(e,r,"","",(function(e){return t.call(n,e,a++)})),r}function P(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var S={current:null};function E(){var e=S.current;if(null===e)throw Error(d(321));return e}var R={ReactCurrentDispatcher:S,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:h,IsSomeRendererActing:{current:!1},assign:r};t.Children={map:w,forEach:function(e,t,n){w(e,(function(){t.apply(this,arguments)}),n)},count:function(e){var t=0;return w(e,(function(){t++})),t},toArray:function(e){return w(e,(function(e){return e}))||[]},only:function(e){if(!_(e))throw Error(d(143));return e}},t.Component=O,t.PureComponent=g,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=R,t.cloneElement=function(e,t,n){if(null==e)throw Error(d(267,e));var c=r({},e.props),i=e.key,o=e.ref,l=e._owner;if(null!=t){if(void 0!==t.ref&&(o=t.ref,l=h.current),void 0!==t.key&&(i=""+t.key),e.type&&e.type.defaultProps)var b=e.type.defaultProps;for(u in t)N.call(t,u)&&!x.hasOwnProperty(u)&&(c[u]=void 0===t[u]&&void 0!==b?b[u]:t[u])}var u=arguments.length-2;if(1===u)c.children=n;else if(1<u){b=Array(u);for(var p=0;p<u;p++)b[p]=arguments[p+2];c.children=b}return{$$typeof:a,type:e.type,key:i,ref:o,props:c,_owner:l}},t.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:o,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:i,_context:e},e.Consumer=e},t.createElement=v,t.createFactory=function(e){var t=v.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:l,render:e}},t.isValidElement=_,t.lazy=function(e){return{$$typeof:u,_payload:{_status:-1,_result:e},_init:P}},t.memo=function(e,t){return{$$typeof:b,type:e,compare:void 0===t?null:t}},t.useCallback=function(e,t){return E().useCallback(e,t)},t.useContext=function(e,t){return E().useContext(e,t)},t.useDebugValue=function(){},t.useEffect=function(e,t){return E().useEffect(e,t)},t.useImperativeHandle=function(e,t,n){return E().useImperativeHandle(e,t,n)},t.useLayoutEffect=function(e,t){return E().useLayoutEffect(e,t)},t.useMemo=function(e,t){return E().useMemo(e,t)},t.useReducer=function(e,t,n){return E().useReducer(e,t,n)},t.useRef=function(e){return E().useRef(e)},t.useState=function(e){return E().useState(e)},t.version="17.0.1"},1336:function(e,t,n){"use strict";var r=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,c=Object.prototype.propertyIsEnumerable;function i(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(a){return!1}}()?Object.assign:function(e,t){for(var n,o,l=i(e),b=1;b<arguments.length;b++){for(var u in n=Object(arguments[b]))a.call(n,u)&&(l[u]=n[u]);if(r){o=r(n);for(var p=0;p<o.length;p++)c.call(n,o[p])&&(l[o[p]]=n[o[p]])}}return l}},774:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return b})),n.d(t,"default",(function(){return p}));var r=n(3),a=n(7),c=(n(1334),n(1333)),i=["components"],o={id:"_utils_createindexes_",title:"utils/createIndexes",sidebar_label:"utils/createIndexes"},l={unversionedId:"api/graphback-runtime-mongodb/modules/_utils_createindexes_",id:"api/graphback-runtime-mongodb/modules/_utils_createindexes_",isDocsHomePage:!1,title:"utils/createIndexes",description:"Index",source:"@site/../docs/api/graphback-runtime-mongodb/modules/_utils_createindexes_.md",slug:"/api/graphback-runtime-mongodb/modules/_utils_createindexes_",permalink:"/docs/next/api/graphback-runtime-mongodb/modules/_utils_createindexes_",editUrl:"https://github.com/aerogear/graphback/edit/master/website/../docs/api/graphback-runtime-mongodb/modules/_utils_createindexes_.md",version:"current",sidebar_label:"utils/createIndexes"},b=[{value:"Index",id:"index",children:[{value:"Functions",id:"functions",children:[]}]},{value:"Functions",id:"functions-1",children:[{value:"applyIndexes",id:"applyindexes",children:[]},{value:"findAndCreateIndexes",id:"findandcreateindexes",children:[]},{value:"getCustomIndex",id:"getcustomindex",children:[]},{value:"getIndexFields",id:"getindexfields",children:[]},{value:"getRelationIndex",id:"getrelationindex",children:[]}]}],u={rightToc:b};function p(e){var t=e.components,n=Object(a.a)(e,i);return Object(c.b)("wrapper",Object(r.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(c.b)("h2",{id:"index"},"Index"),Object(c.b)("h3",{id:"functions"},"Functions"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-runtime-mongodb/modules/_utils_createindexes_#applyindexes"},"applyIndexes")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-runtime-mongodb/modules/_utils_createindexes_#findandcreateindexes"},"findAndCreateIndexes")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-runtime-mongodb/modules/_utils_createindexes_#getcustomindex"},"getCustomIndex")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-runtime-mongodb/modules/_utils_createindexes_#getindexfields"},"getIndexFields")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-runtime-mongodb/modules/_utils_createindexes_#getrelationindex"},"getRelationIndex"))),Object(c.b)("h2",{id:"functions-1"},"Functions"),Object(c.b)("h3",{id:"applyindexes"},"applyIndexes"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"applyIndexes"),"(",Object(c.b)("inlineCode",{parentName:"p"},"indexes"),": IndexSpecification[], ",Object(c.b)("inlineCode",{parentName:"p"},"collection"),": Collection): ",Object(c.b)("em",{parentName:"p"},"Promise\u2039void\u203a")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/3abc57c/packages/graphback-runtime-mongodb/src/utils/createIndexes.ts#L12"},"utils/createIndexes.ts:12"))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"indexes")),Object(c.b)("td",{parentName:"tr",align:null},"IndexSpecification[]")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"collection")),Object(c.b)("td",{parentName:"tr",align:null},"Collection")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"Promise\u2039void\u203a")),Object(c.b)("hr",null),Object(c.b)("h3",{id:"findandcreateindexes"},"findAndCreateIndexes"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"findAndCreateIndexes"),"(",Object(c.b)("inlineCode",{parentName:"p"},"baseType"),": GraphQLObjectType, ",Object(c.b)("inlineCode",{parentName:"p"},"collection"),": Collection): ",Object(c.b)("em",{parentName:"p"},"Promise\u2039void\u203a")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/3abc57c/packages/graphback-runtime-mongodb/src/utils/createIndexes.ts#L6"},"utils/createIndexes.ts:6"))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"baseType")),Object(c.b)("td",{parentName:"tr",align:null},"GraphQLObjectType")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"collection")),Object(c.b)("td",{parentName:"tr",align:null},"Collection")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"Promise\u2039void\u203a")),Object(c.b)("hr",null),Object(c.b)("h3",{id:"getcustomindex"},"getCustomIndex"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"getCustomIndex"),"(",Object(c.b)("inlineCode",{parentName:"p"},"field"),": GraphQLField\u2039any, any\u203a): ",Object(c.b)("em",{parentName:"p"},"IndexSpecification")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/3abc57c/packages/graphback-runtime-mongodb/src/utils/createIndexes.ts#L65"},"utils/createIndexes.ts:65"))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"field")),Object(c.b)("td",{parentName:"tr",align:null},"GraphQLField\u2039any, any\u203a")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"IndexSpecification")),Object(c.b)("hr",null),Object(c.b)("h3",{id:"getindexfields"},"getIndexFields"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"getIndexFields"),"(",Object(c.b)("inlineCode",{parentName:"p"},"baseType"),": GraphQLObjectType): ",Object(c.b)("em",{parentName:"p"},"IndexSpecification[]")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/3abc57c/packages/graphback-runtime-mongodb/src/utils/createIndexes.ts#L40"},"utils/createIndexes.ts:40"))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"baseType")),Object(c.b)("td",{parentName:"tr",align:null},"GraphQLObjectType")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"IndexSpecification[]")),Object(c.b)("hr",null),Object(c.b)("h3",{id:"getrelationindex"},"getRelationIndex"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"getRelationIndex"),"(",Object(c.b)("inlineCode",{parentName:"p"},"field"),": GraphQLField\u2039any, any\u203a): ",Object(c.b)("em",{parentName:"p"},"IndexSpecification")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/3abc57c/packages/graphback-runtime-mongodb/src/utils/createIndexes.ts#L80"},"utils/createIndexes.ts:80"))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"field")),Object(c.b)("td",{parentName:"tr",align:null},"GraphQLField\u2039any, any\u203a")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"IndexSpecification")))}p.isMDXComponent=!0}}]);