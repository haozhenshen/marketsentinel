import { WebGLRenderer } from 'three';

function createRenderer() {

  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  return renderer;
}

export { createRenderer };