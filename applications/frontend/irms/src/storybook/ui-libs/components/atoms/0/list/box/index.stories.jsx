import Box from 'aio-global-ui/atoms/0/list/box';

export default {
	title:"Atoms/0/List/Box",
	component:Box,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Tags (also known as “chips”) are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once.<br/><br /><strong>Import path:</strong><code>import Box from 'aio-global-ui/atoms/0/list/box';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/list/box/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		callbacks:{
			item:{
				onBlur:null,
				onClick:null,
				onFocus:null,
				onKeyUp:null,
				dsTheme:null,
				onKeyDown:null,
				onDragStart:null,
				onMouseDown:null,
				onPointerUp:null,
				onPointerDown:null,
				onPointerEnter:null,
				onPointerLeave:null,
				beforeRender:null
			},
			group:{
				onBlur:null,
				onClick:null,
				onFocus:null,
				onKeyUp:null,
				dsTheme:null,
				onKeyDown:null,
				onDragStart:null,
				onMouseDown:null,
				onPointerUp:null,
				onPointerDown:null,
				onPointerEnter:null,
				onPointerLeave:null,
				beforeRender:null
			}
		},
		templates:{

		},
		data:{

		},
		mapping:{
			group:{
				end:'',
				after:'',
				start:'',
				before:'',
				center:"label"
			},
			item:{
				end:'',
				after:'',
				start:'',
				before:'',
				center:"label"
			}
		},
		childs:{
			item:{

			},
			group:{

			}
		},
		dsTheme:{
			boxWrapper:{

			},
			item:{
				end:{

				},
				after:{

				},
				start:{

				},
				before:{

				},
				center:{

				},
				wrapper:{

				}
			},
			group:{
				end:{

				},
				after:{

				},
				start:{

				},
				before:{

				},
				center:{

				},
				wrapper:{

				}
			}
		},
		config:{
			item:{
				end:{

				},
				after:{

				},
				start:{

				},
				before:{

				},
				center:{

				},
				wrapper:{

				}
			},
			group:{
				end:{

				},
				after:{

				},
				start:{

				},
				before:{

				},
				center:{

				},
				wrapper:{

				}
			},
			boxWrapper:{
				ds:{

				},
				markup:{

				}
			}
		},
		attrs:{

		},
		dataAttrs:{

		}
	}
}