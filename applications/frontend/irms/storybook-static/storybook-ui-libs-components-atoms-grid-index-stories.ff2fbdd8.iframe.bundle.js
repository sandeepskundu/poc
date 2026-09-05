"use strict";(self.webpackChunkirms=self.webpackChunkirms||[]).push([[3743],{"./src/storybook/ui-libs/components/atoms/grid/index.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Base:()=>Base,ButtonA:()=>ButtonA,ButtonB:()=>ButtonB,Primary:()=>Primary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});var prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),ui_helpers=__webpack_require__("./build/scripts/ui-helpers/index.js"),react=__webpack_require__("./node_modules/react/index.js"),Grids=function Grids(dprops){var prps,rval,prps1,grids,props=ui_helpers.element.jsx.props.define({element:"section",layout:0},dprops),getProps=function getProps(){var data=props.data||{},device=ui_helpers.ua.getDevice();return data[device]?data[device]||{}:data.desktop?data.desktop:data.tablet?data.tablet:data.mobile?data.mobile:{}},gridClass=function gridClass(arg){var rval=["grid"],s=ui_helpers.json.val(arg,"size");return s&&(rval=["grid-w".concat(s)]),arg.cssClass&&rval.push(arg.cssClass),rval.join(" ")},getLayout=function getLayout(){var prps=getProps(),layout=props.layout;return(prps.layout&&(layout=prps.layout),layout)?"grid-layout-".concat(layout):""};return(0,react.createElement)(props.element,{className:(prps=getProps(),(rval=["grid-wrapper"]).push(getLayout()),prps.wrapperCls?rval.push(prps.wrapperCls):props.wrapperCls&&rval.push(props.wrapperCls),rval.join(" "))},(prps1=getProps(),(grids=ui_helpers.react.map.data(prps1,"grids"))&&grids.length>0?grids.map(function(arg,i){return(0,react.createElement)(arg.element||"div",{className:gridClass(arg)},arg.component||"")}):react.createElement(react.Fragment,null)))};Grids.propTypes={element:prop_types_default().string,layout:prop_types_default().oneOf([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])},Grids.defaultProps={element:"section",layout:0},Grids.__docgenInfo={description:"",methods:[],displayName:"Grids",props:{element:{defaultValue:{value:'"section"',computed:!1},description:"Element name",type:{name:"string"},required:!1},layout:{defaultValue:{value:"0",computed:!1},description:"Font size of display text",type:{name:"enum",value:[{value:"0",computed:!1},{value:"1",computed:!1},{value:"2",computed:!1},{value:"3",computed:!1},{value:"4",computed:!1},{value:"5",computed:!1},{value:"6",computed:!1},{value:"7",computed:!1},{value:"8",computed:!1},{value:"9",computed:!1},{value:"10",computed:!1},{value:"11",computed:!1},{value:"12",computed:!1},{value:"13",computed:!1},{value:"14",computed:!1},{value:"15",computed:!1}]},required:!1}}};let index_stories={title:"Atoms/Grid",component:Grids,parameters:{layout:"centered",docs:{description:{component:"Working from a pre-defined and limited container spacing system allows you to work faster and consistently.<br/><br /><strong>Import path:</strong><code>import Grid from 'aio-global-ui/atoms/grid';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/grid/index</code><br/><br/>"}}},tags:["autodocs"],argTypes:{}};var Base={args:{element:"section",layout:0,attrs:{},dataAttrs:{}}},Primary={args:{label:"Mandeep",toggle:!1,con:"kundu"}},ButtonB={args:{label:"Button B",toggle:!1,con:"B Button"}},ButtonA={args:{label:"Button A",toggle:!1,con:"A Button"}};Base.parameters={...Base.parameters,docs:{...Base.parameters?.docs,source:{originalSource:`{
  args: {
    element: "section",
    layout: 0,
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
//# sourceMappingURL=storybook-ui-libs-components-atoms-grid-index-stories.ff2fbdd8.iframe.bundle.js.map