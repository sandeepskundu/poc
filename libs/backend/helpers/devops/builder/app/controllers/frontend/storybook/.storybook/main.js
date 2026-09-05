//require('../build/scripts/process.js');
import storybook from './../scrap/webpack/storybook.js';

const config = {
    stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-onboarding",
        "@storybook/addon-interactions"
    ],
    framework: {
        name: "@storybook/react-webpack5",
        options: {
            builder: {
                useSWC:true
            }
        }
    },
    docs: {
        autodocs: "tag"
    },
    async webpackFinal(config, { configType }) {
        let temp = await storybook(config, {configType});
            config.resolve = temp.resolve;
            config.plugins = config.plugins.concat(temp.plugins);

            /*--
                if (configType === 'DEVELOPMENT') {
                // Modify config for development
                }
                if (configType === 'PRODUCTION') {
                // Modify config for production
                }
            --*/

        return config;
    }
};

export default config;