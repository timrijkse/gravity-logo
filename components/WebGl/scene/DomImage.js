import * as THREE from 'three'

export default class DomImage extends THREE.Group {
  constructor({ webGLApp, el, ...options }) {
    super(options)

    // this.position.y = -window.innerHeight

    this.webGLApp = webGLApp
    this.el = el
    this.clock = new THREE.Clock();

    this.geometry = new THREE.PlaneGeometry(303, 403, 30, 13);
    this.geometry.verticesNeedUpdate = true;

    this.material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide,
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.x = 0
    this.mesh.position.y = 0
    this.mesh.rotation.y = 0

    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()

    this.add(this.mesh);
  }

  render = () => {
    // Update uniform from Mesh itself
    // this.mesh.material.uniforms.uTime.value = this.delta;
    // this.uniforms.uTime.value = this.clock.getElapsedTime()
    // }

    // mousemove = (event) => {
    // const x = event.clientX
    // const y = event.clientY

    this.mouse.x = (this.el.getBoundingClientRect().left / window.innerWidth) * 2 - 1
    this.mouse.y = (this.el.getBoundingClientRect().top / window.innerHeight) * 2 + 1

    this.mesh.position.x = this.mouse.x
    this.mesh.position.y = this.mouse.y

    this.raycaster.setFromCamera(this.mouse, this.webGLApp.camera)
  }
}