(window.webpackJsonp=window.webpackJsonp||[]).push([[725],{1333:function(e,t,r){"use strict";r.d(t,"a",(function(){return s})),r.d(t,"b",(function(){return f}));var n=r(0),a=r.n(n);function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){c(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=a.a.createContext({}),b=function(e){var t=a.a.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},s=function(e){var t=b(e.components);return a.a.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,c=e.originalType,i=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),s=b(r),d=n,f=s["".concat(i,".").concat(d)]||s[d]||u[d]||c;return r?a.a.createElement(f,o(o({ref:t},p),{},{components:r})):a.a.createElement(f,o({ref:t},p))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var c=r.length,i=new Array(c);i[0]=d;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:n,i[1]=o;for(var p=2;p<c;p++)i[p]=r[p];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},793:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return o})),r.d(t,"rightToc",(function(){return l})),r.d(t,"default",(function(){return b}));var n=r(3),a=r(7),c=(r(0),r(1333)),i={id:"_runtime_.datasyncserveconfig",title:"DataSyncServeConfig",sidebar_label:"DataSyncServeConfig"},o={unversionedId:"api/graphql-serve/interfaces/_runtime_.datasyncserveconfig",id:"version-1.0/api/graphql-serve/interfaces/_runtime_.datasyncserveconfig",isDocsHomePage:!1,title:"DataSyncServeConfig",description:"Hierarchy",source:"@site/versioned_docs/version-1.0/api/graphql-serve/interfaces/_runtime_.datasyncserveconfig.md",slug:"/api/graphql-serve/interfaces/_runtime_.datasyncserveconfig",permalink:"/docs/api/graphql-serve/interfaces/_runtime_.datasyncserveconfig",editUrl:"https://github.com/aerogear/graphback/edit/master/website/versioned_docs/version-1.0/api/graphql-serve/interfaces/_runtime_.datasyncserveconfig.md",version:"1.0",sidebar_label:"DataSyncServeConfig"},l=[{value:"Hierarchy",id:"hierarchy",children:[]},{value:"Index",id:"index",children:[{value:"Properties",id:"properties",children:[]}]},{value:"Properties",id:"properties-1",children:[{value:"<code>Optional</code> conflict",id:"optional-conflict",children:[]},{value:"datasync",id:"datasync",children:[]},{value:"<code>Optional</code> deltaTTL",id:"optional-deltattl",children:[]}]}],p={rightToc:l};function b(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(c.b)("wrapper",Object(n.a)({},p,r,{components:t,mdxType:"MDXLayout"}),Object(c.b)("h2",{id:"hierarchy"},"Hierarchy"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("strong",{parentName:"li"},"DataSyncServeConfig"))),Object(c.b)("h2",{id:"index"},"Index"),Object(c.b)("h3",{id:"properties"},"Properties"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",Object(n.a)({parentName:"li"},{href:"/docs/api/graphql-serve/interfaces/_runtime_.datasyncserveconfig#optional-conflict"}),"conflict")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",Object(n.a)({parentName:"li"},{href:"/docs/api/graphql-serve/interfaces/_runtime_.datasyncserveconfig#datasync"}),"datasync")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",Object(n.a)({parentName:"li"},{href:"/docs/api/graphql-serve/interfaces/_runtime_.datasyncserveconfig#optional-deltattl"}),"deltaTTL"))),Object(c.b)("h2",{id:"properties-1"},"Properties"),Object(c.b)("h3",{id:"optional-conflict"},Object(c.b)("inlineCode",{parentName:"h3"},"Optional")," conflict"),Object(c.b)("p",null,"\u2022 ",Object(c.b)("strong",{parentName:"p"},"conflict"),"? : ",Object(c.b)("em",{parentName:"p"},Object(c.b)("a",Object(n.a)({parentName:"em"},{href:"/docs/api/graphql-serve/modules/_runtime_#conflictresolutionstrategyname"}),"ConflictResolutionStrategyName"))),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",Object(n.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-serve/src/runtime.ts#L22"}),"runtime.ts:22"))),Object(c.b)("hr",null),Object(c.b)("h3",{id:"datasync"},"datasync"),Object(c.b)("p",null,"\u2022 ",Object(c.b)("strong",{parentName:"p"},"datasync"),": ",Object(c.b)("em",{parentName:"p"},"boolean")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",Object(n.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-serve/src/runtime.ts#L21"}),"runtime.ts:21"))),Object(c.b)("hr",null),Object(c.b)("h3",{id:"optional-deltattl"},Object(c.b)("inlineCode",{parentName:"h3"},"Optional")," deltaTTL"),Object(c.b)("p",null,"\u2022 ",Object(c.b)("strong",{parentName:"p"},"deltaTTL"),"? : ",Object(c.b)("em",{parentName:"p"},"number")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",Object(n.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-serve/src/runtime.ts#L23"}),"runtime.ts:23"))))}b.isMDXComponent=!0}}]);