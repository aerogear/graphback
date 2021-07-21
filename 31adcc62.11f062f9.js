(window.webpackJsonp=window.webpackJsonp||[]).push([[246],{1333:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return m}));var a=n(0),r=n.n(a);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=r.a.createContext({}),p=function(e){var t=r.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},b=function(e){var t=p(e.components);return r.a.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),b=p(n),d=a,m=b["".concat(o,".").concat(d)]||b[d]||u[d]||i;return n?r.a.createElement(m,l(l({ref:t},c),{},{components:n})):r.a.createElement(m,l({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var c=2;c<i;c++)o[c]=n[c];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},313:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return s})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return b}));var a=n(3),r=n(7),i=(n(0),n(1333)),o=["components"],l={id:"intro",title:"GraphQL Migrations",sidebar_label:"Introduction"},s={unversionedId:"graphql-migrations/intro",id:"version-1.0/graphql-migrations/intro",isDocsHomePage:!1,title:"GraphQL Migrations",description:"Graphback uses graphql-migrations to automatically create and update tables from a GraphQL schema.",source:"@site/versioned_docs/version-1.0/graphql-migrations/intro.md",slug:"/graphql-migrations/intro",permalink:"/docs/graphql-migrations/intro",editUrl:"https://github.com/aerogear/graphback/edit/master/website/versioned_docs/version-1.0/graphql-migrations/intro.md",version:"1.0",sidebar_label:"Introduction",sidebar:"version-1.0/docs",previous:{title:"Conflict Resolution strategies",permalink:"/docs/datasync/conflict-resolution-strategies"},next:{title:"Database Design",permalink:"/docs/graphql-migrations/db-design"}},c=[{value:"Compatibility",id:"compatibility",children:[]},{value:"Installation",id:"installation",children:[]},{value:"Usage",id:"usage",children:[]},{value:"Advanced usage",id:"advanced-usage",children:[]}],p={rightToc:c};function b(e){var t=e.components,n=Object(r.a)(e,o);return Object(i.b)("wrapper",Object(a.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Graphback uses ",Object(i.b)("a",{parentName:"p",href:"https://www.npmjs.com/package/graphql-migrations"},"graphql-migrations")," to automatically create and update tables from a GraphQL schema.\nThe library compares your database schema to your GraphQL schema and executes the required changes to keep the database structure synchronised with the GraphQL schema. The package is built on top of ",Object(i.b)("a",{parentName:"p",href:"http://knexjs.org/"},"Knex.js"),", a flexible SQL query builder."),Object(i.b)("h2",{id:"compatibility"},"Compatibility"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"PostgreSQL (create and update database)"),Object(i.b)("li",{parentName:"ul"},"SQLite (create database only)")),Object(i.b)("h2",{id:"installation"},"Installation"),Object(i.b)("p",null,"You can install ",Object(i.b)("inlineCode",{parentName:"p"},"graphql-migrations")," on your existing project using the following commmands:"),Object(i.b)("p",null,"With npm: "),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash"},"npm i graphql-migrations knex\n")),Object(i.b)("p",null,"or with yarn:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash"},"yarn add graphql-migrations knex\n")),Object(i.b)("h2",{id:"usage"},"Usage"),Object(i.b)("p",null,"GraphQL Migrations operates on business models defined in your schema: These are GraphQL types decorated with a ",Object(i.b)("a",{parentName:"p",href:"../model/datamodel#model"},Object(i.b)("inlineCode",{parentName:"a"},"@model"))," annotation.\nThe package expose an API which you can programmatically set up in your source code and have it perform the migrations. "),Object(i.b)("p",null,"The package exposes a ",Object(i.b)("inlineCode",{parentName:"p"},"migrateDB")," method which creates and updates your tables and columns to match your GraphQL schema.\nAll the database operations are wrapped in a single transaction, so your database will be fully rolled back to its initial state if an error occurs.\nThe method takes three arguments as described in ",Object(i.b)("a",{parentName:"p",href:"#options"},"migrations options")," section."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-ts"},'import { migrateDB } from \'graphql-migrations\';\n\nconst schemaText = ```\n"""\n@model\n"""\ntype Note {\n  id: ID!\n  title: String!\n}\n```;\n\nconst dbConfig = {\n  // Knex.js based configuration\n};\n\nmigrateDB(dbConfig, schemaText, {\n  // Additional options\n}).then((ops) => {\n    console.log(ops);\n});\n...\n')),Object(i.b)("p",null,"Assuming the above code is ran against a PostgreSQL database, the following relations will be created:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-sql"},"\\d\n              List of relations\n Schema |    Name     |   Type   |   Owner    \n--------+-------------+----------+------------\n public | note        | table    | postgresql\n public | note_id_seq | sequence | postgresql\n")),Object(i.b)("p",null,"And the ",Object(i.b)("inlineCode",{parentName:"p"},"note")," table:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-sql"},' \\d note\n                                 Table "public.note"\n Column |          Type          |                     Modifiers                     \n--------+------------------------+---------------------------------------------------\n title  | character varying(255) | not null\n id     | integer                | not null default nextval(\'note_id_seq\'::regclass)\nIndexes:\n    "note_pkey" PRIMARY KEY, btree (id)\n')),Object(i.b)("h2",{id:"advanced-usage"},"Advanced usage"),Object(i.b)("p",null,"For more advanced usage, visit the below pages:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"db-design"},"Database Design")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"api"},"API Reference"))))}b.isMDXComponent=!0}}]);