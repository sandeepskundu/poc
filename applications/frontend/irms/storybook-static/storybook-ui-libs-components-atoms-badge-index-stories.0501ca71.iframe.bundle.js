"use strict";(self.webpackChunkirms=self.webpackChunkirms||[]).push([[3470],{"./src/storybook/ui-libs/components/atoms/badge/index.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Base:()=>Base,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});var prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),ui_helpers=__webpack_require__("./build/scripts/ui-helpers/index.js"),icon=__webpack_require__("./scrap/ui-libs/components/atoms/icon/index.jsx"),react=__webpack_require__("./node_modules/react/index.js");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}var Badge=function Badge(dprops){var rval,props=ui_helpers.element.jsx.props.define({element:"p",size:"lg",onClick:null,icon:{},leftIcon:{},rightIcon:{},ds:{theme:{colorPairing:{default:"000"}},css:{class:{radius:{1:6}}}}},dprops),ico=ui_helpers.json.val(props,"icon.name"),lico=ui_helpers.json.val(props,"leftIcon.name"),rico=ui_helpers.json.val(props,"rightIcon.name"),iconProps=function iconProps(name){var iprops=ui_helpers.json.val(props,name,{});return ui_helpers.element.jsx.css.getConfByMap(iprops,{name:"name",size:"size",color:"color",family:"family"})},labelCls=function labelCls(){var map={sm:"4",lg:"6",xl:"6"},rval=["badge-lbl"],pd=map[props.size]||map.lg;return props.avatar?rval.push("pd-l".concat(pd)):lico&&rico?rval.push("pd-rl".concat(pd)):lico?rval.push("pd-l".concat(pd)):rico&&rval.push("pd-r".concat(pd)),rval.join(" ")};return(0,react.createElement)(props.element,_object_spread({},ui_helpers.element.jsx.attrs(props,!1,"attrs"),{className:(rval=["anim badge","".concat(props.size),"ns flx-vc"],props.avatar&&rval.push("is-avatar"),ico&&rval.push("is-ico"),ui_helpers.element.jsx.className(props,rval.join(" ")))}),function child(){if(props.children)return props.children;if(props.avatar)return react.createElement(react.Fragment,null,props.avatar,react.createElement("span",{className:labelCls()},props.label));if(ico)return react.createElement(icon.A,{icon:iconProps("icon")});if(lico&&rico)return react.createElement(react.Fragment,null,react.createElement(icon.A,{icon:iconProps("leftIcon")}),react.createElement("span",{className:labelCls()},props.label),react.createElement(icon.A,{icon:iconProps("rightIcon")}));if(lico)return react.createElement(react.Fragment,null,react.createElement(icon.A,{icon:iconProps("leftIcon")}),react.createElement("span",{className:labelCls()},props.label));else if(rico)return react.createElement(react.Fragment,null,react.createElement("span",{className:labelCls()},props.label),react.createElement(icon.A,{icon:iconProps("rightIcon")}));return props.label}())};Badge.propTypes={label:prop_types_default().string.isRequired,element:prop_types_default().string,size:prop_types_default().oneOf(["sm","lg","xl"]),onClick:prop_types_default().func,icon:prop_types_default().object,leftIcon:prop_types_default().object,rightIcon:prop_types_default().object,ds:prop_types_default().object},Badge.defaultProps={element:"p",size:"lg",onClick:null,icon:{},leftIcon:{},rightIcon:{},ds:{theme:{colorPairing:{default:"000"}},css:{class:{radius:{1:6}}}}},Badge.__docgenInfo={description:"",methods:[],displayName:"Badge",props:{element:{defaultValue:{value:'"p"',computed:!1},description:"Html element like as button, link or span tag",type:{name:"string"},required:!1},size:{defaultValue:{value:'"lg"',computed:!1},description:"Button size can have any value from below optionsButton size can have any value from below optionsButton size can have any value from below optionsButton size can have any value from below optionsButton size can have any value from below options",type:{name:"enum",value:[{value:"'sm'",computed:!1},{value:"'lg'",computed:!1},{value:"'xl'",computed:!1}]},required:!1},onClick:{defaultValue:{value:"null",computed:!1},description:"Button size can have any value from below options",type:{name:"func"},required:!1},icon:{defaultValue:{value:`{

}`,computed:!1},description:"Icon configuration of avatar id inital or image is not availabel",type:{name:"object"},required:!1},leftIcon:{defaultValue:{value:`{

}`,computed:!1},description:"Icon configuration of avatar id inital or image is not availabel",type:{name:"object"},required:!1},rightIcon:{defaultValue:{value:`{

}`,computed:!1},description:"Icon configuration of avatar id inital or image is not availabel",type:{name:"object"},required:!1},ds:{defaultValue:{value:`{
	theme:{
		colorPairing:{
			default:"000"
		}
	},
	css:{
		class:{
			radius:{
				1:6
			}
		}
	}
}`,computed:!1},description:"round button",type:{name:"object"},required:!1},label:{description:"Button label.",type:{name:"string"},required:!0}}};let index_stories={title:"Atoms/Badge",component:Badge,parameters:{layout:"centered",docs:{description:{component:"Badges help highlight important information, such as notifications or new and unread messages. They’re primarily used for communicating secondary or additional information to text.<br/><br /><strong>Import path:</strong><code>import Badge from 'aio-global-ui/atoms/badge';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/badge/index</code><br/><br/>"}}},tags:["autodocs"],argTypes:{}};var Base={args:{label:"Button",element:"p",size:"lg",icon:{},leftIcon:{},rightIcon:{},ds:{theme:{colorPairing:{default:"000"}},css:{class:{radius:{1:6}}}},attrs:{},dataAttrs:{}}};Base.parameters={...Base.parameters,docs:{...Base.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Button",
    element: "p",
    size: "lg",
    icon: {},
    leftIcon: {},
    rightIcon: {},
    ds: {
      theme: {
        colorPairing: {
          default: "000"
        }
      },
      css: {
        class: {
          radius: {
            1: 6
          }
        }
      }
    },
    attrs: {},
    dataAttrs: {}
  }
}`,...Base.parameters?.docs?.source}}};let __namedExportsOrder=["Base"]},"./scrap/ui-libs/components/atoms/icon/index.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__),ui_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./build/scripts/ui-helpers/index.js"),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/index.js");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}var Icon=function Icon(dprops){var rv,props=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.props.define({className:"",icon:{name:"tick",color:"",size:"16",family:"g"}},dprops);return(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span",_object_spread({},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(props,!1,"attrs"),{className:(rv=["flx-vc"],props.className&&rv.push(props.className),ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.css.icon.get(props,rv.join(" ")))}),"")};Icon.propTypes={className:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string,icon:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object},Icon.defaultProps={className:"",icon:{name:"tick",color:"",size:"16",family:"g"}};let __WEBPACK_DEFAULT_EXPORT__=Icon;Icon.__docgenInfo={description:"",methods:[],displayName:"Icon",props:{className:{defaultValue:{value:'""',computed:!1},description:"Html element like as button, link or span tag",type:{name:"string"},required:!1},icon:{defaultValue:{value:`{
	name:"tick",
	color:'',
	size:"16",
	family:"g"
}`,computed:!1},description:"Icons props like as name, family, size and color",type:{name:"object"},required:!1}}}}}]);
//# sourceMappingURL=storybook-ui-libs-components-atoms-badge-index-stories.0501ca71.iframe.bundle.js.map