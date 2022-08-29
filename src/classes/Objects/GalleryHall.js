import * as THREE from 'three'
import Experience from '../Experience'

export default class GalleryHall
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resource = this.experience.resources.items

        this.setModel()
    }

    setModel()
    {
        this.galleryHallScene = this.resource.galleryHall

        this.scene.add(this.galleryHallScene.scene)
    }
}