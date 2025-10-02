import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()]
  // base: '/CSRev.gg/' // uncomment for GitHub Pages build
});