(window.webpackJsonp=window.webpackJsonp||[]).push([[126],{1333:function(e,r,a){"use strict";a.d(r,"a",(function(){return g})),a.d(r,"b",(function(){return s}));var n=a(0),t=a.n(n);function c(e,r,a){return r in e?Object.defineProperty(e,r,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[r]=a,e}function o(e,r){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var r=1;r<arguments.length;r++){var a=null!=arguments[r]?arguments[r]:{};r%2?o(Object(a),!0).forEach((function(r){c(e,r,a[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(a,r))}))}return e}function p(e,r){if(null==e)return{};var a,n,t=function(e,r){if(null==e)return{};var a,n,t={},c=Object.keys(e);for(n=0;n<c.length;n++)a=c[n],r.indexOf(a)>=0||(t[a]=e[a]);return t}(e,r);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)a=c[n],r.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(t[a]=e[a])}return t}var l=t.a.createContext({}),b=function(e){var r=t.a.useContext(l),a=r;return e&&(a="function"==typeof e?e(r):i(i({},r),e)),a},g=function(e){var r=b(e.components);return t.a.createElement(l.Provider,{value:r},e.children)},u={inlineCode:"code",wrapper:function(e){var r=e.children;return t.a.createElement(t.a.Fragment,{},r)}},f=t.a.forwardRef((function(e,r){var a=e.components,n=e.mdxType,c=e.originalType,o=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),g=b(a),f=n,s=g["".concat(o,".").concat(f)]||g[f]||u[f]||c;return a?t.a.createElement(s,i(i({ref:r},l),{},{components:a})):t.a.createElement(s,i({ref:r},l))}));function s(e,r){var a=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var c=a.length,o=new Array(c);o[0]=f;var i={};for(var p in r)hasOwnProperty.call(r,p)&&(i[p]=r[p]);i.originalType=e,i.mdxType="string"==typeof e?e:n,o[1]=i;for(var l=2;l<c;l++)o[l]=a[l];return t.a.createElement.apply(null,o)}return t.a.createElement.apply(null,a)}f.displayName="MDXCreateElement"},190:function(e,r,a){"use strict";a.r(r),a.d(r,"frontMatter",(function(){return i})),a.d(r,"metadata",(function(){return p})),a.d(r,"rightToc",(function(){return l})),a.d(r,"default",(function(){return g}));var n=a(3),t=a(7),c=(a(0),a(1333)),o=["components"],i={id:"_plugin_graphbackglobalconfig_.graphbackglobalconfig",title:"GraphbackGlobalConfig",sidebar_label:"GraphbackGlobalConfig"},p={unversionedId:"api/graphback-core/interfaces/_plugin_graphbackglobalconfig_.graphbackglobalconfig",id:"version-0.15.x/api/graphback-core/interfaces/_plugin_graphbackglobalconfig_.graphbackglobalconfig",isDocsHomePage:!1,title:"GraphbackGlobalConfig",description:"Configuration for crud generators",source:"@site/versioned_docs/version-0.15.x/api/graphback-core/interfaces/_plugin_graphbackglobalconfig_.graphbackglobalconfig.md",slug:"/api/graphback-core/interfaces/_plugin_graphbackglobalconfig_.graphbackglobalconfig",permalink:"/docs/0.15.x/api/graphback-core/interfaces/_plugin_graphbackglobalconfig_.graphbackglobalconfig",editUrl:"https://github.com/aerogear/graphback/edit/master/website/versioned_docs/version-0.15.x/api/graphback-core/interfaces/_plugin_graphbackglobalconfig_.graphbackglobalconfig.md",version:"0.15.x",sidebar_label:"GraphbackGlobalConfig"},l=[{value:"Hierarchy",id:"hierarchy",children:[]},{value:"Index",id:"index",children:[{value:"Properties",id:"properties",children:[]}]},{value:"Properties",id:"properties-1",children:[{value:"crudMethods",id:"crudmethods",children:[]}]}],b={rightToc:l};function g(e){var r=e.components,a=Object(t.a)(e,o);return Object(c.b)("wrapper",Object(n.a)({},b,a,{components:r,mdxType:"MDXLayout"}),Object(c.b)("p",null,"Configuration for crud generators"),Object(c.b)("h2",{id:"hierarchy"},"Hierarchy"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("strong",{parentName:"li"},"GraphbackGlobalConfig"))),Object(c.b)("h2",{id:"index"},"Index"),Object(c.b)("h3",{id:"properties"},"Properties"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",{parentName:"li",href:"/docs/0.15.x/api/graphback-core/interfaces/_plugin_graphbackglobalconfig_.graphbackglobalconfig#crudmethods"},"crudMethods"))),Object(c.b)("h2",{id:"properties-1"},"Properties"),Object(c.b)("h3",{id:"crudmethods"},"crudMethods"),Object(c.b)("p",null,"\u2022 ",Object(c.b)("strong",{parentName:"p"},"crudMethods"),": ",Object(c.b)("em",{parentName:"p"},Object(c.b)("a",{parentName:"em",href:"/docs/0.15.x/api/graphback-core/interfaces/_plugin_graphbackcrudgeneratorconfig_.graphbackcrudgeneratorconfig"},"GraphbackCRUDGeneratorConfig"))),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/plugin/GraphbackGlobalConfig.ts#L7"},"packages/graphback-core/src/plugin/GraphbackGlobalConfig.ts:7"))))}g.isMDXComponent=!0}}]);