# @baseline/videojs-skin

Baseline's Video.js 10 player skin, built from the Neutral skin source.

## Use

The repo is private, so apps install it from Git at a release tag. npm (or Yarn) clones the tag and runs `prepare`, which builds `dist/skin.js`:

```bash
yarn add "@baseline/videojs-skin@git+ssh://git@github.com/baseline-tech/baseline-video-skin.git#v0.1.0"
# npm: npm install "git+ssh://git@github.com/baseline-tech/baseline-video-skin.git#v0.1.0"
```

Every machine that installs it needs read access to this repo: developers through their GitHub SSH key, servers (Hatchbox) through a read-only deploy key (repo Settings → Deploy keys, one per server).

`@videojs/html` is a peer dependency: the page provides one copy of Video.js, this package only adds the skin.

```js
import '@videojs/html/video/player';      // <video-player>
import '@videojs/html/live-video/player'; // <live-video-player>, for live streams
import '@videojs/html/media/hlsjs-video'; // if you play HLS
import '@baseline/videojs-skin';
```

```html
<video-player>
  <baseline-video-skin style="display: block; aspect-ratio: 16 / 9">
    <hlsjs-video src="https://…/index.m3u8" playsinline></hlsjs-video>
  </baseline-video-skin>
</video-player>
```

Inside `<live-video-player>` the control bar shows a YouTube-style **● LIVE** button (red at the live edge, grey behind it; click to jump to live) in place of the time readout. Under `<video-player>` it stays hidden. The live player has no quality, speed or audio-track features, so the settings menu doesn't show on live streams.

The skin's CSS ships inside `dist/skin.js`; no stylesheet link needed.

## Develop

```bash
npm install
npm run dev     # demo at http://localhost:5173 (source) and /demo/dist.html (built bundle, after npm run build)
npm run build   # dist/skin.js
```

- Change controls and layout in `src/components/videojs/video/skin.html`.
- Change Baseline colors in `src/components/videojs/styles/themes/baseline.css`. It layers over the shadcn files, so an `--overwrite` update keeps it.
- Change sizes and motion in `src/components/videojs/styles/themes/theme.css` (all skins) or `neutral.css`.
- `src/index.ts` only packages the skin as `<baseline-video-skin>`; it rarely needs edits.

## Update Video.js

The skin source matches one Video.js version (10.1.0). To move to a new one, commit first, then:

```bash
npx shadcn@latest add @videojs/video --overwrite
```

Review the diff and re-apply our changes. Then bump `@videojs/html` in `peerDependencies` and `devDependencies`, and bump this package's version.

## Release

```bash
npm version patch   # or minor/major: bumps package.json, commits, tags vX.Y.Z
git push --follow-tags
```

Then point the app at the new tag (`#vX.Y.Z`) and reinstall. Tags are the releases; never move one after an app uses it.
