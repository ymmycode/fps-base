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
    Pilar2
} from './Materials'

export default class GalleryHall
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resource = this.experience.resources.items

        this.setModel()
        this.materialSetup()
        this.setMaterial()
    }

    setModel()
    {
        this.galleryHallScene = this.resource.galleryHall.scene

        this.scene.add(this.galleryHallScene)
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
    }

    setMaterial()
    {
        console.log(this.galleryHallScene.children)
        
        // LANTAI SATU
        this.pilarLantaiSatuKecilGroup = this.galleryHallScene.children.find(child => child.name === "_A_Group_Pilar_keci;_grp")
        this.detailLantaiSatu = this.galleryHallScene.children.find(child => child.name === "_A_Group_detail_Garis_grp001")
        this.pilarBesarLantaiSatu = this.galleryHallScene.children.find(child => child.name === "_A_Group_Pilar_Besar_grp")
        this.detailVentilasiLantaiSatu = this.galleryHallScene.children.find(child => child.name === "_A_Group_Detail_Ventilasi_grp")
        
        this.atapLantaiSatu = this.galleryHallScene.children.find(child => child.name === "atap")
        this.tembokLantaiSatu = this.galleryHallScene.children.find(child => child.name === "A_Tembok_Lantai_01")
        this.listTembokLantaiSatu = this.galleryHallScene.children.find(child => child.name === "A_List_Tembok_Lantai_01")
        this.lantaiSatu = this.galleryHallScene.children.find(child => child.name === "A_Lantai_01")
        this.tembokBelakangTangga = this.galleryHallScene.children.find(child => child.name === "tembok_belakang_tangga")
        this.tembokLantaiSatuLamp = this.galleryHallScene.children.find(child => child.name === "A_Tembok_Lantai_01001")
        
        
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

        this.atapLantaiSatu.children[0].material = this.bakeAtapMaterial.material
        this.tembokLantaiSatu.material = this.tembokLantai1Material.material
        this.tembokLantaiSatuLamp.material = new THREE.MeshBasicMaterial({color: 0xffffff})
        this.lantaiSatu.material = this.bakeLantai1Material.material
        this.listTembokLantaiSatu.material = this.pilarMaterial.material
        this.tembokBelakangTangga.material = this.bakeLantai2BMaterial.material
        

    }
}