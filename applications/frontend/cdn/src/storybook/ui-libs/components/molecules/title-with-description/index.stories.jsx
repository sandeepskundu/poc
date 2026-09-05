import TitleWithDescription from 'aio-global-ui/molecules/title-with-description';

export default {
	title:"Molecules/TitleWithDescription",
	component:TitleWithDescription,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Tags (also known as “chips”) are compact elements that allow users to enter information, make selections, filter content, or trigger actions. They’re similar to badges, but are more commonly used in inputs to allow users to select multiple items at once.<br/><br /><strong>Import path:</strong><code>import TitleWithDescription from 'aio-global-ui/molecules/title-with-description';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/molecules/title-with-description/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		title:"Kundu",
		description:"",
		wrapperDs:{
			element:"div"
		},
		titleDs:{

		},
		descriptionDs:{
			attrs:{

			},
			dataAttrs:{

			}
		},
		descriptionMoreLess:{

		},
		attrs:{

		},
		dataAttrs:{

		}
	}
}