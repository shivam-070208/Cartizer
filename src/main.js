import * as THREE from "three";
import fragmentShader from './shaders/fragementShader.glsl';
import vertexShader from './shaders/vertexshader.glsl'
import gsap from "gsap";
import { Canvas } from "./utils/init";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
let uTime = {
  value:0
}
const setShader =()=>{

['Rideau','Rideau001','Rideau002','Rideau003' ,'Rideau004','Rideau005'].map((value)=>{
  const uTexture = Canvas.child[value].material.map;
 Canvas.child[value].material = new THREE.ShaderMaterial({
  
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime,
    uTexture: { value: uTexture }
  }
});
})
gsap.to(uTime,{
  value:2*Math.PI,
  duration:10,
  repeat:-1
})
}
const setStarAnimation = () => {
   console.log(Canvas.Object.particles)
  gsap.to(Canvas.Object.particles.position, {
    
    z:1,
    duration: 4.0,
    repeat: -1,
   
   
    
  });
};


const setAnimation = () => {
  
  
  setShader();
  setStarAnimation()
const room1Timeline = gsap.timeline({
  scrollTrigger: {
    trigger: '.room1',
    start: 'top top',
    end: 'bottom 100vh',
    scroller: '.main',
    scrub: 2,
  }
});
room1Timeline.to(Canvas.Object.Text.material, {
  opacity: 0.0,
}, 0);
['Rideau002','Rideau003'].map((value,idx)=>{

  room1Timeline.to(Canvas.child[value].position, {
    x:(idx*2-1)*5
    
  }, 0.12);
}
)
room1Timeline.to(Canvas.camera.position, {
  z: 9,
  
}, 0.32);


}



Canvas.setAmbientLight();
Canvas.createParticles(900);
Canvas.loadModel("scenes.glb",'scene',setAnimation);

const font = new FontFace(
  "Playfair Display",
  'url(/font.ttf)'
);

font.load().then((loadedFont) => {
  document.fonts.add(loadedFont);

  const sprite = Canvas.create2DTextSprite("WATCHES &\nWONDERS");
  Canvas.scene.add(sprite);
  Canvas.Object.Text = sprite;
});

window.addEventListener("mousemove", (e) => {
  let parralax = {
    y: (e.clientX / window.innerWidth) * 2 - 1,
    x: (e.clientY / window.innerHeight) * 2 - 1,
  };
  gsap.to(Canvas.camera.rotation, {
    x: -parralax.x * 0.04,
    y: -parralax.y * 0.04,
  });

 Object.entries(Canvas.Object).forEach(([key, value], i) => {

  gsap.to(value.rotation, {
    x: -parralax.x * 0.01 + i * 0.00002,
    y: -parralax.y * 0.01 + i * 0.00002,
  });
});
 
});




window.addEventListener("resize", Canvas.resize.bind(Canvas));
