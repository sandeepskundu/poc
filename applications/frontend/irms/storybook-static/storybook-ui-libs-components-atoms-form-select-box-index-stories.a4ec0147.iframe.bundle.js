"use strict";(self.webpackChunkirms=self.webpackChunkirms||[]).push([[4584],{"./src/storybook/ui-libs/components/atoms/form/select-box/index.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Base:()=>Base,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});var prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),ui_helpers=__webpack_require__("./build/scripts/ui-helpers/index.js"),icon=__webpack_require__("./scrap/ui-libs/components/atoms/icon/index.jsx"),input=__webpack_require__("./scrap/ui-libs/components/atoms/form/input/index.jsx"),popup_box=__webpack_require__("./scrap/ui-libs/components/molecules/popup-box/index.jsx"),react=__webpack_require__("./node_modules/react/index.js");function _array_like_to_array(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _array_with_holes(arr){if(Array.isArray(arr))return arr}function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _iterable_to_array_limit(arr,i){var _s,_e,_i=null==arr?null:"u">typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null!=_i){var _arr=[],_n=!0,_d=!1;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{_n||null==_i.return||_i.return()}finally{if(_d)throw _e}}return _arr}}function _non_iterable_rest(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}function _sliced_to_array(arr,i){return _array_with_holes(arr)||_iterable_to_array_limit(arr,i)||_unsupported_iterable_to_array(arr,i)||_non_iterable_rest()}function _unsupported_iterable_to_array(o,minLen){if(o){if("string"==typeof o)return _array_like_to_array(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if("Object"===n&&o.constructor&&(n=o.constructor.name),"Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _array_like_to_array(o,minLen)}}var SelectBox=function SelectBox(dprops){var props=ui_helpers.element.jsx.props.define({placeholder:"",asterisk:!1,optionTemplate:"",noDefaultRightIcon:!1,active:!1,openOnHover:!1,selected:{},onChange:null,onFocus:null,onBlur:null,optionDs:{attrs:{},element:"div",dataAttrs:{},ds:{othersS:{odd:{default:{theme:{colorPairing:{default:"022",hover:"007"}}}},even:{default:{theme:{colorPairing:{default:"032",hover:"039"}}}},last:{default:{theme:{colorPairing:{default:"033",hover:"032"}}}}},indexBasisS:{0:{default:{theme:{colorPairing:{default:"046",hover:"012"}}},selected:{theme:{colorPairing:{default:"011",hover:"012"}}}}},default:{theme:{colorPairing:{_default:"027",hover:"000"}},css:{class:{padding:{1:10,2:10,3:10,4:10}}}},selected:{theme:{colorPairing:{default:"026"}}}}},rightIconDs:"",keyMapping:{label:"label",selection:"id"},lableProps:{label:"",placeholder:"",asterisk:!0,attrs:{},theme:{},inputDs:{},dataAttrs:{},wrapperDs:{},leftLayer:"",rightLayer:"",inputWrapperDs:{},leftLayerDs:{css:{},theme:{},attrs:{},dataAttrs:{}},rightLayerDs:{css:{},theme:{},attrs:{},dataAttrs:{}},onBlur:!1,onFocus:!1,onChange:!1},contentProps:{bodyDs:{css:{class:{padding:{2:0,4:0}}}},wrapperDs:{},popupShadow:"lg",popupClassName:"",popupBorderRadius:8,wrapperElement:"div",popupAlignFrom:"left",popupColorPairing:"025"}},dprops),sel=!1,id=ui_helpers.random.id(10),_useState=_sliced_to_array((0,react.useState)(!1),2),active=_useState[0],setActive=_useState[1],options=ui_helpers.json.val(props,"options",[]),rghtIco=ui_helpers.json.val(props,"rightLayer",""),lblKey=ui_helpers.json.val(props,"keyMapping.label"),selKey=ui_helpers.json.val(props,"keyMapping.selection"),dRigthIco=ui_helpers.json.val(props,"noDefaultRightIcon");(0,react.useEffect)(function(){setTimeout(function(){setActive(props.active)},0)},[props.active]);var onClose=function onClose(){setActive(!1)},isSelected=function isSelected(item,index){var rval=!1,sKey=ui_helpers.json.val(props.selected,selKey);return!sel&&sKey&&sKey===ui_helpers.json.val(item,selKey)&&(sel={data:item,index:index},rval=!0),rval},getOptionsClassName=function getOptionsClassName(opDs,item,index,isSelected,total){var rv=[],last=!1,odEvn="odd",ds=ui_helpers.json.val(opDs,"ds.default",{});return index%2==0&&(odEvn="even"),ds=ui_helpers.json.merge(ds,ui_helpers.json.val(opDs,"ds.others.".concat(odEvn,".default"),{})),index==total-1&&(last=!0),last&&(ds=ui_helpers.json.merge(ds,ui_helpers.json.val(opDs,"ds.others.last.default",{}))),ds=ui_helpers.json.merge(ds,ui_helpers.json.val(opDs,"ds.indexBasis.".concat(index,".default"),{})),isSelected?(ds=ui_helpers.json.merge(ds,ui_helpers.json.val(opDs,"ds.selected",{})),ds=ui_helpers.json.merge(ds,ui_helpers.json.val(opDs,"ds.others.".concat(odEvn,".selected"),{})),ds=ui_helpers.json.merge(ds,ui_helpers.json.val(opDs,"ds.indexBasis.".concat(index,".selected"),{})),last&&(ds=ui_helpers.json.merge(ds,ui_helpers.json.val(opDs,"ds.others.last.selected",{})))):rv.push("cp"),rv.push(odEvn),0===index&&rv.push("frist"),index===total-1&&rv.push("last"),ui_helpers.element.jsx.css.get(ds,rv.join(" "))},onOptionSelect=function onOptionSelect(element,item,index,isSelected){var os=ui_helpers.data.type.get(props.onSelect,"function");sel=item,onClose(),os&&props.onSelect(element,item,index)},getOptionsAttrs=function getOptionsAttrs(item,index,isSelected,total){var opDs=ui_helpers.json.val(props,"optionDs",{}),rval=_object_spread({},ui_helpers.element.jsx.attrs(opDs,!1,"attrs"),{className:getOptionsClassName(opDs,item,index,isSelected,total)});return rval.onClick=function(e){onOptionSelect(e,item,index,isSelected)},rval},itemChild=function itemChild(item,index,selctd){if(!props.optionTemplate)return ui_helpers.json.val(item,lblKey,"");var Comp=props.optionTemplate;switch(ui_helpers.data.type.get(props.optionTemplate)){case"function":return props.optionTemplate(item,index,selctd);case"string":return props.optionTemplate;default:return react.createElement(Comp,{data:item,index:index,selected:selctd})}},contentList=function contentList(){var index=-1,arr=ui_helpers.data.type.is(options,"array"),elm=ui_helpers.json.val(props,"optionDs.element","div");return arr&&options.length>0?options.map(function(item,num){var selctd=isSelected(item,index+=1);return(0,react.createElement)(elm,_object_spread({},getOptionsAttrs(item,index,selctd,options.length),{key:"".concat(id+index)}),itemChild(item,index,selctd))}):react.createElement(react.Fragment,null)};return react.createElement(react.Fragment,null,react.createElement(popup_box.A,{active:active,onOpen:function onOpen(active,pprops){setActive(!0)},onClose:onClose,action:react.createElement(input.A,{value:ui_helpers.json.val(props.selected,lblKey),readonly:!0,onBlur:function onBlur(){},onFocus:function onFocus(){},onChange:function onChange(){},rightLayer:dRigthIco||rghtIco?rghtIco:react.createElement(icon.A,ui_helpers.json.merge({icon:{size:20,name:"tick"}},ui_helpers.json.val(props,"rightIconDs",{}))),rightLayerDs:ui_helpers.json.merge({wrapperDs:{css:{class:{margin:{1:0,2:16,3:0,4:0}}}}},ui_helpers.json.val(props,"labelProps.rightLayerDs",{})),label:ui_helpers.json.val(props,"label",""),asterisk:ui_helpers.json.val(props,"asterisk",""),placeholder:ui_helpers.json.val(props,"placeholder",""),attrs:ui_helpers.json.val(props,"labelProps.attrs",{}),wrapperDs:ui_helpers.json.val(props,"labelProps.wrapperDs",{}),dataAttrs:ui_helpers.json.val(props,"labelProps.dataAttrs",{}),leftLayer:ui_helpers.json.val(props,"labelProps.leftLayer",""),validation:ui_helpers.json.val(props,"labelProps.validation",{}),leftLayerDs:ui_helpers.json.val(props,"labelProps.leftLayerDs",{}),inputWrapperDs:ui_helpers.json.val(props,"labelProps.inputWrapperDs",{})}),content:props.content?"function"===ui_helpers.data.type.get(props.content)?props.content(_object_spread({},props,{ids:ids})):props.content||"":props.children?props.children:contentList(),openStateControlByPartent:!0,openOnHover:ui_helpers.json.val(props,"openOnHover"),bodyDs:ui_helpers.json.val(props,"contentProps.bodyDs",{}),wrapperDs:ui_helpers.json.val(props,"contentProps.wrapperDs",{}),popupShadow:ui_helpers.json.val(props,"contentProps.popupShadow",""),popupClassName:ui_helpers.json.val(props,"contentProps.popupClassName",""),wrapperElement:ui_helpers.json.val(props,"contentProps.wrapperElement",""),popupAlignFrom:ui_helpers.json.val(props,"contentProps.popupAlignFrom",""),popupColorPairing:ui_helpers.json.val(props,"contentProps.popupColorPairing",""),popupBorderRadius:ui_helpers.json.val(props,"contentProps.popupBorderRadius","")}))};SelectBox.propTypes={label:prop_types_default().string.isRequired,placeholder:prop_types_default().string,asterisk:prop_types_default().bool,optionTemplate:prop_types_default().anything,noDefaultRightIcon:prop_types_default().bool,active:prop_types_default().bool,openOnHover:prop_types_default().bool,selected:prop_types_default().object,onChange:prop_types_default().func,onFocus:prop_types_default().func,onBlur:prop_types_default().func,optionDs:prop_types_default().object,rightIconDs:"",keyMapping:prop_types_default().object,lableProps:prop_types_default().object,contentProps:prop_types_default().object},SelectBox.defaultProps={placeholder:"",asterisk:!1,optionTemplate:"",noDefaultRightIcon:!1,active:!1,openOnHover:!1,selected:{},onChange:null,onFocus:null,onBlur:null,optionDs:{attrs:{},element:"div",dataAttrs:{},ds:{othersS:{odd:{default:{theme:{colorPairing:{default:"022",hover:"007"}}}},even:{default:{theme:{colorPairing:{default:"032",hover:"039"}}}},last:{default:{theme:{colorPairing:{default:"033",hover:"032"}}}}},indexBasisS:{0:{default:{theme:{colorPairing:{default:"046",hover:"012"}}},selected:{theme:{colorPairing:{default:"011",hover:"012"}}}}},default:{theme:{colorPairing:{_default:"027",hover:"000"}},css:{class:{padding:{1:10,2:10,3:10,4:10}}}},selected:{theme:{colorPairing:{default:"026"}}}}},rightIconDs:"",keyMapping:{label:"label",selection:"id"},lableProps:{label:"",placeholder:"",asterisk:!0,attrs:{},theme:{},inputDs:{},dataAttrs:{},wrapperDs:{},leftLayer:"",rightLayer:"",inputWrapperDs:{},leftLayerDs:{css:{},theme:{},attrs:{},dataAttrs:{}},rightLayerDs:{css:{},theme:{},attrs:{},dataAttrs:{}},onBlur:!1,onFocus:!1,onChange:!1},contentProps:{bodyDs:{css:{class:{padding:{2:0,4:0}}}},wrapperDs:{},popupShadow:"lg",popupClassName:"",popupBorderRadius:8,wrapperElement:"div",popupAlignFrom:"left",popupColorPairing:"025"}};let select_box=react.memo(SelectBox);SelectBox.__docgenInfo={description:"",methods:[],displayName:"SelectBox",props:{placeholder:{defaultValue:{value:'""',computed:!1},description:"It can be JSX template, string or function",type:{name:"string"},required:!1},asterisk:{defaultValue:{value:"false",computed:!1},description:"No default right icon handles display login of right side default icon, if value is passed s true the default right icon will display on UI.",type:{name:"bool"},required:!1},optionTemplate:{defaultValue:{value:'""',computed:!1},description:"It can be JSX template, string or function",type:{name:"custom",raw:"propTypes.anything"},required:!1},noDefaultRightIcon:{defaultValue:{value:"false",computed:!1},description:"No default right icon handles display login of right side default icon, if value is passed s true the default right icon will display on UI.",type:{name:"bool"},required:!1},active:{defaultValue:{value:"false",computed:!1},description:"A boolend value of state, that select box is in active state or not",type:{name:"bool"},required:!1},openOnHover:{defaultValue:{value:"false",computed:!1},description:"A boolend value for opening state, that select box should open on hover of action",type:{name:"bool"},required:!1},selected:{defaultValue:{value:`{

}`,computed:!1},description:"Default selected",type:{name:"object"},required:!1},onChange:{defaultValue:{value:"null",computed:!1},description:"onChange callback function",type:{name:"func"},required:!1},onFocus:{defaultValue:{value:"null",computed:!1},description:"Button size can have any value from below options",type:{name:"func"},required:!1},onBlur:{defaultValue:{value:"null",computed:!1},description:"Button size can have any value from below options",type:{name:"func"},required:!1},optionDs:{defaultValue:{value:`{
	attrs:{

	},
	element:"div",
	dataAttrs:{

	},
	ds:{
		othersS:{
			odd:{
				default:{
					theme:{
						colorPairing:{
							default:"022",
							hover:"007"
						}
					}
				}
			},
			even:{
				default:{
					theme:{
						colorPairing:{
							default:"032",
							hover:"039"
						}
					}
				}
			},
			last:{
				default:{
					theme:{
						colorPairing:{
							default:"033",
							hover:"032"
						}
					}
				}
			}
		},
		indexBasisS:{
			0:{
				default:{
					theme:{
						colorPairing:{
							default:"046",
							hover:"012"
						}
					}
				},
				selected:{
					theme:{
						colorPairing:{
							default:"011",
							hover:"012"
						}
					}
				}
			}
		},
		default:{
			theme:{
				colorPairing:{
					_default:"027",
					hover:"000"
				}
			},
			css:{
				class:{
					padding:{
						1:10,
						2:10,
						3:10,
						4:10
					}
				}
			}
		},
		selected:{
			theme:{
				colorPairing:{
					default:"026"
				}
			}
		}
	}
}`,computed:!1},description:"optionDs",type:{name:"object"},required:!1},rightIconDs:{defaultValue:{value:'""',computed:!1},description:"rightIconDs",type:{name:"custom",raw:'""'},required:!1},keyMapping:{defaultValue:{value:`{
	label:"label",
	selection:"id"
}`,computed:!1},description:"key mapping props cantinas the flags of props that from where label will display of selected item will mapped by which key name",type:{name:"object"},required:!1},lableProps:{defaultValue:{value:`{
	label:'',
	placeholder:'',
	asterisk:true,
	attrs:{

	},
	theme:{

	},
	inputDs:{

	},
	dataAttrs:{

	},
	wrapperDs:{

	},
	leftLayer:'',
	rightLayer:'',
	inputWrapperDs:{

	},
	leftLayerDs:{
		css:{

		},
		theme:{

		},
		attrs:{

		},
		dataAttrs:{

		}
	},
	rightLayerDs:{
		css:{

		},
		theme:{

		},
		attrs:{

		},
		dataAttrs:{

		}
	},
	onBlur:false,
	onFocus:false,
	onChange:false
}`,computed:!1},description:"lableProps",type:{name:"object"},required:!1},contentProps:{defaultValue:{value:`{
	bodyDs:{
		css:{
			class:{
				padding:{
					2:0,
					4:0
				}
			}
		}
	},
	wrapperDs:{

	},
	popupShadow:"lg",
	popupClassName:'',
	popupBorderRadius:8,
	wrapperElement:"div",
	popupAlignFrom:"left",
	popupColorPairing:"025"
}`,computed:!1},description:"contentProps",type:{name:"object"},required:!1},label:{description:"It can be JSX template, string or function",type:{name:"string"},required:!0}}};let index_stories={title:"Atoms/Form/SelectBox",component:select_box,parameters:{layout:"centered",docs:{description:{component:"Select box storybook<br/><br /><strong>Import path:</strong><code>import SelectBox from 'aio-global-ui/atoms/form/select-box';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/form/select-box/index</code><br/><br/>"}}},tags:["autodocs"],argTypes:{}};var Base={args:{label:"",placeholder:"",asterisk:!1,optionTemplate:"",noDefaultRightIcon:!1,active:!1,openOnHover:!1,selected:{},optionDs:{attrs:{},element:"div",dataAttrs:{},ds:{othersS:{odd:{default:{theme:{colorPairing:{default:"022",hover:"007"}}}},even:{default:{theme:{colorPairing:{default:"032",hover:"039"}}}},last:{default:{theme:{colorPairing:{default:"033",hover:"032"}}}}},indexBasisS:{0:{default:{theme:{colorPairing:{default:"046",hover:"012"}}},selected:{theme:{colorPairing:{default:"011",hover:"012"}}}}},default:{theme:{colorPairing:{_default:"027",hover:"000"}},css:{class:{padding:{1:10,2:10,3:10,4:10}}}},selected:{theme:{colorPairing:{default:"026"}}}}},rightIconDs:{},keyMapping:{label:"label",selection:"id"},lableProps:{label:"",placeholder:"",asterisk:!0,attrs:{},theme:{},inputDs:{},dataAttrs:{},wrapperDs:{},leftLayer:"",rightLayer:"",inputWrapperDs:{},leftLayerDs:{css:{},theme:{},attrs:{},dataAttrs:{}},rightLayerDs:{css:{},theme:{},attrs:{},dataAttrs:{}},onBlur:!1,onFocus:!1,onChange:!1},contentProps:{bodyDs:{css:{class:{padding:{2:0,4:0}}}},wrapperDs:{},popupShadow:"lg",popupClassName:"",popupBorderRadius:8,wrapperElement:"div",popupAlignFrom:"left",popupColorPairing:"025"},attrs:{},dataAttrs:{}}};Base.parameters={...Base.parameters,docs:{...Base.parameters?.docs,source:{originalSource:`{
  args: {
    label: '',
    placeholder: '',
    asterisk: false,
    optionTemplate: '',
    noDefaultRightIcon: false,
    active: false,
    openOnHover: false,
    selected: {},
    optionDs: {
      attrs: {},
      element: "div",
      dataAttrs: {},
      ds: {
        othersS: {
          odd: {
            default: {
              theme: {
                colorPairing: {
                  default: "022",
                  hover: "007"
                }
              }
            }
          },
          even: {
            default: {
              theme: {
                colorPairing: {
                  default: "032",
                  hover: "039"
                }
              }
            }
          },
          last: {
            default: {
              theme: {
                colorPairing: {
                  default: "033",
                  hover: "032"
                }
              }
            }
          }
        },
        indexBasisS: {
          0: {
            default: {
              theme: {
                colorPairing: {
                  default: "046",
                  hover: "012"
                }
              }
            },
            selected: {
              theme: {
                colorPairing: {
                  default: "011",
                  hover: "012"
                }
              }
            }
          }
        },
        default: {
          theme: {
            colorPairing: {
              _default: "027",
              hover: "000"
            }
          },
          css: {
            class: {
              padding: {
                1: 10,
                2: 10,
                3: 10,
                4: 10
              }
            }
          }
        },
        selected: {
          theme: {
            colorPairing: {
              default: "026"
            }
          }
        }
      }
    },
    rightIconDs: {},
    keyMapping: {
      label: "label",
      selection: "id"
    },
    lableProps: {
      label: '',
      placeholder: '',
      asterisk: true,
      attrs: {},
      theme: {},
      inputDs: {},
      dataAttrs: {},
      wrapperDs: {},
      leftLayer: '',
      rightLayer: '',
      inputWrapperDs: {},
      leftLayerDs: {
        css: {},
        theme: {},
        attrs: {},
        dataAttrs: {}
      },
      rightLayerDs: {
        css: {},
        theme: {},
        attrs: {},
        dataAttrs: {}
      },
      onBlur: false,
      onFocus: false,
      onChange: false
    },
    contentProps: {
      bodyDs: {
        css: {
          class: {
            padding: {
              2: 0,
              4: 0
            }
          }
        }
      },
      wrapperDs: {},
      popupShadow: "lg",
      popupClassName: '',
      popupBorderRadius: 8,
      wrapperElement: "div",
      popupAlignFrom: "left",
      popupColorPairing: "025"
    },
    attrs: {},
    dataAttrs: {}
  }
}`,...Base.parameters?.docs?.source}}};let __namedExportsOrder=["Base"]}}]);
//# sourceMappingURL=storybook-ui-libs-components-atoms-form-select-box-index-stories.a4ec0147.iframe.bundle.js.map