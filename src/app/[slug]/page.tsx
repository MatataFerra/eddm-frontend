import { RichTextRenderer } from "@components/blocks/articles/RichTextRenderer";
import { getArticles } from "@lib/api_methods/get-articles";
import Image from "next/image";
import { Navigation } from "@components/blocks/articles/Navigation";
import type { Article } from "@/lib/interfaces/articles";

export default async function Entry({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const articles = await getArticles<Article[]>({
    params: {
      populate: "*",
    },
  });
  const article = articles.find((oneArticle) => oneArticle.slug === slug);

  return (
    <section className="relative">
      {article ? (
        <>
          <article className="prose prose-h1:text-4xl prose-invert max-w-full mb-4">
            {article && article.header && (
              <header className="group/header grid grid-cols-1 grid-rows-1 items-center justify-items-center max-h-96">
                <h1 className="col-start-1 col-end-2 row-start-1 row-end-auto z-10 self-center">
                  {article.title}
                </h1>
                <Image
                  src={article?.header?.url}
                  width={1280}
                  height={738}
                  alt={article.slug}
                  className="w-full h-80 opacity-10 -z-10 col-start-1 col-end-2 row-start-1 rounded-2xl row-end-auto group-hover/header:h-96 transition-all duration-300 group-hover/header:rounded-lg group-hover/header:opacity-30 object-cover "
                />
              </header>
            )}
            <div className="max-w-xl mx-auto">
              <blockquote>{article.summary}</blockquote>
              {article.blocks &&
                article.blocks?.length > 0 &&
                article.blocks[0].__component === "shared.rich-text" && (
                  <RichTextRenderer content={article.blocks[0]} />
                )}
            </div>
          </article>
          <Navigation articles={articles} />{" "}
        </>
      ) : (
        <p>Entry not available... refresh your browser</p>
      )}
    </section>
  );
}
