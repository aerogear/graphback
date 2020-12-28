(window.webpackJsonp=window.webpackJsonp||[]).push([[131],{1333:function(e,a,t){"use strict";t.d(a,"a",(function(){return l})),t.d(a,"b",(function(){return O}));var r=t(0),n=t.n(r);function b(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function c(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,r)}return t}function d(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?c(Object(t),!0).forEach((function(a){b(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function p(e,a){if(null==e)return{};var t,r,n=function(e,a){if(null==e)return{};var t,r,n={},b=Object.keys(e);for(r=0;r<b.length;r++)t=b[r],a.indexOf(t)>=0||(n[t]=e[t]);return n}(e,a);if(Object.getOwnPropertySymbols){var b=Object.getOwnPropertySymbols(e);for(r=0;r<b.length;r++)t=b[r],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var o=n.a.createContext({}),i=function(e){var a=n.a.useContext(o),t=a;return e&&(t="function"==typeof e?e(a):d(d({},a),e)),t},l=function(e){var a=i(e.components);return n.a.createElement(o.Provider,{value:a},e.children)},s={inlineCode:"code",wrapper:function(e){var a=e.children;return n.a.createElement(n.a.Fragment,{},a)}},m=n.a.forwardRef((function(e,a){var t=e.components,r=e.mdxType,b=e.originalType,c=e.parentName,o=p(e,["components","mdxType","originalType","parentName"]),l=i(t),m=r,O=l["".concat(c,".").concat(m)]||l[m]||s[m]||b;return t?n.a.createElement(O,d(d({ref:a},o),{},{components:t})):n.a.createElement(O,d({ref:a},o))}));function O(e,a){var t=arguments,r=a&&a.mdxType;if("string"==typeof e||r){var b=t.length,c=new Array(b);c[0]=m;var d={};for(var p in a)hasOwnProperty.call(a,p)&&(d[p]=a[p]);d.originalType=e,d.mdxType="string"==typeof e?e:r,c[1]=d;for(var o=2;o<b;o++)c[o]=t[o];return n.a.createElement.apply(null,c)}return n.a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},196:function(e,a,t){"use strict";t.r(a),t.d(a,"frontMatter",(function(){return c})),t.d(a,"metadata",(function(){return d})),t.d(a,"rightToc",(function(){return p})),t.d(a,"default",(function(){return i}));var r=t(3),n=t(7),b=(t(0),t(1333)),c={id:"_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider",title:"DataSyncMongoDBDataProvider",sidebar_label:"DataSyncMongoDBDataProvider"},d={unversionedId:"api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider",id:"version-1.0/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider",isDocsHomePage:!1,title:"DataSyncMongoDBDataProvider",description:"Mongo provider that attains data synchronization using soft deletes",source:"@site/versioned_docs/version-1.0/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md",slug:"/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider",permalink:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider",editUrl:"https://github.com/aerogear/graphback/edit/master/website/versioned_docs/version-1.0/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md",version:"1.0",sidebar_label:"DataSyncMongoDBDataProvider",sidebar:"version-1.0/docs",previous:{title:"CreateDataSyncCRUDServiceOptions",permalink:"/docs/api/graphback-datasync/interfaces/_services_createdatasyncservice_.createdatasynccrudserviceoptions"},next:{title:"DataSyncCRUDService",permalink:"/docs/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice"}},p=[{value:"Type parameters",id:"type-parameters",children:[]},{value:"Hierarchy",id:"hierarchy",children:[]},{value:"Implements",id:"implements",children:[]},{value:"Index",id:"index",children:[{value:"Constructors",id:"constructors",children:[]},{value:"Properties",id:"properties",children:[]},{value:"Methods",id:"methods",children:[]}]},{value:"Constructors",id:"constructors-1",children:[{value:"constructor",id:"constructor",children:[]}]},{value:"Properties",id:"properties-1",children:[{value:"<code>Protected</code> TTLinSeconds",id:"protected-ttlinseconds",children:[]},{value:"<code>Protected</code> collectionName",id:"protected-collectionname",children:[]},{value:"<code>Protected</code> db",id:"protected-db",children:[]},{value:"<code>Protected</code> fieldTransformMap",id:"protected-fieldtransformmap",children:[]},{value:"<code>Protected</code> tableMap",id:"protected-tablemap",children:[]}]},{value:"Methods",id:"methods-1",children:[{value:"batchRead",id:"batchread",children:[]},{value:"<code>Protected</code> buildProjectionOption",id:"protected-buildprojectionoption",children:[]},{value:"count",id:"count",children:[]},{value:"create",id:"create",children:[]},{value:"delete",id:"delete",children:[]},{value:"findBy",id:"findby",children:[]},{value:"findOne",id:"findone",children:[]},{value:"sync",id:"sync",children:[]},{value:"update",id:"update",children:[]}]}],o={rightToc:p};function i(e){var a=e.components,t=Object(n.a)(e,["components"]);return Object(b.b)("wrapper",Object(r.a)({},o,t,{components:a,mdxType:"MDXLayout"}),Object(b.b)("p",null,"Mongo provider that attains data synchronization using soft deletes"),Object(b.b)("h2",{id:"type-parameters"},"Type parameters"),Object(b.b)("p",null,"\u25aa ",Object(b.b)("strong",{parentName:"p"},"Type")),Object(b.b)("h2",{id:"hierarchy"},"Hierarchy"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},Object(b.b)("p",{parentName:"li"},"MongoDBDataProvider\u2039Type\u203a"),Object(b.b)("p",{parentName:"li"},"\u21b3 ",Object(b.b)("strong",{parentName:"p"},"DataSyncMongoDBDataProvider")),Object(b.b)("p",{parentName:"li"},"\u21b3 ",Object(b.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncconflictprovider_.datasyncconflictmongodbdataprovider"}),"DataSyncConflictMongoDBDataProvider")))),Object(b.b)("h2",{id:"implements"},"Implements"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"GraphbackDataProvider\u2039Type\u203a"),Object(b.b)("li",{parentName:"ul"},Object(b.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-datasync/interfaces/_providers_datasyncprovider_.datasyncprovider"}),"DataSyncProvider"))),Object(b.b)("h2",{id:"index"},"Index"),Object(b.b)("h3",{id:"constructors"},"Constructors"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},Object(b.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#constructor"}),"constructor"))),Object(b.b)("h3",{id:"properties"},"Properties"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},Object(b.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#protected-ttlinseconds"}),"TTLinSeconds")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#protected-collectionname"}),"collectionName")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#protected-db"}),"db")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#protected-fieldtransformmap"}),"fieldTransformMap")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#protected-tablemap"}),"tableMap"))),Object(b.b)("h3",{id:"methods"},"Methods"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},Object(b.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#batchread"}),"batchRead")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#protected-buildprojectionoption"}),"buildProjectionOption")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#count"}),"count")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#create"}),"create")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#delete"}),"delete")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#findby"}),"findBy")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#findone"}),"findOne")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#sync"}),"sync")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#update"}),"update"))),Object(b.b)("h2",{id:"constructors-1"},"Constructors"),Object(b.b)("h3",{id:"constructor"},"constructor"),Object(b.b)("p",null,"+"," ",Object(b.b)("strong",{parentName:"p"},"new DataSyncMongoDBDataProvider"),"(",Object(b.b)("inlineCode",{parentName:"p"},"model"),": ModelDefinition, ",Object(b.b)("inlineCode",{parentName:"p"},"client"),": any): ",Object(b.b)("em",{parentName:"p"},Object(b.b)("a",Object(r.a)({parentName:"em"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider"}),"DataSyncMongoDBDataProvider"))),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Overrides void")),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Defined in ",Object(b.b)("a",Object(r.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L11"}),"packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:11"))),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Parameters:")),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Type"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"model")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"ModelDefinition")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"client")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"any")))),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Returns:")," ",Object(b.b)("em",{parentName:"p"},Object(b.b)("a",Object(r.a)({parentName:"em"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider"}),"DataSyncMongoDBDataProvider"))),Object(b.b)("h2",{id:"properties-1"},"Properties"),Object(b.b)("h3",{id:"protected-ttlinseconds"},Object(b.b)("inlineCode",{parentName:"h3"},"Protected")," TTLinSeconds"),Object(b.b)("p",null,"\u2022 ",Object(b.b)("strong",{parentName:"p"},"TTLinSeconds"),": ",Object(b.b)("em",{parentName:"p"},"number")),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Defined in ",Object(b.b)("a",Object(r.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L11"}),"packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:11"))),Object(b.b)("hr",null),Object(b.b)("h3",{id:"protected-collectionname"},Object(b.b)("inlineCode",{parentName:"h3"},"Protected")," collectionName"),Object(b.b)("p",null,"\u2022 ",Object(b.b)("strong",{parentName:"p"},"collectionName"),": ",Object(b.b)("em",{parentName:"p"},"string")),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Inherited from ",Object(b.b)("a",Object(r.a)({parentName:"em"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider"}),"DataSyncMongoDBDataProvider"),".",Object(b.b)("a",Object(r.a)({parentName:"em"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#protected-collectionname"}),"collectionName"))),Object(b.b)("p",null,"Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:8"),Object(b.b)("hr",null),Object(b.b)("h3",{id:"protected-db"},Object(b.b)("inlineCode",{parentName:"h3"},"Protected")," db"),Object(b.b)("p",null,"\u2022 ",Object(b.b)("strong",{parentName:"p"},"db"),": ",Object(b.b)("em",{parentName:"p"},"Db")),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Inherited from ",Object(b.b)("a",Object(r.a)({parentName:"em"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider"}),"DataSyncMongoDBDataProvider"),".",Object(b.b)("a",Object(r.a)({parentName:"em"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#protected-db"}),"db"))),Object(b.b)("p",null,"Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:7"),Object(b.b)("hr",null),Object(b.b)("h3",{id:"protected-fieldtransformmap"},Object(b.b)("inlineCode",{parentName:"h3"},"Protected")," fieldTransformMap"),Object(b.b)("p",null,"\u2022 ",Object(b.b)("strong",{parentName:"p"},"fieldTransformMap"),": ",Object(b.b)("em",{parentName:"p"},"FieldTransformMap")),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Inherited from ",Object(b.b)("a",Object(r.a)({parentName:"em"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider"}),"DataSyncMongoDBDataProvider"),".",Object(b.b)("a",Object(r.a)({parentName:"em"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#protected-fieldtransformmap"}),"fieldTransformMap"))),Object(b.b)("p",null,"Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:10"),Object(b.b)("hr",null),Object(b.b)("h3",{id:"protected-tablemap"},Object(b.b)("inlineCode",{parentName:"h3"},"Protected")," tableMap"),Object(b.b)("p",null,"\u2022 ",Object(b.b)("strong",{parentName:"p"},"tableMap"),": ",Object(b.b)("em",{parentName:"p"},"ModelTableMap")),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Inherited from ",Object(b.b)("a",Object(r.a)({parentName:"em"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider"}),"DataSyncMongoDBDataProvider"),".",Object(b.b)("a",Object(r.a)({parentName:"em"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#protected-tablemap"}),"tableMap"))),Object(b.b)("p",null,"Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:9"),Object(b.b)("h2",{id:"methods-1"},"Methods"),Object(b.b)("h3",{id:"batchread"},"batchRead"),Object(b.b)("p",null,"\u25b8 ",Object(b.b)("strong",{parentName:"p"},"batchRead"),"(",Object(b.b)("inlineCode",{parentName:"p"},"relationField"),": string, ",Object(b.b)("inlineCode",{parentName:"p"},"ids"),": string[], ",Object(b.b)("inlineCode",{parentName:"p"},"filter?"),": QueryFilter, ",Object(b.b)("inlineCode",{parentName:"p"},"selectedFields?"),": string[]): ",Object(b.b)("em",{parentName:"p"},"Promise\u2039Type","[][]","\u203a")),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Implementation of ",Object(b.b)("a",Object(r.a)({parentName:"em"},{href:"/docs/api/graphback-datasync/interfaces/_providers_datasyncprovider_.datasyncprovider"}),"DataSyncProvider"))),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Inherited from ",Object(b.b)("a",Object(r.a)({parentName:"em"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider"}),"DataSyncMongoDBDataProvider"),".",Object(b.b)("a",Object(r.a)({parentName:"em"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#batchread"}),"batchRead"))),Object(b.b)("p",null,"Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:18"),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Parameters:")),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Type"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"relationField")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"string")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"ids")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"string[]")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"filter?")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"QueryFilter")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"selectedFields?")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"string[]")))),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Returns:")," ",Object(b.b)("em",{parentName:"p"},"Promise\u2039Type","[][]","\u203a")),Object(b.b)("hr",null),Object(b.b)("h3",{id:"protected-buildprojectionoption"},Object(b.b)("inlineCode",{parentName:"h3"},"Protected")," buildProjectionOption"),Object(b.b)("p",null,"\u25b8 ",Object(b.b)("strong",{parentName:"p"},"buildProjectionOption"),"(",Object(b.b)("inlineCode",{parentName:"p"},"selectedFields"),": string[]): ",Object(b.b)("em",{parentName:"p"},"object")),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Inherited from ",Object(b.b)("a",Object(r.a)({parentName:"em"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider"}),"DataSyncMongoDBDataProvider"),".",Object(b.b)("a",Object(r.a)({parentName:"em"},{href:"/docs/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider#protected-buildprojectionoption"}),"buildProjectionOption"))),Object(b.b)("p",null,"Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:19"),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Parameters:")),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Type"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"selectedFields")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"string[]")))),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Returns:")," ",Object(b.b)("em",{parentName:"p"},"object")),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"["," ",Object(b.b)("strong",{parentName:"li"},"x"),": ",Object(b.b)("em",{parentName:"li"},"string"),"]",": any")),Object(b.b)("hr",null),Object(b.b)("h3",{id:"count"},"count"),Object(b.b)("p",null,"\u25b8 ",Object(b.b)("strong",{parentName:"p"},"count"),"(",Object(b.b)("inlineCode",{parentName:"p"},"filter"),": QueryFilter): ",Object(b.b)("em",{parentName:"p"},"Promise\u2039number\u203a")),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Implementation of ",Object(b.b)("a",Object(r.a)({parentName:"em"},{href:"/docs/api/graphback-datasync/interfaces/_providers_datasyncprovider_.datasyncprovider"}),"DataSyncProvider"))),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Overrides void")),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Defined in ",Object(b.b)("a",Object(r.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L122"}),"packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:122"))),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Parameters:")),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Type"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"filter")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"QueryFilter")))),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Returns:")," ",Object(b.b)("em",{parentName:"p"},"Promise\u2039number\u203a")),Object(b.b)("hr",null),Object(b.b)("h3",{id:"create"},"create"),Object(b.b)("p",null,"\u25b8 ",Object(b.b)("strong",{parentName:"p"},"create"),"(",Object(b.b)("inlineCode",{parentName:"p"},"data"),": any): ",Object(b.b)("em",{parentName:"p"},"Promise\u2039Type\u203a")),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Overrides void")),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Defined in ",Object(b.b)("a",Object(r.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L38"}),"packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:38"))),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Parameters:")),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Type"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"data")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"any")))),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Returns:")," ",Object(b.b)("em",{parentName:"p"},"Promise\u2039Type\u203a")),Object(b.b)("hr",null),Object(b.b)("h3",{id:"delete"},"delete"),Object(b.b)("p",null,"\u25b8 ",Object(b.b)("strong",{parentName:"p"},"delete"),"(",Object(b.b)("inlineCode",{parentName:"p"},"data"),": any, ",Object(b.b)("inlineCode",{parentName:"p"},"selectedFields?"),": string[]): ",Object(b.b)("em",{parentName:"p"},"Promise\u2039Type\u203a")),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Overrides void")),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Defined in ",Object(b.b)("a",Object(r.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L67"}),"packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:67"))),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Parameters:")),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Type"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"data")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"any")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"selectedFields?")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"string[]")))),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Returns:")," ",Object(b.b)("em",{parentName:"p"},"Promise\u2039Type\u203a")),Object(b.b)("hr",null),Object(b.b)("h3",{id:"findby"},"findBy"),Object(b.b)("p",null,"\u25b8 ",Object(b.b)("strong",{parentName:"p"},"findBy"),"(",Object(b.b)("inlineCode",{parentName:"p"},"args?"),": FindByArgs, ",Object(b.b)("inlineCode",{parentName:"p"},"selectedFields?"),": string[]): ",Object(b.b)("em",{parentName:"p"},"Promise\u2039Type[]\u203a")),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Implementation of ",Object(b.b)("a",Object(r.a)({parentName:"em"},{href:"/docs/api/graphback-datasync/interfaces/_providers_datasyncprovider_.datasyncprovider"}),"DataSyncProvider"))),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Overrides void")),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Defined in ",Object(b.b)("a",Object(r.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L108"}),"packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:108"))),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Parameters:")),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Type"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"args?")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"FindByArgs")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"selectedFields?")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"string[]")))),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Returns:")," ",Object(b.b)("em",{parentName:"p"},"Promise\u2039Type[]\u203a")),Object(b.b)("hr",null),Object(b.b)("h3",{id:"findone"},"findOne"),Object(b.b)("p",null,"\u25b8 ",Object(b.b)("strong",{parentName:"p"},"findOne"),"(",Object(b.b)("inlineCode",{parentName:"p"},"filter"),": any, ",Object(b.b)("inlineCode",{parentName:"p"},"selectedFields?"),": string[]): ",Object(b.b)("em",{parentName:"p"},"Promise\u2039Type\u203a")),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Overrides void")),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Defined in ",Object(b.b)("a",Object(r.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L89"}),"packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:89"))),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Parameters:")),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Type"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"filter")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"any")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"selectedFields?")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"string[]")))),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Returns:")," ",Object(b.b)("em",{parentName:"p"},"Promise\u2039Type\u203a")),Object(b.b)("hr",null),Object(b.b)("h3",{id:"sync"},"sync"),Object(b.b)("p",null,"\u25b8 ",Object(b.b)("strong",{parentName:"p"},"sync"),"(",Object(b.b)("inlineCode",{parentName:"p"},"lastSync"),": Date, ",Object(b.b)("inlineCode",{parentName:"p"},"selectedFields?"),": string[], ",Object(b.b)("inlineCode",{parentName:"p"},"filter?"),": QueryFilter, ",Object(b.b)("inlineCode",{parentName:"p"},"limit?"),": number): ",Object(b.b)("em",{parentName:"p"},"Promise\u2039Type[]\u203a")),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Implementation of ",Object(b.b)("a",Object(r.a)({parentName:"em"},{href:"/docs/api/graphback-datasync/interfaces/_providers_datasyncprovider_.datasyncprovider"}),"DataSyncProvider"))),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Defined in ",Object(b.b)("a",Object(r.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L130"}),"packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:130"))),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Parameters:")),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Type"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"lastSync")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"Date")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"selectedFields?")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"string[]")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"filter?")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"QueryFilter")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"limit?")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"number")))),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Returns:")," ",Object(b.b)("em",{parentName:"p"},"Promise\u2039Type[]\u203a")),Object(b.b)("hr",null),Object(b.b)("h3",{id:"update"},"update"),Object(b.b)("p",null,"\u25b8 ",Object(b.b)("strong",{parentName:"p"},"update"),"(",Object(b.b)("inlineCode",{parentName:"p"},"data"),": any, ",Object(b.b)("inlineCode",{parentName:"p"},"selectedFields?"),": string[]): ",Object(b.b)("em",{parentName:"p"},"Promise\u2039Type\u203a")),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Overrides void")),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Defined in ",Object(b.b)("a",Object(r.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L45"}),"packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:45"))),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Parameters:")),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Type"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"data")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"any")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"selectedFields?")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"string[]")))),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"Returns:")," ",Object(b.b)("em",{parentName:"p"},"Promise\u2039Type\u203a")))}i.isMDXComponent=!0}}]);