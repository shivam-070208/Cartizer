uniform sampler2D uTexture;
varying vec2 vUv;

void main() {
  vec4 texColor = texture2D(uTexture, vUv);
  vec3 shadeColor = vec3(0.831, 0.745, 0.658); // #d4bea8 in normalized RGB
  float tintAmount = 0.9; // 0 = no tint, 1 = full tint

  vec3 finalColor = mix(texColor.rgb, shadeColor, tintAmount);
  gl_FragColor = vec4(finalColor, texColor.a);
}