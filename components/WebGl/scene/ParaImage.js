import * as THREE from 'three'
import vertexShader from "../glsl/vertex.glsl";
import fragmentShader from "../glsl/fragment.glsl";
import img from "~/assets/test.jpg";

export default class ParaImage extends THREE.Group {
  constructor({ webGLApp, ...options }) {
    super(options)

    this.position.y = -window.innerHeight

    this.webGLApp = webGLApp
    this.delta = 0

    // eslint-disable-next-line unicorn/number-literal-case
    this.webGLApp.renderer.setClearColor(0xffffff, 1);

    this.geometry = new THREE.PlaneGeometry(303, 403, 30, 13);

    console.log(fragmentShader)

    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0.0 },
        uTexture: { value: new THREE.TextureLoader().load(img) }
      },
      // wireframe: true,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.x = 0
    this.mesh.position.y = 0
    this.mesh.rotation.x = 0

    this.add(this.mesh);
  }

  render = () => {
    this.delta += 0.1;

    // Update uniform from Mesh itself
    // this.mesh.material.uniforms.uTime.value = this.delta;
    this.material.uniforms.uTime.value = this.webGLApp.clock.getDelta();
  }
}