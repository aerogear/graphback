(window.webpackJsonp=window.webpackJsonp||[]).push([[205],{1333:function(e,t,r){"use strict";r.d(t,"a",(function(){return s})),r.d(t,"b",(function(){return m}));var n=r(0),a=r.n(n);function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){c(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var b=a.a.createContext({}),l=function(e){var t=a.a.useContext(b),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=l(e.components);return a.a.createElement(b.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,c=e.originalType,o=e.parentName,b=p(e,["components","mdxType","originalType","parentName"]),s=l(r),d=n,m=s["".concat(o,".").concat(d)]||s[d]||u[d]||c;return r?a.a.createElement(m,i(i({ref:t},b),{},{components:r})):a.a.createElement(m,i({ref:t},b))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var c=r.length,o=new Array(c);o[0]=d;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i.mdxType="string"==typeof e?e:n,o[1]=i;for(var b=2;b<c;b++)o[b]=r[b];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},272:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return p})),r.d(t,"rightToc",(function(){return b})),r.d(t,"default",(function(){return s}));var n=r(3),a=r(7),c=(r(0),r(1333)),o=["components"],i={id:"index",title:"graphback-cli",sidebar_label:"README"},p={unversionedId:"api/graphback-cli/index",id:"version-0.15.x/api/graphback-cli/index",isDocsHomePage:!1,title:"graphback-cli",description:"Graphback",source:"@site/versioned_docs/version-0.15.x/api/graphback-cli/index.md",slug:"/api/graphback-cli/index",permalink:"/docs/0.15.x/api/graphback-cli/index",editUrl:"https://github.com/aerogear/graphback/edit/master/website/versioned_docs/version-0.15.x/api/graphback-cli/index.md",version:"0.15.x",sidebar_label:"README"},b=[{value:"Graphback",id:"graphback",children:[]},{value:"Motivation",id:"motivation",children:[]},{value:"CLI commands reference",id:"cli-commands-reference",children:[]}],l={rightToc:b};function s(e){var t=e.components,r=Object(a.a)(e,o);return Object(c.b)("wrapper",Object(n.a)({},l,r,{components:t,mdxType:"MDXLayout"}),Object(c.b)("h2",{id:"graphback"},"Graphback"),Object(c.b)("p",{align:"center"},Object(c.b)("img",{width:"400",src:"https://raw.githubusercontent.com/aerogear/graphback/master/website/static/img/logo.png"}),Object(c.b)("br",null),"Auto generate database structure, ",Object(c.b)("br",null),"GraphQL Resolvers and Queries from GraphQL types \ud83d\ude80"),Object(c.b)("h2",{id:"motivation"},"Motivation"),Object(c.b)("p",null,"Graphback helps you to kickstart your experience with any existing GraphQL implementation\nby generating backend and client side CRUD layer using your GraphQL data model."),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Documentation"),": ",Object(c.b)("a",{parentName:"p",href:"https://graphback.dev"},"https://graphback.dev")),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"Repository"),": ",Object(c.b)("a",{parentName:"p",href:"https://github.com/aerogear/graphback/"},"https://github.com/aerogear/graphback/")),Object(c.b)("h2",{id:"cli-commands-reference"},"CLI commands reference"),Object(c.b)("p",null,"See: ",Object(c.b)("a",{parentName:"p",href:"https://graphback.dev/docs/commands"},"https://graphback.dev/docs/commands")),Object(c.b)("blockquote",null,Object(c.b)("p",{parentName:"blockquote"},"NOTE: Graphback CLI is now part of the graphql-cli command line tool. Please consider installing ",Object(c.b)("a",{parentName:"p",href:"https://github.com/Urigo/graphql-cli"},"https://github.com/Urigo/graphql-cli")," for wider set of features")))}s.isMDXComponent=!0}}]);