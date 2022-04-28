import { mainnet } from './chains'

export const commonConfig = {
    cmsBaseUrl: 'https://cms.crypto-koi.io',
    websiteBaseUrl: 'https://crypto-koi.io',

    secondsBetweenFeeding: 60 * 60,

    contractAddress: '0x6e2844069F11262EC646fDa6ff64eCC62308025A',

    chain: mainnet,

    privacyPolicyLink: 'https://crypto-koi.io/app-privacy-policy',
    termsOfServiceLink: 'https://crypto-koi.io/terms-of-use',
    openseaUrl: 'https://opensea.io',
}
