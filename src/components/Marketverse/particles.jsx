import { BufferGeometry, BufferAttribute, PointsMaterial, Points } from "three";

function createParticles() {
  const particleGeometry = new BufferGeometry();

  const particleCount = 6000;

  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    const index = i * 3;

    const radius = Math.random() * 1000 + 800; // Random distance from the center

    const u = Math.random();
    const v = Math.random();

    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);

    // Convert spherical coordinates to Cartesian coordinates
    positions[index] = Math.cos(theta) * Math.sin(phi) * radius;
    positions[index + 1] = Math.cos(phi) * radius;
    positions[index + 2] = Math.sin(theta) * Math.sin(phi) * radius;

    colors[index] = 1;
    colors[index + 1] = 1;
    colors[index + 2] = 1;

    sizes[i] = Math.random() * 3;
  }

  particleGeometry.setAttribute(
    "position",
    new BufferAttribute(positions, 3)
  );
  particleGeometry.setAttribute("color", new BufferAttribute(colors, 3));
  particleGeometry.setAttribute("size", new BufferAttribute(sizes, 1));

  const particleMaterial = new PointsMaterial({
    size: 1, // Adjust the size of the particles
    vertexColors: true,
  });

  const particleSystem = new Points(particleGeometry, particleMaterial);

  return particleSystem;
}

export { createParticles };
