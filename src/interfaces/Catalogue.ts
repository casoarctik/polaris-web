import type { Item } from "./Item"

export interface Catalogue {
  page: number
  totalPages: number
  totalResults: number
  results: Item[]
  keyword: string
}
