export interface IResponseEntity<T> {
  message?: string
  error: boolean
  data?: T | null
}
