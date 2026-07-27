# Grainient — React Bits

## Source
- Component: Grainient from React Bits library
- Variant: JavaScript + CSS (ported to TypeScript)
- Dependency: ogl (WebGL abstraction layer)

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color1 | string | '#FF9FFC' | Primary light color |
| color2 | string | '#5227FF' | Secondary accent color |
| color3 | string | '#B497CF' | Deep base color |
| timeSpeed | number | 0.25 | Animation speed multiplier |
| warpStrength | number | 1.0 | Wave warp distortion strength |
| grainAmount | number | 0.1 | Film grain amount |
| zoom | number | 0.9 | Gradient field zoom |
| contrast | number | 1.5 | Final color contrast |
| saturation | number | 1.0 | Final color saturation |
| grainAnimated | boolean | false | Animate grain over time |
| （更多 props 见 React Bits 文档） |

## Files
- Grainient.tsx — Core WebGL component (ogl + GLSL shader)
- Grainient.css — Container styles
- GrainientPage.tsx — Interactive demo page with controls
- prompt.md — This file
