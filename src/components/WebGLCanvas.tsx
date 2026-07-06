"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform float uVelocity;
  varying vec2 vUv;

  // Classic Perlin 3D Noise by Stefan Gustavson
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){ 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

    i = mod(i, 289.0 ); 
    vec4 p = permute( permute( permute( 
                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
              + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    float n_ = 1.0/7.0;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  // FBM (Fractional Brownian Motion)
  float fbm(vec3 x) {
    float v = 0.0;
    float a = 0.5;
    vec3 shift = vec3(100.0);
    for (int i = 0; i < 5; ++i) {
      v += a * snoise(x);
      x = x * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 st = uv * aspect * 1.5;

    // Movement over time (stupidly slow, drifting like deep space dark matter)
    float t = uTime * 0.0015;
    
    // Add scroll velocity to shift the smoke vertically (barely noticeable ooze)
    st.y += uVelocity * 0.01;

    // Mouse interaction field
    vec2 mouseUv = uMouse * aspect;
    vec2 mouseDist = (st - mouseUv) * 0.5; // Scale down for wider interaction
    float mouseLen = length(mouseDist);
    // Smooth, wide force field around mouse
    float mouseForce = exp(-mouseLen * 2.5);
    
    // Domain warping (liquifying the space)
    vec3 p = vec3(st, t);
    
    // Add mouse force to the warp (sluggish bending)
    p.xy += mouseDist * mouseForce * 0.5;

    // Layer 1
    vec3 q = vec3(
      fbm(p + vec3(0.0, 0.0, t)),
      fbm(p + vec3(5.2, 1.3, t * 0.8)),
      fbm(p + vec3(2.1, 7.8, t * 0.5))
    );

    // Layer 2
    vec3 r = vec3(
      fbm(p + 4.0 * q + vec3(1.7, 9.2, t * 1.1)),
      fbm(p + 4.0 * q + vec3(8.3, 2.8, t * 0.9)),
      fbm(p + 4.0 * q + vec3(4.5, 6.1, t * 1.0))
    );

    // Final noise field
    float f = fbm(p + 2.0 * r);

    // Deep, rich, dark cinematic palette
    vec3 colorBase = vec3(0.01, 0.012, 0.018); // Void black-blue
    vec3 colorMid = vec3(0.04, 0.05, 0.07);    // Deep slate
    vec3 colorHighlight = vec3(0.18, 0.12, 0.08); // Warm bronze/copper for peaks

    // Blend based on density
    vec3 finalColor = mix(colorBase, colorMid, clamp(f * 2.0, 0.0, 1.0));
    finalColor = mix(finalColor, colorHighlight, clamp(f * f * 2.0, 0.0, 1.0));

    // Amplify the edges/peaks for a fluid, stringy liquid-smoke look
    finalColor += colorHighlight * pow(f, 3.0) * 1.5;
    
    // Mouse interaction glow (Headlight effect)
    // The cursor brings a soft light that catches the dense smoke
    float beam = exp(-mouseLen * 3.0);
    finalColor += vec3(0.3, 0.25, 0.2) * beam * pow(f, 1.5) * 2.0;

    // Fast scroll injection (boosts the bronze tones heavily when scrolling fast)
    finalColor += vec3(1.0, 0.6, 0.3) * uVelocity * 0.9 * f;

    // Apply a subtle vignette to darken the edges
    float vignette = length(uv - 0.5);
    finalColor *= 1.0 - (vignette * 0.8);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function WebGLCanvasManager({ children }: { children: React.ReactNode }) {
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bgCanvasRef.current) return;

    // 1. Setup RAW Three.js Scene for the indestructible background.
    // By using raw WebGL outside of the React render cycle, we completely
    // bypass any freezes caused by Next.js route transitions or Suspense boundaries.
    const renderer = new THREE.WebGLRenderer({
      canvas: bgCanvasRef.current,
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geometry = new THREE.PlaneGeometry(2, 2);
    
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uVelocity: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthWrite: false,
      depthTest: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 2. Handle Resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height, false); // false = don't set inline CSS styles, let Tailwind handle it
      uniforms.uResolution.value.set(width, height);
    };
    handleResize(); 
    window.addEventListener("resize", handleResize);

    // 3. Handle Input (Mouse & Scroll)
    const targetMouse = { x: 0.5, y: 0.5 };
    let targetVelocity = 0;
    let lastScrollY = window.scrollY;
    let velocityTimeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX / window.innerWidth;
      targetMouse.y = 1.0 - (e.clientY / window.innerHeight);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      targetVelocity = Math.min(diff / 50.0, 3.0); 

      clearTimeout(velocityTimeout);
      velocityTimeout = setTimeout(() => {
        targetVelocity = 0;
      }, 100);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 4. Raw Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const renderLoop = () => {
      // Smoothly interpolate mouse and velocity for an extremely sluggish, heavy, viscous feel
      uniforms.uMouse.value.x += (targetMouse.x - uniforms.uMouse.value.x) * 0.015;
      uniforms.uMouse.value.y += (targetMouse.y - uniforms.uMouse.value.y) * 0.015;
      uniforms.uVelocity.value += (targetVelocity - uniforms.uVelocity.value) * 0.02;
      
      uniforms.uTime.value = clock.getElapsedTime();

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    // 5. Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(velocityTimeout);
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen flex flex-col">
      {/* Absolute RAW WebGL Canvas. No R3F wrappers, literally immune to React suspense/navigation freezes */}
      <canvas
        ref={bgCanvasRef}
        className="fixed inset-0 -z-20 w-full h-full pointer-events-none"
      />

      {/* R3F View Portal Canvas (Transparent foreground for interactive WebGL Image glimmers on specific pages) */}
      <div className="fixed inset-0 z-30 w-full h-full pointer-events-none overflow-hidden">
        <Canvas
          eventSource={containerRef as unknown as React.MutableRefObject<HTMLElement>}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
        >
          <View.Port />
        </Canvas>
      </div>

      {/* Main HTML Content */}
      <div className="relative z-10 w-full flex flex-col flex-grow">
        {children}
      </div>
    </div>
  );
}
