(window.webpackJsonp=window.webpackJsonp||[]).push([[613],{1333:function(e,a,t){"use strict";t.d(a,"a",(function(){return d})),t.d(a,"b",(function(){return u}));var n=t(0),r=t.n(n);function c(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function b(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function l(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?b(Object(t),!0).forEach((function(a){c(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):b(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function p(e,a){if(null==e)return{};var t,n,r=function(e,a){if(null==e)return{};var t,n,r={},c=Object.keys(e);for(n=0;n<c.length;n++)t=c[n],a.indexOf(t)>=0||(r[t]=e[t]);return r}(e,a);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)t=c[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var i=r.a.createContext({}),s=function(e){var a=r.a.useContext(i),t=a;return e&&(t="function"==typeof e?e(a):l(l({},a),e)),t},d=function(e){var a=s(e.components);return r.a.createElement(i.Provider,{value:a},e.children)},o={inlineCode:"code",wrapper:function(e){var a=e.children;return r.a.createElement(r.a.Fragment,{},a)}},m=r.a.forwardRef((function(e,a){var t=e.components,n=e.mdxType,c=e.originalType,b=e.parentName,i=p(e,["components","mdxType","originalType","parentName"]),d=s(t),m=n,u=d["".concat(b,".").concat(m)]||d[m]||o[m]||c;return t?r.a.createElement(u,l(l({ref:a},i),{},{components:t})):r.a.createElement(u,l({ref:a},i))}));function u(e,a){var t=arguments,n=a&&a.mdxType;if("string"==typeof e||n){var c=t.length,b=new Array(c);b[0]=m;var l={};for(var p in a)hasOwnProperty.call(a,p)&&(l[p]=a[p]);l.originalType=e,l.mdxType="string"==typeof e?e:n,b[1]=l;for(var i=2;i<c;i++)b[i]=t[i];return r.a.createElement.apply(null,b)}return r.a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},681:function(e,a,t){"use strict";t.r(a),t.d(a,"frontMatter",(function(){return l})),t.d(a,"metadata",(function(){return p})),t.d(a,"rightToc",(function(){return i})),t.d(a,"default",(function(){return d}));var n=t(3),r=t(7),c=(t(0),t(1333)),b=["components"],l={id:"_datasyncplugin_.datasyncplugin",title:"DataSyncPlugin",sidebar_label:"DataSyncPlugin"},p={unversionedId:"api/graphback-datasync/classes/_datasyncplugin_.datasyncplugin",id:"version-0.15.x/api/graphback-datasync/classes/_datasyncplugin_.datasyncplugin",isDocsHomePage:!1,title:"DataSyncPlugin",description:"DataSync plugin",source:"@site/versioned_docs/version-0.15.x/api/graphback-datasync/classes/_datasyncplugin_.datasyncplugin.md",slug:"/api/graphback-datasync/classes/_datasyncplugin_.datasyncplugin",permalink:"/docs/0.15.x/api/graphback-datasync/classes/_datasyncplugin_.datasyncplugin",editUrl:"https://github.com/aerogear/graphback/edit/master/website/versioned_docs/version-0.15.x/api/graphback-datasync/classes/_datasyncplugin_.datasyncplugin.md",version:"0.15.x",sidebar_label:"DataSyncPlugin",sidebar:"version-0.15.x/docs",previous:{title:"DataSyncCRUDService",permalink:"/docs/0.15.x/api/graphback-datasync/classes/_services_datasynccrudservice_.datasynccrudservice"},next:{title:"ConflictError",permalink:"/docs/0.15.x/api/graphback-datasync/classes/_util_.conflicterror"}},i=[{value:"Hierarchy",id:"hierarchy",children:[]},{value:"Index",id:"index",children:[{value:"Methods",id:"methods",children:[]}]},{value:"Methods",id:"methods-1",children:[{value:"<code>Protected</code> addDataSyncMetadataFields",id:"protected-adddatasyncmetadatafields",children:[]},{value:"<code>Protected</code> addDeltaSyncResolver",id:"protected-adddeltasyncresolver",children:[]},{value:"createResolvers",id:"createresolvers",children:[]},{value:"createResources",id:"createresources",children:[]},{value:"getPluginName",id:"getpluginname",children:[]},{value:"<code>Protected</code> logError",id:"protected-logerror",children:[]},{value:"<code>Protected</code> logWarning",id:"protected-logwarning",children:[]},{value:"transformSchema",id:"transformschema",children:[]}]}],s={rightToc:i};function d(e){var a=e.components,t=Object(r.a)(e,b);return Object(c.b)("wrapper",Object(n.a)({},s,t,{components:a,mdxType:"MDXLayout"}),Object(c.b)("p",null,"DataSync plugin"),Object(c.b)("p",null,'Plugin is enabled by """ @datasync """ annotation\nIt will generate delta queries'),Object(c.b)("h2",{id:"hierarchy"},"Hierarchy"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("p",{parentName:"li"},"GraphbackPlugin"),Object(c.b)("p",{parentName:"li"},"\u21b3 ",Object(c.b)("strong",{parentName:"p"},"DataSyncPlugin")))),Object(c.b)("h2",{id:"index"},"Index"),Object(c.b)("h3",{id:"methods"},"Methods"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/0.15.x/api/graphback-datasync/classes/_datasyncplugin_.datasyncplugin#protected-adddatasyncmetadatafields"},"addDataSyncMetadataFields")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/0.15.x/api/graphback-datasync/classes/_datasyncplugin_.datasyncplugin#protected-adddeltasyncresolver"},"addDeltaSyncResolver")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/0.15.x/api/graphback-datasync/classes/_datasyncplugin_.datasyncplugin#createresolvers"},"createResolvers")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/0.15.x/api/graphback-datasync/classes/_datasyncplugin_.datasyncplugin#createresources"},"createResources")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/0.15.x/api/graphback-datasync/classes/_datasyncplugin_.datasyncplugin#getpluginname"},"getPluginName")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/0.15.x/api/graphback-datasync/classes/_datasyncplugin_.datasyncplugin#protected-logerror"},"logError")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/0.15.x/api/graphback-datasync/classes/_datasyncplugin_.datasyncplugin#protected-logwarning"},"logWarning")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/0.15.x/api/graphback-datasync/classes/_datasyncplugin_.datasyncplugin#transformschema"},"transformSchema"))),Object(c.b)("h2",{id:"methods-1"},"Methods"),Object(c.b)("h3",{id:"protected-adddatasyncmetadatafields"},Object(c.b)("inlineCode",{parentName:"h3"},"Protected")," addDataSyncMetadataFields"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"addDataSyncMetadataFields"),"(",Object(c.b)("inlineCode",{parentName:"p"},"schemaComposer"),": SchemaComposer\u2039any\u203a, ",Object(c.b)("inlineCode",{parentName:"p"},"model"),": ModelDefinition): ",Object(c.b)("em",{parentName:"p"},"void")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-datasync/src/DataSyncPlugin.ts#L152"},"packages/graphback-datasync/src/DataSyncPlugin.ts:152"))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"schemaComposer")),Object(c.b)("td",{parentName:"tr",align:null},"SchemaComposer\u2039any\u203a")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"model")),Object(c.b)("td",{parentName:"tr",align:null},"ModelDefinition")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"void")),Object(c.b)("hr",null),Object(c.b)("h3",{id:"protected-adddeltasyncresolver"},Object(c.b)("inlineCode",{parentName:"h3"},"Protected")," addDeltaSyncResolver"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"addDeltaSyncResolver"),"(",Object(c.b)("inlineCode",{parentName:"p"},"model"),": ModelDefinition, ",Object(c.b)("inlineCode",{parentName:"p"},"queryObj"),": IFieldResolver\u2039any, any\u203a): ",Object(c.b)("em",{parentName:"p"},"void")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-datasync/src/DataSyncPlugin.ts#L132"},"packages/graphback-datasync/src/DataSyncPlugin.ts:132"))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"model")),Object(c.b)("td",{parentName:"tr",align:null},"ModelDefinition")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"queryObj")),Object(c.b)("td",{parentName:"tr",align:null},"IFieldResolver\u2039any, any\u203a")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"void")),Object(c.b)("hr",null),Object(c.b)("h3",{id:"createresolvers"},"createResolvers"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"createResolvers"),"(",Object(c.b)("inlineCode",{parentName:"p"},"metadata"),": GraphbackCoreMetadata): ",Object(c.b)("em",{parentName:"p"},"IResolvers")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Overrides void")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-datasync/src/DataSyncPlugin.ts#L102"},"packages/graphback-datasync/src/DataSyncPlugin.ts:102"))),Object(c.b)("p",null,"Creates resolvers for Data Synchonization"),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"),Object(c.b)("th",{parentName:"tr",align:null},"Description"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"metadata")),Object(c.b)("td",{parentName:"tr",align:null},"GraphbackCoreMetadata"),Object(c.b)("td",{parentName:"tr",align:null},"Core metatata containing all model information")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"IResolvers")),Object(c.b)("hr",null),Object(c.b)("h3",{id:"createresources"},"createResources"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"createResources"),"(",Object(c.b)("inlineCode",{parentName:"p"},"metadata"),": GraphbackCoreMetadata): ",Object(c.b)("em",{parentName:"p"},"void")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Overrides void")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-datasync/src/DataSyncPlugin.ts#L121"},"packages/graphback-datasync/src/DataSyncPlugin.ts:121"))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"metadata")),Object(c.b)("td",{parentName:"tr",align:null},"GraphbackCoreMetadata")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"void")),Object(c.b)("hr",null),Object(c.b)("h3",{id:"getpluginname"},"getPluginName"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"getPluginName"),"(): ",Object(c.b)("em",{parentName:"p"},"string")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Overrides void")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-datasync/src/DataSyncPlugin.ts#L128"},"packages/graphback-datasync/src/DataSyncPlugin.ts:128"))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"string")),Object(c.b)("hr",null),Object(c.b)("h3",{id:"protected-logerror"},Object(c.b)("inlineCode",{parentName:"h3"},"Protected")," logError"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"logError"),"(",Object(c.b)("inlineCode",{parentName:"p"},"message"),": string): ",Object(c.b)("em",{parentName:"p"},"void")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Inherited from ",Object(c.b)("a",{parentName:"em",href:"/docs/0.15.x/api/graphback-datasync/classes/_datasyncplugin_.datasyncplugin"},"DataSyncPlugin"),".",Object(c.b)("a",{parentName:"em",href:"/docs/0.15.x/api/graphback-datasync/classes/_datasyncplugin_.datasyncplugin#protected-logerror"},"logError"))),Object(c.b)("p",null,"Defined in packages/graphback-core/types/plugin/GraphbackPlugin.d.ts:37"),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"message")),Object(c.b)("td",{parentName:"tr",align:null},"string")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"void")),Object(c.b)("hr",null),Object(c.b)("h3",{id:"protected-logwarning"},Object(c.b)("inlineCode",{parentName:"h3"},"Protected")," logWarning"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"logWarning"),"(",Object(c.b)("inlineCode",{parentName:"p"},"message"),": string): ",Object(c.b)("em",{parentName:"p"},"void")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Inherited from ",Object(c.b)("a",{parentName:"em",href:"/docs/0.15.x/api/graphback-datasync/classes/_datasyncplugin_.datasyncplugin"},"DataSyncPlugin"),".",Object(c.b)("a",{parentName:"em",href:"/docs/0.15.x/api/graphback-datasync/classes/_datasyncplugin_.datasyncplugin#protected-logwarning"},"logWarning"))),Object(c.b)("p",null,"Defined in packages/graphback-core/types/plugin/GraphbackPlugin.d.ts:36"),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"message")),Object(c.b)("td",{parentName:"tr",align:null},"string")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"void")),Object(c.b)("hr",null),Object(c.b)("h3",{id:"transformschema"},"transformSchema"),Object(c.b)("p",null,"\u25b8 ",Object(c.b)("strong",{parentName:"p"},"transformSchema"),"(",Object(c.b)("inlineCode",{parentName:"p"},"metadata"),": GraphbackCoreMetadata): ",Object(c.b)("em",{parentName:"p"},"GraphQLSchema")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Overrides void")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-datasync/src/DataSyncPlugin.ts#L26"},"packages/graphback-datasync/src/DataSyncPlugin.ts:26"))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Parameters:")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Name"),Object(c.b)("th",{parentName:"tr",align:null},"Type"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("inlineCode",{parentName:"td"},"metadata")),Object(c.b)("td",{parentName:"tr",align:null},"GraphbackCoreMetadata")))),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Returns:")," ",Object(c.b)("em",{parentName:"p"},"GraphQLSchema")))}d.isMDXComponent=!0}}]);