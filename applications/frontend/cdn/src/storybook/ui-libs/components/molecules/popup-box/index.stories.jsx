import PopupBox from 'aio-global-ui/molecules/popup-box';

export default {
	title:"Molecules/PopupBox",
	component:PopupBox,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Badges help highlight important information, such as notifications or new and unread messages. They’re primarily used for communicating secondary or additional information to text.<br/><br /><strong>Import path:</strong><code>import PopupBox from 'aio-global-ui/molecules/popup-box';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/molecules/popup-box/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		action:"",
		buttonLabel:"",
		wrapperDs:{
			element:"div",
			openOnHover:false
		},
		buttonDs:{
			label:"",
			size:"md",
			theme:"001",
			element:"div",
			icoButtonDs:{
				name:"",
				color:"",
				size:"20",
				family:"",
				attrs:{

				},
				dataAttrs:{

				}
			},
			leftIconDs:{
				name:"",
				color:"",
				size:"20",
				family:"",
				attrs:{

				},
				dataAttrs:{

				}
			},
			rightIconDs:{
				name:"",
				color:"",
				size:"20",
				family:"",
				attrs:{

				},
				dataAttrs:{

				}
			}
		},
		bodyDs:{
			alignFrom:"",
			theme:{
				colorPairing:{
					default:"025"
				}
			},
			css:{
				class:{
					shadow:"md",
					padding:{
						1:6,
						2:6,
						3:6,
						4:6
					},
					radius:{
						1:8
					}
				}
			}
		},
		openOnHover:false,
		wrapperElement:"div",
		popupClassName:"",
		popupAlignFrom:"left",
		popupColorPairing:"025",
		popupBorderRadius:8,
		popupShadow:"lg",
		actionButtonLable:"001",
		actionButtonTheme:"001",
		actionButtonSize:"md",
		actionContent:"",
		active:false,
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