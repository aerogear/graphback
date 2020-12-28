(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{1333:function(e,t,a){"use strict";a.d(t,"a",(function(){return u})),a.d(t,"b",(function(){return d}));var r=a(0),n=a.n(r);function l(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){l(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function c(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var b=n.a.createContext({}),s=function(e){var t=n.a.useContext(b),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},u=function(e){var t=s(e.components);return n.a.createElement(b.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.a.createElement(n.a.Fragment,{},t)}},m=n.a.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,i=e.parentName,b=c(e,["components","mdxType","originalType","parentName"]),u=s(a),m=r,d=u["".concat(i,".").concat(m)]||u[m]||p[m]||l;return a?n.a.createElement(d,o(o({ref:t},b),{},{components:a})):n.a.createElement(d,o({ref:t},b))}));function d(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,i=new Array(l);i[0]=m;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o.mdxType="string"==typeof e?e:r,i[1]=o;for(var b=2;b<l;b++)i[b]=a[b];return n.a.createElement.apply(null,i)}return n.a.createElement.apply(null,a)}m.displayName="MDXCreateElement"},70:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return i})),a.d(t,"metadata",(function(){return o})),a.d(t,"rightToc",(function(){return c})),a.d(t,"default",(function(){return s}));var r=a(3),n=a(7),l=(a(0),a(1333)),i={id:"_abstract_tablecolumn_",title:"abstract/TableColumn",sidebar_label:"abstract/TableColumn"},o={unversionedId:"api/graphql-migrations/modules/_abstract_tablecolumn_",id:"version-1.0/api/graphql-migrations/modules/_abstract_tablecolumn_",isDocsHomePage:!1,title:"abstract/TableColumn",description:"Index",source:"@site/versioned_docs/version-1.0/api/graphql-migrations/modules/_abstract_tablecolumn_.md",slug:"/api/graphql-migrations/modules/_abstract_tablecolumn_",permalink:"/docs/api/graphql-migrations/modules/_abstract_tablecolumn_",editUrl:"https://github.com/aerogear/graphback/edit/master/website/versioned_docs/version-1.0/api/graphql-migrations/modules/_abstract_tablecolumn_.md",version:"1.0",sidebar_label:"abstract/TableColumn"},c=[{value:"Index",id:"index",children:[{value:"Interfaces",id:"interfaces",children:[]},{value:"Type aliases",id:"type-aliases",children:[]}]},{value:"Type aliases",id:"type-aliases-1",children:[{value:"TableColumnType",id:"tablecolumntype",children:[]}]}],b={rightToc:c};function s(e){var t=e.components,a=Object(n.a)(e,["components"]);return Object(l.b)("wrapper",Object(r.a)({},b,a,{components:t,mdxType:"MDXLayout"}),Object(l.b)("h2",{id:"index"},"Index"),Object(l.b)("h3",{id:"interfaces"},"Interfaces"),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},Object(l.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphql-migrations/interfaces/_abstract_tablecolumn_.foreignkey"}),"ForeignKey")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphql-migrations/interfaces/_abstract_tablecolumn_.tablecolumn"}),"TableColumn"))),Object(l.b)("h3",{id:"type-aliases"},"Type aliases"),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},Object(l.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/api/graphql-migrations/modules/_abstract_tablecolumn_#tablecolumntype"}),"TableColumnType"))),Object(l.b)("h2",{id:"type-aliases-1"},"Type aliases"),Object(l.b)("h3",{id:"tablecolumntype"},"TableColumnType"),Object(l.b)("p",null,"\u01ac ",Object(l.b)("strong",{parentName:"p"},"TableColumnType"),": ",Object(l.b)("em",{parentName:"p"},'"integer" | "bigInteger" | "text" | "string" | "float" | "decimal" | "boolean" | "date" | "datetime" | "time" | "timestamp" | "binary" | "enum" | "json" | "jsonb" | "uuid"')),Object(l.b)("p",null,Object(l.b)("em",{parentName:"p"},"Defined in ",Object(l.b)("a",Object(r.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-migrations/src/abstract/TableColumn.ts#L1"}),"abstract/TableColumn.ts:1"))))}s.isMDXComponent=!0}}]);