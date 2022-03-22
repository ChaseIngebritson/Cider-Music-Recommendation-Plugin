import VueTree from '@ssthouse/vue-tree-chart'
import { getArtist, getSimilarArtists, getArtwork } from '../utils/frontend/music'

Vue.component('plugin.music-recommendations', {
  template: `
    <div>
      <vue-tree
        :dataset="treeData"
        :config="treeConfig"
        direction="horizontal"
        class="tree"
      >
        <template v-slot:node="{ node, collapsed }" :collapsed="true">
          <vue-tree-node :node="node" :collapsed="collapsed" @add-similar-artists="addSimilarArtists(node)" />
        </template>
      </vue-tree>
    </div>
  `,
  components: {
    'vue-tree': VueTree
  },
  data () {
    return {
      treeData: {},
      treeConfig: { 
        nodeWidth: 120, 
        nodeHeight: 80, 
        levelHeight: 200
      }
    }
  },
  async mounted () {
    const artist = await getArtist(1500046401)
    this.treeData = this.buildNode(artist)
  },
  methods: {
    buildNode (artist) {
      return {
        name: artist.attributes.name,
        artwork: getArtwork(artist.attributes.artwork, 50, 50),
        details: artist,
        children: []
      }
    },
    async addSimilarArtists (node) {
      const relatedArtists = await getSimilarArtists(node.details.id)
      
      const children = relatedArtists.map(artist => {
        return this.buildNode(artist)
      })

      node.children = children
      console.log(node)
    }
  }
});

Vue.component('vue-tree-node', {
  template: `
    <div
      class="tree-rich-media-node"
      :style="{ border: collapsed ? '2px solid grey' : '' }"
    >
      <img
        :src="node.artwork"
        style="width: 50px; height: 50px; border-raduis: 4px;"
      />
      <span style="padding: 4px 0; font-weight: bold;">{{ node.name }}</span>
      <button @click="onNodeClick(node)">Open Artist</button>
      <button @click="addSimilarArtists(node)">Add Similar Artists</button>
    </div>
  `,
  props: {
    node: Object,
    collapsed: Boolean
  },
  methods: {
    async onNodeClick(node) {
      await window.app.getArtistFromID(node.details.id)
    },
    addSimilarArtists(node) {
      this.$emit('add-similar-artists', node)
    }
  }
});