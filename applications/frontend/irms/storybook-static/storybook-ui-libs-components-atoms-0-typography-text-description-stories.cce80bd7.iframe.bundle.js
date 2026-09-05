"use strict";(self.webpackChunkirms=self.webpackChunkirms||[]).push([[9039],{"./src/storybook/ui-libs/components/atoms/0/typography/text/description.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Base:()=>Base,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});let __WEBPACK_DEFAULT_EXPORT__={title:"Atoms/0/Typography/Text/Description",component:__webpack_require__("./scrap/ui-libs/components/atoms/0/typography/text/description.jsx").A,parameters:{layout:"centered",docs:{description:{component:"Badges help highlight important information, such as notifications or new and unread messages. They’re primarily used for communicating secondary or additional information to text.<br/><br /><strong>Import path:</strong><code>import Description from 'aio-global-ui/atoms/0/typography/text/description';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/typography/text/description</code><br/><br/>"}}},tags:["autodocs"],argTypes:{}};var Base={args:{text:{content:"",markup:{element:"p"},ds:{css:{class:{fontsize:"lg"}}}},bindJsComponents:!0,wrapper:{markup:{element:"div"}},toggle:{lines:5,align:"al",enabled:!1,label:{more:"Read more",less:"Read less"},ds:{markup:{element:"span"}}},attrs:{},dataAttrs:{}}};Base.parameters={...Base.parameters,docs:{...Base.parameters?.docs,source:{originalSource:`{
  args: {
    text: {
      content: '',
      markup: {
        element: "p"
      },
      ds: {
        css: {
          class: {
            fontsize: "lg"
          }
        }
      }
    },
    bindJsComponents: true,
    wrapper: {
      markup: {
        element: "div"
      }
    },
    toggle: {
      lines: 5,
      align: "al",
      enabled: false,
      label: {
        more: "Read more",
        less: "Read less"
      },
      ds: {
        markup: {
          element: "span"
        }
      }
    },
    attrs: {},
    dataAttrs: {}
  }
}`,...Base.parameters?.docs?.source}}};let __namedExportsOrder=["Base"]},"./scrap/ui-libs/components/atoms/0/typography/text/description.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__),_index__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./scrap/ui-libs/components/atoms/0/typography/text/index.jsx"),ui_helpers__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./build/scripts/ui-helpers/index.js"),react__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/index.js"),react_dom_server__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react-dom/server.browser.js"),React=__webpack_require__("./node_modules/react/index.js");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}var Comp=function Comp(dprops){var id,line,align,srt,lbel,props=ui_helpers__WEBPACK_IMPORTED_MODULE_2__.element.jsx.props.define({text:{content:"",markup:{element:"p"},ds:{css:{class:{fontsize:"lg"}}}},bindJsComponents:!0,wrapper:{markup:{element:"div"}},toggle:{lines:5,align:"al",enabled:!1,label:{more:"Read more",less:"Read less"},ds:{markup:{element:"span"}}}},dprops);if(!ui_helpers__WEBPACK_IMPORTED_MODULE_2__.json.val(props,"toggle.enabled",!1))return React.createElement(_index__WEBPACK_IMPORTED_MODULE_1__.A,props.text);var elm=ui_helpers__WEBPACK_IMPORTED_MODULE_2__.json.val(props,"wrapper.markup.element","div");return(0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(elm,ui_helpers__WEBPACK_IMPORTED_MODULE_2__.element.jsx.attrs(props.wrapper||{},"rd-mor-lss full"),props.children?props.children:(id=ui_helpers__WEBPACK_IMPORTED_MODULE_2__.random.id(24),line=ui_helpers__WEBPACK_IMPORTED_MODULE_2__.json.val(props,"toggle.lines",2),align=ui_helpers__WEBPACK_IMPORTED_MODULE_2__.json.val(props,"toggle.align","al"),srt=react_dom_server__WEBPACK_IMPORTED_MODULE_4__.renderToStaticMarkup(React.createElement(_index__WEBPACK_IMPORTED_MODULE_1__.A,{text:_object_spread({},props.text)})),lbel=ui_helpers__WEBPACK_IMPORTED_MODULE_2__.element.jsx.attrs(props.toggle||{},"rd-mor-lss-lbl cp link-u"),React.createElement(React.Fragment,null,React.createElement("input",{type:"checkbox",className:"rd-mor-lss-chbx",id:id}),React.createElement("div",{dangerouslySetInnerHTML:{__html:srt},className:"rd-mor-lss-ctnt full lc-".concat(line),"data-comp":"readmore"}),React.createElement("div",{className:"full mr-t10 rd-mor-lbl-hldr ".concat(align),"data-nosnippet":!0},React.createElement("label",ui_helpers__WEBPACK_IMPORTED_MODULE_2__.json.merge(lbel,{htmlFor:id,"data-more-label":ui_helpers__WEBPACK_IMPORTED_MODULE_2__.json.val(props,"toggle.label.more"),"data-less-label":ui_helpers__WEBPACK_IMPORTED_MODULE_2__.json.val(props,"toggle.label.less")}))))))};Comp.propTypes={text:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,bindJsComponents:prop_types__WEBPACK_IMPORTED_MODULE_0___default().bool,wrapper:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,toggle:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object},Comp.defaultProps={text:{content:"",markup:{element:"p"},ds:{css:{class:{fontsize:"lg"}}}},bindJsComponents:!0,wrapper:{markup:{element:"div"}},toggle:{lines:5,align:"al",enabled:!1,label:{more:"Read more",less:"Read less"},ds:{markup:{element:"span"}}}};let __WEBPACK_DEFAULT_EXPORT__=Comp;Comp.__docgenInfo={description:"",methods:[],displayName:"Comp",props:{text:{defaultValue:{value:`{
	content:'',
	markup:{
		element:"p"
	},
	ds:{
		css:{
			class:{
				fontsize:"lg"
			}
		}
	}
}`,computed:!1},description:"Default text",type:{name:"object"},required:!1},bindJsComponents:{defaultValue:{value:"true",computed:!1},description:"Default text",type:{name:"bool"},required:!1},wrapper:{defaultValue:{value:`{
	markup:{
		element:"div"
	}
}`,computed:!1},description:"Default text",type:{name:"object"},required:!1},toggle:{defaultValue:{value:`{
	lines:5,
	align:"al",
	enabled:false,
	label:{
		more:"Read more",
		less:"Read less"
	},
	ds:{
		markup:{
			element:"span"
		}
	}
}`,computed:!1},description:"Default text",type:{name:"object"},required:!1}}}},"./scrap/ui-libs/components/atoms/0/typography/text/index.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__),ui_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./build/scripts/ui-helpers/index.js"),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/index.js"),Comp=function Comp(dprops){var props=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.props.define({text:{content:"",markup:{element:"p"},ds:{css:{class:{fontsize:"lg"}}}}},dprops);return ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.ds(props.text,react__WEBPACK_IMPORTED_MODULE_2__.createElement,props.children,"",props)};Comp.propTypes={text:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object},Comp.defaultProps={text:{content:"",markup:{element:"p"},ds:{css:{class:{fontsize:"lg"}}}}};let __WEBPACK_DEFAULT_EXPORT__=Comp}}]);
//# sourceMappingURL=storybook-ui-libs-components-atoms-0-typography-text-description-stories.cce80bd7.iframe.bundle.js.map