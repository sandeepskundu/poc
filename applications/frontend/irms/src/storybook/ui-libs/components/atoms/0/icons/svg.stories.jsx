import Svg from 'aio-global-ui/atoms/0/icons/svg';

export default {
	title:"Atoms/0/Icons/Svg",
	component:Svg,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Button<br/><br /><strong>Import path:</strong><code>import Svg from 'aio-global-ui/atoms/0/icons/svg';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/icons/svg</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		callback:{
			onClick:null
		},
		config:{
			ds:{
				text:{
					default:"c10906"
				}
			},
			attrs:{

			},
			type:"svg",
			svg:{
				style:{

				},
				src:'',
				size:"24px"
			},
			icon:null,
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