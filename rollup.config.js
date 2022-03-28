import copy from 'rollup-plugin-copy'
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dotenv from 'dotenv';

dotenv.config()

const DEV = (process.env.NODE_ENV !== 'production')
const OUTPUT_DIR = (process.env.OUTPUT_DIR && DEV) || 'dist'

export default {
  input: [
    'src/index.js', 
    'src/index.frontend.js', 
    'src/components/musicRecommendations-vue.js'
  ],
  output: { 
    dir: OUTPUT_DIR,
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
        { src: 'package.json', dest: OUTPUT_DIR },
        { src: 'src/styles/musicrecommendation.less', dest: OUTPUT_DIR },
        { src: 'src/assets', dest: OUTPUT_DIR }
      ]
    })
  ]
}