import * as THREE from 'three'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'

export const addPostProcessing = () => {
  return {
    passes: [
      createFXAA(),
      createBloom(),
      createCopyShader()
    ]
  }
}

export const createFXAA = () => {
  const effectFXAA = new ShaderPass(FXAAShader);
  effectFXAA.uniforms.resolution.value.set(
    1 / window.innerWidth * window.devicePixelRatio,
    1 / window.innerHeight * window.devicePixelRatio
  );
  effectFXAA.renderToScreen = true

  return effectFXAA
}

export const createCopyShader = () => {
  const copyShader = new ShaderPass(CopyShader);
  copyShader.renderToScreen = true;

  return copyShader
}

export const createBloom = () => {
  const bloom = {
    bloomStrength: 2.5,
    bloomThreshold: 0.1,
    bloomRadius: 0.1
  };

  const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), bloom.bloomStrength, bloom.bloomRadius, bloom.bloomThreshold);
  /* bloomPass.renderToScreen = true; */
  bloomPass.threshold = bloom.bloomThreshold;
  bloomPass.strength = bloom.bloomStrength;
  bloomPass.radius = bloom.bloomRadius;

  return bloomPass
}