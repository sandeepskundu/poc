import Description from 'aio-global-ui/atoms/typography/text/description';

export default {
	title:"Atoms/Typography/Text/Description",
	component:Description,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Working from a pre-defined and limited container spacing system allows you to work faster and consistently.<br/><br /><strong>Import path:</strong><code>import Description from 'aio-global-ui/atoms/typography/text/description';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/typography/text/description</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		content:'',
		element:"p",
		ds:{
			css:{
				class:{
					margin:{
						1:"16",
						2:"0",
						3:"0",
						4:"0"
					},
					family:"rg",
					fontsize:"md"
				},
				flags:{
					boxSizing:true
				}
			}
		},
		moreLess:{
			lineClamp:5,
			enabled:false,
			moreLabel:"Read more",
			lessLabel:"Read less",
			alignMoreOption:"al"
		},
		attrs:{

		},
		dataAttrs:{

		}
	}
}