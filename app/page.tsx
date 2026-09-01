import { About } from "@/components/About";
import { LeadEssay } from "@/components/LeadEssay";
import { Masthead } from "@/components/Masthead";
import { Newsletter } from "@/components/Newsletter";
import { PracticeNotes } from "@/components/PracticeNotes";
import { Premise } from "@/components/Premise";
import { RecentWriting } from "@/components/RecentWriting";
import { SiteFooter } from "@/components/SiteFooter";
import { sections } from "@/content/site";

export default function Home() {
  return (
    <div className="page">
      <Masthead />
      <Premise />
      <LeadEssay />
      <RecentWriting />
      {sections.showPracticeNotes && <PracticeNotes />}
      <About />
      {sections.showNewsletter && <Newsletter />}
      <SiteFooter />
    </div>
  );
}
