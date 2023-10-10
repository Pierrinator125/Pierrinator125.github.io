import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene();
var aspect = window.innerWidth/window.innerHeight;
const camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.SphereGeometry(1);
const material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const texture = new THREE.TextureLoader().load( "earth2.jpg" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

material.map = texture;

const light = new THREE.AmbientLight( 0xffffff, 5);
scene.add( light );

camera.position.z = 5;

const controls = new OrbitControls( camera, renderer.domElement );

var render = function () {
    requestAnimationFrame( render );    

    controls.update();

    renderer.render( scene, camera );
  };
  

render();


function _convertLatLonToVec (lat,lon){
    lat = lat*Math.PI/180.0;
    lon = -lon*Math.PI/180.0;
    return new THREE.Vector3(
        Math.cos(lat)*Math.cos(lon),
        Math.sin(lat),
        Math.cos(lat)*Math.sin(lon));
}


navigator.geolocation.getCurrentPosition(showPositionCurrent);

function showPositionCurrent(position)
{
    const geometry = new THREE.SphereGeometry(0.01,32,32);
    const material = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
    const cube = new THREE.Mesh( geometry, material );
    var vect = _convertLatLonToVec(position.coords.latitude,position.coords.longitude);
    cube.position.setX(vect.x);
    cube.position.setY(vect.y);
    cube.position.setZ(vect.z);
    scene.add( cube );
}

fetch('https://restcountries.com/v3.1/all')
    .then((response) => function(){
        var res = JSON.parse(response)
        res.forEach(pays => {
            var lat = latlng[0];
            var long = latlng[1];
            var flag = flags.png;
            console.log(lat)
            showPositionApi(lat,long,flag);
        });
    })
//API : récupérer latlng pour latitude et longitude + récupérer flag pour drapeau

function showPositionApi(lat,long,flag)
{
    const geometry = new THREE.SphereGeometry(0.01,32,32);
    const material = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
    const texture = new THREE.TextureLoader().load(flag);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    const cube = new THREE.Mesh( geometry, material );
    var vect = _convertLatLonToVec(lat,long);
    cube.position.setX(vect.x);
    cube.position.setY(vect.y);
    cube.position.setZ(vect.z);
    scene.add( cube );
}