import Toggle from 'aio-global-ui/atoms/form/toggle';

export default {
	title:"Atoms/Form/Toggle",
	component:Toggle,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Toggle storybook<br/><br /><strong>Import path:</strong><code>import Toggle from 'aio-global-ui/atoms/form/toggle';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/form/toggle/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		layerDs:{
			css:{

			},
			size:"50",
			align:"tl",
			element:"div",
			minHeightAndWidth:{
				width:50,
				height:20
			}
		},
		labelDs:{
			element:"span",
			css:{
				class:{
					family:"md",
					fontsize:"sm"
				},
				flags:{
					isDisplay:false
				}
			}
		},
		descriptionDs:{
			css:{
				class:{
					fontsize:"sm",
					margin:{
						1:2,
						2:0,
						3:0,
						4:0
					}
				},
				flags:{
					boxSizing:true
				}
			}
		},
		label:'',
		name:'',
		description:'',
		value:'',
		checked:'',
		disabled:'',
		labelJsxTemplate:'',
		attrs:{

		},
		dataAttrs:{

		}
	}
}