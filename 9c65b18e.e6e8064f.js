/*! For license information please see 9c65b18e.e6e8064f.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[761],{1333:function(e,t,a){"use strict";a.d(t,"a",(function(){return l})),a.d(t,"b",(function(){return u}));var r=a(0),n=a.n(r);function c(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function b(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?b(Object(a),!0).forEach((function(t){c(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):b(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function p(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},c=Object.keys(e);for(r=0;r<c.length;r++)a=c[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)a=c[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var d=n.a.createContext({}),i=function(e){var t=n.a.useContext(d),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},l=function(e){var t=i(e.components);return n.a.createElement(d.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.a.createElement(n.a.Fragment,{},t)}},m=n.a.forwardRef((function(e,t){var a=e.components,r=e.mdxType,c=e.originalType,b=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),l=i(a),m=r,u=l["".concat(b,".").concat(m)]||l[m]||s[m]||c;return a?n.a.createElement(u,o(o({ref:t},d),{},{components:a})):n.a.createElement(u,o({ref:t},d))}));function u(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var c=a.length,b=new Array(c);b[0]=m;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:r,b[1]=o;for(var d=2;d<c;d++)b[d]=a[d];return n.a.createElement.apply(null,b)}return n.a.createElement.apply(null,a)}m.displayName="MDXCreateElement"},1334:function(e,t,a){"use strict";e.exports=a(1335)},1335:function(e,t,a){"use strict";var r=a(1336),n=60103,c=60106;t.Fragment=60107,t.StrictMode=60108,t.Profiler=60114;var b=60109,o=60110,p=60112;t.Suspense=60113;var d=60115,i=60116;if("function"==typeof Symbol&&Symbol.for){var l=Symbol.for;n=l("react.element"),c=l("react.portal"),t.Fragment=l("react.fragment"),t.StrictMode=l("react.strict_mode"),t.Profiler=l("react.profiler"),b=l("react.provider"),o=l("react.context"),p=l("react.forward_ref"),t.Suspense=l("react.suspense"),d=l("react.memo"),i=l("react.lazy")}var s="function"==typeof Symbol&&Symbol.iterator;function m(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,a=1;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var u={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},O={};function j(e,t,a){this.props=e,this.context=t,this.refs=O,this.updater=a||u}function g(){}function y(e,t,a){this.props=e,this.context=t,this.refs=O,this.updater=a||u}j.prototype.isReactComponent={},j.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(m(85));this.updater.enqueueSetState(this,e,t,"setState")},j.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},g.prototype=j.prototype;var h=y.prototype=new g;h.constructor=y,r(h,j.prototype),h.isPureReactComponent=!0;var f={current:null},N=Object.prototype.hasOwnProperty,v={key:!0,ref:!0,__self:!0,__source:!0};function _(e,t,a){var r,c={},b=null,o=null;if(null!=t)for(r in void 0!==t.ref&&(o=t.ref),void 0!==t.key&&(b=""+t.key),t)N.call(t,r)&&!v.hasOwnProperty(r)&&(c[r]=t[r]);var p=arguments.length-2;if(1===p)c.children=a;else if(1<p){for(var d=Array(p),i=0;i<p;i++)d[i]=arguments[i+2];c.children=d}if(e&&e.defaultProps)for(r in p=e.defaultProps)void 0===c[r]&&(c[r]=p[r]);return{$$typeof:n,type:e,key:b,ref:o,props:c,_owner:f.current}}function D(e){return"object"==typeof e&&null!==e&&e.$$typeof===n}var k=/\/+/g;function P(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function C(e,t,a,r,b){var o=typeof e;"undefined"!==o&&"boolean"!==o||(e=null);var p=!1;if(null===e)p=!0;else switch(o){case"string":case"number":p=!0;break;case"object":switch(e.$$typeof){case n:case c:p=!0}}if(p)return b=b(p=e),e=""===r?"."+P(p,0):r,Array.isArray(b)?(a="",null!=e&&(a=e.replace(k,"$&/")+"/"),C(b,t,a,"",(function(e){return e}))):null!=b&&(D(b)&&(b=function(e,t){return{$$typeof:n,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(b,a+(!b.key||p&&p.key===b.key?"":(""+b.key).replace(k,"$&/")+"/")+e)),t.push(b)),1;if(p=0,r=""===r?".":r+":",Array.isArray(e))for(var d=0;d<e.length;d++){var i=r+P(o=e[d],d);p+=C(o,t,a,i,b)}else if("function"==typeof(i=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=s&&e[s]||e["@@iterator"])?e:null}(e)))for(e=i.call(e),d=0;!(o=e.next()).done;)p+=C(o=o.value,t,a,i=r+P(o,d++),b);else if("object"===o)throw t=""+e,Error(m(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return p}function M(e,t,a){if(null==e)return e;var r=[],n=0;return C(e,r,"","",(function(e){return t.call(a,e,n++)})),r}function x(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var S={current:null};function T(){var e=S.current;if(null===e)throw Error(m(321));return e}var w={ReactCurrentDispatcher:S,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:f,IsSomeRendererActing:{current:!1},assign:r};t.Children={map:M,forEach:function(e,t,a){M(e,(function(){t.apply(this,arguments)}),a)},count:function(e){var t=0;return M(e,(function(){t++})),t},toArray:function(e){return M(e,(function(e){return e}))||[]},only:function(e){if(!D(e))throw Error(m(143));return e}},t.Component=j,t.PureComponent=y,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=w,t.cloneElement=function(e,t,a){if(null==e)throw Error(m(267,e));var c=r({},e.props),b=e.key,o=e.ref,p=e._owner;if(null!=t){if(void 0!==t.ref&&(o=t.ref,p=f.current),void 0!==t.key&&(b=""+t.key),e.type&&e.type.defaultProps)var d=e.type.defaultProps;for(i in t)N.call(t,i)&&!v.hasOwnProperty(i)&&(c[i]=void 0===t[i]&&void 0!==d?d[i]:t[i])}var i=arguments.length-2;if(1===i)c.children=a;else if(1<i){d=Array(i);for(var l=0;l<i;l++)d[l]=arguments[l+2];c.children=d}return{$$typeof:n,type:e.type,key:b,ref:o,props:c,_owner:p}},t.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:o,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:b,_context:e},e.Consumer=e},t.createElement=_,t.createFactory=function(e){var t=_.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:p,render:e}},t.isValidElement=D,t.lazy=function(e){return{$$typeof:i,_payload:{_status:-1,_result:e},_init:x}},t.memo=function(e,t){return{$$typeof:d,type:e,compare:void 0===t?null:t}},t.useCallback=function(e,t){return T().useCallback(e,t)},t.useContext=function(e,t){return T().useContext(e,t)},t.useDebugValue=function(){},t.useEffect=function(e,t){return T().useEffect(e,t)},t.useImperativeHandle=function(e,t,a){return T().useImperativeHandle(e,t,a)},t.useLayoutEffect=function(e,t){return T().useLayoutEffect(e,t)},t.useMemo=function(e,t){return T().useMemo(e,t)},t.useReducer=function(e,t,a){return T().useReducer(e,t,a)},t.useRef=function(e){return T().useRef(e)},t.useState=function(e){return T().useState(e)},t.version="17.0.1"},1336:function(e,t,a){"use strict";var r=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,c=Object.prototype.propertyIsEnumerable;function b(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},a=0;a<10;a++)t["_"+String.fromCharCode(a)]=a;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(n){return!1}}()?Object.assign:function(e,t){for(var a,o,p=b(e),d=1;d<arguments.length;d++){for(var i in a=Object(arguments[d]))n.call(a,i)&&(p[i]=a[i]);if(r){o=r(a);for(var l=0;l<o.length;l++)c.call(a,o[l])&&(p[o[l]]=a[o[l]])}}return p}},829:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return o})),a.d(t,"metadata",(function(){return p})),a.d(t,"rightToc",(function(){return d})),a.d(t,"default",(function(){return l}));var r=a(3),n=a(7),c=(a(1334),a(1333)),b=["components"],o={id:"_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider",title:"DataSyncMongoDBDataProvider",sidebar_label:"DataSyncMongoDBDataProvider"},p={unversionedId:"api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider",id:"api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider",isDocsHomePage:!1,title:"DataSyncMongoDBDataProvider",description:"Mongo provider that attains data synchronization using soft deletes",source:"@site/../docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md",slug:"/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider",permalink:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider",editUrl:"https://github.com/aerogear/graphback/edit/master/website/../docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md",version:"current",sidebar_label:"DataSyncMongoDBDataProvider",sidebar:"docs",previous:{title:"CreateDataSyncCRUDServiceOptions",permalink:"/docs/next/api/graphback-datasync/interfaces/_services_createdatasyncservice_.createdatasynccrudserviceoptions"},next:{title:"DataSyncCRUDService",permalink:"/docs/next/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice"}},d=[{value:"Type parameters",id:"type-parameters",children:[]},{value:"Hierarchy",id:"hierarchy",children:[]},{value:"Implements",id:"implements",children:[]},{value:"Index",id:"index",children:[{value:"Constructors",id:"constructors",children:[]},{value:"Properties",id:"properties",children:[]},{value:"Methods",id:"methods",children:[]}]},{value:"Constructors",id:"constructors-1",children:[{value:"constructor",id:"constructor",children:[]}]},{value:"Properties",id:"properties-1",children:[{value:"<code>Protected</code> TTLinSeconds",id:"protected-ttlinseconds",children:[]},{value:"<code>Protected</code> collectionName",id:"protected-collectionname",children:[]},{value:"<code>Protected</code> db",id:"protected-db",children:[]},{value:"<code>Protected</code> fieldTransformMap",id:"protected-fieldtransformmap",children:[]},{value:"<code>Protected</code> tableMap",id:"protected-tablemap",children:[]}]},{value:"Methods",id:"methods-1",children:[{value:"batchRead",id:"batchread",children:[]},{value:"<code>Protected</code> buildProjectionOption",id:"protected-buildprojectionoption",children:[]},{value:"count",id:"count",children:[]},{value:"create",id:"create",children:[]},{value:"delete",id:"delete",children:[]},{value:"findBy",id:"findby",children:[]},{value:"findOne",id:"findone",children:[]},{value:"sync",id:"sync",children:[]},{value:"update",id:"update",children:[]}]}],i={rightToc:d};function l(e){var t=e.components,a=Object(n.a)(e,b);return Object(c.b)("wrapper",Object(r.a)({},i,a,{components:t,mdxType:"MDXLayout"}),Object(c.b)("p",null,"Mongo provider that attains data synchronization using soft deletes"),Object(c.b)("h2",{id:"type-parameters"},"Type parameters"),Object(c.b)("p",null,"\u25aa ",Object(c.b)("strong",{parentName:"p"},"Type")),Object(c.b)("h2",{id:"hierarchy"},"Hierarchy"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("p",{parentName:"li"},"MongoDBDataProvider\u2039Type\u203a"),Object(c.b)("p",{parentName:"li"},"\u21b3 ",Object(c.b)("strong",{parentName:"p"},"DataSyncMongoDBDataProvider")),Object(c.b)("p",{parentName:"li"},"\u21b3 ",Object(c.b)("a",{parentName:"p",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncconflictprovider_.datasyncconflictmongodbdataprovider"},"DataSyncConflictMongoDBDataProvider")))),Object(c.b)("h2",{id:"implements"},"Implements"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},"GraphbackDataProvider\u2039Type\u203a"),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-datasync/interfaces/_providers_datasyncprovider_.datasyncprovider"},"DataSyncProvider"))),Object(c.b)("h2",{id:"index"},"Index"),Object(c.b)("h3",{id:"constructors"},"Constructors"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#constructor"},"constructor"))),Object(c.b)("h3",{id:"properties"},"Properties"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#protected-ttlinseconds"},"TTLinSeconds")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#protected-collectionname"},"collectionName")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#protected-db"},"db")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#protected-fieldtransformmap"},"fieldTransformMap")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#protected-tablemap"},"tableMap"))),Object(c.b)("h3",{id:"methods"},"Methods"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#batchread"},"batchRead")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#protected-buildprojectionoption"},"buildProjectionOption")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#count"},"count")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#create"},"create")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#delete"},"delete")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#findby"},"findBy")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#findone"},"findOne")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#sync"},"sync")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#update"},"update"))),Object(c.b)("h2",{id:"constructors-1"},"Constructors"),Object(c.b)("h3",{id:"constructor"},"constructor"),Object(c.b)("p",null,"+"," ",Object(c.b)("strong",{parentName:"p"},"new DataSyncMongoDBDataProvider"),"(",Object(c.b)("inlineCode",{parentName:"p"},"model"),": ModelDefinition, ",Object(c.b)("inlineCode",{parentName:"p"},"client"),": any): ",Object(c.b)("em",{parentName:"p"},Object(c.b)("a",{parentName:"em",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider"},"DataSyncMongoDBDataProvider"))),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Overrides void")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/3abc57c/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L11"},"packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:11"))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"model")),Object(c.b)("td",{parentName:"tr",align:null},"ModelDefinition")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"client")),Object(c.b)("td",{parentName:"tr",align:null},"any")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},Object(c.b)("a",{parentName:"em",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider"},"DataSyncMongoDBDataProvider"))),Object(c.b)("h2",{id:"properties-1"},"Properties"),Object(c.b)("h3",{id:"protected-ttlinseconds"},Object(c.b)("inlineCode",{parentName:"h3"},"Protected")," TTLinSeconds"),Object(c.b)("p",null,"\u2022 ",Object(c.b)("strong",{parentName:"p"},"TTLinSeconds"),": ",Object(c.b)("em",{parentName:"p"},"number")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/3abc57c/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L11"},"packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:11"))),Object(c.b)("hr",null),Object(c.b)("h3",{id:"protected-collectionname"},Object(c.b)("inlineCode",{parentName:"h3"},"Protected")," collectionName"),Object(c.b)("p",null,"\u2022 ",Object(c.b)("strong",{parentName:"p"},"collectionName"),": ",Object(c.b)("em",{parentName:"p"},"string")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Inherited from ",Object(c.b)("a",{parentName:"em",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider"},"DataSyncMongoDBDataProvider"),".",Object(c.b)("a",{parentName:"em",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#protected-collectionname"},"collectionName"))),Object(c.b)("p",null,"Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:8"),Object(c.b)("hr",null),Object(c.b)("h3",{id:"protected-db"},Object(c.b)("inlineCode",{parentName:"h3"},"Protected")," db"),Object(c.b)("p",null,"\u2022 ",Object(c.b)("strong",{parentName:"p"},"db"),": ",Object(c.b)("em",{parentName:"p"},"Db")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Inherited from ",Object(c.b)("a",{parentName:"em",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider"},"DataSyncMongoDBDataProvider"),".",Object(c.b)("a",{parentName:"em",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#protected-db"},"db"))),Object(c.b)("p",null,"Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:7"),Object(c.b)("hr",null),Object(c.b)("h3",{id:"protected-fieldtransformmap"},Object(c.b)("inlineCode",{parentName:"h3"},"Protected")," fieldTransformMap"),Object(c.b)("p",null,"\u2022 ",Object(c.b)("strong",{parentName:"p"},"fieldTransformMap"),": ",Object(c.b)("em",{parentName:"p"},"FieldTransformMap")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Inherited from ",Object(c.b)("a",{parentName:"em",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider"},"DataSyncMongoDBDataProvider"),".",Object(c.b)("a",{parentName:"em",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#protected-fieldtransformmap"},"fieldTransformMap"))),Object(c.b)("p",null,"Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:10"),Object(c.b)("hr",null),Object(c.b)("h3",{id:"protected-tablemap"},Object(c.b)("inlineCode",{parentName:"h3"},"Protected")," tableMap"),Object(c.b)("p",null,"\u2022 ",Object(c.b)("strong",{parentName:"p"},"tableMap"),": ",Object(c.b)("em",{parentName:"p"},"ModelTableMap")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Inherited from ",Object(c.b)("a",{parentName:"em",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider"},"DataSyncMongoDBDataProvider"),".",Object(c.b)("a",{parentName:"em",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#protected-tablemap"},"tableMap"))),Object(c.b)("p",null,"Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:9"),Object(c.b)("h2",{id:"methods-1"},"Methods"),Object(c.b)("h3",{id:"batchread"},"batchRead"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"batchRead"),"(",Object(c.b)("inlineCode",{parentName:"p"},"relationField"),": string, ",Object(c.b)("inlineCode",{parentName:"p"},"ids"),": string[], ",Object(c.b)("inlineCode",{parentName:"p"},"filter?"),": QueryFilter, ",Object(c.b)("inlineCode",{parentName:"p"},"selectedFields?"),": string[]): ",Object(c.b)("em",{parentName:"p"},"Promise\u2039Type","[][]","\u203a")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Implementation of ",Object(c.b)("a",{parentName:"em",href:"/docs/next/api/graphback-datasync/interfaces/_providers_datasyncprovider_.datasyncprovider"},"DataSyncProvider"))),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Inherited from ",Object(c.b)("a",{parentName:"em",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider"},"DataSyncMongoDBDataProvider"),".",Object(c.b)("a",{parentName:"em",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#batchread"},"batchRead"))),Object(c.b)("p",null,"Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:18"),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"relationField")),Object(c.b)("td",{parentName:"tr",align:null},"string")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"ids")),Object(c.b)("td",{parentName:"tr",align:null},"string[]")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"filter?")),Object(c.b)("td",{parentName:"tr",align:null},"QueryFilter")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"selectedFields?")),Object(c.b)("td",{parentName:"tr",align:null},"string[]")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"Promise\u2039Type","[][]","\u203a")),Object(c.b)("hr",null),Object(c.b)("h3",{id:"protected-buildprojectionoption"},Object(c.b)("inlineCode",{parentName:"h3"},"Protected")," buildProjectionOption"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"buildProjectionOption"),"(",Object(c.b)("inlineCode",{parentName:"p"},"selectedFields"),": string[]): ",Object(c.b)("em",{parentName:"p"},"object")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Inherited from ",Object(c.b)("a",{parentName:"em",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider"},"DataSyncMongoDBDataProvider"),".",Object(c.b)("a",{parentName:"em",href:"/docs/next/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#protected-buildprojectionoption"},"buildProjectionOption"))),Object(c.b)("p",null,"Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:19"),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"selectedFields")),Object(c.b)("td",{parentName:"tr",align:null},"string[]")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"object")),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},"["," ",Object(c.b)("strong",{parentName:"li"},"x"),": ",Object(c.b)("em",{parentName:"li"},"string"),"]",": any")),Object(c.b)("hr",null),Object(c.b)("h3",{id:"count"},"count"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"count"),"(",Object(c.b)("inlineCode",{parentName:"p"},"filter"),": QueryFilter): ",Object(c.b)("em",{parentName:"p"},"Promise\u2039number\u203a")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Implementation of ",Object(c.b)("a",{parentName:"em",href:"/docs/next/api/graphback-datasync/interfaces/_providers_datasyncprovider_.datasyncprovider"},"DataSyncProvider"))),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Overrides void")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/3abc57c/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L122"},"packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:122"))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"filter")),Object(c.b)("td",{parentName:"tr",align:null},"QueryFilter")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"Promise\u2039number\u203a")),Object(c.b)("hr",null),Object(c.b)("h3",{id:"create"},"create"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"create"),"(",Object(c.b)("inlineCode",{parentName:"p"},"data"),": any): ",Object(c.b)("em",{parentName:"p"},"Promise\u2039Type\u203a")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Overrides void")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/3abc57c/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L38"},"packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:38"))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"data")),Object(c.b)("td",{parentName:"tr",align:null},"any")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"Promise\u2039Type\u203a")),Object(c.b)("hr",null),Object(c.b)("h3",{id:"delete"},"delete"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"delete"),"(",Object(c.b)("inlineCode",{parentName:"p"},"data"),": any, ",Object(c.b)("inlineCode",{parentName:"p"},"selectedFields?"),": string[]): ",Object(c.b)("em",{parentName:"p"},"Promise\u2039Type\u203a")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Overrides void")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/3abc57c/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L67"},"packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:67"))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"data")),Object(c.b)("td",{parentName:"tr",align:null},"any")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"selectedFields?")),Object(c.b)("td",{parentName:"tr",align:null},"string[]")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"Promise\u2039Type\u203a")),Object(c.b)("hr",null),Object(c.b)("h3",{id:"findby"},"findBy"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"findBy"),"(",Object(c.b)("inlineCode",{parentName:"p"},"args?"),": FindByArgs, ",Object(c.b)("inlineCode",{parentName:"p"},"selectedFields?"),": string[]): ",Object(c.b)("em",{parentName:"p"},"Promise\u2039Type[]\u203a")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Implementation of ",Object(c.b)("a",{parentName:"em",href:"/docs/next/api/graphback-datasync/interfaces/_providers_datasyncprovider_.datasyncprovider"},"DataSyncProvider"))),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Overrides void")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/3abc57c/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L108"},"packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:108"))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"args?")),Object(c.b)("td",{parentName:"tr",align:null},"FindByArgs")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"selectedFields?")),Object(c.b)("td",{parentName:"tr",align:null},"string[]")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"Promise\u2039Type[]\u203a")),Object(c.b)("hr",null),Object(c.b)("h3",{id:"findone"},"findOne"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"findOne"),"(",Object(c.b)("inlineCode",{parentName:"p"},"filter"),": any, ",Object(c.b)("inlineCode",{parentName:"p"},"selectedFields?"),": string[]): ",Object(c.b)("em",{parentName:"p"},"Promise\u2039Type\u203a")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Overrides void")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/3abc57c/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L89"},"packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:89"))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"filter")),Object(c.b)("td",{parentName:"tr",align:null},"any")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"selectedFields?")),Object(c.b)("td",{parentName:"tr",align:null},"string[]")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"Promise\u2039Type\u203a")),Object(c.b)("hr",null),Object(c.b)("h3",{id:"sync"},"sync"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"sync"),"(",Object(c.b)("inlineCode",{parentName:"p"},"lastSync"),": Date, ",Object(c.b)("inlineCode",{parentName:"p"},"selectedFields?"),": string[], ",Object(c.b)("inlineCode",{parentName:"p"},"filter?"),": QueryFilter, ",Object(c.b)("inlineCode",{parentName:"p"},"limit?"),": number): ",Object(c.b)("em",{parentName:"p"},"Promise\u2039Type[]\u203a")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Implementation of ",Object(c.b)("a",{parentName:"em",href:"/docs/next/api/graphback-datasync/interfaces/_providers_datasyncprovider_.datasyncprovider"},"DataSyncProvider"))),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/3abc57c/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L130"},"packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:130"))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"lastSync")),Object(c.b)("td",{parentName:"tr",align:null},"Date")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"selectedFields?")),Object(c.b)("td",{parentName:"tr",align:null},"string[]")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"filter?")),Object(c.b)("td",{parentName:"tr",align:null},"QueryFilter")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"limit?")),Object(c.b)("td",{parentName:"tr",align:null},"number")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"Promise\u2039Type[]\u203a")),Object(c.b)("hr",null),Object(c.b)("h3",{id:"update"},"update"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"update"),"(",Object(c.b)("inlineCode",{parentName:"p"},"data"),": any, ",Object(c.b)("inlineCode",{parentName:"p"},"selectedFields?"),": string[]): ",Object(c.b)("em",{parentName:"p"},"Promise\u2039Type\u203a")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Overrides void")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/3abc57c/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L45"},"packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:45"))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"data")),Object(c.b)("td",{parentName:"tr",align:null},"any")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"selectedFields?")),Object(c.b)("td",{parentName:"tr",align:null},"string[]")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"Promise\u2039Type\u203a")))}l.isMDXComponent=!0}}]);