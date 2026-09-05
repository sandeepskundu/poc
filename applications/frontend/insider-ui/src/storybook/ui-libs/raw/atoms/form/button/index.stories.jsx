import Button from 'aio-global-raw-ui/atoms/form/button';

export default {
	title:"Atoms/Form/Button",
	argTypes:{

	},
	component:Button,
	tags:['autodocs'],
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"The Button component is a reusable React UI component designed to provide a consistent button experience across the application. It supports customizable content, styling, and optional icons on both the left and right sides of the button label.<br/><br/><strong>Import path:</strong><code>import Button from 'aio-global-raw-ui/atoms/form/button';</code><br/><br/><strong>Component directory:</strong><code>./libs/frontend/ui/raw/atoms/form/button/index</code><br/><br/>"
			}
		}
	},
	mockdata:{
		defaults:{
			button:{
				content:"Button"
			}
		},
		variants:{

		}
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
		button:{
			markup:{
				element:"button"
			},
			ariaProps:{

			},
			states:{
				hover:false,
				active:false,
				disabled:false,
				wait:{
					enabled:false,
					content:''
				}
			},
			content:"Button"
		},
		icons:{
			left:{
				config:{
					markup:{
						element:"span"
					},
					type:"font",
					svg:{
						style:{

						},
						size:"24px"
					},
					icon:{
						name:"home",
						size:"24",
						family:"g"
					}
				}
			},
			right:{
				config:{
					markup:{
						element:"span"
					},
					type:"font",
					svg:{
						style:{

						},
						size:"24px"
					},
					icon:{
						name:"bell",
						size:"24",
						family:"g"
					}
				}
			}
		}
	}
}