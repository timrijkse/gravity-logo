export default class G {
  constructor({ webGLApp }) {
    this.gltf = null
    this.gltfLoader = webGLApp.gltfLoader

    this.load()
  }

  load = () => {
    this.gltfLoader.load('./logo-test4.glb', (gltf) => {
      this.gltf = gltf.scene
      this.gltf.scale.set(80, 80, 80)
    })
  }
}
