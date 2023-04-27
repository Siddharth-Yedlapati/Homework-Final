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

//Lighting:
const light1 = new THREE.PointLight( 0xffffff, 5, 100 );
light1.position.set( -30, 35 ,30 );
// light1.power = 10000;
// light1.distance = 20;
light1.castShadow = true; 
light1.decay = 2;
scene.add(light1)

const sphereSize = 1;

const pointLightHelper1 = new THREE.PointLightHelper( light1, sphereSize );
pointLightHelper1.color = new THREE.Color(0xffffff);

const lightPos1 = new THREE.Vector3(-30, 35 ,30)

const diffuseColor1 = new THREE.Vector4(1.0,1.0,1.0,1.0)

const ambientColor1 = new THREE.Vector4(1.0,1.0,1.0,1.0)

const specularColor1 = new THREE.Vector4(1.0,0.1,0.1,1.0)

const a1 = 0.5
const b1 = 0.5
const c1 = 4


const light2 = new THREE.PointLight( 0xffffff, 5, 100 );
light2.position.set( 30, 35 ,30 );
// light2.power = 10000;
// light2.distance = 20;
light2.castShadow = true; 
light2.decay = 2;

const pointLightHelper2 = new THREE.PointLightHelper( light2, sphereSize );
pointLightHelper2.color = new THREE.Color(0xffffff);

const lightPos2 = new THREE.Vector3(30, 35 ,30)

const diffuseColor2 = new THREE.Vector4(0.8,0.3,0.3,1.0)

const ambientColor2 = new THREE.Vector4(0.8,0.3,0.3,1.0)

const specularColor2 = new THREE.Vector4(1.0,1.0,1.0,1.0)

const a2 = 0.0
const b2 = 0.0
const c2 = 4


const ambientLight = new THREE.AmbientLight();
ambientLight.color = new THREE.Color(0xffffff);
ambientLight.intensity = 0.07;
scene.add(ambientLight)


window.requestAnimationFrame( () => 
{
	pointLightHelper1.update();
  pointLightHelper2.update();
})

gui.add(light1, 'intensity', 0, 10).name("Light1 Intensity");
gui.add(light2, 'intensity', 0, 10).name("Light2 Intensity");
gui.add(ambientLight, 'intensity', 0, 0.5).name("Ambient Light Intensity");

//Camera:
const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.001, 1000);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 10;
scene.add(camera);

//creating 9 spheres:
var spheres = []
var sphere_props = [
  {
    kDiffuse : 0.9,
  
    kAmbient : 0.9,
  
    kSpecular : 0.9,
    
    alpha : 100
  },
  {
    kDiffuse : 0.3,
  
    kAmbient : 0.2,
  
    kSpecular : 0.3,
    
    alpha : 100
  },
  {
    kDiffuse : 0.3,
  
    kAmbient : 0.2,
  
    kSpecular : 0.3,
    
    alpha : 100
  },
  {
    kDiffuse : 0.3,
  
    kAmbient : 0.2,
  
    kSpecular : 0.3,
    
    alpha : 100
  },
  {
    kDiffuse : 0.3,
  
    kAmbient : 0.2,
  
    kSpecular : 0.3,
    
    alpha : 100
  },
  {
    kDiffuse : 0.3,
  
    kAmbient : 0.2,
  
    kSpecular : 0.3,
    
    alpha : 100
  },
  {
    kDiffuse : 0.3,
  
    kAmbient : 0.2,
  
    kSpecular : 0.3,
    
    alpha : 100
  },
  {
    kDiffuse : 0.3,
  
    kAmbient : 0.2,
  
    kSpecular : 0.3,
    
    alpha : 100
  },
  {
    kDiffuse : 0.3,
  
    kAmbient : 0.2,
  
    kSpecular : 0.3,
    
    alpha : 100
  }
]

spheres.push(new Sphere(camera, scene, 0.4, [3,-3,0], [2.5, 2.5, 2.5], 0xff0000, sphere_props[0], lightPos1, lightPos2, diffuseColor1, diffuseColor2, ambientColor1, ambientColor2, specularColor1, specularColor2, a1, a2, b1, b2, c1, c2))
spheres.push(new Sphere(camera, scene, 0.4, [0.5,-3,0], [2.5, 2.5, 2.5], 0xff0000, sphere_props[1], lightPos1, lightPos2, diffuseColor1, diffuseColor2, ambientColor1, ambientColor2, specularColor1, specularColor2, a1, a2, b1, b2, c1, c2))
spheres.push(new Sphere(camera, scene, 0.4, [-2,-3,0], [2.5, 2.5, 2.5], 0xff0000, sphere_props[2], lightPos1, lightPos2, diffuseColor1, diffuseColor2, ambientColor1, ambientColor2, specularColor1, specularColor2, a1, a2, b1, b2, c1, c2))
spheres.push(new Sphere(camera, scene, 0.4, [3,0,0], [2.5, 2.5, 2.5], 0xff0000, sphere_props[3], lightPos1, lightPos2, diffuseColor1, diffuseColor2, ambientColor1, ambientColor2, specularColor1, specularColor2, a1, a2, b1, b2, c1, c2))
spheres.push(new Sphere(camera, scene, 0.4, [0.5,0,0], [2.5, 2.5, 2.5], 0xff0000, sphere_props[4], lightPos1, lightPos2, diffuseColor1, diffuseColor2, ambientColor1, ambientColor2, specularColor1, specularColor2, a1, a2, b1, b2, c1, c2))
spheres.push(new Sphere(camera, scene, 0.4, [-2,0,0], [2.5, 2.5, 2.5], 0xff0000, sphere_props[5], lightPos1, lightPos2, diffuseColor1, diffuseColor2, ambientColor1, ambientColor2, specularColor1, specularColor2, a1, a2, b1, b2, c1, c2))
spheres.push(new Sphere(camera, scene, 0.4, [3,3,0], [2.5, 2.5, 2.5], 0xff0000, sphere_props[6], lightPos1, lightPos2, diffuseColor1, diffuseColor2, ambientColor1, ambientColor2, specularColor1, specularColor2, a1, a2, b1, b2, c1, c2))
spheres.push(new Sphere(camera, scene, 0.4, [0.5,3,0], [2.5, 2.5, 2.5], 0xff0000, sphere_props[7], lightPos1, lightPos2, diffuseColor1, diffuseColor2, ambientColor1, ambientColor2, specularColor1, specularColor2, a1, a2, b1, b2, c1, c2))
spheres.push(new Sphere(camera, scene, 0.4, [-2,3,0], [2.5, 2.5, 2.5], 0xff0000, sphere_props[8], lightPos1, lightPos2, diffuseColor1, diffuseColor2, ambientColor1, ambientColor2, specularColor1, specularColor2, a1, a2, b1, b2, c1, c2))

//Creating 9 cylinders:
var cylinders = []
var cylinder_props = [
  {
    kDiffuse : 0.3,
  
    kAmbient : 0.2,
  
    kSpecular : 0.3,
    
    alpha : 100
  },
  {
    kDiffuse : 0.3,
  
    kAmbient : 0.2,
  
    kSpecular : 0.3,
    
    alpha : 100
  },
  {
    kDiffuse : 0.3,
  
    kAmbient : 0.2,
  
    kSpecular : 0.3,
    
    alpha : 100
  },
  {
    kDiffuse : 0.3,
  
    kAmbient : 0.2,
  
    kSpecular : 0.3,
    
    alpha : 100
  },
  {
    kDiffuse : 0.3,
  
    kAmbient : 0.2,
  
    kSpecular : 0.3,
    
    alpha : 100
  },
  {
    kDiffuse : 0.3,
  
    kAmbient : 0.2,
  
    kSpecular : 0.3,
    
    alpha : 100
  },
  {
    kDiffuse : 0.3,
  
    kAmbient : 0.2,
  
    kSpecular : 0.3,
    
    alpha : 100
  },
  {
    kDiffuse : 0.3,
  
    kAmbient : 0.2,
  
    kSpecular : 0.3,
    
    alpha : 100
  },
  {
    kDiffuse : 0.3,
  
    kAmbient : 0.2,
  
    kSpecular : 0.3,
    
    alpha : 100
  }
]
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [3,-3,0], [2.5, 2.5, 2.5], 0xff0000, cylinder_props[0], lightPos1, lightPos2, diffuseColor1, diffuseColor2, ambientColor1, ambientColor2, specularColor1, specularColor2, a1, a2, b1, b2, c1, c2))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [0.5,-3,0], [2.5, 2.5, 2.5], 0xff0000, cylinder_props[1], lightPos1, lightPos2, diffuseColor1, diffuseColor2, ambientColor1, ambientColor2, specularColor1, specularColor2, a1, a2, b1, b2, c1, c2))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [-2,-3,0], [2.5, 2.5, 2.5], 0xff0000,cylinder_props[2], lightPos1, lightPos2, diffuseColor1, diffuseColor2, ambientColor1, ambientColor2, specularColor1, specularColor2, a1, a2, b1, b2, c1, c2))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [3,0,0], [2.5, 2.5, 2.5], 0xff0000, cylinder_props[3], lightPos1, lightPos2, diffuseColor1, diffuseColor2, ambientColor1, ambientColor2, specularColor1, specularColor2, a1, a2, b1, b2, c1, c2))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [0.5,0,0], [2.5, 2.5, 2.5], 0xff0000, cylinder_props[4], lightPos1, lightPos2, diffuseColor1, diffuseColor2, ambientColor1, ambientColor2, specularColor1, specularColor2, a1, a2, b1, b2, c1, c2))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [-2,0,0], [2.5, 2.5, 2.5], 0xff0000, cylinder_props[5], lightPos1, lightPos2, diffuseColor1, diffuseColor2, ambientColor1, ambientColor2, specularColor1, specularColor2, a1, a2, b1, b2, c1, c2))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [3,3,0], [2.5, 2.5, 2.5], 0xff0000, cylinder_props[6], lightPos1, lightPos2, diffuseColor1, diffuseColor2, ambientColor1, ambientColor2, specularColor1, specularColor2, a1, a2, b1, b2, c1, c2))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [0.5,3,0], [2.5, 2.5, 2.5], 0xff0000, cylinder_props[7], lightPos1, lightPos2, diffuseColor1, diffuseColor2, ambientColor1, ambientColor2, specularColor1, specularColor2, a1, a2, b1, b2, c1, c2))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [-2,3,0], [2.5, 2.5, 2.5], 0xff0000, cylinder_props[8], lightPos1, lightPos2, diffuseColor1, diffuseColor2, ambientColor1, ambientColor2, specularColor1, specularColor2, a1, a2, b1, b2, c1, c2))

var i;
for(i=0;i<spheres.length;i++)
{
  scene.add(spheres[i].sphereMesh)
}

//const AxesHelper = new THREE.AxesHelper();
//scene.add(AxesHelper);

// The lighting and material configurations for teapot
let teapotConfig = {
  lightPos : new THREE.Vector3(-2, 2, 2),
  diffuseColor : new THREE.Vector4(0.3,0.4,0.9,1.0),
  kDiffuse : 0.9,

  ambientColor : new THREE.Vector4(0.3,0.4,0.9,1.0),
  kAmbient : 0.2,

  specularColor : new THREE.Vector4(1.0,1.0,1.0,1.0),
  kSpecular : 0.7,
  alpha : 100,

  a : 0.0,
  b : 0.0,
  c : 0.2
};

// The lighting and material configurations for sphere
let sphereConfig = {
  lightPos : new THREE.Vector3(2, 2, 2),
  diffuseColor : new THREE.Vector4(0.8,0.3,0.3,1.0),
  kDiffuse : 0.9,

  ambientColor : new THREE.Vector4(0.8,0.3,0.3,1.0),
  kAmbient : 0.2,

  specularColor : new THREE.Vector4(1.0,1.0,1.0,1.0),
  kSpecular : 0.3,
  alpha : 100,

  a : 0.0,
  b : 0.0,
  c : 0.5
};

// Gouraud material for sphere
var sphereMaterial = new THREE.ShaderMaterial( {
  uniforms: {
      "pointLights" : {
          value : [
              {
                  u_lightPos: teapotConfig.lightPos,
                  u_lightTarget: teapotConfig.lightTarget,
                  u_diffuseColor: teapotConfig.diffuseColor,
                  u_specularColor: teapotConfig.specularColor,
                  u_a : teapotConfig.a,
                  u_b : teapotConfig.b,
                  u_c : teapotConfig.c
              },

              {
                  u_lightPos: sphereConfig.lightPos,
                  u_lightTarget: sphereConfig.lightTarget,
                  u_diffuseColor: sphereConfig.diffuseColor,
                  u_specularColor: sphereConfig.specularColor,
                  u_a : sphereConfig.a,
                  u_b : sphereConfig.b,
                  u_c : sphereConfig.c
              }
          ]
      },

      'u_cameraPos' : {value : new THREE.Vector3(
          camera.position.x,
          camera.position.y,
          camera.position.z
      )},

      'u_kDiffuse' : {value : sphereConfig.kDiffuse},
      'u_kAmbient' : {value : sphereConfig.kAmbient},
      'u_kSpecular' : {value : sphereConfig.kSpecular},
      'u_alpha' : {value : sphereConfig.alpha},
      'u_ambientColor' : {value: sphereConfig.ambientColor}
  },
vertexShader: gouraudVertexShader,
fragmentShader: gouraudFragmentShader
} );

sphereMaterial.side = THREE.DoubleSide;

// Default is gouraud
let sphereMesh = new THREE.Mesh( new THREE.SphereGeometry(1, 40, 40), sphereMaterial );

sphereMesh.position.y += 0.2;
sphereMesh.position.x += 0.5;
sphereMesh.position.z += 0.8;
scene.add(sphereMesh);

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