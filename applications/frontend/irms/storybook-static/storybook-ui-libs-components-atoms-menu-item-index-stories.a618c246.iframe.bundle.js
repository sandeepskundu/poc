"use strict";(self.webpackChunkirms=self.webpackChunkirms||[]).push([[3680],{"./src/storybook/ui-libs/components/atoms/menu-item/index.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Base:()=>Base,ButtonA:()=>ButtonA,ButtonB:()=>ButtonB,Primary:()=>Primary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});var prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),ui_helpers=__webpack_require__("./build/scripts/ui-helpers/index.js"),react=__webpack_require__("./node_modules/react/index.js");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}var MenuItem=function MenuItem(dprops){var rval,props=ui_helpers.element.jsx.props.define({element:"li"},dprops);return(0,react.createElement)(props.element,_object_spread({},ui_helpers.element.jsx.attrs(props),{className:(rval=["anim bubble","".concat(props.size),"ns flx-vc"],props.radius&&rval.push("bdr-".concat(props.radius)),props.noBorder&&rval.push("bdr-n"),props.className&&rval.push(props.className),props.rounded&&rval.push("round"),props.disabled&&rval.push("disabled"),props.theme&&rval.push("cp-".concat(props.theme)),props.shadow&&rval.push("shdw-".concat(props.shadow)),rval.join(" "))}),props.children?props.children:props.label||react.createElement(react.Fragment,null," "))};MenuItem.propTypes={element:prop_types_default().string},MenuItem.defaultProps={element:"li"},MenuItem.__docgenInfo={description:"",methods:[],displayName:"MenuItem",props:{element:{defaultValue:{value:'"li"',computed:!1},description:"Html element like as li, div etc",type:{name:"string"},required:!1}}};let index_stories={title:"Atoms/MenuItem",component:MenuItem,parameters:{layout:"centered",docs:{description:{component:"Tags (also known as “chips”) are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once.<br/><br /><strong>Import path:</strong><code>import MenuItem from 'aio-global-ui/atoms/menu-item';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/menu-item/index</code><br/><br/>"}}},tags:["autodocs"],argTypes:{}};var Base={args:{element:"li",attrs:{},dataAttrs:{}}},Primary={args:{label:"Mandeep",toggle:!1,con:"kundu"}},ButtonB={args:{label:"Button B",toggle:!1,con:"B Button"}},ButtonA={args:{label:"Button A",toggle:!1,con:"A Button"}};Base.parameters={...Base.parameters,docs:{...Base.parameters?.docs,source:{originalSource:`{
  args: {
    element: "li",
    attrs: {},
    dataAttrs: {}
  }
}`,...Base.parameters?.docs?.source}}},Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Mandeep",
    toggle: false,
    con: "kundu"
  }
}`,...Primary.parameters?.docs?.source}}},ButtonB.parameters={...ButtonB.parameters,docs:{...ButtonB.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Button B",
    toggle: false,
    con: "B Button"
  }
}`,...ButtonB.parameters?.docs?.source}}},ButtonA.parameters={...ButtonA.parameters,docs:{...ButtonA.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Button A",
    toggle: false,
    con: "A Button"
  }
}`,...ButtonA.parameters?.docs?.source}}};let __namedExportsOrder=["Base","Primary","ButtonB","ButtonA"]}}]);
//# sourceMappingURL=storybook-ui-libs-components-atoms-menu-item-index-stories.a618c246.iframe.bundle.js.map