"use strict";(self.webpackChunkirms=self.webpackChunkirms||[]).push([[1335],{"./src/storybook/ui-libs/components/molecules/link-list/index.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Base:()=>Base,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});var prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),ui_helpers=__webpack_require__("./build/scripts/ui-helpers/index.js"),atoms_divider=__webpack_require__("./scrap/ui-libs/components/atoms/divider/index.jsx"),text_label=__webpack_require__("./scrap/ui-libs/components/atoms/text-label/index.jsx"),react=__webpack_require__("./node_modules/react/index.js");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable})),keys.push.apply(keys,symbols)}return keys}function _object_spread_props(target,source){return source=null!=source?source:{},Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}),target}var LinkList=function LinkList(dprops){var props=ui_helpers.element.jsx.props.define({wrapperDs:{divider:{enabled:!0,position:"top",ds:{}}},linkDs:{label:"",leftIcon:{},rightIcon:{},divider:{enabled:!1,position:"bottom",ds:{}},attrs:{href:"#"},theme:{colorPairing:{hover:"005"}},css:{class:{padding:{1:10,2:10,3:10}},flags:{animation:"anim"}}},listOptions:""},dprops),id=ui_helpers.random.id(10),options=ui_helpers.json.val(props,"listOptions",[]),dlinkDs=ui_helpers.json.val(props,"linkDs",{}),ldivider=ui_helpers.json.val(props,"linkDs.divider",{}),wdivider=ui_helpers.json.val(props,"wrapperDs.divider",{}),divider=function divider(arg,pos){var enabled=ui_helpers.json.val(arg,"enabled"),position=ui_helpers.json.val(arg,"position");return enabled&&position&&position===pos?react.createElement(atoms_divider.A,{ds:ui_helpers.json.val(arg,"ds",{}),size:ui_helpers.json.val(arg,"size",1)}):react.createElement(react.Fragment,null)},linkDivProps=function linkDivProps(arg){var rvl=ui_helpers.json.merge(wdivider,ldivider),dds=ui_helpers.json.val(arg,"divider",{});return ui_helpers.json.merge(rvl,dds)},item=function item(arg){return react.createElement(text_label.A,_object_spread_props(_object_spread({},arg),{wrapperDs:(console.log(ui_helpers.json.merge(ui_helpers.json.merge(dlinkDs,arg),{element:"a"})),ui_helpers.json.merge(ui_helpers.json.merge(dlinkDs,arg),{element:"a"}))}))};return options.length>0?(0,react.createElement)(ui_helpers.json.val(props,"wrapperDs.element","div"),_object_spread({},ui_helpers.element.jsx.attrs(props,!1,"attrs"),{className:ui_helpers.element.jsx.css.get(props.wrapperDs,"full")}),react.createElement(react.Fragment,null,divider(wdivider,"top"),options.length>0?options.map(function(arg,i){var ldiv=linkDivProps(arg);return react.createElement("li",{className:"full",key:"".concat(id+i,"ll")},divider(ldiv,"top"),item(arg),divider(ldiv,"bottom"))}):react.createElement(react.Fragment,null),divider(wdivider,"bottom"))):react.createElement(react.Fragment,null)};LinkList.propTypes={wrapperDs:prop_types_default().object,linkDs:prop_types_default().object,listOptions:""},LinkList.defaultProps={wrapperDs:{divider:{enabled:!0,position:"top",ds:{}}},linkDs:{label:"",leftIcon:{},rightIcon:{},divider:{enabled:!1,position:"bottom",ds:{}},attrs:{href:"#"},theme:{colorPairing:{hover:"005"}},css:{class:{padding:{1:10,2:10,3:10}},flags:{animation:"anim"}}},listOptions:""},LinkList.__docgenInfo={description:"",methods:[],displayName:"LinkList",props:{wrapperDs:{defaultValue:{value:`{
	divider:{
		enabled:true,
		position:"top",
		ds:{

		}
	}
}`,computed:!1},description:"round button",type:{name:"object"},required:!1},linkDs:{defaultValue:{value:`{
	label:'',
	leftIcon:{

	},
	rightIcon:{

	},
	divider:{
		enabled:false,
		position:"bottom",
		ds:{

		}
	},
	attrs:{
		href:"#"
	},
	theme:{
		colorPairing:{
			hover:"005"
		}
	},
	css:{
		class:{
			padding:{
				1:10,
				2:10,
				3:10
			}
		},
		flags:{
			animation:"anim"
		}
	}
}`,computed:!1},description:"linkDs",type:{name:"object"},required:!1},listOptions:{defaultValue:{value:'""',computed:!1},description:"listOptions",type:{name:"custom",raw:'""'},required:!1}}};let index_stories={title:"Molecules/LinkList",component:LinkList,parameters:{layout:"centered",docs:{description:{component:"Link list<br/><br /><strong>Import path:</strong><code>import LinkList from 'aio-global-ui/molecules/link-list';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/molecules/link-list/index</code><br/><br/>"}}},tags:["autodocs"],argTypes:{}};var Base={args:{wrapperDs:{divider:{enabled:!0,position:"top",ds:{}}},linkDs:{label:"",leftIcon:{},rightIcon:{},divider:{enabled:!1,position:"bottom",ds:{}},attrs:{href:"#"},theme:{colorPairing:{hover:"005"}},css:{class:{padding:{1:10,2:10,3:10}},flags:{animation:"anim"}}},listOptions:[],attrs:{},dataAttrs:{}}};Base.parameters={...Base.parameters,docs:{...Base.parameters?.docs,source:{originalSource:`{
  args: {
    wrapperDs: {
      divider: {
        enabled: true,
        position: "top",
        ds: {}
      }
    },
    linkDs: {
      label: '',
      leftIcon: {},
      rightIcon: {},
      divider: {
        enabled: false,
        position: "bottom",
        ds: {}
      },
      attrs: {
        href: "#"
      },
      theme: {
        colorPairing: {
          hover: "005"
        }
      },
      css: {
        class: {
          padding: {
            1: 10,
            2: 10,
            3: 10
          }
        },
        flags: {
          animation: "anim"
        }
      }
    },
    listOptions: [],
    attrs: {},
    dataAttrs: {}
  }
}`,...Base.parameters?.docs?.source}}};let __namedExportsOrder=["Base"]},"./scrap/ui-libs/components/atoms/divider/index.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__),ui_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./build/scripts/ui-helpers/index.js"),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/index.js");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}var Divider=function Divider(dprops){var rval,props=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.props.define({element:"div",size:1,ds:{theme:{background:{default:"c00103"}},css:{class:{radius:{1:6}}}}},dprops);return(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(props.element,_object_spread({},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(props,!1,"attrs"),{className:(rval=["sep","sh-".concat(props.size)],ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.className(props,rval.join(" ")))}),"")};Divider.propTypes={element:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string,size:prop_types__WEBPACK_IMPORTED_MODULE_0___default().oneOf([1,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,128,160]),ds:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object},Divider.defaultProps={element:"div",size:1,ds:{theme:{background:{default:"c00103"}},css:{class:{radius:{1:6}}}}};let __WEBPACK_DEFAULT_EXPORT__=Divider;Divider.__docgenInfo={description:"",methods:[],displayName:"Divider",props:{element:{defaultValue:{value:'"div"',computed:!1},description:"Html element like as button, link or span tag",type:{name:"string"},required:!1},size:{defaultValue:{value:"1",computed:!1},description:"Height of divider in pixel",type:{name:"enum",value:[{value:"1",computed:!1},{value:"2",computed:!1},{value:"4",computed:!1},{value:"6",computed:!1},{value:"8",computed:!1},{value:"10",computed:!1},{value:"12",computed:!1},{value:"14",computed:!1},{value:"16",computed:!1},{value:"18",computed:!1},{value:"20",computed:!1},{value:"22",computed:!1},{value:"24",computed:!1},{value:"26",computed:!1},{value:"28",computed:!1},{value:"30",computed:!1},{value:"32",computed:!1},{value:"34",computed:!1},{value:"36",computed:!1},{value:"38",computed:!1},{value:"40",computed:!1},{value:"42",computed:!1},{value:"44",computed:!1},{value:"46",computed:!1},{value:"48",computed:!1},{value:"50",computed:!1},{value:"52",computed:!1},{value:"54",computed:!1},{value:"56",computed:!1},{value:"58",computed:!1},{value:"60",computed:!1},{value:"62",computed:!1},{value:"64",computed:!1},{value:"66",computed:!1},{value:"68",computed:!1},{value:"70",computed:!1},{value:"72",computed:!1},{value:"74",computed:!1},{value:"76",computed:!1},{value:"78",computed:!1},{value:"80",computed:!1},{value:"82",computed:!1},{value:"84",computed:!1},{value:"86",computed:!1},{value:"88",computed:!1},{value:"90",computed:!1},{value:"92",computed:!1},{value:"94",computed:!1},{value:"96",computed:!1},{value:"98",computed:!1},{value:"100",computed:!1},{value:"128",computed:!1},{value:"160",computed:!1}]},required:!1},ds:{defaultValue:{value:`{
	theme:{
		background:{
			default:"c00103"
		}
	},
	css:{
		class:{
			radius:{
				1:6
			}
		}
	}
}`,computed:!1},description:"round button",type:{name:"object"},required:!1}}}},"./scrap/ui-libs/components/atoms/icon/index.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__),ui_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./build/scripts/ui-helpers/index.js"),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/index.js");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}var Icon=function Icon(dprops){var rv,props=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.props.define({className:"",icon:{name:"tick",color:"",size:"16",family:"g"}},dprops);return(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span",_object_spread({},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(props,!1,"attrs"),{className:(rv=["flx-vc"],props.className&&rv.push(props.className),ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.css.icon.get(props,rv.join(" ")))}),"")};Icon.propTypes={className:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string,icon:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object},Icon.defaultProps={className:"",icon:{name:"tick",color:"",size:"16",family:"g"}};let __WEBPACK_DEFAULT_EXPORT__=Icon;Icon.__docgenInfo={description:"",methods:[],displayName:"Icon",props:{className:{defaultValue:{value:'""',computed:!1},description:"Html element like as button, link or span tag",type:{name:"string"},required:!1},icon:{defaultValue:{value:`{
	name:"tick",
	color:'',
	size:"16",
	family:"g"
}`,computed:!1},description:"Icons props like as name, family, size and color",type:{name:"object"},required:!1}}}},"./scrap/ui-libs/components/atoms/text-label/index.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__),ui_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./build/scripts/ui-helpers/index.js"),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/index.js"),aio_global_ui_atoms_icon__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./scrap/ui-libs/components/atoms/icon/index.jsx"),aio_global_ui_atoms_typography_text__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./scrap/ui-libs/components/atoms/typography/text/index.jsx");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}var TextLabel=function TextLabel(dprops){var props=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.props.define({label:"Button",wrapperDs:{element:"p"},moreLess:{},textDs:{css:{others:"",class:{margin:{1:0}}},attrs:{},dataAttrs:{}},leftIcon:{css:{class:{margin:{1:0,2:12,3:0,4:0}}}},rightIcon:{}},dprops),lico=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"leftIcon.name"),rico=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"rightIcon.name"),licoJsx=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"leftIconJsx"),ricoJsx=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"rightIconJsx"),iconJsx=function iconJsx(arg){switch(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.data.type.get(arg||"")){case"function":return arg(arg,props);case"string":return react__WEBPACK_IMPORTED_MODULE_2__.createElement(aio_global_ui_atoms_typography_text__WEBPACK_IMPORTED_MODULE_4__.A,{content:props.content,ds:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"contentDs",{}),moreLess:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"moreLess",{}),attrs:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"contentDs.attrs",{}),dataAttrs:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"contentDs.dataAttrs",{}),element:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"contentDs.element","div")});default:return arg||""}};switch(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.data.type.get(props.label||"")){case"function":return props.textLabel(props);case"string":return(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"wrapperDs.element"),_object_spread({},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(props,!1,"attrs"),{className:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.css.get(props.wrapperDs||{},"txt-lbl full flx-vc flx-sb bxs")}),react__WEBPACK_IMPORTED_MODULE_2__.createElement(react__WEBPACK_IMPORTED_MODULE_2__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_2__.createElement("div",{className:"flx-vc"},licoJsx?iconJsx(licoJsx):lico?react__WEBPACK_IMPORTED_MODULE_2__.createElement(aio_global_ui_atoms_icon__WEBPACK_IMPORTED_MODULE_3__.A,{icon:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"leftIcon",{})}):react__WEBPACK_IMPORTED_MODULE_2__.createElement(react__WEBPACK_IMPORTED_MODULE_2__.Fragment,null),react__WEBPACK_IMPORTED_MODULE_2__.createElement(aio_global_ui_atoms_typography_text__WEBPACK_IMPORTED_MODULE_4__.A,{content:props.label,element:props.labelElm,ds:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"textDs",{}),moreLess:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"moreLess",{}),attrs:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"textDs.attrs",{}),dataAttrs:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"textDs.dataAttrs",{})})),ricoJsx?iconJsx(ricoJsx):rico?react__WEBPACK_IMPORTED_MODULE_2__.createElement(aio_global_ui_atoms_icon__WEBPACK_IMPORTED_MODULE_3__.A,{icon:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"rightIcon",{})}):react__WEBPACK_IMPORTED_MODULE_2__.createElement(react__WEBPACK_IMPORTED_MODULE_2__.Fragment,null)));default:return props.label||""}};TextLabel.propTypes={label:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string,wrapperDs:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,moreLess:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,textDs:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,leftIcon:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,rightIcon:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object},TextLabel.defaultProps={label:"Button",wrapperDs:{element:"p"},moreLess:{},textDs:{css:{others:"",class:{margin:{1:0}}},attrs:{},dataAttrs:{}},leftIcon:{css:{class:{margin:{1:0,2:12,3:0,4:0}}}},rightIcon:{}};let __WEBPACK_DEFAULT_EXPORT__=TextLabel;TextLabel.__docgenInfo={description:"",methods:[],displayName:"TextLabel",props:{label:{defaultValue:{value:'"Button"',computed:!1},description:"Button label.",type:{name:"string"},required:!1},wrapperDs:{defaultValue:{value:`{
	element:"p"
}`,computed:!1},description:"Design system configuration of wrapper element",type:{name:"object"},required:!1},moreLess:{defaultValue:{value:`{

}`,computed:!1},description:"moreLess",type:{name:"object"},required:!1},textDs:{defaultValue:{value:`{
	css:{
		others:'',
		class:{
			margin:{
				1:0
			}
		}
	},
	attrs:{

	},
	dataAttrs:{

	}
}`,computed:!1},description:"round button",type:{name:"object"},required:!1},leftIcon:{defaultValue:{value:`{
	css:{
		class:{
			margin:{
				1:0,
				2:12,
				3:0,
				4:0
			}
		}
	}
}`,computed:!1},description:"Left icon space",type:{name:"object"},required:!1},rightIcon:{defaultValue:{value:`{

}`,computed:!1},description:"Left icon space",type:{name:"object"},required:!1}}}},"./scrap/ui-libs/components/atoms/typography/text/index.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__),ui_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./build/scripts/ui-helpers/index.js"),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/index.js");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}var Text=function Text(dprops){var id,moreLbl,lessLbl,lineClamp,alignLbl,props=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.props.define({content:"",element:"p",ds:{css:{class:{margin:{1:"16",2:"0",3:"0",4:"0"},family:"rg",fontsize:"md"},flags:{boxSizing:!0}}},moreLess:{lineClamp:5,enabled:!1,moreLabel:"Read more",lessLabel:"Read less",alignMoreOption:"al"}},dprops),moreLess=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"moreLess.enabled");return(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(moreLess?"div":props.element||"p",_object_spread({},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(props,!1,"attrs"),{className:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.className(props,moreLess?"rd-mor-lss full":"")}),props.children?props.children:moreLess?(id=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.random.id(24),moreLbl=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"moreLess.moreLabel"),lessLbl=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"moreLess.lessLabel"),lineClamp=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"moreLess.lineClamp"),alignLbl=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"moreLess.alignMoreOption"),react__WEBPACK_IMPORTED_MODULE_2__.createElement(react__WEBPACK_IMPORTED_MODULE_2__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_2__.createElement("input",{type:"checkbox",className:"rd-mor-lss-chbx",id:id}),react__WEBPACK_IMPORTED_MODULE_2__.createElement("div",{dangerouslySetInnerHTML:{__html:props.content||""},className:"rd-mor-lss-ctnt full lc-".concat(lineClamp)}),react__WEBPACK_IMPORTED_MODULE_2__.createElement("div",{className:"full mr-t10 rd-mor-lbl-hldr ".concat(alignLbl)},react__WEBPACK_IMPORTED_MODULE_2__.createElement("label",{className:"rd-mor-lss-lbl cp link-u",htmlFor:id,"data-more-label":moreLbl,"data-less-label":lessLbl}," ")))):props.content||"")};Text.propTypes={content:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string,element:prop_types__WEBPACK_IMPORTED_MODULE_0___default().oneOf(["h1","h2","h3","h4","h5","h6","p","span","strong","li"]),ds:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,moreLess:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object},Text.defaultProps={content:"",element:"p",ds:{css:{class:{margin:{1:"16",2:"0",3:"0",4:"0"},family:"rg",fontsize:"md"},flags:{boxSizing:!0}}},moreLess:{lineClamp:5,enabled:!1,moreLabel:"Read more",lessLabel:"Read less",alignMoreOption:"al"}};let __WEBPACK_DEFAULT_EXPORT__=Text;Text.__docgenInfo={description:"",methods:[],displayName:"Text",props:{content:{defaultValue:{value:'""',computed:!1},description:"Display content",type:{name:"string"},required:!1},element:{defaultValue:{value:'"p"',computed:!1},description:"Element name",type:{name:"enum",value:[{value:"'h1'",computed:!1},{value:"'h2'",computed:!1},{value:"'h3'",computed:!1},{value:"'h4'",computed:!1},{value:"'h5'",computed:!1},{value:"'h6'",computed:!1},{value:"'p'",computed:!1},{value:"'span'",computed:!1},{value:"'strong'",computed:!1},{value:"'li'",computed:!1}]},required:!1},ds:{defaultValue:{value:`{
	css:{
		class:{
			margin:{
				1:"16",
				2:"0",
				3:"0",
				4:"0"
			},
			family:"rg",
			fontsize:"md"
		},
		flags:{
			boxSizing:true
		}
	}
}`,computed:!1},description:"round button",type:{name:"object"},required:!1},moreLess:{defaultValue:{value:`{
	lineClamp:5,
	enabled:false,
	moreLabel:"Read more",
	lessLabel:"Read less",
	alignMoreOption:"al"
}`,computed:!1},description:"moreLess",type:{name:"object"},required:!1}}}}}]);
//# sourceMappingURL=storybook-ui-libs-components-molecules-link-list-index-stories.599d1a1a.iframe.bundle.js.map