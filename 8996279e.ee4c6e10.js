(window.webpackJsonp=window.webpackJsonp||[]).push([[667],{1333:function(e,t,r){"use strict";r.d(t,"a",(function(){return s})),r.d(t,"b",(function(){return m}));var a=r(0),n=r.n(a);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function b(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var o=n.a.createContext({}),p=function(e){var t=n.a.useContext(o),r=t;return e&&(r="function"==typeof e?e(t):b(b({},t),e)),r},s=function(e){var t=p(e.components);return n.a.createElement(o.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.a.createElement(n.a.Fragment,{},t)}},d=n.a.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,o=l(e,["components","mdxType","originalType","parentName"]),s=p(r),d=a,m=s["".concat(c,".").concat(d)]||s[d]||u[d]||i;return r?n.a.createElement(m,b(b({ref:t},o),{},{components:r})):n.a.createElement(m,b({ref:t},o))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,c=new Array(i);c[0]=d;var b={};for(var l in t)hasOwnProperty.call(t,l)&&(b[l]=t[l]);b.originalType=e,b.mdxType="string"==typeof e?e:a,c[1]=b;for(var o=2;o<i;o++)c[o]=r[o];return n.a.createElement.apply(null,c)}return n.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},735:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return c})),r.d(t,"metadata",(function(){return b})),r.d(t,"rightToc",(function(){return l})),r.d(t,"default",(function(){return p}));var a=r(3),n=r(7),i=(r(0),r(1333)),c={id:"_abstract_table_.tableindex",title:"TableIndex",sidebar_label:"TableIndex"},b={unversionedId:"api/graphql-migrations/interfaces/_abstract_table_.tableindex",id:"version-1.0/api/graphql-migrations/interfaces/_abstract_table_.tableindex",isDocsHomePage:!1,title:"TableIndex",description:"Hierarchy",source:"@site/versioned_docs/version-1.0/api/graphql-migrations/interfaces/_abstract_table_.tableindex.md",slug:"/api/graphql-migrations/interfaces/_abstract_table_.tableindex",permalink:"/docs/api/graphql-migrations/interfaces/_abstract_table_.tableindex",editUrl:"https://github.com/aerogear/graphback/edit/master/website/versioned_docs/version-1.0/api/graphql-migrations/interfaces/_abstract_table_.tableindex.md",version:"1.0",sidebar_label:"TableIndex"},l=[{value:"Hierarchy",id:"hierarchy",children:[]},{value:"Index",id:"index",children:[{value:"Properties",id:"properties",children:[]}]},{value:"Properties",id:"properties-1",children:[{value:"columns",id:"columns",children:[]},{value:"name",id:"name",children:[]},{value:"type",id:"type",children:[]}]}],o={rightToc:l};function p(e){var t=e.components,r=Object(n.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},o,r,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"hierarchy"},"Hierarchy"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"TableIndex"))),Object(i.b)("h2",{id:"index"},"Index"),Object(i.b)("h3",{id:"properties"},"Properties"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(a.a)({parentName:"li"},{href:"/docs/api/graphql-migrations/interfaces/_abstract_table_.tableindex#columns"}),"columns")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(a.a)({parentName:"li"},{href:"/docs/api/graphql-migrations/interfaces/_abstract_table_.tableindex#name"}),"name")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(a.a)({parentName:"li"},{href:"/docs/api/graphql-migrations/interfaces/_abstract_table_.tableindex#type"}),"type"))),Object(i.b)("h2",{id:"properties-1"},"Properties"),Object(i.b)("h3",{id:"columns"},"columns"),Object(i.b)("p",null,"\u2022 ",Object(i.b)("strong",{parentName:"p"},"columns"),": ",Object(i.b)("em",{parentName:"p"},"string[]")),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Defined in ",Object(i.b)("a",Object(a.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-migrations/src/abstract/Table.ts#L14"}),"abstract/Table.ts:14"))),Object(i.b)("hr",null),Object(i.b)("h3",{id:"name"},"name"),Object(i.b)("p",null,"\u2022 ",Object(i.b)("strong",{parentName:"p"},"name"),": ",Object(i.b)("em",{parentName:"p"},"string | undefined")),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Defined in ",Object(i.b)("a",Object(a.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-migrations/src/abstract/Table.ts#L15"}),"abstract/Table.ts:15"))),Object(i.b)("hr",null),Object(i.b)("h3",{id:"type"},"type"),Object(i.b)("p",null,"\u2022 ",Object(i.b)("strong",{parentName:"p"},"type"),": ",Object(i.b)("em",{parentName:"p"},"string | undefined")),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Defined in ",Object(i.b)("a",Object(a.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-migrations/src/abstract/Table.ts#L16"}),"abstract/Table.ts:16"))))}p.isMDXComponent=!0}}]);