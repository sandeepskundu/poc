import Icon from 'aio-global-ui/atoms/0/avatar/icon';

export default {
	title:"Atoms/0/Avatar/Icon",
	component:Icon,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Button<br/><br /><strong>Import path:</strong><code>import Icon from 'aio-global-ui/atoms/0/avatar/icon';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/avatar/icon</code><br/><br/>"
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
		initial:null,
		icon:{
			ds:{

			},
			attrs:{

			},
			markup:{

			},
			type:"font",
			svg:{
				style:{

				},
				src:null,
				size:"24px"
			},
			icon:{
				size:16,
				name:'',
				family:''
			}
		},
		config:{
			image:null,
			wrapper:{

			},
			initial:null
		},
		attrs:{

		},
		dataAttrs:{

		}
	}
}