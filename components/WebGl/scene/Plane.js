import * as THREE from 'three'

export default class Plane extends THREE.Group {
  constructor({ ...options }) {
    super(options)

    this.geometry = new THREE.PlaneGeometry(2000, 700, 100)

    this.material = new THREE.MeshBasicMaterial({
      color: 0x050505,
      side: THREE.DoubleSide,
    })

    this.plane = new THREE.Mesh(this.geometry, this.material)
    this.plane.receiveShadow = true

    this.add(this.plane)
  }
}