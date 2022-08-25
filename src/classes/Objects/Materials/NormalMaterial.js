import * as THREE from 'three'
import Experience from '../../Experience'

export default class NormalMaterial 
{
  constructor()
  {
    this.material = new THREE.MeshNormalMaterial()
    this.material.side = THREE.DoubleSide
  }
}