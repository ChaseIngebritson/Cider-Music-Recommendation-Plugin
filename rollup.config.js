import copy from 'rollup-plugin-copy'
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: [
    'src/index.js', 
    'src/index.frontend.js', 
    'src/components/musicRecommendations-vue.js'
  ],
  output: { 
    dir: 'dist', 
    format: 'cjs' 
  },
  external: ['path', 'fs', 'electron'],
  plugins: [
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
    nodeResolve({
      // use "jsnext:main" if possible
      // see https://github.com/rollup/rollup/wiki/jsnext:main
      'jsnext:main': true
    }),
    copy({
      targets: [
        { src: 'package.json', dest: 'dist' },
        { src: 'src/styles/musicrecommendation.less', dest: 'dist' }
      ]
    })
  ]
}