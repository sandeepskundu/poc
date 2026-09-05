import Description from 'aio-global-raw-ui/atoms/typography/text/description';

export default {
	title:"Atoms/Typography/Text/Description",
	argTypes:{

	},
	component:Description,
	tags:['autodocs'],
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"The Text component is a flexible typography component used to render and manage textual content throughout the application. It provides a consistent implementation of the design system's typography standards while supporting a wide range of content presentation and interaction patterns.<br/><br/><strong>Import path:</strong><code>import Description from 'aio-global-raw-ui/atoms/typography/text/description';</code><br/><br/><strong>Component directory:</strong><code>./libs/frontend/ui/raw/atoms/typography/text/description</code><br/><br/>"
			}
		}
	},
	mockdata:{
		defaults:{
			description:{
				text:{
					content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
				}
			}
		},
		variants:{
			sandeep:{

			}
		}
	}
}

export const Base = {
	args:{
		bindJsComponents:true,
		wrapper:{
			markup:{
				element:"div"
			}
		},
		description:{
			text:{
				markup:{
					element:"p"
				},
				content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
			}
		},
		toggle:{
			lines:5,
			enabled:false,
			align:"al",
			label:{
				more:"Read more",
				less:"Read less"
			},
			ds:{
				markup:{
					element:"span"
				}
			}
		}
	}
}

export const Sandeep = {
	args:{
		bindJsComponents:true,
		wrapper:{
			markup:{
				element:"div"
			}
		},
		description:{
			text:{
				markup:{
					element:"p"
				},
				content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
			}
		},
		toggle:{
			lines:5,
			enabled:false,
			align:"al",
			label:{
				more:"Read more",
				less:"Read less"
			},
			ds:{
				markup:{
					element:"span"
				}
			}
		}
	}
}