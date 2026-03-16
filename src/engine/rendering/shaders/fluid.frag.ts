export const fluidFrag = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uDensityTex;
uniform sampler2D uVelocityXTex;
uniform sampler2D uVelocityYTex;

uniform int uViewMode; // 0: density, 1: velocity, 2: pressure
uniform int uPalette; // 0: default, 1: fire, 2: ocean, 3: plasma
uniform int uShowGrid;
uniform float uGridSize;

// Color mapping functions
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec3 getPaletteColor(int palette, float v) {
    float vPow = pow(clamp(v, 0.0, 1.0), 0.8);
    
    if (palette == 1) { // fire
        if (vPow < 0.33) return hsv2rgb(vec3(0.0, 1.0, vPow * 3.0));
        if (vPow < 0.66) return hsv2rgb(vec3((vPow - 0.33) * 0.5, 1.0, 1.0));
        return hsv2rgb(vec3(0.16, 1.0 - (vPow - 0.66) * 3.0, 1.0));
    } else if (palette == 2) { // ocean
        if (vPow < 0.5) return hsv2rgb(vec3(0.6, 1.0, vPow * 2.0));
        return hsv2rgb(vec3(0.6 - (vPow - 0.5) * 0.2, 1.0 - (vPow - 0.5) * 2.0, 1.0));
    } else if (palette == 3) { // plasma
        if (vPow < 0.5) return hsv2rgb(vec3(0.8, 1.0, vPow * 2.0));
        return hsv2rgb(vec3(0.8 + (vPow - 0.5) * 0.4, 1.0, 1.0));
    } else { // default
        if (vPow < 0.33) return hsv2rgb(vec3(0.65, 1.0, vPow * 3.0));
        if (vPow < 0.66) return hsv2rgb(vec3(0.65 - (vPow - 0.33) * 0.4, 1.0, 1.0));
        return hsv2rgb(vec3(0.5, 1.0 - (vPow - 0.66) * 3.0, 1.0));
    }
}

void main() {
    vec4 baseColor = vec4(0.0, 0.0, 0.0, 0.0);
    
    if (uViewMode == 0) { // density
        float d = texture(uDensityTex, vUv).r;
        vec3 color = getPaletteColor(uPalette, d);
        baseColor = vec4(color, clamp(d, 0.0, 1.0));
    } else if (uViewMode == 1) { // velocity
        float vx = texture(uVelocityXTex, vUv).r;
        float vy = texture(uVelocityYTex, vUv).r;
        float mag = length(vec2(vx, vy)) * 0.1; // Adjusted scale for WebGL
        float val = clamp(mag, 0.0, 1.0);
        baseColor = vec4(val * 0.2, val * 0.5, val, 1.0);
    } else if (uViewMode == 2) { // pressure
        float vx = texture(uVelocityXTex, vUv).r * 0.1;
        float val = clamp(abs(vx), 0.0, 1.0);
        baseColor = vec4(vx > 0.0 ? val : 0.0, vx < 0.0 ? val : 0.0, val * 0.5, 1.0);
    }

    if (uShowGrid == 1) {
        vec2 gridUv = vUv * uGridSize;
        vec2 grid = abs(fract(gridUv - 0.5) - 0.5) / fwidth(gridUv);
        float line = min(grid.x, grid.y);
        float alpha = 1.0 - smoothstep(0.0, 1.5, line);
        baseColor.rgb = mix(baseColor.rgb, vec3(1.0), alpha * 0.3);
        baseColor.a = max(baseColor.a, alpha * 0.3);
    }

    fragColor = baseColor;
}
`;
