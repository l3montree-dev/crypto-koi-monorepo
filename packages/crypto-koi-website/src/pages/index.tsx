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
      {pageBuilder(props.page.attributes.Pagebuilder)}
    </Page>
  )
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<StaticProps<Props>> {
  const [startPage, footer] = await Promise.all([
    api<{ data: IPage[] }>(`pages?Link=/&populate=deep`),
    api<{ data: { attributes: IFooter } }>(`footer?populate=deep`),
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
