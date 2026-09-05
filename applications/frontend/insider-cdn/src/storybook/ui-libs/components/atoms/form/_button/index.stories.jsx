import _button from 'aio-global-ui/atoms/form/_button';

export default {
	title:"Atoms/Form/_button",
	component:_button,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Button storybook<br/><br /><strong>Import path:</strong><code>import _button from 'aio-global-ui/atoms/form/_button';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/form/_button/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		buttonDs:{
			size:"sm",
			theme:"000",
			element:"span",
			css:{
				class:{
					shadow:"xs",
					radius:{
						1:6
					}
				}
			}
		},
		icoButtonDs:{
			name:'',
			color:'',
			size:"20",
			family:'',
			attrs:{

			},
			dataAttrs:{

			}
		},
		leftIconDs:{
			name:'',
			color:'',
			size:"20",
			family:'',
			attrs:{

			},
			dataAttrs:{

			}
		},
		rightIconDs:{
			name:'',
			color:'',
			size:"20",
			family:'',
			attrs:{

			},
			dataAttrs:{

			}
		},
		label:"Button",
		attrs:{

		},
		dataAttrs:{

		}
	}
}