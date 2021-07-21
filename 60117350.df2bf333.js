(window.webpackJsonp=window.webpackJsonp||[]).push([[476],{1333:function(e,t,a){"use strict";a.d(t,"a",(function(){return l})),a.d(t,"b",(function(){return u}));var r=a(0),c=a.n(r);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function b(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?b(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):b(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,r,c=function(e,t){if(null==e)return{};var a,r,c={},n=Object.keys(e);for(r=0;r<n.length;r++)a=n[r],t.indexOf(a)>=0||(c[a]=e[a]);return c}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)a=n[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(c[a]=e[a])}return c}var p=c.a.createContext({}),d=function(e){var t=c.a.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},l=function(e){var t=d(e.components);return c.a.createElement(p.Provider,{value:t},e.children)},o={inlineCode:"code",wrapper:function(e){var t=e.children;return c.a.createElement(c.a.Fragment,{},t)}},m=c.a.forwardRef((function(e,t){var a=e.components,r=e.mdxType,n=e.originalType,b=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),l=d(a),m=r,u=l["".concat(b,".").concat(m)]||l[m]||o[m]||n;return a?c.a.createElement(u,s(s({ref:t},p),{},{components:a})):c.a.createElement(u,s({ref:t},p))}));function u(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var n=a.length,b=new Array(n);b[0]=m;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:r,b[1]=s;for(var p=2;p<n;p++)b[p]=a[p];return c.a.createElement.apply(null,b)}return c.a.createElement.apply(null,a)}m.displayName="MDXCreateElement"},543:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return s})),a.d(t,"metadata",(function(){return i})),a.d(t,"rightToc",(function(){return p})),a.d(t,"default",(function(){return l}));var r=a(3),c=a(7),n=(a(0),a(1333)),b=["components"],s={id:"_services_datasynccrudservice_.datasynccrudservice",title:"DataSyncCRUDService",sidebar_label:"DataSyncCRUDService"},i={unversionedId:"api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice",id:"version-0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice",isDocsHomePage:!1,title:"DataSyncCRUDService",description:"CRUD Service for datasync",source:"@site/versioned_docs/version-0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice.md",slug:"/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice",permalink:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice",editUrl:"https://github.com/aerogear/graphback/edit/master/website/versioned_docs/version-0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice.md",version:"0.16.x",sidebar_label:"DataSyncCRUDService",sidebar:"version-0.16.x/docs",previous:{title:"DataSyncMongoDBDataProvider",permalink:"/docs/0.16.x/api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider"},next:{title:"DataSyncPlugin",permalink:"/docs/0.16.x/api/graphback-datasync/classes/_datasyncplugin_.datasyncplugin"}},p=[{value:"Type parameters",id:"type-parameters",children:[]},{value:"Hierarchy",id:"hierarchy",children:[]},{value:"Implements",id:"implements",children:[]},{value:"Index",id:"index",children:[{value:"Constructors",id:"constructors",children:[]},{value:"Properties",id:"properties",children:[]},{value:"Methods",id:"methods",children:[]}]},{value:"Constructors",id:"constructors-1",children:[{value:"constructor",id:"constructor",children:[]}]},{value:"Properties",id:"properties-1",children:[{value:"<code>Protected</code> crudOptions",id:"protected-crudoptions",children:[]},{value:"<code>Protected</code> db",id:"protected-db",children:[]},{value:"<code>Protected</code> model",id:"protected-model",children:[]},{value:"<code>Protected</code> pubSub",id:"protected-pubsub",children:[]}]},{value:"Methods",id:"methods-1",children:[{value:"batchLoadData",id:"batchloaddata",children:[]},{value:"create",id:"create",children:[]},{value:"delete",id:"delete",children:[]},{value:"findBy",id:"findby",children:[]},{value:"findOne",id:"findone",children:[]},{value:"subscribeToCreate",id:"subscribetocreate",children:[]},{value:"subscribeToDelete",id:"subscribetodelete",children:[]},{value:"subscribeToUpdate",id:"subscribetoupdate",children:[]},{value:"<code>Protected</code> subscriptionTopicMapping",id:"protected-subscriptiontopicmapping",children:[]},{value:"sync",id:"sync",children:[]},{value:"update",id:"update",children:[]}]}],d={rightToc:p};function l(e){var t=e.components,a=Object(c.a)(e,b);return Object(n.b)("wrapper",Object(r.a)({},d,a,{components:t,mdxType:"MDXLayout"}),Object(n.b)("p",null,"CRUD Service for datasync"),Object(n.b)("h2",{id:"type-parameters"},"Type parameters"),Object(n.b)("p",null,"\u25aa ",Object(n.b)("strong",{parentName:"p"},"T")),Object(n.b)("h2",{id:"hierarchy"},"Hierarchy"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},Object(n.b)("p",{parentName:"li"},"CRUDService\u2039T\u203a"),Object(n.b)("p",{parentName:"li"},"\u21b3 ",Object(n.b)("strong",{parentName:"p"},"DataSyncCRUDService")))),Object(n.b)("h2",{id:"implements"},"Implements"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"GraphbackCRUDService\u2039T\u203a")),Object(n.b)("h2",{id:"index"},"Index"),Object(n.b)("h3",{id:"constructors"},"Constructors"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#constructor"},"constructor"))),Object(n.b)("h3",{id:"properties"},"Properties"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#protected-crudoptions"},"crudOptions")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#protected-db"},"db")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#protected-model"},"model")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#protected-pubsub"},"pubSub"))),Object(n.b)("h3",{id:"methods"},"Methods"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#batchloaddata"},"batchLoadData")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#create"},"create")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#delete"},"delete")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#findby"},"findBy")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#findone"},"findOne")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#subscribetocreate"},"subscribeToCreate")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#subscribetodelete"},"subscribeToDelete")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#subscribetoupdate"},"subscribeToUpdate")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#protected-subscriptiontopicmapping"},"subscriptionTopicMapping")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#sync"},"sync")),Object(n.b)("li",{parentName:"ul"},Object(n.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#update"},"update"))),Object(n.b)("h2",{id:"constructors-1"},"Constructors"),Object(n.b)("h3",{id:"constructor"},"constructor"),Object(n.b)("p",null,"+"," ",Object(n.b)("strong",{parentName:"p"},"new DataSyncCRUDService"),"(",Object(n.b)("inlineCode",{parentName:"p"},"model"),": ModelDefinition, ",Object(n.b)("inlineCode",{parentName:"p"},"db"),": ",Object(n.b)("a",{parentName:"p",href:"/docs/0.16.x/api/graphback-datasync/interfaces/_providers_datasyncprovider_.datasyncprovider"},"DataSyncProvider"),", ",Object(n.b)("inlineCode",{parentName:"p"},"config"),": CRUDServiceConfig): ",Object(n.b)("em",{parentName:"p"},Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice"},"DataSyncCRUDService"))),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Overrides void")),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Defined in ",Object(n.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/services/DataSyncCRUDService.ts#L15"},"packages/graphback-datasync/src/services/DataSyncCRUDService.ts:15"))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Parameters:")),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",{parentName:"tr",align:null},"Name"),Object(n.b)("th",{parentName:"tr",align:null},"Type"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"model")),Object(n.b)("td",{parentName:"tr",align:null},"ModelDefinition")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"db")),Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("a",{parentName:"td",href:"/docs/0.16.x/api/graphback-datasync/interfaces/_providers_datasyncprovider_.datasyncprovider"},"DataSyncProvider"))),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"config")),Object(n.b)("td",{parentName:"tr",align:null},"CRUDServiceConfig")))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Returns:")," ",Object(n.b)("em",{parentName:"p"},Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice"},"DataSyncCRUDService"))),Object(n.b)("h2",{id:"properties-1"},"Properties"),Object(n.b)("h3",{id:"protected-crudoptions"},Object(n.b)("inlineCode",{parentName:"h3"},"Protected")," crudOptions"),Object(n.b)("p",null,"\u2022 ",Object(n.b)("strong",{parentName:"p"},"crudOptions"),": ",Object(n.b)("em",{parentName:"p"},"GraphbackCRUDGeneratorConfig")),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Inherited from ",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice"},"DataSyncCRUDService"),".",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#protected-crudoptions"},"crudOptions"))),Object(n.b)("p",null,"Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:31"),Object(n.b)("hr",null),Object(n.b)("h3",{id:"protected-db"},Object(n.b)("inlineCode",{parentName:"h3"},"Protected")," db"),Object(n.b)("p",null,"\u2022 ",Object(n.b)("strong",{parentName:"p"},"db"),": ",Object(n.b)("em",{parentName:"p"},"GraphbackDataProvider")),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Inherited from ",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice"},"DataSyncCRUDService"),".",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#protected-db"},"db"))),Object(n.b)("p",null,"Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:28"),Object(n.b)("hr",null),Object(n.b)("h3",{id:"protected-model"},Object(n.b)("inlineCode",{parentName:"h3"},"Protected")," model"),Object(n.b)("p",null,"\u2022 ",Object(n.b)("strong",{parentName:"p"},"model"),": ",Object(n.b)("em",{parentName:"p"},"ModelDefinition")),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Inherited from ",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice"},"DataSyncCRUDService"),".",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#protected-model"},"model"))),Object(n.b)("p",null,"Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:29"),Object(n.b)("hr",null),Object(n.b)("h3",{id:"protected-pubsub"},Object(n.b)("inlineCode",{parentName:"h3"},"Protected")," pubSub"),Object(n.b)("p",null,"\u2022 ",Object(n.b)("strong",{parentName:"p"},"pubSub"),": ",Object(n.b)("em",{parentName:"p"},"PubSubEngine")),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Inherited from ",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice"},"DataSyncCRUDService"),".",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#protected-pubsub"},"pubSub"))),Object(n.b)("p",null,"Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:30"),Object(n.b)("h2",{id:"methods-1"},"Methods"),Object(n.b)("h3",{id:"batchloaddata"},"batchLoadData"),Object(n.b)("p",null,"\u25b8 ",Object(n.b)("strong",{parentName:"p"},"batchLoadData"),"(",Object(n.b)("inlineCode",{parentName:"p"},"relationField"),": string, ",Object(n.b)("inlineCode",{parentName:"p"},"id"),": string | number, ",Object(n.b)("inlineCode",{parentName:"p"},"filter"),": QueryFilter, ",Object(n.b)("inlineCode",{parentName:"p"},"context"),": GraphbackContext, ",Object(n.b)("inlineCode",{parentName:"p"},"info?"),": GraphQLResolveInfo): ",Object(n.b)("em",{parentName:"p"},"any")),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Inherited from ",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice"},"DataSyncCRUDService"),".",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#batchloaddata"},"batchLoadData"))),Object(n.b)("p",null,"Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:41"),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Parameters:")),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",{parentName:"tr",align:null},"Name"),Object(n.b)("th",{parentName:"tr",align:null},"Type"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"relationField")),Object(n.b)("td",{parentName:"tr",align:null},"string")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"id")),Object(n.b)("td",{parentName:"tr",align:null},"string ","|"," number")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"filter")),Object(n.b)("td",{parentName:"tr",align:null},"QueryFilter")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"context")),Object(n.b)("td",{parentName:"tr",align:null},"GraphbackContext")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"info?")),Object(n.b)("td",{parentName:"tr",align:null},"GraphQLResolveInfo")))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Returns:")," ",Object(n.b)("em",{parentName:"p"},"any")),Object(n.b)("hr",null),Object(n.b)("h3",{id:"create"},"create"),Object(n.b)("p",null,"\u25b8 ",Object(n.b)("strong",{parentName:"p"},"create"),"(",Object(n.b)("inlineCode",{parentName:"p"},"data"),": T, ",Object(n.b)("inlineCode",{parentName:"p"},"context?"),": GraphbackContext, ",Object(n.b)("inlineCode",{parentName:"p"},"info?"),": GraphQLResolveInfo): ",Object(n.b)("em",{parentName:"p"},"Promise\u2039T\u203a")),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Inherited from ",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice"},"DataSyncCRUDService"),".",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#create"},"create"))),Object(n.b)("p",null,"Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:33"),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Parameters:")),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",{parentName:"tr",align:null},"Name"),Object(n.b)("th",{parentName:"tr",align:null},"Type"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"data")),Object(n.b)("td",{parentName:"tr",align:null},"T")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"context?")),Object(n.b)("td",{parentName:"tr",align:null},"GraphbackContext")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"info?")),Object(n.b)("td",{parentName:"tr",align:null},"GraphQLResolveInfo")))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Returns:")," ",Object(n.b)("em",{parentName:"p"},"Promise\u2039T\u203a")),Object(n.b)("hr",null),Object(n.b)("h3",{id:"delete"},"delete"),Object(n.b)("p",null,"\u25b8 ",Object(n.b)("strong",{parentName:"p"},"delete"),"(",Object(n.b)("inlineCode",{parentName:"p"},"data"),": T, ",Object(n.b)("inlineCode",{parentName:"p"},"context?"),": GraphbackContext, ",Object(n.b)("inlineCode",{parentName:"p"},"info?"),": GraphQLResolveInfo): ",Object(n.b)("em",{parentName:"p"},"Promise\u2039T\u203a")),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Inherited from ",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice"},"DataSyncCRUDService"),".",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#delete"},"delete"))),Object(n.b)("p",null,"Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:35"),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Parameters:")),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",{parentName:"tr",align:null},"Name"),Object(n.b)("th",{parentName:"tr",align:null},"Type"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"data")),Object(n.b)("td",{parentName:"tr",align:null},"T")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"context?")),Object(n.b)("td",{parentName:"tr",align:null},"GraphbackContext")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"info?")),Object(n.b)("td",{parentName:"tr",align:null},"GraphQLResolveInfo")))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Returns:")," ",Object(n.b)("em",{parentName:"p"},"Promise\u2039T\u203a")),Object(n.b)("hr",null),Object(n.b)("h3",{id:"findby"},"findBy"),Object(n.b)("p",null,"\u25b8 ",Object(n.b)("strong",{parentName:"p"},"findBy"),"(",Object(n.b)("inlineCode",{parentName:"p"},"args?"),": FindByArgs, ",Object(n.b)("inlineCode",{parentName:"p"},"context?"),": GraphbackContext, ",Object(n.b)("inlineCode",{parentName:"p"},"info?"),": GraphQLResolveInfo, ",Object(n.b)("inlineCode",{parentName:"p"},"path?"),": string): ",Object(n.b)("em",{parentName:"p"},"Promise\u2039ResultList\u2039T\u203a\u203a")),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Inherited from ",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice"},"DataSyncCRUDService"),".",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#findby"},"findBy"))),Object(n.b)("p",null,"Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:37"),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Parameters:")),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",{parentName:"tr",align:null},"Name"),Object(n.b)("th",{parentName:"tr",align:null},"Type"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"args?")),Object(n.b)("td",{parentName:"tr",align:null},"FindByArgs")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"context?")),Object(n.b)("td",{parentName:"tr",align:null},"GraphbackContext")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"info?")),Object(n.b)("td",{parentName:"tr",align:null},"GraphQLResolveInfo")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"path?")),Object(n.b)("td",{parentName:"tr",align:null},"string")))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Returns:")," ",Object(n.b)("em",{parentName:"p"},"Promise\u2039ResultList\u2039T\u203a\u203a")),Object(n.b)("hr",null),Object(n.b)("h3",{id:"findone"},"findOne"),Object(n.b)("p",null,"\u25b8 ",Object(n.b)("strong",{parentName:"p"},"findOne"),"(",Object(n.b)("inlineCode",{parentName:"p"},"args"),": Partial\u2039T\u203a, ",Object(n.b)("inlineCode",{parentName:"p"},"context?"),": GraphbackContext, ",Object(n.b)("inlineCode",{parentName:"p"},"info?"),": GraphQLResolveInfo): ",Object(n.b)("em",{parentName:"p"},"Promise\u2039T\u203a")),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Inherited from ",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice"},"DataSyncCRUDService"),".",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#findone"},"findOne"))),Object(n.b)("p",null,"Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:36"),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Parameters:")),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",{parentName:"tr",align:null},"Name"),Object(n.b)("th",{parentName:"tr",align:null},"Type"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"args")),Object(n.b)("td",{parentName:"tr",align:null},"Partial\u2039T\u203a")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"context?")),Object(n.b)("td",{parentName:"tr",align:null},"GraphbackContext")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"info?")),Object(n.b)("td",{parentName:"tr",align:null},"GraphQLResolveInfo")))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Returns:")," ",Object(n.b)("em",{parentName:"p"},"Promise\u2039T\u203a")),Object(n.b)("hr",null),Object(n.b)("h3",{id:"subscribetocreate"},"subscribeToCreate"),Object(n.b)("p",null,"\u25b8 ",Object(n.b)("strong",{parentName:"p"},"subscribeToCreate"),"(",Object(n.b)("inlineCode",{parentName:"p"},"filter?"),": QueryFilter): ",Object(n.b)("em",{parentName:"p"},"AsyncIterator\u2039T\u203a | undefined")),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Inherited from ",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice"},"DataSyncCRUDService"),".",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#subscribetocreate"},"subscribeToCreate"))),Object(n.b)("p",null,"Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:38"),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Parameters:")),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",{parentName:"tr",align:null},"Name"),Object(n.b)("th",{parentName:"tr",align:null},"Type"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"filter?")),Object(n.b)("td",{parentName:"tr",align:null},"QueryFilter")))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Returns:")," ",Object(n.b)("em",{parentName:"p"},"AsyncIterator\u2039T\u203a | undefined")),Object(n.b)("hr",null),Object(n.b)("h3",{id:"subscribetodelete"},"subscribeToDelete"),Object(n.b)("p",null,"\u25b8 ",Object(n.b)("strong",{parentName:"p"},"subscribeToDelete"),"(",Object(n.b)("inlineCode",{parentName:"p"},"filter?"),": QueryFilter): ",Object(n.b)("em",{parentName:"p"},"AsyncIterator\u2039T\u203a | undefined")),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Inherited from ",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice"},"DataSyncCRUDService"),".",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#subscribetodelete"},"subscribeToDelete"))),Object(n.b)("p",null,"Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:40"),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Parameters:")),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",{parentName:"tr",align:null},"Name"),Object(n.b)("th",{parentName:"tr",align:null},"Type"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"filter?")),Object(n.b)("td",{parentName:"tr",align:null},"QueryFilter")))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Returns:")," ",Object(n.b)("em",{parentName:"p"},"AsyncIterator\u2039T\u203a | undefined")),Object(n.b)("hr",null),Object(n.b)("h3",{id:"subscribetoupdate"},"subscribeToUpdate"),Object(n.b)("p",null,"\u25b8 ",Object(n.b)("strong",{parentName:"p"},"subscribeToUpdate"),"(",Object(n.b)("inlineCode",{parentName:"p"},"filter?"),": QueryFilter): ",Object(n.b)("em",{parentName:"p"},"AsyncIterator\u2039T\u203a | undefined")),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Inherited from ",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice"},"DataSyncCRUDService"),".",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#subscribetoupdate"},"subscribeToUpdate"))),Object(n.b)("p",null,"Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:39"),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Parameters:")),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",{parentName:"tr",align:null},"Name"),Object(n.b)("th",{parentName:"tr",align:null},"Type"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"filter?")),Object(n.b)("td",{parentName:"tr",align:null},"QueryFilter")))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Returns:")," ",Object(n.b)("em",{parentName:"p"},"AsyncIterator\u2039T\u203a | undefined")),Object(n.b)("hr",null),Object(n.b)("h3",{id:"protected-subscriptiontopicmapping"},Object(n.b)("inlineCode",{parentName:"h3"},"Protected")," subscriptionTopicMapping"),Object(n.b)("p",null,"\u25b8 ",Object(n.b)("strong",{parentName:"p"},"subscriptionTopicMapping"),"(",Object(n.b)("inlineCode",{parentName:"p"},"triggerType"),": GraphbackOperationType, ",Object(n.b)("inlineCode",{parentName:"p"},"objectName"),": string): ",Object(n.b)("em",{parentName:"p"},"string")),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Inherited from ",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice"},"DataSyncCRUDService"),".",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#protected-subscriptiontopicmapping"},"subscriptionTopicMapping"))),Object(n.b)("p",null,"Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:45"),Object(n.b)("p",null,"Provides way to map runtime topics for subscriptions for specific types and object names"),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Parameters:")),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",{parentName:"tr",align:null},"Name"),Object(n.b)("th",{parentName:"tr",align:null},"Type"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"triggerType")),Object(n.b)("td",{parentName:"tr",align:null},"GraphbackOperationType")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"objectName")),Object(n.b)("td",{parentName:"tr",align:null},"string")))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Returns:")," ",Object(n.b)("em",{parentName:"p"},"string")),Object(n.b)("hr",null),Object(n.b)("h3",{id:"sync"},"sync"),Object(n.b)("p",null,"\u25b8 ",Object(n.b)("strong",{parentName:"p"},"sync"),"(",Object(n.b)("inlineCode",{parentName:"p"},"lastSync"),": Date, ",Object(n.b)("inlineCode",{parentName:"p"},"info?"),": GraphQLResolveInfo, ",Object(n.b)("inlineCode",{parentName:"p"},"filter?"),": any, ",Object(n.b)("inlineCode",{parentName:"p"},"limit?"),": number): ",Object(n.b)("em",{parentName:"p"},"Promise\u2039",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/interfaces/_services_datasynccrudservice_.synclist"},"SyncList"),"\u2039T\u203a\u203a")),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Defined in ",Object(n.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/services/DataSyncCRUDService.ts#L24"},"packages/graphback-datasync/src/services/DataSyncCRUDService.ts:24"))),Object(n.b)("p",null,"sync\nFor delta queries"),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Parameters:")),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",{parentName:"tr",align:null},"Name"),Object(n.b)("th",{parentName:"tr",align:null},"Type"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"lastSync")),Object(n.b)("td",{parentName:"tr",align:null},"Date")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"info?")),Object(n.b)("td",{parentName:"tr",align:null},"GraphQLResolveInfo")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"filter?")),Object(n.b)("td",{parentName:"tr",align:null},"any")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"limit?")),Object(n.b)("td",{parentName:"tr",align:null},"number")))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Returns:")," ",Object(n.b)("em",{parentName:"p"},"Promise\u2039",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/interfaces/_services_datasynccrudservice_.synclist"},"SyncList"),"\u2039T\u203a\u203a")),Object(n.b)("hr",null),Object(n.b)("h3",{id:"update"},"update"),Object(n.b)("p",null,"\u25b8 ",Object(n.b)("strong",{parentName:"p"},"update"),"(",Object(n.b)("inlineCode",{parentName:"p"},"data"),": T, ",Object(n.b)("inlineCode",{parentName:"p"},"context?"),": GraphbackContext, ",Object(n.b)("inlineCode",{parentName:"p"},"info?"),": GraphQLResolveInfo): ",Object(n.b)("em",{parentName:"p"},"Promise\u2039T\u203a")),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Inherited from ",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice"},"DataSyncCRUDService"),".",Object(n.b)("a",{parentName:"em",href:"/docs/0.16.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice#update"},"update"))),Object(n.b)("p",null,"Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:34"),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Parameters:")),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",{parentName:"tr",align:null},"Name"),Object(n.b)("th",{parentName:"tr",align:null},"Type"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"data")),Object(n.b)("td",{parentName:"tr",align:null},"T")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"context?")),Object(n.b)("td",{parentName:"tr",align:null},"GraphbackContext")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",{parentName:"tr",align:null},Object(n.b)("inlineCode",{parentName:"td"},"info?")),Object(n.b)("td",{parentName:"tr",align:null},"GraphQLResolveInfo")))),Object(n.b)("p",null,Object(n.b)("strong",{parentName:"p"},"Returns:")," ",Object(n.b)("em",{parentName:"p"},"Promise\u2039T\u203a")))}l.isMDXComponent=!0}}]);