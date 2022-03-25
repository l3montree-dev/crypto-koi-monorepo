import { IMenu } from '../cms/menu'
import { IPagebuilder } from '../cms/page'
import Feature from './Feature'
import GetYourKoi from './GetYourKoi'
import Hero from './Hero'
import ImageTextCards from './ImageTextCards'
import Onboarding from './Onboarding'
import Story from './Story'
import Tech from './Tech'
import TitleText from './TitleText'

export default function pageBuilder(page: IPagebuilder[], menu: IMenu) {
  return page.map((item) => {
    switch (item.__component) {
      case 'page.features':
        return <Feature {...item} key={'page.features-' + item.id} />
      case 'general.get-your-koi-section':
        return (
          <GetYourKoi {...item} key={'page.get-your-koi-section-' + item.id} />
        )
      case 'page.story':
        return <Story {...item} key={'page.story-' + item.id} />
      case 'page.onboarding-story':
        return <Onboarding {...item} key={'page.onboarding-story-' + item.id} />
      case 'page.tech-section':
        return <Tech {...item} key={'page.tech-section-' + item.id} />
      case 'page.hero-section':
        return <Hero {...menu} {...item} key={'page.hero-section-' + item.id} />
      case 'page.image-text-cards':
        return (
          <ImageTextCards {...item} key={'page.image-text-cards-' + item.id} />
        )
      case 'page.title-text':
        return <TitleText {...item} key={'page.title-text-' + item.id} />
      default:
        return null
    }
  })
}
