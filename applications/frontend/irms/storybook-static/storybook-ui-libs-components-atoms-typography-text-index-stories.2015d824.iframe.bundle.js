"use strict";(self.webpackChunkirms=self.webpackChunkirms||[]).push([[6410],{"./src/storybook/ui-libs/components/atoms/typography/text/index.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Base:()=>Base,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});let __WEBPACK_DEFAULT_EXPORT__={title:"Atoms/Typography/Text",component:__webpack_require__("./scrap/ui-libs/components/atoms/typography/text/index.jsx").A,parameters:{layout:"centered",docs:{description:{component:"Working from a pre-defined and limited container spacing system allows you to work faster and consistently.<br/><br /><strong>Import path:</strong><code>import Text from 'aio-global-ui/atoms/typography/text';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/typography/text/index</code><br/><br/>"}}},tags:["autodocs"],argTypes:{}};var Base={args:{content:"",element:"p",ds:{css:{class:{margin:{1:"16",2:"0",3:"0",4:"0"},family:"rg",fontsize:"md"},flags:{boxSizing:!0}}},moreLess:{lineClamp:5,enabled:!1,moreLabel:"Read more",lessLabel:"Read less",alignMoreOption:"al"},attrs:{},dataAttrs:{}}};Base.parameters={...Base.parameters,docs:{...Base.parameters?.docs,source:{originalSource:`{
  args: {
    content: '',
    element: "p",
    ds: {
      css: {
        class: {
          margin: {
            1: "16",
            2: "0",
            3: "0",
            4: "0"
          },
          family: "rg",
          fontsize: "md"
        },
        flags: {
          boxSizing: true
        }
      }
    },
    moreLess: {
      lineClamp: 5,
      enabled: false,
      moreLabel: "Read more",
      lessLabel: "Read less",
      alignMoreOption: "al"
    },
    attrs: {},
    dataAttrs: {}
  }
}`,...Base.parameters?.docs?.source}}};let __namedExportsOrder=["Base"]},"./scrap/ui-libs/components/atoms/typography/text/index.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__),ui_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./build/scripts/ui-helpers/index.js"),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/index.js");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}var Text=function Text(dprops){var id,moreLbl,lessLbl,lineClamp,alignLbl,props=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.props.define({content:"",element:"p",ds:{css:{class:{margin:{1:"16",2:"0",3:"0",4:"0"},family:"rg",fontsize:"md"},flags:{boxSizing:!0}}},moreLess:{lineClamp:5,enabled:!1,moreLabel:"Read more",lessLabel:"Read less",alignMoreOption:"al"}},dprops),moreLess=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"moreLess.enabled");return(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(moreLess?"div":props.element||"p",_object_spread({},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(props,!1,"attrs"),{className:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.className(props,moreLess?"rd-mor-lss full":"")}),props.children?props.children:moreLess?(id=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.random.id(24),moreLbl=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"moreLess.moreLabel"),lessLbl=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"moreLess.lessLabel"),lineClamp=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"moreLess.lineClamp"),alignLbl=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"moreLess.alignMoreOption"),react__WEBPACK_IMPORTED_MODULE_2__.createElement(react__WEBPACK_IMPORTED_MODULE_2__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_2__.createElement("input",{type:"checkbox",className:"rd-mor-lss-chbx",id:id}),react__WEBPACK_IMPORTED_MODULE_2__.createElement("div",{dangerouslySetInnerHTML:{__html:props.content||""},className:"rd-mor-lss-ctnt full lc-".concat(lineClamp)}),react__WEBPACK_IMPORTED_MODULE_2__.createElement("div",{className:"full mr-t10 rd-mor-lbl-hldr ".concat(alignLbl)},react__WEBPACK_IMPORTED_MODULE_2__.createElement("label",{className:"rd-mor-lss-lbl cp link-u",htmlFor:id,"data-more-label":moreLbl,"data-less-label":lessLbl}," ")))):props.content||"")};Text.propTypes={content:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string,element:prop_types__WEBPACK_IMPORTED_MODULE_0___default().oneOf(["h1","h2","h3","h4","h5","h6","p","span","strong","li"]),ds:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,moreLess:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object},Text.defaultProps={content:"",element:"p",ds:{css:{class:{margin:{1:"16",2:"0",3:"0",4:"0"},family:"rg",fontsize:"md"},flags:{boxSizing:!0}}},moreLess:{lineClamp:5,enabled:!1,moreLabel:"Read more",lessLabel:"Read less",alignMoreOption:"al"}};let __WEBPACK_DEFAULT_EXPORT__=Text;Text.__docgenInfo={description:"",methods:[],displayName:"Text",props:{content:{defaultValue:{value:'""',computed:!1},description:"Display content",type:{name:"string"},required:!1},element:{defaultValue:{value:'"p"',computed:!1},description:"Element name",type:{name:"enum",value:[{value:"'h1'",computed:!1},{value:"'h2'",computed:!1},{value:"'h3'",computed:!1},{value:"'h4'",computed:!1},{value:"'h5'",computed:!1},{value:"'h6'",computed:!1},{value:"'p'",computed:!1},{value:"'span'",computed:!1},{value:"'strong'",computed:!1},{value:"'li'",computed:!1}]},required:!1},ds:{defaultValue:{value:`{
	css:{
		class:{
			margin:{
				1:"16",
				2:"0",
				3:"0",
				4:"0"
			},
			family:"rg",
			fontsize:"md"
		},
		flags:{
			boxSizing:true
		}
	}
}`,computed:!1},description:"round button",type:{name:"object"},required:!1},moreLess:{defaultValue:{value:`{
	lineClamp:5,
	enabled:false,
	moreLabel:"Read more",
	lessLabel:"Read less",
	alignMoreOption:"al"
}`,computed:!1},description:"moreLess",type:{name:"object"},required:!1}}}}}]);
//# sourceMappingURL=storybook-ui-libs-components-atoms-typography-text-index-stories.2015d824.iframe.bundle.js.map