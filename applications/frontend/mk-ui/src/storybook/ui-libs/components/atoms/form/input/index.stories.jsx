import Input from 'aio-global-ui/atoms/form/input';

export default {
	title:"Atoms/Form/Input",
	component:Input,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Button storybook<br/><br /><strong>Import path:</strong><code>import Input from 'aio-global-ui/atoms/form/input';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/form/input/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		readonly:false,
		focused:false,
		highlight:false,
		asterisk:true,
		type:"text",
		label:"",
		value:"",
		placeholder:"",
		wrapperDs:{
			css:{

			}
		},
		inputWrapperDs:{
			css:{
				class:{
					shadow:"sm"
				},
				others:""
			},
			attrs:{

			},
			dataAttrs:{

			},
			ignoreLeftButtonRadius:true,
			ignoreRightButtonRadius:true
		},
		validation:{
			value:"",
			valid:true,
			message:"",
			error:false,
			validation:{
				checks:{
					regex:"",
					enums:"",
					minlength:0,
					maxlength:1000,
					required:""
				}
			}
		},
		dsThemeSample:{
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
		},
		theme:"000",
		leftLayerDs:{
			theme:{

			},
			css:{

			},
			attrs:{

			},
			dataAttrs:{

			}
		},
		leftLayer:"",
		rightLayerDs:{
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
		},
		rightLayer:"",
		attrs:{

		},
		dataAttrs:{

		}
	}
}

export const Primary = {
	args:{
		label:"Mandeep",
		toggle:false,
		con:"kundu"
	}
}

export const ButtonB = {
	args:{
		label:"Button B",
		toggle:false,
		con:"B Button"
	}
}

export const ButtonA = {
	args:{
		label:"Button A",
		toggle:false,
		con:"A Button"
	}
}