import ClassTypesSection from "@/app/components/home/ClassTypesSection";
import CoursesOffered from "@/app/components/home/CoursesOffered";
import Hero from "@/app/components/home/Hero";
import RegistrationForm from "@/app/components/home/RegistrationForm";
import WhyDrillDailyExists from "@/app/components/home/WhyDrillDailyExists";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhyDrillDailyExists />
      <CoursesOffered />
      <ClassTypesSection />
      <RegistrationForm />
    </main>
  );
}
