/*! For license information please see 9f05fbe8.b85f0b19.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[777],{1333:function(e,a,r){"use strict";r.d(a,"a",(function(){return l})),r.d(a,"b",(function(){return d}));var t=r(0),c=r.n(t);function n(e,a,r){return a in e?Object.defineProperty(e,a,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[a]=r,e}function p(e,a){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);a&&(t=t.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),r.push.apply(r,t)}return r}function o(e){for(var a=1;a<arguments.length;a++){var r=null!=arguments[a]?arguments[a]:{};a%2?p(Object(r),!0).forEach((function(a){n(e,a,r[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(r,a))}))}return e}function b(e,a){if(null==e)return{};var r,t,c=function(e,a){if(null==e)return{};var r,t,c={},n=Object.keys(e);for(t=0;t<n.length;t++)r=n[t],a.indexOf(r)>=0||(c[r]=e[r]);return c}(e,a);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(t=0;t<n.length;t++)r=n[t],a.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(c[r]=e[r])}return c}var s=c.a.createContext({}),i=function(e){var a=c.a.useContext(s),r=a;return e&&(r="function"==typeof e?e(a):o(o({},a),e)),r},l=function(e){var a=i(e.components);return c.a.createElement(s.Provider,{value:a},e.children)},u={inlineCode:"code",wrapper:function(e){var a=e.children;return c.a.createElement(c.a.Fragment,{},a)}},h=c.a.forwardRef((function(e,a){var r=e.components,t=e.mdxType,n=e.originalType,p=e.parentName,s=b(e,["components","mdxType","originalType","parentName"]),l=i(r),h=t,d=l["".concat(p,".").concat(h)]||l[h]||u[h]||n;return r?c.a.createElement(d,o(o({ref:a},s),{},{components:r})):c.a.createElement(d,o({ref:a},s))}));function d(e,a){var r=arguments,t=a&&a.mdxType;if("string"==typeof e||t){var n=r.length,p=new Array(n);p[0]=h;var o={};for(var b in a)hasOwnProperty.call(a,b)&&(o[b]=a[b]);o.originalType=e,o.mdxType="string"==typeof e?e:t,p[1]=o;for(var s=2;s<n;s++)p[s]=r[s];return c.a.createElement.apply(null,p)}return c.a.createElement.apply(null,r)}h.displayName="MDXCreateElement"},1334:function(e,a,r){"use strict";e.exports=r(1335)},1335:function(e,a,r){"use strict";var t=r(1336),c=60103,n=60106;a.Fragment=60107,a.StrictMode=60108,a.Profiler=60114;var p=60109,o=60110,b=60112;a.Suspense=60113;var s=60115,i=60116;if("function"==typeof Symbol&&Symbol.for){var l=Symbol.for;c=l("react.element"),n=l("react.portal"),a.Fragment=l("react.fragment"),a.StrictMode=l("react.strict_mode"),a.Profiler=l("react.profiler"),p=l("react.provider"),o=l("react.context"),b=l("react.forward_ref"),a.Suspense=l("react.suspense"),s=l("react.memo"),i=l("react.lazy")}var u="function"==typeof Symbol&&Symbol.iterator;function h(e){for(var a="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)a+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+a+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var d={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},f={};function m(e,a,r){this.props=e,this.context=a,this.refs=f,this.updater=r||d}function g(){}function O(e,a,r){this.props=e,this.context=a,this.refs=f,this.updater=r||d}m.prototype.isReactComponent={},m.prototype.setState=function(e,a){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(h(85));this.updater.enqueueSetState(this,e,a,"setState")},m.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},g.prototype=m.prototype;var j=O.prototype=new g;j.constructor=O,t(j,m.prototype),j.isPureReactComponent=!0;var k={current:null},y=Object.prototype.hasOwnProperty,_={key:!0,ref:!0,__self:!0,__source:!0};function N(e,a,r){var t,n={},p=null,o=null;if(null!=a)for(t in void 0!==a.ref&&(o=a.ref),void 0!==a.key&&(p=""+a.key),a)y.call(a,t)&&!_.hasOwnProperty(t)&&(n[t]=a[t]);var b=arguments.length-2;if(1===b)n.children=r;else if(1<b){for(var s=Array(b),i=0;i<b;i++)s[i]=arguments[i+2];n.children=s}if(e&&e.defaultProps)for(t in b=e.defaultProps)void 0===n[t]&&(n[t]=b[t]);return{$$typeof:c,type:e,key:p,ref:o,props:n,_owner:k.current}}function v(e){return"object"==typeof e&&null!==e&&e.$$typeof===c}var S=/\/+/g;function x(e,a){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var a={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return a[e]}))}(""+e.key):a.toString(36)}function G(e,a,r,t,p){var o=typeof e;"undefined"!==o&&"boolean"!==o||(e=null);var b=!1;if(null===e)b=!0;else switch(o){case"string":case"number":b=!0;break;case"object":switch(e.$$typeof){case c:case n:b=!0}}if(b)return p=p(b=e),e=""===t?"."+x(b,0):t,Array.isArray(p)?(r="",null!=e&&(r=e.replace(S,"$&/")+"/"),G(p,a,r,"",(function(e){return e}))):null!=p&&(v(p)&&(p=function(e,a){return{$$typeof:c,type:e.type,key:a,ref:e.ref,props:e.props,_owner:e._owner}}(p,r+(!p.key||b&&b.key===p.key?"":(""+p.key).replace(S,"$&/")+"/")+e)),a.push(p)),1;if(b=0,t=""===t?".":t+":",Array.isArray(e))for(var s=0;s<e.length;s++){var i=t+x(o=e[s],s);b+=G(o,a,r,i,p)}else if(i=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=u&&e[u]||e["@@iterator"])?e:null}(e),"function"==typeof i)for(e=i.call(e),s=0;!(o=e.next()).done;)b+=G(o=o.value,a,r,i=t+x(o,s++),p);else if("object"===o)throw a=""+e,Error(h(31,"[object Object]"===a?"object with keys {"+Object.keys(e).join(", ")+"}":a));return b}function T(e,a,r){if(null==e)return e;var t=[],c=0;return G(e,t,"","",(function(e){return a.call(r,e,c++)})),t}function C(e){if(-1===e._status){var a=e._result;a=a(),e._status=0,e._result=a,a.then((function(a){0===e._status&&(a=a.default,e._status=1,e._result=a)}),(function(a){0===e._status&&(e._status=2,e._result=a)}))}if(1===e._status)return e._result;throw e._result}var w={current:null};function D(){var e=w.current;if(null===e)throw Error(h(321));return e}var L={ReactCurrentDispatcher:w,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:k,IsSomeRendererActing:{current:!1},assign:t};a.Children={map:T,forEach:function(e,a,r){T(e,(function(){a.apply(this,arguments)}),r)},count:function(e){var a=0;return T(e,(function(){a++})),a},toArray:function(e){return T(e,(function(e){return e}))||[]},only:function(e){if(!v(e))throw Error(h(143));return e}},a.Component=m,a.PureComponent=O,a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=L,a.cloneElement=function(e,a,r){if(null==e)throw Error(h(267,e));var n=t({},e.props),p=e.key,o=e.ref,b=e._owner;if(null!=a){if(void 0!==a.ref&&(o=a.ref,b=k.current),void 0!==a.key&&(p=""+a.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(i in a)y.call(a,i)&&!_.hasOwnProperty(i)&&(n[i]=void 0===a[i]&&void 0!==s?s[i]:a[i])}var i=arguments.length-2;if(1===i)n.children=r;else if(1<i){s=Array(i);for(var l=0;l<i;l++)s[l]=arguments[l+2];n.children=s}return{$$typeof:c,type:e.type,key:p,ref:o,props:n,_owner:b}},a.createContext=function(e,a){return void 0===a&&(a=null),(e={$$typeof:o,_calculateChangedBits:a,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:p,_context:e},e.Consumer=e},a.createElement=N,a.createFactory=function(e){var a=N.bind(null,e);return a.type=e,a},a.createRef=function(){return{current:null}},a.forwardRef=function(e){return{$$typeof:b,render:e}},a.isValidElement=v,a.lazy=function(e){return{$$typeof:i,_payload:{_status:-1,_result:e},_init:C}},a.memo=function(e,a){return{$$typeof:s,type:e,compare:void 0===a?null:a}},a.useCallback=function(e,a){return D().useCallback(e,a)},a.useContext=function(e,a){return D().useContext(e,a)},a.useDebugValue=function(){},a.useEffect=function(e,a){return D().useEffect(e,a)},a.useImperativeHandle=function(e,a,r){return D().useImperativeHandle(e,a,r)},a.useLayoutEffect=function(e,a){return D().useLayoutEffect(e,a)},a.useMemo=function(e,a){return D().useMemo(e,a)},a.useReducer=function(e,a,r){return D().useReducer(e,a,r)},a.useRef=function(e){return D().useRef(e)},a.useState=function(e){return D().useState(e)},a.version="17.0.1"},1336:function(e,a,r){"use strict";var t=Object.getOwnPropertySymbols,c=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function p(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var a={},r=0;r<10;r++)a["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(a).map((function(e){return a[e]})).join(""))return!1;var t={};return"abcdefghijklmnopqrst".split("").forEach((function(e){t[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},t)).join("")}catch(c){return!1}}()?Object.assign:function(e,a){for(var r,o,b=p(e),s=1;s<arguments.length;s++){for(var i in r=Object(arguments[s]))c.call(r,i)&&(b[i]=r[i]);if(t){o=t(r);for(var l=0;l<o.length;l++)n.call(r,o[l])&&(b[o[l]]=r[o[l]])}}return b}},845:function(e,a,r){"use strict";r.r(a),r.d(a,"frontMatter",(function(){return o})),r.d(a,"metadata",(function(){return b})),r.d(a,"rightToc",(function(){return s})),r.d(a,"default",(function(){return l}));var t=r(3),c=r(7),n=(r(1334),r(1333)),p=["components"],o={id:"_packages_graphback_core_src_scalars_index_",title:"packages/graphback-core/src/scalars/index",sidebar_label:"packages/graphback-core/src/scalars/index"},b={unversionedId:"api/graphback-core/modules/_packages_graphback_core_src_scalars_index_",id:"api/graphback-core/modules/_packages_graphback_core_src_scalars_index_",isDocsHomePage:!1,title:"packages/graphback-core/src/scalars/index",description:"Index",source:"@site/../docs/api/graphback-core/modules/_packages_graphback_core_src_scalars_index_.md",slug:"/api/graphback-core/modules/_packages_graphback_core_src_scalars_index_",permalink:"/docs/next/api/graphback-core/modules/_packages_graphback_core_src_scalars_index_",editUrl:"https://github.com/aerogear/graphback/edit/master/website/../docs/api/graphback-core/modules/_packages_graphback_core_src_scalars_index_.md",version:"current",sidebar_label:"packages/graphback-core/src/scalars/index"},s=[{value:"Index",id:"index",children:[{value:"Variables",id:"variables",children:[]},{value:"Functions",id:"functions",children:[]}]},{value:"Variables",id:"variables-1",children:[{value:"<code>Const</code> GraphbackDate",id:"const-graphbackdate",children:[]},{value:"<code>Const</code> GraphbackDateTime",id:"const-graphbackdatetime",children:[]},{value:"<code>Const</code> GraphbackJSON",id:"const-graphbackjson",children:[]},{value:"<code>Const</code> GraphbackJSONObject",id:"const-graphbackjsonobject",children:[]},{value:"<code>Const</code> GraphbackObjectID",id:"const-graphbackobjectid",children:[]},{value:"<code>Const</code> GraphbackTime",id:"const-graphbacktime",children:[]},{value:"<code>Const</code> GraphbackTimestamp",id:"const-graphbacktimestamp",children:[]},{value:"<code>Const</code> graphbackScalarsTypes",id:"const-graphbackscalarstypes",children:[]}]},{value:"Functions",id:"functions-1",children:[{value:"isSpecifiedGraphbackJSONScalarType",id:"isspecifiedgraphbackjsonscalartype",children:[]},{value:"isSpecifiedGraphbackScalarType",id:"isspecifiedgraphbackscalartype",children:[]}]}],i={rightToc:s};function l(e){var a=e.components,r=Object(c.a)(e,p);return Object(n.b)("wrapper",Object(t.a)({},i,r,{components:a,mdxType:"MDXLayout"}),Object(n.b)("h2",{id:"index"},"Index"),Object(n.b)("h3",{id:"variables"},"Variables"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",{parentName:"li",href:"/docs/next/api/graphback-core/modules/_packages_graphback_core_src_scalars_index_#const-graphbackdate"},"GraphbackDate")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",{parentName:"li",href:"/docs/next/api/graphback-core/modules/_packages_graphback_core_src_scalars_index_#const-graphbackdatetime"},"GraphbackDateTime")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",{parentName:"li",href:"/docs/next/api/graphback-core/modules/_packages_graphback_core_src_scalars_index_#const-graphbackjson"},"GraphbackJSON")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",{parentName:"li",href:"/docs/next/api/graphback-core/modules/_packages_graphback_core_src_scalars_index_#const-graphbackjsonobject"},"GraphbackJSONObject")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",{parentName:"li",href:"/docs/next/api/graphback-core/modules/_packages_graphback_core_src_scalars_index_#const-graphbackobjectid"},"GraphbackObjectID")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",{parentName:"li",href:"/docs/next/api/graphback-core/modules/_packages_graphback_core_src_scalars_index_#const-graphbacktime"},"GraphbackTime")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",{parentName:"li",href:"/docs/next/api/graphback-core/modules/_packages_graphback_core_src_scalars_index_#const-graphbacktimestamp"},"GraphbackTimestamp")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",{parentName:"li",href:"/docs/next/api/graphback-core/modules/_packages_graphback_core_src_scalars_index_#const-graphbackscalarstypes"},"graphbackScalarsTypes"))),Object(n.b)("h3",{id:"functions"},"Functions"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",{parentName:"li",href:"/docs/next/api/graphback-core/modules/_packages_graphback_core_src_scalars_index_#isspecifiedgraphbackjsonscalartype"},"isSpecifiedGraphbackJSONScalarType")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",{parentName:"li",href:"/docs/next/api/graphback-core/modules/_packages_graphback_core_src_scalars_index_#isspecifiedgraphbackscalartype"},"isSpecifiedGraphbackScalarType"))),Object(n.b)("h2",{id:"variables-1"},"Variables"),Object(n.b)("h3",{id:"const-graphbackdate"},Object(n.b)("inlineCode",{parentName:"h3"},"Const")," GraphbackDate"),Object(n.b)("p",null,"\u2022 ",Object(n.b)("strong",{parentName:"p"},"GraphbackDate"),": ",Object(n.b)("em",{parentName:"p"},"GraphQLScalarType\u2039\u203a"),' = new GraphQLScalarType({\n...extractConfig(DateResolver),\nname: "GraphbackDate"\n})'),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Defined in ",Object(n.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/0a237f8/packages/graphback-core/src/scalars/index.ts#L15"},"packages/graphback-core/src/scalars/index.ts:15"))),Object(n.b)("hr",null),Object(n.b)("h3",{id:"const-graphbackdatetime"},Object(n.b)("inlineCode",{parentName:"h3"},"Const")," GraphbackDateTime"),Object(n.b)("p",null,"\u2022 ",Object(n.b)("strong",{parentName:"p"},"GraphbackDateTime"),": ",Object(n.b)("em",{parentName:"p"},"GraphQLScalarType\u2039\u203a"),' = new GraphQLScalarType({\n...extractConfig(DateTimeResolver),\nname: "GraphbackDateTime"\n})'),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Defined in ",Object(n.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/0a237f8/packages/graphback-core/src/scalars/index.ts#L20"},"packages/graphback-core/src/scalars/index.ts:20"))),Object(n.b)("hr",null),Object(n.b)("h3",{id:"const-graphbackjson"},Object(n.b)("inlineCode",{parentName:"h3"},"Const")," GraphbackJSON"),Object(n.b)("p",null,"\u2022 ",Object(n.b)("strong",{parentName:"p"},"GraphbackJSON"),": ",Object(n.b)("em",{parentName:"p"},"GraphQLScalarType\u2039\u203a"),' = new GraphQLScalarType({\n...extractConfig(JSONResolver),\nname: "GraphbackJSON"\n})'),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Defined in ",Object(n.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/0a237f8/packages/graphback-core/src/scalars/index.ts#L34"},"packages/graphback-core/src/scalars/index.ts:34"))),Object(n.b)("hr",null),Object(n.b)("h3",{id:"const-graphbackjsonobject"},Object(n.b)("inlineCode",{parentName:"h3"},"Const")," GraphbackJSONObject"),Object(n.b)("p",null,"\u2022 ",Object(n.b)("strong",{parentName:"p"},"GraphbackJSONObject"),": ",Object(n.b)("em",{parentName:"p"},"GraphQLScalarType\u2039\u203a"),' = new GraphQLScalarType({\n...extractConfig(JSONObjectResolver),\nname: "GraphbackJSONObject"\n})'),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Defined in ",Object(n.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/0a237f8/packages/graphback-core/src/scalars/index.ts#L39"},"packages/graphback-core/src/scalars/index.ts:39"))),Object(n.b)("hr",null),Object(n.b)("h3",{id:"const-graphbackobjectid"},Object(n.b)("inlineCode",{parentName:"h3"},"Const")," GraphbackObjectID"),Object(n.b)("p",null,"\u2022 ",Object(n.b)("strong",{parentName:"p"},"GraphbackObjectID"),": ",Object(n.b)("em",{parentName:"p"},"GraphQLScalarType\u2039\u203a"),' = new GraphQLScalarType({\n...objectIDConfig,\nname: "GraphbackObjectID",\nparseValue: (value: any) => parseObjectID(parseValue(value)),\nparseLiteral: (ast: ValueNode, variables: { ',"[key: string]",": any}) => parseObjectID(parseLiteral(ast, variables))\n})"),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Defined in ",Object(n.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/0a237f8/packages/graphback-core/src/scalars/index.ts#L27"},"packages/graphback-core/src/scalars/index.ts:27"))),Object(n.b)("hr",null),Object(n.b)("h3",{id:"const-graphbacktime"},Object(n.b)("inlineCode",{parentName:"h3"},"Const")," GraphbackTime"),Object(n.b)("p",null,"\u2022 ",Object(n.b)("strong",{parentName:"p"},"GraphbackTime"),": ",Object(n.b)("em",{parentName:"p"},"GraphQLScalarType\u2039\u203a"),' = new GraphQLScalarType({\n...extractConfig(TimeResolver),\nname: "GraphbackTime"\n})'),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Defined in ",Object(n.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/0a237f8/packages/graphback-core/src/scalars/index.ts#L5"},"packages/graphback-core/src/scalars/index.ts:5"))),Object(n.b)("hr",null),Object(n.b)("h3",{id:"const-graphbacktimestamp"},Object(n.b)("inlineCode",{parentName:"h3"},"Const")," GraphbackTimestamp"),Object(n.b)("p",null,"\u2022 ",Object(n.b)("strong",{parentName:"p"},"GraphbackTimestamp"),": ",Object(n.b)("em",{parentName:"p"},"GraphQLScalarType\u2039\u203a"),' = new GraphQLScalarType({\n...extractConfig(TimestampResolver),\nname: "GraphbackTimestamp"\n})'),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Defined in ",Object(n.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/0a237f8/packages/graphback-core/src/scalars/index.ts#L10"},"packages/graphback-core/src/scalars/index.ts:10"))),Object(n.b)("hr",null),Object(n.b)("h3",{id:"const-graphbackscalarstypes"},Object(n.b)("inlineCode",{parentName:"h3"},"Const")," graphbackScalarsTypes"),Object(n.b)("p",null,"\u2022 ",Object(n.b)("strong",{parentName:"p"},"graphbackScalarsTypes"),": ",Object(n.b)("em",{parentName:"p"},"GraphQLScalarType\u2039\u203a[]")," = ","[ GraphbackTime, GraphbackDate, GraphbackJSON, GraphbackObjectID, GraphbackDateTime, GraphbackTimestamp, GraphbackJSONObject ]"),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Defined in ",Object(n.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/0a237f8/packages/graphback-core/src/scalars/index.ts#L44"},"packages/graphback-core/src/scalars/index.ts:44"))),Object(n.b)("h2",{id:"functions-1"},"Functions"),Object(n.b)("h3",{id:"isspecifiedgraphbackjsonscalartype"},"isSpecifiedGraphbackJSONScalarType"),Object(n.b)("p",null,"\u25b8 ",Object(n.b)("strong",{parentName:"p"},"isSpecifiedGraphbackJSONScalarType"),"(",Object(n.b)("inlineCode",{parentName:"p"},"type"),": GraphQLNamedType): ",Object(n.b)("em",{parentName:"p"},"boolean")),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Defined in ",Object(n.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/0a237f8/packages/graphback-core/src/scalars/index.ts#L60"},"packages/graphback-core/src/scalars/index.ts:60"))),Object(n.b)("p",null,"Checks if the type is on the known JSON Graphback supported scalars"),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Parameters:")),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",{parentName:"tr",align:null},"Name"),Object(n.b)("th",{parentName:"tr",align:null},"Type"),Object(n.b)("th",{parentName:"tr",align:null},"Description"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"type")),Object(n.b)("td",{parentName:"tr",align:null},"GraphQLNamedType"),Object(n.b)("td",{parentName:"tr",align:null},"GraphQL type")))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Returns:")," ",Object(n.b)("em",{parentName:"p"},"boolean")),Object(n.b)("hr",null),Object(n.b)("h3",{id:"isspecifiedgraphbackscalartype"},"isSpecifiedGraphbackScalarType"),Object(n.b)("p",null,"\u25b8 ",Object(n.b)("strong",{parentName:"p"},"isSpecifiedGraphbackScalarType"),"(",Object(n.b)("inlineCode",{parentName:"p"},"type"),": GraphQLNamedType): ",Object(n.b)("em",{parentName:"p"},"boolean")),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Defined in ",Object(n.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/0a237f8/packages/graphback-core/src/scalars/index.ts#L51"},"packages/graphback-core/src/scalars/index.ts:51"))),Object(n.b)("p",null,"Checks if the type is on the default Graphback supported scalars"),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Parameters:")),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",{parentName:"tr",align:null},"Name"),Object(n.b)("th",{parentName:"tr",align:null},"Type"),Object(n.b)("th",{parentName:"tr",align:null},"Description"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"type")),Object(n.b)("td",{parentName:"tr",align:null},"GraphQLNamedType"),Object(n.b)("td",{parentName:"tr",align:null},"GraphQL type")))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Returns:")," ",Object(n.b)("em",{parentName:"p"},"boolean")))}l.isMDXComponent=!0}}]);