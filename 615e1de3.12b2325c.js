/*! For license information please see 615e1de3.12b2325c.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[482],{1333:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return m}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=r.a.createContext({}),s=function(e){var t=r.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},b=function(e){var t=s(e.components);return r.a.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),b=s(n),d=a,m=b["".concat(i,".").concat(d)]||b[d]||u[d]||o;return n?r.a.createElement(m,c(c({ref:t},p),{},{components:n})):r.a.createElement(m,c({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var p=2;p<o;p++)i[p]=n[p];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1334:function(e,t,n){"use strict";e.exports=n(1335)},1335:function(e,t,n){"use strict";var a=n(1336),r=60103,o=60106;t.Fragment=60107,t.StrictMode=60108,t.Profiler=60114;var i=60109,c=60110,l=60112;t.Suspense=60113;var p=60115,s=60116;if("function"==typeof Symbol&&Symbol.for){var b=Symbol.for;r=b("react.element"),o=b("react.portal"),t.Fragment=b("react.fragment"),t.StrictMode=b("react.strict_mode"),t.Profiler=b("react.profiler"),i=b("react.provider"),c=b("react.context"),l=b("react.forward_ref"),t.Suspense=b("react.suspense"),p=b("react.memo"),s=b("react.lazy")}var u="function"==typeof Symbol&&Symbol.iterator;function d(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var m={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},f={};function h(e,t,n){this.props=e,this.context=t,this.refs=f,this.updater=n||m}function O(){}function g(e,t,n){this.props=e,this.context=t,this.refs=f,this.updater=n||m}h.prototype.isReactComponent={},h.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(d(85));this.updater.enqueueSetState(this,e,t,"setState")},h.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},O.prototype=h.prototype;var j=g.prototype=new O;j.constructor=g,a(j,h.prototype),j.isPureReactComponent=!0;var y={current:null},N=Object.prototype.hasOwnProperty,v={key:!0,ref:!0,__self:!0,__source:!0};function w(e,t,n){var a,o={},i=null,c=null;if(null!=t)for(a in void 0!==t.ref&&(c=t.ref),void 0!==t.key&&(i=""+t.key),t)N.call(t,a)&&!v.hasOwnProperty(a)&&(o[a]=t[a]);var l=arguments.length-2;if(1===l)o.children=n;else if(1<l){for(var p=Array(l),s=0;s<l;s++)p[s]=arguments[s+2];o.children=p}if(e&&e.defaultProps)for(a in l=e.defaultProps)void 0===o[a]&&(o[a]=l[a]);return{$$typeof:r,type:e,key:i,ref:c,props:o,_owner:y.current}}function C(e){return"object"==typeof e&&null!==e&&e.$$typeof===r}var k=/\/+/g;function S(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function T(e,t,n,a,i){var c=typeof e;"undefined"!==c&&"boolean"!==c||(e=null);var l=!1;if(null===e)l=!0;else switch(c){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case r:case o:l=!0}}if(l)return i=i(l=e),e=""===a?"."+S(l,0):a,Array.isArray(i)?(n="",null!=e&&(n=e.replace(k,"$&/")+"/"),T(i,t,n,"",(function(e){return e}))):null!=i&&(C(i)&&(i=function(e,t){return{$$typeof:r,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(i,n+(!i.key||l&&l.key===i.key?"":(""+i.key).replace(k,"$&/")+"/")+e)),t.push(i)),1;if(l=0,a=""===a?".":a+":",Array.isArray(e))for(var p=0;p<e.length;p++){var s=a+S(c=e[p],p);l+=T(c,t,n,s,i)}else if("function"==typeof(s=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=u&&e[u]||e["@@iterator"])?e:null}(e)))for(e=s.call(e),p=0;!(c=e.next()).done;)l+=T(c=c.value,t,n,s=a+S(c,p++),i);else if("object"===c)throw t=""+e,Error(d(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return l}function _(e,t,n){if(null==e)return e;var a=[],r=0;return T(e,a,"","",(function(e){return t.call(n,e,r++)})),a}function G(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var D={current:null};function x(){var e=D.current;if(null===e)throw Error(d(321));return e}var E={ReactCurrentDispatcher:D,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:y,IsSomeRendererActing:{current:!1},assign:a};t.Children={map:_,forEach:function(e,t,n){_(e,(function(){t.apply(this,arguments)}),n)},count:function(e){var t=0;return _(e,(function(){t++})),t},toArray:function(e){return _(e,(function(e){return e}))||[]},only:function(e){if(!C(e))throw Error(d(143));return e}},t.Component=h,t.PureComponent=g,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=E,t.cloneElement=function(e,t,n){if(null==e)throw Error(d(267,e));var o=a({},e.props),i=e.key,c=e.ref,l=e._owner;if(null!=t){if(void 0!==t.ref&&(c=t.ref,l=y.current),void 0!==t.key&&(i=""+t.key),e.type&&e.type.defaultProps)var p=e.type.defaultProps;for(s in t)N.call(t,s)&&!v.hasOwnProperty(s)&&(o[s]=void 0===t[s]&&void 0!==p?p[s]:t[s])}var s=arguments.length-2;if(1===s)o.children=n;else if(1<s){p=Array(s);for(var b=0;b<s;b++)p[b]=arguments[b+2];o.children=p}return{$$typeof:r,type:e.type,key:i,ref:c,props:o,_owner:l}},t.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:c,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:i,_context:e},e.Consumer=e},t.createElement=w,t.createFactory=function(e){var t=w.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:l,render:e}},t.isValidElement=C,t.lazy=function(e){return{$$typeof:s,_payload:{_status:-1,_result:e},_init:G}},t.memo=function(e,t){return{$$typeof:p,type:e,compare:void 0===t?null:t}},t.useCallback=function(e,t){return x().useCallback(e,t)},t.useContext=function(e,t){return x().useContext(e,t)},t.useDebugValue=function(){},t.useEffect=function(e,t){return x().useEffect(e,t)},t.useImperativeHandle=function(e,t,n){return x().useImperativeHandle(e,t,n)},t.useLayoutEffect=function(e,t){return x().useLayoutEffect(e,t)},t.useMemo=function(e,t){return x().useMemo(e,t)},t.useReducer=function(e,t,n){return x().useReducer(e,t,n)},t.useRef=function(e){return x().useRef(e)},t.useState=function(e){return x().useState(e)},t.version="17.0.1"},1336:function(e,t,n){"use strict";var a=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;function i(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var a={};return"abcdefghijklmnopqrst".split("").forEach((function(e){a[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},a)).join("")}catch(r){return!1}}()?Object.assign:function(e,t){for(var n,c,l=i(e),p=1;p<arguments.length;p++){for(var s in n=Object(arguments[p]))r.call(n,s)&&(l[s]=n[s]);if(a){c=a(n);for(var b=0;b<c.length;b++)o.call(n,c[b])&&(l[c[b]]=n[c[b]])}}return l}},549:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return p})),n.d(t,"default",(function(){return b}));var a=n(3),r=n(7),o=(n(1334),n(1333)),i=["components"],c={id:"scalars",title:"Graphback Scalars",sidebar_label:"Graphback Scalars"},l={unversionedId:"model/scalars",id:"model/scalars",isDocsHomePage:!1,title:"Graphback Scalars",description:"Graphback supports commonly used Int, Float, String, Boolean, ID GraphQL scalars types. On top of these scalars, Graphback goes a step further by bringing in support of additional integration of scalar types making writing modern applications easy. This integration, offers",source:"@site/../docs/model/scalars.md",slug:"/model/scalars",permalink:"/docs/next/model/scalars",editUrl:"https://github.com/aerogear/graphback/edit/master/website/../docs/model/scalars.md",version:"current",sidebar_label:"Graphback Scalars",sidebar:"docs",previous:{title:"Annotations",permalink:"/docs/next/model/annotations"},next:{title:"CRUD Overview",permalink:"/docs/next/crud/overview"}},p=[{value:"Table Summary",id:"table-summary",children:[]},{value:"Example Usage",id:"example-usage",children:[]}],s={rightToc:p};function b(e){var t=e.components,n=Object(r.a)(e,i);return Object(o.b)("wrapper",Object(a.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Graphback supports commonly used ",Object(o.b)("a",{parentName:"p",href:"https://graphql.org/learn/schema/#scalar-types"},Object(o.b)("inlineCode",{parentName:"a"},"Int"),", ",Object(o.b)("inlineCode",{parentName:"a"},"Float"),", ",Object(o.b)("inlineCode",{parentName:"a"},"String"),", ",Object(o.b)("inlineCode",{parentName:"a"},"Boolean"),", ",Object(o.b)("inlineCode",{parentName:"a"},"ID")," GraphQL scalars")," types. On top of these scalars, Graphback goes a step further by bringing in support of ",Object(o.b)("a",{parentName:"p",href:"#table-summary"},"additional integration of scalar types")," making writing modern applications easy. This integration, offers "),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Out of the box proven scalar resolvers thanks to ",Object(o.b)("a",{parentName:"li",href:"https://www.npmjs.com/package/graphql-scalars"},"GraphQL Scalars")," library. "),Object(o.b)("li",{parentName:"ul"},"Generation of the required input types for filtering except for ",Object(o.b)("inlineCode",{parentName:"li"},"GraphbackJSONObject")," and ",Object(o.b)("inlineCode",{parentName:"li"},"GraphbackJSON"),".   "),Object(o.b)("li",{parentName:"ul"},"Automatic inferring of the required underlying database when using the ",Object(o.b)("a",{parentName:"li",href:"/docs/next/graphql-migrations/intro"},"GraphQL Migrations")," package.")),Object(o.b)("p",null,"The table below shows the scalar types that Graphback supports out of the box."),Object(o.b)("h2",{id:"table-summary"},"Table Summary"),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",{parentName:"tr",align:null},"Scalar"),Object(o.b)("th",{parentName:"tr",align:null},"Description"),Object(o.b)("th",{parentName:"tr",align:null},"Database Type"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"GraphbackTime")),Object(o.b)("td",{parentName:"tr",align:null},"A time string at UTC, such as 10:15:30Z, compliant with the ",Object(o.b)("inlineCode",{parentName:"td"},"full-time")," format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar."),Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"time"))),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"GraphbackDate")),Object(o.b)("td",{parentName:"tr",align:null},"A date string, such as 2007-12-03, compliant with the ",Object(o.b)("inlineCode",{parentName:"td"},"full-date")," format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar."),Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"date"))),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"GraphbackDateTime")),Object(o.b)("td",{parentName:"tr",align:null},"A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the ",Object(o.b)("inlineCode",{parentName:"td"},"date-time")," format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar."),Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"datetime"))),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"GraphbackObjectID")),Object(o.b)("td",{parentName:"tr",align:null},"A field whose value conforms with the standard mongodb object ID as described here: ",Object(o.b)("a",{parentName:"td",href:"https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId"},"https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId"),". You will need to have the ",Object(o.b)("a",{parentName:"td",href:"https://www.npmjs.com/package/mongodb"},Object(o.b)("inlineCode",{parentName:"a"},"mongodb"))," package installed in order to use this"),Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"varchar(24)"))),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"GraphbackJSONObject")),Object(o.b)("td",{parentName:"tr",align:null},"The ",Object(o.b)("inlineCode",{parentName:"td"},"JSONObject")," scalar type represents JSON objects as specified by ",Object(o.b)("a",{parentName:"td",href:"http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf"},"ECMA-404"),"."),Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"json"))),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"GraphbackJSON")),Object(o.b)("td",{parentName:"tr",align:null},"The ",Object(o.b)("inlineCode",{parentName:"td"},"JSON")," scalar type represents JSON values as specified by ",Object(o.b)("a",{parentName:"td",href:"http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf"},"ECMA-404"),"."),Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"json"))),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"GraphbackTimestamp")),Object(o.b)("td",{parentName:"tr",align:null},"The javascript ",Object(o.b)("inlineCode",{parentName:"td"},"Date")," as integer. Type represents date and time as number of milliseconds from start of UNIX epoch."),Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"timestamp"))))),Object(o.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(o.b)("div",{parentName:"div",className:"admonition-heading"},Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",{parentName:"h5",className:"admonition-icon"},Object(o.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(o.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),Object(o.b)("div",{parentName:"div",className:"admonition-content"},Object(o.b)("p",{parentName:"div"},"To be able to use either of those scalars, they will need to be defined in your ",Object(o.b)("a",{parentName:"p",href:"/docs/next/model/datamodel"},"Graphback Business Model")," file as shown in the example below."))),Object(o.b)("div",{className:"admonition admonition-info alert alert--info"},Object(o.b)("div",{parentName:"div",className:"admonition-heading"},Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",{parentName:"h5",className:"admonition-icon"},Object(o.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(o.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),Object(o.b)("div",{parentName:"div",className:"admonition-content"},Object(o.b)("p",{parentName:"div"},"Custom scalar types will need to be specified as you normally would i.e specifying the scalar in the model and configuring the corresponding resolvers."))),Object(o.b)("h2",{id:"example-usage"},"Example Usage"),Object(o.b)("p",null,"Take an example ",Object(o.b)("inlineCode",{parentName:"p"},"Note")," model, which uses each of the scalar types: ",Object(o.b)("inlineCode",{parentName:"p"},"ID"),", ",Object(o.b)("inlineCode",{parentName:"p"},"String"),", ",Object(o.b)("inlineCode",{parentName:"p"},"GraphbackDateTime"),". "),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-graphql"},'// highlight-start\n# Graphback DateTime scalar.\nscalar GraphbackDateTime\n// highlight-end\n\n""" @model """\ntype Note {\n  id: ID!\n  title: String!\n  // highlight-start\n  """\n  Usage of the Graphback DateTime scalar\n  """\n  createdAt: GraphbackDateTime\n  // highlight-end\n}\n')),Object(o.b)("p",null,"The highlighted code shows how you can define and use one of the Graphback scalars."),Object(o.b)("p",null,"Graphback generates a filter input type for each model in the schema."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-graphql",metastring:"{4}","{4}":!0},"input NoteFilter {\n  id: IDInput\n  title: StringInput\n  createdAt: GraphbackDateTimeInput\n  and: [NoteFilter!]\n  or: [NoteFilter!]\n  not: NoteFilter\n}\n")),Object(o.b)("p",null,"With the generated ",Object(o.b)("inlineCode",{parentName:"p"},"GraphbackDateTimeInput")," having the following fields:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-graphql"},"input GraphbackDateTimeInput {\n  ne: GraphbackDateTime\n  eq: GraphbackDateTime\n  le: GraphbackDateTime\n  lt: GraphbackDateTime\n  ge: GraphbackDateTime\n  gt: GraphbackDateTime\n  in: [GraphbackDateTime!]\n  between: [GraphbackDateTime!]\n}\n")),Object(o.b)("p",null,"So you can perform filtering of the data like this to retrive notes created after ",Object(o.b)("inlineCode",{parentName:"p"},"2020-07-27T12:11:41.288Z"),":"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-graphql"},'query {\n  findNotes(filter: {\n    createdAt: {\n      gt: "2020-07-27T12:11:41.288Z"\n    }\n  }) {\n    items {\n      id\n      title\n      createdAt\n    }\n  }\n}\n')),Object(o.b)("div",{className:"admonition admonition-info alert alert--info"},Object(o.b)("div",{parentName:"div",className:"admonition-heading"},Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",{parentName:"h5",className:"admonition-icon"},Object(o.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(o.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),Object(o.b)("div",{parentName:"div",className:"admonition-content"},Object(o.b)("p",{parentName:"div"},"For your convenience, Graphback generates a filter input for ",Object(o.b)("inlineCode",{parentName:"p"},"Date"),", ",Object(o.b)("inlineCode",{parentName:"p"},"DateTime"),", ",Object(o.b)("inlineCode",{parentName:"p"},"Time"),", ",Object(o.b)("inlineCode",{parentName:"p"},"Timestamp")," scalars. However we only fully support the scalars outlined above and we recommend you to use these."))))}b.isMDXComponent=!0}}]);