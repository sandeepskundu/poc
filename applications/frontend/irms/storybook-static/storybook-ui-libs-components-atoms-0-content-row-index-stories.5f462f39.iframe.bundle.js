"use strict";(self.webpackChunkirms=self.webpackChunkirms||[]).push([[2232],{"./src/storybook/ui-libs/components/atoms/0/content-row/index.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Base:()=>Base,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});let __WEBPACK_DEFAULT_EXPORT__={title:"Atoms/0/ContentRow",component:__webpack_require__("./scrap/ui-libs/components/atoms/0/content-row/index.jsx").A,parameters:{layout:"centered",docs:{description:{component:"Tags (also known as “chips”) are compact elements that allow users to enter information, make selections, filter center, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once.<br/><br /><strong>Import path:</strong><code>import ContentRow from 'aio-global-ui/atoms/0/content-row';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/content-row/index</code><br/><br/>"}}},tags:["autodocs"],argTypes:{}};var Base={args:{callbacks:{onBlur:null,onClick:null,onFocus:null,onKeyUp:null,dsTheme:null,onKeyDown:null,onDragStart:null,onMouseDown:null,onPointerUp:null,onPointerDown:null,onPointerEnter:null,onPointerLeave:null,beforeRender:null},childs:{start:"",before:"",after:"",end:"",center:""},dsTheme:{wrapper:{color:"",className:"",background:"",font__d__size:""},center:{background:""},start:{background:""},before:{background:""},after:{background:""},end:{background:""}},config:{wrapper:{markup:{element:"div"}},center:{markup:{element:"div"}},start:{markup:{element:"div"}},before:{markup:{element:"div"}},after:{markup:{element:"div"}},end:{markup:{element:"div"}}},attrs:{},dataAttrs:{}}};Base.parameters={...Base.parameters,docs:{...Base.parameters?.docs,source:{originalSource:`{
  args: {
    callbacks: {
      onBlur: null,
      onClick: null,
      onFocus: null,
      onKeyUp: null,
      dsTheme: null,
      onKeyDown: null,
      onDragStart: null,
      onMouseDown: null,
      onPointerUp: null,
      onPointerDown: null,
      onPointerEnter: null,
      onPointerLeave: null,
      beforeRender: null
    },
    childs: {
      start: '',
      before: '',
      after: '',
      end: '',
      center: ''
    },
    dsTheme: {
      wrapper: {
        color: '',
        className: '',
        background: '',
        font__d__size: ''
      },
      center: {
        background: ''
      },
      start: {
        background: ''
      },
      before: {
        background: ''
      },
      after: {
        background: ''
      },
      end: {
        background: ''
      }
    },
    config: {
      wrapper: {
        markup: {
          element: "div"
        }
      },
      center: {
        markup: {
          element: "div"
        }
      },
      start: {
        markup: {
          element: "div"
        }
      },
      before: {
        markup: {
          element: "div"
        }
      },
      after: {
        markup: {
          element: "div"
        }
      },
      end: {
        markup: {
          element: "div"
        }
      }
    },
    attrs: {},
    dataAttrs: {}
  }
}`,...Base.parameters?.docs?.source}}};let __namedExportsOrder=["Base"]},"./scrap/ui-libs/components/atoms/0/content-row/index.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__),ui_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./build/scripts/ui-helpers/index.js"),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/index.js"),React=__webpack_require__("./node_modules/react/index.js");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}var Comp=(0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(function(dprops,ref){ref||(0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);var prop,start,before,after,end,id=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.random.uuid(),props=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.props.define({callbacks:{onBlur:null,onClick:null,onFocus:null,onKeyUp:null,dsTheme:null,onKeyDown:null,onDragStart:null,onMouseDown:null,onPointerUp:null,onPointerDown:null,onPointerEnter:null,onPointerLeave:null,beforeRender:null},childs:{start:"",before:"",after:"",end:"",center:""},dsTheme:{wrapper:{color:"",className:"",background:"",font__d__size:""},center:{background:""},start:{background:""},before:{background:""},after:{background:""},end:{background:""}},config:{wrapper:{markup:{element:"div"}},center:{markup:{element:"div"}},start:{markup:{element:"div"}},before:{markup:{element:"div"}},after:{markup:{element:"div"}},end:{markup:{element:"div"}}}},dprops),callback=function callback(e,type,elm){var cb=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(props,"callbacks.".concat(type));ui_helpers__WEBPACK_IMPORTED_MODULE_1__.data.type.is(cb,"function")&&cb(e,props)},dsTheme=function dsTheme(prop,type){var cb=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(prop,"callbacks.dsTheme",null),isfun=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.data.type.is(cb,"function"),dds=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.merge(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(prop,"config.".concat(type),{}),{ds:{predefined:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(prop,"dsTheme.".concat(type),{})}});return isfun?cb(dds,type,prop):dds},content=function content(prop,type,childs){return ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.getChild({content:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(prop,"childs.".concat(type),"")},react__WEBPACK_IMPORTED_MODULE_2__.createElement,childs,prop)},getChild=function getChild(prop,type){return ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(prop,"childs.".concat(type),"")?(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(prop,"config.".concat(type,".markup.element"),"div"),ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(dsTheme(prop,type),"anim ctnt-row-".concat(type)),content(prop,type)):React.createElement(React.Fragment,null)},center=function center(prop){return(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(prop,"config.center.markup.element","div"),ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(dsTheme(prop,"center"),"flx-full anim ctnt-row-center"),content(prop,"center",prop.children))},prop1=function beforeRender(){var prop=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.copy(props),beforeRender=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(props,"callbacks.beforeRender",null);if(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.data.type.is(beforeRender,"function")){var rv=beforeRender(prop);rv&&(prop=rv)}return prop}(),ctnt=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(prop1,"childs.center",id);if(ctnt&&ctnt!=id||prop1.children){return(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(prop1,"config.wrapper.markup.element","div"),_object_spread({},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(dsTheme(prop1,"wrapper"),"flx-d anim"),{onClick:function onClick(e){return callback(e,"onClick")}}),(prop=prop1,start=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(prop,"childs.start",id),before=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(prop,"childs.before",id),after=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(prop,"childs.after",id),end=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(prop,"childs.end",id),(start&&start!=id||before&&before!=id||after&&after!=id||end&&end!=id)&&!props.children)?React.createElement(React.Fragment,null,getChild(prop1,"start"),getChild(prop1,"before"),center(prop1),getChild(prop1,"after"),getChild(prop1,"end")):center(prop1))}return React.createElement(React.Fragment,null)});Comp.propTypes={callbacks:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,childs:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,dsTheme:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,config:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object},Comp.defaultProps={callbacks:{onBlur:null,onClick:null,onFocus:null,onKeyUp:null,dsTheme:null,onKeyDown:null,onDragStart:null,onMouseDown:null,onPointerUp:null,onPointerDown:null,onPointerEnter:null,onPointerLeave:null,beforeRender:null},childs:{start:"",before:"",after:"",end:"",center:""},dsTheme:{wrapper:{color:"",className:"",background:"",font__d__size:""},center:{background:""},start:{background:""},before:{background:""},after:{background:""},end:{background:""}},config:{wrapper:{markup:{element:"div"}},center:{markup:{element:"div"}},start:{markup:{element:"div"}},before:{markup:{element:"div"}},after:{markup:{element:"div"}},end:{markup:{element:"div"}}}};let __WEBPACK_DEFAULT_EXPORT__=Comp;Comp.__docgenInfo={description:"",methods:[],displayName:"Comp",props:{callbacks:{defaultValue:{value:`{
	onBlur:null,
	onClick:null,
	onFocus:null,
	onKeyUp:null,
	dsTheme:null,
	onKeyDown:null,
	onDragStart:null,
	onMouseDown:null,
	onPointerUp:null,
	onPointerDown:null,
	onPointerEnter:null,
	onPointerLeave:null,
	beforeRender:null
}`,computed:!1},description:"Callback methods",type:{name:"object"},required:!1},childs:{defaultValue:{value:`{
	start:'',
	before:'',
	after:'',
	end:'',
	center:''
}`,computed:!1},description:"Ds theme",type:{name:"object"},required:!1},dsTheme:{defaultValue:{value:`{
	wrapper:{
		color:'',
		className:'',
		background:'',
		font__d__size:''
	},
	center:{
		background:''
	},
	start:{
		background:''
	},
	before:{
		background:''
	},
	after:{
		background:''
	},
	end:{
		background:''
	}
}`,computed:!1},description:"Ds theme",type:{name:"object"},required:!1},config:{defaultValue:{value:`{
	wrapper:{
		markup:{
			element:"div"
		}
	},
	center:{
		markup:{
			element:"div"
		}
	},
	start:{
		markup:{
			element:"div"
		}
	},
	before:{
		markup:{
			element:"div"
		}
	},
	after:{
		markup:{
			element:"div"
		}
	},
	end:{
		markup:{
			element:"div"
		}
	}
}`,computed:!1},description:"Ds theme",type:{name:"object"},required:!1}}}}}]);
//# sourceMappingURL=storybook-ui-libs-components-atoms-0-content-row-index-stories.5f462f39.iframe.bundle.js.map