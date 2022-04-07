import dynamic from 'next/dynamic'

export const CMSContent = dynamic(() => import('./_CMSContent'), { ssr: false })
