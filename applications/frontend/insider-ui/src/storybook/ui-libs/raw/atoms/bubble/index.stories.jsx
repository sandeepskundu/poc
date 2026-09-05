import Bubble from 'aio-global-raw-ui/atoms/bubble';

export default {
	title:"Atoms/Bubble",
	argTypes:{

	},
	component:Bubble,
	tags:['autodocs'],
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Bubble is a UI component used to display a small, visually distinct piece of information within a rounded or speech-bubble-like container. It is commonly used for messages, notifications, labels, status indicators, tags, or contextual content, helping important information stand out from surrounding content.<br/><br/><strong>Import path:</strong><code>import Bubble from 'aio-global-raw-ui/atoms/bubble';</code><br/><br/><strong>Component directory:</strong><code>./libs/frontend/ui/raw/atoms/bubble/index</code><br/><br/>"
			}
		}
	},
	mockdata:{
		defaults:{
			content:"Bubble"
		},
		variants:{

		}
	}
}

export const Base = {
	args:{
		content:"Bubble",
		config:{
			markup:{
				element:"span"
			},
			ds:{
				predefined:{
					color:"c00000",
					background:"c11407"
				}
			}
		}
	}
}