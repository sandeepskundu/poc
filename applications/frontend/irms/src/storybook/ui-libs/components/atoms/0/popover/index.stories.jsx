import Popover from 'aio-global-ui/atoms/0/popover';

export default {
	title:"Atoms/0/Popover",
	component:Popover,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Tags (also known as “chips”) are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once.<br/><br /><strong>Import path:</strong><code>import Popover from 'aio-global-ui/atoms/0/popover';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/popover/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		defaults:{

		},
		templates:{
			trigger:null,
			content:null
		},
		dsTheme:{
			wrapper:{

			},
			content:{
				radius:8,
				border:"c00208",
				background:"c00307"
			}
		},
		controls:{
			open:false,
			arrow:true,
			mode:"static",
			toggle:"hover",
			position:"bottom-right"
		},
		config:{
			content:{
				markup:{
					element:"div"
				},
				attrs:{

				},
				ds:{
					css:{

					},
					theme:{

					}
				}
			},
			wrapper:{
				markup:{
					element:"div"
				},
				attrs:{

				},
				ds:{
					css:{

					},
					theme:{

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