import "./style.css";
import * as THREE from "three";
import gouraudVertexShader from "./gouraudVertexShader.glsl.js";
import gouraudFragmentShader from "./gouraudFragmentShader.glsl.js";
import phongVertexShader from "./phongVertexShader.glsl.js";
import phongFragmentShader from "./phongFragmentShader.glsl.js";
import { LightHandler } from "./lightHandler.js";

export class Cylinder
{
    constructor(camera, scene, radius, height, position, scale, ambientColor, kDiffuse, kAmbient, kSpecular, alpha, PointLight1, PointLight2, num_lights, max_num_lights)
    {
        this.radius = radius
        this.height = height
        this.position = position
        this.scale = scale
        this.shader_type = "gouraud"
        this.scene = scene

        this.camera = camera
        this.ambientColor = ambientColor
        this.kDiffuse = kDiffuse
        this.kAmbient = kAmbient
        this.kSpecular = kSpecular
        this.alpha = alpha

        this.lightHandler = new LightHandler([PointLight1, PointLight2], num_lights, max_num_lights)

        this.PointLights = []

        var i;
        for(i=0;i<this.lightHandler.max_num_lights;i++)
        {
            this.PointLights.push({
                            u_lightPos: this.lightHandler.lights[i].lightPos,
                            u_lightTarget: this.lightHandler.lights[i].lightTarget,
                            u_diffuseColor: this.lightHandler.lights[i].diffuseColor,
                            u_specularColor: this.lightHandler.lights[i].specularColor,
                            u_a : this.lightHandler.lights[i].a,
                            u_b : this.lightHandler.lights[i].b,
                            u_c : this.lightHandler.lights[i].c
            })
        }

        this.createMaterials()
        
        this.cylinderGeometry = new THREE.CylinderGeometry(this.radius, this.radius, this.height, 40, 40);
        this.cylinderMaterial = this.gouraudMaterial
        this.cylinderMesh = new THREE.Mesh(this.cylinderGeometry, this.cylinderMaterial);
        this.cylinderMesh.position.set(this.position[0], this.position[1], this.position[2]);
        this.cylinderMesh.scale.set(this.scale[0], this.scale[1], this.scale[2]);
    }

    createMaterials()
    {
        this.phongMaterial = new THREE.ShaderMaterial(  
        {
            uniforms: {
                
                "num_lights" : { 
                    value: this.lightHandler.num_lights
                },

                "pointLights" : {
                    value : this.PointLights
                },
          
                'u_cameraPos' : {value : new THREE.Vector3(
                    this.camera.position.x,
                    this.camera.position.y,
                    this.camera.position.z
                )},

          
                'u_kDiffuse' : {value : this.kDiffuse},
                'u_kAmbient' : {value : this.kAmbient},
                'u_kSpecular' : {value : this.kSpecular},
                'u_alpha' : {value : this.alpha},
                'u_ambientColor' : {value: this.ambientColor},
                'u_texture' : {value: new THREE.TextureLoader().load("/textures/checkerboard.png")}
            },
          vertexShader: phongVertexShader,
          fragmentShader: phongFragmentShader
          }
        );
        
        this.phongMaterial.side = THREE.DoubleSide



        this.gouraudMaterial = new THREE.ShaderMaterial(         {
            uniforms: {
                
                "num_lights" : { 
                    value: this.lightHandler.num_lights
                },

                "pointLights" : {
                    value : this.PointLights
                },
          
                'u_cameraPos' : {value : new THREE.Vector3(
                    this.camera.position.x,
                    this.camera.position.y,
                    this.camera.position.z
                )},
          
                'u_kDiffuse' : {value : this.kDiffuse},
                'u_kAmbient' : {value : this.kAmbient},
                'u_kSpecular' : {value : this.kSpecular},
                'u_alpha' : {value : this.alpha},
                'u_ambientColor' : {value: this.ambientColor}
    
            },
          vertexShader: gouraudVertexShader,
          fragmentShader: gouraudFragmentShader
          } );
        
        this.gouraudMaterial.side = THREE.DoubleSide
    }

    changeShading()
    {
        if(this.shader_type == "gouraud")
        {
            this.shader_type = "phong"
            this.cylinderMaterial = this.phongMaterial
            this.scene.remove(this.cylinderMesh)
            this.cylinderMesh = new THREE.Mesh(this.cylinderGeometry, this.cylinderMaterial);
            this.cylinderMesh.position.set(this.position[0], this.position[1], this.position[2]);
            this.cylinderMesh.scale.set(this.scale[0], this.scale[1], this.scale[2]);
            this.scene.add(this.cylinderMesh)
        }
        else if(this.shader_type == "phong")
        {
            this.shader_type = "gouraud"
            this.cylinderMaterial = this.gouraudMaterial
            this.scene.remove(this.cylinderMesh)
            this.cylinderMesh = new THREE.Mesh(this.cylinderGeometry, this.cylinderMaterial);
            this.cylinderMesh.position.set(this.position[0], this.position[1], this.position[2]);
            this.cylinderMesh.scale.set(this.scale[0], this.scale[1], this.scale[2]);
            this.scene.add(this.cylinderMesh)
        }
    }

    loadMaterial()
    {
        if(this.shader_type == "phong")
        {
            this.cylinderMaterial = this.phongMaterial
            this.cylinderMesh = new THREE.Mesh(this.cylinderGeometry, this.cylinderMaterial);
            this.cylinderMesh.position.set(this.position[0], this.position[1], this.position[2]);
            this.cylinderMesh.scale.set(this.scale[0], this.scale[1], this.scale[2]);
        }
        else if(this.shader_type == "gouraud")
        {
            this.cylinderMaterial = this.gouraudMaterial
            this.cylinderMesh = new THREE.Mesh(this.cylinderGeometry, this.cylinderMaterial);
            this.cylinderMesh.position.set(this.position[0], this.position[1], this.position[2]);
            this.cylinderMesh.scale.set(this.scale[0], this.scale[1], this.scale[2]);
        }
    }
}