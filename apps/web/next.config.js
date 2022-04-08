const withTM = require('next-transpile-modules')(['@crypto-koi/common'])

/** @type {import('next').NextConfig} */
const nextConfig = withTM({
    reactStrictMode: true,
    images: {
        domains: [
            'crypto-koi-website-cms-prod.s3.eu-central-1.amazonaws.com',
            'localhost',
            'dev.api.crypto-koi.io',
            'api.crypto-koi.io',
        ],
    },
})

module.exports = nextConfig
