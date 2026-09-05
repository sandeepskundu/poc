import Bubble from 'aio-global-ui/atoms/0/bubble';

export default {
	title:"Atoms/0/Bubble",
	component:Bubble,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Tags (also known as “chips”) are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once.<br/><br /><strong>Import path:</strong><code>import Bubble from 'aio-global-ui/atoms/0/bubble';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/bubble/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		content:'',
		dsTheme:{
			color:"c00000",
			background:"c11407"
		},
		config:{
			attrs:{

			},
			markup:{
				element:"span"
			},
			ds:{
				css:{

				},
				theme:{
					border:{

					},
					background:{

					},
					colorPairing:{

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