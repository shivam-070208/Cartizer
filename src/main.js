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
const getscrolloptions = (id=new String())=>{
  return( {
    trigger: id,
    start: 'top top',
    end: 'bottom 100vh',
    scroller: '.main',
    scrub: 1,
  })
}
const setShader =()=>{
let uTexture;
['Rideau','Rideau001','Rideau002','Rideau003' ,'Rideau004','Rideau005','Interaction_Raycaster'].map((value)=>{
   uTexture =uTexture?? Canvas.child[value].material.map;
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
  value:Math.PI,
  duration:10,
  repeat:-1,
  ease:'linear'

})
// rang01A
}
const setStarAnimation = () => {
   
  gsap.to(Canvas.Object.particles.position, {
    
    z:1,
    duration: 4.0,
    repeat: -1,
   
   
    
  });
};
const setRoom1Animation = ()=>{
const room1Timeline = gsap.timeline({
  scrollTrigger:getscrolloptions('.room1')
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
room1Timeline.from(Canvas.child['CTRL_ROOM_01_Tunnel'].rotation, {
  z:0.23
}, 0.54);



}
const setRoom2Animation = ()=>{
  const room2timeline = gsap.timeline({scrollTrigger:getscrolloptions('.room2')});

  room2timeline.to(Canvas.child['Interaction_Raycaster'].position,{
    y:50
  })
  room2timeline.to(Canvas.camera.position,{
    z:-35
  },0.4);
  console.log(Canvas.child)
}
const setArchAnimation = (timeline = gsap.timeline())=>{
  Array(5).fill('').map((_,i)=>{
    console.log(Canvas.child[`Arche_${i+1}`],10)
    timeline.to(Canvas.child[`Arche_${i+1}`].rotation,{
      y:Math.PI
    },0.13*i)
  })
}
const setRoom3Animation = ()=>{
  const room3timeline = gsap.timeline({
    scrollTrigger:getscrolloptions('.room3')
  })
    room3timeline.to(Canvas.child['rang03B'].position,{
    y:3
  },0)
  room3timeline.to(Canvas.camera.position,{
    z:-73
  },0.12);
  setArchAnimation(room3timeline)

}

const setAnimation = () => {
  
  
  setShader();
  setStarAnimation();
  setRoom1Animation();
  setRoom2Animation();
  setRoom3Animation();

}



Canvas.setAmbientLight();
Canvas.createParticles(900);
Canvas.loadModel("scenes.glb",'scene',setAnimation);
// Canvas.orbitcontrols()
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
