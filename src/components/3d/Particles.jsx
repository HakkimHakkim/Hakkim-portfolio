
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useDeviceCapability } from "../../hooks/useDeviceCapability";

/*
============================================================
 LIGHTWEIGHT PARTICLES
============================================================

 Visual quality:

 HIGH   → Desktop → 35 particles
 MEDIUM → Mobile  → 18 particles
 LOW    → Weak/mobile → 8 particles

 The goal is to keep the 3D atmosphere without making
 mobile scrolling/rendering unnecessarily heavy.
============================================================
*/

export default function Particles({ count }) {
  const points = useRef();

  /*
  ------------------------------------------------------------
  DEVICE CAPABILITY
  ------------------------------------------------------------

  quality comes from our central device detection hook.
  */

  const { quality, prefersReducedMotion } =
    useDeviceCapability();

  /*
  ------------------------------------------------------------
  CHOOSE PARTICLE COUNT
  ------------------------------------------------------------

  If a count is explicitly passed from the parent,
  we respect that value.

  Otherwise automatically choose based on device quality.
  */

  const particleCount =
    count ??
    (quality === "low"
      ? 8
      : quality === "medium"
      ? 18
      : 35);

  /*
  ------------------------------------------------------------
  CREATE POSITIONS ONLY WHEN COUNT CHANGES
  ------------------------------------------------------------
  */

  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 2;

      const angle =
        Math.random() * Math.PI * 2;

      const height =
        (Math.random() - 0.5) * 3.5;

      arr[i * 3] =
        Math.cos(angle) * radius;

      arr[i * 3 + 1] =
        height;

      arr[i * 3 + 2] =
        Math.sin(angle) * radius - 0.5;
    }

    return arr;
  }, [particleCount]);

  /*
  ------------------------------------------------------------
  LIGHTWEIGHT ANIMATION
  ------------------------------------------------------------

  Reduced-motion users get almost no animation.

  This also helps low-power devices.
  */

  useFrame((state) => {
    if (!points.current) return;

    /*
    Don't continuously animate if the user prefers
    reduced motion.
    */

    if (prefersReducedMotion) {
      return;
    }

    const time =
      state.clock.getElapsedTime();

    /*
    Very slow rotation.
    */

    points.current.rotation.y =
      time * 0.012;

    /*
    Very small vertical movement.
    */

    points.current.position.y =
      Math.sin(time * 0.15) * 0.08;
  });

  /*
  ------------------------------------------------------------
  RENDER
  ------------------------------------------------------------
  */

  return (
    <points ref={points}>

      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={quality === "low" ? 0.022 : 0.028}
        color="#c4b5fd"
        transparent
        opacity={0.42}
        sizeAttenuation
        depthWrite={false}
      />

    </points>
  );
}

