import LayerHolder from 'aio-global-ui/atoms/layer-holder';

export default {
	title:"Atoms/LayerHolder",
	component:LayerHolder,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Tags (also known as “chips”) are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once.<br/><br /><strong>Import path:</strong><code>import LayerHolder from 'aio-global-ui/atoms/layer-holder';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/layer-holder/index</code><br/><br/>"
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
			element:"div"
		},
		layerDs:{
			size:20,
			align:"c",
			attrs:{

			},
			element:"div",
			dataAttrs:{

			},
			minHeightAndWidth:{
				width:0,
				height:0
			}
		},
		contentDs:{
			attrs:{

			},
			dataAttrs:{

			},
			element:"div"
		},
		moreLess:{

		},
		content:"",
		layerMinHeightAndWidth:{
			width:0,
			height:0
		},
		layer:"",
		attrs:{

		},
		dataAttrs:{

		}
	}
}

export const Primary = {
	args:{
		label:"Mandeep",
		toggle:false,
		con:"kundu"
	}
}

export const ButtonB = {
	args:{
		label:"Button B",
		toggle:false,
		con:"B Button"
	}
}

export const ButtonA = {
	args:{
		label:"Button A",
		toggle:false,
		con:"A Button"
	}
}