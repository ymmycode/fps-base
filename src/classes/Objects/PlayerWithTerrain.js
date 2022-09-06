import * as THREE from 'three'
import nipplejs from 'nipplejs'

import Experience from '../Experience'
import { NormalMaterial } from './Materials'

import { Octree } from 'three/examples/jsm/math/Octree'
import { OctreeHelper } from 'three/examples/jsm/helpers/OctreeHelper'
import { Capsule } from 'three/examples/jsm/math/capsule.js'

export default class PlayerWithTerrain 
{
  constructor()
  {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resource = this.experience.resources
    this.time = this.experience.time
    this.debug = this.experience.debug
    this.instance = this.experience.camera.instance
    this.mobileBrowser = this.experience.mobileBrowser
    this.raycast = this.experience.raycast

    this.worldOctree = new Octree()

    this.playerCollider = new Capsule(new THREE.Vector3(0, .35, 0), new THREE.Vector3(0,1.2,0), .35)
    this.playerVelocity = new THREE.Vector3()
    this.playerDirection = new THREE.Vector3()
    this.playerOnFloor = false
    this.keyStates = {}

    this.forwardValue = 0
    this.backwardValue = 0
    this.rightValue = 0
    this.leftValue = 0
    this.prevTouch = {}
    this.maxRotY = -Math.PI / 2
    this.minRotY = Math.PI / 2
    this.rotY = 0
    this.movementStickManager = null
    this.cameraStickManager = null

    this.mouseMoveX = this.mouseMoveY = 0

    this.groundScene = this.resource.items.ground

    this.normalMaterial = new NormalMaterial()

    // Debug
    if(this.debug)
    {
        this.debugFolder = this.debug.addFolder('Player')
    }

    this.setProperties()
    // this.setModel()
    this.setOctree()
    // this.setOctreeHelper()
    this.PlayerSetup()
    this.setDebug()
  }

  setProperties()
  {
    this.debugProp = {}
    this.debugProp.moveSens = 0.057
    this.debugProp.mouseSens = 0.5
    this.debugProp.touchCameraSens = 1.5
  }

  setModel()
  {
    this.groundModel = this.groundScene.scene.children.find(child => child.name === `Ground`)
    this.groundModel.material = this.normalMaterial.material

    this.scene.add(this.groundScene.scene)
  }

  setOctree()
  {
    this.worldOctree.fromGraphNode(this.groundScene.scene)
  }

  setOctreeHelper()
  {
    this.helper = new OctreeHelper(this.worldOctree)
    this.helper.visible = true
    this.scene.add(this.helper)
  }

  PlayerSetup()
  {
    if(this.mobileBrowser)
    {
      this.mobileMovement()
    }
    else
    {
      this.keyboardMovement()
    }
  }

  keyboardMovement() {
    document.addEventListener(`keydown`, (evt) => {
      this.keyStates[evt.code] = true
    })

    document.addEventListener(`keyup`, (evt) => {
      this.keyStates[evt.code] = false
    })
  
    // this.experience.targetElement.addEventListener(`pointerdown`, () => {
    //   document.body.requestPointerLock()
    // })

    // document.body.addEventListener(`pointermove`, (evt) => {
    //   if (document.pointerLockElement === document.body) {

    //     this.instance.rotation.y -= evt.movementX / 500 * this.debugProp.mouseSens
    //     this.instance.rotation.x -= evt.movementY / 500 * this.debugProp.mouseSens
    //   }
    // })

    this.experience.targetElement.addEventListener(`mousedown`, () => {
      document.body.requestPointerLock()
    })

    document.body.addEventListener(`mousemove`, (evt) => {
      if (document.pointerLockElement === document.body) {

        this.rotY -= evt.movementY / 500 * this.debugProp.mouseSens
        this.rotY = this.clampMovement(this.rotY, this.maxRotY, this.minRotY)

        this.instance.rotation.y -= evt.movementX / 500 * this.debugProp.mouseSens
        this.instance.rotation.x = this.rotY

        // this.raycast.onPointerMove(evt)

      }
    })
  }

  mobileMovement() 
  {
    const options = {
      zone: this.experience.movementStickEl,
      size: 80,
      multitouch: true,
      maxNumberOfNipples: 2,
      mode: 'static',
      restJoystick: true,
      shape: 'circle',
      position: { top: '60px', left: '60px' },
      dynamicPage: true,
    }

    // const options1 = {
    //   zone: this.experience.cameraStickEl,
    //   size: 80,
    //   multitouch: true,
    //   maxNumberOfNipples: 2,
    //   mode: 'static',
    //   restJoystick: true,
    //   shape: 'circle',
    //   position: { top: '60px', left: '60px' },
    //   dynamicPage: true,
    // }

    this.movementStickManager = nipplejs.create(options)
    // this.cameraStickManager = nipplejs.create(options1)

    this.movementStickManager['0'].on('move', (evt, data) => {
      const forward = data.vector.y
      const turn = data.vector.x

      if (forward > 0) {
        this.backwardVelocity(forward)
      } else if (forward < 0) {
        this.forwardVelocity(forward)
      }

      if (turn > 0) {
        this.leftVelocity(turn)
      } else if (turn < 0) {
        this.rightVelocity(turn)
      }

    })

    this.movementStickManager['0'].on('end', (evt) => {
      this.forwardValue = this.backwardValue = this.rightValue = this.leftValue = 0
    })

    // this.cameraStickManager['0'].on('move', (evt, data) => {
    //   // console.log(data)

    //   this.mouseMoveX = data.vector.x / 100 *  this.debugProp.touchCameraSens
    //   this.mouseMoveY = -data.vector.y / 100 * this.debugProp.touchCameraSens

    // })

    // this.cameraStickManager['0'].on('end', (evt) => {
    //   this.mouseMoveX = this.mouseMoveY = 0 
    // })

    // document.body.addEventListener(`touchstart`, (evt) => {
    //   evt.preventDefault()
    //   // evt.stopPropagation()
    // }, {passive: false})

    this.experience.targetElement.addEventListener(`touchstart`, (e) => {e.preventDefault()})

    this.experience.targetElement.addEventListener(`touchmove`, (evt) => {

        // console.log(evt.touches[0].target.localName)

        evt.preventDefault()
        // evt.stopPropagation()

        let touch

        if(evt.touches.length <= 1) {
          if(evt.touches[0].target.localName === `canvas`){
            touch = evt.touches[0]
            // this.raycast.onPointerMove(touch)
          }
        }
        else if (evt.touches.length <= 2) {
          if(evt.touches[0].target.localName === `canvas`){
            touch = evt.touches[0]
            // this.raycast.onPointerMove(touch)
          }
          else if(evt.touches[1].target.localName === `canvas`){
            touch = evt.touches[1]
            // this.raycast.onPointerMove(touch)
          }
        }

        if(this.prevTouch.pageX && this.prevTouch.pageY)
        {
          evt.movementX = touch.pageX - this.prevTouch.pageX
          evt.movementY = touch.pageY - this.prevTouch.pageY

          this.rotY -= evt.movementY / 500 * this.debugProp.touchCameraSens
          this.rotY = this.clampMovement(this.rotY, this.maxRotY, this.minRotY)

          this.instance.rotation.y -= evt.movementX / 500 * this.debugProp.touchCameraSens
          this.instance.rotation.x = this.rotY
        }

        this.prevTouch = touch
    })

    this.experience.targetElement.addEventListener(`touchend`, (evt) => {
      this.prevTouch = {}
    })
  }

  rightVelocity(turn) {
    this.rightValue = Math.abs(turn)
    this.leftValue = 0
  }

  leftVelocity(turn) {
    this.leftValue = Math.abs(turn)
    this.rightValue = 0
  }

  backwardVelocity(forward) {
    this.forwardValue = 0
    this.backwardValue = Math.abs(forward)
  }

  forwardVelocity(forward) {
    this.forwardValue = Math.abs(forward)
    this.backwardValue = 0
  }

  PlayerCollisions()
  {
      this.result = this.worldOctree.capsuleIntersect(this.playerCollider)

      this.playerOnFloor = false

      if(this.result){
          this.playerOnFloor = this.result.normal.y > 0

          if(!this.playerOnFloor) {
              this.playerVelocity.addScaledVector(this.result.normal, - this.result.normal.dot(this.playerVelocity))
          }

          this.playerCollider.translate(this.result.normal.multiplyScalar(this.result.depth))
      }
  }

  updatePlayer(deltaTime)
  {
      this.damping = Math.exp( -2.5 * deltaTime) - 1
      
      if (!this.playerOnFloor) {
          this.playerVelocity.y -= 30 * deltaTime

          this.damping *= .1
      }

      this.playerVelocity.addScaledVector(this.playerVelocity, this.damping)

      this.deltaPosition = this.playerVelocity.clone().multiplyScalar(deltaTime)
      this.playerCollider.translate(this.deltaPosition)

      this.PlayerCollisions()

      this.instance.position.copy(this.playerCollider.end)
  }

  getForwardVector()
  {
      this.instance.getWorldDirection(this.playerDirection)
      this.playerDirection.y = 0
      this.playerDirection.normalize()
      
      return this.playerDirection
  }

  getSideVector()
  {
      this.instance.getWorldDirection(this.playerDirection)
      this.playerDirection.y = 0
      this.playerDirection.normalize()
      this.playerDirection.cross(this.instance.up)

      return this.playerDirection
  }

  controlSetup(deltaTime)
  {
      // gives a bit of air control
      // this.damping = Math.exp( -4 * deltaTime) - 1
      this.speedDelta = deltaTime * ( this.playerOnFloor ? 25 : 8 ) * this.debugProp.moveSens;

      if(!this.experience.launchInfo.value) {

        if ( this.keyStates[ 'KeyW' ] ) {
          this.playerVelocity.add( this.getForwardVector().multiplyScalar( this.speedDelta ) );
        }

        if ( this.keyStates[ 'KeyS' ] ) {
          this.playerVelocity.add( this.getForwardVector().multiplyScalar( - this.speedDelta ) );
        }

        if ( this.keyStates[ 'KeyA' ] ) {
          this.playerVelocity.add( this.getSideVector().multiplyScalar( - this.speedDelta ) );
        }

        if ( this.keyStates[ 'KeyD' ] ) {
          this.playerVelocity.add( this.getSideVector().multiplyScalar( this.speedDelta ) );
        }
      }
      
      // if ( this.playerOnFloor ) {
      //   if ( this.keyStates[ 'Space' ] ) {
      //     this.playerVelocity.y = 15;
      //   }
      // }

      if(this.forwardValue > 0)
      {
        this.playerVelocity.add( this.getForwardVector().multiplyScalar( this.speedDelta * -this.forwardValue) )
      }

      if(this.backwardValue > 0)
      {
        this.playerVelocity.add( this.getForwardVector().multiplyScalar(  this.speedDelta * this.backwardValue) )
      }

      if(this.leftValue > 0)
      {
        this.playerVelocity.add( this.getSideVector().multiplyScalar( this.speedDelta * this.leftValue) )
      }

      if(this.rightValue > 0)
      {
        this.playerVelocity.add( this.getSideVector().multiplyScalar( this.speedDelta * -this.rightValue) )
      }


  }

  teleportPlayerIfOob()
  {
      if(this.instance.position.y <= -25)
      {
          this.playerCollider.start.set( 0, 0.35, 0 );
          this.playerCollider.end.set( 0, 1, 0 );
          this.playerCollider.radius = 0.35;
          this.instance.position.copy( this.playerCollider.end );
          this.instance.rotation.set( 0, 0, 0 );
      }
  }

  clampMovement(val, min, max)
  {
    // console.log(val, min, max)
    return Math.min(Math.max(min, val), max)
  }

  setDebug()
  {
    if(this.debug)
    {
      this.debugFolder.add(this.debugProp, 'moveSens', 0, 5, 0.0001)
      this.debugFolder.add(this.debugProp, 'mouseSens', 0, 5, 0.0001)
      this.debugFolder.add(this.debugProp, 'touchCameraSens', 0, 5, 0.0001)
    }
  }

  update()
  {
    const deltaTime = Math.min( 0.05, this.time.delta ) / 5;

    // we look for collisions in substeps to mitigate the risk of
    // an object traversing another too quickly for detection.

    for ( let i = 0; i < 5; i ++ ) {

      this.controlSetup( deltaTime )

      this.updatePlayer( deltaTime )
      
      this.teleportPlayerIfOob()

    }

    // this.instance.rotation.y -= this.mouseMoveX
    // this.instance.rotation.x -= this.mouseMoveY

  }
}