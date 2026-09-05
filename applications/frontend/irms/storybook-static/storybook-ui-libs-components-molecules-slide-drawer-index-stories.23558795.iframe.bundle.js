"use strict";(self.webpackChunkirms=self.webpackChunkirms||[]).push([[3127],{"./src/storybook/ui-libs/components/molecules/slide-drawer/index.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Base:()=>Base,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});var prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),ui_helpers=__webpack_require__("./build/scripts/ui-helpers/index.js"),react=__webpack_require__("./node_modules/react/index.js"),icon=__webpack_require__("./scrap/ui-libs/components/atoms/icon/index.jsx");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}var SlideDrawer=function SlideDrawer(dprops){var rv,attrs,props=ui_helpers.element.jsx.props.define({id:"",direction:"right",hideClose:!1,outsideClose:!1,wrapperDs:{divider:{ds:{},enabled:!1,position:"top"},ds:{css:{class:{borderNone:{1:!0,2:!0,4:!0}}},theme:{colorPairing:{default:"024"}}}},contentDs:{theme:{colorPairing:{default:"030"}}},closeIconDs:{icon:{name:"da"},theme:{colorPairing:{default:"030"}},css:{class:{padding:{1:8,2:8,3:8,4:8}}}}},dprops),ids={id:props.id?props.id:ui_helpers.random.id(16)};return react.createElement(react.Fragment,null,react.createElement("input",{type:"checkbox",name:ids.id,id:ids.id,className:"sd-inpt"}),react.createElement("div",_object_spread({},_object_spread({},ui_helpers.element.jsx.attrs(props,!1,"attrs"),{className:(rv=["sd-wrpr transition","from-".concat(props.direction)],ui_helpers.element.jsx.css.get(props.wrapperDs,rv.join(" ")))}),{style:{color:"red"}}),props.outsideClose?react.createElement("label",{className:"backdrop fade-in",htmlFor:ids.id}," "):react.createElement("div",{className:"backdrop fade-in"}," "),react.createElement("div",{className:"sd-ctnt-wrpr"},react.createElement("div",_object_spread({},ui_helpers.element.jsx.attrs(props.contentDs,!1,"attrs"),{className:ui_helpers.element.jsx.css.get(props.contentDs,"sd-ctnt transition")}),react.createElement("div",{className:"full pr sh-1"},props.hideClose?react.createElement(react.Fragment,null):(0,react.createElement)("label",((attrs=ui_helpers.element.jsx.attrs(props.closeIconDs,!1,"attrs")).htmlFor=ids.id,_object_spread({},attrs,{className:ui_helpers.element.jsx.css.get(props.closeIconDs,"sd-close cp")})),react.createElement(icon.A,{icon:ui_helpers.json.val(props,"closeIconDs.icon",{})})),react.createElement("div",{className:"sd-ctnt-hldr"},props.children))))))};SlideDrawer.propTypes={id:prop_types_default().string,direction:prop_types_default().oneOf(["left","right"]),hideClose:prop_types_default().bool,outsideClose:prop_types_default().bool,wrapperDs:prop_types_default().object,contentDs:prop_types_default().object,closeIconDs:prop_types_default().object},SlideDrawer.defaultProps={id:"",direction:"right",hideClose:!1,outsideClose:!1,wrapperDs:{divider:{ds:{},enabled:!1,position:"top"},ds:{css:{class:{borderNone:{1:!0,2:!0,4:!0}}},theme:{colorPairing:{default:"024"}}}},contentDs:{theme:{colorPairing:{default:"030"}}},closeIconDs:{icon:{name:"da"},theme:{colorPairing:{default:"030"}},css:{class:{padding:{1:8,2:8,3:8,4:8}}}}},SlideDrawer.__docgenInfo={description:"",methods:[],displayName:"SlideDrawer",props:{id:{defaultValue:{value:'""',computed:!1},description:"Id of slide drawer which will set in inputs",type:{name:"string"},required:!1},direction:{defaultValue:{value:'"right"',computed:!1},description:"Open from direction of slider drawer",type:{name:"enum",value:[{value:"'left'",computed:!1},{value:"'right'",computed:!1}]},required:!1},hideClose:{defaultValue:{value:"false",computed:!1},description:"Flag to hide close button of slider drawer",type:{name:"bool"},required:!1},outsideClose:{defaultValue:{value:"false",computed:!1},description:"Flag to set close on click on backdrop of slider drawer",type:{name:"bool"},required:!1},wrapperDs:{defaultValue:{value:`{
	divider:{
		ds:{

		},
		enabled:false,
		position:"top"
	},
	ds:{
		css:{
			class:{
				borderNone:{
					1:true,
					2:true,
					4:true
				}
			}
		},
		theme:{
			colorPairing:{
				default:"024"
			}
		}
	}
}`,computed:!1},description:"Slider drawer wrapper design system configuration",type:{name:"object"},required:!1},contentDs:{defaultValue:{value:`{
	theme:{
		colorPairing:{
			default:"030"
		}
	}
}`,computed:!1},description:"Slider drawer content wrapper design system configuration",type:{name:"object"},required:!1},closeIconDs:{defaultValue:{value:`{
	icon:{
		name:"da"
	},
	theme:{
		colorPairing:{
			default:"030"
		}
	},
	css:{
		class:{
			padding:{
				1:8,
				2:8,
				3:8,
				4:8
			}
		}
	}
}`,computed:!1},description:"Design system configuration of close icon",type:{name:"object"},required:!1}}};let index_stories={title:"Molecules/SlideDrawer",component:SlideDrawer,parameters:{layout:"centered",docs:{description:{component:"Accordion menu<br/><br /><strong>Import path:</strong><code>import SlideDrawer from 'aio-global-ui/molecules/slide-drawer';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/molecules/slide-drawer/index</code><br/><br/>"}}},tags:["autodocs"],argTypes:{}};var Base={args:{id:"",direction:"right",hideClose:!1,outsideClose:!1,wrapperDs:{divider:{ds:{},enabled:!1,position:"top"},ds:{css:{class:{borderNone:{1:!0,2:!0,4:!0}}},theme:{colorPairing:{default:"024"}}}},contentDs:{theme:{colorPairing:{default:"030"}}},closeIconDs:{icon:{name:"da"},theme:{colorPairing:{default:"030"}},css:{class:{padding:{1:8,2:8,3:8,4:8}}}},attrs:{},dataAttrs:{}}};Base.parameters={...Base.parameters,docs:{...Base.parameters?.docs,source:{originalSource:`{
  args: {
    id: '',
    direction: "right",
    hideClose: false,
    outsideClose: false,
    wrapperDs: {
      divider: {
        ds: {},
        enabled: false,
        position: "top"
      },
      ds: {
        css: {
          class: {
            borderNone: {
              1: true,
              2: true,
              4: true
            }
          }
        },
        theme: {
          colorPairing: {
            default: "024"
          }
        }
      }
    },
    contentDs: {
      theme: {
        colorPairing: {
          default: "030"
        }
      }
    },
    closeIconDs: {
      icon: {
        name: "da"
      },
      theme: {
        colorPairing: {
          default: "030"
        }
      },
      css: {
        class: {
          padding: {
            1: 8,
            2: 8,
            3: 8,
            4: 8
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
//# sourceMappingURL=storybook-ui-libs-components-molecules-slide-drawer-index-stories.23558795.iframe.bundle.js.map