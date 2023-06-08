import { PerspectiveCamera } from 'three';

function createCamera() {
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 200;

  return camera;
}

export { createCamera };