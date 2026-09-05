import Popover from 'aio-global-raw-ui/atoms/popover';

export default {
	title:"Atoms/Popover",
	argTypes:{

	},
	component:Popover,
	tags:['autodocs'],
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"The Image component renders visual media from a specified source and can be customized with properties such as alternative text, dimensions, object fit, loading behavior, and styling. It helps ensure images are displayed consistently across the application while maintaining accessibility and responsive design best practices.<br/><br/><strong>Import path:</strong><code>import Popover from 'aio-global-raw-ui/atoms/popover';</code><br/><br/><strong>Component directory:</strong><code>./libs/frontend/ui/raw/atoms/popover/index</code><br/><br/>"
			}
		}
	},
	mockdata:{
		defaults:{
			templates:{
				trigger:"Popup label",
				content:"This is sample body text and will get replaced with original content. This is sample body text and will get replaced with original content. This is sample body text and will get replaced with original content."
			}
		},
		variants:{

		}
	}
}

export const Base = {
	args:{
		controls:{
			open:false,
			arrow:true,
			mode:"static",
			toggle:"click",
			position:"bottom-right"
		},
		config:{
			wrapper:{
				markup:{
					element:"div"
				}
			},
			container:{
				markup:{
					element:"div"
				}
			},
			content:{
				markup:{
					element:"div"
				}
			},
			layer:{
				markup:{
					element:"div"
				}
			}
		},
		templates:{
			trigger:"Popup label",
			content:"This is sample body text and will get replaced with original content. This is sample body text and will get replaced with original content. This is sample body text and will get replaced with original content."
		}
	}
}