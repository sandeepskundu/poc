const { button } = require("../button/props");

module.exports = {
    parameters:{
		docs:{
			description:{
				component:"Button Group is a reusable React UI component designed to display and manage a collection of related buttons as a single, cohesive control. It provides a consistent way to group actions or selections across the application while supporting customizable button configurations, themes, states, and layouts. Each button within the group can be individually configured with its own label, icons, behavior, and styling, enabling flexible and interactive user experiences."
			}
		}
	},
    mockdata:{
        defaults:{
			list:{
				0:{
					button:{
						content:'1'
					},
					icons:{
						left:{
							config:{
								icon:{
									name:'bell'
								}
							}
						}
					}
				},
				1:{
					button:{
						content:'2'
					}
				},
				2:{
					button:{
						content:'3'
					}
				}
			}
		},
        variants:{}
    }
}