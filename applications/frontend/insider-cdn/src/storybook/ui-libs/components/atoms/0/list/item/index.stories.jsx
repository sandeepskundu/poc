import Item from 'aio-global-ui/atoms/0/list/item';

export default {
	title:"Atoms/0/List/Item",
	component:Item,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Tags (also known as “chips”) are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once.<br/><br /><strong>Import path:</strong><code>import Item from 'aio-global-ui/atoms/0/list/item';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/list/item/index</code><br/><br/>"
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
			onPointerLeave:null
		},
		childs:{
			end:'',
			after:'',
			start:'',
			before:'',
			center:''
		},
		dsTheme:{
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
		config:{
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
		attrs:{

		},
		dataAttrs:{

		}
	}
}