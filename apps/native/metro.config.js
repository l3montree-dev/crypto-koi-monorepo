const extraNodeModules = require('node-libs-browser');
const path = require('path');
const { getDefaultConfig } = require('@expo/metro-config');

const workspaceRoot = path.resolve(__dirname, '../..');
const projectRoot = __dirname;

const defaultConfig = getDefaultConfig(__dirname)
defaultConfig.resolver.sourceExts.push("cjs")


module.exports = {
    ...defaultConfig,
    watchFolders: [workspaceRoot],
    resolver: {
        ...defaultConfig.resolver,
        extraNodeModules,
        nodeModulePaths: [
            path.resolve(projectRoot, 'node_modules'),
            path.resolve(workspaceRoot, 'node_modules'),
        ]
    },
    transformer: {
        ...defaultConfig.transformer,
        assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    },
};

