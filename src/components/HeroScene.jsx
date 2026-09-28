
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import Character from "./3d/Character.jsx";
import Particles from "./3d/Particles.jsx";
import FloatingObjects from "./3d/FloatingObjects.jsx";

import { useDeviceCapability } from "../hooks/useDeviceCapability.js";

/*
============================================================
 OPTIMIZED CINEMATIC CAMERA
============================================================

 Performance changes:
 - Camera movement is very subtle
 - No unnecessary calculations
 - Keeps the cinematic mouse-follow effect
============================================================
*/

function CinematicCamera({ pointer, reduced }) {
  const cameraRef = useRef();

  useFrame(() => {
    if (!cameraRef.current || reduced) return;

    const px = pointer?.current?.x ?? 0;
    const py = pointer?.current?.y ?? 0;

    const targetX = px * 0.06;
    const targetY = py * 0.035;

    cameraRef.current.position.x +=
      (targetX - cameraRef.current.position.x) * 0.025;

    cameraRef.current.position.y +=
      (0.2 + targetY - cameraRef.current.position.y) * 0.025;

    cameraRef.current.lookAt(0, 0.1, 0);
  });

  return (
    <perspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 0.2, 6.2]}
      fov={42}
    />
  );
}


/*
============================================================
 HERO SCENE
============================================================
*/

export default function HeroScene({
  pointer,
  speaking = false,
  voiceLevel = 0,
}) {
  const {
    isMobile,
    prefersReducedMotion,
  } = useDeviceCapability();

  /*
  ------------------------------------------------------------
  PERFORMANCE MODE
  ------------------------------------------------------------
  */

  const reduced = isMobile || prefersReducedMotion;

  /*
  Desktop:
    1.25 DPR instead of 2

  Mobile:
    1 DPR

  This alone can make a BIG difference.
  */

  const pixelRatio = isMobile ? 1 : 1.25;

  /*
  Particle count
  */

  const particleCount = isMobile
    ? 12
    : prefersReducedMotion
      ? 0
      : 35;

  return (
    <Canvas
      /*
      --------------------------------------------------------
      GPU PERFORMANCE
      --------------------------------------------------------
      */

      dpr={pixelRatio}

      camera={{
        position: [0, 0.2, 6.2],
        fov: 42,
      }}

      /*
      Disable expensive antialiasing.
      Browser/device will render much faster.
      */

      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}

      /*
      IMPORTANT:
      Shadows removed because robot already has
      lighting + glow to create depth.
      */

      shadows={false}

      style={{
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}

      /*
      Don't render unnecessary frames while hidden.
      */

      frameloop="always"
    >

      {/* ==================================================
          CAMERA
      ================================================== */}

      <CinematicCamera
        pointer={pointer}
        reduced={reduced}
      />


      {/* ==================================================
          LIGHTING
      ================================================== */}

      {/* Base ambient light */}

      <ambientLight
        intensity={0.45}
        color="#181022"
      />


      {/* Main light */}

      <directionalLight
        position={[3, 4, 4]}
        intensity={1.15}
        color="#eee7ff"
      />


      {/* Violet light */}

      <pointLight
        position={[-2.5, 1.5, 2]}
        intensity={6}
        color="#8b5cf6"
        distance={7}
        decay={2}
      />


      {/* Pink rim light */}

      <pointLight
        position={[2.5, 2, -2]}
        intensity={5}
        color="#ec4899"
        distance={7}
        decay={2}
      />


      {/* ==================================================
          3D CONTENT
      ================================================== */}

      <Suspense fallback={null}>

        {/* Robot */}

        <Character
          pointer={pointer}
          speaking={speaking}
          voiceLevel={voiceLevel}
          reducedMotion={prefersReducedMotion}
        />


        {/* Floating objects */}

        {!isMobile && (
          <FloatingObjects
            reduced={reduced}
            speaking={speaking}
          />
        )}


        {/* Lightweight particles */}

        {particleCount > 0 && (
          <Particles
            count={particleCount}
          />
        )}

      </Suspense>

    </Canvas>
  );
}

