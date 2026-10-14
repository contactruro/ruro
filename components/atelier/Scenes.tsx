import { Layer, ParallaxScene } from "./Parallax";

/* The parallax scenes, one per place on the site. Each is built from cutouts in public/art/myth (classical statues,
   painted clouds, putti, the hands of the Creation) at different depths. They sit behind a section's copy: large
   objects are hidden on small screens, and the clouds, which only soften the edge of a section, stay. */

const A = "/art/myth";

/** "Before they meet you, they search for you": two hands about to touch, in a bank of cloud. */
export function HandsScene() {
  return (
    <ParallaxScene>
      <Layer src={`${A}/clouds-a.webp`} className="right-[-14%] top-[-12%] w-[min(66rem,100vw)] opacity-90" depth={0.35} scroll={70} float={false} feather shadow={false} />
      <Layer src={`${A}/hands-touch.webp`} className="right-[-7%] bottom-[-2%] hidden w-[min(46rem,54vw)] md:block" depth={1.4} tilt={5} drag z={2} />
      <Layer src={`${A}/angels.webp`} className="bottom-[-18%] left-[-8%] w-[min(38rem,64vw)] opacity-90" depth={0.7} flip feather shadow={false} />
    </ParallaxScene>
  );
}

/** The philosophy section: clouds along the foot and a putto drifting in at the top left. */
export function IntroScene() {
  return (
    <ParallaxScene>
      <Layer src={`${A}/clouds-b.webp`} className="bottom-[-4%] left-[-12%] w-[min(72rem,110vw)] opacity-80" depth={0.35} scroll={60} float={false} feather shadow={false} />
      <Layer src={`${A}/angels.webp`} className="left-[-6%] top-[-14%] hidden w-[min(30rem,46vw)] md:block" depth={0.8} feather shadow={false} />
    </ParallaxScene>
  );
}

/** The showcase: a seated figure at a laptop, painted angels along the top edge. */
export function LaptopScene() {
  return (
    <ParallaxScene>
      <Layer src={`${A}/angel-border.webp`} className="inset-x-[-4%] top-[-2rem] w-[108%] opacity-90" depth={0.3} scroll={50} float={false} feather shadow={false} />
      <Layer src={`${A}/laptop.webp`} className="right-[1%] top-[3%] hidden w-[min(26rem,30vw)] lg:block" depth={1.3} tilt={7} drag z={2} />
    </ParallaxScene>
  );
}

/** The studio: a reader in headphones. */
export function ReaderScene() {
  return (
    <ParallaxScene>
      <Layer src={`${A}/clouds-b.webp`} className="bottom-[-6%] right-[-10%] w-[min(54rem,90vw)] opacity-80" depth={0.35} float={false} feather shadow={false} />
      <Layer src={`${A}/reader.webp`} className="bottom-[4%] left-[1%] hidden w-[min(24rem,26vw)] lg:block" depth={1.2} tilt={7} drag z={2} />
    </ParallaxScene>
  );
}

/** Field notes: a laurel-wreathed torso. */
export function LaurelScene() {
  return (
    <ParallaxScene>
      <Layer src={`${A}/laurel.webp`} className="right-[2%] top-[-2rem] hidden w-[min(16rem,18vw)] xl:block" depth={1.1} tilt={7} drag z={2} />
      <Layer src={`${A}/clouds-a.webp`} className="bottom-[-12%] left-[-10%] w-[min(50rem,80vw)] opacity-70" depth={0.35} float={false} feather shadow={false} />
    </ParallaxScene>
  );
}

/** Questions: a statue checking its phone. */
export function PhoneScene() {
  return (
    <ParallaxScene>
      <Layer src={`${A}/phone.webp`} className="right-[3%] top-[6%] hidden w-[min(22rem,26vw)] lg:block" depth={1.2} tilt={7} drag z={2} />
      <Layer src={`${A}/angel-border.webp`} className="inset-x-[-4%] bottom-[-1rem] w-[108%] rotate-180 opacity-70" depth={0.3} float={false} feather shadow={false} />
    </ParallaxScene>
  );
}

/** The process: a strong figure and a wall of painted waves, far right. */
export function FlexScene() {
  return (
    <ParallaxScene>
      <Layer src={`${A}/flex.webp`} className="right-[-1%] top-[-3rem] hidden w-[min(15rem,16vw)] 2xl:block" depth={1.1} tilt={6} drag z={2} />
    </ParallaxScene>
  );
}

/** The close: clouds and putti around the seated figure. */
export function FinalScene() {
  return (
    <ParallaxScene>
      <Layer src={`${A}/clouds-b.webp`} className="bottom-[-5%] left-[-8%] w-[min(80rem,120vw)] opacity-85" depth={0.4} scroll={70} float={false} feather shadow={false} />
      <Layer src={`${A}/angels.webp`} className="right-[18%] top-[-10%] hidden w-[min(26rem,34vw)] md:block" depth={0.9} feather shadow={false} />
    </ParallaxScene>
  );
}

const HEADER: Record<string, { src: string; cls: string }> = {
  reader: { src: "reader", cls: "w-[min(40rem,44vw)]" },
  laptop: { src: "laptop", cls: "w-[min(42rem,46vw)]" },
  laurel: { src: "laurel", cls: "w-[min(30rem,34vw)]" },
  flex: { src: "flex", cls: "w-[min(34rem,38vw)]" },
  phone: { src: "phone", cls: "w-[min(36rem,40vw)]" },
  hands: { src: "hands-touch", cls: "w-[min(56rem,60vw)]" },
  bust: { src: "blindfold-bust", cls: "w-[min(40rem,44vw)]" },
  sun: { src: "sun-statue", cls: "w-[min(42rem,46vw)]" },
  zeus: { src: "greek-water", cls: "w-[min(32rem,36vw)]" },
  walker: { src: "walker", cls: "w-[min(30rem,34vw)]" },
  athena: { src: "athena", cls: "w-[min(32rem,36vw)]" },
  medusa: { src: "medusa-phones", cls: "w-[min(34rem,38vw)]" },
  angel: { src: "angel-red", cls: "w-[min(32rem,36vw)]" },
  gold: { src: "sun-blindfold", cls: "w-[min(36rem,40vw)]" },
};
export type HeaderVariant = keyof typeof HEADER | "clouds";

/** The scene behind a page header: clouds along the foot, and one object on the right. */
export function HeaderScene({ variant = "clouds" }: { variant?: HeaderVariant }) {
  const o = variant === "clouds" ? null : HEADER[variant];
  return (
    <ParallaxScene>
      <Layer src={`${A}/clouds-b.webp`} className="inset-x-[-6%] bottom-[-8%] w-[112%] opacity-85" depth={0.3} scroll={50} float={false} feather shadow={false} />
      <Layer src={`${A}/angels.webp`} className="right-[-4%] top-[-2rem] hidden w-[min(30rem,40vw)] md:block" depth={0.7} feather shadow={false} z={0} />
      {/* one large figure standing on the section's floor at the right, its cut base hidden by the section edge */}
      {o && <Layer src={`${A}/${o.src}.webp`} className={`bottom-0 right-[2%] hidden h-[90%] lg:block ${o.cls}`} fit scroll={0} depth={1} tilt={4} float={false} drag z={2} />}
    </ParallaxScene>
  );
}

/** A soft sky behind a section: painted clouds along the foot and a few small Greek pieces kept to the margins, so
 *  nothing sits behind the copy. Variants differ so neighbouring sections never repeat. Large pieces are hidden on
 *  phones; the clouds stay. */
export function SkyScene({ variant = "a", behind = false }: { variant?: "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k"; behind?: boolean }) {
  return (
    <ParallaxScene className={behind ? "-z-10" : ""}>
      {variant === "a" && (
        <>
          {/* One centrepiece: Apollo crowned in laurel before a halo of rays, between the words and the collage, floating in 3D. */}
          <Layer src={`${A}/cloud-soft.webp`} className="bottom-[-6%] left-[-10%] w-[min(60rem,110vw)] opacity-70" depth={0.3} scroll={50} float={false} feather shadow={false} />
          <Layer src={`${A}/apollo-sun.webp`} className="right-[-3%] top-[4.5rem] w-[8.5rem] opacity-85 md:right-auto md:left-[38%] md:top-[0.5rem] md:w-[min(24rem,24vw)] md:opacity-100" depth={0.55} tilt={6} scroll={100} z={0} />
        </>
      )}
      {variant === "b" && (
        <>
          {/* the studio and contact: a soft cloud, a misty tower and one large winged head */}
          <Layer src={`${A}/cloud-soft.webp`} className="bottom-[-8%] right-[-10%] w-[min(56rem,110vw)] opacity-80" depth={0.3} scroll={50} float={false} feather shadow={false} flip />
          <Layer src={`${A}/ruins-tower.webp`} className="left-[-8%] top-[10%] w-[min(28rem,56vw)] opacity-30 blur-[1px] md:left-[2%] md:w-[min(32rem,30vw)]" depth={0.3} tilt={3} scroll={70} feather shadow={false} z={0} />
          <Layer src={`${A}/angel-head.webp`} className="right-[-2%] top-[2%] hidden w-[min(14rem,15vw)] xl:block" depth={0.9} tilt={5} z={0} />
        </>
      )}
      {variant === "d" && (
        <>
          {/* the studies: a few large pieces only, behind the cards */}
          <Layer src={`${A}/cloud-soft.webp`} className="left-[-18%] top-[18%] w-[min(40rem,70vw)] opacity-70" depth={0.3} float={false} feather shadow={false} />
          <Layer src={`${A}/cloud-soft.webp`} className="bottom-[2%] right-[-16%] w-[min(44rem,76vw)] opacity-70" depth={0.4} float={false} feather shadow={false} flip />
          <Layer src={`${A}/sun-eye.webp`} className="left-[-3%] top-[22%] w-[min(8rem,24vw)] md:left-[1%] md:w-[min(14rem,14vw)]" depth={0.6} tilt={3} float={false} spin z={0} />
          <Layer src={`${A}/moon-blue.webp`} className="right-[-2%] top-[6%] w-[min(7rem,22vw)] md:right-[1%] md:w-[min(12rem,12vw)]" depth={0.8} tilt={3} z={0} />
          <Layer src={`${A}/ruins-tower.webp`} className="left-[-8%] top-[52%] w-[min(28rem,56vw)] opacity-30 blur-[1px] md:left-[2%] md:w-[min(32rem,30vw)]" depth={0.3} tilt={3} scroll={70} feather shadow={false} z={0} />
          <Layer src={`${A}/ruins-columns.webp`} flip className="bottom-[-3%] right-[-12%] w-[min(24rem,54vw)] opacity-40 md:right-[-3%] md:w-[min(30rem,26vw)] md:opacity-55" depth={0.8} tilt={6} scroll={110} feather shadow={false} z={0} />
          {/* more for the wide margins, fresh pieces only: scales, a lily, a golden cherub and a pocket clock */}
          <Layer src={`${A}/scales.webp`} className="left-[0.5%] top-[30%] hidden w-[min(13rem,11vw)] opacity-90 xl:block" depth={0.8} tilt={5} z={0} />
          <Layer src={`${A}/lily.webp`} className="right-[0.5%] top-[36%] hidden w-[min(12rem,10vw)] xl:block" depth={0.9} tilt={6} z={0} />
          <Layer src={`${A}/cherub-gold.webp`} className="left-[0.5%] top-[64%] hidden w-[min(11rem,9vw)] xl:block" depth={0.6} tilt={4} z={0} />
          <Layer src={`${A}/pocket-clock.webp`} className="right-[0.5%] top-[62%] hidden w-[min(11rem,9vw)] xl:block" depth={0.7} tilt={5} z={0} />
        </>
      )}
      {variant === "e" && (
        <>
          {/* the category: a misty tower at the left and a great sun with a face at the right */}
          <Layer src={`${A}/ruins-tower.webp`} className="left-[-10%] top-[2%] w-[min(26rem,60vw)] opacity-30 blur-[1px] md:left-[1%] md:w-[min(30rem,28vw)] md:opacity-40" depth={0.3} tilt={3} scroll={70} feather shadow={false} z={0} />
          <Layer src={`${A}/sun-face.webp`} className="right-[-4%] top-[2%] w-[min(8rem,26vw)] md:right-[4%] md:w-[min(15rem,15vw)]" depth={0.7} tilt={4} spin float={false} z={0} />
        </>
      )}
      {variant === "f" && (
        <>
          {/* the journal's contents: a ruin of columns behind, and one great turning record with the two hands */}
          <Layer src={`${A}/ruins-columns.webp`} className="left-[-14%] top-[8%] w-[min(24rem,56vw)] opacity-30 md:left-[-4%] md:w-[min(30rem,26vw)] md:opacity-45" depth={0.8} tilt={6} scroll={120} feather shadow={false} z={0} />
          <Layer src={`${A}/vinyl-hands.webp`} className="right-[-8%] top-[4%] w-[min(10rem,32vw)] md:right-[0%] md:w-[min(16rem,15vw)]" depth={0.6} tilt={4} float={false} spin z={0} />
        </>
      )}
      {variant === "g" && (
        <>
          {/* the process: a painted eye watching, and a blue crescent */}
          <Layer src={`${A}/moon-blue.webp`} className="right-[1%] top-[3%] w-[min(6rem,20vw)] md:w-[min(11rem,11vw)]" depth={0.6} tilt={3} float={false} z={0} />
          <Layer src={`${A}/eye-paint.webp`} className="left-[-2%] top-[8%] w-[min(8rem,26vw)] opacity-90 md:left-[1%] md:w-[min(15rem,15vw)]" depth={0.7} tilt={4} z={0} />
        </>
      )}
      {variant === "h" && (
        <>
          {/* the top of any page, one piece, big enough to read on a phone, kept behind the headline */}
          <Layer src={`${A}/sun-eye.webp`} className="right-[-3%] top-[5rem] w-[6.5rem] opacity-90 md:hidden" depth={0.5} tilt={3} float={false} spin z={0} />
        </>
      )}
      {variant === "i" && (
        <>
          {/* the studies header: silver wings spread behind the deck of browsers, a spiral sun above, pink blossoms below */}
          <Layer src={`${A}/wings-silver.webp`} className="right-[-6%] top-[7rem] w-[min(18rem,70vw)] opacity-60 md:right-[2%] md:top-[3rem] md:w-[min(44rem,40vw)] md:opacity-70" depth={0.5} tilt={5} scroll={80} z={0} />
          <Layer src={`${A}/sun-spiral.webp`} className="left-[40%] top-[3.5rem] hidden w-[min(11rem,11vw)] md:block" depth={0.7} tilt={4} float={false} spin z={0} />
          <Layer src={`${A}/blossom.webp`} className="bottom-[1%] left-[1%] w-[min(7rem,24vw)] md:bottom-[3%] md:left-[2%] md:w-[min(13rem,12vw)]" depth={0.9} tilt={6} z={0} />
        </>
      )}
      {variant === "j" && (
        <>
          {/* the editors' note: one great statue in the empty left column, a pearl in its shell and a roses-and-music record */}
          <Layer src={`${A}/statue-dj.webp`} className="bottom-[-2%] left-[-4%] hidden w-[min(26rem,26vw)] lg:block" depth={0.7} tilt={5} z={0} />
          <Layer src={`${A}/pearl-shell.webp`} className="right-[1%] top-[4%] hidden w-[min(12rem,11vw)] xl:block" depth={0.9} tilt={5} z={0} />
          <Layer src={`${A}/music-roses.webp`} className="bottom-[4%] right-[2%] w-[min(7rem,26vw)] md:w-[min(11rem,10vw)]" depth={0.6} tilt={4} float={false} spin z={0} />
        </>
      )}
      {variant === "k" && (
        <>
          {/* correspondence: a sealed letter at the left, a cherub with a harp at the right, silk drawn across the top */}
          <Layer src={`${A}/drape.webp`} className="left-[-4%] top-[-2%] hidden w-[min(22rem,22vw)] opacity-90 lg:block" depth={0.4} tilt={3} scroll={60} z={0} />
          <Layer src={`${A}/envelope.webp`} className="bottom-[8%] left-[1%] w-[min(8rem,28vw)] md:bottom-[14%] md:left-[6%] md:w-[min(16rem,16vw)]" depth={0.8} tilt={7} z={0} />
          <Layer src={`${A}/cherub-harp.webp`} className="bottom-[6%] right-[1%] w-[min(8rem,28vw)] md:right-[5%] md:w-[min(16rem,16vw)]" depth={0.7} tilt={5} z={0} />
        </>
      )}
      {variant === "c" && (
        <>
          {/* the questions: a cloud, a great sun and a pearl in its shells */}
          <Layer src={`${A}/cloud-soft.webp`} className="bottom-[-8%] left-[-12%] w-[min(54rem,100vw)] opacity-75" depth={0.3} float={false} feather shadow={false} />
          <Layer src={`${A}/gold-sun.webp`} className="left-[-2%] top-[3%] w-[min(7rem,22vw)] md:left-[1%] md:w-[min(13rem,13vw)]" depth={0.6} tilt={3} float={false} spin z={0} />
          <Layer src={`${A}/shells-hibiscus.webp`} className="bottom-[2%] right-[1%] hidden w-[min(14rem,15vw)] xl:block" depth={0.8} tilt={4} z={0} />
        </>
      )}
    </ParallaxScene>
  );
}
