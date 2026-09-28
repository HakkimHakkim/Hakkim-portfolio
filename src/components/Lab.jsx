import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMouseParallax } from "../hooks/useMouseParallax.js";
import { useDeviceCapability } from "../hooks/useDeviceCapability.js";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

function WireframeCore({ pointer }) {
  const mesh = useRef();

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.15 + pointer.current.x * 0.4;
    mesh.current.rotation.x = t * 0.08 + pointer.current.y * 0.2;
  });

  return (
    <group ref={mesh}>
      <mesh>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.5} />
      </mesh>
      <mesh scale={0.6}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color="#f472b6" wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function LabScene() {
  const pointer = useMouseParallax();
  const { isMobile } = useDeviceCapability();

  return (
    <Canvas
      dpr={[1, isMobile ? 1.5 : 2]}
      camera={{ position: [0, 0, 5], fov: 40 }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 2, 3]} intensity={8} color="#8b5cf6" />
      <Suspense fallback={null}>
        <WireframeCore pointer={pointer} />
      </Suspense>
    </Canvas>
  );
}

export default function Lab() {
  const contentRef = useRef(null);
  useScrollReveal(contentRef, { y: 30, duration: 0.9, start: "top 78%" });

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-void-surface py-28 md:py-40">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <LabScene />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 60% at 50% 50%, rgba(6,3,8,0) 0%, rgba(6,3,8,0.9) 78%)",
        }}
      />

      <div ref={contentRef} className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
        <p className="section-label justify-center">
          Where I like to build
        </p>
        <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.1] tracking-tightest text-ink-100 sm:text-5xl md:text-6xl">
          AI, full stack engineering, and the 3D web — explored together.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-balance text-ink-400">
          I'm drawn to the space where intelligent backends, thoughtful
          interfaces, and real-time 3D meet — and I use my projects to keep
          exploring it.
        </p>
      </div>
    </section>
  );
}
