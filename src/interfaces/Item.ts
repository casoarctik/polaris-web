export interface Item {
  id: number
  mediaType: 'movie' | 'tv' | 'person' // Types possibles pour mediaType
  popularity: number
  name: string
  imagePath: string
  releaseDate?: string // Facultatif si mediaType est 'person'
  genreIds?: number[] // Facultatif si mediaType est 'person'
  overview?: string // Facultatif si mediaType est 'person'
  voteAverage: number
  voteCount: number
  available: boolean
}
