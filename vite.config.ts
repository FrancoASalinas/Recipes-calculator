/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Recipes-calculator/' ,
  plugins: [react()], test: {environment: 'jsdom', globals: true}
})
