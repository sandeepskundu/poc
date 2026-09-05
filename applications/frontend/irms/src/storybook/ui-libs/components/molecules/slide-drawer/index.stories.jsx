import SlideDrawer from 'aio-global-ui/molecules/slide-drawer';

export default {
	title:"Molecules/SlideDrawer",
	component:SlideDrawer,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Accordion menu<br/><br /><strong>Import path:</strong><code>import SlideDrawer from 'aio-global-ui/molecules/slide-drawer';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/molecules/slide-drawer/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		id:'',
		direction:"right",
		hideClose:false,
		outsideClose:false,
		wrapperDs:{
			divider:{
				ds:{

				},
				enabled:false,
				position:"top"
			},
			ds:{
				css:{
					class:{
						borderNone:{
							1:true,
							2:true,
							4:true
						}
					}
				},
				theme:{
					colorPairing:{
						default:"024"
					}
				}
			}
		},
		contentDs:{
			theme:{
				colorPairing:{
					default:"030"
				}
			}
		},
		closeIconDs:{
			icon:{
				name:"da"
			},
			theme:{
				colorPairing:{
					default:"030"
				}
			},
			css:{
				class:{
					padding:{
						1:8,
						2:8,
						3:8,
						4:8
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