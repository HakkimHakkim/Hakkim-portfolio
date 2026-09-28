import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

/*
============================================================
 PERFORMANCE-OPTIMIZED FLOATING OBJECT
============================================================

 Same visual idea:
 - Pink orb
 - Violet orb
 - Small lavender orb

 Optimized:
 - Only position + one rotation update
 - Lower geometry complexity
 - Reuses animation calculations
============================================================
*/

function FloatingOrb({
  position,
  size,
  color,
  speed,
  emissiveIntensity,
}) {
  const mesh = useRef(null);

  /*
  Random starting point so every orb doesn't
  move at exactly the same time.
  */
  const offset = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (!mesh.current) return;

    const time =
      state.clock.elapsedTime * speed +
      offset.current;

    /*
    Gentle floating movement.
    */

    mesh.current.position.y =
      position[1] +
      Math.sin(time) * 0.18;

    /*
    Only ONE rotation is needed.
    Two independent rotations were unnecessary.
    */

    mesh.current.rotation.y =
      time * 0.12;
  });

  return (
    <mesh
      ref={mesh}
      position={position}
      frustumCulled
    >
      {/*
        Detail = 0

        This is already very lightweight.
        Keeping icosahedron gives the premium
        geometric look without expensive geometry.
      */}

      <icosahedronGeometry
        args={[size, 0]}
      />

      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={emissiveIntensity}
        roughness={0.35}
        metalness={0.25}
      />
    </mesh>
  );
}


/*
============================================================
 FLOATING OBJECTS
============================================================
*/

export default function FloatingObjects({
  reduced = false,
}) {

  /*
  ----------------------------------------------------------
  Base objects
  ----------------------------------------------------------
  */

  const objects = [
    {
      position: [-2.1, 1.1, -0.6],
      size: 0.14,
      color: "#f472b6",
      speed: 0.5,
      emissiveIntensity: 0.55,
    },

    {
      position: [2.3, 1.6, -1.1],
      size: 0.1,
      color: "#8b5cf6",
      speed: 0.4,
      emissiveIntensity: 0.7,
    },
  ];


  /*
  ----------------------------------------------------------
  Third object only on desktop / normal motion
  ----------------------------------------------------------
  */

  if (!reduced) {
    objects.push({
      position: [1.8, -0.4, 0.4],
      size: 0.08,
      color: "#c4b5fd",
      speed: 0.65,
      emissiveIntensity: 0.6,
    });
  }


  /*
  ----------------------------------------------------------
  Render
  ----------------------------------------------------------
  */

  return (
    <group>
      {objects.map((object, index) => (
        <FloatingOrb
          key={index}
          {...object}
        />
      ))}
    </group>
  );
}