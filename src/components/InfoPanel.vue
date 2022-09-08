<template>
    <div>
        <div class="info-panel absolute flex justify-center align-center">
            <div class="art-info fixed grid">
                <div class="image-container">
                    <img :src=props.artDesc.URL alt="" crossorigin="anonymous">
                </div>
                <div class="text-content">
                    <div class="content title text-xl font-bold">Art Info</div>
                    <div class="content">
                        <div class="font-medium">Name</div>
                        <div class="font-light">{{props.artDesc.name}}</div>
                    </div>
                    <div class="content">
                        <div class="font-medium">Artist</div>
                        <div class="font-light" >{{props.artDesc.artistName}}</div>
                    </div>
                    <div class="content">
                        <div class="font-medium">Detail</div>
                        <div class="font-light" >{{props.artDesc.detail}}</div>
                    </div>
                    <div class="button-container flex justify-end">
                        <button class="confirm-btn absolute" @click="emits('closePanel')">Got it</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// import { watch } from 'vue';

const props = defineProps(['artDesc'])

const emits = defineEmits(['closePanel'])

// console.log(props.artDesc)

// watch(props.artDesc, (val) => {
//     console.log(val)
// })

const showPanel = setTimeout(() => {
    
    document.querySelector(`.info-panel`).classList.add(`active`)

    clearTimeout(showPanel)
}, 450)

</script>

<style lang="scss" scoped>

.info-panel{
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);

    background-color: rgba($color: #aaaaaa, $alpha: .4);
    color: white;

    width: 100%;
    height: 100%;

    padding: 0 10vw;

    z-index: 7;

    transition: all .3s linear;

    opacity: 0;

    .art-info{
        top: 50%;
        transform: translateY(-50%);

        max-height: 90%;
        max-width: 1300px;
        padding: 5vh 2vw;

        background-color: rgba(15, 23, 42, 0.565);

        grid-template-columns: 1fr 500px;
        gap: 2vw;

        border-radius: 25px;
        // touch-action: manipulation;

        .image-container{
            img{
                width: auto;
                height: auto;
                max-width: 100%;
                max-height: 50vh;
                box-shadow: 0px 0px 30px rgb(178, 178, 178);
                border: 4px solid white;
                border-radius: 25px;

                // margin-bottom: 80px;
            }
        }
        .text-content{
            .content{
                margin: 3vh 0;
            }
            
            .title{
                margin-top: 0px;
            }

            .button-container{
                // padding: 15px;
                

                // width: 140px;

                .confirm-btn{
                    color: white;
                    font-weight: 800;
                    bottom: 5%;
                    background-color: red;
                    transition: all .2s linear;
                    padding: 1vh 3vw;
                    border-radius: 25px;
                }
            }

            .button-container:hover{

                .confirm-btn{
                    color: red;
                    background-color: white;
                }
            }
        }
    }
}

.info-panel.active{
    opacity: 1;
}


@media (max-width: 700px) {
    .info-panel{
        
        // padding: 5vh 5vw;

        .art-info{
            padding: 3vh 10vw;
            display: grid;
            grid-template-columns: 1fr;
            // grid-template-rows: 1fr 200px;
            gap: 10vh;
            pointer-events: all;
            max-height: 100%;

            overflow-y: scroll;
            border-radius: 0px;


            .image-container{
                display: flex;
                align-items: center;
                justify-content: center;

                img{
                    width: auto;
                    object-fit: cover;
                    max-height: 300px;
                    max-width: 100%;
                    margin: 0 auto;
                }
            }
            .text-content{
                // max-width: 65%;

                .content{
                    font-size: 1rem;
                }
                
                .title{
                }

                .button-container{

                    width: 100%;
                    display: flex;
                    justify-content: center;

                    .confirm-btn{
                        position: relative;
                        font-size: 1rem;
                        margin-bottom: 20px;
                    }
                }
            }
        }
    }

}

@media (max-width: 1000px) and (orientation: landscape) {
    .info-panel{
        padding: 0;

        .art-info{
            padding: 8vw;
            padding-top: 20px;
            padding-bottom: 60px;

            // height: 100%;
            // width: 100%;
            grid-template-columns: 1fr 350px;
            height: 100%;
            width: 100%;
            max-height: 1000px;
            max-width: 1000px;
            border-radius: 0px;

            .image-container{
                display: flex;
                align-items: center;
                justify-content: center;

                img{
                    width: auto;
                    object-fit: cover;
                    max-height: 180px;
                    max-width: 100%;
                    margin: 0 auto;
                }
            }
            .text-content{

                overflow-y: scroll;

                .content{
                    font-size: 1rem;
                }
                
                .title{
                }

                .button-container{

                    .confirm-btn{
                        position: relative;
                        font-size: 1rem;
                        margin-bottom: 20px;
                    }
                }
            }
        }
    }

}


</style>