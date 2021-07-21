(window.webpackJsonp=window.webpackJsonp||[]).push([[1135],{1204:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return c})),t.d(n,"metadata",(function(){return o})),t.d(n,"rightToc",(function(){return p})),t.d(n,"default",(function(){return b}));var a=t(3),r=t(7),i=(t(0),t(1333)),l=["components"],c={id:"crud-client",title:"ClientCRUD Plugin",sidebar_label:"ClientCRUD"},o={unversionedId:"plugins/crud-client",id:"version-0.16.x/plugins/crud-client",isDocsHomePage:!1,title:"ClientCRUD Plugin",description:"The ClientCRUDPlugin plugin uses your GraphQL schema to generate queries, mutations, subscriptions and fragments for use in your client-side application. The generated documents are compatible with all major GraphQL providers, such as Apollo GraphQL and urql.",source:"@site/versioned_docs/version-0.16.x/plugins/client-crud-plugin.md",slug:"/plugins/crud-client",permalink:"/docs/0.16.x/plugins/crud-client",editUrl:"https://github.com/aerogear/graphback/edit/master/website/versioned_docs/version-0.16.x/plugins/client-crud-plugin.md",version:"0.16.x",sidebar_label:"ClientCRUD",sidebar:"version-0.16.x/docs",previous:{title:"SchemaCRUD Plugin",permalink:"/docs/0.16.x/plugins/crud-schema"},next:{title:"Create your own Graphback plugin",permalink:"/docs/0.16.x/plugins/create"}},p=[{value:"Installation",id:"installation",children:[]},{value:"Usage",id:"usage",children:[]},{value:"Configuration",id:"configuration",children:[]}],u={rightToc:p};function b(e){var n=e.components,t=Object(r.a)(e,l);return Object(i.b)("wrapper",Object(a.a)({},u,t,{components:n,mdxType:"MDXLayout"}),Object(i.b)("p",null,"The ",Object(i.b)("a",{parentName:"p",href:"/docs/0.16.x/api/graphback-codegen-client/classes/_clientcrudplugin_.clientcrudplugin"},Object(i.b)("inlineCode",{parentName:"a"},"ClientCRUDPlugin"))," plugin uses your GraphQL schema to generate queries, mutations, subscriptions and fragments for use in your client-side application. The generated documents are compatible with all major GraphQL providers, such as ",Object(i.b)("a",{parentName:"p",href:"https://www.apollographql.com/"},"Apollo GraphQL")," and ",Object(i.b)("a",{parentName:"p",href:"https://formidable.com/open-source/urql/"},"urql"),"."),Object(i.b)("h2",{id:"installation"},"Installation"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash"},"yarn add @graphback/codegen-client\n")),Object(i.b)("p",null,"To execute this plugin on-demand, you will use the ",Object(i.b)("a",{parentName:"p",href:"../graphback-cli"},"Graphback CLI"),". Install it as a devDependency in your project."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash"},"yarn add -D graphback-cli\n")),Object(i.b)("h2",{id:"usage"},"Usage"),Object(i.b)("p",null,"It is recommended to use the Graphback CLI for certain Graphback plugins, such as those that can modify files which your application depends on. This will prevent hidden accidental file modifications that would otherwise happen during start-up, which might cause issues in your application."),Object(i.b)("p",null,"To load the ",Object(i.b)("inlineCode",{parentName:"p"},"ClientCRUDPlugin")," plugin, it should be configuration in a ",Object(i.b)("inlineCode",{parentName:"p"},".graphqlrc")," ",Object(i.b)("a",{parentName:"p",href:"https://graphql-config.com"},"GraphQL Config")," file. The Grahback CLI can dynamically load and execute plugins from a ",Object(i.b)("inlineCode",{parentName:"p"},".graphqlrc")," file."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml",metastring:'title=".graphqlrc"',title:'".graphqlrc"'},"schema: './src/schema.graphql'\ndocuments: './client/src/graphql/**/*.graphql'\nextensions:\n  graphback:\n    # path to data mode file(s)\n    model: './model/datamodel.graphql'\n    plugins:\n      graphback-schema:\n        outputPath: './src/schema/schema.graphql'\n      graphback-client:\n        outputFile: './client/src/graphql/graphback.graphql'\n")),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"SchemaCRUDPlugin")," should be defined before ",Object(i.b)("inlineCode",{parentName:"p"},"ClientCRUDPlugin")," as ",Object(i.b)("inlineCode",{parentName:"p"},"graphback-schema")," to ensure the latest schema is used to generate client documents."),Object(i.b)("p",null,"See ",Object(i.b)("a",{parentName:"p",href:"./schema-crud-plugin"},"SchemaCRUDPlugin")," for an installation and configuration guide."),Object(i.b)("p",null,"Run ",Object(i.b)("a",{parentName:"p",href:"../graphback-cli#generate"},Object(i.b)("inlineCode",{parentName:"a"},"yarn graphback generate"))," to execute plugins from the ",Object(i.b)("inlineCode",{parentName:"p"},".graphqlrc")," config file on-demand."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash"},"$ yarn graphback generate\nGeneration successful!\nDone in 0.74s.\n")),Object(i.b)("p",null,"The client documents will be created in a file called ",Object(i.b)("inlineCode",{parentName:"p"},"./client/src/graphql/graphback.graphql"),"."),Object(i.b)("h2",{id:"configuration"},"Configuration"),Object(i.b)("p",null,"Below is a full list of the available configuration options for this plugin."),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",{parentName:"tr",align:null},"Argument"),Object(i.b)("th",{parentName:"tr",align:null},"Description"),Object(i.b)("th",{parentName:"tr",align:null},"Type"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"pluginConfig.outputFile")),Object(i.b)("td",{parentName:"tr",align:null},"Relative path to the GraphQL documents to be created.",Object(i.b)("br",null),Object(i.b)("br",null)," Example: ",Object(i.b)("inlineCode",{parentName:"td"},'"/path/to/documents.graphql"'),". ",Object(i.b)("br",null),Object(i.b)("br",null),"Supported file extensions: ",Object(i.b)("inlineCode",{parentName:"td"},".ts"),", ",Object(i.b)("inlineCode",{parentName:"td"},".graphql")),Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"string"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"pluginConfig.fragmentOnly")),Object(i.b)("td",{parentName:"tr",align:null},"Optional. When ",Object(i.b)("inlineCode",{parentName:"td"},"true")," Graphback generates only creates fragments, and skips creating queries, mutations and subscriptions."),Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"boolean"))))))}b.isMDXComponent=!0},1333:function(e,n,t){"use strict";t.d(n,"a",(function(){return b})),t.d(n,"b",(function(){return g}));var a=t(0),r=t.n(a);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=r.a.createContext({}),u=function(e){var n=r.a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):c(c({},n),e)),t},b=function(e){var n=u(e.components);return r.a.createElement(p.Provider,{value:n},e.children)},s={inlineCode:"code",wrapper:function(e){var n=e.children;return r.a.createElement(r.a.Fragment,{},n)}},d=r.a.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),b=u(t),d=a,g=b["".concat(l,".").concat(d)]||b[d]||s[d]||i;return t?r.a.createElement(g,c(c({ref:n},p),{},{components:t})):r.a.createElement(g,c({ref:n},p))}));function g(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,l=new Array(i);l[0]=d;var c={};for(var o in n)hasOwnProperty.call(n,o)&&(c[o]=n[o]);c.originalType=e,c.mdxType="string"==typeof e?e:a,l[1]=c;for(var p=2;p<i;p++)l[p]=t[p];return r.a.createElement.apply(null,l)}return r.a.createElement.apply(null,t)}d.displayName="MDXCreateElement"}}]);