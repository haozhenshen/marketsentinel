import { Texture, SpriteMaterial, Sprite } from 'three';


function generateTextTexture(text, size) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const resolutionFactor = 3; // Increase canvas size for higher resolution
        const fontSize = size * resolutionFactor; // Increase font size for higher resolution
        const fontFamily = 'Arial';
      
        context.font = `${fontSize}px ${fontFamily}`;
      
        const textMetrics = context.measureText(text);
        const textWidth = Math.max(textMetrics.width, 100);
      
        const canvasWidth = textWidth * resolutionFactor;
        const canvasHeight = (fontSize * resolutionFactor); // Adjust canvas height based on font size
      
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
      
        context.font = `${fontSize}px ${fontFamily}`;
        context.textBaseline = 'middle';
        context.textAlign = 'center';
      
        context.fillStyle = 'white';
        context.fillText(text, canvasWidth / 2, canvasHeight / 2);
      
        const texture = new Texture(canvas);
        texture.needsUpdate = true;
      
        return texture;
      }

function createTextSprite(text, x, y, z) {
    const distFactor = 80
    // Create material for the text
    //const textMaterial = new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(generateTextCanvas('Hello, World!a aaaaa', 40)) });

    // Create a sprite to hold the text material

    const size = text.length;
    const textSize = Math.max(size, 15);

    const textTexture = generateTextTexture(text, textSize);

    const textMaterial = new SpriteMaterial({ map: textTexture });
    const textSprite = new Sprite(textMaterial);

    const aspectRatio = textTexture.image.width / textTexture.image.height;
    const textHeight = textSize;

    textSprite.scale.set(textSize, textSize/2, 1);


    // Randomly position the text sprites in space
    textSprite.position.x = x * distFactor;
    textSprite.position.y = y * distFactor;
    textSprite.position.z = z * distFactor;

    // Set color based on y-axis coordinate
    y = textSprite.position.y;
    z = textSprite.position.z;

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
    return textSprite;
}

export { createTextSprite };