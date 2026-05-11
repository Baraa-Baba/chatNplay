// filterMain.js — ES-module-compatible entry point for JeelizFaceFilter
// Globals expected: THREE (three.min.js), JEELIZFACEFILTER, JeelizThreeHelper, JeelizResizer
import { GLTFLoader } from '/threedostuffoldpublic/filters2Scripts/GLTFLoader.js';

let THREECAMERA = null;
let threeStuffs, myspec;
let mainChanger = new THREE.Object3D();
let mainChanger1, mainChanger1Light, light1, mainChanger2, mainChanger3, myspecGlobal;
let light;
let casaMask, ANONYMOUSMESH, ANONYMOUSOBJ3D, HATOBJ3D, ponyTail;
let covidMask, driftMask, scaryMask, heartEmoji, bandana_mask, welding_mask;
let masquerade_cat_mask_3, forest_mask, clown_2_mask, joker_mask, batman_mask;
let egypt_cat_mask, samurai_mask, bunnyEars, magicHat;

function detect_callback() {}

function init_threeScene(spec) {
    threeStuffs = JeelizThreeHelper.init(spec, detect_callback);
    THREECAMERA = JeelizThreeHelper.create_camera();
    myspec = spec;
}

function clearMainChanger() {
    [
        casaMask, ANONYMOUSMESH, ANONYMOUSOBJ3D, HATOBJ3D, ponyTail,
        covidMask, driftMask, scaryMask, heartEmoji, bandana_mask,
        welding_mask, masquerade_cat_mask_3, forest_mask, clown_2_mask,
        joker_mask, batman_mask, egypt_cat_mask, samurai_mask, bunnyEars, magicHat, light
    ].forEach(obj => { if (obj) mainChanger.remove(obj); });
}

function applyFilter() {
    const filterEl = document.getElementById('filterValue');
    const filter = filterEl ? filterEl.value : 'none';
    const gltfLoader = new GLTFLoader();
    const BASE = '/threedostuffoldpublic';

    const finalize = () => {
        threeStuffs.faceObject.remove(mainChanger1);
        mainChanger1 = mainChanger.clone();
        threeStuffs.faceObject.add(mainChanger1);
        if (light) JeelizThreeHelper.addLight(light);
    };

    const loadGLTF = (path, onLoad) => {
        gltfLoader.load(BASE + path, gltf => { onLoad(gltf); applyFilter(); }, undefined, err => console.warn('GLTF load error', err));
    };

    document.getElementById('videoOfUser') && (document.getElementById('videoOfUser').style.transform = 'rotateY(180deg)');

    if (filter === 'inverted') {
        document.getElementById('videoOfUser') && (document.getElementById('videoOfUser').style.transform = 'rotateY(0deg)');
        return;
    }
    if (filter === 'none') { light = new THREE.PointLight(0xffffff, 1); light.position.z = 10; return; }
    if (filter === 'laCasaMask') {
        light = new THREE.PointLight(0xffffff, 1); light.position.z = 6;
        if (!casaMask) { loadCasaMask(() => applyFilter()); return; }
        mainChanger.add(casaMask); finalize(); return;
    }
    if (filter === 'AnoymnMask') {
        light = new THREE.PointLight(0xffffff, 1); light.position.z = 6;
        if (!ANONYMOUSMESH) { loadAnonymousMesh(() => applyFilter()); return; }
        mainChanger.add(ANONYMOUSMESH); finalize(); return;
    }

    if (filter === 'covidMask') {
        light = new THREE.PointLight(0xffffff, 1); light.position.z = 6;
        if (!covidMask) { loadGLTF('/covidmaskglb.glb', gltf => { gltf.scene.scale.set(10, 8, 10); gltf.scene.position.set(0, -1.6, 0); covidMask = gltf.scene; }); return; }
        mainChanger.add(covidMask);
    } else if (filter === 'driftMask') {
        light = new THREE.PointLight(0xffffff, 1); light.position.z = 6;
        if (!driftMask) { loadGLTF('/models/drift_mask.glb', gltf => { gltf.scene.scale.set(1.25, 1.25, 1.25); gltf.scene.position.set(0, -0.7, -0.2); driftMask = gltf.scene; }); return; }
        mainChanger.add(driftMask);
    } else if (filter === 'scaryMask') {
        light = new THREE.PointLight(0xffffff, 2); light.position.z = 10;
        if (!scaryMask) { loadGLTF('/models/scary_mask.glb', gltf => { gltf.scene.scale.set(0.75, 0.75, 0.75); gltf.scene.position.set(0, 0.4, 0); scaryMask = gltf.scene; }); return; }
        mainChanger.add(scaryMask);
    } else if (filter === 'heartEmoji') {
        light = new THREE.PointLight(0xffffff, 1); light.position.z = 10;
        if (!heartEmoji) { loadGLTF('/models/3d_love_emoji.glb', gltf => { gltf.scene.scale.set(0.035, 0.035, 0.035); gltf.scene.position.set(0, 0.4, 0); heartEmoji = gltf.scene; }); return; }
        mainChanger.add(heartEmoji);
    } else if (filter === 'bandana_mask') {
        light = new THREE.PointLight(0xffffff, 1); light.position.z = 10;
        if (!bandana_mask) { loadGLTF('/models/bandana_mask.glb', gltf => { gltf.scene.scale.set(1.2, 1.2, 1.2); gltf.scene.position.set(0, -0.45, 0); bandana_mask = gltf.scene; }); return; }
        mainChanger.add(bandana_mask);
    } else if (filter === 'welding_mask') {
        light = new THREE.PointLight(0xffffff, 20); light.position.z = 10;
        if (!welding_mask) { loadGLTF('/models/welding_mask.glb', gltf => { gltf.scene.scale.set(8.5, 8.5, 8.5); gltf.scene.position.set(0, 1, 0); gltf.scene.rotation.set(0, 89.5, 0); welding_mask = gltf.scene; }); return; }
        mainChanger.add(welding_mask);
    } else if (filter === 'masquerade_cat_mask_3') {
        light = new THREE.PointLight(0xffffff, 2); light.position.z = 10;
        if (!masquerade_cat_mask_3) { loadGLTF('/models/masquerade_cat_mask_3.glb', gltf => { gltf.scene.scale.set(10, 10, 10); gltf.scene.position.set(0, -0.2, 0); masquerade_cat_mask_3 = gltf.scene; }); return; }
        mainChanger.add(masquerade_cat_mask_3);
    } else if (filter === 'forest_mask') {
        light = new THREE.PointLight(0xffffff, 5); light.position.z = 10;
        if (!forest_mask) { loadGLTF('/models/forest_mask.glb', gltf => { gltf.scene.scale.set(0.1, 0.1, 0.1); gltf.scene.position.set(0, 0.5, 0); forest_mask = gltf.scene; }); return; }
        mainChanger.add(forest_mask);
    } else if (filter === 'clown_2_mask') {
        light = new THREE.PointLight(0xffffff, 2); light.position.z = 10;
        if (!clown_2_mask) { loadGLTF('/models/clown_2_mask.glb', gltf => { gltf.scene.scale.set(10, 10, 10); gltf.scene.position.set(0, -1, 0); clown_2_mask = gltf.scene; }); return; }
        mainChanger.add(clown_2_mask);
    } else if (filter === 'joker_mask') {
        light = new THREE.PointLight(0xffffff, 1); light.position.z = 10;
        if (!joker_mask) { loadGLTF('/models/joker_mask.glb', gltf => { gltf.scene.scale.set(10, 10, 10); gltf.scene.position.set(0, -1, 0); joker_mask = gltf.scene; }); return; }
        mainChanger.add(joker_mask);
    } else if (filter === 'batman_mask') {
        light = new THREE.PointLight(0xffffff, 1); light.position.z = 10;
        if (!batman_mask) { loadGLTF('/models/batman_mask.glb', gltf => { gltf.scene.scale.set(10, 10, 10); gltf.scene.position.set(0, -0.3, 0); batman_mask = gltf.scene; }); return; }
        mainChanger.add(batman_mask);
    } else if (filter === 'egypt_cat_mask') {
        light = new THREE.PointLight(0xffffff, 1); light.position.z = 10;
        if (!egypt_cat_mask) { loadGLTF('/models/egypt_cat_mask.glb', gltf => { gltf.scene.scale.set(0.011, 0.011, 0.011); gltf.scene.position.set(0.08, 0.2, 0); egypt_cat_mask = gltf.scene; }); return; }
        mainChanger.add(egypt_cat_mask);
    } else if (filter === 'samurai_mask') {
        light = new THREE.PointLight(0xffffff, 2); light.position.z = 10;
        if (!samurai_mask) { loadGLTF('/models/samurai_mask.glb', gltf => { gltf.scene.scale.set(1.75, 1.75, 1.75); gltf.scene.position.set(0, -2.6, 0); samurai_mask = gltf.scene; }); return; }
        mainChanger.add(samurai_mask);
    } else if (filter === 'bunnyEars') {
        light = new THREE.PointLight(0xffffff, 1); light.position.z = 10;
        if (!bunnyEars) { loadGLTF('/models/bunnyEars.glb', gltf => { gltf.scene.scale.set(0.01, 0.01, 0.01); gltf.scene.position.set(0, 1, 0); bunnyEars = gltf.scene; }); return; }
        mainChanger.add(bunnyEars);
    }

    finalize();
}

let casaMaskLoading = false;
let anonymousLoading = false;

function loadCasaMask(onReady) {
    if (casaMaskLoading) return;
    casaMaskLoading = true;
    const casaLoader = new THREE.BufferGeometryLoader();
    casaLoader.load('/threedostuffoldpublic/models/casa_de_papel/casa_de_papel.json', geom => {
        const mat = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('/threedostuffoldpublic/models/casa_de_papel/CasaDePapel_DIFFUSE.png'),
            normalMap: new THREE.TextureLoader().load('/threedostuffoldpublic/models/casa_de_papel/CasaDePapel_NRM.png'),
            reflectivity: 1
        });
        casaMask = new THREE.Mesh(geom, mat);
        casaMask.scale.multiplyScalar(0.06);
        casaMask.position.y = -0.8;
        casaMask.scale.x = 0.07;
        if (onReady) onReady();
    });
}

function loadAnonymousMesh(onReady) {
    if (anonymousLoading) return;
    anonymousLoading = true;
    const headLoader = new THREE.BufferGeometryLoader();
    headLoader.load('/threedostuffoldpublic/models/anonymous/anonymous.json', geom => {
        const mat = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load('/threedostuffoldpublic/models/anonymous/anonymous.png'),
            transparent: true
        });
        ANONYMOUSMESH = new THREE.Mesh(geom, mat);
        ANONYMOUSMESH.frustumCulled = false;
        ANONYMOUSMESH.scale.multiplyScalar(0.065);
        ANONYMOUSMESH.position.set(0, -0.65, 0.35);
        if (onReady) onReady();
    });
}

document.getElementById('chooseFilter')?.addEventListener('click', () => {
    clearMainChanger();
    setTimeout(applyFilter, 1);
});

async function main() {
    try {
        const NN_STANDARD_2 = await fetch('/threedostuffoldpublic/filters2Scripts/neuralNets/NN_STANDARD_2.json').then(r => r.json());

        JEELIZFACEFILTER.init({
            followZRot: true,
            canvasId: 'jeeFaceFilterCanvas',
            stabilizationSettings: { translationFactorRange: [0.0002, 0.0006] },
            scanSettings: { nDetectsPerLoop: 4 },
            NNC: NN_STANDARD_2,
            isKeepRunningOnWinFocusLost: false,
            maxFacesDetected: 1,
            videoSettings: { videoElement: null },
            callbackReady(errCode, spec) {
                if (errCode) { console.warn('JeelizFaceFilter error:', errCode); return; }
                const el = document.getElementById('loadingFilters');
                if (el) setTimeout(() => { el.style.display = 'none'; }, 2000);
                init_threeScene(spec);
            },
            callbackTrack(detectState) {
                JeelizThreeHelper.render(detectState, THREECAMERA);
            }
        });
    } catch (e) {
        console.warn('JeelizFaceFilter failed to initialize:', e);
    }
}

main();
