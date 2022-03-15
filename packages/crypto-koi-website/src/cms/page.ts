export interface IWithAlignment {
  Alignment: 'Left' | 'Force_Left' | 'Center'
}

export interface IWithTitleText {
  Title: string
  Text: string
}

export interface IPB {
  id: number
  __component: string
}

export interface IFeatureCard {
  id: number
  Text: string
  Icon: IWrappedImg
}
export interface IFeaturesPB extends IPB {
  __component: 'page.features'
  Title: string
  Feature_Cards: IFeatureCard[]
}

export interface IGetYourKoiPB extends IPB, IWithTitleText {
  __component: 'general.get-your-koi-section'
  Koi_Images: {
    data: { attributes: IImg; id: number }[]
  }
}

export interface ITitleTextPB extends IPB, IWithAlignment, IWithTitleText {
  __component: 'page.title-text'
}

export interface IHeroSectionPB extends IPB, IWithTitleText {
  __component: 'page.hero-section'
  Subtitle: string
  Learn_More: string
  Image: IWrappedImg
}

export interface IImageTextCardsPB extends IPB, IWithAlignment {
  __component: 'page.image-text-cards'
  Text: string
  Color: string
  Card_Positions: 'Image_Left_Text_Right' | 'Image_Right_Text_Left'
  Image: IWrappedImg
}

export type IPagebuilder =
  | IFeaturesPB
  | IGetYourKoiPB
  | ITitleTextPB
  | IHeroSectionPB
  | IImageTextCardsPB

export interface IFormat {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path?: any
  size: number
  width: number
  height: number
}

export interface IFormats {
  large: IFormat
  small: IFormat
  medium: IFormat
  thumbnail: IFormat
}

export interface IImg {
  name: string
  alternativeText: string
  caption: string
  width: number
  height: number
  formats: IFormats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl?: any
  provider: string
  provider_metadata?: any
  createdAt: Date
  updatedAt: Date
}

export interface IWrappedImg {
  data: { attributes: IImg }
}

export interface ISEO {
  id: number
  metaTitle: string
  metaDescription: string
  keywords: string
  metaRobots?: any
  structuredData?: any
  metaViewport?: any
  canonicalURL?: any
  metaImage: IWrappedImg
  metaSocial: any[]
}

export interface IAttributes {
  Link: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  locale: string
  Pagebuilder: IPagebuilder[]
  SEO: ISEO
}

export interface IMeta {}

export interface IPage {
  attributes: IAttributes
  id: number
}

export interface IFooter extends IWithTitleText {
  E_Mail_With_PGP: { E_Mail: string; Mail_to_Link: string }
  Follow_us: {
    Title: string
    Social_Link: Array<{ id: number; Link: string; Social_Channel: string }>
  }
}

export interface IKoiMetadata {
  image: string
  attributes: Array<{
    value: string
    trait_type: string
  }>
}
