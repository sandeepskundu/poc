module.exports = {
    parameters:{
		docs:{
			description:{
				component:"ContentRow is a reusable layout component that divides content into five distinct sections: start, before, center, after, and end. Parent components can pass dynamic child elements as props, which are rendered in their respective sections. This flexible structure enables developers to customize the layout while maintaining consistency across the application, making the component highly reusable for a variety of UI scenarios."
			}
		}
	},
    mockdata:{
        defaults:{
			config:{},
			data:{
				0:{
					type:'item',
					label:'Item one',
					rprops:{}
				},
				1:{
					type:'item',
					label:'Item one',
					rprops:{}
				}, 
				2:{
					rprops:{},
					type:'header',
					label:'Item one',
					childs:{
						0:{
							type:'item',
							label:'Item one',
						},
						1:{
							type:'item',
							label:'Item one',
						},
						2:{
							type:'item',
							label:'Item one',
						},
						3:{
							type:'item',
							label:'Item one',
						}
					}
				}
			}
		},
        variants:{}
    }
}