import * as THREE from 'three'

export function addLights(webGLApp) {
  // Soft shadows
  webGLApp.renderer.shadowMap.enabled = true;
  webGLApp.renderer.shadowMap.type = THREE.PCFSoftShadowMap

  const hlLight = new THREE.AmbientLight(0x040404, 100)
  webGLApp.scene.add(hlLight)

  const directionalLight = new THREE.DirectionalLight(0x040404, 0.5)
  webGLApp.scene.add(directionalLight)

  const light = new THREE.PointLight(0x303030, 15)
  light.position.set(190, 0, -1000)
  webGLApp.scene.add(light)

  const light2 = new THREE.PointLight(0x303030, 15)
  light2.position.set(100, 0, -1000)
  webGLApp.scene.add(light2)

  const light3 = new THREE.PointLight(0x303030, 500)
  light3.position.set(0, 0, 100)
  webGLApp.scene.add(light3)

  light.castShadow = true
  light.shadow.camera.near = 0.15 // default
  light.shadow.camera.far = 5003 // default

  light2.castShadow = true
  light2.shadow.camera.near = 0.15 // default
  light2.shadow.camera.far = 5003 // default

  light3.castShadow = true
  light3.shadow.camera.near = 0.15 // default
  light3.shadow.camera.far = 5003 // default

  // directionalLight.shadowCameraFar = 1000;
  // directionalLight.shadowDarkness = 1;

  const light4 = new THREE.PointLight(0x303030, 20)
  light4.position.set(0, 1500, 500)
  webGLApp.scene.add(light4)

  const light5 = new THREE.HemisphereLight(0x303030, 0x303030, 0)
  webGLApp.scene.add(light5)

  const ambientLight = new THREE.AmbientLight(0x303030, 0.9);
  webGLApp.scene.add(ambientLight)

  console.log('addLights', webGLApp)
}