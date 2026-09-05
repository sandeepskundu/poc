"use strict";(self.webpackChunkirms=self.webpackChunkirms||[]).push([[1500],{"./src/storybook/ui-libs/components/atoms/indicator/index.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Base:()=>Base,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});let __WEBPACK_DEFAULT_EXPORT__={title:"Atoms/Indicator",component:__webpack_require__("./scrap/ui-libs/components/atoms/indicator/index.jsx").A,parameters:{layout:"centered",docs:{description:{component:"Tags (also known as “chips”) are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once.<br/><br /><strong>Import path:</strong><code>import Indicator from 'aio-global-ui/atoms/indicator';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/indicator/index</code><br/><br/>"}}},tags:["autodocs"],argTypes:{}};var Base={args:{wrapperDs:{size:"md",element:"div",contrast:!1,theme:{background:{default:"c00506"}}},childDs:{element:"span"},image:"",attrs:{},dataAttrs:{}}};Base.parameters={...Base.parameters,docs:{...Base.parameters?.docs,source:{originalSource:`{
  args: {
    wrapperDs: {
      size: "md",
      element: "div",
      contrast: false,
      theme: {
        background: {
          default: "c00506"
        }
      }
    },
    childDs: {
      element: "span"
    },
    image: '',
    attrs: {},
    dataAttrs: {}
  }
}`,...Base.parameters?.docs?.source}}};let __namedExportsOrder=["Base"]},"./scrap/ui-libs/components/atoms/indicator/index.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__),ui_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./build/scripts/ui-helpers/index.js"),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/index.js");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}var Indicator=function Indicator(dprops){var contrast,rval,props=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.props.define({wrapperDs:{size:"md",element:"div",contrast:!1,theme:{background:{default:"c00506"}}},childDs:{element:"span"},image:""},dprops),size=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"wrapperDs.size","md"),childClass=function childClass(){return ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.css.get(props.childDs,"anim indi-bg bdr-round ns flx-vc")};return(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"wrapperDs.element","div"),_object_spread({},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(props,!1,"attrs"),{className:(contrast=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"wrapperDs.contrast"),rval=["anim indicator bdr-round ns flx-vc","".concat(size)],contrast&&(rval.push("ctrst-bdr"),rval.push("bg-".concat(contrast))),ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.css.get(props.wrapperDs,rval.join(" ")))}),props.image?(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("img",{src:props.image,className:childClass()}):(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"childDs.element","div"),{className:childClass()},react__WEBPACK_IMPORTED_MODULE_2__.createElement(react__WEBPACK_IMPORTED_MODULE_2__.Fragment,null," ")))};Indicator.propTypes={wrapperDs:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,childDs:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,image:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string},Indicator.defaultProps={wrapperDs:{size:"md",element:"div",contrast:!1,theme:{background:{default:"c00506"}}},childDs:{element:"span"},image:""};let __WEBPACK_DEFAULT_EXPORT__=Indicator;Indicator.__docgenInfo={description:"",methods:[],displayName:"Indicator",props:{wrapperDs:{defaultValue:{value:`{
	size:"md",
	element:"div",
	contrast:false,
	theme:{
		background:{
			default:"c00506"
		}
	}
}`,computed:!1},description:"round button",type:{name:"object"},required:!1},childDs:{defaultValue:{value:`{
	element:"span"
}`,computed:!1},description:"round button",type:{name:"object"},required:!1},image:{defaultValue:{value:'""',computed:!1},description:"Html element like as button, link or span tag",type:{name:"string"},required:!1}}}}}]);
//# sourceMappingURL=storybook-ui-libs-components-atoms-indicator-index-stories.849c0cd2.iframe.bundle.js.map