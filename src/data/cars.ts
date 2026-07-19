export type Car = {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  oneLiner: string;
  src: string;
  pos: string;
  specs: {
    engine: string;
    power: string;
    weight: string;
    topSpeed: string;
    unitsBuilt: string;
  };
  essay: string[];
};

export const CARS: Car[] = [
  {
    slug: "pagani-huayra",
    index: "01",
    title: "Pagani Huayra",
    subtitle: "art you can hear coming.",
    oneLiner: "Theatricality and craft. Active aero as choreography.",
    src: "/images/pagani-topdown.jpg",
    pos: "center",
    specs: {
      engine: "6.0L AMG V12",
      power: "730 HP",
      weight: "1350 KG",
      topSpeed: "383 KMH",
      unitsBuilt: "100",
    },
    essay: [
      "There is a difference between speed and theater. The Huayra is theater. It is an argument that engineering does not have to be cold to be exact.",
      "The active aero flaps do not just manage downforce.. they breathe. They rise and fall like the muscles on a predator's back, braking and turning as if the car itself is alive.",
      "And the sound. The AMG V12 breathes like a jet turbine, pulling in the horizon and exhaling thunder. You do not just arrive in a Huayra. You are announced.",
      "Obsession over details is the whole point. The titanium bolts, the exposed linkage of the gear shifter, the leather that belongs in a bespoke suit.. it is a masterpiece that happens to go fast."
    ]
  },
  {
    slug: "bugatti-chiron",
    index: "02",
    title: "Bugatti Chiron",
    subtitle: "quiet menace.",
    oneLiner: "Overwhelming force kept perfectly calm. Restraint as intimidation.",
    src: "/images/car-bugatti-dark.jpg",
    pos: "center 60%",
    specs: {
      engine: "8.0L W16",
      power: "1500 HP",
      weight: "1996 KG",
      topSpeed: "420 KMH",
      unitsBuilt: "500",
    },
    essay: [
      "If the Huayra is theater, the Chiron is absolute silence before the storm. It is the most NOCTURNE car philosophy imaginable.. overwhelming force kept perfectly calm.",
      "The W16 engine is an engineering dare. Four turbochargers, sixteen cylinders, a cooling system that moves hundreds of liters of water a minute. But from the driver's seat, it is serene.",
      "It does not scream for attention. It simply dominates physics. When you ask for the power, the horizon snaps toward you with a violence that betrays the quiet cabin.",
      "That is restraint as intimidation. It knows exactly what it is capable of, and it does not feel the need to prove it until it decides to."
    ]
  },
  {
    slug: "pagani-zonda",
    index: "03",
    title: "Pagani Zonda",
    subtitle: "the masterpiece.",
    oneLiner: "Carbon fiber poetry. The imperfect analog legend.",
    src: "/images/zonda-studio.jpg",
    pos: "center",
    specs: {
      engine: "7.3L AMG V12",
      power: "760 HP",
      weight: "1070 KG",
      topSpeed: "350 KMH",
      unitsBuilt: "140",
    },
    essay: [
      "The Zonda is where the myth started. It is the imperfect analog legend, the car that proves why the last of a kind outranks the newest thing.",
      "Before hybridization, before active aero, there was just carbon weave, a naturally aspirated V12, and a manual gearbox. It is raw, vibrating, and dangerous.",
      "To look at the Zonda is to read carbon fiber poetry. The weave aligns perfectly across panels, the quad exhaust sits like a crown, and the profile is a wedge drawn straight out of a fever dream.",
      "It is the masterpiece because it makes no compromises for comfort. It demands your full attention, and in return, it gives you its soul."
    ]
  }
];

export function getCar(slug: string) {
  return CARS.find((c) => c.slug === slug);
}

export function adjacentCar(slug: string) {
  const i = CARS.findIndex((c) => c.slug === slug);
  if (i === -1) return null;
  return {
    prev: CARS[(i - 1 + CARS.length) % CARS.length],
    next: CARS[(i + 1) % CARS.length],
  };
}
