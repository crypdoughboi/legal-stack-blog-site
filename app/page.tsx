import { About } from "@/components/About";
import { LeadEssay } from "@/components/LeadEssay";
import { Masthead } from "@/components/Masthead";
import { Newsletter } from "@/components/Newsletter";
import { PracticeNotes } from "@/components/PracticeNotes";
import { Premise } from "@/components/Premise";
import { RecentWriting } from "@/components/RecentWriting";
import { SiteFooter } from "@/components/SiteFooter";
import { sections } from "@/content/site";
import { getFeaturedPost, getPublishedPosts, getTags } from "@/lib/posts";

export const revalidate = 60;

export default async function Home() {
  const [featured, published, tags] = await Promise.all([
    getFeaturedPost(),
    getPublishedPosts(5),
    getTags(),
  ]);

  const recent = published
    .filter((post) => post.id !== featured?.id)
    .slice(0, 4);

  return (
    <div className="page">
      <Masthead />
      <Premise />
      {featured && <LeadEssay post={featured} />}
      <RecentWriting
        posts={recent}
        tags={tags}
        totalPublished={published.length}
      />
      {sections.showPracticeNotes && <PracticeNotes />}
      <About />
      {sections.showNewsletter && <Newsletter />}
      <SiteFooter />
    </div>
  );
}
