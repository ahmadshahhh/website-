import { About } from "@/components/sections/About";
import { Benefits } from "@/components/sections/Benefits";
import { Contact } from "@/components/sections/Contact";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { FeaturedDemo } from "@/components/sections/FeaturedDemo";
import { Hero } from "@/components/sections/Hero";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { Positioning } from "@/components/sections/Positioning";
import { Pricing } from "@/components/sections/Pricing";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyWebsite } from "@/components/sections/WhyWebsite";
import { WhyWebzivo } from "@/components/sections/WhyWebzivo";
import { WorkPreview } from "@/components/sections/WorkPreview";

/**
 * Home page.
 *
 * Ordered so a visitor can follow one line of thought:
 *   what Webzivo does  -> Hero, Positioning
 *   what they get      -> Services, Work, Featured demo
 *   why it helps       -> Why a website, Why Webzivo
 *   who we are         -> Client stories, About, How we work
 *   what it costs      -> Pricing
 *   how to get in touch-> FAQ, final call to action, Contact
 *
 * Section tones alternate (soft / dark / light) so no two neighbours share a
 * background.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <Positioning />
      <Services />
      <WhyWebsite />
      <Process />
      <WorkPreview />
      <FeaturedDemo />
      <Testimonials />
      <WhyWebzivo />
      <About />
      <HowWeWork />
      <Pricing />
      <Faq />
      <CtaBanner />
      <Contact />
    </>
  );
}
