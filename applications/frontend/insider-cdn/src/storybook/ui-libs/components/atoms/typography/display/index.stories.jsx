import Display from 'aio-global-ui/atoms/typography/display';

export default {
	title:"Atoms/Typography/Display",
	component:Display,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Working from a pre-defined and limited container spacing system allows you to work faster and consistently.<br/><br /><strong>Import path:</strong><code>import Display from 'aio-global-ui/atoms/typography/display';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/typography/display/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		content:'',
		element:"p",
		ds:{
			css:{
				class:{
					family:"rg",
					fontsize:"md"
				},
				flags:{
					isDisplay:true
				}
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