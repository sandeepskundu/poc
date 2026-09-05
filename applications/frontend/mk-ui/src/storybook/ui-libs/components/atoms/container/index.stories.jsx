import Container from 'aio-global-ui/atoms/container';

export default {
	title:"Atoms/Container",
	component:Container,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Working from a pre-defined and limited container spacing system allows you to work faster and consistently.<br/><br /><strong>Import path:</strong><code>import Container from 'aio-global-ui/atoms/container';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/container/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		containerDs:{
			name:""
		},
		attrs:{

		},
		dataAttrs:{

		}
	}
}