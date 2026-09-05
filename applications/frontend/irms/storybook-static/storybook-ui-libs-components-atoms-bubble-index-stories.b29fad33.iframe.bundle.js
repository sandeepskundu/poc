"use strict";(self.webpackChunkirms=self.webpackChunkirms||[]).push([[133],{"./src/storybook/ui-libs/components/atoms/bubble/index.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Base:()=>Base,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});var prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),ui_helpers=__webpack_require__("./build/scripts/ui-helpers/index.js"),react=__webpack_require__("./node_modules/react/index.js");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}var Bubble=function Bubble(dprops){var props=ui_helpers.element.jsx.props.define({element:"span",size:"lg",onClick:null,ds:{theme:{colorPairing:{default:"000"}},css:{class:{radius:{1:6}}}}},dprops);return(0,react.createElement)(props.element,_object_spread({},ui_helpers.element.jsx.attrs(props,!1,"attrs"),{className:ui_helpers.element.jsx.className(props,["anim bubble","".concat(props.size),"ns flx-vc"].join(" "))}),props.children?props.children:props.label||react.createElement(react.Fragment,null," "))};Bubble.propTypes={label:prop_types_default().string.isRequired,element:prop_types_default().string,size:prop_types_default().oneOf(["sm","lg","xl"]),onClick:prop_types_default().func,ds:prop_types_default().object},Bubble.defaultProps={element:"span",size:"lg",onClick:null,ds:{theme:{colorPairing:{default:"000"}},css:{class:{radius:{1:6}}}}},Bubble.__docgenInfo={description:"",methods:[],displayName:"Bubble",props:{element:{defaultValue:{value:'"span"',computed:!1},description:"Html element like as button, link or span tag",type:{name:"string"},required:!1},size:{defaultValue:{value:'"lg"',computed:!1},description:"Button size can have any value from below optionsButton size can have any value from below optionsButton size can have any value from below optionsButton size can have any value from below optionsButton size can have any value from below options",type:{name:"enum",value:[{value:"'sm'",computed:!1},{value:"'lg'",computed:!1},{value:"'xl'",computed:!1}]},required:!1},onClick:{defaultValue:{value:"null",computed:!1},description:"Button size can have any value from below options",type:{name:"func"},required:!1},ds:{defaultValue:{value:`{
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
}`,computed:!1},description:"round button",type:{name:"object"},required:!1},label:{description:"Button label.",type:{name:"string"},required:!0}}};let index_stories={title:"Atoms/Bubble",component:Bubble,parameters:{layout:"centered",docs:{description:{component:"Tags (also known as “chips”) are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once.<br/><br /><strong>Import path:</strong><code>import Bubble from 'aio-global-ui/atoms/bubble';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/bubble/index</code><br/><br/>"}}},tags:["autodocs"],argTypes:{}};var Base={args:{label:"",element:"span",size:"lg",ds:{theme:{colorPairing:{default:"000"}},css:{class:{radius:{1:6}}}},attrs:{},dataAttrs:{}}};Base.parameters={...Base.parameters,docs:{...Base.parameters?.docs,source:{originalSource:`{
  args: {
    label: '',
    element: "span",
    size: "lg",
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
}`,...Base.parameters?.docs?.source}}};let __namedExportsOrder=["Base"]}}]);
//# sourceMappingURL=storybook-ui-libs-components-atoms-bubble-index-stories.b29fad33.iframe.bundle.js.map