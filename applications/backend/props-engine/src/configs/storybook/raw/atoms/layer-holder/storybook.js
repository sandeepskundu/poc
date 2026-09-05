module.exports = {
    parameters:{
		docs:{
			description:{
				component:"The Image component renders visual media from a specified source and can be customized with properties such as alternative text, dimensions, object fit, loading behavior, and styling. It helps ensure images are displayed consistently across the application while maintaining accessibility and responsive design best practices."
			}
		}
	},
    mockdata:{
        defaults:{
			templates:{
				layer:"L",
				content:"This is sample body text and will get replaced with original content. This is sample body text and will get replaced with original content. This is sample body text and will get replaced with original content.",
			},
			layer:{
				align:'tcc'
			},
			config:{
				layer:{
					ds:{
						theme:{
							background:{
								default:'c00208'
							},
							text:{
								default:'c00000'
							}
						}
					}
				}
			}
		},
        variants:{}
    }
}