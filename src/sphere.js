import "./style.css";
import * as THREE from "three";
import gouraudVertexShader from "./gouraudVertexShader.glsl.js";
import gouraudFragmentShader from "./gouraudFragmentShader.glsl.js";
import phongVertexShader from "./phongVertexShader.glsl.js";
import phongFragmentShader from "./phongFragmentShader.glsl.js";

export class Sphere
{
    constructor(camera, scene, radius, position, scale, ambientColor, kDiffuse, kAmbient, kSpecular, alpha)
    {
        this.radius = radius
        this.position = position
        this.scale = scale
        this.shader_type = "gouraud"
        this.scene = scene

        let PointLight1 = {
            lightPos : new THREE.Vector3(-4, 2, 2),
            diffuseColor : new THREE.Vector4(0.8,0.2,0.9,1.0),
            kDiffuse : 0.9,
            
            kAmbient : 0.2,
        
            specularColor : new THREE.Vector4(1.0,1.0,1.0,1.0),
            kSpecular : 0.7,
            alpha : 100,
        
            a : 0.0,
            b : 0.0,
            c : 0.2
        };
        
        let PointLight2 = {
            lightPos : new THREE.Vector3(4, 2, 2),
            diffuseColor : new THREE.Vector4(0.1,0.3,0.1,1.0),
            kDiffuse : 0.2,
        

            kAmbient : 0.5,
        
            specularColor : new THREE.Vector4(0.2,0.2,0.8,0.1),
            kSpecular : 0.9,
            alpha : 100,
        
            a : 0.0,
            b : 0.0,
            c : 0.2
        };

        this.phongMaterial = new THREE.ShaderMaterial(  
        {
            uniforms: {
                "pointLights" : {
                    value : [
                        {
                            u_lightPos: PointLight1.lightPos,
                            u_lightTarget: PointLight1.lightTarget,
                            u_diffuseColor: PointLight1.diffuseColor,
                            u_specularColor: PointLight1.specularColor,
                            u_a : PointLight1.a,
                            u_b : PointLight1.b,
                            u_c : PointLight1.c
                        },
          
                        {
                            u_lightPos: PointLight2.lightPos,
                            u_lightTarget: PointLight2.lightTarget,
                            u_diffuseColor: PointLight2.diffuseColor,
                            u_specularColor: PointLight2.specularColor,
                            u_a : PointLight2.a,
                            u_b : PointLight2.b,
                            u_c : PointLight2.c
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
                            u_lightPos: PointLight1.lightPos,
                            u_lightTarget: PointLight1.lightTarget,
                            u_diffuseColor: PointLight1.diffuseColor,
                            u_specularColor: PointLight1.specularColor,
                            u_a : PointLight1.a,
                            u_b : PointLight1.b,
                            u_c : PointLight1.c
                        },
          
                        {
                            u_lightPos: PointLight2.lightPos,
                            u_lightTarget: PointLight2.lightTarget,
                            u_diffuseColor: PointLight2.diffuseColor,
                            u_specularColor: PointLight2.specularColor,
                            u_a : PointLight2.a,
                            u_b : PointLight2.b,
                            u_c : PointLight2.c
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