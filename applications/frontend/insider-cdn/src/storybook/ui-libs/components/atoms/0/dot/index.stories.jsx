import Dot from 'aio-global-ui/atoms/0/dot';

export default {
	title:"Atoms/0/Dot",
	component:Dot,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Button<br/><br /><strong>Import path:</strong><code>import Dot from 'aio-global-ui/atoms/0/dot';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/dot/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		color:{
			hover:'',
			default:"c00106"
		},
		dsTheme:{
			size:''
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

				}
			}
		},
		attrs:{

		},
		dataAttrs:{

		}
	}
}