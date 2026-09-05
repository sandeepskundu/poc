"use strict";(self.webpackChunkirms=self.webpackChunkirms||[]).push([[4125],{"./src/storybook/ui-libs/components/atoms/layer-holder/index.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Base:()=>Base,ButtonA:()=>ButtonA,ButtonB:()=>ButtonB,Primary:()=>Primary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});let __WEBPACK_DEFAULT_EXPORT__={title:"Atoms/LayerHolder",component:__webpack_require__("./scrap/ui-libs/components/atoms/layer-holder/index.jsx").A,parameters:{layout:"centered",docs:{description:{component:"Tags (also known as “chips”) are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once.<br/><br /><strong>Import path:</strong><code>import LayerHolder from 'aio-global-ui/atoms/layer-holder';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/layer-holder/index</code><br/><br/>"}}},tags:["autodocs"],argTypes:{}};var Base={args:{wrapperDs:{element:"div"},layerDs:{size:20,align:"c",attrs:{},element:"div",dataAttrs:{},minHeightAndWidth:{width:0,height:0}},contentDs:{attrs:{},dataAttrs:{},element:"div"},moreLess:{},content:"",layerMinHeightAndWidth:{width:0,height:0},layer:"",attrs:{},dataAttrs:{}}},Primary={args:{label:"Mandeep",toggle:!1,con:"kundu"}},ButtonB={args:{label:"Button B",toggle:!1,con:"B Button"}},ButtonA={args:{label:"Button A",toggle:!1,con:"A Button"}};Base.parameters={...Base.parameters,docs:{...Base.parameters?.docs,source:{originalSource:`{
  args: {
    wrapperDs: {
      element: "div"
    },
    layerDs: {
      size: 20,
      align: "c",
      attrs: {},
      element: "div",
      dataAttrs: {},
      minHeightAndWidth: {
        width: 0,
        height: 0
      }
    },
    contentDs: {
      attrs: {},
      dataAttrs: {},
      element: "div"
    },
    moreLess: {},
    content: '',
    layerMinHeightAndWidth: {
      width: 0,
      height: 0
    },
    layer: '',
    attrs: {},
    dataAttrs: {}
  }
}`,...Base.parameters?.docs?.source}}},Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Mandeep",
    toggle: false,
    con: "kundu"
  }
}`,...Primary.parameters?.docs?.source}}},ButtonB.parameters={...ButtonB.parameters,docs:{...ButtonB.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Button B",
    toggle: false,
    con: "B Button"
  }
}`,...ButtonB.parameters?.docs?.source}}},ButtonA.parameters={...ButtonA.parameters,docs:{...ButtonA.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Button A",
    toggle: false,
    con: "A Button"
  }
}`,...ButtonA.parameters?.docs?.source}}};let __namedExportsOrder=["Base","Primary","ButtonB","ButtonA"]},"./scrap/ui-libs/components/atoms/layer-holder/index.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__),ui_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./build/scripts/ui-helpers/index.js"),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/index.js"),aio_global_ui_atoms_typography_text__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./scrap/ui-libs/components/atoms/typography/text/index.jsx");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}var LayerHolder=function LayerHolder(dprops){var aln,map,props=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.props.define({wrapperDs:{element:"div"},layerDs:{size:20,align:"c",attrs:{},element:"div",dataAttrs:{},minHeightAndWidth:{width:0,height:0}},contentDs:{attrs:{},dataAttrs:{},element:"div"},moreLess:{},content:"",layerMinHeightAndWidth:{width:0,height:0},layer:""},dprops),lsize=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"layerDs.size",20),lAln=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"layerDs.align","c"),lElm=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"layerDs.element","div"),wrpElm=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"wrapperDs.element","div"),minHeightAndWidth=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"layerDs.minHeightAndWidth"),minHightAndWdth=function minHightAndWdth(lyr){if(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.data.type.is(minHeightAndWidth,"object")&&(minHeightAndWidth.height||minHeightAndWidth.width)){var rv=[];if(lyr?(minHeightAndWidth.height&&rv.push("lyr-ho-".concat(minHeightAndWidth.height)),minHeightAndWidth.width&&rv.push("lyr-wo-".concat(minHeightAndWidth.width))):(minHeightAndWidth.height&&rv.push("lyr-mho-".concat(minHeightAndWidth.height)),minHeightAndWidth.width&&rv.push("lyr-mwo-".concat(minHeightAndWidth.width))),rv.length)return rv.join(" ")}return lyr?"lyr-".concat(lsize):"lyr-mh-".concat(lsize)};return(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(wrpElm,_object_spread({},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(props,!1,"attrs"),{className:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.css.get(props.wrapperDs,"bdr-1")}),react__WEBPACK_IMPORTED_MODULE_2__.createElement("div",{className:"bxs pr full ".concat((aln="aln-".concat(lAln),(map={"aln-c":"","aln-tl":"pd-l__SIZE__","aln-tlcc ":"pd-l__SIZE__","aln-tlc":"pd-l__SIZE__","aln-tlo":"pd-t__SIZE__","aln-tc":"pd-t__SIZE__","aln-tcc":"pd-t__SIZE__","aln-tco":"pd-t__SIZE__","aln-tr":"pd-r__SIZE__","aln-trcc":"pd-r__SIZE__","aln-trc":"pd-r__SIZE__","aln-tro":"pd-r__SIZE__","aln-rtc":"pd-r__SIZE__","aln-rto":"pd-r__SIZE__","aln-rc":"pd-r__SIZE__","aln-rcc":"pd-r__SIZE__","aln-rco":"pd-r__SIZE__","aln-rb":"pd-r__SIZE__","aln-rbc":"pd-r__SIZE__","aln-rbo":"pd-r__SIZE__","aln-rbcc":"pd-r__SIZE__","aln-brc":"pd-b__SIZE__","aln-bro":"pd-b__SIZE__","aln-bc":"pd-b__SIZE__","aln-bcc":"pd-b__SIZE__","aln-bco":"pd-b__SIZE__","aln-bl":"pd-b__SIZE__","aln-blc":"pd-b__SIZE__","aln-blcc":"pd-b__SIZE__","aln-blo":"pd-b__SIZE__","aln-lbc":"pd-l__SIZE__","aln-lbo":"pd-l__SIZE__","aln-lc":"pd-l__SIZE__","aln-lcc":"pd-l__SIZE__","aln-lco":"pd-l__SIZE__","aln-ltc":"pd-l__SIZE__","aln-lto":"pd-l__SIZE__"},aln&&map[aln])?map[aln].replaceAll(/__SIZE__/g,lsize):"")," ").concat(minHightAndWdth())},(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(lElm,_object_spread({},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(props.layerDs,!1,"attrs"),{className:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.css.get(props.layerDs,["lyr","aln-".concat(lAln),"".concat(minHightAndWdth(!0))].join(" "))}),"function"===ui_helpers__WEBPACK_IMPORTED_MODULE_1__.data.type.get(props.layer||"")?props.layer(props):props.layer||""),props.content?(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(props.contentWrapperElement||"div",_object_spread({},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(props.contentDs,!1,"attrs"),{className:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.css.get(props.contentDs,"full bxs")}),function contentChilds(){switch(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.data.type.get(props.content||"")){case"function":return props.content(props);case"string":return react__WEBPACK_IMPORTED_MODULE_2__.createElement(aio_global_ui_atoms_typography_text__WEBPACK_IMPORTED_MODULE_3__.A,{content:props.content,ds:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"contentDs",{}),moreLess:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"moreLess",{}),attrs:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"contentDs.attrs",{}),dataAttrs:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"contentDs.dataAttrs",{}),element:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"contentDs.element","div")});default:return props.content||""}}()):react__WEBPACK_IMPORTED_MODULE_2__.createElement(react__WEBPACK_IMPORTED_MODULE_2__.Fragment,null)))};LayerHolder.propTypes={wrapperDs:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,layerDs:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,contentDs:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,moreLess:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,content:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string,layerMinHeightAndWidth:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,layer:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string},LayerHolder.defaultProps={wrapperDs:{element:"div"},layerDs:{size:20,align:"c",attrs:{},element:"div",dataAttrs:{},minHeightAndWidth:{width:0,height:0}},contentDs:{attrs:{},dataAttrs:{},element:"div"},moreLess:{},content:"",layerMinHeightAndWidth:{width:0,height:0},layer:""};let __WEBPACK_DEFAULT_EXPORT__=LayerHolder;LayerHolder.__docgenInfo={description:"",methods:[],displayName:"LayerHolder",props:{wrapperDs:{defaultValue:{value:`{
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
}`,computed:!1},description:"Custmized Minimum height and width of layer",type:{name:"object"},required:!1},layer:{defaultValue:{value:'""',computed:!1},description:"CSS class name of HTML element of layer",type:{name:"string"},required:!1}}}},"./scrap/ui-libs/components/atoms/typography/text/index.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__),ui_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./build/scripts/ui-helpers/index.js"),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/index.js");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}var Text=function Text(dprops){var id,moreLbl,lessLbl,lineClamp,alignLbl,props=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.props.define({content:"",element:"p",ds:{css:{class:{margin:{1:"16",2:"0",3:"0",4:"0"},family:"rg",fontsize:"md"},flags:{boxSizing:!0}}},moreLess:{lineClamp:5,enabled:!1,moreLabel:"Read more",lessLabel:"Read less",alignMoreOption:"al"}},dprops),moreLess=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"moreLess.enabled");return(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(moreLess?"div":props.element||"p",_object_spread({},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(props,!1,"attrs"),{className:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.className(props,moreLess?"rd-mor-lss full":"")}),props.children?props.children:moreLess?(id=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.random.id(24),moreLbl=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"moreLess.moreLabel"),lessLbl=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"moreLess.lessLabel"),lineClamp=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"moreLess.lineClamp"),alignLbl=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"moreLess.alignMoreOption"),react__WEBPACK_IMPORTED_MODULE_2__.createElement(react__WEBPACK_IMPORTED_MODULE_2__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_2__.createElement("input",{type:"checkbox",className:"rd-mor-lss-chbx",id:id}),react__WEBPACK_IMPORTED_MODULE_2__.createElement("div",{dangerouslySetInnerHTML:{__html:props.content||""},className:"rd-mor-lss-ctnt full lc-".concat(lineClamp)}),react__WEBPACK_IMPORTED_MODULE_2__.createElement("div",{className:"full mr-t10 rd-mor-lbl-hldr ".concat(alignLbl)},react__WEBPACK_IMPORTED_MODULE_2__.createElement("label",{className:"rd-mor-lss-lbl cp link-u",htmlFor:id,"data-more-label":moreLbl,"data-less-label":lessLbl}," ")))):props.content||"")};Text.propTypes={content:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string,element:prop_types__WEBPACK_IMPORTED_MODULE_0___default().oneOf(["h1","h2","h3","h4","h5","h6","p","span","strong","li"]),ds:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,moreLess:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object},Text.defaultProps={content:"",element:"p",ds:{css:{class:{margin:{1:"16",2:"0",3:"0",4:"0"},family:"rg",fontsize:"md"},flags:{boxSizing:!0}}},moreLess:{lineClamp:5,enabled:!1,moreLabel:"Read more",lessLabel:"Read less",alignMoreOption:"al"}};let __WEBPACK_DEFAULT_EXPORT__=Text;Text.__docgenInfo={description:"",methods:[],displayName:"Text",props:{content:{defaultValue:{value:'""',computed:!1},description:"Display content",type:{name:"string"},required:!1},element:{defaultValue:{value:'"p"',computed:!1},description:"Element name",type:{name:"enum",value:[{value:"'h1'",computed:!1},{value:"'h2'",computed:!1},{value:"'h3'",computed:!1},{value:"'h4'",computed:!1},{value:"'h5'",computed:!1},{value:"'h6'",computed:!1},{value:"'p'",computed:!1},{value:"'span'",computed:!1},{value:"'strong'",computed:!1},{value:"'li'",computed:!1}]},required:!1},ds:{defaultValue:{value:`{
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
//# sourceMappingURL=storybook-ui-libs-components-atoms-layer-holder-index-stories.ff04c330.iframe.bundle.js.map