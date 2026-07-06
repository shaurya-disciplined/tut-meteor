# 🌌 PROJECT NOCTURNE: THE DEVELOPMENT BIBLE
**Target Architecture:** Next.js 14, React Three Fiber (R3F), GLSL Shaders, Framer Motion, Lenis, Rapier Physics.
**Target Aesthetic:** World-Class, Awwwards Site of the Month, Cinematic, Video-Game Caliber UI.

---

## 🛑 PART I: THE CURRENT ARCHITECTURE (WHERE WE STAND)
We have successfully built a robust, cinematic foundation. We are no longer dealing with basic React errors.
*   **The Framework:** Next.js 14 (App Router).
*   **The Engine:** `Framer Motion` for DOM animation, `Lenis` for ultra-smooth momentum scrolling.
*   **The Layout:** A heavily z-indexed global structure. The background (videos/grain) sits in the absolute back, the content routes through a seamless `PageTransition` black curtain, and the custom lagging cursor sits at the very top.
*   **Recent Fixes:** We eradicated layout-breaking height bugs (`h-full` vs `min-h-screen`) that corrupted scroll hitboxes, and secured the custom cursor logic so it flawlessly hides the native Windows cursor across all edge cases. The codebase is fully deployed and stable.

*We are now ripping off the safety wheels. This is no longer a website; it is an interactive game environment.*

---

## 🖋️ PART II: TYPOGRAPHY, COPYWRITING, & UI VIBE
Since you are a graphic/game designer, you know that 3D effects look like cheap gimmicks if the 2D typography isn't mathematically perfect.
### 1. Font Architecture
*   **Primary Display (The Heavy Hitter):** We need a razor-sharp, brutalist sans-serif or a dangerously elegant serif (e.g., PP Neue Montreal, Ogg, or Editorial New). This will be used for massive, screen-filling words like "METEOR".
*   **Secondary Text (The Terminal/Game UI):** A clean, monospace font (like JetBrains Mono or Geist Mono) for micro-copy, timestamps, and coordinates to give it a high-tech, tactical HUD feel.
### 2. Copywriting (The Script)
*   The text on the site must be entirely rewritten. We drop standard web terms ("About Me", "Projects"). We use game/film terms: "The Arsenal", "The Signal", "Midnight Run". 
*   **Risk Mitigation:** Heavy typography often causes Cumulative Layout Shift (CLS) on load. We will use `next/font/local` to guarantee zero-shift preloading.
### 3. Responsive Scaling (Fluid Math)
*   We will aggressively use CSS `clamp()` functions for font sizes. Text will infinitely scale with the viewport without ever hitting standard "breakpoints", ensuring a flawless magazine layout on every phone and ultra-wide monitor.

---

## 🧊 PART III: THE WEBGL & PHYSICS PIPELINE (THE UNHINGED ANIMATIONS)
To build the craziest effects, we are layering a transparent `<Canvas>` from `Three.js` directly over/under the DOM.

### 1. Volumetric Smoke & Fluid Simulation
*   **Execution:** We will write a custom GLSL fragment shader utilizing a Navier-Stokes fluid simulation. 
*   **Interaction:** We map the user's cursor (`e.clientX / e.clientY`) and the Lenis scroll velocity to the fluid's velocity field. As you scroll, the smoke gets dragged down. As you swipe, you carve paths through it.
*   **Failure Risk:** Simulating fluid on a phone GPU can melt the battery. 
*   **Mitigation:** We will detect mobile GPUs. High-end phones get the fluid simulation. Mid/low-tier phones automatically fallback to a pre-rendered looping cinematic smoke video.

### 2. The Glass Refraction Lens
*   **Execution:** We create a 3D PlaneGeometry in Three.js hovering in front of the camera. We apply a MeshPhysicalMaterial with high transmission, thickness, and roughness properties.
*   **Interaction:** We pass the DOM's underlying background video into the WebGL context via a `RenderTarget`. The glass physically bends the video light.
*   **Failure Risk:** Rendering scenes twice (once for DOM, once for refraction target) halves framerate.
*   **Mitigation:** We limit the refraction pass to a low-resolution buffer and upscale it, using a blur filter to hide the aliasing (which looks like frosted glass anyway).

### 3. Rigid-Body Typography Physics
*   **Execution:** We integrate `@react-three/rapier` (a physics engine). We convert the massive "METEOR" text into 3D meshes (TextGeometry). 
*   **Interaction:** We attach a physics collider to the user's cursor. Flicking the text shatters the letters. They have rigid-body gravity and bounce off invisible walls at the edges of the screen.
*   **Failure Risk:** Converting DOM text to 3D meshes ruins SEO and accessibility.
*   **Mitigation:** The 3D text is purely visual (`aria-hidden`). The real text remains in the HTML DOM as transparent, un-selectable `absolute` elements so screen readers and Google can still read it perfectly.

### 4. Video-Synced DOM Destruction & Luma Mattes
*   **Execution:** We request a drifting car video from you. We use `requestAnimationFrame` to tie the video's `currentTime` directly to the `window.scrollY`. 
*   **Interaction:** As the car drifts, we calculate its screen coordinates. We use standard DOM Framer Motion to push the HTML text elements out of the way based on the car's bounding box.
*   **For Page Transitions:** We use a high-contrast ink-drop video and apply it to a CSS `mask-image`. The new page reveals through the white pixels of the video.

---

## 🎮 PART IV: THE VIDEO GAME POST-PROCESSING
Because you are a game designer, the final 10% of polish is a post-processing pipeline. We will use `@react-three/postprocessing` over the entire site:
1.  **Chromatic Aberration:** As the user scrolls fast, the red, green, and blue color channels of the entire website split apart slightly at the edges of the screen, creating a sense of extreme speed and broken camera optics.
2.  **Film Grain & Vignette:** Darkening the absolute edges of the screen to focus the eye, with a dynamic, moving grain that prevents color banding in the dark gradients.
3.  **Bloom:** The white text and the car headlights will physically bleed light into the dark void, giving it an HDR / Unreal Engine 5 aesthetic.

---

## 🛠️ THE STEP-BY-STEP EXECUTION ROADMAP

*   **PHASE 1: Typographic & Vibe Lockdown.**
    *   Lock in the exact font families.
    *   Rewrite the text content globally to match the cinematic script.
    *   Dial in all margins and `clamp()` values.
*   **PHASE 2: The WebGL Canvas Injection.**
    *   Install Three.js, R3F, and Post-processing.
    *   Set up a global `<Canvas>` that persists across Next.js route changes (using R3F's `View` system or a global tunnel) so the 3D world doesn't reload when switching pages.
*   **PHASE 3: The Shaders & Physics Build.**
    *   Build the Volumetric Fluid background.
    *   Implement the Rapier physics for the bouncing typography.
    *   Implement the Glass Refraction lens.
*   **PHASE 4: Asset Integration & DOM Syncing.**
    *   You supply the specific videos (Drifting car, Ink drops).
    *   I build the scroll-jacking video logic and the Luma-Matte transitions.
*   **PHASE 5: QA, Optimization, & Fallbacks.**
    *   Test on low-end mobile devices.
    *   Implement graceful degradation (disabling heavy shaders for pure CSS alternatives if FPS drops below 30).
    *   Final Vercel deployment.

This is not a website. This is a real-time, interactive cinematic experience. We are ready to begin Phase 1.
