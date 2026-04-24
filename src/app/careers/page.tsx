import type { Metadata } from "next";
import Footer from "@/components/scaffolds/footer/footer";
import Navbar from "@/components/scaffolds/navbar/navbar";
import {
  CareersAbout,
  CareersApplicationSection,
  CareersHero,
  CareersJourney,
  CareersPromoBanner,
  CareersSkipLink,
  CareersTeam,
} from "./components";

export const metadata: Metadata = {
  title: "Careers — Analytics Avenue",
  description:
    "Analytics Avenue is an IT and EdTech organization specializing in advanced analytics, data engineering, and AI-driven solutions. Explore career paths and apply.",
};

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white pb-28 sm:pb-24">
      <CareersSkipLink />
      <Navbar />

      <main id="careers-main">
        <CareersHero />
        <CareersAbout />
        <CareersJourney />

        <CareersApplicationSection />
        <CareersTeam />
      </main>

      <Footer />
      <CareersPromoBanner />
    </div>
  );
}
