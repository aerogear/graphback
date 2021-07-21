(window.webpackJsonp=window.webpackJsonp||[]).push([[1008],{1078:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return p})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return b}));var a=n(3),r=n(7),o=(n(0),n(1333)),i=["components"],p={id:"_util_parseannotationscompat_",title:"util/parseAnnotationsCompat",sidebar_label:"util/parseAnnotationsCompat"},c={unversionedId:"api/graphql-migrations/modules/_util_parseannotationscompat_",id:"version-1.0/api/graphql-migrations/modules/_util_parseannotationscompat_",isDocsHomePage:!1,title:"util/parseAnnotationsCompat",description:"Index",source:"@site/versioned_docs/version-1.0/api/graphql-migrations/modules/_util_parseannotationscompat_.md",slug:"/api/graphql-migrations/modules/_util_parseannotationscompat_",permalink:"/docs/api/graphql-migrations/modules/_util_parseannotationscompat_",editUrl:"https://github.com/aerogear/graphback/edit/master/website/versioned_docs/version-1.0/api/graphql-migrations/modules/_util_parseannotationscompat_.md",version:"1.0",sidebar_label:"util/parseAnnotationsCompat"},s=[{value:"Index",id:"index",children:[{value:"Functions",id:"functions",children:[]}]},{value:"Functions",id:"functions-1",children:[{value:"parseAnnotationsCompat",id:"parseannotationscompat",children:[]}]}],l={rightToc:s};function b(e){var t=e.components,n=Object(r.a)(e,i);return Object(o.b)("wrapper",Object(a.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"index"},"Index"),Object(o.b)("h3",{id:"functions"},"Functions"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"/docs/api/graphql-migrations/modules/_util_parseannotationscompat_#parseannotationscompat"},"parseAnnotationsCompat"))),Object(o.b)("h2",{id:"functions-1"},"Functions"),Object(o.b)("h3",{id:"parseannotationscompat"},"parseAnnotationsCompat"),Object(o.b)("p",null,"\u25b8 ",Object(o.b)("strong",{parentName:"p"},"parseAnnotationsCompat"),"(",Object(o.b)("inlineCode",{parentName:"p"},"namespace"),": string, ",Object(o.b)("inlineCode",{parentName:"p"},"description"),": string): ",Object(o.b)("em",{parentName:"p"},"any")),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-migrations/src/util/parseAnnotationsCompat.ts#L17"},"util/parseAnnotationsCompat.ts:17"))),Object(o.b)("p",null,"Wraps ",Object(o.b)("inlineCode",{parentName:"p"},"parseMetadata")," to return empty object instead of undefined if no annotation is found."),Object(o.b)("p",null,"This is a compatibility function to ensure an empty object is r\nreturned when there is no annotationn as graphql-migrations assumes an empty object will be\nreturned and does not do any conditional checking for undefined annotation. This is because\n",Object(o.b)("inlineCode",{parentName:"p"},"parseAnnotations")," (deprecated) from grapqhl-metadata returns an empty object, but parseMetadata\nreturns undefined."),Object(o.b)("p",null,"Do not use this for new features"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Parameters:")),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",{parentName:"tr",align:null},"Name"),Object(o.b)("th",{parentName:"tr",align:null},"Type"),Object(o.b)("th",{parentName:"tr",align:null},"Description"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"namespace")),Object(o.b)("td",{parentName:"tr",align:null},"string"),Object(o.b)("td",{parentName:"tr",align:null},"-")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"description")),Object(o.b)("td",{parentName:"tr",align:null},"string"),Object(o.b)("td",{parentName:"tr",align:null})))),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Returns:")," ",Object(o.b)("em",{parentName:"p"},"any")))}b.isMDXComponent=!0},1333:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return d}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=r.a.createContext({}),l=function(e){var t=r.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},b=function(e){var t=l(e.components);return r.a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},m=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),b=l(n),m=a,d=b["".concat(i,".").concat(m)]||b[m]||u[m]||o;return n?r.a.createElement(d,p(p({ref:t},s),{},{components:n})):r.a.createElement(d,p({ref:t},s))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=m;var p={};for(var c in t)hasOwnProperty.call(t,c)&&(p[c]=t[c]);p.originalType=e,p.mdxType="string"==typeof e?e:a,i[1]=p;for(var s=2;s<o;s++)i[s]=n[s];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);