
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/*
============================================================
 LIGHTWEIGHT PARTICLES
============================================================

 Optimized for portfolio performance.

 Desktop:
   ~35 particles

 Mobile:
   ~12 particles

 No expensive glow/bloom.
============================================================
*/

export default function Particles({ count = 35 }) {
  const points = useRef();

  /*
  ------------------------------------------------------------
  CREATE POSITIONS ONLY ONCE
  ------------------------------------------------------------
  */

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
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
  }, [count]);


  /*
  ------------------------------------------------------------
  LIGHTWEIGHT ANIMATION
  ------------------------------------------------------------
  */

  useFrame((state) => {
    if (!points.current) return;

    const time =
      state.clock.getElapsedTime();

    points.current.rotation.y =
      time * 0.012;

    points.current.position.y =
      Math.sin(time * 0.15) * 0.08;
  });


  return (
    <points ref={points}>

      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.028}
        color="#c4b5fd"
        transparent
        opacity={0.42}
        sizeAttenuation
        depthWrite={false}
      />

    </points>
  );
}

