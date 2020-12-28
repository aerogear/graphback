/*! For license information please see a6b5edb7.1d61411b.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[821],{1333:function(e,a,r){"use strict";r.d(a,"a",(function(){return u})),r.d(a,"b",(function(){return h}));var t=r(0),n=r.n(t);function c(e,a,r){return a in e?Object.defineProperty(e,a,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[a]=r,e}function p(e,a){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);a&&(t=t.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),r.push.apply(r,t)}return r}function i(e){for(var a=1;a<arguments.length;a++){var r=null!=arguments[a]?arguments[a]:{};a%2?p(Object(r),!0).forEach((function(a){c(e,a,r[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(r,a))}))}return e}function o(e,a){if(null==e)return{};var r,t,n=function(e,a){if(null==e)return{};var r,t,n={},c=Object.keys(e);for(t=0;t<c.length;t++)r=c[t],a.indexOf(r)>=0||(n[r]=e[r]);return n}(e,a);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(t=0;t<c.length;t++)r=c[t],a.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var b=n.a.createContext({}),l=function(e){var a=n.a.useContext(b),r=a;return e&&(r="function"==typeof e?e(a):i(i({},a),e)),r},u=function(e){var a=l(e.components);return n.a.createElement(b.Provider,{value:a},e.children)},s={inlineCode:"code",wrapper:function(e){var a=e.children;return n.a.createElement(n.a.Fragment,{},a)}},g=n.a.forwardRef((function(e,a){var r=e.components,t=e.mdxType,c=e.originalType,p=e.parentName,b=o(e,["components","mdxType","originalType","parentName"]),u=l(r),g=t,h=u["".concat(p,".").concat(g)]||u[g]||s[g]||c;return r?n.a.createElement(h,i(i({ref:a},b),{},{components:r})):n.a.createElement(h,i({ref:a},b))}));function h(e,a){var r=arguments,t=a&&a.mdxType;if("string"==typeof e||t){var c=r.length,p=new Array(c);p[0]=g;var i={};for(var o in a)hasOwnProperty.call(a,o)&&(i[o]=a[o]);i.originalType=e,i.mdxType="string"==typeof e?e:t,p[1]=i;for(var b=2;b<c;b++)p[b]=r[b];return n.a.createElement.apply(null,p)}return n.a.createElement.apply(null,r)}g.displayName="MDXCreateElement"},1334:function(e,a,r){"use strict";e.exports=r(1335)},1335:function(e,a,r){"use strict";var t=r(1336),n=60103,c=60106;a.Fragment=60107,a.StrictMode=60108,a.Profiler=60114;var p=60109,i=60110,o=60112;a.Suspense=60113;var b=60115,l=60116;if("function"==typeof Symbol&&Symbol.for){var u=Symbol.for;n=u("react.element"),c=u("react.portal"),a.Fragment=u("react.fragment"),a.StrictMode=u("react.strict_mode"),a.Profiler=u("react.profiler"),p=u("react.provider"),i=u("react.context"),o=u("react.forward_ref"),a.Suspense=u("react.suspense"),b=u("react.memo"),l=u("react.lazy")}var s="function"==typeof Symbol&&Symbol.iterator;function g(e){for(var a="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)a+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+a+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},f={};function m(e,a,r){this.props=e,this.context=a,this.refs=f,this.updater=r||h}function d(){}function O(e,a,r){this.props=e,this.context=a,this.refs=f,this.updater=r||h}m.prototype.isReactComponent={},m.prototype.setState=function(e,a){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(g(85));this.updater.enqueueSetState(this,e,a,"setState")},m.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},d.prototype=m.prototype;var j=O.prototype=new d;j.constructor=O,t(j,m.prototype),j.isPureReactComponent=!0;var _={current:null},k=Object.prototype.hasOwnProperty,y={key:!0,ref:!0,__self:!0,__source:!0};function v(e,a,r){var t,c={},p=null,i=null;if(null!=a)for(t in void 0!==a.ref&&(i=a.ref),void 0!==a.key&&(p=""+a.key),a)k.call(a,t)&&!y.hasOwnProperty(t)&&(c[t]=a[t]);var o=arguments.length-2;if(1===o)c.children=r;else if(1<o){for(var b=Array(o),l=0;l<o;l++)b[l]=arguments[l+2];c.children=b}if(e&&e.defaultProps)for(t in o=e.defaultProps)void 0===c[t]&&(c[t]=o[t]);return{$$typeof:n,type:e,key:p,ref:i,props:c,_owner:_.current}}function N(e){return"object"==typeof e&&null!==e&&e.$$typeof===n}var P=/\/+/g;function w(e,a){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var a={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return a[e]}))}(""+e.key):a.toString(36)}function E(e,a,r,t,p){var i=typeof e;"undefined"!==i&&"boolean"!==i||(e=null);var o=!1;if(null===e)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case n:case c:o=!0}}if(o)return p=p(o=e),e=""===t?"."+w(o,0):t,Array.isArray(p)?(r="",null!=e&&(r=e.replace(P,"$&/")+"/"),E(p,a,r,"",(function(e){return e}))):null!=p&&(N(p)&&(p=function(e,a){return{$$typeof:n,type:e.type,key:a,ref:e.ref,props:e.props,_owner:e._owner}}(p,r+(!p.key||o&&o.key===p.key?"":(""+p.key).replace(P,"$&/")+"/")+e)),a.push(p)),1;if(o=0,t=""===t?".":t+":",Array.isArray(e))for(var b=0;b<e.length;b++){var l=t+w(i=e[b],b);o+=E(i,a,r,l,p)}else if("function"==typeof(l=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=s&&e[s]||e["@@iterator"])?e:null}(e)))for(e=l.call(e),b=0;!(i=e.next()).done;)o+=E(i=i.value,a,r,l=t+w(i,b++),p);else if("object"===i)throw a=""+e,Error(g(31,"[object Object]"===a?"object with keys {"+Object.keys(e).join(", ")+"}":a));return o}function C(e,a,r){if(null==e)return e;var t=[],n=0;return E(e,t,"","",(function(e){return a.call(r,e,n++)})),t}function x(e){if(-1===e._status){var a=e._result;a=a(),e._status=0,e._result=a,a.then((function(a){0===e._status&&(a=a.default,e._status=1,e._result=a)}),(function(a){0===e._status&&(e._status=2,e._result=a)}))}if(1===e._status)return e._result;throw e._result}var S={current:null};function G(){var e=S.current;if(null===e)throw Error(g(321));return e}var R={ReactCurrentDispatcher:S,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:_,IsSomeRendererActing:{current:!1},assign:t};a.Children={map:C,forEach:function(e,a,r){C(e,(function(){a.apply(this,arguments)}),r)},count:function(e){var a=0;return C(e,(function(){a++})),a},toArray:function(e){return C(e,(function(e){return e}))||[]},only:function(e){if(!N(e))throw Error(g(143));return e}},a.Component=m,a.PureComponent=O,a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=R,a.cloneElement=function(e,a,r){if(null==e)throw Error(g(267,e));var c=t({},e.props),p=e.key,i=e.ref,o=e._owner;if(null!=a){if(void 0!==a.ref&&(i=a.ref,o=_.current),void 0!==a.key&&(p=""+a.key),e.type&&e.type.defaultProps)var b=e.type.defaultProps;for(l in a)k.call(a,l)&&!y.hasOwnProperty(l)&&(c[l]=void 0===a[l]&&void 0!==b?b[l]:a[l])}var l=arguments.length-2;if(1===l)c.children=r;else if(1<l){b=Array(l);for(var u=0;u<l;u++)b[u]=arguments[u+2];c.children=b}return{$$typeof:n,type:e.type,key:p,ref:i,props:c,_owner:o}},a.createContext=function(e,a){return void 0===a&&(a=null),(e={$$typeof:i,_calculateChangedBits:a,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:p,_context:e},e.Consumer=e},a.createElement=v,a.createFactory=function(e){var a=v.bind(null,e);return a.type=e,a},a.createRef=function(){return{current:null}},a.forwardRef=function(e){return{$$typeof:o,render:e}},a.isValidElement=N,a.lazy=function(e){return{$$typeof:l,_payload:{_status:-1,_result:e},_init:x}},a.memo=function(e,a){return{$$typeof:b,type:e,compare:void 0===a?null:a}},a.useCallback=function(e,a){return G().useCallback(e,a)},a.useContext=function(e,a){return G().useContext(e,a)},a.useDebugValue=function(){},a.useEffect=function(e,a){return G().useEffect(e,a)},a.useImperativeHandle=function(e,a,r){return G().useImperativeHandle(e,a,r)},a.useLayoutEffect=function(e,a){return G().useLayoutEffect(e,a)},a.useMemo=function(e,a){return G().useMemo(e,a)},a.useReducer=function(e,a,r){return G().useReducer(e,a,r)},a.useRef=function(e){return G().useRef(e)},a.useState=function(e){return G().useState(e)},a.version="17.0.1"},1336:function(e,a,r){"use strict";var t=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,c=Object.prototype.propertyIsEnumerable;function p(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var a={},r=0;r<10;r++)a["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(a).map((function(e){return a[e]})).join(""))return!1;var t={};return"abcdefghijklmnopqrst".split("").forEach((function(e){t[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},t)).join("")}catch(n){return!1}}()?Object.assign:function(e,a){for(var r,i,o=p(e),b=1;b<arguments.length;b++){for(var l in r=Object(arguments[b]))n.call(r,l)&&(o[l]=r[l]);if(t){i=t(r);for(var u=0;u<i.length;u++)c.call(r,i[u])&&(o[i[u]]=r[i[u]])}}return o}},888:function(e,a,r){"use strict";r.r(a),r.d(a,"frontMatter",(function(){return p})),r.d(a,"metadata",(function(){return i})),r.d(a,"rightToc",(function(){return o})),r.d(a,"default",(function(){return l}));var t=r(3),n=r(7),c=(r(1334),r(1333)),p={id:"_packages_graphback_core_src_plugin_graphbackpluginengine_.graphbackpluginengine",title:"GraphbackPluginEngine",sidebar_label:"GraphbackPluginEngine"},i={unversionedId:"api/graphback-core/classes/_packages_graphback_core_src_plugin_graphbackpluginengine_.graphbackpluginengine",id:"api/graphback-core/classes/_packages_graphback_core_src_plugin_graphbackpluginengine_.graphbackpluginengine",isDocsHomePage:!1,title:"GraphbackPluginEngine",description:"Allows to execute chain of plugins that create resources.",source:"@site/../docs/api/graphback-core/classes/_packages_graphback_core_src_plugin_graphbackpluginengine_.graphbackpluginengine.md",slug:"/api/graphback-core/classes/_packages_graphback_core_src_plugin_graphbackpluginengine_.graphbackpluginengine",permalink:"/docs/next/api/graphback-core/classes/_packages_graphback_core_src_plugin_graphbackpluginengine_.graphbackpluginengine",editUrl:"https://github.com/aerogear/graphback/edit/master/website/../docs/api/graphback-core/classes/_packages_graphback_core_src_plugin_graphbackpluginengine_.graphbackpluginengine.md",version:"current",sidebar_label:"GraphbackPluginEngine"},o=[{value:"Hierarchy",id:"hierarchy",children:[]},{value:"Index",id:"index",children:[{value:"Constructors",id:"constructors",children:[]},{value:"Properties",id:"properties",children:[]},{value:"Methods",id:"methods",children:[]}]},{value:"Constructors",id:"constructors-1",children:[{value:"constructor",id:"constructor",children:[]}]},{value:"Properties",id:"properties-1",children:[{value:"<code>Private</code> metadata",id:"private-metadata",children:[]},{value:"<code>Private</code> plugins",id:"private-plugins",children:[]}]},{value:"Methods",id:"methods-1",children:[{value:"<code>Private</code> createResolvers",id:"private-createresolvers",children:[]},{value:"createResources",id:"createresources",children:[]},{value:"<code>Private</code> createSchema",id:"private-createschema",children:[]},{value:"registerPlugin",id:"registerplugin",children:[]}]}],b={rightToc:o};function l(e){var a=e.components,r=Object(n.a)(e,["components"]);return Object(c.b)("wrapper",Object(t.a)({},b,r,{components:a,mdxType:"MDXLayout"}),Object(c.b)("p",null,"Allows to execute chain of plugins that create resources.\nCommon use case is to decorate GraphQL schema with additional\nactions and generate files like resolvers and database access logic"),Object(c.b)("p",null,"Usage:"),Object(c.b)("pre",null,Object(c.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"const engine = GraphbackPluginEngine({ schema });\nengine.registerPlugin(plugin);\nprintSchema(engine.createResources());\n")),Object(c.b)("h2",{id:"hierarchy"},"Hierarchy"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("strong",{parentName:"li"},"GraphbackPluginEngine"))),Object(c.b)("h2",{id:"index"},"Index"),Object(c.b)("h3",{id:"constructors"},"Constructors"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",Object(t.a)({parentName:"li"},{href:"/docs/next/api/graphback-core/classes/_packages_graphback_core_src_plugin_graphbackpluginengine_.graphbackpluginengine#constructor"}),"constructor"))),Object(c.b)("h3",{id:"properties"},"Properties"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",Object(t.a)({parentName:"li"},{href:"/docs/next/api/graphback-core/classes/_packages_graphback_core_src_plugin_graphbackpluginengine_.graphbackpluginengine#private-metadata"}),"metadata")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",Object(t.a)({parentName:"li"},{href:"/docs/next/api/graphback-core/classes/_packages_graphback_core_src_plugin_graphbackpluginengine_.graphbackpluginengine#private-plugins"}),"plugins"))),Object(c.b)("h3",{id:"methods"},"Methods"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",Object(t.a)({parentName:"li"},{href:"/docs/next/api/graphback-core/classes/_packages_graphback_core_src_plugin_graphbackpluginengine_.graphbackpluginengine#private-createresolvers"}),"createResolvers")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",Object(t.a)({parentName:"li"},{href:"/docs/next/api/graphback-core/classes/_packages_graphback_core_src_plugin_graphbackpluginengine_.graphbackpluginengine#createresources"}),"createResources")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",Object(t.a)({parentName:"li"},{href:"/docs/next/api/graphback-core/classes/_packages_graphback_core_src_plugin_graphbackpluginengine_.graphbackpluginengine#private-createschema"}),"createSchema")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",Object(t.a)({parentName:"li"},{href:"/docs/next/api/graphback-core/classes/_packages_graphback_core_src_plugin_graphbackpluginengine_.graphbackpluginengine#registerplugin"}),"registerPlugin"))),Object(c.b)("h2",{id:"constructors-1"},"Constructors"),Object(c.b)("h3",{id:"constructor"},"constructor"),Object(c.b)("p",null,"+"," ",Object(c.b)("strong",{parentName:"p"},"new GraphbackPluginEngine"),"(",Object(c.b)("inlineCode",{parentName:"p"},"__namedParameters"),": object): ",Object(c.b)("em",{parentName:"p"},Object(c.b)("a",Object(t.a)({parentName:"em"},{href:"/docs/next/api/graphback-core/classes/_packages_graphback_core_src_plugin_graphbackpluginengine_.graphbackpluginengine"}),"GraphbackPluginEngine"))),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",Object(t.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/514b9c0/packages/graphback-core/src/plugin/GraphbackPluginEngine.ts#L29"}),"packages/graphback-core/src/plugin/GraphbackPluginEngine.ts:29"))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("p",null,"\u25aa ",Object(c.b)("strong",{parentName:"p"},"__namedParameters"),": ",Object(c.b)("em",{parentName:"p"},"object")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",Object(t.a)({parentName:"tr"},{align:null}),"Name"),Object(c.b)("th",Object(t.a)({parentName:"tr"},{align:null}),"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",Object(t.a)({parentName:"tr"},{align:null}),Object(c.b)("inlineCode",{parentName:"td"},"config")),Object(c.b)("td",Object(t.a)({parentName:"tr"},{align:null}),Object(c.b)("a",Object(t.a)({parentName:"td"},{href:"/docs/next/api/graphback-core/interfaces/_packages_graphback_core_src_plugin_graphbackglobalconfig_.graphbackglobalconfig"}),"GraphbackGlobalConfig"))),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",Object(t.a)({parentName:"tr"},{align:null}),Object(c.b)("inlineCode",{parentName:"td"},"plugins")),Object(c.b)("td",Object(t.a)({parentName:"tr"},{align:null}),Object(c.b)("a",Object(t.a)({parentName:"td"},{href:"/docs/next/api/graphback-core/classes/_packages_graphback_core_src_plugin_graphbackplugin_.graphbackplugin"}),"GraphbackPlugin"),"\u2039\u203a[]")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",Object(t.a)({parentName:"tr"},{align:null}),Object(c.b)("inlineCode",{parentName:"td"},"schema")),Object(c.b)("td",Object(t.a)({parentName:"tr"},{align:null}),"string ","|"," GraphQLSchema\u2039\u203a")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},Object(c.b)("a",Object(t.a)({parentName:"em"},{href:"/docs/next/api/graphback-core/classes/_packages_graphback_core_src_plugin_graphbackpluginengine_.graphbackpluginengine"}),"GraphbackPluginEngine"))),Object(c.b)("h2",{id:"properties-1"},"Properties"),Object(c.b)("h3",{id:"private-metadata"},Object(c.b)("inlineCode",{parentName:"h3"},"Private")," metadata"),Object(c.b)("p",null,"\u2022 ",Object(c.b)("strong",{parentName:"p"},"metadata"),": ",Object(c.b)("em",{parentName:"p"},Object(c.b)("a",Object(t.a)({parentName:"em"},{href:"/docs/next/api/graphback-core/classes/_packages_graphback_core_src_plugin_graphbackcoremetadata_.graphbackcoremetadata"}),"GraphbackCoreMetadata"))),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",Object(t.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/514b9c0/packages/graphback-core/src/plugin/GraphbackPluginEngine.ts#L29"}),"packages/graphback-core/src/plugin/GraphbackPluginEngine.ts:29"))),Object(c.b)("hr",null),Object(c.b)("h3",{id:"private-plugins"},Object(c.b)("inlineCode",{parentName:"h3"},"Private")," plugins"),Object(c.b)("p",null,"\u2022 ",Object(c.b)("strong",{parentName:"p"},"plugins"),": ",Object(c.b)("em",{parentName:"p"},Object(c.b)("a",Object(t.a)({parentName:"em"},{href:"/docs/next/api/graphback-core/classes/_packages_graphback_core_src_plugin_graphbackplugin_.graphbackplugin"}),"GraphbackPlugin"),"[]")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",Object(t.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/514b9c0/packages/graphback-core/src/plugin/GraphbackPluginEngine.ts#L28"}),"packages/graphback-core/src/plugin/GraphbackPluginEngine.ts:28"))),Object(c.b)("h2",{id:"methods-1"},"Methods"),Object(c.b)("h3",{id:"private-createresolvers"},Object(c.b)("inlineCode",{parentName:"h3"},"Private")," createResolvers"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"createResolvers"),"(): ",Object(c.b)("em",{parentName:"p"},"void")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",Object(t.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/514b9c0/packages/graphback-core/src/plugin/GraphbackPluginEngine.ts#L80"}),"packages/graphback-core/src/plugin/GraphbackPluginEngine.ts:80"))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"void")),Object(c.b)("hr",null),Object(c.b)("h3",{id:"createresources"},"createResources"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"createResources"),"(): ",Object(c.b)("em",{parentName:"p"},Object(c.b)("a",Object(t.a)({parentName:"em"},{href:"/docs/next/api/graphback-core/classes/_packages_graphback_core_src_plugin_graphbackcoremetadata_.graphbackcoremetadata"}),"GraphbackCoreMetadata"))),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",Object(t.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/514b9c0/packages/graphback-core/src/plugin/GraphbackPluginEngine.ts#L54"}),"packages/graphback-core/src/plugin/GraphbackPluginEngine.ts:54"))),Object(c.b)("p",null,"Allows the transformation of schema by applying transformation logic for each plugin\nCreation of resolvers, which has to come after all the changes in schema have been applied\nSaving of the transformed schema and related files"),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},Object(c.b)("a",Object(t.a)({parentName:"em"},{href:"/docs/next/api/graphback-core/classes/_packages_graphback_core_src_plugin_graphbackcoremetadata_.graphbackcoremetadata"}),"GraphbackCoreMetadata"))),Object(c.b)("hr",null),Object(c.b)("h3",{id:"private-createschema"},Object(c.b)("inlineCode",{parentName:"h3"},"Private")," createSchema"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"createSchema"),"(): ",Object(c.b)("em",{parentName:"p"},"void")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",Object(t.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/514b9c0/packages/graphback-core/src/plugin/GraphbackPluginEngine.ts#L71"}),"packages/graphback-core/src/plugin/GraphbackPluginEngine.ts:71"))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"void")),Object(c.b)("hr",null),Object(c.b)("h3",{id:"registerplugin"},"registerPlugin"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"registerPlugin"),"(...",Object(c.b)("inlineCode",{parentName:"p"},"plugins"),": ",Object(c.b)("a",Object(t.a)({parentName:"p"},{href:"/docs/next/api/graphback-core/classes/_packages_graphback_core_src_plugin_graphbackplugin_.graphbackplugin"}),"GraphbackPlugin"),"[]): ",Object(c.b)("em",{parentName:"p"},"void")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",Object(t.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/514b9c0/packages/graphback-core/src/plugin/GraphbackPluginEngine.ts#L45"}),"packages/graphback-core/src/plugin/GraphbackPluginEngine.ts:45"))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",Object(t.a)({parentName:"tr"},{align:null}),"Name"),Object(c.b)("th",Object(t.a)({parentName:"tr"},{align:null}),"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",Object(t.a)({parentName:"tr"},{align:null}),Object(c.b)("inlineCode",{parentName:"td"},"...plugins")),Object(c.b)("td",Object(t.a)({parentName:"tr"},{align:null}),Object(c.b)("a",Object(t.a)({parentName:"td"},{href:"/docs/next/api/graphback-core/classes/_packages_graphback_core_src_plugin_graphbackplugin_.graphbackplugin"}),"GraphbackPlugin"),"[]")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"void")))}l.isMDXComponent=!0}}]);