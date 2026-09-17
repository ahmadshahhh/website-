import { About } from "@/components/sections/About";
import { Benefits } from "@/components/sections/Benefits";
import { Contact } from "@/components/sections/Contact";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { FeaturedDemo } from "@/components/sections/FeaturedDemo";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { WhyWebzivo } from "@/components/sections/WhyWebzivo";
import { WorkPreview } from "@/components/sections/WorkPreview";

/**
 * Home page.
 *
 * Ordered for a visitor arriving cold from Google Maps or search: what we do,
 * why it matters, what we build, how it works, proof, and then contact — with
 * a call to action reachable from every screen.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <Services />
      <Process />
      <WorkPreview />
      <FeaturedDemo />
      <WhyWebzivo />
      <About />
      <Faq />
      <CtaBanner />
      <Contact />
    </>
  );
}
