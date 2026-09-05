import Image from 'aio-global-ui/atoms/0/image';

export default {
	title:"Atoms/0/Image",
	component:Image,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Tags (also known as “chips”) are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once.<br/><br /><strong>Import path:</strong><code>import Image from 'aio-global-ui/atoms/0/image';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/image/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		src:"''",
		wrap:false,
		dsTheme:{
			image__d__thumbnail:"28"
		},
		wrapperDsTheme:{
			radius:"round"
		},
		config:{
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
			},
			image:{
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