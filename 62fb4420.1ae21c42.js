(window.webpackJsonp=window.webpackJsonp||[]).push([[492],{1333:function(e,t,a){"use strict";a.d(t,"a",(function(){return d})),a.d(t,"b",(function(){return s}));var n=a(0),b=a.n(n);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function p(e,t){if(null==e)return{};var a,n,b=function(e,t){if(null==e)return{};var a,n,b={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(b[a]=e[a]);return b}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(b[a]=e[a])}return b}var o=b.a.createContext({}),i=function(e){var t=b.a.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):c(c({},t),e)),a},d=function(e){var t=i(e.components);return b.a.createElement(o.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return b.a.createElement(b.a.Fragment,{},t)}},u=b.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,r=e.originalType,l=e.parentName,o=p(e,["components","mdxType","originalType","parentName"]),d=i(a),u=n,s=d["".concat(l,".").concat(u)]||d[u]||m[u]||r;return a?b.a.createElement(s,c(c({ref:t},o),{},{components:a})):b.a.createElement(s,c({ref:t},o))}));function s(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var r=a.length,l=new Array(r);l[0]=u;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c.mdxType="string"==typeof e?e:n,l[1]=c;for(var o=2;o<r;o++)l[o]=a[o];return b.a.createElement.apply(null,l)}return b.a.createElement.apply(null,a)}u.displayName="MDXCreateElement"},559:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return c})),a.d(t,"metadata",(function(){return p})),a.d(t,"rightToc",(function(){return o})),a.d(t,"default",(function(){return d}));var n=a(3),b=a(7),r=(a(0),a(1333)),l=["components"],c={id:"_db_buildmodeltablemap_",title:"db/buildModelTableMap",sidebar_label:"db/buildModelTableMap"},p={unversionedId:"api/graphback-core/modules/_db_buildmodeltablemap_",id:"version-1.0/api/graphback-core/modules/_db_buildmodeltablemap_",isDocsHomePage:!1,title:"db/buildModelTableMap",description:"Index",source:"@site/versioned_docs/version-1.0/api/graphback-core/modules/_db_buildmodeltablemap_.md",slug:"/api/graphback-core/modules/_db_buildmodeltablemap_",permalink:"/docs/api/graphback-core/modules/_db_buildmodeltablemap_",editUrl:"https://github.com/aerogear/graphback/edit/master/website/versioned_docs/version-1.0/api/graphback-core/modules/_db_buildmodeltablemap_.md",version:"1.0",sidebar_label:"db/buildModelTableMap"},o=[{value:"Index",id:"index",children:[{value:"Interfaces",id:"interfaces",children:[]},{value:"Functions",id:"functions",children:[]}]},{value:"Functions",id:"functions-1",children:[{value:"<code>Const</code> buildModelTableMap",id:"const-buildmodeltablemap",children:[]},{value:"getColumnName",id:"getcolumnname",children:[]},{value:"getTableName",id:"gettablename",children:[]}]}],i={rightToc:o};function d(e){var t=e.components,a=Object(b.a)(e,l);return Object(r.b)("wrapper",Object(n.a)({},i,a,{components:t,mdxType:"MDXLayout"}),Object(r.b)("h2",{id:"index"},"Index"),Object(r.b)("h3",{id:"interfaces"},"Interfaces"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"/docs/api/graphback-core/interfaces/_db_buildmodeltablemap_.modeltablemap"},"ModelTableMap"))),Object(r.b)("h3",{id:"functions"},"Functions"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"/docs/api/graphback-core/modules/_db_buildmodeltablemap_#const-buildmodeltablemap"},"buildModelTableMap")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"/docs/api/graphback-core/modules/_db_buildmodeltablemap_#getcolumnname"},"getColumnName")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"/docs/api/graphback-core/modules/_db_buildmodeltablemap_#gettablename"},"getTableName"))),Object(r.b)("h2",{id:"functions-1"},"Functions"),Object(r.b)("h3",{id:"const-buildmodeltablemap"},Object(r.b)("inlineCode",{parentName:"h3"},"Const")," buildModelTableMap"),Object(r.b)("p",null,"\u25b8 ",Object(r.b)("strong",{parentName:"p"},"buildModelTableMap"),"(",Object(r.b)("inlineCode",{parentName:"p"},"model"),": GraphQLObjectType): ",Object(r.b)("em",{parentName:"p"},Object(r.b)("a",{parentName:"em",href:"/docs/api/graphback-core/interfaces/_db_buildmodeltablemap_.modeltablemap"},"ModelTableMap"))),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"Defined in ",Object(r.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/db/buildModelTableMap.ts#L75"},"packages/graphback-core/src/db/buildModelTableMap.ts:75"))),Object(r.b)("p",null,"Builds a database mapping model of a GraphQLObject type."),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Parameters:")),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",{parentName:"tr",align:null},"Name"),Object(r.b)("th",{parentName:"tr",align:null},"Type"),Object(r.b)("th",{parentName:"tr",align:null},"Description"))),Object(r.b)("tbody",{parentName:"table"},Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"model")),Object(r.b)("td",{parentName:"tr",align:null},"GraphQLObjectType"),Object(r.b)("td",{parentName:"tr",align:null},"The GraphQL object data model representation")))),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Returns:")," ",Object(r.b)("em",{parentName:"p"},Object(r.b)("a",{parentName:"em",href:"/docs/api/graphback-core/interfaces/_db_buildmodeltablemap_.modeltablemap"},"ModelTableMap"))),Object(r.b)("p",null,"A model containing the table name, any field customisations and a mapping of the primary key field."),Object(r.b)("hr",null),Object(r.b)("h3",{id:"getcolumnname"},"getColumnName"),Object(r.b)("p",null,"\u25b8 ",Object(r.b)("strong",{parentName:"p"},"getColumnName"),"(",Object(r.b)("inlineCode",{parentName:"p"},"field"),": GraphQLField\u2039any, any\u203a): ",Object(r.b)("em",{parentName:"p"},"string")),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"Defined in ",Object(r.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/db/buildModelTableMap.ts#L44"},"packages/graphback-core/src/db/buildModelTableMap.ts:44"))),Object(r.b)("p",null,"Gets the datase column name for a GraphQL field.\nChecks for the ",Object(r.b)("inlineCode",{parentName:"p"},"@db(name)")," annotation for a customised name"),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Parameters:")),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",{parentName:"tr",align:null},"Name"),Object(r.b)("th",{parentName:"tr",align:null},"Type"),Object(r.b)("th",{parentName:"tr",align:null},"Description"))),Object(r.b)("tbody",{parentName:"table"},Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"field")),Object(r.b)("td",{parentName:"tr",align:null},"GraphQLField\u2039any, any\u203a"),Object(r.b)("td",{parentName:"tr",align:null})))),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Returns:")," ",Object(r.b)("em",{parentName:"p"},"string")),Object(r.b)("hr",null),Object(r.b)("h3",{id:"gettablename"},"getTableName"),Object(r.b)("p",null,"\u25b8 ",Object(r.b)("strong",{parentName:"p"},"getTableName"),"(",Object(r.b)("inlineCode",{parentName:"p"},"model"),": GraphQLObjectType): ",Object(r.b)("em",{parentName:"p"},"string")),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"Defined in ",Object(r.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/db/buildModelTableMap.ts#L27"},"packages/graphback-core/src/db/buildModelTableMap.ts:27"))),Object(r.b)("p",null,"Gets the datase column name for a GraphQL type.\nChecks for the ",Object(r.b)("inlineCode",{parentName:"p"},"@db(name)")," annotation for a customised name"),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Parameters:")),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",{parentName:"tr",align:null},"Name"),Object(r.b)("th",{parentName:"tr",align:null},"Type"))),Object(r.b)("tbody",{parentName:"table"},Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"model")),Object(r.b)("td",{parentName:"tr",align:null},"GraphQLObjectType")))),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Returns:")," ",Object(r.b)("em",{parentName:"p"},"string")))}d.isMDXComponent=!0}}]);