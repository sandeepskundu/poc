"use strict";(self.webpackChunkirms=self.webpackChunkirms||[]).push([[5092],{"./src/storybook/ui-libs/components/organisms/app-page-with-menu/index.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Base:()=>Base,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});var prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),ui_helpers=__webpack_require__("./build/scripts/ui-helpers/index.js"),react=__webpack_require__("./node_modules/react/index.js");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}var AppPageWithMenu=function AppPageWithMenu(dprops){var props=ui_helpers.element.jsx.props.define({wrapperDs:{css:{class:{}},theme:{background:{default:"'c00100'"}}},pageDs:{attrs:{},dataAttrs:{},theme:{}},menuDs:{attrs:{},dataAttrs:{},theme:{border:{default:"'c00103'"},background:{default:"'c00000'"}},css:{class:{borderNone:{1:!0,3:!0,4:!0}}}},rightMenuDs:{attrs:{},dataAttrs:{},theme:{border:{default:"'c00103'"},background:{default:"'c00000'"}},css:{class:{borderNone:{1:!0,2:!0,3:!0}}}},appMenu:"",appRightMenu:"",appPage:""},dprops),rmenu=ui_helpers.json.val(props,"appRightMenu");return react.createElement("div",_object_spread({},ui_helpers.element.jsx.attrs(props,!1,"attrs"),{className:ui_helpers.element.jsx.css.get(props.wrapperDs,"app-m-page")}),react.createElement("div",{className:"app-m-page-ctnt bxs ".concat(rmenu?"has-right-menu":"")},react.createElement("div",_object_spread({},ui_helpers.element.jsx.attrs(props.menuDs,!1,"attrs"),{className:ui_helpers.element.jsx.css.get(props.menuDs,"app-m-wrpr bdr-1")}),"function"===ui_helpers.data.type.get(props.appMenu)?props.appMenu(props):props.appMenu||""),react.createElement("div",_object_spread({},ui_helpers.element.jsx.attrs(props.pageDs,!1,"attrs"),{className:ui_helpers.element.jsx.css.get(props.pageDs,"app-p-wrpr full bdr-1 bxs")}),"function"===ui_helpers.data.type.get(props.appPage)?props.appPage(props):props.appPage||""),rmenu?react.createElement("div",_object_spread({},ui_helpers.element.jsx.attrs(props.rightMenuDs,!1,"attrs"),{className:ui_helpers.element.jsx.css.get(props.rightMenuDs,"app-m-wrpr bdr-1 right")}),"function"===ui_helpers.data.type.get(props.appRightMenu)?props.appRightMenu(props):props.appRightMenu||""):react.createElement(react.Fragment,null)))};AppPageWithMenu.propTypes={wrapperDs:prop_types_default().object,pageDs:prop_types_default().object,menuDs:prop_types_default().object,rightMenuDs:prop_types_default().object,appMenu:prop_types_default().JSX,appRightMenu:prop_types_default().JSX,appPage:prop_types_default().JSX},AppPageWithMenu.defaultProps={wrapperDs:{css:{class:{}},theme:{background:{default:"'c00100'"}}},pageDs:{attrs:{},dataAttrs:{},theme:{}},menuDs:{attrs:{},dataAttrs:{},theme:{border:{default:"'c00103'"},background:{default:"'c00000'"}},css:{class:{borderNone:{1:!0,3:!0,4:!0}}}},rightMenuDs:{attrs:{},dataAttrs:{},theme:{border:{default:"'c00103'"},background:{default:"'c00000'"}},css:{class:{borderNone:{1:!0,2:!0,3:!0}}}},appMenu:"",appRightMenu:"",appPage:""},AppPageWithMenu.__docgenInfo={description:"",methods:[],displayName:"AppPageWithMenu",props:{wrapperDs:{defaultValue:{value:`{
	css:{
		class:{

		}
	},
	theme:{
		background:{
			default:"'c00100'"
		}
	}
}`,computed:!1},description:"Design system configuration of page wrapper",type:{name:"object"},required:!1},pageDs:{defaultValue:{value:`{
	attrs:{

	},
	dataAttrs:{

	},
	theme:{

	}
}`,computed:!1},description:"Design system configuration of page content",type:{name:"object"},required:!1},menuDs:{defaultValue:{value:`{
	attrs:{

	},
	dataAttrs:{

	},
	theme:{
		border:{
			default:"'c00103'"
		},
		background:{
			default:"'c00000'"
		}
	},
	css:{
		class:{
			borderNone:{
				1:true,
				3:true,
				4:true
			}
		}
	}
}`,computed:!1},description:"Design system configuration of menu wrapper",type:{name:"object"},required:!1},rightMenuDs:{defaultValue:{value:`{
	attrs:{

	},
	dataAttrs:{

	},
	theme:{
		border:{
			default:"'c00103'"
		},
		background:{
			default:"'c00000'"
		}
	},
	css:{
		class:{
			borderNone:{
				1:true,
				2:true,
				3:true
			}
		}
	}
}`,computed:!1},description:"Design system configuration of menu wrapper",type:{name:"object"},required:!1},appMenu:{defaultValue:{value:'""',computed:!1},description:"JSX of app menu element",type:{name:"custom",raw:"propTypes.JSX"},required:!1},appRightMenu:{defaultValue:{value:'""',computed:!1},description:"JSX of app menu element",type:{name:"custom",raw:"propTypes.JSX"},required:!1},appPage:{defaultValue:{value:'""',computed:!1},description:"JSX of app page element",type:{name:"custom",raw:"propTypes.JSX"},required:!1}}};let index_stories={title:"Organisms/AppPageWithMenu",component:AppPageWithMenu,parameters:{layout:"centered",docs:{description:{component:"Accordion menu<br/><br /><strong>Import path:</strong><code>import AppPageWithMenu from 'aio-global-ui/organisms/app-page-with-menu';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/organisms/app-page-with-menu/index</code><br/><br/>"}}},tags:["autodocs"],argTypes:{}};var Base={args:{wrapperDs:{css:{class:{}},theme:{background:{default:"'c00100'"}}},pageDs:{attrs:{},dataAttrs:{},theme:{}},menuDs:{attrs:{},dataAttrs:{},theme:{border:{default:"'c00103'"},background:{default:"'c00000'"}},css:{class:{borderNone:{1:!0,3:!0,4:!0}}}},rightMenuDs:{attrs:{},dataAttrs:{},theme:{border:{default:"'c00103'"},background:{default:"'c00000'"}},css:{class:{borderNone:{1:!0,2:!0,3:!0}}}},appMenu:"",appRightMenu:"",appPage:"",attrs:{},dataAttrs:{}}};Base.parameters={...Base.parameters,docs:{...Base.parameters?.docs,source:{originalSource:`{
  args: {
    wrapperDs: {
      css: {
        class: {}
      },
      theme: {
        background: {
          default: "'c00100'"
        }
      }
    },
    pageDs: {
      attrs: {},
      dataAttrs: {},
      theme: {}
    },
    menuDs: {
      attrs: {},
      dataAttrs: {},
      theme: {
        border: {
          default: "'c00103'"
        },
        background: {
          default: "'c00000'"
        }
      },
      css: {
        class: {
          borderNone: {
            1: true,
            3: true,
            4: true
          }
        }
      }
    },
    rightMenuDs: {
      attrs: {},
      dataAttrs: {},
      theme: {
        border: {
          default: "'c00103'"
        },
        background: {
          default: "'c00000'"
        }
      },
      css: {
        class: {
          borderNone: {
            1: true,
            2: true,
            3: true
          }
        }
      }
    },
    appMenu: '',
    appRightMenu: '',
    appPage: '',
    attrs: {},
    dataAttrs: {}
  }
}`,...Base.parameters?.docs?.source}}};let __namedExportsOrder=["Base"]}}]);
//# sourceMappingURL=storybook-ui-libs-components-organisms-app-page-with-menu-index-stories.6cb889df.iframe.bundle.js.map