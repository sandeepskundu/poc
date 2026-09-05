import Description from 'aio-global-ui/atoms/0/typography/text/description';

export default {
	title:"Atoms/0/Typography/Text/Description",
	component:Description,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Badges help highlight important information, such as notifications or new and unread messages. They’re primarily used for communicating secondary or additional information to text.<br/><br /><strong>Import path:</strong><code>import Description from 'aio-global-ui/atoms/0/typography/text/description';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/typography/text/description</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		text:{
			content:'',
			markup:{
				element:"p"
			},
			ds:{
				css:{
					class:{
						fontsize:"lg"
					}
				}
			}
		},
		bindJsComponents:true,
		wrapper:{
			markup:{
				element:"div"
			}
		},
		toggle:{
			lines:5,
			align:"al",
			enabled:false,
			label:{
				more:"Read more",
				less:"Read less"
			},
			ds:{
				markup:{
					element:"span"
				}
			}
		},
		attrs:{

		},
		dataAttrs:{

		}
	}
}