import { ipcRenderer, IpcRendererEvent } from 'electron'

// Move to its own type file
declare var CiderFrontAPI: any;
declare var uuidv4: any;
declare var app: any;

interface MusicRecommendationsPlugin {
  menuEntryId: any;
}

class MusicRecommendationsPlugin {
  constructor() {
    CiderFrontAPI.StyleSheets.Add("./plugins/music-recommendations/musicrecommendation.less")

    this.menuEntryId = uuidv4()

    const menuEntry = new CiderFrontAPI.Objects.MenuEntry()
    menuEntry.Id = this.menuEntryId
    menuEntry.name = "Music Recommendations"
    menuEntry.onClick = ()=>{
      app.appRoute("plugin/music-recommendations")
    }
    CiderFrontAPI.AddMenuEntry(menuEntry)
  }
}

new MusicRecommendationsPlugin()