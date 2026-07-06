"use client";

import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const ImageShader = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uHover;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform vec2 uImageResolution;
    varying vec2 vUv;

    void main() {
      // Object-fit: cover logic
      vec2 s = uResolution;
      vec2 i = uImageResolution;
      float rs = s.x / s.y;
      float ri = i.x / i.y;
      vec2 newSize = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
      vec2 offset = (rs < ri ? vec2((newSize.x - s.x) / 2.0, 0.0) : vec2(0.0, (newSize.y - s.y) / 2.0)) / newSize;
      vec2 uv = vUv * s / newSize + offset;

      // Calculate liquid wave ripple based on time and hover state
      float wave = sin(uv.y * 12.0 + uTime * 3.5) * 0.012;
      float wave2 = cos(uv.x * 12.0 + uTime * 3.0) * 0.012;

      // Distort UVs using mouse distance and hover factor
      vec2 dist = uv - uMouse;
      float mouseLen = length(dist);
      float mouseForce = exp(-mouseLen * 4.0) * uHover;

      vec2 distortedUv = uv + vec2(wave, wave2) * uHover + dist * mouseForce * 0.14;

      // Chromatic Aberration RGB split effect
      float r = texture2D(uTexture, distortedUv + vec2(0.007, 0.0) * uHover).r;
      float g = texture2D(uTexture, distortedUv).g;
      float b = texture2D(uTexture, distortedUv - vec2(0.007, 0.0) * uHover).b;

      vec3 finalColor = vec3(r, g, b);

      // Slight contrast boost when hovered
      finalColor = mix(finalColor, finalColor * 1.08, uHover);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
};

function ImageMesh({ src, hover, mouse }: { src: string; hover: number; mouse: [number, number] }) {
  const texture = useTexture(src);
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  // Set texture filtering for optimal quality
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uHover: { value: 0 },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uImageResolution: {
        value: new THREE.Vector2(
          (texture.image as HTMLImageElement)?.width || 1,
          (texture.image as HTMLImageElement)?.height || 1
        ),
      },
    }),
    [texture, size]
  );

  useFrame((state) => {
    const { clock } = state;
    uniforms.uTime.value = clock.getElapsedTime();
    uniforms.uHover.value = THREE.MathUtils.lerp(uniforms.uHover.value, hover, 0.08);
    uniforms.uMouse.value.set(
      THREE.MathUtils.lerp(uniforms.uMouse.value.x, mouse[0], 0.08),
      THREE.MathUtils.lerp(uniforms.uMouse.value.y, mouse[1], 0.08)
    );
    uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={ImageShader.vertexShader}
        fragmentShader={ImageShader.fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

/**
 * Liquid-hover image. Self-contained: each instance owns a small transparent
 * Canvas inside its card, so overlaid labels (which live in the same stacking
 * context) always render above it, and any CSS filter classes (grayscale,
 * opacity, transitions) apply to the canvas element natively.
 *
 * Touch devices get a plain <img> instead: there is no hover there, so the
 * shader adds GPU cost without adding anything visible.
 */
export function WebGLImage({
  src,
  alt,
  className = "",
  containerClassName = "",
}: {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(0);
  const [mousePos, setMousePos] = useState<[number, number]>([0.5, 0.5]);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setInteractive(fine && !reduced);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - (e.clientY - rect.top) / rect.height; // WebGL UV starts bottom-left
    setMousePos([x, y]);
  };

  if (!interactive) {
    return (
      <div className={`relative overflow-hidden ${containerClassName}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className={`absolute inset-0 w-full h-full object-cover ${className}`} loading="lazy" />
      </div>
    );
  }

  return (
    <div
      ref={boxRef}
      onMouseEnter={() => setHover(1)}
      onMouseLeave={() => {
        setHover(0);
        setMousePos([0.5, 0.5]);
      }}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden ${containerClassName}`}
      aria-label={alt}
      role="img"
    >
      <Canvas
        className={`!absolute !inset-0 ${className}`}
        gl={{ antialias: false, alpha: true, powerPreference: "default" }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 1] }}
      >
        <Suspense fallback={null}>
          <ImageMesh src={src} hover={hover} mouse={mousePos} />
        </Suspense>
      </Canvas>
    </div>
  );
}
