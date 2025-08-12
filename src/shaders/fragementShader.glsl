uniform sampler2D uTexture;
varying vec2 vUv;

void main() {
  vec4 textColor = texture2D(uTexture, vUv);

  // Decent color: #F2D7BB (RGB: 242, 215, 187)
  gl_FragColor = mix(textColor,vec4(242.0 / 255.0, 215.0 / 255.0, 187.0 / 255.0, 1.0),0.94);
}