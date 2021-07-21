/*! For license information please see 9edc74ac.d03e2d0d.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[775],{1333:function(e,n,t){"use strict";t.d(n,"a",(function(){return s})),t.d(n,"b",(function(){return m}));var r=t(0),a=t.n(r);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var u=a.a.createContext({}),p=function(e){var n=a.a.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},s=function(e){var n=p(e.components);return a.a.createElement(u.Provider,{value:n},e.children)},b={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},d=a.a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),s=p(t),d=r,m=s["".concat(o,".").concat(d)]||s[d]||b[d]||i;return t?a.a.createElement(m,l(l({ref:n},u),{},{components:t})):a.a.createElement(m,l({ref:n},u))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,o=new Array(i);o[0]=d;var l={};for(var c in n)hasOwnProperty.call(n,c)&&(l[c]=n[c]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var u=2;u<i;u++)o[u]=t[u];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,t)}d.displayName="MDXCreateElement"},1334:function(e,n,t){"use strict";e.exports=t(1335)},1335:function(e,n,t){"use strict";var r=t(1336),a=60103,i=60106;n.Fragment=60107,n.StrictMode=60108,n.Profiler=60114;var o=60109,l=60110,c=60112;n.Suspense=60113;var u=60115,p=60116;if("function"==typeof Symbol&&Symbol.for){var s=Symbol.for;a=s("react.element"),i=s("react.portal"),n.Fragment=s("react.fragment"),n.StrictMode=s("react.strict_mode"),n.Profiler=s("react.profiler"),o=s("react.provider"),l=s("react.context"),c=s("react.forward_ref"),n.Suspense=s("react.suspense"),u=s("react.memo"),p=s("react.lazy")}var b="function"==typeof Symbol&&Symbol.iterator;function d(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var m={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},f={};function g(e,n,t){this.props=e,this.context=n,this.refs=f,this.updater=t||m}function y(){}function h(e,n,t){this.props=e,this.context=n,this.refs=f,this.updater=t||m}g.prototype.isReactComponent={},g.prototype.setState=function(e,n){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(d(85));this.updater.enqueueSetState(this,e,n,"setState")},g.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},y.prototype=g.prototype;var O=h.prototype=new y;O.constructor=h,r(O,g.prototype),O.isPureReactComponent=!0;var j={current:null},N=Object.prototype.hasOwnProperty,v={key:!0,ref:!0,__self:!0,__source:!0};function C(e,n,t){var r,i={},o=null,l=null;if(null!=n)for(r in void 0!==n.ref&&(l=n.ref),void 0!==n.key&&(o=""+n.key),n)N.call(n,r)&&!v.hasOwnProperty(r)&&(i[r]=n[r]);var c=arguments.length-2;if(1===c)i.children=t;else if(1<c){for(var u=Array(c),p=0;p<c;p++)u[p]=arguments[p+2];i.children=u}if(e&&e.defaultProps)for(r in c=e.defaultProps)void 0===i[r]&&(i[r]=c[r]);return{$$typeof:a,type:e,key:o,ref:l,props:i,_owner:j.current}}function S(e){return"object"==typeof e&&null!==e&&e.$$typeof===a}var k=/\/+/g;function w(e,n){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return n[e]}))}(""+e.key):n.toString(36)}function x(e,n,t,r,o){var l=typeof e;"undefined"!==l&&"boolean"!==l||(e=null);var c=!1;if(null===e)c=!0;else switch(l){case"string":case"number":c=!0;break;case"object":switch(e.$$typeof){case a:case i:c=!0}}if(c)return o=o(c=e),e=""===r?"."+w(c,0):r,Array.isArray(o)?(t="",null!=e&&(t=e.replace(k,"$&/")+"/"),x(o,n,t,"",(function(e){return e}))):null!=o&&(S(o)&&(o=function(e,n){return{$$typeof:a,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}(o,t+(!o.key||c&&c.key===o.key?"":(""+o.key).replace(k,"$&/")+"/")+e)),n.push(o)),1;if(c=0,r=""===r?".":r+":",Array.isArray(e))for(var u=0;u<e.length;u++){var p=r+w(l=e[u],u);c+=x(l,n,t,p,o)}else if("function"==typeof(p=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=b&&e[b]||e["@@iterator"])?e:null}(e)))for(e=p.call(e),u=0;!(l=e.next()).done;)c+=x(l=l.value,n,t,p=r+w(l,u++),o);else if("object"===l)throw n=""+e,Error(d(31,"[object Object]"===n?"object with keys {"+Object.keys(e).join(", ")+"}":n));return c}function _(e,n,t){if(null==e)return e;var r=[],a=0;return x(e,r,"","",(function(e){return n.call(t,e,a++)})),r}function q(e){if(-1===e._status){var n=e._result;n=n(),e._status=0,e._result=n,n.then((function(n){0===e._status&&(n=n.default,e._status=1,e._result=n)}),(function(n){0===e._status&&(e._status=2,e._result=n)}))}if(1===e._status)return e._result;throw e._result}var D={current:null};function E(){var e=D.current;if(null===e)throw Error(d(321));return e}var P={ReactCurrentDispatcher:D,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:j,IsSomeRendererActing:{current:!1},assign:r};n.Children={map:_,forEach:function(e,n,t){_(e,(function(){n.apply(this,arguments)}),t)},count:function(e){var n=0;return _(e,(function(){n++})),n},toArray:function(e){return _(e,(function(e){return e}))||[]},only:function(e){if(!S(e))throw Error(d(143));return e}},n.Component=g,n.PureComponent=h,n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=P,n.cloneElement=function(e,n,t){if(null==e)throw Error(d(267,e));var i=r({},e.props),o=e.key,l=e.ref,c=e._owner;if(null!=n){if(void 0!==n.ref&&(l=n.ref,c=j.current),void 0!==n.key&&(o=""+n.key),e.type&&e.type.defaultProps)var u=e.type.defaultProps;for(p in n)N.call(n,p)&&!v.hasOwnProperty(p)&&(i[p]=void 0===n[p]&&void 0!==u?u[p]:n[p])}var p=arguments.length-2;if(1===p)i.children=t;else if(1<p){u=Array(p);for(var s=0;s<p;s++)u[s]=arguments[s+2];i.children=u}return{$$typeof:a,type:e.type,key:o,ref:l,props:i,_owner:c}},n.createContext=function(e,n){return void 0===n&&(n=null),(e={$$typeof:l,_calculateChangedBits:n,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:o,_context:e},e.Consumer=e},n.createElement=C,n.createFactory=function(e){var n=C.bind(null,e);return n.type=e,n},n.createRef=function(){return{current:null}},n.forwardRef=function(e){return{$$typeof:c,render:e}},n.isValidElement=S,n.lazy=function(e){return{$$typeof:p,_payload:{_status:-1,_result:e},_init:q}},n.memo=function(e,n){return{$$typeof:u,type:e,compare:void 0===n?null:n}},n.useCallback=function(e,n){return E().useCallback(e,n)},n.useContext=function(e,n){return E().useContext(e,n)},n.useDebugValue=function(){},n.useEffect=function(e,n){return E().useEffect(e,n)},n.useImperativeHandle=function(e,n,t){return E().useImperativeHandle(e,n,t)},n.useLayoutEffect=function(e,n){return E().useLayoutEffect(e,n)},n.useMemo=function(e,n){return E().useMemo(e,n)},n.useReducer=function(e,n,t){return E().useReducer(e,n,t)},n.useRef=function(e){return E().useRef(e)},n.useState=function(e){return E().useState(e)},n.version="17.0.1"},1336:function(e,n,t){"use strict";var r=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;function o(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var n={},t=0;t<10;t++)n["_"+String.fromCharCode(t)]=t;if("0123456789"!==Object.getOwnPropertyNames(n).map((function(e){return n[e]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(a){return!1}}()?Object.assign:function(e,n){for(var t,l,c=o(e),u=1;u<arguments.length;u++){for(var p in t=Object(arguments[u]))a.call(t,p)&&(c[p]=t[p]);if(r){l=r(t);for(var s=0;s<l.length;s++)i.call(t,l[s])&&(c[l[s]]=t[l[s]])}}return c}},843:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return l})),t.d(n,"metadata",(function(){return c})),t.d(n,"rightToc",(function(){return u})),t.d(n,"default",(function(){return s}));var r=t(3),a=t(7),i=(t(1334),t(1333)),o=["components"],l={id:"index",title:"graphql-migrations",sidebar_label:"README"},c={unversionedId:"api/graphql-migrations/index",id:"api/graphql-migrations/index",isDocsHomePage:!1,title:"graphql-migrations",description:"Graphback",source:"@site/../docs/api/graphql-migrations/index.md",slug:"/api/graphql-migrations/index",permalink:"/docs/next/api/graphql-migrations/index",editUrl:"https://github.com/aerogear/graphback/edit/master/website/../docs/api/graphql-migrations/index.md",version:"current",sidebar_label:"README"},u=[{value:"Graphback",id:"graphback",children:[]},{value:"graphql-migrations",id:"graphql-migrations",children:[{value:"Usage",id:"usage",children:[]},{value:"Migration Options",id:"migration-options",children:[]},{value:"Model Definition",id:"model-definition",children:[]},{value:"Skip table or field",id:"skip-table-or-field",children:[]},{value:"Rename",id:"rename",children:[]},{value:"Nullable and non-nullable field",id:"nullable-and-non-nullable-field",children:[]},{value:"Default value",id:"default-value",children:[]},{value:"Primary key",id:"primary-key",children:[]},{value:"Foreign key",id:"foreign-key",children:[]},{value:"Many-to-many",id:"many-to-many",children:[]},{value:"Many-to-many on same type",id:"many-to-many-on-same-type",children:[]},{value:"Simple index",id:"simple-index",children:[]},{value:"Multiple index",id:"multiple-index",children:[]},{value:"Named index",id:"named-index",children:[]},{value:"Unique constraint",id:"unique-constraint",children:[]},{value:"Custom name",id:"custom-name",children:[]},{value:"Custom column type",id:"custom-column-type",children:[]},{value:"List",id:"list",children:[]}]}],p={rightToc:u};function s(e){var n=e.components,t=Object(a.a)(e,o);return Object(i.b)("wrapper",Object(r.a)({},p,t,{components:n,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"graphback"},"Graphback"),Object(i.b)("p",{align:"center"},Object(i.b)("img",{width:"400",src:"https://raw.githubusercontent.com/aerogear/graphback/master/website/static/img/logo.png"}),Object(i.b)("br",null),"Auto generate database structure, ",Object(i.b)("br",null),"GraphQL Resolvers and Queries from GraphQL types \ud83d\ude80"),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Documentation"),": ",Object(i.b)("a",{parentName:"p",href:"https://graphback.dev"},"https://graphback.dev"),"\n",Object(i.b)("strong",{parentName:"p"},"Repository"),": ",Object(i.b)("a",{parentName:"p",href:"https://github.com/aerogear/graphback/"},"https://github.com/aerogear/graphback/")),Object(i.b)("h2",{id:"graphql-migrations"},"graphql-migrations"),Object(i.b)("p",null,"Automatically create and update your database tables from a GraphQL schema."),Object(i.b)("h3",{id:"usage"},"Usage"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"migrateDB")," method creates and updates your tables and columns to match your GraphQL schema."),Object(i.b)("p",null,"All the database operations are wrapped in a single transaction, so your database will be fully rolled back to its initial state if an error occurs."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-ts"},"import { migrateDB } from 'graphql-migrations';\n\nconst dbConfig = {\n  client: 'pg',\n  connection: {\n    host: 'localhost',\n    user: 'your-user',\n    password: 'secret-password',\n    database: 'note-db',\n  },\n};\n\nconst schema = `\ntype Note {\n  id: ID!\n  title: String!\n  description: String\n  comments: [Comment]!\n}\n\ntype Comment {\n  id: ID!\n  description: String\n  note: Note!\n}\n`;\n\nmigrateDB(dbConfig, schema, {\n  // Additional options\n}).then(() => {\n  console.log('Database updated');\n});\n")),Object(i.b)("h3",{id:"migration-options"},"Migration Options"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"config"),": database configuration options."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"schema"),": a GraphQL schema object."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"options"),":",Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"dbSchemaName")," (default: ",Object(i.b)("inlineCode",{parentName:"li"},"'public'"),"): table schema: ",Object(i.b)("inlineCode",{parentName:"li"},"<schemaName>.<tableName>"),"."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"dbTablePrefix")," (default: ''): table name prefix: ",Object(i.b)("inlineCode",{parentName:"li"},"<prefix><tableName>"),"."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"dbColumnPrefix")," (default: ",Object(i.b)("inlineCode",{parentName:"li"},"''"),"): column name prefix: ",Object(i.b)("inlineCode",{parentName:"li"},"<prefix><columnName>"),"."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"updateComments"),": overwrite comments on table and columns."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"scalarMap")," (default: ",Object(i.b)("inlineCode",{parentName:"li"},"null"),"): Custom scalar mapping.."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"mapListToJson")," (default: ",Object(i.b)("inlineCode",{parentName:"li"},"true"),"): Map scalar lists to JSON column type by default."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"plugins")," (default: ",Object(i.b)("inlineCode",{parentName:"li"},"[]"),"): List of graphql-migrations plugins."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"debug")," (default: ",Object(i.b)("inlineCode",{parentName:"li"},"false"),"): display debugging information and SQL queries.")))),Object(i.b)("h3",{id:"model-definition"},"Model Definition"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-gql"},'"""\nNotes table\n"""\ntype Note {\n  """\n  Primary key\n  """\n  id: ID!\n  """\n  The note title\n  """\n  title: String!\n}\n')),Object(i.b)("h3",{id:"skip-table-or-field"},"Skip table or field"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-gql"},'"""\n@db.skip\n"""\ntype Error {\n  code: Int!\n  message: String!\n}\n\ntype Note {\n  id: ID!\n  title: String\n  """\n  @db.skip: true\n  """\n  computedField: Boolean\n}\n')),Object(i.b)("h3",{id:"rename"},"Rename"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-gql"},'@db.oldNames: [\'task\']\ntype Note {\n  id: ID!\n  """\n  @db.oldNames: [\'text\']\n  """\n  title: String!\n}\n')),Object(i.b)("h3",{id:"nullable-and-non-nullable-field"},"Nullable and non-nullable field"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-gql"},"type Note {\n  id: ID!\n  title: String! # not null\n}\n")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-gql"},"type Note {\n  id: ID!\n  title: String # nullable\n}\n")),Object(i.b)("h3",{id:"default-value"},"Default value"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-gql"},'type Note {\n  id: ID!\n  """\n  default(value: \'Note title\')\n  """\n  title: String\n}\n')),Object(i.b)("h3",{id:"primary-key"},"Primary key"),Object(i.b)("p",null,"Each type must have a primary key. The primary key field must be ",Object(i.b)("inlineCode",{parentName:"p"},"id")," and the type must be ",Object(i.b)("inlineCode",{parentName:"p"},"ID"),"."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-gql"},"type Note {\n  id: ID!\n  title: String!\n}\n")),Object(i.b)("h3",{id:"foreign-key"},"Foreign key"),Object(i.b)("p",null,"To set a foreign key, set a field reference to the related type."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-gql"},"type Comment {\n  id: ID!\n  note: Note! # this creates a `noteId` column in the `comment` table.\n}\n\ntype Note {\n  id: ID!\n  title: String!\n}\n")),Object(i.b)("h3",{id:"many-to-many"},"Many-to-many"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-gql"},'type User {\n  id: ID!\n  """\n  @db.manyToMany: \'users\'\n  """\n  messages: [Message]\n}\n\ntype Message {\n  id: ID!\n  """\n  @db.manyToMany: \'messages\'\n  """\n  users: [User]\n}\n')),Object(i.b)("h3",{id:"many-to-many-on-same-type"},"Many-to-many on same type"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-gql"},"type User {\n  id: ID!\n  friends: [User]\n}\n")),Object(i.b)("h3",{id:"simple-index"},"Simple index"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-gql"},'type User {\n  id: ID!\n  """\n  @db.index\n  """\n  email: String!\n}\n')),Object(i.b)("h3",{id:"multiple-index"},"Multiple index"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-gql"},'type User {\n  """\n  @db.index\n  """\n  id: String!\n\n  """\n  @db.index\n  """\n  email: String!\n}\n')),Object(i.b)("h3",{id:"named-index"},"Named index"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-gql"},'type User {\n  """\n  @db.index: \'myIndex\'\n  """\n  email: String!\n\n  """\n  @db.index: \'myIndex\'\n  """\n  name: String!\n}\n')),Object(i.b)("p",null,"You can specify the index type on PostgreSQL."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-gql"},'type User {\n  """\n  @db.index: { name: \'myIndex\', type: \'hash\' }\n  """\n  email: String!\n\n  """\n  You don\'t need to specify the type again.\n  @db.index: \'myIndex\'\n  """\n  name: String!\n}\n')),Object(i.b)("h3",{id:"unique-constraint"},"Unique constraint"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-gql"},'type User {\n  id: ID!\n  """\n  @db.unique\n  """\n  email: String!\n}\n')),Object(i.b)("h3",{id:"custom-name"},"Custom name"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-gql"},'"""\n@db.name: \'people\'\n"""\ntype Note {\n  id: ID!\n  """\n  @db.name: \'noteTitle\'\n  """\n  title: String!\n}\n')),Object(i.b)("h3",{id:"custom-column-type"},"Custom column type"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-gql"},'type Note {\n  id: ID!\n  """\n  @db.type: \'string\'\n  @db.length: 100\n  """\n  title: String!\n}\n')),Object(i.b)("h3",{id:"list"},"List"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-gql"},'type Note {\n  id: ID!\n  title: String!\n  """\n  @db.types: \'json\'\n  """\n  comments: [String]\n}\n')),Object(i.b)("p",null,"You can also set ",Object(i.b)("inlineCode",{parentName:"p"},"mapListToJson")," to ",Object(i.b)("inlineCode",{parentName:"p"},"true")," in the migrate options to automatically map scalar and enum lists to JSON."))}s.isMDXComponent=!0}}]);