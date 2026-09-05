import _buttonGroup from 'aio-global-ui/atoms/form/_button-group';

export default {
	title:"Atoms/Form/_buttonGroup",
	component:_buttonGroup,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Button storybook<br/><br /><strong>Import path:</strong><code>import _buttonGroup from 'aio-global-ui/atoms/form/_button-group';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/form/_button-group/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		buttonDefaultDs:{
			size:"sm",
			theme:"000",
			element:"span"
		},
		buttons:[{
			label:"000",
			theme:"000",
			element:"span",
			attrs:{

			},
			dataAttrs:{

			}
		}, {
			label:"000",
			theme:"000",
			element:"span",
			attrs:{

			},
			dataAttrs:{

			}
		}],
		attrs:{

		},
		dataAttrs:{

		}
	}
}