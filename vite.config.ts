import path from 'path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(path.join(__dirname, 'src')),
			'@root': path.resolve(__dirname),
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/tests/setup.ts',
	},
});
