"use strict";(self.webpackChunkirms=self.webpackChunkirms||[]).push([[9699],{"./src/storybook/ui-libs/components/molecules/avatar-with-details/index.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Base:()=>Base,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});var prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),ui_helpers=__webpack_require__("./build/scripts/ui-helpers/index.js"),avatar=__webpack_require__("./scrap/ui-libs/components/atoms/avatar/index.jsx"),layer_holder=__webpack_require__("./scrap/ui-libs/components/atoms/layer-holder/index.jsx"),title_with_description=__webpack_require__("./scrap/ui-libs/components/molecules/title-with-description/index.jsx"),react=__webpack_require__("./node_modules/react/index.js");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable})),keys.push.apply(keys,symbols)}return keys}function _object_spread_props(target,source){return source=null!=source?source:{},Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}),target}var AvatarWithDetails=function AvatarWithDetails(dprops){var props=ui_helpers.element.jsx.props.define({title:"",description:"",titleDs:{theme:{color:{default:"c00108"}},css:{class:{fontsize:"sm",family:"sb"},flags:{isDisplay:!1}}},contentDs:{css:{class:{padding:{1:0,2:0,3:0,4:12}}}},descriptionDs:{css:{class:{fontsize:"sm",margin:{1:0}}}},descriptionMoreLess:{},layerDs:{size:40,align:"tl",element:"div"},avatarDs:{icon:"",size:"md",initals:"",contrastBorder:"",image:"http://localhost:1300/cdn/statics/images/avatar.jpg"}},dprops);return react.createElement(react.Fragment,null,react.createElement(layer_holder.A,{attrs:props.attrs||{},dataAttrs:props.dataAttrs||{},layerDs:ui_helpers.json.val(props,"layerDs",{}),contentDs:ui_helpers.json.val(props,"contentDs",{}),layer:react.createElement(avatar.A,_object_spread_props(_object_spread({},ui_helpers.json.val(props,"avatarDs",{})),{ds:ui_helpers.json.val(props,"avatarDs",{})})),content:react.createElement(title_with_description.A,{title:props.title||"",description:props.description||"",titleDs:ui_helpers.json.val(props,"titleDs",{}),descriptionDs:ui_helpers.json.val(props,"descriptionDs",{}),descriptionMoreLess:ui_helpers.json.val(props,"descriptionMoreLess",{})})}))};AvatarWithDetails.propTypes={title:prop_types_default().string,description:prop_types_default().string,titleDs:prop_types_default().object,contentDs:prop_types_default().object,descriptionDs:prop_types_default().object,descriptionMoreLess:prop_types_default().object,layerDs:prop_types_default().object,avatarDs:prop_types_default().object},AvatarWithDetails.defaultProps={title:"",description:"",titleDs:{theme:{color:{default:"c00108"}},css:{class:{fontsize:"sm",family:"sb"},flags:{isDisplay:!1}}},contentDs:{css:{class:{padding:{1:0,2:0,3:0,4:12}}}},descriptionDs:{css:{class:{fontsize:"sm",margin:{1:0}}}},descriptionMoreLess:{},layerDs:{size:40,align:"tl",element:"div"},avatarDs:{icon:"",size:"md",initals:"",contrastBorder:"",image:"http://localhost:1300/cdn/statics/images/avatar.jpg"}},AvatarWithDetails.__docgenInfo={description:"",methods:[],displayName:"AvatarWithDetails",props:{title:{defaultValue:{value:'""',computed:!1},description:"round button",type:{name:"string"},required:!1},description:{defaultValue:{value:'""',computed:!1},description:"round button",type:{name:"string"},required:!1},titleDs:{defaultValue:{value:`{
	theme:{
		color:{
			default:"c00108"
		}
	},
	css:{
		class:{
			fontsize:"sm",
			family:"sb"
		},
		flags:{
			isDisplay:false
		}
	}
}`,computed:!1},description:"round button",type:{name:"object"},required:!1},contentDs:{defaultValue:{value:`{
	css:{
		class:{
			padding:{
				1:0,
				2:0,
				3:0,
				4:12
			}
		}
	}
}`,computed:!1},description:"round button",type:{name:"object"},required:!1},descriptionDs:{defaultValue:{value:`{
	css:{
		class:{
			fontsize:"sm",
			margin:{
				1:0
			}
		}
	}
}`,computed:!1},description:"round button",type:{name:"object"},required:!1},descriptionMoreLess:{defaultValue:{value:`{

}`,computed:!1},description:"descriptionMoreLess",type:{name:"object"},required:!1},layerDs:{defaultValue:{value:`{
	size:40,
	align:"tl",
	element:"div"
}`,computed:!1},description:"round button",type:{name:"object"},required:!1},avatarDs:{defaultValue:{value:`{
	icon:'',
	size:"md",
	initals:'',
	contrastBorder:'',
	image:"http://localhost:1300/cdn/statics/images/avatar.jpg"
}`,computed:!1},description:"round button",type:{name:"object"},required:!1}}};let index_stories={title:"Molecules/AvatarWithDetails",component:AvatarWithDetails,parameters:{layout:"centered",docs:{description:{component:"Tags (also known as “chips”) are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once.<br/><br /><strong>Import path:</strong><code>import AvatarWithDetails from 'aio-global-ui/molecules/avatar-with-details';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/molecules/avatar-with-details/index</code><br/><br/>"}}},tags:["autodocs"],argTypes:{}};var Base={args:{title:"",description:"",titleDs:{theme:{color:{default:"c00108"}},css:{class:{fontsize:"sm",family:"sb"},flags:{isDisplay:!1}}},contentDs:{css:{class:{padding:{1:0,2:0,3:0,4:12}}}},descriptionDs:{css:{class:{fontsize:"sm",margin:{1:0}}}},descriptionMoreLess:{},layerDs:{size:40,align:"tl",element:"div"},avatarDs:{icon:"",size:"md",initals:"",contrastBorder:"",image:"http://localhost:1300/cdn/statics/images/avatar.jpg"},attrs:{},dataAttrs:{}}};Base.parameters={...Base.parameters,docs:{...Base.parameters?.docs,source:{originalSource:`{
  args: {
    title: '',
    description: '',
    titleDs: {
      theme: {
        color: {
          default: "c00108"
        }
      },
      css: {
        class: {
          fontsize: "sm",
          family: "sb"
        },
        flags: {
          isDisplay: false
        }
      }
    },
    contentDs: {
      css: {
        class: {
          padding: {
            1: 0,
            2: 0,
            3: 0,
            4: 12
          }
        }
      }
    },
    descriptionDs: {
      css: {
        class: {
          fontsize: "sm",
          margin: {
            1: 0
          }
        }
      }
    },
    descriptionMoreLess: {},
    layerDs: {
      size: 40,
      align: "tl",
      element: "div"
    },
    avatarDs: {
      icon: '',
      size: "md",
      initals: '',
      contrastBorder: '',
      image: "http://localhost:1300/cdn/statics/images/avatar.jpg"
    },
    attrs: {},
    dataAttrs: {}
  }
}`,...Base.parameters?.docs?.source}}};let __namedExportsOrder=["Base"]},"./scrap/ui-libs/components/atoms/layer-holder/index.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__),ui_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./build/scripts/ui-helpers/index.js"),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/index.js"),aio_global_ui_atoms_typography_text__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./scrap/ui-libs/components/atoms/typography/text/index.jsx");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}var LayerHolder=function LayerHolder(dprops){var aln,map,props=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.props.define({wrapperDs:{element:"div"},layerDs:{size:20,align:"c",attrs:{},element:"div",dataAttrs:{},minHeightAndWidth:{width:0,height:0}},contentDs:{attrs:{},dataAttrs:{},element:"div"},moreLess:{},content:"",layerMinHeightAndWidth:{width:0,height:0},layer:""},dprops),lsize=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"layerDs.size",20),lAln=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"layerDs.align","c"),lElm=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"layerDs.element","div"),wrpElm=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"wrapperDs.element","div"),minHeightAndWidth=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"layerDs.minHeightAndWidth"),minHightAndWdth=function minHightAndWdth(lyr){if(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.data.type.is(minHeightAndWidth,"object")&&(minHeightAndWidth.height||minHeightAndWidth.width)){var rv=[];if(lyr?(minHeightAndWidth.height&&rv.push("lyr-ho-".concat(minHeightAndWidth.height)),minHeightAndWidth.width&&rv.push("lyr-wo-".concat(minHeightAndWidth.width))):(minHeightAndWidth.height&&rv.push("lyr-mho-".concat(minHeightAndWidth.height)),minHeightAndWidth.width&&rv.push("lyr-mwo-".concat(minHeightAndWidth.width))),rv.length)return rv.join(" ")}return lyr?"lyr-".concat(lsize):"lyr-mh-".concat(lsize)};return(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(wrpElm,_object_spread({},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(props,!1,"attrs"),{className:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.css.get(props.wrapperDs,"bdr-1")}),react__WEBPACK_IMPORTED_MODULE_2__.createElement("div",{className:"bxs pr full ".concat((aln="aln-".concat(lAln),(map={"aln-c":"","aln-tl":"pd-l__SIZE__","aln-tlcc ":"pd-l__SIZE__","aln-tlc":"pd-l__SIZE__","aln-tlo":"pd-t__SIZE__","aln-tc":"pd-t__SIZE__","aln-tcc":"pd-t__SIZE__","aln-tco":"pd-t__SIZE__","aln-tr":"pd-r__SIZE__","aln-trcc":"pd-r__SIZE__","aln-trc":"pd-r__SIZE__","aln-tro":"pd-r__SIZE__","aln-rtc":"pd-r__SIZE__","aln-rto":"pd-r__SIZE__","aln-rc":"pd-r__SIZE__","aln-rcc":"pd-r__SIZE__","aln-rco":"pd-r__SIZE__","aln-rb":"pd-r__SIZE__","aln-rbc":"pd-r__SIZE__","aln-rbo":"pd-r__SIZE__","aln-rbcc":"pd-r__SIZE__","aln-brc":"pd-b__SIZE__","aln-bro":"pd-b__SIZE__","aln-bc":"pd-b__SIZE__","aln-bcc":"pd-b__SIZE__","aln-bco":"pd-b__SIZE__","aln-bl":"pd-b__SIZE__","aln-blc":"pd-b__SIZE__","aln-blcc":"pd-b__SIZE__","aln-blo":"pd-b__SIZE__","aln-lbc":"pd-l__SIZE__","aln-lbo":"pd-l__SIZE__","aln-lc":"pd-l__SIZE__","aln-lcc":"pd-l__SIZE__","aln-lco":"pd-l__SIZE__","aln-ltc":"pd-l__SIZE__","aln-lto":"pd-l__SIZE__"},aln&&map[aln])?map[aln].replaceAll(/__SIZE__/g,lsize):"")," ").concat(minHightAndWdth())},(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(lElm,_object_spread({},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(props.layerDs,!1,"attrs"),{className:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.css.get(props.layerDs,["lyr","aln-".concat(lAln),"".concat(minHightAndWdth(!0))].join(" "))}),"function"===ui_helpers__WEBPACK_IMPORTED_MODULE_1__.data.type.get(props.layer||"")?props.layer(props):props.layer||""),props.content?(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(props.contentWrapperElement||"div",_object_spread({},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(props.contentDs,!1,"attrs"),{className:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.css.get(props.contentDs,"full bxs")}),function contentChilds(){switch(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.data.type.get(props.content||"")){case"function":return props.content(props);case"string":return react__WEBPACK_IMPORTED_MODULE_2__.createElement(aio_global_ui_atoms_typography_text__WEBPACK_IMPORTED_MODULE_3__.A,{content:props.content,ds:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"contentDs",{}),moreLess:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"moreLess",{}),attrs:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"contentDs.attrs",{}),dataAttrs:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"contentDs.dataAttrs",{}),element:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"contentDs.element","div")});default:return props.content||""}}()):react__WEBPACK_IMPORTED_MODULE_2__.createElement(react__WEBPACK_IMPORTED_MODULE_2__.Fragment,null)))};LayerHolder.propTypes={wrapperDs:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,layerDs:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,contentDs:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,moreLess:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,content:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string,layerMinHeightAndWidth:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,layer:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string},LayerHolder.defaultProps={wrapperDs:{element:"div"},layerDs:{size:20,align:"c",attrs:{},element:"div",dataAttrs:{},minHeightAndWidth:{width:0,height:0}},contentDs:{attrs:{},dataAttrs:{},element:"div"},moreLess:{},content:"",layerMinHeightAndWidth:{width:0,height:0},layer:""};let __WEBPACK_DEFAULT_EXPORT__=LayerHolder;LayerHolder.__docgenInfo={description:"",methods:[],displayName:"LayerHolder",props:{wrapperDs:{defaultValue:{value:`{
	element:"div"
}`,computed:!1},description:"round button",type:{name:"object"},required:!1},layerDs:{defaultValue:{value:`{
	size:20,
	align:"c",
	attrs:{

	},
	element:"div",
	dataAttrs:{

	},
	minHeightAndWidth:{
		width:0,
		height:0
	}
}`,computed:!1},description:"round button",type:{name:"object"},required:!1},contentDs:{defaultValue:{value:`{
	attrs:{

	},
	dataAttrs:{

	},
	element:"div"
}`,computed:!1},description:"round button",type:{name:"object"},required:!1},moreLess:{defaultValue:{value:`{

}`,computed:!1},description:"moreLess",type:{name:"object"},required:!1},content:{defaultValue:{value:'""',computed:!1},description:"CSS class name of HTML element of layer",type:{name:"string"},required:!1},layerMinHeightAndWidth:{defaultValue:{value:`{
	width:0,
	height:0
}`,computed:!1},description:"Custmized Minimum height and width of layer",type:{name:"object"},required:!1},layer:{defaultValue:{value:'""',computed:!1},description:"CSS class name of HTML element of layer",type:{name:"string"},required:!1}}}},"./scrap/ui-libs/components/atoms/typography/display/index.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__),ui_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./build/scripts/ui-helpers/index.js"),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/index.js");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}var Display=function Display(dprops){var props=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.props.define({content:"",element:"p",ds:{css:{class:{family:"rg",fontsize:"md"},flags:{isDisplay:!0}}}},dprops);return(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(props.element,_object_spread({},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(props,!1,"attrs"),{className:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.className(props,"")}),props.children||props.content||"")};Display.propTypes={content:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string,element:prop_types__WEBPACK_IMPORTED_MODULE_0___default().oneOf(["h1","h2","h3","h4","h5","h6","p","span","strong"]),ds:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object},Display.defaultProps={content:"",element:"p",ds:{css:{class:{family:"rg",fontsize:"md"},flags:{isDisplay:!0}}}};let __WEBPACK_DEFAULT_EXPORT__=Display;Display.__docgenInfo={description:"",methods:[],displayName:"Display",props:{content:{defaultValue:{value:'""',computed:!1},description:"Display content",type:{name:"string"},required:!1},element:{defaultValue:{value:'"p"',computed:!1},description:"Element name",type:{name:"enum",value:[{value:"'h1'",computed:!1},{value:"'h2'",computed:!1},{value:"'h3'",computed:!1},{value:"'h4'",computed:!1},{value:"'h5'",computed:!1},{value:"'h6'",computed:!1},{value:"'p'",computed:!1},{value:"'span'",computed:!1},{value:"'strong'",computed:!1}]},required:!1},ds:{defaultValue:{value:`{
	css:{
		class:{
			family:"rg",
			fontsize:"md"
		},
		flags:{
			isDisplay:true
		}
	}
}`,computed:!1},description:"round button",type:{name:"object"},required:!1}}}},"./scrap/ui-libs/components/atoms/typography/text/index.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__),ui_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./build/scripts/ui-helpers/index.js"),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/index.js");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}var Text=function Text(dprops){var id,moreLbl,lessLbl,lineClamp,alignLbl,props=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.props.define({content:"",element:"p",ds:{css:{class:{margin:{1:"16",2:"0",3:"0",4:"0"},family:"rg",fontsize:"md"},flags:{boxSizing:!0}}},moreLess:{lineClamp:5,enabled:!1,moreLabel:"Read more",lessLabel:"Read less",alignMoreOption:"al"}},dprops),moreLess=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"moreLess.enabled");return(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(moreLess?"div":props.element||"p",_object_spread({},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(props,!1,"attrs"),{className:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.className(props,moreLess?"rd-mor-lss full":"")}),props.children?props.children:moreLess?(id=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.random.id(24),moreLbl=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"moreLess.moreLabel"),lessLbl=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"moreLess.lessLabel"),lineClamp=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"moreLess.lineClamp"),alignLbl=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"moreLess.alignMoreOption"),react__WEBPACK_IMPORTED_MODULE_2__.createElement(react__WEBPACK_IMPORTED_MODULE_2__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_2__.createElement("input",{type:"checkbox",className:"rd-mor-lss-chbx",id:id}),react__WEBPACK_IMPORTED_MODULE_2__.createElement("div",{dangerouslySetInnerHTML:{__html:props.content||""},className:"rd-mor-lss-ctnt full lc-".concat(lineClamp)}),react__WEBPACK_IMPORTED_MODULE_2__.createElement("div",{className:"full mr-t10 rd-mor-lbl-hldr ".concat(alignLbl)},react__WEBPACK_IMPORTED_MODULE_2__.createElement("label",{className:"rd-mor-lss-lbl cp link-u",htmlFor:id,"data-more-label":moreLbl,"data-less-label":lessLbl}," ")))):props.content||"")};Text.propTypes={content:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string,element:prop_types__WEBPACK_IMPORTED_MODULE_0___default().oneOf(["h1","h2","h3","h4","h5","h6","p","span","strong","li"]),ds:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,moreLess:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object},Text.defaultProps={content:"",element:"p",ds:{css:{class:{margin:{1:"16",2:"0",3:"0",4:"0"},family:"rg",fontsize:"md"},flags:{boxSizing:!0}}},moreLess:{lineClamp:5,enabled:!1,moreLabel:"Read more",lessLabel:"Read less",alignMoreOption:"al"}};let __WEBPACK_DEFAULT_EXPORT__=Text;Text.__docgenInfo={description:"",methods:[],displayName:"Text",props:{content:{defaultValue:{value:'""',computed:!1},description:"Display content",type:{name:"string"},required:!1},element:{defaultValue:{value:'"p"',computed:!1},description:"Element name",type:{name:"enum",value:[{value:"'h1'",computed:!1},{value:"'h2'",computed:!1},{value:"'h3'",computed:!1},{value:"'h4'",computed:!1},{value:"'h5'",computed:!1},{value:"'h6'",computed:!1},{value:"'p'",computed:!1},{value:"'span'",computed:!1},{value:"'strong'",computed:!1},{value:"'li'",computed:!1}]},required:!1},ds:{defaultValue:{value:`{
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
}`,computed:!1},description:"moreLess",type:{name:"object"},required:!1}}}},"./scrap/ui-libs/components/molecules/title-with-description/index.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__),ui_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./build/scripts/ui-helpers/index.js"),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/index.js"),aio_global_ui_atoms_typography_text__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./scrap/ui-libs/components/atoms/typography/text/index.jsx"),aio_global_ui_atoms_typography_display__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./scrap/ui-libs/components/atoms/typography/display/index.jsx");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}var TitleWithDescription=function TitleWithDescription(dprops){var props=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.props.define({wrapperDs:{element:"div"},titleDs:{},descriptionDs:{attrs:{},dataAttrs:{}},descriptionMoreLess:{}},dprops);return(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"wrapperDs.element","div"),_object_spread({},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(props,!1,"attrs"),{className:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.css.get(props,"wrapperDs")||"full"}),react__WEBPACK_IMPORTED_MODULE_2__.createElement(react__WEBPACK_IMPORTED_MODULE_2__.Fragment,null,function title(){switch(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.data.type.get(props.title||"")){case"function":return props.title(props);case"string":return react__WEBPACK_IMPORTED_MODULE_2__.createElement(aio_global_ui_atoms_typography_display__WEBPACK_IMPORTED_MODULE_4__.A,{content:props.title,ds:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"titleDs",{}),attrs:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"titleDs.attrs",{}),dataAttrs:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"titleDs.dataAttrs",{})});default:return props.title||""}}(),function description(){switch(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.data.type.get(props.description||"")){case"function":return props.description(props);case"string":return react__WEBPACK_IMPORTED_MODULE_2__.createElement(aio_global_ui_atoms_typography_text__WEBPACK_IMPORTED_MODULE_3__.A,{content:props.description,ds:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"descriptionDs",{}),moreLess:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"descriptionMoreLess",{}),element:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"descriptionDs.element","p"),attrs:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"descriptionDs.attrs",{}),dataAttrs:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"descriptionDs..dataAttrs",{})});default:return props.description||""}}()))};TitleWithDescription.propTypes={title:prop_types__WEBPACK_IMPORTED_MODULE_0___default().isRequired,description:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string.isRequired,wrapperDs:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,titleDs:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,descriptionDs:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,descriptionMoreLess:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object},TitleWithDescription.defaultProps={wrapperDs:{element:"div"},titleDs:{},descriptionDs:{attrs:{},dataAttrs:{}},descriptionMoreLess:{}};let __WEBPACK_DEFAULT_EXPORT__=TitleWithDescription;TitleWithDescription.__docgenInfo={description:"",methods:[],displayName:"TitleWithDescription",props:{wrapperDs:{defaultValue:{value:`{
	element:"div"
}`,computed:!1},description:"round button",type:{name:"object"},required:!1},titleDs:{defaultValue:{value:`{

}`,computed:!1},description:"round button",type:{name:"object"},required:!1},descriptionDs:{defaultValue:{value:`{
	attrs:{

	},
	dataAttrs:{

	}
}`,computed:!1},description:"round button",type:{name:"object"},required:!1},descriptionMoreLess:{defaultValue:{value:`{

}`,computed:!1},description:"descriptionMoreLess",type:{name:"object"},required:!1},title:{description:"Title content",type:{name:"custom",raw:"propTypes.isRequired"},required:!1},description:{description:"Description",type:{name:"string"},required:!0}}}}}]);
//# sourceMappingURL=storybook-ui-libs-components-molecules-avatar-with-details-index-stories.58a0a6f7.iframe.bundle.js.map