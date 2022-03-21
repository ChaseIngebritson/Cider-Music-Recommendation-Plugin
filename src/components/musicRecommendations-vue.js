import d3Tree from './d3Tree-vue'

Vue.component('plugin.music-recommendations', {
  template: `
    <div>
      <d3-tree :data="treeData" />
    </div>
  `,
  components: {
    'd3-tree': d3Tree
  },
  data () {
    return {
      treeData: {
        'name': 'flare',
        'children': [
          {
            'name': 'animate',
            'children': [
              { 'name': 'Easing', 'value': 17010 },
              { 'name': 'FunctionSequence', 'value': 5842 },
              {
                'name': 'interpolate',
                'children': [
                  { 'name': 'ArrayInterpolator', 'value': 1983 },
                  { 'name': 'ColorInterpolator', 'value': 2047 },
                  { 'name': 'DateInterpolator', 'value': 1375 },
                  { 'name': 'Interpolator', 'value': 8746 },
                  { 'name': 'MatrixInterpolator', 'value': 2202 },
                  { 'name': 'NumberInterpolator', 'value': 1382 },
                  { 'name': 'ObjectInterpolator', 'value': 1629 },
                  { 'name': 'PointInterpolator', 'value': 1675 },
                  { 'name': 'RectangleInterpolator', 'value': 2042 }
                ]
              },
              { 'name': 'ISchedulable', 'value': 1041 },
              { 'name': 'Parallel', 'value': 5176 },
              { 'name': 'Pause', 'value': 449 },
              { 'name': 'Scheduler', 'value': 5593 },
              { 'name': 'Sequence', 'value': 5534 },
              { 'name': 'Transition', 'value': 9201 },
              { 'name': 'Transitioner', 'value': 19975 },
              { 'name': 'TransitionEvent', 'value': 1116 },
              { 'name': 'Tween', 'value': 6006 }
            ]
          },
          {
            'name': 'display',
            'children': [
              { 'name': 'DirtySprite', 'value': 8833 },
              { 'name': 'LineSprite', 'value': 1732 },
              { 'name': 'RectSprite', 'value': 3623 },
              { 'name': 'TextSprite', 'value': 10066 }
            ]
          },
          {
            'name': 'flex',
            'children': [
              { 'name': 'FlareVis', 'value': 4116 }
            ]
          },
          {
            'name': 'physics',
            'children': [
              { 'name': 'DragForce', 'value': 1082 },
              { 'name': 'GravityForce', 'value': 1336 },
              { 'name': 'IForce', 'value': 319 },
              { 'name': 'NBodyForce', 'value': 10498 },
              { 'name': 'Particle', 'value': 2822 },
              { 'name': 'Simulation', 'value': 9983 },
              { 'name': 'Spring', 'value': 2213 },
              { 'name': 'SpringForce', 'value': 1681 }
            ]
          },
          {
            'name': 'scale',
            'children': [
              { 'name': 'IScaleMap', 'value': 2105 },
              { 'name': 'LinearScale', 'value': 1316 },
              { 'name': 'LogScale', 'value': 3151 },
              { 'name': 'OrdinalScale', 'value': 3770 },
              { 'name': 'QuantileScale', 'value': 2435 },
              { 'name': 'QuantitativeScale', 'value': 4839 },
              { 'name': 'RootScale', 'value': 1756 },
              { 'name': 'Scale', 'value': 4268 },
              { 'name': 'ScaleType', 'value': 1821 },
              { 'name': 'TimeScale', 'value': 5833 }
            ]
          }
        ]
      }
    }
  }
});