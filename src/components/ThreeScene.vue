<template>
    <div>
        <div class="webgl" ref="webgl"></div>
        <div id="movement-stick" class="noSelect" ref="movementStick"></div>
        <div id="camera-stick" class="noSelect" ref="cameraStick"></div>
    </div> 
</template>

<script setup>

import { onMounted, ref } from 'vue';
import Experience from '../classes/Experience.js';
import isMobile from 'ismobilejs'

const webgl = ref(null)
const movementStick = ref(null)
const cameraStick = ref(null)

const mobileDetect = isMobile(window.navigator).any

onMounted(() => {
    initThree()
})

const initThree = () => {
    const webglCanvas = webgl.value
    const joystickMove = movementStick.value
    const joystickCamera = cameraStick.value
    const experience = new Experience({
        targetElement: webglCanvas,
        movementStick: joystickMove,
        cameraStick: joystickCamera,
        mobileBrowser: mobileDetect,
    })
}

</script>

<style lang="scss" scoped>
body{
        overscroll-behavior-x: none !important;
}

#webgl{
    overscroll-behavior-x: none !important;
    position: fixed;
    z-index: 51;
    touch-action: none;

    canvas{
        touch-action: none !important;
    }
}

#camera-stick, #movement-stick{
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    flex-direction: row;
}

#movement-stick{
    pointer-events: auto;
    position: fixed;
    bottom: 30px;
    left: 80px;
    background-color: transparent;
    width:  120px;
    height: 120px;
    z-index: 52;
    touch-action: manipulation;
}

#camera-stick{
    pointer-events: auto;
    position: fixed;
    background-color: transparent;
    width: 120px;
    height: 120px;
    z-index: 52;
    touch-action: manipulation;
    bottom: 30px;
    right: 80px;
}

@media (max-width: 640px){

    #movement-stick, #camera-stick{
        bottom: 40px;
    }
}

@media (max-width: 640px) and (orientation: portrait){

    #movement-stick{
        left: 20px;
    }

    #camera-stick{
        right: 20px;
    }
}

</style>