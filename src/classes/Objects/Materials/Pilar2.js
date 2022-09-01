import * as THREE from 'three'
import Experience from '../../Experience'

export default class Pilar2
{
    constructor()
    {
        this.experience = new Experience()
        this.resource = this.experience.resources.items

        this.texture = this.resource.pilar2
        this.texture.encoding = THREE.sRGBEncoding
        this.texture.flipY = false

        this.material = new THREE.MeshBasicMaterial({
            map: this.texture
        })
    }
}