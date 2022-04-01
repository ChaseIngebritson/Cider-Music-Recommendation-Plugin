import VueTree from '@ssthouse/vue-tree-chart'
import { getArtist, getSimilarArtists, getArtwork, getNowPlayingArtist } from '../utils/frontend/music'
import { insertNode, removeChildren, getAllIds } from '../utils/tree'
import { debug } from '../utils/debug'
import { PLUGIN_NAME } from '../constants'

Vue.component('plugin.music-recommendations', {
  template: `
    <div>
      <vue-tree-controls
        @zoom-in="zoomIn"
        @zoom-out="zoomOut"
        @zoom-reset="zoomReset"
        @open-settings="toggleSettingsMenu(true)"
      />

      <vue-settings 
        v-if="settingsMenuOpen"
        :allow-duplicate-artists.sync="settings.allowDuplicateArtists"
        @close-settings="toggleSettingsMenu(false)"
      />

      <vue-tree
        :dataset="treeData"
        :config="treeConfig"
        direction="vertical"
        :collapse-enabled="false"
        ref="tree"
        class="tree"
      >
        <template v-slot:node="{ node }">
          <vue-tree-node 
            :node="node" 
            @add-similar-artists="addSimilarArtists(node)"
            @remove-similar-artists="removeSimilarArtists(node)"
          />
        </template>
      </vue-tree>
    </div>
  `,
  components: {
    'vue-tree': VueTree
  },
  data: () => ({
    treeData: {},
    treeConfig: { 
      nodeWidth: 250, 
      nodeHeight: 100, 
      levelHeight: 350
    },
    loadedArtists: new Set(),
    settings: {
      allowDuplicateArtists: false,
    },
    settingsMenuOpen: false
  }),
  async mounted () {
    const settings = this.getLocalStorage('settings')
    if (settings) this.settings = settings

    const nowPlayingArtist = await getNowPlayingArtist()
    const localTreeData = this.getLocalStorage('treeData')

    // If the local save exists and it's the same artist or there is no artist, use the local save
    if (localTreeData && (localTreeData.id === nowPlayingArtist.id || !nowPlayingArtist)) {
      this.treeData = localTreeData
      this.loadedArtists = getAllIds(this.treeData)

    // If no save is loaded, use the now playing artist
    } else if (nowPlayingArtist) {
      const artist = await getArtist(nowPlayingArtist.id)
      this.treeData = this.buildNode(artist)
      this.loadedArtists.add(this.treeData.id)
    }
  },
  watch: {
    settings: {
      deep: true,
      handler () {
        this.updateLocalStorage('settings', this.settings)
      }
    }
  },
  methods: {
    buildNode (artist) {
      return {
        nodeId: window.uuidv4(),
        id: artist.id,
        name: artist.attributes.name,
        artwork: getArtwork(artist.attributes.artwork, 175, 175),
        genres: artist.attributes.genreNames.join(', '),
        details: JSON.stringify(artist),
        children: []
      }
    },
    async addSimilarArtists (node) {
      const relatedArtists = await getSimilarArtists(node.id)
      debug(`Found ${relatedArtists.length} related artists`)

      if (!relatedArtists.length) return window.notyf.error('Unable to find any related artists')
      
      let children = relatedArtists.map(artist => {
        return this.buildNode(artist)
      })

      if (!this.settings.allowDuplicateArtists) {
        debug(`Removing duplicate artists`)
        children = children.filter(child => {
          return !this.loadedArtists.has(child.id)
        })
      }

      if (!children.length) return window.notyf.error('All related artists exist in the tree already')

      // Push the new artist to the Set of loaded artists
      children.forEach(child => {
        this.loadedArtists.add(child.id)
      })
      
      insertNode(this.treeData, node.nodeId, children)

      this.updateLocalStorage('treeData', this.treeData)
    },
    removeSimilarArtists (node) {
      removeChildren(this.treeData, node.nodeId)
      this.updateLocalStorage('treeData', this.treeData)

      this.loadedArtists = getAllIds(this.treeData)
      debug(`Found ${this.loadedArtists.size} loaded artists`)
    },
    zoomIn () {
      this.$refs.tree.zoomIn()
    },
    zoomOut () {
      this.$refs.tree.zoomOut()
    },
    zoomReset () {
      this.$refs.tree.restoreScale()
    },
    updateLocalStorage (key, data) {
      localStorage.setItem(`plugin.${PLUGIN_NAME}.${key}`, JSON.stringify(data))

      debug(`Updated ${key} in localStorage`, data)
    },
    getLocalStorage (key) {
      const data = localStorage.getItem(`plugin.${PLUGIN_NAME}.${key}`)

      if (data) debug(`Loaded ${key} from localStorage`, JSON.parse(data))
      return JSON.parse(data)
    },
    toggleSettingsMenu (mode) {
      this.settingsMenuOpen = mode
    },
  }
});

Vue.component('vue-tree-node', {
  template: `
    <div class="rich-media-node">
      <!-- <img :src="node.artwork" class="image" /> -->
      <mediaitem-square
        v-if="node.details"
        :item="JSON.parse(node.details)"
      />
      
      <div class="content">
        <div class="subtitle">{{ node.genres }}</div>
      </div>

      <button
        v-if="!node.children || !node.children.length"
        @click="addSimilarArtists(node)" 
        class="node-control"
      >
        Add Similar Artists
      </button>

      <button
        v-if="node.children && node.children.length"
        @click="removeSimilarArtists(node)" 
        class="node-control"
      >
        Remove Similar Artists
      </button>
    </div>
  `,
  props: {
    node: Object
  },
  methods: {
    addSimilarArtists(node) {
      this.$emit('add-similar-artists', node)
    },
    removeSimilarArtists(node) {
      this.$emit('remove-similar-artists', node)
    }
  }
});

Vue.component('vue-tree-controls', {
  template: `
    <div class="control-container">
      <button 
        @click="$emit('zoom-in')" 
        class="control-button icon-zoom-in"
        title="Zoom In"
      />
      <button 
        @click="$emit('zoom-out')" 
        class="control-button icon-zoom-out"
        title="Zoom Out"
      />
      <button 
        @click="$emit('zoom-reset')" 
        class="control-button icon-rotate-ccw"
        title="Reset Zoom"
      />
      <button 
        @click="$emit('open-settings')" 
        class="control-button icon-settings"
        title="Open Settings"
      />
    </div>
  `
});

Vue.component('vue-settings', {
  template: `
    <div 
      class="modal-fullscreen addtoplaylist-panel" 
      @click.self="$emit('close-settings')" 
      @contextmenu.self="$emit('close-settings')"
    >
      <div class="modal-window">
        <div class="modal-header">
          <div class="modal-title">Plugin Settings</div>
          <button class="close-btn" @click="$emit('close-settings')"></button>
        </div>
        <div class="modal-content">
          <div class="modal-item playlist-item">
            <div class="modal-item-name">Allow Duplicate Artists</div>
            <input 
              type="checkbox" 
              switch
              :checked="allowDuplicateArtists"
              @change="$emit('update:allow-duplicate-artists', $event.target.checked)"
              class="modal-item-control"
            />
          </div>
        </div>
      </div>
    </div>
  `,
  props: {
    allowDuplicateArtists: {
      type: Boolean
    }
  },
});