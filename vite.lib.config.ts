import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  build: {
    outDir: 'lib',
    lib: {
      // formats: ['es'],
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'QuizGameLib',
      fileName: (format) => `quiz-game-lib.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'phaser'],
      output: {
        // Provide global variables to use in the UMD build
        // Add external deps here
        globals: {
          react: 'React',
        },
      },
    },
  },
})
