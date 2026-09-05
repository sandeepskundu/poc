import Icon from 'aio-global-raw-ui/atoms/avatar/icon';

export default {
	title:"Atoms/Avatar/Icon",
	argTypes:{

	},
	component:Icon,
	tags:['autodocs'],
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"The Avatar component is a reusable UI element used to visually represent a user, group, or entity within the application. It typically displays a profile image, initials, or a fallback icon, helping users quickly identify people and associated content while enhancing recognition and navigation throughout the interface.<br/><br/>The component supports design system–driven customization, allowing properties such as size, shape, border, background color, and typography to be configured through the design system. This ensures visual consistency, accessibility, and alignment with the application's design standards across different layouts, themes, and use cases.<br/><br/>The Avatar component can display images from external or local sources, generate initials when no image is available, and provide configurable fallback states to maintain a consistent user experience. It is commonly used in user profiles, navigation menus, comments, messaging interfaces, team directories, and collaborative workflows.<br/><br/><strong>Import path:</strong><code>import Icon from 'aio-global-raw-ui/atoms/avatar/icon';</code><br/><br/><strong>Component directory:</strong><code>./libs/frontend/ui/raw/atoms/avatar/icon</code><br/><br/>"
			}
		}
	},
	mockdata:{
		defaults:{
			config:{

			},
			icon:{
				config:{
					icon:{
						name:"bell"
					}
				}
			}
		},
		variants:{

		}
	}
}

export const Base = {
	args:{
		nowrapper:true,
		icon:{
			config:{
				markup:{
					element:"span"
				},
				type:"font",
				svg:{
					style:{

					},
					size:"24px"
				},
				icon:{
					name:"bell",
					size:"24",
					family:"g"
				}
			}
		},
		config:{

		}
	}
}