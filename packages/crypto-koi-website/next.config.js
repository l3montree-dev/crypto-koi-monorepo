/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['crypto-koi-website-cms-prod.s3.eu-central-1.amazonaws.com', "localhost", "dev.api.crypto-koi.io", "api.crypto-koi.io"],
    },
}

module.exports = nextConfig
