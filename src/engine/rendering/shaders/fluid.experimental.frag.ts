export const fluidExperimentalFrag = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uDensityTex;
uniform sampler2D uVelocityXTex;
uniform sampler2D uVelocityYTex;

uniform int uViewMode;
uniform int uPalette;
uniform int uShowGrid;
uniform float uGridSize;

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec3 getPaletteColor(int palette, float v) {
    float vPow = pow(clamp(v, 0.0, 1.0), 0.7);

    if (palette == 1) {
        if (vPow < 0.33) return hsv2rgb(vec3(0.0, 1.0, vPow * 3.0));
        if (vPow < 0.66) return hsv2rgb(vec3((vPow - 0.33) * 0.5, 1.0, 1.0));
        return hsv2rgb(vec3(0.16, 1.0 - (vPow - 0.66) * 3.0, 1.0));
    } else if (palette == 2) {
        if (vPow < 0.5) return hsv2rgb(vec3(0.6, 1.0, vPow * 2.0));
        return hsv2rgb(vec3(0.6 - (vPow - 0.5) * 0.2, 1.0 - (vPow - 0.5) * 2.0, 1.0));
    } else if (palette == 3) {
        if (vPow < 0.5) return hsv2rgb(vec3(0.8, 1.0, vPow * 2.0));
        return hsv2rgb(vec3(0.8 + (vPow - 0.5) * 0.4, 1.0, 1.0));
    }

    if (vPow < 0.33) return hsv2rgb(vec3(0.65, 1.0, vPow * 3.0));
    if (vPow < 0.66) return hsv2rgb(vec3(0.65 - (vPow - 0.33) * 0.4, 1.0, 1.0));
    return hsv2rgb(vec3(0.5, 1.0 - (vPow - 0.66) * 3.0, 1.0));
}

float sampleDensity(vec2 uv) {
    return texture(uDensityTex, clamp(uv, 0.0, 1.0)).r;
}

void main() {
    float d = sampleDensity(vUv);
    float dx = sampleDensity(vUv + vec2(1.0 / max(uGridSize, 1.0), 0.0)) - sampleDensity(vUv - vec2(1.0 / max(uGridSize, 1.0), 0.0));
    float dy = sampleDensity(vUv + vec2(0.0, 1.0 / max(uGridSize, 1.0))) - sampleDensity(vUv - vec2(0.0, 1.0 / max(uGridSize, 1.0)));
    float edge = clamp(length(vec2(dx, dy)) * 1.5, 0.0, 1.0);

    vec4 baseColor = vec4(0.0);

    if (uViewMode == 0) {
        vec3 color = getPaletteColor(uPalette, d + edge * 0.2);
        baseColor = vec4(color + edge * 0.12, clamp(d + edge * 0.15, 0.0, 1.0));
    } else if (uViewMode == 1) {
        float vx = texture(uVelocityXTex, vUv).r;
        float vy = texture(uVelocityYTex, vUv).r;
        float mag = length(vec2(vx, vy)) * 0.12;
        float val = clamp(mag + edge * 0.2, 0.0, 1.0);
        baseColor = vec4(val * 0.25, val * 0.6, val, 1.0);
    } else if (uViewMode == 2) {
        float vx = texture(uVelocityXTex, vUv).r * 0.12;
        float val = clamp(abs(vx) + edge * 0.15, 0.0, 1.0);
        baseColor = vec4(vx > 0.0 ? val : 0.0, vx < 0.0 ? val : 0.0, val * 0.6, 1.0);
    }

    if (uShowGrid == 1) {
        vec2 gridUv = vUv * uGridSize;
        vec2 grid = abs(fract(gridUv - 0.5) - 0.5) / fwidth(gridUv);
        float line = min(grid.x, grid.y);
        float alpha = 1.0 - smoothstep(0.0, 1.5, line);
        baseColor.rgb = mix(baseColor.rgb, vec3(1.0), alpha * 0.25);
        baseColor.a = max(baseColor.a, alpha * 0.25);
    }

    fragColor = baseColor;
}
`;
