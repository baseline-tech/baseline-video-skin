# @baseline/videojs-skin

Baseline's Video.js 10 player skin, built from the Neutral skin source.

## Use

`@videojs/html` is a peer dependency: the page provides one copy of Video.js, this package only adds the skin.

```js
import '@videojs/html/video/player';
import '@videojs/html/media/hlsjs-video'; // if you play HLS
import '@baseline/videojs-skin';
```

```html
<video-player>
  <baseline-video-skin style="display: block; aspect-ratio: 16 / 9">
    <hls-video src="https://…/index.m3u8" playsinline></hls-video>
  </baseline-video-skin>
</video-player>
```

The skin's CSS ships inside `dist/skin.js`; no stylesheet link needed.

### From the CDN

Not verified yet. The bundle imports `@videojs/html/*` by bare specifier, so a CDN page needs those imports resolved to the same single copy of Video.js the page uses. jsDelivr's `/+esm` endpoint rewrites bare imports, so load both from it at exact versions:

```html
<script type="module">
  import 'https://cdn.jsdelivr.net/npm/@videojs/html@10.1.0/video/player/+esm';
  import 'https://cdn.jsdelivr.net/npm/@baseline/videojs-skin@0.1.0/+esm';
</script>
```

Check after the first publish that only one copy of `@videojs/html` loads (Network tab). Pin exact versions on the CDN, never ranges.

## Develop

```bash
npm install
npm run dev     # demo at http://localhost:5173 (source) and /demo/dist.html (built bundle, after npm run build)
npm run build   # dist/skin.js
```

- Change controls and layout in `src/components/videojs/video/skin.html`.
- Change colors, sizes and motion in `src/components/videojs/styles/themes/theme.css` (all skins) or `neutral.css`.
- `src/index.ts` only packages the skin as `<baseline-video-skin>`; it rarely needs edits.

## Update Video.js

The skin source matches one Video.js version (10.1.0). To move to a new one, commit first, then:

```bash
npx shadcn@latest add @videojs/video --overwrite
```

Review the diff and re-apply our changes. Then bump `@videojs/html` in `peerDependencies` and `devDependencies`, and bump this package's version.

## Release

```bash
npm version patch   # or minor/major
npm publish         # builds first (prepublishOnly)
git push --follow-tags
```
