export default `#version 300 es
#define SHADER_NAME simple-mesh-layer-fs

precision highp float;

uniform bool hasTexture;
uniform sampler2D sampler;
uniform vec4 color;
uniform bool flatShading;

in vec2 vTexCoord;
in vec3 cameraPosition;
in vec3 normals_commonspace;
in vec4 position_commonspace;
in vec4 vColor;

out vec4 fragColor;

void main(void) {
  geometry.uv = vTexCoord;

  vec3 normal;
  if (flatShading) {
    normal = normalize(cross(dFdx(position_commonspace.xyz), dFdy(position_commonspace.xyz)));
  } else {
    normal = normals_commonspace;
  }

  vec4 color = hasTexture ? texture(sampler, vTexCoord) : vColor / 255.;
  vec3 lightColor = lighting_getLightColor(color.rgb * 255., cameraPosition, position_commonspace.xyz, normal);
  fragColor = vec4(lightColor / 255., color.a);

  DECKGL_FILTER_COLOR(fragColor, geometry);
}
`;