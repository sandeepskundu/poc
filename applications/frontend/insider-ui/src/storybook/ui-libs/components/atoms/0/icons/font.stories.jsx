import Font from 'aio-global-ui/atoms/0/icons/font';

export default {
	title:"Atoms/0/Icons/Font",
	component:Font,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Button<br/><br /><strong>Import path:</strong><code>import Font from 'aio-global-ui/atoms/0/icons/font';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/icons/font</code><br/><br/>"
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
			svg:null,
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