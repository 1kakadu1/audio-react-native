
import { Provider } from "react-redux";
import { persistor, store } from "../store";
import { NavigationApp } from "../navigation";
import { PersistGate } from "redux-persist/integration/react";
import { AudioPlayerProvider } from "contexts/audio/audio.context";
import { DownloadProvider } from "contexts/dowlnoad/dowlnoad.context";


export const  Appliaction = () =>{
    return(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <DownloadProvider>
                <AudioPlayerProvider>
                    <NavigationApp />
                </AudioPlayerProvider>
            </DownloadProvider>
            </PersistGate>
        </Provider>
    )
}