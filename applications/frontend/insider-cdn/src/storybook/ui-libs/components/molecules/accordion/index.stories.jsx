import Accordion from 'aio-global-ui/molecules/accordion';

export default {
	title:"Molecules/Accordion",
	component:Accordion,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Accordion menu<br/><br /><strong>Import path:</strong><code>import Accordion from 'aio-global-ui/molecules/accordion';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/molecules/accordion/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		active:'',
		name:'',
		size:"md",
		openMultiple:false,
		wrapperDs:{
			divider:{
				ds:{

				},
				enabled:false,
				position:"top"
			},
			css:{
				class:{
					borderNone:{
						1:true,
						2:true,
						3:true,
						4:true
					}
				}
			},
			theme:{

			}
		},
		labelDs:{
			label:'',
			leftIcon:{

			},
			rightIcon:{

			},
			divider:{
				ds:{

				},
				enabled:false,
				position:"bottom"
			},
			attrs:{

			},
			dataAttrs:{

			},
			theme:{

			},
			css:{
				class:{
					family:"sb",
					fontsize:"md",
					padding:{

					}
				},
				flags:{
					animation:"anim"
				}
			}
		},
		contentDs:{
			css:{
				class:{

				},
				flags:{
					boxSizing:true
				}
			}
		},
		moreLess:{
			lineClamp:7,
			enabled:true,
			moreLabel:"Read more",
			lessLabel:"Read less",
			alignMoreOption:"al"
		},
		listOptions:[],
		attrs:{

		},
		dataAttrs:{

		}
	}
}