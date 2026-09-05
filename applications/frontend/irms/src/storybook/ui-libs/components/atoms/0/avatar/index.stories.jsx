import Avatar from 'aio-global-ui/atoms/0/avatar';

export default {
	title:"Atoms/0/Avatar",
	component:Avatar,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Button<br/><br /><strong>Import path:</strong><code>import Avatar from 'aio-global-ui/atoms/0/avatar';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/avatar/index</code><br/><br/>"
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
		initial:{
			size:"xxl",
			family:"bd",
			fallback:"UH",
			display:false,
			value:"Mandeep Kundu"
		},
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
			image:{

			},
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