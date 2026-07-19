# Dossier Redesign Plan: "Project Nocturne"

The `/dossier` page is currently a single-column scrolling page. While clean, it doesn't fully lean into the "classified, highly confidential, late-night Batman" aesthetic that you're aiming for. We want the user to feel like they just hacked into a highly secure mainframe to read this file.

Here is the proposed structural and visual redesign plan:

## 1. Structural & Layout Shifts (The "Bento Terminal")
Instead of standard stacked sections, we will restructure the page into a **Bento Box / HUD (Heads-Up Display) layout**.
*   **Split-pane design on Desktop:** The left side will remain sticky (acting as a persistent classification terminal showing your alias, status, and rotating 3D element if possible), while the right side scrolls through the classified files.
*   **Data Cards:** `On Record`, `In Training`, and `Coordinates` will be encased in glassmorphic, bordered cards (`bg-surface` with `border-line/40`) that fade and slide in from the bottom as you scroll down.

## 2. Animation Overhaul
This is where we inject the components we just built!
*   **ScrambleText Everywhere:** Every single heading (`01 ON RECORD`, `02 IN TRAINING`) will use the `<ScrambleText>` component. When a section scrolls into view, the title will literally decode itself in real-time. 
*   **Typing Effect:** The introductory text ("*Everything in this file is true...*") will be typed out letter-by-letter on load, mimicking a retro CRT terminal.
*   **Parallax Images:** The attachments won't just sit there. As you scroll, the images inside the frames will move at a slightly different speed (parallax effect), making them feel like premium cinematic shots.

## 3. Image Replacements (Cinemascope Vibe)
The current images (`hero.jpg`, `forts.jpg`, `gloves.jpg`, `drift.jpg`) need to be upgraded. 
*   **Aspect Ratios:** We will change the image frames from standard `16:9` to an ultra-wide anamorphic **`2.39:1`** ratio to make them look like movie stills.
*   **New Aesthetic:** I will write a script to fetch heavily stylized, high-contrast black-and-white (or deep noir) images from Unsplash/Pexels that match:
    *   *Hero:* A dark, raining city street at night or a sleek car tail-light.
    *   *Forts:* A moody, mist-covered mountain peak.
    *   *Gloves:* Wrapped hands or a dark gym environment.
    *   *Drift:* A blurred, high-speed car panning shot.

## 4. Copy & Typography Adjustments
*   **Terminal Output Style:** We will wrap the data in `dossier.ts` to look more like machine logs. (e.g., prefixing lines with `>` or `[LOG]`).
*   **More Redactions:** The `<Redacted />` component is awesome. We will increase its usage in the `WONT_DISCUSS` section, making the user physically hover over the page to try and discover secrets, increasing engagement.

---
### Next Steps
If you approve of this direction, you can click **Proceed** and I will:
1. Update `src/data/dossier.ts` to tweak the copy.
2. Completely rewrite `src/app/dossier/page.tsx` to implement the new layout and animations.
3. Download the new cinematic replacement images into your `public/dossier/` folder.
