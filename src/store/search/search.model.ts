export interface ISearchState{
    search?: string;
    isLoading: boolean;
    localHistory: string[];
    error: undefined | string,
}