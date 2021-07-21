/*! For license information please see cf37930e.27cb258b.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[1033],{1102:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return c})),r.d(t,"metadata",(function(){return l})),r.d(t,"rightToc",(function(){return s})),r.d(t,"default",(function(){return p}));var n=r(3),a=r(7),o=(r(1334),r(1333)),i=["components"],c={id:"index",title:"graphql-serve",sidebar_label:"README"},l={unversionedId:"api/graphql-serve/index",id:"api/graphql-serve/index",isDocsHomePage:!1,title:"graphql-serve",description:"Graphback",source:"@site/../docs/api/graphql-serve/index.md",slug:"/api/graphql-serve/index",permalink:"/docs/next/api/graphql-serve/index",editUrl:"https://github.com/aerogear/graphback/edit/master/website/../docs/api/graphql-serve/index.md",version:"current",sidebar_label:"README"},s=[{value:"Graphback",id:"graphback",children:[]},{value:"Getting Started",id:"getting-started",children:[{value:"Installation",id:"installation",children:[]},{value:"Usage",id:"usage",children:[]}]},{value:"Extension to GraphQL TestX",id:"extension-to-graphql-testx",children:[]}],u={rightToc:s};function p(e){var t=e.components,r=Object(a.a)(e,i);return Object(o.b)("wrapper",Object(n.a)({},u,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"graphback"},"Graphback"),Object(o.b)("p",{align:"center"},Object(o.b)("img",{width:"400",src:"https://raw.githubusercontent.com/aerogear/graphback/master/website/static/img/logo.png"}),Object(o.b)("br",null),"Auto generate database structure, ",Object(o.b)("br",null),"GraphQL Resolvers and Queries from GraphQL types \ud83d\ude80"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Documentation"),": ",Object(o.b)("a",{parentName:"p",href:"https://graphback.dev"},"https://graphback.dev"),"\n",Object(o.b)("strong",{parentName:"p"},"Repository"),": ",Object(o.b)("a",{parentName:"p",href:"https://github.com/aerogear/graphback/"},"https://github.com/aerogear/graphback/")),Object(o.b)("h1",{id:"graphql-serve"},"graphql-serve"),Object(o.b)("p",null,"Fully functional GraphQL Server based on Graphback CRUD Specification"),Object(o.b)("p",null,"graphql-serve is a full-featured GraphQL server, based on\n",Object(o.b)("a",{parentName:"p",href:"https://graphback.dev/"},"Graphback")," and\n",Object(o.b)("a",{parentName:"p",href:"https://www.apollographql.com/docs/apollo-server/"},"Apollo Server"),". With the\nminimum configuration required, you have a server ready for testing GraphQL\nclient applications or libraries. Unlike mocking alternatives, graphql-serve\noffers persistent data between queries and mutation using in-memory SQLite\ndatabase."),Object(o.b)("h2",{id:"getting-started"},"Getting Started"),Object(o.b)("h3",{id:"installation"},"Installation"),Object(o.b)("p",null,"Using npm:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"npm install -g graphql-serve\n")),Object(o.b)("p",null,"or yarn:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"yarn global add graphql-serve\n")),Object(o.b)("h3",{id:"usage"},"Usage"),Object(o.b)("h4",{id:"gqlserve"},"gqlserve"),Object(o.b)("p",null,"The gqlserve command only needs one or more ",Object(o.b)("inlineCode",{parentName:"p"},"*.graphql")," data model file(s) in order to setup a working GraphQL server. Here is an example model file:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-graphql"},'""" @model """\ntype Note {\n  id: ID!\n  title: String!\n  description: String\n  likes: Int\n}\n')),Object(o.b)("p",null,"Assuming you have created your various ",Object(o.b)("inlineCode",{parentName:"p"},"*.graphql")," data model files in the ",Object(o.b)("inlineCode",{parentName:"p"},"models")," directory, to automatically generate resolvers and start a GraphQL server listening on port 8080 do the following:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"$ gqlserve serve models --port=8080\n")),Object(o.b)("p",null,"If you only need to see the generated GraphQL Schema, use the ",Object(o.b)("inlineCode",{parentName:"p"},"print-schema")," command:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"$ gqlserve print-schema .\n")),Object(o.b)("p",null,"The above command prints schema generated from data model files in the current directory."),Object(o.b)("p",null,"This information is also provided with the command itself:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"$ gqlserve -h\ngqlserve <command>\n\nCommands:\n  gqlserve print-schema [modelDir]     Generate and print GraphQL schema from data\n                                   model files\n  gqlserve serve [modelDir] [options]  Generate and start GraphQL server from data\n                                   model files\n\nOptions:\n  -h, --help     Show help                                             [boolean]\n  -v, --version  Show version number                                   [boolean]\n")),Object(o.b)("p",null,"For the ",Object(o.b)("inlineCode",{parentName:"p"},"serve")," command:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"$ gqlserve serve -h\ngqlserve serve [modelDir] [options]\n\nGenerate and start GraphQL server from data model files\n\nPositionals:\n  modelDir, model  Directory to search for data models                  [string]\n\nOptions:\n  --port, -p        Specify the port on which to listen on              [number]\n  --datasync, --ds  Enable datasynchronization features                [boolean]\n  -h, --help        Show help                                          [boolean]\n  -v, --version     Show version number                                [boolean]\n\nExamples:\n  gqlserve serve . -p 8080  generate schema from data model files in current\n                            directory and start GraphQL server on port 8080\n")),Object(o.b)("p",null,"Also for ",Object(o.b)("inlineCode",{parentName:"p"},"print-schema")," command:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"$ gqlserve print-schema -h\ngqlserve print-schema [modelDir]\n\nGenerate and print GraphQL schema from data model files\n\nPositionals:\n  modelDir, model  Directory to search for data models                  [string]\n\nOptions:\n  -h, --help     Show help                                             [boolean]\n  -v, --version  Show version number                                   [boolean]\n\nExamples:\n  gqlserve print-schema modelDir  only display generated schema from data model\n                              files in modelDir directory and quit\n")),Object(o.b)("p",null,"Under to hood we use Graphback to parse the Type Definitions/Data Model and\ngenerate the GraphQL schema and resolvers. See the\n",Object(o.b)("a",{parentName:"p",href:"https://graphback.dev/docs/datamodel"},"Graphback Docs on Data Model Definition")," and\n",Object(o.b)("a",{parentName:"p",href:"https://graphback.dev/docs/next/datasync/datasync-intro"},"Data Synchronization")," for data synchronization\nfeatures."),Object(o.b)("h2",{id:"extension-to-graphql-testx"},"Extension to GraphQL TestX"),Object(o.b)("p",null,"GraphQL serve is based on GraphQL-TestX:\n",Object(o.b)("a",{parentName:"p",href:"https://github.com/aerogear/graphql-testx"},"https://github.com/aerogear/graphql-testx")))}p.isMDXComponent=!0},1333:function(e,t,r){"use strict";r.d(t,"a",(function(){return p})),r.d(t,"b",(function(){return b}));var n=r(0),a=r.n(n);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=a.a.createContext({}),u=function(e){var t=a.a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},p=function(e){var t=u(e.components);return a.a.createElement(s.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=u(r),d=n,b=p["".concat(i,".").concat(d)]||p[d]||f[d]||o;return r?a.a.createElement(b,c(c({ref:t},s),{},{components:r})):a.a.createElement(b,c({ref:t},s))}));function b(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:n,i[1]=c;for(var s=2;s<o;s++)i[s]=r[s];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},1334:function(e,t,r){"use strict";e.exports=r(1335)},1335:function(e,t,r){"use strict";var n=r(1336),a=60103,o=60106;t.Fragment=60107,t.StrictMode=60108,t.Profiler=60114;var i=60109,c=60110,l=60112;t.Suspense=60113;var s=60115,u=60116;if("function"==typeof Symbol&&Symbol.for){var p=Symbol.for;a=p("react.element"),o=p("react.portal"),t.Fragment=p("react.fragment"),t.StrictMode=p("react.strict_mode"),t.Profiler=p("react.profiler"),i=p("react.provider"),c=p("react.context"),l=p("react.forward_ref"),t.Suspense=p("react.suspense"),s=p("react.memo"),u=p("react.lazy")}var f="function"==typeof Symbol&&Symbol.iterator;function d(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var b={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},h={};function m(e,t,r){this.props=e,this.context=t,this.refs=h,this.updater=r||b}function g(){}function y(e,t,r){this.props=e,this.context=t,this.refs=h,this.updater=r||b}m.prototype.isReactComponent={},m.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(d(85));this.updater.enqueueSetState(this,e,t,"setState")},m.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},g.prototype=m.prototype;var v=y.prototype=new g;v.constructor=y,n(v,m.prototype),v.isPureReactComponent=!0;var O={current:null},j=Object.prototype.hasOwnProperty,w={key:!0,ref:!0,__self:!0,__source:!0};function k(e,t,r){var n,o={},i=null,c=null;if(null!=t)for(n in void 0!==t.ref&&(c=t.ref),void 0!==t.key&&(i=""+t.key),t)j.call(t,n)&&!w.hasOwnProperty(n)&&(o[n]=t[n]);var l=arguments.length-2;if(1===l)o.children=r;else if(1<l){for(var s=Array(l),u=0;u<l;u++)s[u]=arguments[u+2];o.children=s}if(e&&e.defaultProps)for(n in l=e.defaultProps)void 0===o[n]&&(o[n]=l[n]);return{$$typeof:a,type:e,key:i,ref:c,props:o,_owner:O.current}}function S(e){return"object"==typeof e&&null!==e&&e.$$typeof===a}var q=/\/+/g;function _(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function E(e,t,r,n,i){var c=typeof e;"undefined"!==c&&"boolean"!==c||(e=null);var l=!1;if(null===e)l=!0;else switch(c){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case a:case o:l=!0}}if(l)return i=i(l=e),e=""===n?"."+_(l,0):n,Array.isArray(i)?(r="",null!=e&&(r=e.replace(q,"$&/")+"/"),E(i,t,r,"",(function(e){return e}))):null!=i&&(S(i)&&(i=function(e,t){return{$$typeof:a,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(i,r+(!i.key||l&&l.key===i.key?"":(""+i.key).replace(q,"$&/")+"/")+e)),t.push(i)),1;if(l=0,n=""===n?".":n+":",Array.isArray(e))for(var s=0;s<e.length;s++){var u=n+_(c=e[s],s);l+=E(c,t,r,u,i)}else if("function"==typeof(u=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=f&&e[f]||e["@@iterator"])?e:null}(e)))for(e=u.call(e),s=0;!(c=e.next()).done;)l+=E(c=c.value,t,r,u=n+_(c,s++),i);else if("object"===c)throw t=""+e,Error(d(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return l}function N(e,t,r){if(null==e)return e;var n=[],a=0;return E(e,n,"","",(function(e){return t.call(r,e,a++)})),n}function x(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var C={current:null};function D(){var e=C.current;if(null===e)throw Error(d(321));return e}var P={ReactCurrentDispatcher:C,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:O,IsSomeRendererActing:{current:!1},assign:n};t.Children={map:N,forEach:function(e,t,r){N(e,(function(){t.apply(this,arguments)}),r)},count:function(e){var t=0;return N(e,(function(){t++})),t},toArray:function(e){return N(e,(function(e){return e}))||[]},only:function(e){if(!S(e))throw Error(d(143));return e}},t.Component=m,t.PureComponent=y,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=P,t.cloneElement=function(e,t,r){if(null==e)throw Error(d(267,e));var o=n({},e.props),i=e.key,c=e.ref,l=e._owner;if(null!=t){if(void 0!==t.ref&&(c=t.ref,l=O.current),void 0!==t.key&&(i=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(u in t)j.call(t,u)&&!w.hasOwnProperty(u)&&(o[u]=void 0===t[u]&&void 0!==s?s[u]:t[u])}var u=arguments.length-2;if(1===u)o.children=r;else if(1<u){s=Array(u);for(var p=0;p<u;p++)s[p]=arguments[p+2];o.children=s}return{$$typeof:a,type:e.type,key:i,ref:c,props:o,_owner:l}},t.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:c,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:i,_context:e},e.Consumer=e},t.createElement=k,t.createFactory=function(e){var t=k.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:l,render:e}},t.isValidElement=S,t.lazy=function(e){return{$$typeof:u,_payload:{_status:-1,_result:e},_init:x}},t.memo=function(e,t){return{$$typeof:s,type:e,compare:void 0===t?null:t}},t.useCallback=function(e,t){return D().useCallback(e,t)},t.useContext=function(e,t){return D().useContext(e,t)},t.useDebugValue=function(){},t.useEffect=function(e,t){return D().useEffect(e,t)},t.useImperativeHandle=function(e,t,r){return D().useImperativeHandle(e,t,r)},t.useLayoutEffect=function(e,t){return D().useLayoutEffect(e,t)},t.useMemo=function(e,t){return D().useMemo(e,t)},t.useReducer=function(e,t,r){return D().useReducer(e,t,r)},t.useRef=function(e){return D().useRef(e)},t.useState=function(e){return D().useState(e)},t.version="17.0.1"},1336:function(e,t,r){"use strict";var n=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;function i(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(a){return!1}}()?Object.assign:function(e,t){for(var r,c,l=i(e),s=1;s<arguments.length;s++){for(var u in r=Object(arguments[s]))a.call(r,u)&&(l[u]=r[u]);if(n){c=n(r);for(var p=0;p<c.length;p++)o.call(r,c[p])&&(l[c[p]]=r[c[p]])}}return l}}}]);