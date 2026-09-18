import ClassTypesSection from "@/app/components/home/ClassTypesSection";
import CoursesOffered from "@/app/components/home/CoursesOffered";
import Hero from "@/app/components/home/Hero";
import RegistrationForm from "@/app/components/home/RegistrationForm";
import WhyDrillDailyExists from "@/app/components/home/WhyDrillDailyExists";
import PromoPopup from "@/app/components/home/PromoPopup";

export default function Home() {
  return (
    <main>
      <PromoPopup />
      <Hero />
      <WhyDrillDailyExists />
      <CoursesOffered />
      <ClassTypesSection />
      <RegistrationForm />
    </main>
  );
}
