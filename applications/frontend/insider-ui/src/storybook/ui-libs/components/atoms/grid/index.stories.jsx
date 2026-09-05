import Grid from 'aio-global-ui/atoms/grid';

export default {
	title:"Atoms/Grid",
	component:Grid,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Working from a pre-defined and limited container spacing system allows you to work faster and consistently.<br/><br /><strong>Import path:</strong><code>import Grid from 'aio-global-ui/atoms/grid';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/grid/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		element:"section",
		layout:0,
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