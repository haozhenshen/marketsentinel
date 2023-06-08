import { PointLight } from 'three';

function createPointLight() {
    const pointLight = new PointLight(0xffffff, 0.5);

  return pointLight;
}

export { createPointLight };