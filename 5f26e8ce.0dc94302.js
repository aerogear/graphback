(window.webpackJsonp=window.webpackJsonp||[]).push([[467],{1333:function(e,t,a){"use strict";a.d(t,"a",(function(){return u})),a.d(t,"b",(function(){return g}));var n=a(0),r=a.n(n);function c(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function b(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){c(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},c=Object.keys(e);for(n=0;n<c.length;n++)a=c[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)a=c[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var p=r.a.createContext({}),o=function(e){var t=r.a.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):b(b({},t),e)),a},u=function(e){var t=o(e.components);return r.a.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=r.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,c=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=o(a),d=n,g=u["".concat(l,".").concat(d)]||u[d]||s[d]||c;return a?r.a.createElement(g,b(b({ref:t},p),{},{components:a})):r.a.createElement(g,b({ref:t},p))}));function g(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var c=a.length,l=new Array(c);l[0]=d;var b={};for(var i in t)hasOwnProperty.call(t,i)&&(b[i]=t[i]);b.originalType=e,b.mdxType="string"==typeof e?e:n,l[1]=b;for(var p=2;p<c;p++)l[p]=a[p];return r.a.createElement.apply(null,l)}return r.a.createElement.apply(null,a)}d.displayName="MDXCreateElement"},534:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return b})),a.d(t,"metadata",(function(){return i})),a.d(t,"rightToc",(function(){return p})),a.d(t,"default",(function(){return u}));var n=a(3),r=a(7),c=(a(0),a(1333)),l=["components"],b={id:"_clientcrudplugin_.clientcrudplugin",title:"ClientCRUDPlugin",sidebar_label:"ClientCRUDPlugin"},i={unversionedId:"api/graphback-codegen-client/classes/_clientcrudplugin_.clientcrudplugin",id:"version-1.0/api/graphback-codegen-client/classes/_clientcrudplugin_.clientcrudplugin",isDocsHomePage:!1,title:"ClientCRUDPlugin",description:"Graphback CRUD operations plugin",source:"@site/versioned_docs/version-1.0/api/graphback-codegen-client/classes/_clientcrudplugin_.clientcrudplugin.md",slug:"/api/graphback-codegen-client/classes/_clientcrudplugin_.clientcrudplugin",permalink:"/docs/api/graphback-codegen-client/classes/_clientcrudplugin_.clientcrudplugin",editUrl:"https://github.com/aerogear/graphback/edit/master/website/versioned_docs/version-1.0/api/graphback-codegen-client/classes/_clientcrudplugin_.clientcrudplugin.md",version:"1.0",sidebar_label:"ClientCRUDPlugin",sidebar:"version-1.0/docs",previous:{title:"SchemaCRUDPlugin",permalink:"/docs/api/graphback-codegen-schema/classes/_schemacrudplugin_.schemacrudplugin"},next:{title:"KeycloakCrudService",permalink:"/docs/api/graphback-keycloak-authz/classes/_keycloakcrudservice_.keycloakcrudservice"}},p=[{value:"Hierarchy",id:"hierarchy",children:[]},{value:"Index",id:"index",children:[{value:"Constructors",id:"constructors",children:[]},{value:"Properties",id:"properties",children:[]},{value:"Methods",id:"methods",children:[]}]},{value:"Constructors",id:"constructors-1",children:[{value:"constructor",id:"constructor",children:[]}]},{value:"Properties",id:"properties-1",children:[{value:"<code>Private</code> pluginConfig",id:"private-pluginconfig",children:[]}]},{value:"Methods",id:"methods-1",children:[{value:"createResolvers",id:"createresolvers",children:[]},{value:"createResources",id:"createresources",children:[]},{value:"getDocuments",id:"getdocuments",children:[]},{value:"getPluginName",id:"getpluginname",children:[]},{value:"<code>Protected</code> logError",id:"protected-logerror",children:[]},{value:"<code>Protected</code> logWarning",id:"protected-logwarning",children:[]},{value:"transformSchema",id:"transformschema",children:[]}]}],o={rightToc:p};function u(e){var t=e.components,a=Object(r.a)(e,l);return Object(c.b)("wrapper",Object(n.a)({},o,a,{components:t,mdxType:"MDXLayout"}),Object(c.b)("p",null,"Graphback CRUD operations plugin"),Object(c.b)("p",null,"Plugins generates client side documents containing CRUD operations:\nQueries, Mutations and Subscriptions that reference coresponding schema and resolves.\nPlugin operates on all types annotated with model"),Object(c.b)("p",null,"Used graphql metadata:"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},"model: marks type to be processed by CRUD generator"),Object(c.b)("li",{parentName:"ul"},"crud: controls what types of operations can be generated.\nFor example crud.update: false will disable updates for type")),Object(c.b)("h2",{id:"hierarchy"},"Hierarchy"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("p",{parentName:"li"},"GraphbackPlugin"),Object(c.b)("p",{parentName:"li"},"\u21b3 ",Object(c.b)("strong",{parentName:"p"},"ClientCRUDPlugin")))),Object(c.b)("h2",{id:"index"},"Index"),Object(c.b)("h3",{id:"constructors"},"Constructors"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/api/graphback-codegen-client/classes/_clientcrudplugin_.clientcrudplugin#constructor"},"constructor"))),Object(c.b)("h3",{id:"properties"},"Properties"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/api/graphback-codegen-client/classes/_clientcrudplugin_.clientcrudplugin#private-pluginconfig"},"pluginConfig"))),Object(c.b)("h3",{id:"methods"},"Methods"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/api/graphback-codegen-client/classes/_clientcrudplugin_.clientcrudplugin#createresolvers"},"createResolvers")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/api/graphback-codegen-client/classes/_clientcrudplugin_.clientcrudplugin#createresources"},"createResources")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/api/graphback-codegen-client/classes/_clientcrudplugin_.clientcrudplugin#getdocuments"},"getDocuments")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/api/graphback-codegen-client/classes/_clientcrudplugin_.clientcrudplugin#getpluginname"},"getPluginName")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/api/graphback-codegen-client/classes/_clientcrudplugin_.clientcrudplugin#protected-logerror"},"logError")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/api/graphback-codegen-client/classes/_clientcrudplugin_.clientcrudplugin#protected-logwarning"},"logWarning")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/api/graphback-codegen-client/classes/_clientcrudplugin_.clientcrudplugin#transformschema"},"transformSchema"))),Object(c.b)("h2",{id:"constructors-1"},"Constructors"),Object(c.b)("h3",{id:"constructor"},"constructor"),Object(c.b)("p",null,"+"," ",Object(c.b)("strong",{parentName:"p"},"new ClientCRUDPlugin"),"(",Object(c.b)("inlineCode",{parentName:"p"},"pluginConfig?"),": ",Object(c.b)("a",{parentName:"p",href:"/docs/api/graphback-codegen-client/interfaces/_clientcrudplugin_.clientgeneratorpluginconfig"},"ClientGeneratorPluginConfig"),"): ",Object(c.b)("em",{parentName:"p"},Object(c.b)("a",{parentName:"em",href:"/docs/api/graphback-codegen-client/classes/_clientcrudplugin_.clientcrudplugin"},"ClientCRUDPlugin"))),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-client/src/ClientCRUDPlugin.ts#L40"},"graphback-codegen-client/src/ClientCRUDPlugin.ts:40"))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"pluginConfig?")),Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("a",{parentName:"td",href:"/docs/api/graphback-codegen-client/interfaces/_clientcrudplugin_.clientgeneratorpluginconfig"},"ClientGeneratorPluginConfig"))))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},Object(c.b)("a",{parentName:"em",href:"/docs/api/graphback-codegen-client/classes/_clientcrudplugin_.clientcrudplugin"},"ClientCRUDPlugin"))),Object(c.b)("h2",{id:"properties-1"},"Properties"),Object(c.b)("h3",{id:"private-pluginconfig"},Object(c.b)("inlineCode",{parentName:"h3"},"Private")," pluginConfig"),Object(c.b)("p",null,"\u2022 ",Object(c.b)("strong",{parentName:"p"},"pluginConfig"),": ",Object(c.b)("em",{parentName:"p"},Object(c.b)("a",{parentName:"em",href:"/docs/api/graphback-codegen-client/interfaces/_clientcrudplugin_.clientgeneratorpluginconfig"},"ClientGeneratorPluginConfig"))),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-client/src/ClientCRUDPlugin.ts#L40"},"graphback-codegen-client/src/ClientCRUDPlugin.ts:40"))),Object(c.b)("h2",{id:"methods-1"},"Methods"),Object(c.b)("h3",{id:"createresolvers"},"createResolvers"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"createResolvers"),"(",Object(c.b)("inlineCode",{parentName:"p"},"metadata"),": GraphbackCoreMetadata): ",Object(c.b)("em",{parentName:"p"},"IResolvers")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Inherited from ",Object(c.b)("a",{parentName:"em",href:"/docs/api/graphback-codegen-client/classes/_clientcrudplugin_.clientcrudplugin"},"ClientCRUDPlugin"),".",Object(c.b)("a",{parentName:"em",href:"/docs/api/graphback-codegen-client/classes/_clientcrudplugin_.clientcrudplugin#createresolvers"},"createResolvers"))),Object(c.b)("p",null,"Defined in graphback-core/types/plugin/GraphbackPlugin.d.ts:35"),Object(c.b)("p",null,"Method to create in-memory resolvers which will be\nadded to a list of resolvers output by Graphback"),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"),Object(c.b)("th",{parentName:"tr",align:null},"Description"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"metadata")),Object(c.b)("td",{parentName:"tr",align:null},"GraphbackCoreMetadata"),Object(c.b)("td",{parentName:"tr",align:null},"metadata object with model metadata")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"IResolvers")),Object(c.b)("hr",null),Object(c.b)("h3",{id:"createresources"},"createResources"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"createResources"),"(",Object(c.b)("inlineCode",{parentName:"p"},"metadata"),": GraphbackCoreMetadata): ",Object(c.b)("em",{parentName:"p"},"void")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Overrides void")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-client/src/ClientCRUDPlugin.ts#L50"},"graphback-codegen-client/src/ClientCRUDPlugin.ts:50"))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"metadata")),Object(c.b)("td",{parentName:"tr",align:null},"GraphbackCoreMetadata")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"void")),Object(c.b)("hr",null),Object(c.b)("h3",{id:"getdocuments"},"getDocuments"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"getDocuments"),"(",Object(c.b)("inlineCode",{parentName:"p"},"metadata"),": GraphbackCoreMetadata): ",Object(c.b)("em",{parentName:"p"},Object(c.b)("a",{parentName:"em",href:"/docs/api/graphback-codegen-client/interfaces/_templates_clienttemplates_.clienttemplates"},"ClientTemplates"))),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-client/src/ClientCRUDPlugin.ts#L60"},"graphback-codegen-client/src/ClientCRUDPlugin.ts:60"))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"metadata")),Object(c.b)("td",{parentName:"tr",align:null},"GraphbackCoreMetadata")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},Object(c.b)("a",{parentName:"em",href:"/docs/api/graphback-codegen-client/interfaces/_templates_clienttemplates_.clienttemplates"},"ClientTemplates"))),Object(c.b)("hr",null),Object(c.b)("h3",{id:"getpluginname"},"getPluginName"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"getPluginName"),"(): ",Object(c.b)("em",{parentName:"p"},"string")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Overrides void")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-client/src/ClientCRUDPlugin.ts#L56"},"graphback-codegen-client/src/ClientCRUDPlugin.ts:56"))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"string")),Object(c.b)("hr",null),Object(c.b)("h3",{id:"protected-logerror"},Object(c.b)("inlineCode",{parentName:"h3"},"Protected")," logError"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"logError"),"(",Object(c.b)("inlineCode",{parentName:"p"},"message"),": string): ",Object(c.b)("em",{parentName:"p"},"void")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Inherited from ",Object(c.b)("a",{parentName:"em",href:"/docs/api/graphback-codegen-client/classes/_clientcrudplugin_.clientcrudplugin"},"ClientCRUDPlugin"),".",Object(c.b)("a",{parentName:"em",href:"/docs/api/graphback-codegen-client/classes/_clientcrudplugin_.clientcrudplugin#protected-logerror"},"logError"))),Object(c.b)("p",null,"Defined in graphback-core/types/plugin/GraphbackPlugin.d.ts:37"),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"message")),Object(c.b)("td",{parentName:"tr",align:null},"string")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"void")),Object(c.b)("hr",null),Object(c.b)("h3",{id:"protected-logwarning"},Object(c.b)("inlineCode",{parentName:"h3"},"Protected")," logWarning"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"logWarning"),"(",Object(c.b)("inlineCode",{parentName:"p"},"message"),": string): ",Object(c.b)("em",{parentName:"p"},"void")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Inherited from ",Object(c.b)("a",{parentName:"em",href:"/docs/api/graphback-codegen-client/classes/_clientcrudplugin_.clientcrudplugin"},"ClientCRUDPlugin"),".",Object(c.b)("a",{parentName:"em",href:"/docs/api/graphback-codegen-client/classes/_clientcrudplugin_.clientcrudplugin#protected-logwarning"},"logWarning"))),Object(c.b)("p",null,"Defined in graphback-core/types/plugin/GraphbackPlugin.d.ts:36"),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"message")),Object(c.b)("td",{parentName:"tr",align:null},"string")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"void")),Object(c.b)("hr",null),Object(c.b)("h3",{id:"transformschema"},"transformSchema"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"transformSchema"),"(",Object(c.b)("inlineCode",{parentName:"p"},"metadata"),": GraphbackCoreMetadata): ",Object(c.b)("em",{parentName:"p"},"GraphQLSchema")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Inherited from ",Object(c.b)("a",{parentName:"em",href:"/docs/api/graphback-codegen-client/classes/_clientcrudplugin_.clientcrudplugin"},"ClientCRUDPlugin"),".",Object(c.b)("a",{parentName:"em",href:"/docs/api/graphback-codegen-client/classes/_clientcrudplugin_.clientcrudplugin#transformschema"},"transformSchema"))),Object(c.b)("p",null,"Defined in graphback-core/types/plugin/GraphbackPlugin.d.ts:23"),Object(c.b)("p",null,"Performs transformation on the schema and returns target schema\nImplementations should extend this method if they wish to apply some changes\nto schema. Otherwise unchanged schema should be returned"),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"),Object(c.b)("th",{parentName:"tr",align:null},"Description"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"metadata")),Object(c.b)("td",{parentName:"tr",align:null},"GraphbackCoreMetadata"),Object(c.b)("td",{parentName:"tr",align:null},"metadata object containing schema")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"GraphQLSchema")))}u.isMDXComponent=!0}}]);