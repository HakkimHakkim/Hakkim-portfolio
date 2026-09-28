
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

 Desktop:
 - Subtle mouse-follow camera
 - Smooth cinematic movement

 Mobile:
 - Camera stays static
 - No unnecessary camera calculations
============================================================
*/

function CinematicCamera({
  pointer,
  reduced,
  isMobile,
}) {
  const cameraRef = useRef();

  useFrame(() => {
    /*
    ----------------------------------------------------------
    MOBILE / REDUCED MOTION
    ----------------------------------------------------------

    Don't run camera animation when it isn't needed.
    */

    if (
      !cameraRef.current ||
      reduced ||
      isMobile
    ) {
      return;
    }

    const px =
      pointer?.current?.x ?? 0;

    const py =
      pointer?.current?.y ?? 0;

    const targetX =
      px * 0.06;

    const targetY =
      py * 0.035;

    /*
    Smooth horizontal movement.
    */

    cameraRef.current.position.x +=
      (targetX -
        cameraRef.current.position.x) *
      0.025;

    /*
    Smooth vertical movement.
    */

    cameraRef.current.position.y +=
      (
        0.2 +
        targetY -
        cameraRef.current.position.y
      ) * 0.025;

    /*
    Keep camera focused on the character.
    */

    cameraRef.current.lookAt(
      0,
      0.1,
      0
    );
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
  /*
  ----------------------------------------------------------
  DEVICE CAPABILITY
  ----------------------------------------------------------
  */

  const {
    isMobile,
    isLowPower,
    quality,
    prefersReducedMotion,
  } = useDeviceCapability();


  /*
  ----------------------------------------------------------
  PERFORMANCE MODE
  ----------------------------------------------------------

  Reduced mode is used for:
  - mobile
  - low-power devices
  - reduced-motion preference
  */

  const reduced =
    isMobile ||
    isLowPower ||
    prefersReducedMotion;


  /*
  ----------------------------------------------------------
  DEVICE PIXEL RATIO
  ----------------------------------------------------------

  Higher DPR = more pixels rendered = more GPU work.

  Desktop:
    1.25

  Normal mobile:
    1

  Low-power mobile:
    0.75
  */

  const pixelRatio =
    quality === "low"
      ? 0.75
      : isMobile
      ? 1
      : 1.25;


  /*
  ----------------------------------------------------------
  FLOATING OBJECTS
  ----------------------------------------------------------

  Desktop only.

  FloatingObjects component also has its own
  quality logic, but completely avoiding mounting
  it on mobile saves additional work.
  */

  const showFloatingObjects =
    quality === "high" &&
    !isMobile &&
    !prefersReducedMotion;


  /*
  ----------------------------------------------------------
  LIGHTING
  ----------------------------------------------------------

  Desktop gets the full lighting setup.

  Mobile gets fewer expensive lights.
  */

  const useFullLighting =
    quality === "high";


  return (
    <Canvas

      /*
      ========================================================
      GPU PERFORMANCE
      ========================================================
      */

      dpr={pixelRatio}

      camera={{
        position: [0, 0.2, 6.2],
        fov: 42,
      }}

      gl={{
        /*
        Disable MSAA-style antialiasing.
        This reduces GPU workload.
        */

        antialias: false,

        /*
        Transparent canvas.
        */

        alpha: true,

        /*
        Ask browser for a performance-oriented GPU context.
        */

        powerPreference: "high-performance",

        /*
        We don't need stencil buffers.
        */

        stencil: false,

        /*
        Depth buffer is still required for proper
        3D object rendering.
        */

        depth: true,
      }}

      /*
      Shadows are disabled globally.

      This is important for mobile performance.
      */

      shadows={false}

      style={{
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}

      /*
      The scene contains continuously animated
      content such as the character.

      Therefore we keep the render loop active.
      */

      frameloop="always"
    >

      {/* ==================================================
          CAMERA
      ================================================== */}

      <CinematicCamera
        pointer={pointer}
        reduced={reduced}
        isMobile={isMobile}
      />


      {/* ==================================================
          BASE LIGHT
      ================================================== */}

      <ambientLight
        intensity={
          quality === "low"
            ? 0.6
            : 0.45
        }
        color="#181022"
      />


      {/* ==================================================
          MAIN LIGHT
      ================================================== */}

      <directionalLight
        position={[3, 4, 4]}
        intensity={
          quality === "low"
            ? 0.8
            : 1.15
        }
        color="#eee7ff"
      />


      {/* ==================================================
          DESKTOP ACCENT LIGHTS
          ================================================== */}

      {useFullLighting && (
        <>
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
        </>
      )}


      {/* ==================================================
          3D CONTENT
          ================================================== */}

      <Suspense fallback={null}>

        {/* --------------------------------------------------
            ROBOT
            -------------------------------------------------- */}

        <Character
          pointer={pointer}
          speaking={speaking}
          voiceLevel={voiceLevel}
          reducedMotion={reduced}
        />


        {/* --------------------------------------------------
            FLOATING OBJECTS
            -------------------------------------------------- */}

        {showFloatingObjects && (
          <FloatingObjects
            reduced={reduced}
          />
        )}


        {/* --------------------------------------------------
            PARTICLES
            --------------------------------------------------

            Particles.jsx now decides its own particle
            count based on device quality.

            So we don't hardcode mobile count here.
            -------------------------------------------------- */}

        {!prefersReducedMotion && (
          <Particles />
        )}

      </Suspense>

    </Canvas>
  );
}
