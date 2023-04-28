// export default`
// varying vec3 v_normal;
// varying vec3 v_position;
// varying mat4 v_viewMatrix;

// void main() {
//     gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );

//     v_normal = normalMatrix * normal;
//     v_position = (modelMatrix * vec4( position, 1.0)).xyz;
//     v_viewMatrix = viewMatrix;
// }
// `;
export default`
varying vec3 v_normal;
varying vec3 v_position;
varying mat4 v_viewMatrix;
varying vec2 tex_coord;

uniform vec3 u_SphereCenter;
uniform sampler2D u_texture;



vec2 SphereToCylinderMapping()
{

  float r_sphere = 0.5;
  float r_cylinder;
  vec3 z_axis = vec3(0, 0, 1);
  vec3 y_axis = vec3(0, 1, 0);
  vec3 x_axis = vec3(1, 0, 0);
  // vec3 z_axis = vec3(0, 1, 0);
  // vec3 y_axis = vec3(1, 0, 0);
  // vec3 x_axis = vec3(0, 0, 1);
  v_position[0] = v_position[0] - u_SphereCenter[0];
  v_position[1] = v_position[1] - u_SphereCenter[1];
  v_position[2] = v_position[2] - u_SphereCenter[2];

  // v_position[1] = v_position[1]*0.8;
  // v_position[2] = v_position[2]*0.3;
  // v_position[0] = v_position[0]*0.3;

  vec3 position_vec = normalize(v_position);
  float x_sphere = (r_sphere*position_vec[2]);
  float y_sphere = (r_sphere*position_vec[0]);
  float z_sphere = (r_sphere*position_vec[1]);
  if((v_position[1] <= -1.0 || v_position[1] >= 1.0)){
    x_sphere = position_vec[2];
    z_sphere = position_vec[1];
    y_sphere = sqrt((r_sphere)*(r_sphere) - (x_sphere)*(x_sphere) - (z_sphere)*(z_sphere));
  }

  float x_newpos = x_sphere;
  float y_newpos = y_sphere;
  float z_newpos = z_sphere;

  vec3 Sp = vec3(0, 0, 1);
  vec3 Se = vec3(0, 1, 0);
  vec3 Sn1 = vec3(x_newpos, y_newpos, z_newpos);
  float len = length(Sn1);
  vec3 Sn = normalize(Sn1);
  vec3 cross_P = vec3(0, 0, 0);
  
  float phi = acos(-(dot(Sn, Sp)));
  float u;
  float theta;
  float v = phi/3.14159;
  if(v == 1.0 || v == 0.0){
    u = 0.0;
  }
  else{
    theta = acos((dot(Se, Sn))/sin(phi));
    theta = theta/(2.0*(3.14159));
  }

  cross_P[0] = Sp[1] * Se[2] - Sp[2] * Se[1];
  cross_P[1] = Sp[2] * Se[0] - Sp[0] * Se[2];
  cross_P[2] = Sp[0] * Se[1] - Sp[1] * Se[0];

  if(cross_P[0]*Sn[0] + cross_P[1]*Sn[1] + cross_P[2]*Sn[2] > 0.0){
    u = theta;
  }
  else{
    u = 1.0 - theta;
  }
  vec2 tc;
  // if((v_position[1] <= -1.0)){
  //   float x_sp = v_position[2];
  //   float y_sp = v_position[0];
  //   float z_sp = sqrt((r_sphere)*(r_sphere) - (x_sp)*(x_sp) - (y_sp)*(y_sp));
  //   tc = vec2(0, 0);
  //   return tc;
  // }

  tc = vec2(u,v);
  return tc;

}

vec2 CylinderMapping()
{
  float h_cylinder = 1.0;
  float r_cylinder = 0.5;
  // vec3 vertex_pos = normalize(v_position)
  float x_cylinder = v_position[0];
  float y_cylinder = v_position[1];
  float z_cylinder = v_position[2];
  vec3 x_axis = vec3(1, 0, 0);
  // vec3 z_axis = vec3(0, 0, 1);
  // vec3 y_axis = vec3(0, 1, 0);
  // vec3 x_axis = vec3(1, 0, 0);
  // float v = z_cylinder/h_cylinder;
  // float u;
  // float u1 = (acos(x_cylinder/r_cylinder))/(2.0*(3.1459));
  // if(y_cylinder < 0.0){
  //   u = 1.0 - u1;
  // }
  // else{
  //   u = u1;
  // }
  // vec2 tc = vec2(u, v);
  // return tc;
  float u;
  // u = acos(x_cylinder/r_cylinder)/(2.0*3.1459);
  // u = r_cylinder*cos((2.0)*(3.1459)*x_cylinder);
  u = (atan(z_cylinder/x_cylinder))/((2.0)*(3.1459));
  float v;
  v = (y_cylinder)/h_cylinder;
  vec2 tc = vec2(u, v);
  return tc;

  
}

void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );

    v_normal = normalMatrix * normal;
    v_position = (modelMatrix * vec4( position, 1.0)).xyz;
    v_viewMatrix = viewMatrix;

    tex_coord = SphereToCylinderMapping();
    // tex_coord = CylinderMapping();
    // tex_coord = uv;
    
}
`;

