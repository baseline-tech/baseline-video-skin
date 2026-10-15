// Registers the skin's UI elements and styles, then <baseline-video-skin>, which renders the
// skin markup around whatever media element it is given:
//
//   <video-player>
//     <baseline-video-skin><hls-video src="…" playsinline></hls-video></baseline-video-skin>
//   </video-player>
//
// Edit the skin itself in src/components/videojs (shadcn source); this file only packages it.
import './components/videojs/video/skin';
import './components/videojs/styles/themes/baseline.css';
import template from './components/videojs/video/skin.html?raw';

const PLACEHOLDER = 'Add a compatible media component here.';

export class BaselineVideoSkin extends HTMLElement {
  connectedCallback() {
    if (this.querySelector(':scope > media-container')) return;

    const media = [...this.childNodes];
    this.innerHTML = template;
    const container = this.firstElementChild as HTMLElement;

    const walker = document.createTreeWalker(container, NodeFilter.SHOW_COMMENT);
    let slot: Node | null = null;
    while (walker.nextNode()) {
      if (walker.currentNode.nodeValue?.trim() === PLACEHOLDER) slot = walker.currentNode;
    }
    if (slot) slot.parentNode!.replaceChild(fragmentOf(media), slot);
    else container.prepend(fragmentOf(media));
  }
}

function fragmentOf(nodes: Node[]) {
  const fragment = document.createDocumentFragment();
  fragment.append(...nodes);
  return fragment;
}

if (!customElements.get('baseline-video-skin')) {
  customElements.define('baseline-video-skin', BaselineVideoSkin);
}
