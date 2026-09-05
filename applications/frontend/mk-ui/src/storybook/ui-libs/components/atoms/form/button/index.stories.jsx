import Button from 'aio-global-ui/atoms/form/button';

export default {
	title:"Atoms/Form/Button",
	component:Button,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Button storybook<br/><br /><strong>Import path:</strong><code>import Button from 'aio-global-ui/atoms/form/button';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/form/button/index</code><br/><br/>"
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
			name:"",
			color:"",
			size:"20",
			family:"",
			attrs:{

			},
			dataAttrs:{

			}
		},
		leftIconDs:{
			name:"",
			color:"",
			size:"20",
			family:"",
			attrs:{

			},
			dataAttrs:{

			}
		},
		rightIconDs:{
			name:"",
			color:"",
			size:"20",
			family:"",
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