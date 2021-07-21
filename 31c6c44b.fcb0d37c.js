(window.webpackJsonp=window.webpackJsonp||[]).push([[248],{1333:function(e,t,n){"use strict";n.d(t,"a",(function(){return m})),n.d(t,"b",(function(){return s}));var r=n(0),a=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var b=a.a.createContext({}),p=function(e){var t=a.a.useContext(b),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},m=function(e){var t=p(e.components);return a.a.createElement(b.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,c=e.parentName,b=o(e,["components","mdxType","originalType","parentName"]),m=p(n),d=r,s=m["".concat(c,".").concat(d)]||m[d]||u[d]||i;return n?a.a.createElement(s,l(l({ref:t},b),{},{components:n})):a.a.createElement(s,l({ref:t},b))}));function s(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,c=new Array(i);c[0]=d;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l.mdxType="string"==typeof e?e:r,c[1]=l;for(var b=2;b<i;b++)c[b]=n[b];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},315:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return o})),n.d(t,"rightToc",(function(){return b})),n.d(t,"default",(function(){return m}));var r=n(3),a=n(7),i=(n(0),n(1333)),c=["components"],l={id:"_connector_write_",title:"connector/write",sidebar_label:"connector/write"},o={unversionedId:"api/graphql-migrations/modules/_connector_write_",id:"version-1.0/api/graphql-migrations/modules/_connector_write_",isDocsHomePage:!1,title:"connector/write",description:"Index",source:"@site/versioned_docs/version-1.0/api/graphql-migrations/modules/_connector_write_.md",slug:"/api/graphql-migrations/modules/_connector_write_",permalink:"/docs/api/graphql-migrations/modules/_connector_write_",editUrl:"https://github.com/aerogear/graphback/edit/master/website/versioned_docs/version-1.0/api/graphql-migrations/modules/_connector_write_.md",version:"1.0",sidebar_label:"connector/write"},b=[{value:"Index",id:"index",children:[{value:"Functions",id:"functions",children:[]}]},{value:"Functions",id:"functions-1",children:[{value:"write",id:"write",children:[]}]}],p={rightToc:b};function m(e){var t=e.components,n=Object(a.a)(e,c);return Object(i.b)("wrapper",Object(r.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"index"},"Index"),Object(i.b)("h3",{id:"functions"},"Functions"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"/docs/api/graphql-migrations/modules/_connector_write_#write"},"write"))),Object(i.b)("h2",{id:"functions-1"},"Functions"),Object(i.b)("h3",{id:"write"},"write"),Object(i.b)("p",null,"\u25b8 ",Object(i.b)("strong",{parentName:"p"},"write"),"(",Object(i.b)("inlineCode",{parentName:"p"},"operations"),": ",Object(i.b)("a",{parentName:"p",href:"/docs/api/graphql-migrations/interfaces/_diff_operation_.operation"},"Operation"),"[], ",Object(i.b)("inlineCode",{parentName:"p"},"config"),": Config, ",Object(i.b)("inlineCode",{parentName:"p"},"schemaName"),": string, ",Object(i.b)("inlineCode",{parentName:"p"},"tablePrefix"),": string, ",Object(i.b)("inlineCode",{parentName:"p"},"columnPrefix"),": string, ",Object(i.b)("inlineCode",{parentName:"p"},"plugins"),": ",Object(i.b)("a",{parentName:"p",href:"/docs/api/graphql-migrations/interfaces/_plugin_migrateplugin_.migrateplugin"},"MigratePlugin"),"[]): ",Object(i.b)("em",{parentName:"p"},"Promise\u2039void\u203a")),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Defined in ",Object(i.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-migrations/src/connector/write.ts#L36"},"connector/write.ts:36"))),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Parameters:")),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",{parentName:"tr",align:null},"Name"),Object(i.b)("th",{parentName:"tr",align:null},"Type"),Object(i.b)("th",{parentName:"tr",align:null},"Default"),Object(i.b)("th",{parentName:"tr",align:null},"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"operations")),Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("a",{parentName:"td",href:"/docs/api/graphql-migrations/interfaces/_diff_operation_.operation"},"Operation"),"[]"),Object(i.b)("td",{parentName:"tr",align:null},"-"),Object(i.b)("td",{parentName:"tr",align:null},"-")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"config")),Object(i.b)("td",{parentName:"tr",align:null},"Config"),Object(i.b)("td",{parentName:"tr",align:null},"-"),Object(i.b)("td",{parentName:"tr",align:null},"Knex configuration")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"schemaName")),Object(i.b)("td",{parentName:"tr",align:null},"string"),Object(i.b)("td",{parentName:"tr",align:null},'"public"'),Object(i.b)("td",{parentName:"tr",align:null},"Table schema prefix: ",Object(i.b)("inlineCode",{parentName:"td"},"<schemaName>.<tableName>"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"tablePrefix")),Object(i.b)("td",{parentName:"tr",align:null},"string"),Object(i.b)("td",{parentName:"tr",align:null},'""'),Object(i.b)("td",{parentName:"tr",align:null},"Table name prefix: ",Object(i.b)("inlineCode",{parentName:"td"},"<prefix><tableName>"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"columnPrefix")),Object(i.b)("td",{parentName:"tr",align:null},"string"),Object(i.b)("td",{parentName:"tr",align:null},'""'),Object(i.b)("td",{parentName:"tr",align:null},"Column name prefix: ",Object(i.b)("inlineCode",{parentName:"td"},"<prefix><columnName>"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"plugins")),Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("a",{parentName:"td",href:"/docs/api/graphql-migrations/interfaces/_plugin_migrateplugin_.migrateplugin"},"MigratePlugin"),"[]"),Object(i.b)("td",{parentName:"tr",align:null},"[]"),Object(i.b)("td",{parentName:"tr",align:null},"-")))),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Returns:")," ",Object(i.b)("em",{parentName:"p"},"Promise\u2039void\u203a")))}m.isMDXComponent=!0}}]);