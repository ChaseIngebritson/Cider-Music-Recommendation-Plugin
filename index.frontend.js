'use strict';

// import { ipcRenderer, IpcRendererEvent } from 'electron'
class MusicRecommendationsPlugin {
  constructor() {
    CiderFrontAPI.StyleSheets.Add("./plugins/gh_462093451/musicrecommendation.less");
    this.menuEntryId = uuidv4();
    const menuEntry = new CiderFrontAPI.Objects.MenuEntry();
    menuEntry.Id = this.menuEntryId;
    menuEntry.name = "Music Recommendations";

    menuEntry.onClick = () => {
      app.appRoute("plugin/music-recommendations");
    };

    CiderFrontAPI.AddMenuEntry(menuEntry);
  }

}

new MusicRecommendationsPlugin();
