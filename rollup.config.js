import typescript from '@rollup/plugin-typescript'
import copy from 'rollup-plugin-copy'
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: [
    'src/index.ts', 
    'src/index.frontend.ts', 
    'src/components/musicRecommendations-vue.ts'
  ],
  output: { 
    dir: 'dist', 
    format: 'cjs' 
  },
  external: ['path', 'fs', 'electron'],
  plugins: [
    typescript({ 
      lib: ["es2021", "dom"],
      target: "es5",
      moduleResolution: "node"
    }),
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