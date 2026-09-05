import H1 from 'aio-global-raw-ui/atoms/typography/heading/h1';

export default {
	title:"Atoms/Typography/Heading/H1",
	argTypes:{

	},
	component:H1,
	tags:['autodocs'],
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"The Heading component is a typography component used to display titles, section headers, page headings, and other prominent textual elements throughout the application. It provides a consistent implementation of the design system's heading styles while maintaining proper semantic HTML structure and accessibility standards.<br/><br/><strong>Import path:</strong><code>import H1 from 'aio-global-raw-ui/atoms/typography/heading/h1';</code><br/><br/><strong>Component directory:</strong><code>./libs/frontend/ui/raw/atoms/typography/heading/h1</code><br/><br/>"
			}
		}
	},
	mockdata:{
		defaults:{
			config:{
				content:"H1 Heading"
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
			content:"H1 Heading"
		}
	}
}