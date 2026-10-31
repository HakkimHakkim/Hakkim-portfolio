
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useDeviceCapability } from "../../hooks/useDeviceCapability";

/*
============================================================
 PERFORMANCE-OPTIMIZED FLOATING OBJECTS
============================================================

 Desktop:
   3 floating objects

 Normal Mobile:
   2 floating objects

 Low-power Mobile / Reduced Motion:
   1 floating object

 The objects use simple Icosahedron geometry and only
 update position + rotation inside useFrame.
============================================================
*/


/*
============================================================
 FLOATING ORB
============================================================
*/

function FloatingOrb({
  position,
  size,
  color,
  speed,
  emissiveIntensity,
  disableAnimation = false,
}) {
  const mesh = useRef(null);

  /*
  Random starting point.

  This prevents every orb from moving in exactly
  the same animation cycle.
  */

  const offset = useRef(
    Math.random() * Math.PI * 2
  );


  /*
  ----------------------------------------------------------
  ANIMATION
  ----------------------------------------------------------
  */

  useFrame((state) => {
    if (!mesh.current) return;

    /*
    If reduced motion is enabled, don't run
    continuous animation.
    */

    if (disableAnimation) return;

    const time =
      state.clock.elapsedTime * speed +
      offset.current;


    /*
    Gentle vertical floating.
    */

    mesh.current.position.y =
      position[1] +
      Math.sin(time) * 0.18;


    /*
    Very slow single-axis rotation.
    */

    mesh.current.rotation.y =
      time * 0.12;
  });


  /*
  ----------------------------------------------------------
  RENDER
  ----------------------------------------------------------
  */

  return (
    <mesh
      ref={mesh}
      position={position}
      frustumCulled
    >

      {/*
        Icosahedron with detail 0.

        This keeps the geometric/premium look while
        using very little geometry.
      */}

      <icosahedronGeometry
        args={[size, 0]}
      />


      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={
          disableAnimation
            ? emissiveIntensity * 0.7
            : emissiveIntensity
        }
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
  DEVICE CAPABILITY
  ----------------------------------------------------------
  */

  const {
    quality,
    prefersReducedMotion,
  } = useDeviceCapability();


  /*
  ----------------------------------------------------------
  DETERMINE PERFORMANCE MODE
  ----------------------------------------------------------
  */

  const isLowPower =
    quality === "low";

  const isMedium =
    quality === "medium";


  /*
  ----------------------------------------------------------
  BASE OBJECT
  ----------------------------------------------------------
  */

  const objects = [
    {
      position: [-2.1, 1.1, -0.6],
      size: isLowPower ? 0.12 : 0.14,
      color: "#f472b6",
      speed: 0.5,
      emissiveIntensity: 0.55,
    },
  ];


  /*
  ----------------------------------------------------------
  SECOND OBJECT
  ----------------------------------------------------------

  Normal desktop + normal mobile gets this.

  Very low-power devices don't need it.
  */

  if (!isLowPower) {
    objects.push({
      position: [2.3, 1.6, -1.1],
      size: isMedium ? 0.09 : 0.1,
      color: "#f45112",
      speed: 0.4,
      emissiveIntensity: 0.7,
    });
  }


  /*
  ----------------------------------------------------------
  THIRD OBJECT
  ----------------------------------------------------------

  Desktop only.

  This saves GPU work on mobile.
  */

  if (
    quality === "high" &&
    !reduced &&
    !prefersReducedMotion
  ) {
    objects.push({
      position: [1.8, -0.4, 0.4],
      size: 0.08,
      color: "#ff8a5b",
      speed: 0.65,
      emissiveIntensity: 0.6,
    });
  }


  /*
  ----------------------------------------------------------
  FINAL ANIMATION MODE
  ----------------------------------------------------------
  */

  const disableAnimation =
    prefersReducedMotion ||
    isLowPower ||
    reduced;


  /*
  ----------------------------------------------------------
  RENDER
  ----------------------------------------------------------
  */

  return (
    <group>
      {objects.map((object, index) => (
        <FloatingOrb
          key={`${object.color}-${index}`}
          {...object}
          disableAnimation={disableAnimation}
        />
      ))}
    </group>
  );
}


