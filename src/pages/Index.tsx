import NewHeader from "@/components/NewHeader";
import NewHero from "@/components/NewHero";
import NewFeatures from "@/components/NewFeatures";
import NewStats from "@/components/NewStats";
import NewTestimonials from "@/components/NewTestimonials";
import NewCTA from "@/components/NewCTA";
import NewFooter from "@/components/NewFooter";

const Index = () => {
  return (
    <div className="min-h-screen">
      <NewHeader />
      <NewHero />
      <NewFeatures />
      <NewStats />
      <NewTestimonials />
      <NewCTA />
      <NewFooter />
    </div>
  );
};

export default Index;
