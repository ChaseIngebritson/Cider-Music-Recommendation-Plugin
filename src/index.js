import path from 'path'

export default class MusicRecommendationsPlugin {
    /**
     * Base Plugin Details (Eventually implemented into a GUI in settings)
     */
    name = 'Music Recommendations';
    description = 'A template for building Cider plugins using Typescript.';
    version = '1.0.0';
    author = 'Chase Ingebritson';
         
    /**
     * Private variables for interaction in plugins
     */
    env
    win

    /**
     * Runs on plugin load (Currently run on application start)
     */
    constructor(env) {
        this.env = env

        this.debug('Loading Complete')
    }

    /**
     * Runs on app ready
     */
    async onReady(win) {
        this.win = win
        this.debug('Ready')

        // ipcMain.handle("plugin.frontendComm", (event: IpcMainEvent, message: any) => {
        //     console.debug(`Frontend says: ${message}`)

        //     const window = this.env.utils.getWindow()
        //     window.webContents.send("plugin.backendComm", 'Hello from the backend!')
        // })

    }

    /**
     * Runs on renderer ready
     * @param win The current browser window
     */
    async onRendererReady(win) {
        this.debug('Renderer Ready')
        
        this.env.utils.loadJSFrontend(path.join(this.env.dir, "index.frontend.js"))
        this.env.utils.loadJSFrontend(path.join(this.env.dir, "musicRecommendations-vue.js"))
    }

    /**
     * Runs on app stop
     */
    onBeforeQuit() {
        this.debug('Stopped')
    }

    /**
     * Runs on playback State Change
     * @param attributes Music Attributes (attributes.status = current state)
     */
    onPlaybackStateDidChange(attributes) {
    
    }

    /**
     * Runs on song change
     * @param attributes Music Attributes
     */
    onNowPlayingItemDidChange(attributes) {

    }

    debug(text) {
        console.log(`[Plugin][${this.name}]`, text)
    }
}