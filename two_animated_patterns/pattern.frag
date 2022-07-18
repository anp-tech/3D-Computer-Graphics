#version 120

uniform float    uTime;             // "Time", from Animate( )
      
// Per-fragment Lighting
uniform float uKa, uKd, uKs;        // coefficients of each type of lighting
uniform vec3 uColor;                // object color
uniform vec3 uSpecularColor;        // light color
uniform float uShininess;           // specular exponent

varying vec2 vST;                   // texture cords
varying vec3 vN;                    // normal vector
varying vec3 vL;                    // vector from point to light
varying vec3 vE;                    // vector from point to eye

// from main.cpp
uniform bool uFS;                   // fragment shader
uniform float uS0, uT0;
uniform float uSize;

const float PI =     3.14159265;

float s;
float t;


void
main( )
{
    vec3 Normal = normalize(vN);
    vec3 Light = normalize(vL);
    vec3 Eye = normalize(vE);
    
    vec3 myColor = uColor;
    s = uS0;
    t = uT0;
    
    // if fragment shader changes
    
    if (uFS)
    {
        s =  t * cos(uTime * (2. * PI));
        t =  s * sin(uTime * (2. * PI));
    }
    
    // set color to red for the current fragment
    
    if( s  + vST.s + uSize <= vST.t/2 + t/2 + uSize/2)
       
    {
        myColor = vec3( 1., 0., 0. );
    }
    
    // Fragment Lighting
    
    vec3 ambient = uKa * myColor;

    float d = max( dot(Normal,Light), 0. ); // only do diffuse if the light can see the point
    vec3 diffuse = uKd * d * myColor;

    float s = 0.;
    if( dot(Normal,Light) > 0. )            // only do specular if the light can see the point
    {
    vec3 ref = normalize( reflect( -Light, Normal ) );
    s = pow( max( dot(Eye,ref),0. ), uShininess );
    }
    vec3 specular = uKs * s * uSpecularColor;
    gl_FragColor = vec4( ambient + diffuse + specular, 1. );
}

