/*! For license information please see 0be6e0b3.809dea1b.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{124:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return u})),n.d(t,"default",(function(){return s}));var r=n(3),a=n(7),o=(n(1334),n(1333)),i={id:"intro",title:"GraphQL Migrations",sidebar_label:"Introduction"},c={unversionedId:"graphql-migrations/intro",id:"graphql-migrations/intro",isDocsHomePage:!1,title:"GraphQL Migrations",description:"Graphback uses graphql-migrations to automatically create and update tables from a GraphQL schema.",source:"@site/../docs/graphql-migrations/intro.md",slug:"/graphql-migrations/intro",permalink:"/docs/next/graphql-migrations/intro",editUrl:"https://github.com/aerogear/graphback/edit/master/website/../docs/graphql-migrations/intro.md",version:"current",sidebar_label:"Introduction",sidebar:"docs",previous:{title:"Conflict Resolution strategies",permalink:"/docs/next/datasync/conflict-resolution-strategies"},next:{title:"Database Design",permalink:"/docs/next/graphql-migrations/db-design"}},u=[{value:"Compatibility",id:"compatibility",children:[]},{value:"Installation",id:"installation",children:[]},{value:"Usage",id:"usage",children:[]},{value:"Advanced usage",id:"advanced-usage",children:[]}],l={rightToc:u};function s(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Graphback uses ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://www.npmjs.com/package/graphql-migrations"}),"graphql-migrations")," to automatically create and update tables from a GraphQL schema.\nThe library compares your database schema to your GraphQL schema and executes the required changes to keep the database structure synchronised with the GraphQL schema. The package is built on top of ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"http://knexjs.org/"}),"Knex.js"),", a flexible SQL query builder."),Object(o.b)("h2",{id:"compatibility"},"Compatibility"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"PostgreSQL (create and update database)"),Object(o.b)("li",{parentName:"ul"},"SQLite (create database only)")),Object(o.b)("h2",{id:"installation"},"Installation"),Object(o.b)("p",null,"You can install ",Object(o.b)("inlineCode",{parentName:"p"},"graphql-migrations")," on your existing project using the following commmands:"),Object(o.b)("p",null,"With npm: "),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-bash"}),"npm i graphql-migrations knex\n")),Object(o.b)("p",null,"or with yarn:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-bash"}),"yarn add graphql-migrations knex\n")),Object(o.b)("h2",{id:"usage"},"Usage"),Object(o.b)("p",null,"GraphQL Migrations operates on business models defined in your schema: These are GraphQL types decorated with a ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"../model/datamodel#model"}),Object(o.b)("inlineCode",{parentName:"a"},"@model"))," annotation.\nThe package expose an API which you can programmatically set up in your source code and have it perform the migrations. "),Object(o.b)("p",null,"The package exposes a ",Object(o.b)("inlineCode",{parentName:"p"},"migrateDB")," method which creates and updates your tables and columns to match your GraphQL schema.\nAll the database operations are wrapped in a single transaction, so your database will be fully rolled back to its initial state if an error occurs.\nThe method takes three arguments as described in ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"#options"}),"migrations options")," section."),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),'import { migrateDB } from \'graphql-migrations\';\n\nconst schemaText = ```\n"""\n@model\n"""\ntype Note {\n  id: ID!\n  title: String!\n}\n```;\n\nconst dbConfig = {\n  // Knex.js based configuration\n};\n\nmigrateDB(dbConfig, schemaText, {\n  // Additional options\n}).then((ops) => {\n    console.log(ops);\n});\n...\n')),Object(o.b)("p",null,"Assuming the above code is ran against a PostgreSQL database, the following relations will be created:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-sql"}),"\\d\n              List of relations\n Schema |    Name     |   Type   |   Owner    \n--------+-------------+----------+------------\n public | note        | table    | postgresql\n public | note_id_seq | sequence | postgresql\n")),Object(o.b)("p",null,"And the ",Object(o.b)("inlineCode",{parentName:"p"},"note")," table:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-sql"}),' \\d note\n                                 Table "public.note"\n Column |          Type          |                     Modifiers                     \n--------+------------------------+---------------------------------------------------\n title  | character varying(255) | not null\n id     | integer                | not null default nextval(\'note_id_seq\'::regclass)\nIndexes:\n    "note_pkey" PRIMARY KEY, btree (id)\n')),Object(o.b)("h2",{id:"advanced-usage"},"Advanced usage"),Object(o.b)("p",null,"For more advanced usage, visit the below pages:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(r.a)({parentName:"li"},{href:"db-design"}),"Database Design")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(r.a)({parentName:"li"},{href:"api"}),"API Reference"))))}s.isMDXComponent=!0},1333:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return d}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),s=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=s(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},b=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,l=u(e,["components","mdxType","originalType","parentName"]),p=s(n),b=r,d=p["".concat(i,".").concat(b)]||p[b]||f[b]||o;return n?a.a.createElement(d,c(c({ref:t},l),{},{components:n})):a.a.createElement(d,c({ref:t},l))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=b;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var l=2;l<o;l++)i[l]=n[l];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"},1334:function(e,t,n){"use strict";e.exports=n(1335)},1335:function(e,t,n){"use strict";var r=n(1336),a=60103,o=60106;t.Fragment=60107,t.StrictMode=60108,t.Profiler=60114;var i=60109,c=60110,u=60112;t.Suspense=60113;var l=60115,s=60116;if("function"==typeof Symbol&&Symbol.for){var p=Symbol.for;a=p("react.element"),o=p("react.portal"),t.Fragment=p("react.fragment"),t.StrictMode=p("react.strict_mode"),t.Profiler=p("react.profiler"),i=p("react.provider"),c=p("react.context"),u=p("react.forward_ref"),t.Suspense=p("react.suspense"),l=p("react.memo"),s=p("react.lazy")}var f="function"==typeof Symbol&&Symbol.iterator;function b(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var d={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m={};function h(e,t,n){this.props=e,this.context=t,this.refs=m,this.updater=n||d}function y(){}function g(e,t,n){this.props=e,this.context=t,this.refs=m,this.updater=n||d}h.prototype.isReactComponent={},h.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(b(85));this.updater.enqueueSetState(this,e,t,"setState")},h.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},y.prototype=h.prototype;var O=g.prototype=new y;O.constructor=g,r(O,h.prototype),O.isPureReactComponent=!0;var j={current:null},v=Object.prototype.hasOwnProperty,w={key:!0,ref:!0,__self:!0,__source:!0};function _(e,t,n){var r,o={},i=null,c=null;if(null!=t)for(r in void 0!==t.ref&&(c=t.ref),void 0!==t.key&&(i=""+t.key),t)v.call(t,r)&&!w.hasOwnProperty(r)&&(o[r]=t[r]);var u=arguments.length-2;if(1===u)o.children=n;else if(1<u){for(var l=Array(u),s=0;s<u;s++)l[s]=arguments[s+2];o.children=l}if(e&&e.defaultProps)for(r in u=e.defaultProps)void 0===o[r]&&(o[r]=u[r]);return{$$typeof:a,type:e,key:i,ref:c,props:o,_owner:j.current}}function k(e){return"object"==typeof e&&null!==e&&e.$$typeof===a}var x=/\/+/g;function C(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function P(e,t,n,r,i){var c=typeof e;"undefined"!==c&&"boolean"!==c||(e=null);var u=!1;if(null===e)u=!0;else switch(c){case"string":case"number":u=!0;break;case"object":switch(e.$$typeof){case a:case o:u=!0}}if(u)return i=i(u=e),e=""===r?"."+C(u,0):r,Array.isArray(i)?(n="",null!=e&&(n=e.replace(x,"$&/")+"/"),P(i,t,n,"",(function(e){return e}))):null!=i&&(k(i)&&(i=function(e,t){return{$$typeof:a,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(i,n+(!i.key||u&&u.key===i.key?"":(""+i.key).replace(x,"$&/")+"/")+e)),t.push(i)),1;if(u=0,r=""===r?".":r+":",Array.isArray(e))for(var l=0;l<e.length;l++){var s=r+C(c=e[l],l);u+=P(c,t,n,s,i)}else if("function"==typeof(s=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=f&&e[f]||e["@@iterator"])?e:null}(e)))for(e=s.call(e),l=0;!(c=e.next()).done;)u+=P(c=c.value,t,n,s=r+C(c,l++),i);else if("object"===c)throw t=""+e,Error(b(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return u}function S(e,t,n){if(null==e)return e;var r=[],a=0;return P(e,r,"","",(function(e){return t.call(n,e,a++)})),r}function N(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var E={current:null};function q(){var e=E.current;if(null===e)throw Error(b(321));return e}var T={ReactCurrentDispatcher:E,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:j,IsSomeRendererActing:{current:!1},assign:r};t.Children={map:S,forEach:function(e,t,n){S(e,(function(){t.apply(this,arguments)}),n)},count:function(e){var t=0;return S(e,(function(){t++})),t},toArray:function(e){return S(e,(function(e){return e}))||[]},only:function(e){if(!k(e))throw Error(b(143));return e}},t.Component=h,t.PureComponent=g,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=T,t.cloneElement=function(e,t,n){if(null==e)throw Error(b(267,e));var o=r({},e.props),i=e.key,c=e.ref,u=e._owner;if(null!=t){if(void 0!==t.ref&&(c=t.ref,u=j.current),void 0!==t.key&&(i=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(s in t)v.call(t,s)&&!w.hasOwnProperty(s)&&(o[s]=void 0===t[s]&&void 0!==l?l[s]:t[s])}var s=arguments.length-2;if(1===s)o.children=n;else if(1<s){l=Array(s);for(var p=0;p<s;p++)l[p]=arguments[p+2];o.children=l}return{$$typeof:a,type:e.type,key:i,ref:c,props:o,_owner:u}},t.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:c,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:i,_context:e},e.Consumer=e},t.createElement=_,t.createFactory=function(e){var t=_.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:u,render:e}},t.isValidElement=k,t.lazy=function(e){return{$$typeof:s,_payload:{_status:-1,_result:e},_init:N}},t.memo=function(e,t){return{$$typeof:l,type:e,compare:void 0===t?null:t}},t.useCallback=function(e,t){return q().useCallback(e,t)},t.useContext=function(e,t){return q().useContext(e,t)},t.useDebugValue=function(){},t.useEffect=function(e,t){return q().useEffect(e,t)},t.useImperativeHandle=function(e,t,n){return q().useImperativeHandle(e,t,n)},t.useLayoutEffect=function(e,t){return q().useLayoutEffect(e,t)},t.useMemo=function(e,t){return q().useMemo(e,t)},t.useReducer=function(e,t,n){return q().useReducer(e,t,n)},t.useRef=function(e){return q().useRef(e)},t.useState=function(e){return q().useState(e)},t.version="17.0.1"},1336:function(e,t,n){"use strict";var r=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;function i(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(a){return!1}}()?Object.assign:function(e,t){for(var n,c,u=i(e),l=1;l<arguments.length;l++){for(var s in n=Object(arguments[l]))a.call(n,s)&&(u[s]=n[s]);if(r){c=r(n);for(var p=0;p<c.length;p++)o.call(n,c[p])&&(u[c[p]]=n[c[p]])}}return u}}}]);