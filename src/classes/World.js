import * as THREE from 'three'
import Experience from './Experience.js'
import PlayerWithTerrain from './Objects/PlayerWithTerrain.js'
import GalleryHall from './Objects/GalleryHall.js'
import Environment from './Environment.js'

export default class World
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        
        this.resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {


                // environment setup
                this.galleryHall = new GalleryHall()

                // Set Player
                this.terrain = new PlayerWithTerrain()


                this.environmentLight = new Environment()

            }
        })
    }

    debugObjects()
    {
        if(this.debug)
        {
            // this.debugFolder = this.debug.addFolder('Cube')

            // this.debugFolder
            // .addColor(this.cube.material, 'color' )
        }
    }

    resize()
    {
    }

    update()
    {
        // if(this.cube)
        // {
        //     this.cube.rotation.x += this.time.delta * 0.001
        //     this.cube.rotation.y += this.time.delta * 0.0025
        // }

        if(this.terrain) this.terrain.update()
    }

    destroy()
    {
    }
}