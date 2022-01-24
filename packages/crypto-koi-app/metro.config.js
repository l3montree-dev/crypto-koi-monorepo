const extraNodeModules = require('node-libs-browser');
const { getDefaultConfig } = require("metro-config");
const { resolver: defaultResolver } = getDefaultConfig.getDefaultValues();
const config = {
    resolver: {
        ...defaultResolver,
        extraNodeModules,
        sourceExts: [...defaultResolver.sourceExts, "cjs"]
    },
    transformer: {
        assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    },
};



module.exports = config;