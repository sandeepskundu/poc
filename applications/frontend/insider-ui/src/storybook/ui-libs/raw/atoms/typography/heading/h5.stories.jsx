import H5 from 'aio-global-raw-ui/atoms/typography/heading/h5';

export default {
	title:"Atoms/Typography/Heading/H5",
	argTypes:{

	},
	component:H5,
	tags:['autodocs'],
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"The Heading component is a typography component used to display titles, section headers, page headings, and other prominent textual elements throughout the application. It provides a consistent implementation of the design system's heading styles while maintaining proper semantic HTML structure and accessibility standards.<br/><br/><strong>Import path:</strong><code>import H5 from 'aio-global-raw-ui/atoms/typography/heading/h5';</code><br/><br/><strong>Component directory:</strong><code>./libs/frontend/ui/raw/atoms/typography/heading/h5</code><br/><br/>"
			}
		}
	},
	mockdata:{
		defaults:{
			config:{
				content:"H5 Heading"
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
				element:"h5"
			},
			ds:{
				css:{
					class:{
						family:"md",
						fontsize:"sm"
					}
				}
			},
			content:"H5 Heading"
		}
	}
}