
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';
import eslintPlugin from 'vite-plugin-eslint';


export default defineConfig({
  plugins: [
    glsl(),
    eslintPlugin()
  ],
});
