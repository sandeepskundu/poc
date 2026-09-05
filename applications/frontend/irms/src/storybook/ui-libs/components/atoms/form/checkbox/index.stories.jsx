import Checkbox from 'aio-global-ui/atoms/form/checkbox';

export default {
	title:"Atoms/Form/Checkbox",
	component:Checkbox,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Checkbox storybook<br/><br /><strong>Import path:</strong><code>import Checkbox from 'aio-global-ui/atoms/form/checkbox';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/form/checkbox/index</code><br/><br/>"
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
			size:"34",
			align:"tl",
			element:"div",
			minHeightAndWidth:{
				width:34,
				height:18
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