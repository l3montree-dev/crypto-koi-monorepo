import { commonConfig } from '@crypto-koi/common/lib/commonConfig'

export const config = {
    ...commonConfig,
    cmsHost: process.env.NEXT_PUBLIC_CMS_HOST ?? 'https://cms.crypto-koi.io',
    api: process.env.NEXT_PUBLIC_API_HOST ?? 'https://dev.api.crypto-koi.io',
    graphqlBaseUrl: (process.env.NEXT_PUBLIC_API_HOST ?? '') + '/query',
}
