import * as THREE from 'three'
import Experience from './Experience'

export default class Environment 
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resource = this.experience.resources

        // this.setEnvironmentMap()
    }

    setEnvironmentMap()
    {
        this.environmentMap = {}
        this.environmentMap.texture = this.resource.items.hdriENV
        this.environmentMap.texture.mapping = THREE.EquirectangularReflectionMapping
        // this.environmentMap.texture.encoding = THREE.sRGBEncoding

        this.scene.environment = this.environmentMap.texture
        // this.scene.background = this.environmentMap.texture

        this.updateMaterial()
    }

    updateMaterial()
    {
        this.scene.traverse((child) =>
        {
            if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
            {
                child.material.envMap = this.environmentMap.texture
                child.material.envMapIntensity = .3
                child.material.needsUpdate = true
            }
        })
    }
}