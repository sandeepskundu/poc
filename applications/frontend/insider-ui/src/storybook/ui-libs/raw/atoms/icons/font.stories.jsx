import Font from 'aio-global-raw-ui/atoms/icons/font';

export default {
	title:"Atoms/Icons/Font",
	argTypes:{

	},
	component:Font,
	tags:['autodocs'],
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"The Font Icon component is a reusable UI element that displays graphical symbols to communicate meaning, indicate actions, represent entities, and enhance visual hierarchy throughout the application. The component supports design system–driven customization, allowing properties such as size, color, and background to be configured through the design system. This ensures visual consistency, scalability, and alignment with the application's design standards across different use cases and themes.<br/><br/>Font icons are rendered using a font-based icon library, providing a lightweight and scalable approach to iconography. They inherit styling properties such as color, font size, and text effects through CSS, making them easy to customize and integrate consistently across the user interface. Font icons are particularly well suited for standard UI elements where efficient rendering, straightforward styling, and consistent visual presentation are required.<br/><br/><strong>Import path:</strong><code>import Font from 'aio-global-raw-ui/atoms/icons/font';</code><br/><br/><strong>Component directory:</strong><code>./libs/frontend/ui/raw/atoms/icons/font</code><br/><br/>"
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
			icon:{
				size:"24",
				family:"g",
				name:"home"
			}
		}
	}
}