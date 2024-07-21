import Axios from 'axios'
import { Env } from '../const/env'
import { IAudiData } from '../models/audio'
import { IResponseApi } from '../models'

export enum ApiErrors {
    NotFound = 'Ресурс не найден',
    UnknownError = 'Произошла непредвиденная ошибка',
}
  
const axios = Axios.create()

const setAxiosAuthHeader = (token: null | string): void => {
  if (token) {
    axios.defaults.headers.Authorization = `Bearer ${token}`
  }
}

export const removeToken = (): void => {
  axios.defaults.headers.common.Authorization = null
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("AXIOS ERROR: ", JSON.stringify(error))
    if (error.response.status === 401) {
        throw new Error("Error 401")
    }
    if (error.response.status === 404) {
      throw new Error(ApiErrors.NotFound)
    }
    if (error.response.status === 500) {
      throw new Error(ApiErrors.UnknownError)
    }
    if (error.response.status === 422 && 'errors' in error.response.data) {
      error.response.data.validation = error.response.data.errors
    }
    return Promise.reject(error)
  },
)

class AudioApi{
    private base_url: string = `https://freesound.org/apiv2/search/text/?token=${Env.API_SOUND}&fields=url,download,previews,id,name,tags,type,description,duration`
    getAudioList = async (q: string): Promise<IAudiData[]> =>{
        try{
          const response = (await axios.get<IResponseApi<IAudiData[]>>(this.base_url+"&query="+q)).data.results
          //console.log("res",response)
          return response;
        } catch(e){
            console.log(JSON.stringify(e))
            throw new Error(JSON.stringify(e));
        }
    }
}

const apiAudio = new AudioApi();

export { axios, setAxiosAuthHeader, apiAudio }
