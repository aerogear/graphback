type SortDirection = 'asc' | 'desc'

/**
 * @todo move this into a common file
 */
export interface GraphbackOrderBy {
  order?: SortDirection
  field: string
}
