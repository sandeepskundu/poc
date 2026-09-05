import Initial from 'aio-global-ui/atoms/0/avatar/initial';

export default {
	title:"Atoms/0/Avatar/Initial",
	component:Initial,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Button<br/><br /><strong>Import path:</strong><code>import Initial from 'aio-global-ui/atoms/0/avatar/initial';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/avatar/initial</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		nowrapper:false,
		dsTheme:{
			size:40,
			outer:20,
			shadow:"sm",
			radius:"round",
			color:"c00000",
			hcolor:"c11806",
			background:"c12306",
			hbackground:"g00003"
		},
		image:null,
		initial:{
			size:'',
			family:'',
			fallback:'',
			display:false,
			value:''
		},
		icon:null,
		config:{
			image:null,
			wrapper:{

			},
			initial:{
				ds:{
					css:{
						class:{
							family:"md",
							fontsize:"sm"
						}
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