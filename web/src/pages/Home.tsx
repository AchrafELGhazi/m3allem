import { CTASection } from "../components/CTASection";
import { FeaturesSection } from "../components/FeaturesSection";
import HeroSection from "../components/HeroSection";
import { HowItWorksSection } from "../components/HowItWorksSection";
import { ServicesSection } from "../components/ServicesSection";

export const HomePage = () => {
  return (
    <div className='min-h-screen'>
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
};
