import * as THREE from 'three'
import Experience from '../Experience'
import {
    BakeAtap,
    BakeLantai2,
    BakeLantai2B,
    BakeLantaiSatu,
    BakeSekat,
    TembokLantaiSatu,
    TileBaseColor,
    Pilar,
    Pilar2,
    WhiteLamp,
    NFTMaterial
} from './Materials'

export default class GalleryHall
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resource = this.experience.resources.items
        this.raycast = this.experience.raycast

        this.setModel()
        this.materialSetup()
        this.setMaterial()

        // NFT / ART / TEXTURE
        this.NFTGroupSetup()

    }

    setModel()
    {
        this.galleryHallScene = this.resource.galleryHall.scene
    }

    materialSetup()
    {
        this.bakeAtapMaterial = new BakeAtap()
        this.bakeLantai2Material  = new BakeLantai2()
        this.bakeLantai2BMaterial  = new BakeLantai2B()
        this.bakeLantai1Material  = new BakeLantaiSatu()
        this.bakeSekatMaterial = new BakeSekat()
        this.tembokLantai1Material = new TembokLantaiSatu()
        this.tileBaseMaterial = new TileBaseColor()
        this.pilarMaterial = new Pilar()
        this.pilar2Material = new Pilar2()
        this.whiteLampMaterial = new WhiteLamp()
    }

    setMaterial()
    {
        this.lantaiSatuSetup()
        this.lantaiDuaSetup()
    }

    lantaiSatuSetup() {
        // Parent / group
        this.pilarLantaiSatuKecilGroup = this.galleryHallScene.children.find(child => child.name === "_A_Group_Pilar_keci;_grp")
        this.detailLantaiSatu = this.galleryHallScene.children.find(child => child.name === "_A_Group_detail_Garis_grp001")
        this.pilarBesarLantaiSatu = this.galleryHallScene.children.find(child => child.name === "_A_Group_Pilar_Besar_grp")
        this.detailVentilasiLantaiSatu = this.galleryHallScene.children.find(child => child.name === "_A_Group_Detail_Ventilasi_grp")
        this.atapLantaiSatu = this.galleryHallScene.children.find(child => child.name === "atap")

        // child
        this.atapLantaiSatu1 = this.atapLantaiSatu.children.find(child => child.name === "atap_lantai_bawah_lp")
        this.atapLantaiSatuLamp = this.atapLantaiSatu.children.find(child => child.name === "atap_lantai_bawah_lp001")
        this.tembokLantaiSatu = this.galleryHallScene.children.find(child => child.name === "A_Tembok_Lantai_01")
        this.listTembokLantaiSatu = this.galleryHallScene.children.find(child => child.name === "A_List_Tembok_Lantai_01")
        this.lantaiSatu = this.galleryHallScene.children.find(child => child.name === "A_Lantai_01")
        this.tembokBelakangTangga = this.galleryHallScene.children.find(child => child.name === "tembok_belakang_tangga")
        this.tembokLantaiSatuLamp = this.galleryHallScene.children.find(child => child.name === "A_Tembok_Lantai_01001")
        this.tangga = this.galleryHallScene.children.find(child => child.name === "tangga")

        // adding to scene
        this.scene.add(
            this.pilarLantaiSatuKecilGroup,
            this.detailLantaiSatu,
            this.pilarBesarLantaiSatu,
            this.atapLantaiSatu,
            this.detailVentilasiLantaiSatu,
            this.tembokLantaiSatu,
            this.listTembokLantaiSatu,
            this.lantaiSatu,
            this.tembokBelakangTangga,
            this.tembokLantaiSatuLamp,
            this.tangga,
        )

        // assigning material
        this.pilarLantaiSatuKecilGroup.children.forEach((child) => {
            child.material = this.pilarMaterial.material
        })

        this.detailLantaiSatu.children.forEach((child) => {
            child.material = this.pilar2Material.material
        })

        this.pilarBesarLantaiSatu.children.forEach((child) => {
            child.material = this.pilarMaterial.material
        })

        this.detailVentilasiLantaiSatu.children.forEach((child) => {
            child.material = this.pilarMaterial.material
        })

        this.atapLantaiSatu1.material = this.bakeAtapMaterial.material
        this.atapLantaiSatuLamp.material = this.whiteLampMaterial.material
        this.tembokLantaiSatu.material = this.tembokLantai1Material.material
        this.tembokLantaiSatuLamp.material = this.whiteLampMaterial.material
        this.lantaiSatu.material = this.bakeLantai1Material.material
        this.listTembokLantaiSatu.material = this.pilarMaterial.material
        this.tembokBelakangTangga.material = this.bakeLantai2BMaterial.material
        this.tangga.material = this.pilarMaterial.material
    }

    lantaiDuaSetup()
    {
        // parent / group
        this.detailLantaiDua = this.galleryHallScene.children.find(child => child.name === "_B_detail_grp")
        this.lampLantaiDua = this.galleryHallScene.children.find(child => child.name === "_B_Lampu_Di_atap_grp")
        this.pilarKecilLantaiDua = this.galleryHallScene.children.find(child => child.name === "_B_Pilar_Kecil_grp")
        this.sekatLantaiDua = this.galleryHallScene.children.find(child => child.name === "_B_Skat_grp")
        
        // child
        this.lantaiDua = this.galleryHallScene.children.find(child => child.name === "B_lantai_atas")
        this.listLantaiDua = this.galleryHallScene.children.find(child => child.name === "B_List")
        this.pilarBesarLantaiDua = this.galleryHallScene.children.find(child => child.name === "B_Pilar_Besar")
        this.pilarBesarLanta1iDua = this.galleryHallScene.children.find(child => child.name === "B_Pilar_Besar001")
        this.pilarBesarLantai2Dua = this.galleryHallScene.children.find(child => child.name === "B_Pilar_Besar002")
        this.pilarBesarLantai3Dua = this.galleryHallScene.children.find(child => child.name === "B_Pilar_Besar003")
        this.pilarBesarLantai4Dua = this.galleryHallScene.children.find(child => child.name === "B_Pilar_Besar004")
        this.pilarBesarLantai5Dua = this.galleryHallScene.children.find(child => child.name === "B_Pilar_Besar005")
        this.atapLantaiDua = this.galleryHallScene.children.find(child => child.name === "Plane")
        this.tembokAtasTangga = this.galleryHallScene.children.find(child => child.name === "tembok_atas_tangga")
        this.tembokLantaiDua = this.galleryHallScene.children.find(child => child.name === "tembok_atas__4")
        this.listSekatTengah = this.sekatLantaiDua.children.find(child => child.name === "List_Sekat")
        this.tembokTengah = this.sekatLantaiDua.children.find(child => child.name === "Tembok_Sekat_02")
        this.whiteLampTembokTengah = this.sekatLantaiDua.children.find(child => child.name === "Tembok_Sekat_02001")

        // adding to scene
        this.scene.add(
            this.detailLantaiDua,
            this.lampLantaiDua,
            this.pilarKecilLantaiDua,
            this.sekatLantaiDua,
            this.lantaiDua,
            this.listLantaiDua,
            this.pilarBesarLantaiDua,
            this.pilarBesarLanta1iDua,
            this.pilarBesarLantai2Dua,
            this.pilarBesarLantai3Dua,
            this.pilarBesarLantai4Dua,
            this.pilarBesarLantai5Dua,
            this.atapLantaiDua,
            this.tembokAtasTangga,
            this.tembokLantaiDua,
        )

        // assigning material
        this.detailLantaiDua.children.forEach((child) => {
            child.material = this.pilarMaterial.material
        })

        this.lampLantaiDua.children.forEach((child) => {
            child.material = this.whiteLampMaterial.material
        })

        this.pilarKecilLantaiDua.children.forEach((child) => {
            child.material = this.pilarMaterial.material
        })

        this.pilarBesarLantaiDua.material = this.pilarMaterial.material 
        this.pilarBesarLanta1iDua.material = this.pilarMaterial.material 
        this.pilarBesarLantai2Dua.material = this.pilarMaterial.material 
        this.pilarBesarLantai3Dua.material = this.pilarMaterial.material 
        this.pilarBesarLantai4Dua.material = this.pilarMaterial.material 
        this.pilarBesarLantai5Dua.material = this.pilarMaterial.material 

        this.lantaiDua.material = this.bakeLantai2Material.material
        this.listLantaiDua.material = this.pilarMaterial.material
        this.atapLantaiDua.material = this.bakeAtapMaterial.material
        this.tembokAtasTangga.material = this.bakeLantai2BMaterial.material
        this.tembokLantaiDua.material = this.bakeLantai2BMaterial.material
        this.listSekatTengah.material = this.pilarMaterial.material
        this.tembokTengah.material = this.bakeSekatMaterial.material
        this.whiteLampTembokTengah.material = this.whiteLampMaterial.material
    }

    NFTGroupSetup()
    {
        this.NFTGroup = new THREE.Group()

        // LANTAI 1
        this.NFT_TEST = this.galleryHallScene.children.find(child => child.name === "A_Kanvas_01001")
        this.NFT_01 = this.galleryHallScene.children.find(child => child.name === "A_Kanvas_01")
        this.NFT_02 = this.galleryHallScene.children.find(child => child.name === "A_Kanvas_02")
        this.NFT_03 = this.galleryHallScene.children.find(child => child.name === "A_Kanvas_03")
        this.NFT_04 = this.galleryHallScene.children.find(child => child.name === "A_Kanvas_04")
        this.NFT_05 = this.galleryHallScene.children.find(child => child.name === "A_Kanvas_05")
        this.NFT_06 = this.galleryHallScene.children.find(child => child.name === "A_Kanvas_06")
        this.NFT_07 = this.galleryHallScene.children.find(child => child.name === "A_Kanvas_07")
        
        // LANTAI 2
        this.NFT_08 = this.galleryHallScene.children.find(child => child.name === "B_Kanvas_08")
        this.NFT_09 = this.galleryHallScene.children.find(child => child.name === "B_Kanvas_09")
        this.NFT_10 = this.galleryHallScene.children.find(child => child.name === "B_Kanvas_10")
        this.NFT_11 = this.galleryHallScene.children.find(child => child.name === "B_Kanvas_11")
        this.NFT_12 = this.galleryHallScene.children.find(child => child.name === "B_Kanvas_12")
        this.NFT_13 = this.galleryHallScene.children.find(child => child.name === "B_Kanvas_13")
        this.NFT_14 = this.galleryHallScene.children.find(child => child.name === "B_Kanvas_14")
        this.NFT_15 = this.galleryHallScene.children.find(child => child.name === "B_Kanvas_15")
        this.NFT_16 = this.galleryHallScene.children.find(child => child.name === "B_Kanvas_16")
        this.NFT_17 = this.galleryHallScene.children.find(child => child.name === "B_Kanvas_17")
        this.NFT_18 = this.galleryHallScene.children.find(child => child.name === "B_Kanvas_18")
        this.NFT_19 = this.galleryHallScene.children.find(child => child.name === "B_Kanvas_19")
        this.NFT_20 = this.galleryHallScene.children.find(child => child.name === "B_Kanvas_20")

        this.NFTGroup.add(
            this.NFT_TEST,
            this.NFT_01,
            this.NFT_02,
            this.NFT_03,
            this.NFT_04,
            this.NFT_05,
            this.NFT_06,
            this.NFT_07,

            this.NFT_08,
            this.NFT_09,
            this.NFT_10,
            this.NFT_11,
            this.NFT_12,
            this.NFT_13,
            this.NFT_14,
            this.NFT_15,
            this.NFT_16,
            this.NFT_17,
            this.NFT_18,
            this.NFT_19,
            this.NFT_20,
        )

        this.NFTDataSetup()
        this.scene.add(this.NFTGroup)

        this.raycast.raycasterSetup(this.NFTGroup)
    }

    NFTDataSetup() {

        // NFT TEST Plane with user data
        this.NFT_TEST.material = new NFTMaterial(this.resource.NFT_TEST).material
        this.NFT_TEST.userData.name = `Kubus Koplak #9910`
        this.NFT_TEST.userData.artistName = `Oji`
        this.NFT_TEST.userData.detail = `Si kubus kocak lawak serta sedih`
        this.NFT_TEST.userData.URL = `https://raw.githubusercontent.com/ymmycode/fps-base/main/public/assets/NFT/NFT_TEST.png`

    }
}