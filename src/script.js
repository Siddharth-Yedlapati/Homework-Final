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

//Lighting:
var PointLight1 = {
  lightPos : new THREE.Vector3(-10, 25, 10),
  diffuseColor : new THREE.Vector4(1.0,1.0,1.0,1.0),
  specularColor : new THREE.Vector4(1.0,1.0,1.0,1.0),

  a : 0.01,
  b : 0.01,
  c : 0.0009
};

var PointLight2 = {
  lightPos : new THREE.Vector3(35, 15, 15),
  diffuseColor : new THREE.Vector4(1.0,1.0,1.0,1.0),
  specularColor : new THREE.Vector4(1.0,1.0,1.0,1.0),

  a : 0.005,
  b : 0.005,
  c : 0.0009
};

var num_lights = 1
var max_num_lights = 2

//creating 9 spheres:
var spheres = []

spheres.push(new Sphere(camera, scene, 0.4, [3,-3,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.1, 0.2, 1.0, 15, PointLight1, PointLight2, num_lights, max_num_lights))
spheres.push(new Sphere(camera, scene, 0.4, [0.5,-3,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.1, 0.2, 0.7, 40, PointLight1, PointLight2, num_lights, max_num_lights))
spheres.push(new Sphere(camera, scene, 0.4, [-2,-3,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.1, 0.2, 0.01, 100, PointLight1, PointLight2, num_lights, max_num_lights))
spheres.push(new Sphere(camera, scene, 0.4, [3,0,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.4, 0.5, 0.9, 15, PointLight1, PointLight2, num_lights, max_num_lights))
spheres.push(new Sphere(camera, scene, 0.4, [0.5,0,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.4, 0.5, 0.7, 40, PointLight1, PointLight2, num_lights, max_num_lights))
spheres.push(new Sphere(camera, scene, 0.4, [-2,0,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.4, 0.5, 0.01, 100, PointLight1, PointLight2, num_lights, max_num_lights))
spheres.push(new Sphere(camera, scene, 0.4, [3,3,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.8, 0.9, 0.9, 40, PointLight1, PointLight2, num_lights, max_num_lights))
spheres.push(new Sphere(camera, scene, 0.4, [0.5,3,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.6, 0.9, 0.7, 80, PointLight1, PointLight2, num_lights, max_num_lights))
spheres.push(new Sphere(camera, scene, 0.4, [-2,3,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.5, 0.9, 0.01, 100, PointLight1, PointLight2, num_lights, max_num_lights))

//Creating 9 cylinders:
var cylinders = []
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [3,-3,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.1, 0.2, 1.0, 2, PointLight1, PointLight2, num_lights, max_num_lights))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [0.5,-3,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.3, 0.2, 0.7, 3, PointLight1, PointLight2, num_lights, max_num_lights))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [-2,-3,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.5, 0.2, 0.01, 4, PointLight1, PointLight2, num_lights, max_num_lights))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [3,0,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.1, 0.5, 1.0, 4, PointLight1, PointLight2, num_lights, max_num_lights))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [0.5,0,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.3, 0.5, 0.7, 5, PointLight1, PointLight2, num_lights, max_num_lights))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [-2,0,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.5, 0.5, 0.01, 6, PointLight1, PointLight2, num_lights, max_num_lights))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [3,3,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.1, 0.9, 1.0, 5, PointLight1, PointLight2, num_lights, max_num_lights))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [0.5,3,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.3, 0.9, 0.7, 6, PointLight1, PointLight2, num_lights, max_num_lights))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [-2,3,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.5, 0.9, 0.01, 7, PointLight1, PointLight2, num_lights, max_num_lights))

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

  if(event.key == "l")
  {
    var i;
    for(i=0;i<spheres.length;i++)
    {
      if(scene_type == 'spheres')
      {
        scene.remove(spheres[i].sphereMesh)
      }

      if(spheres[i].lightHandler.num_lights == 1)
      {
        spheres[i].lightHandler.num_lights = 2
      }
      else if(spheres[i].lightHandler.num_lights == 2)
      {
        spheres[i].lightHandler.num_lights = 1
      }
      spheres[i].createMaterials()
      spheres[i].loadMaterial()

      if(scene_type == 'spheres')
      {
        scene.add(spheres[i].sphereMesh)
      }
    }
    
    for(i=0;i<cylinders.length;i++)
    {
      if(scene_type == 'cylinders')
      {
        scene.remove(cylinders[i].cylinderMesh)
      }

      if(cylinders[i].lightHandler.num_lights == 1)
      {
        cylinders[i].lightHandler.num_lights = 2
      }
      else if(cylinders[i].lightHandler.num_lights == 2)
      {
        cylinders[i].lightHandler.num_lights = 1
      }
      cylinders[i].createMaterials()
      cylinders[i].loadMaterial()

      if(scene_type == 'cylinders')
      {
        scene.add(cylinders[i].cylinderMesh)
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