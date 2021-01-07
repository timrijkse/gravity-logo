import * as THREE from 'three'
import vertexShader from "../glsl/vertex.glsl";
import fragmentShader from "../glsl/fragment.glsl";
import img from "~/assets/test.jpg";

export default class ParaImage extends THREE.Group {
  constructor({ webGLApp, ...options }) {
    super(options)

    this.position.y = -window.innerHeight

    this.webGLApp = webGLApp
    this.clock = new THREE.Clock();

    this.geometry = new THREE.PlaneGeometry(303, 403, 30, 13);
    this.geometry.verticesNeedUpdate = true;

    this.uniforms = {
      uTime: { type: 'number', value: 0.0 },
      uTexture: { value: new THREE.TextureLoader().load(img) }
    }

    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: this.uniforms,
      wireframe: false,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.x = 0
    this.mesh.position.y = 0
    this.mesh.rotation.y = 0

    this.add(this.mesh);
  }

  render = () => {
    // Update uniform from Mesh itself
    // this.mesh.material.uniforms.uTime.value = this.delta;
    this.uniforms.uTime.value = this.clock.getElapsedTime();
  }
}