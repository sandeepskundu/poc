"use strict";(self.webpackChunkirms=self.webpackChunkirms||[]).push([[7426],{"./src/storybook/ui-libs/components/atoms/0/list/header/index.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Base:()=>Base,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});let __WEBPACK_DEFAULT_EXPORT__={title:"Atoms/0/List/Header",component:__webpack_require__("./scrap/ui-libs/components/atoms/0/list/header/index.jsx").A,parameters:{layout:"centered",docs:{description:{component:"Tags (also known as “chips”) are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once.<br/><br /><strong>Import path:</strong><code>import Header from 'aio-global-ui/atoms/0/list/header';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/list/header/index</code><br/><br/>"}}},tags:["autodocs"],argTypes:{}};var Base={args:{callbacks:{onBlur:null,onClick:null,onFocus:null,onKeyUp:null,dsTheme:null,onKeyDown:null,onDragStart:null,onMouseDown:null,onPointerUp:null,onPointerDown:null,onPointerEnter:null,onPointerLeave:null,beforeRender:null},childs:{end:"",after:"",start:"",before:"",center:""},dsTheme:{end:{},after:{},start:{},before:{},center:{},wrapper:{}},config:{end:{},after:{},start:{},before:{},center:{},wrapper:{}},attrs:{},dataAttrs:{}}};Base.parameters={...Base.parameters,docs:{...Base.parameters?.docs,source:{originalSource:`{
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
      end: '',
      after: '',
      start: '',
      before: '',
      center: ''
    },
    dsTheme: {
      end: {},
      after: {},
      start: {},
      before: {},
      center: {},
      wrapper: {}
    },
    config: {
      end: {},
      after: {},
      start: {},
      before: {},
      center: {},
      wrapper: {}
    },
    attrs: {},
    dataAttrs: {}
  }
}`,...Base.parameters?.docs?.source}}};let __namedExportsOrder=["Base"]},"./scrap/ui-libs/components/atoms/0/list/header/index.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__),ui_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./build/scripts/ui-helpers/index.js"),aio_global_ui_atoms_0_list_item__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./scrap/ui-libs/components/atoms/0/list/item/index.jsx"),React=__webpack_require__("./node_modules/react/index.js");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable})),keys.push.apply(keys,symbols)}return keys}function _object_spread_props(target,source){return source=null!=source?source:{},Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}),target}var Comp=function Comp(dprops){var props=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.props.define({callbacks:{onBlur:null,onClick:null,onFocus:null,onKeyUp:null,dsTheme:null,onKeyDown:null,onDragStart:null,onMouseDown:null,onPointerUp:null,onPointerDown:null,onPointerEnter:null,onPointerLeave:null,beforeRender:null},childs:{end:"",after:"",start:"",before:"",center:""},dsTheme:{end:{},after:{},start:{},before:{},center:{},wrapper:{}},config:{end:{},after:{},start:{},before:{},center:{},wrapper:{}}},dprops),defaults=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.merge({dsTheme:{wrapper:{font__d__family:"sb",className:"item-header bdr-1 bxs"}},config:{center:{},wrapper:{}}},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(props,"defaults",{}));return React.createElement(aio_global_ui_atoms_0_list_item__WEBPACK_IMPORTED_MODULE_2__.A,_object_spread_props(_object_spread({},props),{defaults:defaults}))};Comp.propTypes={callbacks:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,childs:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,dsTheme:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,config:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object},Comp.defaultProps={callbacks:{onBlur:null,onClick:null,onFocus:null,onKeyUp:null,dsTheme:null,onKeyDown:null,onDragStart:null,onMouseDown:null,onPointerUp:null,onPointerDown:null,onPointerEnter:null,onPointerLeave:null,beforeRender:null},childs:{end:"",after:"",start:"",before:"",center:""},dsTheme:{end:{},after:{},start:{},before:{},center:{},wrapper:{}},config:{end:{},after:{},start:{},before:{},center:{},wrapper:{}}};let __WEBPACK_DEFAULT_EXPORT__=Comp;Comp.__docgenInfo={description:"",methods:[],displayName:"Comp",props:{callbacks:{defaultValue:{value:`{
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
	end:'',
	after:'',
	start:'',
	before:'',
	center:''
}`,computed:!1},description:"Childs content of list item",type:{name:"object"},required:!1},dsTheme:{defaultValue:{value:`{
	end:{

	},
	after:{

	},
	start:{

	},
	before:{

	},
	center:{

	},
	wrapper:{

	}
}`,computed:!1},description:"Predefined ds theme config",type:{name:"object"},required:!1},config:{defaultValue:{value:`{
	end:{

	},
	after:{

	},
	start:{

	},
	before:{

	},
	center:{

	},
	wrapper:{

	}
}`,computed:!1},description:"Ds theme",type:{name:"object"},required:!1}}}}}]);
//# sourceMappingURL=storybook-ui-libs-components-atoms-0-list-header-index-stories.c3cbf3f2.iframe.bundle.js.map