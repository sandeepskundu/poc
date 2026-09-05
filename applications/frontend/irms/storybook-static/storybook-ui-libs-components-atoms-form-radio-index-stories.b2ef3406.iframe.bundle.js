"use strict";(self.webpackChunkirms=self.webpackChunkirms||[]).push([[8135],{"./src/storybook/ui-libs/components/atoms/form/radio/index.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Base:()=>Base,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});var prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),ui_helpers=__webpack_require__("./build/scripts/ui-helpers/index.js"),react=__webpack_require__("./node_modules/react/index.js"),typography_text=__webpack_require__("./scrap/ui-libs/components/atoms/typography/text/index.jsx"),display=__webpack_require__("./scrap/ui-libs/components/atoms/typography/display/index.jsx"),layer_holder=__webpack_require__("./scrap/ui-libs/components/atoms/layer-holder/index.jsx");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}var Radio=function Radio(dprops){var lblJsx,props=ui_helpers.element.jsx.props.define({},dprops),id=ui_helpers.random.id(10),ids={radio:"".concat(id,"Rdio"),radioName:"".concat(id,"RdioNme"),radioHolder:"".concat(id,"RdioHldr")};(0,react.useEffect)(function(){toggle(props.checked)},[props.checked]);var toggle=function toggle(chkd){chkd&&ui_helpers.element.attr.set(ids.radio,"checked",!0)},onChange=function onChange(chcked){ui_helpers.data.type.is(props.onChange,"function")&&chcked&&props.onChange(chcked,_object_spread({},props,{ids:ids}))},onClick=function onClick(e){if(!props.disabled){var chcked=ui_helpers.element.attr.get(ids.radio,"checked");e.preventDefault(),e.stopPropagation(),toggle(!chcked),onChange(!chcked)}},heading=function heading(){var lbl=ui_helpers.json.val(props,"label");if(lbl)return react.createElement(display.A,{content:lbl,ds:ui_helpers.json.val(props,"labelDs"),element:ui_helpers.json.val(props,"labelDs.element","span")})},description=function description(){var desc=ui_helpers.json.val(props,"description");return desc?react.createElement(typography_text.A,{content:desc,ds:ui_helpers.json.val(props,"descriptionDs",{}),moreLess:{enabled:!1}}):react.createElement(react.Fragment,null)},labelClass=function labelClass(){var rv=["cp rdio-lbl"];return props.disabled&&rv.push("disabled"),rv.join(" ")},chckClass=function chckClass(){var rval=["rdio-wrpr chkbx th-".concat(ui_helpers.json.val(props,"theme","000"))];return props.disabled&&rval.push("disabled"),rval.join(" ")};return react.createElement(layer_holder.A,{layer:function switchBox(){return react.createElement("label",{className:chckClass(),htmlFor:ids.radio,onClick:function onClick1(e){onClick(e)}},react.createElement("input",{type:"radio",id:ids.radio,name:props.name,value:props.value||"",disabled:props.disabled}),react.createElement("span",{className:"rdio-inpt inpt transition round bdr-1"}))},content:(lblJsx=ui_helpers.json.val(props,"labelJsxTemplate"))?react.createElement("label",{className:labelClass(),htmlFor:ids.radio,onClick:function onClick1(e){onClick(e)}},lblJsx):react.createElement("label",{className:labelClass(),htmlFor:ids.radio,onClick:function onClick1(e){onClick(e)}},heading(),description()),moreLess:{enabled:!1},attrs:ui_helpers.json.val(props,"attrs",{}),layerDs:ui_helpers.json.val(props,"layerDs",{}),dataAttrs:ui_helpers.json.val(props,"dataAttrs",{}),wrapperDs:ui_helpers.json.val(props,"wrapperDs",{})})};Radio.propTypes={layerDs:prop_types_default().object,labelDs:prop_types_default().object,descriptionDs:prop_types_default().object,label:prop_types_default().string.isRequired,name:prop_types_default().string.isRequired,description:prop_types_default().string,value:prop_types_default().string,checked:prop_types_default().bool,disabled:prop_types_default().bool,labelJsxTemplate:prop_types_default().JSX,onChange:prop_types_default().func},Radio.defaultProps={layerDs:{css:{},size:"34",align:"tl",element:"div",minHeightAndWidth:{width:34,height:18}},labelDs:{element:"span",css:{class:{family:"md",fontsize:"sm"},flags:{isDisplay:!1}}},descriptionDs:{css:{class:{fontsize:"sm",margin:{1:2,2:0,3:0,4:0}},flags:{boxSizing:!0}}},description:"",value:"",checked:"",disabled:"",labelJsxTemplate:"",onChange:null},Radio.__docgenInfo={description:"",methods:[],displayName:"Radio",props:{layerDs:{defaultValue:{value:`{
	css:{

	},
	size:"34",
	align:"tl",
	element:"div",
	minHeightAndWidth:{
		width:34,
		height:18
	}
}`,computed:!1},description:"Design system configuration of wrapper element",type:{name:"object"},required:!1},labelDs:{defaultValue:{value:`{
	element:"span",
	css:{
		class:{
			family:"md",
			fontsize:"sm"
		},
		flags:{
			isDisplay:false
		}
	}
}`,computed:!1},description:"Design system configuration of label text",type:{name:"object"},required:!1},descriptionDs:{defaultValue:{value:`{
	css:{
		class:{
			fontsize:"sm",
			margin:{
				1:2,
				2:0,
				3:0,
				4:0
			}
		},
		flags:{
			boxSizing:true
		}
	}
}`,computed:!1},description:"Design system configuration of label description text",type:{name:"object"},required:!1},description:{defaultValue:{value:'""',computed:!1},description:"checkbox lable description",type:{name:"string"},required:!1},value:{defaultValue:{value:'""',computed:!1},description:"Value of checkbox box",type:{name:"string"},required:!1},checked:{defaultValue:{value:'""',computed:!1},description:"Is checkbox by default is active or not",type:{name:"bool"},required:!1},disabled:{defaultValue:{value:'""',computed:!1},description:"Is checkbox by default in disabled mode or not",type:{name:"bool"},required:!1},labelJsxTemplate:{defaultValue:{value:'""',computed:!1},description:"JSX template of checkbox label",type:{name:"custom",raw:"propTypes.JSX"},required:!1},onChange:{defaultValue:{value:"null",computed:!1},description:"On change call once checkbox switched on or off",type:{name:"func"},required:!1},label:{description:"checkbox label",type:{name:"string"},required:!0},name:{description:"checkbox name",type:{name:"string"},required:!0}}};let index_stories={title:"Atoms/Form/Radio",component:Radio,parameters:{layout:"centered",docs:{description:{component:"Checkbox storybook<br/><br /><strong>Import path:</strong><code>import Radio from 'aio-global-ui/atoms/form/radio';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/form/radio/index</code><br/><br/>"}}},tags:["autodocs"],argTypes:{}};var Base={args:{layerDs:{css:{},size:"34",align:"tl",element:"div",minHeightAndWidth:{width:34,height:18}},labelDs:{element:"span",css:{class:{family:"md",fontsize:"sm"},flags:{isDisplay:!1}}},descriptionDs:{css:{class:{fontsize:"sm",margin:{1:2,2:0,3:0,4:0}},flags:{boxSizing:!0}}},label:"",name:"",description:"",value:"",checked:"",disabled:"",labelJsxTemplate:"",attrs:{},dataAttrs:{}}};Base.parameters={...Base.parameters,docs:{...Base.parameters?.docs,source:{originalSource:`{
  args: {
    layerDs: {
      css: {},
      size: "34",
      align: "tl",
      element: "div",
      minHeightAndWidth: {
        width: 34,
        height: 18
      }
    },
    labelDs: {
      element: "span",
      css: {
        class: {
          family: "md",
          fontsize: "sm"
        },
        flags: {
          isDisplay: false
        }
      }
    },
    descriptionDs: {
      css: {
        class: {
          fontsize: "sm",
          margin: {
            1: 2,
            2: 0,
            3: 0,
            4: 0
          }
        },
        flags: {
          boxSizing: true
        }
      }
    },
    label: '',
    name: '',
    description: '',
    value: '',
    checked: '',
    disabled: '',
    labelJsxTemplate: '',
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
}`,computed:!1},description:"moreLess",type:{name:"object"},required:!1}}}}}]);
//# sourceMappingURL=storybook-ui-libs-components-atoms-form-radio-index-stories.b2ef3406.iframe.bundle.js.map