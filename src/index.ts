import path from 'path'
import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron'    

export default class MusicRecommendationsPlugin {
    /**
     * Base Plugin Details (Eventually implemented into a GUI in settings)
     */
    public name: string = 'Music Recommendations';
    public description: string = 'A template for building Cider plugins using Typescript.';
    public version: string = '1.0.0';
    public author: string = 'Chase Ingebritson';
         
    /**
     * Private variables for interaction in plugins
     */
    private env
    private win

    /**
     * Runs on plugin load (Currently run on application start)
     */
    constructor(env) {
        this.env = env

        console.debug(`[Plugin][${this.name}] Loading Complete.`)
    }

    /**
     * Runs on app ready
     */
    async onReady(win): Promise<void> {
        this.win = win
        console.debug(`[Plugin][${this.name}] Ready.`)

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
    async onRendererReady(win: BrowserWindow) {
        console.log(`[Plugin][${this.name}] Renderer Ready`)
        // this.env.utils.loadJSFrontend(path.join(this.env.dir, "index.frontend.js"))
    }

    /**
     * Runs on app stop
     */
    onBeforeQuit(): void {
        console.log(`[Plugin][${this.name}] Stopped`)
    }

    /**
     * Runs on playback State Change
     * @param attributes Music Attributes (attributes.status = current state)
     */
    async onPlaybackStateDidChange(attributes: object): Promise<void> {

        const res = await this.getRelatedArtists("1500046401")
        console.log(res)
    }

    /**
     * Runs on song change
     * @param attributes Music Attributes
     */
    onNowPlayingItemDidChange(attributes: object): void {

    }

    private async getRelatedArtists(id) {
        const response = await this.win.webContents.executeJavaScript(`
            (async () => {
                const mk = MusicKit.getInstance()

                const storeFront = mk.storefrontId
                const res = await mk.api.v3.music("/v1/catalog/" + storeFront + "/artists/${id}", {
                    views: ["similar-artists"]
                })
                if (!res) console.error('[Plugin][${this.name}] Request failed: /v1/catalog/" + storeFront + "/artists/${id}')
                return res.data
            })()
        `).catch(console.error)

        const artist = response?.data[0]

        return artist.views['similar-artists'].data
    }
}