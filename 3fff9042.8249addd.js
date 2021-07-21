(window.webpackJsonp=window.webpackJsonp||[]).push([[329],{1333:function(e,r,n){"use strict";n.d(r,"a",(function(){return b})),n.d(r,"b",(function(){return m}));var t=n(0),a=n.n(t);function o(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function i(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function l(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?i(Object(n),!0).forEach((function(r){o(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function s(e,r){if(null==e)return{};var n,t,a=function(e,r){if(null==e)return{};var n,t,a={},o=Object.keys(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||(a[n]=e[n]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=a.a.createContext({}),c=function(e){var r=a.a.useContext(p),n=r;return e&&(n="function"==typeof e?e(r):l(l({},r),e)),n},b=function(e){var r=c(e.components);return a.a.createElement(p.Provider,{value:r},e.children)},d={inlineCode:"code",wrapper:function(e){var r=e.children;return a.a.createElement(a.a.Fragment,{},r)}},h=a.a.forwardRef((function(e,r){var n=e.components,t=e.mdxType,o=e.originalType,i=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),b=c(n),h=t,m=b["".concat(i,".").concat(h)]||b[h]||d[h]||o;return n?a.a.createElement(m,l(l({ref:r},p),{},{components:n})):a.a.createElement(m,l({ref:r},p))}));function m(e,r){var n=arguments,t=r&&r.mdxType;if("string"==typeof e||t){var o=n.length,i=new Array(o);i[0]=h;var l={};for(var s in r)hasOwnProperty.call(r,s)&&(l[s]=r[s]);l.originalType=e,l.mdxType="string"==typeof e?e:t,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},396:function(e,r,n){"use strict";n.r(r),n.d(r,"frontMatter",(function(){return l})),n.d(r,"metadata",(function(){return s})),n.d(r,"rightToc",(function(){return p})),n.d(r,"default",(function(){return b}));var t=n(3),a=n(7),o=(n(0),n(1333)),i=["components"],l={id:"index",title:"graphql-serve",sidebar_label:"README"},s={unversionedId:"api/graphql-serve/index",id:"version-0.15.x/api/graphql-serve/index",isDocsHomePage:!1,title:"graphql-serve",description:"Graphback",source:"@site/versioned_docs/version-0.15.x/api/graphql-serve/index.md",slug:"/api/graphql-serve/index",permalink:"/docs/0.15.x/api/graphql-serve/index",editUrl:"https://github.com/aerogear/graphback/edit/master/website/versioned_docs/version-0.15.x/api/graphql-serve/index.md",version:"0.15.x",sidebar_label:"README"},p=[{value:"Graphback",id:"graphback",children:[]},{value:"Getting Started",id:"getting-started",children:[{value:"Installation",id:"installation",children:[]},{value:"Usage",id:"usage",children:[]}]},{value:"Extension to GraphQL TestX",id:"extension-to-graphql-testx",children:[]}],c={rightToc:p};function b(e){var r=e.components,n=Object(a.a)(e,i);return Object(o.b)("wrapper",Object(t.a)({},c,n,{components:r,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"graphback"},"Graphback"),Object(o.b)("p",{align:"center"},Object(o.b)("img",{width:"400",src:"https://raw.githubusercontent.com/aerogear/graphback/master/website/static/img/logo.png"}),Object(o.b)("br",null),"Auto generate database structure, ",Object(o.b)("br",null),"GraphQL Resolvers and Queries from GraphQL types \ud83d\ude80"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Documentation"),": ",Object(o.b)("a",{parentName:"p",href:"https://graphback.dev"},"https://graphback.dev"),"\n",Object(o.b)("strong",{parentName:"p"},"Repository"),": ",Object(o.b)("a",{parentName:"p",href:"https://github.com/aerogear/graphback/"},"https://github.com/aerogear/graphback/")),Object(o.b)("h1",{id:"graphql-serve"},"graphql-serve"),Object(o.b)("p",null,"Fully functional GraphQL Server based on Graphback CRUD Specification"),Object(o.b)("p",null,"graphql-serve is a full-featured GraphQL server, based on\n",Object(o.b)("a",{parentName:"p",href:"https://graphback.dev/"},"Graphback")," and\n",Object(o.b)("a",{parentName:"p",href:"https://www.apollographql.com/docs/apollo-server/"},"Apollo Server"),". With the\nminimum configuration required, you have a server ready for testing GraphQL\nclient applications or libraries. Unlike mocking alternatives, graphql-serve\noffers persistent data between queries and mutation using in-memory SQLite\ndatabase."),Object(o.b)("h2",{id:"getting-started"},"Getting Started"),Object(o.b)("h3",{id:"installation"},"Installation"),Object(o.b)("p",null,"Using npm:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"npm install -g graphql-serve\n")),Object(o.b)("p",null,"or yarn:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"yarn global add graphql-serve\n")),Object(o.b)("h3",{id:"usage"},"Usage"),Object(o.b)("h4",{id:"gqlserve"},"gqlserve"),Object(o.b)("p",null,"The gqlserve command only needs one or more ",Object(o.b)("inlineCode",{parentName:"p"},"*.graphql")," data model file(s) in order to setup a working GraphQL server. Here is an example model file:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-graphql"},'""" @model """\ntype Note {\n  id: ID!\n  title: String!\n  description: String\n  likes: Int\n}\n')),Object(o.b)("p",null,"Assuming you have created your various ",Object(o.b)("inlineCode",{parentName:"p"},"*.graphql")," data model files in the ",Object(o.b)("inlineCode",{parentName:"p"},"models")," directory, to automatically generate resolvers and start a GraphQL server listening on port 8080 do the following:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"$ gqlserve serve models --port=8080\n")),Object(o.b)("p",null,"If you only need to see the generated GraphQL Schema, use the ",Object(o.b)("inlineCode",{parentName:"p"},"print-schema")," command:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"$ gqlserve print-schema .\n")),Object(o.b)("p",null,"The above command prints schema generated from data model files in the current directory."),Object(o.b)("p",null,"This information is also provided with the command itself:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"$ gqlserve -h\ngqlserve <command>\n\nCommands:\n  gqlserve print-schema [modelDir]     Generate and print GraphQL schema from data\n                                   model files\n  gqlserve serve [modelDir] [options]  Generate and start GraphQL server from data\n                                   model files\n\nOptions:\n  -h, --help     Show help                                             [boolean]\n  -v, --version  Show version number                                   [boolean]\n")),Object(o.b)("p",null,"For the ",Object(o.b)("inlineCode",{parentName:"p"},"serve")," command:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"$ gqlserve serve -h\ngqlserve serve [modelDir] [options]\n\nGenerate and start GraphQL server from data model files\n\nPositionals:\n  modelDir, model  Directory to search for data models                  [string]\n\nOptions:\n  --port, -p        Specify the port on which to listen on              [number]\n  --datasync, --ds  Enable datasynchronization features                [boolean]\n  -h, --help        Show help                                          [boolean]\n  -v, --version     Show version number                                [boolean]\n\nExamples:\n  gqlserve serve . -p 8080  generate schema from data model files in current\n                            directory and start GraphQL server on port 8080\n")),Object(o.b)("p",null,"Also for ",Object(o.b)("inlineCode",{parentName:"p"},"print-schema")," command:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"$ gqlserve print-schema -h\ngqlserve print-schema [modelDir]\n\nGenerate and print GraphQL schema from data model files\n\nPositionals:\n  modelDir, model  Directory to search for data models                  [string]\n\nOptions:\n  -h, --help     Show help                                             [boolean]\n  -v, --version  Show version number                                   [boolean]\n\nExamples:\n  gqlserve print-schema modelDir  only display generated schema from data model\n                              files in modelDir directory and quit\n")),Object(o.b)("p",null,"Under to hood we use Graphback to parse the Type Definitions/Data Model and\ngenerate the GraphQL schema and resolvers. See the\n",Object(o.b)("a",{parentName:"p",href:"https://graphback.dev/docs/datamodel"},"Graphback Docs on Data Model Definition")," and\n",Object(o.b)("a",{parentName:"p",href:"https://graphback.dev/docs/next/datasync/datasync-intro"},"Data Synchronization")," for data synchronization\nfeatures."),Object(o.b)("h2",{id:"extension-to-graphql-testx"},"Extension to GraphQL TestX"),Object(o.b)("p",null,"GraphQL serve is based on GraphQL-TestX:\n",Object(o.b)("a",{parentName:"p",href:"https://github.com/aerogear/graphql-testx"},"https://github.com/aerogear/graphql-testx")))}b.isMDXComponent=!0}}]);