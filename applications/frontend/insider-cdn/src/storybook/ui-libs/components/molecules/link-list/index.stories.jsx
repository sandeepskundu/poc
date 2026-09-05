import LinkList from 'aio-global-ui/molecules/link-list';

export default {
	title:"Molecules/LinkList",
	component:LinkList,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Link list<br/><br /><strong>Import path:</strong><code>import LinkList from 'aio-global-ui/molecules/link-list';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/molecules/link-list/index</code><br/><br/>"
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
			divider:{
				enabled:true,
				position:"top",
				ds:{

				}
			}
		},
		linkDs:{
			label:'',
			leftIcon:{

			},
			rightIcon:{

			},
			divider:{
				enabled:false,
				position:"bottom",
				ds:{

				}
			},
			attrs:{
				href:"#"
			},
			theme:{
				colorPairing:{
					hover:"005"
				}
			},
			css:{
				class:{
					padding:{
						1:10,
						2:10,
						3:10
					}
				},
				flags:{
					animation:"anim"
				}
			}
		},
		listOptions:[],
		attrs:{

		},
		dataAttrs:{

		}
	}
}