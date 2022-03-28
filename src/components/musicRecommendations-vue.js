import VueTree from '@ssthouse/vue-tree-chart'
import { v4 as uuidv4 } from 'uuid';
import { getArtist, getSimilarArtists, getArtwork } from '../utils/frontend/music'
import { insertNode } from '../utils/tree'

Vue.component('plugin.music-recommendations', {
  template: `
    <div>
      <vue-tree-controls
        @zoom-in="zoomIn"
        @zoom-out="zoomOut"
        @zoom-reset="zoomReset"
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
          <vue-tree-node :node="node" @add-similar-artists="addSimilarArtists(node)" />
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
        nodeWidth: 250, 
        nodeHeight: 100, 
        levelHeight: 350
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
        nodeId: uuidv4(),
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
      
      const children = relatedArtists.map(artist => {
        return this.buildNode(artist)
      })
      
      insertNode(this.treeData, node.nodeId, children)
    },
    zoomIn () {
      this.$refs.tree.zoomIn()
    },
    zoomOut () {
      this.$refs.tree.zoomOut()
    },
    zoomReset () {
      this.$refs.tree.restoreScale()
    }
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
    </div>
  `,
  props: {
    node: Object
  },
  methods: {
    addSimilarArtists(node) {
      this.$emit('add-similar-artists', node)
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
    </div>
  `
});