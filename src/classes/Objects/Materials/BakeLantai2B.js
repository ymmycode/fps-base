import * as THREE from 'three'
import Experience from '../../Experience'

export default class BakeLantai2B
{
    constructor()
    {
        this.experience = new Experience()
        this.resource = this.experience.resources.items

        this.texture = this.resource.bakeLantai2B
        this.texture.encoding = THREE.sRGBEncoding
        this.texture.flipY = false

        this.material = new THREE.MeshBasicMaterial({
            map: this.texture
        })
    }
}