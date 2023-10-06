import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
var aspect = window.innerWidth/window.innerHeight;
const camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 2, 2, 2 );
const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const texture = new THREE.TextureLoader().load( "PierreCarré.png" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

material.map = texture

const loader = new GLTFLoader();

loader.load( 'potted_plant_01_4k.gtlf', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

camera.position.z = 5;

var render = function () {
    requestAnimationFrame( render );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    renderer.render( scene, camera );
  };
  

render();