
import * as THREE from 'three'
import {gsap} from 'gsap'
import Experience from "../Experience";

export default class AnimationInteract
{
    constructor(_targetInteract)
    {
        this.experience = new Experience()
        this.camera = this.experience.camera.instance
        this.time = this.experience.time

        this.targetInteract = _targetInteract

        this.tl = gsap.timeline({
            defaults: {
                duration: 2,
                ease: "power4.out"
            }
        })

        if(this.targetInteract)
        {
            this.startAnimation()
        }
    }

    startAnimation()
    {
        // console.log(this.targetInteract.name)
        // if(this.experience.world) this.experience.world.terrain.lastPosition()

        const leftArr = ["A_Kanvas_01001", "A_Kanvas_01", "A_Kanvas_02", "A_Kanvas_03", "B_Kanvas_08", "B_Kanvas_09", "B_Kanvas_10", "B_Kanvas_11", "B_Kanvas_12", "B_Kanvas_19"] 
        const rightArr = ["A_Kanvas_04", "A_Kanvas_05", "A_Kanvas_06", "A_Kanvas_07", "B_Kanvas_20", "B_Kanvas_16", "B_Kanvas_17", "B_Kanvas_18"]
        const midArr = ["B_Kanvas_15", "B_Kanvas_14", "B_Kanvas_13"]

        // dolly animation to plane

        this.targetVector = new THREE.Vector3(
            this.targetInteract.position.x, 
            this.targetInteract.position.y, 
            this.targetInteract.position.z
        )

        if(leftArr.includes(this.targetInteract.name)){  // x + 3
            this.targetVector.x += 2.5

            this.tl.to( this.camera.position, {
                x: this.targetVector.x,
                y: this.targetVector.y,
                z: this.targetVector.z,
                onUpdate: () => {
                    this.camera.lookAt(this.targetInteract.position)
                },
                // onComplete: () => {
                //     console.log(`complete`)
                // }
            })
        }
        else if(rightArr.includes(this.targetInteract.name)){  // x - 3
            this.targetVector.x -= 2.5

            this.tl.to( this.camera.position, {
                x: this.targetVector.x,
                y: this.targetVector.y,
                z: this.targetVector.z,
                onUpdate: () => {
                    this.camera.lookAt(this.targetInteract.position)
                },
                // onComplete: () => {
                //     console.log(`complete`)
                // }
            })
        }
        else if(midArr.includes(this.targetInteract.name)){  // z - 3
            this.targetVector.z -= 2.5
            
            this.tl.to( this.camera.position, {
                x: this.targetVector.x,
                y: this.targetVector.y,
                z: this.targetVector.z,
                onUpdate: () => {
                    this.camera.lookAt(this.targetInteract.position)
                },
                // onComplete: () => {
                //     console.log(`complete`)
                // }
            })
        }
        
        // console.log(this.targetVector)

        

        // this.camera.lookAt(this.targetVector)

        // check value if within array
    }
}