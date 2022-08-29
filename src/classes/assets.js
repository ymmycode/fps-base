export default [
    {
        name: 'base',
        data: {},
        items:
        [
            { 
                name: 'ground', 
                source: '/assets/model/GalleryHall.glb', 
                type: 'gltf' 
            },

            { 
                name: 'galleryHall', 
                source: '/assets/model/Hall.glb', 
                type: 'gltf' 
            },

            { 
                name: 'hdriENV', 
                // source: [
                //     '/assets/env/px.png',
                //     '/assets/env/nx.png',
                //     '/assets/env/py.png',
                //     '/assets/env/ny.png',
                //     '/assets/env/pz.png',
                //     '/assets/env/nz.png'
                // ],
                source: '/assets/env/envHDRI.hdr', 
                type: 'cubeTexture' 
            },
        ]
    }
]