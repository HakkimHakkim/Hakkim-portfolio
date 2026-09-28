Put your character model here as:

    character.glb

That's it — src/components/3d/Character.jsx already looks for
/models/character.glb automatically. Until you add one, the site
shows a procedural fallback character built from primitives, so
nothing breaks.

Tips for the model:
- Keep it under ~5–10MB (compress with gltf-transform or the
  Blender glTF exporter's Draco compression option) so the hero
  loads quickly.
- A T-pose or relaxed idle pose both work fine — the component
  only adds floating + rotation, it doesn't require a rig.
- If your model's scale/position looks off, adjust the `scale`
  and `position` props on the `<primitive>` element inside
  GLTFCharacter in Character.jsx.
