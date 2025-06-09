import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const ReactCompilerConfig = {/* ... */ };

export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [
        [
          "babel-plugin-react-compiler",
           ReactCompilerConfig
          ]
        ],
    },
  }), tailwindcss()]
})
