uniform float uTime;

varying vec2 vUv;

void main() {
  vUv = uv;

  vec3 newPosition = position;
   if (abs(vUv.y ) > 0.4) {
    newPosition.yz += sin((position.y + position.x) * 100.0 + sin(uTime) * 10.0)*0.2;
	
  }

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
