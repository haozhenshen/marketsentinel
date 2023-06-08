import { AmbientLight } from 'three';

function createAmbientLight() {
    const ambientLight = new AmbientLight(0xffffff, 0.5);

  return ambientLight;
}

export { createAmbientLight };