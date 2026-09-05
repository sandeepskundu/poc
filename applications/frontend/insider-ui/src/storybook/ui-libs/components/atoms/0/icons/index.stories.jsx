import Icons from 'aio-global-ui/atoms/0/icons';

export default {
	title:"Atoms/0/Icons",
	component:Icons,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Button<br/><br /><strong>Import path:</strong><code>import Icons from 'aio-global-ui/atoms/0/icons';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/icons/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		config:{
			ds:{

			},
			attrs:{

			},
			type:"font",
			svg:{
				style:{

				},
				src:null,
				size:"24px"
			},
			icon:{
				name:'',
				size:"24",
				family:"g"
			},
			markup:{
				element:"span"
			}
		},
		attrs:{

		},
		dataAttrs:{

		}
	}
}