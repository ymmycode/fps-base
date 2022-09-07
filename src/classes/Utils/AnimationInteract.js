
import * as THREE from 'three'
import {gsap} from 'gsap'
import Experience from "../Experience";

export default class AnimationInteract
{
    constructor(_targetInteract)
    {
        this.experience = new Experience()
        this.camera = this.experience.camera.instance

        this.targetInteract = _targetInteract

        this.tl = gsap.timeline()

        if(this.targetInteract)
        {
            this.startAnimation()
        }
    }

    startAnimation()
    {
        console.log(this.targetInteract)

        // dolly animation to plane
        
        // this.camera.lookAt(this.targetInteract.position)

        this.targetVector = new THREE.Vector3(
            this.targetInteract.position.x, 
            this.targetInteract.position.y, 
            this.targetInteract.position.z
        )
        console.log(this.targetVector)

        gsap.to( this.camera.position, {
            x: this.targetVector.x,
            y: this.targetVector.y,
            z: this.targetVector.zw,
            // this.targetVector.nUpdate: () => {
            //     this.camera.lookAt(this.targetInteract)
            // }
        })

        this.camera.lookAt(this.targetVector)

        // check value if within array
    }
}