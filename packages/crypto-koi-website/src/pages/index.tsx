import type { GetStaticPropsContext, NextPage } from 'next'
import { api } from '../cms/api'
import { IFooter, IPage } from '../cms/page'
import Page from '../components/Page'
import { StaticProps } from '../misc/types'
import pageBuilder from '../pagebuilder/page-builder'

interface Props {
  page: IPage
  footer: IFooter
}
const Home: NextPage<Props> = (props) => {
  return (
    <Page footer={props.footer} seo={props.page.attributes.SEO}>
      <main>{pageBuilder(props.page.attributes.Pagebuilder)}</main>
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
    api<{ data: { attributes: IFooter } }>(`footer?populate=*`),
  ])

  return {
    props: {
      page: startPage.data[0],
      footer: footer.data.attributes,
    },
    revalidate: 60,
  }
}

export default Home
