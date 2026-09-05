import Heading from 'aio-global-raw-ui/atoms/typography/heading';

export default {
	title:"Atoms/Typography/Heading",
	argTypes:{

	},
	component:Heading,
	tags:['autodocs'],
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"The Heading component is a typography component used to display titles, section headers, page headings, and other prominent textual elements throughout the application. It provides a consistent implementation of the design system's heading styles while maintaining proper semantic HTML structure and accessibility standards.<br/><br/><strong>Import path:</strong><code>import Heading from 'aio-global-raw-ui/atoms/typography/heading';</code><br/><br/><strong>Component directory:</strong><code>./libs/frontend/ui/raw/atoms/typography/heading/index</code><br/><br/>"
			}
		}
	},
	mockdata:{
		defaults:{
			config:{
				content:"Deafult Heading"
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
				element:"h1"
			},
			ds:{
				css:{
					class:{
						family:"md",
						fontsize:"xxl"
					}
				}
			},
			content:"Deafult Heading"
		}
	}
}