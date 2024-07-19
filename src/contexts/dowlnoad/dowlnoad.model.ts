import { IAudiData } from "models"

export interface IDownloadCtxProps {
    downloadQueue: IAudiData[]
    setDownloadQueue: React.Dispatch<React.SetStateAction<IAudiData[]>>
    downloadProgress: Record<number, number>
    setDownloadProgress: React.Dispatch<React.SetStateAction<Record<number, number>>>
  }
  