export interface MangaMapping {
  id: number
  anilistId: number
  externalId: string
  progress: number
  chapters: number
  installedProvider: InstalledProvider
}

export interface InstalledProvider {
  id: number
  name: string
  providerId: string
  repositoryId: string
  providerType: string
}
