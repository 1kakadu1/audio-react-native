import { ISearchState } from "./search.model";

export const INITIAL_SEARCH_STATE: ISearchState = {
    search: "piano",
    localHistory: ["piano"],
    isLoading: false,
    error: undefined
}
  
export const SLICE_NAME = "search";