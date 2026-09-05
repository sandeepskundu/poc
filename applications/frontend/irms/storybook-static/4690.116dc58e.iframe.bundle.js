"use strict";(self.webpackChunkirms=self.webpackChunkirms||[]).push([[4690],{"./scrap/ui-libs/components/atoms/form/input/index.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__),ui_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./build/scripts/ui-helpers/index.js"),aio_global_ui_atoms_layer_holder__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./scrap/ui-libs/components/atoms/layer-holder/index.jsx"),react__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/index.js");function _array_like_to_array(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _array_with_holes(arr){if(Array.isArray(arr))return arr}function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _iterable_to_array_limit(arr,i){var _s,_e,_i=null==arr?null:"u">typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null!=_i){var _arr=[],_n=!0,_d=!1;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{_n||null==_i.return||_i.return()}finally{if(_d)throw _e}}return _arr}}function _non_iterable_rest(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable})),keys.push.apply(keys,symbols)}return keys}function _object_spread_props(target,source){return source=null!=source?source:{},Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}),target}function _sliced_to_array(arr,i){return _array_with_holes(arr)||_iterable_to_array_limit(arr,i)||_unsupported_iterable_to_array(arr,i)||_non_iterable_rest()}function _unsupported_iterable_to_array(o,minLen){if(o){if("string"==typeof o)return _array_like_to_array(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if("Object"===n&&o.constructor&&(n=o.constructor.name),"Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _array_like_to_array(o,minLen)}}var Input=function Input(dprops){var state,hldrTheme,rv,attrs,propsAttrs,msg,props=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.props.define({readonly:!1,focused:!1,highlight:!1,asterisk:!0,type:"text",label:"",value:"",placeholder:"",wrapperDs:{css:{}},inputWrapperDs:{css:{class:{shadow:"sm"},others:""},attrs:{},dataAttrs:{},ignoreLeftButtonRadius:!0,ignoreRightButtonRadius:!0},inputDs:!1,validation:{value:"",valid:!0,message:"",error:!1,validation:{checks:{regex:"",enums:"",minlength:0,maxlength:1e3,required:""}}},dsThemeSample:{default:{label:{background:{default:"c00202"},text:{default:"c00210"}},input:{colorPairing:{default:"001"}},error:{}},focus:{label:{},input:{},error:{}},disabled:{label:{},input:{},error:{}},error:{label:{},input:{border:{default:"c00306"}},error:{text:{default:"c00306"}}}},theme:"000",leftLayerDs:{theme:{},css:{},attrs:{},dataAttrs:{}},leftLayer:"",rightLayerDs:{wrapperDs:{},layerDs:{size:16,css:{class:{margin:{1:10,2:0,3:10,4:10}}}},attrs:{},dataAttrs:{}},rightLayer:"",onChange:null,onFocus:null,onBlur:null},dprops),timer=null,_useState=_sliced_to_array((0,react__WEBPACK_IMPORTED_MODULE_3__.useState)("default"),2),state1=_useState[0],setState=_useState[1],id=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.random.id(10),lbl=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"label"),asterisk=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"asterisk"),err=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"validation.error"),size=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.css.input.size(props),theme=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.css.input.theme(props),req=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"validation.validation.checks.required");req="required"===req;var ids={input:"".concat(id,"Inpt"),inputHolder:"".concat(id,"InptHldr")},labelFs={sm:"txt-12",md:"txt-14",lg:"txt-14",xl:"txt-16",xxl:"txt-16"},inputFs={sm:"txt-16",md:"txt-18",lg:"txt-18",xl:"txt-20",xxl:"txt-22"},inputRadis={sm:"bdr-6",md:"bdr-6",lg:"bdr-6",xl:"bdr-8",xxl:"bdr-8"};(0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(function(){ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.attr.set(ids.input,"value",props.value||"")},[props.value]),(0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(function(){!props.readonly&&!props.disabled&&(props.focused||props.highlight)&&focused()},[props.focused,props.highlight]),(0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(function(){!props.disabled&&props.validation&&props.validation.error&&setState("error")},[props.validation]),(0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(function(){props.disabled&&setState("disabled")},[props.disabled]);var focused=function focused(){setTimeout(function(){var elm=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.get.byId(ids.input);elm&&(elm.focus(),props.highlight&&elm.select&&elm.select())},0),setState("focus")},filled=function filled(e){""!=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(e,"target.value","")?ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.class.add(ids.inputHolder,"filled"):ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.class.remove(ids.inputHolder,"filled")},onKeyUp=function onKeyUp(e){props.readonly||(filled(e),clearTimeout(timer),timer=setTimeout(function(){e=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.input.validate(e,props),props.onChange&&props.onChange(e)},700))},onFocus=function onFocus(e){!props.readonly&&(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.class.add(ids.inputHolder,"focus"),props.onFocus&&props.onFocus(e))},onBlur=function onBlur(e){!props.readonly&&(filled(e),ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.class.remove(ids.inputHolder,"focus"),props.onBlur&&props.onBlur(e))},labelCls=function labelCls(){var rv=["inpt-lbl"];if("string"!=typeof theme){var thm=getThemeByType("label");thm&&rv.push(thm)}return rv.join(" ")},fieldCls=function fieldCls(){var rv=["input full bxs"];return size&&inputFs[size]&&rv.push(inputFs[size]),rv.join(" ")},fieldState=function fieldState(){return err?"error":"valid"},inputWrapperDs=function inputWrapperDs(){var rv=[],lBtn=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"leftButton"),rBtn=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"rightButton"),iwProps=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"inputWrapperDs",{}),otherCss=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(iwProps,"css.others",""),ignrLbtnRdis=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(iwProps,"ignoreLeftButtonRadius",""),ignrRbtnRdis=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(iwProps,"ignoreRightButtonRadius","");return otherCss&&rv.push(otherCss),size&&inputRadis[size]?rv.push(inputRadis[size]):rv.push("bdr-6"),lBtn&&!ignrLbtnRdis&&rv.push(lBtn),rBtn&&!ignrRbtnRdis&&rv.push(lBtn),ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.set(iwProps,"css.others",rv.join(" "),!1,!0)},layer=function layer(type){var otherCssRv=["flx-vc"],lyr=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,type),lyrConf=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"".concat(type,"Ds"),{}),lyrWrpDs=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(lyrConf,"wrapperDs",{}),otherCss=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(lyrWrpDs,"css.others","");otherCss&&otherCssRv.push(otherCss);var wrDs=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.set(lyrWrpDs,"css.others",otherCssRv.join(" "),!1,!0);return lyr?react__WEBPACK_IMPORTED_MODULE_3__.createElement(aio_global_ui_atoms_layer_holder__WEBPACK_IMPORTED_MODULE_2__.A,{layer:lyr,wrapperDs:wrDs,layerDs:lyrConf,attrs:lyrConf.attrs||{},dataAttrs:lyrConf.dataAttrs||{}}):react__WEBPACK_IMPORTED_MODULE_3__.createElement(react__WEBPACK_IMPORTED_MODULE_3__.Fragment,null)},getLayer=function getLayer(type){return props&&props[type]?layer(type):react__WEBPACK_IMPORTED_MODULE_3__.createElement(react__WEBPACK_IMPORTED_MODULE_3__.Fragment,null)},errorCls=function errorCls(){var rv=["full inpt-err bg-n bdr-n mr-t6"];return size&&labelFs[size]&&rv.push(labelFs[size]),rv.join(" ")},getThemeByType=function getThemeByType(type){return"error"===type?ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(theme,"error.error"):"disabled"===state1?ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(theme,"disabled.".concat(type)):err?ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(theme,"error.".concat(type)):ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(theme,"".concat(state1,".").concat(type))},getButton=function getButton(type){return props&&props[type]?props[type]:react__WEBPACK_IMPORTED_MODULE_3__.createElement(react__WEBPACK_IMPORTED_MODULE_3__.Fragment,null)};return react__WEBPACK_IMPORTED_MODULE_3__.createElement(react__WEBPACK_IMPORTED_MODULE_3__.Fragment,null,(0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"wrapperDs.element","div"),_object_spread({},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(props,!1,"attrs"),{className:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.css.get(props.wrapperDs,"full inpt-wrpr bxs")}),react__WEBPACK_IMPORTED_MODULE_3__.createElement(react__WEBPACK_IMPORTED_MODULE_3__.Fragment,null,getButton("leftButton"),(0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"inputWrapperDs.element","div"),_object_spread({},_object_spread({},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(props.inputWrapperDs,!1,"attrs"),{id:ids.inputHolder}),{className:(state=fieldState(),hldrTheme="string"==typeof theme?theme:getThemeByType("input"),rv=["full anim inpt-holder inpt pr",size],state&&rv.push(state),hldrTheme&&rv.push(hldrTheme),ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.css.get(inputWrapperDs(),rv.join(" "),!0))}),react__WEBPACK_IMPORTED_MODULE_3__.createElement("div",{className:"full flx-sb bxs"},getLayer("leftLayer"),react__WEBPACK_IMPORTED_MODULE_3__.createElement("div",{className:"full inpt-box bxs"},react__WEBPACK_IMPORTED_MODULE_3__.createElement("input",_object_spread_props(_object_spread({},(attrs=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(props.inputWrapperDs,!1,"attrs"),propsAttrs={id:ids.input,className:fieldCls(),type:props.type||"text",placeholder:props.placeholder||""},props.readonly&&(propsAttrs.readOnly=""),_object_spread({},attrs,propsAttrs))),{onBlur:function onBlur1(e){onBlur(e)},onFocus:function onFocus1(e){onFocus(e)},onKeyUp:function onKeyUp1(e){onKeyUp(e)}})),req&&asterisk?react__WEBPACK_IMPORTED_MODULE_3__.createElement("div",{className:labelCls()},react__WEBPACK_IMPORTED_MODULE_3__.createElement("p",{className:"mr-n inpt-lbl-txt"},lbl||"",react__WEBPACK_IMPORTED_MODULE_3__.createElement("span",{className:"astrik ac"},"*"))):lbl?react__WEBPACK_IMPORTED_MODULE_3__.createElement("div",{className:labelCls()},react__WEBPACK_IMPORTED_MODULE_3__.createElement("p",{className:"mr-n inpt-lbl-txt"},lbl)):void 0,props.readonly?react__WEBPACK_IMPORTED_MODULE_3__.createElement("div",{className:"readonly"}):react__WEBPACK_IMPORTED_MODULE_3__.createElement(react__WEBPACK_IMPORTED_MODULE_3__.Fragment,null)),getLayer("rightLayer"))),getButton("rightButton"))),(msg=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"validation.message"),err&&msg?react__WEBPACK_IMPORTED_MODULE_3__.createElement("div",{className:["inpt pr","string"==typeof theme?theme:getThemeByType("error"),size,fieldState()].join(" ")},react__WEBPACK_IMPORTED_MODULE_3__.createElement("p",{className:errorCls()},msg)):react__WEBPACK_IMPORTED_MODULE_3__.createElement(react__WEBPACK_IMPORTED_MODULE_3__.Fragment,null)))};Input.propTypes={readonly:prop_types__WEBPACK_IMPORTED_MODULE_0___default().bool,focused:prop_types__WEBPACK_IMPORTED_MODULE_0___default().bool,highlight:prop_types__WEBPACK_IMPORTED_MODULE_0___default().bool,asterisk:prop_types__WEBPACK_IMPORTED_MODULE_0___default().bool,type:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string,label:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string,value:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string,placeholder:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string,wrapperDs:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,inputWrapperDs:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,inputDs:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,validation:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,dsThemeSample:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,theme:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string,leftLayerDs:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,leftLayer:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string,rightLayerDs:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,rightLayer:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string,onChange:prop_types__WEBPACK_IMPORTED_MODULE_0___default().func,onFocus:prop_types__WEBPACK_IMPORTED_MODULE_0___default().func,onBlur:prop_types__WEBPACK_IMPORTED_MODULE_0___default().func},Input.defaultProps={readonly:!1,focused:!1,highlight:!1,asterisk:!0,type:"text",label:"",value:"",placeholder:"",wrapperDs:{css:{}},inputWrapperDs:{css:{class:{shadow:"sm"},others:""},attrs:{},dataAttrs:{},ignoreLeftButtonRadius:!0,ignoreRightButtonRadius:!0},inputDs:!1,validation:{value:"",valid:!0,message:"",error:!1,validation:{checks:{regex:"",enums:"",minlength:0,maxlength:1e3,required:""}}},dsThemeSample:{default:{label:{background:{default:"c00202"},text:{default:"c00210"}},input:{colorPairing:{default:"001"}},error:{}},focus:{label:{},input:{},error:{}},disabled:{label:{},input:{},error:{}},error:{label:{},input:{border:{default:"c00306"}},error:{text:{default:"c00306"}}}},theme:"000",leftLayerDs:{theme:{},css:{},attrs:{},dataAttrs:{}},leftLayer:"",rightLayerDs:{wrapperDs:{},layerDs:{size:16,css:{class:{margin:{1:10,2:0,3:10,4:10}}}},attrs:{},dataAttrs:{}},rightLayer:"",onChange:null,onFocus:null,onBlur:null};let __WEBPACK_DEFAULT_EXPORT__=Input;Input.__docgenInfo={description:"",methods:[],displayName:"Input",props:{readonly:{defaultValue:{value:"false",computed:!1},description:"Is input text field in read only state.",type:{name:"bool"},required:!1},focused:{defaultValue:{value:"false",computed:!1},description:"Is input text field auto focused",type:{name:"bool"},required:!1},highlight:{defaultValue:{value:"false",computed:!1},description:"Is field value auto selected",type:{name:"bool"},required:!1},asterisk:{defaultValue:{value:"true",computed:!1},description:"Display asterisk on required filed",type:{name:"bool"},required:!1},type:{defaultValue:{value:'"text"',computed:!1},description:"Type of input field",type:{name:"string"},required:!1},label:{defaultValue:{value:'""',computed:!1},description:"Field input label",type:{name:"string"},required:!1},value:{defaultValue:{value:'""',computed:!1},description:"Field value",type:{name:"string"},required:!1},placeholder:{defaultValue:{value:'""',computed:!1},description:"Placeholder value of field",type:{name:"string"},required:!1},wrapperDs:{defaultValue:{value:`{
	css:{

	}
}`,computed:!1},description:"Design system configuration of wrappers",type:{name:"object"},required:!1},inputWrapperDs:{defaultValue:{value:`{
	css:{
		class:{
			shadow:"sm"
		},
		others:''
	},
	attrs:{

	},
	dataAttrs:{

	},
	ignoreLeftButtonRadius:true,
	ignoreRightButtonRadius:true
}`,computed:!1},description:"Design system configuration of input field wrappers",type:{name:"object"},required:!1},inputDs:{defaultValue:{value:"false",computed:!1},description:"Design system configuration of input field",type:{name:"object"},required:!1},validation:{defaultValue:{value:`{
	value:'',
	valid:true,
	message:'',
	error:false,
	validation:{
		checks:{
			regex:'',
			enums:'',
			minlength:0,
			maxlength:1000,
			required:''
		}
	}
}`,computed:!1},description:"Validation configuration of input field",type:{name:"object"},required:!1},dsThemeSample:{defaultValue:{value:`{
	default:{
		label:{
			background:{
				default:"c00202"
			},
			text:{
				default:"c00210"
			}
		},
		input:{
			colorPairing:{
				default:"001"
			}
		},
		error:{

		}
	},
	focus:{
		label:{

		},
		input:{

		},
		error:{

		}
	},
	disabled:{
		label:{

		},
		input:{

		},
		error:{

		}
	},
	error:{
		label:{

		},
		input:{
			border:{
				default:"c00306"
			}
		},
		error:{
			text:{
				default:"c00306"
			}
		}
	}
}`,computed:!1},description:"Runtime design system theme smaple which will pass in theme props not in dsThemeSample prop.",type:{name:"object"},required:!1},theme:{defaultValue:{value:'"000"',computed:!1},description:"Theme of filed input any of two confirguration either predefined theme or runtime custmized theme object similar to dsThemeSample",type:{name:"string"},required:!1},leftLayerDs:{defaultValue:{value:`{
	theme:{

	},
	css:{

	},
	attrs:{

	},
	dataAttrs:{

	}
}`,computed:!1},description:"Runtime design system theme configuration of leftLayer which will apply styling on left layer.",type:{name:"object"},required:!1},leftLayer:{defaultValue:{value:'""',computed:!1},description:"Content or JSX element of right layer.",type:{name:"string"},required:!1},rightLayerDs:{defaultValue:{value:`{
	wrapperDs:{

	},
	layerDs:{
		size:16,
		css:{
			class:{
				margin:{
					1:10,
					2:0,
					3:10,
					4:10
				}
			}
		}
	},
	attrs:{

	},
	dataAttrs:{

	}
}`,computed:!1},description:"Runtime design system theme configuration of rightLayer which will apply styling on right layer.",type:{name:"object"},required:!1},rightLayer:{defaultValue:{value:'""',computed:!1},description:"Content or JSX element of right layer.",type:{name:"string"},required:!1},onChange:{defaultValue:{value:"null",computed:!1},description:"onChange callback function",type:{name:"func"},required:!1},onFocus:{defaultValue:{value:"null",computed:!1},description:"Button size can have any value from below options",type:{name:"func"},required:!1},onBlur:{defaultValue:{value:"null",computed:!1},description:"Button size can have any value from below options",type:{name:"func"},required:!1}}}},"./scrap/ui-libs/components/atoms/layer-holder/index.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__),ui_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./build/scripts/ui-helpers/index.js"),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/index.js"),aio_global_ui_atoms_typography_text__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./scrap/ui-libs/components/atoms/typography/text/index.jsx");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}var LayerHolder=function LayerHolder(dprops){var aln,map,props=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.props.define({wrapperDs:{element:"div"},layerDs:{size:20,align:"c",attrs:{},element:"div",dataAttrs:{},minHeightAndWidth:{width:0,height:0}},contentDs:{attrs:{},dataAttrs:{},element:"div"},moreLess:{},content:"",layerMinHeightAndWidth:{width:0,height:0},layer:""},dprops),lsize=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"layerDs.size",20),lAln=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"layerDs.align","c"),lElm=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"layerDs.element","div"),wrpElm=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"wrapperDs.element","div"),minHeightAndWidth=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"layerDs.minHeightAndWidth"),minHightAndWdth=function minHightAndWdth(lyr){if(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.data.type.is(minHeightAndWidth,"object")&&(minHeightAndWidth.height||minHeightAndWidth.width)){var rv=[];if(lyr?(minHeightAndWidth.height&&rv.push("lyr-ho-".concat(minHeightAndWidth.height)),minHeightAndWidth.width&&rv.push("lyr-wo-".concat(minHeightAndWidth.width))):(minHeightAndWidth.height&&rv.push("lyr-mho-".concat(minHeightAndWidth.height)),minHeightAndWidth.width&&rv.push("lyr-mwo-".concat(minHeightAndWidth.width))),rv.length)return rv.join(" ")}return lyr?"lyr-".concat(lsize):"lyr-mh-".concat(lsize)};return(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(wrpElm,_object_spread({},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(props,!1,"attrs"),{className:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.css.get(props.wrapperDs,"bdr-1")}),react__WEBPACK_IMPORTED_MODULE_2__.createElement("div",{className:"bxs pr full ".concat((aln="aln-".concat(lAln),(map={"aln-c":"","aln-tl":"pd-l__SIZE__","aln-tlcc ":"pd-l__SIZE__","aln-tlc":"pd-l__SIZE__","aln-tlo":"pd-t__SIZE__","aln-tc":"pd-t__SIZE__","aln-tcc":"pd-t__SIZE__","aln-tco":"pd-t__SIZE__","aln-tr":"pd-r__SIZE__","aln-trcc":"pd-r__SIZE__","aln-trc":"pd-r__SIZE__","aln-tro":"pd-r__SIZE__","aln-rtc":"pd-r__SIZE__","aln-rto":"pd-r__SIZE__","aln-rc":"pd-r__SIZE__","aln-rcc":"pd-r__SIZE__","aln-rco":"pd-r__SIZE__","aln-rb":"pd-r__SIZE__","aln-rbc":"pd-r__SIZE__","aln-rbo":"pd-r__SIZE__","aln-rbcc":"pd-r__SIZE__","aln-brc":"pd-b__SIZE__","aln-bro":"pd-b__SIZE__","aln-bc":"pd-b__SIZE__","aln-bcc":"pd-b__SIZE__","aln-bco":"pd-b__SIZE__","aln-bl":"pd-b__SIZE__","aln-blc":"pd-b__SIZE__","aln-blcc":"pd-b__SIZE__","aln-blo":"pd-b__SIZE__","aln-lbc":"pd-l__SIZE__","aln-lbo":"pd-l__SIZE__","aln-lc":"pd-l__SIZE__","aln-lcc":"pd-l__SIZE__","aln-lco":"pd-l__SIZE__","aln-ltc":"pd-l__SIZE__","aln-lto":"pd-l__SIZE__"},aln&&map[aln])?map[aln].replaceAll(/__SIZE__/g,lsize):"")," ").concat(minHightAndWdth())},(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(lElm,_object_spread({},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(props.layerDs,!1,"attrs"),{className:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.css.get(props.layerDs,["lyr","aln-".concat(lAln),"".concat(minHightAndWdth(!0))].join(" "))}),"function"===ui_helpers__WEBPACK_IMPORTED_MODULE_1__.data.type.get(props.layer||"")?props.layer(props):props.layer||""),props.content?(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(props.contentWrapperElement||"div",_object_spread({},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(props.contentDs,!1,"attrs"),{className:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.css.get(props.contentDs,"full bxs")}),function contentChilds(){switch(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.data.type.get(props.content||"")){case"function":return props.content(props);case"string":return react__WEBPACK_IMPORTED_MODULE_2__.createElement(aio_global_ui_atoms_typography_text__WEBPACK_IMPORTED_MODULE_3__.A,{content:props.content,ds:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"contentDs",{}),moreLess:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"moreLess",{}),attrs:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"contentDs.attrs",{}),dataAttrs:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"contentDs.dataAttrs",{}),element:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.val(props,"contentDs.element","div")});default:return props.content||""}}()):react__WEBPACK_IMPORTED_MODULE_2__.createElement(react__WEBPACK_IMPORTED_MODULE_2__.Fragment,null)))};LayerHolder.propTypes={wrapperDs:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,layerDs:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,contentDs:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,moreLess:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,content:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string,layerMinHeightAndWidth:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,layer:prop_types__WEBPACK_IMPORTED_MODULE_0___default().string},LayerHolder.defaultProps={wrapperDs:{element:"div"},layerDs:{size:20,align:"c",attrs:{},element:"div",dataAttrs:{},minHeightAndWidth:{width:0,height:0}},contentDs:{attrs:{},dataAttrs:{},element:"div"},moreLess:{},content:"",layerMinHeightAndWidth:{width:0,height:0},layer:""};let __WEBPACK_DEFAULT_EXPORT__=LayerHolder;LayerHolder.__docgenInfo={description:"",methods:[],displayName:"LayerHolder",props:{wrapperDs:{defaultValue:{value:`{
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
//# sourceMappingURL=4690.116dc58e.iframe.bundle.js.map