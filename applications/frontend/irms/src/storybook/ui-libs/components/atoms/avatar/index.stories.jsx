import Avatar from 'aio-global-ui/atoms/avatar';

export default {
	title:"Atoms/Avatar",
	component:Avatar,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Tags (also known as “chips”) are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once.<br/><br /><strong>Import path:</strong><code>import Avatar from 'aio-global-ui/atoms/avatar';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/avatar/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		initals:'',
		contrastBorder:'',
		element:"div",
		size:"md",
		image:'',
		icon:{
			name:"da",
			color:'',
			family:"g"
		},
		ds:{
			theme:{
				colorPairing:{
					default:"000",
					hover:''
				},
				background:{
					default:'',
					hover:''
				},
				text:{
					default:'',
					hover:''
				},
				border:{
					default:'',
					hover:''
				}
			},
			css:{
				class:{
					shadow:'',
					radius:{
						1:6,
						2:6,
						3:6,
						4:6
					},
					padding:{
						1:'',
						2:'',
						3:'',
						4:''
					},
					margin:{
						1:'',
						2:'',
						3:'',
						4:''
					},
					border:'',
					family:'',
					fontsize:''
				},
				flags:{
					noBorder:false,
					rounded:true,
					disabled:false,
					isDisplay:true
				},
				others:''
			}
		},
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