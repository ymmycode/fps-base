<template>
    <div>
        <div class="loading-screen noSelect">
            <div class="animated-logo">
                <AnimatedLogo/>
            </div>
            <span>Art Exhibition</span>
            <span class="loading-progress">{{progressValue}}%</span>
        </div>
        <!-- <div class="ui-welcome"></div> -->
        <div class="webgl" ref="webgl"></div>
        <div id="movement-stick" class="noSelect" ref="movementStick"></div>
        <div id="camera-stick" class="noSelect" ref="cameraStick"></div>
        
    </div>
</template>

<script setup>
import AnimatedLogo from './AnimatedLogo.vue'

import { onMounted, ref, watch } from 'vue';
import Experience from '../classes/Experience.js';
import isMobile from 'ismobilejs'

const webgl = ref(null)
const movementStick = ref(null)
const cameraStick = ref(null)
const progressValue = ref(null)

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
        progressTextValue: progressValue,
    })
}

watch(progressValue, (val) => {
    if(val === 100){
        const textWelcome = setTimeout(() => {
            document.querySelector(`.loading-progress`).innerText = `Welcome`
            clearTimeout(textWelcome)
        }, 1000)

        const transitionTimeout = setTimeout(() => {
            document.querySelector(`.loading-screen`).classList.add(`hide`)
            clearTimeout(transitionTimeout)
        }, 2000)

        const displayNone = setTimeout(() => {
            document.querySelector(`.loading-screen`).style.display = "none"
            clearTimeout(displayNone)
        }, 2450)
    }
})

</script>

<style lang="scss" scoped>
body{
        overscroll-behavior-x: none !important;
}

.loading-screen{
    position: fixed;
    z-index: 4;
    width: 100%;
    height: 100%;
    background-color: rgb(15 23 42);

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    align-content: center;

    transition: opacity .4s linear;

    .animated-logo{
        width: 120px;
        height: 120px;
    }

    span{
        color: white;
        font-size: 30px;
        margin: .5rem;
    }

    .loading-progress{
        font-weight: 600;
    }
}

.loading-screen.hide{
    opacity: 0;
}

#webgl{
    overscroll-behavior-x: none !important;
    position: fixed;
    z-index: 1;
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
    bottom: 60px;
    left: 80px;
    background-color: transparent;
    width:  120px;
    height: 120px;
    z-index: 2;
    touch-action: manipulation;
}

#camera-stick{
    pointer-events: auto;
    position: fixed;
    background-color: transparent;
    width: 120px;
    height: 120px;
    z-index: 2;
    touch-action: manipulation;
    bottom: 30px;
    right: 80px;
}

@media (max-width: 640px){

    #movement-stick, #camera-stick{
        bottom: 80px;
    }
}

@media (max-width: 640px) and (orientation: portrait){

    #movement-stick{
        left: 40px;
    }

    #camera-stick{
        right: 40px;
    }
}

</style>