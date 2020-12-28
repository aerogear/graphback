(window.webpackJsonp=window.webpackJsonp||[]).push([[1028],{1097:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return b})),a.d(t,"metadata",(function(){return l})),a.d(t,"rightToc",(function(){return p})),a.d(t,"default",(function(){return o}));var n=a(3),r=a(7),i=(a(0),a(1333)),b={id:"_relationships_relationshiphelpers_",title:"relationships/relationshipHelpers",sidebar_label:"relationships/relationshipHelpers"},l={unversionedId:"api/graphback-core/modules/_relationships_relationshiphelpers_",id:"version-0.15.x/api/graphback-core/modules/_relationships_relationshiphelpers_",isDocsHomePage:!1,title:"relationships/relationshipHelpers",description:"Index",source:"@site/versioned_docs/version-0.15.x/api/graphback-core/modules/_relationships_relationshiphelpers_.md",slug:"/api/graphback-core/modules/_relationships_relationshiphelpers_",permalink:"/docs/0.15.x/api/graphback-core/modules/_relationships_relationshiphelpers_",editUrl:"https://github.com/aerogear/graphback/edit/master/website/versioned_docs/version-0.15.x/api/graphback-core/modules/_relationships_relationshiphelpers_.md",version:"0.15.x",sidebar_label:"relationships/relationshipHelpers"},p=[{value:"Index",id:"index",children:[{value:"Functions",id:"functions",children:[]}]},{value:"Functions",id:"functions-1",children:[{value:"addRelationshipFields",id:"addrelationshipfields",children:[]},{value:"extendRelationshipFields",id:"extendrelationshipfields",children:[]},{value:"extendOneToManyFieldArguments",id:"extendonetomanyfieldarguments",children:[]},{value:"<code>Const</code> getRelationshipAnnotationString",id:"const-getrelationshipannotationstring",children:[]},{value:"isOneToManyField",id:"isonetomanyfield",children:[]},{value:"<code>Const</code> mergeDescriptionWithRelationshipAnnotation",id:"const-mergedescriptionwithrelationshipannotation",children:[]},{value:"parseRelationshipAnnotation",id:"parserelationshipannotation",children:[]},{value:"<code>Const</code> relationshipFieldDescriptionTemplate",id:"const-relationshipfielddescriptiontemplate",children:[]},{value:"<code>Const</code> relationshipOneToOneFieldDescriptionTemplate",id:"const-relationshiponetoonefielddescriptiontemplate",children:[]},{value:"<code>Const</code> stripRelationshipAnnotation",id:"const-striprelationshipannotation",children:[]}]}],c={rightToc:p};function o(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(n.a)({},c,a,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"index"},"Index"),Object(i.b)("h3",{id:"functions"},"Functions"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"/docs/0.15.x/api/graphback-core/modules/_relationships_relationshiphelpers_#addRelationshipFields"}),"addRelationshipFields")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"/docs/0.15.x/api/graphback-core/modules/_relationships_relationshiphelpers_#extendRelationshipFields"}),"extendRelationshipFields")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"/docs/0.15.x/api/graphback-core/modules/_relationships_relationshiphelpers_#extendOneToManyFieldArguments"}),"extendOneToManyFieldArguments")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"/docs/0.15.x/api/graphback-core/modules/_relationships_relationshiphelpers_#const-getrelationshipannotationstring"}),"getRelationshipAnnotationString")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"/docs/0.15.x/api/graphback-core/modules/_relationships_relationshiphelpers_#isonetomanyfield"}),"isOneToManyField")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"/docs/0.15.x/api/graphback-core/modules/_relationships_relationshiphelpers_#const-mergedescriptionwithrelationshipannotation"}),"mergeDescriptionWithRelationshipAnnotation")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"/docs/0.15.x/api/graphback-core/modules/_relationships_relationshiphelpers_#parserelationshipannotation"}),"parseRelationshipAnnotation")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"/docs/0.15.x/api/graphback-core/modules/_relationships_relationshiphelpers_#const-relationshipfielddescriptiontemplate"}),"relationshipFieldDescriptionTemplate")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"/docs/0.15.x/api/graphback-core/modules/_relationships_relationshiphelpers_#const-relationshiponetoonefielddescriptiontemplate"}),"relationshipOneToOneFieldDescriptionTemplate")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"/docs/0.15.x/api/graphback-core/modules/_relationships_relationshiphelpers_#const-striprelationshipannotation"}),"stripRelationshipAnnotation"))),Object(i.b)("h2",{id:"functions-1"},"Functions"),Object(i.b)("h3",{id:"addrelationshipfields"},"addRelationshipFields"),Object(i.b)("p",null,"\u25b8 ",Object(i.b)("strong",{parentName:"p"},"addRelationshipFields"),"(",Object(i.b)("inlineCode",{parentName:"p"},"model"),": ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"/docs/0.15.x/api/graphback-core/modules/_plugin_modeldefinition_#modeldefinition"}),"ModelDefinition"),"): ",Object(i.b)("em",{parentName:"p"},"object")),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Defined in ",Object(i.b)("a",Object(n.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/relationshipHelpers.ts#L159"}),"packages/graphback-core/src/relationships/relationshipHelpers.ts:159"))),Object(i.b)("p",null,"Creates an object of relationship fields if fields do not already exist on the model type."),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Parameters:")),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Name"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Type"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"model")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("a",Object(n.a)({parentName:"td"},{href:"/docs/0.15.x/api/graphback-core/modules/_plugin_modeldefinition_#modeldefinition"}),"ModelDefinition")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}))))),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Returns:")," ",Object(i.b)("em",{parentName:"p"},"object")),Object(i.b)("hr",null),Object(i.b)("h3",{id:"extendrelationshipfields"},"extendRelationshipFields"),Object(i.b)("p",null,"\u25b8 ",Object(i.b)("strong",{parentName:"p"},"extendRelationshipFields"),"(",Object(i.b)("inlineCode",{parentName:"p"},"model"),": ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"/docs/0.15.x/api/graphback-core/modules/_plugin_modeldefinition_#modeldefinition"}),"ModelDefinition"),"): ",Object(i.b)("em",{parentName:"p"},"object")),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Defined in ",Object(i.b)("a",Object(n.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/relationshipHelpers.ts#L182"}),"packages/graphback-core/src/relationships/relationshipHelpers.ts:182"))),Object(i.b)("p",null,"Creates an object of relationship fields which already exist on a model type."),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Parameters:")),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Name"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Type"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"model")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("a",Object(n.a)({parentName:"td"},{href:"/docs/0.15.x/api/graphback-core/modules/_plugin_modeldefinition_#modeldefinition"}),"ModelDefinition")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}))))),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Returns:")," ",Object(i.b)("em",{parentName:"p"},"object")),Object(i.b)("hr",null),Object(i.b)("h3",{id:"extendonetomanyfieldarguments"},"extendOneToManyFieldArguments"),Object(i.b)("p",null,"\u25b8 ",Object(i.b)("strong",{parentName:"p"},"extendOneToManyFieldArguments"),"(",Object(i.b)("inlineCode",{parentName:"p"},"model"),": ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"/docs/0.15.x/api/graphback-core/modules/_plugin_modeldefinition_#modeldefinition"}),"ModelDefinition"),"): ",Object(i.b)("em",{parentName:"p"},"object")),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Defined in ",Object(i.b)("a",Object(n.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/relationshipHelpers.ts#L105"}),"packages/graphback-core/src/relationships/relationshipHelpers.ts:105"))),Object(i.b)("p",null,"Creates an object of relationship fields if fields do not already exist on the model type."),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Parameters:")),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Name"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Type"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"model")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("a",Object(n.a)({parentName:"td"},{href:"/docs/0.15.x/api/graphback-core/modules/_plugin_modeldefinition_#modeldefinition"}),"ModelDefinition")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}))))),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Returns:")," ",Object(i.b)("em",{parentName:"p"},"object")),Object(i.b)("hr",null),Object(i.b)("h3",{id:"const-getrelationshipannotationstring"},Object(i.b)("inlineCode",{parentName:"h3"},"Const")," getRelationshipAnnotationString"),Object(i.b)("p",null,"\u25b8 ",Object(i.b)("strong",{parentName:"p"},"getRelationshipAnnotationString"),"(",Object(i.b)("inlineCode",{parentName:"p"},"fieldDescription"),": string): ",Object(i.b)("em",{parentName:"p"},"string")),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Defined in ",Object(i.b)("a",Object(n.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/relationshipHelpers.ts#L66"}),"packages/graphback-core/src/relationships/relationshipHelpers.ts:66"))),Object(i.b)("p",null,"Strips all non-relationship annotations from a string"),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Parameters:")),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Name"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Type"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Default"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"fieldDescription")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"string"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),'""'),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}))))),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Returns:")," ",Object(i.b)("em",{parentName:"p"},"string")),Object(i.b)("hr",null),Object(i.b)("h3",{id:"isonetomanyfield"},"isOneToManyField"),Object(i.b)("p",null,"\u25b8 ",Object(i.b)("strong",{parentName:"p"},"isOneToManyField"),"(",Object(i.b)("inlineCode",{parentName:"p"},"field"),": GraphQLField\u2039any, any\u203a): ",Object(i.b)("em",{parentName:"p"},"boolean")),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Defined in ",Object(i.b)("a",Object(n.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/relationshipHelpers.ts#L41"}),"packages/graphback-core/src/relationships/relationshipHelpers.ts:41"))),Object(i.b)("p",null,"Helper to check if a field is a oneToMany"),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Parameters:")),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Name"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Type"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"field")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"GraphQLField\u2039any, any\u203a")))),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Returns:")," ",Object(i.b)("em",{parentName:"p"},"boolean")),Object(i.b)("hr",null),Object(i.b)("h3",{id:"const-mergedescriptionwithrelationshipannotation"},Object(i.b)("inlineCode",{parentName:"h3"},"Const")," mergeDescriptionWithRelationshipAnnotation"),Object(i.b)("p",null,"\u25b8 ",Object(i.b)("strong",{parentName:"p"},"mergeDescriptionWithRelationshipAnnotation"),"(",Object(i.b)("inlineCode",{parentName:"p"},"generatedDescription"),": string, ",Object(i.b)("inlineCode",{parentName:"p"},"customDescription"),": string): ",Object(i.b)("em",{parentName:"p"},"string")),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Defined in ",Object(i.b)("a",Object(n.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/relationshipHelpers.ts#L84"}),"packages/graphback-core/src/relationships/relationshipHelpers.ts:84"))),Object(i.b)("p",null,"Helper to merge two description strings which may or may not have a relationship annotation.\nThis helper keeps non-relationship annotations and merges them together.\nIt chooses the relationship annotation with the ",Object(i.b)("inlineCode",{parentName:"p"},"key")," field when merging."),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Parameters:")),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Name"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Type"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"generatedDescription")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"string"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"-")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"customDescription")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"string"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}))))),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Returns:")," ",Object(i.b)("em",{parentName:"p"},"string")),Object(i.b)("hr",null),Object(i.b)("h3",{id:"parserelationshipannotation"},"parseRelationshipAnnotation"),Object(i.b)("p",null,"\u25b8 ",Object(i.b)("strong",{parentName:"p"},"parseRelationshipAnnotation"),"(",Object(i.b)("inlineCode",{parentName:"p"},"description"),": string): ",Object(i.b)("em",{parentName:"p"},Object(i.b)("a",Object(n.a)({parentName:"em"},{href:"/docs/0.15.x/api/graphback-core/interfaces/_relationships_relationshipmetadatabuilder_.relationshipannotation"}),"RelationshipAnnotation")," | undefined")),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Defined in ",Object(i.b)("a",Object(n.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/relationshipHelpers.ts#L12"}),"packages/graphback-core/src/relationships/relationshipHelpers.ts:12"))),Object(i.b)("p",null,"Parse relationship metadata string to strongly-typed interface"),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Parameters:")),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Name"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Type"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Default"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"description")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"string"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),'""'),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"field description")))),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Returns:")," ",Object(i.b)("em",{parentName:"p"},Object(i.b)("a",Object(n.a)({parentName:"em"},{href:"/docs/0.15.x/api/graphback-core/interfaces/_relationships_relationshipmetadatabuilder_.relationshipannotation"}),"RelationshipAnnotation")," | undefined")),Object(i.b)("hr",null),Object(i.b)("h3",{id:"const-relationshipfielddescriptiontemplate"},Object(i.b)("inlineCode",{parentName:"h3"},"Const")," relationshipFieldDescriptionTemplate"),Object(i.b)("p",null,"\u25b8 ",Object(i.b)("strong",{parentName:"p"},"relationshipFieldDescriptionTemplate"),"(",Object(i.b)("inlineCode",{parentName:"p"},"relationshipKind"),': "oneToOne" | "oneToMany" | "manyToOne", ',Object(i.b)("inlineCode",{parentName:"p"},"fieldName"),": string, ",Object(i.b)("inlineCode",{parentName:"p"},"columnKey"),": string): ",Object(i.b)("em",{parentName:"p"},"string")),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Defined in ",Object(i.b)("a",Object(n.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/relationshipHelpers.ts#L139"}),"packages/graphback-core/src/relationships/relationshipHelpers.ts:139"))),Object(i.b)("p",null,"Generic template for relationship annotations"),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Parameters:")),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Name"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Type"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"relationshipKind")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),'"oneToOne" ',"|",' "oneToMany" ',"|",' "manyToOne"'),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"-")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"fieldName")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"string"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"-")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"columnKey")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"string"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}))))),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Returns:")," ",Object(i.b)("em",{parentName:"p"},"string")),Object(i.b)("hr",null),Object(i.b)("h3",{id:"const-relationshiponetoonefielddescriptiontemplate"},Object(i.b)("inlineCode",{parentName:"h3"},"Const")," relationshipOneToOneFieldDescriptionTemplate"),Object(i.b)("p",null,"\u25b8 ",Object(i.b)("strong",{parentName:"p"},"relationshipOneToOneFieldDescriptionTemplate"),"(",Object(i.b)("inlineCode",{parentName:"p"},"relationshipKind"),': "oneToOne" | "oneToMany" | "manyToOne", ',Object(i.b)("inlineCode",{parentName:"p"},"columnKey"),": string): ",Object(i.b)("em",{parentName:"p"},"string")),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Defined in ",Object(i.b)("a",Object(n.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/relationshipHelpers.ts#L150"}),"packages/graphback-core/src/relationships/relationshipHelpers.ts:150"))),Object(i.b)("p",null,"Template for one-to-one relationship annotations"),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Parameters:")),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Name"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Type"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"relationshipKind")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),'"oneToOne" ',"|",' "oneToMany" ',"|",' "manyToOne"'),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"-")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"columnKey")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"string"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}))))),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Returns:")," ",Object(i.b)("em",{parentName:"p"},"string")),Object(i.b)("hr",null),Object(i.b)("h3",{id:"const-striprelationshipannotation"},Object(i.b)("inlineCode",{parentName:"h3"},"Const")," stripRelationshipAnnotation"),Object(i.b)("p",null,"\u25b8 ",Object(i.b)("strong",{parentName:"p"},"stripRelationshipAnnotation"),"(",Object(i.b)("inlineCode",{parentName:"p"},"fieldDescription"),": string): ",Object(i.b)("em",{parentName:"p"},"string")),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Defined in ",Object(i.b)("a",Object(n.a)({parentName:"em"},{href:"https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/relationshipHelpers.ts#L51"}),"packages/graphback-core/src/relationships/relationshipHelpers.ts:51"))),Object(i.b)("p",null,"Strips all relationship annotations from a string"),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Parameters:")),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Name"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Type"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Default"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"fieldDescription")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"string"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}),'""'),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:null}))))),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Returns:")," ",Object(i.b)("em",{parentName:"p"},"string")))}o.isMDXComponent=!0},1333:function(e,t,a){"use strict";a.d(t,"a",(function(){return s})),a.d(t,"b",(function(){return m}));var n=a(0),r=a.n(n);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function b(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?b(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):b(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function p(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var c=r.a.createContext({}),o=function(e){var t=r.a.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},s=function(e){var t=o(e.components);return r.a.createElement(c.Provider,{value:t},e.children)},O={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},j=r.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,b=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),s=o(a),j=n,m=s["".concat(b,".").concat(j)]||s[j]||O[j]||i;return a?r.a.createElement(m,l(l({ref:t},c),{},{components:a})):r.a.createElement(m,l({ref:t},c))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,b=new Array(i);b[0]=j;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:n,b[1]=l;for(var c=2;c<i;c++)b[c]=a[c];return r.a.createElement.apply(null,b)}return r.a.createElement.apply(null,a)}j.displayName="MDXCreateElement"}}]);