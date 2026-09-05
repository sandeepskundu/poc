import Button from 'aio-global-ui/atoms/0/form/button';

export default {
	title:"Atoms/0/Form/Button",
	component:Button,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Button<br/><br /><strong>Import path:</strong><code>import Button from 'aio-global-ui/atoms/0/form/button';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/form/button/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		config:{
			button:{
				states:{
					disabled:false,
					wait:{
						enabled:false,
						content:"wait"
					}
				},
				ds:{
					theme:{
						default:{
							background:{
								default:"c11008"
							}
						},
						disabled:{
							background:{
								default:"c11008"
							}
						}
					}
				},
				attrs:{

				},
				content:"Save",
				ariaProps:{
					onBlur:null,
					onFocus:null,
					onPress:null,
					onPressUp:null,
					onPressEnd:null,
					onPressStart:null,
					onPressChange:null
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