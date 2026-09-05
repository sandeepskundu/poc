import AvatarWithDetails from 'aio-global-ui/molecules/avatar-with-details';

export default {
	title:"Molecules/AvatarWithDetails",
	component:AvatarWithDetails,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Tags (also known as “chips”) are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once.<br/><br /><strong>Import path:</strong><code>import AvatarWithDetails from 'aio-global-ui/molecules/avatar-with-details';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/molecules/avatar-with-details/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		title:"",
		description:"",
		titleDs:{
			theme:{
				color:{
					default:"c00108"
				}
			},
			css:{
				class:{
					fontsize:"sm",
					family:"sb"
				},
				flags:{
					isDisplay:false
				}
			}
		},
		contentDs:{
			css:{
				class:{
					padding:{
						1:0,
						2:0,
						3:0,
						4:12
					}
				}
			}
		},
		descriptionDs:{
			css:{
				class:{
					fontsize:"sm",
					margin:{
						1:0
					}
				}
			}
		},
		descriptionMoreLess:{

		},
		layerDs:{
			size:40,
			align:"tl",
			element:"div"
		},
		avatarDs:{
			icon:"",
			size:"md",
			initals:"",
			contrastBorder:"",
			image:"http://localhost:1300/cdn/statics/images/avatar.jpg"
		},
		attrs:{

		},
		dataAttrs:{

		}
	}
}