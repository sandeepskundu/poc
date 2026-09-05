import Image from 'aio-global-raw-ui/atoms/image';

export default {
	title:"Atoms/Image",
	argTypes:{

	},
	component:Image,
	tags:['autodocs'],
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"The Image component renders visual media from a specified source and can be customized with properties such as alternative text, dimensions, object fit, loading behavior, and styling. It helps ensure images are displayed consistently across the application while maintaining accessibility and responsive design best practices.<br/><br/><strong>Import path:</strong><code>import Image from 'aio-global-raw-ui/atoms/image';</code><br/><br/><strong>Component directory:</strong><code>./libs/frontend/ui/raw/atoms/image/index</code><br/><br/>"
			}
		}
	},
	mockdata:{
		defaults:{
			src:"http://localhost:2200/insider-cdn/statics/images/avatar.jpg",
			config:{

			}
		},
		variants:{

		}
	}
}

export const Base = {
	args:{
		src:"http://localhost:2200/insider-cdn/statics/images/avatar.jpg",
		wrap:false,
		dsTheme:{
			radius:"4",
			image__d__thumbnail:28
		},
		config:{
			wrapper:{
				markup:{
					element:"div"
				}
			}
		}
	}
}