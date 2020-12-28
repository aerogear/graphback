(window.webpackJsonp=window.webpackJsonp||[]).push([[904],{1333:function(e,t,a){"use strict";a.d(t,"a",(function(){return o})),a.d(t,"b",(function(){return j}));var r=a(0),b=a.n(r);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function c(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function p(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?c(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,r,b=function(e,t){if(null==e)return{};var a,r,b={},n=Object.keys(e);for(r=0;r<n.length;r++)a=n[r],t.indexOf(a)>=0||(b[a]=e[a]);return b}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)a=n[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(b[a]=e[a])}return b}var i=b.a.createContext({}),d=function(e){var t=b.a.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):p(p({},t),e)),a},o=function(e){var t=d(e.components);return b.a.createElement(i.Provider,{value:t},e.children)},O={inlineCode:"code",wrapper:function(e){var t=e.children;return b.a.createElement(b.a.Fragment,{},t)}},m=b.a.forwardRef((function(e,t){var a=e.components,r=e.mdxType,n=e.originalType,c=e.parentName,i=l(e,["components","mdxType","originalType","parentName"]),o=d(a),m=r,j=o["".concat(c,".").concat(m)]||o[m]||O[m]||n;return a?b.a.createElement(j,p(p({ref:t},i),{},{components:a})):b.a.createElement(j,p({ref:t},i))}));function j(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var n=a.length,c=new Array(n);c[0]=m;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p.mdxType="string"==typeof e?e:r,c[1]=p;for(var i=2;i<n;i++)c[i]=a[i];return b.a.createElement.apply(null,c)}return b.a.createElement.apply(null,a)}m.displayName="MDXCreateElement"},971:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return c})),a.d(t,"metadata",(function(){return p})),a.d(t,"rightToc",(function(){return l})),a.d(t,"default",(function(){return d}));var r=a(3),b=a(7),n=(a(0),a(1333)),c={id:"_knexdbdataprovider_.knexdbdataprovider",title:"KnexDBDataProvider",sidebar_label:"KnexDBDataProvider"},p={unversionedId:"api/graphback-runtime-knex/classes/_knexdbdataprovider_.knexdbdataprovider",id:"version-1.0/api/graphback-runtime-knex/classes/_knexdbdataprovider_.knexdbdataprovider",isDocsHomePage:!1,title:"KnexDBDataProvider",description:"Knex.js database data provider exposing basic CRUD operations that works with all databases that knex supports.",source:"@site/versioned_docs/version-1.0/api/graphback-runtime-knex/classes/_knexdbdataprovider_.knexdbdataprovider.md",slug:"/api/graphback-runtime-knex/classes/_knexdbdataprovider_.knexdbdataprovider",permalink:"/docs/api/graphback-runtime-knex/classes/_knexdbdataprovider_.knexdbdataprovider",editUrl:"https://github.com/aerogear/graphback/edit/master/website/versioned_docs/version-1.0/api/graphback-runtime-knex/classes/_knexdbdataprovider_.knexdbdataprovider.md",version:"1.0",sidebar_label:"KnexDBDataProvider",sidebar:"version-1.0/docs",previous:{title:"createKnexDbProvider",permalink:"/docs/api/graphback-runtime-knex/modules/_createknexdbprovider_"},next:{title:"SQLiteKnexDBDataProvider",permalink:"/docs/api/graphback-runtime-knex/classes/_sqliteknexdbdataprovider_.sqliteknexdbdataprovider"}},l=[{value:"Type parameters",id:"type-parameters",children:[]},{value:"Hierarchy",id:"hierarchy",children:[]},{value:"Implements",id:"implements",children:[]},{value:"Index",id:"index",children:[{value:"Constructors",id:"constructors",children:[]},{value:"Properties",id:"properties",children:[]},{value:"Methods",id:"methods",children:[]}]},{value:"Constructors",id:"constructors-1",children:[{value:"constructor",id:"constructor",children:[]}]},{value:"Properties",id:"properties-1",children:[{value:"<code>Protected</code> db",id:"protected-db",children:[]},{value:"<code>Protected</code> queryBuilder",id:"protected-querybuilder",children:[]},{value:"<code>Protected</code> tableMap",id:"protected-tablemap",children:[]},{value:"<code>Protected</code> tableName",id:"protected-tablename",children:[]}]},{value:"Methods",id:"methods-1",children:[{value:"batchRead",id:"batchread",children:[]},{value:"count",id:"count",children:[]},{value:"create",id:"create",children:[]},{value:"delete",id:"delete",children:[]},{value:"findBy",id:"findby",children:[]},{value:"findOne",id:"findone",children:[]},{value:"<code>Protected</code> getSelectedFields",id:"protected-getselectedfields",children:[]},{value:"update",id:"update",children:[]},{value:"<code>Private</code> usePage",id:"private-usepage",children:[]}]}],i={rightToc:l};function d(e){var t=e.components,a=Object(b.a)(e,["components"]);return Object(n.b)("wrapper",Object(r.a)({},i,a,{components:t,mdxType:"MDXLayout"}),Object(n.b)("p",null,"Knex.js database data provider exposing basic CRUD operations that works with all databases that knex supports.\nLayer is tested with following databases:"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"SQLite (by ",Object(n.b)("inlineCode",{parentName:"li"},"SQLiteKnexDBDataProvider"),")"),Object(n.b)("li",{parentName:"ul"},"MySQL (MariaDB)"),Object(n.b)("li",{parentName:"ul"},"Postgres")),Object(n.b)("p",null,"NOTE: For SQLite use dedicated ",Object(n.b)("inlineCode",{parentName:"p"},"SQLiteKnexDBDataProvider")," that implements more speficic creation method to avoid the not supported ",Object(n.b)("inlineCode",{parentName:"p"},"returning()"),"\nstatement."),Object(n.b)("h2",{id:"type-parameters"},"Type parameters"),Object(n.b)("p",null,"\u25aa ",Object(n.b)("strong",{parentName:"p"},"Type")),Object(n.b)("h2",{id:"hierarchy"},"Hierarchy"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},Object(n.b)("p",{parentName:"li"},Object(n.b)("strong",{parentName:"p"},"KnexDBDataProvider")),Object(n.b)("p",{parentName:"li"},"\u21b3 ",Object(n.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/api/graphback-runtime-knex/classes/_sqliteknexdbdataprovider_.sqliteknexdbdataprovider"}),"SQLiteKnexDBDataProvider")))),Object(n.b)("h2",{id:"implements"},"Implements"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"GraphbackDataProvider\u2039Type\u203a")),Object(n.b)("h2",{id:"index"},"Index"),Object(n.b)("h3",{id:"constructors"},"Constructors"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-runtime-knex/classes/_knexdbdataprovider_.knexdbdataprovider#constructor"}),"constructor"))),Object(n.b)("h3",{id:"properties"},"Properties"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-runtime-knex/classes/_knexdbdataprovider_.knexdbdataprovider#protected-db"}),"db")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-runtime-knex/classes/_knexdbdataprovider_.knexdbdataprovider#protected-querybuilder"}),"queryBuilder")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-runtime-knex/classes/_knexdbdataprovider_.knexdbdataprovider#protected-tablemap"}),"tableMap")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-runtime-knex/classes/_knexdbdataprovider_.knexdbdataprovider#protected-tablename"}),"tableName"))),Object(n.b)("h3",{id:"methods"},"Methods"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-runtime-knex/classes/_knexdbdataprovider_.knexdbdataprovider#batchread"}),"batchRead")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-runtime-knex/classes/_knexdbdataprovider_.knexdbdataprovider#count"}),"count")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-runtime-knex/classes/_knexdbdataprovider_.knexdbdataprovider#create"}),"create")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-runtime-knex/classes/_knexdbdataprovider_.knexdbdataprovider#delete"}),"delete")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-runtime-knex/classes/_knexdbdataprovider_.knexdbdataprovider#findby"}),"findBy")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-runtime-knex/classes/_knexdbdataprovider_.knexdbdataprovider#findone"}),"findOne")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-runtime-knex/classes/_knexdbdataprovider_.knexdbdataprovider#protected-getselectedfields"}),"getSelectedFields")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-runtime-knex/classes/_knexdbdataprovider_.knexdbdataprovider#update"}),"update")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-runtime-knex/classes/_knexdbdataprovider_.knexdbdataprovider#private-usepage"}),"usePage"))),Object(n.b)("h2",{id:"constructors-1"},"Constructors"),Object(n.b)("h3",{id:"constructor"},"constructor"),Object(n.b)("p",null,"+"," ",Object(n.b)("strong",{parentName:"p"},"new KnexDBDataProvider"),"(",Object(n.b)("inlineCode",{parentName:"p"},"model"),": ModelDefinition, ",Object(n.b)("inlineCode",{parentName:"p"},"db"),": Knex): ",Object(n.b)("em",{parentName:"p"},Object(n.b)("a",Object(r.a)({parentName:"em"},{href:"/docs/api/graphback-runtime-knex/classes/_knexdbdataprovider_.knexdbdataprovider"}),"KnexDBDataProvider"))),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Defined in ",Object(n.b)("a",Object(r.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L21"}),"KnexDBDataProvider.ts:21"))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Parameters:")),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Name"),Object(n.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Type"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(n.b)("inlineCode",{parentName:"td"},"model")),Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"ModelDefinition")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(n.b)("inlineCode",{parentName:"td"},"db")),Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"Knex")))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Returns:")," ",Object(n.b)("em",{parentName:"p"},Object(n.b)("a",Object(r.a)({parentName:"em"},{href:"/docs/api/graphback-runtime-knex/classes/_knexdbdataprovider_.knexdbdataprovider"}),"KnexDBDataProvider"))),Object(n.b)("h2",{id:"properties-1"},"Properties"),Object(n.b)("h3",{id:"protected-db"},Object(n.b)("inlineCode",{parentName:"h3"},"Protected")," db"),Object(n.b)("p",null,"\u2022 ",Object(n.b)("strong",{parentName:"p"},"db"),": ",Object(n.b)("em",{parentName:"p"},"Knex")),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Defined in ",Object(n.b)("a",Object(r.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L18"}),"KnexDBDataProvider.ts:18"))),Object(n.b)("hr",null),Object(n.b)("h3",{id:"protected-querybuilder"},Object(n.b)("inlineCode",{parentName:"h3"},"Protected")," queryBuilder"),Object(n.b)("p",null,"\u2022 ",Object(n.b)("strong",{parentName:"p"},"queryBuilder"),": ",Object(n.b)("em",{parentName:"p"},Object(n.b)("a",Object(r.a)({parentName:"em"},{href:"/docs/api/graphback-runtime-knex/interfaces/_knexquerymapper_.crudknexquerymapper"}),"CRUDKnexQueryMapper"))),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Defined in ",Object(n.b)("a",Object(r.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L21"}),"KnexDBDataProvider.ts:21"))),Object(n.b)("hr",null),Object(n.b)("h3",{id:"protected-tablemap"},Object(n.b)("inlineCode",{parentName:"h3"},"Protected")," tableMap"),Object(n.b)("p",null,"\u2022 ",Object(n.b)("strong",{parentName:"p"},"tableMap"),": ",Object(n.b)("em",{parentName:"p"},"ModelTableMap")),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Defined in ",Object(n.b)("a",Object(r.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L20"}),"KnexDBDataProvider.ts:20"))),Object(n.b)("hr",null),Object(n.b)("h3",{id:"protected-tablename"},Object(n.b)("inlineCode",{parentName:"h3"},"Protected")," tableName"),Object(n.b)("p",null,"\u2022 ",Object(n.b)("strong",{parentName:"p"},"tableName"),": ",Object(n.b)("em",{parentName:"p"},"string")),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Defined in ",Object(n.b)("a",Object(r.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L19"}),"KnexDBDataProvider.ts:19"))),Object(n.b)("h2",{id:"methods-1"},"Methods"),Object(n.b)("h3",{id:"batchread"},"batchRead"),Object(n.b)("p",null,"\u25b8 ",Object(n.b)("strong",{parentName:"p"},"batchRead"),"(",Object(n.b)("inlineCode",{parentName:"p"},"relationField"),": string, ",Object(n.b)("inlineCode",{parentName:"p"},"ids"),": string[], ",Object(n.b)("inlineCode",{parentName:"p"},"filter?"),": QueryFilter, ",Object(n.b)("inlineCode",{parentName:"p"},"selectedFields?"),": string[]): ",Object(n.b)("em",{parentName:"p"},"Promise\u2039Type","[][]","\u203a")),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Defined in ",Object(n.b)("a",Object(r.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L97"}),"KnexDBDataProvider.ts:97"))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Parameters:")),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Name"),Object(n.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Type"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(n.b)("inlineCode",{parentName:"td"},"relationField")),Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"string")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(n.b)("inlineCode",{parentName:"td"},"ids")),Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"string[]")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(n.b)("inlineCode",{parentName:"td"},"filter?")),Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"QueryFilter")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(n.b)("inlineCode",{parentName:"td"},"selectedFields?")),Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"string[]")))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Returns:")," ",Object(n.b)("em",{parentName:"p"},"Promise\u2039Type","[][]","\u203a")),Object(n.b)("hr",null),Object(n.b)("h3",{id:"count"},"count"),Object(n.b)("p",null,"\u25b8 ",Object(n.b)("strong",{parentName:"p"},"count"),"(",Object(n.b)("inlineCode",{parentName:"p"},"filter?"),": QueryFilter): ",Object(n.b)("em",{parentName:"p"},"Promise\u2039number\u203a")),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Defined in ",Object(n.b)("a",Object(r.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L90"}),"KnexDBDataProvider.ts:90"))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Parameters:")),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Name"),Object(n.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Type"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(n.b)("inlineCode",{parentName:"td"},"filter?")),Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"QueryFilter")))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Returns:")," ",Object(n.b)("em",{parentName:"p"},"Promise\u2039number\u203a")),Object(n.b)("hr",null),Object(n.b)("h3",{id:"create"},"create"),Object(n.b)("p",null,"\u25b8 ",Object(n.b)("strong",{parentName:"p"},"create"),"(",Object(n.b)("inlineCode",{parentName:"p"},"data"),": Type, ",Object(n.b)("inlineCode",{parentName:"p"},"selectedFields?"),": string[]): ",Object(n.b)("em",{parentName:"p"},"Promise\u2039Type\u203a")),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Defined in ",Object(n.b)("a",Object(r.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L30"}),"KnexDBDataProvider.ts:30"))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Parameters:")),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Name"),Object(n.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Type"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(n.b)("inlineCode",{parentName:"td"},"data")),Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"Type")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(n.b)("inlineCode",{parentName:"td"},"selectedFields?")),Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"string[]")))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Returns:")," ",Object(n.b)("em",{parentName:"p"},"Promise\u2039Type\u203a")),Object(n.b)("hr",null),Object(n.b)("h3",{id:"delete"},"delete"),Object(n.b)("p",null,"\u25b8 ",Object(n.b)("strong",{parentName:"p"},"delete"),"(",Object(n.b)("inlineCode",{parentName:"p"},"data"),": Partial\u2039Type\u203a, ",Object(n.b)("inlineCode",{parentName:"p"},"selectedFields?"),": string[]): ",Object(n.b)("em",{parentName:"p"},"Promise\u2039Type\u203a")),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Defined in ",Object(n.b)("a",Object(r.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L52"}),"KnexDBDataProvider.ts:52"))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Parameters:")),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Name"),Object(n.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Type"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(n.b)("inlineCode",{parentName:"td"},"data")),Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"Partial\u2039Type\u203a")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(n.b)("inlineCode",{parentName:"td"},"selectedFields?")),Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"string[]")))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Returns:")," ",Object(n.b)("em",{parentName:"p"},"Promise\u2039Type\u203a")),Object(n.b)("hr",null),Object(n.b)("h3",{id:"findby"},"findBy"),Object(n.b)("p",null,"\u25b8 ",Object(n.b)("strong",{parentName:"p"},"findBy"),"(",Object(n.b)("inlineCode",{parentName:"p"},"args?"),": FindByArgs, ",Object(n.b)("inlineCode",{parentName:"p"},"selectedFields?"),": string[]): ",Object(n.b)("em",{parentName:"p"},"Promise\u2039Type[]\u203a")),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Defined in ",Object(n.b)("a",Object(r.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L74"}),"KnexDBDataProvider.ts:74"))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Parameters:")),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Name"),Object(n.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Type"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(n.b)("inlineCode",{parentName:"td"},"args?")),Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"FindByArgs")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(n.b)("inlineCode",{parentName:"td"},"selectedFields?")),Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"string[]")))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Returns:")," ",Object(n.b)("em",{parentName:"p"},"Promise\u2039Type[]\u203a")),Object(n.b)("hr",null),Object(n.b)("h3",{id:"findone"},"findOne"),Object(n.b)("p",null,"\u25b8 ",Object(n.b)("strong",{parentName:"p"},"findOne"),"(",Object(n.b)("inlineCode",{parentName:"p"},"args"),": Partial\u2039Type\u203a, ",Object(n.b)("inlineCode",{parentName:"p"},"selectedFields?"),": string[]): ",Object(n.b)("em",{parentName:"p"},"Promise\u2039Type\u203a")),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Defined in ",Object(n.b)("a",Object(r.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L63"}),"KnexDBDataProvider.ts:63"))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Parameters:")),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Name"),Object(n.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Type"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(n.b)("inlineCode",{parentName:"td"},"args")),Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"Partial\u2039Type\u203a")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(n.b)("inlineCode",{parentName:"td"},"selectedFields?")),Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"string[]")))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Returns:")," ",Object(n.b)("em",{parentName:"p"},"Promise\u2039Type\u203a")),Object(n.b)("hr",null),Object(n.b)("h3",{id:"protected-getselectedfields"},Object(n.b)("inlineCode",{parentName:"h3"},"Protected")," getSelectedFields"),Object(n.b)("p",null,"\u25b8 ",Object(n.b)("strong",{parentName:"p"},"getSelectedFields"),"(",Object(n.b)("inlineCode",{parentName:"p"},"selectedFields"),": string[]): ",Object(n.b)("em",{parentName:"p"},'string[] | "'),'"*'),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Defined in ",Object(n.b)("a",Object(r.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L111"}),"KnexDBDataProvider.ts:111"))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Parameters:")),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Name"),Object(n.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Type"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(n.b)("inlineCode",{parentName:"td"},"selectedFields")),Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"string[]")))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Returns:")," ",Object(n.b)("em",{parentName:"p"},'string[] | "'),'"*'),Object(n.b)("hr",null),Object(n.b)("h3",{id:"update"},"update"),Object(n.b)("p",null,"\u25b8 ",Object(n.b)("strong",{parentName:"p"},"update"),"(",Object(n.b)("inlineCode",{parentName:"p"},"data"),": Partial\u2039Type\u203a, ",Object(n.b)("inlineCode",{parentName:"p"},"selectedFields?"),": string[]): ",Object(n.b)("em",{parentName:"p"},"Promise\u2039Type\u203a")),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Defined in ",Object(n.b)("a",Object(r.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L40"}),"KnexDBDataProvider.ts:40"))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Parameters:")),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Name"),Object(n.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Type"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(n.b)("inlineCode",{parentName:"td"},"data")),Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"Partial\u2039Type\u203a")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(n.b)("inlineCode",{parentName:"td"},"selectedFields?")),Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"string[]")))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Returns:")," ",Object(n.b)("em",{parentName:"p"},"Promise\u2039Type\u203a")),Object(n.b)("hr",null),Object(n.b)("h3",{id:"private-usepage"},Object(n.b)("inlineCode",{parentName:"h3"},"Private")," usePage"),Object(n.b)("p",null,"\u25b8 ",Object(n.b)("strong",{parentName:"p"},"usePage"),"(",Object(n.b)("inlineCode",{parentName:"p"},"query"),": QueryBuilder, ",Object(n.b)("inlineCode",{parentName:"p"},"page?"),": GraphbackPage): ",Object(n.b)("em",{parentName:"p"},"QueryBuilder\u2039any, any\u203a")),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Defined in ",Object(n.b)("a",Object(r.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L115"}),"KnexDBDataProvider.ts:115"))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Parameters:")),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Name"),Object(n.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Type"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(n.b)("inlineCode",{parentName:"td"},"query")),Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"QueryBuilder")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(n.b)("inlineCode",{parentName:"td"},"page?")),Object(n.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"GraphbackPage")))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Returns:")," ",Object(n.b)("em",{parentName:"p"},"QueryBuilder\u2039any, any\u203a")))}d.isMDXComponent=!0}}]);