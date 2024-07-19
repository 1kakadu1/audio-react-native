import { createDownloadResumable, documentDirectory, DownloadProgressData } from 'expo-file-system'
import { useAppDispatch, useAppSelector } from 'store'
import { IAudiData } from 'models'
import { useDownloadContext } from './dowlnoad.context'
import { convertTrackName, deleteFile } from './dowload.utils'

export const useDownloadAudio = () => {
  const dispatch = useAppDispatch()
  const { setDownloadQueue, setDownloadProgress } = useDownloadContext()

  const download = async (data: IAudiData) => {
    const fileUri = documentDirectory + `${convertTrackName(data.previews['preview-lq-mp3'], true)}`

    const callback = (downloadProgress: DownloadProgressData) => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        
        setDownloadProgress({ [data.id]: progress })
    };

    const downloadResumable = createDownloadResumable(
        data.previews['preview-lq-mp3'], 
        fileUri, 
        {},
        callback
    )

    try {
      await downloadResumable.downloadAsync()
      //dispatch(addAudioDownloadedList({ ...data, audio: fileUri }))
      setDownloadQueue((prev) => prev.filter((item: IAudiData) => item.id !== data.id))
      setDownloadProgress({ [data.id]: 100 })
    } catch (e) {
      deleteFile(fileUri)
      setDownloadQueue([])
    //   Snackbar.show({
    //     text: FileErrorMessage.DownloadError,
    //     backgroundColor: colors.red,
    //     duration: 10000,
    //     numberOfLines: 3,
    //     marginBottom: 72,
    //   })
    }
  }

  return { download }
}
