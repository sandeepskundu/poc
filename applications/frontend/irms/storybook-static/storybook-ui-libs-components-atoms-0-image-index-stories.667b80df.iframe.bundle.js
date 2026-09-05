"use strict";(self.webpackChunkirms=self.webpackChunkirms||[]).push([[2427],{"./src/storybook/ui-libs/components/atoms/0/image/index.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Base:()=>Base,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});let __WEBPACK_DEFAULT_EXPORT__={title:"Atoms/0/Image",component:__webpack_require__("./scrap/ui-libs/components/atoms/0/image/index.jsx").A,parameters:{layout:"centered",docs:{description:{component:"Tags (also known as “chips”) are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once.<br/><br /><strong>Import path:</strong><code>import Image from 'aio-global-ui/atoms/0/image';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/image/index</code><br/><br/>"}}},tags:["autodocs"],argTypes:{}};var Base={args:{src:"''",wrap:!1,dsTheme:{image__d__thumbnail:"28"},wrapperDsTheme:{radius:"round"},config:{wrapper:{markup:{element:"div"},attrs:{},ds:{css:{},theme:{}}},image:{attrs:{},ds:{css:{},theme:{}}}},attrs:{},dataAttrs:{}}};Base.parameters={...Base.parameters,docs:{...Base.parameters?.docs,source:{originalSource:`{
  args: {
    src: "''",
    wrap: false,
    dsTheme: {
      image__d__thumbnail: "28"
    },
    wrapperDsTheme: {
      radius: "round"
    },
    config: {
      wrapper: {
        markup: {
          element: "div"
        },
        attrs: {},
        ds: {
          css: {},
          theme: {}
        }
      },
      image: {
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
}`,...Base.parameters?.docs?.source}}};let __namedExportsOrder=["Base"]},"./scrap/ui-libs/components/atoms/0/image/index.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__),ui_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./build/scripts/ui-helpers/index.js"),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/index.js"),React=__webpack_require__("./node_modules/react/index.js"),Comp=function Comp(dprops){var Elm,props=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.props.define({wrap:!1,dsTheme:{image__d__thumbnail:"28"},wrapperDsTheme:{radius:"round"},config:{wrapper:{markup:{element:"div"},attrs:{},ds:{css:{},theme:{}}},image:{attrs:{},ds:{css:{},theme:{}}}}},dprops),imgConfig=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.getCompThemeDs(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.merge(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(props,"config.image",{}),{ds:{predefined:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.merge({image__d__thumbnail:24},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(props,"dsTheme",{}))},attrs:{src:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(props,"src","")}}),"element"),wrprConfig=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.getCompThemeDs(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.merge(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(props,"config.wrapper",{}),{ds:{predefined:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.merge(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(props,"wrapperDsTheme",{}),{image__d__thumbnail:null,radius:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(props,"dsTheme.radius","")})}}),"element"),attrs=function attrs(){var attrs=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(imgConfig,"resp-img");return attrs.alt=attrs.alt||" ",attrs},img=function img(){return ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(props,"src","")?(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("img",attrs()):React.createElement(React.Fragment,null)},src=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(props,"src",""),wrap=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(props,"wrap","");if(src)if(!wrap)return img();else{return Elm=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(props,"config.wrapper.markup.element","div"),React.createElement(Elm,ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(wrprConfig,"bxs flx-vc anim"),img())}return React.createElement(React.Fragment,null)};Comp.propTypes={src:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string.isRequired,wrap:prop_types__WEBPACK_IMPORTED_MODULE_0___default().bool,dsTheme:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,wrapperDsTheme:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,config:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object},Comp.defaultProps={wrap:!1,dsTheme:{image__d__thumbnail:"28"},wrapperDsTheme:{radius:"round"},config:{wrapper:{markup:{element:"div"},attrs:{},ds:{css:{},theme:{}}},image:{attrs:{},ds:{css:{},theme:{}}}}};let __WEBPACK_DEFAULT_EXPORT__=Comp;Comp.__docgenInfo={description:"",methods:[],displayName:"Comp",props:{wrap:{defaultValue:{value:"false",computed:!1},description:"Callback functions",type:{name:"bool"},required:!1},dsTheme:{defaultValue:{value:`{
	image__d__thumbnail:"28"
}`,computed:!1},description:"Callback functions",type:{name:"object"},required:!1},wrapperDsTheme:{defaultValue:{value:`{
	radius:"round"
}`,computed:!1},description:"Callback functions",type:{name:"object"},required:!1},config:{defaultValue:{value:`{
	wrapper:{
		markup:{
			element:"div"
		},
		attrs:{

		},
		ds:{
			css:{

			},
			theme:{

			}
		}
	},
	image:{
		attrs:{

		},
		ds:{
			css:{

			},
			theme:{

			}
		}
	}
}`,computed:!1},description:"Callback functions",type:{name:"object"},required:!1},src:{description:"Callback functions",type:{name:"string"},required:!0}}}}}]);
//# sourceMappingURL=storybook-ui-libs-components-atoms-0-image-index-stories.667b80df.iframe.bundle.js.map