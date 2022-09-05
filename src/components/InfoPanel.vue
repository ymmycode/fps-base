<template>
    <div>
        <div class="info-panel absolute flex justify-center align-center">
            <div class="art-info fixed grid">
                <div class="image-container">
                    <img src="https://raw.githubusercontent.com/ymmycode/fps-base/main/public/assets/NFT/NFT_TEST.png" alt="" crossorigin="anonymous">
                </div>
                <div class="text-content">
                    <div class="content title text-xl font-bold">Art Info</div>
                    <div class="content">
                        <div class="font-medium">Name</div>
                        <div class="font-light">Lorem ipsum</div>
                    </div>
                    <div class="content">
                        <div class="font-medium">Artist</div>
                        <div>Artis Name</div>
                    </div>
                    <div class="content">
                        <div class="font-medium">Detail</div>
                        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, mollitia nostrum nihil reprehenderit beatae cupiditate voluptates suscipit. Saepe deleniti in harum velit tempora cupiditate aperiam quia molestias cum, alias ex. </div>
                    </div>
                    <div class="button-container flex justify-end">
                        <button class="confirm-btn">Got it</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

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

    .art-info{
        top: 50%;
        transform: translateY(-50%);

        max-height: 80%;
        max-width: 1300px;
        padding: 3vh 3vw;

        background-color: rgba(15, 23, 42, 0.565);

        grid-template-columns: auto 1fr;
        gap: 1.5vw;

        border-radius: 25px;

        .image-container{
            img{
                width: auto;
                height: auto;
                max-width: 100%;
                max-height: 70vh;
                box-shadow: 0px 0px 30px rgb(178, 178, 178);
                border: 4px solid white;
                border-radius: 25px;
            }
        }
        .text-content{
            // max-width: 65%;

            .content{
                margin: 3vh 0;
            }
            
            .title{
                margin-top: 0px;
            }

            .button-container{
                .confirm-btn{
                    background-color: red;
                    color: white;
                    padding: 15px;
                    border-radius: 10px;
                    font-weight: 800;
                    transition: all .2s linear;
                }

                .confirm-btn:hover{
                    background-color: white;
                    color: red;
                }
            }
        }
    }
}



</style>