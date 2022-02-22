import typescript from '@rollup/plugin-typescript'
import copy from 'rollup-plugin-copy'

export default {
  input: ['src/index.ts', 'src/index.frontend.ts'],
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
    copy({
      targets: [
        { src: 'package.json', dest: 'dist' }
      ]
    })
  ]
}