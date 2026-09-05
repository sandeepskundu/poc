import H2 from 'aio-global-ui/atoms/0/typography/heading/h2';

export default {
	title:"Atoms/0/Typography/Heading/H2",
	component:H2,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Badges help highlight important information, such as notifications or new and unread messages. They’re primarily used for communicating secondary or additional information to text.<br/><br /><strong>Import path:</strong><code>import H2 from 'aio-global-ui/atoms/0/typography/heading/h2';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/typography/heading/h2</code><br/><br/>"
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
				element:"h2"
			},
			ds:{
				css:{
					class:{
						family:"md",
						fontsize:"xl"
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