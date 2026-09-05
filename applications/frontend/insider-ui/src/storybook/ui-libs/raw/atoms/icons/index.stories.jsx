import Icons from 'aio-global-raw-ui/atoms/icons';

export default {
	title:"Atoms/Icons",
	argTypes:{

	},
	component:Icons,
	tags:['autodocs'],
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"The Icon component is a reusable UI element that displays graphical symbols to communicate meaning, indicate actions, represent entities, and enhance visual hierarchy throughout the application.<br/><br/>The component supports design system-driven customization, allowing you to configure properties such as size, color, and background through the design system configuration. This ensures visual consistency, scalability, and alignment with the application's design standards across different use cases and themes.<br/><br/>The component supports two icon types:<br/><br/><b>Font Icons</b> – Icons rendered using an icon font library, ideal for lightweight and scalable iconography.<br/><br/><b>SVG Icons</b> – Vector-based icons that provide greater flexibility, crisp rendering at all sizes, and support for advanced styling and customization.<br/><br/>By supporting both font and SVG icons, the component offers the flexibility to choose the most suitable icon format based on performance, design, and functional requirements while maintaining a consistent user experience.<br/><br/><strong>Import path:</strong><code>import Icons from 'aio-global-raw-ui/atoms/icons';</code><br/><br/><strong>Component directory:</strong><code>./libs/frontend/ui/raw/atoms/icons/index</code><br/><br/>"
			}
		}
	},
	mockdata:{
		defaults:{
			config:{
				icon:{
					name:"home"
				}
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
				element:"span"
			},
			type:"font",
			svg:{
				style:{

				},
				size:"24px"
			},
			icon:{
				name:"home",
				size:"24",
				family:"g"
			}
		}
	}
}