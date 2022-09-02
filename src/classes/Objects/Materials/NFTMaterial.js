import * as THREE from 'three'

export default class NFTMaterial
{
    constructor(_texture)
    {
        this.texture = _texture
        this.texture.flipY = false
        this.texture.encoding = THREE.sRGBEncoding

        this.material = new THREE.MeshBasicMaterial({
            map: this.texture
        })
    }
}