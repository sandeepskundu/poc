const preview = {
    parameters: {
        actions:{
            argTypesRegex: "^on[A-Za-z].*"
        },
        controls:{
            matchers: {
                color:/(background|color)$/i,
                date:/Date$/i
            }
        }
    }
};

export default preview;