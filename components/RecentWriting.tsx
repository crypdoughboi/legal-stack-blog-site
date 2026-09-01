import { categories, recentPosts } from "@/content/site";

export function RecentWriting() {
  return (
    <section id="writing" className="section writing">
      <div className="writing__head">
        <h2 className="eyebrow">Recent writing</h2>
        <a href="#" className="writing__archive">
          Browse the archive
        </a>
      </div>
      <ol className="writing__list">
        {recentPosts.map((post) => (
          <li key={post.title} className="writing__item">
            <span className="writing__numeral">{post.numeral}</span>
            <h3 className="writing__title">
              <a href={post.href}>{post.title}</a>
            </h3>
            <p className="writing__dek">{post.dek}</p>
            <span className="writing__date">{post.date}</span>
          </li>
        ))}
      </ol>
      <p className="writing__filed">
        Filed under{" "}
        {categories.map((category, index) => (
          <span key={category.label}>
            <a href={category.href}>{category.label}</a>
            {index < categories.length - 2
              ? ", "
              : index === categories.length - 2
                ? ", and "
                : "."}
          </span>
        ))}
      </p>
    </section>
  );
}
