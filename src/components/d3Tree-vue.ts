// https://github.com/gywgithub/vue-d3-examples/blob/master/src/components/Trees/TreeV.vue
import { select, tree, hierarchy } from '../deps/d3'

declare var Vue: any;

export default Vue.component('d3-tree', {
  template: `
    <div>
      <svg id="vizTreeV" class="container-border" />
    </div>
  `,
  props: {
    data: Object
  },
  data () {
    return {}
  },
  mounted () {
    var margin = { top: 120, right: 90, bottom: 30, left: 90 }
    var width = 960 - margin.left - margin.right
    var height = 600 - margin.top - margin.bottom

    var svg = select('#vizTreeV').attr('viewBox', [-10, -10, width, height])
      .append('g')
      .attr('transform', 'translate(' +
        margin.left + ',' + margin.top + ')')

    var i = 0
    var duration = 750
    var root

    // declares a tree layout and assigns the size
    var treemap = tree().size([height, width]).nodeSize([30, 60])
    // var treemap = d3.tree().nodeSize([width, height])

    // Assigns parent, children, height, depth
    root = hierarchy(this.data, function (d) { return d.children })
    root.x0 = height / 2
    root.y0 = 100

    // Collapse after the second level
    root.children.forEach(collapse)

    update(root)

    // Collapse the node and all it's children
    function collapse (d) {
      if (d.children) {
        d._children = d.children
        d._children.forEach(collapse)
        d.children = null
      }
    }

    function update (source) {
      // Assigns the x and y position for the nodes
      var treeData = treemap(root)

      // Compute the new tree layout.
      var nodes = treeData.descendants()
      var links = treeData.descendants().slice(1)

      // Normalize for fixed-depth.
      nodes.forEach(function (d) { d.y = d.depth * 180 })

      // ****************** Nodes section ***************************

      // Update the nodes...
      var node = svg.selectAll('g.node')
        .data(nodes, function (d) { return d.id || (d.id = ++i) })

      // Enter any new modes at the parent's previous position.
      var nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', function () {
          return 'translate(' + source.y0 + ',' + source.x0 + ')'
        })
        .on('click', click)

      // Add Circle for the nodes
      nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', 1e-6)
        .style('fill', function (d) {
          return d._children ? '#c9e4ff' : '#fff'
        })
        // .on('click', function () {
        //   d3.select(this)
        //     .transition()
        //     .delay(1)
        //     .style('fill', function () {
        //       return '#6cfa00'
        //     })
        //     .style('stroke-width', function () {
        //       return '3px'
        //     })
        // })

      // Add labels for the nodes
      nodeEnter.append('text')
        .attr('dy', '.35em')
        .attr('x', function (d) {
          return d.children || d._children ? -13 : 13
        })
        .attr('text-anchor', function (d) {
          return d.children || d._children ? 'end' : 'start'
        })
        .text(function (d) { return d.data.name })

      // UPDATE
      var nodeUpdate = nodeEnter.merge(node)

      // Transition to the proper position for the node
      nodeUpdate.transition()
        .duration(duration)
        .attr('transform', function (d) {
          return 'translate(' + d.y + ',' + d.x + ')'
        })

      // Update the node attributes and style
      nodeUpdate.select('circle.node')
        .attr('r', 10)
        .style('fill', function (d) {
          return d._children ? '#c9e4ff' : '#fff'
        })
        .style('stroke-width', function () {
          return '2px'
        })
        .attr('cursor', 'pointer')

      // Remove any exiting nodes
      var nodeExit = node.exit().transition()
        .duration(duration)
        .attr('transform', function () {
          return 'translate(' + source.y + ',' + source.x + ')'
        })
        .remove()

      // On exit #f7d708uce the node circles size to 0
      nodeExit.select('circle')
        .attr('r', 1e-6)

      // On exit #f7d708uce the opacity of text labels
      nodeExit.select('text')
        .style('fill-opacity', 1e-6)

      // ****************** links section ***************************

      // Update the links...
      var link = svg.selectAll('path.link')
        .data(links, function (d) { return d.id })

      // Enter any new links at the parent's previous position.
      var linkEnter = link.enter().insert('path', 'g')
        .attr('class', 'link')
        .attr('d', function () {
          var o = { x: source.x0, y: source.y0 }
          return diagonal(o, o)
        })

      // UPDATE
      var linkUpdate = linkEnter.merge(link)

      // Transition back to the parent element position
      linkUpdate.transition()
        .duration(duration)
        .attr('d', function (d) { return diagonal(d, d.parent) })

      // Remove any exiting links
      link.exit().transition()
        .duration(duration)
        .attr('d', function () {
          var o = { x: source.x, y: source.y }
          return diagonal(o, o)
        })
        .remove()

      // Store the old positions for transition.
      nodes.forEach(function (d) {
        d.x0 = d.x
        d.y0 = d.y
      })

      // Creates a curved (diagonal) path from parent to the child nodes
      function diagonal (s, d) {
        let path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

        return path
      }

      // Toggle children on click.
      function click (d) {
        if (d.children) {
          d._children = d.children
          d.children = null
        } else {
          d.children = d._children
          d._children = null
        }
        update(d)
      }
    }
  },
  methods: {
    getSize () {
      const {$el: {clientWidth: width, clientHeight: height}} = this
      return { width, height }
    },
  }
});