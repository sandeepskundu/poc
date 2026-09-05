import Toggle from 'aio-global-ui/atoms/0/form/toggle';

export default {
	title:"Atoms/0/Form/Toggle",
	component:Toggle,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Button<br/><br /><strong>Import path:</strong><code>import Toggle from 'aio-global-ui/atoms/0/form/toggle';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/form/toggle/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		callback:{
			onBlur:null,
			onFocus:null,
			onPress:null,
			onClick:null,
			onPressUp:null,
			onPressEnd:null,
			onPressStart:null,
			onPressChange:null
		},
		config:{
			button:{
				attrs:{

				},
				content:'',
				ariaProps:{

				},
				states:{
					disabled:false,
					wait:{
						enabled:false,
						content:''
					}
				},
				ds:{
					theme:{
						default:{
							border:{

							},
							background:{

							}
						},
						disabled:{
							border:{

							},
							background:{

							}
						}
					}
				},
				markup:{
					element:"span"
				}
			},
			icons:{
				left:{

				},
				right:{

				}
			}
		},
		attrs:{

		},
		dataAttrs:{

		}
	}
}