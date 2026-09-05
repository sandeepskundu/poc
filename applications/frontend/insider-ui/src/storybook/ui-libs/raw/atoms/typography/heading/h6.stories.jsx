import H6 from 'aio-global-raw-ui/atoms/typography/heading/h6';

export default {
	title:"Atoms/Typography/Heading/H6",
	argTypes:{

	},
	component:H6,
	tags:['autodocs'],
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"The Heading component is a typography component used to display titles, section headers, page headings, and other prominent textual elements throughout the application. It provides a consistent implementation of the design system's heading styles while maintaining proper semantic HTML structure and accessibility standards.<br/><br/><strong>Import path:</strong><code>import H6 from 'aio-global-raw-ui/atoms/typography/heading/h6';</code><br/><br/><strong>Component directory:</strong><code>./libs/frontend/ui/raw/atoms/typography/heading/h6</code><br/><br/>"
			}
		}
	},
	mockdata:{
		defaults:{
			config:{
				content:"H6 Heading"
			}
		},
		variants:{

		}
	}
}

export const Base = {
	args:{
		config:{
			markup:{
				element:"h6"
			},
			ds:{
				css:{
					class:{
						family:"md",
						fontsize:"xs"
					}
				}
			},
			content:"H6 Heading"
		}
	}
}