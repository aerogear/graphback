(window.webpackJsonp=window.webpackJsonp||[]).push([[401],{1333:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return m}));var a=n(0),r=n.n(a);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=r.a.createContext({}),o=function(e){var t=r.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},d=function(e){var t=o(e.components);return r.a.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},u=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,b=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),d=o(n),u=a,m=d["".concat(b,".").concat(u)]||d[u]||s[u]||l;return n?r.a.createElement(m,c(c({ref:t},p),{},{components:n})):r.a.createElement(m,c({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,b=new Array(l);b[0]=u;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:a,b[1]=c;for(var p=2;p<l;p++)b[p]=n[p];return r.a.createElement.apply(null,b)}return r.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},468:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return b})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return i})),n.d(t,"default",(function(){return o}));var a=n(3),r=n(7),l=(n(0),n(1333)),b={id:"_templates_fragmentfields_",title:"templates/fragmentFields",sidebar_label:"templates/fragmentFields"},c={unversionedId:"api/graphback-codegen-client/modules/_templates_fragmentfields_",id:"version-1.0/api/graphback-codegen-client/modules/_templates_fragmentfields_",isDocsHomePage:!1,title:"templates/fragmentFields",description:"Index",source:"@site/versioned_docs/version-1.0/api/graphback-codegen-client/modules/_templates_fragmentfields_.md",slug:"/api/graphback-codegen-client/modules/_templates_fragmentfields_",permalink:"/docs/api/graphback-codegen-client/modules/_templates_fragmentfields_",editUrl:"https://github.com/aerogear/graphback/edit/master/website/versioned_docs/version-1.0/api/graphback-codegen-client/modules/_templates_fragmentfields_.md",version:"1.0",sidebar_label:"templates/fragmentFields"},i=[{value:"Index",id:"index",children:[{value:"Functions",id:"functions",children:[]}]},{value:"Functions",id:"functions-1",children:[{value:"buildReturnFields",id:"buildreturnfields",children:[]},{value:"<code>Const</code> printReturnFields",id:"const-printreturnfields",children:[]}]}],p={rightToc:i};function o(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(l.b)("wrapper",Object(a.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(l.b)("h2",{id:"index"},"Index"),Object(l.b)("h3",{id:"functions"},"Functions"),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},Object(l.b)("a",Object(a.a)({parentName:"li"},{href:"/docs/api/graphback-codegen-client/modules/_templates_fragmentfields_#buildreturnfields"}),"buildReturnFields")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("a",Object(a.a)({parentName:"li"},{href:"/docs/api/graphback-codegen-client/modules/_templates_fragmentfields_#const-printreturnfields"}),"printReturnFields"))),Object(l.b)("h2",{id:"functions-1"},"Functions"),Object(l.b)("h3",{id:"buildreturnfields"},"buildReturnFields"),Object(l.b)("p",null,"\u25b8 ",Object(l.b)("strong",{parentName:"p"},"buildReturnFields"),"(",Object(l.b)("inlineCode",{parentName:"p"},"t"),": GraphQLObjectType, ",Object(l.b)("inlineCode",{parentName:"p"},"level?"),": number): ",Object(l.b)("em",{parentName:"p"},"any[]")),Object(l.b)("p",null,Object(l.b)("em",{parentName:"p"},"Defined in ",Object(l.b)("a",Object(a.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-client/src/templates/fragmentFields.ts#L12"}),"graphback-codegen-client/src/templates/fragmentFields.ts:12"))),Object(l.b)("p",null,"For given type - it returns list of the type fields that\ncan be used for building GraphQL Fragment"),Object(l.b)("p",null,Object(l.b)("strong",{parentName:"p"},"Parameters:")),Object(l.b)("table",null,Object(l.b)("thead",{parentName:"table"},Object(l.b)("tr",{parentName:"thead"},Object(l.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Name"),Object(l.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Type"),Object(l.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Description"))),Object(l.b)("tbody",{parentName:"table"},Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(l.b)("inlineCode",{parentName:"td"},"t")),Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"GraphQLObjectType"),Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"type that is going to be used")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(l.b)("inlineCode",{parentName:"td"},"level?")),Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"number"),Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"nested level (supports only 0, 1 nested level)")))),Object(l.b)("p",null,Object(l.b)("strong",{parentName:"p"},"Returns:")," ",Object(l.b)("em",{parentName:"p"},"any[]")),Object(l.b)("hr",null),Object(l.b)("h3",{id:"const-printreturnfields"},Object(l.b)("inlineCode",{parentName:"h3"},"Const")," printReturnFields"),Object(l.b)("p",null,"\u25b8 ",Object(l.b)("strong",{parentName:"p"},"printReturnFields"),"(",Object(l.b)("inlineCode",{parentName:"p"},"resultArray"),": any[], ",Object(l.b)("inlineCode",{parentName:"p"},"shift"),": string): ",Object(l.b)("em",{parentName:"p"},"string")),Object(l.b)("p",null,Object(l.b)("em",{parentName:"p"},"Defined in ",Object(l.b)("a",Object(a.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-client/src/templates/fragmentFields.ts#L38"}),"graphback-codegen-client/src/templates/fragmentFields.ts:38"))),Object(l.b)("p",null,Object(l.b)("strong",{parentName:"p"},"Parameters:")),Object(l.b)("table",null,Object(l.b)("thead",{parentName:"table"},Object(l.b)("tr",{parentName:"thead"},Object(l.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Name"),Object(l.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Type"),Object(l.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Default"))),Object(l.b)("tbody",{parentName:"table"},Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(l.b)("inlineCode",{parentName:"td"},"resultArray")),Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"any[]"),Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"-")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(l.b)("inlineCode",{parentName:"td"},"shift")),Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"string"),Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null}),'""')))),Object(l.b)("p",null,Object(l.b)("strong",{parentName:"p"},"Returns:")," ",Object(l.b)("em",{parentName:"p"},"string")))}o.isMDXComponent=!0}}]);