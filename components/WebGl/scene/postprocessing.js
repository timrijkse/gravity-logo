import * as THREE from 'three'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader.js';

export const addPostProcessing = () => {
  return {
    passes: [
      createFXAA(),
      createFilm(),
      createBloom(),
      createCopyShader(),
      createVignette(),
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
    bloomStrength: 0.5,
    bloomThreshold: 0.01,
    bloomRadius: 0.01
  };

  const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), bloom.bloomStrength, bloom.bloomRadius, bloom.bloomThreshold);
  /* bloomPass.renderToScreen = true; */
  bloomPass.threshold = bloom.bloomThreshold;
  bloomPass.strength = bloom.bloomStrength;
  bloomPass.radius = bloom.bloomRadius;

  return bloomPass
}

export const createVignette = () => {
  const effectVignette = new ShaderPass(VignetteShader);
  effectVignette.uniforms.offset.value = 0.125;
  effectVignette.uniforms.darkness.value = 30;
  return effectVignette
}

export const createFilm = () => {
  const effectFilm = new FilmPass(12, 0, 256, false)
  effectFilm.renderToScreen = true

  return effectFilm
}