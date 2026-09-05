"use strict";(self.webpackChunkirms=self.webpackChunkirms||[]).push([[8247],{"./src/storybook/ui-libs/components/atoms/0/popover/index.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Base:()=>Base,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});let __WEBPACK_DEFAULT_EXPORT__={title:"Atoms/0/Popover",component:__webpack_require__("./scrap/ui-libs/components/atoms/0/popover/index.jsx").A,parameters:{layout:"centered",docs:{description:{component:"Tags (also known as “chips”) are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once.<br/><br /><strong>Import path:</strong><code>import Popover from 'aio-global-ui/atoms/0/popover';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/popover/index</code><br/><br/>"}}},tags:["autodocs"],argTypes:{}};var Base={args:{defaults:{},templates:{trigger:null,content:null},dsTheme:{wrapper:{},content:{radius:8,border:"c00208",background:"c00307"}},controls:{open:!1,arrow:!0,mode:"static",toggle:"hover",position:"bottom-right"},config:{content:{markup:{element:"div"},attrs:{},ds:{css:{},theme:{}}},wrapper:{markup:{element:"div"},attrs:{},ds:{css:{},theme:{}}}},attrs:{},dataAttrs:{}}};Base.parameters={...Base.parameters,docs:{...Base.parameters?.docs,source:{originalSource:`{
  args: {
    defaults: {},
    templates: {
      trigger: null,
      content: null
    },
    dsTheme: {
      wrapper: {},
      content: {
        radius: 8,
        border: "c00208",
        background: "c00307"
      }
    },
    controls: {
      open: false,
      arrow: true,
      mode: "static",
      toggle: "hover",
      position: "bottom-right"
    },
    config: {
      content: {
        markup: {
          element: "div"
        },
        attrs: {},
        ds: {
          css: {},
          theme: {}
        }
      },
      wrapper: {
        markup: {
          element: "div"
        },
        attrs: {},
        ds: {
          css: {},
          theme: {}
        }
      }
    },
    attrs: {},
    dataAttrs: {}
  }
}`,...Base.parameters?.docs?.source}}};let __namedExportsOrder=["Base"]},"./scrap/ui-libs/components/atoms/0/popover/index.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var ui_helpers__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./build/scripts/ui-helpers/index.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),React=__webpack_require__("./node_modules/react/index.js");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}var Comp=(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(function(dprops,ref){var rval,inptId,renderer,props=ui_helpers__WEBPACK_IMPORTED_MODULE_0__.element.jsx.props.define({defaults:{},templates:{trigger:null,content:null},dsTheme:{wrapper:{},content:{radius:8,border:"c00208",background:"c00307"}},controls:{open:!1,arrow:!0,mode:"static",toggle:"hover",position:"bottom-right"},config:{content:{markup:{element:"div"},attrs:{},ds:{css:{},theme:{}}},wrapper:{markup:{element:"div"},attrs:{},ds:{css:{},theme:{}}}}},dprops),rId=ui_helpers__WEBPACK_IMPORTED_MODULE_0__.random.key(),openat=ui_helpers__WEBPACK_IMPORTED_MODULE_0__.json.get(props,"controls.toggle","click"),renderAs=ui_helpers__WEBPACK_IMPORTED_MODULE_0__.json.get(props,"controls.mode","static"),defaults={},templates=ui_helpers__WEBPACK_IMPORTED_MODULE_0__.json.merge({trigger:null,content:null},ui_helpers__WEBPACK_IMPORTED_MODULE_0__.json.get(props,"templates",{})),mergeDs=function mergeDs(map,type){return"ds"===type?ui_helpers__WEBPACK_IMPORTED_MODULE_0__.element.jsx.props.merge.ds(props,map,defaults):ui_helpers__WEBPACK_IMPORTED_MODULE_0__.element.jsx.props.merge.predefined(props,map,defaults)},dsTheme=function dsTheme(arg){return ui_helpers__WEBPACK_IMPORTED_MODULE_0__.json.merge(ui_helpers__WEBPACK_IMPORTED_MODULE_0__.json.get(arg,"config",{}),{ds:{predefined:ui_helpers__WEBPACK_IMPORTED_MODULE_0__.json.get(arg,"dsTheme",{})}})},getTemplate=function getTemplate(type){var rv=ui_helpers__WEBPACK_IMPORTED_MODULE_0__.json.get(templates,type,null);if(ui_helpers__WEBPACK_IMPORTED_MODULE_0__.data.type.is(rv,"function"))return rv},button=function button(){var renderer=getTemplate("trigger");if(renderer)return renderer(props)},mapArrowColors=function mapArrowColors(arg){if(ui_helpers__WEBPACK_IMPORTED_MODULE_0__.json.get(props,"controls.arrow",!1)){var bdr=ui_helpers__WEBPACK_IMPORTED_MODULE_0__.json.val(arg,"ds.predefined.border",""),hbdr=ui_helpers__WEBPACK_IMPORTED_MODULE_0__.json.val(arg,"ds.predefined.hborder",""),bg=ui_helpers__WEBPACK_IMPORTED_MODULE_0__.json.val(arg,"ds.predefined.background",""),hbg=ui_helpers__WEBPACK_IMPORTED_MODULE_0__.json.val(arg,"ds.predefined.hbackground","");bdr&&(arg=ui_helpers__WEBPACK_IMPORTED_MODULE_0__.json.set(arg,"ds.predefined.bborder",bdr)),hbdr&&(arg=ui_helpers__WEBPACK_IMPORTED_MODULE_0__.json.set(arg,"ds.predefined.hbborder",hbdr)),bg&&(arg=ui_helpers__WEBPACK_IMPORTED_MODULE_0__.json.set(arg,"ds.predefined.abackground",bg)),hbg&&(arg=ui_helpers__WEBPACK_IMPORTED_MODULE_0__.json.set(arg,"ds.predefined.habackground",hbg))}return arg},contentDs=function contentDs(){var ds=dsTheme({dsTheme:mergeDs("content"),config:mergeDs("content","ds")}),cls=["poc dd transition bxs bdr-1"];return ui_helpers__WEBPACK_IMPORTED_MODULE_0__.json.get(props,"controls.arrow",!1)&&cls.push("has-arrow"),ui_helpers__WEBPACK_IMPORTED_MODULE_0__.element.jsx.attrs(mapArrowColors(ds),cls.join(" "))},contentUi=function contentUi(render){var pos=ui_helpers__WEBPACK_IMPORTED_MODULE_0__.json.get(props,"controls.position","bottom-right");return React.createElement("div",{className:"poh bxs ".concat(pos)},React.createElement("div",contentDs(),props.children?props.children:render(props)))};return getTemplate("trigger")?(0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(ui_helpers__WEBPACK_IMPORTED_MODULE_0__.json.get(props,"config.wrapper.markup.element","div"),(rval=ui_helpers__WEBPACK_IMPORTED_MODULE_0__.element.jsx.attrs(dsTheme(ui_helpers__WEBPACK_IMPORTED_MODULE_0__.json.merge({config:mergeDs("wrapper","ds"),dsTheme:mergeDs("wrapper")},{config:{dataAttrs:{"data-comp-id":rId,"data-comp":"popover"}}})),"po full ow-".concat(openat," ra-").concat(renderAs)),ref&&(rval=_object_spread({},rval,{ref:ref})),rval),React.createElement(React.Fragment,null,(inptId="".concat(rId,"Cbx"),"hover"===openat?button():React.createElement(React.Fragment,null,React.createElement("label",{htmlFor:inptId,className:"bxs flx-full"},button()),React.createElement("input",{type:"checkbox",onChange:function onChange(e){console.log(e)},"data-comp-elm":"popover-toggle",id:inptId,"data-comp-rId":rId,className:"po-trg-inpt"}))),(renderer=getTemplate("content"),props.children||renderer?"click"!==openat||"react"!==renderAs?contentUi(renderer):ui_helpers__WEBPACK_IMPORTED_MODULE_0__.json.get(props,"controls.open",!1)?contentUi(renderer):React.createElement(React.Fragment,null):React.createElement(React.Fragment,null)))):React.createElement(React.Fragment,null)});let __WEBPACK_DEFAULT_EXPORT__=Comp;Comp.__docgenInfo={description:"",methods:[],displayName:"Comp"}}}]);
//# sourceMappingURL=storybook-ui-libs-components-atoms-0-popover-index-stories.f415d153.iframe.bundle.js.map