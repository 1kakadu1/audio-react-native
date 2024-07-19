import React, {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useState,
  } from 'react'
import { IDownloadCtxProps } from './dowlnoad.model'
import { IAudiData } from 'models'
  
  const DownloadContext = createContext<IDownloadCtxProps | undefined>(undefined)
  
  export const useDownloadContext = () => {
    const context = useContext(DownloadContext)
    if (!context) {
      throw new Error('useDownloadContext must be used within a DownloadProvider')
    }
    return context
  }
  
  export const DownloadProvider: FC<PropsWithChildren> = ({ children }) => {
    const [downloadQueue, setDownloadQueue] = useState<IAudiData[]>([])
    const [downloadProgress, setDownloadProgress] = useState<Record<number, number>>({})
  
    return (
      <DownloadContext.Provider value={{ downloadQueue, setDownloadQueue, downloadProgress, setDownloadProgress }}>
        {children}
      </DownloadContext.Provider>
    )
  }
  