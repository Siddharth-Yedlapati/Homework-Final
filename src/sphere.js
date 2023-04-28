import "./style.css";
import * as THREE from "three";
import gouraudVertexShader from "./gouraudVertexShader.glsl.js";
import gouraudFragmentShader from "./gouraudFragmentShader.glsl.js";
import phongVertexShader from "./phongVertexShader.glsl.js";
import phongFragmentShader from "./phongFragmentShader.glsl.js";

export class Sphere
{
    constructor(camera, scene, radius, position, scale, ambientColor, kDiffuse, kAmbient, kSpecular, alpha, PointLight1, PointLight2)
    {
        this.radius = radius
        this.position = position
        this.scale = scale
        this.shader_type = "gouraud"
        this.scene = scene
        this.PointLight1 = PointLight1
        this.PointLight2 = PointLight2


        this.phongMaterial = new THREE.ShaderMaterial(  
        {
            uniforms: {
                "pointLights" : {
                    value : [
                        {
                            u_lightPos: this.PointLight1.lightPos,
                            u_lightTarget: this.PointLight1.lightTarget,
                            u_diffuseColor: this.PointLight1.diffuseColor,
                            u_specularColor: this.PointLight1.specularColor,
                            u_a : this.PointLight1.a,
                            u_b : this.PointLight1.b,
                            u_c : this.PointLight1.c
                        },
          
                        {
                            u_lightPos: this.PointLight2.lightPos,
                            u_lightTarget: this.PointLight2.lightTarget,
                            u_diffuseColor: this.PointLight2.diffuseColor,
                            u_specularColor: this.PointLight2.specularColor,
                            u_a : this.PointLight2.a,
                            u_b : this.PointLight2.b,
                            u_c : this.PointLight2.c
                        }
                    ]
                },
          
                'u_cameraPos' : {value : new THREE.Vector3(
                    camera.position.x,
                    camera.position.y,
                    camera.position.z
                )},

          
                'u_kDiffuse' : {value : kDiffuse},
                'u_kAmbient' : {value : kAmbient},
                'u_kSpecular' : {value : kSpecular},
                'u_alpha' : {value : alpha},
                'u_ambientColor' : {value: ambientColor},
                'u_texture' : {value: new THREE.TextureLoader().load("/textures/checkerboard.png")}
            },
          vertexShader: phongVertexShader,
          fragmentShader: phongFragmentShader
          }
        );
        
        this.phongMaterial.side = THREE.DoubleSide



        this.gouraudMaterial = new THREE.ShaderMaterial(         {
            uniforms: {
                "pointLights" : {
                    value : [
                        {
                            u_lightPos: this.PointLight1.lightPos,
                            u_lightTarget: this.PointLight1.lightTarget,
                            u_diffuseColor: this.PointLight1.diffuseColor,
                            u_specularColor: this.PointLight1.specularColor,
                            u_a : this.PointLight1.a,
                            u_b : this.PointLight1.b,
                            u_c : this.PointLight1.c
                        },
          
                        {
                            u_lightPos: this.PointLight2.lightPos,
                            u_lightTarget: this.PointLight2.lightTarget,
                            u_diffuseColor: this.PointLight2.diffuseColor,
                            u_specularColor: this.PointLight2.specularColor,
                            u_a : this.PointLight2.a,
                            u_b : this.PointLight2.b,
                            u_c : this.PointLight2.c
                        }
                    ]
                },
          
                'u_cameraPos' : {value : new THREE.Vector3(
                    camera.position.x,
                    camera.position.y,
                    camera.position.z
                )},
          
                'u_kDiffuse' : {value : kDiffuse},
                'u_kAmbient' : {value : kAmbient},
                'u_kSpecular' : {value : kSpecular},
                'u_alpha' : {value : alpha},
                'u_ambientColor' : {value: ambientColor}
    
            },
          vertexShader: gouraudVertexShader,
          fragmentShader: gouraudFragmentShader
          } );
        
        this.gouraudMaterial.side = THREE.DoubleSide


        this.sphereGeometry = new THREE.SphereGeometry(this.radius, 40, 40);
        this.sphereMaterial = this.gouraudMaterial
        this.sphereMesh = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial);
        this.sphereMesh.position.set(this.position[0], this.position[1], this.position[2]);
        this.sphereMesh.scale.set(this.scale[0], this.scale[1], this.scale[2]);
    }

    changeShading()
    {
        if(this.shader_type == "gouraud")
        {
            this.shader_type = "phong"
            this.sphereMaterial = this.phongMaterial
            this.scene.remove(this.sphereMesh)
            this.sphereMesh = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial);
            this.sphereMesh.position.set(this.position[0], this.position[1], this.position[2]);
            this.sphereMesh.scale.set(this.scale[0], this.scale[1], this.scale[2]);
            this.scene.add(this.sphereMesh)
        }
        else if(this.shader_type == "phong")
        {
            this.shader_type = "gouraud"
            this.sphereMaterial = this.gouraudMaterial
            this.scene.remove(this.sphereMesh)
            this.sphereMesh = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial);
            this.sphereMesh.position.set(this.position[0], this.position[1], this.position[2]);
            this.sphereMesh.scale.set(this.scale[0], this.scale[1], this.scale[2]);
            this.scene.add(this.sphereMesh)
        }
    }
}