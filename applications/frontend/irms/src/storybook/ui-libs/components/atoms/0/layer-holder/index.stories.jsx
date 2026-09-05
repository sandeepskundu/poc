import LayerHolder from 'aio-global-ui/atoms/0/layer-holder';

export default {
	title:"Atoms/0/LayerHolder",
	component:LayerHolder,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Button<br/><br /><strong>Import path:</strong><code>import LayerHolder from 'aio-global-ui/atoms/0/layer-holder';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/layer-holder/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		wrap:false,
		layer:{
			size:24,
			align:"c",
			dimensions:{
				width:'',
				height:''
			}
		},
		content:{
			text:{
				ds:{

				},
				markup:{

				}
			},
			wrapper:{
				markup:{

				}
			},
			toggle:{
				enabled:false
			}
		},
		dsTheme:{
			layer:{
				background:"c00404"
			},
			wrapper:{
				radius:"8",
				background:"c00206"
			},
			content:{
				color:"c00000"
			},
			container:{
				background:"c00206"
			}
		},
		config:{
			wrapper:{
				ds:{

				},
				attrs:{

				},
				markup:{
					element:"div"
				}
			},
			container:{
				ds:{

				},
				attrs:{

				},
				markup:{
					element:"div"
				}
			},
			content:{
				ds:{

				},
				attrs:{

				},
				markup:{
					element:"div"
				}
			},
			layer:{
				ds:{

				},
				attrs:{

				},
				markup:{
					element:"div"
				}
			}
		},
		attrs:{

		},
		dataAttrs:{

		}
	}
}