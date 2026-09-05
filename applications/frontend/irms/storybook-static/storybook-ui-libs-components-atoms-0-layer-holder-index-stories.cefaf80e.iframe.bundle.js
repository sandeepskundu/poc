"use strict";(self.webpackChunkirms=self.webpackChunkirms||[]).push([[3284],{"./src/storybook/ui-libs/components/atoms/0/layer-holder/index.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Base:()=>Base,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});var ui_helpers=__webpack_require__("./build/scripts/ui-helpers/index.js"),react=__webpack_require__("./node_modules/react/index.js"),typography_text=__webpack_require__("./scrap/ui-libs/components/atoms/0/typography/text/index.jsx"),description=__webpack_require__("./scrap/ui-libs/components/atoms/0/typography/text/description.jsx"),React=__webpack_require__("./node_modules/react/index.js"),_props={wrap:!1,templates:{layer:"Sandeep",content:"This is sample body text and will get replaced with original content. This is sample body text and will get replaced with original content. This is sample body text and will get replaced with original content."},layer:{size:"24",align:"trcc",dimensions:{width:"",height:""}},content:{text:{content:"",markup:{},ds:{css:{class:{}}}},wrapper:{markup:{}},toggle:{enabled:!1}},dsTheme:{layer:{background:"c00404"},wrapper:{radius:"8",background:"c00206"},content:{color:"c00000"},container:{background:"c00206"}},config:{wrapper:{ds:{},attrs:{},markup:{element:"div"}},container:{ds:{},attrs:{},markup:{element:"div"}},content:{ds:{},attrs:{},markup:{element:"div"}},layer:{ds:{},attrs:{},markup:{element:"div"}}}},Comp=(0,react.forwardRef)(function(dprops,forwardedRef){var id=ui_helpers.random.key();forwardedRef||(0,react.useRef)(null);var props=ui_helpers.element.jsx.props.define(_props,dprops),size=ui_helpers.json.get(props,"layer.size",24),align=ui_helpers.json.get(props,"layer.align","tlcc"),getAttrs=function getAttrs(type,cls){return ui_helpers.element.jsx.attrs(ui_helpers.json.merge(ui_helpers.json.get(props,"config.".concat(type),{}),{ds:{predefined:ui_helpers.json.get(props,"dsTheme.".concat(type),{})}}),cls||"")},alignment=function alignment(){var aln="aln-".concat(align),map={"aln-c":"","aln-tl":"pd-l__SIZE__","aln-tlcc ":"pd-l__SIZE__","aln-tlc":"pd-l__SIZE__","aln-tlo":"pd-t__SIZE__","aln-tc":"pd-t__SIZE__","aln-tcc":"pd-t__SIZE__","aln-tco":"pd-t__SIZE__","aln-tr":"pd-r__SIZE__","aln-trcc":"pd-r__SIZE__","aln-trc":"pd-r__SIZE__","aln-tro":"pd-r__SIZE__","aln-rtc":"pd-r__SIZE__","aln-rto":"pd-r__SIZE__","aln-rc":"pd-r__SIZE__","aln-rcc":"pd-r__SIZE__","aln-rco":"pd-r__SIZE__","aln-rb":"pd-r__SIZE__","aln-rbc":"pd-r__SIZE__","aln-rbo":"pd-r__SIZE__","aln-rbcc":"pd-r__SIZE__","aln-brc":"pd-b__SIZE__","aln-bro":"pd-b__SIZE__","aln-bc":"pd-b__SIZE__","aln-bcc":"pd-b__SIZE__","aln-bco":"pd-b__SIZE__","aln-bl":"pd-b__SIZE__","aln-blc":"pd-b__SIZE__","aln-blcc":"pd-b__SIZE__","aln-blo":"pd-b__SIZE__","aln-lbc":"pd-l__SIZE__","aln-lbo":"pd-l__SIZE__","aln-lc":"pd-l__SIZE__","aln-lcc":"pd-l__SIZE__","aln-lco":"pd-l__SIZE__","aln-ltc":"pd-l__SIZE__","aln-lto":"pd-l__SIZE__"};return map&&aln&&map[aln]?map[aln].replaceAll(/__SIZE__/g,size):""},minHightAndWdth=function minHightAndWdth(lyr){var width=ui_helpers.json.get(props,"layer.dimensions.width",id),height=ui_helpers.json.get(props,"layer.dimensions.height",id);if((width||height)&&(width!=id||height!=id)){var rv=[];if(lyr?(height&&rv.push("lyr-ho-".concat(height)),width&&rv.push("lyr-wo-".concat(width))):(height&&rv.push("lyr-mho-".concat(height)),width&&rv.push("lyr-mwo-".concat(width))),rv.length)return rv.join(" ")}if(size&&size!=id)if(lyr)return"lyr-".concat(size);else return"lyr-mh-".concat(size);return""},isvalid=function isvalid(type){var Temp=ui_helpers.json.get(props,"templates.".concat(type),null);return!!(Temp&&ui_helpers.data.type.is(Temp,"function")||Temp&&ui_helpers.data.type.is(Temp,"jsx")||Temp&&ui_helpers.data.type.is(Temp,"string"))},hasLayer=isvalid("layer"),hasContent=isvalid("content"),layerChild=function layerChild(){var Temp=ui_helpers.json.get(props,"templates.layer",null);return Temp&&ui_helpers.data.type.is(Temp,"function")?Temp(props):Temp&&ui_helpers.data.type.is(Temp,"jsx")?React.createElement(React.Fragment,{onClick:toggle,className:"bxs flx-full"},Trgr):Temp?"".concat(Temp):""},typography=function typography(){var txt=ui_helpers.json.get(props,"templates.content",""),toggle1=ui_helpers.json.get(props,"content.toggle.enabled",!1),cconfig=ui_helpers.json.copy(ui_helpers.json.get(props,"content",{}));return(cconfig=ui_helpers.json.set(cconfig,"text.content",txt,!1,!0),toggle1)?React.createElement(description.A,cconfig):React.createElement(typography_text.A,cconfig)},contentChilds=function contentChilds(){var Temp=ui_helpers.json.get(props,"templates.content",null);return Temp&&ui_helpers.data.type.is(Temp,"function")?Temp(props):Temp&&ui_helpers.data.type.is(Temp,"jsx")?React.createElement(React.Fragment,{onClick:toggle,className:"bxs flx-full"},Trgr):Temp&&ui_helpers.data.type.is(Temp,"string")?typography():Temp?"".concat(Temp):""},container=function container(){return(0,react.createElement)(ui_helpers.json.get(props,"config.container.markup.element","div"),getAttrs("container","bxs pr full ".concat(alignment()," ").concat(minHightAndWdth())),React.createElement(React.Fragment,null,hasLayer?(0,react.createElement)(ui_helpers.json.get(props,"config.layer.markup.element","div"),getAttrs("layer","bxs lyr aln-".concat(align," ").concat(minHightAndWdth(!0))),layerChild()):React.createElement(React.Fragment,null),hasContent?(0,react.createElement)(ui_helpers.json.get(props,"config.content.markup.element","div"),getAttrs("content","full bxs"),contentChilds()):React.createElement(React.Fragment,null)))};return hasLayer||hasContent?props.wrap?(0,react.createElement)(ui_helpers.json.get(props,"config.wrapper.markup.element","div"),getAttrs("wrapper","bxs pr full"),container()):container():React.createElement(React.Fragment,null)});Comp.__docgenInfo={description:"",methods:[],displayName:"Comp"};let index_stories={title:"Atoms/0/LayerHolder",component:Comp,parameters:{layout:"centered",docs:{description:{component:"Button<br/><br /><strong>Import path:</strong><code>import LayerHolder from 'aio-global-ui/atoms/0/layer-holder';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/layer-holder/index</code><br/><br/>"}}},tags:["autodocs"],argTypes:{}};var Base={args:{wrap:!1,layer:{size:24,align:"c",dimensions:{width:"",height:""}},content:{text:{ds:{},markup:{}},wrapper:{markup:{}},toggle:{enabled:!1}},dsTheme:{layer:{background:"c00404"},wrapper:{radius:"8",background:"c00206"},content:{color:"c00000"},container:{background:"c00206"}},config:{wrapper:{ds:{},attrs:{},markup:{element:"div"}},container:{ds:{},attrs:{},markup:{element:"div"}},content:{ds:{},attrs:{},markup:{element:"div"}},layer:{ds:{},attrs:{},markup:{element:"div"}}},attrs:{},dataAttrs:{}}};Base.parameters={...Base.parameters,docs:{...Base.parameters?.docs,source:{originalSource:`{
  args: {
    wrap: false,
    layer: {
      size: 24,
      align: "c",
      dimensions: {
        width: '',
        height: ''
      }
    },
    content: {
      text: {
        ds: {},
        markup: {}
      },
      wrapper: {
        markup: {}
      },
      toggle: {
        enabled: false
      }
    },
    dsTheme: {
      layer: {
        background: "c00404"
      },
      wrapper: {
        radius: "8",
        background: "c00206"
      },
      content: {
        color: "c00000"
      },
      container: {
        background: "c00206"
      }
    },
    config: {
      wrapper: {
        ds: {},
        attrs: {},
        markup: {
          element: "div"
        }
      },
      container: {
        ds: {},
        attrs: {},
        markup: {
          element: "div"
        }
      },
      content: {
        ds: {},
        attrs: {},
        markup: {
          element: "div"
        }
      },
      layer: {
        ds: {},
        attrs: {},
        markup: {
          element: "div"
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
//# sourceMappingURL=storybook-ui-libs-components-atoms-0-layer-holder-index-stories.cefaf80e.iframe.bundle.js.map