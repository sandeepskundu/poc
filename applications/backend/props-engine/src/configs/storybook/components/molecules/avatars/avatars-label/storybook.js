const helpers = process.uiHelpers();
const text = process.aioAppConfigs('storybook/raw/atoms/typography/text');

module.exports = {
    parameters:{
		docs:{
			description:{
				component:"Text renders textual content using the design system's typography standards. It provides consistent styling, semantic markup, and configurable presentation options such as size, weight, color, spacing, alignment, and other design-system-defined properties. The component helps ensure accessibility, readability, and visual consistency across the application while adhering to established design guidelines and typography patterns."
			}
		}
	},
    mockdata:{
        defaults:{
            content:{
                title:"Sample name",
                description:'sampleemailid@email.com'
            }
        },
        variants:{
            variant:{}
        }
    }
}