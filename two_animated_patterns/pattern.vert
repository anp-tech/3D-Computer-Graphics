#version 120

uniform float    uTime;         // "Time", from Animate( )
varying vec2      vST;          // texture coords

const float PI =     3.14159265;
const float AMP =     0.2;      // amplitude
const float W =     1.5;        // frequency

varying  vec3  vN;              // normal vector
varying  vec3  vL;              // vector from point to light
varying  vec3  vE;              // vector from point to eye

const vec3 LIGHTPOSITION = vec3( 0., 5., 5. );

uniform bool uVS;               // vertext shader 


void
main( )
{
    vec3 vert = gl_Vertex.xyz;
   
    // if vertex shader changes
    
    if (uVS)
    {
        vert.x = vert.x * W * cos(uTime * (2. * PI * vert.y));
        vert.y = vert.y * W * sin(uTime * (2. * PI * vert.x));
        vert.z = vert.z * AMP;
    }
    
    // Fragment Lighting: vertex shader
    
    vST = gl_MultiTexCoord0.st;
    vec4 ECposition = gl_ModelViewMatrix * vec4( vert, 1. );    // eye coordinate position
    vN = normalize( gl_NormalMatrix * gl_Normal );              // normal vector
    vL = LIGHTPOSITION - ECposition.xyz;                        // vector from the point to the light position
    
    vE = vec3( 0., 0., 0. ) - ECposition.xyz;                   // vector from the point to the eye position

    gl_Position = gl_ModelViewProjectionMatrix * vec4( vert, 1. );
}
