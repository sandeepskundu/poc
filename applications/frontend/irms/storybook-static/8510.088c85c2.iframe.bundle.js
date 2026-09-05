"use strict";(self.webpackChunkirms=self.webpackChunkirms||[]).push([[8510],{"./scrap/ui-libs/components/atoms/avatar/index.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__),ui_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./build/scripts/ui-helpers/index.js"),aio_global_ui_atoms_icon__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./scrap/ui-libs/components/atoms/icon/index.jsx"),aio_global_ui_atoms_indicator__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./scrap/ui-libs/components/atoms/indicator/index.jsx"),react__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/index.js");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}var Avatar=function Avatar(dprops){var rval,props=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.props.define({initals:"",contrastBorder:"",element:"div",size:"md",image:"",icon:{name:"da",color:"",family:"g"},ds:{theme:{colorPairing:{default:"000",hover:""},background:{default:"",hover:""},text:{default:"",hover:""},border:{default:"",hover:""}},css:{class:{shadow:"",radius:{1:6,2:6,3:6,4:6},padding:{1:"",2:"",3:"",4:""},margin:{1:"",2:"",3:"",4:""},border:"",family:"",fontsize:""},flags:{noBorder:!1,rounded:!0,disabled:!1,isDisplay:!0},others:""}}},dprops),imageClasses=function imageClasses(){return ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.css.byMap(props,"ctnt bxs flx-vc",{"css.flags.rounded":"ds","css.class.radius.1":"ds","css.class.radius.2":"ds","css.class.radius.3":"ds","css.class.radius.4":"ds","theme.colorPairing.default":"ds"})},iconContentClasses=function iconContentClasses(){var rval=[imageClasses()],iconMap={xs:"pd-4",sm:"pd-6",md:"pd-8",lg:"pd-10",xl:"pd-12",xxl:"pd-16"};return props.size&&iconMap[props.size]?rval.push(iconMap[props.size]):rval.push("pd-8"),rval.join(" ")},iconProps=function iconProps(){var iconMap={xs:16,sm:20,md:24,lg:28,xl:32,xxl:32},rv=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.css.getConfByMap(props,{name:"icon.name",color:"icon.color",family:"icon.family"});return props.size&&iconMap[props.size]?rv.size=iconMap[props.size]:rv.size=24,rv},initalsClasses=function initalsClasses(){var rval=["full"],map={xs:"txt-xs fm-sb",sm:"txt-sm fm-sb",md:"txt-md fm-sb",lg:"txt-lg fm-sb",xl:"txt-xl fm-sb",xxl:"dis-xs fm-sb"};return props.size&&map[props.size]?rval.push(map[props.size]):rval.push("txt-md fm-sb"),{className:rval.join(" ")}};return(0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)(props.element,_object_spread({},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(props),{className:(rval=["anim avatar","".concat(props.size),"flx-vc"],props.contrastBorder&&(rval.push("ctrst-bdr"),rval.push("bg-".concat(props.contrastBorder))),ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.css.byMap(props,rval.join(" "),{"css.others":"ds","css.class.shadow":"ds","css.flags.rounded":"ds","css.class.radius.1":"ds","css.class.radius.2":"ds","css.class.radius.3":"ds","css.class.radius.4":"ds"}))}),props.children?props.children:react__WEBPACK_IMPORTED_MODULE_4__.createElement(react__WEBPACK_IMPORTED_MODULE_4__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_4__.createElement("div",{className:"avt-hldr pr"},props.image?(0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("img",{src:props.image,className:imageClasses()}):props.initals?(0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div",{className:iconContentClasses()},(0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span",initalsClasses(),props.initals)):props.icon?(0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div",{className:iconContentClasses()},react__WEBPACK_IMPORTED_MODULE_4__.createElement(aio_global_ui_atoms_icon__WEBPACK_IMPORTED_MODULE_2__.A,{icon:iconProps()})):void 0,react__WEBPACK_IMPORTED_MODULE_4__.createElement("div",{className:"lyr hide"},react__WEBPACK_IMPORTED_MODULE_4__.createElement(aio_global_ui_atoms_indicator__WEBPACK_IMPORTED_MODULE_3__.A,null)))))};Avatar.propTypes={initals:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string,contrastBorder:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string,element:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string,size:prop_types__WEBPACK_IMPORTED_MODULE_0___default().oneOf(["xs","sm","md","lg","xl","xxl","p72","p96","p160"]),image:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string,icon:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,ds:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object},Avatar.defaultProps={initals:"",contrastBorder:"",element:"div",size:"md",image:"",icon:{name:"da",color:"",family:"g"},ds:{theme:{colorPairing:{default:"000",hover:""},background:{default:"",hover:""},text:{default:"",hover:""},border:{default:"",hover:""}},css:{class:{shadow:"",radius:{1:6,2:6,3:6,4:6},padding:{1:"",2:"",3:"",4:""},margin:{1:"",2:"",3:"",4:""},border:"",family:"",fontsize:""},flags:{noBorder:!1,rounded:!0,disabled:!1,isDisplay:!0},others:""}}};let __WEBPACK_DEFAULT_EXPORT__=Avatar;Avatar.__docgenInfo={description:"",methods:[],displayName:"Avatar",props:{initals:{defaultValue:{value:'""',computed:!1},description:"Html element like as button, link or span tag",type:{name:"string"},required:!1},contrastBorder:{defaultValue:{value:'""',computed:!1},description:"Html element like as button, link or span tag",type:{name:"string"},required:!1},element:{defaultValue:{value:'"div"',computed:!1},description:"Html element like as button, link or span tag",type:{name:"string"},required:!1},size:{defaultValue:{value:'"md"',computed:!1},description:"Button size can have any value from below optionsButton size can have any value from below optionsButton size can have any value from below optionsButton size can have any value from below optionsButton size can have any value from below options",type:{name:"enum",value:[{value:"'xs'",computed:!1},{value:"'sm'",computed:!1},{value:"'md'",computed:!1},{value:"'lg'",computed:!1},{value:"'xl'",computed:!1},{value:"'xxl'",computed:!1},{value:"'p72'",computed:!1},{value:"'p96'",computed:!1},{value:"'p160'",computed:!1}]},required:!1},image:{defaultValue:{value:'""',computed:!1},description:"Html element like as button, link or span tag",type:{name:"string"},required:!1},icon:{defaultValue:{value:`{
	name:"da",
	color:'',
	family:"g"
}`,computed:!1},description:"Icon configuration of avatar id inital or image is not availabel",type:{name:"object"},required:!1},ds:{defaultValue:{value:`{
	theme:{
		colorPairing:{
			default:"000",
			hover:''
		},
		background:{
			default:'',
			hover:''
		},
		text:{
			default:'',
			hover:''
		},
		border:{
			default:'',
			hover:''
		}
	},
	css:{
		class:{
			shadow:'',
			radius:{
				1:6,
				2:6,
				3:6,
				4:6
			},
			padding:{
				1:'',
				2:'',
				3:'',
				4:''
			},
			margin:{
				1:'',
				2:'',
				3:'',
				4:''
			},
			border:'',
			family:'',
			fontsize:''
		},
		flags:{
			noBorder:false,
			rounded:true,
			disabled:false,
			isDisplay:true
		},
		others:''
	}
}`,computed:!1},description:"round button",type:{name:"object"},required:!1}}}},"./scrap/ui-libs/components/atoms/icon/index.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__),ui_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./build/scripts/ui-helpers/index.js"),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/index.js");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}var Icon=function Icon(dprops){var rv,props=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.props.define({className:"",icon:{name:"tick",color:"",size:"16",family:"g"}},dprops);return(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span",_object_spread({},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(props,!1,"attrs"),{className:(rv=["flx-vc"],props.className&&rv.push(props.className),ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.css.icon.get(props,rv.join(" ")))}),"")};Icon.propTypes={className:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string,icon:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object},Icon.defaultProps={className:"",icon:{name:"tick",color:"",size:"16",family:"g"}};let __WEBPACK_DEFAULT_EXPORT__=Icon;Icon.__docgenInfo={description:"",methods:[],displayName:"Icon",props:{className:{defaultValue:{value:'""',computed:!1},description:"Html element like as button, link or span tag",type:{name:"string"},required:!1},icon:{defaultValue:{value:`{
	name:"tick",
	color:'',
	size:"16",
	family:"g"
}`,computed:!1},description:"Icons props like as name, family, size and color",type:{name:"object"},required:!1}}}},"./scrap/ui-libs/components/atoms/indicator/index.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__),ui_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./build/scripts/ui-helpers/index.js"),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/index.js");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}var Indicator=function Indicator(dprops){var contrast,rval,props=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.props.define({wrapperDs:{size:"md",element:"div",contrast:!1,theme:{background:{default:"c00506"}}},childDs:{element:"span"},image:""},dprops),size=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"wrapperDs.size","md"),childClass=function childClass(){return ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.css.get(props.childDs,"anim indi-bg bdr-round ns flx-vc")};return(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"wrapperDs.element","div"),_object_spread({},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(props,!1,"attrs"),{className:(contrast=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"wrapperDs.contrast"),rval=["anim indicator bdr-round ns flx-vc","".concat(size)],contrast&&(rval.push("ctrst-bdr"),rval.push("bg-".concat(contrast))),ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.css.get(props.wrapperDs,rval.join(" ")))}),props.image?(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("img",{src:props.image,className:childClass()}):(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"childDs.element","div"),{className:childClass()},react__WEBPACK_IMPORTED_MODULE_2__.createElement(react__WEBPACK_IMPORTED_MODULE_2__.Fragment,null," ")))};Indicator.propTypes={wrapperDs:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,childDs:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,image:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string},Indicator.defaultProps={wrapperDs:{size:"md",element:"div",contrast:!1,theme:{background:{default:"c00506"}}},childDs:{element:"span"},image:""};let __WEBPACK_DEFAULT_EXPORT__=Indicator;Indicator.__docgenInfo={description:"",methods:[],displayName:"Indicator",props:{wrapperDs:{defaultValue:{value:`{
	size:"md",
	element:"div",
	contrast:false,
	theme:{
		background:{
			default:"c00506"
		}
	}
}`,computed:!1},description:"round button",type:{name:"object"},required:!1},childDs:{defaultValue:{value:`{
	element:"span"
}`,computed:!1},description:"round button",type:{name:"object"},required:!1},image:{defaultValue:{value:'""',computed:!1},description:"Html element like as button, link or span tag",type:{name:"string"},required:!1}}}}}]);
//# sourceMappingURL=8510.088c85c2.iframe.bundle.js.map