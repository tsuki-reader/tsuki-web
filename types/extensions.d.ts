export interface Provider {
    name: string
    id: string
    icon: string
    installed: boolean
}

export interface Repository {
    name: string
    id: string
    logo: string
    manga_providers: Provider[]
    comic_providers: Provider[]
}
