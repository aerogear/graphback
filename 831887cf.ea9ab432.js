(window.webpackJsonp=window.webpackJsonp||[]).push([[629],{1333:function(e,r,a){"use strict";a.d(r,"a",(function(){return u})),a.d(r,"b",(function(){return f}));var n=a(0),t=a.n(n);function c(e,r,a){return r in e?Object.defineProperty(e,r,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[r]=a,e}function i(e,r){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var r=1;r<arguments.length;r++){var a=null!=arguments[r]?arguments[r]:{};r%2?i(Object(a),!0).forEach((function(r){c(e,r,a[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(a,r))}))}return e}function p(e,r){if(null==e)return{};var a,n,t=function(e,r){if(null==e)return{};var a,n,t={},c=Object.keys(e);for(n=0;n<c.length;n++)a=c[n],r.indexOf(a)>=0||(t[a]=e[a]);return t}(e,r);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)a=c[n],r.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(t[a]=e[a])}return t}var b=t.a.createContext({}),l=function(e){var r=t.a.useContext(b),a=r;return e&&(a="function"==typeof e?e(r):o(o({},r),e)),a},u=function(e){var r=l(e.components);return t.a.createElement(b.Provider,{value:r},e.children)},g={inlineCode:"code",wrapper:function(e){var r=e.children;return t.a.createElement(t.a.Fragment,{},r)}},s=t.a.forwardRef((function(e,r){var a=e.components,n=e.mdxType,c=e.originalType,i=e.parentName,b=p(e,["components","mdxType","originalType","parentName"]),u=l(a),s=n,f=u["".concat(i,".").concat(s)]||u[s]||g[s]||c;return a?t.a.createElement(f,o(o({ref:r},b),{},{components:a})):t.a.createElement(f,o({ref:r},b))}));function f(e,r){var a=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var c=a.length,i=new Array(c);i[0]=s;var o={};for(var p in r)hasOwnProperty.call(r,p)&&(o[p]=r[p]);o.originalType=e,o.mdxType="string"==typeof e?e:n,i[1]=o;for(var b=2;b<c;b++)i[b]=a[b];return t.a.createElement.apply(null,i)}return t.a.createElement.apply(null,a)}s.displayName="MDXCreateElement"},697:function(e,r,a){"use strict";a.r(r),a.d(r,"frontMatter",(function(){return i})),a.d(r,"metadata",(function(){return o})),a.d(r,"rightToc",(function(){return p})),a.d(r,"default",(function(){return l}));var n=a(3),t=a(7),c=(a(0),a(1333)),i={id:"_graphbackconfig_.graphbackconfig",title:"GraphbackConfig",sidebar_label:"GraphbackConfig"},o={unversionedId:"api/graphback/interfaces/_graphbackconfig_.graphbackconfig",id:"version-1.0/api/graphback/interfaces/_graphbackconfig_.graphbackconfig",isDocsHomePage:!1,title:"GraphbackConfig",description:"Global configuration for Graphback ecosystem that represents each plugin",source:"@site/versioned_docs/version-1.0/api/graphback/interfaces/_graphbackconfig_.graphbackconfig.md",slug:"/api/graphback/interfaces/_graphbackconfig_.graphbackconfig",permalink:"/docs/api/graphback/interfaces/_graphbackconfig_.graphbackconfig",editUrl:"https://github.com/aerogear/graphback/edit/master/website/versioned_docs/version-1.0/api/graphback/interfaces/_graphbackconfig_.graphbackconfig.md",version:"1.0",sidebar_label:"GraphbackConfig"},p=[{value:"Hierarchy",id:"hierarchy",children:[]},{value:"Index",id:"index",children:[{value:"Properties",id:"properties",children:[]}]},{value:"Properties",id:"properties-1",children:[{value:"<code>Optional</code> crud",id:"optional-crud",children:[]},{value:"<code>Optional</code> plugins",id:"optional-plugins",children:[]}]}],b={rightToc:p};function l(e){var r=e.components,a=Object(t.a)(e,["components"]);return Object(c.b)("wrapper",Object(n.a)({},b,a,{components:r,mdxType:"MDXLayout"}),Object(c.b)("p",null,"Global configuration for Graphback ecosystem that represents each plugin"),Object(c.b)("h2",{id:"hierarchy"},"Hierarchy"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("strong",{parentName:"li"},"GraphbackConfig"))),Object(c.b)("h2",{id:"index"},"Index"),Object(c.b)("h3",{id:"properties"},"Properties"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",Object(n.a)({parentName:"li"},{href:"/docs/api/graphback/interfaces/_graphbackconfig_.graphbackconfig#optional-crud"}),"crud")),Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",Object(n.a)({parentName:"li"},{href:"/docs/api/graphback/interfaces/_graphbackconfig_.graphbackconfig#optional-plugins"}),"plugins"))),Object(c.b)("h2",{id:"properties-1"},"Properties"),Object(c.b)("h3",{id:"optional-crud"},Object(c.b)("inlineCode",{parentName:"h3"},"Optional")," crud"),Object(c.b)("p",null,"\u2022 ",Object(c.b)("strong",{parentName:"p"},"crud"),"? : ",Object(c.b)("em",{parentName:"p"},"GraphbackCRUDGeneratorConfig")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",Object(n.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback/src/GraphbackConfig.ts#L9"}),"GraphbackConfig.ts:9"))),Object(c.b)("hr",null),Object(c.b)("h3",{id:"optional-plugins"},Object(c.b)("inlineCode",{parentName:"h3"},"Optional")," plugins"),Object(c.b)("p",null,"\u2022 ",Object(c.b)("strong",{parentName:"p"},"plugins"),"? : ",Object(c.b)("em",{parentName:"p"},"object | any")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",Object(n.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/63664df15/packages/graphback/src/GraphbackConfig.ts#L11"}),"GraphbackConfig.ts:11"))))}l.isMDXComponent=!0}}]);