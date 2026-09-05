import H5 from 'aio-global-ui/atoms/0/typography/heading/h5';

export default {
	title:"Atoms/0/Typography/Heading/H5",
	component:H5,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Badges help highlight important information, such as notifications or new and unread messages. They’re primarily used for communicating secondary or additional information to text.<br/><br /><strong>Import path:</strong><code>import H5 from 'aio-global-ui/atoms/0/typography/heading/h5';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/typography/heading/h5</code><br/><br/>"
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
			content:'',
			markup:{
				element:"h5"
			},
			ds:{
				css:{
					class:{
						family:"md",
						fontsize:"sm"
					},
					flags:{
						isDisplay:true
					}
				}
			}
		},
		attrs:{

		},
		dataAttrs:{

		}
	}
}