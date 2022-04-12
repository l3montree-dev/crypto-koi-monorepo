import { HydrationState } from '@crypto-koi/common/lib/mobx/RootStore'
import { GetServerSidePropsResult, NextPage } from 'next'
import { IMenu } from '../../cms/menu'
import { IFooter, IPage } from '../../cms/page'

interface Props {
    page: IPage
    footer: IFooter
    menu: IMenu
    hydrationState?: HydrationState | null
}

const Users: NextPage<Props> = (props) => {
    return null
}

export async function getServerSideProps(): Promise<
    GetServerSidePropsResult<Props>
> {
    return {
        notFound: true,
    }
}

export default Users
