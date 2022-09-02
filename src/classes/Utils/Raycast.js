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
        
    }

    raycasterSetup(target)
    {
        this.raycaster.far =  3.0

        this.objectForRaycast = target
    }

    onPointerMove(evt)
    {
        this.pointer.x = (evt.clientX / window.innerWidth) * 2 - 1
        this.pointer.y = - (evt.clientY / window.innerHeight) * 2 + 1
    }

    update()
    {
        this.raycaster.setFromCamera(this.pointer, this.camera)

        if(this.objectForRaycast) 
        {
            const intersects = this.raycaster.intersectObjects(this.objectForRaycast.children)
            if(intersects.length > 0) 
            {
                this.experience.triggerModal.value = true
                console.log(intersects[0].object.userData)
            }
            else
            {
                this.experience.triggerModal.value = false
            }
        }
    }
}
