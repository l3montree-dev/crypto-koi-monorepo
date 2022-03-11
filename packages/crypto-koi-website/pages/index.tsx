import type { GetStaticPropsContext, NextPage } from 'next'
import { api } from '../cms/api'
import { IFooter, IPage } from '../cms/page'
import Page from '../components/Page'
import { StaticProps } from '../misc/types'

interface Props {
  page: IPage
  footer: IFooter
}
const Home: NextPage<Props> = (props) => {
  console.log(props)

  return (
    <Page>
      <main>Test</main>
    </Page>
  )
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<StaticProps<Props>> {
  const [startPage, footer] = await Promise.all([
    api<{ data: IPage[] }>(
      `pages?Link=/&populate[Pagebuilder][populate]=*&populate[SEO][populate]=*&populate=*`
    ),
    // api<{da}>(`menu?populate=*`),
    api<{ data: IFooter }>(`footer?populate=*`),
  ])

  return {
    props: {
      page: startPage.data[0],
      footer: footer.data,
    },
    revalidate: 60,
  }
}

export default Home
