import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/forgeofages/',
	build: {
		chunkSizeWarningLimit: 5000
	},
	plugins: [ react() ]
});
