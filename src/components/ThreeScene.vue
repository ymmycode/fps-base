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

const webgl = ref(null)
const movementStick = ref(null)
const cameraStick = ref(null)

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
    })
}

</script>

<style lang="scss" scoped>
#webgl{
    position: fixed;
    z-index: 51;
}


// #camera-stick, #movement-stick{
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     align-content: center;
//     flex-direction: column;

// }

#movement-stick{
    pointer-events: auto;
    position: fixed;
    bottom: 100px;
    left: 10px;
    background-color: transparent;
    width: calc((230  /1920) * 100vw);
    height: calc((120  /1080) * 100vh);
    z-index: 52;
    touch-action: manipulation;
}

#camera-stick{
    pointer-events: auto;
    position: fixed;
    background-color: transparent;
    width: calc((230  /1920) * 100vw);
    height: calc((120  /1080) * 100vh);
    z-index: 52;
    touch-action: manipulation;
    bottom: 100px;
    right: 80px;
}


@media (orientation: landscape){

    #camera-stick{
        right: 40px;
    }
}

</style>