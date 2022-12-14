import * as THREE from 'three'
import GUI from 'three/examples/jsm/libs/lil-gui.module.min'

import Time from './Utils/Time.js'
import Sizes from './Utils/Sizes.js'
import Stats from './Utils/Stats.js'
import Raycast from './Utils/Raycast.js'
import AnimationInteract from './Utils/AnimationInteract.js'

import Resources from './Resources.js'
import Renderer from './Renderer.js'
import Camera from './Camera.js'
import World from './World.js'

import assets from './assets.js'

export default class Experience
{
    static instance

    constructor(_options = {})
    {
        if(Experience.instance)
        {
            return Experience.instance
        }
        Experience.instance = this

        // Options
        this.targetElement = _options.targetElement
        this.movementStickEl = _options.movementStick
        this.cameraStickEl = _options.cameraStick
        this.mobileBrowser = _options.mobileBrowser
        this.progressTextValue = _options.progressTextValue
        this.triggerModal = _options.triggerModal
        this.artDescription = _options.artDescription
        this.launchInfo = _options.launchInfo

        this.progressLoadingBar = 0

        if(!this.targetElement)
        {
            console.warn('Missing \'targetElement\' property')
            return
        }

        this.time = new Time()
        this.fixedUpdateTiming = 20
        this.physicTImeSimulated = Date.now()
        this._deltaTime = 0
        this.lastUpdate = Date.now()

        this.sizes = new Sizes()
        this.setConfig()
        this.setDebug()
        this.setStats()
        this.setScene()
        this.setCamera()
        this.setRenderer()
        this.setResources()
        this.setWorld()
        this.setRaycaster()
        this.startAnimation()
        
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        this.update()
    }

    setConfig()
    {
        this.config = {}
    
        // Debug
        this.config.debug = window.location.hash === '#debug'

        // Pixel ratio
        this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

        // Width and height
        const boundings = this.targetElement.getBoundingClientRect()
        this.config.width = boundings.width
        this.config.height = boundings.height || window.innerHeight
    }

    setDebug()
    {
        if(this.config.debug)
        {
            this.debug = new GUI()
        }
    }

    setStats()
    {
        if(this.config.debug)
        {
            this.stats = new Stats(true)
        }
    }
    
    setScene()
    {
        this.scene = new THREE.Scene()
    }

    setCamera()
    {
        this.camera = new Camera()
        // this.camera.modes.debug.orbitControls.enabled = false
    }

    setRenderer()
    {
        this.renderer = new Renderer({ rendererInstance: this.rendererInstance })

        this.targetElement.appendChild(this.renderer.instance.domElement)
    }

    setResources()
    {
        this.resources = new Resources(assets)
    }

    setWorld()
    {
        this.world = new World()
    }

    setRaycaster()
    {
        this.raycast = new Raycast()
    }

    progressBar(progress)
    {
        this.progressLoadingBar = progress
        this.progressTextValue.value = this.progressLoadingBar
    }

    startAnimation()
    {
        this.animationInteract = new AnimationInteract(this.raycast.interactObject)
    }

    stopAnimation()
    {
        this.animationInteract.tl.pause()
    }

    lastPos(){
        if(this.world) this.world.terrain.lastPosition(this.animationInteract.targetVector)
    }

    update()
    {

        while(this.physicTImeSimulated < Date.now()){
            // run method in fixed timing
            // make fixedUpdate method for differentiation

            if(this.world)
                this.world.fixedUpdate()

            this.physicTImeSimulated += this.fixedUpdateTiming
        }

        if(this.stats)
            this.stats.update()
        
        this.camera.update()

        if(this.world)
            this.world.update()
        
        if(this.renderer)
            this.renderer.update()

        if(this.raycast)
            this.raycast.update()


        this._deltaTime = Date.now() - this.lastUpdate
        this.lastUpdate = Date.now()

        window.requestAnimationFrame(() =>
        {
            this.update()
        })
    }

    resize()
    {
        // Config
        const boundings = this.targetElement.getBoundingClientRect()
        this.config.width = boundings.width
        this.config.height = boundings.height

        this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

        if(this.camera)
            this.camera.resize()

        if(this.renderer)
            this.renderer.resize()

        if(this.world)
            this.world.resize()
    }

    destroy()
    {
        
    }
}