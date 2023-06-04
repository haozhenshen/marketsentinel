import * as THREE from 'three';
import { Points, PointsMaterial } from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
const scene = new THREE.Scene();

const particleGeometry = new THREE.BufferGeometry();

const particleCount = 6000;

const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);
const sizes = new Float32Array(particleCount);

for (let i = 0; i < particleCount; i++) {
    const index = i * 3;
  
    const radius = Math.random() * 1000 + 300; // Random distance from the center
  
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

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

const particleMaterial = new THREE.PointsMaterial({
    size: 1, // Adjust the size of the particles
    vertexColors: true,
  });


const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particleSystem);

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 200;

// Create a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


function generateTextTexture(text, size) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const fontSize = size; // Text size
    const fontFamily = 'Arial'; // Font family
  
    context.font = `${fontSize}px ${fontFamily}`;
  
    // Measure the text dimensions
    const textMetrics = context.measureText(text);
    const textWidth = Math.max(textMetrics.width, 100);
    console.log(textMetrics.width);
  
    canvas.width = textWidth;
    canvas.height = textWidth/2;
  
    context.font = `${fontSize}px ${fontFamily}`;
    context.textBaseline = 'middle';
    context.textAlign = 'center';
  
    // Set color and draw the text
    context.fillStyle = 'white';
    context.fillText(text, canvas.width / 2, canvas.height / 2);
  
    // Create a texture from the canvas
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
  
    return texture;
  }


for (let i = 0; i < 200; i++) {
    const distFactor = 80
    // Create material for the text
    //const textMaterial = new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(generateTextCanvas('Hello, World!a aaaaa', 40)) });

    // Create a sprite to hold the text material


    const text = 'Hello';
    const size = text.length;
    const textSize = Math.max(size, 15);

    const textTexture = generateTextTexture(text, textSize);

    const textMaterial = new THREE.SpriteMaterial({ map: textTexture });
    const textSprite = new THREE.Sprite(textMaterial);

    const aspectRatio = textTexture.image.width / textTexture.image.height;
    const textHeight = textSize;

    textSprite.scale.set(textSize, textSize/2, 1);



    // Randomly position the text sprites in space
    textSprite.position.x = (Math.random() * 2 - 1) * distFactor;
    textSprite.position.y = (Math.random() * 2 - 1) * distFactor;
    textSprite.position.z = (Math.random() * 2 - 1) * distFactor;

    // Set color based on y-axis coordinate
    const y = textSprite.position.y;
    const z = textSprite.position.z;
    let color;

    if (y > 0) {
        const intensity = y >= 1 ? y / distFactor : 1 / distFactor; // Adjust the value to control color intensity
        textSprite.material.color.setRGB(1 - intensity, 1, 0); // Transition from yellow to light green
    } else if (y < 0) {
        const intensity = y <= -1 ? Math.abs(y / distFactor) : 1 / distFactor; // Adjust the value to control color intensity
        textSprite.material.color.setRGB(1, 1 - intensity, 0);// Red gradient
    } else {
        textSprite.material.color.setRGB(1, 1, 0); // Yellow color at y = 0
    }

    if (z < 0) {
        const op = z <= 1 ? 0.7 - (Math.abs(z / distFactor) /2) : 0.7; 
        textSprite.material.opacity = op
    }
    else if (z > 0) {
        const op = z >= 1 ? (Math.abs(z / distFactor) /2) + 0.7 : 0.7; 
        textSprite.material.opacity = z / distFactor + 0.5;
    } else {
        textSprite.material.opacity =  0.7;
    }

    scene.add(textSprite);
}


// Create spheres
// const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);

// for (let i = 0; i < 200; i++) {
//     const sphere = new THREE.Mesh(sphereGeometry);

//     // Randomly position the spheres in space
//     sphere.position.x = (Math.random() * 2 - 1) * 20 ;
//     sphere.position.y = (Math.random() * 2 - 1) * 20 ;
//     sphere.position.z = (Math.random() * 2 - 1) * 20 ;

//     // Set color based on y-axis coordinate
//     const y = sphere.position.y;
//     let color;

//     if (y > 0) {
//         const intensity = y >= 1 ? y/20 : 1/20; // Adjust the value to control color intensity
//         color = new THREE.Color(1 - intensity, 1, 0); // Transition from yellow to light green
//     } else if (y < 0) {
//         const intensity = y <= -1 ? Math.abs(y/20) : 1/20; // Adjust the value to control color intensity
//         color = new THREE.Color(1, 1-intensity, 0); // Red gradient
//     } else {
//         color = new THREE.Color(1, 1, 0); // Yellow color at y = 0
//     }

//     const sphereMaterial = new THREE.MeshPhongMaterial({
//         color,
//         shininess: 100,
//         //specular: new THREE.Color(1, 1, 1),
//     });

//     sphere.material = sphereMaterial;

//     scene.add(sphere);
// }




    
// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);


// Import the OrbitControls library
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// ...

// Create a camera

// Create an instance of OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Enable keyboard controls
controls.enableKeys = true;
// Handle keyboard events

function handleKeyboardEvents(event) {
    const step = 2; // Adjust the step size for camera movement
  
    switch (event.code) {
      case 'ArrowUp':
        camera.position.y += step;
        break;
      case 'ArrowDown':
        camera.position.y -= step;
        break;
      case 'ArrowLeft':
        camera.position.x -= step;
        break;
      case 'ArrowRight':
        camera.position.x += step;
        break;
    }
  }

window.addEventListener('keydown', handleKeyboardEvents);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Update the controls
  controls.update();

  renderer.render(scene, camera);
}





animate();