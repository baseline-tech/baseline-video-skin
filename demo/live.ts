import '@videojs/html/video/player';
import '@videojs/html/media/hlsjs-video';
import '../src/index';

// The LIVE badge logic from baseline-rails' video_player_controller.js.
const LIVE_OFFSET = 12;
const LIVE_SLACK = 20;

const media = document.querySelector('hlsjs-video') as HTMLVideoElement;
const badge = document.querySelector('.live-badge') as HTMLButtonElement;

const liveEdge = () => {
  const { seekable, duration } = media;
  return seekable?.length ? seekable.end(seekable.length - 1) : duration;
};

media.addEventListener('timeupdate', () => {
  badge.toggleAttribute('data-behind', liveEdge() - media.currentTime > LIVE_SLACK);
});

badge.addEventListener('click', () => {
  media.currentTime = Math.max(0, liveEdge() - LIVE_OFFSET);
  media.play()?.catch(() => {});
});

// The badge comes and goes with the skin's controls.
customElements.whenDefined('video-player').then(() => {
  const store = (document.querySelector('video-player') as any)?.store;
  if (!store) return;
  const sync = () => badge.toggleAttribute('data-idle', store.controlsVisible === false);
  store.subscribe(sync);
  sync();
});
