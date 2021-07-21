(window.webpackJsonp=window.webpackJsonp||[]).push([[274],{1333:function(e,t,a){"use strict";a.d(t,"a",(function(){return m})),a.d(t,"b",(function(){return j}));var n=a(0),b=a.n(n);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function c(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function p(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?c(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,b=function(e,t){if(null==e)return{};var a,n,b={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(b[a]=e[a]);return b}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(b[a]=e[a])}return b}var l=b.a.createContext({}),o=function(e){var t=b.a.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):p(p({},t),e)),a},m=function(e){var t=o(e.components);return b.a.createElement(l.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return b.a.createElement(b.a.Fragment,{},t)}},d=b.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,r=e.originalType,c=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),m=o(a),d=n,j=m["".concat(c,".").concat(d)]||m[d]||s[d]||r;return a?b.a.createElement(j,p(p({ref:t},l),{},{components:a})):b.a.createElement(j,p({ref:t},l))}));function j(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var r=a.length,c=new Array(r);c[0]=d;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p.mdxType="string"==typeof e?e:n,c[1]=p;for(var l=2;l<r;l++)c[l]=a[l];return b.a.createElement.apply(null,c)}return b.a.createElement.apply(null,a)}d.displayName="MDXCreateElement"},341:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return p})),a.d(t,"metadata",(function(){return i})),a.d(t,"rightToc",(function(){return l})),a.d(t,"default",(function(){return m}));var n=a(3),b=a(7),r=(a(0),a(1333)),c=["components"],p={id:"_definitions_schemadefinitions_",title:"definitions/schemaDefinitions",sidebar_label:"definitions/schemaDefinitions"},i={unversionedId:"api/graphback-codegen-schema/modules/_definitions_schemadefinitions_",id:"version-0.16.x/api/graphback-codegen-schema/modules/_definitions_schemadefinitions_",isDocsHomePage:!1,title:"definitions/schemaDefinitions",description:"Index",source:"@site/versioned_docs/version-0.16.x/api/graphback-codegen-schema/modules/_definitions_schemadefinitions_.md",slug:"/api/graphback-codegen-schema/modules/_definitions_schemadefinitions_",permalink:"/docs/0.16.x/api/graphback-codegen-schema/modules/_definitions_schemadefinitions_",editUrl:"https://github.com/aerogear/graphback/edit/master/website/versioned_docs/version-0.16.x/api/graphback-codegen-schema/modules/_definitions_schemadefinitions_.md",version:"0.16.x",sidebar_label:"definitions/schemaDefinitions"},l=[{value:"Index",id:"index",children:[{value:"Variables",id:"variables",children:[]},{value:"Functions",id:"functions",children:[]}]},{value:"Variables",id:"variables-1",children:[{value:"<code>Const</code> BooleanScalarInputType",id:"const-booleanscalarinputtype",children:[]},{value:"<code>Const</code> IDScalarInputType",id:"const-idscalarinputtype",children:[]},{value:"<code>Const</code> OrderByInputType",id:"const-orderbyinputtype",children:[]},{value:"<code>Const</code> PageRequest",id:"const-pagerequest",children:[]},{value:"<code>Const</code> SortDirectionEnum",id:"const-sortdirectionenum",children:[]},{value:"<code>Const</code> StringScalarInputType",id:"const-stringscalarinputtype",children:[]}]},{value:"Functions",id:"functions-1",children:[{value:"addCreateObjectInputType",id:"addcreateobjectinputtype",children:[]},{value:"addUpdateObjectInputType",id:"addupdateobjectinputtype",children:[]},{value:"<code>Const</code> buildCreateMutationInputType",id:"const-buildcreatemutationinputtype",children:[]},{value:"<code>Const</code> buildFilterInputType",id:"const-buildfilterinputtype",children:[]},{value:"buildFindOneFieldMap",id:"buildfindonefieldmap",children:[]},{value:"<code>Const</code> buildMutationInputType",id:"const-buildmutationinputtype",children:[]},{value:"<code>Const</code> buildSubscriptionFilterType",id:"const-buildsubscriptionfiltertype",children:[]},{value:"<code>Const</code> createInputTypeForScalar",id:"const-createinputtypeforscalar",children:[]},{value:"<code>Const</code> createModelListResultType",id:"const-createmodellistresulttype",children:[]},{value:"createVersionedFields",id:"createversionedfields",children:[]},{value:"createVersionedInputFields",id:"createversionedinputfields",children:[]},{value:"<code>Const</code> getInputName",id:"const-getinputname",children:[]}]}],o={rightToc:l};function m(e){var t=e.components,a=Object(b.a)(e,c);return Object(r.b)("wrapper",Object(n.a)({},o,a,{components:t,mdxType:"MDXLayout"}),Object(r.b)("h2",{id:"index"},"Index"),Object(r.b)("h3",{id:"variables"},"Variables"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-codegen-schema/modules/_definitions_schemadefinitions_#const-booleanscalarinputtype"},"BooleanScalarInputType")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-codegen-schema/modules/_definitions_schemadefinitions_#const-idscalarinputtype"},"IDScalarInputType")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-codegen-schema/modules/_definitions_schemadefinitions_#const-orderbyinputtype"},"OrderByInputType")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-codegen-schema/modules/_definitions_schemadefinitions_#const-pagerequest"},"PageRequest")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-codegen-schema/modules/_definitions_schemadefinitions_#const-sortdirectionenum"},"SortDirectionEnum")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-codegen-schema/modules/_definitions_schemadefinitions_#const-stringscalarinputtype"},"StringScalarInputType"))),Object(r.b)("h3",{id:"functions"},"Functions"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-codegen-schema/modules/_definitions_schemadefinitions_#addcreateobjectinputtype"},"addCreateObjectInputType")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-codegen-schema/modules/_definitions_schemadefinitions_#addupdateobjectinputtype"},"addUpdateObjectInputType")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-codegen-schema/modules/_definitions_schemadefinitions_#const-buildcreatemutationinputtype"},"buildCreateMutationInputType")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-codegen-schema/modules/_definitions_schemadefinitions_#const-buildfilterinputtype"},"buildFilterInputType")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-codegen-schema/modules/_definitions_schemadefinitions_#buildfindonefieldmap"},"buildFindOneFieldMap")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-codegen-schema/modules/_definitions_schemadefinitions_#const-buildmutationinputtype"},"buildMutationInputType")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-codegen-schema/modules/_definitions_schemadefinitions_#const-buildsubscriptionfiltertype"},"buildSubscriptionFilterType")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-codegen-schema/modules/_definitions_schemadefinitions_#const-createinputtypeforscalar"},"createInputTypeForScalar")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-codegen-schema/modules/_definitions_schemadefinitions_#const-createmodellistresulttype"},"createModelListResultType")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-codegen-schema/modules/_definitions_schemadefinitions_#createversionedfields"},"createVersionedFields")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-codegen-schema/modules/_definitions_schemadefinitions_#createversionedinputfields"},"createVersionedInputFields")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"/docs/0.16.x/api/graphback-codegen-schema/modules/_definitions_schemadefinitions_#const-getinputname"},"getInputName"))),Object(r.b)("h2",{id:"variables-1"},"Variables"),Object(r.b)("h3",{id:"const-booleanscalarinputtype"},Object(r.b)("inlineCode",{parentName:"h3"},"Const")," BooleanScalarInputType"),Object(r.b)("p",null,"\u2022 ",Object(r.b)("strong",{parentName:"p"},"BooleanScalarInputType"),": ",Object(r.b)("em",{parentName:"p"},"GraphQLInputObjectType\u2039\u203a")," = new GraphQLInputObjectType({\nname: getInputName(GraphQLBoolean),\nfields: {\nne: { type: GraphQLBoolean },\neq: { type: GraphQLBoolean }\n}\n})"),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"Defined in ",Object(r.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L70"},"graphback-codegen-schema/src/definitions/schemaDefinitions.ts:70"))),Object(r.b)("hr",null),Object(r.b)("h3",{id:"const-idscalarinputtype"},Object(r.b)("inlineCode",{parentName:"h3"},"Const")," IDScalarInputType"),Object(r.b)("p",null,"\u2022 ",Object(r.b)("strong",{parentName:"p"},"IDScalarInputType"),": ",Object(r.b)("em",{parentName:"p"},"GraphQLInputObjectType\u2039\u203a")," = new GraphQLInputObjectType({\nname: getInputName(GraphQLID),\nfields: {\nne: { type: GraphQLID },\neq: { type: GraphQLID },\nle: { type: GraphQLID },\nlt: { type: GraphQLID },\nge: { type: GraphQLID },\ngt: { type: GraphQLID },\nin: { type: GraphQLList(GraphQLNonNull(GraphQLID)) },\n}\n})"),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"Defined in ",Object(r.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L57"},"graphback-codegen-schema/src/definitions/schemaDefinitions.ts:57"))),Object(r.b)("hr",null),Object(r.b)("h3",{id:"const-orderbyinputtype"},Object(r.b)("inlineCode",{parentName:"h3"},"Const")," OrderByInputType"),Object(r.b)("p",null,"\u2022 ",Object(r.b)("strong",{parentName:"p"},"OrderByInputType"),": ",Object(r.b)("em",{parentName:"p"},"GraphQLInputObjectType\u2039\u203a")," = new GraphQLInputObjectType({\nname: OrderByInputTypeName,\nfields: {\nfield: { type: GraphQLNonNull(GraphQLString) },\norder: { type: SortDirectionEnum, defaultValue: 'asc' }\n}\n})"),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"Defined in ",Object(r.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L98"},"graphback-codegen-schema/src/definitions/schemaDefinitions.ts:98"))),Object(r.b)("hr",null),Object(r.b)("h3",{id:"const-pagerequest"},Object(r.b)("inlineCode",{parentName:"h3"},"Const")," PageRequest"),Object(r.b)("p",null,"\u2022 ",Object(r.b)("strong",{parentName:"p"},"PageRequest"),": ",Object(r.b)("em",{parentName:"p"},"GraphQLInputObjectType\u2039\u203a")," = new GraphQLInputObjectType({\nname: PageRequestTypeName,\nfields: {\nlimit: {\ntype: GraphQLInt\n},\noffset: {\ntype: GraphQLInt\n}\n}\n})"),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"Defined in ",Object(r.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L78"},"graphback-codegen-schema/src/definitions/schemaDefinitions.ts:78"))),Object(r.b)("hr",null),Object(r.b)("h3",{id:"const-sortdirectionenum"},Object(r.b)("inlineCode",{parentName:"h3"},"Const")," SortDirectionEnum"),Object(r.b)("p",null,"\u2022 ",Object(r.b)("strong",{parentName:"p"},"SortDirectionEnum"),": ",Object(r.b)("em",{parentName:"p"},"GraphQLEnumType\u2039\u203a")," = new GraphQLEnumType({\nname: SortDirectionEnumName,\nvalues: {\nDESC: { value: 'desc' },\nASC: { value: 'asc' }\n}\n})"),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"Defined in ",Object(r.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L90"},"graphback-codegen-schema/src/definitions/schemaDefinitions.ts:90"))),Object(r.b)("hr",null),Object(r.b)("h3",{id:"const-stringscalarinputtype"},Object(r.b)("inlineCode",{parentName:"h3"},"Const")," StringScalarInputType"),Object(r.b)("p",null,"\u2022 ",Object(r.b)("strong",{parentName:"p"},"StringScalarInputType"),": ",Object(r.b)("em",{parentName:"p"},"GraphQLInputObjectType\u2039\u203a")," = new GraphQLInputObjectType({\nname: getInputName(GraphQLString),\nfields: {\nne: { type: GraphQLString },\neq: { type: GraphQLString },\nle: { type: GraphQLString },\nlt: { type: GraphQLString },\nge: { type: GraphQLString },\ngt: { type: GraphQLString },\nin: { type: GraphQLList(GraphQLNonNull(GraphQLString)) },\ncontains: { type: GraphQLString },\nstartsWith: { type: GraphQLString },\nendsWith: { type: GraphQLString }\n}\n})"),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"Defined in ",Object(r.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L41"},"graphback-codegen-schema/src/definitions/schemaDefinitions.ts:41"))),Object(r.b)("h2",{id:"functions-1"},"Functions"),Object(r.b)("h3",{id:"addcreateobjectinputtype"},"addCreateObjectInputType"),Object(r.b)("p",null,"\u25b8 ",Object(r.b)("strong",{parentName:"p"},"addCreateObjectInputType"),"(",Object(r.b)("inlineCode",{parentName:"p"},"schemaComposer"),": SchemaComposer\u2039any\u203a, ",Object(r.b)("inlineCode",{parentName:"p"},"objectType"),": GraphQLObjectType): ",Object(r.b)("em",{parentName:"p"},"void")),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"Defined in ",Object(r.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L310"},"graphback-codegen-schema/src/definitions/schemaDefinitions.ts:310"))),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Parameters:")),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",{parentName:"tr",align:null},"Name"),Object(r.b)("th",{parentName:"tr",align:null},"Type"))),Object(r.b)("tbody",{parentName:"table"},Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"schemaComposer")),Object(r.b)("td",{parentName:"tr",align:null},"SchemaComposer\u2039any\u203a")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"objectType")),Object(r.b)("td",{parentName:"tr",align:null},"GraphQLObjectType")))),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Returns:")," ",Object(r.b)("em",{parentName:"p"},"void")),Object(r.b)("hr",null),Object(r.b)("h3",{id:"addupdateobjectinputtype"},"addUpdateObjectInputType"),Object(r.b)("p",null,"\u25b8 ",Object(r.b)("strong",{parentName:"p"},"addUpdateObjectInputType"),"(",Object(r.b)("inlineCode",{parentName:"p"},"schemaComposer"),": SchemaComposer\u2039any\u203a, ",Object(r.b)("inlineCode",{parentName:"p"},"objectType"),": GraphQLObjectType): ",Object(r.b)("em",{parentName:"p"},"void")),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"Defined in ",Object(r.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L327"},"graphback-codegen-schema/src/definitions/schemaDefinitions.ts:327"))),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Parameters:")),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",{parentName:"tr",align:null},"Name"),Object(r.b)("th",{parentName:"tr",align:null},"Type"))),Object(r.b)("tbody",{parentName:"table"},Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"schemaComposer")),Object(r.b)("td",{parentName:"tr",align:null},"SchemaComposer\u2039any\u203a")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"objectType")),Object(r.b)("td",{parentName:"tr",align:null},"GraphQLObjectType")))),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Returns:")," ",Object(r.b)("em",{parentName:"p"},"void")),Object(r.b)("hr",null),Object(r.b)("h3",{id:"const-buildcreatemutationinputtype"},Object(r.b)("inlineCode",{parentName:"h3"},"Const")," buildCreateMutationInputType"),Object(r.b)("p",null,"\u25b8 ",Object(r.b)("strong",{parentName:"p"},"buildCreateMutationInputType"),"(",Object(r.b)("inlineCode",{parentName:"p"},"schemaComposer"),": SchemaComposer\u2039any\u203a, ",Object(r.b)("inlineCode",{parentName:"p"},"modelType"),": GraphQLObjectType): ",Object(r.b)("em",{parentName:"p"},"void")),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"Defined in ",Object(r.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L191"},"graphback-codegen-schema/src/definitions/schemaDefinitions.ts:191"))),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Parameters:")),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",{parentName:"tr",align:null},"Name"),Object(r.b)("th",{parentName:"tr",align:null},"Type"))),Object(r.b)("tbody",{parentName:"table"},Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"schemaComposer")),Object(r.b)("td",{parentName:"tr",align:null},"SchemaComposer\u2039any\u203a")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"modelType")),Object(r.b)("td",{parentName:"tr",align:null},"GraphQLObjectType")))),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Returns:")," ",Object(r.b)("em",{parentName:"p"},"void")),Object(r.b)("hr",null),Object(r.b)("h3",{id:"const-buildfilterinputtype"},Object(r.b)("inlineCode",{parentName:"h3"},"Const")," buildFilterInputType"),Object(r.b)("p",null,"\u25b8 ",Object(r.b)("strong",{parentName:"p"},"buildFilterInputType"),"(",Object(r.b)("inlineCode",{parentName:"p"},"schemaComposer"),": SchemaComposer\u2039any\u203a, ",Object(r.b)("inlineCode",{parentName:"p"},"modelType"),": GraphQLObjectType): ",Object(r.b)("em",{parentName:"p"},"void")),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"Defined in ",Object(r.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L151"},"graphback-codegen-schema/src/definitions/schemaDefinitions.ts:151"))),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Parameters:")),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",{parentName:"tr",align:null},"Name"),Object(r.b)("th",{parentName:"tr",align:null},"Type"))),Object(r.b)("tbody",{parentName:"table"},Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"schemaComposer")),Object(r.b)("td",{parentName:"tr",align:null},"SchemaComposer\u2039any\u203a")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"modelType")),Object(r.b)("td",{parentName:"tr",align:null},"GraphQLObjectType")))),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Returns:")," ",Object(r.b)("em",{parentName:"p"},"void")),Object(r.b)("hr",null),Object(r.b)("h3",{id:"buildfindonefieldmap"},"buildFindOneFieldMap"),Object(r.b)("p",null,"\u25b8 ",Object(r.b)("strong",{parentName:"p"},"buildFindOneFieldMap"),"(",Object(r.b)("inlineCode",{parentName:"p"},"modelType"),": ModelDefinition, ",Object(r.b)("inlineCode",{parentName:"p"},"schemaComposer"),": SchemaComposer\u2039any\u203a): ",Object(r.b)("em",{parentName:"p"},"GraphQLInputFieldMap")),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"Defined in ",Object(r.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L138"},"graphback-codegen-schema/src/definitions/schemaDefinitions.ts:138"))),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Parameters:")),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",{parentName:"tr",align:null},"Name"),Object(r.b)("th",{parentName:"tr",align:null},"Type"))),Object(r.b)("tbody",{parentName:"table"},Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"modelType")),Object(r.b)("td",{parentName:"tr",align:null},"ModelDefinition")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"schemaComposer")),Object(r.b)("td",{parentName:"tr",align:null},"SchemaComposer\u2039any\u203a")))),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Returns:")," ",Object(r.b)("em",{parentName:"p"},"GraphQLInputFieldMap")),Object(r.b)("hr",null),Object(r.b)("h3",{id:"const-buildmutationinputtype"},Object(r.b)("inlineCode",{parentName:"h3"},"Const")," buildMutationInputType"),Object(r.b)("p",null,"\u25b8 ",Object(r.b)("strong",{parentName:"p"},"buildMutationInputType"),"(",Object(r.b)("inlineCode",{parentName:"p"},"schemaComposer"),": SchemaComposer\u2039any\u203a, ",Object(r.b)("inlineCode",{parentName:"p"},"modelType"),": GraphQLObjectType): ",Object(r.b)("em",{parentName:"p"},"void")),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"Defined in ",Object(r.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L258"},"graphback-codegen-schema/src/definitions/schemaDefinitions.ts:258"))),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Parameters:")),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",{parentName:"tr",align:null},"Name"),Object(r.b)("th",{parentName:"tr",align:null},"Type"))),Object(r.b)("tbody",{parentName:"table"},Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"schemaComposer")),Object(r.b)("td",{parentName:"tr",align:null},"SchemaComposer\u2039any\u203a")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"modelType")),Object(r.b)("td",{parentName:"tr",align:null},"GraphQLObjectType")))),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Returns:")," ",Object(r.b)("em",{parentName:"p"},"void")),Object(r.b)("hr",null),Object(r.b)("h3",{id:"const-buildsubscriptionfiltertype"},Object(r.b)("inlineCode",{parentName:"h3"},"Const")," buildSubscriptionFilterType"),Object(r.b)("p",null,"\u25b8 ",Object(r.b)("strong",{parentName:"p"},"buildSubscriptionFilterType"),"(",Object(r.b)("inlineCode",{parentName:"p"},"schemaComposer"),": SchemaComposer\u2039any\u203a, ",Object(r.b)("inlineCode",{parentName:"p"},"modelType"),": GraphQLObjectType): ",Object(r.b)("em",{parentName:"p"},"void")),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"Defined in ",Object(r.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L222"},"graphback-codegen-schema/src/definitions/schemaDefinitions.ts:222"))),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Parameters:")),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",{parentName:"tr",align:null},"Name"),Object(r.b)("th",{parentName:"tr",align:null},"Type"))),Object(r.b)("tbody",{parentName:"table"},Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"schemaComposer")),Object(r.b)("td",{parentName:"tr",align:null},"SchemaComposer\u2039any\u203a")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"modelType")),Object(r.b)("td",{parentName:"tr",align:null},"GraphQLObjectType")))),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Returns:")," ",Object(r.b)("em",{parentName:"p"},"void")),Object(r.b)("hr",null),Object(r.b)("h3",{id:"const-createinputtypeforscalar"},Object(r.b)("inlineCode",{parentName:"h3"},"Const")," createInputTypeForScalar"),Object(r.b)("p",null,"\u25b8 ",Object(r.b)("strong",{parentName:"p"},"createInputTypeForScalar"),"(",Object(r.b)("inlineCode",{parentName:"p"},"scalarType"),": GraphQLScalarType): ",Object(r.b)("em",{parentName:"p"},"GraphQLInputObjectType\u2039\u203a")),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"Defined in ",Object(r.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L23"},"graphback-codegen-schema/src/definitions/schemaDefinitions.ts:23"))),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Parameters:")),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",{parentName:"tr",align:null},"Name"),Object(r.b)("th",{parentName:"tr",align:null},"Type"))),Object(r.b)("tbody",{parentName:"table"},Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"scalarType")),Object(r.b)("td",{parentName:"tr",align:null},"GraphQLScalarType")))),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Returns:")," ",Object(r.b)("em",{parentName:"p"},"GraphQLInputObjectType\u2039\u203a")),Object(r.b)("hr",null),Object(r.b)("h3",{id:"const-createmodellistresulttype"},Object(r.b)("inlineCode",{parentName:"h3"},"Const")," createModelListResultType"),Object(r.b)("p",null,"\u25b8 ",Object(r.b)("strong",{parentName:"p"},"createModelListResultType"),"(",Object(r.b)("inlineCode",{parentName:"p"},"modelType"),": GraphQLObjectType): ",Object(r.b)("em",{parentName:"p"},"GraphQLObjectType\u2039any, any\u203a")),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"Defined in ",Object(r.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L344"},"graphback-codegen-schema/src/definitions/schemaDefinitions.ts:344"))),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Parameters:")),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",{parentName:"tr",align:null},"Name"),Object(r.b)("th",{parentName:"tr",align:null},"Type"))),Object(r.b)("tbody",{parentName:"table"},Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"modelType")),Object(r.b)("td",{parentName:"tr",align:null},"GraphQLObjectType")))),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Returns:")," ",Object(r.b)("em",{parentName:"p"},"GraphQLObjectType\u2039any, any\u203a")),Object(r.b)("hr",null),Object(r.b)("h3",{id:"createversionedfields"},"createVersionedFields"),Object(r.b)("p",null,"\u25b8 ",Object(r.b)("strong",{parentName:"p"},"createVersionedFields"),"(",Object(r.b)("inlineCode",{parentName:"p"},"type"),": GraphQLScalarType): ",Object(r.b)("em",{parentName:"p"},"object")),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"Defined in ",Object(r.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L369"},"graphback-codegen-schema/src/definitions/schemaDefinitions.ts:369"))),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Parameters:")),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",{parentName:"tr",align:null},"Name"),Object(r.b)("th",{parentName:"tr",align:null},"Type"))),Object(r.b)("tbody",{parentName:"table"},Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"type")),Object(r.b)("td",{parentName:"tr",align:null},"GraphQLScalarType")))),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Returns:")," ",Object(r.b)("em",{parentName:"p"},"object")),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("h3",{parentName:"li",id:"metadatamapfieldnamescreatedat-object"},Object(r.b)("strong",{parentName:"h3"},"[metadataMap.fieldNames.createdAt]"),": ",Object(r.b)("em",{parentName:"h3"},"object")),Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},Object(r.b)("strong",{parentName:"p"},"description"),": ",Object(r.b)("em",{parentName:"p"},"string")," = ",Object(r.b)("inlineCode",{parentName:"p"},"@${metadataMap.markers.createdAt}"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},Object(r.b)("strong",{parentName:"p"},"type"),": ",Object(r.b)("em",{parentName:"p"},"GraphQLScalarType\u2039\u203a"))))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("h3",{parentName:"li",id:"metadatamapfieldnamesupdatedat-object"},Object(r.b)("strong",{parentName:"h3"},"[metadataMap.fieldNames.updatedAt]"),": ",Object(r.b)("em",{parentName:"h3"},"object")),Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},Object(r.b)("strong",{parentName:"p"},"description"),": ",Object(r.b)("em",{parentName:"p"},"string")," = ",Object(r.b)("inlineCode",{parentName:"p"},"@${metadataMap.markers.updatedAt}"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},Object(r.b)("strong",{parentName:"p"},"type"),": ",Object(r.b)("em",{parentName:"p"},"GraphQLScalarType\u2039\u203a")))))),Object(r.b)("hr",null),Object(r.b)("h3",{id:"createversionedinputfields"},"createVersionedInputFields"),Object(r.b)("p",null,"\u25b8 ",Object(r.b)("strong",{parentName:"p"},"createVersionedInputFields"),"(",Object(r.b)("inlineCode",{parentName:"p"},"versionedInputType"),": GraphQLInputObjectType): ",Object(r.b)("em",{parentName:"p"},"object")),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"Defined in ",Object(r.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L358"},"graphback-codegen-schema/src/definitions/schemaDefinitions.ts:358"))),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Parameters:")),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",{parentName:"tr",align:null},"Name"),Object(r.b)("th",{parentName:"tr",align:null},"Type"))),Object(r.b)("tbody",{parentName:"table"},Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"versionedInputType")),Object(r.b)("td",{parentName:"tr",align:null},"GraphQLInputObjectType")))),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Returns:")," ",Object(r.b)("em",{parentName:"p"},"object")),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("h3",{parentName:"li",id:"metadatamapfieldnamescreatedat-object-1"},Object(r.b)("strong",{parentName:"h3"},"[metadataMap.fieldNames.createdAt]"),": ",Object(r.b)("em",{parentName:"h3"},"object")),Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"type"),": ",Object(r.b)("em",{parentName:"li"},"GraphQLInputObjectType\u2039\u203a")," = versionedInputType"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("h3",{parentName:"li",id:"metadatamapfieldnamesupdatedat-object-1"},Object(r.b)("strong",{parentName:"h3"},"[metadataMap.fieldNames.updatedAt]"),": ",Object(r.b)("em",{parentName:"h3"},"object")),Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"type"),": ",Object(r.b)("em",{parentName:"li"},"GraphQLInputObjectType\u2039\u203a")," = versionedInputType")))),Object(r.b)("hr",null),Object(r.b)("h3",{id:"const-getinputname"},Object(r.b)("inlineCode",{parentName:"h3"},"Const")," getInputName"),Object(r.b)("p",null,"\u25b8 ",Object(r.b)("strong",{parentName:"p"},"getInputName"),"(",Object(r.b)("inlineCode",{parentName:"p"},"type"),": GraphQLNamedType): ",Object(r.b)("em",{parentName:"p"},"string")),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"Defined in ",Object(r.b)("a",{parentName:"em",href:"https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L11"},"graphback-codegen-schema/src/definitions/schemaDefinitions.ts:11"))),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Parameters:")),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",{parentName:"tr",align:null},"Name"),Object(r.b)("th",{parentName:"tr",align:null},"Type"))),Object(r.b)("tbody",{parentName:"table"},Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"type")),Object(r.b)("td",{parentName:"tr",align:null},"GraphQLNamedType")))),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Returns:")," ",Object(r.b)("em",{parentName:"p"},"string")))}m.isMDXComponent=!0}}]);