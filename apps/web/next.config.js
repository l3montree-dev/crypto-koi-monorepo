const withTM = require('next-transpile-modules')(['@crypto-koi/common'])
const withPWA = require("next-pwa");
const { withSentryConfig } = require('@sentry/nextjs');

const sentryWebpackPluginOptions = {
    // Additional config options for the Sentry Webpack plugin. Keep in mind that
    // the following options are set automatically, and overriding them is not
    // recommended:
    //   release, url, org, project, authToken, configFile, stripPrefix,
    //   urlPrefix, include, ignore

    silent: true, // Suppresses all logs
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options.
};

/** @type {import('next').NextConfig} */
module.exports = withSentryConfig(withTM(withPWA({
    sentryWebpackPluginOptions,
    reactStrictMode: true,
    images: {
        domains: [
            'crypto-koi-website-cms-prod.s3.eu-central-1.amazonaws.com',
            'localhost',
            'dev.api.crypto-koi.io',
            'api.crypto-koi.io',
            "192.168.0.83"
        ],
    },
    pwa: {
        dest: "public",
        register: true,
        skipWaiting: true,
        disable: process.env.NODE_ENV !== 'production'
    },
})))
