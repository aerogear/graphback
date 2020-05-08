type SortDirection = 'asc' | 'desc'

/**
 * @todo move this into a common file
 */
export interface GraphbackOrderBy {
  direction?: SortDirection
  field: string
}
