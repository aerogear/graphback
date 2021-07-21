/*! For license information please see a07ccd6e.6108a62f.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[788],{1333:function(e,t,r){"use strict";r.d(t,"a",(function(){return b})),r.d(t,"b",(function(){return f}));var n=r(0),a=r.n(n);function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){c(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=a.a.createContext({}),s=function(e){var t=a.a.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},b=function(e){var t=s(e.components);return a.a.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,c=e.originalType,o=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),b=s(r),d=n,f=b["".concat(o,".").concat(d)]||b[d]||p[d]||c;return r?a.a.createElement(f,l(l({ref:t},u),{},{components:r})):a.a.createElement(f,l({ref:t},u))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var c=r.length,o=new Array(c);o[0]=d;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:n,o[1]=l;for(var u=2;u<c;u++)o[u]=r[u];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},1334:function(e,t,r){"use strict";e.exports=r(1335)},1335:function(e,t,r){"use strict";var n=r(1336),a=60103,c=60106;t.Fragment=60107,t.StrictMode=60108,t.Profiler=60114;var o=60109,l=60110,i=60112;t.Suspense=60113;var u=60115,s=60116;if("function"==typeof Symbol&&Symbol.for){var b=Symbol.for;a=b("react.element"),c=b("react.portal"),t.Fragment=b("react.fragment"),t.StrictMode=b("react.strict_mode"),t.Profiler=b("react.profiler"),o=b("react.provider"),l=b("react.context"),i=b("react.forward_ref"),t.Suspense=b("react.suspense"),u=b("react.memo"),s=b("react.lazy")}var p="function"==typeof Symbol&&Symbol.iterator;function d(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var f={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m={};function h(e,t,r){this.props=e,this.context=t,this.refs=m,this.updater=r||f}function O(){}function j(e,t,r){this.props=e,this.context=t,this.refs=m,this.updater=r||f}h.prototype.isReactComponent={},h.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(d(85));this.updater.enqueueSetState(this,e,t,"setState")},h.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},O.prototype=h.prototype;var y=j.prototype=new O;y.constructor=j,n(y,h.prototype),y.isPureReactComponent=!0;var g={current:null},N=Object.prototype.hasOwnProperty,v={key:!0,ref:!0,__self:!0,__source:!0};function _(e,t,r){var n,c={},o=null,l=null;if(null!=t)for(n in void 0!==t.ref&&(l=t.ref),void 0!==t.key&&(o=""+t.key),t)N.call(t,n)&&!v.hasOwnProperty(n)&&(c[n]=t[n]);var i=arguments.length-2;if(1===i)c.children=r;else if(1<i){for(var u=Array(i),s=0;s<i;s++)u[s]=arguments[s+2];c.children=u}if(e&&e.defaultProps)for(n in i=e.defaultProps)void 0===c[n]&&(c[n]=i[n]);return{$$typeof:a,type:e,key:o,ref:l,props:c,_owner:g.current}}function k(e){return"object"==typeof e&&null!==e&&e.$$typeof===a}var w=/\/+/g;function P(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function S(e,t,r,n,o){var l=typeof e;"undefined"!==l&&"boolean"!==l||(e=null);var i=!1;if(null===e)i=!0;else switch(l){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case a:case c:i=!0}}if(i)return o=o(i=e),e=""===n?"."+P(i,0):n,Array.isArray(o)?(r="",null!=e&&(r=e.replace(w,"$&/")+"/"),S(o,t,r,"",(function(e){return e}))):null!=o&&(k(o)&&(o=function(e,t){return{$$typeof:a,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(o,r+(!o.key||i&&i.key===o.key?"":(""+o.key).replace(w,"$&/")+"/")+e)),t.push(o)),1;if(i=0,n=""===n?".":n+":",Array.isArray(e))for(var u=0;u<e.length;u++){var s=n+P(l=e[u],u);i+=S(l,t,r,s,o)}else if("function"==typeof(s=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=p&&e[p]||e["@@iterator"])?e:null}(e)))for(e=s.call(e),u=0;!(l=e.next()).done;)i+=S(l=l.value,t,r,s=n+P(l,u++),o);else if("object"===l)throw t=""+e,Error(d(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return i}function C(e,t,r){if(null==e)return e;var n=[],a=0;return S(e,n,"","",(function(e){return t.call(r,e,a++)})),n}function D(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var T={current:null};function x(){var e=T.current;if(null===e)throw Error(d(321));return e}var E={ReactCurrentDispatcher:T,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:g,IsSomeRendererActing:{current:!1},assign:n};t.Children={map:C,forEach:function(e,t,r){C(e,(function(){t.apply(this,arguments)}),r)},count:function(e){var t=0;return C(e,(function(){t++})),t},toArray:function(e){return C(e,(function(e){return e}))||[]},only:function(e){if(!k(e))throw Error(d(143));return e}},t.Component=h,t.PureComponent=j,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=E,t.cloneElement=function(e,t,r){if(null==e)throw Error(d(267,e));var c=n({},e.props),o=e.key,l=e.ref,i=e._owner;if(null!=t){if(void 0!==t.ref&&(l=t.ref,i=g.current),void 0!==t.key&&(o=""+t.key),e.type&&e.type.defaultProps)var u=e.type.defaultProps;for(s in t)N.call(t,s)&&!v.hasOwnProperty(s)&&(c[s]=void 0===t[s]&&void 0!==u?u[s]:t[s])}var s=arguments.length-2;if(1===s)c.children=r;else if(1<s){u=Array(s);for(var b=0;b<s;b++)u[b]=arguments[b+2];c.children=u}return{$$typeof:a,type:e.type,key:o,ref:l,props:c,_owner:i}},t.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:l,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:o,_context:e},e.Consumer=e},t.createElement=_,t.createFactory=function(e){var t=_.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:i,render:e}},t.isValidElement=k,t.lazy=function(e){return{$$typeof:s,_payload:{_status:-1,_result:e},_init:D}},t.memo=function(e,t){return{$$typeof:u,type:e,compare:void 0===t?null:t}},t.useCallback=function(e,t){return x().useCallback(e,t)},t.useContext=function(e,t){return x().useContext(e,t)},t.useDebugValue=function(){},t.useEffect=function(e,t){return x().useEffect(e,t)},t.useImperativeHandle=function(e,t,r){return x().useImperativeHandle(e,t,r)},t.useLayoutEffect=function(e,t){return x().useLayoutEffect(e,t)},t.useMemo=function(e,t){return x().useMemo(e,t)},t.useReducer=function(e,t,r){return x().useReducer(e,t,r)},t.useRef=function(e){return x().useRef(e)},t.useState=function(e){return x().useState(e)},t.version="17.0.1"},1336:function(e,t,r){"use strict";var n=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,c=Object.prototype.propertyIsEnumerable;function o(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(a){return!1}}()?Object.assign:function(e,t){for(var r,l,i=o(e),u=1;u<arguments.length;u++){for(var s in r=Object(arguments[u]))a.call(r,s)&&(i[s]=r[s]);if(n){l=n(r);for(var b=0;b<l.length;b++)c.call(r,l[b])&&(i[l[b]]=r[l[b]])}}return i}},856:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return l})),r.d(t,"metadata",(function(){return i})),r.d(t,"rightToc",(function(){return u})),r.d(t,"default",(function(){return b}));var n=r(3),a=r(7),c=(r(1334),r(1333)),o=["components"],l={id:"_deltasource_.mongodeltasource",title:"MongoDeltaSource",sidebar_label:"MongoDeltaSource"},i={unversionedId:"api/graphback-datasync/classes/_deltasource_.mongodeltasource",id:"api/graphback-datasync/classes/_deltasource_.mongodeltasource",isDocsHomePage:!1,title:"MongoDeltaSource",description:"Provides the ability to insert delta snapshots into MongoDB collections",source:"@site/../docs/api/graphback-datasync/classes/_deltasource_.mongodeltasource.md",slug:"/api/graphback-datasync/classes/_deltasource_.mongodeltasource",permalink:"/docs/next/api/graphback-datasync/classes/_deltasource_.mongodeltasource",editUrl:"https://github.com/aerogear/graphback/edit/master/website/../docs/api/graphback-datasync/classes/_deltasource_.mongodeltasource.md",version:"current",sidebar_label:"MongoDeltaSource"},u=[{value:"Type parameters",id:"type-parameters",children:[]},{value:"Hierarchy",id:"hierarchy",children:[]},{value:"Index",id:"index",children:[{value:"Constructors",id:"constructors",children:[]},{value:"Properties",id:"properties",children:[]},{value:"Methods",id:"methods",children:[]}]},{value:"Constructors",id:"constructors-1",children:[{value:"constructor",id:"constructor",children:[]}]},{value:"Properties",id:"properties-1",children:[{value:"<code>Protected</code> collectionName",id:"protected-collectionname",children:[]},{value:"<code>Protected</code> db",id:"protected-db",children:[]},{value:"<code>Protected</code> deltaTTL",id:"protected-deltattl",children:[]}]},{value:"Methods",id:"methods-1",children:[{value:"findBaseForConflicts",id:"findbaseforconflicts",children:[]},{value:"insertDiff",id:"insertdiff",children:[]}]}],s={rightToc:u};function b(e){var t=e.components,r=Object(a.a)(e,o);return Object(c.b)("wrapper",Object(n.a)({},s,r,{components:t,mdxType:"MDXLayout"}),Object(c.b)("p",null,"Provides the ability to insert delta snapshots into MongoDB collections\nand get base for conflict resolution"),Object(c.b)("h2",{id:"type-parameters"},"Type parameters"),Object(c.b)("p",null,"\u25aa ",Object(c.b)("strong",{parentName:"p"},"Type")),Object(c.b)("h2",{id:"hierarchy"},"Hierarchy"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("strong",{parentName:"li"},"MongoDeltaSource"))),Object(c.b)("h2",{id:"index"},"Index"),Object(c.b)("h3",{id:"constructors"},"Constructors"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-datasync/classes/_deltasource_.mongodeltasource#constructor"},"constructor"))),Object(c.b)("h3",{id:"properties"},"Properties"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-datasync/classes/_deltasource_.mongodeltasource#protected-collectionname"},"collectionName")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-datasync/classes/_deltasource_.mongodeltasource#protected-db"},"db")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-datasync/classes/_deltasource_.mongodeltasource#protected-deltattl"},"deltaTTL"))),Object(c.b)("h3",{id:"methods"},"Methods"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-datasync/classes/_deltasource_.mongodeltasource#findbaseforconflicts"},"findBaseForConflicts")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-datasync/classes/_deltasource_.mongodeltasource#insertdiff"},"insertDiff"))),Object(c.b)("h2",{id:"constructors-1"},"Constructors"),Object(c.b)("h3",{id:"constructor"},"constructor"),Object(c.b)("p",null,"+"," ",Object(c.b)("strong",{parentName:"p"},"new MongoDeltaSource"),"(",Object(c.b)("inlineCode",{parentName:"p"},"model"),": ModelDefinition, ",Object(c.b)("inlineCode",{parentName:"p"},"db"),": Db, ",Object(c.b)("inlineCode",{parentName:"p"},"deltaTTL"),": number): ",Object(c.b)("em",{parentName:"p"},Object(c.b)("a",{parentName:"em",href:"/docs/next/api/graphback-datasync/classes/_deltasource_.mongodeltasource"},"MongoDeltaSource"))),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/3abc57c/packages/graphback-datasync/src/deltaSource.ts#L17"},"packages/graphback-datasync/src/deltaSource.ts:17"))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"model")),Object(c.b)("td",{parentName:"tr",align:null},"ModelDefinition")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"db")),Object(c.b)("td",{parentName:"tr",align:null},"Db")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"deltaTTL")),Object(c.b)("td",{parentName:"tr",align:null},"number")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},Object(c.b)("a",{parentName:"em",href:"/docs/next/api/graphback-datasync/classes/_deltasource_.mongodeltasource"},"MongoDeltaSource"))),Object(c.b)("h2",{id:"properties-1"},"Properties"),Object(c.b)("h3",{id:"protected-collectionname"},Object(c.b)("inlineCode",{parentName:"h3"},"Protected")," collectionName"),Object(c.b)("p",null,"\u2022 ",Object(c.b)("strong",{parentName:"p"},"collectionName"),": ",Object(c.b)("em",{parentName:"p"},"string")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/3abc57c/packages/graphback-datasync/src/deltaSource.ts#L16"},"packages/graphback-datasync/src/deltaSource.ts:16"))),Object(c.b)("hr",null),Object(c.b)("h3",{id:"protected-db"},Object(c.b)("inlineCode",{parentName:"h3"},"Protected")," db"),Object(c.b)("p",null,"\u2022 ",Object(c.b)("strong",{parentName:"p"},"db"),": ",Object(c.b)("em",{parentName:"p"},"Db")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/3abc57c/packages/graphback-datasync/src/deltaSource.ts#L15"},"packages/graphback-datasync/src/deltaSource.ts:15"))),Object(c.b)("hr",null),Object(c.b)("h3",{id:"protected-deltattl"},Object(c.b)("inlineCode",{parentName:"h3"},"Protected")," deltaTTL"),Object(c.b)("p",null,"\u2022 ",Object(c.b)("strong",{parentName:"p"},"deltaTTL"),": ",Object(c.b)("em",{parentName:"p"},"number")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/3abc57c/packages/graphback-datasync/src/deltaSource.ts#L17"},"packages/graphback-datasync/src/deltaSource.ts:17"))),Object(c.b)("h2",{id:"methods-1"},"Methods"),Object(c.b)("h3",{id:"findbaseforconflicts"},"findBaseForConflicts"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"findBaseForConflicts"),"(",Object(c.b)("inlineCode",{parentName:"p"},"updateDocument"),": any): ",Object(c.b)("em",{parentName:"p"},"Promise\u2039Type\u203a")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/3abc57c/packages/graphback-datasync/src/deltaSource.ts#L47"},"packages/graphback-datasync/src/deltaSource.ts:47"))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"updateDocument")),Object(c.b)("td",{parentName:"tr",align:null},"any")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"Promise\u2039Type\u203a")),Object(c.b)("hr",null),Object(c.b)("h3",{id:"insertdiff"},"insertDiff"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"insertDiff"),"(",Object(c.b)("inlineCode",{parentName:"p"},"updatedDocument"),": Type): ",Object(c.b)("em",{parentName:"p"},"Promise\u2039void\u203a")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/3abc57c/packages/graphback-datasync/src/deltaSource.ts#L35"},"packages/graphback-datasync/src/deltaSource.ts:35"))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"updatedDocument")),Object(c.b)("td",{parentName:"tr",align:null},"Type")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"Promise\u2039void\u203a")))}b.isMDXComponent=!0}}]);