module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            'babel-preset-expo',
            // ['@babel/preset-env', { targets: { node: 'current' } }],
            '@babel/preset-typescript',
        ],
        plugins: [
            // ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
            ['module:react-native-dotenv'],
            'react-native-reanimated/plugin',
            //["@babel/plugin-proposal-class-properties", { "loose": true }]
        ],

        overrides: [
            {
                test: fileName => !fileName.includes('node_modules'),
                plugins: [
                    ['@babel/plugin-proposal-decorators', { legacy: true }],
                    ['@babel/plugin-proposal-class-properties', { loose: false }],
                ],
            },
        ],
    };
};