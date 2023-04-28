import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from 'dat.gui'
import { Sphere } from "./sphere.js";
import { Cylinder } from "./cylinder.js";

import gouraudVertexShader from "./gouraudVertexShader.glsl.js";
import gouraudFragmentShader from "./gouraudFragmentShader.glsl.js";
import phongVertexShader from "./phongVertexShader.glsl.js";
import phongFragmentShader from "./phongFragmentShader.glsl.js";

// http://www.realtimerendering.com/erich/udacity/exercises/unit3_specular_demo.html

 
const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

const gui = new dat.GUI();

const sizes = {
  width: 900,
  height: 900,
};

var scene_type = 'spheres'


const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.001, 1000);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 10;
scene.add(camera);

//creating 9 spheres:
var spheres = []

spheres.push(new Sphere(camera, scene, 0.4, [3,-3,0], [2.5, 2.5, 2.5], [0.7,0.4,0.3,1.0], 0.9, 0.7, 0.2, 10))
spheres.push(new Sphere(camera, scene, 0.4, [0.5,-3,0], [2.5, 2.5, 2.5],[0.7,0.4,0.3,1.0], 0.3, 0.4, 0.8, 100))
spheres.push(new Sphere(camera, scene, 0.4, [-2,-3,0], [2.5, 2.5, 2.5], [0.7,0.4,0.3,1.0], 0.8, 0.4, 0.1, 100))
spheres.push(new Sphere(camera, scene, 0.4, [3,0,0], [2.5, 2.5, 2.5], [0.7,0.4,0.3,1.0], 0.7, 0.4, 0.6, 100))
spheres.push(new Sphere(camera, scene, 0.4, [0.5,0,0], [2.5, 2.5, 2.5], [0.7,0.4,0.3,1.0], 0.2, 0.5, 0.6, 1))
spheres.push(new Sphere(camera, scene, 0.4, [-2,0,0], [2.5, 2.5, 2.5], [0.7,0.4,0.3,1.0], 0.3, 0.2, 0.9, 10))
spheres.push(new Sphere(camera, scene, 0.4, [3,3,0], [2.5, 2.5, 2.5], [0.7,0.4,0.3,1.0], 0.9, 0.2, 0.3, 50))
spheres.push(new Sphere(camera, scene, 0.4, [0.5,3,0], [2.5, 2.5, 2.5],[0.7,0.4,0.3,1.0], 0.4, 0.6, 0.2, 40))
spheres.push(new Sphere(camera, scene, 0.4, [-2,3,0], [2.5, 2.5, 2.5], [0.7,0.4,0.3,1.0], 0.1, 0.4, 0.9, 100))

//Creating 9 cylinders:
var cylinders = []
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [3,-3,0], [2.5, 2.5, 2.5], [0.7,0.4,0.3,1.0], 0.9, 0.7, 0.2, 10))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [0.5,-3,0], [2.5, 2.5, 2.5], [0.7,0.4,0.3,1.0], 0.9, 0.7, 0.2, 10))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [-2,-3,0], [2.5, 2.5, 2.5], [0.7,0.4,0.3,1.0], 0.9, 0.7, 0.2, 10))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [3,0,0], [2.5, 2.5, 2.5], [0.7,0.4,0.3,1.0], 0.9, 0.7, 0.2, 10))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [0.5,0,0], [2.5, 2.5, 2.5], [0.7,0.4,0.3,1.0], 0.9, 0.7, 0.2, 10))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [-2,0,0], [2.5, 2.5, 2.5], [0.7,0.4,0.3,1.0], 0.9, 0.7, 0.2, 10))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [3,3,0], [2.5, 2.5, 2.5], [0.7,0.4,0.3,1.0], 0.9, 0.7, 0.2, 10))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [0.5,3,0], [2.5, 2.5, 2.5], [0.7,0.4,0.3,1.0], 0.9, 0.7, 0.2, 10))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [-2,3,0], [2.5, 2.5, 2.5], [0.7,0.4,0.3,1.0], 0.9, 0.7, 0.2, 10))

var i;
for(i=0;i<spheres.length;i++)
{
  scene.add(spheres[i].sphereMesh)
}

// Controls
let mouseCntrl = {
  "controlsEnabled": true
}
let controls;
gui.add(mouseCntrl, "controlsEnabled").name("Enable Controls");

controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enabled = true;


//Renderer:
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setClearColor( 0xffffff, 0 );
renderer.physicallyBasedShading = true;
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap; 


document.addEventListener("keydown", event => {
  ////console.log(event);
  if (event.key == "m")
  {
    if(scene_type == 'spheres')
    {
      scene_type = 'cylinders'
      var i
      for(i=0;i<spheres.length;i++)
      {
        scene.remove(spheres[i].sphereMesh)
      }
      for(i=0;i<cylinders.length;i++)
      {
        scene.add(cylinders[i].cylinderMesh)
      }
    }
    else if(scene_type == 'cylinders')
    {
      scene_type = 'spheres'
      var i
      for(i=0;i<cylinders.length;i++)
      {
        scene.remove(cylinders[i].cylinderMesh)
      }
      for(i=0;i<spheres.length;i++)
      {
        scene.add(spheres[i].sphereMesh)
      }
    }
  }

  if(event.key == "s")
  {
    if(scene_type == 'spheres')
    {
      var i;
      for(i=0;i<spheres.length;i++)
      {
        spheres[i].changeShading()
      }
    }
    else if(scene_type == "cylinders")
    {
      var i;
      for(i=0;i<cylinders.length;i++)
      {
        cylinders[i].changeShading()
      }
    }
  }
});


//Animate:
const clock = new THREE.Clock();
let lastElapsedTime = 0;

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - lastElapsedTime;
    lastElapsedTime = elapsedTime;

    // Update controls
    if(mouseCntrl.controlsEnabled)
    {
        controls.enabled = true;
        controls.update();
    } else 
    {
        controls.enabled = false;
    }


    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();