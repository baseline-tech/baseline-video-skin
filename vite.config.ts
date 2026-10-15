import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';

// Ship one file: move the extracted CSS into the JS so `import '@baseline/videojs-skin'` (or one
// <script>) is all a page needs, the same way the packaged Video.js skins inline theirs.
function injectCss(): Plugin {
  return {
    name: 'inject-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const css = Object.values(bundle).filter((file) => file.type === 'asset' && file.fileName.endsWith('.css'));
      const entry = Object.values(bundle).find((file) => file.type === 'chunk' && file.isEntry);
      if (!entry || entry.type !== 'chunk') return;

      const source = css.map((file) => (file.type === 'asset' ? String(file.source) : '')).join('\n');
      for (const file of css) delete bundle[file.fileName];
      entry.code =
        `if (typeof document !== 'undefined' && !document.getElementById('baseline-video-skin-css')) {` +
        `const s = document.createElement('style'); s.id = 'baseline-video-skin-css'; s.textContent = ${JSON.stringify(source)};` +
        `document.head.append(s); }\n` +
        entry.code;
    },
  };
}

export default defineConfig({
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
  build: {
    lib: { entry: 'src/index.ts', formats: ['es'], fileName: () => 'skin.js' },
    cssCodeSplit: false,
    rollupOptions: {
      // One copy of Video.js per page: the host app (or an import map) provides it.
      external: [/^@videojs\//],
    },
  },
  plugins: [injectCss()],
});
