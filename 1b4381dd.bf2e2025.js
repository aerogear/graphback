/*! For license information please see 1b4381dd.bf2e2025.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[150],{1333:function(e,t,r){"use strict";r.d(t,"a",(function(){return p})),r.d(t,"b",(function(){return m}));var a=r(0),n=r.n(a);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var b=n.a.createContext({}),u=function(e){var t=n.a.useContext(b),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=u(e.components);return n.a.createElement(b.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.a.createElement(n.a.Fragment,{},t)}},s=n.a.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,b=l(e,["components","mdxType","originalType","parentName"]),p=u(r),s=a,m=p["".concat(c,".").concat(s)]||p[s]||f[s]||i;return r?n.a.createElement(m,o(o({ref:t},b),{},{components:r})):n.a.createElement(m,o({ref:t},b))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,c=new Array(i);c[0]=s;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:a,c[1]=o;for(var b=2;b<i;b++)c[b]=r[b];return n.a.createElement.apply(null,c)}return n.a.createElement.apply(null,r)}s.displayName="MDXCreateElement"},1334:function(e,t,r){"use strict";e.exports=r(1335)},1335:function(e,t,r){"use strict";var a=r(1336),n=60103,i=60106;t.Fragment=60107,t.StrictMode=60108,t.Profiler=60114;var c=60109,o=60110,l=60112;t.Suspense=60113;var b=60115,u=60116;if("function"==typeof Symbol&&Symbol.for){var p=Symbol.for;n=p("react.element"),i=p("react.portal"),t.Fragment=p("react.fragment"),t.StrictMode=p("react.strict_mode"),t.Profiler=p("react.profiler"),c=p("react.provider"),o=p("react.context"),l=p("react.forward_ref"),t.Suspense=p("react.suspense"),b=p("react.memo"),u=p("react.lazy")}var f="function"==typeof Symbol&&Symbol.iterator;function s(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var m={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},h={};function d(e,t,r){this.props=e,this.context=t,this.refs=h,this.updater=r||m}function g(){}function O(e,t,r){this.props=e,this.context=t,this.refs=h,this.updater=r||m}d.prototype.isReactComponent={},d.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(s(85));this.updater.enqueueSetState(this,e,t,"setState")},d.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},g.prototype=d.prototype;var j=O.prototype=new g;j.constructor=O,a(j,d.prototype),j.isPureReactComponent=!0;var y={current:null},N=Object.prototype.hasOwnProperty,v={key:!0,ref:!0,__self:!0,__source:!0};function k(e,t,r){var a,i={},c=null,o=null;if(null!=t)for(a in void 0!==t.ref&&(o=t.ref),void 0!==t.key&&(c=""+t.key),t)N.call(t,a)&&!v.hasOwnProperty(a)&&(i[a]=t[a]);var l=arguments.length-2;if(1===l)i.children=r;else if(1<l){for(var b=Array(l),u=0;u<l;u++)b[u]=arguments[u+2];i.children=b}if(e&&e.defaultProps)for(a in l=e.defaultProps)void 0===i[a]&&(i[a]=l[a]);return{$$typeof:n,type:e,key:c,ref:o,props:i,_owner:y.current}}function w(e){return"object"==typeof e&&null!==e&&e.$$typeof===n}var C=/\/+/g;function x(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function _(e,t,r,a,c){var o=typeof e;"undefined"!==o&&"boolean"!==o||(e=null);var l=!1;if(null===e)l=!0;else switch(o){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case n:case i:l=!0}}if(l)return c=c(l=e),e=""===a?"."+x(l,0):a,Array.isArray(c)?(r="",null!=e&&(r=e.replace(C,"$&/")+"/"),_(c,t,r,"",(function(e){return e}))):null!=c&&(w(c)&&(c=function(e,t){return{$$typeof:n,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(c,r+(!c.key||l&&l.key===c.key?"":(""+c.key).replace(C,"$&/")+"/")+e)),t.push(c)),1;if(l=0,a=""===a?".":a+":",Array.isArray(e))for(var b=0;b<e.length;b++){var u=a+x(o=e[b],b);l+=_(o,t,r,u,c)}else if("function"==typeof(u=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=f&&e[f]||e["@@iterator"])?e:null}(e)))for(e=u.call(e),b=0;!(o=e.next()).done;)l+=_(o=o.value,t,r,u=a+x(o,b++),c);else if("object"===o)throw t=""+e,Error(s(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return l}function E(e,t,r){if(null==e)return e;var a=[],n=0;return _(e,a,"","",(function(e){return t.call(r,e,n++)})),a}function S(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var P={current:null};function R(){var e=P.current;if(null===e)throw Error(s(321));return e}var $={ReactCurrentDispatcher:P,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:y,IsSomeRendererActing:{current:!1},assign:a};t.Children={map:E,forEach:function(e,t,r){E(e,(function(){t.apply(this,arguments)}),r)},count:function(e){var t=0;return E(e,(function(){t++})),t},toArray:function(e){return E(e,(function(e){return e}))||[]},only:function(e){if(!w(e))throw Error(s(143));return e}},t.Component=d,t.PureComponent=O,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=$,t.cloneElement=function(e,t,r){if(null==e)throw Error(s(267,e));var i=a({},e.props),c=e.key,o=e.ref,l=e._owner;if(null!=t){if(void 0!==t.ref&&(o=t.ref,l=y.current),void 0!==t.key&&(c=""+t.key),e.type&&e.type.defaultProps)var b=e.type.defaultProps;for(u in t)N.call(t,u)&&!v.hasOwnProperty(u)&&(i[u]=void 0===t[u]&&void 0!==b?b[u]:t[u])}var u=arguments.length-2;if(1===u)i.children=r;else if(1<u){b=Array(u);for(var p=0;p<u;p++)b[p]=arguments[p+2];i.children=b}return{$$typeof:n,type:e.type,key:c,ref:o,props:i,_owner:l}},t.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:o,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:c,_context:e},e.Consumer=e},t.createElement=k,t.createFactory=function(e){var t=k.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:l,render:e}},t.isValidElement=w,t.lazy=function(e){return{$$typeof:u,_payload:{_status:-1,_result:e},_init:S}},t.memo=function(e,t){return{$$typeof:b,type:e,compare:void 0===t?null:t}},t.useCallback=function(e,t){return R().useCallback(e,t)},t.useContext=function(e,t){return R().useContext(e,t)},t.useDebugValue=function(){},t.useEffect=function(e,t){return R().useEffect(e,t)},t.useImperativeHandle=function(e,t,r){return R().useImperativeHandle(e,t,r)},t.useLayoutEffect=function(e,t){return R().useLayoutEffect(e,t)},t.useMemo=function(e,t){return R().useMemo(e,t)},t.useReducer=function(e,t,r){return R().useReducer(e,t,r)},t.useRef=function(e){return R().useRef(e)},t.useState=function(e){return R().useState(e)},t.version="17.0.1"},1336:function(e,t,r){"use strict";var a=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;function c(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var a={};return"abcdefghijklmnopqrst".split("").forEach((function(e){a[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},a)).join("")}catch(n){return!1}}()?Object.assign:function(e,t){for(var r,o,l=c(e),b=1;b<arguments.length;b++){for(var u in r=Object(arguments[b]))n.call(r,u)&&(l[u]=r[u]);if(a){o=a(r);for(var p=0;p<o.length;p++)i.call(r,o[p])&&(l[o[p]]=r[o[p]])}}return l}},215:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return o})),r.d(t,"metadata",(function(){return l})),r.d(t,"rightToc",(function(){return b})),r.d(t,"default",(function(){return p}));var a=r(3),n=r(7),i=(r(1334),r(1333)),c=["components"],o={id:"releases",title:"Release Notes"},l={unversionedId:"releases",id:"releases",isDocsHomePage:!1,title:"Release Notes",description:"1.1.2 (2021-02-06)",source:"@site/../docs/CHANGELOG.md",slug:"/releases",permalink:"/docs/next/releases",editUrl:"https://github.com/aerogear/graphback/edit/master/website/../docs/CHANGELOG.md",version:"current",sidebar:"docs",previous:{title:"ConflictMetadata",permalink:"/docs/next/api/graphback-datasync/interfaces/_util_.conflictmetadata"}},b=[{value:"1.1.2 (2021-02-06)",id:"112-2021-02-06",children:[]},{value:"1.1.1 (2021-02-06)",id:"111-2021-02-06",children:[]},{value:"1.1.0 (2020-10-06)",id:"110-2020-10-06",children:[]},{value:"1.0.1 (2020-09-25)",id:"101-2020-09-25",children:[{value:"Breaking Changes",id:"breaking-changes",children:[]}]},{value:"1.0.0",id:"100",children:[]}],u={rightToc:b};function p(e){var t=e.components,r=Object(n.a)(e,c);return Object(i.b)("wrapper",Object(a.a)({},u,r,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"112-2021-02-06"},"1.1.2 (2021-02-06)"),Object(i.b)("h4",{id:"bug-fixes"},"Bug Fixes"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},Object(i.b)("a",{parentName:"p",href:"https://github.com/aerogear/graphback/pull/2269"},"#2269"),"  replaced _id with id in client and postgres template (",Object(i.b)("a",{parentName:"p",href:"https://github.com/RinkiyaKeDad"},"@RinkiyaKeDad"),")")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},Object(i.b)("a",{parentName:"p",href:"https://github.com/aerogear/graphback/pull/2267"},"#2261")," update import format ",Object(i.b)("a",{parentName:"p",href:"https://github.com/namit-chandwani"},"@namit-chandwani"),")"))),Object(i.b)("h2",{id:"111-2021-02-06"},"1.1.1 (2021-02-06)"),Object(i.b)("h4",{id:"bug-fixes-1"},"Bug Fixes"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/pull/2261"},"#2261")," fix: import format was throwing an error (",Object(i.b)("a",{parentName:"li",href:"https://github.com/craicoverflow"},"@craicoverflow"),")")),Object(i.b)("h2",{id:"110-2020-10-06"},"1.1.0 (2020-10-06)"),Object(i.b)("h4",{id:"bug-fixes-2"},"Bug Fixes"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"graphback-codegen-schema"),", ",Object(i.b)("inlineCode",{parentName:"li"},"graphback-core"),", ",Object(i.b)("inlineCode",{parentName:"li"},"graphback-datasync"),", ",Object(i.b)("inlineCode",{parentName:"li"},"graphback-runtime-knex"),", ",Object(i.b)("inlineCode",{parentName:"li"},"graphql-serve"),Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/pull/2171"},"#2171")," fix(codegen-schema): remove auto primary key from create input (",Object(i.b)("a",{parentName:"li",href:"https://github.com/craicoverflow"},"@craicoverflow"),")"))),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"graphback-codegen-client"),Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/pull/2139"},"#2139")," fix: unable to generate subscription query unless mutation operation in model is set to ",Object(i.b)("inlineCode",{parentName:"li"},"true")," (",Object(i.b)("a",{parentName:"li",href:"https://github.com/RinkiyaKeDad"},"@RinkiyaKeDad")))),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"codegen-schema"),Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/pull/2205"},"#2205")," fix(codegen-schema): map String list to String list in input type (",Object(i.b)("a",{parentName:"li",href:"https://github.com/craicoverflow"},"@craicoverflow"),")")))),Object(i.b)("h4",{id:"committers-2"},"Committers: 2"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Arsh Sharma (",Object(i.b)("a",{parentName:"li",href:"https://github.com/RinkiyaKeDad"},"@RinkiyaKeDad"),")"),Object(i.b)("li",{parentName:"ul"},"ssd71 ",Object(i.b)("a",{parentName:"li",href:"https://github.com/ssd71"},"@ssd71")),Object(i.b)("li",{parentName:"ul"},"mudit Choudhary (",Object(i.b)("a",{parentName:"li",href:"https://github.com/Muditxofficial"},"@Muditxofficial"),")"),Object(i.b)("li",{parentName:"ul"},"Enda Phelan (",Object(i.b)("a",{parentName:"li",href:"https://github.com/craicoverflow"},"@craicoverflow"))),Object(i.b)("h2",{id:"101-2020-09-25"},"1.0.1 (2020-09-25)"),Object(i.b)("h4",{id:"features"},"Features"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Added ability to override package name in plugin config (",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/pull/2077"},"#2077"),", fixed by ",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/pull/2077/commits/4cfd68c8b3aeec44df610525686eedd7f1920ecb"},"4cfd68c"),")")),Object(i.b)("h4",{id:"bug-fixes-3"},"Bug Fixes"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Logical ",Object(i.b)("inlineCode",{parentName:"li"},"or")," filter selector was not mapped correctly in ",Object(i.b)("inlineCode",{parentName:"li"},"graphback-runtime-mongo")," (",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/pull/2034"},"#2034"),", fixed by ",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/pull/2034/commits/1ebe7e9bc8d3a61f0b3ef65b588881d16b7ae63f"},"1ebe7e9"),")"),Object(i.b)("li",{parentName:"ul"},"Logical ",Object(i.b)("inlineCode",{parentName:"li"},"or")," filter selector was not mapped correctly in ",Object(i.b)("inlineCode",{parentName:"li"},"graphback-runtime-knex")," (",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/pull/2034"},"#2034"),", fixed by ",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/commit/6d43f288865a2c8c0d441e486a156301ca6cc42a"},"6d43f28"),")"),Object(i.b)("li",{parentName:"ul"},"Logical ",Object(i.b)("inlineCode",{parentName:"li"},"or")," predicate was not applied correctly in ",Object(i.b)("inlineCode",{parentName:"li"},"createInMemoryPredicateFilter")," (",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/pull/2034"},"#2034"),", fixed by ",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/commit/01f99121a9462e5a277657359094ab131e6f809c"},"01f9912"),")"),Object(i.b)("li",{parentName:"ul"},"GraphQL Migrations did not read auto-incrementing info from database column (",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/pull/2071"},"#2017"),", fixed by ",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/commit/83a80cdbb1104da7b36acdfa54b37a871c3ff1a0"},"83a80cd"),")"),Object(i.b)("li",{parentName:"ul"},"Prevent creation of empty ",Object(i.b)("inlineCode",{parentName:"li"},"Subscription"),", ",Object(i.b)("inlineCode",{parentName:"li"},"Query"),", ",Object(i.b)("inlineCode",{parentName:"li"},"Mutation")," resolver objects (",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/pull/2073"},"#2073"),", fixed by ",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/commit/97e82677257b54783916c3062ed6f0e74f25c038"},"97e8267"),")"),Object(i.b)("li",{parentName:"ul"},"Fix ",Object(i.b)("inlineCode",{parentName:"li"},"TypeError: Cannot read property 'page' of undefined")," error in CRUDService (",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/pull/2095"},"#2095")," fixed by ",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/commit/5143fb6c6a76d20f44b3e79ab25c6922408dd54a"},"5143fb6"),")"),Object(i.b)("li",{parentName:"ul"},"It was not possible to map a ",Object(i.b)("inlineCode",{parentName:"li"},"WHERE X IS/IS NOT NULL")," query in the Knex query mapper (",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/pull/2095"},"#2095")," fixed by ",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/commit/d10e918714a85c8c6f6ebb4260e9aff0b6b99ffa"},"d10e918"),")"),Object(i.b)("li",{parentName:"ul"},"Prevent creation of empty ",Object(i.b)("inlineCode",{parentName:"li"},"Subscription"),", ",Object(i.b)("inlineCode",{parentName:"li"},"Query"),", ",Object(i.b)("inlineCode",{parentName:"li"},"Mutation")," resolver objects (",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/pull/2073"},"#2073"),", fixed by ",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/commit/97e82677257b54783916c3062ed6f0e74f25c038"},"97e826"),")"),Object(i.b)("li",{parentName:"ul"},"Configure relationship auth rule with field instead of database key (",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/pull/2073"},"#2101"),", fixed by ",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/commit/525bc9a641fa7cb1818a0727a675564e6fa12dda"},"525bc9a"),")"),Object(i.b)("li",{parentName:"ul"},"Fix ",Object(i.b)("inlineCode",{parentName:"li"},"Could not find a declaration file for module 'bson'")," error (",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/pull/2104"},"#2104"),", fixed by ",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/commit/4f9ce7c2d6c494b33f447e1b4d6a47fbd880f353"},"4f9ce7c"),")"),Object(i.b)("li",{parentName:"ul"},"Add missing interface (",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/pull/2109"},"#2019"),", fixed by ",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/commit/f46e9200def565b0b0e34ccc13f7efa50f346550"},"f46e920"),")"),Object(i.b)("li",{parentName:"ul"},"Generate schema subscription fields when mutations are disabled (",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/2114"},"#2114"),", fixed by ",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/commit/212eb7a3e718eb102c226c237ce2448a2aa26898"},"212eb7a"),")"),Object(i.b)("li",{parentName:"ul"},"Don't create ",Object(i.b)("inlineCode",{parentName:"li"},"Query"),", ",Object(i.b)("inlineCode",{parentName:"li"},"Mutation"),", ",Object(i.b)("inlineCode",{parentName:"li"},"Subscription")," empty resolver objects (",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/pull/2122"},"#2122"),", fixed by ",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/commit/faf172d0dc30c3533dd5f2377f28ea20762baf02"},"faf172d"),")")),Object(i.b)("h3",{id:"breaking-changes"},"Breaking Changes"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Refactored the Knex Query Mapper (",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/pull/2034"},"#2034"),", fixed by ",Object(i.b)("a",{parentName:"li",href:"https://github.com/aerogear/graphback/commit/6d43f288865a2c8c0d441e486a156301ca6cc42a"},"6d43f28"),")")),Object(i.b)("h2",{id:"100"},"1.0.0"),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"INVALID RELEASE")))}p.isMDXComponent=!0}}]);