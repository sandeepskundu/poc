"use strict";(self.webpackChunkirms=self.webpackChunkirms||[]).push([[1041],{"./src/storybook/ui-libs/components/atoms/0/form/button-group/index.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Base:()=>Base,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});var prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),ui_helpers=__webpack_require__("./build/scripts/ui-helpers/index.js"),react=__webpack_require__("./node_modules/react/index.js"),form_button=__webpack_require__("./scrap/ui-libs/components/atoms/0/form/button/index.jsx"),React=__webpack_require__("./node_modules/react/index.js"),Comp=(0,react.forwardRef)(function(dprops,forwardedRef){forwardedRef||(0,react.useRef)(null);var _props_config,props=ui_helpers.element.jsx.props.define({callback:{onBlur:null,onFocus:null,onPress:null,onClick:null,onPressUp:null,onPressEnd:null,onPressStart:null,onPressChange:null},config:{buttons:{0:{button:{content:0,states:{disabled:!0}}},1:{button:{content:1,states:{active:!0,disabled:!1}}},2:{button:{content:2,states:{disabled:!1}}}},theme:{default:{button:{ds:{predefined:{size:"sm",theme:"001"},css:{class:{shadow:"sm"}}},markup:{element:"label"}}},active:{button:{ds:{css:{},states:{},predefined:{}}}},disabled:{button:{ds:{css:{},states:{},predefined:{}}}}},wrapper:{attrs:{},ds:{theme:{border:{},background:{}},css:{class:{padding:{1:6,2:8}}}}}}},dprops),callbacks=ui_helpers.json.get(props,"callback",{}),buttonList=ui_helpers.json.get(props,"config.buttons",{}),wrapperAttr=ui_helpers.element.jsx.attrs((null==props||null==(_props_config=props.config)?void 0:_props_config.wrapper)||{},"flx-vc btn-grp"),list=ui_helpers.json.toList(buttonList),btnConfig=function btnConfig(arg,i){var dt=ui_helpers.json.get(props,"config.theme.default",{}),active=ui_helpers.json.get(arg,"button.states.active",!1),disabled=ui_helpers.json.get(arg,"button.states.disabled",!1);return disabled&&(dt=ui_helpers.json.merge(dt,ui_helpers.json.get(props,"config.theme.disabled",{}))),!disabled&&active&&(dt=ui_helpers.json.merge(dt,ui_helpers.json.get(props,"config.theme.active",{}))),ui_helpers.json.merge(dt,arg)},hldCls=function hldCls(arg,i){var rv=["btn-hldr"];return(0===i||"0"===i)&&rv.push("first"),list.length-1===i&&rv.push("last"),rv.join(" ")};return list&&list.length>0?React.createElement("ul",wrapperAttr,list.map(function(arg,i){return React.createElement("li",{className:hldCls(arg,i)},React.createElement(form_button.A,{callback:callbacks,config:btnConfig(arg,i)}))})):React.createElement(React.Fragment,null)});Comp.propTypes={callback:prop_types_default().object,config:prop_types_default().object},Comp.defaultProps={callback:{onBlur:null,onFocus:null,onPress:null,onClick:null,onPressUp:null,onPressEnd:null,onPressStart:null,onPressChange:null},config:{buttons:{0:{button:{content:0,states:{disabled:!0}}},1:{button:{content:1,states:{active:!0,disabled:!1}}},2:{button:{content:2,states:{disabled:!1}}}},theme:{default:{button:{ds:{predefined:{size:"sm",theme:"001"},css:{class:{shadow:"sm"}}},markup:{element:"label"}}},active:{button:{ds:{css:{},states:{},predefined:{}}}},disabled:{button:{ds:{css:{},states:{},predefined:{}}}}},wrapper:{attrs:{},ds:{theme:{border:{},background:{}},css:{class:{padding:{1:6,2:8}}}}}}},Comp.__docgenInfo={description:"",methods:[],displayName:"Comp",props:{callback:{defaultValue:{value:`{
	onBlur:null,
	onFocus:null,
	onPress:null,
	onClick:null,
	onPressUp:null,
	onPressEnd:null,
	onPressStart:null,
	onPressChange:null
}`,computed:!1},description:"Callback functions",type:{name:"object"},required:!1},config:{defaultValue:{value:`{
	buttons:{
		0:{
			button:{
				content:0,
				states:{
					disabled:true
				}
			}
		},
		1:{
			button:{
				content:1,
				states:{
					active:true,
					disabled:false
				}
			}
		},
		2:{
			button:{
				content:2,
				states:{
					disabled:false
				}
			}
		}
	},
	theme:{
		default:{
			button:{
				ds:{
					predefined:{
						size:"sm",
						theme:"001"
					},
					css:{
						class:{
							shadow:"sm"
						}
					}
				},
				markup:{
					element:"label"
				}
			}
		},
		active:{
			button:{
				ds:{
					css:{

					},
					states:{

					},
					predefined:{

					}
				}
			}
		},
		disabled:{
			button:{
				ds:{
					css:{

					},
					states:{

					},
					predefined:{

					}
				}
			}
		}
	},
	wrapper:{
		attrs:{

		},
		ds:{
			theme:{
				border:{

				},
				background:{

				}
			},
			css:{
				class:{
					padding:{
						1:6,
						2:8
					}
				}
			}
		}
	}
}`,computed:!1},description:"Button Group",type:{name:"object"},required:!1}}};let index_stories={title:"Atoms/0/Form/ButtonGroup",component:Comp,parameters:{layout:"centered",docs:{description:{component:"Button group<br/><br /><strong>Import path:</strong><code>import ButtonGroup from 'aio-global-ui/atoms/0/form/button-group';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/form/button-group/index</code><br/><br/>"}}},tags:["autodocs"],argTypes:{}};var Base={args:{callback:{onBlur:null,onFocus:null,onPress:null,onClick:null,onPressUp:null,onPressEnd:null,onPressStart:null,onPressChange:null},config:{buttons:{0:{button:{content:0,states:{disabled:!0}}},1:{button:{content:1,states:{active:!0,disabled:!1}}},2:{button:{content:2,states:{disabled:!1}}}},theme:{default:{button:{ds:{predefined:{size:"sm",theme:"001"},css:{class:{shadow:"sm"}}},markup:{element:"label"}}},active:{button:{ds:{css:{},states:{},predefined:{}}}},disabled:{button:{ds:{css:{},states:{},predefined:{}}}}},wrapper:{attrs:{},ds:{theme:{border:{},background:{}},css:{class:{padding:{1:6,2:8}}}}}},attrs:{},dataAttrs:{}}};Base.parameters={...Base.parameters,docs:{...Base.parameters?.docs,source:{originalSource:`{
  args: {
    callback: {
      onBlur: null,
      onFocus: null,
      onPress: null,
      onClick: null,
      onPressUp: null,
      onPressEnd: null,
      onPressStart: null,
      onPressChange: null
    },
    config: {
      buttons: {
        0: {
          button: {
            content: 0,
            states: {
              disabled: true
            }
          }
        },
        1: {
          button: {
            content: 1,
            states: {
              active: true,
              disabled: false
            }
          }
        },
        2: {
          button: {
            content: 2,
            states: {
              disabled: false
            }
          }
        }
      },
      theme: {
        default: {
          button: {
            ds: {
              predefined: {
                size: "sm",
                theme: "001"
              },
              css: {
                class: {
                  shadow: "sm"
                }
              }
            },
            markup: {
              element: "label"
            }
          }
        },
        active: {
          button: {
            ds: {
              css: {},
              states: {},
              predefined: {}
            }
          }
        },
        disabled: {
          button: {
            ds: {
              css: {},
              states: {},
              predefined: {}
            }
          }
        }
      },
      wrapper: {
        attrs: {},
        ds: {
          theme: {
            border: {},
            background: {}
          },
          css: {
            class: {
              padding: {
                1: 6,
                2: 8
              }
            }
          }
        }
      }
    },
    attrs: {},
    dataAttrs: {}
  }
}`,...Base.parameters?.docs?.source}}};let __namedExportsOrder=["Base"]}}]);
//# sourceMappingURL=storybook-ui-libs-components-atoms-0-form-button-group-index-stories.26ec1af0.iframe.bundle.js.map