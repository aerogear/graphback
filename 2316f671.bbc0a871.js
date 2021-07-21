(window.webpackJsonp=window.webpackJsonp||[]).push([[186],{1333:function(e,t,r){"use strict";r.d(t,"a",(function(){return u})),r.d(t,"b",(function(){return d}));var a=r(0),n=r.n(a);function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){c(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},c=Object.keys(e);for(a=0;a<c.length;a++)r=c[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(a=0;a<c.length;a++)r=c[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var i=n.a.createContext({}),b=function(e){var t=n.a.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},u=function(e){var t=b(e.components);return n.a.createElement(i.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.a.createElement(n.a.Fragment,{},t)}},m=n.a.forwardRef((function(e,t){var r=e.components,a=e.mdxType,c=e.originalType,o=e.parentName,i=p(e,["components","mdxType","originalType","parentName"]),u=b(r),m=a,d=u["".concat(o,".").concat(m)]||u[m]||s[m]||c;return r?n.a.createElement(d,l(l({ref:t},i),{},{components:r})):n.a.createElement(d,l({ref:t},i))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var c=r.length,o=new Array(c);o[0]=m;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var i=2;i<c;i++)o[i]=r[i];return n.a.createElement.apply(null,o)}return n.a.createElement.apply(null,r)}m.displayName="MDXCreateElement"},253:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return l})),r.d(t,"metadata",(function(){return p})),r.d(t,"rightToc",(function(){return i})),r.d(t,"default",(function(){return u}));var a=r(3),n=r(7),c=(r(0),r(1333)),o=["components"],l={id:"create-graphback",title:"Create Graphback",sidebar_label:"Create Graphback"},p={unversionedId:"cli/create-graphback",id:"version-0.16.x/cli/create-graphback",isDocsHomePage:!1,title:"Create Graphback",description:"Create Graphback is a command-line utility for creating Graphback applications.",source:"@site/versioned_docs/version-0.16.x/cli/create-graphback.md",slug:"/cli/create-graphback",permalink:"/docs/0.16.x/cli/create-graphback",editUrl:"https://github.com/aerogear/graphback/edit/master/website/versioned_docs/version-0.16.x/cli/create-graphback.md",version:"0.16.x",sidebar_label:"Create Graphback",sidebar:"version-0.16.x/docs",previous:{title:"Create your own Graphback plugin",permalink:"/docs/0.16.x/plugins/create"},next:{title:"Graphback CLI",permalink:"/docs/0.16.x/cli/graphback-cli"}},i=[{value:"Usage",id:"usage",children:[]}],b={rightToc:i};function u(e){var t=e.components,r=Object(n.a)(e,o);return Object(c.b)("wrapper",Object(a.a)({},b,r,{components:t,mdxType:"MDXLayout"}),Object(c.b)("p",null,Object(c.b)("a",{parentName:"p",href:"https://www.npmjs.com/package/create-graphback"},"Create Graphback")," is a command-line utility for creating Graphback applications."),Object(c.b)("h2",{id:"usage"},"Usage"),Object(c.b)("p",null,"You can initialise a Graphback project by either of the following commands:"),Object(c.b)("p",null,"With npx:"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-bash"},"npx create-graphback my-project\n")),Object(c.b)("p",null,"With npm init:"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-bash"},"npm init graphback my-project\n")),Object(c.b)("p",null,"The CLI will ask you to pick from one of a number of templates. Once chosen, the template will be downloaded to your computer."),Object(c.b)("p",null,"Change into your project folder:"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-bash"},"cd my-awesome-project\n")),Object(c.b)("p",null,"Install dependencies with yarn (or npm):"),Object(c.b)("p",null,"yarn:"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-bash"},"yarn\n")),Object(c.b)("p",null,"npm:"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-bash"},"npm install\n")),Object(c.b)("p",null,"The project will have a GraphQL schema file with some example types which you will likely want to change. Learn how to ",Object(c.b)("a",{parentName:"p",href:"../model/datamodel"},"design your data models"),"."),Object(c.b)("p",null,"Each template will be different, so you should follow the guide in your new project's ",Object(c.b)("inlineCode",{parentName:"p"},"README")," to complete the setup."))}u.isMDXComponent=!0}}]);