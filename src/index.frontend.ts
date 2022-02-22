
import { ipcRenderer, IpcRendererEvent } from 'electron'

class MusicRecommendationsPlugin {
  constructor() {
      // Setting up a ipcRenderer channel for back end to communicate with
      ipcRenderer.on('plugin.backendComm', (event: IpcRendererEvent, message: any) => {
        // Alert popup
        console.log(`Backend says: ${message}`)
      })

      // Saying hello to the backend
      ipcRenderer.invoke('plugin.frontendComm', "Hello from the frontend!")
  }
}

new MusicRecommendationsPlugin()