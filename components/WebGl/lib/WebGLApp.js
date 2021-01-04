import * as THREE from 'three'

export default class WebGLApp {
  constructor({
    background = '#FF0000',
    ...options
  } = {}) {
    this.renderer = new THREE.WebGLRenderer({
      antialiasing: true,
      ...options
    })

    console.log('hallo')
  }
}