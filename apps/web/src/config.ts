import { commonConfig } from '@crypto-koi/common/lib/commonConfig'

export const config = {
    ...commonConfig,
    cmsHost: process.env.NEXT_PUBLIC_CMS_HOST ?? '',
    api: process.env.NEXT_PUBLIC_API_HOST ?? '',
    graphqlBaseUrl: (process.env.NEXT_PUBLIC_API_HOST ?? '') + '/query',
}
