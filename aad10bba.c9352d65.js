/*! For license information please see aad10bba.c9352d65.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[846],{1333:function(e,t,r){"use strict";r.d(t,"a",(function(){return b})),r.d(t,"b",(function(){return d}));var a=r(0),n=r.n(a);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var p=n.a.createContext({}),u=function(e){var t=n.a.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},b=function(e){var t=u(e.components);return n.a.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.a.createElement(n.a.Fragment,{},t)}},f=n.a.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),b=u(r),f=a,d=b["".concat(c,".").concat(f)]||b[f]||s[f]||o;return r?n.a.createElement(d,i(i({ref:t},p),{},{components:r})):n.a.createElement(d,i({ref:t},p))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,c=new Array(o);c[0]=f;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:a,c[1]=i;for(var p=2;p<o;p++)c[p]=r[p];return n.a.createElement.apply(null,c)}return n.a.createElement.apply(null,r)}f.displayName="MDXCreateElement"},1334:function(e,t,r){"use strict";e.exports=r(1335)},1335:function(e,t,r){"use strict";var a=r(1336),n=60103,o=60106;t.Fragment=60107,t.StrictMode=60108,t.Profiler=60114;var c=60109,i=60110,l=60112;t.Suspense=60113;var p=60115,u=60116;if("function"==typeof Symbol&&Symbol.for){var b=Symbol.for;n=b("react.element"),o=b("react.portal"),t.Fragment=b("react.fragment"),t.StrictMode=b("react.strict_mode"),t.Profiler=b("react.profiler"),c=b("react.provider"),i=b("react.context"),l=b("react.forward_ref"),t.Suspense=b("react.suspense"),p=b("react.memo"),u=b("react.lazy")}var s="function"==typeof Symbol&&Symbol.iterator;function f(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var d={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m={};function h(e,t,r){this.props=e,this.context=t,this.refs=m,this.updater=r||d}function y(){}function g(e,t,r){this.props=e,this.context=t,this.refs=m,this.updater=r||d}h.prototype.isReactComponent={},h.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(f(85));this.updater.enqueueSetState(this,e,t,"setState")},h.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},y.prototype=h.prototype;var _=g.prototype=new y;_.constructor=g,a(_,h.prototype),_.isPureReactComponent=!0;var O={current:null},j=Object.prototype.hasOwnProperty,v={key:!0,ref:!0,__self:!0,__source:!0};function k(e,t,r){var a,o={},c=null,i=null;if(null!=t)for(a in void 0!==t.ref&&(i=t.ref),void 0!==t.key&&(c=""+t.key),t)j.call(t,a)&&!v.hasOwnProperty(a)&&(o[a]=t[a]);var l=arguments.length-2;if(1===l)o.children=r;else if(1<l){for(var p=Array(l),u=0;u<l;u++)p[u]=arguments[u+2];o.children=p}if(e&&e.defaultProps)for(a in l=e.defaultProps)void 0===o[a]&&(o[a]=l[a]);return{$$typeof:n,type:e,key:c,ref:i,props:o,_owner:O.current}}function w(e){return"object"==typeof e&&null!==e&&e.$$typeof===n}var N=/\/+/g;function M(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function P(e,t,r,a,c){var i=typeof e;"undefined"!==i&&"boolean"!==i||(e=null);var l=!1;if(null===e)l=!0;else switch(i){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case n:case o:l=!0}}if(l)return c=c(l=e),e=""===a?"."+M(l,0):a,Array.isArray(c)?(r="",null!=e&&(r=e.replace(N,"$&/")+"/"),P(c,t,r,"",(function(e){return e}))):null!=c&&(w(c)&&(c=function(e,t){return{$$typeof:n,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(c,r+(!c.key||l&&l.key===c.key?"":(""+c.key).replace(N,"$&/")+"/")+e)),t.push(c)),1;if(l=0,a=""===a?".":a+":",Array.isArray(e))for(var p=0;p<e.length;p++){var u=a+M(i=e[p],p);l+=P(i,t,r,u,c)}else if("function"==typeof(u=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=s&&e[s]||e["@@iterator"])?e:null}(e)))for(e=u.call(e),p=0;!(i=e.next()).done;)l+=P(i=i.value,t,r,u=a+M(i,p++),c);else if("object"===i)throw t=""+e,Error(f(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return l}function E(e,t,r){if(null==e)return e;var a=[],n=0;return P(e,a,"","",(function(e){return t.call(r,e,n++)})),a}function C(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var S={current:null};function T(){var e=S.current;if(null===e)throw Error(f(321));return e}var x={ReactCurrentDispatcher:S,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:O,IsSomeRendererActing:{current:!1},assign:a};t.Children={map:E,forEach:function(e,t,r){E(e,(function(){t.apply(this,arguments)}),r)},count:function(e){var t=0;return E(e,(function(){t++})),t},toArray:function(e){return E(e,(function(e){return e}))||[]},only:function(e){if(!w(e))throw Error(f(143));return e}},t.Component=h,t.PureComponent=g,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=x,t.cloneElement=function(e,t,r){if(null==e)throw Error(f(267,e));var o=a({},e.props),c=e.key,i=e.ref,l=e._owner;if(null!=t){if(void 0!==t.ref&&(i=t.ref,l=O.current),void 0!==t.key&&(c=""+t.key),e.type&&e.type.defaultProps)var p=e.type.defaultProps;for(u in t)j.call(t,u)&&!v.hasOwnProperty(u)&&(o[u]=void 0===t[u]&&void 0!==p?p[u]:t[u])}var u=arguments.length-2;if(1===u)o.children=r;else if(1<u){p=Array(u);for(var b=0;b<u;b++)p[b]=arguments[b+2];o.children=p}return{$$typeof:n,type:e.type,key:c,ref:i,props:o,_owner:l}},t.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:i,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:c,_context:e},e.Consumer=e},t.createElement=k,t.createFactory=function(e){var t=k.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:l,render:e}},t.isValidElement=w,t.lazy=function(e){return{$$typeof:u,_payload:{_status:-1,_result:e},_init:C}},t.memo=function(e,t){return{$$typeof:p,type:e,compare:void 0===t?null:t}},t.useCallback=function(e,t){return T().useCallback(e,t)},t.useContext=function(e,t){return T().useContext(e,t)},t.useDebugValue=function(){},t.useEffect=function(e,t){return T().useEffect(e,t)},t.useImperativeHandle=function(e,t,r){return T().useImperativeHandle(e,t,r)},t.useLayoutEffect=function(e,t){return T().useLayoutEffect(e,t)},t.useMemo=function(e,t){return T().useMemo(e,t)},t.useReducer=function(e,t,r){return T().useReducer(e,t,r)},t.useRef=function(e){return T().useRef(e)},t.useState=function(e){return T().useState(e)},t.version="17.0.1"},1336:function(e,t,r){"use strict";var a=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;function c(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var a={};return"abcdefghijklmnopqrst".split("").forEach((function(e){a[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},a)).join("")}catch(n){return!1}}()?Object.assign:function(e,t){for(var r,i,l=c(e),p=1;p<arguments.length;p++){for(var u in r=Object(arguments[p]))n.call(r,u)&&(l[u]=r[u]);if(a){i=a(r);for(var b=0;b<i.length;b++)o.call(r,i[b])&&(l[i[b]]=r[i[b]])}}return l}},913:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return l})),r.d(t,"rightToc",(function(){return p})),r.d(t,"default",(function(){return b}));var a=r(3),n=r(7),o=(r(1334),r(1333)),c=["components"],i={id:"_packages_graphback_core_src_db_buildmodeltablemap_.modeltablemap",title:"ModelTableMap",sidebar_label:"ModelTableMap"},l={unversionedId:"api/graphback-core/interfaces/_packages_graphback_core_src_db_buildmodeltablemap_.modeltablemap",id:"api/graphback-core/interfaces/_packages_graphback_core_src_db_buildmodeltablemap_.modeltablemap",isDocsHomePage:!1,title:"ModelTableMap",description:"Contains mapping information between GraphQL Model type and database table",source:"@site/../docs/api/graphback-core/interfaces/_packages_graphback_core_src_db_buildmodeltablemap_.modeltablemap.md",slug:"/api/graphback-core/interfaces/_packages_graphback_core_src_db_buildmodeltablemap_.modeltablemap",permalink:"/docs/next/api/graphback-core/interfaces/_packages_graphback_core_src_db_buildmodeltablemap_.modeltablemap",editUrl:"https://github.com/aerogear/graphback/edit/master/website/../docs/api/graphback-core/interfaces/_packages_graphback_core_src_db_buildmodeltablemap_.modeltablemap.md",version:"current",sidebar_label:"ModelTableMap"},p=[{value:"Hierarchy",id:"hierarchy",children:[]},{value:"Index",id:"index",children:[{value:"Properties",id:"properties",children:[]}]},{value:"Properties",id:"properties-1",children:[{value:"<code>Optional</code> fieldMap",id:"optional-fieldmap",children:[]},{value:"idField",id:"idfield",children:[]},{value:"tableName",id:"tablename",children:[]},{value:"typeName",id:"typename",children:[]}]}],u={rightToc:p};function b(e){var t=e.components,r=Object(n.a)(e,c);return Object(o.b)("wrapper",Object(a.a)({},u,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Contains mapping information between GraphQL Model type and database table"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"typeName: Original GraphQLObjectType name"),Object(o.b)("li",{parentName:"ul"},"tableName: Name of datase table"),Object(o.b)("li",{parentName:"ul"},"id: Indicates the primary key field"),Object(o.b)("li",{parentName:"ul"},"fieldMap: Object of key-value mapping between GraphQL fields and database columns.")),Object(o.b)("h2",{id:"hierarchy"},"Hierarchy"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("strong",{parentName:"li"},"ModelTableMap"))),Object(o.b)("h2",{id:"index"},"Index"),Object(o.b)("h3",{id:"properties"},"Properties"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"/docs/next/api/graphback-core/interfaces/_packages_graphback_core_src_db_buildmodeltablemap_.modeltablemap#optional-fieldmap"},"fieldMap")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"/docs/next/api/graphback-core/interfaces/_packages_graphback_core_src_db_buildmodeltablemap_.modeltablemap#idfield"},"idField")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"/docs/next/api/graphback-core/interfaces/_packages_graphback_core_src_db_buildmodeltablemap_.modeltablemap#tablename"},"tableName")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"/docs/next/api/graphback-core/interfaces/_packages_graphback_core_src_db_buildmodeltablemap_.modeltablemap#typename"},"typeName"))),Object(o.b)("h2",{id:"properties-1"},"Properties"),Object(o.b)("h3",{id:"optional-fieldmap"},Object(o.b)("inlineCode",{parentName:"h3"},"Optional")," fieldMap"),Object(o.b)("p",null,"\u2022 ",Object(o.b)("strong",{parentName:"p"},"fieldMap"),"? : ",Object(o.b)("em",{parentName:"p"},"object")),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/3abc57c/packages/graphback-core/src/db/buildModelTableMap.ts#L18"},"packages/graphback-core/src/db/buildModelTableMap.ts:18"))),Object(o.b)("h4",{id:"type-declaration"},"Type declaration:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"["," ",Object(o.b)("strong",{parentName:"li"},"key"),": ",Object(o.b)("em",{parentName:"li"},"string"),"]",": string")),Object(o.b)("hr",null),Object(o.b)("h3",{id:"idfield"},"idField"),Object(o.b)("p",null,"\u2022 ",Object(o.b)("strong",{parentName:"p"},"idField"),": ",Object(o.b)("em",{parentName:"p"},"string")),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/3abc57c/packages/graphback-core/src/db/buildModelTableMap.ts#L17"},"packages/graphback-core/src/db/buildModelTableMap.ts:17"))),Object(o.b)("hr",null),Object(o.b)("h3",{id:"tablename"},"tableName"),Object(o.b)("p",null,"\u2022 ",Object(o.b)("strong",{parentName:"p"},"tableName"),": ",Object(o.b)("em",{parentName:"p"},"string")),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/3abc57c/packages/graphback-core/src/db/buildModelTableMap.ts#L16"},"packages/graphback-core/src/db/buildModelTableMap.ts:16"))),Object(o.b)("hr",null),Object(o.b)("h3",{id:"typename"},"typeName"),Object(o.b)("p",null,"\u2022 ",Object(o.b)("strong",{parentName:"p"},"typeName"),": ",Object(o.b)("em",{parentName:"p"},"string")),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/3abc57c/packages/graphback-core/src/db/buildModelTableMap.ts#L15"},"packages/graphback-core/src/db/buildModelTableMap.ts:15"))))}b.isMDXComponent=!0}}]);