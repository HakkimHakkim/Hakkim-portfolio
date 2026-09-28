import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/*
============================================================
 GLOBAL PORTFOLIO BACKGROUND
============================================================

 This is NOT the Hero animation.

 It stays behind the ENTIRE website.

 Behaviour:

 1. Mouse movement
    -> particles subtly follow mouse

 2. Page scroll
    -> entire background field reacts to scroll

 3. Continuous idle movement
    -> particles slowly drift

 4. Scroll speed
    -> creates a small energy-wave effect

 5. Mobile
    -> fewer particles for performance

 6. Reduced motion
    -> animation becomes static
============================================================
*/


/* ==========================================================
   PARTICLE FIELD
========================================================== */

function ParticleField({
  pointer,
  scrollVelocity,
  reduced = false,
  mobile = false,
}) {
  const pointsRef = useRef(null);

  const count = mobile ? 90 : 220;

  /*
    Generate particle positions only once.
  */

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      /*
        Large 3D field around the website.
      */

      const radius = 3 + Math.random() * 7;

      const angle =
        Math.random() * Math.PI * 2;

      const y =
        (Math.random() - 0.5) * 10;

      array[i * 3] =
        Math.cos(angle) * radius;

      array[i * 3 + 1] =
        y;

      array[i * 3 + 2] =
        Math.sin(angle) * radius - 3;
    }

    return array;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time =
      state.clock.getElapsedTime();

    /*
      Reduced motion:
      Keep background almost static.
    */

    if (reduced) {
      pointsRef.current.rotation.y = 0;
      pointsRef.current.position.y = 0;
      return;
    }

    /*
    ========================================================
      NORMAL IDLE MOVEMENT
    ========================================================
    */

    pointsRef.current.rotation.y =
      time * 0.018;

    pointsRef.current.rotation.x =
      Math.sin(time * 0.08) * 0.015;

    /*
    ========================================================
      MOUSE MOVEMENT
    ========================================================
    */

    const mouseX =
      pointer.current.x;

    const mouseY =
      pointer.current.y;

    pointsRef.current.position.x =
      THREE.MathUtils.lerp(
        pointsRef.current.position.x,
        mouseX * 0.35,
        0.025
      );

    pointsRef.current.position.y =
      THREE.MathUtils.lerp(
        pointsRef.current.position.y,
        -mouseY * 0.25,
        0.025
      );

    /*
    ========================================================
      SCROLL REACTION
    ========================================================
    */

    const scrollPush =
      THREE.MathUtils.clamp(
        scrollVelocity.current,
        -3,
        3
      );

    pointsRef.current.position.z =
      THREE.MathUtils.lerp(
        pointsRef.current.position.z,
        scrollPush * 0.08,
        0.035
      );

    /*
      Tiny breathing movement.
    */

    pointsRef.current.position.y +=
      Math.sin(time * 0.3) * 0.0008;
  });

  return (
    <points ref={pointsRef}>
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
        opacity={0.32}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}


/* ==========================================================
   FLOATING ENERGY RINGS
========================================================== */

function EnergyRing({
  position,
  scale,
  rotation,
  speed,
  pointer,
  scrollVelocity,
  color,
}) {
  const ref = useRef(null);

  const initialRotation = useMemo(
    () => rotation,
    [rotation]
  );

  useFrame((state) => {
    if (!ref.current) return;

    const time =
      state.clock.getElapsedTime();

    /*
      Continuous rotation.
    */

    ref.current.rotation.z =
      initialRotation[2] +
      time * speed;

    ref.current.rotation.x =
      initialRotation[0] +
      Math.sin(time * 0.25) * 0.08;

    /*
      Mouse parallax.
    */

    ref.current.position.x =
      THREE.MathUtils.lerp(
        ref.current.position.x,
        position[0] +
          pointer.current.x * 0.25,
        0.025
      );

    ref.current.position.y =
      THREE.MathUtils.lerp(
        ref.current.position.y,
        position[1] -
          pointer.current.y * 0.2,
        0.025
      );

    /*
      Scroll energy.
    */

    const velocity =
      THREE.MathUtils.clamp(
        Math.abs(scrollVelocity.current),
        0,
        3
      );

    ref.current.scale.setScalar(
      scale +
        velocity * 0.035
    );
  });

  return (
    <mesh
      ref={ref}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <torusGeometry
        args={[1, 0.008, 8, 96]}
      />

      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.16}
        depthWrite={false}
      />
    </mesh>
  );
}


/* ==========================================================
   ORBITING CORE
========================================================== */

function BackgroundCore({
  pointer,
  scrollVelocity,
}) {
  const coreRef = useRef(null);
  const innerRef = useRef(null);

  useFrame((state) => {
    if (!coreRef.current) return;

    const time =
      state.clock.getElapsedTime();

    /*
      Main floating movement.
    */

    coreRef.current.rotation.x =
      time * 0.12;

    coreRef.current.rotation.y =
      time * 0.16;

    /*
      Mouse interaction.
    */

    coreRef.current.position.x =
      THREE.MathUtils.lerp(
        coreRef.current.position.x,
        pointer.current.x * 0.45,
        0.025
      );

    coreRef.current.position.y =
      THREE.MathUtils.lerp(
        coreRef.current.position.y,
        pointer.current.y * 0.3,
        0.025
      );

    /*
      Scroll makes the energy core pulse.
    */

    const velocity =
      Math.abs(scrollVelocity.current);

    const targetScale =
      1 + Math.min(velocity, 3) * 0.06;

    coreRef.current.scale.lerp(
      new THREE.Vector3(
        targetScale,
        targetScale,
        targetScale
      ),
      0.05
    );

    /*
      Inner core pulse.
    */

    if (innerRef.current) {
      const pulse =
        1 +
        Math.sin(time * 2) * 0.08;

      innerRef.current.scale.setScalar(
        pulse
      );
    }
  });

  return (
    <group
      ref={coreRef}
      position={[0, 0, -2]}
    >
      {/* Outer energy shell */}

      <mesh>
        <icosahedronGeometry
          args={[1.5, 1]}
        />

        <meshBasicMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.055}
        />
      </mesh>

      {/* Inner energy core */}

      <mesh ref={innerRef}>
        <icosahedronGeometry
          args={[0.42, 1]}
        />

        <meshBasicMaterial
          color="#c4b5fd"
          transparent
          opacity={0.08}
        />
      </mesh>
    </group>
  );
}


/* ==========================================================
   GLOBAL SCENE
========================================================== */

function GlobalScene({
  pointer,
  scrollVelocity,
  reduced,
  mobile,
}) {
  return (
    <>
      <ParticleField
        pointer={pointer}
        scrollVelocity={scrollVelocity}
        reduced={reduced}
        mobile={mobile}
      />

      {!reduced && (
        <>
          <EnergyRing
            position={[-3.4, 1.8, -4]}
            scale={1.5}
            rotation={[1.1, 0.4, 0]}
            speed={0.08}
            pointer={pointer}
            scrollVelocity={scrollVelocity}
            color="#8b5cf6"
          />

          <EnergyRing
            position={[3.2, -1.2, -4.5]}
            scale={1.1}
            rotation={[0.7, 0.8, 1]}
            speed={-0.06}
            pointer={pointer}
            scrollVelocity={scrollVelocity}
            color="#ec4899"
          />

          <EnergyRing
            position={[0, 3, -5]}
            scale={0.8}
            rotation={[1.5, 0.2, 0.4]}
            speed={0.04}
            pointer={pointer}
            scrollVelocity={scrollVelocity}
            color="#a78bfa"
          />

          <BackgroundCore
            pointer={pointer}
            scrollVelocity={scrollVelocity}
          />
        </>
      )}
    </>
  );
}


/* ==========================================================
   MAIN COMPONENT
========================================================== */

export default function GlobalBackground() {
  const pointer = useRef({
    x: 0,
    y: 0,
  });

  const scrollVelocity = useRef(0);

  const lastScroll = useRef(
    window.scrollY
  );

  const animationFrame = useRef(null);

  const reducedMotion = useRef(false);

  const mobile = useRef(false);

  useEffect(() => {
    /*
    ========================================================
      DEVICE SETTINGS
    ========================================================
    */

    const reducedQuery =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );

    const mobileQuery =
      window.matchMedia(
        "(max-width: 768px)"
      );

    reducedMotion.current =
      reducedQuery.matches;

    mobile.current =
      mobileQuery.matches;

    /*
    ========================================================
      MOUSE
    ========================================================
    */

    const handlePointerMove = (event) => {
      pointer.current.x =
        (event.clientX /
          window.innerWidth) *
          2 -
        1;

      pointer.current.y =
        (event.clientY /
          window.innerHeight) *
          2 -
        1;
    };

    /*
    ========================================================
      SCROLL
    ========================================================
    */

    const handleScroll = () => {
      const current =
        window.scrollY;

      const difference =
        current -
        lastScroll.current;

      lastScroll.current =
        current;

      scrollVelocity.current =
        difference;

      /*
        Smoothly decay scroll velocity.
      */

      if (!animationFrame.current) {
        animationFrame.current =
          requestAnimationFrame(
            decayScroll
          );
      }
    };

    const decayScroll = () => {
      scrollVelocity.current *=
        0.88;

      if (
        Math.abs(
          scrollVelocity.current
        ) > 0.01
      ) {
        animationFrame.current =
          requestAnimationFrame(
            decayScroll
          );
      } else {
        scrollVelocity.current = 0;
        animationFrame.current = null;
      }
    };

    /*
    ========================================================
      EVENTS
    ========================================================
    */

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      { passive: true }
    );

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    /*
    ========================================================
      CLEANUP
    ========================================================
    */

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      window.removeEventListener(
        "scroll",
        handleScroll
      );

      if (animationFrame.current) {
        cancelAnimationFrame(
          animationFrame.current
        );
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        fixed
        inset-0
        z-0
        overflow-hidden
      "
    >
      <Canvas
        dpr={[
          1,
          mobile.current ? 1.25 : 1.7,
        ]}
        camera={{
          position: [0, 0, 7],
          fov: 55,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference:
            "high-performance",
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <GlobalScene
          pointer={pointer}
          scrollVelocity={scrollVelocity}
          reduced={
            reducedMotion.current
          }
          mobile={mobile.current}
        />
      </Canvas>

      {/* CSS atmospheric glow */}

      <div
        className="
          absolute
          inset-0
          opacity-40
        "
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(124,58,237,0.07), transparent 38%), radial-gradient(circle at 85% 20%, rgba(236,72,153,0.045), transparent 30%)",
        }}
      />
    </div>
  );
}