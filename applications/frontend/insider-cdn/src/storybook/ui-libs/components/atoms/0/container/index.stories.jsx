import Container from 'aio-global-ui/atoms/0/container';

export default {
	title:"Atoms/0/Container",
	component:Container,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Tags (also known as “chips”) are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once.<br/><br /><strong>Import path:</strong><code>import Container from 'aio-global-ui/atoms/0/container';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/container/index</code><br/><br/>"
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
			minHeight:1,
			color:"c00000",
			background:"c11407"
		},
		config:{
			attrs:{

			},
			markup:{
				element:"div"
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