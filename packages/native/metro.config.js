const extraNodeModules = require('node-libs-browser');

const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname)
defaultConfig.resolver.sourceExts.push("cjs")


module.exports = {
    ...defaultConfig,
    resolver: {
        ...defaultConfig.resolver,
        extraNodeModules,
    },
    transformer: {
        ...defaultConfig.transformer,
        assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    },
};

