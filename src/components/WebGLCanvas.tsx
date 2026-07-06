"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Custom GLSL Shader for the Volumetric Smoke / Fluid Void
const FluidShader = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform float uVelocity;
    varying vec2 vUv;

    // Classic Perlin 2D Noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    vec3 taylorInvSqrt(vec3 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx) ;
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0) )
      + i.x + vec3(0.0, i1.x, 1.0) );
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
        dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0 ;
      vec3 h = abs(x) - 0.5 ;
      vec3 a0 = x - floor(x + 0.5) ;
      vec3 g = a0 * a0 + h * h ;
      vec3 norm = taylorInvSqrt(g);
      vec3 g012;
      g012.x = a0.x  * x0.x  + h.x  * x0.y;
      g012.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g012);
    }

    #define OCTAVES 4
    float fbm(vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * snoise(st);
        st *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }

    void main() {
      // Scale coordinates to fit resolution
      vec2 uv = gl_FragCoord.xy / uResolution.xy;
      vec2 st = uv * 2.2;
      
      // Calculate mouse displacement vector
      vec2 mouseDist = uv - uMouse;
      float mouseLen = length(mouseDist);
      // Create a smooth attraction/repulsion field around mouse
      float force = exp(-mouseLen * 5.0);
      
      vec2 q = vec2(0.0);
      q.x = fbm(st + 0.04 * uTime);
      q.y = fbm(st + vec2(1.0));
      
      vec2 r = vec2(0.0);
      r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.08 * uTime + mouseDist * force * 1.5);
      r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.06 * uTime - mouseDist * force * 1.5);
      
      float f = fbm(st + r);
      
      // Cinematic dark palettes (Void theme)
      vec3 colorBase = vec3(0.03, 0.03, 0.04); // Deep charcoal void
      vec3 colorSmoke = vec3(0.09, 0.07, 0.06); // Matte bronze / raw earth embers
      
      // Blend base with the fbm noise density
      vec3 finalColor = mix(colorBase, colorSmoke, clamp(f * f * 3.5, 0.0, 1.0));
      
      // Inject scroll velocity feedback (pulses a bronze hue on fast scroll)
      finalColor += vec3(0.69, 0.53, 0.35) * uVelocity * 0.12 * f;
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
};

function FluidBackground({ mouse, velocity }: { mouse: React.MutableRefObject<[number, number]>; velocity: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uVelocity: { value: 0 },
    }),
    [size]
  );

  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height);
  }, [size, uniforms]);

  useFrame((state) => {
    const { clock } = state;
    // Update uniforms
    uniforms.uTime.value = clock.getElapsedTime();
    uniforms.uMouse.value.set(mouse.current[0], mouse.current[1]);
    uniforms.uVelocity.value = THREE.MathUtils.lerp(uniforms.uVelocity.value, velocity.current, 0.1);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={FluidShader.vertexShader}
        fragmentShader={FluidShader.fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export function WebGLCanvasManager({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef<[number, number]>([0.5, 0.5]);
  const velocity = useRef<number>(0);
  const lastScrollY = useRef<number>(0);
  const velocityTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to 0.0 - 1.0, matching WebGL UV space
      mouse.current = [e.clientX / window.innerWidth, 1.0 - e.clientY / window.innerHeight];
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = Math.abs(currentScrollY - lastScrollY.current);
      lastScrollY.current = currentScrollY;

      // Calculate instantaneous scroll velocity
      velocity.current = Math.min(diff / 50.0, 2.5); // Cap velocity impact

      if (velocityTimeout.current) clearTimeout(velocityTimeout.current);
      velocityTimeout.current = setTimeout(() => {
        velocity.current = 0;
      }, 100);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (velocityTimeout.current) clearTimeout(velocityTimeout.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen flex flex-col">
      {/* Persistent global WebGL canvas strictly placed behind DOM layout */}
      <div className="fixed inset-0 -z-20 w-full h-full pointer-events-none overflow-hidden">
        <Canvas
          gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
          dpr={[1, 1.5]} // Performance optimized device pixel ratio
          camera={{ position: [0, 0, 1] }}
        >
          <FluidBackground mouse={mouse} velocity={velocity} />
        </Canvas>
      </div>

      {/* Main HTML Content */}
      <div className="relative z-10 w-full flex flex-col flex-grow">
        {children}
      </div>
    </div>
  );
}
