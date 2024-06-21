export interface IResponseApi<T>{
    results: T,
    next?: string,
    prev?: string,
    count: number
}