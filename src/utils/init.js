import * as THREE from "three";
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";

class Init {
  constructor(app) {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      62,
      window.innerWidth / window.innerHeight,
      0.1,
      80
    );
    this.camera.position.z = 44;

    this.renderer = new THREE.WebGLRenderer({ antialias: true,alpha:true });
   
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.Object = {};
    app.appendChild(this.renderer.domElement);
    this.animate();
    this.child={}
    this.controls;
    this.light={};


    this.clock = new THREE.Clock(true)
    this.material = {
    };
  }

  animate() {

   
    if(this.controls) this.controls.update()
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
setAmbientLight() {
  // Ambient Light
this.light.AmbientLight = new THREE.AmbientLight('#F1E8DD', 4.0);

this.scene.add(
  this.light.AmbientLight
);

}


 loadModel(modelPath = "",key='',callback=new Function()) {
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
         gltf.scene.traverse((child) => {
            child.castShadow = true
          
                this.child[child.name] = child;
            
      });
        this.Object[key] = gltf.scene;
        
        this.scene.add(gltf.scene);
        if(callback) callback()
       
      },
      undefined,
      (error) => {
        console.error("An error happened while loading the model:", error);
      }
    )
  }
  orbitcontrols() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }
   createStarTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;

  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.6)');
  gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.2)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

createParticles(count = 500) {
  const particlesGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random()-0.5)*9.0 ; // X: small spread
    positions[i3 + 1] = (Math.random() - 0.5)*9.0 ; // Y: small spread
    positions[i3 + 2] = 41 + (Math.random() - 0.5)*10; // Z: around 44
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

 const particlesMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.09,
  map: this.createStarTexture(),
  transparent: true,
  opacity: 0.8,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});


  const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
  particleSystem.castShadow = true;
  this.scene.add(particleSystem);
  this.Object.particles = particleSystem;
}

  resize() {
    
    this.camera.aspect = window.innerWidth / window.innerHeight;
   
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  create2DTextSprite(message) {
  const canvas = document.createElement("canvas");
  const dpi = window.devicePixelRatio || 1;

  canvas.width = window.innerWidth * dpi;
  canvas.height = window.innerHeight * dpi;

  const context = canvas.getContext("2d");
  context.scale(dpi, dpi);

  context.font = "Bold 80px 'Playfair Display'";
  context.fillStyle = "white";
  context.textAlign = "center";
  context.textBaseline = "middle";

  const lines = message.split("\n");
  const lineHeight = 70;
  const baseY = canvas.height / (2 * dpi) - ((lines.length - 1) * lineHeight) / 2;

  lines.forEach((line, i) => {
    context.fillText(line, canvas.width / (2 * dpi), baseY + i * lineHeight);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true
  });

  const sprite = new THREE.Sprite(material);
  const scaleFactor = 1.8;
  sprite.scale.set(scaleFactor * (canvas.width / canvas.height), scaleFactor, 1);
  sprite.position.z = 43;

  return sprite;
}
}

export const Canvas = new Init(document.querySelector("#app"));
