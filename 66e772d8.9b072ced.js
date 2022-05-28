/*! For license information please see 66e772d8.9b072ced.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[514],{1333:function(e,t,r){"use strict";r.d(t,"a",(function(){return s})),r.d(t,"b",(function(){return d}));var n=r(0),a=r.n(n);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=a.a.createContext({}),l=function(e){var t=a.a.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},s=function(e){var t=l(e.components);return a.a.createElement(p.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},b=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,p=u(e,["components","mdxType","originalType","parentName"]),s=l(r),b=n,d=s["".concat(i,".").concat(b)]||s[b]||f[b]||o;return r?a.a.createElement(d,c(c({ref:t},p),{},{components:r})):a.a.createElement(d,c({ref:t},p))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=b;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c.mdxType="string"==typeof e?e:n,i[1]=c;for(var p=2;p<o;p++)i[p]=r[p];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,r)}b.displayName="MDXCreateElement"},1334:function(e,t,r){"use strict";e.exports=r(1335)},1335:function(e,t,r){"use strict";var n=r(1336),a=60103,o=60106;t.Fragment=60107,t.StrictMode=60108,t.Profiler=60114;var i=60109,c=60110,u=60112;t.Suspense=60113;var p=60115,l=60116;if("function"==typeof Symbol&&Symbol.for){var s=Symbol.for;a=s("react.element"),o=s("react.portal"),t.Fragment=s("react.fragment"),t.StrictMode=s("react.strict_mode"),t.Profiler=s("react.profiler"),i=s("react.provider"),c=s("react.context"),u=s("react.forward_ref"),t.Suspense=s("react.suspense"),p=s("react.memo"),l=s("react.lazy")}var f="function"==typeof Symbol&&Symbol.iterator;function b(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var d={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},h={};function y(e,t,r){this.props=e,this.context=t,this.refs=h,this.updater=r||d}function m(){}function _(e,t,r){this.props=e,this.context=t,this.refs=h,this.updater=r||d}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(b(85));this.updater.enqueueSetState(this,e,t,"setState")},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},m.prototype=y.prototype;var g=_.prototype=new m;g.constructor=_,n(g,y.prototype),g.isPureReactComponent=!0;var O={current:null},v=Object.prototype.hasOwnProperty,j={key:!0,ref:!0,__self:!0,__source:!0};function k(e,t,r){var n,o={},i=null,c=null;if(null!=t)for(n in void 0!==t.ref&&(c=t.ref),void 0!==t.key&&(i=""+t.key),t)v.call(t,n)&&!j.hasOwnProperty(n)&&(o[n]=t[n]);var u=arguments.length-2;if(1===u)o.children=r;else if(1<u){for(var p=Array(u),l=0;l<u;l++)p[l]=arguments[l+2];o.children=p}if(e&&e.defaultProps)for(n in u=e.defaultProps)void 0===o[n]&&(o[n]=u[n]);return{$$typeof:a,type:e,key:i,ref:c,props:o,_owner:O.current}}function w(e){return"object"==typeof e&&null!==e&&e.$$typeof===a}var P=/\/+/g;function E(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function R(e,t,r,n,i){var c=typeof e;"undefined"!==c&&"boolean"!==c||(e=null);var u=!1;if(null===e)u=!0;else switch(c){case"string":case"number":u=!0;break;case"object":switch(e.$$typeof){case a:case o:u=!0}}if(u)return i=i(u=e),e=""===n?"."+E(u,0):n,Array.isArray(i)?(r="",null!=e&&(r=e.replace(P,"$&/")+"/"),R(i,t,r,"",(function(e){return e}))):null!=i&&(w(i)&&(i=function(e,t){return{$$typeof:a,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(i,r+(!i.key||u&&u.key===i.key?"":(""+i.key).replace(P,"$&/")+"/")+e)),t.push(i)),1;if(u=0,n=""===n?".":n+":",Array.isArray(e))for(var p=0;p<e.length;p++){var l=n+E(c=e[p],p);u+=R(c,t,r,l,i)}else if(l=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=f&&e[f]||e["@@iterator"])?e:null}(e),"function"==typeof l)for(e=l.call(e),p=0;!(c=e.next()).done;)u+=R(c=c.value,t,r,l=n+E(c,p++),i);else if("object"===c)throw t=""+e,Error(b(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return u}function N(e,t,r){if(null==e)return e;var n=[],a=0;return R(e,n,"","",(function(e){return t.call(r,e,a++)})),n}function S(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var C={current:null};function x(){var e=C.current;if(null===e)throw Error(b(321));return e}var $={ReactCurrentDispatcher:C,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:O,IsSomeRendererActing:{current:!1},assign:n};t.Children={map:N,forEach:function(e,t,r){N(e,(function(){t.apply(this,arguments)}),r)},count:function(e){var t=0;return N(e,(function(){t++})),t},toArray:function(e){return N(e,(function(e){return e}))||[]},only:function(e){if(!w(e))throw Error(b(143));return e}},t.Component=y,t.PureComponent=_,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=$,t.cloneElement=function(e,t,r){if(null==e)throw Error(b(267,e));var o=n({},e.props),i=e.key,c=e.ref,u=e._owner;if(null!=t){if(void 0!==t.ref&&(c=t.ref,u=O.current),void 0!==t.key&&(i=""+t.key),e.type&&e.type.defaultProps)var p=e.type.defaultProps;for(l in t)v.call(t,l)&&!j.hasOwnProperty(l)&&(o[l]=void 0===t[l]&&void 0!==p?p[l]:t[l])}var l=arguments.length-2;if(1===l)o.children=r;else if(1<l){p=Array(l);for(var s=0;s<l;s++)p[s]=arguments[s+2];o.children=p}return{$$typeof:a,type:e.type,key:i,ref:c,props:o,_owner:u}},t.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:c,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:i,_context:e},e.Consumer=e},t.createElement=k,t.createFactory=function(e){var t=k.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:u,render:e}},t.isValidElement=w,t.lazy=function(e){return{$$typeof:l,_payload:{_status:-1,_result:e},_init:S}},t.memo=function(e,t){return{$$typeof:p,type:e,compare:void 0===t?null:t}},t.useCallback=function(e,t){return x().useCallback(e,t)},t.useContext=function(e,t){return x().useContext(e,t)},t.useDebugValue=function(){},t.useEffect=function(e,t){return x().useEffect(e,t)},t.useImperativeHandle=function(e,t,r){return x().useImperativeHandle(e,t,r)},t.useLayoutEffect=function(e,t){return x().useLayoutEffect(e,t)},t.useMemo=function(e,t){return x().useMemo(e,t)},t.useReducer=function(e,t,r){return x().useReducer(e,t,r)},t.useRef=function(e){return x().useRef(e)},t.useState=function(e){return x().useState(e)},t.version="17.0.1"},1336:function(e,t,r){"use strict";var n=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;function i(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(a){return!1}}()?Object.assign:function(e,t){for(var r,c,u=i(e),p=1;p<arguments.length;p++){for(var l in r=Object(arguments[p]))a.call(r,l)&&(u[l]=r[l]);if(n){c=n(r);for(var s=0;s<c.length;s++)o.call(r,c[s])&&(u[c[s]]=r[c[s]])}}return u}},581:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return c})),r.d(t,"metadata",(function(){return u})),r.d(t,"rightToc",(function(){return p})),r.d(t,"default",(function(){return s}));var n=r(3),a=r(7),o=(r(1334),r(1333)),i=["components"],c={id:"_packages_graphback_core_src_relationships_relationshipmetadatabuilder_.relationshipannotation",title:"RelationshipAnnotation",sidebar_label:"RelationshipAnnotation"},u={unversionedId:"api/graphback-core/interfaces/_packages_graphback_core_src_relationships_relationshipmetadatabuilder_.relationshipannotation",id:"api/graphback-core/interfaces/_packages_graphback_core_src_relationships_relationshipmetadatabuilder_.relationshipannotation",isDocsHomePage:!1,title:"RelationshipAnnotation",description:"Hierarchy",source:"@site/../docs/api/graphback-core/interfaces/_packages_graphback_core_src_relationships_relationshipmetadatabuilder_.relationshipannotation.md",slug:"/api/graphback-core/interfaces/_packages_graphback_core_src_relationships_relationshipmetadatabuilder_.relationshipannotation",permalink:"/docs/next/api/graphback-core/interfaces/_packages_graphback_core_src_relationships_relationshipmetadatabuilder_.relationshipannotation",editUrl:"https://github.com/aerogear/graphback/edit/master/website/../docs/api/graphback-core/interfaces/_packages_graphback_core_src_relationships_relationshipmetadatabuilder_.relationshipannotation.md",version:"current",sidebar_label:"RelationshipAnnotation"},p=[{value:"Hierarchy",id:"hierarchy",children:[]},{value:"Index",id:"index",children:[{value:"Properties",id:"properties",children:[]}]},{value:"Properties",id:"properties-1",children:[{value:"<code>Optional</code> field",id:"optional-field",children:[]},{value:"<code>Optional</code> key",id:"optional-key",children:[]},{value:"kind",id:"kind",children:[]}]}],l={rightToc:p};function s(e){var t=e.components,r=Object(a.a)(e,i);return Object(o.b)("wrapper",Object(n.a)({},l,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"hierarchy"},"Hierarchy"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("strong",{parentName:"li"},"RelationshipAnnotation"))),Object(o.b)("h2",{id:"index"},"Index"),Object(o.b)("h3",{id:"properties"},"Properties"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"/docs/next/api/graphback-core/interfaces/_packages_graphback_core_src_relationships_relationshipmetadatabuilder_.relationshipannotation#optional-field"},"field")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"/docs/next/api/graphback-core/interfaces/_packages_graphback_core_src_relationships_relationshipmetadatabuilder_.relationshipannotation#optional-key"},"key")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"/docs/next/api/graphback-core/interfaces/_packages_graphback_core_src_relationships_relationshipmetadatabuilder_.relationshipannotation#kind"},"kind"))),Object(o.b)("h2",{id:"properties-1"},"Properties"),Object(o.b)("h3",{id:"optional-field"},Object(o.b)("inlineCode",{parentName:"h3"},"Optional")," field"),Object(o.b)("p",null,"\u2022 ",Object(o.b)("strong",{parentName:"p"},"field"),"? : ",Object(o.b)("em",{parentName:"p"},"string")),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/0a237f8/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L21"},"packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:21"))),Object(o.b)("hr",null),Object(o.b)("h3",{id:"optional-key"},Object(o.b)("inlineCode",{parentName:"h3"},"Optional")," key"),Object(o.b)("p",null,"\u2022 ",Object(o.b)("strong",{parentName:"p"},"key"),"? : ",Object(o.b)("em",{parentName:"p"},"string")),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/0a237f8/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L22"},"packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:22"))),Object(o.b)("hr",null),Object(o.b)("h3",{id:"kind"},"kind"),Object(o.b)("p",null,"\u2022 ",Object(o.b)("strong",{parentName:"p"},"kind"),": ",Object(o.b)("em",{parentName:"p"},'"oneToMany" | "oneToOne" | "manyToOne"')),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/0a237f8/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L20"},"packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:20"))))}s.isMDXComponent=!0}}]);