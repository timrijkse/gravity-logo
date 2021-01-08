import * as THREE from 'three'

export function addLights(webGLApp) {
  // Soft shadows
  // webGLApp.renderer.shadowMap.type = THREE.PCFSoftShadowMap

  // eslint-disable-next-line unicorn/number-literal-case
  const hlLight = new THREE.AmbientLight(0x040404, 100)
  webGLApp.scene.add(hlLight)

  // eslint-disable-next-line unicorn/number-literal-case
  const directionalLight = new THREE.DirectionalLight(0x040404, 0.5)
  directionalLight.position.set(0, 1, -500)
  directionalLight.castShadow = true
  webGLApp.scene.add(directionalLight)

  // eslint-disable-next-line unicorn/number-literal-case
  const light = new THREE.PointLight(0x303030, 15)
  light.position.set(190, 300, -1000)
  webGLApp.scene.add(light)

  // eslint-disable-next-line unicorn/number-literal-case
  const light2 = new THREE.PointLight(0x303030, 15)
  light2.position.set(100, 300, -1000)
  webGLApp.scene.add(light2)

  // eslint-disable-next-line unicorn/number-literal-case
  const light3 = new THREE.PointLight(0x303030, 500)
  light3.position.set(0, 300, 100)
  webGLApp.scene.add(light3)

  // eslint-disable-next-line unicorn/number-literal-case
  const light4 = new THREE.PointLight(0x303030, 20)
  light4.position.set(0, 1500, 500)
  webGLApp.scene.add(light4)

  // eslint-disable-next-line unicorn/number-literal-case
  const light5 = new THREE.HemisphereLight(0x303030, 0x303030, 0)
  light5.castShadow = true
  webGLApp.scene.add(light5)

  const ambientLight = new THREE.AmbientLight(0x303030, 0.9);
  webGLApp.scene.add(ambientLight)

  console.log('addLights', webGLApp)
}