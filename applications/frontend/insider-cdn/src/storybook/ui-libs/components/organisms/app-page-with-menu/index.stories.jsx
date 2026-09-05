import AppPageWithMenu from 'aio-global-ui/organisms/app-page-with-menu';

export default {
	title:"Organisms/AppPageWithMenu",
	component:AppPageWithMenu,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Accordion menu<br/><br /><strong>Import path:</strong><code>import AppPageWithMenu from 'aio-global-ui/organisms/app-page-with-menu';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/organisms/app-page-with-menu/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		wrapperDs:{
			css:{
				class:{

				}
			},
			theme:{
				background:{
					default:"'c00100'"
				}
			}
		},
		pageDs:{
			attrs:{

			},
			dataAttrs:{

			},
			theme:{

			}
		},
		menuDs:{
			attrs:{

			},
			dataAttrs:{

			},
			theme:{
				border:{
					default:"'c00103'"
				},
				background:{
					default:"'c00000'"
				}
			},
			css:{
				class:{
					borderNone:{
						1:true,
						3:true,
						4:true
					}
				}
			}
		},
		rightMenuDs:{
			attrs:{

			},
			dataAttrs:{

			},
			theme:{
				border:{
					default:"'c00103'"
				},
				background:{
					default:"'c00000'"
				}
			},
			css:{
				class:{
					borderNone:{
						1:true,
						2:true,
						3:true
					}
				}
			}
		},
		appMenu:'',
		appRightMenu:'',
		appPage:'',
		attrs:{

		},
		dataAttrs:{

		}
	}
}