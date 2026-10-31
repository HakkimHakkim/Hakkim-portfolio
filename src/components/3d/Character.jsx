
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

/*
============================================================
ROBOT PART
============================================================

Lightweight assembly animation.

Performance optimizations:
- Reduced geometry complexity
- No shadows
- GSAP timeline cleaned properly
- Reduced-motion support
- Mobile-friendly animation handling
============================================================
*/

function RobotPart({
  children,
  position,
  rotation = [0, 0, 0],
  scale = 1,
  delay = 0,
  from = "random",
  reducedMotion = false,
}) {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    /*
    --------------------------------------------------------
    REDUCED MOTION
    --------------------------------------------------------
    */

    if (reducedMotion) {
      ref.current.position.set(
        position[0],
        position[1],
        position[2]
      );

      ref.current.rotation.set(
        rotation[0],
        rotation[1],
        rotation[2]
      );

      ref.current.scale.setScalar(scale);

      return;
    }

    /*
    --------------------------------------------------------
    START POSITIONS
    --------------------------------------------------------
    */

    const directions = {
      top: {
        x: 0,
        y: 3.2,
        z: -0.8,
        rx: 1,
        ry: 0.3,
        rz: 0.2,
      },

      bottom: {
        x: 0,
        y: -3.2,
        z: -0.8,
        rx: -1,
        ry: -0.3,
        rz: -0.2,
      },

      left: {
        x: -3.2,
        y: 0.3,
        z: -0.8,
        rx: 0.3,
        ry: -1,
        rz: -0.5,
      },

      right: {
        x: 3.2,
        y: 0.3,
        z: -0.8,
        rx: -0.3,
        ry: 1,
        rz: 0.5,
      },

      back: {
        x: 0,
        y: 0,
        z: -3.8,
        rx: 0.6,
        ry: 0.6,
        rz: 0,
      },

      random: {
        x: THREE.MathUtils.randFloat(-3, 3),
        y: THREE.MathUtils.randFloat(-3, 3),
        z: THREE.MathUtils.randFloat(-4, 1),
        rx: THREE.MathUtils.randFloat(-1, 1),
        ry: THREE.MathUtils.randFloat(-1, 1),
        rz: THREE.MathUtils.randFloat(-1, 1),
      },
    };

    const start =
      directions[from] || directions.random;

    /*
    --------------------------------------------------------
    INITIAL STATE
    --------------------------------------------------------
    */

    ref.current.position.set(
      start.x,
      start.y,
      start.z
    );

    ref.current.rotation.set(
      start.rx,
      start.ry,
      start.rz
    );

    ref.current.scale.setScalar(0.35);

    /*
    --------------------------------------------------------
    GSAP ASSEMBLY ANIMATION
    --------------------------------------------------------
    */

    const timeline = gsap.timeline({
      delay,
      defaults: {
        ease: "power3.out",
      },
    });

    timeline.to(
      ref.current.position,
      {
        x: position[0],
        y: position[1],
        z: position[2],
        duration: 0.65,
      }
    );

    timeline.to(
      ref.current.rotation,
      {
        x: rotation[0],
        y: rotation[1],
        z: rotation[2],
        duration: 0.55,
      },
      "<"
    );

    timeline.to(
      ref.current.scale,
      {
        x: scale,
        y: scale,
        z: scale,
        duration: 0.5,
        ease: "back.out(1.5)",
      },
      "<"
    );

    /*
    --------------------------------------------------------
    CLEANUP
    --------------------------------------------------------
    */

    return () => {
      timeline.kill();
    };
  }, [
    position,
    rotation,
    scale,
    delay,
    from,
    reducedMotion,
  ]);

  return (
    <group
      ref={ref}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      {children}
    </group>
  );
}


/*
============================================================
MATERIALS
============================================================
*/

const robotMetal = {
  color: "#d8dce8",
  metalness: 0.8,
  roughness: 0.3,
};

const darkMetal = {
  color: "#202534",
  metalness: 0.82,
  roughness: 0.32,
};

const orangeMetal = {
  color: "#7c3aed",
  metalness: 0.65,
  roughness: 0.28,
  emissive: "#4c1d95",
  emissiveIntensity: 0.65,
};

const eyeMaterial = {
  color: "#ff8a5b",
  emissive: "#f45112",
  emissiveIntensity: 4,
};


/*
============================================================
ROBOT CHARACTER
============================================================
*/

export default function Character({
  pointer,
  speaking = false,
  voiceLevel = 0,
  reducedMotion = false,
}) {
  const robotRef = useRef();
  const headRef = useRef();
  const chestRef = useRef();
  const eyeRef = useRef();


  /*
  ==========================================================
  IDLE + SPEAKING ANIMATION
  ==========================================================
  */

  useFrame((state) => {
    if (!robotRef.current) return;

    /*
    --------------------------------------------------------
    PERFORMANCE MODE
    --------------------------------------------------------

    If reduced motion is active and robot is not speaking,
    there is no reason to continuously update animation.
    */

    if (reducedMotion && !speaking) {
      return;
    }

    const time =
      state.clock.elapsedTime;


    /*
    ========================================================
    IDLE ANIMATION
    ========================================================
    */

    if (!reducedMotion) {

      /*
      Breathing
      */

      const breathing =
        Math.sin(time * 1.5) * 0.018;

      robotRef.current.position.y =
        -0.35 + breathing;


      /*
      Gentle body rotation
      */

      robotRef.current.rotation.y =
        Math.sin(time * 0.45) * 0.025;


      /*
      Mouse tracking
      */

      if (
        pointer?.current &&
        headRef.current
      ) {
        const targetY =
          pointer.current.x * 0.2;

        const targetX =
          pointer.current.y * 0.1;

        headRef.current.rotation.y =
          THREE.MathUtils.lerp(
            headRef.current.rotation.y,
            targetY,
            0.05
          );

        headRef.current.rotation.x =
          THREE.MathUtils.lerp(
            headRef.current.rotation.x,
            targetX,
            0.05
          );
      }
    }


    /*
    ========================================================
    SPEAKING LIGHT
    ========================================================
    */

    if (chestRef.current) {
      chestRef.current.material.emissiveIntensity =
        speaking
          ? 1.3 + voiceLevel * 2
          : 1;
    }


    if (eyeRef.current) {
      eyeRef.current.material.emissiveIntensity =
        speaking
          ? 4 + voiceLevel * 3
          : 3.5;
    }
  });


  return (
    <group
      ref={robotRef}
      scale={0.82}
      position={[0, -0.35, 0]}
    >

      {/* ==================================================
          HEAD
      ================================================== */}

      <RobotPart
        position={[0, 1.95, 0]}
        delay={0.1}
        from="top"
        reducedMotion={reducedMotion}
      >

        <group ref={headRef}>

          {/* Main head */}

          <mesh>
            <boxGeometry
              args={[0.92, 0.92, 0.82]}
            />

            <meshStandardMaterial
              {...robotMetal}
            />
          </mesh>


          {/* Face */}

          <mesh
            position={[0, -0.02, 0.43]}
          >
            <boxGeometry
              args={[0.72, 0.42, 0.05]}
            />

            <meshStandardMaterial
              {...darkMetal}
            />
          </mesh>


          {/* Left eye */}

          <mesh
            position={[-0.18, 0.04, 0.48]}
          >
            <boxGeometry
              args={[0.13, 0.08, 0.025]}
            />

            <meshStandardMaterial
              {...eyeMaterial}
            />
          </mesh>


          {/* Right eye */}

          <mesh
            ref={eyeRef}
            position={[0.18, 0.04, 0.48]}
          >
            <boxGeometry
              args={[0.13, 0.08, 0.025]}
            />

            <meshStandardMaterial
              {...eyeMaterial}
            />
          </mesh>


          {/* Antenna */}

          <mesh
            position={[0, 0.58, 0]}
          >
            <cylinderGeometry
              args={[0.035, 0.035, 0.25, 8]}
            />

            <meshStandardMaterial
              {...orangeMetal}
            />
          </mesh>


          <mesh
            position={[0, 0.73, 0]}
          >
            <sphereGeometry
              args={[0.07, 10, 10]}
            />

            <meshStandardMaterial
              {...eyeMaterial}
            />
          </mesh>

        </group>

      </RobotPart>


      {/* ==================================================
          NECK
      ================================================== */}

      <RobotPart
        position={[0, 1.27, 0]}
        delay={0.25}
        from="bottom"
        reducedMotion={reducedMotion}
      >

        <mesh>
          <cylinderGeometry
            args={[0.22, 0.26, 0.35, 12]}
          />

          <meshStandardMaterial
            {...darkMetal}
          />
        </mesh>


        <mesh>
          <torusGeometry
            args={[0.23, 0.035, 8, 20]}
          />

          <meshStandardMaterial
            {...orangeMetal}
          />
        </mesh>

      </RobotPart>


      {/* ==================================================
          CHEST
      ================================================== */}

      <RobotPart
        position={[0, 0.55, 0]}
        delay={0.4}
        from="back"
        reducedMotion={reducedMotion}
      >

        <mesh ref={chestRef}>
          <boxGeometry
            args={[1.5, 1.25, 0.65]}
          />

          <meshStandardMaterial
            {...darkMetal}
            emissive="#4c1d95"
            emissiveIntensity={1}
          />
        </mesh>


        {/* Chest armor */}

        <mesh
          position={[0, 0.05, 0.37]}
        >
          <boxGeometry
            args={[1.05, 0.85, 0.08]}
          />

          <meshStandardMaterial
            {...robotMetal}
          />
        </mesh>


        {/* Reactor */}

        <mesh
          position={[0, 0.08, 0.43]}
        >
          <cylinderGeometry
            args={[0.17, 0.17, 0.05, 20]}
          />

          <meshStandardMaterial
            {...eyeMaterial}
          />
        </mesh>


        {/* Center line */}

        <mesh
          position={[0, 0.55, 0.4]}
        >
          <boxGeometry
            args={[0.035, 0.9, 0.025]}
          />

          <meshStandardMaterial
            {...orangeMetal}
          />
        </mesh>

      </RobotPart>


      {/* ==================================================
          SHOULDERS
      ================================================== */}

      <RobotPart
        position={[-0.95, 0.85, 0]}
        delay={0.55}
        from="left"
        reducedMotion={reducedMotion}
      >

        <mesh>
          <sphereGeometry
            args={[0.32, 12, 12]}
          />

          <meshStandardMaterial
            {...robotMetal}
          />
        </mesh>

      </RobotPart>


      <RobotPart
        position={[0.95, 0.85, 0]}
        delay={0.65}
        from="right"
        reducedMotion={reducedMotion}
      >

        <mesh>
          <sphereGeometry
            args={[0.32, 12, 12]}
          />

          <meshStandardMaterial
            {...robotMetal}
          />
        </mesh>

      </RobotPart>


      {/* ==================================================
          UPPER ARMS
      ================================================== */}

      <RobotPart
        position={[-1.15, 0.2, 0]}
        delay={0.8}
        from="left"
        reducedMotion={reducedMotion}
      >

        <mesh
          rotation={[0, 0, -0.12]}
        >
          <capsuleGeometry
            args={[0.2, 0.65, 4, 8]}
          />

          <meshStandardMaterial
            {...darkMetal}
          />
        </mesh>

      </RobotPart>


      <RobotPart
        position={[1.15, 0.2, 0]}
        delay={0.9}
        from="right"
        reducedMotion={reducedMotion}
      >

        <mesh
          rotation={[0, 0, 0.12]}
        >
          <capsuleGeometry
            args={[0.2, 0.65, 4, 8]}
          />

          <meshStandardMaterial
            {...darkMetal}
          />
        </mesh>

      </RobotPart>


      {/* ==================================================
          FOREARMS
      ================================================== */}

      <RobotPart
        position={[-1.2, -0.55, 0]}
        delay={1.05}
        from="bottom"
        reducedMotion={reducedMotion}
      >

        <mesh>
          <capsuleGeometry
            args={[0.19, 0.62, 4, 8]}
          />

          <meshStandardMaterial
            {...robotMetal}
          />
        </mesh>

      </RobotPart>


      <RobotPart
        position={[1.2, -0.55, 0]}
        delay={1.15}
        from="bottom"
        reducedMotion={reducedMotion}
      >

        <mesh>
          <capsuleGeometry
            args={[0.19, 0.62, 4, 8]}
          />

          <meshStandardMaterial
            {...robotMetal}
          />
        </mesh>

      </RobotPart>


      {/* ==================================================
          HANDS
      ================================================== */}

      <RobotPart
        position={[-1.2, -1.05, 0]}
        delay={1.3}
        from="left"
        reducedMotion={reducedMotion}
      >

        <mesh>
          <sphereGeometry
            args={[0.24, 10, 10]}
          />

          <meshStandardMaterial
            {...darkMetal}
          />
        </mesh>

      </RobotPart>


      <RobotPart
        position={[1.2, -1.05, 0]}
        delay={1.4}
        from="right"
        reducedMotion={reducedMotion}
      >

        <mesh>
          <sphereGeometry
            args={[0.24, 10, 10]}
          />

          <meshStandardMaterial
            {...darkMetal}
          />
        </mesh>

      </RobotPart>


      {/* ==================================================
          WAIST
      ================================================== */}

      <RobotPart
        position={[0, -0.25, 0]}
        delay={1.55}
        from="bottom"
        reducedMotion={reducedMotion}
      >

        <mesh>
          <boxGeometry
            args={[0.85, 0.35, 0.5]}
          />

          <meshStandardMaterial
            {...darkMetal}
          />
        </mesh>

      </RobotPart>


      {/* ==================================================
          LOWER BODY
      ================================================== */}

      <RobotPart
        position={[0, -0.85, 0]}
        delay={1.7}
        from="bottom"
        reducedMotion={reducedMotion}
      >

        <mesh>
          <boxGeometry
            args={[1.05, 0.85, 0.55]}
          />

          <meshStandardMaterial
            {...robotMetal}
          />
        </mesh>

      </RobotPart>


      {/* ==================================================
          ENERGY RING
      ================================================== */}

      <RobotPart
        position={[0, -1.32, 0]}
        delay={1.85}
        from="bottom"
        reducedMotion={reducedMotion}
      >

        <mesh
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry
            args={[0.65, 0.025, 8, 24]}
          />

          <meshStandardMaterial
            {...orangeMetal}
          />
        </mesh>

      </RobotPart>

    </group>
  );
}


