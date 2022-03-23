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
  Text: string
  Feature_Cards: IFeatureCard[]
}

export interface ButtonPB {
  Link: string
  Text: string
  About_Blank: boolean
  Icon?: IWrappedImg
}
export interface ITechPB extends IPB {
  __component: 'page.tech-section'
  Smart_Contract: {
    Text: string
    Contract_Address: string
  }
  Blockchain: {
    Text: string
    Button: ButtonPB
    Value_NFT: number
  }
  Open_Source: {
    Text: string
    Button: ButtonPB
  }
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

export interface IOnboardingPB extends IPB {
  __component: 'page.onboarding-story'
  Text: string
  Title: string
  Onboarding_Steps: Array<{
    id: number
    Text: string
    Image: IWrappedImg
  }>
}

export interface IStoryPB extends IPB {
  __component: 'page.story'
  Text: string
  Title: string
  Story_Steps: Array<{ id: number; Text: string; Image: IMaybeWrappedImg }>
}

export type IPagebuilder =
  | IFeaturesPB
  | IGetYourKoiPB
  | ITitleTextPB
  | IHeroSectionPB
  | IImageTextCardsPB
  | ITechPB
  | IOnboardingPB
  | IStoryPB

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

export interface IMaybeWrappedImg {
  data?: { attributes: IImg }
}

export interface ISEO {
  id: number
  Meta_Title: string
  Meta_Description: string
  Keywords?: string
  Meta_Robots?: any
  Meta_Image: IWrappedImg
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
  E_Mail_With_PGP: { E_Mail: string; Mail_To_Link: string }
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
