"use client"

import { createCamera } from './camera.jsx';
import { createScene } from './scene.jsx';
import { createRenderer } from './renderer.jsx';
import { createParticles } from './particles.jsx';
import { createPointLight } from './pointlight.jsx';
import { createAmbientLight } from './ambientlight.jsx';
import { createTextSprite } from './textsprite.jsx';
import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const Marketverse = () => {
  useEffect(() => {
    // Create a scene
    const scene = createScene()

    // Set up particle system
    const particleSystem = createParticles()

    scene.add(particleSystem);

    // Create a camera
    const camera = createCamera();
    
    // Create a renderer
    const renderer = createRenderer();
    
    (document.getElementById('three-container') as HTMLFormElement).appendChild(renderer.domElement);
    

    // Create text sprites
    for (let i = 0; i < 200; i++) {
        const x =  (Math.random() * 2 - 1)
        const y =  (Math.random() * 2 - 1)
        const z =  (Math.random() * 2 - 1)
        const textSprite = createTextSprite("Hello",  x,  y, z);

        scene.add(textSprite);
    }

    // Add lights
    const ambientLight = createAmbientLight();
    scene.add(ambientLight);

    const pointLight = createPointLight();
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create an instance of OrbitControls
   
    const controls = new OrbitControls(camera, renderer.domElement);

    // Enable keyboard controls
    (controls as any).enableKeys = true;

    // Handle keyboard events
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
      
    const movementSpeed = 0.6; // Adjust this value to control the movement speed

    // Key states for smoother movement
    const keyStates = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
    };

    // Handle keydown and keyup events
    window.addEventListener('keydown', (event) => {
      (keyStates as any)[event.code] = true;
    });

    window.addEventListener('keyup', (event) => {
      (keyStates as any)[event.code] = false;
    });

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      // Smoothly move the camera based on key states
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);

      if (keyStates.ArrowUp) {
        camera.position.addScaledVector(direction, movementSpeed);
      }

      if (keyStates.ArrowDown) {
        camera.position.addScaledVector(direction, -movementSpeed);
      }

      if (keyStates.ArrowLeft) {
        camera.position.add(camera.getWorldDirection(direction).cross(camera.up).multiplyScalar(-movementSpeed));
      }

      if (keyStates.ArrowRight) {
        camera.position.add(camera.getWorldDirection(direction).cross(camera.up).multiplyScalar(movementSpeed));
      }

      // Update the controls
      controls.update();

      // Render the scene
      renderer.render(scene, camera);
    }

    animate();

    // Clean up
    return () => {
      window.removeEventListener('keydown', () => {});
      scene.remove(particleSystem);
      scene.remove(...scene.children.filter((child) => child instanceof THREE.Sprite));
      renderer.dispose();
    };
  }, []);

  return <div id="three-container"/>;
};

export default Marketverse;