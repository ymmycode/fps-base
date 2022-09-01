import * as THREE from 'three'
import Experience from '../Experience'

export default class Raycast 
{
    constructor()
    {
        this.experience = new Experience()   
        this.camera = this.experience.camera.instance
        this.scene = this.experience.scene

        this.raycaster = new THREE.Raycaster()
        this.pointer = new THREE.Vector2()   
        
        this.raycasterSetup()
    }

    raycasterSetup()
    {
        // this.raycaster.far = 
        // this.raycaster.near =
    }

    onPointerMove(evt)
    {
        this.pointer.x = (evt.clientX / window.innerWidth) * 2 - 1
        this.pointer.y = - (evt.clientY / window.innerHeight) * 2 + 1
    }

    update()
    {
        this.raycaster.setFromCamera(this.pointer, this.camera)

        const intersects = this.raycaster.intersectObjects(this.scene.children)

        // console.log(intersects)
    }
}
