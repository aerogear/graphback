(window.webpackJsonp=window.webpackJsonp||[]).push([[951],{1018:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return c})),r.d(t,"metadata",(function(){return o})),r.d(t,"rightToc",(function(){return b})),r.d(t,"default",(function(){return l}));var n=r(3),a=r(7),i=(r(0),r(1333)),c={id:"_db_getprimarykey_",title:"db/getPrimaryKey",sidebar_label:"db/getPrimaryKey"},o={unversionedId:"api/graphback-core/modules/_db_getprimarykey_",id:"version-0.15.x/api/graphback-core/modules/_db_getprimarykey_",isDocsHomePage:!1,title:"db/getPrimaryKey",description:"Index",source:"@site/versioned_docs/version-0.15.x/api/graphback-core/modules/_db_getprimarykey_.md",slug:"/api/graphback-core/modules/_db_getprimarykey_",permalink:"/docs/0.15.x/api/graphback-core/modules/_db_getprimarykey_",editUrl:"https://github.com/aerogear/graphback/edit/master/website/versioned_docs/version-0.15.x/api/graphback-core/modules/_db_getprimarykey_.md",version:"0.15.x",sidebar_label:"db/getPrimaryKey"},b=[{value:"Index",id:"index",children:[{value:"Functions",id:"functions",children:[]}]},{value:"Functions",id:"functions-1",children:[{value:"getPrimaryKey",id:"getprimarykey",children:[]}]}],p={rightToc:b};function l(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(n.a)({},p,r,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"index"},"Index"),Object(i.b)("h3",{id:"functions"},"Functions"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"/docs/0.15.x/api/graphback-core/modules/_db_getprimarykey_#getprimarykey"}),"getPrimaryKey"))),Object(i.b)("h2",{id:"functions-1"},"Functions"),Object(i.b)("h3",{id:"getprimarykey"},"getPrimaryKey"),Object(i.b)("p",null,"\u25b8 ",Object(i.b)("strong",{parentName:"p"},"getPrimaryKey"),"(",Object(i.b)("inlineCode",{parentName:"p"},"graphqlType"),": GraphQLObjectType): ",Object(i.b)("em",{parentName:"p"},"GraphQLField\u2039any, any\u203a")),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Defined in ",Object(i.b)("a",Object(n.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/db/getPrimaryKey.ts#L11"}),"packages/graphback-core/src/db/getPrimaryKey.ts:11"))),Object(i.b)("p",null,"Returns the primary key field of a GraphQL object.\nFirst looks for the existence of a ",Object(i.b)("inlineCode",{parentName:"p"},"@id")," field annotation,\notherwise tries to find an ",Object(i.b)("inlineCode",{parentName:"p"},"id: ID")," field."),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Parameters:")),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Name"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Type"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"graphqlType")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"GraphQLObjectType"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}))))),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Returns:")," ",Object(i.b)("em",{parentName:"p"},"GraphQLField\u2039any, any\u203a")))}l.isMDXComponent=!0},1333:function(e,t,r){"use strict";r.d(t,"a",(function(){return d})),r.d(t,"b",(function(){return s}));var n=r(0),a=r.n(n);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function b(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=a.a.createContext({}),l=function(e){var t=a.a.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},d=function(e){var t=l(e.components);return a.a.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,c=e.parentName,p=b(e,["components","mdxType","originalType","parentName"]),d=l(r),m=n,s=d["".concat(c,".").concat(m)]||d[m]||u[m]||i;return r?a.a.createElement(s,o(o({ref:t},p),{},{components:r})):a.a.createElement(s,o({ref:t},p))}));function s(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,c=new Array(i);c[0]=m;var o={};for(var b in t)hasOwnProperty.call(t,b)&&(o[b]=t[b]);o.originalType=e,o.mdxType="string"==typeof e?e:n,c[1]=o;for(var p=2;p<i;p++)c[p]=r[p];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,r)}m.displayName="MDXCreateElement"}}]);