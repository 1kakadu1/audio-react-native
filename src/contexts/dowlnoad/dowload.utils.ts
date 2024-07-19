import { deleteAsync, documentDirectory, getInfoAsync, readDirectoryAsync } from 'expo-file-system'

export const clearDirectory = async (directoryPath = documentDirectory) => {
    if (!directoryPath) {
      return
    }
  
    try {
      const files = await readDirectoryAsync(directoryPath)
  
      for (const fileName of files) {
        const filePath = `${directoryPath}/${fileName}`
        const fileInfo = await getInfoAsync(filePath)
  
        if (!fileInfo.isDirectory) {
          await deleteAsync(filePath, { idempotent: true })
        }
      }
    } catch (error) {
      console.error('Ошибка при удалении файлов:', error)
    }
  }
  
  export const deleteFile = async (filePath: string) => {
    try {
      await deleteAsync(filePath, { idempotent: true })
    } catch (error) {
      console.error('Ошибка при удалении файла:', error)
    }
  }

export const convertTrackName = (s: string, replaceSpace: boolean = false)=>{
    const q_split = decodeURI(s).split("?");
    const name_preview_split = q_split[0].replaceAll("%2F", "/").split("/");
    const name_track = name_preview_split[name_preview_split.length - 1];

    return replaceSpace ? name_track.replaceAll(" ","-")  : name_track;
}