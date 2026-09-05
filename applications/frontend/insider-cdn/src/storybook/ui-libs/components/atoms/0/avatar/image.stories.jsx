import Image from 'aio-global-ui/atoms/0/avatar/image';

export default {
	title:"Atoms/0/Avatar/Image",
	component:Image,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Button<br/><br /><strong>Import path:</strong><code>import Image from 'aio-global-ui/atoms/0/avatar/image';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/avatar/image</code><br/><br/>"
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
		image:{
			src:''
		},
		initial:null,
		icon:null,
		config:{
			image:{

			},
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