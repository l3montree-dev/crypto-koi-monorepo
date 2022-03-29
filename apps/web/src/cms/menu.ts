export interface IChild {
    id: number
    Title: string
    Link: string
}

export interface IParent {
    id: number
    Title: string
    Link: string
    Children: IChild[]
}

export interface IStoreLinks {
    id: number
    Google_Play_Store_Link: string
    Apple_App_Store_Link: string
}

export interface IMenu {
    Parents: IParent[]
    Store_Links: IStoreLinks
}
