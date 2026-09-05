import _indicator from 'aio-global-ui/atoms/_indicator';

export default {
	title:"Atoms/_indicator",
	component:_indicator,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Tags (also known as “chips”) are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once.<br/><br /><strong>Import path:</strong><code>import _indicator from 'aio-global-ui/atoms/_indicator';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/_indicator/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		wrapperDs:{
			size:"md",
			element:"div",
			contrast:false,
			theme:{
				background:{
					default:"c00506"
				}
			}
		},
		childDs:{
			element:"span"
		},
		image:'',
		attrs:{

		},
		dataAttrs:{

		}
	}
}